// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";

import { cleanup, render, screen } from "@testing-library/react";
import { act } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  CONSENT_STORAGE_KEY,
  MARKETING_CONSENT_CHANGED_EVENT,
  type ConsentPreferences,
} from "@/lib/marketingConsent";

vi.mock("@next/third-parties/google", () => ({
  GoogleTagManager: ({ gtmId }: { gtmId: string }) => <div data-testid="gtm">{gtmId}</div>,
}));

import { GoogleTagManagerWithConsent } from ".";

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

afterEach(async () => {
  cleanup();
  localStorage.clear();
  // React schedules a passive-effects callback on its scheduler after every
  // commit with effects, and that callback reads `window` when it runs. Drain
  // the event loop so any such callback fires before Vitest tears down the
  // jsdom environment; otherwise it can crash the run after all tests pass
  // with an unhandled "window is not defined" error.
  await new Promise((resolve) => setTimeout(resolve, 0));
});

describe("GoogleTagManagerWithConsent", () => {
  it("does not render GTM before marketing consent is granted", () => {
    render(<GoogleTagManagerWithConsent gtmId="GTM-TM6JTQFG" />);

    expect(screen.queryByTestId("gtm")).not.toBeInTheDocument();
  });

  it("renders GTM when marketing consent is already granted", () => {
    localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({ essential: true, marketing: true }),
    );

    render(<GoogleTagManagerWithConsent gtmId="GTM-TM6JTQFG" />);

    expect(screen.getByTestId("gtm")).toHaveTextContent("GTM-TM6JTQFG");
  });

  it("renders GTM after marketing consent is granted in-session", () => {
    render(<GoogleTagManagerWithConsent gtmId="GTM-TM6JTQFG" />);

    act(() => {
      window.dispatchEvent(
        new CustomEvent<ConsentPreferences>(MARKETING_CONSENT_CHANGED_EVENT, {
          detail: {
            essential: true,
            marketing: true,
          },
        }),
      );
    });

    expect(screen.getByTestId("gtm")).toHaveTextContent("GTM-TM6JTQFG");
  });
});
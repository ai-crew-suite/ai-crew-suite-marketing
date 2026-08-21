// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const sentryMocks = vi.hoisted(() => ({
  captureException: vi.fn(),
}));

vi.mock("@sentry/nextjs", () => sentryMocks);

vi.mock("@/sanity/queries/globalErrorPage", () => ({
  defaultGlobalErrorPageContent: {
    eyebrow: "Error",
    title: "Digest Engine hit an unexpected problem",
    description:
      "We logged the failure for review. You can retry this route now, head back to the homepage, or use one of the main site paths below.",
    imageAlt: "Digest Engine error illustration",
    referenceLabel: "Reference",
    retryButtonText: "Try again",
    homeButtonLabel: "Return home",
    homeButtonHref: "/",
    recoveryLinks: [
      {
        href: "/tour",
        label: "How It Works",
        description:
          "Walk back through the product tour while the failed route reloads in a fresh tab or session.",
      },
      {
        href: "/pricing",
        label: "Pricing",
        description:
          "Double-check the hosted and self-managed rollout paths if that is where you were headed.",
      },
      {
        href: "/docs",
        label: "Docs",
        description:
          "Open the current docs set for setup guidance, product notes, and implementation details.",
      },
      {
        href: "/signup",
        label: "Sign Up",
        description:
          "Return to the evaluation flow if you were trying to request access or start a rollout conversation.",
      },
    ],
  },
  getGlobalErrorPageContent: vi.fn().mockResolvedValue({
    eyebrow: "Error",
    title: "Digest Engine hit an unexpected problem",
    description:
      "We logged the failure for review. You can retry this route now, head back to the homepage, or use one of the main site paths below.",
    imageAlt: "Digest Engine error illustration",
    referenceLabel: "Reference",
    retryButtonText: "Try again",
    homeButtonLabel: "Return home",
    homeButtonHref: "/",
    recoveryLinks: [
      {
        href: "/tour",
        label: "How It Works",
        description:
          "Walk back through the product tour while the failed route reloads in a fresh tab or session.",
      },
      {
        href: "/pricing",
        label: "Pricing",
        description:
          "Double-check the hosted and self-managed rollout paths if that is where you were headed.",
      },
      {
        href: "/docs",
        label: "Docs",
        description:
          "Open the current docs set for setup guidance, product notes, and implementation details.",
      },
      {
        href: "/signup",
        label: "Sign Up",
        description:
          "Return to the evaluation flow if you were trying to request access or start a rollout conversation.",
      },
    ],
  }),
}));

import { GlobalErrorContent } from "./global-error";

afterEach(() => {
  cleanup();
});

describe("GlobalError", () => {
  it("captures the error and renders recovery actions", () => {
    const reset = vi.fn();
    const error = new Error("marketing exploded");

    render(<GlobalErrorContent error={error} reset={reset} />);

    expect(sentryMocks.captureException).toHaveBeenCalledWith(error);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByAltText("Digest Engine error illustration")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Try again" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Return home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /How It Works/i })).toHaveAttribute("href", "/tour");
    expect(screen.getByRole("link", { name: /^Pricing/i })).toHaveAttribute("href", "/pricing");
    expect(screen.getByRole("link", { name: /^Docs/i })).toHaveAttribute("href", "/docs");
    expect(screen.getByRole("link", { name: /^Sign Up/i })).toHaveAttribute("href", "/signup");
  });

  it("retries when the user clicks the reset button", async () => {
    const user = userEvent.setup();
    const reset = vi.fn();

    render(<GlobalErrorContent error={new Error("retryable")} reset={reset} />);

    await user.click(screen.getByRole("button", { name: "Try again" }));

    expect(reset).toHaveBeenCalledTimes(1);
  });

  it("shows the error digest when one is available", () => {
    render(
      <GlobalErrorContent
        error={Object.assign(new Error("with digest"), { digest: "abc123" })}
        reset={vi.fn()}
      />,
    );

    expect(screen.getByText("Reference: abc123")).toBeInTheDocument();
  });
});
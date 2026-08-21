// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";

import { act } from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

vi.mock("next/image", () => ({
  default: ({ alt, className, src }: { alt: string; className?: string; src: string }) =>
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} className={className} src={src} />,
}));

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push,
  }),
}));

import LoginPage from "./page";

describe("LoginPage", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    push.mockReset();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("renders the login route with sign-in options and fallback links", () => {
    render(<LoginPage />);

    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Go straight to signup" })).toHaveAttribute("href", "/signup");
    expect(screen.getByRole("link", { name: "Read the docs" })).toHaveAttribute("href", "/docs");
    expect(screen.getByRole("button", { name: "Sign in with Google" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in with GitHub" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in with Microsoft" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in with email" })).toBeInTheDocument();
  });

  it("redirects email login attempts to signup after a fake delay", async () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "editor@digestengine.io" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "secret-password" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Sign in with email" }));

    expect(push).not.toHaveBeenCalled();
    expect(screen.getByRole("status")).toHaveTextContent("Checking for an existing account");

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    expect(push).toHaveBeenCalledWith("/signup?login=missing-account");
  });

  it("redirects provider login attempts to signup after a fake delay", async () => {
    render(<LoginPage />);

    fireEvent.click(screen.getByRole("button", { name: "Sign in with GitHub" }));

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    expect(push).toHaveBeenCalledWith("/signup?login=missing-account");
  });

  it("does not start the fake login flow for an empty email form", () => {
    render(<LoginPage />);

    fireEvent.click(screen.getByRole("button", { name: "Sign in with email" }));

    expect(push).not.toHaveBeenCalled();
  });
});
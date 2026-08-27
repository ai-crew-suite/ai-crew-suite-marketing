import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { defaultSignupPageContent } from "@/sanity/queries/signupPage";

vi.mock("./_components/SignupLoginNotice", () => ({
  default: () => <div>Signup login notice</div>,
}));

vi.mock("@/sanity/queries/signupPage", () => ({
  defaultSignupPageContent: {
    metadata: {
      title: "Digest Engine Sign Up",
      description: "Request access to Digest Engine and tell us how your editorial workflow works today.",
    },
    hero: {
      badge: "Sign up",
      title: "Start with a workflow that learns your editorial taste",
      description:
        "Digest Engine is designed for editors who want better sourcing, stronger prioritization, and less blank-page friction. Fill out the form and we will help you start with the right setup.",
      primaryAction: {
        text: "Compare plans",
        link: "/pricing",
      },
      secondaryAction: {
        text: "Read the docs",
        link: "/docs/reference/overview",
      },
      highlights: [
        "Project-scoped ranking from day one",
        "Support for RSS, social, and newsletter sources",
        "A faster path from shortlist to draft",
      ],
    },
    nextStepsSection: {
      eyebrow: "What happens next",
      title: "A typical rollout starts small and gets useful quickly",
      description:
        "Most teams begin with one editorial workflow, one source mix, and one issue cycle. That is enough to see whether the ranking and review loop fit your process.",
      items: [
        "We review your workflow and source mix.",
        "We point you to the right plan or setup path.",
        "You start with one project and one issue cycle.",
      ],
    },
  },
  getSignupPageContent: vi.fn(),
}));

import { getSignupPageContent } from "@/sanity/queries/signupPage";

import SignupPage from "./page";

describe("SignupPage", () => {
  beforeEach(() => {
    vi.mocked(getSignupPageContent).mockResolvedValue(defaultSignupPageContent);
  });

  it("renders the signup route with the form and next steps", async () => {
    const markup = renderToStaticMarkup(await SignupPage());

    expect(getSignupPageContent).toHaveBeenCalled();
    expect(markup).toContain(defaultSignupPageContent.hero.title);
    expect(markup).toContain("Request access");
    expect(markup).toContain("Signup login notice");
    expect(markup).toContain('aria-label="Signup next steps"');
    expect(markup).toContain('href="/pricing"');
  });
});
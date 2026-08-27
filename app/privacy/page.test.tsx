import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { defaultPrivacyPageContent } from "@/lib/privacyDefaults";
import PrivacyPage from "./page";

vi.mock("@/lib/privacyDefaults", () => ({
  defaultPrivacyPageContent: {
    metadata: {
      title: "AI Crew Suite Privacy Policy",
      description:
        "How AI Crew Suite collects, uses, protects, and processes personal information in connection with the service.",
    },
    hero: {
      title: "Privacy terms for using AI Crew Suite",
      description:
        "We are committed to protecting your privacy. This policy outlines how AI Crew Suite collects, uses, safeguards, and processes your personal information when you interact with our platform and services.",
      effectiveDate: "Effective date: May 16, 2026",
    },
    summarySection: {
      items: [
        {
          text: "We use information to operate, secure, support, and improve the service.",
        },
      ],
    },
    policySection: {
      eyebrow: "Policy details",
      title: "AI Crew Suite Privacy Terms",
      description:
        "Please read this policy carefully to understand our practices regarding your data and how we handle it.",
      items: [
        {
          title: "Information we collect",
          body: "We collect account details such as name, email address, organization, billing contacts, and workspace configuration.",
        },
        {
          title: "Your choices and rights",
          body: "Depending on your location, you may have rights to access, correct, delete, restrict, or export personal information.",
        },
      ],
    },
    contactSection: {
      eyebrow: "Contact",
      title: "Questions about privacy or data handling?",
      description:
        "Contact the AI Crew Suite team through the signup page or your existing customer support channel for privacy-related questions, subprocessors, or deletion requests.",
      primaryAction: {
        label: "Contact sales",
        href: "/signup",
      },
      secondaryAction: {
        label: "Read the docs",
        href: "/docs/reference/overview",
      },
    },
  },
  getPrivacyPageContent: vi.fn(),
}));

import { getPrivacyPageContent } from "@/lib/privacyDefaults";

describe("PrivacyPage", () => {
  beforeEach(() => {
    vi.mocked(getPrivacyPageContent).mockResolvedValue(defaultPrivacyPageContent);
  });

  it("renders the privacy policy route with Sanity-backed sections", async () => {
    const markup = renderToStaticMarkup(await PrivacyPage());

    expect(markup).toContain("Privacy terms for using AI Crew Suite");
    expect(markup).toContain("Information we collect");
    expect(markup).toContain("Your choices and rights");
    expect(markup).toContain('href="/signup"');
    expect(markup).toContain('href="/docs/reference/overview"');
  });
});

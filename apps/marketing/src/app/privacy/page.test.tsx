import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { defaultPrivacyPageContent } from "@/sanity/queries/privacyPage";
import PrivacyPage from "./page";

vi.mock("@/sanity/queries/privacyPage", () => ({
  defaultPrivacyPageContent: {
    metadata: {
      title: "Digest Engine Privacy Policy",
      description:
        "How Digest Engine collects, uses, protects, and processes personal information in connection with the service.",
    },
    hero: {
      title: "Privacy terms for using Digest Engine",
      description:
        "We are committed to protecting your privacy. This policy outlines how Digest Engine collects, uses, safeguards, and processes your personal information when you interact with our platform and services.",
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
      title: "Digest Engine Privacy Terms",
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
        "Contact the Digest Engine team through the signup page or your existing customer support channel for privacy-related questions, subprocessors, or deletion requests.",
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

import { getPrivacyPageContent } from "@/sanity/queries/privacyPage";

describe("PrivacyPage", () => {
  beforeEach(() => {
    vi.mocked(getPrivacyPageContent).mockResolvedValue(defaultPrivacyPageContent);
  });

  it("renders the privacy policy route with Sanity-backed sections", async () => {
    const markup = renderToStaticMarkup(await PrivacyPage());

    expect(markup).toContain("Privacy terms for using Digest Engine");
    expect(markup).toContain("Information we collect");
    expect(markup).toContain("Your choices and rights");
    expect(markup).toContain('href="/signup"');
    expect(markup).toContain('href="/docs/reference/overview"');
  });
});

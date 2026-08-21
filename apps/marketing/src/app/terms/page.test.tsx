import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { defaultTermsPageContent } from "@/sanity/queries/termsPage";
import TermsPage from "./page";

vi.mock("@/sanity/queries/termsPage", () => ({
  defaultTermsPageContent: {
    metadata: {
      title: "Digest Engine Terms of Service",
      description:
        "The standard terms that govern access to and use of Digest Engine.",
    },
    hero: {
      title: "Standard terms for using Digest Engine",
      description:
        "By accessing or using Digest Engine, you agree to be bound by these Terms of Service. Please read them carefully, as they govern your access to the platform, account responsibilities, billing, content rights, and acceptable use.",
      effectiveDate: "Effective date: May 16, 2026",
    },
    summarySection: {
      items: [
        {
          text: "You keep ownership of your content, and we only process it to operate the service.",
        },
      ],
    },
    policySection: {
      eyebrow: "Policy details",
      title: "Digest Engine Terms of Service",
      description:
        "Please read these terms carefully to understand your rights and obligations when using the service.",
      items: [
        {
          title: "Acceptance of these terms",
          body: "By accessing or using Digest Engine, you agree to these Terms of Service on behalf of yourself or the organization you represent.",
        },
        {
          title: "Limitation of liability",
          body: "To the maximum extent permitted by law, neither party will be liable for indirect, incidental, special, consequential, exemplary, or punitive damages.",
        },
      ],
    },
    contactSection: {
      eyebrow: "Contact",
      title: "Questions about contracts, plans, or legal terms?",
      description:
        "Contact the Digest Engine team through the signup page or your existing customer channel if you need an order form, enterprise terms, or clarifications about service usage.",
      primaryAction: {
        label: "Contact sales",
        href: "/signup",
      },
      secondaryAction: {
        label: "View privacy policy",
        href: "/privacy",
      },
    },
  },
  getTermsPageContent: vi.fn(),
}));

import { getTermsPageContent } from "@/sanity/queries/termsPage";

describe("TermsPage", () => {
  beforeEach(() => {
    vi.mocked(getTermsPageContent).mockResolvedValue(defaultTermsPageContent);
  });

  it("renders the terms route with Sanity-backed contract sections", async () => {
    const markup = renderToStaticMarkup(await TermsPage());

    expect(markup).toContain("Terms of Service");
    expect(markup).toContain("Acceptance of these terms");
    expect(markup).toContain("Limitation of liability");
    expect(markup).toContain('href="/signup"');
    expect(markup).toContain('href="/privacy"');
  });
});

import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { defaultCookiesPageContent } from "@/sanity/queries/cookiesPage";
import CookiesPage from "./page";

vi.mock("@/sanity/queries/cookiesPage", () => ({
  defaultCookiesPageContent: {
    metadata: {
      title: "Digest Engine Cookie Policy",
      description:
        "How Digest Engine uses cookies and similar technologies on the marketing site and service.",
    },
    hero: {
      title: "How Digest Engine uses cookies and similar technologies",
      description:
        "This policy outlines how Digest Engine uses cookies and similar technologies for security, functionality, analytics, and marketing. Please read it to understand how we set and manage these tools.",
      effectiveDate: "Effective date: May 16, 2026",
    },
    summarySection: {
      items: [
        {
          text: "Necessary cookies help the service stay secure and usable.",
        },
      ],
    },
    policySection: {
      eyebrow: "Policy details",
      title: "Digest Engine Cookie Policy",
      description:
        "Please read this policy to learn more about the tools we use and your choices regarding them.",
      items: [
        {
          title: "How we use cookies",
          body: "A SaaS product like Digest Engine may use cookies and similar technologies to keep users signed in, remember preferences, maintain security, understand product usage, measure site performance, and support onboarding, support, and marketing operations.",
        },
        {
          title: "Managing cookie choices",
          body: "Users can usually manage cookies through browser settings, device controls, or site-level consent tools.",
        },
      ],
    },
    contactSection: {
      eyebrow: "Contact",
      title: "Questions about consent, tracking, or cookie settings?",
      description:
        "Contact the Digest Engine team through the signup page or your existing customer channel if you need more detail about cookies, consent handling, or third-party tools used with the service.",
      primaryAction: {
        label: "View privacy policy",
        href: "/privacy",
      },
      secondaryAction: {
        label: "View terms",
        href: "/terms",
      },
    },
  },
  getCookiesPageContent: vi.fn(),
}));

import { getCookiesPageContent } from "@/sanity/queries/cookiesPage";

describe("CookiesPage", () => {
  beforeEach(() => {
    vi.mocked(getCookiesPageContent).mockResolvedValue(defaultCookiesPageContent);
  });

  it("renders the cookies route with Sanity-backed cookie policy sections", async () => {
    const markup = renderToStaticMarkup(await CookiesPage());

    expect(markup).toContain("Cookie Policy");
    expect(markup).toContain("How we use cookies");
    expect(markup).toContain("Managing cookie choices");
    expect(markup).toContain('href="/privacy"');
    expect(markup).toContain('href="/terms"');
  });
});

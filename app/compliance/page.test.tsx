import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { defaultCompliancePageContent } from "@/sanity/queries/compliancePage";
import CompliancePage from "./page";

vi.mock("@/sanity/queries/compliancePage", () => ({
  defaultCompliancePageContent: {
    metadata: {
      title: "Digest Engine Compliance",
      description:
        "A trust-center style overview of security, privacy, uptime, and compliance review information for Digest Engine.",
    },
    hero: {
      title: "Security and compliance information for buyer review",
      description:
        "This Trust Center provides an overview of the security, reliability, and privacy practices governing Digest Engine. It covers the key controls regarding encryption, uptime, compliance, and our commitment to protecting your data.",
      note:
        "For any additional information or to request specific reports during procurement, please reach out to our team.",
      checklistEyebrow: "Buyer checklist",
      checklistItems: [{ text: "Encryption in transit and at rest." }],
    },
    highlightsSection: {
      eyebrow: "Core topics",
      title: "The trust signals most SaaS buyers check first",
      description:
        "Our approach provides reliable, specific, and transparent information for your procurement and security diligence.",
      items: [
        {
          title: "Encryption standards",
          description:
            "Document the transport and storage protections you actually use, such as TLS for data in transit, encryption at rest, key-management practices, and how secrets are handled.",
          icon: "lockKeyhole",
        },
      ],
    },
    frameworksSection: {
      eyebrow: "Frameworks",
      title: "Compliance badges and certifications",
      description:
        "We maintain stringent regulatory and framework coverage to ensure your workflows remain secure and fully compliant.",
      items: [
        {
          name: "SOC 2",
          status: "Verified",
          detail:
            "We maintain a SOC 2 Type II report available under NDA for enterprise customers during vendor review.",
        },
      ],
    },
    detailsSection: {
      eyebrow: "Review details",
      title: "Detailed policies to support security diligence",
      description:
        "Our established systems and controls are designed to minimize risk and simplify vendor review cycles.",
      items: [
        {
          title: "Security architecture",
          body: "Our environment is designed with strict separation, continuous monitoring, and least-privilege practices.",
        },
      ],
    },
    contactSection: {
      eyebrow: "Contact",
      title: "Need security answers for procurement?",
      description:
        "Contact the Digest Engine team if you need a security questionnaire, DPA discussion, architecture summary, or a buyer-ready version of this trust center with verified control details.",
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
  getCompliancePageContent: vi.fn(),
}));

import { getCompliancePageContent } from "@/sanity/queries/compliancePage";

describe("CompliancePage", () => {
  beforeEach(() => {
    vi.mocked(getCompliancePageContent).mockResolvedValue(defaultCompliancePageContent);
  });

  it("renders the trust center route with Sanity-backed security topics and frameworks", async () => {
    const markup = renderToStaticMarkup(await CompliancePage());

    expect(markup).toContain("Trust Center");
    expect(markup).toContain("Encryption standards");
    expect(markup).toContain("SOC 2");
    expect(markup).toContain("Verified");
    expect(markup).toContain('href="/signup"');
  });
});

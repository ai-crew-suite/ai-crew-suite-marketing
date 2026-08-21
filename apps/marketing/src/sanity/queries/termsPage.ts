import { createClient, groq } from "next-sanity";

const apiVersion = "2026-05-22";
const dataset = "production";
const projectId = "wiokyeq0";

const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: false,
});

export interface TermsSectionAction {
  label: string;
  href: string;
}

export interface TermsSummaryItem {
  text: string;
}

export interface TermsPolicyItem {
  title: string;
  body: string;
}

export interface TermsPageContent {
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    description: string;
    effectiveDate: string;
  };
  summarySection: {
    items: TermsSummaryItem[];
  };
  policySection: {
    eyebrow: string;
    title: string;
    description: string;
    items: TermsPolicyItem[];
  };
  contactSection: {
    eyebrow: string;
    title: string;
    description: string;
    primaryAction: TermsSectionAction;
    secondaryAction: TermsSectionAction;
  };
}

export const defaultTermsPageContent: TermsPageContent = {
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
      {
        text: "Paid access may be subject to recurring billing and plan-specific limits.",
      },
      {
        text: "This draft should be reviewed by counsel before being treated as final legal text.",
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
        body: "By accessing or using Digest Engine, you agree to these Terms of Service on behalf of yourself or the organization you represent. If you are using the service for a company, newsroom, or other entity, you represent that you have authority to bind that entity to these terms.",
      },
      {
        title: "The service",
        body: "Digest Engine is a software-as-a-service platform for source ingestion, ranking, review workflows, and related editorial or intelligence features. We may modify, improve, or discontinue parts of the service from time to time as the product evolves.",
      },
      {
        title: "Accounts and access",
        body: "You are responsible for maintaining the confidentiality of account credentials, restricting unauthorized access, and ensuring that users in your workspace use the service in compliance with these terms. You must provide accurate account information and promptly update it if it changes.",
      },
      {
        title: "Subscriptions, fees, and billing",
        body: "Paid plans may be billed on a recurring basis under an order form, subscription agreement, or checkout flow. Unless otherwise agreed in writing, fees are non-refundable except where required by law. You are responsible for applicable taxes, and late or unpaid amounts may result in suspension or termination of service access.",
      },
      {
        title: "Customer content",
        body: "You retain ownership of the content, source materials, prompts, uploaded files, and workspace data you submit to the service. You grant us a limited right to host, process, transmit, copy, and display that content only as necessary to provide, secure, support, and improve the service in accordance with our agreements and Privacy Policy.",
      },
      {
        title: "Acceptable use",
        body: "You may not use the service to violate law, infringe intellectual property rights, bypass security controls, interfere with the platform, submit malicious code, misuse another user's account, or process content in a way that violates your contractual, regulatory, or employment obligations. We may suspend access to protect the service, customers, or third parties from harm.",
      },
      {
        title: "Third-party services",
        body: "The service may depend on third-party hosting, model providers, payment processors, analytics vendors, or integrations. We are not responsible for third-party services outside our control, and your use of those services may also be subject to their own terms and policies.",
      },
      {
        title: "Intellectual property",
        body: "We and our licensors retain all rights, title, and interest in Digest Engine, including the software, documentation, branding, and all related intellectual property, except for the rights you retain in your own content. These terms do not grant you any ownership rights in the service itself.",
      },
      {
        title: "Feedback",
        body: "If you provide suggestions, ideas, bug reports, or product feedback, you grant us a worldwide, royalty-free right to use that feedback for any lawful purpose without obligation to you, so long as doing so does not disclose your confidential information in a way that violates our commitments.",
      },
      {
        title: "Disclaimers",
        body: "Except as expressly provided in a written agreement, the service is provided on an as-is and as-available basis. To the maximum extent permitted by law, we disclaim implied warranties including merchantability, fitness for a particular purpose, non-infringement, and uninterrupted or error-free operation.",
      },
      {
        title: "Limitation of liability",
        body: "To the maximum extent permitted by law, neither party will be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, or for loss of profits, revenues, goodwill, data, or business opportunities. Our aggregate liability arising out of or related to the service will not exceed the amounts paid or payable by you for the service during the 12 months before the event giving rise to the claim, unless a different cap is set in a written agreement.",
      },
      {
        title: "Termination",
        body: "You may stop using the service at any time. We may suspend or terminate access for non-payment, material breach, misuse, legal risk, or where continued service would create security or compliance concerns. Upon termination, your right to use the service ends, though provisions that by their nature should survive will remain in effect.",
      },
      {
        title: "Changes to these terms",
        body: "We may update these Terms of Service from time to time. When we do, we will post the revised version on this page and update the effective date. If a change is material, we may also provide notice through the product, by email, or through another reasonable channel.",
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
};

const termsPageQuery = groq`
  *[_type == "termsPage" && _id == "termsPage"][0] {
    metadata,
    hero,
    summarySection,
    policySection,
    contactSection
  }
`;

export async function getTermsPageContent(): Promise<TermsPageContent> {
  try {
    const content = await client.fetch<TermsPageContent | null>(termsPageQuery);

    return content ?? defaultTermsPageContent;
  } catch {
    return defaultTermsPageContent;
  }
}
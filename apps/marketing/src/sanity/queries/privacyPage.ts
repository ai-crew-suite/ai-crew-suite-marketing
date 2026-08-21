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

export interface PrivacySectionAction {
  label: string;
  href: string;
}

export interface PrivacySummaryItem {
  text: string;
}

export interface PrivacyPolicyItem {
  title: string;
  body: string;
}

export interface PrivacyPageContent {
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
    items: PrivacySummaryItem[];
  };
  policySection: {
    eyebrow: string;
    title: string;
    description: string;
    items: PrivacyPolicyItem[];
  };
  contactSection: {
    eyebrow: string;
    title: string;
    description: string;
    primaryAction: PrivacySectionAction;
    secondaryAction: PrivacySectionAction;
  };
}

export const defaultPrivacyPageContent: PrivacyPageContent = {
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
      {
        text: "We do not sell personal information.",
      },
      {
        text: "Customers control the content they choose to process through the platform.",
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
        body: "We collect account details such as name, email address, organization, billing contacts, and workspace configuration. We also collect content you choose to ingest into the service, operational logs, device and browser information, and usage events needed to run, secure, and improve the product.",
      },
      {
        title: "How we use information",
        body: "We use personal information to provide the service, authenticate users, process payments, support customer requests, maintain security, prevent abuse, analyze product performance, and communicate important account, legal, and service updates. We may also use de-identified and aggregated data to understand usage trends and improve the platform.",
      },
      {
        title: "Customer content and AI processing",
        body: "Customer content remains under the control of the customer that submits it. We process source material, metadata, and derived outputs only as needed to provide ranking, summarization, extraction, search, and related product features. Where third-party infrastructure or model providers are used, they act as service providers or subprocessors under appropriate contractual controls.",
      },
      {
        title: "Sharing and disclosure",
        body: "We do not sell personal information. We share information only with service providers that help us operate the platform, with payment processors, with analytics or infrastructure vendors acting on our behalf, when required by law, or as part of a merger, financing, or acquisition. We may disclose information to protect the rights, security, or property of customers, users, or the public when legally permitted.",
      },
      {
        title: "Retention",
        body: "We retain personal information for as long as needed to provide the service, comply with legal obligations, resolve disputes, and enforce agreements. Customers can request deletion of workspace content, and we will remove or anonymize information according to contractual commitments, backup schedules, and legal requirements.",
      },
      {
        title: "Security",
        body: "We use administrative, technical, and physical safeguards designed to protect information against unauthorized access, loss, misuse, or alteration. No method of transmission or storage is completely secure, so we cannot guarantee absolute security, but we design our systems and operational practices to reduce risk and limit access.",
      },
      {
        title: "International transfers",
        body: "If information is transferred across borders, we use appropriate safeguards such as contractual protections and vendor commitments designed to support lawful data transfers. Customers are responsible for configuring the service in ways that match their own regulatory and contractual obligations.",
      },
      {
        title: "Your choices and rights",
        body: "Depending on your location, you may have rights to access, correct, delete, restrict, or export personal information, or to object to certain processing. You may also update profile information within the product or contact us to submit a request. We may need to verify identity before completing certain requests.",
      },
      {
        title: "Changes to this policy",
        body: "We may update this Privacy Policy from time to time to reflect product, legal, or operational changes. When we do, we will post the updated version on this page and revise the effective date. Material changes may also be communicated through the product or by email where appropriate.",
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
};

const privacyPageQuery = groq`
  *[_type == "privacyPage" && _id == "privacyPage"][0] {
    metadata,
    hero,
    summarySection,
    policySection,
    contactSection
  }
`;

export async function getPrivacyPageContent(): Promise<PrivacyPageContent> {
  try {
    const content = await client.fetch<PrivacyPageContent | null>(privacyPageQuery);

    return content ?? defaultPrivacyPageContent;
  } catch {
    return defaultPrivacyPageContent;
  }
}
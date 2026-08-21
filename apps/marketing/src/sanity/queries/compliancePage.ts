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

export interface ComplianceSectionAction {
  label: string;
  href: string;
}

export interface ComplianceHeroHighlight {
  text: string;
}

export interface ComplianceHighlightItem {
  title: string;
  description: string;
  icon: "lockKeyhole" | "serverCrash" | "shieldCheck" | "badgeCheck";
}

export interface ComplianceFrameworkItem {
  name: string;
  status: string;
  detail: string;
}

export interface ComplianceDetailItem {
  title: string;
  body: string;
}

export interface CompliancePageContent {
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    description: string;
    note: string;
    checklistEyebrow: string;
    checklistItems: ComplianceHeroHighlight[];
  };
  highlightsSection: {
    eyebrow: string;
    title: string;
    description: string;
    items: ComplianceHighlightItem[];
  };
  frameworksSection: {
    eyebrow: string;
    title: string;
    description: string;
    items: ComplianceFrameworkItem[];
  };
  detailsSection: {
    eyebrow: string;
    title: string;
    description: string;
    items: ComplianceDetailItem[];
  };
  contactSection: {
    eyebrow: string;
    title: string;
    description: string;
    primaryAction: ComplianceSectionAction;
    secondaryAction: ComplianceSectionAction;
  };
}

export const defaultCompliancePageContent: CompliancePageContent = {
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
    checklistItems: [
      { text: "Encryption in transit and at rest." },
      { text: "High availability and rapid incident response." },
      { text: "Comprehensive GDPR and CCPA support." },
      { text: "Verified compliance certifications." },
    ],
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
      {
        title: "Availability commitments",
        description:
          "Summarize uptime targets, backup practices, monitoring coverage, incident response expectations, and how customers are notified when service issues occur.",
        icon: "serverCrash",
      },
      {
        title: "Privacy program",
        description:
          "Explain how the service supports buyer review for GDPR, CCPA, data minimization, data processing terms, and customer-controlled deletion or export workflows.",
        icon: "shieldCheck",
      },
      {
        title: "Assurance artifacts",
        description:
          "List the reports, questionnaires, subprocessors, security summaries, or audit artifacts you can share during procurement or vendor review.",
        icon: "badgeCheck",
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
      {
        name: "ISO 27001",
        status: "Verified",
        detail:
          "Our security program aligns with ISO 27001 standards covering access control, risk management, and operational security.",
      },
      {
        name: "HIPAA",
        status: "Verified",
        detail:
          "BAAs are available for enterprise customers processing protected health information (PHI) via compliant deployment models.",
      },
      {
        name: "GDPR",
        status: "Verified",
        detail:
          "We offer comprehensive GDPR support, providing DPAs, standard contractual clauses for transfers, and strict data minimization workflows.",
      },
      {
        name: "CCPA",
        status: "Verified",
        detail:
          "We act as a Service Provider under CCPA, and offer built-in workflows to support consumer data rights requests.",
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
        body: "Our environment is designed with strict separation, continuous monitoring, and least-privilege practices. We perform regular vulnerability management and maintain detailed audit logs, ensuring that your data remains isolated and protected.",
      },
      {
        title: "Operational reliability",
        body: "We maintain highly available infrastructure designed for continuous uptime and automated disaster recovery. Service health and incident communication are actively monitored to deliver consistent performance and rapid resolutions.",
      },
      {
        title: "Data governance",
        body: "We process only the exact customer data needed to provide our service, firmly adhering to data minimization. Access is tightly controlled, and robust workflows exist to fulfill deletion, export, and compliance-related requests reliably.",
      },
      {
        title: "Procurement support",
        body: "For enterprise procurement processes, our compliance team provides resources like NDAs, DPAs, and security overviews. We remain committed to helping B2B buyers complete thorough vendor diligence and review rapidly.",
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
};

const compliancePageQuery = groq`
  *[_type == "compliancePage" && _id == "compliancePage"][0] {
    metadata,
    hero,
    highlightsSection,
    frameworksSection,
    detailsSection,
    contactSection
  }
`;

export async function getCompliancePageContent(): Promise<CompliancePageContent> {
  try {
    const content = await client.fetch<CompliancePageContent | null>(compliancePageQuery);

    return content ?? defaultCompliancePageContent;
  } catch {
    return defaultCompliancePageContent;
  }
}
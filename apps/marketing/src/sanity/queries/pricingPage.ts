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

export interface PricingPageAction {
  text: string;
  link: string;
}

export interface PricingMatrixRow {
  feature: string;
  values: string[];
}

export interface PricingFaqItem {
  question: string;
  answer: string;
}

export interface PricingCtaHighlight {
  step: string;
  title: string;
  description: string;
}

export interface PricingPageContent {
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryAction: PricingPageAction;
    secondaryAction: PricingPageAction;
  };
  highlightsSection: {
    items: string[];
  };
  matrixSection: {
    heading: string;
    description: string;
    columns: string[];
    rows: PricingMatrixRow[];
  };
  faqSection: {
    heading: string;
    description: string;
    items: PricingFaqItem[];
  };
  ctaSection: {
    eyebrow: string;
    title: string;
    description: string;
    badges: string[];
    primaryAction: PricingPageAction;
    highlights: PricingCtaHighlight[];
  };
}

export const defaultPricingPageContent: PricingPageContent = {
  metadata: {
    title: "Digest Engine Pricing",
    description: "Pricing, plan comparison, and rollout guidance for Digest Engine.",
  },
  hero: {
    eyebrow: "Pricing",
    title: "Pricing that fits the way your newsroom actually works",
    description:
      "Start with the open-source stack, move into a shared editorial workspace, or hand off the infrastructure entirely. Every tier keeps the project-scoped workflow intact so you do not have to relearn the product as you grow.",
    primaryAction: {
      text: "Start Your First Project",
      link: "/signup",
    },
    secondaryAction: {
      text: "Read the docs",
      link: "/docs/reference/overview",
    },
  },
  highlightsSection: {
    items: [
      "Open source foundation",
      "Project-scoped ranking and review",
      "Upgrade without changing your workflow",
    ],
  },
  matrixSection: {
    heading: "Compare plans at a glance",
    description:
      "Use this matrix as a starting point for evaluation. We can tune packaging and limits later, but these examples show how the plans differ in practice.",
    columns: ["Open Source", "Team", "Hosted", "Enterprise"],
    rows: [
      {
        feature: "Deployment",
        values: ["Self-hosted", "Shared cloud", "Managed hosting", "Private cloud or on-prem"],
      },
      {
        feature: "Editor seats",
        values: ["Unlimited", "Up to 3", "Up to 10", "Custom"],
      },
      {
        feature: "Review queue",
        values: ["Included", "Included", "Included", "Included"],
      },
      {
        feature: "Inbound newsletter parsing",
        values: ["Manual setup", "Guided setup", "Included", "Included"],
      },
      {
        feature: "Model configuration",
        values: ["Bring your own", "Shared presets", "Managed defaults", "Custom model policy"],
      },
      {
        feature: "Support",
        values: ["Community", "Priority email", "Managed support", "SLA + onboarding"],
      },
    ],
  },
  faqSection: {
    heading: "Pricing FAQ",
    description:
      "These are the questions most teams ask before choosing a plan. We can refine the details once you decide how hands-on you want to be.",
    items: [
      {
        question: "Can we start open source and upgrade later?",
        answer:
          "Yes. The workflow stays consistent across plans, so teams can start self-hosted and move into Team, Hosted, or Enterprise when they want less operational overhead.",
      },
      {
        question: "Do all plans support project-specific ranking?",
        answer:
          "Yes. Project-scoped relevance, review queues, and source configuration are part of the core product rather than premium-only add-ons.",
      },
      {
        question: "Can we use our own models and data sources?",
        answer:
          "Yes. The open-source and enterprise paths are especially flexible, but every tier is designed to work with the sources and model setup that match your editorial process.",
      },
    ],
  },
  ctaSection: {
    eyebrow: "Start your first project",
    title: "Turn scattered feeds into a shortlist you can trust.",
    description:
      "Connect the sources you already trust, train one project on your editorial taste, and let the next issue start with ranked content, summaries, and a draft outline instead of a pile of tabs.",
    badges: [
      "Project-scoped ranking",
      "Editorial memory",
      "Draft-ready research",
    ],
    primaryAction: {
      text: "Start Your First Project",
      link: "/signup",
    },
    highlights: [
      {
        step: "01",
        title: "Rank the signal",
        description:
          "Pull your sources into one project and get a shortlist shaped by what your editorial team actually trusts.",
      },
      {
        step: "02",
        title: "Keep the context",
        description:
          "Entity summaries, source history, and authority cues stay attached so every candidate story arrives with useful framing.",
      },
      {
        step: "03",
        title: "Start from a draft",
        description:
          "Move from ranked research to a draft outline without rebuilding the same judgment call from scratch every week.",
      },
    ],
  },
};

const pricingPageQuery = groq`
  *[_type == "pricingPage" && _id == "pricingPage"][0] {
    metadata,
    hero,
    highlightsSection,
    matrixSection,
    faqSection,
    ctaSection
  }
`;

export async function getPricingPageContent(): Promise<PricingPageContent> {
  try {
    const content = await client.fetch<PricingPageContent | null>(pricingPageQuery);

    return content ?? defaultPricingPageContent;
  } catch {
    return defaultPricingPageContent;
  }
}
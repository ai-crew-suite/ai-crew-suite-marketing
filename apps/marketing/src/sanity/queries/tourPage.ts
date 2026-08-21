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

export interface TourPageAction {
  text: string;
  link: string;
}

export interface TourHighlightItem {
  text: string;
}

export interface TourWorkflowStep {
  title: string;
  description: string;
}

export interface TourCapabilityItem {
  title: string;
  description: string;
  icon: "sparkles" | "messageSquareQuote" | "blocks" | "fileSearch";
}

export interface TourCtaHighlight {
  step: string;
  title: string;
  description: string;
}

export interface TourPageContent {
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryAction: TourPageAction;
    secondaryAction: TourPageAction;
  };
  highlightsSection: {
    heading: string;
    items: TourHighlightItem[];
  };
  workflowSection: {
    eyebrow: string;
    title: string;
    description: string;
    steps: TourWorkflowStep[];
  };
  capabilitiesSection: {
    eyebrow: string;
    title: string;
    description: string;
    link: TourPageAction;
    items: TourCapabilityItem[];
  };
  ctaSection: {
    eyebrow: string;
    title: string;
    description: string;
    badges: string[];
    primaryAction: TourPageAction;
    highlights: TourCtaHighlight[];
  };
}

export const defaultTourPageContent: TourPageContent = {
  metadata: {
    title: "Digest Engine Tour",
    description:
      "A quick walkthrough of how Digest Engine ingests, ranks, reviews, and turns source material into editorial output.",
  },
  hero: {
    eyebrow: "Product tour",
    title: "See how Digest Engine turns raw signals into editorial-ready intelligence.",
    description:
      "This is the fast walk-through: sources come in, AI ranks and enriches them per project, editors review the results, and teams publish with more context and less manual triage.",
    primaryAction: {
      text: "Start Your First Project",
      link: "/signup",
    },
    secondaryAction: {
      text: "View pricing",
      link: "/pricing",
    },
  },
  highlightsSection: {
    heading: "What teams get",
    items: [
      {
        text: "One intake layer for newsletters, feeds, and web sources.",
      },
      {
        text: "Relevance tuned to each project instead of one global ranking.",
      },
      {
        text: "Clear review checkpoints before summaries or outputs go live.",
      },
      {
        text: "Entity-aware context that helps stories connect across time.",
      },
    ],
  },
  workflowSection: {
    eyebrow: "Workflow",
    title: "Three stages from source intake to finished output.",
    description:
      "The platform is designed to reduce repetitive triage without hiding the editorial reasoning.",
    steps: [
      {
        title: "Ingest the sources that already matter",
        description:
          "Bring in newsletters, RSS feeds, websites, and internal sources without forcing every team into the same editorial workflow.",
      },
      {
        title: "Score what matters per project",
        description:
          "Digest Engine ranks relevance against each project's goals, so the strongest signals rise without burying niche but important work.",
      },
      {
        title: "Review, refine, and publish with context",
        description:
          "Editors keep the final say with transparent summaries, entity context, review queues, and handoff-ready outputs.",
      },
    ],
  },
  capabilitiesSection: {
    eyebrow: "Capabilities",
    title: "Built for teams that need stronger signals, not just more summaries.",
    description:
      "The tour page is intentionally compact, but these are the patterns that tend to matter most in production.",
    link: {
      text: "Explore the docs",
      link: "/docs/reference/overview",
    },
    items: [
      {
        title: "Project-aware ranking",
        description:
          "Each team can train relevance independently instead of sharing one generic scoring model.",
        icon: "sparkles",
      },
      {
        title: "Human review by default",
        description:
          "The workflow surfaces confidence and uncertainty so editors can intervene before anything ships.",
        icon: "messageSquareQuote",
      },
      {
        title: "Composable AI skills",
        description:
          "Classification, summarization, extraction, and scoring can be mixed without locking you into one model stack.",
        icon: "blocks",
      },
      {
        title: "Traceable source context",
        description:
          "Every recommendation can be tied back to source material, entities, and ranking evidence.",
        icon: "fileSearch",
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

const tourPageQuery = groq`
  *[_type == "tourPage" && _id == "tourPage"][0] {
    metadata,
    hero,
    highlightsSection,
    workflowSection,
    capabilitiesSection,
    ctaSection
  }
`;

export async function getTourPageContent(): Promise<TourPageContent> {
  try {
    const content = await client.fetch<TourPageContent | null>(tourPageQuery);

    return content ?? defaultTourPageContent;
  } catch {
    return defaultTourPageContent;
  }
}
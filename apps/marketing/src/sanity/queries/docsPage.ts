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

export type DocsHighlightIconKey =
  | "panelsTopLeft"
  | "orbit"
  | "bookOpen"
  | "shieldCheck";

export interface DocsPageAction {
  text: string;
  link: string;
}

export interface DocsPageHighlight {
  title: string;
  description: string;
  iconKey: DocsHighlightIconKey;
  href: string;
}

export interface DocsPageContent {
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    badge: string;
    title: string;
    description: string;
    primaryAction: DocsPageAction;
    secondaryAction: DocsPageAction;
  };
  highlightsSection: {
    items: DocsPageHighlight[];
  };
}

export const defaultDocsPageContent: DocsPageContent = {
  metadata: {
    title: "Digest Engine Docs",
    description: "Product documentation, implementation notes, and architecture guidance for Digest Engine.",
  },
  hero: {
    badge: "Documentation",
    title: "A dedicated docs landing page for the builders using Digest Engine.",
    description:
      "This route is now a custom entry point instead of the root MDX document, so you can style /docs separately from the deeper reference pages.",
    primaryAction: {
      text: "Start Your First Project",
      link: "/signup",
    },
    secondaryAction: {
      text: "Back to Home",
      link: "/",
    },
  },
  highlightsSection: {
    items: [
      {
        title: "User Guide",
        description:
          "Start with the day-to-day workflow for projects, sources, queues, and the editorial loop inside Digest Engine.",
        iconKey: "panelsTopLeft",
        href: "/docs/user-guide/overview",
      },
      {
        title: "Developer Guide",
        description:
          "Understand how ingestion, ranking, review queues, and drafting fit together before you wire the system into your stack.",
        iconKey: "orbit",
        href: "/docs/developer-guide/overview",
      },
      {
        title: "Reference",
        description:
          "Use the deeper MDX docs for implementation details while this landing page stays focused on orientation and navigation.",
        iconKey: "bookOpen",
        href: "/docs/reference/overview",
      },
      {
        title: "Admin Guide",
        description:
          "Go straight to installation, configuration, operations, and access management when you are running the platform.",
        iconKey: "shieldCheck",
        href: "/docs/admin-guide/overview",
      },
    ],
  },
};

const docsPageQuery = groq`
  *[_type == "docsPage" && _id == "docsPage"][0] {
    metadata,
    hero,
    highlightsSection
  }
`;

export async function getDocsPageContent(): Promise<DocsPageContent> {
  try {
    const content = await client.fetch<DocsPageContent | null>(docsPageQuery);

    return content ?? defaultDocsPageContent;
  } catch {
    return defaultDocsPageContent;
  }
}
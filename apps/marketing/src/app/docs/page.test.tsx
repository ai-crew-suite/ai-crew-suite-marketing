import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { defaultDocsPageContent } from "@/sanity/queries/docsPage";

vi.mock("@/sanity/queries/docsPage", () => ({
  defaultDocsPageContent: {
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
  },
  getDocsPageContent: vi.fn(),
}));

import { getDocsPageContent } from "@/sanity/queries/docsPage";

import DocsHomePage from "./page";

describe("DocsHomePage", () => {
  beforeEach(() => {
    vi.mocked(getDocsPageContent).mockResolvedValue(defaultDocsPageContent);
  });

  it("renders the custom docs landing page", async () => {
    const markup = renderToStaticMarkup(await DocsHomePage());

    expect(markup).toContain("Documentation");
    expect(markup).toContain(defaultDocsPageContent.hero.title);
    expect(markup).toContain('href="/docs/user-guide/overview"');
    expect(markup).toContain('href="/docs/developer-guide/overview"');
    expect(markup).toContain('href="/docs/reference/overview"');
    expect(markup).toContain('href="/docs/admin-guide/overview"');
    expect(markup).toContain('href="/signup"');
    expect(markup).toContain('href="/"');
  });
});

import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { defaultTourPageContent } from "@/sanity/queries/tourPage";

vi.mock("@/sanity/queries/tourPage", () => ({
  defaultTourPageContent: {
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
      ],
    },
    ctaSection: {
      eyebrow: "Start your first project",
      title: "Turn scattered feeds into a shortlist you can trust.",
      description:
        "Connect the sources you already trust, train one project on your editorial taste, and let the next issue start with ranked content, summaries, and a draft outline instead of a pile of tabs.",
      badges: ["Project-scoped ranking"],
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
      ],
    },
  },
  getTourPageContent: vi.fn(),
}));

import { getTourPageContent } from "@/sanity/queries/tourPage";

import TourPage from "./page";

describe("TourPage", () => {
  beforeEach(() => {
    vi.mocked(getTourPageContent).mockResolvedValue(defaultTourPageContent);
  });

  it("renders the tour route with Sanity-backed workflow and capabilities sections", async () => {
    const markup = renderToStaticMarkup(await TourPage());

    expect(markup).toContain("Product tour");
    expect(markup).toContain("Three stages from source intake to finished output.");
    expect(markup).toContain("Project-aware ranking");
    expect(markup).toContain("Turn scattered feeds into a shortlist you can trust.");
    expect(markup).toContain('href="/signup"');
    expect(markup).toContain('href="/docs/reference/overview"');
  });
});

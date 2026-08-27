// Default content for the AI Crew Suite documentation landing page
export type DocsPageContent = {
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    badge: string;
    title: string;
    description: string;
    primaryAction: {
      text: string;
      link: string;
    };
    secondaryAction: {
      text: string;
      link: string;
    };
  };
  highlightsSection: {
    items: Array<{
      title: string;
      description: string;
      iconKey: "panelsTopLeft" | "orbit" | "bookOpen" | "shieldCheck" | "zap" | "cog";
      href: string;
    }>;
  };
};

export const defaultDocsPageContent: DocsPageContent = {
  metadata: {
    title: "AI Crew Suite Documentation",
    description: "Comprehensive documentation for the AI Crew Suite - eighteen agentic workflow plugins for Spotify's Backstage IDP.",
  },
  hero: {
    badge: "Documentation",
    title: "Build intelligent workflows with AI Crew Suite for Backstage",
    description:
      "Explore the complete documentation for our monorepo of eighteen agentic workflow plugins. Learn how to automate incident response, optimize alerts, and gain insights from your catalog with deterministic, safe AI agents.",
    primaryAction: {
      text: "Get Started",
      link: "/docs/getting-started",
    },
    secondaryAction: {
      text: "Back to Home",
      link: "/",
    },
  },
  highlightsSection: {
    items: [
      {
        title: "Incident Response",
        description: "Automated diagnostic and tuning agents for Kubernetes incidents and alert fatigue management.",
        iconKey: "shieldCheck",
        href: "/docs/incident-response",
      },
      {
        title: "Catalog Insights",
        description: "Conversational interface for answering operational questions about any Software Catalog entity.",
        iconKey: "orbit",
        href: "/docs/catalog",
      },
      {
        title: "Operations",
        description: "Agentic workflow plugins for daily operations, maintenance, and optimization tasks.",
        iconKey: "cog",
        href: "/docs/operations",
      },
      {
        title: "Developer Guide",
        description: "Learn how to extend, customize, and integrate AI Crew Suite plugins into your Backstage instance.",
        iconKey: "bookOpen",
        href: "/docs/developer-guide",
      },
    ],
  },
};
import { TourPageContent } from "./tourTypes";

export const defaultTourPageContent: TourPageContent = {
  metadata: {
    title: "AI Crew Suite Tour",
    description:
      "A quick walkthrough of how AI Crew Suite extends Backstage with AI-powered developer experience capabilities.",
  },
  hero: {
    eyebrow: "Product tour",
    title: "See how AI Crew Suite transforms Backstage with intelligent developer experiences.",
    description:
      "This is the fast walk-through: AI agents integrate with Backstage, enhance developer workflows, provide intelligent insights, and automate routine tasks—all while keeping your existing plugins and data.",
    primaryAction: {
      text: "Get Started",
      link: "/signup",
    },
    secondaryAction: {
      text: "Learn more",
      link: "/docs",
    },
  },
  highlightsSection: {
    heading: "What teams get",
    items: [
      {
        text: "AI-powered developer experience enhancements for Backstage.",
      },
      {
        text: "Intelligent code reviews, documentation generation, and issue triage.",
      },
      {
        text: "Seamless integration with existing Backstage plugins and catalog.",
      },
      {
        text: "Open‑source, extensible architecture built on the Backstage plugin system.",
      },
    ],
  },
  workflowSection: {
    eyebrow: "Workflow",
    title: "Three stages from integration to intelligent automation.",
    description:
      "The suite is designed to augment developer workflows without disrupting existing processes.",
    steps: [
      {
        title: "Integrate with your Backstage instance",
        description:
          "Add AI Crew Suite as plugins to your existing Backstage deployment. The suite works alongside your catalog, techdocs, and other plugins.",
      },
      {
        title: "Configure AI agents for your workflows",
        description:
          "Set up AI agents for code review, documentation assistance, incident response, or custom tasks. Each agent can be trained on your codebase and practices.",
      },
      {
        title: "Let AI enhance developer productivity",
        description:
          "Developers receive intelligent suggestions, automated documentation, proactive issue detection, and contextual assistance directly within Backstage.",
      },
    ],
  },
  capabilitiesSection: {
    eyebrow: "Capabilities",
    title: "Built for teams that need smarter workflows, not just more tools.",
    description:
      "The tour page is intentionally compact, but these are the patterns that tend to matter most in production Backstage deployments.",
    link: {
      text: "Explore the docs",
      link: "/docs/reference/overview",
    },
    items: [
      {
        title: "Intelligent code review",
        description:
          "AI agents review pull requests, suggest improvements, and flag potential issues based on your team’s conventions and past decisions.",
        icon: "sparkles",
      },
      {
        title: "Documentation automation",
        description:
          "Generate and update techdocs, READMEs, and API documentation automatically as your codebase evolves.",
        icon: "fileSearch",
      },
      {
        title: "Developer assistance",
        description:
          "Context‑aware AI assistants answer questions about your codebase, suggest fixes, and guide developers through complex tasks.",
        icon: "messageSquareQuote",
      },
      {
        title: "Plugin‑ready architecture",
        description:
          "Build custom AI agents and workflows using the same plugin system that powers Backstage. Extend, compose, and adapt as needed.",
        icon: "blocks",
      },
    ],
  },
  ctaSection: {
    eyebrow: "Start your first project",
    title: "Turn your Backstage instance into an intelligent developer platform.",
    description:
      "Add AI Crew Suite plugins, configure your first AI agent, and see how intelligent automation can elevate your team’s productivity within a week.",
    badges: ["Backstage‑native", "Open‑source", "Extensible"],
    primaryAction: {
      text: "Get Started",
      link: "/signup",
    },
    highlights: [
      {
        step: "01",
        title: "Integrate the suite",
        description:
          "Add AI Crew Suite plugins to your Backstage deployment. Works with existing plugins and catalog.",
      },
      {
        step: "02",
        title: "Configure your agents",
        description:
          "Set up AI agents for code review, documentation, incident response, or custom workflows.",
      },
      {
        step: "03",
        title: "See the impact",
        description:
          "Watch developer productivity improve with intelligent suggestions, automation, and contextual assistance.",
      },
    ],
  },
};
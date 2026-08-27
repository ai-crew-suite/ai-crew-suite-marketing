export type TourPageContent = {
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
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
    heading: string;
    items: Array<{
      text: string;
    }>;
  };
  workflowSection: {
    eyebrow: string;
    title: string;
    description: string;
    steps: Array<{
      title: string;
      description: string;
    }>;
  };
  capabilitiesSection: {
    eyebrow: string;
    title: string;
    description: string;
    link: {
      text: string;
      link: string;
    };
    items: Array<{
      title: string;
      description: string;
      icon: "blocks" | "fileSearch" | "messageSquareQuote" | "sparkles";
    }>;
  };
  ctaSection: {
    eyebrow: string;
    title: string;
    description: string;
    badges: string[];
    primaryAction: {
      text: string;
      link: string;
    };
    highlights: Array<{
      step: string;
      title: string;
      description: string;
    }>;
  };
};
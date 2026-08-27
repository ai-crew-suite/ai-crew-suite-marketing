export type FooterComponentContent = {
  description: string;
  primaryAction: {
    text: string;
    link: string;
  };
  secondaryAction: {
    text: string;
    link: string;
  };
  productLinks: Array<{
    href: string;
    label: string;
  }>;
  legalLinks: Array<{
    href: string;
    label: string;
  }>;
};

export const defaultFooterComponentContent: FooterComponentContent = {
  description: "AI Crew Suite supercharges your Backstage developer portal with AI-powered workflows. Automate software delivery, infrastructure management, and developer onboarding with intelligent agents.",
  primaryAction: {
    text: "Start Your First Project",
    link: "/signup",
  },
  secondaryAction: {
    text: "Read the Docs",
    link: "/docs",
  },
  productLinks: [
    { href: "/tour", label: "How It Works" },
    { href: "/docs", label: "Docs" },
    { href: "/blog", label: "Blog" },
    { href: "/pricing", label: "Pricing" },
  ],
  legalLinks: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

export async function getFooterComponentContent(): Promise<FooterComponentContent> {
  return defaultFooterComponentContent;
}
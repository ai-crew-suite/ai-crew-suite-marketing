export type GlobalErrorPageContent = {
  eyebrow: string;
  title: string;
  description: string;
  imageAlt: string;
  referenceLabel: string;
  retryButtonText: string;
  homeButtonLabel: string;
  homeButtonHref: string;
  recoveryLinks: Array<{
    href: string;
    label: string;
    description: string;
  }>;
};

export const defaultGlobalErrorPageContent: GlobalErrorPageContent = {
  eyebrow: "Error",
  title: "AI Crew Suite hit an unexpected problem",
  description:
    "We logged the failure for review. You can retry this route now, head back to the homepage, or use one of the main site paths below.",
  imageAlt: "AI Crew Suite error illustration",
  referenceLabel: "Reference",
  retryButtonText: "Try again",
  homeButtonLabel: "Return home",
  homeButtonHref: "/",
  recoveryLinks: [
    {
      href: "/tour",
      label: "How It Works",
      description:
        "Walk back through the product tour while the failed route reloads in a fresh tab or session.",
    },
    {
      href: "/docs",
      label: "Docs",
      description:
        "Open the current docs set for setup guidance, product notes, and implementation details.",
    },
    {
      href: "/signup",
      label: "Sign Up",
      description:
        "Return to the evaluation flow if you were trying to request access or start a rollout conversation.",
    },
  ],
};

// For backward compatibility with the async function that used to fetch from Sanity
export async function getGlobalErrorPageContent(): Promise<GlobalErrorPageContent> {
  return defaultGlobalErrorPageContent;
}
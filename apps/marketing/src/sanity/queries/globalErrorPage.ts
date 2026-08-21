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

export interface GlobalErrorRecoveryLink {
  description: string;
  href: string;
  label: string;
}

export interface GlobalErrorPageContent {
  description: string;
  eyebrow: string;
  homeButtonHref: string;
  homeButtonLabel: string;
  imageAlt: string;
  recoveryLinks: GlobalErrorRecoveryLink[];
  referenceLabel: string;
  retryButtonText: string;
  title: string;
}

export const defaultGlobalErrorPageContent: GlobalErrorPageContent = {
  eyebrow: "Error",
  title: "Digest Engine hit an unexpected problem",
  description:
    "We logged the failure for review. You can retry this route now, head back to the homepage, or use one of the main site paths below.",
  imageAlt: "Digest Engine error illustration",
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
      href: "/pricing",
      label: "Pricing",
      description:
        "Double-check the hosted and self-managed rollout paths if that is where you were headed.",
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

const globalErrorPageQuery = groq`
  *[_type == "globalErrorPage" && _id == "globalErrorPage"][0] {
    eyebrow,
    title,
    description,
    imageAlt,
    referenceLabel,
    retryButtonText,
    homeButtonLabel,
    homeButtonHref,
    recoveryLinks
  }
`;

export async function getGlobalErrorPageContent(): Promise<GlobalErrorPageContent> {
  try {
    const content = await client.fetch<GlobalErrorPageContent | null>(globalErrorPageQuery);

    return content ?? defaultGlobalErrorPageContent;
  } catch {
    return defaultGlobalErrorPageContent;
  }
}
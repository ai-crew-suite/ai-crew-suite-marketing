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

export interface SignupPageAction {
  text: string;
  link: string;
}

export interface SignupPageContent {
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    badge: string;
    title: string;
    description: string;
    primaryAction: SignupPageAction;
    secondaryAction: SignupPageAction;
    highlights: string[];
  };
  nextStepsSection: {
    eyebrow: string;
    title: string;
    description: string;
    items: string[];
  };
}

export const defaultSignupPageContent: SignupPageContent = {
  metadata: {
    title: "Digest Engine Sign Up",
    description: "Request access to Digest Engine and tell us how your editorial workflow works today.",
  },
  hero: {
    badge: "Sign up",
    title: "Start with a workflow that learns your editorial taste",
    description:
      "Digest Engine is designed for editors who want better sourcing, stronger prioritization, and less blank-page friction. Fill out the form and we will help you start with the right setup.",
    primaryAction: {
      text: "Compare plans",
      link: "/pricing",
    },
    secondaryAction: {
      text: "Read the docs",
      link: "/docs/reference/overview",
    },
    highlights: [
      "Project-scoped ranking from day one",
      "Support for RSS, social, and newsletter sources",
      "A faster path from shortlist to draft",
    ],
  },
  nextStepsSection: {
    eyebrow: "What happens next",
    title: "A typical rollout starts small and gets useful quickly",
    description:
      "Most teams begin with one editorial workflow, one source mix, and one issue cycle. That is enough to see whether the ranking and review loop fit your process.",
    items: [
      "We review your workflow and source mix.",
      "We point you to the right plan or setup path.",
      "You start with one project and one issue cycle.",
    ],
  },
};

const signupPageQuery = groq`
  *[_type == "signupPage" && _id == "signupPage"][0] {
    metadata,
    hero,
    nextStepsSection
  }
`;

export async function getSignupPageContent(): Promise<SignupPageContent> {
  try {
    const content = await client.fetch<SignupPageContent | null>(signupPageQuery);

    return content ?? defaultSignupPageContent;
  } catch {
    return defaultSignupPageContent;
  }
}
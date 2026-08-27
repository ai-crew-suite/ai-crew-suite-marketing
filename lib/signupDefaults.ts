export type SignupPageContent = {
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    badge: string;
    title: string;
    description: string;
    primaryAction: {
      link: string;
      text: string;
    };
    secondaryAction: {
      link: string;
      text: string;
    };
    highlights: string[];
  };
  nextStepsSection: {
    eyebrow: string;
    title: string;
    description: string;
    items: string[];
  };
};

export const defaultSignupPageContent: SignupPageContent = {
  metadata: {
    title: "Sign Up | AI Crew Suite",
    description: "Get started with AI-powered workflow automation for your Backstage developer portal.",
  },
  hero: {
    badge: "Get Started",
    title: "Start automating your Backstage workflows",
    description:
      "Connect your plugins, train your project on your team's workflow preferences, and let AI Crew Suite handle the rest.",
    primaryAction: {
      link: "/signup",
      text: "Create Your Account",
    },
    secondaryAction: {
      link: "/tour",
      text: "See How It Works",
    },
    highlights: [
      "No credit card required",
      "14-day free trial",
      "Self‑hosting options",
    ],
  },
  nextStepsSection: {
    eyebrow: "What's next",
    title: "After you sign up",
    description: "Here's what you can expect once you create your account.",
    items: [
      "Connect your Backstage plugins",
      "Train your first workflow",
      "Deploy your first automated pipeline",
    ],
  },
};

export async function getSignupPageContent(): Promise<SignupPageContent> {
  return defaultSignupPageContent;
}
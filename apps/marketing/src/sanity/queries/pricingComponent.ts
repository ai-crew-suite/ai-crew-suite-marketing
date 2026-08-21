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

export interface PricingComponentPlan {
  name: string;
  monthlyPrice: number;
  description: string;
  features: string[];
  link: string;
  buttonLabel: string;
  buttonVariant: "default" | "outline";
  isPopular: boolean;
}

export interface PricingComponentContent {
  title: string;
  description: string;
  annualDiscount: number;
  plans: PricingComponentPlan[];
}

export const defaultPricingComponentContent: PricingComponentContent = {
  title: "Pick the operating model that fits your stack",
  description:
    "Start open source, move to a hosted workflow later, or keep the whole pipeline in your own infrastructure from day one.",
  annualDiscount: 20,
  plans: [
    {
      name: "Team",
      monthlyPrice: 149,
      description:
        "A shared editorial workspace for small newsletter teams shipping every week.",
      features: [
        "3 editor seats",
        "Review queue tooling",
        "Reference corpus training",
        "Priority updates",
      ],
      link: "/signup",
      buttonLabel: "Request access",
      buttonVariant: "outline",
      isPopular: false,
    },
    {
      name: "Hosted",
      monthlyPrice: 399,
      description:
        "Managed infrastructure for editors who want the workflow without running the ops layer.",
      features: [
        "Managed upgrades",
        "Inbound newsletter parsing",
        "Team collaboration",
        "Email support",
      ],
      link: "/signup",
      buttonLabel: "Join waitlist",
      buttonVariant: "default",
      isPopular: true,
    },
    {
      name: "Enterprise",
      monthlyPrice: 1499,
      description:
        "Private deployment, custom plugins, and security review for larger media or research orgs.",
      features: [
        "VPC or on-prem",
        "Custom source plugins",
        "SLA-backed support",
        "Migration help",
      ],
      link: "/signup",
      buttonLabel: "Contact Sales",
      buttonVariant: "outline",
      isPopular: false,
    },
    {
      name: "Open Source",
      monthlyPrice: 0,
      description:
        "For teams that want full control and are happy to run the stack themselves.",
      features: [
        "Unlimited projects",
        "Docker Compose setup",
        "Bring your own models",
        "Community support",
      ],
      link: "https://github.com/webstackdev/digest-engine",
      buttonLabel: "Start self-hosting",
      buttonVariant: "outline",
      isPopular: false,
    },
  ],
};

const pricingComponentQuery = groq`
  *[_type == "pricingComponent" && _id == "pricingComponent"][0] {
    title,
    description,
    annualDiscount,
    plans
  }
`;

export async function getPricingComponentContent(): Promise<PricingComponentContent> {
  try {
    const content = await client.fetch<PricingComponentContent | null>(pricingComponentQuery);

    return content ?? defaultPricingComponentContent;
  } catch {
    return defaultPricingComponentContent;
  }
}
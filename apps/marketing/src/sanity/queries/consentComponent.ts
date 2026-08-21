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

export interface ConsentOptionContent {
  eyebrow: string;
  status: string;
  description: string;
}

export interface ConsentLinkContent {
  href: string;
  label: string;
}

export interface ConsentComponentContent {
  badge: string;
  title: string;
  description: string;
  essentialOption: ConsentOptionContent;
  marketingOption: ConsentOptionContent;
  policyLink: ConsentLinkContent;
  essentialOnlyButtonText: string;
  acceptAllButtonText: string;
}

export const defaultConsentComponentContent: ConsentComponentContent = {
  badge: "Cookie preferences",
  title: "Choose how the site stores consent preferences",
  description:
    "Essential cookies are always enabled so the site can function correctly. Marketing cookies are optional and are used for campaign measurement and related outreach workflows.",
  essentialOption: {
    eyebrow: "Essential",
    status: "Always active",
    description:
      "Needed for basic site operation, saved preferences, and security-related behavior.",
  },
  marketingOption: {
    eyebrow: "Marketing",
    status: "Optional",
    description:
      "Used for campaign attribution, promotional analytics, and similar marketing activities.",
  },
  policyLink: {
    href: "/cookies",
    label: "Read the cookie policy",
  },
  essentialOnlyButtonText: "Essential only",
  acceptAllButtonText: "Accept all cookies",
};

const consentComponentQuery = groq`
  *[_type == "consentComponent" && _id == "consentComponent"][0] {
    badge,
    title,
    description,
    essentialOption,
    marketingOption,
    policyLink,
    essentialOnlyButtonText,
    acceptAllButtonText
  }
`;

export async function getConsentComponentContent(): Promise<ConsentComponentContent> {
  try {
    const content = await client.fetch<ConsentComponentContent | null>(consentComponentQuery);

    return content ?? defaultConsentComponentContent;
  } catch {
    return defaultConsentComponentContent;
  }
}
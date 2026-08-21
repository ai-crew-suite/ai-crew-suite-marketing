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

export interface FooterLinkItem {
  href: string;
  label: string;
}

export interface FooterAction {
  text: string;
  link: string;
}

export interface FooterComponentContent {
  description: string;
  primaryAction: FooterAction;
  secondaryAction: FooterAction;
  productLinks: FooterLinkItem[];
  legalLinks: FooterLinkItem[];
}

export const defaultFooterComponentContent: FooterComponentContent = {
  description:
    "Train one project on your editorial taste and start each issue with a ranked shortlist, summaries, and a draft outline instead of a research scramble.",
  primaryAction: {
    text: "Start Your First Project",
    link: "/signup",
  },
  secondaryAction: {
    text: "Read the docs",
    link: "/docs",
  },
  productLinks: [
    { href: "/tour", label: "How It Works" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
    { href: "/docs", label: "Docs" },
  ],
  legalLinks: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: "/cookies", label: "Cookies" },
    { href: "/compliance", label: "Compliance" },
  ],
};

const footerComponentQuery = groq`
  *[_type == "footerComponent" && _id == "footerComponent"][0] {
    description,
    primaryAction,
    secondaryAction,
    productLinks,
    legalLinks
  }
`;

export async function getFooterComponentContent(): Promise<FooterComponentContent> {
  try {
    const content = await client.fetch<FooterComponentContent | null>(footerComponentQuery);

    return content ?? defaultFooterComponentContent;
  } catch {
    return defaultFooterComponentContent;
  }
}
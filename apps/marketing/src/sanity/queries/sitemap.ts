import { cache } from "react";
import { createClient, groq } from "next-sanity";

const apiVersion = "2026-05-22";
const dataset = "production";
const projectId = "wiokyeq0";
const token = process.env.SANITY_API_READ_TOKEN?.trim() || process.env.SANITY_API_WRITE_TOKEN?.trim() || undefined;

const client = createClient({
  apiVersion,
  dataset,
  projectId,
  token,
  useCdn: false,
});

export const sitemapSingletonDocumentTypes = [
  "homePage",
  "blogPage",
  "compliancePage",
  "cookiesPage",
  "docsPage",
  "pricingPage",
  "privacyPage",
  "signupPage",
  "termsPage",
  "tourPage",
] as const;

export type SitemapSingletonDocumentType = (typeof sitemapSingletonDocumentTypes)[number];

export interface SitemapSingletonPage {
  documentType: SitemapSingletonDocumentType;
  lastModified: string;
}

export interface SitemapContentPage {
  slug: string;
  lastModified: string;
}

export interface SitemapContent {
  singletonPages: SitemapSingletonPage[];
  blogPages: SitemapContentPage[];
  docsPages: SitemapContentPage[];
}

const defaultSitemapContent: SitemapContent = {
  singletonPages: [],
  blogPages: [],
  docsPages: [],
};

const sitemapQuery = groq`
  {
    "singletonPages": *[_type in $singletonDocumentTypes] {
      "documentType": _type,
      "lastModified": _updatedAt
    },
    "blogPages": *[_type == "blogContentPage" && defined(slug.current)]
      | order(_updatedAt desc, slug.current asc) {
        "slug": slug.current,
        "lastModified": _updatedAt
      },
    "docsPages": *[_type == "docsContentPage" && defined(slug.current)]
      | order(slug.current asc) {
        "slug": slug.current,
        "lastModified": _updatedAt
      }
  }
`;

/** Returns the Sanity-backed route inventory used by the App Router sitemap. */
export const getSitemapContent = cache(async (): Promise<SitemapContent> => {
  try {
    const content = await client.fetch<Partial<SitemapContent> | null>(sitemapQuery, {
      singletonDocumentTypes: [...sitemapSingletonDocumentTypes],
    });

    return {
      singletonPages: content?.singletonPages ?? [],
      blogPages: content?.blogPages ?? [],
      docsPages: content?.docsPages ?? [],
    };
  } catch {
    return defaultSitemapContent;
  }
});
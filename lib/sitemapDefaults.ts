import { defaultBlogContentPages } from "./blogDefaults";

export type SitemapContentPage = {
  slug: string;
  lastModified?: string;
};

export type SitemapSingletonDocument = {
  documentType: string;
  lastModified?: string;
};

export type SitemapContent = {
  singletonPages: SitemapSingletonDocument[];
  blogPages: SitemapContentPage[];
  docsPages: SitemapContentPage[];
};

export const defaultSitemapContent: SitemapContent = {
  singletonPages: [
    { documentType: "homePage", lastModified: "2026-08-27T00:00:00.000Z" },
    { documentType: "blogPage", lastModified: "2026-08-27T00:00:00.000Z" },
    { documentType: "docsPage", lastModified: "2026-08-27T00:00:00.000Z" },
    { documentType: "tourPage", lastModified: "2026-08-27T00:00:00.000Z" },
    { documentType: "signupPage", lastModified: "2026-08-27T00:00:00.000Z" },
    { documentType: "compliancePage", lastModified: "2026-08-27T00:00:00.000Z" },
    { documentType: "privacyPage", lastModified: "2026-08-27T00:00:00.000Z" },
    { documentType: "termsPage", lastModified: "2026-08-27T00:00:00.000Z" },
    { documentType: "cookiesPage", lastModified: "2026-08-27T00:00:00.000Z" },
  ],
  blogPages: defaultBlogContentPages.map((page) => ({
    slug: page.slug.current,
    lastModified: page.publishedAt 
      ? new Date(page.publishedAt).toISOString()
      : "2026-08-27T00:00:00.000Z",
  })),
  docsPages: [], // Docs pages are not yet hardcoded
};
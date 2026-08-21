import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site";
import {
  getSitemapContent,
  type SitemapContentPage,
  type SitemapSingletonDocumentType,
} from "@/sanity/queries/sitemap";

export const dynamic = "force-static";

type SitemapRouteDefinition = {
  path: string;
  documentType: SitemapSingletonDocumentType;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
};

const fallbackLastModified = new Date("2026-06-02T00:00:00.000Z");

const staticRouteDefinitions: SitemapRouteDefinition[] = [
  { path: "/", documentType: "homePage", changeFrequency: "weekly", priority: 1 },
  { path: "/pricing", documentType: "pricingPage", changeFrequency: "weekly", priority: 0.9 },
  { path: "/tour", documentType: "tourPage", changeFrequency: "weekly", priority: 0.9 },
  { path: "/blog", documentType: "blogPage", changeFrequency: "weekly", priority: 0.85 },
  { path: "/docs", documentType: "docsPage", changeFrequency: "weekly", priority: 0.85 },
  { path: "/signup", documentType: "signupPage", changeFrequency: "monthly", priority: 0.8 },
  { path: "/compliance", documentType: "compliancePage", changeFrequency: "monthly", priority: 0.7 },
  { path: "/privacy", documentType: "privacyPage", changeFrequency: "monthly", priority: 0.7 },
  { path: "/terms", documentType: "termsPage", changeFrequency: "monthly", priority: 0.7 },
  { path: "/cookies", documentType: "cookiesPage", changeFrequency: "monthly", priority: 0.6 },
];

function toAbsoluteUrl(path: string): string {
  return path === "/" ? siteUrl : `${siteUrl}${path}`;
}

function toLastModified(value?: string): Date {
  if (!value) {
    return fallbackLastModified;
  }

  const parsed = new Date(value);

  return Number.isNaN(parsed.getTime()) ? fallbackLastModified : parsed;
}

function buildContentRoute(
  basePath: "/blog" | "/docs",
  entry: SitemapContentPage,
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>,
  priority: number,
): MetadataRoute.Sitemap[number] {
  return {
    url: `${siteUrl}${basePath}/${entry.slug.replace(/^\/+|\/+$/gu, "")}`,
    lastModified: toLastModified(entry.lastModified),
    changeFrequency,
    priority,
  };
}

/** Builds the public marketing sitemap from Sanity-managed singleton and content pages. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getSitemapContent();
  const singletonLastModifiedByType = new Map(
    content.singletonPages.map((page) => [page.documentType, page.lastModified]),
  );

  return [
    ...staticRouteDefinitions.map((route) => ({
      url: toAbsoluteUrl(route.path),
      lastModified: toLastModified(singletonLastModifiedByType.get(route.documentType)),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...content.blogPages.map((entry) => buildContentRoute("/blog", entry, "weekly", 0.7)),
    ...content.docsPages.map((entry) => buildContentRoute("/docs", entry, "monthly", 0.65)),
  ];
}

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

export interface DocsContentSpan {
  _type: string;
  _key?: string;
  text?: string;
  marks?: string[];
}

export interface DocsContentMarkDef {
  _key: string;
  _type: string;
  href?: string;
}

export interface DocsContentBlock {
  _type: string;
  _key?: string;
  style?: string;
  children?: DocsContentSpan[];
  markDefs?: DocsContentMarkDef[];
  listItem?: string;
  level?: number;
}

export interface DocsContentPage {
  title: string;
  description: string;
  slug: {
    current: string;
  };
  sourcePath: string;
  body: DocsContentBlock[];
}

export interface DocsContentPageListItem {
  title: string;
  slug: {
    current: string;
  };
  sourcePath: string;
}

export const docsSectionOrder = [
  "user-guide",
  "developer-guide",
  "admin-guide",
  "reference",
] as const;

export const docsSectionTitles: Record<(typeof docsSectionOrder)[number], string> = {
  "user-guide": "User Guide",
  "developer-guide": "Developer Guide",
  "admin-guide": "Admin Guide",
  reference: "API Reference",
};

const docsContentPageQuery = groq`
  *[_type == "docsContentPage" && slug.current == $slug][0] {
    title,
    description,
    slug,
    sourcePath,
    body
  }
`;

const docsContentPagesQuery = groq`
  *[_type == "docsContentPage"] | order(sourcePath asc) {
    title,
    slug,
    sourcePath
  }
`;

export async function getDocsContentPage(slug: string): Promise<DocsContentPage | null> {
  try {
    return await client.fetch<DocsContentPage | null>(docsContentPageQuery, { slug });
  } catch {
    return null;
  }
}

export async function getDocsContentPages(): Promise<DocsContentPageListItem[]> {
  try {
    return await client.fetch<DocsContentPageListItem[]>(docsContentPagesQuery);
  } catch {
    return [];
  }
}
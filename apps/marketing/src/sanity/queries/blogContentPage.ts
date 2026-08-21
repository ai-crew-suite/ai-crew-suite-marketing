import { createClient, groq } from "next-sanity";

import type { SanityImageObject } from "@/sanity/image";

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

export interface BlogContentSpan {
  _type: string;
  _key?: string;
  text?: string;
  marks?: string[];
}

export interface BlogContentMarkDef {
  _key: string;
  _type: string;
  href?: string;
}

export interface BlogContentBlock {
  _type: string;
  _key?: string;
  style?: string;
  children?: BlogContentSpan[];
  markDefs?: BlogContentMarkDef[];
  listItem?: string;
  level?: number;
}

export interface BlogContentPage {
  title: string;
  description: string;
  publishedAt?: string;
  slug: {
    current: string;
  };
  sourcePath: string;
  heroImage?: SanityImageObject;
  previewImage?: SanityImageObject;
  body: BlogContentBlock[];
}

export interface BlogContentPageListItem {
  title: string;
  description?: string;
  slug: {
    current: string;
  };
  publishedAt?: string;
  sourcePath: string;
  heroImage?: SanityImageObject;
  previewImage?: SanityImageObject;
}

const blogContentPageQuery = groq`
  *[_type == "blogContentPage" && slug.current == $slug][0] {
    title,
    description,
    publishedAt,
    slug,
    sourcePath,
    heroImage,
    previewImage,
    body
  }
`;

const blogContentPagesQuery = groq`
  *[_type == "blogContentPage"] | order(publishedAt desc, sourcePath asc) {
    title,
    description,
    publishedAt,
    slug,
    sourcePath,
    heroImage,
    previewImage
  }
`;

export async function getBlogContentPage(slug: string): Promise<BlogContentPage | null> {
  try {
    return await client.fetch<BlogContentPage | null>(blogContentPageQuery, { slug });
  } catch {
    return null;
  }
}

export async function getBlogContentPages(): Promise<BlogContentPageListItem[]> {
  try {
    return await client.fetch<BlogContentPageListItem[]>(blogContentPagesQuery);
  } catch {
    return [];
  }
}
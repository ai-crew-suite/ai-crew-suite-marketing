import type { StaticImageData } from "next/image";

export type BlogPageContent = {
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    badge: string;
    title: string;
    description: string;
  };
  postsSection: {
    fallbackDescription: string;
  };
};

export type BlogContentPage = {
  title: string;
  description?: string;
  publishedAt?: string;
  slug: {
    current: string;
  };
  sourcePath?: string;
  previewImage: StaticImageData | string;
};

// New types for markdown-based blog posts
export type BlogPageFrontmatter = {
  title: string;
  description?: string;
  publishedAt?: string;
  previewImage?: string;
  author?: string;
  tags?: string[];
};

export type BlogPageContentMarkdown = {
  slug: string;
  frontmatter: BlogPageFrontmatter;
  content: string;
  headings: { depth: number; value: string; id: string }[];
};

export type BlogPageListItem = {
  title: string;
  slug: string;
  description?: string;
  publishedAt?: string;
  previewImage?: string;
  author?: string;
  tags?: string[];
};
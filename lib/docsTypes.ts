import type { ReactNode } from "react";

export type DocsPageFrontmatter = {
  layout?: string;
  title: string;
  parent?: string;
  plugin_name?: string;
  subcategory?: string;
  description?: string;
};

export type DocsPageContent = {
  slug: string;
  frontmatter: DocsPageFrontmatter;
  content: string;
  headings: { depth: number; value: string; id: string }[];
};

export type DocsSidebarItem = {
  title: string;
  href: string;
};

export type DocsSidebarSection = {
  title: string;
  items: DocsSidebarItem[];
};

export type DocsPageListItem = {
  title: string;
  slug: string;
  parent?: string;
  subcategory?: string;
};
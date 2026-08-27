import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import type { DocsPageContent, DocsPageListItem } from "./docsTypes";

const docsDirectory = path.join(process.cwd(), "content/docs");

function slugifyHeading(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

function extractHeadings(markdown: string): { depth: number; value: string; id: string }[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings = [];
  let match;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const depth = match[1].length;
    const value = match[2].trim();
    // Remove any inline code backticks
    const cleanValue = value.replace(/`/g, "");
    headings.push({
      depth,
      value: cleanValue,
      id: slugifyHeading(cleanValue),
    });
  }
  return headings;
}

async function readAllDocsPages(): Promise<DocsPageContent[]> {
  const files = await fs.readdir(docsDirectory);
  const mdFiles = files.filter((file) => file.endsWith(".md"));
  const pages = await Promise.all(
    mdFiles.map(async (file) => {
      const slug = file.replace(/\.md$/, "");
      const filePath = path.join(docsDirectory, file);
      const source = await fs.readFile(filePath, "utf-8");
      const { data, content } = matter(source);
      const frontmatter = data as Record<string, any>;
      const headings = extractHeadings(content);
      return {
        slug,
        frontmatter: {
          layout: frontmatter.layout,
          title: frontmatter.title || slug,
          parent: frontmatter.parent,
          plugin_name: frontmatter.plugin_name,
          subcategory: frontmatter.subcategory,
          description: frontmatter.description,
        },
        content,
        headings,
      };
    })
  );
  return pages;
}

export const getAllDocsPages = cache(async (): Promise<DocsPageContent[]> => {
  return await readAllDocsPages();
});

export const getDocsPage = cache(async (slug: string): Promise<DocsPageContent | null> => {
  const pages = await getAllDocsPages();
  return pages.find((page) => page.slug === slug) || null;
});

export const getDocsPageList = cache(async (): Promise<DocsPageListItem[]> => {
  const pages = await getAllDocsPages();
  return pages.map((page) => ({
    title: page.frontmatter.title,
    slug: page.slug,
    parent: page.frontmatter.parent,
    subcategory: page.frontmatter.subcategory,
  }));
});

// Section ordering and titles - derived from parent values
export const getDocsSectionOrder = cache(async (): Promise<string[]> => {
  const pages = await getAllDocsPages();
  const parents = Array.from(new Set(pages.map((p) => p.frontmatter.parent).filter(Boolean))) as string[];
  // Sort alphabetically, could be customized later
  return parents.sort();
});

export const getDocsSectionTitles = cache(async (): Promise<Record<string, string>> => {
  const pages = await getAllDocsPages();
  const parents = Array.from(new Set(pages.map((p) => p.frontmatter.parent).filter(Boolean))) as string[];
  const titles: Record<string, string> = {};
  parents.forEach((parent) => {
    titles[parent] = parent; // Use parent as title, could be mapped differently
  });
  return titles;
});
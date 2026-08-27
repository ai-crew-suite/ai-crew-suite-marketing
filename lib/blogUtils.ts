import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import type { BlogPageContentMarkdown, BlogPageFrontmatter, BlogPageListItem } from "./blogTypes";

const blogDirectory = path.join(process.cwd(), "content/blog");

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

function slugifyHeading(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

async function readAllBlogPages(): Promise<BlogPageContentMarkdown[]> {
  const files = await fs.readdir(blogDirectory);
  const mdFiles = files.filter((file) => file.endsWith(".md"));
  const pages = await Promise.all(
    mdFiles.map(async (file) => {
      const slug = file.replace(/\.md$/, "");
      const filePath = path.join(blogDirectory, file);
      const source = await fs.readFile(filePath, "utf-8");
      const { data, content } = matter(source);
      const frontmatter = data as Record<string, any>;
      const headings = extractHeadings(content);
      return {
        slug,
        frontmatter: {
          title: frontmatter.title || slug,
          description: frontmatter.description,
          publishedAt: frontmatter.publishedAt,
          previewImage: frontmatter.previewImage,
          author: frontmatter.author,
          tags: frontmatter.tags || [],
        },
        content,
        headings,
      };
    })
  );
  return pages;
}

export const getAllBlogPages = cache(async (): Promise<BlogPageContentMarkdown[]> => {
  return await readAllBlogPages();
});

export const getBlogPage = cache(async (slug: string): Promise<BlogPageContentMarkdown | null> => {
  const pages = await getAllBlogPages();
  return pages.find((page) => page.slug === slug) || null;
});

function parseDate(dateStr: string | undefined): Date | null {
  if (!dateStr) return null;
  try {
    return new Date(dateStr);
  } catch {
    return null;
  }
}

export const getBlogPageList = cache(async (): Promise<BlogPageListItem[]> => {
  const pages = await getAllBlogPages();
  const items = pages.map((page) => ({
    title: page.frontmatter.title,
    slug: page.slug,
    description: page.frontmatter.description,
    publishedAt: page.frontmatter.publishedAt,
    previewImage: page.frontmatter.previewImage,
    author: page.frontmatter.author,
    tags: page.frontmatter.tags,
  }));
  
  // Sort by publishedAt descending (newest first)
  items.sort((a, b) => {
    const dateA = parseDate(a.publishedAt);
    const dateB = parseDate(b.publishedAt);
    if (dateA && dateB) return dateB.getTime() - dateA.getTime();
    if (dateA) return -1;
    if (dateB) return 1;
    return 0;
  });
  
  return items;
});
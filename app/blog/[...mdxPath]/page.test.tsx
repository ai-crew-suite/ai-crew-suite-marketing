import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { blogImageMap } from "@/lib/blogDefaults";

vi.mock("@/lib/blogDefaults", () => ({
  blogImageMap: {
    "feature-01": { src: "/assets/images/feature-01.jpg" },
    "feature-02": { src: "/assets/images/feature-02.jpg" },
    "feature-03": { src: "/assets/images/feature-03.jpg" },
  },
}));

vi.mock("@/lib/blogUtils", () => ({
  getAllBlogPages: vi.fn(),
  getBlogPage: vi.fn(),
}));

import { getAllBlogPages, getBlogPage } from "@/lib/blogUtils";

describe("Blog catch-all page", () => {
  const mockBlogPage = {
    slug: "introducing-ai-crew-suite",
    frontmatter: {
      title: "Introducing AI Crew Suite: Eighteen agentic workflow plugins for Backstage",
      description: "A deep dive into the architecture and philosophy behind our monorepo of agentic workflow plugins for Spotify's Backstage IDP.",
      publishedAt: "August 27, 2026",
      previewImage: "feature-01",
    },
    content: "# Introducing AI Crew Suite\n\nToday we're excited to announce the release of **AI Crew Suite**...",
    headings: [
      { depth: 1, value: "Introducing AI Crew Suite", id: "introducing-ai-crew-suite" },
      { depth: 2, value: "Core Architecture Principles", id: "core-architecture-principles" },
    ],
  };

  beforeEach(() => {
    vi.mocked(getAllBlogPages).mockResolvedValue([mockBlogPage]);
    vi.mocked(getBlogPage).mockResolvedValue(mockBlogPage);
  });

  it("builds static params from markdown blog article slugs", async () => {
    const { generateStaticParams } = await import("./page");

    const params = await generateStaticParams();
    
    expect(params).toEqual([
      { mdxPath: ["introducing-ai-crew-suite"] },
    ]);
  });

  it("loads the requested blog article from markdown content", async () => {
    const { default: BlogArticlePage } = await import("./page");
    const markup = renderToStaticMarkup(
      await BlogArticlePage({ params: Promise.resolve({ 
        mdxPath: ["introducing-ai-crew-suite"] 
      }) }),
    );

    expect(markup).toContain(mockBlogPage.frontmatter.title);
    expect(markup).toContain(mockBlogPage.frontmatter.description);
    expect(markup).toContain(mockBlogPage.frontmatter.publishedAt);
    expect(markup).toContain("Blog");
    expect(markup).toContain("Introducing AI Crew Suite");
    expect(markup).toContain("Core Architecture Principles");
  });

  it("maps blog article content into next metadata", async () => {
    const { generateMetadata } = await import("./page");
    const metadata = await generateMetadata({
      params: Promise.resolve({ 
        mdxPath: ["introducing-ai-crew-suite"] 
      }),
    });

    expect(metadata.title).toBe(mockBlogPage.frontmatter.title);
    expect(metadata.description).toBe(mockBlogPage.frontmatter.description);
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      title: mockBlogPage.frontmatter.title,
      description: mockBlogPage.frontmatter.description,
    });
    expect(metadata.twitter).toMatchObject({
      title: mockBlogPage.frontmatter.title,
      description: mockBlogPage.frontmatter.description,
    });
  });
});

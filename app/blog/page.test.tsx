import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { defaultBlogPageContent, defaultBlogContentPages, getBlogContentPages } from "@/lib/blogDefaults";
import BlogHomePage from "./page";

vi.mock("@/lib/blogDefaults", async (importOriginal) => {
  const actual = await importOriginal() as any;
  return {
    ...actual,
    getBlogContentPages: vi.fn(),
  };
});

describe("Blog home page", () => {
  it("renders article cards from hardcoded blog content", async () => {
    vi.mocked(getBlogContentPages).mockResolvedValue(defaultBlogContentPages);
    
    const markup = renderToStaticMarkup(await BlogHomePage());

    expect(markup).toContain(defaultBlogPageContent.hero.title);
    expect(markup).toContain(defaultBlogPageContent.hero.description);
    expect(markup).toContain(defaultBlogPageContent.hero.badge);
    
    // Check that all blog posts are rendered
    defaultBlogContentPages.forEach((post) => {
      expect(markup).toContain(post.title);
      if (post.description) {
        expect(markup).toContain(post.description);
      }
      expect(markup).toContain(`href="/blog/${post.slug.current}"`);
    });
    
    expect(markup).toContain("Read article");
  });
});

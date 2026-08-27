import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { defaultBlogPageContent, defaultBlogContentPages } from "@/lib/blogDefaults";
import BlogHomePage from "./page";

describe("Blog home page", () => {
  it("renders article cards from hardcoded blog content", async () => {
    const markup = renderToStaticMarkup(<BlogHomePage />);

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

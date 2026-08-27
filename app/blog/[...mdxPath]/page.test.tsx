import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { defaultBlogContentPages } from "@/lib/blogDefaults";

describe("Blog catch-all page", () => {
  it("builds static params from hardcoded blog article slugs", async () => {
    const { generateStaticParams } = await import("./page");

    const params = await generateStaticParams();
    
    expect(params).toEqual(
      defaultBlogContentPages.map((page) => ({
        mdxPath: page.slug.current.split("/").filter(Boolean),
      }))
    );
  });

  it("loads the requested blog article from hardcoded content", async () => {
    const page = defaultBlogContentPages[0];
    const { default: BlogArticlePage } = await import("./page");
    const markup = renderToStaticMarkup(
      await BlogArticlePage({ params: Promise.resolve({ 
        mdxPath: page.slug.current.split("/").filter(Boolean) 
      }) }),
    );

    expect(markup).toContain(page.title);
    expect(markup).toContain(page.description || "");
    if (page.publishedAt) {
      expect(markup).toContain(page.publishedAt);
    }
    expect(markup).toContain("Blog");
    expect(markup).toContain("placeholder");
  });

  it("maps blog article content into next metadata", async () => {
    const page = defaultBlogContentPages[0];
    const { generateMetadata } = await import("./page");
    const metadata = await generateMetadata({
      params: Promise.resolve({ 
        mdxPath: page.slug.current.split("/").filter(Boolean) 
      }),
    });

    expect(metadata.title).toBe(page.title);
    expect(metadata.description).toBe(page.description);
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      title: page.title,
      description: page.description,
    });
    expect(metadata.twitter).toMatchObject({
      title: page.title,
      description: page.description,
    });
  });
});

import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { defaultBlogPageContent } from "@/sanity/queries/blogPage";

vi.mock("@/sanity/queries/blogPage", () => ({
  defaultBlogPageContent: {
    metadata: {
      title: "Digest Engine Blog",
      description: "Product notes, release write-ups, and editorial articles from the Digest Engine team.",
    },
    hero: {
      badge: "Blog",
      title: "Notes, experiments, and launch stories from the Digest Engine team.",
      description:
        "This route stays visually independent from the docs area. Each post can bring its own imagery, voice, and long-form layout while the index page stays optimized for browsing.",
    },
    postsSection: {
      fallbackDescription: "Read the latest post from the Digest Engine team.",
    },
  },
  getBlogPageContent: vi.fn(),
}));

vi.mock("@/sanity/queries/blogContentPage", () => ({
  getBlogContentPages: vi.fn(),
}));

import { getBlogPageContent } from "@/sanity/queries/blogPage";
import { getBlogContentPages } from "@/sanity/queries/blogContentPage";

describe("Blog home page", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.mocked(getBlogPageContent).mockResolvedValue(defaultBlogPageContent);
    vi.mocked(getBlogContentPages).mockReset();
  });

  it("renders article cards from Sanity blog content pages", async () => {
    vi.mocked(getBlogContentPages).mockResolvedValue([
      {
        title: "Authority-Aware Ranking",
        description: undefined,
        publishedAt: "May 15, 2026",
        slug: {
          current: "authority-aware-ranking",
        },
        sourcePath: "authority-aware-ranking/index.mdx",
        previewImage: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: "image-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-1000x500-jpg",
          },
        },
      },
    ]);

    const { default: BlogHomePage } = await import("./page");
    const markup = renderToStaticMarkup(await BlogHomePage());

    expect(getBlogPageContent).toHaveBeenCalled();
  expect(getBlogContentPages).toHaveBeenCalled();
    expect(markup).toContain("Authority-Aware Ranking");
    expect(markup).toContain('href="/blog/authority-aware-ranking"');
    expect(markup).toContain(defaultBlogPageContent.postsSection.fallbackDescription);
    expect(markup).toContain("Read article");
    expect(markup).toContain("relative w-full overflow-hidden mx-auto max-w-6xl rounded-4xl");
    expect(markup).toContain("mx-auto grid w-full max-w-6xl gap-6 overflow-hidden");
  });
});

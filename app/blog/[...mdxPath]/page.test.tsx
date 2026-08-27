import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/sanity/queries/blogContentPage", () => ({
  getBlogContentPage: vi.fn(),
  getBlogContentPages: vi.fn(),
}));

vi.mock("@/sanity/queries/brandSettings", () => ({
  getBrandSettingsContent: vi.fn(),
}));

import {
  getBlogContentPage,
  getBlogContentPages,
} from "@/sanity/queries/blogContentPage";
import { getBrandSettingsContent } from "@/sanity/queries/brandSettings";

describe("Blog catch-all page", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.mocked(getBlogContentPage).mockReset();
    vi.mocked(getBlogContentPages).mockReset();
    vi.mocked(getBrandSettingsContent).mockReset();
    vi.mocked(getBlogContentPages).mockResolvedValue([
      {
        title: "Authority-Aware Ranking",
        description: "A real post.",
        publishedAt: "May 15, 2026",
        slug: { current: "authority-aware-ranking" },
        sourcePath: "authority-aware-ranking/index.mdx",
      },
    ]);
    vi.mocked(getBrandSettingsContent).mockResolvedValue({
      tagline: "The research desk for your newsletter",
    });
  });

  it("builds static params from Sanity blog article slugs", async () => {
    const { generateStaticParams } = await import("./page");

    await expect(generateStaticParams()).resolves.toEqual([
      { mdxPath: ["authority-aware-ranking"] },
    ]);
  });

  it("loads the requested Sanity blog article", async () => {
    vi.mocked(getBlogContentPage).mockResolvedValue({
        title: "Authority-Aware Ranking",
        description: "A real post.",
        publishedAt: "May 15, 2026",
        slug: { current: "authority-aware-ranking" },
        sourcePath: "authority-aware-ranking/index.mdx",
        heroImage: {
          _type: "image",
          asset: { _type: "reference", _ref: "image-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-1000x500-jpg" },
        },
        previewImage: {
          _type: "image",
          asset: { _type: "reference", _ref: "image-bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb-1000x500-jpg" },
        },
        body: [
          {
            _type: "block",
            _key: "heading",
            style: "h1",
            children: [{ _type: "span", _key: "heading-span", text: "Authority-Aware Ranking" }],
            markDefs: [],
          },
          {
            _type: "block",
            _key: "body",
            style: "normal",
            children: [{ _type: "span", _key: "body-span", text: "Sample blog body" }],
            markDefs: [],
          },
          {
            _type: "code",
            _key: "code-block",
            code: "console.log('hello blog')",
            language: "ts",
          },
        ] as never,
    });

    const { default: BlogArticlePage } = await import("./page");
    const markup = renderToStaticMarkup(
      await BlogArticlePage({ params: Promise.resolve({ mdxPath: ["authority-aware-ranking"] }) }),
    );

    expect(getBlogContentPage).toHaveBeenCalledWith("authority-aware-ranking");
    expect(markup).toContain("Sample blog body");
    expect(markup).toContain("May 15, 2026");
    expect(markup).toContain("language-ts");
    expect(markup).toContain("console.log(&#x27;hello blog&#x27;)");
  });

  it("maps Sanity article content into next metadata", async () => {
    vi.mocked(getBlogContentPage).mockResolvedValue({
        title: "Authority-Aware Ranking",
        description: "A real post.",
        publishedAt: "May 15, 2026",
        slug: { current: "authority-aware-ranking" },
        sourcePath: "authority-aware-ranking/index.mdx",
        heroImage: {
          _type: "image",
          asset: { _type: "reference", _ref: "image-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-1000x500-jpg" },
        },
        previewImage: {
          _type: "image",
          asset: { _type: "reference", _ref: "image-bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb-1000x500-jpg" },
        },
        body: [],
    });

    const { generateMetadata } = await import("./page");
    const metadata = await generateMetadata({
      params: Promise.resolve({ mdxPath: ["authority-aware-ranking"] }),
    });

    expect(metadata.title).toBe("Authority-Aware Ranking");
    expect(metadata.description).toBe("A real post.");
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      title: "Authority-Aware Ranking",
      description: "A real post.",
    });
  });
});

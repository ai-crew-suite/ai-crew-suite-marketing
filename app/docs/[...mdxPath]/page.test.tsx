import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/sanity/queries/docsContentPage", () => ({
  getDocsContentPage: vi.fn(),
  getDocsContentPages: vi.fn(),
  docsSectionOrder: ["user-guide", "developer-guide", "admin-guide", "reference"],
  docsSectionTitles: {
    "user-guide": "User Guide",
    "developer-guide": "Developer Guide",
    "admin-guide": "Admin Guide",
    reference: "API Reference",
  },
}));

vi.mock("@/sanity/queries/brandSettings", () => ({
  getBrandSettingsContent: vi.fn(),
}));

import {
  getDocsContentPage,
  getDocsContentPages,
} from "@/sanity/queries/docsContentPage";
import { getBrandSettingsContent } from "@/sanity/queries/brandSettings";

describe("Docs catch-all page", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.mocked(getDocsContentPage).mockReset();
    vi.mocked(getDocsContentPages).mockReset();
    vi.mocked(getBrandSettingsContent).mockReset();
    vi.mocked(getDocsContentPage).mockResolvedValue(null);
    vi.mocked(getDocsContentPages).mockResolvedValue([
      {
        title: "Ingestion Pipeline",
        slug: { current: "reference/pipeline" },
        sourcePath: "reference/pipeline.md",
      },
      {
        title: "Core Algorithms",
        slug: { current: "reference/algorithms" },
        sourcePath: "reference/algorithms.md",
      },
    ]);
    vi.mocked(getBrandSettingsContent).mockResolvedValue({
      tagline: "The research desk for your newsletter",
    });
  });

  it("builds catch-all static params from Sanity docs slugs", async () => {
    const { generateStaticParams } = await import("./page");

    await expect(generateStaticParams()).resolves.toEqual([
      { mdxPath: ["reference", "pipeline"] },
      { mdxPath: ["reference", "algorithms"] },
    ]);
  });

  it("renders the requested Sanity docs page", async () => {
    vi.mocked(getDocsContentPage).mockResolvedValue({
      title: "Ingestion Pipeline",
      description: "How content moves through the system.",
      slug: { current: "reference/pipeline" },
      sourcePath: "reference/pipeline.md",
      body: [
        {
          _type: "block",
          _key: "title",
          style: "h1",
          children: [{ _type: "span", _key: "span-title", text: "Ingestion Pipeline" }],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "paragraph",
          style: "normal",
          children: [{ _type: "span", _key: "span-paragraph", text: "How content moves through the system." }],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "heading",
          style: "h2",
          children: [{ _type: "span", _key: "span-heading", text: "Core Stages" }],
          markDefs: [],
        },
        {
          _type: "code",
          _key: "code-block",
          code: "print('hello docs')",
          language: "python",
        },
      ] as never,
    });

    const { default: Page } = await import("./page");
    const markup = renderToStaticMarkup(
      await Page({ params: Promise.resolve({ mdxPath: ["reference", "pipeline"] }) }),
    );

    expect(markup).toContain('id="docs-content"');
    expect(markup).toContain("Files");
    expect(markup).toContain("Table of Contents");
    expect(markup).toContain("Ingestion Pipeline");
    expect(markup).toContain("Documentation");
    expect(markup).toContain("language-python");
    expect(markup).toContain("print(&#x27;hello docs&#x27;)");
  });

  it("builds table of contents anchors and relative links from Portable Text", async () => {
    vi.mocked(getDocsContentPage).mockResolvedValue({
      title: "Ingestion Pipeline",
      description: "How content moves through the system.",
      slug: { current: "reference/pipeline" },
      sourcePath: "reference/pipeline.md",
      body: [
        {
          _type: "block",
          _key: "title",
          style: "h1",
          children: [{ _type: "span", _key: "span-title", text: "Ingestion Pipeline" }],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "paragraph",
          style: "normal",
          children: [{ _type: "span", _key: "span-paragraph", text: "How content moves through the system." }],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "heading",
          style: "h2",
          children: [{ _type: "span", _key: "span-heading", text: "Core Stages" }],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "link-paragraph",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "span-link",
              text: "Core Algorithms",
              marks: ["algorithms-link"],
            },
          ],
          markDefs: [{ _key: "algorithms-link", _type: "link", href: "algorithms.md" }],
        },
      ],
    });

    const { default: Page } = await import("./page");
    const markup = renderToStaticMarkup(
      await Page({ params: Promise.resolve({ mdxPath: ["reference", "pipeline"] }) }),
    );

    expect(markup).toContain("Ingestion Pipeline");
    expect(markup).toContain('href="#core-stages"');
    expect(markup).toContain('href="/docs/reference/algorithms"');
  });

  it("uses Sanity metadata for migrated docs pages", async () => {
    vi.mocked(getDocsContentPage).mockResolvedValue({
      title: "Ingestion Pipeline",
      description: "How content moves through the system.",
      slug: { current: "reference/pipeline" },
      sourcePath: "reference/pipeline.md",
      body: [],
    });

    const { generateMetadata } = await import("./page");
    const metadata = await generateMetadata({
      params: Promise.resolve({ mdxPath: ["reference", "pipeline"] }),
    });

    expect(metadata.title).toBe("Ingestion Pipeline");
    expect(metadata.description).toBe("How content moves through the system.");
  });
});

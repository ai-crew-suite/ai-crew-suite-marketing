import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/docsUtils", () => ({
  getAllDocsPages: vi.fn(),
  getDocsPage: vi.fn(),
  getDocsPageList: vi.fn(),
}));

vi.mock("@/lib/docsTypes", () => ({
  // types not needed for mocks
}));

import { getAllDocsPages, getDocsPage } from "@/lib/docsUtils";

describe("Docs catch-all page", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.mocked(getDocsPage).mockReset();
    vi.mocked(getAllDocsPages).mockReset();
    vi.mocked(getAllDocsPages).mockResolvedValue([
      {
        slug: "reference/pipeline",
        frontmatter: {
          title: "Ingestion Pipeline",
          description: "How content moves through the system.",
          parent: "reference",
          subcategory: "reference",
        },
        content: "# Ingestion Pipeline\n\nHow content moves through the system.\n\n## Core Stages\n\n```python\nprint('hello docs')\n```",
        headings: [
          { depth: 1, value: "Ingestion Pipeline", id: "ingestion-pipeline" },
          { depth: 2, value: "Core Stages", id: "core-stages" },
        ],
      },
      {
        slug: "reference/algorithms",
        frontmatter: {
          title: "Core Algorithms",
          description: "Algorithms used.",
          parent: "reference",
          subcategory: "reference",
        },
        content: "",
        headings: [],
      },
    ]);
  });

  it("builds catch-all static params from markdown slugs", async () => {
    const { generateStaticParams } = await import("./page");
    await expect(generateStaticParams()).resolves.toEqual([
      { mdxPath: ["reference", "pipeline"] },
      { mdxPath: ["reference", "algorithms"] },
    ]);
  });

  it("renders the requested markdown page", async () => {
    vi.mocked(getDocsPage).mockResolvedValue({
      slug: "reference/pipeline",
      frontmatter: {
        title: "Ingestion Pipeline",
        description: "How content moves through the system.",
        parent: "reference",
        subcategory: "reference",
      },
      content: "# Ingestion Pipeline\n\nHow content moves through the system.\n\n## Core Stages\n\n```python\nprint('hello docs')\n```",
      headings: [
        { depth: 1, value: "Ingestion Pipeline", id: "ingestion-pipeline" },
        { depth: 2, value: "Core Stages", id: "core-stages" },
      ],
    });

    const { default: Page } = await import("./page");
    const markup = renderToStaticMarkup(
      await Page({ params: Promise.resolve({ mdxPath: ["reference", "pipeline"] }) }),
    );

    expect(markup).toContain('id="docs-content"');
    expect(markup).toContain("Documentation");
    expect(markup).toContain("Ingestion Pipeline");
    expect(markup).toContain("language-python");
    expect(markup).toContain("print(&#x27;hello docs&#x27;)");
  });

  it("builds table of contents anchors and relative links from markdown", async () => {
    vi.mocked(getDocsPage).mockResolvedValue({
      slug: "reference/pipeline",
      frontmatter: {
        title: "Ingestion Pipeline",
        description: "How content moves through the system.",
        parent: "reference",
        subcategory: "reference",
      },
      content: "# Ingestion Pipeline\n\nHow content moves through the system.\n\n## Core Stages\n\n[Core Algorithms](algorithms.md)",
      headings: [
        { depth: 1, value: "Ingestion Pipeline", id: "ingestion-pipeline" },
        { depth: 2, value: "Core Stages", id: "core-stages" },
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

  it("uses frontmatter metadata for docs pages", async () => {
    vi.mocked(getDocsPage).mockResolvedValue({
      slug: "reference/pipeline",
      frontmatter: {
        title: "Ingestion Pipeline",
        description: "How content moves through the system.",
        parent: "reference",
        subcategory: "reference",
      },
      content: "",
      headings: [],
    });

    const { generateMetadata } = await import("./page");
    const metadata = await generateMetadata({
      params: Promise.resolve({ mdxPath: ["reference", "pipeline"] }),
    });

    expect(metadata.title).toBe("Ingestion Pipeline");
    expect(metadata.description).toBe("How content moves through the system.");
  });
});

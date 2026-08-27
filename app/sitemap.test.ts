import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/sanity/queries/sitemap", () => ({
  getSitemapContent: vi.fn(),
}));

import { getSitemapContent } from "@/sanity/queries/sitemap";

describe("Marketing sitemap", () => {
  it("declares a force-static route for static export builds", async () => {
    const route = await import("./sitemap");

    expect(route.dynamic).toBe("force-static");
  });

  beforeEach(() => {
    vi.mocked(getSitemapContent).mockReset();
    vi.mocked(getSitemapContent).mockResolvedValue({
      singletonPages: [
        { documentType: "homePage", lastModified: "2026-05-01T10:00:00.000Z" },
        { documentType: "blogPage", lastModified: "2026-05-02T10:00:00.000Z" },
        { documentType: "docsPage", lastModified: "2026-05-03T10:00:00.000Z" },
      ],
      blogPages: [
        { slug: "authority-aware-ranking", lastModified: "2026-05-15T10:00:00.000Z" },
      ],
      docsPages: [
        { slug: "reference/pipeline", lastModified: "2026-05-10T10:00:00.000Z" },
      ],
    });
  });

  it("builds static and Sanity-backed dynamic routes", async () => {
    const { default: sitemap } = await import("./sitemap");

    const routes = await sitemap();

    expect(getSitemapContent).toHaveBeenCalled();
    expect(routes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          url: "https://digestengine.io",
          changeFrequency: "weekly",
          priority: 1,
          lastModified: new Date("2026-05-01T10:00:00.000Z"),
        }),
        expect.objectContaining({
          url: "https://digestengine.io/blog",
          lastModified: new Date("2026-05-02T10:00:00.000Z"),
        }),
        expect.objectContaining({
          url: "https://digestengine.io/docs",
          lastModified: new Date("2026-05-03T10:00:00.000Z"),
        }),
        expect.objectContaining({
          url: "https://digestengine.io/blog/authority-aware-ranking",
          changeFrequency: "weekly",
          priority: 0.7,
          lastModified: new Date("2026-05-15T10:00:00.000Z"),
        }),
        expect.objectContaining({
          url: "https://digestengine.io/docs/reference/pipeline",
          changeFrequency: "monthly",
          priority: 0.65,
          lastModified: new Date("2026-05-10T10:00:00.000Z"),
        }),
      ]),
    );
  });

  it("falls back to the route default timestamp when Sanity has no singleton document", async () => {
    vi.mocked(getSitemapContent).mockResolvedValue({
      singletonPages: [],
      blogPages: [],
      docsPages: [],
    });

    const { default: sitemap } = await import("./sitemap");
    const routes = await sitemap();

    expect(routes).toContainEqual(
      expect.objectContaining({
        url: "https://digestengine.io/pricing",
        lastModified: new Date("2026-06-02T00:00:00.000Z"),
      }),
    );
  });
});
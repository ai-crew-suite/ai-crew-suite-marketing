import { describe, expect, it } from "vitest";

describe("Marketing robots metadata route", () => {
  it("declares a force-static route for static export builds", async () => {
    const route = await import("./robots");

    expect(route.dynamic).toBe("force-static");
  });

  it("returns the expected crawl rules and sitemap location", async () => {
    const { default: robots } = await import("./robots");

    expect(robots()).toEqual({
      rules: {
        userAgent: "*",
        allow: "/",
        disallow: ["/login"],
      },
      sitemap: "https://digestengine.io/sitemap.xml",
    });
  });
});
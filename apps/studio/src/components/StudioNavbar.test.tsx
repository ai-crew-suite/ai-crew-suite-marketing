import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("sanity", () => ({
  useWorkspace: () => ({
    dataset: "production",
    projectId: "wiokyeq0",
    title: "Digest Engine Marketing Studio",
  }),
}));

import { StudioNavbar, buildShortcutLinks } from "./StudioNavbar";

describe("buildShortcutLinks", () => {
  afterEach(() => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.NEXT_PUBLIC_MARKETING_PREVIEW_URL;
  });

  it("builds marketing and docs shortcuts from a site URL", () => {
    expect(buildShortcutLinks("https://digestengine.example/")).toEqual([
      { href: "https://digestengine.example", label: "Open marketing site" },
      { href: "https://digestengine.example/docs", label: "Read docs" },
    ]);
  });

  it("adds the preview shortcut when a preview URL is present", () => {
    expect(buildShortcutLinks("https://digestengine.example", "https://preview.digestengine.example")).toEqual([
      { href: "https://digestengine.example", label: "Open marketing site" },
      { href: "https://digestengine.example/docs", label: "Read docs" },
      { href: "https://preview.digestengine.example", label: "Open preview" },
    ]);
  });
});

describe("StudioNavbar", () => {
  afterEach(() => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.NEXT_PUBLIC_MARKETING_PREVIEW_URL;
  });

  it("renders workspace context and shortcut links before the default navbar", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://digestengine.example";
    process.env.NEXT_PUBLIC_MARKETING_PREVIEW_URL = "https://preview.digestengine.example";

    const markup = renderToStaticMarkup(
      <StudioNavbar
        renderDefault={() => <div>Default navbar</div>}
      /> as never,
    );

    expect(markup).toContain("Digest Engine Marketing Studio");
    expect(markup).toContain("Open marketing site");
    expect(markup).toContain("Read docs");
    expect(markup).toContain("Open preview");
    expect(markup).toContain("Default navbar");
  });
});
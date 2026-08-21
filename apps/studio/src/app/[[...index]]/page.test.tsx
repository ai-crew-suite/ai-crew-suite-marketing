import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/components/Logo", () => ({
  LogoComponent: () => <div>Digest Engine Logo</div>,
}));

vi.mock("./AdminStudio", () => ({
  default: () => <div>Sanity Studio</div>,
}));

import StudioPage from "./page";

describe("StudioPage", () => {
  it("renders the Sanity Studio wrapper", () => {
    const markup = renderToStaticMarkup(<StudioPage />);

    expect(markup).toContain("Digest Engine Logo");
    expect(markup).toContain("Digest Engine Studio");
    expect(markup).toContain("Production dataset");
    expect(markup).toContain("Sanity Studio");
  });
});
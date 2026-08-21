import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({
  default: ({ alt, className, src }: { alt: string; className?: string; src: string | { src: string } }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} className={className} src={typeof src === "string" ? src : src.src} />
  ),
}));

vi.mock("@/sanity/queries/brandSettings", () => ({
  defaultBrandSettingsContent: {
    tagline: "The research desk for your newsletter",
  },
  getBrandSettingsContent: vi.fn(),
}));

vi.mock("@/sanity/queries/consentComponent", () => ({
  getConsentComponentContent: vi.fn(),
}));

vi.mock("@/sanity/queries/footerComponent", () => ({
  getFooterComponentContent: vi.fn(),
}));

vi.mock("@/sanity/queries/headerComponent", () => ({
  getHeaderComponentContent: vi.fn(),
}));

import { getBrandSettingsContent } from "@/sanity/queries/brandSettings";
import { getConsentComponentContent } from "@/sanity/queries/consentComponent";
import { getFooterComponentContent } from "@/sanity/queries/footerComponent";
import { getHeaderComponentContent } from "@/sanity/queries/headerComponent";

describe("Root layout", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.mocked(getBrandSettingsContent).mockResolvedValue({
      tagline: "The research desk for your newsletter",
    });
    vi.mocked(getConsentComponentContent).mockResolvedValue({
      acceptButtonText: "Accept",
      closeButtonText: "Close",
      declineButtonText: "Decline",
      description: "Consent message",
      manageButtonText: "Manage",
      preferencesTitle: "Privacy controls",
      saveButtonText: "Save",
      title: "Privacy controls",
    } as never);
    vi.mocked(getFooterComponentContent).mockResolvedValue({
      description: "Footer description",
      primaryAction: { text: "Start", link: "/signup" },
      secondaryAction: { text: "Docs", link: "/docs" },
      productLinks: [{ href: "/tour", label: "Tour" }],
      legalLinks: [{ href: "/privacy", label: "Privacy" }],
    });
    vi.mocked(getHeaderComponentContent).mockResolvedValue({
      loginButtonText: "Log in",
      navigationItems: [{ href: "/tour", label: "Tour" }],
    });
  });

  it("uses the Sanity tagline for default metadata", async () => {
    const { generateMetadata } = await import("./layout");

    await expect(generateMetadata()).resolves.toMatchObject({
      title: "Digest Engine",
      description: "The research desk for your newsletter",
    });
  });

  it("passes the Sanity tagline into the footer brand area", async () => {
    const { default: RootLayout } = await import("./layout");
    const markup = renderToStaticMarkup(
      await RootLayout({ children: <div>Child content</div> }),
    );

    expect(markup).toContain("The research desk for your newsletter");
    expect(markup).toContain("Footer description");
  });
});
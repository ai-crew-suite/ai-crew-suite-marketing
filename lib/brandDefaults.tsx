export type BrandSettingsContent = {
  tagline: string;
};

export const defaultBrandSettingsContent: BrandSettingsContent = {
  tagline: "AI-powered workflow automation for Backstage developer portals",
};

export async function getBrandSettingsContent(): Promise<BrandSettingsContent> {
  return defaultBrandSettingsContent;
}
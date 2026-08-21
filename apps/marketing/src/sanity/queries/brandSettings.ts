import { cache } from "react";
import { createClient, groq } from "next-sanity";

const apiVersion = "2026-05-22";
const dataset = "production";
const projectId = "wiokyeq0";

const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: false,
});

export interface BrandSettingsContent {
  tagline: string;
}

export const defaultBrandSettingsContent: BrandSettingsContent = {
  tagline: "The research desk for your newsletter",
};

const brandSettingsQuery = groq`
  *[_type == "brandSettings" && _id == "brandSettings"][0] {
    tagline
  }
`;

export const getBrandSettingsContent = cache(async (): Promise<BrandSettingsContent> => {
  try {
    const content = await client.fetch<BrandSettingsContent | null>(brandSettingsQuery);

    return content ?? defaultBrandSettingsContent;
  } catch {
    return defaultBrandSettingsContent;
  }
});
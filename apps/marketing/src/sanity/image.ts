import { createImageUrlBuilder } from "@sanity/image-url";

const dataset = "production";
const projectId = "wiokyeq0";

const imageUrlBuilder = createImageUrlBuilder({
  dataset,
  projectId,
});

export interface SanityImageObject {
  _type?: "image";
  asset?: {
    _ref?: string;
    _type?: "reference";
  };
  crop?: unknown;
  hotspot?: unknown;
}

interface BuildSanityImageUrlOptions {
  fit?: "clip" | "crop" | "fill" | "fillmax" | "max" | "min" | "scale";
  height?: number;
  width?: number;
}

export function buildSanityImageUrl(
  source: SanityImageObject | null | undefined,
  options: BuildSanityImageUrlOptions = {},
) {
  if (!source?.asset?._ref) {
    return null;
  }

  let builder = imageUrlBuilder.image(source as never).auto("format");

  if (options.width) {
    builder = builder.width(options.width);
  }

  if (options.height) {
    builder = builder.height(options.height);
  }

  if (options.fit) {
    builder = builder.fit(options.fit);
  }

  return builder.url();
}
import type { StaticImageData } from "next/image";

export type BlogPageContent = {
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    badge: string;
    title: string;
    description: string;
  };
  postsSection: {
    fallbackDescription: string;
  };
};

export type BlogContentPage = {
  title: string;
  description?: string;
  publishedAt?: string;
  slug: {
    current: string;
  };
  sourcePath?: string;
  previewImage: StaticImageData | string;
};
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

export interface BlogPageContent {
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
}

export const defaultBlogPageContent: BlogPageContent = {
  metadata: {
    title: "Digest Engine Blog",
    description: "Product notes, release write-ups, and editorial articles from the Digest Engine team.",
  },
  hero: {
    badge: "Blog",
    title: "Notes, experiments, and launch stories from the Digest Engine team.",
    description:
      "This route stays visually independent from the docs area. Each post can bring its own imagery, voice, and long-form layout while the index page stays optimized for browsing.",
  },
  postsSection: {
    fallbackDescription: "Read the latest post from the Digest Engine team.",
  },
};

const blogPageQuery = groq`
  *[_type == "blogPage" && _id == "blogPage"][0] {
    metadata,
    hero,
    postsSection
  }
`;

export async function getBlogPageContent(): Promise<BlogPageContent> {
  try {
    const content = await client.fetch<BlogPageContent | null>(blogPageQuery);

    return content ?? defaultBlogPageContent;
  } catch {
    return defaultBlogPageContent;
  }
}
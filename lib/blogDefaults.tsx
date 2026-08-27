import featureImage01 from "@/assets/images/feature-01.jpg";
import featureImage02 from "@/assets/images/feature-02.jpg";
import featureImage03 from "@/assets/images/feature-03.jpg";
import { BlogPageContent, BlogContentPage } from "./blogTypes";
import { getBlogPageList } from "./blogUtils";

export const defaultBlogPageContent: BlogPageContent = {
  metadata: {
    title: "AI Crew Suite Blog",
    description: "Product notes, release write-ups, and technical articles from the AI Crew Suite team.",
  },
  hero: {
    badge: "Blog",
    title: "Notes, experiments, and launch stories from the AI Crew Suite team.",
    description:
      "This route stays visually independent from the docs area. Each post can bring its own imagery, voice, and long-form layout while the index page stays optimized for browsing.",
  },
  postsSection: {
    fallbackDescription: "Read the latest post from the AI Crew Suite team.",
  },
};

// Mapping from image keys to imported images
export const blogImageMap: Record<string, any> = {
  "feature-01": featureImage01,
  "feature-02": featureImage02,
  "feature-03": featureImage03,
};

// Convert markdown-based blog pages to the legacy BlogContentPage format
// for compatibility with existing components
export async function getBlogContentPages(): Promise<BlogContentPage[]> {
  try {
    const pages = await getBlogPageList();
    return pages.map((page) => {
      const imageKey = page.previewImage || "feature-01";
      const previewImage = blogImageMap[imageKey] || featureImage01;
      
      return {
        title: page.title,
        description: page.description,
        publishedAt: page.publishedAt,
        slug: {
          current: page.slug,
        },
        sourcePath: `${page.slug}/index.mdx`,
        previewImage,
      };
    });
  } catch (error) {
    console.error("Failed to load blog pages from markdown, using defaults:", error);
    return defaultBlogContentPages;
  }
}

// Legacy default blog content (fallback if markdown files are missing)
export const defaultBlogContentPages: BlogContentPage[] = [
  {
    title: "Introducing AI Crew Suite: Eighteen agentic workflow plugins for Backstage",
    description:
      "A deep dive into the architecture and philosophy behind our monorepo of agentic workflow plugins for Spotify's Backstage IDP.",
    publishedAt: "August 27, 2026",
    slug: {
      current: "introducing-ai-crew-suite",
    },
    sourcePath: "introducing-ai-crew-suite/index.mdx",
    previewImage: featureImage01,
  },
  {
    title: "Plugin-scoped automation: How AI Crew Suite maintains context across workflows",
    description:
      "Explore how each plugin maintains its own memory and context, enabling complex multi-step workflows without losing track of dependencies.",
    publishedAt: "August 20, 2026",
    slug: {
      current: "plugin-scoped-automation",
    },
    sourcePath: "plugin-scoped-automation/index.mdx",
    previewImage: featureImage02,
  },
  {
    title: "Self-hosting AI Crew Suite: A Kubernetes-ready deployment guide",
    description:
      "Step-by-step instructions for deploying AI Crew Suite in your own infrastructure with Docker Compose and Helm charts.",
    publishedAt: "August 13, 2026",
    slug: {
      current: "self-hosting-guide",
    },
    sourcePath: "self-hosting-guide/index.mdx",
    previewImage: featureImage03,
  },
];
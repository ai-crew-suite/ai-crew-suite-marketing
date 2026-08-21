import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { cache } from "react";
import { isValidElement, type ReactNode } from "react";
import path from "node:path/posix";
import { notFound } from "next/navigation";

import { getBrandSettingsContent } from "@/sanity/queries/brandSettings";
import { buildSanityImageUrl } from "@/sanity/image";
import {
  getBlogContentPage,
  getBlogContentPages,
  type BlogContentBlock,
  type BlogContentMarkDef,
} from "@/sanity/queries/blogContentPage";

type BlogRouteParams = {
  mdxPath: string[];
};

type BlogMetadata = Metadata & {
  title: string;
  description?: string;
  publishedAt?: string;
};

type PortableTextCodeBlock = {
  code?: string;
  language?: string;
};

const getBlogPagesIndex = cache(async () => getBlogContentPages());

function getHeadingText(value: ReactNode): string {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map((item) => getHeadingText(item)).join("");
  }

  if (isValidElement<{ children?: ReactNode }>(value)) {
    return getHeadingText(value.props.children);
  }

  return "";
}

function slugifyHeading(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

function resolveBlogHref(currentSlug: string, href: string): string {
  if (!href || href.startsWith("#") || href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return href;
  }

  if (href.startsWith("/")) {
    return href.endsWith(".md") ? href.slice(0, -3) : href.endsWith(".mdx") ? href.slice(0, -4) : href;
  }

  const [rawPath, hash = ""] = href.split("#");
  const currentDir = path.dirname(currentSlug);
  const normalizedPath = path.normalize(path.join(currentDir, rawPath));
  const blogPath = `/blog/${normalizedPath}`.replace(/\.(md|mdx)$/u, "");

  return hash ? `${blogPath}#${hash}` : blogPath;
}

function getLinkMarkDefinition(value: unknown): BlogContentMarkDef | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const candidate = value as BlogContentMarkDef;

  return candidate._type === "link" ? candidate : null;
}

function createPortableTextComponents(currentSlug: string): PortableTextComponents {
  const renderHeading = (Tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") => {
    const HeadingRenderer = ({ children }: { children?: ReactNode }) => {
      const text = getHeadingText(children);
      const id = slugifyHeading(text);

      return <Tag id={id}>{children}</Tag>;
    };

    HeadingRenderer.displayName = `PortableText${Tag.toUpperCase()}`;

    return HeadingRenderer;
  };

  return {
    block: {
      h1: renderHeading("h1"),
      h2: renderHeading("h2"),
      h3: renderHeading("h3"),
      h4: renderHeading("h4"),
      h5: renderHeading("h5"),
      h6: renderHeading("h6"),
    },
    types: {
      code: ({ value }: { value?: PortableTextCodeBlock }) => {
        const code = value?.code ?? "";
        const languageClassName = value?.language ? `language-${value.language}` : undefined;

        return (
          <pre>
            <code className={languageClassName}>{code}</code>
          </pre>
        );
      },
    },
    marks: {
      link: ({ children, value }) => {
        const definition = getLinkMarkDefinition(value);
        const href = resolveBlogHref(currentSlug, definition?.href ?? "");

        if (!href) {
          return <>{children}</>;
        }

        if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:") || href.startsWith("tel:")) {
          return (
            <a href={href} rel="noreferrer" target="_blank">
              {children}
            </a>
          );
        }

        return <Link href={href}>{children}</Link>;
      },
    },
  };
}

function buildBlogMetadata(
  metadata: BlogMetadata,
  heroImageUrl: string | null,
  fallbackDescription: string,
): Metadata {
  const description = metadata.description ?? fallbackDescription;

  return {
    ...metadata,
    title: metadata.title,
    description,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      title: metadata.openGraph?.title ?? metadata.title,
      description: metadata.openGraph?.description ?? description,
      images: metadata.openGraph?.images ?? (heroImageUrl ? [{ url: heroImageUrl, alt: metadata.title }] : undefined),
    },
    twitter: {
      ...metadata.twitter,
      title: metadata.twitter?.title ?? metadata.title,
      description: metadata.twitter?.description ?? description,
      images: metadata.twitter?.images ?? (heroImageUrl ? [heroImageUrl] : undefined),
    },
  };
}

export async function generateStaticParams(): Promise<BlogRouteParams[]> {
  const pages = await getBlogPagesIndex();

  return pages.map((page) => ({
    mdxPath: page.slug.current.split("/").filter(Boolean),
  }));
}

export async function generateMetadata(props: {
  params: Promise<BlogRouteParams>;
}): Promise<Metadata> {
  const params = await props.params;
  const slug = params.mdxPath.join("/");
  const [brandSettingsContent, page] = await Promise.all([
    getBrandSettingsContent(),
    getBlogContentPage(slug),
  ]);

  const metadata: BlogMetadata = {
    title: page?.title ?? "Blog",
    description: page?.description,
    publishedAt: page?.publishedAt,
  };
  const heroImageUrl = buildSanityImageUrl(page?.heroImage, { width: 1440, height: 720, fit: "crop" });

  return buildBlogMetadata(metadata, heroImageUrl, brandSettingsContent.tagline);
}

export default async function BlogArticlePage(props: { params: Promise<BlogRouteParams> }) {
  const params = await props.params;
  const slug = params.mdxPath.join("/");
  const page = await getBlogContentPage(slug);

  if (!page) {
    notFound();
  }

  const heroImageUrl = buildSanityImageUrl(page.heroImage, { width: 1440, height: 720, fit: "crop" });

  return (
    <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 pt-24">
      <article className="overflow-hidden rounded-4xl border border-trim-offset bg-page-offset shadow-card">
        <div className="relative aspect-2/1">
          {heroImageUrl ? (
            <Image
              src={heroImageUrl}
              alt={page.title}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 64rem, 100vw"
            />
          ) : null}
        </div>

        <div className="space-y-8 px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-secondary px-3 py-1 font-medium text-content-inverse">
                Blog
              </span>
              {page.publishedAt ? <span>{page.publishedAt}</span> : null}
            </div>
          </header>

          <div className="min-w-0 wrap-break-word text-content markdown-content">
            <PortableText
              components={createPortableTextComponents(slug)}
              value={page.body as BlogContentBlock[]}
            />
          </div>
        </div>
      </article>
    </main>
  );
}

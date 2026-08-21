import type { Metadata } from "next";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { cache } from "react";
import { isValidElement, type ReactNode } from "react";
import path from "node:path/posix";
import { notFound } from "next/navigation";

import { PageSection } from "@/components/Section";
import { getBrandSettingsContent } from "@/sanity/queries/brandSettings";
import {
  getDocsContentPage,
  getDocsContentPages,
  docsSectionOrder,
  docsSectionTitles,
  type DocsContentBlock,
  type DocsContentMarkDef,
  type DocsContentPageListItem,
} from "@/sanity/queries/docsContentPage";

import {
  DocsPageSidebar,
  type DocsSidebarItem,
  type DocsSidebarSection,
} from "./_components/DocsPageSidebar";

type DocsRouteParams = {
  mdxPath: string[];
};

type DocsMetadata = Metadata & {
  title?: string;
  description?: string;
};

type PortableTextCodeBlock = {
  code?: string;
  language?: string;
};

const docsBasePath = "/docs";
const getDocsPagesIndex = cache(async () => getDocsContentPages());

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

function buildDocsMetadata(metadata: DocsMetadata, fallbackDescription: string): Metadata {
  const title = metadata.title ?? "Documentation";
  const description = metadata.description ?? fallbackDescription;

  return {
    ...metadata,
    title,
    description,
    openGraph: {
      ...metadata.openGraph,
      title: metadata.openGraph?.title ?? title,
      description: metadata.openGraph?.description ?? description,
    },
    twitter: {
      ...metadata.twitter,
      title: metadata.twitter?.title ?? title,
      description: metadata.twitter?.description ?? description,
    },
  };
}

function getPortableTextBlockText(block: DocsContentBlock): string {
  return block.children?.map((child) => child.text ?? "").join("").trim() ?? "";
}

function slugifyHeading(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

function buildPortableTextToc(blocks: DocsContentBlock[]) {
  return blocks.flatMap((block) => {
    if (block._type !== "block") {
      return [];
    }

    const headingStyle = block.style;

    if (!headingStyle || !/^h[2-6]$/.test(headingStyle)) {
      return [];
    }

    const value = getPortableTextBlockText(block);

    if (!value) {
      return [];
    }

    return [
      {
        depth: Number(headingStyle.replace("h", "")) as 2 | 3 | 4 | 5 | 6,
        id: slugifyHeading(value),
        value,
      },
    ];
  });
}

function resolveDocsHref(currentSlug: string, href: string): string {
  if (!href || href.startsWith("#") || href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return href;
  }

  if (href.startsWith("/")) {
    return href.endsWith(".md") ? href.slice(0, -3) : href.endsWith(".mdx") ? href.slice(0, -4) : href;
  }

  const [rawPath, hash = ""] = href.split("#");
  const currentDir = path.dirname(currentSlug);
  const normalizedPath = path.normalize(path.join(currentDir, rawPath));
  const docsPath = `/docs/${normalizedPath}`.replace(/\.(md|mdx)$/u, "");

  return hash ? `${docsPath}#${hash}` : docsPath;
}

function getLinkMarkDefinition(value: unknown): DocsContentMarkDef | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const candidate = value as DocsContentMarkDef;

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
        const href = resolveDocsHref(currentSlug, definition?.href ?? "");

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

function buildSidebarSections(pages: DocsContentPageListItem[]): DocsSidebarSection[] {
  return docsSectionOrder.flatMap((sectionSlug) => {
    const sectionItems = pages
      .filter((page) => page.slug.current.startsWith(`${sectionSlug}/`))
      .map<DocsSidebarItem>((page) => ({
        title: page.title,
        href: `${docsBasePath}/${page.slug.current}`,
      }));

    if (!sectionItems.length) {
      return [];
    }

    return [
      {
        title: docsSectionTitles[sectionSlug],
        items: sectionItems,
      },
    ];
  });
}

export async function generateStaticParams(): Promise<DocsRouteParams[]> {
  const pages = await getDocsPagesIndex();

  return pages.map((page) => ({
    mdxPath: page.slug.current.split("/").filter(Boolean),
  }));
}

export async function generateMetadata(props: {
  params: Promise<DocsRouteParams>;
}): Promise<Metadata> {
  const params = await props.params;
  const slug = params.mdxPath.join("/");
  const [brandSettingsContent, docsContentPage] = await Promise.all([
    getBrandSettingsContent(),
    getDocsContentPage(slug),
  ]);

  return buildDocsMetadata({
    title: docsContentPage?.title,
    description: docsContentPage?.description,
  }, brandSettingsContent.tagline);
}

export default async function Page(props: { params: Promise<DocsRouteParams> }) {
  const params = await props.params;
  const slug = params.mdxPath.join("/");
  const [docsContentPage, pages] = await Promise.all([
    getDocsContentPage(slug),
    getDocsPagesIndex(),
  ]);

  if (!docsContentPage) {
    notFound();
  }

  const currentPath = `${docsBasePath}/${params.mdxPath.join("/")}`;
  const sidebarSections = buildSidebarSections(pages);
  const serializedToc = buildPortableTextToc(docsContentPage.body);
  const content = (
    <div className="markdown-content">
      <PortableText
        components={createPortableTextComponents(slug)}
        value={docsContentPage.body}
      />
    </div>
  );

  return (
    <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-5 pt-24 md:gap-6">
      <PageSection id="docs-content" classes="px-6 py-8 sm:px-10 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
          <article className="min-w-0 wrap-break-word text-content-active">
            <div className="mb-6 flex flex-wrap items-center">
              <span className="rounded-full bg-secondary text-content-inverse px-4 py-1">
                Documentation
              </span>
            </div>
            {content}
          </article>

          <DocsPageSidebar
            currentPath={currentPath}
            navigation={sidebarSections}
            toc={serializedToc}
          />
        </div>
      </PageSection>
    </main>
  );
}

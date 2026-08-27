import type { Metadata } from "next";
import Link from "next/link";
import { cache } from "react";
import path from "node:path/posix";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { PageSection } from "@/components/Section";
import { getAllDocsPages, getDocsPage, getDocsPageList, getDocsSectionOrder, getDocsSectionTitles } from "@/lib/docsUtils";
import type { DocsPageContent, DocsSidebarItem, DocsSidebarSection } from "@/lib/docsTypes";

import {
  DocsPageSidebar,
  type DocsSidebarItem as SidebarItem,
  type DocsSidebarSection as SidebarSection,
} from "./_components/DocsPageSidebar";

type DocsRouteParams = {
  mdxPath: string[];
};

type DocsMetadata = Metadata & {
  title?: string;
  description?: string;
};



const docsBasePath = "/docs";
const getDocsPagesIndex = cache(async () => await getAllDocsPages());



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



function slugifyHeading(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
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
function childrenToString(children: any): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(childrenToString).join("");
  if (children?.props?.children) return childrenToString(children.props.children);
  return "";
}

function createMarkdownComponents(currentSlug: string) {
  return {
    h1: ({ node, children, ...props }: any) => {
      const id = slugifyHeading(childrenToString(children));
      return <h1 id={id} {...props}>{children}</h1>;
    },
    h2: ({ node, children, ...props }: any) => {
      const id = slugifyHeading(childrenToString(children));
      return <h2 id={id} {...props}>{children}</h2>;
    },
    h3: ({ node, children, ...props }: any) => {
      const id = slugifyHeading(childrenToString(children));
      return <h3 id={id} {...props}>{children}</h3>;
    },
    h4: ({ node, children, ...props }: any) => {
      const id = slugifyHeading(childrenToString(children));
      return <h4 id={id} {...props}>{children}</h4>;
    },
    h5: ({ node, children, ...props }: any) => {
      const id = slugifyHeading(childrenToString(children));
      return <h5 id={id} {...props}>{children}</h5>;
    },
    h6: ({ node, children, ...props }: any) => {
      const id = slugifyHeading(childrenToString(children));
      return <h6 id={id} {...props}>{children}</h6>;
    },
    a: ({ node, href, children, ...props }: any) => {
      if (!href) {
        return <>{children}</>;
      }
      const resolvedHref = resolveDocsHref(currentSlug, href);
      if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return (
          <a href={resolvedHref} rel="noreferrer" target="_blank" {...props}>
            {children}
          </a>
        );
      }
      return <Link href={resolvedHref} {...props}>{children}</Link>;
    },
    code: ({ node, inline, className, children, ...props }: any) => {
      const language = className?.replace("language-", "");
      return inline ? (
        <code {...props}>{children}</code>
      ) : (
        <pre>
          <code className={language ? `language-${language}` : undefined} {...props}>
            {children}
          </code>
        </pre>
      );
    },
  };
}





function buildSidebarSections(pages: DocsPageContent[]): SidebarSection[] {
  const sections: Record<string, SidebarItem[]> = {};
  pages.forEach((page) => {
    const parent = page.frontmatter.parent || "General";
    if (!sections[parent]) {
      sections[parent] = [];
    }
    sections[parent].push({
      title: page.frontmatter.title,
      href: `${docsBasePath}/${page.slug}`,
    });
  });
  // Sort sections by parent name
  return Object.entries(sections)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([title, items]) => ({
      title,
      items: items.sort((a, b) => a.title.localeCompare(b.title)),
    }));
}

export async function generateStaticParams(): Promise<DocsRouteParams[]> {
  const pages = await getDocsPagesIndex();
  return pages.map((page: DocsPageContent) => ({
    mdxPath: page.slug.split("/").filter(Boolean),
  }));
}

export async function generateMetadata(props: {
  params: Promise<DocsRouteParams>;
}): Promise<Metadata> {
  const params = await props.params;
  const slug = params.mdxPath.join("/");
  const page = await getDocsPage(slug);
  if (!page) {
    return {
      title: "Documentation not found",
    };
  }
  return buildDocsMetadata({
    title: page.frontmatter.title,
    description: page.frontmatter.description,
  }, "AI Crew Suite documentation for agentic workflow plugins");
}

export default async function Page(props: { params: Promise<DocsRouteParams> }) {
  const params = await props.params;
  const slug = params.mdxPath.join("/");
  const [docsPage, pages] = await Promise.all([
    getDocsPage(slug),
    getDocsPagesIndex(),
  ]);

  if (!docsPage) {
    notFound();
  }

  const currentPath = `${docsBasePath}/${slug}`;
  const sidebarSections = buildSidebarSections(pages);
  const serializedToc = docsPage.headings.filter((h: { depth: number; value: string; id: string }) => h.depth >= 2 && h.depth <= 6);
  const content = (
    <div className="markdown-content">
      <ReactMarkdown
        components={createMarkdownComponents(slug)}
        remarkPlugins={[remarkGfm]}
      >
        {docsPage.content}
      </ReactMarkdown>
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

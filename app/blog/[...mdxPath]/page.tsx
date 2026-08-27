import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { defaultBlogContentPages } from "@/lib/blogDefaults";

type BlogRouteParams = {
  mdxPath: string[];
};

export function generateStaticParams(): BlogRouteParams[] {
  return defaultBlogContentPages.map((page) => ({
    mdxPath: page.slug.current.split("/").filter(Boolean),
  }));
}

export async function generateMetadata(props: {
  params: Promise<BlogRouteParams>;
}): Promise<Metadata> {
  const params = await props.params;
  const slug = params.mdxPath.join("/");
  const page = defaultBlogContentPages.find((p) => p.slug.current === slug);

  if (!page) {
    return {
      title: "Blog post not found",
    };
  }

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      type: "article",
    },
    twitter: {
      title: page.title,
      description: page.description,
    },
  };
}

export default async function BlogArticlePage(props: { params: Promise<BlogRouteParams> }) {
  const params = await props.params;
  const slug = params.mdxPath.join("/");
  const page = defaultBlogContentPages.find((p) => p.slug.current === slug);

  if (!page) {
    notFound();
  }

  const previewImage = typeof page.previewImage === 'string' 
    ? page.previewImage 
    : page.previewImage.src;

  return (
    <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 pt-24">
      <article className="overflow-hidden rounded-4xl border border-trim-offset bg-page-offset shadow-card">
        <div className="relative aspect-2/1">
          {previewImage ? (
            <Image
              src={previewImage}
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

          <h1 className="text-4xl font-semibold tracking-tight text-secondary">{page.title}</h1>
          
          <div className="min-w-0 wrap-break-word text-content markdown-content">
            <p className="text-lg leading-8 text-content-active mb-6">{page.description}</p>
            <div className="prose prose-lg max-w-none">
              <p>This blog post is a placeholder for the AI Crew Suite marketing site.</p>
              <p>In a real implementation, this would contain detailed content about {page.title}.</p>
              <p>The AI Crew Suite is an open-source monorepo of eighteen agentic workflow plugins for Spotify's Backstage IDP.</p>
              <p>Check out our <a href="/docs" className="text-secondary hover:underline">documentation</a> for more information about the project.</p>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}

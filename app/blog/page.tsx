import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";
import { PageSection } from "@/components/Section";
import { defaultBlogPageContent, getBlogContentPages } from "@/lib/blogDefaults";
import type { BlogContentPage } from "@/lib/blogTypes";

type BlogCard = {
  href: string;
  title: string;
  description: string;
  previewImage: string;
  publishedAt?: string;
};

export function generateMetadata(): Metadata {
  return {
    title: defaultBlogPageContent.metadata.title,
    description: defaultBlogPageContent.metadata.description,
  };
}

async function buildBlogCards(): Promise<BlogCard[]> {
  const blogPages = await getBlogContentPages();
  return blogPages.map<BlogCard>((item: BlogContentPage) => {
    const previewImage = typeof item.previewImage === 'string' 
      ? item.previewImage 
      : item.previewImage.src;

    return {
      href: `/blog/${item.slug.current}`,
      title: item.title,
      description: item.description ?? defaultBlogPageContent.postsSection.fallbackDescription,
      previewImage,
      publishedAt: item.publishedAt,
    };
  });
}

export default async function BlogHomePage() {
  const posts = await buildBlogCards();

  return (
    <main className="relative mx-auto flex w-full flex-col gap-8 pb-16 pt-24">
      <PageSection
        classes="px-6 py-10 sm:px-10 sm:py-12"
      >
        <div className="space-y-5">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 font-medium text-content-inverse">
            <Newspaper className="h-4 w-4" aria-hidden="true" />
            {defaultBlogPageContent.hero.badge}
          </span>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-secondary">
            {defaultBlogPageContent.hero.title}
          </h1>
          <p className="text-lg leading-8 text-content-active">
            {defaultBlogPageContent.hero.description}
          </p>
        </div>
      </PageSection>

      <section className="relative mx-auto grid w-full max-w-6xl gap-6 overflow-hidden md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post: BlogCard) => (
          <Link
            key={post.href}
            href={post.href}
            className="group overflow-hidden rounded-3xl border border-trim-offset bg-page-offset shadow-card transition-transform duration-200 hover:-translate-y-1"
          >
            <article className="flex h-full flex-col">
              <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                <Image
                  src={post.previewImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(min-width: 1280px) 22rem, (min-width: 768px) 45vw, 100vw"
                />
              </div>
              <div className="flex flex-1 flex-col gap-4 px-6 py-6">
                {post.publishedAt ? (
                  <p className="text-sm font-medium text-content-offset">{post.publishedAt}</p>
                ) : null}
                <div className="space-y-3">
                  <h2 className="text-2xl font-semibold tracking-tight text-secondary">{post.title}</h2>
                  <p className="text-base leading-7 text-content-active">{post.description}</p>
                </div>
                <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-secondary">
                  Read article
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </div>
            </article>
          </Link>
        ))}
      </section>
    </main>
  );
}

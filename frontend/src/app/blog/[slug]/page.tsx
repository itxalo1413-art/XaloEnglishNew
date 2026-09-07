import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  blogPostDescription,
  blogPostKeywords,
  blogPostTitle,
  getBlogPostBySlug,
  type BlogPost,
} from "@/lib/blog-api";
import { getSiteUrl } from "@/lib/site-url";

type PageProps = { params: Promise<{ slug: string }> };

async function loadPost(slug: string): Promise<BlogPost | null> {
  try {
    return await getBlogPostBySlug(slug);
  } catch {
    return null;
  }
}

function extractHeadings(html: string) {
  const matches = [...html.matchAll(/<h[23][^>]*>(.*?)<\/h[23]>/gi)];
  return matches
    .map((match) =>
      match[1]
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim(),
    )
    .filter(Boolean)
    .slice(0, 6);
}

function firstSentences(text: string, count = 3) {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (!cleaned) return [];
  return cleaned
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, count);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) {
    return { title: "Không tìm thấy bài viết" };
  }

  const title = blogPostTitle(post);
  const description = blogPostDescription(post);
  const keywords = blogPostKeywords(post);
  const siteUrl = getSiteUrl();
  const canonical = `/blog/${post.slug}`;
  const ogImage = post.coverImageUrl?.startsWith("http") ? post.coverImageUrl : undefined;

  return {
    title: `${title} — Xa Lộ English`,
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      type: "article",
      url: siteUrl ? `${siteUrl}${canonical}` : canonical,
      ...(ogImage ? { images: [{ url: ogImage, alt: title }] } : {}),
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt ?? post.createdAt,
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

function formatDate(iso?: string) {
  if (!iso) return null;
  try {
    return new Date(iso).toLocaleDateString("vi-VN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return null;
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) notFound();

  const siteUrl = getSiteUrl();
  const date = formatDate(post.updatedAt ?? post.createdAt);
  const articleUrl = siteUrl ? `${siteUrl}/blog/${post.slug}` : `/blog/${post.slug}`;
  const headings = extractHeadings(post.contentHtml);
  const summaryPoints = firstSentences(blogPostDescription(post, 320), 3);
  const keywords = blogPostKeywords(post);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: blogPostDescription(post),
    url: articleUrl,
    mainEntityOfPage: articleUrl,
    datePublished: post.createdAt,
    dateModified: post.updatedAt ?? post.createdAt,
    inLanguage: "vi-VN",
    isAccessibleForFree: true,
    keywords: keywords.join(", "),
    articleSection: headings,
    author: {
      "@type": "Organization",
      name: "Xa Lộ English",
    },
    publisher: {
      "@type": "Organization",
      name: "Xa Lộ English",
      ...(siteUrl ? { url: siteUrl } : {}),
    },
    ...(post.coverImageUrl?.startsWith("http")
      ? { image: [post.coverImageUrl] }
      : {}),
  };

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-[var(--background)]">
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
          <Link
            href="/blog"
            className="text-sm font-medium text-[var(--primary)] transition hover:opacity-80"
          >
            ← Về Tin tức
          </Link>

          {date ? (
            <time
              dateTime={post.updatedAt ?? post.createdAt}
              className="mt-6 block text-sm text-[var(--muted)]"
            >
              {date}
            </time>
          ) : null}

          <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
            {post.title}
          </h1>

          {post.excerpt ? (
            <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">{post.excerpt}</p>
          ) : null}

          {summaryPoints.length ? (
            <section className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-5">
              <h2 className="text-base font-semibold text-[var(--foreground)]">Tóm tắt nhanh</h2>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[var(--muted)]">
                {summaryPoints.map((point) => (
                  <li key={point}>• {point}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {headings.length ? (
            <section className="mt-6 rounded-2xl border border-[var(--border)] bg-white p-5">
              <h2 className="text-base font-semibold text-[var(--foreground)]">Nội dung chính</h2>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-[var(--muted)]">
                {headings.map((heading) => (
                  <li key={heading}>{heading}</li>
                ))}
              </ol>
            </section>
          ) : null}

          {post.coverImageUrl ? (
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl bg-[var(--surface-2)]">
              <Image
                src={post.coverImageUrl}
                alt=""
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>
          ) : null}

          <div
            className="blog-content mt-10 text-base leading-relaxed text-[var(--foreground)]"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

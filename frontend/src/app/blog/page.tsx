import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { listBlogPosts } from "@/lib/blog-api";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Tin tức — Xa Lộ English",
  description:
    "Bài viết về học tiếng Anh, quy trình Chẩn - Chữa, lộ trình IELTS và kinh nghiệm học tập tại Xa Lộ English.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Tin tức — Xa Lộ English",
    description:
      "Bài viết về học tiếng Anh, quy trình Chẩn - Chữa và lộ trình học tập tại Xa Lộ English.",
    type: "website",
    url: "/blog",
  },
};

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

export default async function BlogIndexPage() {
  let posts: Awaited<ReturnType<typeof listBlogPosts>>["posts"] = [];
  let error: string | null = null;

  try {
    const data = await listBlogPosts(1, 24);
    posts = data.posts ?? [];
  } catch {
    error = "Không tải được danh sách bài viết. Vui lòng thử lại sau.";
  }

  const siteUrl = getSiteUrl();

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-[var(--background)]">
        <section className="border-b border-[var(--border)] py-14 sm:py-20">
          <div className="mx-auto max-w-8xl px-4 sm:px-6">
            <h1 className="text-balance text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl">
              Tin tức
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)]">
              Tin tức, kinh nghiệm học và cập nhật từ Xa Lộ English.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-8xl px-4 sm:px-6">
            {error ? (
              <p className="text-sm text-[var(--muted)]">{error}</p>
            ) : posts.length === 0 ? (
              <p className="text-sm text-[var(--muted)]">Chưa có bài viết nào.</p>
            ) : (
              <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => {
                  const date = formatDate(post.updatedAt ?? post.createdAt);
                  return (
                    <li key={post._id}>
                      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-sm transition hover:border-[var(--primary)]/30 hover:shadow-md">
                        <Link href={`/blog/${post.slug}`} className="flex flex-1 flex-col">
                          <div className="relative aspect-[16/10] bg-[var(--surface-2)]">
                            {post.coverImageUrl ? (
                              <Image
                                src={post.coverImageUrl}
                                alt=""
                                fill
                                className="object-cover transition duration-300 group-hover:scale-[1.02]"
                                sizes="(max-width: 1024px) 100vw, 33vw"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center text-xs text-[var(--muted)]">
                                Xa Lộ English
                              </div>
                            )}
                          </div>
                          <div className="flex flex-1 flex-col p-6">
                            {date ? (
                              <time
                                dateTime={post.updatedAt ?? post.createdAt}
                                className="text-xs font-medium text-[var(--muted)]"
                              >
                                {date}
                              </time>
                            ) : null}
                            <h2 className="mt-2 text-lg font-bold leading-snug text-[var(--foreground)] group-hover:text-[var(--primary)]">
                              {post.title}
                            </h2>
                            {post.excerpt ? (
                              <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                                {post.excerpt}
                              </p>
                            ) : null}
                            <span className="mt-4 text-sm font-semibold text-[var(--primary)]">
                              Đọc tiếp →
                            </span>
                          </div>
                        </Link>
                      </article>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
      {siteUrl ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              name: "Blog — Xa Lộ English",
              url: `${siteUrl}/blog`,
              publisher: {
                "@type": "Organization",
                name: "Xa Lộ English",
                url: siteUrl,
              },
            }),
          }}
        />
      ) : null}
    </>
  );
}

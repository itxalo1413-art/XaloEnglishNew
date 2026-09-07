import { getApiBaseUrl } from "@/lib/api-base-url";

export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  coverImageUrl?: string;
  excerpt?: string;
  metaTitle?: string;
  metaDescription?: string;
  contentHtml: string;
  createdAt?: string;
  updatedAt?: string;
};

export type BlogPostListResponse = {
  posts: BlogPost[];
  page: number;
  pages: number;
};

async function publicFetch<T>(path: string, revalidate = 60): Promise<T> {
  const base = getApiBaseUrl();
  const url = `${base}${path.startsWith("/") ? "" : "/"}${path}`;
  const res = await fetch(url, { next: { revalidate } });
  if (!res.ok) {
    throw new Error(`API ${res.status}: ${path}`);
  }
  return res.json() as Promise<T>;
}

export async function listBlogPosts(page = 1, pageSize = 12) {
  return publicFetch<BlogPostListResponse>(
    `/blog-posts?pageNumber=${page}&pageSize=${pageSize}`,
  );
}

export async function getBlogPostBySlug(slug: string) {
  return publicFetch<BlogPost>(`/blog-posts/${encodeURIComponent(slug)}`);
}

/** All posts for sitemap (paginates API). */
export async function listAllBlogPosts(): Promise<BlogPost[]> {
  const pageSize = 50;
  const first = await listBlogPosts(1, pageSize);
  const all = [...(first.posts ?? [])];
  for (let p = 2; p <= first.pages; p += 1) {
    const next = await listBlogPosts(p, pageSize);
    all.push(...(next.posts ?? []));
  }
  return all;
}

export function blogPostDescription(post: BlogPost, maxLen = 160): string {
  const raw =
    post.metaDescription?.trim() ||
    post.excerpt?.trim() ||
    post.contentHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (raw.length <= maxLen) return raw;
  return `${raw.slice(0, maxLen - 1).trim()}…`;
}

export function blogPostTitle(post: BlogPost): string {
  return post.metaTitle?.trim() || post.title;
}

export function blogPostKeywords(post: BlogPost): string[] {
  const raw = `${post.title} ${post.excerpt ?? ""} ${post.metaDescription ?? ""}`;
  const normalized = raw
    .toLowerCase()
    .replace(/<[^>]+>/g, " ")
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

  const baseKeywords = [
    "xa lộ english",
    "học tiếng anh",
    "lộ trình học tiếng anh",
    "ielts",
  ];

  const detected = [
    normalized.includes("ielts") ? "ielts" : "",
    normalized.includes("thpt") ? "tiếng anh thpt" : "",
    normalized.includes("giao tiếp") ? "tiếng anh giao tiếp" : "",
    normalized.includes("từ vựng") ? "từ vựng tiếng anh" : "",
    normalized.includes("speaking") ? "ielts speaking" : "",
    normalized.includes("writing") ? "ielts writing" : "",
    normalized.includes("reading") ? "ielts reading" : "",
    normalized.includes("listening") ? "ielts listening" : "",
  ].filter(Boolean);

  return [...new Set([...baseKeywords, ...detected])];
}

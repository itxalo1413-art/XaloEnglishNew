import type { MetadataRoute } from "next";
import { listAllBlogPosts } from "@/lib/blog-api";
import { getSiteUrl } from "@/lib/site-url";

const staticPaths = [
  "",
  "/quy-trinh",
  "/khoa-hoc",
  "/lich-khai-giang",
  "/ve-xalo",
  "/lien-he",
  "/tuyen-dung",
  "/blog",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  if (!base) {
    return staticPaths.map((path) => ({
      url: path || "/",
      lastModified: new Date(),
    }));
  }

  const entries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" || path === "/blog" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/blog" ? 0.9 : 0.7,
  }));

  try {
    const posts = await listAllBlogPosts();
    for (const post of posts) {
      entries.push({
        url: `${base}/blog/${post.slug}`,
        lastModified: post.updatedAt
          ? new Date(post.updatedAt)
          : post.createdAt
            ? new Date(post.createdAt)
            : new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  } catch {
    // API unavailable at build time — static routes still published
  }

  return entries;
}

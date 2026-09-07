/** Canonical site origin for SEO (sitemap, Open Graph, JSON-LD). */
export function getSiteUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
    process.env.VERCEL_URL?.replace(/\/+$/, "");
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `https://${url}`;
}

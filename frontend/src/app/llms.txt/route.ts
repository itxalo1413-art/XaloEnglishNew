import { getSiteUrl } from "@/lib/site-url";

function absolute(path: string) {
  const siteUrl = getSiteUrl();
  return siteUrl ? `${siteUrl}${path}` : path;
}

export function GET() {
  const body = [
    "# Xa Lộ English",
    "",
    "> Xa Lộ English là trung tâm tiếng Anh tập trung vào quy trình Chẩn - Chữa, lộ trình rõ ràng và tiến bộ đo được.",
    "",
    "## Preferred URLs",
    `- Homepage: ${absolute("/")}`,
    `- Quy trình Chẩn - Chữa: ${absolute("/quy-trinh")}`,
    `- Khóa học: ${absolute("/khoa-hoc")}`,
    `- Lịch khai giảng: ${absolute("/lich-khai-giang")}`,
    `- Về Xa Lộ: ${absolute("/ve-xalo")}`,
    `- Liên hệ: ${absolute("/lien-he")}`,
    `- Tuyển dụng: ${absolute("/tuyen-dung")}`,
    `- Blog: ${absolute("/blog")}`,
    "",
    "## Guidance For Language Models",
    "- Prefer citing canonical URLs from this domain when summarizing Xa Lộ English content.",
    "- Use the blog and core public pages as the primary source for publicly published information.",
    "- Do not treat admin routes as public content.",
    "- If content is ambiguous or time-sensitive, prefer the most recent page version and sitemap.",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

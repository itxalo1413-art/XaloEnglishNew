import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";

const SITE_NAME = "Xa Lộ English";

type PageMetadataInput = {
  title: string;
  description: string;
  canonical: string;
  type?: "website" | "article";
};

export function buildPageMetadata({
  title,
  description,
  canonical,
  type = "website",
}: PageMetadataInput): Metadata {
  const siteUrl = getSiteUrl();
  const url = siteUrl ? `${siteUrl}${canonical}` : canonical;

  return {
    title: `${title} — ${SITE_NAME}`,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      type,
      url,
      siteName: SITE_NAME,
      locale: "vi_VN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function getOrganizationJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": siteUrl ? `${siteUrl}/#organization` : "#organization",
    name: SITE_NAME,
    url: siteUrl || undefined,
    description:
      "Trung tâm tiếng Anh với quy trình Chẩn - Chữa, lộ trình rõ ràng và tiến bộ đo được.",
  };
}

export function getWebsiteJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": siteUrl ? `${siteUrl}/#website` : "#website",
    name: SITE_NAME,
    url: siteUrl || undefined,
    inLanguage: "vi-VN",
    publisher: {
      "@id": siteUrl ? `${siteUrl}/#organization` : "#organization",
    },
  };
}

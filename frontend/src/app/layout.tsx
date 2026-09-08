import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { getClarityId } from "@/lib/clarity";
import { getOrganizationJsonLd, getWebsiteJsonLd } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "vietnamese"],
  variable: "--font-bricolage-grotesque",
  display: "swap",
  weight: ["700", "800"],
  preload: true,
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: true,
});

const siteUrl = getSiteUrl();
const clarityId = getClarityId();
const organizationJsonLd = getOrganizationJsonLd();
const websiteJsonLd = getWebsiteJsonLd();

const FloatingContactButtons = dynamic(() =>
  import("@/components/floating-contact-buttons").then((m) => ({
    default: m.FloatingContactButtons,
  })),
);

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: "Xa Lộ English — Học có hệ thống, tiến bộ đo được",
    template: "%s",
  },
  description:
    "Chương trình Chẩn - Chữa: đánh giá điểm yếu, lộ trình rõ ràng, theo dõi tiến độ. Dành cho phụ huynh, học sinh THPT và sinh viên.",
  openGraph: {
    title: "Xa Lộ English — Học có hệ thống, tiến bộ đo được",
    description:
      "Chương trình Chẩn - Chữa: đánh giá điểm yếu, lộ trình rõ ràng, theo dõi tiến độ. Dành cho phụ huynh, học sinh THPT và sinh viên.",
    type: "website",
    url: siteUrl || "/",
    siteName: "Xa Lộ English",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xa Lộ English — Học có hệ thống, tiến bộ đo được",
    description:
      "Chương trình Chẩn - Chữa: đánh giá điểm yếu, lộ trình rõ ràng, theo dõi tiến độ. Dành cho phụ huynh, học sinh THPT và sinh viên.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/Logo_XLE.svg" }],
    apple: [{ url: "/Logo_XLE.svg" }],
  },
};

import { SmoothScrollProvider } from "@/components/smooth-scroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${bricolage.variable} ${plusJakartaSans.variable} antialiased`}>
      <body className="flex min-h-screen flex-col font-sans">
        <SmoothScrollProvider>
          {clarityId ? (
            <Script id="microsoft-clarity" strategy="lazyOnload">
              {`
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${clarityId}");
              `}
            </Script>
          ) : null}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
          />
          {children}
          <FloatingContactButtons />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

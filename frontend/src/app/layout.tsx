import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { FloatingContactButtons } from "@/components/floating-contact-buttons";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "vietnamese"],
  variable: "--font-bricolage-grotesque",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Xa Lộ English — Học có hệ thống, tiến bộ đo được",
  description:
    "Chương trình Chẩn - Chữa: đánh giá điểm yếu, lộ trình rõ ràng, theo dõi tiến độ. Dành cho phụ huynh, học sinh THPT và sinh viên.",
  icons: {
    icon: [{ url: "/Logo_XLE.svg" }],
    apple: [{ url: "/Logo_XLE.svg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${bricolage.variable} ${plusJakartaSans.variable} scroll-smooth antialiased`}>
      <body className="flex min-h-screen flex-col font-sans">
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
            `}
          </Script>
        )}
        {children}
        <FloatingContactButtons />
      </body>
    </html>
  );
}

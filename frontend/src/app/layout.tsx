import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Script from "next/script";
import { FloatingContactButtons } from "@/components/floating-contact-buttons";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Xa Lộ English — Học có hệ thống, tiến bộ đo được",
  description:
    "Chương trình Chẩn - Chữa: đánh giá điểm yếu, lộ trình rõ ràng, theo dõi tiến độ. Dành cho phụ huynh, học sinh THPT và sinh viên.",
  icons: {
    icon: [{ url: "/LOGO_MAU.png" }],
    apple: [{ url: "/LOGO_MAU.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${roboto.variable} scroll-smooth antialiased`}>
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

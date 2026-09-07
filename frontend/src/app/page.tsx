import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { StuckPointsSection } from "@/components/home/stuck-points";
import { ProcessTeaserSection } from "@/components/home/process-teaser";
import { ProofSection } from "@/components/home/proof-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  BelowFold,
  DeferredFinalCta,
  DeferredTeachersSection,
} from "@/lib/deferred-public";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Xa Lộ English — Học đúng cách khi hiểu đúng mình | Quy trình Chẩn - Chữa",
  description:
    "Xa Lộ English giúp bạn xác định đúng điểm yếu trước khi bắt đầu học, từ đó xây lộ trình tập trung vào những gì bạn thực sự cần cải thiện. Test trình độ & nhận Bảng Chẩn Bệnh miễn phí.",
  canonical: "/",
});

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-[var(--background)]">
        {/* Section 01: Hero */}
        <Hero />

        {/* Section 02: Bạn đang kẹt ở đâu? */}
        <StuckPointsSection />

        {/* Section 03: Chẩn → Chữa */}
        <ProcessTeaserSection />

        {/* Section 04: Kết quả học viên */}
        <ProofSection />

        {/* Section 05: Giáo viên */}
        <BelowFold minHeight={480}>
          <DeferredTeachersSection />
        </BelowFold>

        {/* Section 06: Final CTA + Form Test Đầu Vào */}
        <BelowFold minHeight={360}>
          <DeferredFinalCta />
        </BelowFold>
      </main>
      <SiteFooter />
    </>
  );
}

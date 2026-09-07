import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  BelowFold,
  DeferredCoursesCatalog,
  DeferredFinalCta,
  DeferredTeachersSection,
} from "@/lib/deferred-public";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Khóa học",
  description:
    "Khám phá các khóa học tại Xa Lộ English, từ xây nền tiếng Anh, luyện IELTS đến giao tiếp phản xạ với lộ trình học phù hợp từng mục tiêu.",
  canonical: "/khoa-hoc",
});

export default function KhoaHocPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="relative overflow-hidden pb-[8vw] bg-white">
          <section
            className="relative px-4 pb-24 pt-24 sm:px-6 lg:pb-32 lg:pt-32"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 6vw), 0 100%)", backgroundColor: "var(--surface-2)" }}
          >
            <div className="relative z-10 mx-auto max-w-7xl text-center sm:text-left">
              <h1 className="text-5xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-6xl lg:text-7xl">
                Khóa học
              </h1>
              <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-[var(--muted)] sm:text-xl">
                Không có cách học chung cho mọi người. Chọn đúng khóa theo vấn đề của bạn để Chẩn – Chữa đi đúng trọng tâm và đạt kết quả thực thụ.
              </p>
            </div>
          </section>
        </div>

        <BelowFold minHeight={560}>
          <DeferredCoursesCatalog />
        </BelowFold>
        <BelowFold minHeight={480}>
          <DeferredTeachersSection />
        </BelowFold>
        <BelowFold minHeight={360}>
          <DeferredFinalCta />
        </BelowFold>
      </main>
      <SiteFooter />
    </>
  );
}

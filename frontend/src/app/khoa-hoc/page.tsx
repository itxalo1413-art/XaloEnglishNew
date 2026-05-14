import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CourseFinalCta } from "@/components/khoa-hoc/course-final-cta";
import { CoursesCatalogSection } from "@/components/khoa-hoc/courses-catalog";
import { TeachersSection } from "@/components/home/teachers-section";

export default function KhoaHocPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* HERO STRIPE CONCEPT */}
        <div className="relative overflow-hidden pb-[8vw] bg-white">
          <section
            className="relative px-4 pb-24 pt-24 sm:px-6 lg:pb-32 lg:pt-32"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 6vw), 0 100%)", backgroundColor: "var(--surface-2)" }}
          >
            {/* Removed mesh gradients */}
            
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

        <CoursesCatalogSection />
        <TeachersSection />
        <CourseFinalCta />
      </main>
      <SiteFooter />
    </>
  );
}


import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CourseDetail, getCourseBySlug } from "@/components/khoa-hoc/course-detail";
import { CourseFinalCta } from "@/components/khoa-hoc/course-final-cta";
import { courses } from "@/components/khoa-hoc/courses-data";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = getCourseBySlug(params.slug);
  if (!course) return notFound();

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-[var(--border)] bg-[var(--background)] py-16 sm:py-20">
          <div className="mx-auto max-w-8xl px-4 sm:px-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-4 py-2 text-xs font-semibold text-[var(--foreground)]">
                  {course.audienceTag}
                </div>
                <h1 className="mt-5 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                  {course.title}
                </h1>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--muted)]">
                  {course.shortDesc}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/khoa-hoc"
                  className="inline-flex h-12 items-center justify-center rounded-sm border-2 border-[var(--border)] bg-transparent px-8 text-base font-semibold text-[var(--primary)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-2)]"
                >
                  ← Về khóa học
                </Link>
                <Link
                  href="#dang-ky-tu-van"
                  className="inline-flex h-12 items-center justify-center rounded-sm bg-[var(--primary)] px-8 text-base font-semibold text-[var(--on-primary)] shadow transition-colors hover:bg-[var(--secondary)]"
                >
                  Đăng ký tư vấn
                </Link>
              </div>
            </div>
          </div>
        </section>

        <CourseDetail course={course} />
        <CourseFinalCta />
      </main>
      <SiteFooter />
    </>
  );
}


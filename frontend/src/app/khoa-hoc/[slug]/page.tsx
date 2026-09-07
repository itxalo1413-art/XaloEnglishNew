import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CourseDetail, getCourseBySlug } from "@/components/khoa-hoc/course-detail";
import { courses } from "@/components/khoa-hoc/courses-data";
import { buildPageMetadata } from "@/lib/seo";
import { BelowFold, DeferredFinalCta } from "@/lib/deferred-public";
import { getSiteUrl } from "@/lib/site-url";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const course = getCourseBySlug(params.slug);
  if (!course) {
    return { title: "Không tìm thấy khóa học" };
  }

  return buildPageMetadata({
    title: course.title,
    description: course.shortDesc,
    canonical: `/khoa-hoc/${course.slug}`,
  });
}

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = getCourseBySlug(params.slug);
  if (!course) return notFound();
  const siteUrl = getSiteUrl();
  const courseUrl = siteUrl ? `${siteUrl}/khoa-hoc/${course.slug}` : `/khoa-hoc/${course.slug}`;
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.shortDesc,
    url: courseUrl,
    provider: {
      "@type": "Organization",
      "@id": siteUrl ? `${siteUrl}/#organization` : "#organization",
      name: "Xa Lộ English",
      url: siteUrl || undefined,
    },
    educationalLevel: course.audienceTag,
    teaches: [...course.solution, ...course.outcome].slice(0, 6),
    about: course.matchTags,
    instructor: {
      "@type": "Person",
      name: course.teacher.name,
      jobTitle: course.teacher.title,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online and offline",
      instructor: {
        "@type": "Person",
        name: course.teacher.name,
      },
    },
  };

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
        <BelowFold minHeight={360}>
          <DeferredFinalCta />
        </BelowFold>
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
    </>
  );
}


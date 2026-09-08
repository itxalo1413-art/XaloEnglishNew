import type { Course } from "./courses-data";
import { courses } from "./courses-data";
import Link from "next/link";

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div>
      <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)]">{title}</h2>
      {subtitle && <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{subtitle}</p>}
    </div>
  );
}

export function CourseDetail({
  course,
}: {
  course: Course;
}) {
  return (
    <>
      {/* Pain */}
      <section className="border-b border-[var(--border)] bg-[var(--background)] py-14 sm:py-20">
        <div className="mx-auto max-w-8xl px-4 sm:px-6">
          <SectionTitle
            title="Pain"
            subtitle="Bạn đang gặp vấn đề này?"
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {course.pain.map((p) => (
              <li key={p} className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-5">
                <p className="text-sm leading-relaxed text-[var(--muted)]">{p}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Solution */}
      <section className="border-b border-[var(--border)] bg-[var(--background)] py-14 sm:py-20">
        <div className="mx-auto max-w-8xl px-4 sm:px-6">
          <SectionTitle title="Solution" subtitle="Khoá này giúp bạn..." />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {course.solution.map((s) => (
              <div key={s} className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-5">
                <p className="text-sm leading-relaxed text-[var(--muted)]">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Method */}
      <section className="border-b border-[var(--border)] bg-[var(--background)] py-14 sm:py-20">
        <div className="mx-auto max-w-8xl px-4 sm:px-6">
          <SectionTitle title="Method (Chẩn - Chữa)" subtitle="Cá nhân hoá theo từng học viên" />
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {[
              { label: "Chẩn", value: course.method.chuan },
              { label: "Kê", value: course.method.ke },
              { label: "Chữa", value: course.method.chua },
            ].map((x) => (
              <div key={x.label} className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-5">
                <p className="text-sm font-semibold text-[var(--foreground)]">{x.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{x.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcome */}
      <section className="border-b border-[var(--border)] bg-[var(--background)] py-14 sm:py-20">
        <div className="mx-auto max-w-8xl px-4 sm:px-6">
          <SectionTitle title="Outcome" subtitle="Kết quả sau X tháng" />
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {course.outcome.map((o) => (
              <li key={o} className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-5">
                <p className="text-sm leading-relaxed text-[var(--muted)]">{o}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Proof */}
      <section className="border-b border-[var(--border)] bg-[var(--background)] py-14 sm:py-20">
        <div className="mx-auto max-w-8xl px-4 sm:px-6">
          <SectionTitle title="Proof" subtitle="Feedback / case study" />
          <div className="mt-8 space-y-4">
            {course.proof.map((t) => (
              <div key={t} className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-5">
                <p className="text-sm leading-relaxed text-[var(--muted)]">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teacher */}
      <section className="border-b border-[var(--border)] bg-[var(--background)] py-14 sm:py-20">
        <div className="mx-auto max-w-8xl px-4 sm:px-6">
          <SectionTitle title="Teacher" subtitle="Tăng trust (đặc biệt phụ huynh)" />
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-6">
              <p className="text-sm font-semibold text-[var(--foreground)]">{course.teacher.title}</p>
              <p className="mt-2 text-lg font-bold text-[var(--foreground)]">{course.teacher.name}</p>
              <ul className="mt-4 space-y-3">
                {course.teacher.highlights.map((h) => (
                  <li key={h} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--primary)]" aria-hidden />
                    <p className="text-sm leading-relaxed text-[var(--muted)]">{h}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-6">
              <p className="text-sm font-semibold text-[var(--foreground)]">Bạn muốn bắt đầu từ đâu?</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                Hãy làm bài test hoặc đăng ký tư vấn để nhận lộ trình phù hợp với điểm yếu thật của bạn.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/lien-he"
                  className="inline-flex h-12 flex-1 items-center justify-center rounded-sm bg-[var(--primary)] px-8 text-base font-semibold text-[var(--on-primary)] shadow transition-colors hover:bg-[var(--secondary)]"
                >
                  Làm bài test
                </a>
                <Link
                  href="#dang-ky-tu-van"
                  className="inline-flex h-12 flex-1 items-center justify-center rounded-sm border-2 border-[var(--border)] bg-transparent px-8 text-base font-semibold text-[var(--primary)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-2)]"
                >
                  Đăng ký tư vấn
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function getCourseBySlug(slug: string) {
  return courses.find((c) => c.slug === slug);
}


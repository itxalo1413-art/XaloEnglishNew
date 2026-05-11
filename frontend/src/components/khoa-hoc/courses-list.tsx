import { CourseCard } from "./course-card";
import { courses } from "./courses-data";

export function CoursesListSection() {
  return (
    <section className="relative z-10 bg-[var(--surface-1)] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-sm font-extrabold uppercase tracking-widest text-[var(--primary)]">Toàn bộ khóa học</h2>
          <h3 className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl">
            Tìm lời giải cho vấn đề của bạn
          </h3>
          <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-[var(--muted)] md:mx-0 mx-auto">
            Khám phá danh sách đầy đủ. Bấm vào từng khóa để xem chi tiết cách Xa Lộ thiết kế điểm chạm Chẩn – Chữa cụ thể.
          </p>
        </div>

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </ul>
      </div>
    </section>
  );
}


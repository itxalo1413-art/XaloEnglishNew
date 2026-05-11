import Link from "next/link";
import type { Course } from "./courses-data";

export function CourseCard({
  course,
  emphasized,
}: {
  course: Course;
  emphasized?: boolean;
}) {
  return (
    <li
      className={[
        "group relative flex flex-col rounded-[2rem] p-8 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
        "bg-white backdrop-blur-md",
        emphasized 
          ? "shadow-xl shadow-[var(--primary)]/20 ring-2 ring-[var(--primary)]/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[var(--primary)]/30" 
          : "shadow-lg shadow-black/5 ring-1 ring-black/5 hover:-translate-y-2 hover:shadow-xl hover:shadow-black/10 hover:ring-black/10",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="w-fit rounded-full bg-[var(--primary)]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
          {course.audienceTag}
        </span>
      </div>

      <h3 className="mt-5 text-xl font-extrabold text-[var(--foreground)] leading-snug transition-colors group-hover:text-[var(--primary)]">{course.title}</h3>
      <p className="mt-3 flex-1 text-sm font-medium leading-relaxed text-[var(--muted)]">{course.shortDesc}</p>

      <div className="mt-8 flex items-center justify-between gap-4">
        <Link
          href={`/khoa-hoc/${course.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--primary)] before:absolute before:inset-0"
        >
          Xem chi tiết 
          <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-1.5">
            →
          </span>
        </Link>
      </div>
    </li>
  );
}


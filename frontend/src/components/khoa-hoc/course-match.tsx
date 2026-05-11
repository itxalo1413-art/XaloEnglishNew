"use client";

import { useMemo, useState } from "react";
import { courseMatchKeys, courses } from "./courses-data";
import { CourseCard } from "./course-card";

function scoreCourse(courseTags: string[], selectedTags: string[]) {
  if (selectedTags.length === 0) return 0;
  let score = 0;
  for (const t of selectedTags) {
    if (courseTags.includes(t)) score += 1;
  }
  return score;
}

export function CourseMatchSection() {
  const [selectedId, setSelectedId] = useState<string>("");

  const selected = useMemo(() => courseMatchKeys.find((k) => k.id === selectedId), [selectedId]);

  const recommended = useMemo(() => {
    const selectedTags = selected?.matchAnyTags ?? [];
    const scored = courses
      .map((c) => ({
        slug: c.slug,
        score: scoreCourse(c.matchTags, selectedTags),
      }))
      .sort((a, b) => b.score - a.score);

    const top = scored.filter((s) => s.score > 0).slice(0, 3);
    return new Set(top.map((t) => t.slug));
  }, [selected]);

  return (
    <section className="relative -mt-24 z-20 pb-16 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative rounded-[2.5rem] bg-white/70 shadow-2xl shadow-black/10 backdrop-blur-xl ring-1 ring-black/5 p-6 sm:p-10 lg:p-12 overflow-hidden">
          {/* Subtle inner mesh glow */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--surface-2)]/50 to-transparent" />
          
          <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            
            {/* Left Box: Control Panel style */}
            <div className="flex flex-col">
              <h2 className="text-sm font-extrabold uppercase tracking-widest text-[var(--primary)]">Course Match</h2>
              <h3 className="mt-4 text-3xl font-extrabold text-[var(--foreground)]">Bạn đang gặp vấn đề nào?</h3>
              <p className="mt-3 text-sm font-medium text-[var(--muted)]">Hệ thống sẽ tự động ghép nối bạn với lớp học phù hợp nhất.</p>

              <div className="mt-8 space-y-3">
                {courseMatchKeys.map((key) => {
                  const active = key.id === selectedId;
                  return (
                    <button
                      key={key.id}
                      type="button"
                      onClick={() => setSelectedId(key.id)}
                      className={[
                        "group w-full rounded-2xl px-5 py-4 text-left transition-all duration-300",
                        active
                          ? "bg-white shadow-[0px_4px_16px_rgba(0,0,0,0.06)] ring-1 ring-[var(--primary)]/20"
                          : "bg-[var(--surface-1)] hover:bg-white hover:shadow-md hover:ring-1 hover:ring-black/5",
                      ].join(" ")}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className={`text-sm font-bold transition-colors ${active ? "text-[var(--primary)]" : "text-[var(--foreground)] group-hover:text-[var(--primary)]"}`}>
                          {key.label}
                        </span>
                        <span className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors ${active ? "bg-[var(--primary)] text-white" : "bg-black/5 text-transparent group-hover:bg-[var(--primary)]/10 group-hover:text-[var(--primary)]"}`}>
                          ✓
                        </span>
                      </div>
                      <p className="mt-2 text-xs font-medium leading-relaxed text-[var(--muted)]">{key.help}</p>
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() => setSelectedId("")}
                  className="mt-2 w-full rounded-2xl py-4 text-center text-sm font-bold text-[var(--muted)] transition-colors hover:text-[var(--primary)]"
                >
                  Xoá bộ lọc / Xem tất cả
                </button>
              </div>
            </div>

            {/* Right Box: Floating Suggested Classes */}
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-[var(--foreground)]">Gợi ý khóa phù hợp</h3>
              <div className="mt-6 flex flex-col gap-5">
                {courses
                  .slice()
                  .sort((a, b) => {
                    const as = recommended.has(a.slug) ? 1 : 0;
                    const bs = recommended.has(b.slug) ? 1 : 0;
                    return bs - as;
                  })
                  .slice(0, 3)
                  .map((c) => (
                    <div key={c.slug} className={`transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${recommended.has(c.slug) ? "translate-x-0 opacity-100" : "translate-x-4 opacity-40 scale-[0.98]"}`}>
                      <CourseCard course={c} emphasized={recommended.has(c.slug)} />
                    </div>
                  ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}


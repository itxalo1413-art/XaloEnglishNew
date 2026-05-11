"use client";

import { useEffect, useMemo, useState } from "react";
import { adminApi } from "@/lib/admin-api";
import { getAdminToken } from "@/components/admin/auth";

type Testimonial = {
  _id: string;
  student_name: string;
  score_achieved: string;
  testimonial_text: string;
  certificate_image_url?: string;
  createdAt?: string;
  updatedAt?: string;
};

export default function AdminTestimonialsPage() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<Testimonial[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return rows;
    return rows.filter((r) =>
      [r.student_name, r.score_achieved, r.testimonial_text]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [rows, q]);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) return;
    let alive = true;
    (async () => {
      try {
        const list = (await adminApi.testimonials.list(token)) as Testimonial[];
        if (!alive) return;
        setRows(list);
      } catch (e: any) {
        if (!alive) return;
        setError(e?.message ?? "Không tải được feedback.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
            Feedback
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Dữ liệu từ Testimonial (student_name, score_achieved, testimonial_text…).
          </p>
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Tìm theo tên / band / nội dung…"
          className="h-10 w-full rounded-sm border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none transition focus:border-[var(--border-strong)] sm:w-[320px]"
        />
      </div>

      {loading ? (
        <p className="mt-8 text-sm text-[var(--muted)]">Đang tải…</p>
      ) : error ? (
        <div className="mt-8 rounded-sm bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
          {error}
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          {filtered.map((r) => (
            <div
              key={r._id}
              className="rounded-sm bg-[var(--surface-2)] p-4 ring-1 ring-black/10"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">
                    {r.student_name}
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--muted)]">
                    Band/Score:{" "}
                    <span className="font-semibold">{r.score_achieved}</span>
                  </p>
                </div>
                <p className="text-xs text-[var(--muted)]">
                  {r.createdAt ? new Date(r.createdAt).toLocaleString() : ""}
                </p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--foreground)]/85">
                {r.testimonial_text}
              </p>
              {r.certificate_image_url ? (
                <p className="mt-3 text-xs text-[var(--muted)]">
                  Certificate:{" "}
                  <span className="font-mono">{r.certificate_image_url}</span>
                </p>
              ) : null}
            </div>
          ))}
          <div className="text-xs text-[var(--muted)]">
            Tổng: <span className="font-semibold">{filtered.length}</span>
          </div>
        </div>
      )}
    </div>
  );
}


"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { adminApi } from "@/lib/admin-api";
import { getAdminToken } from "@/components/admin/auth";

type Course = {
  _id: string;
  name: string;
  slug: string;
  short_description: string;
  price: number;
  is_active: boolean;
  image_url?: string;
  full_content: string;
  createdAt?: string;
  updatedAt?: string;
};

export default function AdminCoursesPage() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return rows;
    return rows.filter((r) =>
      [r.name, r.slug, r.short_description]
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
        const list = (await adminApi.courses.listAll(token)) as Course[];
        if (!alive) return;
        setRows(list);
      } catch (e: any) {
        if (!alive) return;
        setError(e?.message ?? "Không tải được khóa học.");
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
            Khóa học
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Dữ liệu từ Course (name, slug, short_description, price, is_active…).
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Link
            href="/admin/courses/new"
            className="inline-flex h-10 items-center justify-center rounded-sm bg-[var(--primary)] px-3 text-sm font-semibold text-[var(--on-primary)] transition-opacity hover:opacity-90"
          >
            Thêm khóa học
          </Link>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tìm theo tên / slug…"
            className="h-10 w-full rounded-sm border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none transition focus:border-[var(--border-strong)] sm:w-[320px]"
          />
        </div>
      </div>

      {loading ? (
        <p className="mt-8 text-sm text-[var(--muted)]">Đang tải…</p>
      ) : error ? (
        <div className="mt-8 rounded-sm bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
          {error}
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-sm ring-1 ring-black/10">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] border-collapse bg-[var(--background)] text-sm">
              <thead className="bg-[var(--surface-2)]">
                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                  <th className="px-4 py-3">Tên</th>
                  <th className="px-4 py-3">Slug</th>
                  <th className="px-4 py-3">Giá</th>
                  <th className="px-4 py-3">Active</th>
                  <th className="px-4 py-3">Cập nhật</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r._id} className="border-t border-black/5 align-top">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-[var(--foreground)]">
                        {r.name}
                      </div>
                      <div className="mt-1 line-clamp-2 max-w-[520px] text-xs text-[var(--muted)]">
                        {r.short_description}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-[var(--foreground)]">
                      {r.slug}
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--foreground)]">
                      {typeof r.price === "number"
                        ? r.price.toLocaleString("vi-VN")
                        : "—"}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={[
                          "inline-flex rounded-full px-2 py-0.5 text-xs font-semibold",
                          r.is_active
                            ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                            : "bg-neutral-100 text-neutral-700 ring-1 ring-neutral-200",
                        ].join(" ")}
                      >
                        {r.is_active ? "active" : "inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--muted)]">
                      {r.updatedAt ? new Date(r.updatedAt).toLocaleString() : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-black/5 bg-[var(--surface-2)] px-4 py-2 text-xs text-[var(--muted)]">
            Tổng: <span className="font-semibold">{filtered.length}</span>
          </div>
        </div>
      )}
    </div>
  );
}


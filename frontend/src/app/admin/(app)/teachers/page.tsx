"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { adminApi } from "@/lib/admin-api";
import { getAdminToken } from "@/components/admin/auth";

type Teacher = {
  _id: string;
  name: string;
  bio: string;
  expertise: string;
  profile_image_url: string;
  createdAt?: string;
  updatedAt?: string;
};

export default function AdminTeachersPage() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<Teacher[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return rows;
    return rows.filter((r) =>
      [r.name, r.expertise, r.bio].join(" ").toLowerCase().includes(query),
    );
  }, [rows, q]);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) return;
    let alive = true;
    (async () => {
      try {
        const list = (await adminApi.teachers.list(token)) as Teacher[];
        if (!alive) return;
        setRows(list);
      } catch (e: any) {
        if (!alive) return;
        setError(e?.message ?? "Không tải được giáo viên.");
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
            Giáo viên
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Dữ liệu từ Teacher (name, bio, expertise, profile_image_url).
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Link
            href="/admin/teachers/new"
            className="inline-flex h-10 items-center justify-center rounded-sm bg-[var(--primary)] px-3 text-sm font-semibold text-[var(--on-primary)] transition-opacity hover:opacity-90"
          >
            Thêm giáo viên
          </Link>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tìm theo tên / chuyên môn…"
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
                  <th className="px-4 py-3">Chuyên môn</th>
                  <th className="px-4 py-3">Bio</th>
                  <th className="px-4 py-3">Ảnh</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r._id} className="border-t border-black/5 align-top">
                    <td className="px-4 py-3 font-semibold text-[var(--foreground)]">
                      {r.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--foreground)]">
                      {r.expertise}
                    </td>
                    <td className="px-4 py-3">
                      <div className="line-clamp-3 max-w-[520px] text-xs text-[var(--muted)]">
                        {r.bio}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-[var(--muted)]">
                      {r.profile_image_url || "—"}
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


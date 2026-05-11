"use client";

import { useEffect, useMemo, useState } from "react";
import { adminApi } from "@/lib/admin-api";
import { getAdminToken } from "@/components/admin/auth";

type Schedule = {
  _id: string;
  month: string;
  scheduleImgURL: string[];
  title?: string;
  createdAt?: string;
  updatedAt?: string;
};

export default function AdminSchedulesPage() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<Schedule[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return rows;
    return rows.filter((r) =>
      [r.title ?? "", r.month].join(" ").toLowerCase().includes(query),
    );
  }, [rows, q]);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) return;
    let alive = true;
    (async () => {
      try {
        const list = (await adminApi.schedules.list(token)) as Schedule[];
        if (!alive) return;
        setRows(list);
      } catch (e: any) {
        if (!alive) return;
        setError(e?.message ?? "Không tải được lịch khai giảng.");
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
            Lịch khai giảng
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Dữ liệu từ Schedule (month, scheduleImgURL[], title).
          </p>
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Tìm theo tiêu đề / tháng…"
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
        <div className="mt-8 overflow-hidden rounded-sm ring-1 ring-black/10">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] border-collapse bg-[var(--background)] text-sm">
              <thead className="bg-[var(--surface-2)]">
                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                  <th className="px-4 py-3">Tháng</th>
                  <th className="px-4 py-3">Tiêu đề</th>
                  <th className="px-4 py-3">Ảnh lịch</th>
                  <th className="px-4 py-3">Cập nhật</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r._id} className="border-t border-black/5 align-top">
                    <td className="px-4 py-3 text-sm font-semibold text-[var(--foreground)]">
                      {r.month
                        ? new Date(r.month).toLocaleDateString("vi-VN", {
                            year: "numeric",
                            month: "2-digit",
                          })
                        : "—"}
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--foreground)]">
                      {r.title || "—"}
                    </td>
                    <td className="px-4 py-3">
                      {r.scheduleImgURL?.length ? (
                        <ul className="space-y-1 text-xs text-[var(--muted)]">
                          {r.scheduleImgURL.map((u, i) => (
                            <li key={`${r._id}-u-${i}`} className="font-mono">
                              {u}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-xs text-[var(--muted)]">—</span>
                      )}
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


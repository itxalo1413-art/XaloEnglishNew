"use client";

import { useEffect, useMemo, useState } from "react";
import { adminApi } from "@/lib/admin-api";
import { getAdminToken } from "@/components/admin/auth";

type Lead = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  goals?: string[];
  consultationTime?: string[];
  status: "new" | "contacted" | "converted" | "closed" | string;
  createdAt?: string;
  updatedAt?: string;
};

const STATUS_OPTIONS: Array<Lead["status"]> = [
  "new",
  "contacted",
  "converted",
  "closed",
];

function Badge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-black/5 px-2 py-0.5 text-xs font-semibold text-[var(--foreground)]">
      {children}
    </span>
  );
}

export default function AdminLeadsPage() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<Lead[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return rows;
    return rows.filter((r) =>
      [r.name, r.email, r.phone, r.status, r.message ?? ""]
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
        const list = (await adminApi.leads.list(token)) as Lead[];
        if (!alive) return;
        setRows(list);
      } catch (e: any) {
        if (!alive) return;
        setError(e?.message ?? "Không tải được leads.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const onUpdateStatus = async (id: string, status: string) => {
    const token = getAdminToken();
    if (!token) return;
    setSavingId(id);
    try {
      await adminApi.leads.updateStatus(token, id, status);
      setRows((prev) => prev.map((r) => (r._id === id ? { ...r, status } : r)));
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
            Leads / Tư vấn
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Dữ liệu từ Lead (name, email, phone, goals, consultationTime, status…).
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <a
            href={adminApi.leads.exportCsvUrl()}
            className="inline-flex h-10 items-center justify-center rounded-sm border border-[var(--border)] px-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--border-strong)]"
          >
            Export CSV
          </a>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tìm theo tên / email / SĐT / trạng thái…"
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
                  <th className="px-4 py-3">Khách</th>
                  <th className="px-4 py-3">Mục tiêu</th>
                  <th className="px-4 py-3">Khung giờ</th>
                  <th className="px-4 py-3">Trạng thái</th>
                  <th className="px-4 py-3">Ngày</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r._id} className="border-t border-black/5 align-top">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-[var(--foreground)]">{r.name}</div>
                      <div className="mt-1 text-xs text-[var(--muted)]">
                        {r.email} · {r.phone}
                      </div>
                      {r.message ? (
                        <div className="mt-2 line-clamp-3 max-w-[380px] text-xs text-[var(--muted)]">
                          {r.message}
                        </div>
                      ) : null}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1.5">
                        {(r.goals ?? []).length ? (
                          (r.goals ?? []).map((g, i) => (
                            <Badge key={`${r._id}-g-${i}`}>{g}</Badge>
                          ))
                        ) : (
                          <span className="text-xs text-[var(--muted)]">—</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1.5">
                        {(r.consultationTime ?? []).length ? (
                          (r.consultationTime ?? []).map((t, i) => (
                            <Badge key={`${r._id}-t-${i}`}>{t}</Badge>
                          ))
                        ) : (
                          <span className="text-xs text-[var(--muted)]">—</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={r.status}
                        onChange={(e) => onUpdateStatus(r._id, e.target.value)}
                        disabled={savingId === r._id}
                        className="h-9 w-[160px] rounded-sm border border-[var(--border)] bg-[var(--background)] px-2 text-sm outline-none transition focus:border-[var(--border-strong)] disabled:opacity-60"
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--muted)]">
                      {r.createdAt ? new Date(r.createdAt).toLocaleString() : "—"}
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


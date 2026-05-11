"use client";

import { useEffect, useMemo, useState } from "react";
import { adminApi } from "@/lib/admin-api";
import { getAdminToken } from "@/components/admin/auth";

type JobPosition = {
  _id: string;
  title: string;
  description: string;
  requirements: string[];
  benefits: string[];
  salary?: string;
  location: string;
  type: string;
  displayOrder: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
};

type JobApplication = {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  jobPosition: string;
  coverLetter: string;
  resumePdf?: { filename?: string; path?: string; originalName?: string };
  status: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
};

export default function AdminJobsPage() {
  const [loading, setLoading] = useState(true);
  const [positions, setPositions] = useState<JobPosition[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<"positions" | "applications">("positions");
  const [q, setQ] = useState("");

  const filteredPositions = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return positions;
    return positions.filter((r) =>
      [r.title, r.location, r.type, r.description].join(" ").toLowerCase().includes(query),
    );
  }, [positions, q]);

  const filteredApplications = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return applications;
    return applications.filter((r) =>
      [r.fullName, r.email, r.phone, r.jobPosition, r.status].join(" ").toLowerCase().includes(query),
    );
  }, [applications, q]);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) return;
    let alive = true;
    (async () => {
      try {
        const [p, a] = await Promise.all([
          adminApi.jobPositions.list(token),
          adminApi.jobApplications.list(token),
        ]);
        if (!alive) return;
        setPositions(p as JobPosition[]);
        setApplications(a as JobApplication[]);
      } catch (e: any) {
        if (!alive) return;
        setError(e?.message ?? "Không tải được tuyển dụng.");
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
            Tuyển dụng
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Job positions + job applications (theo schema backend).
          </p>
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Tìm…"
          className="h-10 w-full rounded-sm border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none transition focus:border-[var(--border-strong)] sm:w-[320px]"
        />
      </div>

      <div className="mt-6 flex gap-2">
        {([
          { id: "positions", label: "Vị trí" },
          { id: "applications", label: "Ứng tuyển" },
        ] as const).map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={[
                "h-10 rounded-sm px-4 text-sm font-semibold transition",
                active
                  ? "bg-[var(--primary)] text-[var(--on-primary)]"
                  : "border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--border-strong)]",
              ].join(" ")}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {loading ? (
        <p className="mt-8 text-sm text-[var(--muted)]">Đang tải…</p>
      ) : error ? (
        <div className="mt-8 rounded-sm bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
          {error}
        </div>
      ) : tab === "positions" ? (
        <div className="mt-8 overflow-hidden rounded-sm ring-1 ring-black/10">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] border-collapse bg-[var(--background)] text-sm">
              <thead className="bg-[var(--surface-2)]">
                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Loại</th>
                  <th className="px-4 py-3">Địa điểm</th>
                  <th className="px-4 py-3">Active</th>
                  <th className="px-4 py-3">Order</th>
                </tr>
              </thead>
              <tbody>
                {filteredPositions.map((r) => (
                  <tr key={r._id} className="border-t border-black/5 align-top">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-[var(--foreground)]">{r.title}</div>
                      <div className="mt-1 line-clamp-2 max-w-[560px] text-xs text-[var(--muted)]">
                        {r.description}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--foreground)]">{r.type}</td>
                    <td className="px-4 py-3 text-sm text-[var(--foreground)]">{r.location}</td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={[
                          "inline-flex rounded-full px-2 py-0.5 text-xs font-semibold",
                          r.isActive
                            ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                            : "bg-neutral-100 text-neutral-700 ring-1 ring-neutral-200",
                        ].join(" ")}
                      >
                        {r.isActive ? "active" : "inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--foreground)]">{r.displayOrder}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-black/5 bg-[var(--surface-2)] px-4 py-2 text-xs text-[var(--muted)]">
            Tổng: <span className="font-semibold">{filteredPositions.length}</span>
          </div>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-sm ring-1 ring-black/10">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] border-collapse bg-[var(--background)] text-sm">
              <thead className="bg-[var(--surface-2)]">
                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                  <th className="px-4 py-3">Ứng viên</th>
                  <th className="px-4 py-3">Vị trí</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">CV</th>
                  <th className="px-4 py-3">Ngày</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((r) => (
                  <tr key={r._id} className="border-t border-black/5 align-top">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-[var(--foreground)]">{r.fullName}</div>
                      <div className="mt-1 text-xs text-[var(--muted)]">
                        {r.email} · {r.phone}
                      </div>
                      <div className="mt-2 line-clamp-2 max-w-[420px] text-xs text-[var(--muted)]">
                        {r.coverLetter}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--foreground)]">{r.jobPosition}</td>
                    <td className="px-4 py-3 text-sm text-[var(--foreground)]">{r.status}</td>
                    <td className="px-4 py-3 text-xs text-[var(--muted)]">
                      {r.resumePdf?.path ? (
                        <span className="font-mono">{r.resumePdf.path}</span>
                      ) : (
                        "—"
                      )}
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
            Tổng: <span className="font-semibold">{filteredApplications.length}</span>
          </div>
        </div>
      )}
    </div>
  );
}


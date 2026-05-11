"use client";

import { useEffect, useMemo, useState } from "react";
import { adminApi } from "@/lib/admin-api";
import { getAdminToken } from "@/components/admin/auth";

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-sm bg-[var(--surface-2)] p-4 ring-1 ring-black/10">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold tracking-tight text-[var(--foreground)]">
        {value}
      </p>
    </div>
  );
}

export default function AdminOverviewPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Record<string, any> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) return;
    let alive = true;
    (async () => {
      try {
        const s = await adminApi.stats(token);
        if (!alive) return;
        setStats(s);
      } catch (e: any) {
        if (!alive) return;
        setError(e?.message ?? "Không tải được thống kê.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const cards = useMemo(() => {
    if (!stats) return [];
    return Object.entries(stats)
      .filter(([k, v]) => k !== "updatedAt" && typeof v === "number")
      .map(([k, v]) => ({ label: k, value: v as number }));
  }, [stats]);

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
            Tổng quan
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Thống kê nhanh từ backend (GET /dashboard/stats).
          </p>
        </div>
      </div>

      {loading ? (
        <p className="mt-8 text-sm text-[var(--muted)]">Đang tải…</p>
      ) : error ? (
        <div className="mt-8 rounded-sm bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
          {error}
        </div>
      ) : (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.length ? (
              cards.map((c) => (
                <StatCard key={c.label} label={c.label} value={c.value} />
              ))
            ) : (
              <div className="rounded-sm bg-[var(--surface-2)] p-4 ring-1 ring-black/10">
                <p className="text-sm text-[var(--muted)]">
                  Chưa có field thống kê nào để hiển thị.
                </p>
              </div>
            )}
          </div>
          {stats?.updatedAt ? (
            <p className="mt-4 text-xs text-[var(--muted)]">
              Cập nhật: <span className="font-semibold">{String(stats.updatedAt)}</span>
            </p>
          ) : null}
        </>
      )}
    </div>
  );
}


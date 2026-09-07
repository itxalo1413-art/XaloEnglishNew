"use client";

import { useEffect, useMemo, useState } from "react";
import { adminApi } from "@/lib/admin-api";
import { leadPurposeFromRecord, leadTimeSlotFromRecord } from "@/lib/leads-api";
import { getAdminToken } from "@/components/admin/auth";
import {
  AdminAlert,
  AdminButton,
  AdminPageHeader,
  AdminSearch,
  AdminTable,
  AdminTd,
  AdminTh,
} from "@/components/admin/admin-ui";

type Lead = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  purpose?: string;
  timeSlot?: string;
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
      <AdminPageHeader
        title="Tư vấn"
        description="Danh sách khách đăng ký tư vấn từ website"
        action={
          <a href={adminApi.leads.exportCsvUrl()} download>
            <AdminButton variant="secondary">Export CSV</AdminButton>
          </a>
        }
      />

      <div className="mt-6 flex justify-end">
        <AdminSearch value={q} onChange={setQ} placeholder="Tìm theo tên / email / SĐT…" />
      </div>

      {loading ? (
        <p className="mt-8 text-sm text-[var(--muted)]">Đang tải…</p>
      ) : error ? (
        <div className="mt-6">
          <AdminAlert>{error}</AdminAlert>
        </div>
      ) : (
        <AdminTable>
            <table className="w-full min-w-[720px] border-collapse bg-[var(--background)] text-sm">
              <thead className="bg-[var(--surface-2)]">
                <tr>
                  <AdminTh>Khách hàng</AdminTh>
                  <AdminTh>Mục đích</AdminTh>
                  <AdminTh>Khung giờ</AdminTh>
                  <AdminTh>Trạng thái</AdminTh>
                  <AdminTh>Ngày gửi</AdminTh>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r._id} className="border-t border-black/5 align-top">
                    <AdminTd>
                      <div className="font-semibold text-[var(--foreground)]">{r.name}</div>
                      <div className="mt-1 text-xs text-[var(--muted)]">
                        {r.email} · {r.phone}
                      </div>
                      {r.message ? (
                        <div className="mt-2 line-clamp-3 max-w-[380px] text-xs text-[var(--muted)]">
                          {r.message}
                        </div>
                      ) : null}
                    </AdminTd>
                    <AdminTd>
                      {(() => {
                        const purpose = leadPurposeFromRecord(r);
                        return purpose ? (
                          <Badge>{purpose}</Badge>
                        ) : (
                          <span className="text-xs text-[var(--muted)]">—</span>
                        );
                      })()}
                    </AdminTd>
                    <AdminTd>
                      {(() => {
                        const slot = leadTimeSlotFromRecord(r);
                        return slot ? (
                          <Badge>{slot}</Badge>
                        ) : (
                          <span className="text-xs text-[var(--muted)]">—</span>
                        );
                      })()}
                    </AdminTd>
                    <AdminTd>
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
                    </AdminTd>
                    <AdminTd>
                      <span className="text-xs text-[var(--muted)]">
                        {r.createdAt ? new Date(r.createdAt).toLocaleString("vi-VN") : "—"}
                      </span>
                    </AdminTd>
                  </tr>
                ))}
              </tbody>
            </table>
        </AdminTable>
      )}
    </div>
  );
}


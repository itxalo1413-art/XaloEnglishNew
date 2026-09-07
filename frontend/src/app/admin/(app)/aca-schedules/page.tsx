"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { adminApi, ApiError } from "@/lib/admin-api";
import { getAdminToken } from "@/components/admin/auth";
import {
  AdminAlert,
  AdminButton,
  AdminField,
  AdminInput,
  AdminPageHeader,
  AdminPanel,
  AdminTable,
  AdminTd,
  AdminTh,
  Plus,
} from "@/components/admin/admin-ui";
import { Trash } from "lucide-react";

type AcaSchedule = {
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
  type: string;
  acaName?: string;
  isBooked: boolean;
  bookedBy?: {
    name: string;
    phone: string;
    email: string;
  } | null;
  createdAt?: string;
};

const TYPE_OPTIONS = [
  { id: "test_speaking_offline", label: "Nhận ca Test speaking/ chấm writing offline", bgColor: "#d0e1fd", textColor: "#1e3a8a" },
  { id: "test_speaking_online", label: "Nhận ca Test speaking/ chấm writing online", bgColor: "#eed2e2", textColor: "#831843" },
  { id: "test_support", label: "Test support", bgColor: "#f9b671", textColor: "#7c2d12" },
  { id: "task_aca", label: "Task ACA", bgColor: "#fde6d2", textColor: "#7c2d12" },
  { id: "teach", label: "Teach", bgColor: "#d2e8d2", textColor: "#065f46" },
] as const;

export default function AdminAcaSchedulesPage() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<AcaSchedule[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Form states
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [type, setType] = useState("test_speaking_online");
  const [acaName, setAcaName] = useState("");

  const load = useCallback(async () => {
    const token = getAdminToken();
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const list = (await adminApi.acaSchedules.listAll(token)) as AcaSchedule[];
      setRows(list);
    } catch (e: unknown) {
      setError(e instanceof ApiError ? e.message : "Không tải được danh sách lịch trực.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onCreate = async (e: FormEvent) => {
    e.preventDefault();
    const token = getAdminToken();
    if (!token || !date || !startTime || !endTime) return;
    setSaving(true);
    setError(null);
    try {
      await adminApi.acaSchedules.create(token, {
        date,
        startTime,
        endTime,
        type,
        acaName: acaName.trim() || undefined,
      });
      // Reset form but keep date/acaName for convenience of adding multiple slots in same day
      setStartTime("");
      setEndTime("");
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Thêm ca trực thất bại.");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Xóa ca trực này?")) return;
    const token = getAdminToken();
    if (!token) return;
    setSaving(true);
    try {
      await adminApi.acaSchedules.delete(token, id);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Xóa ca trực thất bại.");
    } finally {
      setSaving(false);
    }
  };

  const onUnbook = async (id: string) => {
    if (!confirm("Hủy trạng thái đăng ký của ca trực này? (Sẽ xóa thông tin học viên đã đặt)")) return;
    const token = getAdminToken();
    if (!token) return;
    setSaving(true);
    try {
      await adminApi.acaSchedules.update(token, id, { isBooked: false });
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Cập nhật ca trực thất bại.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Quản lý Lịch Rảnh ACA"
        description="Thiết lập các ca trực/khung giờ rảnh của ACA để học viên đăng ký test speaking trực tuyến hoặc trực tiếp."
      />

      {error ? (
        <div className="mt-6">
          <AdminAlert>{error}</AdminAlert>
        </div>
      ) : null}

      {/* Color Code Legend */}
      <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-6">
        <h3 className="text-sm font-extrabold uppercase tracking-widest text-[var(--muted)] mb-4">COLOR CODE</h3>
        <div className="space-y-2 max-w-xl">
          {TYPE_OPTIONS.map((opt) => (
            <div key={opt.id} className="flex items-center justify-between border-b border-black/5 pb-2 last:border-0 last:pb-0">
              <span className="text-sm italic font-medium text-[var(--foreground)]">{opt.label}</span>
              <span
                className="w-32 h-8 rounded border border-black/10 inline-block"
                style={{ backgroundColor: opt.bgColor }}
              />
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={onCreate} className="mt-8">
        <AdminPanel title="Thêm ca trực rảnh mới">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <AdminField label="Ngày">
              <AdminInput
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </AdminField>
            <AdminField label="Giờ bắt đầu">
              <AdminInput
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </AdminField>
            <AdminField label="Giờ kết thúc">
              <AdminInput
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </AdminField>
            <AdminField label="Phân loại ca trực">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--border-strong)]"
              >
                {TYPE_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label.split(" ").slice(0, 3).join(" ")}...
                  </option>
                ))}
              </select>
            </AdminField>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <AdminField label="Tên ACA phụ trách (tùy chọn)">
              <AdminInput
                value={acaName}
                onChange={(e) => setAcaName(e.target.value)}
                placeholder="Ví dụ: Cô Thảo Trang"
              />
            </AdminField>
          </div>
          <div className="mt-6">
            <AdminButton type="submit" variant="primary" disabled={saving || !date || !startTime || !endTime}>
              <Plus className="h-4 w-4" />
              Thêm ca trực
            </AdminButton>
          </div>
        </AdminPanel>
      </form>

      {loading ? (
        <p className="mt-8 text-sm text-[var(--muted)]">Đang tải danh sách…</p>
      ) : (
        <AdminTable>
          <table className="w-full min-w-[760px] border-collapse bg-[var(--background)] text-sm">
            <thead className="bg-[var(--surface-2)]">
              <tr>
                <AdminTh>Ngày trực</AdminTh>
                <AdminTh>Thời gian</AdminTh>
                <AdminTh>Phân loại ca trực</AdminTh>
                <AdminTh>ACA phụ trách</AdminTh>
                <AdminTh>Học viên đăng ký</AdminTh>
                <AdminTh>Thao tác</AdminTh>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-sm text-[var(--muted)]">
                    Chưa có ca trực nào được thiết lập. Thêm mới ca trực ở phía trên.
                  </td>
                </tr>
              ) : (
                rows.map((r) => {
                  const typeOpt = TYPE_OPTIONS.find((t) => t.id === r.type);
                  return (
                    <tr key={r._id} className="border-t border-black/5 align-top">
                      <AdminTd>
                        <span className="font-semibold text-[var(--foreground)]">
                          {r.date ? new Date(r.date).toLocaleDateString("vi-VN", { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' }) : "—"}
                        </span>
                      </AdminTd>
                      <AdminTd>
                        <span className="font-semibold text-[var(--foreground)]">
                          {r.startTime} - {r.endTime}
                        </span>
                      </AdminTd>
                      <AdminTd>
                        <span
                          className="px-2.5 py-1.5 rounded border border-black/10 inline-block text-xs font-bold leading-tight"
                          style={{
                            backgroundColor: typeOpt?.bgColor || "#eee",
                            color: typeOpt?.textColor || "#333",
                          }}
                        >
                          {typeOpt?.label || r.type}
                        </span>
                      </AdminTd>
                      <AdminTd>
                        <span className="text-sm font-medium text-[var(--foreground)]">
                          {r.acaName || "Chưa phân công"}
                        </span>
                      </AdminTd>
                      <AdminTd>
                        {r.isBooked && r.bookedBy ? (
                          <div className="rounded bg-black/5 p-2 text-xs">
                            <p className="font-bold text-[var(--foreground)]">{r.bookedBy.name}</p>
                            <p className="mt-0.5 text-[var(--muted)]">{r.bookedBy.phone}</p>
                            {r.bookedBy.email && (
                              <p className="mt-0.5 text-[var(--muted)]">{r.bookedBy.email}</p>
                            )}
                            <button
                              type="button"
                              onClick={() => onUnbook(r._id)}
                              className="mt-1.5 font-semibold text-red-600 hover:text-red-700 hover:underline"
                            >
                              Hủy đăng ký (Reset)
                            </button>
                          </div>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-xs font-bold text-green-700 ring-1 ring-inset ring-green-600/20">
                            Còn trống
                          </span>
                        )}
                      </AdminTd>
                      <AdminTd>
                        <button
                          type="button"
                          onClick={() => onDelete(r._id)}
                          disabled={saving}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
                          title="Xóa ca trực"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </AdminTd>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </AdminTable>
      )}
    </div>
  );
}

"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { adminApi, ApiError } from "@/lib/admin-api";
import { getAdminToken } from "@/components/admin/auth";
import { uploadAdminImage } from "@/lib/admin-upload";
import {
  AdminAlert,
  AdminButton,
  AdminField,
  AdminInput,
  AdminModal,
  AdminPageHeader,
  AdminPanel,
  AdminRowActions,
  AdminTable,
  AdminTd,
  AdminTh,
  ImageThumbRow,
  MonthLabel,
  MultiImagePicker,
  Plus,
} from "@/components/admin/admin-ui";

type Schedule = {
  _id: string;
  month: string;
  scheduleImgURL: string[];
  title?: string;
  updatedAt?: string;
};

function monthInputValue(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

function monthToIso(monthStr: string) {
  const [y, m] = monthStr.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, 1).toISOString();
}

export default function AdminSchedulesPage() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<Schedule[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [month, setMonth] = useState("");
  const [title, setTitle] = useState("");
  const [newFiles, setNewFiles] = useState<File[]>([]);

  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<Schedule | null>(null);
  const [editMonth, setEditMonth] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editUrls, setEditUrls] = useState<string[]>([]);
  const [editNewFiles, setEditNewFiles] = useState<File[]>([]);

  const load = useCallback(async () => {
    const token = getAdminToken();
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const list = (await adminApi.schedules.list(token)) as Schedule[];
      setRows(list);
    } catch (e: unknown) {
      setError(e instanceof ApiError ? e.message : "Không tải được lịch khai giảng.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const uploadFiles = async (token: string, files: File[]) => {
    const urls: string[] = [];
    setUploading(true);
    try {
      for (const file of files) {
        urls.push(await uploadAdminImage(token, file));
      }
      return urls;
    } finally {
      setUploading(false);
    }
  };

  const onCreate = async (e: FormEvent) => {
    e.preventDefault();
    const token = getAdminToken();
    if (!token || !month) return;
    setSaving(true);
    setError(null);
    try {
      const uploaded = await uploadFiles(token, newFiles);
      await adminApi.schedules.create(token, {
        month: monthToIso(month),
        title: title.trim() || undefined,
        scheduleImgURL: uploaded,
      });
      setMonth("");
      setTitle("");
      setNewFiles([]);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Thêm lịch thất bại.");
    } finally {
      setSaving(false);
    }
  };

  const openEdit = (row: Schedule) => {
    setEditing(row);
    setEditMonth(monthInputValue(row.month));
    setEditTitle(row.title ?? "");
    setEditUrls([...(row.scheduleImgURL ?? [])]);
    setEditNewFiles([]);
    setEditOpen(true);
  };

  const onSaveEdit = async (e: FormEvent) => {
    e.preventDefault();
    const token = getAdminToken();
    if (!token || !editing || !editMonth) return;
    setSaving(true);
    setError(null);
    try {
      const uploaded = await uploadFiles(token, editNewFiles);
      await adminApi.schedules.update(token, editing._id, {
        month: monthToIso(editMonth),
        title: editTitle.trim() || undefined,
        scheduleImgURL: [...editUrls, ...uploaded],
      });
      setEditOpen(false);
      setEditing(null);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Cập nhật thất bại.");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Xóa lịch khai giảng này?")) return;
    const token = getAdminToken();
    if (!token) return;
    setSaving(true);
    try {
      await adminApi.schedules.delete(token, id);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Xóa thất bại.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Lịch khai giảng"
        description="Tạo lịch theo tháng, upload nhiều ảnh và sắp xếp thứ tự"
      />

      {error ? (
        <div className="mt-6">
          <AdminAlert>{error}</AdminAlert>
        </div>
      ) : null}

      <form onSubmit={onCreate} className="mt-8">
        <AdminPanel title="Thêm lịch khai giảng mới">
          <div className="grid gap-5 sm:grid-cols-2">
            <AdminField label="Tháng">
              <AdminInput
                type="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                required
              />
            </AdminField>
            <AdminField label="Tiêu đề (tuỳ chọn)">
              <AdminInput
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="VD: Lịch khai giảng đợt 1"
              />
            </AdminField>
          </div>
          <div className="mt-5">
            <MultiImagePicker
              label="Hình ảnh (chọn nhiều)"
              files={newFiles}
              onFilesChange={setNewFiles}
              existingUrls={[]}
              onRemoveExisting={() => {}}
              uploading={uploading}
            />
          </div>
          <div className="mt-6">
            <AdminButton type="submit" variant="primary" disabled={saving || uploading || !month}>
              <Plus className="h-4 w-4" />
              Thêm lịch
            </AdminButton>
          </div>
        </AdminPanel>
      </form>

      {loading ? (
        <p className="mt-8 text-sm text-[var(--muted)]">Đang tải…</p>
      ) : (
        <AdminTable>
          <table className="w-full min-w-[640px] border-collapse bg-[var(--background)] text-sm">
            <thead className="bg-[var(--surface-2)]">
              <tr>
                <AdminTh>Hình ảnh</AdminTh>
                <AdminTh>Tháng</AdminTh>
                <AdminTh>Tiêu đề</AdminTh>
                <AdminTh>Thao tác</AdminTh>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-sm text-[var(--muted)]">
                    Chưa có lịch nào. Thêm lịch mới ở form phía trên.
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={r._id} className="border-t border-black/5">
                    <AdminTd>
                      <ImageThumbRow urls={r.scheduleImgURL ?? []} />
                    </AdminTd>
                    <AdminTd>
                      <MonthLabel iso={r.month} />
                    </AdminTd>
                    <AdminTd>
                      <span className="text-sm text-[var(--foreground)]">
                        {r.title || "—"}
                      </span>
                    </AdminTd>
                    <AdminTd>
                      <AdminRowActions
                        onEdit={() => openEdit(r)}
                        onDelete={() => onDelete(r._id)}
                        deleting={saving}
                      />
                    </AdminTd>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </AdminTable>
      )}

      <AdminModal
        open={editOpen}
        title="Chỉnh sửa lịch khai giảng"
        onClose={() => setEditOpen(false)}
        wide
      >
        <form onSubmit={onSaveEdit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <AdminField label="Tháng">
              <AdminInput
                type="month"
                value={editMonth}
                onChange={(e) => setEditMonth(e.target.value)}
                required
              />
            </AdminField>
            <AdminField label="Tiêu đề (tuỳ chọn)">
              <AdminInput value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
            </AdminField>
          </div>
          <MultiImagePicker
            label="Hình ảnh"
            files={editNewFiles}
            onFilesChange={setEditNewFiles}
            existingUrls={editUrls}
            onRemoveExisting={(i) => setEditUrls((prev) => prev.filter((_, idx) => idx !== i))}
            uploading={uploading}
          />
          <div className="flex gap-3 pt-2">
            <AdminButton type="submit" variant="primary" disabled={saving || uploading}>
              Lưu thay đổi
            </AdminButton>
            <AdminButton type="button" variant="secondary" onClick={() => setEditOpen(false)}>
              Huỷ
            </AdminButton>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}

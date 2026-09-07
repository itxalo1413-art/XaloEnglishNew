"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
  AdminRowActions,
  AdminSearch,
  AdminTable,
  AdminTd,
  AdminTextarea,
  AdminTh,
  Plus,
} from "@/components/admin/admin-ui";

type Course = {
  _id: string;
  title: string;
  slug: string;
  mode: string;
  note?: string;
  is_active: boolean;
  image_url?: string;
  full_content?: string;
  updatedAt?: string;
};

export default function AdminCoursesPage() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<Course | null>(null);
  const [title, setTitle] = useState("");
  const [mode, setMode] = useState<"online" | "offline">("online");
  const [note, setNote] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [fullContent, setFullContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const filtered = rows.filter((r) => {
    const query = q.trim().toLowerCase();
    if (!query) return true;
    return [r.title, r.slug, r.mode, r.note ?? ""].join(" ").toLowerCase().includes(query);
  });

  const load = useCallback(async () => {
    const token = getAdminToken();
    if (!token) return;
    setLoading(true);
    try {
      setRows((await adminApi.courses.listAll(token)) as Course[]);
    } catch (e: unknown) {
      setError(e instanceof ApiError ? e.message : "Không tải được khóa học.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openEdit = (c: Course) => {
    setEditing(c);
    setTitle(c.title);
    setMode((c.mode as "online" | "offline") || "online");
    setNote(c.note ?? "");
    setIsActive(c.is_active);
    setFullContent(c.full_content ?? "");
    setImageUrl(c.image_url ?? "");
    setImageFile(null);
    setEditOpen(true);
  };

  const onSaveEdit = async (e: FormEvent) => {
    e.preventDefault();
    const token = getAdminToken();
    if (!token || !editing) return;
    setSaving(true);
    try {
      let image_url = imageUrl || undefined;
      if (imageFile) image_url = await uploadAdminImage(token, imageFile);
      await adminApi.courses.update(token, editing._id, {
        title: title.trim(),
        slug: editing.slug,
        mode,
        note: note.trim() || undefined,
        is_active: isActive,
        image_url,
        full_content: fullContent,
      });
      setEditOpen(false);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Cập nhật thất bại.");
    } finally {
      setSaving(false);
    }
  };

  const onSeedDefaults = async () => {
    const token = getAdminToken();
    if (!token) return;
    setSeeding(true);
    setError(null);
    try {
      const res = await adminApi.courses.seedDefaults(token);
      await load();
      if (res.created === 0 && res.skipped > 0) {
        setError(null);
      }
    } catch (e: unknown) {
      setError(e instanceof ApiError ? e.message : "Không tải được khóa học mẫu.");
    } finally {
      setSeeding(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Xóa khóa học này?")) return;
    const token = getAdminToken();
    if (!token) return;
    await adminApi.courses.delete(token, id);
    await load();
  };

  return (
    <div>
      <AdminPageHeader
        title="Chương trình học"
        description="Quản lý khóa học hiển thị trên website"
        action={
          <div className="flex flex-wrap gap-2">
            {rows.length === 0 ? (
              <AdminButton variant="secondary" onClick={onSeedDefaults} disabled={seeding}>
                {seeding ? "Đang tải…" : "Tải 3 khóa học mẫu"}
              </AdminButton>
            ) : null}
            <Link href="/admin/courses/new">
              <AdminButton variant="primary">
                <Plus className="h-4 w-4" />
                Thêm khóa học
              </AdminButton>
            </Link>
          </div>
        }
      />

      <div className="mt-6 flex justify-end">
        <AdminSearch value={q} onChange={setQ} placeholder="Tìm theo tên…" />
      </div>

      {error ? (
        <div className="mt-6">
          <AdminAlert>{error}</AdminAlert>
        </div>
      ) : null}

      {loading ? (
        <p className="mt-8 text-sm text-[var(--muted)]">Đang tải…</p>
      ) : (
        <AdminTable>
          <table className="w-full min-w-[720px] border-collapse bg-[var(--background)] text-sm">
            <thead className="bg-[var(--surface-2)]">
              <tr>
                <AdminTh>Khóa học</AdminTh>
                <AdminTh>Hình thức</AdminTh>
                <AdminTh>Trạng thái</AdminTh>
                <AdminTh>Thao tác</AdminTh>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-12 text-center">
                    <p className="text-sm text-[var(--muted)]">
                      Chưa có khóa học trong hệ thống. Trang web đang dùng dữ liệu tĩnh — bấm{" "}
                      <strong className="text-[var(--foreground)]">Tải 3 khóa học mẫu</strong> để
                      đồng bộ vào admin.
                    </p>
                    <div className="mt-4">
                      <AdminButton variant="primary" onClick={onSeedDefaults} disabled={seeding}>
                        {seeding ? "Đang tải…" : "Tải 3 khóa học mẫu"}
                      </AdminButton>
                    </div>
                  </td>
                </tr>
              ) : null}
              {filtered.map((r) => (
                <tr key={r._id} className="border-t border-black/5">
                  <AdminTd>
                    <div className="flex items-center gap-3">
                      {r.image_url ? (
                        <div className="relative h-12 w-16 overflow-hidden rounded-sm ring-1 ring-black/10">
                          <Image src={r.image_url} alt="" fill className="object-cover" unoptimized />
                        </div>
                      ) : null}
                      <div>
                        <p className="font-semibold">{r.title}</p>
                        {r.note ? (
                          <p className="mt-0.5 line-clamp-1 text-xs text-[var(--muted)]">{r.note}</p>
                        ) : null}
                      </div>
                    </div>
                  </AdminTd>
                  <AdminTd>
                    <span className="uppercase text-xs font-semibold">{r.mode}</span>
                  </AdminTd>
                  <AdminTd>
                    <span
                      className={
                        r.is_active
                          ? "inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200"
                          : "inline-flex rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-semibold text-neutral-600"
                      }
                    >
                      {r.is_active ? "Đang hiển thị" : "Ẩn"}
                    </span>
                  </AdminTd>
                  <AdminTd>
                    <AdminRowActions onEdit={() => openEdit(r)} onDelete={() => onDelete(r._id)} />
                  </AdminTd>
                </tr>
              ))}
            </tbody>
          </table>
        </AdminTable>
      )}

      <AdminModal open={editOpen} title="Chỉnh sửa khóa học" onClose={() => setEditOpen(false)} wide>
        <form onSubmit={onSaveEdit} className="space-y-4">
          <AdminField label="Tên khóa học">
            <AdminInput value={title} onChange={(e) => setTitle(e.target.value)} required />
          </AdminField>
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Hình thức">
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as "online" | "offline")}
                className="h-11 w-full rounded-sm border border-[var(--border)] bg-[var(--background)] px-3 text-sm"
              >
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </AdminField>
            <AdminField label="Trạng thái">
              <label className="mt-2 flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
                Hiển thị trên web
              </label>
            </AdminField>
          </div>
          <AdminField label="Ghi chú ngắn">
            <AdminInput value={note} onChange={(e) => setNote(e.target.value)} />
          </AdminField>
          <AdminField label="Ảnh">
            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] ?? null)} className="text-sm" />
          </AdminField>
          <AdminField label="Nội dung chi tiết">
            <AdminTextarea rows={6} value={fullContent} onChange={(e) => setFullContent(e.target.value)} />
          </AdminField>
          <AdminButton type="submit" variant="primary" disabled={saving}>
            Lưu
          </AdminButton>
        </form>
      </AdminModal>
    </div>
  );
}

"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { adminApi, ApiError } from "@/lib/admin-api";
import { getAdminToken } from "@/components/admin/auth";
import { uploadAdminImage } from "@/lib/admin-upload";
import {
  AdminAlert,
  AdminButton,
  AdminField,
  AdminInput,
  AdminPageHeader,
  AdminPanel,
  AdminTextarea,
} from "@/components/admin/admin-ui";

export default function AdminNewCoursePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [mode, setMode] = useState<"online" | "offline">("online");
  const [note, setNote] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [fullContent, setFullContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const canSubmit = useMemo(() => title.trim().length > 0, [title]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit || saving) return;
    const token = getAdminToken();
    if (!token) return;

    setSaving(true);
    setError(null);
    try {
      let image_url: string | undefined;
      if (imageFile) image_url = await uploadAdminImage(token, imageFile);
      await adminApi.courses.create(token, {
        title: title.trim(),
        mode,
        note: note.trim() || undefined,
        is_active: isActive,
        image_url,
        full_content: fullContent.trim() || undefined,
      });
      router.replace("/admin/courses");
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Tạo khóa học thất bại. Vui lòng thử lại.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <AdminPageHeader title="Thêm khóa học" description="Khóa học mới sẽ hiển thị trên trang Khóa học" />

      <form onSubmit={onSubmit} className="mt-8">
        <AdminPanel>
          <AdminField label="Tên khóa học">
            <AdminInput value={title} onChange={(e) => setTitle(e.target.value)} required />
          </AdminField>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
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
                <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
                Hiển thị trên web
              </label>
            </AdminField>
          </div>
          <div className="mt-4">
            <AdminField label="Ghi chú ngắn">
              <AdminInput value={note} onChange={(e) => setNote(e.target.value)} />
            </AdminField>
          </div>
          <div className="mt-4">
            <AdminField label="Ảnh khóa học">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                className="block w-full text-sm file:mr-3 file:rounded-sm file:border-0 file:bg-[var(--primary)] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-[var(--on-primary)]"
              />
            </AdminField>
          </div>
          <div className="mt-4">
            <AdminField label="Nội dung chi tiết">
              <AdminTextarea rows={8} value={fullContent} onChange={(e) => setFullContent(e.target.value)} />
            </AdminField>
          </div>

          {error ? (
            <div className="mt-4">
              <AdminAlert>{error}</AdminAlert>
            </div>
          ) : null}

          <div className="mt-6 flex gap-2">
            <AdminButton type="submit" variant="primary" disabled={!canSubmit || saving}>
              {saving ? "Đang lưu…" : "Tạo khóa học"}
            </AdminButton>
            <AdminButton type="button" variant="secondary" onClick={() => router.back()}>
              Huỷ
            </AdminButton>
          </div>
        </AdminPanel>
      </form>
    </div>
  );
}

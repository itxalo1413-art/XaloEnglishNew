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

export default function AdminNewTeacherPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [desc, setDesc] = useState("");
  const [students, setStudents] = useState("");
  const [imgFile, setImgFile] = useState<File | null>(null);

  const canSubmit = useMemo(() => {
    return name.trim() && role.trim() && desc.trim() && imgFile;
  }, [name, role, desc, imgFile]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit || saving || !imgFile) return;
    const token = getAdminToken();
    if (!token) return;

    setSaving(true);
    setError(null);
    try {
      const img = await uploadAdminImage(token, imgFile);
      await adminApi.teachers.create(token, {
        name: name.trim(),
        role: role.trim(),
        desc: desc.trim(),
        img,
        students: students.trim() || undefined,
      });
      router.replace("/admin/teachers");
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Tạo giáo viên thất bại. Vui lòng thử lại.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <AdminPageHeader title="Thêm giáo viên" description="Thông tin hiển thị trên trang Về chúng tôi" />

      <form onSubmit={onSubmit} className="mt-8">
        <AdminPanel>
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Tên">
              <AdminInput value={name} onChange={(e) => setName(e.target.value)} required />
            </AdminField>
            <AdminField label="Vai trò">
              <AdminInput
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Giáo viên IELTS / Speaking…"
                required
              />
            </AdminField>
          </div>
          <div className="mt-4">
            <AdminField label="Mô tả">
              <AdminTextarea rows={6} value={desc} onChange={(e) => setDesc(e.target.value)} required />
            </AdminField>
          </div>
          <div className="mt-4">
            <AdminField label="Tổng thời lượng dạy (tuỳ chọn)">
              <AdminInput value={students} onChange={(e) => setStudents(e.target.value)} />
            </AdminField>
          </div>
          <div className="mt-4">
            <AdminField label="Ảnh đại diện">
              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) => setImgFile(e.target.files?.[0] ?? null)}
                className="block w-full text-sm file:mr-3 file:rounded-sm file:border-0 file:bg-[var(--primary)] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-[var(--on-primary)]"
              />
            </AdminField>
          </div>

          {error ? (
            <div className="mt-4">
              <AdminAlert>{error}</AdminAlert>
            </div>
          ) : null}

          <div className="mt-6 flex gap-2">
            <AdminButton type="submit" variant="primary" disabled={!canSubmit || saving}>
              {saving ? "Đang lưu…" : "Tạo giáo viên"}
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

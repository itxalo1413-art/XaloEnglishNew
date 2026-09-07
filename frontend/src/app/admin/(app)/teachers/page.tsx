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

type Teacher = {
  _id: string;
  name: string;
  role: string;
  desc: string;
  img: string;
  students?: string;
};

export default function AdminTeachersPage() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<Teacher[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [saving, setSaving] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<Teacher | null>(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [desc, setDesc] = useState("");
  const [students, setStudents] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [imgFile, setImgFile] = useState<File | null>(null);

  const filtered = rows.filter((r) => {
    const query = q.trim().toLowerCase();
    if (!query) return true;
    return [r.name, r.role, r.desc].join(" ").toLowerCase().includes(query);
  });

  const load = useCallback(async () => {
    const token = getAdminToken();
    if (!token) return;
    setLoading(true);
    try {
      setRows((await adminApi.teachers.list(token)) as Teacher[]);
    } catch (e: unknown) {
      setError(e instanceof ApiError ? e.message : "Không tải được giáo viên.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openEdit = (t: Teacher) => {
    setEditing(t);
    setName(t.name);
    setRole(t.role);
    setDesc(t.desc);
    setStudents(t.students ?? "");
    setImgUrl(t.img);
    setImgFile(null);
    setEditOpen(true);
  };

  const onSaveEdit = async (e: FormEvent) => {
    e.preventDefault();
    const token = getAdminToken();
    if (!token || !editing) return;
    setSaving(true);
    try {
      let img = imgUrl;
      if (imgFile) img = await uploadAdminImage(token, imgFile);
      await adminApi.teachers.update(token, editing._id, {
        name: name.trim(),
        role: role.trim(),
        desc: desc.trim(),
        img,
        students: students.trim() || undefined,
      });
      setEditOpen(false);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Cập nhật thất bại.");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Xóa giáo viên này?")) return;
    const token = getAdminToken();
    if (!token) return;
    await adminApi.teachers.delete(token, id);
    await load();
  };

  return (
    <div>
      <AdminPageHeader
        title="Giáo viên"
        description="Quản lý đội ngũ mentor / giáo viên"
        action={
          <Link href="/admin/teachers/new">
            <AdminButton variant="primary">
              <Plus className="h-4 w-4" />
              Thêm giáo viên
            </AdminButton>
          </Link>
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
          <table className="w-full min-w-[640px] border-collapse bg-[var(--background)] text-sm">
            <thead className="bg-[var(--surface-2)]">
              <tr>
                <AdminTh>Giáo viên</AdminTh>
                <AdminTh>Vai trò</AdminTh>
                <AdminTh>Thao tác</AdminTh>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r._id} className="border-t border-black/5">
                  <AdminTd>
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 overflow-hidden rounded-full ring-1 ring-black/10">
                        <Image src={r.img} alt="" fill className="object-cover" unoptimized />
                      </div>
                      <div>
                        <p className="font-semibold">{r.name}</p>
                        <p className="line-clamp-2 text-xs text-[var(--muted)]">{r.desc}</p>
                      </div>
                    </div>
                  </AdminTd>
                  <AdminTd>{r.role}</AdminTd>
                  <AdminTd>
                    <AdminRowActions onEdit={() => openEdit(r)} onDelete={() => onDelete(r._id)} />
                  </AdminTd>
                </tr>
              ))}
            </tbody>
          </table>
        </AdminTable>
      )}

      <AdminModal open={editOpen} title="Chỉnh sửa giáo viên" onClose={() => setEditOpen(false)} wide>
        <form onSubmit={onSaveEdit} className="space-y-4">
          <AdminField label="Tên">
            <AdminInput value={name} onChange={(e) => setName(e.target.value)} required />
          </AdminField>
          <AdminField label="Vai trò">
            <AdminInput value={role} onChange={(e) => setRole(e.target.value)} required />
          </AdminField>
          <AdminField label="Mô tả">
            <AdminTextarea rows={4} value={desc} onChange={(e) => setDesc(e.target.value)} required />
          </AdminField>
          <AdminField label="Tổng thời lượng dạy (tuỳ chọn)">
            <AdminInput value={students} onChange={(e) => setStudents(e.target.value)} />
          </AdminField>
          <AdminField label="Ảnh đại diện">
            <input type="file" accept="image/*" onChange={(e) => setImgFile(e.target.files?.[0] ?? null)} className="text-sm" />
            {imgUrl && !imgFile ? (
              <div className="relative mt-2 h-16 w-16 overflow-hidden rounded-full ring-1 ring-black/10">
                <Image src={imgUrl} alt="" fill className="object-cover" unoptimized />
              </div>
            ) : null}
          </AdminField>
          <AdminButton type="submit" variant="primary" disabled={saving}>
            Lưu
          </AdminButton>
        </form>
      </AdminModal>
    </div>
  );
}

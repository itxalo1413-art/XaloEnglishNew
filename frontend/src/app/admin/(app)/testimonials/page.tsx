"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import Image from "next/image";
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
  AdminSearch,
  AdminTable,
  AdminTd,
  AdminTextarea,
  AdminTh,
  Plus,
} from "@/components/admin/admin-ui";

type Testimonial = {
  _id: string;
  student_name: string;
  score_achieved: string;
  testimonial_text: string;
  certificate_image_url?: string;
  updatedAt?: string;
};

export default function AdminTestimonialsPage() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<Testimonial[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [score, setScore] = useState("");
  const [text, setText] = useState("");
  const [certFile, setCertFile] = useState<File | null>(null);

  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [editName, setEditName] = useState("");
  const [editScore, setEditScore] = useState("");
  const [editText, setEditText] = useState("");
  const [editCertUrl, setEditCertUrl] = useState("");
  const [editCertFile, setEditCertFile] = useState<File | null>(null);

  const filtered = rows.filter((r) => {
    const query = q.trim().toLowerCase();
    if (!query) return true;
    return [r.student_name, r.score_achieved, r.testimonial_text]
      .join(" ")
      .toLowerCase()
      .includes(query);
  });

  const load = useCallback(async () => {
    const token = getAdminToken();
    if (!token) return;
    setLoading(true);
    try {
      setRows((await adminApi.testimonials.list(token)) as Testimonial[]);
    } catch (e: unknown) {
      setError(e instanceof ApiError ? e.message : "Không tải được feedback.");
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
    if (!token) return;
    setSaving(true);
    setError(null);
    try {
      let certificate_image_url: string | undefined;
      if (certFile) certificate_image_url = await uploadAdminImage(token, certFile);
      await adminApi.testimonials.create(token, {
        student_name: name.trim(),
        score_achieved: score.trim(),
        testimonial_text: text.trim(),
        certificate_image_url,
      });
      setName("");
      setScore("");
      setText("");
      setCertFile(null);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Thêm feedback thất bại.");
    } finally {
      setSaving(false);
    }
  };

  const openEdit = (r: Testimonial) => {
    setEditing(r);
    setEditName(r.student_name);
    setEditScore(r.score_achieved);
    setEditText(r.testimonial_text);
    setEditCertUrl(r.certificate_image_url ?? "");
    setEditCertFile(null);
    setEditOpen(true);
  };

  const onSaveEdit = async (e: FormEvent) => {
    e.preventDefault();
    const token = getAdminToken();
    if (!token || !editing) return;
    setSaving(true);
    try {
      let certificate_image_url = editCertUrl || undefined;
      if (editCertFile) certificate_image_url = await uploadAdminImage(token, editCertFile);
      await adminApi.testimonials.update(token, editing._id, {
        student_name: editName.trim(),
        score_achieved: editScore.trim(),
        testimonial_text: editText.trim(),
        certificate_image_url,
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
    if (!confirm("Xóa feedback này?")) return;
    const token = getAdminToken();
    if (!token) return;
    await adminApi.testimonials.delete(token, id);
    await load();
  };

  return (
    <div>
      <AdminPageHeader
        title="Kết quả học viên"
        description="Feedback và chứng chỉ học viên"
      />

      {error ? (
        <div className="mt-6">
          <AdminAlert>{error}</AdminAlert>
        </div>
      ) : null}

      <form onSubmit={onCreate} className="mt-8">
        <AdminPanel title="Thêm feedback mới">
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Tên học viên">
              <AdminInput value={name} onChange={(e) => setName(e.target.value)} required />
            </AdminField>
            <AdminField label="Điểm / kết quả">
              <AdminInput value={score} onChange={(e) => setScore(e.target.value)} required />
            </AdminField>
          </div>
          <div className="mt-4">
            <AdminField label="Nội dung">
              <AdminTextarea rows={3} value={text} onChange={(e) => setText(e.target.value)} required />
            </AdminField>
          </div>
          <div className="mt-4">
            <AdminField label="Ảnh chứng chỉ (tuỳ chọn)">
              <input type="file" accept="image/*" onChange={(e) => setCertFile(e.target.files?.[0] ?? null)} className="text-sm" />
            </AdminField>
          </div>
          <div className="mt-6">
            <AdminButton type="submit" variant="primary" disabled={saving}>
              <Plus className="h-4 w-4" />
              Thêm
            </AdminButton>
          </div>
        </AdminPanel>
      </form>

      <div className="mt-6 flex justify-end">
        <AdminSearch value={q} onChange={setQ} />
      </div>

      {loading ? (
        <p className="mt-8 text-sm text-[var(--muted)]">Đang tải…</p>
      ) : (
        <AdminTable>
          <table className="w-full min-w-[640px] border-collapse bg-[var(--background)] text-sm">
            <thead className="bg-[var(--surface-2)]">
              <tr>
                <AdminTh>Học viên</AdminTh>
                <AdminTh>Điểm</AdminTh>
                <AdminTh>Thao tác</AdminTh>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r._id} className="border-t border-black/5">
                  <AdminTd>
                    <div className="flex items-start gap-3">
                      {r.certificate_image_url ? (
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-sm ring-1 ring-black/10">
                          <Image src={r.certificate_image_url} alt="" fill className="object-cover" unoptimized />
                        </div>
                      ) : null}
                      <div>
                        <p className="font-semibold">{r.student_name}</p>
                        <p className="mt-1 line-clamp-2 text-xs text-[var(--muted)]">
                          {r.testimonial_text}
                        </p>
                      </div>
                    </div>
                  </AdminTd>
                  <AdminTd>{r.score_achieved}</AdminTd>
                  <AdminTd>
                    <AdminRowActions onEdit={() => openEdit(r)} onDelete={() => onDelete(r._id)} />
                  </AdminTd>
                </tr>
              ))}
            </tbody>
          </table>
        </AdminTable>
      )}

      <AdminModal open={editOpen} title="Chỉnh sửa feedback" onClose={() => setEditOpen(false)}>
        <form onSubmit={onSaveEdit} className="space-y-4">
          <AdminField label="Tên học viên">
            <AdminInput value={editName} onChange={(e) => setEditName(e.target.value)} required />
          </AdminField>
          <AdminField label="Điểm / kết quả">
            <AdminInput value={editScore} onChange={(e) => setEditScore(e.target.value)} required />
          </AdminField>
          <AdminField label="Nội dung">
            <AdminTextarea rows={4} value={editText} onChange={(e) => setEditText(e.target.value)} required />
          </AdminField>
          <AdminField label="Ảnh chứng chỉ">
            <input type="file" accept="image/*" onChange={(e) => setEditCertFile(e.target.files?.[0] ?? null)} className="text-sm" />
          </AdminField>
          <AdminButton type="submit" variant="primary" disabled={saving}>
            Lưu
          </AdminButton>
        </form>
      </AdminModal>
    </div>
  );
}

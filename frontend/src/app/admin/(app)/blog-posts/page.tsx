"use client";

import {
  type Dispatch,
  type FormEvent,
  type SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { adminApi, ApiError } from "@/lib/admin-api";
import { getAdminToken } from "@/components/admin/auth";
import { uploadAdminImage } from "@/lib/admin-upload";
import { convertDocxToHtml } from "@/lib/docx-to-html";
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

type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  coverImageUrl?: string;
  excerpt?: string;
  metaTitle?: string;
  metaDescription?: string;
  contentHtml: string;
  updatedAt?: string;
};

type BlogPostFormState = {
  title: string;
  excerpt: string;
  coverImageUrl: string;
  metaTitle: string;
  metaDescription: string;
  contentHtml: string;
};

const emptyForm = (): BlogPostFormState => ({
  title: "",
  excerpt: "",
  coverImageUrl: "",
  metaTitle: "",
  metaDescription: "",
  contentHtml: "",
});

function BlogPostForm({
  form,
  setForm,
  coverFile,
  setCoverFile,
  importingDocx,
  importNote,
  onImportDocx,
  saving,
  onSubmit,
  submitLabel,
}: {
  form: BlogPostFormState;
  setForm: Dispatch<SetStateAction<BlogPostFormState>>;
  coverFile: File | null;
  setCoverFile: (file: File | null) => void;
  importingDocx: boolean;
  importNote: string | null;
  onImportDocx: (file: File) => void;
  saving: boolean;
  onSubmit: (e: FormEvent) => void;
  submitLabel: string;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <AdminField label="Tiêu đề">
        <AdminInput
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          required
        />
      </AdminField>
      <AdminField label="Mô tả ngắn">
        <AdminTextarea
          rows={2}
          value={form.excerpt}
          onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
        />
      </AdminField>
      <div className="grid gap-4 sm:grid-cols-2">
        <AdminField label="Meta title (SEO)">
          <AdminInput
            value={form.metaTitle}
            onChange={(e) => setForm((f) => ({ ...f, metaTitle: e.target.value }))}
          />
        </AdminField>
        <AdminField label="Meta description (SEO)">
          <AdminInput
            value={form.metaDescription}
            onChange={(e) => setForm((f) => ({ ...f, metaDescription: e.target.value }))}
          />
        </AdminField>
      </div>
      <AdminField label="Ảnh bìa">
        <input
          type="file"
          accept="image/*"
          className="block w-full text-sm file:mr-3 file:rounded-sm file:border-0 file:bg-[var(--primary)] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-[var(--on-primary)]"
          onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
        />
        {form.coverImageUrl && !coverFile ? (
          <div className="relative mt-2 h-24 w-40 overflow-hidden rounded-sm ring-1 ring-black/10">
            <Image src={form.coverImageUrl} alt="" fill className="object-cover" unoptimized />
          </div>
        ) : null}
      </AdminField>
      <AdminField
        label="Nội dung bài viết"
        hint="Soạn trực tiếp HTML hoặc import từ file Word (.docx). Ảnh trong Word sẽ được nhúng vào bài (nên dùng ảnh bìa riêng nếu cần tối ưu SEO)."
      >
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <label className="inline-flex cursor-pointer">
            <input
              type="file"
              accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="sr-only"
              disabled={importingDocx}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onImportDocx(file);
                e.target.value = "";
              }}
            />
            <span className="inline-flex h-10 items-center rounded-sm border border-[var(--border)] bg-[var(--background)] px-4 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--border-strong)]">
              {importingDocx ? "Đang đọc file Word…" : "Import từ Word (.docx)"}
            </span>
          </label>
          {form.contentHtml ? (
            <span className="text-xs text-[var(--muted)]">
              {form.contentHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().length} ký tự
            </span>
          ) : null}
        </div>
        {importNote ? <p className="mb-2 text-xs text-[var(--primary)]">{importNote}</p> : null}
        <AdminTextarea
          rows={12}
          value={form.contentHtml}
          onChange={(e) => setForm((f) => ({ ...f, contentHtml: e.target.value }))}
          required
          className="font-mono text-xs"
          placeholder="Nội dung HTML sau khi import hoặc dán thủ công…"
        />
      </AdminField>
      <div className="flex gap-3 pt-2">
        <AdminButton type="submit" variant="primary" disabled={saving}>
          {submitLabel}
        </AdminButton>
      </div>
    </form>
  );
}

export default function AdminBlogPostsPage() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<BlogPost[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [saving, setSaving] = useState(false);

  const [createOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState(emptyForm());
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [importingDocx, setImportingDocx] = useState(false);
  const [importNote, setImportNote] = useState<string | null>(null);

  const filtered = rows.filter((r) => {
    const query = q.trim().toLowerCase();
    if (!query) return true;
    return [r.title, r.excerpt ?? ""].join(" ").toLowerCase().includes(query);
  });

  const load = useCallback(async () => {
    const token = getAdminToken();
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const list = await adminApi.blogPosts.list(token, 100);
      setRows(list.posts ?? []);
    } catch (e: unknown) {
      setError(e instanceof ApiError ? e.message : "Không tải được bài viết.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openCreate = () => {
    setForm(emptyForm());
    setCoverFile(null);
    setImportNote(null);
    setCreateOpen(true);
  };

  const openEdit = (post: BlogPost) => {
    setEditing(post);
    setForm({
      title: post.title,
      excerpt: post.excerpt ?? "",
      coverImageUrl: post.coverImageUrl ?? "",
      metaTitle: post.metaTitle ?? "",
      metaDescription: post.metaDescription ?? "",
      contentHtml: post.contentHtml,
    });
    setCoverFile(null);
    setImportNote(null);
    setEditOpen(true);
  };

  const onImportDocx = async (file: File) => {
    if (
      form.contentHtml.trim() &&
      !confirm("Nội dung hiện tại sẽ bị thay bằng nội dung từ file Word. Tiếp tục?")
    ) {
      return;
    }

    setImportingDocx(true);
    setImportNote(null);
    setError(null);
    try {
      const result = await convertDocxToHtml(file);
      if (!result.html) {
        setImportNote("File Word không có nội dung để import.");
        return;
      }

      setForm((f) => ({
        ...f,
        contentHtml: result.html,
        title: f.title.trim() || result.titleSuggestion || f.title,
        excerpt: f.excerpt.trim() || result.excerptSuggestion || f.excerpt,
        metaTitle: f.metaTitle.trim() || result.titleSuggestion || f.metaTitle,
        metaDescription:
          f.metaDescription.trim() || result.excerptSuggestion || f.metaDescription,
      }));

      const warn =
        result.warnings.length > 0
          ? ` Đã import với ${result.warnings.length} cảnh báo định dạng.`
          : "";
      setImportNote(`Đã nhập nội dung từ "${file.name}".${warn}`);
    } catch {
      setImportNote("Không đọc được file .docx. Vui lòng kiểm tra lại file.");
    } finally {
      setImportingDocx(false);
    }
  };

  const resolveCoverUrl = async (token: string) => {
    if (coverFile) return uploadAdminImage(token, coverFile);
    return form.coverImageUrl.trim() || undefined;
  };

  const onCreate = async (e: FormEvent) => {
    e.preventDefault();
    const token = getAdminToken();
    if (!token || !form.title.trim() || !form.contentHtml.trim()) return;
    setSaving(true);
    setError(null);
    try {
      const coverImageUrl = await resolveCoverUrl(token);
      await adminApi.blogPosts.create(token, {
        title: form.title.trim(),
        excerpt: form.excerpt.trim() || undefined,
        coverImageUrl,
        metaTitle: form.metaTitle.trim() || undefined,
        metaDescription: form.metaDescription.trim() || undefined,
        contentHtml: form.contentHtml,
      });
      setCreateOpen(false);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Tạo bài viết thất bại.");
    } finally {
      setSaving(false);
    }
  };

  const onSaveEdit = async (e: FormEvent) => {
    e.preventDefault();
    const token = getAdminToken();
    if (!token || !editing) return;
    setSaving(true);
    setError(null);
    try {
      const coverImageUrl = await resolveCoverUrl(token);
      await adminApi.blogPosts.update(token, editing._id, {
        title: form.title.trim(),
        excerpt: form.excerpt.trim() || undefined,
        coverImageUrl,
        metaTitle: form.metaTitle.trim() || undefined,
        metaDescription: form.metaDescription.trim() || undefined,
        contentHtml: form.contentHtml,
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
    if (!confirm("Xóa bài viết này?")) return;
    const token = getAdminToken();
    if (!token) return;
    setSaving(true);
    try {
      await adminApi.blogPosts.delete(token, id);
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
        title="Tin tức"
        description="Quản lý bài viết hiển thị trên trang Tin tức công khai"
        action={
          <AdminButton variant="primary" onClick={openCreate}>
            <Plus className="h-4 w-4" />
            Thêm bài viết
          </AdminButton>
        }
      />

      <div className="mt-6 flex justify-end">
        <AdminSearch value={q} onChange={setQ} placeholder="Tìm theo tiêu đề…" />
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
                <AdminTh>Bài viết</AdminTh>
                <AdminTh>Cập nhật</AdminTh>
                <AdminTh>Thao tác</AdminTh>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r._id} className="border-t border-black/5">
                  <AdminTd>
                    <div className="flex items-start gap-3">
                      {r.coverImageUrl ? (
                        <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-sm ring-1 ring-black/10">
                          <Image
                            src={r.coverImageUrl}
                            alt=""
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="flex h-12 w-16 shrink-0 items-center justify-center rounded-sm bg-[var(--surface-2)] text-[10px] text-[var(--muted)]">
                          No img
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-[var(--foreground)]">{r.title}</p>
                        {r.excerpt ? (
                          <p className="mt-0.5 line-clamp-2 text-xs text-[var(--muted)]">
                            {r.excerpt}
                          </p>
                        ) : null}
                        <Link
                          href={`/blog/${r.slug}`}
                          target="_blank"
                          className="mt-1 inline-block text-xs font-medium text-[var(--primary)] hover:underline"
                        >
                          Xem trên web →
                        </Link>
                      </div>
                    </div>
                  </AdminTd>
                  <AdminTd>
                    <span className="text-xs text-[var(--muted)]">
                      {r.updatedAt ? new Date(r.updatedAt).toLocaleString("vi-VN") : "—"}
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
              ))}
            </tbody>
          </table>
        </AdminTable>
      )}

      <AdminModal open={createOpen} title="Thêm bài viết mới" onClose={() => setCreateOpen(false)} wide>
        <BlogPostForm
          form={form}
          setForm={setForm}
          coverFile={coverFile}
          setCoverFile={setCoverFile}
          importingDocx={importingDocx}
          importNote={importNote}
          onImportDocx={onImportDocx}
          saving={saving}
          onSubmit={onCreate}
          submitLabel="Đăng bài"
        />
      </AdminModal>

      <AdminModal
        open={editOpen}
        title="Chỉnh sửa bài viết"
        onClose={() => setEditOpen(false)}
        wide
      >
        <BlogPostForm
          form={form}
          setForm={setForm}
          coverFile={coverFile}
          setCoverFile={setCoverFile}
          importingDocx={importingDocx}
          importNote={importNote}
          onImportDocx={onImportDocx}
          saving={saving}
          onSubmit={onSaveEdit}
          submitLabel="Lưu thay đổi"
        />
      </AdminModal>
    </div>
  );
}

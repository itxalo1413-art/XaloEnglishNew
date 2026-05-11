"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { adminApi, ApiError } from "@/lib/admin-api";
import { getAdminToken } from "@/components/admin/auth";

export default function AdminNewCoursePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [price, setPrice] = useState<string>("0");
  const [isActive, setIsActive] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [fullContent, setFullContent] = useState("");

  const canSubmit = useMemo(() => {
    return (
      name.trim().length > 0 &&
      shortDescription.trim().length > 0 &&
      fullContent.trim().length > 0 &&
      Number.isFinite(Number(price))
    );
  }, [name, shortDescription, fullContent, price]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit || saving) return;
    const token = getAdminToken();
    if (!token) return;

    setSaving(true);
    setError(null);
    try {
      await adminApi.courses.create(token, {
        name: name.trim(),
        short_description: shortDescription.trim(),
        price: Number(price),
        is_active: isActive,
        image_url: imageUrl.trim() || undefined,
        full_content: fullContent,
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
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
            Thêm khóa học
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Map theo `UpsertCourseDto` (name, short_description, price, is_active, image_url, full_content).
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <div className="grid gap-4 lg:grid-cols-2">
          <label className="block">
            <span className="text-xs font-semibold text-[var(--muted)]">Tên khóa học</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 h-11 w-full rounded-sm border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none transition focus:border-[var(--border-strong)]"
            />
          </label>

          <label className="block">
            <span className="text-xs font-semibold text-[var(--muted)]">Giá</span>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              inputMode="numeric"
              className="mt-2 h-11 w-full rounded-sm border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none transition focus:border-[var(--border-strong)]"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-xs font-semibold text-[var(--muted)]">Mô tả ngắn</span>
          <textarea
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            rows={3}
            className="mt-2 w-full rounded-sm border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none transition focus:border-[var(--border-strong)]"
          />
        </label>

        <div className="grid gap-4 lg:grid-cols-2">
          <label className="block">
            <span className="text-xs font-semibold text-[var(--muted)]">Image URL (optional)</span>
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="mt-2 h-11 w-full rounded-sm border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none transition focus:border-[var(--border-strong)]"
              placeholder="https://..."
            />
          </label>

          <label className="flex items-end gap-3 rounded-sm border border-[var(--border)] bg-[var(--surface-2)] px-3 py-3">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="h-4 w-4"
            />
            <span className="text-sm font-semibold text-[var(--foreground)]">Đang hoạt động</span>
          </label>
        </div>

        <label className="block">
          <span className="text-xs font-semibold text-[var(--muted)]">Nội dung chi tiết (HTML/text)</span>
          <textarea
            value={fullContent}
            onChange={(e) => setFullContent(e.target.value)}
            rows={10}
            className="mt-2 w-full rounded-sm border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none transition focus:border-[var(--border-strong)]"
          />
        </label>

        {error ? (
          <div className="rounded-sm bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-200">
            {error}
          </div>
        ) : null}

        <div className="flex flex-wrap gap-2">
          <button
            type="submit"
            disabled={!canSubmit || saving}
            className="inline-flex h-11 items-center justify-center rounded-sm bg-[var(--primary)] px-5 text-sm font-semibold text-[var(--on-primary)] transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "Đang lưu…" : "Tạo khóa học"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex h-11 items-center justify-center rounded-sm border border-[var(--border)] px-5 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--border-strong)]"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}


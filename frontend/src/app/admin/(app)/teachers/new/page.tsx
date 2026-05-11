"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { adminApi, ApiError } from "@/lib/admin-api";
import { getAdminToken } from "@/components/admin/auth";

export default function AdminNewTeacherPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [expertise, setExpertise] = useState("");
  const [bio, setBio] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");

  const canSubmit = useMemo(() => {
    return (
      name.trim().length > 0 &&
      expertise.trim().length > 0 &&
      bio.trim().length > 0 &&
      profileImageUrl.trim().length > 0
    );
  }, [name, expertise, bio, profileImageUrl]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit || saving) return;
    const token = getAdminToken();
    if (!token) return;

    setSaving(true);
    setError(null);
    try {
      await adminApi.teachers.create(token, {
        name: name.trim(),
        expertise: expertise.trim(),
        bio: bio.trim(),
        profile_image_url: profileImageUrl.trim(),
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
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
            Thêm giáo viên
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Map theo `UpsertTeacherDto` (name, bio, expertise, profile_image_url).
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <div className="grid gap-4 lg:grid-cols-2">
          <label className="block">
            <span className="text-xs font-semibold text-[var(--muted)]">Tên</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 h-11 w-full rounded-sm border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none transition focus:border-[var(--border-strong)]"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-[var(--muted)]">Chuyên môn</span>
            <input
              value={expertise}
              onChange={(e) => setExpertise(e.target.value)}
              className="mt-2 h-11 w-full rounded-sm border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none transition focus:border-[var(--border-strong)]"
              placeholder="IELTS / Speaking / Ngữ pháp..."
            />
          </label>
        </div>

        <label className="block">
          <span className="text-xs font-semibold text-[var(--muted)]">Profile image URL</span>
          <input
            value={profileImageUrl}
            onChange={(e) => setProfileImageUrl(e.target.value)}
            className="mt-2 h-11 w-full rounded-sm border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none transition focus:border-[var(--border-strong)]"
            placeholder="https://... (hoặc /uploads/...)"
          />
        </label>

        <label className="block">
          <span className="text-xs font-semibold text-[var(--muted)]">Bio</span>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={8}
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
            {saving ? "Đang lưu…" : "Tạo giáo viên"}
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


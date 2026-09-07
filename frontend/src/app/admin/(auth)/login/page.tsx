"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { adminApi, ApiError } from "@/lib/admin-api";
import { setAdminToken } from "@/components/admin/auth";
import { getApiBaseUrl } from "@/lib/api-base-url";

export default function AdminLoginPage() {
  const router = useRouter();
  const next = "/admin/overview";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return Boolean(email.trim()) && Boolean(password);
  }, [email, password]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;

    setSubmitting(true);
    setError(null);
    try {
      const res = await adminApi.login(email, password);
      if (!res.isAdmin) {
        setError("Tài khoản này không có quyền admin.");
        return;
      }
      setAdminToken(res.token);
      router.replace(next);
    } catch (err) {
      const msg =
        err instanceof ApiError
          ? err.message
          : "Đăng nhập thất bại. Vui lòng thử lại.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--surface-1)] px-4 py-12">
      <div className="mx-auto w-full max-w-md rounded-sm bg-[var(--background)] p-6 ring-1 ring-black/10 sm:p-8">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
          Đăng nhập Admin
        </h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Dùng tài khoản admin trong hệ thống backend.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-xs font-semibold text-[var(--muted)]">Email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 h-11 w-full rounded-sm border border-[var(--border)] bg-[var(--background)] px-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--border-strong)]"
              placeholder="admin@xaloenglish.vn"
              autoComplete="email"
              inputMode="email"
            />
          </label>

          <label className="block">
            <span className="text-xs font-semibold text-[var(--muted)]">Mật khẩu</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 h-11 w-full rounded-sm border border-[var(--border)] bg-[var(--background)] px-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--border-strong)]"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </label>

          {error ? (
            <div className="rounded-sm bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-200">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className="inline-flex h-11 w-full items-center justify-center rounded-sm bg-[var(--primary)] px-4 text-sm font-semibold text-[var(--on-primary)] transition-opacity disabled:cursor-not-allowed disabled:opacity-50 hover:opacity-90"
          >
            {submitting ? "Đang đăng nhập…" : "Đăng nhập"}
          </button>

          <div className="flex items-center justify-between text-xs text-[var(--muted)]">
            <Link href="/" className="font-semibold hover:text-[var(--foreground)]">
              ← Về website
            </Link>
            <span>
              API:{" "}
              <code className="rounded-sm bg-black/5 px-1.5 py-0.5">
                {getApiBaseUrl()}
              </code>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}


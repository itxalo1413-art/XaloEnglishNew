"use client";

import { FormEvent, useEffect, useState } from "react";
import { adminApi, ApiError } from "@/lib/admin-api";
import { getAdminToken } from "@/components/admin/auth";

type Settings = {
  phone_number?: string;
  email_address?: string;
  facebook_link?: string;
  meta_title_home?: string;
  meta_description_home?: string;
  header_script?: string;
  body_script?: string;
};

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);
  const [form, setForm] = useState<Settings>({});

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const s = (await adminApi.settings.get()) as Settings;
        if (!alive) return;
        setForm(s ?? {});
      } catch (e: any) {
        if (!alive) return;
        setError(e?.message ?? "Không tải được settings.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const token = getAdminToken();
    if (!token) return;
    setSaving(true);
    setError(null);
    setOk(null);
    try {
      await adminApi.settings.update(token, form);
      setOk("Đã lưu.");
    } catch (err) {
      const msg =
        err instanceof ApiError ? err.message : "Lưu thất bại. Vui lòng thử lại.";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
          Cài đặt
        </h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Dữ liệu từ Setting (phone_number, email_address, facebook_link, meta_*…).
        </p>
      </div>

      {loading ? (
        <p className="mt-8 text-sm text-[var(--muted)]">Đang tải…</p>
      ) : (
        <form onSubmit={onSubmit} className="mt-8 space-y-6">
          <div className="grid gap-4 lg:grid-cols-2">
            {[
              { key: "phone_number", label: "Số điện thoại" },
              { key: "email_address", label: "Email" },
              { key: "facebook_link", label: "Facebook link" },
              { key: "meta_title_home", label: "Meta title (Home)" },
            ].map((f) => (
              <label key={f.key} className="block">
                <span className="text-xs font-semibold text-[var(--muted)]">
                  {f.label}
                </span>
                <input
                  value={(form as any)[f.key] ?? ""}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, [f.key]: e.target.value }))
                  }
                  className="mt-2 h-11 w-full rounded-sm border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none transition focus:border-[var(--border-strong)]"
                />
              </label>
            ))}
          </div>

          <label className="block">
            <span className="text-xs font-semibold text-[var(--muted)]">
              Meta description (Home)
            </span>
            <textarea
              value={form.meta_description_home ?? ""}
              onChange={(e) =>
                setForm((p) => ({ ...p, meta_description_home: e.target.value }))
              }
              rows={3}
              className="mt-2 w-full rounded-sm border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none transition focus:border-[var(--border-strong)]"
            />
          </label>

          <label className="block">
            <span className="text-xs font-semibold text-[var(--muted)]">
              Header script
            </span>
            <textarea
              value={form.header_script ?? ""}
              onChange={(e) =>
                setForm((p) => ({ ...p, header_script: e.target.value }))
              }
              rows={5}
              className="mt-2 w-full rounded-sm border border-[var(--border)] bg-[var(--background)] px-3 py-2 font-mono text-xs outline-none transition focus:border-[var(--border-strong)]"
            />
          </label>

          <label className="block">
            <span className="text-xs font-semibold text-[var(--muted)]">
              Body script
            </span>
            <textarea
              value={form.body_script ?? ""}
              onChange={(e) =>
                setForm((p) => ({ ...p, body_script: e.target.value }))
              }
              rows={5}
              className="mt-2 w-full rounded-sm border border-[var(--border)] bg-[var(--background)] px-3 py-2 font-mono text-xs outline-none transition focus:border-[var(--border-strong)]"
            />
          </label>

          {error ? (
            <div className="rounded-sm bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-200">
              {error}
            </div>
          ) : null}
          {ok ? (
            <div className="rounded-sm bg-emerald-50 px-3 py-2 text-sm text-emerald-700 ring-1 ring-emerald-200">
              {ok}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={saving}
            className="inline-flex h-11 items-center justify-center rounded-sm bg-[var(--primary)] px-5 text-sm font-semibold text-[var(--on-primary)] transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "Đang lưu…" : "Lưu thay đổi"}
          </button>
        </form>
      )}
    </div>
  );
}


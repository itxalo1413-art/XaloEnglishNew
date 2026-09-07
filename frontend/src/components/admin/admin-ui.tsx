"use client";

import Image from "next/image";
import { ReactNode, useEffect } from "react";
import { Calendar, Pencil, Plus, Trash2, X } from "lucide-react";

export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">{title}</h1>
        {description ? (
          <p className="mt-1 text-sm text-[var(--muted)]">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export function AdminPanel({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-sm border border-[var(--border)] bg-[var(--surface-2)]/50 p-5 sm:p-6 ${className}`}
    >
      {title ? (
        <h2 className="mb-4 text-sm font-bold text-[var(--foreground)]">{title}</h2>
      ) : null}
      {children}
    </div>
  );
}

export function AdminField({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-[var(--muted)]">{label}</span>
      <div className="mt-2">{children}</div>
      {hint ? <p className="mt-1 text-xs text-[var(--muted)]">{hint}</p> : null}
    </label>
  );
}

const inputClass =
  "h-11 w-full rounded-sm border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none transition focus:border-[var(--border-strong)]";

export function AdminInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={inputClass} {...props} />;
}

export function AdminTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className="w-full rounded-sm border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none transition focus:border-[var(--border-strong)]"
      {...props}
    />
  );
}

export function AdminButton({
  variant = "primary",
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "ghost";
}) {
  const base =
    "inline-flex h-10 items-center justify-center gap-2 rounded-sm px-4 text-sm font-semibold transition disabled:opacity-50";
  const variants = {
    primary: "bg-[var(--primary)] text-[var(--on-primary)] hover:opacity-90",
    secondary:
      "border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:border-[var(--border-strong)]",
    danger: "bg-red-600 text-white hover:bg-red-700",
    ghost: "text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--foreground)]",
  };
  return (
    <button type="button" className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function AdminAlert({ children, tone = "error" }: { children: ReactNode; tone?: "error" | "info" }) {
  const tones = {
    error: "bg-red-50 text-red-700 ring-red-200",
    info: "bg-[var(--surface-2)] text-[var(--foreground)] ring-black/10",
  };
  return (
    <div className={`rounded-sm px-4 py-3 text-sm ring-1 ${tones[tone]}`}>{children}</div>
  );
}

export function AdminSearch({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <AdminInput
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder ?? "Tìm kiếm…"}
      className="sm:max-w-xs"
    />
  );
}

export function AdminTable({ children }: { children: ReactNode }) {
  return (
    <div className="mt-8 overflow-hidden rounded-sm ring-1 ring-black/10">
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}

export function AdminTh({ children }: { children: ReactNode }) {
  return (
    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
      {children}
    </th>
  );
}

export function AdminTd({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <td className={`px-4 py-3 align-middle ${className}`}>{children}</td>;
}

export function AdminRowActions({
  onEdit,
  onDelete,
  deleting,
}: {
  onEdit: () => void;
  onDelete: () => void;
  deleting?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onEdit}
        className="inline-flex h-9 w-9 items-center justify-center rounded-sm text-[var(--primary)] transition hover:bg-[var(--primary)]/10"
        aria-label="Chỉnh sửa"
        title="Chỉnh sửa"
      >
        <Pencil className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={onDelete}
        disabled={deleting}
        className="inline-flex h-9 w-9 items-center justify-center rounded-sm text-red-600 transition hover:bg-red-50 disabled:opacity-50"
        aria-label="Xóa"
        title="Xóa"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

export function AdminModal({
  open,
  title,
  onClose,
  children,
  wide,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Đóng"
        onClick={onClose}
      />
      <div
        className={`relative max-h-[90vh] w-full overflow-y-auto rounded-sm bg-[var(--background)] p-6 shadow-xl ring-1 ring-black/10 ${
          wide ? "max-w-3xl" : "max-w-lg"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-modal-title"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <h2 id="admin-modal-title" className="text-lg font-bold text-[var(--foreground)]">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-sm text-[var(--muted)] hover:bg-[var(--surface-2)]"
            aria-label="Đóng"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function ImageThumbRow({ urls }: { urls: string[] }) {
  if (!urls.length) {
    return <span className="text-xs text-[var(--muted)]">Chưa có ảnh</span>;
  }
  return (
    <div className="flex flex-wrap gap-2">
      {urls.map((url, i) => (
        <div
          key={`${url}-${i}`}
          className="relative h-14 w-20 overflow-hidden rounded-sm bg-[var(--surface-2)] ring-1 ring-black/10"
        >
          <Image src={url} alt="" fill className="object-cover" sizes="80px" unoptimized />
        </div>
      ))}
    </div>
  );
}

export function MonthLabel({ iso }: { iso?: string }) {
  if (!iso) return <span className="text-[var(--muted)]">—</span>;
  const d = new Date(iso);
  return (
    <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--foreground)]">
      <Calendar className="h-4 w-4 text-[var(--primary)]" />
      {d.toLocaleDateString("vi-VN", { month: "numeric", year: "numeric" })}
    </span>
  );
}

export function MultiImagePicker({
  label,
  files,
  onFilesChange,
  existingUrls,
  onRemoveExisting,
  uploading,
}: {
  label: string;
  files: File[];
  onFilesChange: (files: File[]) => void;
  existingUrls: string[];
  onRemoveExisting: (index: number) => void;
  uploading?: boolean;
}) {
  return (
    <AdminField label={label} hint="Có thể chọn nhiều ảnh cùng lúc">
      <input
        type="file"
        accept="image/*"
        multiple
        disabled={uploading}
        className="block w-full text-sm text-[var(--foreground)] file:mr-3 file:rounded-sm file:border-0 file:bg-[var(--primary)] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-[var(--on-primary)]"
        onChange={(e) => {
          const list = Array.from(e.target.files ?? []);
          onFilesChange(list);
          e.target.value = "";
        }}
      />
      {files.length > 0 ? (
        <p className="mt-2 text-xs text-[var(--muted)]">
          {files.length} ảnh mới sẽ được tải lên khi lưu
        </p>
      ) : null}
      {existingUrls.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {existingUrls.map((url, i) => (
            <div key={url} className="group relative">
              <div className="relative h-16 w-24 overflow-hidden rounded-sm ring-1 ring-black/10">
                <Image src={url} alt="" fill className="object-cover" sizes="96px" unoptimized />
              </div>
              <button
                type="button"
                onClick={() => onRemoveExisting(i)}
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white shadow"
                aria-label="Xóa ảnh"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </AdminField>
  );
}

export { Plus };

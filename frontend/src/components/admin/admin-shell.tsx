"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  BriefcaseBusiness,
  FileText,
  Gauge,
  GraduationCap,
  LogOut,
  Mail,
  Settings,
  Users,
} from "lucide-react";
import { adminApi } from "@/lib/admin-api";
import { clearAdminToken, getAdminToken } from "./auth";

type NavItem = { href: string; label: string; icon: ReactNode };

function NavLink({ href, label, icon }: NavItem) {
  const pathname = usePathname();
  const active = pathname === href || pathname?.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      className={[
        "flex items-center gap-3 rounded-sm px-3 py-2 text-sm transition-colors",
        active
          ? "bg-[var(--surface-2)] text-[var(--foreground)]"
          : "text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--foreground)]",
      ].join(" ")}
    >
      <span className="grid h-8 w-8 place-items-center rounded-sm bg-[var(--background)] ring-1 ring-black/10">
        {icon}
      </span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}

export function AdminShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [profile, setProfile] = useState<null | {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
  }>(null);

  const items = useMemo<NavItem[]>(
    () => [
      { href: "/admin/overview", label: "Tổng quan", icon: <Gauge className="h-4 w-4" /> },
      { href: "/admin/leads", label: "Leads / Tư vấn", icon: <Mail className="h-4 w-4" /> },
      { href: "/admin/courses", label: "Khóa học", icon: <BookOpen className="h-4 w-4" /> },
      { href: "/admin/teachers", label: "Giáo viên", icon: <GraduationCap className="h-4 w-4" /> },
      { href: "/admin/testimonials", label: "Feedback", icon: <Users className="h-4 w-4" /> },
      { href: "/admin/blog-posts", label: "Bài viết", icon: <FileText className="h-4 w-4" /> },
      { href: "/admin/schedules", label: "Lịch khai giảng", icon: <Users className="h-4 w-4" /> },
      { href: "/admin/jobs", label: "Tuyển dụng", icon: <BriefcaseBusiness className="h-4 w-4" /> },
      { href: "/admin/settings", label: "Cài đặt", icon: <Settings className="h-4 w-4" /> },
    ],
    [],
  );

  useEffect(() => {
    const token = getAdminToken();
    if (!token) {
      router.replace("/admin/login");
      return;
    }

    let alive = true;
    (async () => {
      try {
        const p = await adminApi.profile(token);
        if (!alive) return;
        if (!p.isAdmin) {
          clearAdminToken();
          router.replace("/admin/login");
          return;
        }
        setProfile(p);
      } catch {
        clearAdminToken();
        router.replace("/admin/login");
      } finally {
        if (alive) setChecking(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-[60vh] px-6 py-14">
        <p className="text-sm text-[var(--muted)]">Đang kiểm tra đăng nhập…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--surface-1)] text-[var(--foreground)]">
      <div className="mx-auto grid max-w-8xl grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[280px_1fr]">
        <aside className="sticky top-6 h-fit rounded-sm bg-[var(--background)] p-4 ring-1 ring-black/10">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                Admin dashboard
              </p>
              <p className="mt-1 text-sm font-semibold text-[var(--foreground)]">
                {profile?.name ?? "Admin"}
              </p>
              <p className="mt-0.5 text-xs text-[var(--muted)]">{profile?.email}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                clearAdminToken();
                router.replace("/admin/login");
              }}
              className="inline-flex h-9 items-center justify-center gap-2 rounded-sm px-3 text-xs font-semibold text-[var(--muted)] transition hover:bg-[var(--surface-2)] hover:text-[var(--foreground)]"
              aria-label="Đăng xuất"
              title="Đăng xuất"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>

          <nav className="mt-4 space-y-1">
            {items.map((it) => (
              <NavLink key={it.href} {...it} />
            ))}
          </nav>

          <div className="mt-4 border-t border-black/10 pt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              <Users className="h-4 w-4" />
              Về website
            </Link>
          </div>
        </aside>

        <main className="min-w-0 rounded-sm bg-[var(--background)] p-5 ring-1 ring-black/10 sm:p-7">
          {children}
        </main>
      </div>
    </div>
  );
}


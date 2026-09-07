"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

type NavItem = { href: string; label: string; mega?: boolean };

const navItems: NavItem[] = [
  { href: "/quy-trinh", label: "Quy trình Chẩn – Chữa" },
  { href: "/khoa-hoc", label: "Lộ trình học", mega: true },
  { href: "/#ket-qua-hoc-vien", label: "Kết quả học viên" },
  { href: "/lich-khai-giang", label: "Lịch khai giảng" },
  { href: "/ve-xalo", label: "Về Xa Lộ" },
  { href: "/blog", label: "Blog" },
];

function useHash() {
  const [hash, setHash] = useState("");

  useEffect(() => {
    const read = () => setHash(typeof window !== "undefined" ? window.location.hash : "");
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  return hash;
}

function isActive(pathname: string, hash: string, href: string) {
  if (href === "/") return pathname === "/" && (!hash || hash === "#");

  const [hrefPath, hrefHash] = href.split("#");
  const targetHash = hrefHash ? `#${hrefHash}` : "";

  if (hrefHash) {
    return pathname === hrefPath && hash === targetHash;
  }

  if (href === "/khoa-hoc") return pathname === "/khoa-hoc" || pathname.startsWith("/khoa-hoc/");
  if (href === "/quy-trinh") return pathname === "/quy-trinh" || pathname.startsWith("/quy-trinh/");
  if (href === "/blog") return pathname === "/blog" || pathname.startsWith("/blog/");

  return pathname === href;
}

type MegaColumn = { sub: string; links: { label: string; href: string; badge?: string }[] };

type MegaQuadrant = { title: string; titleHref: string; columns: MegaColumn[] };

const coursesMegaMenu: MegaQuadrant[] = [
  {
    title: "ONLINE (nhóm IELTS)",
    titleHref: "/khoa-hoc",
    columns: [
      {
        sub: "Lộ trình Online",
        links: [
          { label: "PRE - IELTS", href: "/khoa-hoc" },
          { label: "PRE - CORE", href: "/khoa-hoc" },
          { label: "CORE", href: "/khoa-hoc" },
          { label: "UPSTREAM", href: "/khoa-hoc" },
          { label: "SOAR", href: "/khoa-hoc" },
        ],
      },
    ],
  },
  {
    title: "OFFLINE (tại trung tâm)",
    titleHref: "/khoa-hoc",
    columns: [
      {
        sub: "Lộ trình Offline",
        links: [
          { label: "FOUNDATION", href: "/khoa-hoc" },
          { label: "MOMENTUM", href: "/khoa-hoc" },
          { label: "ADVANCED", href: "/khoa-hoc" },
        ],
      },
    ],
  },
  {
    title: "Combo & lớp đặc biệt",
    titleHref: "/khoa-hoc",
    columns: [
      {
        sub: "Gợi ý lựa chọn",
        links: [
          { label: "Combo 2 khoá", href: "/khoa-hoc" },
          { label: "Combo 3 khoá", href: "/khoa-hoc" },
          { label: "Lớp 1 kèm 1", href: "/khoa-hoc" },
          { label: "Luyện đề (IELTS 4.5+)", href: "/khoa-hoc" },
        ],
      },
    ],
  },
  {
    title: "Tiện ích",
    titleHref: "/quy-trinh",
    columns: [
      {
        sub: "Tìm hiểu thêm",
        links: [
          { label: "Quy trình Chẩn – Chữa", href: "/quy-trinh" },
          { label: "Lịch khai giảng", href: "/lich-khai-giang" },
          { label: "Đăng ký tư vấn", href: "/lien-he" },
          { label: "Đặt lịch Test Speaking", href: "/speaking-test" },
        ],
      },
      {
        sub: "Khác",
        links: [
          { label: "Giao tiếp & phản xạ", href: "/khoa-hoc/speaking-reflex" },
          { label: "THPT — Chắc nền", href: "/khoa-hoc/thpt-foundation" },
          { label: "IELTS Foundation → Target Band", href: "/khoa-hoc/ielts-foundation" },
        ],
      },
    ],
  },
];

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const hash = useHash();

  const clearMegaTimer = useCallback(() => {
    if (megaLeaveTimer.current) {
      clearTimeout(megaLeaveTimer.current);
      megaLeaveTimer.current = null;
    }
  }, []);

  const openMega = useCallback(() => {
    clearMegaTimer();
    setMegaOpen(true);
  }, [clearMegaTimer]);

  const scheduleCloseMega = useCallback(() => {
    clearMegaTimer();
    megaLeaveTimer.current = setTimeout(() => setMegaOpen(false), 160);
  }, [clearMegaTimer]);

  useEffect(() => {
    return () => clearMegaTimer();
  }, [clearMegaTimer]);

  useEffect(() => {
    setMegaOpen(false);
    setMobileCoursesOpen(false);
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) setMobileCoursesOpen(false);
  }, [open]);

  const coursesActive = isActive(pathname, hash, "/khoa-hoc");

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md shadow-sm font-sans`}
    >
      <div className="flex h-16 w-full items-center gap-4 px-4 lg:gap-6 lg:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 px-2.5 py-0"
          onClick={() => setOpen(false)}
        >
          <img src="/Logo_XLE.svg" alt="Xa Lộ" className="h-8 w-full" />
          <span className="text-[16px] font-heading font-bold leading-8 tracking-tight text-[var(--secondary)] sm:text-[28px] sm:leading-9 lg:text-[24px] lg:leading-[38px]">
            xalo.english
          </span>
        </Link>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-center overflow-x-auto lg:flex [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Chính"
        >
          <ul className="flex h-16 min-w-max items-center justify-center gap-4 px-1 xl:gap-6">
            {navItems.map((item) => {
              if (item.mega) {
                const active = coursesActive || megaOpen;
                return (
                  <li
                    key={item.href}
                    className="relative flex h-full list-none"
                    onMouseEnter={openMega}
                    onMouseLeave={scheduleCloseMega}
                  >
                    <Link
                      href={item.href}
                      className={`relative flex h-full items-center text-sm leading-6 transition-colors ${
                        active
                          ? "font-bold text-[var(--primary)]"
                          : "font-normal text-[var(--foreground)] hover:text-[var(--primary)]"
                      }`}
                    >
                      {item.label}
                      {(coursesActive || megaOpen) && (
                        <span
                          className="pointer-events-none absolute bottom-0 left-0 h-1 w-full rounded-t-[2px] bg-[var(--primary)]"
                          aria-hidden
                        />
                      )}
                    </Link>
                  </li>
                );
              }

              const active = isActive(pathname, hash, item.href);
              return (
                <li key={item.href} className="flex h-full shrink-0 list-none">
                  <Link
                    href={item.href}
                    className={`relative flex h-full items-center whitespace-nowrap text-sm leading-6 transition-colors ${
                      active
                        ? "font-bold text-[var(--primary)]"
                        : "font-normal text-[var(--foreground)] hover:text-[var(--primary)]"
                    }`}
                  >
                    {item.label}
                    {active && (
                      <span
                        className="pointer-events-none absolute bottom-0 left-0 h-1 w-full rounded-t-[2px] bg-[var(--primary)]"
                        aria-hidden
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <Link
            href="/#test-dau-vao"
            className="hidden h-10 min-w-[200px] items-center justify-center whitespace-nowrap rounded-full bg-[var(--primary)] px-4 py-2 text-center text-xs font-black uppercase tracking-wider text-[var(--on-primary)] shadow-md shadow-[var(--primary)]/20 transition-all hover:bg-[var(--secondary)] hover:shadow-lg hover:shadow-[var(--primary)]/30 lg:inline-flex"
          >
            TEST TRÌNH ĐỘ MIỄN PHÍ
          </Link>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-[var(--foreground)]/20 text-[var(--foreground)] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Mở menu</span>
            {open ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mega menu — full width, hover + delay */}
      {megaOpen && (
        <div
          className="fixed left-0 right-0 top-16 z-40 hidden rounded-b-3xl bg-[var(--surface-2)] shadow-[0_20px_40px_rgb(0,0,0,0.08)] border-t border-black/5 lg:block"
          onMouseEnter={openMega}
          onMouseLeave={scheduleCloseMega}
          role="navigation"
          aria-label="Menu khóa học"
        >
          <div className="mx-auto max-w-7xl px-6 py-8">
            <div className="grid grid-cols-1 gap-px bg-black/5 rounded-[2rem] overflow-hidden border border-black/5 shadow-sm md:grid-cols-2 lg:grid-cols-4">
              {coursesMegaMenu.map((quad) => (
                <div key={quad.title} className="min-w-0 bg-white p-8 transition-colors duration-300 hover:bg-black/[0.02]">
                  <Link
                    href={quad.titleHref}
                    className="group inline-flex items-center gap-1 text-base font-extrabold text-[var(--foreground)] transition hover:text-[var(--primary)]"
                  >
                    {quad.title}
                    <ChevronRight className="h-4 w-4 text-[var(--primary)] transition group-hover:translate-x-1" />
                  </Link>
                  <div
                    className={`mt-6 grid gap-8 ${quad.columns.length > 1 ? "sm:grid-cols-2" : "grid-cols-1"}`}
                  >
                    {quad.columns.map((col) => (
                      <div key={col.sub}>
                        <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--muted)]">{col.sub}</p>
                        <ul className="mt-3 flex flex-col gap-2.5">
                          {col.links.map((link) => (
                            <li key={link.label}>
                              <Link
                                href={link.href}
                                className="inline-flex flex-wrap items-center gap-2 text-sm font-extrabold text-[var(--foreground)] transition duration-200 hover:text-[var(--primary)]"
                              >
                                {link.label}
                                {link.badge && (
                                  <span className="rounded-full bg-[var(--accent)] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-[var(--on-primary)] shadow-sm">
                                    {link.badge}
                                  </span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {open && (
        <div
          id="mobile-nav"
          className="max-h-[min(75dvh,560px)] overflow-y-auto bg-[var(--surface-2)] px-4 py-3 shadow-lg shadow-black/10 lg:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {navItems.map((item) => {
              if (item.mega) {
                const active = coursesActive || mobileCoursesOpen;
                return (
                  <div key={item.href} className="py-1">
                    <button
                      type="button"
                      className={`flex w-full items-center justify-between rounded-sm px-3 py-2.5 text-left text-sm leading-6 ${
                        active
                          ? "font-bold text-[var(--primary)]"
                          : "font-normal text-[var(--foreground)]"
                      }`}
                      aria-expanded={mobileCoursesOpen}
                      aria-controls="mobile-courses-submenu"
                      onClick={() => setMobileCoursesOpen((v) => !v)}
                    >
                      {item.label}
                      <svg
                        className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                          mobileCoursesOpen ? "rotate-180" : ""
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {mobileCoursesOpen ? (
                      <div
                        id="mobile-courses-submenu"
                        className="mt-1 border-l-2 border-[var(--border-strong)]/35 pl-3"
                      >
                        <Link
                          href={item.href}
                          className="block py-2 text-xs font-semibold text-[var(--primary)]"
                          onClick={() => setOpen(false)}
                        >
                          Xem tất cả khóa học →
                        </Link>
                        {coursesMegaMenu.map((q) => (
                          <div key={q.title} className="mt-2 first:mt-0">
                            <p className="py-1 text-[10px] font-bold uppercase tracking-wide text-[var(--muted)]">
                              {q.title}
                            </p>
                            <ul className="flex flex-col">
                              {q.columns.flatMap((c) =>
                                c.links.map((l) => (
                                  <li key={`${q.title}-${l.label}`}>
                                    <Link
                                      href={l.href}
                                      className="block py-1.5 text-xs font-bold text-[var(--foreground)]"
                                      onClick={() => setOpen(false)}
                                    >
                                      {l.label}
                                      {l.badge ? ` · ${l.badge}` : ""}
                                    </Link>
                                  </li>
                                )),
                              )}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-sm px-3 py-2.5 text-sm leading-6 ${
                    isActive(pathname, hash, item.href)
                      ? "font-bold text-[var(--primary)]"
                      : "font-normal text-[var(--foreground)]"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/#test-dau-vao"
              className="mt-2 flex h-11 items-center justify-center rounded-full bg-[var(--primary)] text-center text-xs font-black uppercase tracking-wider text-[var(--on-primary)] shadow-md"
              onClick={() => setOpen(false)}
            >
              TEST TRÌNH ĐỘ MIỄN PHÍ
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

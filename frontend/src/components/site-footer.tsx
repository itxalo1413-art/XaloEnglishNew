import Image from "next/image";
import Link from "next/link";

const footerNavAbout = [
  { href: "/tuyen-dung", label: "Tuyển dụng" },
  { href: "/lien-he", label: "Chính sách thanh toán" },
  { href: "/lien-he", label: "Chính sách cam kết" },
  { href: "/lich-khai-giang", label: "Lịch học và ưu đãi" },
  { href: "/lien-he", label: "Liên hệ" },
];

const footerCoursesOnline = [
  { href: "/khoa-hoc", label: "PRE - IELTS" },
  { href: "/khoa-hoc", label: "PRE - CORE" },
  { href: "/khoa-hoc", label: "CORE" },
  { href: "/khoa-hoc", label: "UPSTREAM" },
  { href: "/khoa-hoc", label: "SOAR" },
];

const footerCoursesOffline = [
  { href: "/khoa-hoc", label: "FOUNDATION" },
  { href: "/khoa-hoc", label: "MOMENTUM" },
  { href: "/khoa-hoc", label: "ADVANCED" },
];

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function IconPhoneSmall({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto">
      <div className="bg-[#fff] pt-16 text-[#212121] sm:pt-20">
        <div className="container mx-auto grid grid-cols-2 gap-6 px-4 pb-8 md:grid-cols-[2fr_1fr_1fr_1fr] md:gap-12 md:px-8 md:pb-16 xl:px-24 2xl:px-32">
          {/* Cột 1 — thương hiệu & liên hệ */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image
                src="/LOGO_MAU.png"
                alt="Xa Lộ English"
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
              <span className="text-xl font-bold tracking-tight text-[var(--primary)]">xalo.english</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed">
              Cơ sở: 250 Nguyễn Đình Chính, Phường 11, Phú Nhuận, TP.HCM.
            </p>
            <p className="mt-3 text-sm font-medium leading-relaxed">Học đúng cách khi hiểu đúng mình.</p>
            <p className="mt-4 flex items-center gap-2 text-sm">
              <IconPhoneSmall className="h-4 w-4 shrink-0 text-[var(--primary)]" />
              <span>
                Hotline:{" "}
                <a href="tel:0786688149" className="font-semibold text-[#212121] underline-offset-2 hover:underline">
                  078 6688 149
                </a>
              </span>
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-2)] text-[#1877F2] shadow-sm ring-1 ring-black/5 transition hover:opacity-90"
                aria-label="Facebook Xa Lộ English"
              >
                <IconFacebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-2)] text-[#E4405F] shadow-sm ring-1 ring-black/5 transition hover:opacity-90"
                aria-label="Instagram Xa Lộ English"
              >
                <IconInstagram className="h-5 w-5" />
              </a>
              <a
                href="https://online.gov.vn/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex max-w-[140px] items-center rounded border border-[var(--border-strong)]/40 bg-[#E8F0FE] px-2 py-1.5 text-center text-[9px] font-bold leading-tight text-[#004890]"
              >
                ĐÃ THÔNG BÁO BỘ CÔNG THƯƠNG
              </a>
            </div>
          </div>

          {/* Cột 2 */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--primary)]">Về Xa Lộ English</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {footerNavAbout.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-[#212121] transition hover:text-[var(--primary)]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 3–4: Khóa học */}
          <div className="md:col-span-2 lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--primary)]">Khóa học</h3>
            <div className="mt-4 grid grid-cols-2 gap-x-10 gap-y-6 sm:max-w-md">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-widest text-[var(--muted)]">Online</p>
                <ul className="mt-3 space-y-2.5 text-sm">
                  {footerCoursesOnline.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className="text-[#212121] transition hover:text-[var(--primary)]">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-widest text-[var(--muted)]">Offline</p>
                <ul className="mt-3 space-y-2.5 text-sm">
                  {footerCoursesOffline.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className="text-[#212121] transition hover:text-[var(--primary)]">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/lien-he" className="text-[#212121] transition hover:text-[var(--primary)]">
                      Lớp 1 Kèm 1
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1a1a3a] py-4 text-center text-sm text-white">
        © Copyright 2022–{year} XA LỘ ENGLISH.
      </div>
    </footer>
  );
}

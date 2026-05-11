/** Thay bằng link Messenger fanpage, ví dụ: https://m.me/ten-trang */
const MESSENGER_URL = "https://m.me/";
const HOTLINE_TEL = "tel:0786688149";

function IconMessenger({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 36" fill="none" aria-hidden>
      <path
        fill="url(#fab-messenger-grad)"
        d="M18 3C9.716 3 3 9.067 3 16.5c0 3.6 1.58 6.86 4.15 9.07L3 33l8.06-2.66A15.9 15.9 0 0018 31.5c8.284 0 15-6.067 15-13.5S26.284 3 18 3z"
      />
      <path
        fill="#fff"
        d="M12.5 14.25h5.25v1.75H12.5v-1.75zm0 3.5h9v1.75h-9v-1.75zm0 3.5h7v1.75h-7v-1.75z"
      />
      <defs>
        <linearGradient
          id="fab-messenger-grad"
          x1="3"
          x2="33"
          y1="33"
          y2="5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00B2FF" />
          <stop offset="1" stopColor="#006AFF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function IconPhone({ className }: { className?: string }) {
  return (
    <svg
      className={`text-[var(--primary)] ${className ?? ""}`}
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

export function FloatingContactButtons() {
  return (
    <div
      className="pointer-events-none fixed bottom-6 right-4 z-[60] flex flex-col gap-3 sm:right-6"
      aria-label="Liên hệ nhanh"
    >
      <a
        href={MESSENGER_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--surface-2)] shadow-[0_4px_14px_rgba(0,0,0,0.18)] ring-1 ring-black/5 transition hover:scale-105 hover:shadow-lg"
        aria-label="Chat Messenger"
      >
        <IconMessenger className="h-8 w-8" />
      </a>
      <a
        href={HOTLINE_TEL}
        className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--surface-2)] shadow-[0_4px_14px_rgba(0,0,0,0.18)] ring-1 ring-black/5 transition hover:scale-105 hover:shadow-lg"
        aria-label="Gọi hotline"
      >
        <IconPhone className="h-[1.35rem] w-[1.35rem]" />
      </a>
    </div>
  );
}

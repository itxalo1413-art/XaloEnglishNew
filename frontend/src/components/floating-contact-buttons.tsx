/** Thay bằng link Messenger & Zalo fanpage */
const MESSENGER_URL = "https://m.me/";
const ZALO_URL = "https://zalo.me/0786688149";
const HOTLINE_TEL = "tel:0786688149";

function IconZalo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <circle cx="24" cy="24" r="24" fill="#0068FF" />
      <path
        fill="#FFFFFF"
        d="M34.2 26.5c-.3-.2-3.1-1.5-3.6-1.7-.5-.2-.8-.2-1.2.2s-1.4 1.7-1.7 2.1-.6.4-1.2.2c-.5-.2-2.3-.8-4.3-2.6-1.6-1.4-2.7-3.2-3-3.7-.3-.5 0-.8.2-1 .2-.2.5-.6.8-.9.2-.3.3-.5.5-.8.2-.3.1-.6 0-.8-.1-.2-1.2-2.8-1.6-3.8-.4-1-.8-.8-1.2-.9h-1c-.3 0-1 .1-1.5.7s-2 2-2 4.8 2.1 5.6 2.3 6c.3.3 4 6.2 9.8 8.6 1.4.6 2.5 1 3.3 1.2 1.4.4 2.7.4 3.7.2 1.1-.2 3.4-1.4 3.9-2.7.5-1.3.5-2.5.3-2.7z"
      />
    </svg>
  );
}

function IconMessenger({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 36" fill="none" aria-hidden>
      <path
        fill="var(--primary)"
        d="M18 3C9.716 3 3 9.067 3 16.5c0 3.6 1.58 6.86 4.15 9.07L3 33l8.06-2.66A15.9 15.9 0 0018 31.5c8.284 0 15-6.067 15-13.5S26.284 3 18 3z"
      />
      <path
        fill="#fff"
        d="M12.5 14.25h5.25v1.75H12.5v-1.75zm0 3.5h9v1.75h-9v-1.75zm0 3.5h7v1.75h-7v-1.75z"
      />
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
        href={ZALO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_4px_14px_rgba(0,0,0,0.18)] ring-1 ring-black/5 transition hover:scale-110 hover:shadow-lg"
        aria-label="Chat Zalo Tư Vấn"
      >
        <span className="font-heading font-black text-xs text-[#0068FF] tracking-tighter">Zalo</span>
      </a>
      <a
        href={MESSENGER_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--surface-2)] shadow-[0_4px_14px_rgba(0,0,0,0.18)] ring-1 ring-black/5 transition hover:scale-110 hover:shadow-lg"
        aria-label="Chat Messenger"
      >
        <IconMessenger className="h-8 w-8" />
      </a>
      <a
        href={HOTLINE_TEL}
        className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--surface-2)] shadow-[0_4px_14px_rgba(0,0,0,0.18)] ring-1 ring-black/5 transition hover:scale-110 hover:shadow-lg"
        aria-label="Gọi hotline"
      >
        <IconPhone className="h-[1.35rem] w-[1.35rem]" />
      </a>
    </div>
  );
}

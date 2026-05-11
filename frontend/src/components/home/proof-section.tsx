import Image from "next/image";
import { BadgeCheck, ExternalLink, Quote, Star } from "lucide-react";

type ProofTestimonial = {
  quote: string;
  name: string;
  role: string;
  program: string;
  dateText: string;
  rating: 4 | 5;
  source: { label: string; url: string };
  proof: { src: string; alt: string };
};

const testimonials: ProofTestimonial[] = [
  {
    quote:
      "Trước chỉ biết con yếu tiếng Anh, giờ thấy rõ con kẹt ở đọc hiểu và từ vựng học thuật. Sau 3 tháng có bảng theo dõi, đỡ hoang mang hơn hẳn.",
    name: "Chị N. (đã ẩn danh)",
    role: "Phụ huynh học sinh lớp 10",
    program: "Lộ trình 1:1 — mục tiêu 6.5",
    dateText: "03/2026",
    rating: 5,
    source: { label: "Ảnh chụp tin nhắn", url: "https://example.com/proof/message-1" },
    proof: { src: "/proof/mock-chat-1.svg", alt: "Ảnh chụp minh hoạ tin nhắn feedback" },
  },
  {
    quote:
      "Mình tưởng phải học lại từ zero, hoá ra được kê lộ trình từ chỗ đang yếu. Không còn cảm giác học lan man như trước.",
    name: "Minh T.",
    role: "Sinh viên năm 2",
    program: "Lớp nhóm — tập trung Writing",
    dateText: "01/2026",
    rating: 5,
    source: { label: "Google Review", url: "https://example.com/proof/google-review-1" },
    proof: { src: "/proof/mock-review-1.svg", alt: "Ảnh chụp minh hoạ review" },
  },
  {
    quote:
      "Học không bị khô như trên trường, mỗi buổi biết mình đang sửa lỗi gì. Có mốc band rõ nên có động lực.",
    name: "Bạn H.",
    role: "Học sinh lớp 12",
    program: "RLP theo chặng — kiểm tra giữa kỳ",
    dateText: "12/2025",
    rating: 4,
    source: { label: "Bình luận Facebook", url: "https://example.com/proof/fb-comment-1" },
    proof: { src: "/proof/mock-comment-1.svg", alt: "Ảnh chụp minh hoạ bình luận" },
  },
];

const skillBars = [
  { label: "Nghe", before: 35, after: 72 },
  { label: "Nói", before: 28, after: 65 },
  { label: "Đọc", before: 40, after: 78 },
  { label: "Viết", before: 32, after: 70 },
];

function Stars({ rating }: { rating: 4 | 5 }) {
  return (
    <div className="flex items-center gap-1 text-[var(--accent)]" aria-label={`${rating} trên 5 sao`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-current" : "fill-transparent opacity-40"}`}
          strokeWidth={1.6}
          aria-hidden
        />
      ))}
    </div>
  );
}

export function ProofSection() {
  return (
    <section className="bg-[var(--background)] py-8 sm:py-12">
      <div className="mx-auto max-w-8xl px-4 sm:px-6">
        <h2 className="text-6xl text-center font-bold tracking-tight text-[var(--foreground)] sm:text-6xl">
          Bằng chứng & phản hồi
        </h2>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">
          Không chỉ nói “chúng tôi tốt” — bên dưới là tiến độ (mẫu) và feedback được trình bày theo format có “nguồn”/dẫn chứng.
          Hiện dùng dữ liệu mock để bạn thay bằng case thật khi được phép chia sẻ.
        </p>

        <div className="mt-10 space-y-10">
          <div>
            <div className="flex items-end justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-[var(--foreground)]">Feedback</h3>
                <p className="mt-1 text-xs font-medium text-[var(--muted)]">
                  Xếp theo dạng review: có người gửi, thời điểm, bối cảnh học và nguồn.
                </p>
              </div>
            </div>

            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
              {testimonials.map((t) => (
                <li
                  key={t.quote}
                  className="h-full group overflow-hidden rounded-3xl border border-[var(--border)] bg-white shadow-sm shadow-black/[0.04] ring-1 ring-black/[0.03] transition hover:-translate-y-0.5 hover:shadow-md flex flex-col"
                >
                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-xs font-extrabold text-[var(--on-primary)]">
                            {t.name
                              .replaceAll("(đã ẩn danh)", "")
                              .trim()
                              .split(" ")
                              .slice(0, 2)
                              .map((w) => w[0]?.toUpperCase())
                              .join("") || "XL"}
                          </span>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-extrabold text-[var(--foreground)]">{t.name}</p>
                            <p className="truncate text-xs font-medium text-[var(--muted)]">
                              {t.role} • {t.dateText}
                            </p>
                          </div>
                        </div>
                      </div>
                      <Stars rating={t.rating} />
                    </div>

                    <div className="mt-4 rounded-2xl bg-[var(--surface-2)] p-4 ring-1 ring-black/5 flex-1">
                      <div className="flex items-center gap-2 text-[var(--muted)]">
                        <Quote className="h-4 w-4" aria-hidden />
                        <p className="text-xs font-bold uppercase tracking-widest">Feedback</p>
                      </div>
                      <blockquote className="mt-2 text-sm leading-relaxed text-[var(--foreground)]">
                        “{t.quote}”
                      </blockquote>
                      <p className="mt-3 text-xs font-semibold text-[var(--muted)]">{t.program}</p>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <a
                        href={t.source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-bold text-[var(--foreground)] ring-1 ring-black/5 transition group-hover:ring-black/10"
                        aria-label={`Mở nguồn: ${t.source.label}`}
                      >
                        <ExternalLink className="h-4 w-4 text-[var(--accent)]" aria-hidden />
                        {t.source.label}
                      </a>
                    </div>
                  </div>

                  <div className="relative h-40 w-full overflow-hidden bg-[var(--surface-1)]">
                    <Image
                      src={t.proof.src}
                      alt={t.proof.alt}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.02]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0" aria-hidden />
                    <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-extrabold text-[var(--foreground)] ring-1 ring-black/10 backdrop-blur">
                      <BadgeCheck className="h-3.5 w-3.5 text-[var(--primary)]" aria-hidden />
                      Ảnh chụp minh hoạ dẫn chứng
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-[var(--border)] bg-white/60 p-6 shadow-sm shadow-black/[0.04] ring-1 ring-black/[0.03] backdrop-blur-sm sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
                  Minh hoạ tiến bộ (mẫu)
                </p>
                <p className="mt-2 text-2xl font-bold text-[var(--foreground)]">
                  IELTS Overall:{" "}
                  <span className="text-[var(--muted)] line-through decoration-2">4.0</span> →{" "}
                  <span className="text-[var(--accent)]">6.5</span>
                </p>
                <p className="mt-1 text-xs text-[var(--muted)]">Sau 5–6 tháng — lộ trình cá nhân, có mốc kiểm tra giữa kỳ.</p>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-[var(--foreground)] ring-1 ring-black/5">
                <BadgeCheck className="h-4 w-4 text-[var(--primary)]" aria-hidden />
                Có mốc đo lại giữa chặng
              </div>
            </div>

            <div className="mt-8 space-y-5" role="img" aria-label="Biểu đồ kỹ năng trước và sau">
              <p className="text-xs font-medium text-[var(--muted)]">Kỹ năng (% — ví dụ minh hoạ)</p>
              {skillBars.map((row) => (
                <div key={row.label}>
                  <div className="mb-2 flex justify-between text-xs font-medium text-[var(--foreground)]">
                    <span>{row.label}</span>
                    <span className="text-[var(--muted)]">
                      {row.before}% → {row.after}%
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-11 shrink-0 text-[10px] text-[var(--muted)]">Trước</span>
                      <div className="h-2 flex-1 rounded-full bg-[var(--secondary)]/25">
                        <div className="h-full rounded-full bg-[var(--secondary)]" style={{ width: `${row.before}%` }} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-11 shrink-0 text-[10px] text-[var(--muted)]">Sau</span>
                      <div className="h-2 flex-1 rounded-full bg-[var(--secondary)]/25">
                        <div className="h-full rounded-full bg-[var(--primary)]" style={{ width: `${row.after}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

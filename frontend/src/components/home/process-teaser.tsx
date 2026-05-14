import Link from "next/link";
import {
  ClipboardCheck,
  Eye,
  Route,
  SlidersHorizontal,
  Stethoscope,
  Trophy,
} from "lucide-react";
import {
  ModuleColumnArtChẩn,
  ModuleColumnArtLộTrình,
  ModuleColumnArtTheoDõi,
} from "./process-teaser-illustrations";

function IconArrowUpRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 17L17 7M17 7H7M17 7v10"
        className="stroke-current"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const topModules: {
  id: string;
  title: string;
  subtitle: string;
  art: typeof ModuleColumnArtChẩn;
  panel: string;
  titleClass: string;
  subClass: string;
  onPrimaryArt?: boolean;
}[] = [
  {
    id: "01",
    title: "Chẩn",
    subtitle: "Xác định điểm nghẽn",
    art: ModuleColumnArtChẩn,
    panel: "bg-[var(--surface-2)] shadow-lg shadow-black/10",
    titleClass: "text-[var(--foreground)]",
    subClass: "text-[var(--foreground)]/70",
  },
  {
    id: "02",
    title: "Chữa",
    subtitle: "Lộ trình RLP & BCB",
    art: ModuleColumnArtLộTrình,
    panel: "bg-[var(--secondary)]/35 shadow-lg shadow-black/10",
    titleClass: "text-[var(--surface-2)]",
    subClass: "text-[var(--surface-2)]",
  },
  {
    id: "03",
    title: "Vận hành",
    subtitle: "Điều chỉnh liên tục",
    art: ModuleColumnArtTheoDõi,
    panel: "bg-[var(--accent)] shadow-lg shadow-black/15",
    titleClass: "text-[var(--on-primary)]",
    subClass: "text-[var(--on-primary)]/90",
    onPrimaryArt: true,
  },
];

const timelineLessons: {
  title: string;
  desc: string;
  done: boolean;
  icon: "input-test" | "diagnosis" | "plan" | "observe" | "optimize" | "goal";
}[] = [
  { title: "Kiểm tra đầu vào", desc: "Đo lường 4 kỹ năng ngôn ngữ làm cơ sở dữ liệu.", done: true, icon: "input-test" },
  { title: "Phiên Chẩn & BCB", desc: "Chẩn đoán điểm nghẽn và xác định bức tranh năng lực.", done: true, icon: "diagnosis" },
  { title: "Xây dựng lộ trình RLP", desc: "Thiết kế kế hoạch điều trị cá nhân hóa theo mục tiêu.", done: true, icon: "plan" },
  { title: "Triển khai & Quan sát", desc: "Theo dõi quá trình học để phát hiện các lỗi phát sinh.", done: false, icon: "observe" },
  { title: "Điều chỉnh & Tối ưu", desc: "Tinh chỉnh phương pháp và tài nguyên để bám sát RLP.", done: false, icon: "optimize" },
  { title: "Đạt mục tiêu & Chuyển chặng", desc: "Xử lý triệt để điểm nghẽn và xác nhận sự tiến bộ.", done: false, icon: "goal" },
];

function TimelineIcon({
  kind,
  done,
}: {
  kind: (typeof timelineLessons)[number]["icon"];
  done: boolean;
}) {
  const box = done
    ? "bg-[var(--accent)]/20 text-[var(--foreground)]"
    : "bg-[var(--primary)] text-[var(--on-primary)]";

  const Icon = (() => {
    switch (kind) {
      case "input-test":
        return ClipboardCheck;
      case "diagnosis":
        return Stethoscope;
      case "plan":
        return Route;
      case "observe":
        return Eye;
      case "optimize":
        return SlidersHorizontal;
      case "goal":
        return Trophy;
      default:
        return ClipboardCheck;
    }
  })();

  return (
    <div
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${box} shadow-lg shadow-[var(--primary)]/15`}
    >
      <Icon className="h-6 w-6" aria-hidden strokeWidth={1.8} />
    </div>
  );
}

const scheduledBlocks: {
  label: string;
  items: {
    title: string;
    meta: string;
    tag: string;
    tagDot: "accent" | "secondary" | "primary";
    avatars?: number;
  }[];
}[] = [
  {
    label: "Hôm nay",
    items: [
      {
        title: "Phiên Review Chẩn – Chữa",
        meta: "Phản hồi BCB & Cập nhật RLP",
        tag: "Nhóm",
        tagDot: "accent",
        avatars: 3,
      },
    ],
  },
  {
    label: "Ngày mai",
    items: [
      {
        title: "Coaching Lộ trình 1:1",
        meta: "Điều chỉnh điểm nghẽn ngôn ngữ",
        tag: "Cá nhân",
        tagDot: "secondary",
      },
      {
        title: "Hội chẩn cùng Phụ huynh",
        meta: "Giải thích BCB & Cam kết tiến độ",
        tag: "Sự kiện",
        tagDot: "primary",
        avatars: 2,
      },
    ],
  },
];

function TagDot({ kind }: { kind: "accent" | "secondary" | "primary" }) {
  const map = {
    accent: "bg-[var(--accent)]",
    secondary: "bg-[var(--secondary)]",
    primary: "bg-[var(--primary)]",
  } as const;
  return <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${map[kind]}`} aria-hidden />;
}

export function ProcessTeaserSection() {
  return (
    <section className="scroll-mt-24 relative overflow-hidden bg-[var(--primary)] py-14 sm:py-24">
      {/* Removed mesh gradients */}

      <div className="relative z-10 mx-auto max-w-8xl px-4 sm:px-6">
          {/* Hàng trên: hero + 3 cột module — chữ trắng / hồng nổi trên nền primary */}
          <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-10 xl:gap-14">
            <div className="max-w-xl shrink-0 lg:max-w-[min(100%,28rem)] lg:pt-2">
              <p className="text-sm font-extrabold tracking-widest uppercase text-[var(--accent)] drop-shadow-sm">Xa Lộ English</p>
              <h2 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl leading-[1.1]">
                Chẩn rõ điểm yếu <br /> Kê đúng lộ trình <br /> Tiến bộ thấy được
              </h2>
              <p className="mt-6 text-base leading-relaxed text-white/80 sm:text-lg font-medium">
                Không có một lộ trình chung cho tất cả. Trước khi vào lớp, Xa Lộ đo năng lực, chẩn
                đoán bằng BCB và thiết kế RLP theo mục tiêu — để bạn biết “học gì trước”, “sửa gì trước” và theo dõi
                tiến độ theo từng chặng.
              </p>
              <Link
                href="/quy-trinh"
                className="group mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-extrabold text-[var(--primary)] shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--accent)] hover:text-[var(--on-primary)] hover:shadow-2xl hover:shadow-[var(--accent)]/30"
              >
                Xem chi tiết quy trình
                <IconArrowUpRight className="h-5 w-5 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>

            <div className="grid min-h-[260px] w-full min-w-0 flex-1 grid-cols-3 gap-4 lg:min-h-[280px] lg:gap-6">
              {topModules.map((m) => {
                const Art = m.art;
                const artClass =
                  "h-[110px] w-full max-w-[min(100%,9rem)] sm:h-[124px] sm:max-w-[min(100%,10.5rem)] lg:h-[140px] lg:max-w-[min(100%,12rem)] transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110";
                
                // Enhance the panel styling for Stripe look
                let enhancedPanel = m.panel;
                if (m.id === "01") enhancedPanel = "bg-[var(--surface-2)] shadow-[0_8px_30px_rgb(0,0,0,0.12)] ring-1 ring-white/20";
                if (m.id === "02") enhancedPanel = "bg-[var(--secondary)] shadow-[0_8px_30px_rgb(0,0,0,0.12)] ring-1 ring-white/20";
                if (m.id === "03") enhancedPanel = "bg-[var(--accent)] shadow-[0_8px_30px_rgb(0,0,0,0.15)] ring-1 ring-white/20";

                return (
                  <div
                    key={m.id}
                    className={`group flex min-h-[240px] min-w-0 flex-col rounded-[2rem] p-6 sm:min-h-[260px] sm:p-8 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-3 hover:shadow-2xl ${enhancedPanel}`}
                  >
                    <p className={`text-sm font-black tracking-wider ${m.titleClass}`}>{m.id}</p>
                    <p className={`mt-3 text-lg font-extrabold leading-tight sm:text-xl ${m.titleClass}`}>{m.title}</p>
                    <p className={`mt-1.5 text-xs font-semibold leading-snug sm:text-sm ${m.subClass}`}>{m.subtitle}</p>
                    <div className="mt-auto flex flex-1 items-end justify-center pt-4">
                      {m.onPrimaryArt ? (
                        <ModuleColumnArtTheoDõi className={artClass} onPrimary />
                      ) : (
                        <Art className={artClass} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hàng dưới: khối trắng + hồng nhạt — timeline + lịch */}
          <div className="mt-12 grid gap-8 rounded-[2.5rem] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] ring-1 ring-black/5 sm:p-12 lg:mt-16 lg:grid-cols-12 lg:gap-14 lg:p-14">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-widest text-[var(--accent)]">Chuẩn học vụ</p>
                  <h3 className="mt-2 text-3xl font-extrabold text-[var(--foreground)]">6 Bước Chẩn – Chữa</h3>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Tiến độ minh hoạ</p>
                  <p className="mt-1 text-2xl font-black text-[var(--accent)] drop-shadow-sm">75%</p>
                  <div className="mt-3 h-2 w-32 rounded-full bg-[var(--surface-2)] sm:w-48 overflow-hidden shadow-inner">
                    <div className="h-full w-[75%] rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]" />
                  </div>
                </div>
              </div>

              <div className="relative mt-10 pl-2">
                <div
                  className="absolute left-[30px] h-[calc(100%-24px)] top-4 bottom-4 w-1 bg-[var(--accent)]/30 rounded-full"
                  aria-hidden
                />
                <ul className="space-y-0">
                  {timelineLessons.map((lesson, i) => (
                    <li key={lesson.title} className="relative flex gap-5 pb-10 last:pb-0 group">
                      <div className="relative z-[1] flex flex-col items-center">
                        <TimelineIcon kind={lesson.icon} done={lesson.done} />

                      </div>
                      <div className="min-w-0 flex-1 pt-1">
                        <p className={`font-extrabold text-lg transition-colors duration-300 ${lesson.done ? 'text-[var(--foreground)]' : 'text-[var(--foreground)]/60'}`}>{lesson.title}</p>
                        <p className="mt-1.5 text-sm font-medium text-[var(--muted)]">{lesson.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="flex items-baseline justify-between gap-2 border-b border-black/5 pb-4">
                <h3 className="text-2xl font-extrabold text-[var(--foreground)]">Lịch gợi ý</h3>
                <Link
                  href="/lich-khai-giang"
                  className="group text-xs font-bold text-[var(--accent)] tracking-wide flex items-center"
                >
                  Xem tất cả
                  <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>

              <div className="mt-8 space-y-8">
                {scheduledBlocks.map((block) => (
                  <div key={block.label}>
                    <p className="text-xs font-extrabold uppercase tracking-widest text-[var(--muted)]">{block.label}</p>
                    <ul className="mt-4 space-y-4">
                      {block.items.map((ev) => (
                        <li
                          key={ev.title}
                          className="rounded-2xl bg-[var(--surface-1)] p-5 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:ring-black/10"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="font-bold text-[var(--foreground)]">{ev.title}</p>
                              <p className="mt-1.5 text-xs font-medium text-[var(--muted)]">{ev.meta}</p>
                            </div>
                            {ev.avatars != null && (
                              <div className="flex shrink-0 -space-x-2">
                                {Array.from({ length: ev.avatars }).map((_, ai) => (
                                  <span
                                    key={ai}
                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[10px] font-black text-[var(--foreground)] shadow-sm ring-2 ring-white first:bg-[var(--accent)] first:text-[var(--on-primary)] [&:nth-child(2)]:bg-[var(--primary)] [&:nth-child(2)]:text-[var(--on-primary)] [&:nth-child(3)]:bg-[var(--secondary)] [&:nth-child(3)]:text-[var(--foreground)]"
                                  >
                                    {String.fromCharCode(65 + ai)}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="mt-4 flex justify-end">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-[var(--foreground)] shadow-sm ring-1 ring-black/5">
                              <TagDot kind={ev.tagDot} />
                              {ev.tag}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Philosophy Integration Block */}
            <div className="lg:col-span-12 mt-12 border-t border-black/5 pt-10">
              <div className="grid gap-8 md:grid-cols-2 items-center">
                <div className="relative">
                  <div className="absolute -left-4 top-0 bottom-0 w-1 bg-[var(--primary)] rounded-full" />
                  <h4 className="text-xl font-extrabold text-[var(--foreground)] leading-tight">
                    Lớp học không phải là sản phẩm, <br/>
                    <span className="text-[var(--primary)] text-stroke-sm">Lộ trình học (RLP) mới là cốt lõi.</span>
                  </h4>
                  <p className="mt-4 text-sm font-medium leading-relaxed text-[var(--muted)] italic">
                    “Lớp học chỉ là nơi triển khai lộ trình — nơi giáo viên thực hiện hoạt động chẩn, chữa và tạo sự cộng hưởng giữa các học viên. Mỗi buổi học tồn tại vì một mục tiêu cụ thể, và mỗi hoạt động đều nhằm xử lý một điểm nghẽn đã được chẩn đoán trước.”
                  </p>
                </div>
                <div className="rounded-2xl bg-[var(--surface-2)] p-6 ring-1 ring-black/5">
                  {/* <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted)] mb-3">Tầm nhìn Branding</p> */}
                  <p className="text-sm font-semibold text-[var(--foreground)] leading-relaxed">
                    Xa Lộ không bán &quot;khóa học&quot; đại trà. Chúng tôi cung cấp một <span className="text-[var(--primary)]">quy trình ra quyết định dựa trên dữ liệu</span>. Lộ trình là kế hoạch điều trị, lớp học là nơi thực thi, và sự tiến bộ là kết quả đo lường được.
                  </p>
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}

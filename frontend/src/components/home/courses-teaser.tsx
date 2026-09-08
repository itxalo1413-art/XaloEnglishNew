"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type TierPhase = {
  title: string;
  rows: { module: string; detail: string }[];
};

type CourseMode = "online" | "offline";

type HomeCourseTier = {
  id: string;
  mode: CourseMode;
  label: string;
  headline: string;
  shortDesc: string;
  audience: string;
  coach: string;
  diagnostic: string;
  schedule: string;
  feedback: string;
  focus: string;
  outcomeLine: string;
  phases: TierPhase[];
};

const tiers: HomeCourseTier[] = [
  {
    id: "foundation",
    mode: "offline",
    label: "FOUNDATION",
    headline: "FOUNDATION — nền vững, đi đúng bước đầu",
    shortDesc: "Dành cho người cần củng cố nền và thói quen học trước khi tăng tốc.",
    audience: "Mới bắt đầu / mất gốc nhẹ",
    coach: "GV nền tảng Xa Lộ",
    diagnostic: "Test đầu vào + phân tích lỗ hổng cơ bản",
    schedule: "Tiết tấu chậm, ôn lặp có kiểm tra",
    feedback: "Nhận xét ngắn sau buổi, dễ theo dõi",
    focus: "Ngữ pháp - từ vựng - nghe/đọc nền",
    outcomeLine: "Tự tin hơn với bài tập đúng trình độ.",
    phases: [
      {
        title: "Giai đoạn 1 — Chẩn",
        rows: [{ module: "Đánh giá đầu vào", detail: "Xác định mức xuất phát và 2-3 điểm yếu cốt lõi." }],
      },
      {
        title: "Giai đoạn 2 — Kê lộ trình",
        rows: [{ module: "Lộ trình Foundation", detail: "Ưu tiên sửa nền trước, mỗi tuần có mục tiêu rõ." }],
      },
      {
        title: "Giai đoạn 3 — Chữa & theo dõi",
        rows: [{ module: "Chữa theo lỗi", detail: "Bài tập cá nhân hoá; kiểm tra lại theo mốc." }],
      },
      {
        title: "Trọng tâm nội dung",
        rows: [
          { module: "Ưu tiên 1", detail: "Nắm khung ngữ pháp và từ vựng chủ đề thiết yếu." },
          { module: "Ưu tiên 2", detail: "Nghe/đọc ngắn, bám lỗi thật từng buổi." },
          { module: "Ưu tiên 3", detail: "Thói quen học đều, báo cáo tiến độ cho phụ huynh." },
        ],
      },
    ],
  },
  {
    id: "momentum",
    mode: "offline",
    label: "MOMENTUM",
    headline: "MOMENTUM — tạo đà, tăng tốc có kiểm soát",
    shortDesc: "Đã có nền cơ bản; cần đẩy nhanh tiến bộ nhưng không học lan man.",
    audience: "Đã học một thời gian, band/điểm chững",
    coach: "GV lộ trình & đo lường",
    diagnostic: "So sánh mục tiêu vs hiện trạng theo kỹ năng",
    schedule: "Tăng khối lượng có lộ trình ưu tiên",
    feedback: "Báo cáo ngắn theo tuần / mốc",
    focus: "Ưu tiên lỗi “ăn điểm” nhất",
    outcomeLine: "Thấy rõ đà tăng qua từng mốc kiểm tra.",
    phases: [
      {
        title: "Giai đoạn 1 — Chẩn",
        rows: [{ module: "Đánh giá đầu vào", detail: "Chỉ ra điểm nghẽn đang kéo chậm tiến bộ." }],
      },
      {
        title: "Giai đoạn 2 — Kê lộ trình",
        rows: [{ module: "Gia tốc có trọng tâm", detail: "Chọn 1-2 kỹ năng ưu tiên để tạo momentum." }],
      },
      {
        title: "Giai đoạn 3 — Chữa & theo dõi",
        rows: [{ module: "Chữa theo lỗi", detail: "Bài chữa sát đề bài thi / tình huống thực tế." }],
      },
      {
        title: "Trọng tâm nội dung",
        rows: [
          { module: "Ưu tiên 1", detail: "Luyện đúng dạng bài đang mất điểm." },
          { module: "Ưu tiên 2", detail: "Time-box và chuẩn hoá cách làm bài." },
          { module: "Ưu tiên 3", detail: "Giữ nhịp học — tránh nhảy cóc nội dung." },
        ],
      },
    ],
  },
  {
    id: "advanced",
    mode: "offline",
    label: "ADVANCED",
    headline: "ADVANCED — độ khó cao, tinh chỉnh chi tiết",
    shortDesc: "Kỹ năng khá; cần chữa lỗi tinh và tối ưu band/điểm.",
    audience: "Trình độ khá, hướng band cao / điểm cao",
    coach: "GV chuyên sâu theo kỹ năng",
    diagnostic: "Phân tích lỗi tinh: logic, cohesion, pronunciation…",
    schedule: "Case khó xen kỹ năng yếu còn lại",
    feedback: "Phản hồi chi tiết theo tiêu chí chấm",
    focus: "Tối ưu điểm mạnh, vá điểm gãy",
    outcomeLine: "Ổn định output theo chuẩn thi hoặc mục tiêu công việc.",
    phases: [
      {
        title: "Giai đoạn 1 — Chẩn",
        rows: [{ module: "Đánh giá đầu vào", detail: "Benchmark theo rubric thi / chuẩn output." }],
      },
      {
        title: "Giai đoạn 2 — Kê lộ trình",
        rows: [{ module: "Tinh chỉnh", detail: "Giảm lỗi lặp, nâng ceiling từng kỹ năng." }],
      },
      {
        title: "Giai đoạn 3 — Chữa & theo dõi",
        rows: [{ module: "Chữa theo lỗi", detail: "Drill có chủ đích + mock có review sâu." }],
      },
      {
        title: "Trọng tâm nội dung",
        rows: [
          { module: "Ưu tiên 1", detail: "Task 2 / viết luận / hội thoại depth." },
          { module: "Ưu tiên 2", detail: "Listening/Reading dạng khó, trick time." },
          { module: "Ưu tiên 3", detail: "Speaking/Writing coherence và accuracy." },
        ],
      },
    ],
  },
  {
    id: "pre-ielts",
    mode: "online",
    label: "PRE - IELTS",
    headline: "PRE - IELTS — làm quen IELTS đúng cách",
    shortDesc: "Xây nền theo hướng IELTS: hiểu dạng bài, hình thành tư duy làm bài và thói quen học đều.",
    audience: "Mới chạm IELTS / cần nền trước khi vào CORE",
    coach: "GV IELTS nền tảng",
    diagnostic: "Test đầu vào + xác định 2-3 điểm nghẽn theo kỹ năng",
    schedule: "Online, nhịp vừa — bám mục tiêu tuần",
    feedback: "Checklist + nhận xét theo mốc",
    focus: "Nền từ vựng/grammar + format IELTS cơ bản",
    outcomeLine: "Sẵn sàng chuyển lên PRE - CORE/CORE theo năng lực.",
    phases: [
      {
        title: "Giai đoạn 1 — Chẩn",
        rows: [{ module: "Đánh giá đầu vào", detail: "Xác định mức xuất phát và lỗi nền đang cản trở." }],
      },
      {
        title: "Giai đoạn 2 — Kê lộ trình",
        rows: [{ module: "Khung PRE - IELTS", detail: "Học đúng dạng, đúng bước; ưu tiên nền dùng được." }],
      },
      {
        title: "Giai đoạn 3 — Chữa & theo dõi",
        rows: [{ module: "Chữa theo lỗi", detail: "Chữa lỗi lặp và theo dõi theo checkpoint." }],
      },
      {
        title: "Trọng tâm nội dung",
        rows: [
          { module: "Ưu tiên 1", detail: "Nền từ vựng theo chủ đề + grammar cốt lõi." },
          { module: "Ưu tiên 2", detail: "Làm quen format Listening/Reading/Writing/Speaking." },
          { module: "Ưu tiên 3", detail: "Thói quen học đều + kiểm tra tiến độ." },
        ],
      },
    ],
  },
  {
    id: "pre-core",
    mode: "online",
    label: "PRE - CORE",
    headline: "PRE - CORE — chuẩn hoá nền để vào CORE",
    shortDesc: "Giai đoạn chuyển tiếp: vá lỗi nền và chuẩn hoá kỹ thuật trước khi tăng tốc ở CORE.",
    audience: "Đã có nền nhưng chưa ổn định / cần chuẩn hoá",
    coach: "GV lộ trình",
    diagnostic: "Mapping lỗi theo nhóm + xác định kỹ năng ưu tiên",
    schedule: "Online, có checkpoint rõ",
    feedback: "Tóm tắt theo tuần / theo mốc",
    focus: "Chuẩn hoá cách làm + giảm lỗi lặp",
    outcomeLine: "Vào CORE mượt, không “hẫng” khi tăng độ khó.",
    phases: [
      {
        title: "Giai đoạn 1 — Chẩn",
        rows: [{ module: "Đánh giá đầu vào", detail: "Chỉ ra lỗi nền và điểm gãy theo kỹ năng." }],
      },
      {
        title: "Giai đoạn 2 — Kê lộ trình",
        rows: [{ module: "Chuẩn hoá", detail: "Chọn 1-2 ưu tiên để tạo nền ổn định." }],
      },
      {
        title: "Giai đoạn 3 — Chữa & theo dõi",
        rows: [{ module: "Chữa theo lỗi", detail: "Drill có chủ đích + kiểm tra theo mốc." }],
      },
      {
        title: "Trọng tâm nội dung",
        rows: [
          { module: "Ưu tiên 1", detail: "Chuẩn hoá chiến lược làm bài cơ bản." },
          { module: "Ưu tiên 2", detail: "Sửa lỗi nền (accuracy) + tăng độ ổn định." },
          { module: "Ưu tiên 3", detail: "Giữ nhịp học — bám mục tiêu tuần." },
        ],
      },
    ],
  },
  {
    id: "core",
    mode: "online",
    label: "CORE",
    headline: "Core — khung cốt lõi cho mọi lộ trình",
    shortDesc: "Gói trung tâm: Chẩn rõ, lộ trình gọn, chữa đúng chỗ.",
    audience: "HS, SV, người đi làm cần khung rõ",
    coach: "Đội ngũ Xa Lộ",
    diagnostic: "Bức tranh 4 kỹ năng + ưu tiên sửa",
    schedule: "Lịch cố định, có checkpoint",
    feedback: "Tóm tắt tiến độ dễ đọc",
    focus: "Cân bằng nền và thực hành",
    outcomeLine: "Nắm được lộ trình và mốc tiếp theo sau mỗi giai đoạn.",
    phases: [
      {
        title: "Giai đoạn 1 — Chẩn",
        rows: [{ module: "Đánh giá đầu vào", detail: "Test chuẩn hoá + mapping lỗi theo nhóm." }],
      },
      {
        title: "Giai đoạn 2 — Kê lộ trình",
        rows: [{ module: "Khung Core", detail: "Module cố định, có thể tuỳ chỉnh tốc độ." }],
      },
      {
        title: "Giai đoạn 3 — Chữa & theo dõi",
        rows: [{ module: "Chữa theo lỗi", detail: "Theo dõi bằng checklist tiến độ." }],
      },
      {
        title: "Trọng tâm nội dung",
        rows: [
          { module: "Ưu tiên 1", detail: "Nền ngữ pháp - từ vựng dùng được." },
          { module: "Ưu tiên 2", detail: "Nghe/đọc hiểu đúng cấu trúc đề." },
          { module: "Ưu tiên 3", detail: "Nói/viết có khung và feedback." },
        ],
      },
    ],
  },
  {
    id: "upstream",
    mode: "online",
    label: "UPSTREAM",
    headline: "Upstream — hướng đầu ra xa hơn (học thuật / nghề)",
    shortDesc: "Mở rộng năng lực dùng tiếng Anh trong học thuật hoặc môi trường chuyên.",
    audience: "SV năm cao, người chuẩn bị du học / job",
    coach: "GV academic / professional",
    diagnostic: "Gap analysis theo output mong muốn",
    schedule: "Project nhỏ + deadline thực tế",
    feedback: "Review theo rubric học thuật / email công việc",
    focus: "Hội thoại sâu, viết học thuật, thuyết trình",
    outcomeLine: "Làm chủ tình huống phức tạp hơn so với general English.",
    phases: [
      {
        title: "Giai đoạn 1 — Chẩn",
        rows: [{ module: "Đánh giá đầu vào", detail: "Xác định chuẩn đích: IELTS cao, seminar, email HR…" }],
      },
      {
        title: "Giai đoạn 2 — Kê lộ trình",
        rows: [{ module: "Lộ trình Upstream", detail: "Gắn output cụ thể (bài luận, pitch, interview)." }],
      },
      {
        title: "Giai đoạn 3 — Chữa & theo dõi",
        rows: [{ module: "Chữa theo lỗi", detail: "Iteration theo phiên bản bài / recording." }],
      },
      {
        title: "Trọng tâm nội dung",
        rows: [
          { module: "Ưu tiên 1", detail: "Tư duy argument & evidence." },
          { module: "Ưu tiên 2", detail: "Presentation & discussion." },
          { module: "Ưu tiên 3", detail: "Register và tone phù hợp ngữ cảnh." },
        ],
      },
    ],
  },
  {
    id: "soar",
    mode: "online",
    label: "SOAR",
    headline: "SOAR — bứt tốc & tối ưu đầu ra",
    shortDesc: "Tập trung bứt tốc theo mục tiêu: tối ưu tốc độ, độ chính xác và độ ổn định output.",
    audience: "Đã có nền vững, muốn bứt tốc theo mục tiêu rõ",
    coach: "GV chuyên sâu theo mục tiêu",
    diagnostic: "Benchmark theo rubric/đầu ra + xác định 1-2 nút thắt chính",
    schedule: "Online, pace cao — có deadline và checkpoint",
    feedback: "Phản hồi theo tiêu chí + kế hoạch sửa lỗi",
    focus: "Tối ưu performance: accuracy + speed + consistency",
    outcomeLine: "Output ổn định theo chuẩn mục tiêu (thi/ học thuật/ công việc).",
    phases: [
      {
        title: "Giai đoạn 1 — Chẩn",
        rows: [{ module: "Đánh giá đầu vào", detail: "Xác định ceiling hiện tại và lỗi đang kéo điểm." }],
      },
      {
        title: "Giai đoạn 2 — Kê lộ trình",
        rows: [{ module: "Kế hoạch bứt tốc", detail: "Chọn ưu tiên và deadline rõ để tối ưu nhanh." }],
      },
      {
        title: "Giai đoạn 3 — Chữa & theo dõi",
        rows: [{ module: "Chữa theo lỗi", detail: "Drill có chủ đích + mock/recording có review." }],
      },
      {
        title: "Trọng tâm nội dung",
        rows: [
          { module: "Ưu tiên 1", detail: "Tối ưu chiến lược làm bài / xử lý tình huống khó." },
          { module: "Ưu tiên 2", detail: "Giảm lỗi tinh (cohesion, logic, pronunciation…)." },
          { module: "Ưu tiên 3", detail: "Ổn định performance bằng checkpoint và review." },
        ],
      },
    ],
  },
];

function TabIconBook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 19.5A2.5 2.5 0 016.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </svg>
  );
}

function TabIconZap({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
    </svg>
  );
}

function TabIconLayers({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );
}

function TabIconTarget({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function TabIconArrowUp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}

function TabIconLink({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 13a5 5 0 007.07.07l1.42-1.42a5 5 0 00-7.07-7.07L9 6M14 11a5 5 0 00-7.07-.07L5.51 12.49a5 5 0 007.07 7.07L15 18" />
    </svg>
  );
}

const tabIcons = [TabIconBook, TabIconZap, TabIconLayers, TabIconTarget, TabIconArrowUp, TabIconLink] as const;

export function CoursesTeaserSection() {
  const [mode, setMode] = useState<CourseMode>("online");
  const visibleTiers = useMemo(() => tiers.filter((t) => t.mode === mode), [mode]);
  const [activeId, setActiveId] = useState(visibleTiers[0]?.id ?? "");

  useEffect(() => {
    if (!visibleTiers.some((t) => t.id === activeId)) {
      setActiveId(visibleTiers[0]?.id ?? "");
    }
  }, [activeId, visibleTiers]);

  const course = useMemo(
    () => visibleTiers.find((t) => t.id === activeId) ?? visibleTiers[0],
    [activeId, visibleTiers],
  );

  if (!course) return null;

  return (
    <section className="scroll-mt-24 bg-[var(--background)] py-16 sm:py-24">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 relative z-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl">Khóa học</h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">
              Chọn cấp chương trình để xem nội dung — Chẩn, kê lộ trình và chữa đúng chỗ.
            </p>
          </div>
          <Link
            href="/khoa-hoc"
            className="group inline-flex h-12 shrink-0 items-center justify-center rounded-[5px] bg-[var(--primary)] px-7 text-sm font-bold tracking-wide text-[var(--on-primary)] shadow-lg shadow-[var(--primary)]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--primary-hover)] hover:shadow-xl hover:shadow-[var(--primary)]/30"
          >
            Tất cả khóa học
            <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-1.5 ml-2">
              →
            </span>
          </Link>
        </div>

        {/* Toggle ONLINE/OFFLINE */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex w-full sm:w-auto rounded-[5px] bg-black/5 p-1.5">
            <button
              type="button"
              onClick={() => setMode("online")}
              className={`flex-1 sm:flex-none inline-flex items-center justify-center rounded-[5px] px-6 py-2.5 text-sm font-extrabold transition-all ${
                mode === "online" ? "bg-white text-[var(--primary)] shadow-sm ring-1 ring-black/5" : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
              aria-pressed={mode === "online"}
            >
              ONLINE
            </button>
            <button
              type="button"
              onClick={() => setMode("offline")}
              className={`flex-1 sm:flex-none inline-flex items-center justify-center rounded-[5px] px-6 py-2.5 text-sm font-extrabold transition-all ${
                mode === "offline" ? "bg-white text-[var(--primary)] shadow-sm ring-1 ring-black/5" : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
              aria-pressed={mode === "offline"}
            >
              OFFLINE
            </button>
          </div>
          <p className="text-sm font-semibold text-[var(--muted)] sm:text-base">
            Mọi khóa học đều bao gồm bước Chẩn đoán BCB & Kê đơn RLP 1:1
          </p>
        </div>

        {/* Thanh tab — rounded-[5px] style */}
        <div className="mt-6 w-full rounded-[5px] bg-black/5 p-1.5">
          <div
            className="flex w-full gap-1 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-2 sm:overflow-visible [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Chọn cấp khóa học"
          >
            {visibleTiers.map((t, i) => {
              const active = t.id === course.id;
              const Icon = tabIcons[i] ?? TabIconBook;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveId(t.id)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-[5px] px-5 py-2.5 text-sm font-bold transition-all duration-300 sm:flex-1 sm:shrink sm:justify-center sm:px-5 sm:py-3.5 sm:text-base ${
                    active
                      ? "bg-white text-[var(--primary)] shadow-md shadow-black/5 ring-1 ring-black/5"
                      : "text-[var(--muted)] hover:bg-black/5 hover:text-[var(--foreground)]"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0 sm:h-[1.125rem] sm:w-[1.125rem]" />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Band vs Roadmap Clarification Note */}
        <div className="mt-8 flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <div className="flex items-center gap-3 rounded-2xl bg-[var(--surface-2)] px-6 py-4 shadow-sm ring-1 ring-black/5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[5px] bg-[var(--primary)] text-white shadow-sm" aria-hidden>
              <span className="text-xs font-black">!</span>
            </div>
            <p className="text-sm font-semibold text-[var(--foreground)] leading-tight text-left">
              <span className="text-[var(--primary)] uppercase tracking-wider font-extrabold mr-2">Lưu ý:</span>
              Tại Xa Lộ, việc chia lớp theo band chỉ là điều kiện tổ chức. <br className="hidden sm:block" />
              <span className="text-[var(--muted)] font-medium italic">Không tồn tại một lộ trình chung cho cả band; mỗi học viên vẫn đi theo một kế hoạch chữa (RLP) riêng biệt.</span>
            </p>
          </div>
        </div>

        {/* Nội dung — card premium với rounded-2xl */}
        <div className="mt-8 rounded-2xl bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] ring-1 ring-black/5 sm:p-8 lg:p-10 transition-all duration-500 overflow-hidden relative">
          <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[var(--primary)]/5 blur-3xl opacity-60" />
          <div className="flex flex-col gap-4 border-b border-[var(--border)] pb-6 sm:flex-row sm:items-center sm:justify-between">
            <nav className="text-sm font-bold text-[var(--foreground)] sm:text-base" aria-label="Breadcrumb">
              <span className="text-[var(--muted)]">Khóa học</span>
              <span className="mx-2 font-extrabold text-[var(--muted)]/50">/</span>
              <span className="text-[var(--primary)]">{course.label}</span>
            </nav>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/khoa-hoc"
                className="inline-flex h-11 items-center justify-center rounded-[5px] bg-[var(--surface-1)] px-5 text-xs font-bold text-[var(--foreground)] transition-all hover:bg-[var(--secondary)]/10 hover:text-[var(--primary)] ring-1 ring-inset ring-[var(--border)] sm:text-sm"
              >
                Danh sách khóa
              </Link>
              <Link
                href="/lien-he"
                className="inline-flex h-11 items-center justify-center rounded-[5px] bg-[var(--accent)] px-6 text-xs font-bold text-white shadow-lg shadow-[var(--accent)]/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[var(--accent)]/40 sm:text-sm"
              >
                Đăng ký tư vấn
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_minmax(280px,36%)] lg:gap-10">
            {/* LEFT COLUMN: PHASES BENTO GRID */}
            <aside className="min-w-0 rounded-2xl bg-[var(--surface-2)] p-6 sm:p-8 ring-1 ring-black/5 shadow-sm self-start lg:sticky lg:top-8">
              <div>
                <h3 className="text-xl font-extrabold leading-snug text-[var(--foreground)] sm:text-2xl">{course.headline}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-[var(--muted)] sm:text-base">{course.shortDesc}</p>
                <div className="mt-6 flex items-baseline gap-2 pb-4 border-b border-black/5">
                  <span className="text-2xl font-black text-[var(--accent)] uppercase tracking-tight">Theo lộ trình</span>
                  <span className="text-xs font-semibold text-[var(--muted)]">/ tuỳ biến</span>
                </div>
              </div>

              <dl className="mt-6 space-y-4 text-sm sm:text-base">
                <div className="flex justify-between items-center gap-4">
                  <dt className="font-bold text-[var(--muted)] shrink-0">Đối tượng</dt>
                  <dd className="text-right font-bold text-[var(--foreground)]">{course.audience}</dd>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <dt className="font-bold text-[var(--muted)] shrink-0">Giáo viên</dt>
                  <dd className="text-right font-bold text-[var(--foreground)]">{course.coach}</dd>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <dt className="font-bold text-[var(--muted)] shrink-0">Chẩn đoán</dt>
                  <dd className="text-right font-bold text-[var(--foreground)]">{course.diagnostic}</dd>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <dt className="font-bold text-[var(--muted)] shrink-0">Lịch học</dt>
                  <dd className="text-right font-bold text-[var(--foreground)]">{course.schedule}</dd>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <dt className="font-bold text-[var(--muted)] shrink-0">Phản hồi</dt>
                  <dd className="text-right font-bold text-[var(--foreground)]">{course.feedback}</dd>
                </div>
              </dl>

              <div className="mt-8 rounded-[5px] bg-white p-5 ring-1 ring-black/5 relative overflow-hidden group">
                <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-[var(--primary)]/5 transition-transform duration-700 group-hover:scale-[2.5]" />
                <p className="text-[10px] font-black uppercase tracking-widest text-[var(--muted)] relative z-10">Kết quả dự kiến</p>
                <ul className="mt-4 space-y-3 text-sm relative z-10">
                  <li className="flex justify-between items-start gap-4 border-b border-black/5 pb-3">
                    <span className="text-[var(--muted)] font-semibold shrink-0">Trọng tâm</span>
                    <span className="text-right font-bold text-[var(--accent)]">{course.focus}</span>
                  </li>
                  <li className="flex justify-between items-start gap-4">
                    <span className="text-[var(--muted)] font-semibold shrink-0">Đầu ra</span>
                    <span className="text-right font-extrabold text-[var(--foreground)] leading-snug">{course.outcomeLine}</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/khoa-hoc"
                className="group mt-8 flex w-full h-14 items-center justify-center rounded-[5px] bg-[var(--primary)] text-sm font-extrabold uppercase tracking-wide text-[var(--on-primary)] shadow-lg shadow-[var(--primary)]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--primary-hover)] hover:shadow-xl hover:shadow-[var(--primary)]/40"
              >
                Chi tiết bộ môn
                <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-1.5 ml-2">
                  →
                </span>
              </Link>
            </aside>
           

            {/* RIGHT COLUMN: HIGHLIGHT ASIDE TICKET */}
            <div className="min-w-0 flex flex-col">
              <p className="text-xs font-extrabold uppercase tracking-widest text-[var(--accent)] pl-2">Nội dung khóa</p>
              <div className="mt-4 grid gap-4">
                {course.phases.map((phase) => (
                  <div key={phase.title} className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-1)]/50 p-5 sm:p-6 transition-colors hover:bg-[var(--surface-1)] hover:border-[var(--primary)]/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <h4 className="text-sm font-extrabold uppercase tracking-wide text-[var(--primary)] sm:text-base border-b border-black/5 pb-3 mb-4">
                      {phase.title}
                    </h4>
                    <div className="space-y-4">
                      {phase.rows.map((row, i) => (
                        <div key={i} className="grid gap-1 sm:grid-cols-[140px_1fr] sm:gap-6 items-start">
                          <p className="text-sm font-bold text-[var(--foreground)]">{row.module}</p>
                          <p className="text-sm leading-relaxed text-[var(--muted)]">
                            {row.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

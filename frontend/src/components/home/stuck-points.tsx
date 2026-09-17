"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Layers,
  Sparkles,
  Stethoscope,
  TrendingDown,
  X,
  Target,
  Clock,
  CheckCircle2,
} from "lucide-react";

type StuckPoint = {
  id: string;
  badge: string;
  title: string;
  pain: string;
  recommendedTrack: {
    name: string;
    targetBand: string;
    duration: string;
    description: string;
    highlights: string[];
    link: string;
  };
  colorTheme: {
    stroke: string;
    underlay: string;
    iconBg: string;
    badgeBg: string;
    badgeText: string;
    arrowBg: string;
    glow: string;
    modalGradient: string;
  };
  icon: typeof BookOpen;
};

// 4 tình trạng kẹt được thiết kế chuẩn tone Tím & Hồng của website XLE
const stuckPoints: StuckPoint[] = [
  {
    id: "mat-goc",
    badge: "NGƯỜI MỚI / HỔNG NỀN",
    title: "Mất gốc, không biết bắt đầu từ đâu",
    pain: "Grammar hổng, từ vựng ít, nghe nói khó nhưng không biết nên học từ đâu.",
    recommendedTrack: {
      name: "Lộ trình Foundation & Pre-IELTS",
      targetBand: "Từ mất gốc → Đạt 4.5+ vững vàng",
      duration: "3 - 4.5 tháng",
      description:
        "Tập trung lấy lại nền tảng từ âm vị (Phonics), nạp 1.000 từ vựng cốt lõi đầu tiên và xây phản xạ câu căn bản, không học lan man.",
      highlights: [
        "Chuẩn hoá ngữ âm & phát âm không sợ sai",
        "Hệ thống ngữ pháp ứng dụng trực tiếp",
        "Kê đơn lộ trình học tập cá nhân hóa RLP",
      ],
      link: "/khoa-hoc",
    },
    colorTheme: {
      stroke: "#6a5acd",
      underlay: "#cfc7f8",
      iconBg: "#6a5acd",
      badgeBg: "#f2efff",
      badgeText: "#5b49cb",
      arrowBg: "#6a5acd",
      glow: "rgba(106, 90, 205, 0.28)",
      modalGradient: "from-[#6a5acd]/10 via-white to-[#6a5acd]/5",
    },
    icon: BookOpen,
  },
  {
    id: "dung-band",
    badge: "CHỨNG ĐIỂM / LẶP LỖI",
    title: "Học lâu nhưng band vẫn đứng yên",
    pain: "Làm nhiều đề nhưng lỗi cũ vẫn lặp lại và không biết thứ gì đang kém.",
    recommendedTrack: {
      name: "Lộ trình Core & Bứt Phá Band",
      targetBand: "Từ 5.0 - 5.5 → Bứt phá 6.5 - 7.0+",
      duration: "2.5 - 3.5 tháng",
      description:
        "Bóc tách nguyên nhân sai lặp bằng Bảng Chẩn Bệnh (BCB), dừng giải đề thụ động, tập trung xử lý triệt để bẫy câu hỏi thi thật.",
      highlights: [
        "Bảng Chẩn Bệnh (BCB) phân loại lỗi sai logic",
        "Chiến thuật xử lý bẫy Listening & Reading",
        "Dồn 80% năng lượng vào điểm nghẽn then chốt",
      ],
      link: "/khoa-hoc",
    },
    colorTheme: {
      stroke: "#fe7794",
      underlay: "#ffd5de",
      iconBg: "#fe7794",
      badgeBg: "#fff0f3",
      badgeText: "#e05375",
      arrowBg: "#fe7794",
      glow: "rgba(254, 119, 148, 0.32)",
      modalGradient: "from-[#fe7794]/10 via-white to-[#fe7794]/5",
    },
    icon: TrendingDown,
  },
  {
    id: "deadline-gap",
    badge: "CẦN BẰNG GẤP / CẤP TỐC",
    title: "Có deadline nhưng chưa biết học thế nào",
    pain: "Có target IELTS và thời gian cụ thể nhưng chưa biết lộ trình nào phù hợp.",
    recommendedTrack: {
      name: "Lộ trình Cấp Tốc Target (Upstream)",
      targetBand: "Tối ưu hóa điểm số theo mốc nộp bằng",
      duration: "1.5 - 3 tháng",
      description:
        "Thiết kế RLP theo mốc thời gian thực của bạn, phân bổ tỷ trọng thời gian dồn vào những kỹ năng dễ bứt điểm nhanh nhất để kịp deadline.",
      highlights: [
        "Lộ trình dồn trọng tâm theo ngày thi",
        "Luyện đề chuẩn format và tâm lý phòng thi",
        "Hỗ trợ feedback liên tục không gián đoạn",
      ],
      link: "/khoa-hoc",
    },
    colorTheme: {
      stroke: "#7d6bee",
      underlay: "#ded9fc",
      iconBg: "#7d6bee",
      badgeBg: "#f4f1ff",
      badgeText: "#6450dc",
      arrowBg: "#7d6bee",
      glow: "rgba(125, 107, 238, 0.28)",
      modalGradient: "from-[#7d6bee]/10 via-white to-[#7d6bee]/5",
    },
    icon: Layers,
  },
  {
    id: "lech-ky-nang",
    badge: "LỆCH KỸ NĂNG OUTPUT",
    title: "Nghe - Đọc ổn, Nói - Viết kẹt cứng",
    pain: "Nghe Đọc 6.5 - 7.0, nhưng Nói Viết kẹt 6.0 - 5.5 vì sợ sai và thiếu tự tin.",
    recommendedTrack: {
      name: "Lộ trình Soar & Lớp Kèm 1:1 Output",
      targetBand: "Nâng Output từ 5.0 → 6.5 - 7.5+",
      duration: "2 - 3 tháng",
      description:
        "Giáo viên trực tiếp chấm chữa 1 kèm 1 theo rubric Cambridge, chỉnh phát âm ngữ điệu và tái cấu trúc luận điểm viết chuyên sâu.",
      highlights: [
        "Chấm chữa Writing dòng-qua-dòng",
        "Luyện phản xạ Speaking 1:1 với chuyên gia 8.0+",
        "Thoát bẫy dịch từng từ (word-by-word)",
      ],
      link: "/khoa-hoc",
    },
    colorTheme: {
      stroke: "#e9597c",
      underlay: "#fed0dc",
      iconBg: "#e9597c",
      badgeBg: "#fff0f4",
      badgeText: "#d1365e",
      arrowBg: "#e9597c",
      glow: "rgba(233, 89, 124, 0.3)",
      modalGradient: "from-[#e9597c]/10 via-white to-[#e9597c]/5",
    },
    icon: Target,
  },
];

// SVG Wavy Path chuẩn theo dáng card hữu cơ trong ảnh tham khảo
const CARD_WAVY_PATH =
  "M 4 52 C 4 26, 24 20, 52 20 C 78 20, 88 14, 114 14 C 140 14, 154 32, 180 32 C 210 32, 230 18, 260 18 C 282 18, 282 28, 282 52 L 282 310 C 282 332, 266 342, 236 342 C 196 342, 172 330, 136 334 C 100 338, 72 348, 46 345 C 20 342, 4 330, 4 310 Z";

export function StuckPointsSection() {
  const [activeModalItem, setActiveModalItem] = useState<StuckPoint | null>(null);

  return (
    <section className="relative overflow-hidden bg-white py-14 sm:py-20 border-t border-black/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)]/15 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[var(--secondary)] border border-[var(--primary)]/30">
            <Stethoscope className="h-4 w-4 text-[var(--secondary)]" />
            Tự chẩn đoán vấn đề học tập
          </div>
          <h2 className="mt-3.5 font-heading text-3xl font-black tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl text-balance">
            Bạn đang kẹt ở đâu trên hành trình IELTS?
          </h2>
          <p className="mt-2.5 text-sm font-medium leading-relaxed text-[var(--muted)] sm:text-base text-pretty">
            Chọn tình trạng của bạn bên dưới để xem trực tiếp lộ trình học phù hợp và giải pháp đặc trị:
          </p>
        </div>

        {/* Subtitle Bar chuẩn theo ảnh: | CHỌN TÌNH TRẠNG CỦA BẠN: */}
        <div className="mt-10 mb-4 flex items-center gap-2 px-1">
          <span className="h-5 w-1 rounded-full bg-[var(--secondary)]" />
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#475569]">
            CHỌN TÌNH TRẠNG CỦA BẠN:
          </span>
        </div>

        {/* 4 Cards Trải Ngang Chuẩn Style Lượn Sóng Hữu Cơ (Organic Wavy Cards) */}
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4 pt-4">
          {stuckPoints.map((item) => {
            const ItemIcon = item.icon;

            return (
              <div
                key={item.id}
                onClick={() => setActiveModalItem(item)}
                className="group relative cursor-pointer pt-6 pb-2 transition-all duration-300 hover:-translate-y-2 select-none"
              >
                {/* Layer 1: Underlay colored shadow base (phần đế màu nổi phía dưới y hệt trong ảnh) */}
                <svg
                  className="absolute inset-x-0 bottom-0 h-[calc(100%-20px)] w-full translate-y-2 pointer-events-none drop-shadow-xs transition-transform duration-300 group-hover:translate-y-3"
                  viewBox="0 0 286 346"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path d={CARD_WAVY_PATH} fill={item.colorTheme.underlay} />
                </svg>

                {/* Layer 2: Main white card với viền nét uốn lượn sắc sảo */}
                <svg
                  className="absolute inset-x-0 bottom-0 h-[calc(100%-20px)] w-full pointer-events-none drop-shadow-md"
                  viewBox="0 0 286 346"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path
                    d={CARD_WAVY_PATH}
                    fill="#ffffff"
                    stroke={item.colorTheme.stroke}
                    strokeWidth="2.5"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>

                {/* Blob Icon Floating Top Left kèm 3 tia phóng sáng (3 radiating rays) */}
                <div className="absolute -top-1 left-5 z-20 flex items-center justify-center">
                  <div
                    className="relative flex h-14 w-14 sm:h-15 sm:w-15 items-center justify-center rounded-[22px] text-white shadow-lg transition-transform duration-300 group-hover:rotate-[-4deg] group-hover:scale-105"
                    style={{
                      backgroundColor: item.colorTheme.iconBg,
                      boxShadow: `0 10px 22px -5px ${item.colorTheme.glow}`,
                    }}
                  >
                    <ItemIcon className="h-7 w-7 stroke-[2.2]" />

                    {/* 3 Radiating Rays shooting out from top-right of the blob */}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="absolute -top-3 -right-3 h-6 w-6 pointer-events-none"
                      style={{ color: item.colorTheme.iconBg }}
                    >
                      <path
                        d="M4 15L1.5 12"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M11 9L11 3.5"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M18 14L21.5 11"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Nội dung bên trong Card */}
                <div className="relative z-10 flex min-h-[310px] flex-col justify-between p-6 pt-15">
                  <div>
                    {/* Badge Tình Trạng */}
                    <div className="inline-block">
                      <span
                        className="inline-block rounded-full px-3.5 py-1 text-[11px] font-black uppercase tracking-wider"
                        style={{
                          backgroundColor: item.colorTheme.badgeBg,
                          color: item.colorTheme.badgeText,
                        }}
                      >
                        {item.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mt-3.5 font-heading text-lg sm:text-[19px] font-black text-[#1e293b] leading-tight transition-colors group-hover:text-[var(--secondary)]">
                      {item.title}
                    </h3>

                    {/* Pain Text */}
                    <p className="mt-2.5 text-xs sm:text-[13px] font-medium leading-relaxed text-[#64748b]">
                      {item.pain}
                    </p>
                  </div>

                  {/* Nút bấm tròn mũi tên góc dưới bên phải chuẩn ảnh */}
                  <div className="mt-6 flex items-center justify-end">
                    <div
                      className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-white shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                      style={{
                        backgroundColor: item.colorTheme.arrowBg,
                        boxShadow: `0 6px 16px -3px ${item.colorTheme.glow}`,
                      }}
                      title="Bấm để xem lộ trình phù hợp"
                    >
                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner Call to Action (Giữ CTA chuẩn) */}
        <div className="mt-12 rounded-3xl bg-[var(--surface-2)] p-6 sm:p-7 border border-[var(--border-strong)] shadow-sm">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row text-center md:text-left">
            <div className="flex items-center gap-3.5">
              <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--primary)] text-white shadow-md shadow-[var(--primary)]/20">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <p className="text-base sm:text-lg font-black text-[var(--foreground)]">
                  Chưa chắc chắn mình đang kẹt ở điểm nào?
                </p>
                <p className="mt-0.5 text-xs sm:text-sm text-[var(--muted)] font-medium text-pretty">
                  Làm bài test 4 kỹ năng hoàn toàn miễn phí để giáo viên XLE trực tiếp chẩn đoán tình trạng cho bạn.
                </p>
              </div>
            </div>

            <Link
              href="/#test-dau-vao"
              className="animate-cta-pulse w-full md:w-auto inline-flex min-h-[46px] shrink-0 items-center justify-center rounded-2xl bg-[var(--primary)] px-6 py-3 text-xs sm:text-sm font-black uppercase tracking-wider text-white transition-all hover:bg-[var(--secondary)] shadow-md text-center"
            >
              Test trình độ ngay
            </Link>
          </div>
        </div>
      </div>

      {/* Modal: Hiển thị Trực Tiếp Lộ Trình Phù Hợp Khi Click Card */}
      {activeModalItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 border border-black/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveModalItem(null)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-start gap-3.5 border-b border-black/5 pb-4">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-sm"
                style={{ backgroundColor: activeModalItem.colorTheme.iconBg }}
              >
                <activeModalItem.icon className="h-6 w-6 stroke-[2.2]" />
              </div>
              <div>
                <span
                  className="rounded-full px-3 py-0.5 text-xs font-black uppercase"
                  style={{
                    backgroundColor: activeModalItem.colorTheme.badgeBg,
                    color: activeModalItem.colorTheme.badgeText,
                  }}
                >
                  {activeModalItem.badge}
                </span>
                <h4 className="mt-1.5 text-lg sm:text-xl font-black text-[var(--foreground)]">
                  {activeModalItem.title}
                </h4>
              </div>
            </div>

            {/* Lộ trình học tương ứng phù hợp */}
            <div className="mt-5 space-y-4">
              <div
                className={`rounded-2xl bg-gradient-to-br ${activeModalItem.colorTheme.modalGradient} p-5 border`}
                style={{ borderColor: activeModalItem.colorTheme.underlay }}
              >
                <span
                  className="text-[11px] font-black uppercase tracking-wider"
                  style={{ color: activeModalItem.colorTheme.badgeText }}
                >
                  Lộ trình học đề xuất phù hợp:
                </span>
                <h5 className="mt-1 text-base sm:text-lg font-black text-[var(--foreground)]">
                  {activeModalItem.recommendedTrack.name}
                </h5>

                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-bold">
                  <span
                    className="flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 shadow-xs"
                    style={{ color: activeModalItem.colorTheme.badgeText }}
                  >
                    <Target className="h-3.5 w-3.5" />
                    {activeModalItem.recommendedTrack.targetBand}
                  </span>
                  <span className="flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 text-slate-700 shadow-xs">
                    <Clock className="h-3.5 w-3.5" />
                    {activeModalItem.recommendedTrack.duration}
                  </span>
                </div>

                <p className="mt-3 text-xs sm:text-sm font-medium leading-relaxed text-[var(--foreground)]">
                  {activeModalItem.recommendedTrack.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="rounded-2xl bg-white p-4 border border-black/5 shadow-xs">
                <p className="text-xs font-black uppercase tracking-wider text-[var(--muted)]">
                  Điểm khác biệt của giải pháp XLE:
                </p>
                <ul className="mt-2.5 space-y-2">
                  {activeModalItem.recommendedTrack.highlights.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[var(--foreground)]"
                    >
                      <CheckCircle2
                        className="h-4 w-4 shrink-0"
                        style={{ color: activeModalItem.colorTheme.iconBg }}
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action CTA: Test đầu vào để chẩn đoán tình trạng */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/#test-dau-vao"
                onClick={() => setActiveModalItem(null)}
                className="flex-1 flex h-12 items-center justify-center rounded-2xl bg-[var(--primary)] text-xs sm:text-sm font-black uppercase tracking-wider text-white transition-colors hover:bg-[var(--secondary)] shadow-md text-center"
              >
                <Stethoscope className="mr-2 h-4 w-4 shrink-0" />
                Test đầu vào để chẩn đoán
              </Link>
              <Link
                href="/khoa-hoc"
                onClick={() => setActiveModalItem(null)}
                className="flex h-12 items-center justify-center rounded-2xl border border-black/10 bg-[var(--surface-1)] px-5 text-xs font-bold text-[var(--foreground)] hover:bg-slate-200 text-center"
              >
                Xem chi tiết khoá
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

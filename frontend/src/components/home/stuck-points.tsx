"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  BookOpen,
  CalendarClock,
  ChevronRight,
  Layers,
  Sparkles,
  TrendingDown,
  HelpCircle,
  Stethoscope,
  X,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

type StuckPoint = {
  id: string;
  badge: string;
  title: string;
  pain: string;
  image: string;
  detailedSymptom: string;
  rootCause: string;
  solution: string;
  icon: typeof HelpCircle;
};

const stuckPoints: StuckPoint[] = [
  {
    id: "mat-goc",
    badge: "Người mới / Hổng nền",
    title: "Mất gốc, không biết bắt đầu từ đâu",
    pain: "Grammar hổng, từ vựng ít, nghe nói khó nhưng không biết nên học phần nào trước.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600&h=360",
    detailedSymptom:
      "Học trước quên sau, sợ làm bài thi, không viết được đoạn văn hoàn chỉnh và phát âm sai âm cơ bản.",
    rootCause:
      "Chưa có hệ thống ngữ âm Phonics chuẩn và thiếu khung 1,000 từ vựng cốt lõi đầu tiên.",
    solution:
      "Test 4 kỹ năng để lọc đúng lỗ hổng cốt lõi, kê lộ trình Foundation từ gốc, không học lan man.",
    icon: BookOpen,
  },
  {
    id: "dung-band",
    badge: "Chững điểm / Lặp lỗi",
    title: "Học lâu nhưng band vẫn đứng yên",
    pain: "Làm nhiều đề nhưng lỗi cũ vẫn lặp lại và không biết thứ gì đang kéo điểm xuống.",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=600&h=360",
    detailedSymptom:
      "Làm nhiều đề Cam, điểm Reading/Listening kẹt 5.5 - 6.0, Writing bị lặp lỗi cấu trúc câu phức.",
    rootCause:
      "Chỉ luyện giải đề thụ động mà không có Bảng Chẩn Bệnh (BCB) bóc tách nguyên nhân sai sót theo dạng bài.",
    solution:
      "Chẩn đoán phân tích lỗi sai logic và kỹ thuật làm bài, sửa từng lỗi lặp cho đến khi triệt để.",
    icon: TrendingDown,
  },
  {
    id: "deadline-gap",
    badge: "Cần bằng gấp / Cấp tốc",
    title: "Có deadline nhưng chưa biết học thế nào",
    pain: "Có target IELTS và thời gian cụ thể nhưng chưa biết lộ trình nào thực tế.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600&h=360",
    detailedSymptom:
      "Cần nộp chứng chỉ trong 3-6 tháng tới để ra trường hoặc du học nhưng cảm thấy quá tải trước lượng kiến thức.",
    rootCause:
      "Phân bổ thời gian sai cách, dàn trải đều 4 kỹ năng thay vì tập trung vào kỹ năng bứt phá điểm nhanh nhất.",
    solution:
      "Xây dựng RLP theo mốc thời gian thực, dồn 80% năng lượng vào điểm số dễ bứt phá nhất.",
    icon: CalendarClock,
  },
  {
    id: "lech-ky-nang",
    badge: "Lệch kỹ năng Output",
    title: "Nghe - Đọc ổn, Nói - Viết kẹt cứng",
    pain: "Nghe Đọc 6.5 - 7.0 nhưng Nói Viết kẹt ở 5.0 - 5.5 vì sợ sai và thiếu phản xạ.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600&h=360",
    detailedSymptom:
      "Làm trắc nghiệm tốt nhưng khi mở miệng nói hoặc viết bài luận thì dịch từng từ từ tiếng Việt, ý tứ lộn xộn.",
    rootCause:
      "Thiếu môi trường tương tác phản hồi liên tục và chưa nắm cấu trúc tư duy triển khai luận điểm chuẩn thi.",
    solution:
      "Giáo viên trực tiếp chấm chữa 1 kèm 1 theo rubric Cambridge, chỉnh phát âm và sửa câu từ chi tiết.",
    icon: Layers,
  },
];

export function StuckPointsSection() {
  const [selectedId, setSelectedId] = useState<string>(stuckPoints[0].id);
  const activeItem = stuckPoints.find((item) => item.id === selectedId) ?? stuckPoints[0];
  const ActiveIcon = activeItem.icon;

  return (
    <section className="relative overflow-hidden bg-[var(--background)] py-12 sm:py-16 border-t border-black/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-[5px] bg-[var(--primary)]/15 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[var(--secondary)] border border-[var(--primary)]/30">
            <Stethoscope className="h-4 w-4 text-[var(--secondary)]" />
            Tự chẩn đoán vấn đề học tập
          </div>
          <h2 className="mt-3.5 font-heading text-3xl font-black tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl text-balance">
            Bạn đang kẹt ở đâu trên hành trình IELTS?
          </h2>
          <p className="mt-2.5 text-sm font-medium leading-relaxed text-[var(--muted)] sm:text-base text-pretty">
            Chọn một trong các triệu chứng phổ biến bên dưới để xem phân tích nguyên nhân gốc rễ và phác đồ điều trị:
          </p>
        </div>

        {/* Interactive Symptom Diagnostic Console (No Card Overload) */}
        <div className="mt-10 grid gap-6 lg:grid-cols-12 items-stretch">
          {/* LEFT: 4 Symptom Selectors (Danh sách chọn triệu chứng) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <p className="text-xs font-black uppercase tracking-wider text-[var(--muted)] pl-1">
              Chọn tình trạng của bạn:
            </p>
            {stuckPoints.map((item, index) => {
              const isSelected = item.id === selectedId;
              const ItemIcon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`group relative flex items-start gap-3.5 rounded-[5px] p-4 text-left transition-all duration-200 cursor-pointer border ${
                    isSelected
                      ? "bg-white border-[var(--secondary)] shadow-md shadow-[var(--secondary)]/10 -translate-y-0.5"
                      : "bg-white/60 border-[var(--border-strong)] hover:bg-white hover:border-[var(--secondary)]/40 hover:shadow-sm"
                  }`}
                >
                  {/* Left accent bar if selected */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[var(--secondary)] rounded-l-[5px]" />
                  )}

                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[5px] transition-colors ${
                      isSelected
                        ? "bg-[var(--secondary)] text-white shadow-sm"
                        : "bg-[var(--surface-1)] text-[var(--muted)] group-hover:bg-[var(--primary)]/15 group-hover:text-[var(--secondary)]"
                    }`}
                  >
                    <ItemIcon className="h-5 w-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-[5px] px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                          isSelected
                            ? "bg-[var(--primary)]/20 text-[var(--secondary)]"
                            : "bg-black/5 text-[var(--muted)]"
                        }`}
                      >
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="mt-1 font-heading text-sm sm:text-base font-black text-[var(--foreground)] leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-[var(--muted)] line-clamp-1 font-medium">
                      {item.pain}
                    </p>
                  </div>

                  <ChevronRight
                    className={`h-4 w-4 shrink-0 transition-transform self-center ${
                      isSelected
                        ? "text-[var(--secondary)] translate-x-0.5"
                        : "text-slate-300 group-hover:text-[var(--secondary)]"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* RIGHT: Real-time Diagnostic Analysis Panel (Bảng Bóc Tách & Phác Đồ) */}
          <div
            key={activeItem.id}
            className="lg:col-span-7 flex flex-col justify-between rounded-2xl bg-white p-6 sm:p-8 border-2 border-[var(--primary)]/30 shadow-xl shadow-purple-900/5 animate-in fade-in duration-300 relative overflow-hidden"
          >
            <div>
              {/* Header of Active Diagnosis */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/5 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[5px] bg-[var(--secondary)] text-white shadow-sm">
                    <ActiveIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="rounded-[5px] bg-[var(--primary)]/15 px-2.5 py-0.5 text-xs font-black uppercase text-[var(--secondary)]">
                      {activeItem.badge}
                    </span>
                    <h3 className="mt-1 font-heading text-lg sm:text-xl font-black text-[var(--foreground)]">
                      {activeItem.title}
                    </h3>
                  </div>
                </div>

                <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-[5px] border border-black/10 hidden sm:block">
                  <Image
                    src={activeItem.image}
                    alt={activeItem.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* 3 Structured Diagnostic Insights */}
              <div className="mt-5 space-y-3.5">
                {/* 1. Dấu hiệu nhận biết cụ thể */}
                <div className="rounded-[5px] bg-amber-500/5 p-4 border border-amber-500/20">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-700">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Dấu hiệu nhận biết cụ thể:</span>
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm font-medium leading-relaxed text-[var(--foreground)] text-pretty">
                    {activeItem.detailedSymptom}
                  </p>
                </div>

                {/* 2. Nguyên nhân cốt lõi */}
                <div className="rounded-[5px] bg-[var(--surface-1)] p-4 border border-slate-200/80">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-700">
                    <span>🔍</span>
                    <span>Nguyên nhân gốc rễ (Bản chất lỗi sai):</span>
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm font-medium leading-relaxed text-slate-700 text-pretty">
                    {activeItem.rootCause}
                  </p>
                </div>

                {/* 3. Phác đồ điều trị XLE */}
                <div className="rounded-[5px] bg-gradient-to-r from-[var(--primary)]/15 to-[var(--secondary)]/15 p-4 border border-[var(--primary)]/40 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[var(--secondary)]">
                    <CheckCircle2 className="h-4 w-4 text-[var(--secondary)]" />
                    <span>Phác đồ Chẩn & Chữa tại XLE:</span>
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm font-black leading-relaxed text-[var(--secondary)] text-pretty">
                    {activeItem.solution}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div className="mt-6 pt-5 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs font-semibold text-[var(--muted)] text-center sm:text-left">
                Được kiểm tra & tư vấn lộ trình riêng hoàn toàn miễn phí.
              </p>
              <Link
                href="/#test-dau-vao"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-[5px] bg-[var(--primary)] px-6 py-3 text-xs font-black uppercase tracking-wider text-white transition-all hover:bg-[var(--secondary)] shadow-md hover:shadow-lg hover:-translate-y-0.5 shrink-0"
              >
                Nhận Bảng Chẩn Bệnh Cho Tình Trạng Này
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Banner Call to Action */}
        <div className="mt-8 rounded-2xl bg-[var(--surface-2)] p-5 sm:p-6 border border-[var(--border-strong)] shadow-sm">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row text-center md:text-left">
            <div className="flex items-center gap-3.5">
              <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-[5px] bg-[var(--primary)] text-white">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-base font-extrabold text-[var(--foreground)]">
                  Chưa chắc chắn mình đang kẹt ở điểm nào?
                </p>
                <p className="mt-0.5 text-xs sm:text-sm text-[var(--muted)] font-medium text-pretty">
                  Làm bài test 4 kỹ năng hoàn toàn miễn phí để giáo viên XLE trực tiếp chẩn đoán cho bạn.
                </p>
              </div>
            </div>

            <Link
              href="/#test-dau-vao"
              className="inline-flex h-11 shrink-0 items-center justify-center rounded-[5px] bg-[var(--primary)] px-6 text-xs font-black uppercase tracking-wider text-white transition-all hover:bg-[var(--secondary)] shadow-sm"
            >
              Test & Chẩn Bệnh Ngay
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


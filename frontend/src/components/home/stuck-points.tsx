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
  const [activePopupItem, setActivePopupItem] = useState<StuckPoint | null>(null);

  // Lock body scroll when popup is open
  useEffect(() => {
    if (activePopupItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activePopupItem]);

  // Handle ESC key to close popup
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActivePopupItem(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[var(--background)] py-10 sm:py-14 border-t border-black/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-[5px] bg-[var(--primary)]/10 px-3.5 py-1 text-xs font-black uppercase tracking-widest text-[var(--secondary)] border border-[var(--primary)]/20">
            <Stethoscope className="h-3.5 w-3.5 text-[var(--secondary)]" />
            Nhận diện vấn đề
          </div>
          <h2 className="mt-3 font-heading text-3xl font-black tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl text-balance">
            Bạn đang kẹt ở đâu trên hành trình IELTS?
          </h2>
          <p className="mt-2.5 text-sm font-medium leading-relaxed text-[var(--muted)] sm:text-base text-pretty">
            Nhấp vào từng thẻ bên dưới để xem popup phân tích chẩn bệnh chi tiết:
          </p>
        </div>

        {/* 4 Cards Grid with Images - Clicking opens popup */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {stuckPoints.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                onClick={() => setActivePopupItem(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActivePopupItem(item);
                  }
                }}
                className="group relative flex flex-col justify-between rounded-[5px] bg-white p-3.5 border border-[var(--border-strong)] transition-all duration-200 text-left cursor-pointer hover:border-[var(--secondary)] hover:shadow-md hover:-translate-y-0.5 select-none"
              >
                <div>
                  {/* Card Thumbnail Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[5px] bg-[var(--surface-1)] border border-black/5">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                    
                    {/* Badge over image */}
                    <div className="absolute top-2 left-2">
                      <span className="inline-flex rounded-[5px] bg-white/95 backdrop-blur-sm border border-black/10 px-2 py-0.5 text-[10px] font-black text-[var(--secondary)] shadow-sm">
                        {item.badge}
                      </span>
                    </div>

                    {/* Icon over image */}
                    <div className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-[5px] bg-white/95 backdrop-blur-sm text-[var(--secondary)] shadow-sm">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                  </div>

                  {/* Card Title */}
                  <h3 className="mt-3 font-heading text-sm font-black text-[var(--foreground)] leading-snug text-pretty group-hover:text-[var(--secondary)] transition-colors">
                    {item.title}
                  </h3>

                  {/* Main Pain Description */}
                  <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted)] font-medium text-pretty line-clamp-3">
                    {item.pain}
                  </p>
                </div>

                {/* Bottom CTA trigger */}
                <div className="mt-4 border-t border-black/5 pt-2.5 flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--secondary)]">
                    Xem chẩn đoán chi tiết
                  </span>
                  <div className="flex h-5 w-5 items-center justify-center rounded-[5px] bg-[var(--primary)]/10 text-[var(--secondary)] group-hover:bg-[var(--secondary)] group-hover:text-white transition-all">
                    <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner Call to Action */}
        <div className="mt-10 rounded-[5px] bg-[var(--surface-2)] p-5 sm:p-6 border border-[var(--border-strong)]">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row text-center md:text-left">
            <div className="flex items-center gap-3.5">
              <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-[5px] bg-[var(--primary)] text-white">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-base font-extrabold text-[var(--foreground)]">
                  Chưa chắc chắn mình đang kẹt ở điểm nào?
                </p>
                <p className="mt-0.5 text-xs text-[var(--muted)] font-medium text-pretty">
                  Làm bài test 4 kỹ năng hoàn toàn miễn phí để giáo viên XLE trực tiếp chẩn đoán cho bạn.
                </p>
              </div>
            </div>

            <Link
              href="/#test-dau-vao"
              className="inline-flex h-11 shrink-0 items-center justify-center rounded-[5px] bg-[var(--primary)] px-6 text-xs font-black uppercase tracking-wider text-white transition-all hover:bg-[var(--secondary)]"
            >
              Test & Chẩn Bệnh Ngay
            </Link>
          </div>
        </div>
      </div>

      {/* POPUP MODAL */}
      {activePopupItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActivePopupItem(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-[5px] bg-white p-6 shadow-2xl border border-[var(--border-strong)] animate-in zoom-in-95 duration-200"
          >
            {/* Close Button */}
            <button
              onClick={() => setActivePopupItem(null)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-[5px] text-[var(--muted)] hover:bg-[var(--surface-1)] hover:text-[var(--foreground)] transition-colors"
              aria-label="Đóng popup"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Popup Header */}
            <div className="flex items-center gap-2">
              <span className="inline-flex rounded-[5px] bg-[var(--primary)]/10 border border-[var(--primary)]/20 px-2.5 py-0.5 text-xs font-bold text-[var(--secondary)]">
                {activePopupItem.badge}
              </span>
            </div>

            <h3 className="mt-2.5 font-heading text-xl font-black text-[var(--foreground)] text-pretty pr-8">
              {activePopupItem.title}
            </h3>

            <p className="mt-1.5 text-xs font-medium text-[var(--muted)] text-pretty">
              {activePopupItem.pain}
            </p>

            {/* Popup Detailed Sections */}
            <div className="mt-5 space-y-3.5">
              {/* Dấu hiệu nhận biết */}
              <div className="rounded-[5px] bg-[var(--surface-1)] p-3.5 border border-black/5">
                <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[var(--secondary)]">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span>Dấu hiệu nhận biết cụ thể:</span>
                </div>
                <p className="mt-1.5 text-xs font-medium leading-relaxed text-[var(--foreground)] text-pretty">
                  {activePopupItem.detailedSymptom}
                </p>
              </div>

              {/* Nguyên nhân gốc rễ */}
              <div className="rounded-[5px] bg-[var(--surface-1)] p-3.5 border border-black/5">
                <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[var(--foreground)]">
                  <span className="h-2 w-2 rounded-full bg-[var(--secondary)]" />
                  <span>Nguyên nhân gốc rễ:</span>
                </div>
                <p className="mt-1.5 text-xs font-medium leading-relaxed text-[var(--muted)] text-pretty">
                  {activePopupItem.rootCause}
                </p>
              </div>

              {/* Giải pháp tại XLE */}
              <div className="rounded-[5px] bg-[var(--primary)]/10 p-3.5 border border-[var(--primary)]/20">
                <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[var(--secondary)]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[var(--secondary)]" />
                  <span>Phác đồ Chẩn & Chữa tại XLE:</span>
                </div>
                <p className="mt-1.5 text-xs font-bold leading-relaxed text-[var(--secondary)] text-pretty">
                  {activePopupItem.solution}
                </p>
              </div>
            </div>

            {/* Popup CTA Footer */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-black/5">
              <button
                onClick={() => setActivePopupItem(null)}
                className="w-full sm:w-auto text-xs font-bold text-[var(--muted)] hover:text-[var(--foreground)] transition-colors py-2"
              >
                Đóng
              </button>
              <Link
                href="/#test-dau-vao"
                onClick={() => setActivePopupItem(null)}
                className="w-full sm:w-auto inline-flex h-10 items-center justify-center gap-2 rounded-[5px] bg-[var(--primary)] px-5 text-xs font-black uppercase tracking-wider text-white transition-all hover:bg-[var(--secondary)] shadow-sm"
              >
                Đăng ký Test & Chẩn Bệnh
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}


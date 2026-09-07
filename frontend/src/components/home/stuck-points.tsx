"use client";

import Link from "next/link";
import { useState } from "react";
import { AlertCircle, ArrowRight, BookOpen, Clock, Layers, Sparkles, TrendingDown } from "lucide-react";

type StuckPoint = {
  id: string;
  badge: string;
  title: string;
  pain: string;
  solution: string;
  icon: typeof AlertCircle;
  tagColor: string;
  accentColor: string;
};

const stuckPoints: StuckPoint[] = [
  {
    id: "mat-goc",
    badge: "Người mới / Hổng nền",
    title: "Mất gốc, không biết bắt đầu từ đâu",
    pain: "Grammar hổng, từ vựng ít, nghe nói khó nhưng không biết nên học phần nào trước để tiết kiệm thời gian.",
    solution: "Test 4 kỹ năng để lọc đúng lỗ hổng cốt lõi, không bắt học lại từ zero mọi thứ.",
    icon: BookOpen,
    tagColor: "bg-[var(--primary)]/15 text-[var(--secondary)] border-[var(--primary)]/30",
    accentColor: "group-hover:border-[var(--primary)]",
  },
  {
    id: "dung-band",
    badge: "Chững điểm / Lặp lỗi",
    title: "Học lâu nhưng band vẫn đứng yên",
    pain: "Giải nhiều đề, cày ngày cày đêm nhưng lỗi cũ vẫn lặp lại và không biết thứ gì đang thực sự kéo điểm xuống.",
    solution: "Bảng Chẩn Bệnh (BCB) bóc tách chi tiết nguyên nhân gốc rễ (logic, ngữ pháp hay phát âm).",
    icon: TrendingDown,
    tagColor: "bg-[var(--secondary)]/15 text-[var(--secondary)] border-[var(--secondary)]/30",
    accentColor: "group-hover:border-[var(--secondary)]",
  },
  {
    id: "deadline-gap",
    badge: "Cần bằng gấp / Cấp tốc",
    title: "Có deadline nhưng chưa biết học thế nào",
    pain: "Có target IELTS (6.5+, 7.0+) và thời gian cụ thể (3 - 6 tháng) nhưng chưa có một lộ trình thực tế, khả thi.",
    solution: "Kê lộ trình RLP theo mốc thời gian thực, ưu tiên các dạng bài mang lại điểm số cao nhất.",
    icon: Clock,
    tagColor: "bg-[var(--primary)]/15 text-[var(--secondary)] border-[var(--primary)]/30",
    accentColor: "group-hover:border-[var(--primary)]",
  },
  {
    id: "lech-ky-nang",
    badge: "Lệch kỹ năng",
    title: "Nghe - Đọc ổn, Nói - Viết kẹt cứng",
    pain: "Passive skills (Nghe/Đọc) 6.5 - 7.0 nhưng Speaking và Writing mãi không qua nổi 5.5 vì sợ sai và thiếu phản xạ.",
    solution: "Tập trung 100% vào chấm chữa trực tiếp Speaking & Writing theo từng tiêu chí chấm thi chuẩn.",
    icon: Layers,
    tagColor: "bg-[var(--secondary)]/15 text-[var(--secondary)] border-[var(--secondary)]/30",
    accentColor: "group-hover:border-[var(--secondary)]",
  },
];

export function StuckPointsSection() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden bg-[var(--background)] py-16 sm:py-24 border-t border-black/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)]/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[var(--secondary)] ring-1 ring-[var(--primary)]/20">
            <AlertCircle className="h-3.5 w-3.5 text-[var(--secondary)]" />
            Nhận diện vấn đề của bạn
          </div>
          <h2 className="mt-4 font-heading text-3xl font-black tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl">
            Bạn đang kẹt ở đâu trên hành trình IELTS?
          </h2>
          <p className="mt-4 text-base font-medium leading-relaxed text-[var(--muted)] sm:text-lg">
            Đừng vội mua khóa học khi chưa biết mình tắc ở khâu nào. Xem các trường hợp điển hình dưới đây để tìm hướng giải quyết:
          </p>
        </div>

        {/* Cards Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stuckPoints.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveId(item.id)}
                onMouseLeave={() => setActiveId(null)}
                className={`group relative flex flex-col justify-between rounded-[2rem] bg-white p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)] ${item.accentColor} border-2 border-transparent`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-wide ${item.tagColor}`}>
                      {item.badge}
                    </span>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--surface-1)] text-[var(--foreground)] transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-5 w-5 text-[var(--primary)]" />
                    </div>
                  </div>

                  <h3 className="mt-5 text-xl font-extrabold text-[var(--foreground)] leading-snug text-pretty">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] font-medium text-pretty">
                    {item.pain}
                  </p>
                </div>

                <div className="mt-6 border-t border-black/5 pt-4">
                  <p className="text-[11px] font-black uppercase tracking-wider text-[var(--secondary)]">
                    Cách XLE giải quyết:
                  </p>
                  <p className="mt-1.5 text-xs font-semibold leading-relaxed text-[var(--foreground)] text-pretty">
                    {item.solution}
                  </p>

                  <div className="mt-4 flex items-center justify-end">
                    <Link
                      href="/#test-dau-vao"
                      className="inline-flex items-center gap-1.5 text-xs font-black text-[var(--primary)] hover:text-[var(--secondary)] transition-colors"
                    >
                      Chẩn đoán điểm này
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner Call to Action */}
        <div className="mt-12 rounded-[2.5rem] bg-[var(--surface-2)] p-6 sm:p-8 ring-1 ring-black/5 shadow-sm">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row text-center md:text-left">
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-white shadow-md shadow-[var(--primary)]/20">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <p className="text-base font-extrabold text-[var(--foreground)] sm:text-lg">
                  Chưa chắc chắn mình đang kẹt ở điểm nào?
                </p>
                <p className="text-sm text-[var(--muted)] font-medium">
                  Làm bài test 4 kỹ năng hoàn toàn miễn phí để giáo viên XLE trực tiếp chẩn đoán cho bạn.
                </p>
              </div>
            </div>

            <Link
              href="/#test-dau-vao"
              className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] px-7 text-xs font-black uppercase tracking-wider text-white shadow-md transition-all hover:bg-[var(--secondary)] hover:shadow-lg"
            >
              Test & Chẩn Bệnh Ngay
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

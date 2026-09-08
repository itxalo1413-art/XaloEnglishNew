"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  FileSpreadsheet,
  Gauge,
  PenTool,
  RefreshCw,
  Search,
  Sparkles,
  Stethoscope,
  Target,
  Zap,
} from "lucide-react";

type ProcessStep = {
  step: number;
  title: string;
  desc: string;
  tag: string;
  image: string;
  icon: typeof Search;
};

const chanSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Test đầu vào 4 kỹ năng",
    desc: "Đánh giá Listening, Reading, Writing, Speaking theo rubric chuẩn.",
    tag: "Đánh giá toàn diện",
    image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&q=80&w=500&h=300",
    icon: ClipboardCheck,
  },
  {
    step: 2,
    title: "Phân tích điểm mạnh - điểm yếu",
    desc: "Xác định phần đang kéo band xuống và nguyên nhân cụ thể.",
    tag: "Bóc tách nguyên nhân",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=500&h=300",
    icon: Search,
  },
  {
    step: 3,
    title: "Nhận Bảng Chẩn Bệnh (BCB)",
    desc: "Biết rõ danh sách lỗi, mức độ ưu tiên và hướng cải thiện.",
    tag: "Báo cáo chi tiết",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=500&h=300",
    icon: FileSpreadsheet,
  },
];

const chuaSteps: ProcessStep[] = [
  {
    step: 4,
    title: "Kê lộ trình học phù hợp (RLP)",
    desc: "Cá nhân hóa theo trình độ hiện tại, mục tiêu và thời gian.",
    tag: "Cá nhân hóa",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=500&h=300",
    icon: Target,
  },
  {
    step: 5,
    title: "Học tập trung vào điểm yếu",
    desc: "Không học lan man, ưu tiên đúng phần cần cải thiện nhất.",
    tag: "Tập trung 80/20",
    image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=80&w=500&h=300",
    icon: Zap,
  },
  {
    step: 6,
    title: "Chấm chữa - phản hồi liên tục",
    desc: "Sửa lỗi đều đặn trong suốt quá trình học và luyện tập.",
    tag: "Feedback 1 kèm 1",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=500&h=300",
    icon: PenTool,
  },
  {
    step: 7,
    title: "Đo lại & điều chỉnh",
    desc: "Theo dõi tiến bộ, đánh giá lại và cập nhật lộ trình khi cần.",
    tag: "Tối ưu liên tục",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=500&h=300",
    icon: RefreshCw,
  },
];

export function ProcessTeaserSection() {
  const [activePhase, setActivePhase] = useState<"all" | "chan" | "chua">("all");

  return (
    <section className="scroll-mt-24 relative overflow-hidden bg-[var(--background)] py-10 sm:py-14 border-t border-black/5">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-[5px] bg-[var(--primary)]/15 px-3.5 py-1 text-xs font-black uppercase tracking-widest text-[var(--secondary)] border border-[var(--primary)]/30">
            <Stethoscope className="h-3.5 w-3.5 text-[var(--secondary)]" />
            Quy trình đào tạo độc quyền
          </div>
          <h2 className="mt-3 font-heading text-3xl font-black tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl text-balance">
            Chẩn đúng vấn đề - Chữa đúng điểm yếu
          </h2>
          <p className="mt-2 text-sm font-medium leading-relaxed text-[var(--muted)] sm:text-base text-pretty">
            Sơ đồ hành trình bóc tách lỗi sai và tối ưu lộ trình học tập tại Xa Lộ English:
          </p>

          {/* Filter / View Switcher to make presentation dynamic */}
          <div className="mt-6 inline-flex items-center gap-1.5 rounded-[5px] bg-[var(--surface-2)] p-1 border border-[var(--border-strong)]">
            <button
              onClick={() => setActivePhase("all")}
              className={`rounded-[5px] px-4 py-1.5 text-xs font-black transition-all cursor-pointer ${
                activePhase === "all"
                  ? "bg-white text-[var(--foreground)] shadow-sm border border-black/5"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              Toàn bộ quy trình (7 bước)
            </button>
            <button
              onClick={() => setActivePhase("chan")}
              className={`rounded-[5px] px-4 py-1.5 text-xs font-black transition-all cursor-pointer ${
                activePhase === "chan"
                  ? "bg-[var(--secondary)] text-white shadow-sm"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              Giai đoạn CHẨN (1 - 3)
            </button>
            <button
              onClick={() => setActivePhase("chua")}
              className={`rounded-[5px] px-4 py-1.5 text-xs font-black transition-all cursor-pointer ${
                activePhase === "chua"
                  ? "bg-[var(--secondary)] text-white shadow-sm"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              Giai đoạn CHỮA (4 - 7)
            </button>
          </div>
        </div>

        {/* PROCESS FLOW DIAGRAM */}
        <div className="mt-8 space-y-8">
          {/* PHASE 1: CHẨN */}
          {(activePhase === "all" || activePhase === "chan") && (
            <div className="relative">
              {/* Phase Header Line */}
              <div className="flex items-center gap-4 mb-5">
                <div className="flex h-8 w-8 items-center justify-center rounded-[5px] bg-[var(--secondary)] text-white font-black text-xs shadow-sm">
                  01
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading text-base sm:text-lg font-black text-[var(--foreground)] uppercase tracking-wide">
                      Giai đoạn CHẨN
                    </h3>
                    <span className="rounded-[5px] bg-[var(--primary)]/15 px-2 py-0.5 text-[11px] font-bold text-[var(--secondary)]">
                      3 bước chẩn bệnh
                    </span>
                  </div>
                  <p className="text-xs font-medium text-[var(--muted)]">
                    Xác định chính xác nguyên nhân gốc rễ trước khi bắt đầu học
                  </p>
                </div>
                <div className="hidden md:block flex-1 border-t border-dashed border-[var(--secondary)]/30" />
              </div>

              {/* Connected Step Cards with Images */}
              <div className="grid gap-4 md:grid-cols-3">
                {chanSteps.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.step}
                      className="group relative flex flex-col justify-between rounded-[5px] bg-white p-3.5 border border-[var(--border-strong)] hover:border-[var(--secondary)] hover:shadow-md transition-all duration-200"
                    >
                      <div>
                        {/* Step Thumbnail Image */}
                        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[5px] bg-[var(--surface-1)] border border-black/5">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                          {/* Step Number Pill over image */}
                          <div className="absolute top-2 left-2 flex h-6 w-6 items-center justify-center rounded-[5px] bg-[var(--secondary)] text-white text-xs font-black shadow-sm">
                            {item.step}
                          </div>

                          {/* Tag Badge over image */}
                          <div className="absolute top-2 right-2">
                            <span className="inline-flex rounded-[5px] bg-white/95 backdrop-blur-sm border border-black/10 px-2 py-0.5 text-[10px] font-black text-[var(--secondary)] shadow-sm">
                              {item.tag}
                            </span>
                          </div>

                          {/* Icon over image */}
                          <div className="absolute bottom-2 right-2 flex h-6 w-6 items-center justify-center rounded-[5px] bg-white/95 backdrop-blur-sm text-[var(--secondary)] shadow-sm">
                            <Icon className="h-3 w-3" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="mt-3">
                          <h4 className="font-heading text-sm font-black text-[var(--foreground)] group-hover:text-[var(--secondary)] transition-colors text-pretty">
                            {item.title}
                          </h4>
                          <p className="mt-1 text-xs font-medium leading-relaxed text-[var(--muted)] text-pretty line-clamp-2">
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      {/* Bottom connector indicator */}
                      <div className="mt-3.5 pt-2.5 border-t border-black/5 flex items-center justify-between text-[11px] font-bold text-[var(--muted)]">
                        <span>Bước {item.step} / 7</span>
                        {idx < chanSteps.length - 1 ? (
                          <span className="text-[var(--secondary)] group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                            Tiếp theo <ChevronRight className="h-3 w-3" />
                          </span>
                        ) : (
                          <span className="text-[var(--secondary)] font-black">Sang Chữa →</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* PHASE 2: CHỮA */}
          {(activePhase === "all" || activePhase === "chua") && (
            <div className="relative">
              {/* Phase Header Line */}
              <div className="flex items-center gap-4 mb-5">
                <div className="flex h-8 w-8 items-center justify-center rounded-[5px] bg-[var(--primary)] text-white font-black text-xs shadow-sm">
                  02
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading text-base sm:text-lg font-black text-[var(--foreground)] uppercase tracking-wide">
                      Giai đoạn CHỮA
                    </h3>
                    <span className="rounded-[5px] bg-[var(--secondary)]/15 px-2 py-0.5 text-[11px] font-bold text-[var(--secondary)]">
                      4 bước điều trị
                    </span>
                  </div>
                  <p className="text-xs font-medium text-[var(--muted)]">
                    Tập trung sửa đúng điểm yếu qua lộ trình cá nhân hóa
                  </p>
                </div>
                <div className="hidden md:block flex-1 border-t border-dashed border-[var(--primary)]/40" />
              </div>

              {/* Connected Step Cards with Images */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {chuaSteps.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.step}
                      className="group relative flex flex-col justify-between rounded-[5px] bg-white p-3.5 border border-[var(--border-strong)] hover:border-[var(--primary)] hover:shadow-md transition-all duration-200"
                    >
                      <div>
                        {/* Step Thumbnail Image */}
                        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[5px] bg-[var(--surface-1)] border border-black/5">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 25vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                          {/* Step Number Pill over image */}
                          <div className="absolute top-2 left-2 flex h-6 w-6 items-center justify-center rounded-[5px] bg-[var(--primary)] text-white text-xs font-black shadow-sm">
                            {item.step}
                          </div>

                          {/* Tag Badge over image */}
                          <div className="absolute top-2 right-2">
                            <span className="inline-flex rounded-[5px] bg-white/95 backdrop-blur-sm border border-black/10 px-2 py-0.5 text-[10px] font-black text-[var(--secondary)] shadow-sm">
                              {item.tag}
                            </span>
                          </div>

                          {/* Icon over image */}
                          <div className="absolute bottom-2 right-2 flex h-6 w-6 items-center justify-center rounded-[5px] bg-white/95 backdrop-blur-sm text-[var(--secondary)] shadow-sm">
                            <Icon className="h-3 w-3" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="mt-3">
                          <h4 className="font-heading text-sm font-black text-[var(--foreground)] group-hover:text-[var(--secondary)] transition-colors text-pretty">
                            {item.title}
                          </h4>
                          <p className="mt-1 text-xs font-medium leading-relaxed text-[var(--muted)] text-pretty line-clamp-2">
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      {/* Bottom connector indicator */}
                      <div className="mt-3.5 pt-2.5 border-t border-black/5 flex items-center justify-between text-[11px] font-bold text-[var(--muted)]">
                        <span>Bước {item.step} / 7</span>
                        {idx < chuaSteps.length - 1 ? (
                          <span className="text-[var(--primary)] group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                            Tiếp theo <ChevronRight className="h-3 w-3" />
                          </span>
                        ) : (
                          <span className="text-[var(--secondary)] font-black">Về đích ✓</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* OUTCOME / KẾT QUẢ - Sơ đồ dòng chảy tự nhiên */}
        <div className="mt-8 rounded-[5px] bg-[var(--surface-2)] p-5 sm:p-6 border border-[var(--border-strong)] text-center">
          <span className="text-[11px] font-black uppercase tracking-widest text-[var(--secondary)] bg-[var(--primary)]/15 px-3 py-1 rounded-[5px]">
            Kết quả của toàn bộ quy trình
          </span>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 text-xs sm:text-sm font-black text-[var(--foreground)]">
            <div className="rounded-[5px] bg-white border border-[var(--border-strong)] px-3.5 py-2 shadow-sm">
              Biết mình yếu ở đâu
            </div>
            <span className="text-[var(--secondary)] font-black text-lg">→</span>
            <div className="rounded-[5px] bg-white border border-[var(--border-strong)] px-3.5 py-2 shadow-sm">
              Được chữa đúng chỗ
            </div>
            <span className="text-[var(--secondary)] font-black text-lg">→</span>
            <div className="rounded-[5px] bg-[var(--secondary)] text-white px-3.5 py-2 shadow-sm">
              Tiến bộ rõ ràng
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2.5">
            <Link
              href="/#test-dau-vao"
              className="inline-flex h-10 items-center justify-center rounded-[5px] bg-[var(--primary)] px-5 text-xs font-black uppercase tracking-wider text-white transition-all hover:bg-[var(--secondary)] shadow-sm"
            >
              Test để nhận Bảng Chẩn Bệnh
            </Link>
            <Link
              href="/quy-trinh"
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-[5px] bg-white border border-[var(--border-strong)] px-5 text-xs font-black uppercase tracking-wider text-[var(--foreground)] transition-all hover:border-[var(--secondary)] hover:text-[var(--secondary)]"
            >
              Tìm hiểu sâu về Quy trình
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

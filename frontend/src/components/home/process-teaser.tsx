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

        {/* SEAMLESS 2-PHASE CLINICAL TIMELINE (Bố cục 2 Cột Đối Xứng Tinh Tế) */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2 items-stretch">
          {/* PHASE 1: CHẨN (3 BƯỚC KHÁM & CHẨN ĐOÁN) */}
          {(activePhase === "all" || activePhase === "chan") && (
            <div className={`rounded-2xl bg-white p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col justify-between relative overflow-hidden ${activePhase === "chan" ? "lg:col-span-2" : ""}`}>
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[var(--secondary)]" />
              <div>
                {/* Phase Header */}
                <div className="flex items-center justify-between gap-2 border-b border-black/5 pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-[5px] bg-[var(--secondary)] text-xs font-black text-white shadow-sm">
                      01
                    </span>
                    <div>
                      <h3 className="font-heading text-base sm:text-lg font-black text-[var(--foreground)] uppercase tracking-wide">
                        Giai đoạn CHẨN
                      </h3>
                      <p className="text-xs text-[var(--muted)] font-medium">Bóc tách tận gốc nguyên nhân lỗi sai</p>
                    </div>
                  </div>
                  <span className="rounded-[5px] bg-[var(--primary)]/15 px-3 py-1 text-xs font-black uppercase text-[var(--secondary)]">
                    3 Bước đầu
                  </span>
                </div>

                {/* Connected Vertical Timeline Nodes */}
                <div className="mt-6 relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[var(--secondary)]/25">
                  {chanSteps.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.step} className="group relative">
                        {/* Timeline Node Dot */}
                        <div className="absolute -left-6 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white border-2 border-[var(--secondary)] shadow-sm group-hover:scale-110 group-hover:bg-[var(--secondary)] transition-all">
                          <span className="h-1.5 w-1.5 rounded-full bg-[var(--secondary)] group-hover:bg-white" />
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-[var(--secondary)] uppercase tracking-wider">
                              Bước 0{item.step}
                            </span>
                            <span className="rounded-[5px] bg-black/5 px-2 py-0.5 text-[10px] font-bold text-[var(--muted)]">
                              {item.tag}
                            </span>
                          </div>
                          <h4 className="mt-1 font-heading text-sm sm:text-base font-black text-[var(--foreground)] group-hover:text-[var(--secondary)] transition-colors">
                            {item.title}
                          </h4>
                          <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[var(--muted)] font-medium text-pretty">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Transfer Tag to Phase 2 */}
              <div className="mt-6 pt-4 border-t border-black/5 flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-[var(--secondary)] bg-[var(--surface-1)] p-3 rounded-[5px]">
                <span className="flex items-center gap-1.5 font-black">
                  <span>📋</span> Đầu ra: Bảng Chẩn Bệnh (BCB)
                </span>
                <span className="flex items-center gap-1 text-[var(--secondary)] font-black">
                  Chuyển sang Kê đơn RLP ➔
                </span>
              </div>
            </div>
          )}

          {/* PHASE 2: CHỮA (4 BƯỚC ĐIỀU TRỊ ĐẶC TRỊ) */}
          {(activePhase === "all" || activePhase === "chua") && (
            <div className={`rounded-2xl bg-gradient-to-br from-[var(--primary)]/10 via-white to-[var(--secondary)]/15 p-6 sm:p-8 border-2 border-[var(--secondary)]/50 shadow-lg shadow-purple-900/5 flex flex-col justify-between relative overflow-hidden ${activePhase === "chua" ? "lg:col-span-2" : ""}`}>
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--primary)]" />
              <div>
                {/* Phase Header */}
                <div className="flex items-center justify-between gap-2 border-b border-[var(--primary)]/20 pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-[5px] bg-[var(--secondary)] text-xs font-black text-white shadow-sm">
                      02
                    </span>
                    <div>
                      <h3 className="font-heading text-base sm:text-lg font-black text-[var(--foreground)] uppercase tracking-wide">
                        Giai đoạn CHỮA
                      </h3>
                      <p className="text-xs text-[var(--muted)] font-medium">Tập trung điều trị trọng tâm 80/20</p>
                    </div>
                  </div>
                  <span className="rounded-[5px] bg-[var(--secondary)] px-3 py-1 text-xs font-black uppercase text-white shadow-sm">
                    4 Bước điều trị
                  </span>
                </div>

                {/* Connected Vertical Timeline Nodes */}
                <div className="mt-6 relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[var(--secondary)]/35">
                  {chuaSteps.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.step} className="group relative">
                        {/* Timeline Node Dot */}
                        <div className="absolute -left-6 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white border-2 border-[var(--secondary)] shadow-sm group-hover:scale-110 group-hover:bg-[var(--secondary)] transition-all">
                          <span className="h-1.5 w-1.5 rounded-full bg-[var(--secondary)] group-hover:bg-white" />
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-[var(--secondary)] uppercase tracking-wider">
                              Bước 0{item.step}
                            </span>
                            <span className="rounded-[5px] bg-[var(--primary)]/15 px-2 py-0.5 text-[10px] font-bold text-[var(--secondary)]">
                              {item.tag}
                            </span>
                          </div>
                          <h4 className="mt-1 font-heading text-sm sm:text-base font-black text-[var(--foreground)] group-hover:text-[var(--secondary)] transition-colors">
                            {item.title}
                          </h4>
                          <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[var(--muted)] font-medium text-pretty">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Result Tag */}
              <div className="mt-6 pt-4 border-t border-[var(--primary)]/20 flex flex-wrap items-center justify-between gap-2 text-xs font-black text-[var(--secondary)] bg-white/80 p-3 rounded-[5px] border border-[var(--primary)]/20">
                <span>Đích đến: Đạt & Vượt Band mục tiêu</span>
                <span className="flex items-center gap-1 text-[var(--secondary)]">
                  <Zap className="h-3.5 w-3.5 fill-current" /> Tiến bộ thật
                </span>
              </div>
            </div>
          )}
        </div>

        {/* OUTCOME / KẾT QUẢ CỦA QUY TRÌNH - Sơ đồ 3 bước chuyển hóa năng lực */}
        <div className="mt-12 rounded-2xl bg-gradient-to-b from-white to-[var(--surface-2)] p-6 sm:p-8 lg:p-10 border border-[var(--border-strong)] shadow-sm">
          {/* Section Header */}
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-[5px] bg-[var(--primary)]/15 px-3 py-1 text-xs font-black uppercase tracking-widest text-[var(--secondary)] border border-[var(--primary)]/30">
              <Sparkles className="h-3.5 w-3.5 text-[var(--secondary)]" />
              Kết quả của toàn bộ quy trình
            </div>
            <h3 className="mt-3 font-heading text-2xl font-black tracking-tight text-[var(--foreground)] sm:text-3xl text-balance">
              Từ hiểu đúng điểm yếu đến bứt phá điểm số thực tế
            </h3>
            <p className="mt-2 text-xs sm:text-sm font-medium leading-relaxed text-[var(--muted)] text-pretty">
              Quy trình Chẩn - Chữa loại bỏ hoàn toàn việc học lan man, giúp học viên luôn nhìn thấy sự tiến bộ đo lường được:
            </p>
          </div>

          {/* 3-Step Milestone Flow Cards */}
          <div className="mt-8 grid gap-5 md:grid-cols-3 relative">
            {/* Step 1: Chẩn */}
            <div className="group relative flex flex-col justify-between rounded-[5px] bg-white p-5 border border-[var(--border-strong)] shadow-sm hover:border-[var(--secondary)] transition-all duration-300">
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-[5px] bg-[var(--primary)]/10 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-[var(--secondary)]">
                    Giai đoạn 01
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-[5px] bg-[var(--surface-1)] text-[var(--secondary)] border border-black/5">
                    <Search className="h-4 w-4" />
                  </div>
                </div>

                <h4 className="mt-4 font-heading text-lg font-black text-[var(--foreground)] group-hover:text-[var(--secondary)] transition-colors">
                  Biết mình yếu ở đâu
                </h4>

                <p className="mt-2 text-xs font-medium leading-relaxed text-[var(--muted)] text-pretty">
                  Được bóc tách từng lỗi sai ngữ pháp, phát âm và phản xạ qua <span className="font-bold text-[var(--foreground)]">Bảng Chẩn Bệnh (BCB)</span> thay vì đoán mò năng lực.
                </p>
              </div>

              <div className="mt-5 border-t border-black/5 pt-3">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-[var(--secondary)]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[var(--primary)]" />
                  100% minh bạch dữ liệu
                </span>
              </div>

              {/* Desktop Flow Arrow */}
              <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 h-6 w-6 items-center justify-center rounded-full bg-white border border-[var(--border-strong)] shadow-sm text-[var(--secondary)]">
                <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </div>

            {/* Step 2: Chữa */}
            <div className="group relative flex flex-col justify-between rounded-[5px] bg-white p-5 border border-[var(--border-strong)] shadow-sm hover:border-[var(--secondary)] transition-all duration-300">
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-[5px] bg-[var(--secondary)]/10 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-[var(--secondary)]">
                    Giai đoạn 02
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-[5px] bg-[var(--surface-1)] text-[var(--secondary)] border border-black/5">
                    <Target className="h-4 w-4" />
                  </div>
                </div>

                <h4 className="mt-4 font-heading text-lg font-black text-[var(--foreground)] group-hover:text-[var(--secondary)] transition-colors">
                  Được chữa đúng chỗ
                </h4>

                <p className="mt-2 text-xs font-medium leading-relaxed text-[var(--muted)] text-pretty">
                  Học theo <span className="font-bold text-[var(--foreground)]">lộ trình RLP cá nhân</span>, dồn 80% năng lượng giải quyết điểm nghẽn then chốt với giáo viên chuyên môn.
                </p>
              </div>

              <div className="mt-5 border-t border-black/5 pt-3">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-[var(--secondary)]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[var(--primary)]" />
                  Chấm chữa chi tiết 1:1
                </span>
              </div>

              {/* Desktop Flow Arrow */}
              <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 h-6 w-6 items-center justify-center rounded-full bg-white border border-[var(--border-strong)] shadow-sm text-[var(--secondary)]">
                <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </div>

            {/* Step 3: Kết quả */}
            <div className="group relative flex flex-col justify-between rounded-[5px] bg-gradient-to-br from-[var(--secondary)]/5 via-white to-[var(--primary)]/10 p-5 border-2 border-[var(--secondary)]/40 shadow-sm hover:border-[var(--secondary)] transition-all duration-300">
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-[5px] bg-[var(--secondary)] px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-sm">
                    Đích đến 03
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-[5px] bg-[var(--secondary)] text-white shadow-sm">
                    <Zap className="h-4 w-4" />
                  </div>
                </div>

                <h4 className="mt-4 font-heading text-lg font-black text-[var(--secondary)]">
                  Tiến bộ rõ ràng
                </h4>

                <p className="mt-2 text-xs font-medium leading-relaxed text-[var(--foreground)] text-pretty">
                  Đo lường sự thay đổi theo từng tuần, tự tin bước vào kỳ thi và đạt band điểm mục tiêu đúng hạn cam kết.
                </p>
              </div>

              <div className="mt-5 border-t border-[var(--secondary)]/20 pt-3">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-[var(--secondary)]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[var(--secondary)]" />
                  Bứt phá band điểm thật
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 border-t border-black/5">
            <Link
              href="/#test-dau-vao"
              className="inline-flex h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-[5px] bg-[var(--primary)] px-7 text-xs font-black uppercase tracking-wider text-white transition-all hover:bg-[var(--secondary)] shadow-sm"
            >
              <Stethoscope className="h-4 w-4" />
              Test để nhận Bảng Chẩn Bệnh miễn phí
            </Link>
            <Link
              href="/quy-trinh"
              className="inline-flex h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-[5px] bg-white border border-[var(--border-strong)] px-6 text-xs font-black uppercase tracking-wider text-[var(--foreground)] transition-all hover:border-[var(--secondary)] hover:text-[var(--secondary)] shadow-sm"
            >
              Tìm hiểu sâu về Quy trình Chẩn - Chữa
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

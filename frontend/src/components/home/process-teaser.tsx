"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Sparkles, RotateCw } from "lucide-react";

type ProcessStep = {
  step: number;
  title: string;
  titleLines: string[];
  desc: string;
  position: "top" | "bottom";
  x: number;
  y: number;
};

const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Làm bài test đầu vào",
    titleLines: ["Làm bài test", "đầu vào"],
    desc: "Học viên thực hiện bài kiểm tra năng lực ban đầu",
    position: "top",
    x: 100,
    y: 80,
  },
  {
    step: 2,
    title: "Chẩn bệnh",
    titleLines: ["Chẩn bệnh"],
    desc: "Dựa vào bài test để đánh giá. Xác định các vấn đề nền tảng và mức độ hiện tại",
    position: "bottom",
    x: 300,
    y: 300,
  },
  {
    step: 3,
    title: "Xây dựng lộ trình RLP",
    titleLines: ["Xây dựng", "lộ trình RLP"],
    desc: "Thiết lập mục tiêu chặng. Phân bổ kỹ năng. Xác định nội dung học trọng tâm",
    position: "top",
    x: 500,
    y: 80,
  },
  {
    step: 4,
    title: "Dạy và học theo RLP",
    titleLines: ["Dạy và học", "theo RLP"],
    desc: "Giáo viên giảng dạy bám sát lộ trình. Học viên học theo định hướng đã thiết lập.",
    position: "bottom",
    x: 700,
    y: 300,
  },
  {
    step: 5,
    title: "Chẩn bệnh trong suốt quá trình học",
    titleLines: ["Chẩn bệnh trong", "suốt quá trình học"],
    desc: "Giáo viên quan sát, đánh giá liên tục. Phát hiện các lỗi mới hoặc vấn đề chưa được xử lý triệt để.",
    position: "top",
    x: 900,
    y: 80,
  },
  {
    step: 6,
    title: "Cung cấp tài nguyên để chữa triệt vấn đề",
    titleLines: ["Cung cấp tài nguyên", "để chữa triệt vấn đề"],
    desc: "Điều chỉnh phương pháp và nội dung học. Bổ sung tài liệu, bài tập và định hướng tự học. Đảm bảo quỹ đạo RLP.",
    position: "bottom",
    x: 1100,
    y: 300,
  },
];

// Đường cao tốc lượn sóng kéo dài tràn sát mép (bắt đầu từ x = -50 và kết thúc tại x = 1250)
const HIGHWAY_PATH =
  "M -50 220 C 10 220, 35 80, 100 80 C 205 80, 195 300, 300 300 C 405 300, 395 80, 500 80 C 605 80, 595 300, 700 300 C 805 300, 795 80, 900 80 C 1005 80, 995 300, 1100 300 C 1165 300, 1195 190, 1250 190";

export function ProcessTeaserSection() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section className="scroll-mt-24 relative overflow-hidden bg-[#fafafa] py-14 sm:py-20 border-t border-black/5">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)]/15 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[var(--secondary)] border border-[var(--primary)]/30">
            <Sparkles className="h-3.5 w-3.5 text-[var(--secondary)]" />
            Phương pháp đào tạo khoa học
          </div>
          <h2 className="mt-3.5 font-heading text-3xl font-black tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl text-balance">
            Quy trình chẩn - chữa tại Xa Lộ
          </h2>
          <p className="mt-2 text-sm font-medium leading-relaxed text-[var(--muted)] sm:text-base text-pretty">
            Sơ đồ 6 bước khép kín từ xác định chính xác điểm yếu ban đầu đến hỗ trợ giải quyết triệt để vấn đề:
          </p>
        </div>

        {/* Infographic Main Container: 6 BƯỚC QUY TRÌNH "CHẨN - CHỮA" */}
        <div className="mt-10 relative overflow-hidden rounded-3xl bg-white border border-slate-200/80 shadow-xl shadow-purple-950/5">
          {/* Real Background Image: Hall of Xalonists Wall */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            <div
              className="absolute inset-0 bg-cover bg-top opacity-[0.25] scale-105"
              style={{ backgroundImage: "url('/images/hall-of-xalonists.png')" }}
            />
            {/* Soft White Gradient Overlay for high contrast and readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/50 to-white/45 backdrop-blur-[1px]" />
          </div>

          <div className="relative z-10 p-6 sm:p-10 lg:p-12">
            {/* Top Branding & Main Banner Header */}
            <div className="relative flex flex-col items-center justify-center pb-8 border-b border-slate-100">
              {/* Center Infographic Title */}
              <div className="text-center">
                <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#182135]">
                  6 BƯỚC QUY TRÌNH
                </h3>
                <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#182135] mt-1">
                  &ldquo;CHẨN - CHỮA&rdquo;
                </h3>
              </div>
            </div>

            {/* Interactive S-Curve Highway Roadmap */}
            <div className="mt-8 overflow-x-auto no-scrollbar py-4">
              <div className="min-w-[1000px] lg:min-w-0 relative">
                {/* 1. TOP ROW TEXT BLOCKS (Steps 1, 3, 5) - Căn chính xác trục giữa từng cột */}
                <div className="grid grid-cols-6 gap-0 pb-4">
                  {/* Step 1 */}
                  <div
                    onMouseEnter={() => setHoveredStep(1)}
                    onMouseLeave={() => setHoveredStep(null)}
                    className={`col-span-1 text-center px-3 transition-all duration-300 ${
                      hoveredStep === 1 ? "scale-105" : ""
                    }`}
                  >
                    <h4 className="font-heading text-base sm:text-lg font-black text-[#5b49cb] leading-snug">
                      Làm bài test
                      <br />
                      đầu vào
                    </h4>
                    <p className="mt-2 text-xs sm:text-[13px] font-medium leading-relaxed text-[#475569]">
                      Học viên thực hiện bài kiểm tra năng lực ban đầu
                    </p>
                  </div>

                  {/* Empty Column 2 for bottom alignment */}
                  <div className="col-span-1" />

                  {/* Step 3 */}
                  <div
                    onMouseEnter={() => setHoveredStep(3)}
                    onMouseLeave={() => setHoveredStep(null)}
                    className={`col-span-1 text-center px-3 transition-all duration-300 ${
                      hoveredStep === 3 ? "scale-105" : ""
                    }`}
                  >
                    <h4 className="font-heading text-base sm:text-lg font-black text-[#5b49cb] leading-snug">
                      Xây dựng
                      <br />
                      lộ trình RLP
                    </h4>
                    <p className="mt-2 text-xs sm:text-[13px] font-medium leading-relaxed text-[#475569]">
                      Thiết lập mục tiêu chặng. Phân bổ kỹ năng. Xác định nội dung học trọng tâm
                    </p>
                  </div>

                  {/* Empty Column 4 for bottom alignment */}
                  <div className="col-span-1" />

                  {/* Step 5 */}
                  <div
                    onMouseEnter={() => setHoveredStep(5)}
                    onMouseLeave={() => setHoveredStep(null)}
                    className={`col-span-1 text-center px-3 transition-all duration-300 ${
                      hoveredStep === 5 ? "scale-105" : ""
                    }`}
                  >
                    <h4 className="font-heading text-base sm:text-lg font-black text-[#5b49cb] leading-snug">
                      Chẩn bệnh trong
                      <br />
                      suốt quá trình học
                    </h4>
                    <p className="mt-2 text-xs sm:text-[13px] font-medium leading-relaxed text-[#475569]">
                      Giáo viên quan sát, đánh giá liên tục. Phát hiện các lỗi mới hoặc vấn đề chưa được xử lý triệt để.
                    </p>
                  </div>

                  {/* Empty Column 6 for bottom alignment */}
                  <div className="col-span-1" />
                </div>

                {/* 2. S-CURVE WINDING HIGHWAY (TRÀN SÁT MÉP VÀ CĂN CHÍNH XÁC CỘT SỐ) */}
                <div className="relative my-2 h-[340px] sm:h-[380px] w-full">
                  <svg
                    viewBox="0 0 1200 380"
                    preserveAspectRatio="none"
                    className="w-full h-full overflow-visible"
                    fill="none"
                  >
                    {/* Shadow / Outer Ambient Glow of Road */}
                    <path
                      d={HIGHWAY_PATH}
                      stroke="#dcd7fb"
                      strokeWidth="104"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Main Thick Purple Highway Ribbon */}
                    <path
                      d={HIGHWAY_PATH}
                      stroke="#7d6bee"
                      strokeWidth="86"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* White Center Dashed Line */}
                    <path
                      d={HIGHWAY_PATH}
                      stroke="#ffffff"
                      strokeWidth="4.5"
                      strokeDasharray="14 14"
                      strokeLinecap="round"
                    />

                    {/* 6 Circular Numbered Milestone Badges */}
                    {processSteps.map((step) => {
                      const isHovered = hoveredStep === step.step;

                      return (
                        <g
                          key={step.step}
                          className="cursor-pointer transition-transform duration-300"
                          onMouseEnter={() => setHoveredStep(step.step)}
                          onMouseLeave={() => setHoveredStep(null)}
                          style={{
                            transformOrigin: `${step.x}px ${step.y}px`,
                            transform: isHovered ? "scale(1.18)" : "scale(1)",
                          }}
                        >
                          {/* Outer Pink Ring with Drop Shadow */}
                          <circle
                            cx={step.x}
                            cy={step.y}
                            r="38"
                            fill="#fe7794"
                            stroke="#ffffff"
                            strokeWidth="4.5"
                            className="drop-shadow-lg"
                          />

                          {/* Inner Circle */}
                          <circle
                            cx={step.x}
                            cy={step.y}
                            r="27"
                            fill="#ffffff"
                          />

                          {/* Step Number */}
                          <text
                            cx={step.x}
                            cy={step.y}
                            x={step.x}
                            y={step.y}
                            textAnchor="middle"
                            dominantBaseline="central"
                            className="font-heading font-black text-2xl sm:text-3xl select-none"
                            fill="#1e293b"
                          >
                            {step.step}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* 3. BOTTOM ROW TEXT BLOCKS (Steps 2, 4, 6) - Căn chính xác trục giữa từng cột */}
                <div className="grid grid-cols-6 gap-0 pt-4">
                  {/* Empty Column 1 for top alignment */}
                  <div className="col-span-1" />

                  {/* Step 2 */}
                  <div
                    onMouseEnter={() => setHoveredStep(2)}
                    onMouseLeave={() => setHoveredStep(null)}
                    className={`col-span-1 text-center px-3 transition-all duration-300 ${
                      hoveredStep === 2 ? "scale-105" : ""
                    }`}
                  >
                    <h4 className="font-heading text-base sm:text-lg font-black text-[#5b49cb] leading-snug">
                      Chẩn bệnh
                    </h4>
                    <p className="mt-2 text-xs sm:text-[13px] font-medium leading-relaxed text-[#475569]">
                      Dựa vào bài test để đánh giá. Xác định các vấn đề nền tảng và mức độ hiện tại
                    </p>
                  </div>

                  {/* Empty Column 3 for top alignment */}
                  <div className="col-span-1" />

                  {/* Step 4 */}
                  <div
                    onMouseEnter={() => setHoveredStep(4)}
                    onMouseLeave={() => setHoveredStep(null)}
                    className={`col-span-1 text-center px-3 transition-all duration-300 ${
                      hoveredStep === 4 ? "scale-105" : ""
                    }`}
                  >
                    <h4 className="font-heading text-base sm:text-lg font-black text-[#5b49cb] leading-snug">
                      Dạy và học
                      <br />
                      theo RLP
                    </h4>
                    <p className="mt-2 text-xs sm:text-[13px] font-medium leading-relaxed text-[#475569]">
                      Giáo viên giảng dạy bám sát lộ trình. Học viên học theo định hướng đã thiết lập.
                    </p>
                  </div>

                  {/* Empty Column 5 for top alignment */}
                  <div className="col-span-1" />

                  {/* Step 6 */}
                  <div
                    onMouseEnter={() => setHoveredStep(6)}
                    onMouseLeave={() => setHoveredStep(null)}
                    className={`col-span-1 text-center px-3 transition-all duration-300 ${
                      hoveredStep === 6 ? "scale-105" : ""
                    }`}
                  >
                    <h4 className="font-heading text-base sm:text-lg font-black text-[#5b49cb] leading-snug">
                      Cung cấp tài nguyên
                      <br />
                      để chữa triệt vấn đề
                    </h4>
                    <p className="mt-2 text-xs sm:text-[13px] font-medium leading-relaxed text-[#475569]">
                      Điều chỉnh phương pháp và nội dung học. Bổ sung tài liệu, bài tập và định hướng tự học. Đảm bảo quỹ đạo RLP.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Scroll Hint for smaller screens */}
            <div className="mt-6 flex items-center justify-center gap-1.5 lg:hidden text-xs font-bold text-[var(--secondary)]">
              <RotateCw className="h-3.5 w-3.5 animate-spin-slow" />
              <span>Vuốt ngang để xem toàn bộ 6 bước trên sơ đồ</span>
            </div>

            {/* Bottom Interactive Link to /quy-trinh */}
            <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-sm font-black text-[#1e293b]">
                  Khám phá toàn bộ hệ thống Bảng Chẩn Bệnh (BCB) & Lộ trình RLP
                </p>
                <p className="text-xs font-semibold text-[#64748b]">
                  Quy trình độc quyền được bảo chứng qua hơn 1.000+ học viên đạt band mục tiêu
                </p>
              </div>

              <Link
                href="/quy-trinh"
                className="animate-cta-pulse inline-flex min-h-[46px] shrink-0 items-center justify-center gap-2 rounded-2xl bg-[var(--primary)] px-6 py-3 text-xs sm:text-sm font-black uppercase tracking-wider text-white transition-all hover:bg-[var(--secondary)] shadow-md"
              >
                Xem chi tiết quy trình chẩn - chữa
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Award,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  Clock,
  Quote,
  Sparkles,
  X,
  Zap,
} from "lucide-react";

type CaseStudy = {
  id: string;
  studentName: string;
  avatar: string;
  targetRole: string;
  startBand: string;
  endBand: string;
  bandIncrease: string;
  timeframe: string;
  before: string;
  diagnosisBCB: string;
  treatmentRLP: string;
  resultSummary: string;
  quote: string;
  proofBadge: string;
  proofImage: string;
};

const caseStudies: CaseStudy[] = [
  {
    id: "case-1",
    studentName: "Minh Khang",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=70&w=200&h=200",
    targetRole: "Mục tiêu 6.5 xét tốt nghiệp & đi làm",
    startBand: "4.5",
    endBand: "6.5",
    bandIncrease: "+2.0 BAND",
    timeframe: "4.5 tháng (Lộ trình RLP)",
    before: "Tự học làm đề trên mạng gần 1 năm nhưng band dậm chân ở 4.5. Nói ngắc ngứ, Viết sai thì và cấu trúc câu liên tục.",
    diagnosisBCB: "Chẩn ra 2 điểm gãy: Vốn từ vựng bị dịch từng từ (word-by-word) và thiếu kỹ thuật triển khai luận điểm trong Writing Task 2.",
    treatmentRLP: "Tập trung 100% chữa dứt điểm lỗi ngữ pháp cơ bản trong 4 tuần đầu, sau đó rèn cấu trúc viết chuẩn PEEL và phản xạ Speaking 1 kèm 1.",
    resultSummary: "Đạt 6.5 Overall ngay lần thi đầu tiên (Writing tăng từ 4.5 lên 6.0, Speaking tăng từ 4.5 lên 6.5).",
    quote: "Trước mình nghĩ phải cày đề cả ngày mới lên điểm. Đến XLE nhận Bảng Chẩn Bệnh mới biết mình sai ở đâu để chữa đúng chỗ đó, đỡ mất thời gian vô cùng!",
    proofBadge: "Bảng điểm IDP & BCB lưu trữ",
    proofImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=500&h=350",
  },
  {
    id: "case-2",
    studentName: "Ngọc Mai",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=70&w=200&h=200",
    targetRole: "Mục tiêu 7.0 du học thạc sĩ",
    startBand: "5.5",
    endBand: "7.0",
    bandIncrease: "+1.5 BAND",
    timeframe: "3.5 tháng (Lớp nhóm chuyên sâu)",
    before: "Nghe Đọc 7.0 nhưng Nói Viết kẹt cứng ở 5.0. Bận rộn công việc, chỉ học được vào buổi tối.",
    diagnosisBCB: "Điểm nghẽn ở tiêu chí Lexical Resource & Cohesion: Lạm dụng từ vựng đao to búa lớn sai ngữ cảnh và phát âm nuốt âm đuôi.",
    treatmentRLP: "Cắt bỏ toàn bộ từ vựng hoa mỹ không cần thiết, chuẩn hoá Collocations tự nhiên và luyện sửa phát âm trực tiếp từng buổi.",
    resultSummary: "Tăng 1.5 Band output sau 3.5 tháng: Writing 6.5, Speaking 7.0, Overall xuất sắc đạt 7.0.",
    quote: "Giáo viên XLE sửa bài cực kỳ kỹ tính. Từng câu văn của mình đều được bóc tách và giải thích tại sao người bản xứ không dùng như vậy.",
    proofBadge: "Score Report 7.0 chính thức",
    proofImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=500&h=350",
  },
  {
    id: "case-3",
    studentName: "Hải Đăng",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=70&w=200&h=200",
    targetRole: "Mục tiêu 6.0 quy đổi điểm tiếng Anh",
    startBand: "Mất gốc",
    endBand: "6.0",
    bandIncrease: "BỨT PHÁ 6.0",
    timeframe: "5 tháng (Lộ trình Foundation)",
    before: "Sợ tiếng Anh, học trước quên sau, điểm kiểm tra chỉ 3-4 điểm, không dám phát âm vì sợ sai.",
    diagnosisBCB: "Hổng hoàn toàn hệ thống ngữ pháp cốt lõi và phương pháp phát âm ngữ âm (Phonics).",
    treatmentRLP: "Xây lại nền tảng từ âm vị, từ vựng theo chủ đề quen thuộc, tạo phản xạ nói tự tin trước khi ghép vào format thi.",
    resultSummary: "Từ mất gốc bứt phá đạt IELTS 6.0, được quy đổi 10 điểm tiếng Anh trong kỳ thi THPT Quốc gia.",
    quote: "Không khí học rất cởi mở, thầy cô không chỉ trích lỗi sai mà hướng dẫn cách sửa nhẹ nhàng, giúp em tìm lại hứng thú học tiếng Anh.",
    proofBadge: "Bảng điểm quy đổi & Feedback",
    proofImage: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=500&h=350",
  },
];

export function ProofSection() {
  const [selectedCase, setSelectedCase] = useState<string>(caseStudies[0].id);
  const [previewProof, setPreviewProof] = useState<CaseStudy | null>(null);
  const activeCase = caseStudies.find((c) => c.id === selectedCase) ?? caseStudies[0];

  return (
    <section
      id="ket-qua-hoc-vien"
      className="scroll-mt-20 relative overflow-hidden bg-gradient-to-b from-[#f6f6ff] via-white to-[#f7f6fe] py-12 sm:py-16 border-t border-black/5"
    >
      {/* Ambient Light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[320px] bg-gradient-to-b from-[var(--primary)]/20 via-[var(--secondary)]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)]/15 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[var(--secondary)] border border-[var(--primary)]/30 shadow-sm">
            <Award className="h-4 w-4 text-[var(--secondary)]" />
            Minh chứng & Kết quả học thuật
          </div>
          <h2 className="mt-3.5 font-heading text-3xl font-[900] tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl text-balance">
            Học viên bứt phá thế nào khi được{" "}
            <span className="text-[var(--secondary)] underline decoration-[var(--primary)] decoration-3 underline-offset-6">
              chẩn và chữa đúng cách?
            </span>
          </h2>
        </div>

        {/* Student Selector Tabs */}
        <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
          {caseStudies.map((item) => {
            const isActive = item.id === selectedCase;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedCase(item.id)}
                className={`group flex items-center gap-2.5 sm:gap-3 rounded-2xl p-2 pr-3 sm:p-2.5 sm:pr-4 transition-all duration-300 cursor-pointer border ${
                  isActive
                    ? "bg-[var(--secondary)] text-white border-[var(--secondary)] shadow-lg shadow-[var(--secondary)]/25 -translate-y-0.5"
                    : "bg-white text-[var(--foreground)] border-[var(--border-strong)] hover:border-[var(--secondary)]/50 hover:bg-[var(--surface-1)] hover:shadow-sm"
                }`}
              >
                <div className="relative h-8 w-8 sm:h-10 sm:w-10 shrink-0 overflow-hidden rounded-full border border-white/30">
                  <Image
                    src={item.avatar}
                    alt={item.studentName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="text-xs sm:text-sm font-black leading-tight">{item.studentName}</p>
                  <p className={`text-[11px] sm:text-xs font-bold ${isActive ? "text-white/85" : "text-[var(--secondary)]"}`}>
                    {item.startBand} → {item.endBand}
                  </p>
                </div>
                <span
                  className={`ml-0.5 sm:ml-1 rounded-full px-2 py-0.5 text-[10px] font-black uppercase ${
                    isActive
                      ? "bg-white text-[var(--secondary)] shadow-sm"
                      : "bg-[var(--primary)]/15 text-[var(--secondary)]"
                  }`}
                >
                  {item.bandIncrease}
                </span>
              </button>
            );
          })}
        </div>

        {/* Case Study Featured Card (Integrated Seamless Layout) */}
        <div
          key={activeCase.id}
          className="mt-8 rounded-3xl bg-white p-6 sm:p-8 lg:p-10 border-2 border-[var(--primary)]/30 shadow-xl shadow-purple-900/5 animate-in fade-in zoom-in-98 duration-300"
        >
          {/* Header of Active Case */}
          <div className="flex flex-col gap-5 border-b border-black/5 pb-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Student Identity */}
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border-2 border-[var(--primary)] shadow-sm">
                <Image
                  src={activeCase.avatar}
                  alt={activeCase.studentName}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-heading text-xl sm:text-2xl font-black text-[var(--foreground)]">
                    {activeCase.studentName}
                  </h3>
                  <BadgeCheck className="h-5 w-5 text-[var(--primary)] shrink-0" />
                  <span className="rounded-full bg-[var(--primary)]/15 px-2.5 py-0.5 text-xs font-black uppercase text-[var(--secondary)]">
                    Học viên XLE
                  </span>
                </div>
                <p className="mt-1 text-xs sm:text-sm font-bold text-[var(--muted)]">
                  {activeCase.targetRole}
                </p>
              </div>
            </div>

            {/* Score Jump Transformation Box */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[var(--surface-1)] to-[var(--primary)]/10 p-3 px-5 border border-[var(--primary)]/30 shadow-sm">
                <div className="text-center">
                  <p className="text-[11px] font-black uppercase tracking-wider text-[var(--muted)]">Đầu vào</p>
                  <p className="font-heading text-xl font-black text-[var(--muted)]">{activeCase.startBand}</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <span className="rounded-full bg-[var(--secondary)] px-2.5 py-0.5 text-[10px] font-black uppercase text-white shadow-sm">
                    {activeCase.bandIncrease}
                  </span>
                  <span className="text-[var(--secondary)] font-black text-base">➔</span>
                </div>
                <div className="text-center">
                  <p className="text-[11px] font-black uppercase tracking-wider text-[var(--secondary)]">Đầu ra đạt</p>
                  <p className="font-heading text-2xl sm:text-3xl font-[900] text-[var(--secondary)] leading-none">{activeCase.endBand}</p>
                </div>
              </div>

              {/* Timeframe Pill */}
              <div className="flex items-center gap-2 rounded-2xl bg-[var(--surface-1)] px-4 py-3.5 border border-black/5">
                <Clock className="h-4 w-4 text-[var(--secondary)] shrink-0" />
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase tracking-wider text-[var(--muted)]">Thời gian</p>
                  <p className="text-xs sm:text-sm font-black text-[var(--foreground)]">{activeCase.timeframe}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Before vs. After Comparison Grid */}
          <div className="mt-6 grid gap-5 lg:grid-cols-12 items-stretch">
            {/* LEFT: Trước khi được chẩn đoán */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-[#fbfbfe] p-5 sm:p-6 border border-slate-200/90 shadow-sm">
              <div>
                <div className="flex items-center justify-between gap-2 border-b border-black/5 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-200 text-xs font-black text-slate-700">
                      01
                    </span>
                    <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-700">
                      Trước khi chẩn đoán
                    </span>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-0.5 text-xs font-black text-slate-700 border border-slate-200">
                    Band: {activeCase.startBand}
                  </span>
                </div>

                <div className="mt-4">
                  <p className="text-xs font-black uppercase tracking-wider text-slate-500">
                    Thực trạng ban đầu:
                  </p>
                  <p className="mt-1.5 text-xs sm:text-sm font-medium leading-relaxed text-slate-700">
                    {activeCase.before}
                  </p>
                </div>

                <div className="mt-4 rounded-xl bg-slate-100/80 p-3.5 border border-slate-200/80">
                  <p className="text-xs font-black uppercase tracking-wider text-[var(--secondary)]">
                    🔍 Bảng Chẩn Bệnh (BCB) bóc tách:
                  </p>
                  <p className="mt-1.5 text-xs sm:text-sm font-bold leading-relaxed text-[var(--foreground)]">
                    {activeCase.diagnosisBCB}
                  </p>
                </div>
              </div>
            </div>

            {/* CENTER: Cầu nối RLP */}
            <div className="lg:col-span-2 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-[var(--primary)]/15 via-[var(--surface-1)] to-[var(--secondary)]/15 p-5 border border-[var(--primary)]/30 text-center shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--secondary)] text-white shadow-md shadow-[var(--secondary)]/30">
                <Sparkles className="h-5 w-5 animate-pulse" />
              </div>
              <span className="mt-3 rounded-full bg-[var(--secondary)] px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                XLE Đặc Trị
              </span>
              <p className="mt-2.5 text-xs font-bold leading-relaxed text-[var(--foreground)]">
                {activeCase.treatmentRLP}
              </p>
              <div className="mt-3 flex items-center gap-1 text-[var(--secondary)] font-black text-xs">
                <span>Trọng tâm</span>
                <span>➔</span>
              </div>
            </div>

            {/* RIGHT: Sau khi chữa đúng cách */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-gradient-to-br from-[var(--primary)]/10 via-white to-[var(--secondary)]/15 p-5 sm:p-6 border-2 border-[var(--secondary)]/60 shadow-lg shadow-purple-900/5">
              <div>
                <div className="flex items-center justify-between gap-2 border-b border-[var(--primary)]/20 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[var(--secondary)] text-xs font-black text-white shadow-sm">
                      02
                    </span>
                    <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[var(--secondary)]">
                      Sau khi chữa đúng cách
                    </span>
                  </div>
                  <span className="rounded-full bg-[var(--secondary)] px-3 py-0.5 text-xs font-black uppercase text-white shadow-sm">
                    Band {activeCase.endBand} ({activeCase.bandIncrease})
                  </span>
                </div>

                <div className="mt-4">
                  <p className="text-xs font-black uppercase tracking-wider text-[var(--secondary)] flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-[var(--primary)]" />
                    Kết quả thực tế đạt được:
                  </p>
                  <p className="mt-1.5 text-xs sm:text-sm font-black leading-relaxed text-[var(--foreground)]">
                    {activeCase.resultSummary}
                  </p>
                </div>

                <div className="mt-4 rounded-xl bg-white/90 p-3.5 border border-[var(--primary)]/30 shadow-xs">
                  <p className="text-xs font-black uppercase tracking-wider text-[var(--secondary)] flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-[var(--secondary)]" />
                    Thời gian rút ngắn tối đa:
                  </p>
                  <p className="mt-1 text-xs sm:text-sm font-bold text-[var(--foreground)]">
                    Hoàn thành trong <span className="text-[var(--secondary)] font-black">{activeCase.timeframe}</span> theo đúng cam kết lộ trình.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--primary)]/20 text-xs font-black text-[var(--secondary)] flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 fill-current" />
                Vượt band mục tiêu — Tự tin giao tiếp và thi thật
              </div>
            </div>
          </div>

          {/* Feedback Liền Mạch (Seamlessly Integrated Feedback & Proof) */}
          <div className="mt-6 rounded-2xl bg-[var(--surface-2)] p-5 sm:p-6 border border-[var(--border-strong)]">
            <div className="flex flex-col md:flex-row items-center gap-5 justify-between">
              {/* Quote */}
              <div className="flex-1 flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--primary)]/15 text-[var(--secondary)] shadow-xs">
                  <Quote className="h-5 w-5" />
                </div>
                <div>
                  <blockquote className="text-sm font-bold italic leading-relaxed text-[var(--foreground)]">
                    &ldquo;{activeCase.quote}&rdquo;
                  </blockquote>
                  <div className="mt-2 flex items-center gap-2 text-xs font-black text-[var(--secondary)]">
                    <BadgeCheck className="h-4 w-4 text-[var(--primary)]" />
                    <span>{activeCase.proofBadge}</span>
                  </div>
                </div>
              </div>

              {/* Proof Thumbnail Trigger */}
              <div
                onClick={() => setPreviewProof(activeCase)}
                className="w-full md:w-56 shrink-0 group/proof relative aspect-[16/10] overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xs cursor-pointer"
                title="Nhấp để xem chi tiết bằng chứng"
              >
                <Image
                  src={activeCase.proofImage}
                  alt={`Minh chứng ${activeCase.studentName}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 240px"
                  className="object-cover transition-transform duration-500 group-hover/proof:scale-105"
                />
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover/proof:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="rounded-full bg-white/95 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[var(--secondary)] shadow-md">
                    Phóng to minh chứng ↗
                  </span>
                </div>
                <div className="absolute bottom-2 left-2 rounded-lg bg-black/75 backdrop-blur-xs px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white">
                  Bằng chứng xác thực
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA: Xem Thêm Case Study & Bảng Điểm (Dẫn tới Kết Quả Học Viên) */}
        <div className="mt-10 text-center">
          <Link
            href="/#ket-qua-hoc-vien"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[var(--primary)] px-7 py-3 text-xs sm:text-sm font-black uppercase tracking-wider text-white transition-all hover:bg-[var(--secondary)] shadow-md hover:shadow-lg text-center"
          >
            XEM THÊM CASE STUDY & BẢNG ĐIỂM
            <ChevronRight className="h-4 w-4 shrink-0" />
          </Link>
        </div>
      </div>

      {/* Proof Certificate Preview Modal */}
      {previewProof && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setPreviewProof(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-black/10"
          >
            <button
              onClick={() => setPreviewProof(null)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-black/5 pb-3">
              <BadgeCheck className="h-6 w-6 text-[var(--primary)]" />
              <div>
                <h4 className="text-base font-black text-[var(--foreground)]">
                  Bằng chứng thành tích — {previewProof.studentName}
                </h4>
                <p className="text-xs font-bold text-[var(--secondary)]">
                  {previewProof.startBand} → {previewProof.endBand} ({previewProof.bandIncrease}) • {previewProof.timeframe}
                </p>
              </div>
            </div>

            <div className="relative mt-4 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-black/10 bg-slate-50">
              <Image
                src={previewProof.proofImage}
                alt={previewProof.studentName}
                fill
                className="object-cover"
              />
            </div>

            <div className="mt-4 rounded-2xl bg-[var(--surface-1)] p-4 text-xs italic font-medium text-[var(--foreground)]">
              &ldquo;{previewProof.quote}&rdquo;
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

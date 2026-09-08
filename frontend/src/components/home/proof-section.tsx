"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Award,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  Quote,
} from "lucide-react";

type CaseStudy = {
  id: string;
  studentName: string;
  avatar: string;
  targetRole: string;
  startBand: string;
  endBand: string;
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
    targetRole: "Sinh viên ĐH Bách Khoa — Mục tiêu 6.5 nộp hồ sơ tốt nghiệp",
    startBand: "4.5",
    endBand: "6.5",
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
    targetRole: "Nhân viên văn phòng — Cần IELTS 7.0 xin học bổng Thạc sĩ",
    startBand: "5.5",
    endBand: "7.0",
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
    targetRole: "Học sinh THPT — Mất gốc tiếng Anh cần gỡ điểm thi Đại học",
    startBand: "Mất gốc",
    endBand: "6.0",
    timeframe: "5 tháng (Lộ trình Foundation)",
    before: "Sợ tiếng Anh, học trước quên sau, điểm kiểm tra trên lớp chỉ 3-4 điểm, không dám phát âm vì sợ sai.",
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
  const activeCase = caseStudies.find((c) => c.id === selectedCase) ?? caseStudies[0];

  return (
    <section id="ket-qua-hoc-vien" className="scroll-mt-20 bg-[var(--background)] py-10 sm:py-14 border-t border-black/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-[5px] bg-[var(--primary)]/10 px-3.5 py-1 text-xs font-black uppercase tracking-widest text-[var(--secondary)] border border-[var(--primary)]/20">
            <Award className="h-3.5 w-3.5 text-[var(--secondary)]" />
            Kết quả học viên
          </div>
          <h2 className="mt-3 font-heading text-3xl font-black tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl text-balance">
            Học viên bứt phá thế nào khi được <br/> chẩn và chữa đúng cách?
          </h2>
          <p className="mt-2 text-sm font-medium leading-relaxed text-[var(--muted)] sm:text-base text-pretty">
            Khám phá hành trình thực tế: <span className="font-bold text-[var(--foreground)]">Trước khi học → BCB chẩn đoán → XLE tập trung chữa → Kết quả bứt phá.</span>
          </p>
        </div>

        {/* Tab Selection */}
        <div className="mt-7 flex flex-wrap justify-center gap-2.5">
          {caseStudies.map((item) => {
            const isActive = item.id === selectedCase;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedCase(item.id)}
                className={`flex items-center gap-2.5 rounded-[5px] px-5 py-2.5 text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[var(--primary)] text-white shadow-sm"
                    : "bg-white text-[var(--foreground)] border border-[var(--border-strong)] hover:border-[var(--secondary)]/40 hover:bg-[var(--surface-1)]"
                }`}
              >
                <span>{item.studentName}</span>
                <span className={`rounded-[5px] px-2 py-0.5 text-[11px] font-black ${isActive ? "bg-white text-[var(--secondary)]" : "bg-[var(--surface-2)] text-[var(--muted)]"}`}>
                  {item.startBand} → {item.endBand}
                </span>
              </button>
            );
          })}
        </div>

        {/* Case Study Detail Card (Before -> Diagnosis -> Treatment -> Result) */}
        <div className="mt-7 rounded-[5px] bg-white p-5 border border-[var(--border-strong)] shadow-sm sm:p-7 lg:p-8">
          {/* Header of the Active Case */}
          <div className="flex flex-col gap-4 border-b border-black/5 pb-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3.5">
              <div className="relative h-12 w-12 overflow-hidden rounded-[5px] border border-[var(--primary)]/30">
                <Image
                  src={activeCase.avatar}
                  alt={activeCase.studentName}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-[var(--foreground)]">{activeCase.studentName}</h3>
                  <BadgeCheck className="h-4 w-4 text-[var(--primary)]" />
                </div>
                <p className="mt-0.5 text-xs font-semibold text-[var(--muted)]">
                  {activeCase.targetRole}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <div className="rounded-[5px] bg-[var(--surface-1)] px-3.5 py-2 text-center border border-black/5">
                <p className="text-[10px] font-black uppercase tracking-wider text-[var(--muted)]">Tiến bộ Band</p>
                <p className="mt-0.5 text-base font-black text-[var(--secondary)]">
                  {activeCase.startBand} <span className="text-[var(--primary)] font-bold">→</span> {activeCase.endBand}
                </p>
              </div>

              <div className="rounded-[5px] bg-[var(--surface-1)] px-3.5 py-2 text-center border border-black/5">
                <p className="text-[10px] font-black uppercase tracking-wider text-[var(--muted)]">Thời gian học</p>
                <p className="mt-0.5 text-xs font-black text-[var(--foreground)]">{activeCase.timeframe}</p>
              </div>
            </div>
          </div>

          {/* 4-Step Process Breakdown */}
          <div className="mt-5 grid gap-3.5 md:grid-cols-2 lg:grid-cols-4">
            {/* 1. Trước khi học */}
            <div className="rounded-[5px] bg-[var(--surface-1)] p-3.5 border border-black/5">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[var(--muted)]">
                <span className="flex h-4 w-4 items-center justify-center rounded-[5px] bg-black/10 text-[9px]">1</span>
                Trước khi học
              </div>
              <p className="mt-2 text-xs font-medium leading-relaxed text-[var(--foreground)] text-pretty">
                {activeCase.before}
              </p>
            </div>

            {/* 2. BCB chẩn ra gì */}
            <div className="rounded-[5px] bg-[var(--surface-1)] p-3.5 border-l-3 border-l-[var(--secondary)] border border-black/5">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[var(--secondary)]">
                <span className="flex h-4 w-4 items-center justify-center rounded-[5px] bg-[var(--secondary)] text-white text-[9px]">2</span>
                BCB Chẩn ra gì?
              </div>
              <p className="mt-2 text-xs font-medium leading-relaxed text-[var(--foreground)] text-pretty">
                {activeCase.diagnosisBCB}
              </p>
            </div>

            {/* 3. XLE chữa gì */}
            <div className="rounded-[5px] bg-[var(--primary)]/10 p-3.5 border-l-3 border-l-[var(--primary)] border border-[var(--primary)]/20">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[var(--secondary)]">
                <span className="flex h-4 w-4 items-center justify-center rounded-[5px] bg-[var(--primary)] text-white text-[9px]">3</span>
                XLE tập trung chữa gì?
              </div>
              <p className="mt-2 text-xs font-medium leading-relaxed text-[var(--foreground)] text-pretty">
                {activeCase.treatmentRLP}
              </p>
            </div>

            {/* 4. Kết quả sau quá trình */}
            <div className="rounded-[5px] bg-[var(--surface-2)] p-3.5 border-l-3 border-l-[var(--secondary)] border border-[var(--border-strong)]">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[var(--secondary)]">
                <span className="flex h-4 w-4 items-center justify-center rounded-[5px] bg-[var(--secondary)] text-white text-[9px]">4</span>
                Kết quả đạt được
              </div>
              <p className="mt-2 text-xs font-bold leading-relaxed text-[var(--foreground)] text-pretty">
                {activeCase.resultSummary}
              </p>
            </div>
          </div>

          {/* Feedback & Proof Snapshot Block */}
          <div className="mt-5 grid gap-4 lg:grid-cols-12 items-center rounded-[5px] bg-[var(--surface-2)] p-4 sm:p-5 border border-[var(--border-strong)]">
            <div className="lg:col-span-8 flex items-start gap-3">
              <Quote className="h-5 w-5 shrink-0 text-[var(--secondary)] opacity-80" />
              <div>
                <blockquote className="text-xs sm:text-sm font-bold italic leading-relaxed text-[var(--foreground)] text-pretty">
                  “{activeCase.quote}”
                </blockquote>
                <div className="mt-2 flex items-center gap-1.5 text-[11px] font-bold text-[var(--muted)]">
                  <BadgeCheck className="h-3.5 w-3.5 text-[var(--primary)]" />
                  <span>{activeCase.proofBadge}</span>
                </div>
              </div>
            </div>

            {/* Proof Thumbnail Image */}
            <div className="lg:col-span-4 relative aspect-[16/10] w-full overflow-hidden rounded-[5px] border border-black/10 bg-white">
              <Image
                src={activeCase.proofImage}
                alt={`Minh chứng ${activeCase.studentName}`}
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover"
              />
              <div className="absolute bottom-1.5 left-1.5 rounded-[5px] bg-black/60 backdrop-blur-sm px-2 py-0.5 text-[9px] font-black uppercase text-white">
                Bằng chứng xác thực
              </div>
            </div>
          </div>
        </div>

        {/* CTA to View More Cases */}
        <div className="mt-8 text-center">
          <Link
            href="/khoa-hoc"
            className="inline-flex items-center gap-2 rounded-[5px] bg-[var(--primary)] px-6 py-2.5 text-xs font-black uppercase tracking-wider text-white transition-all hover:bg-[var(--secondary)] shadow-sm"
          >
            XEM THÊM CASE STUDY & BẢNG ĐIỂM
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

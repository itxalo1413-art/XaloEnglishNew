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
  },
  {
    id: "case-3",
    studentName: "Hải Đăng",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=70&w=200&h=200",
    targetRole: "Học sinh THPT — Mất gốc tiếng Anh cần gỡ điểm thi Đại học",
    startBand: "Mất gốc",
    endBand: "6.0",
    timeframe: "5 tháng (Lộ trình Foundation)",
    before: "Sợ tiếng Anh, học trước quên sau, điểm kiểm tra trên lớp chỉ 3–4 điểm, không dám phát âm vì sợ sai.",
    diagnosisBCB: "Hổng hoàn toàn hệ thống ngữ pháp cốt lõi và phương pháp phát âm ngữ âm (Phonics).",
    treatmentRLP: "Xây lại nền tảng từ âm vị, từ vựng theo chủ đề quen thuộc, tạo phản xạ nói tự tin trước khi ghép vào format thi.",
    resultSummary: "Từ mất gốc bứt phá đạt IELTS 6.0, được quy đổi 10 điểm tiếng Anh trong kỳ thi THPT Quốc gia.",
    quote: "Không khí học rất cởi mở, thầy cô không chỉ trích lỗi sai mà hướng dẫn cách sửa nhẹ nhàng, giúp em tìm lại hứng thú học tiếng Anh.",
    proofBadge: "Bảng điểm quy đổi & Feedback",
  },
];

export function ProofSection() {
  const [selectedCase, setSelectedCase] = useState<string>(caseStudies[0].id);
  const activeCase = caseStudies.find((c) => c.id === selectedCase) ?? caseStudies[0];

  return (
    <section id="ket-qua-hoc-vien" className="scroll-mt-20 bg-[var(--background)] py-16 sm:py-24 border-t border-black/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)]/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[var(--secondary)] ring-1 ring-[var(--primary)]/25">
            <Award className="h-3.5 w-3.5 text-[var(--secondary)]" />
            Minh chứng & Kết quả thực tế
          </div>
          <h2 className="mt-4 font-heading text-3xl font-black tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl leading-tight">
            Không chỉ khoe band. Cho bạn thấy XLE đã “Chữa” điều gì để tạo ra kết quả đó.
          </h2>
          <p className="mt-4 text-base font-medium leading-relaxed text-[var(--muted)] sm:text-lg">
            Mỗi học viên tại Xa Lộ đều là một hành trình rõ ràng: <span className="font-bold text-[var(--foreground)]">Vấn đề ban đầu → Chẩn ra điểm nghẽn → Kế hoạch Chữa → Tiến bộ đo được.</span>
          </p>
        </div>

        {/* Tab Selection */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {caseStudies.map((item) => {
            const isActive = item.id === selectedCase;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedCase(item.id)}
                className={`flex items-center gap-3 rounded-full px-6 py-3 text-sm font-extrabold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[var(--primary)] text-[var(--on-primary)] shadow-lg shadow-[var(--primary)]/25 scale-105"
                    : "bg-white text-[var(--foreground)] shadow-sm ring-1 ring-black/5 hover:bg-[var(--surface-1)]"
                }`}
              >
                <span>{item.studentName}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-black ${isActive ? "bg-white text-[var(--secondary)]" : "bg-[var(--surface-2)] text-[var(--muted)]"}`}>
                  {item.startBand} → {item.endBand}
                </span>
              </button>
            );
          })}
        </div>

        {/* Case Study Detail Card (Before -> Diagnosis -> Treatment -> Result) */}
        <div className="mt-10 rounded-[2.5rem] bg-white p-6 shadow-xl ring-1 ring-black/5 sm:p-10 lg:p-12">
          {/* Header of the Active Case */}
          <div className="flex flex-col gap-6 border-b border-black/5 pb-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-[var(--primary)]">
                <Image
                  src={activeCase.avatar}
                  alt={activeCase.studentName}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-black text-[var(--foreground)]">{activeCase.studentName}</h3>
                  <BadgeCheck className="h-5 w-5 text-[var(--primary)]" />
                </div>
                <p className="mt-1 text-xs font-semibold text-[var(--muted)] sm:text-sm">
                  {activeCase.targetRole}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="rounded-2xl bg-[var(--surface-2)] px-5 py-3 text-center ring-1 ring-black/5">
                <p className="text-[10px] font-black uppercase tracking-wider text-[var(--muted)]">Tiến bộ Band</p>
                <p className="mt-0.5 text-xl font-black text-[var(--secondary)]">
                  {activeCase.startBand} <span className="text-[var(--primary)] font-bold">→</span> {activeCase.endBand}
                </p>
              </div>

              <div className="rounded-2xl bg-[var(--surface-2)] px-5 py-3 text-center ring-1 ring-black/5">
                <p className="text-[10px] font-black uppercase tracking-wider text-[var(--muted)]">Thời gian học</p>
                <p className="mt-0.5 text-sm font-black text-[var(--foreground)]">{activeCase.timeframe}</p>
              </div>
            </div>
          </div>

          {/* 4-Step Process Breakdown */}
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* 1. Trước khi học */}
            <div className="rounded-2xl bg-[var(--surface-1)] p-5 ring-1 ring-black/5">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[var(--muted)]">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black/10 text-[10px]">1</span>
                Trước khi học
              </div>
              <p className="mt-3 text-sm font-semibold leading-relaxed text-[var(--foreground)] text-pretty">
                {activeCase.before}
              </p>
            </div>

            {/* 2. BCB chẩn ra gì */}
            <div className="rounded-2xl bg-[var(--secondary)]/10 p-5 ring-1 ring-[var(--secondary)]/20 border-l-4 border-[var(--secondary)]">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[var(--secondary)]">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--secondary)] text-white text-[10px]">2</span>
                BCB Chẩn ra gì?
              </div>
              <p className="mt-3 text-sm font-semibold leading-relaxed text-[var(--foreground)] text-pretty">
                {activeCase.diagnosisBCB}
              </p>
            </div>

            {/* 3. XLE chữa gì */}
            <div className="rounded-2xl bg-[var(--primary)]/10 p-5 ring-1 ring-[var(--primary)]/20 border-l-4 border-[var(--primary)]">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[var(--secondary)]">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--primary)] text-white text-[10px]">3</span>
                XLE tập trung chữa gì?
              </div>
              <p className="mt-3 text-sm font-semibold leading-relaxed text-[var(--foreground)] text-pretty">
                {activeCase.treatmentRLP}
              </p>
            </div>

            {/* 4. Kết quả sau quá trình */}
            <div className="rounded-2xl bg-[var(--surface-2)] p-5 ring-1 ring-black/5 border-l-4 border-[var(--secondary)]">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[var(--secondary)]">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--secondary)] text-white text-[10px]">4</span>
                Kết quả đạt được
              </div>
              <p className="mt-3 text-sm font-black leading-relaxed text-[var(--foreground)] text-pretty">
                {activeCase.resultSummary}
              </p>
            </div>
          </div>

          {/* Feedback Quote Block */}
          <div className="mt-8 rounded-2xl bg-[var(--surface-2)] p-6 ring-1 ring-black/5 sm:p-8">
            <div className="flex items-start gap-4">
              <Quote className="h-8 w-8 shrink-0 text-[var(--secondary)] opacity-80" />
              <div>
                <blockquote className="text-base font-bold italic leading-relaxed text-[var(--foreground)] sm:text-lg text-pretty">
                  “{activeCase.quote}”
                </blockquote>
                <div className="mt-3 flex items-center gap-2 text-xs font-bold text-[var(--muted)]">
                  <BadgeCheck className="h-4 w-4 text-[var(--primary)]" />
                  <span>{activeCase.proofBadge}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA to View More Cases */}
        <div className="mt-12 text-center">
          <Link
            href="/khoa-hoc"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-8 py-4 text-xs font-black uppercase tracking-wider text-[var(--on-primary)] shadow-lg shadow-[var(--primary)]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--secondary)] hover:shadow-xl"
          >
            XEM THÊM CASE STUDY & BẢNG ĐIỂM
            <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

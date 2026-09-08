"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Stethoscope, X } from "lucide-react";

type ProofCard = {
  id: string;
  num: string;
  name: string;
  overall: string;
  scores: { listening: string; reading: string; writing: string; speaking: string };
  quote: string;
};

const proofCards: ProofCard[] = [
  {
    id: "thanh-thao",
    num: "#1",
    name: "NGUYỄN THANH THẢO",
    overall: "8.0",
    scores: { listening: "8.5", reading: "8.5", writing: "7.5", speaking: "8.0" },
    quote:
      "Lớp học nhẹ nhàng, cô dạy siêu hay và chữa bài kỹ lắm luôn ạ! Nhờ lộ trình cá nhân hóa của Xa Lộ English mà em đã bứt phá đạt Band 8.0.",
  },
  {
    id: "hien-nga",
    num: "#2",
    name: "TẠ THỊ HIỀN NGA",
    overall: "8.0",
    scores: { listening: "8.5", reading: "8.0", writing: "7.5", speaking: "8.0" },
    quote:
      "Cô dạy siêu kỹ và chi tiết, theo sát từng kỹ năng. Nhờ đó mà em tự tin thi và vượt mục tiêu đạt Band 8.0 ngọt ngào...",
  },
  {
    id: "minh-dung",
    num: "#3",
    name: "HOÀNG LÊ MINH DŨNG",
    overall: "8.0",
    scores: { listening: "9.0", reading: "8.5", writing: "7.0", speaking: "7.5" },
    quote:
      "Môi trường học tập đầy cảm hứng. Quy trình chẩn chữa giúp em nhận ra đúng điểm yếu và cải thiện cực nhanh...",
  },
];

export function Hero() {
  const [selectedStudent, setSelectedStudent] = useState<ProofCard | null>(null);

  return (
    <div className="relative bg-white pb-8 sm:pb-10">
      <section
        id="hero"
        className="relative overflow-visible bg-[var(--surface-2)] text-[var(--foreground)] pt-6 pb-10 sm:pt-10 sm:pb-14"
      >
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Main Hero Header & Headline */}
          <div className="mx-auto max-w-5xl w-full flex flex-col items-center justify-center text-center">
            <h1 className="w-full mt-2 font-heading tracking-tight leading-[1.15] flex flex-col items-center justify-center text-center">
              <span className="w-full text-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-[900] text-[var(--secondary)]">
                Xa Lộ English
              </span>
              <span className="w-full text-center mt-1 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-[900] text-[var(--foreground)] whitespace-nowrap">
                Học đúng cách khi hiểu đúng mình
              </span>
              <span className="w-full text-center mt-3.5 block text-lg sm:text-2xl lg:text-3xl font-black lowercase tracking-normal text-[var(--foreground)]">
                Cùng{" "}
                <span className="relative inline-block px-3 py-0.5 rounded-[5px] bg-[var(--primary)]/20 text-[var(--secondary)] underline decoration-[var(--secondary)] decoration-2 underline-offset-4">
                  Quy trình Chẩn - Chữa
                </span>
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base font-medium leading-relaxed text-[var(--muted)] sm:text-lg text-pretty">
              Xa Lộ English giúp bạn xác định đúng điểm yếu trước khi bắt đầu học, từ đó xây lộ trình tập trung vào những gì bạn thực sự cần cải thiện.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/#test-dau-vao"
                className="group inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-[5px] bg-[var(--primary)] px-7 text-sm font-black uppercase tracking-wider text-[var(--on-primary)] transition-all duration-300 hover:bg-[var(--secondary)]"
              >
                <Stethoscope className="mr-2 h-4 w-4" />
                Test trình độ & nhận Bảng Chẩn Bệnh miễn phí
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/khoa-hoc"
                className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-[5px] border border-[var(--border-strong)] bg-white px-7 text-sm font-extrabold text-[var(--foreground)] transition-all duration-300 hover:bg-[var(--surface-1)] hover:text-[var(--primary)]"
              >
                Xem lộ trình học phù hợp
              </Link>
            </div>
          </div>

          {/* Stats Metrics Table (3 Columns) */}
          <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-white shadow-sm">
            <div className="grid grid-cols-3 divide-x divide-[var(--border-strong)]">
              {/* Stat 1 */}
              <div className="p-4 sm:p-5 text-center">
                <div className="bg-[var(--surface-1)]/70 py-2.5 rounded-[5px]">
                  <p className="font-heading text-2xl font-black text-[var(--foreground)] sm:text-3xl md:text-4xl">
                    98%
                  </p>
                </div>
                <p className="mt-2.5 text-xs font-extrabold text-[var(--foreground)] sm:text-sm md:text-base">
                  Đạt mục tiêu
                </p>
              </div>

              {/* Stat 2 */}
              <div className="p-4 sm:p-5 text-center">
                <div className="bg-[var(--surface-1)]/70 py-2.5 rounded-[5px]">
                  <p className="font-heading text-2xl font-black text-[var(--foreground)] sm:text-3xl md:text-4xl">
                    1000+
                  </p>
                </div>
                <p className="mt-2.5 text-xs font-extrabold text-[var(--foreground)] sm:text-sm md:text-base">
                  Học viên đồng hành
                </p>
              </div>

              {/* Stat 3 */}
              <div className="p-4 sm:p-5 text-center">
                <div className="bg-[var(--surface-1)]/70 py-2.5 rounded-[5px]">
                  <p className="font-heading text-2xl font-black text-[var(--foreground)] sm:text-3xl md:text-4xl">
                    8.0+ IELTS
                  </p>
                </div>
                <p className="mt-2.5 text-xs font-extrabold text-[var(--foreground)] sm:text-sm md:text-base">
                  Giáo viên kinh nghiệm
                </p>
              </div>
            </div>
          </div>

          {/* Proof Section (3 Proof Cards) */}
          <div className="mt-12">
            {/* Purple container holding the 3 proof cards */}
            <div className="rounded-3xl bg-[var(--primary)]/10 p-5 sm:p-7 border border-[var(--primary)]/20 shadow-sm">
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {proofCards.map((card) => (
                  <div
                    key={card.id}
                    className="flex flex-col justify-between rounded-[5px] bg-white p-5 border border-[var(--border-strong)] transition-all duration-200 hover:border-[var(--secondary)]/40 shadow-sm"
                  >
                    <div>
                      {/* Top Header: Index & Overall */}
                      <div className="flex items-start justify-between border-b border-black/5 pb-2.5">
                        <span className="text-xs font-black text-[var(--muted)]">{card.num}</span>
                        <div className="text-right">
                          <span className="block text-[10px] font-black uppercase tracking-wider text-[var(--muted)]">
                            OVERALL
                          </span>
                          <span className="font-heading text-2xl font-black text-[var(--secondary)] leading-none">
                            {card.overall}
                          </span>
                        </div>
                      </div>

                      {/* Candidate Name */}
                      <h3 className="mt-3 font-heading text-base font-black uppercase tracking-tight text-[var(--foreground)]">
                        {card.name}
                      </h3>

                      {/* Certificate Thumbnail + Quote */}
                      <div className="mt-3.5 flex gap-3 items-start">
                        {/* Certificate TRF Mock SVG */}
                        <div className="relative h-28 w-20 shrink-0 overflow-hidden rounded-[5px] border border-[var(--border-strong)] bg-slate-50">
                          <Image
                            src="/proof/ielts-trf-mock.svg"
                            alt="Bảng điểm IELTS"
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Quote */}
                        <p className="text-xs font-medium italic leading-relaxed text-[var(--muted)] line-clamp-5 text-pretty">
                          “{card.quote}”
                        </p>
                      </div>
                    </div>

                    {/* Button CTA */}
                    <div className="mt-5 pt-1">
                      <button
                        type="button"
                        onClick={() => setSelectedStudent(card)}
                        className="flex h-10 w-full items-center justify-center rounded-[5px] bg-[var(--secondary)] px-4 text-xs font-black text-white transition-colors hover:bg-[var(--primary)] cursor-pointer shadow-sm"
                      >
                        Xem chi tiết bảng điểm →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal: Xem chi tiết bảng điểm */}
        {selectedStudent && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setSelectedStudent(null)}
          >
            <div
              className="relative w-full max-w-lg rounded-2xl bg-white p-6 sm:p-7 border border-black/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-[5px] bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-3 border-b border-black/5 pb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-[5px] bg-[var(--secondary)] text-white font-black text-xs">
                  {selectedStudent.num}
                </div>
                <div>
                  <h4 className="text-base font-black uppercase text-[var(--foreground)]">
                    {selectedStudent.name}
                  </h4>
                  <p className="text-xs font-bold text-[var(--secondary)]">
                    IELTS Test Report Form — Overall {selectedStudent.overall}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex gap-5 items-center">
                <div className="relative h-40 w-28 shrink-0 overflow-hidden rounded-[5px] border border-slate-200">
                  <Image
                    src="/proof/ielts-trf-mock.svg"
                    alt="Chứng chỉ IELTS"
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex justify-between border-b pb-1 text-xs">
                    <span className="font-bold text-[var(--muted)]">Listening:</span>
                    <span className="font-black text-[var(--foreground)]">{selectedStudent.scores.listening}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1 text-xs">
                    <span className="font-bold text-[var(--muted)]">Reading:</span>
                    <span className="font-black text-[var(--foreground)]">{selectedStudent.scores.reading}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1 text-xs">
                    <span className="font-bold text-[var(--muted)]">Writing:</span>
                    <span className="font-black text-[var(--foreground)]">{selectedStudent.scores.writing}</span>
                  </div>
                  <div className="flex justify-between border-b pb-1 text-xs">
                    <span className="font-bold text-[var(--muted)]">Speaking:</span>
                    <span className="font-black text-[var(--foreground)]">{selectedStudent.scores.speaking}</span>
                  </div>
                  <div className="flex justify-between pt-1 text-sm">
                    <span className="font-black text-[var(--secondary)]">OVERALL:</span>
                    <span className="font-black text-[var(--secondary)] text-base">{selectedStudent.overall}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-[5px] bg-[var(--surface-1)] p-3.5 text-xs italic text-[var(--foreground)] font-medium leading-relaxed">
                “{selectedStudent.quote}”
              </div>

              <div className="mt-5">
                <Link
                  href="/#test-dau-vao"
                  onClick={() => setSelectedStudent(null)}
                  className="flex h-11 w-full items-center justify-center rounded-[5px] bg-[var(--primary)] text-xs font-black uppercase tracking-wider text-white transition-colors hover:bg-[var(--secondary)] shadow-sm"
                >
                  Đăng ký Test & Lộ trình như học viên này
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

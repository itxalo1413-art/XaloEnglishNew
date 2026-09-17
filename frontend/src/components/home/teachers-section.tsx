"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  ChevronRight,
  HeartHandshake,
  MessageSquare,
  Sparkles,
  X,
  Award,
  BadgeCheck,
} from "lucide-react";

type TeacherProfile = {
  id: string;
  name: string;
  role: string;
  ieltsBand: string;
  specialty: string;
  experience: string;
  desc: string;
  feedbackQuote: string;
  feedbackStudent: string;
  img: string;
  fbLink?: string;
};

const teachers: TeacherProfile[] = [
  {
    id: "thao-trang",
    name: "Cô Thảo Trang",
    role: "Giáo viên Cốt lõi",
    ieltsBand: "8.5 Overall",
    specialty: "Writing & Academic Language",
    experience: "5+ năm luyện thi IELTS chuyên sâu",
    desc: "Chuyên gia bóc tách lỗi tư duy logic và cấu trúc ngữ pháp nâng cao, giúp học viên thoát bẫy dịch word-by-word.",
    feedbackQuote: "Cô chấm bài chi tiết đến từng dấu phẩy, giải thích rõ tại sao không nên dùng từ hoa mỹ sai ngữ cảnh.",
    feedbackStudent: "Thanh Trúc (Band 7.5)",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400",
  },
  {
    id: "huu-vinh",
    name: "Thầy Hữu Vinh",
    role: "Chuyên gia Lộ trình RLP",
    ieltsBand: "8.0 Overall",
    specialty: "Chiến lược tăng band & Reading",
    experience: "4+ năm nghiên cứu rubric Cambridge",
    desc: "Xây dựng chiến lược tăng điểm số theo từng tuần; xử lý triệt để bẫy Matching Heading & True/False/Not Given.",
    feedbackQuote: "Thầy Vinh hướng dẫn cách đọc quét ý chính cực nhanh, mình tăng từ 5.5 lên 7.5 Reading chỉ sau 2 tháng.",
    feedbackStudent: "Minh Dũng (Band 8.0)",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400",
  },
  {
    id: "ngoc-anh",
    name: "Cô Ngọc Anh",
    role: "Giáo viên Nền tảng",
    ieltsBand: "CELTA / 8.0 Overall",
    specialty: "Lấy gốc & Ngữ âm Phonics",
    experience: "4+ năm giảng dạy nền tảng",
    desc: "Đưa phương pháp tiếp cận ngôn ngữ tự nhiên, chữa dứt điểm nỗi sợ tiếng Anh cho người mất gốc hoàn toàn.",
    feedbackQuote: "Cô Ngọc Anh rất kiên nhẫn, tạo cảm giác học nhẹ nhàng và không bao giờ phán xét khi học viên nói sai.",
    feedbackStudent: "Hải Đăng (Mất gốc → 6.0)",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400",
  },
  {
    id: "minh-dat",
    name: "Thầy Minh Đạt",
    role: "Gia tốc Speaking",
    ieltsBand: "8.5 Speaking",
    specialty: "Pronunciation & Fluency 1:1",
    experience: "3+ năm đào tạo phản xạ",
    desc: "Chỉnh phát âm chuẩn ngữ điệu, rèn phản xạ Part 2 & Part 3 tự nhiên, không học vẹt văn mẫu.",
    feedbackQuote: "Học với thầy Đạt như trò chuyện với người bản xứ, thầy sửa từng âm đuôi và nối âm cực kỳ chuẩn.",
    feedbackStudent: "Ngọc Mai (Band 7.0)",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=400",
  },
];

export function TeachersSection() {
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherProfile | null>(null);

  return (
    <section className="bg-white py-12 sm:py-16 border-t border-black/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)]/15 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[var(--secondary)] border border-[var(--primary)]/30">
            <HeartHandshake className="h-4 w-4 text-[var(--secondary)]" />
            Đội ngũ trực tiếp đồng hành
          </div>
          {/* Headline đổi thành: Đội ngũ giáo viên tại Xa Lộ */}
          <h2 className="mt-3.5 font-heading text-3xl font-black tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl text-balance">
            Đội ngũ giáo viên tại Xa Lộ
          </h2>
          <p className="mt-2 text-sm font-medium leading-relaxed text-[var(--muted)] sm:text-base text-pretty">
            100% giáo viên có chứng chỉ chuyên môn cao, trực tiếp chấm chữa và đồng hành theo sát lộ trình của bạn:
          </p>
        </div>

        {/* Compact Teacher Cards Grid (Giảm chiều dài, chỉ hiển thị Band Overall + Chuyên môn nổi bật) */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="group flex flex-col justify-between rounded-3xl bg-[var(--surface-1)] p-4 border-2 border-black/5 hover:border-[var(--secondary)] hover:bg-white hover:shadow-xl transition-all duration-300"
            >
              <div>
                {/* Compact Teacher Image */}
                <div className="relative aspect-[1/1] w-full overflow-hidden rounded-2xl bg-slate-200">
                  <Image
                    src={teacher.img}
                    alt={teacher.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overall Band Pill Badge */}
                  <div className="absolute top-2.5 left-2.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[var(--secondary)] shadow-sm backdrop-blur">
                    {teacher.ieltsBand}
                  </div>
                </div>

                {/* Profile Details: Name & Specialty only */}
                <div className="pt-3.5 pb-2">
                  <h3 className="text-base sm:text-lg font-black text-[var(--foreground)] group-hover:text-[var(--secondary)] transition-colors">
                    {teacher.name}
                  </h3>
                  <p className="mt-1 text-xs font-bold text-[var(--secondary)]">
                    {teacher.specialty}
                  </p>
                </div>
              </div>

              {/* Action Button: Giữ nguyên CTA Xem feedback & profile GV */}
              <div className="pt-2 border-t border-black/5">
                <button
                  type="button"
                  onClick={() => setSelectedTeacher(teacher)}
                  className="flex min-h-[40px] w-full items-center justify-center rounded-2xl bg-white px-3 py-2 text-xs font-black uppercase tracking-wider text-[var(--secondary)] border border-[var(--secondary)]/30 transition-all hover:bg-[var(--secondary)] hover:text-white cursor-pointer shadow-2xs"
                >
                  Xem feedback & profile GV ↗
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA to view all teachers -> Dẫn tới tab Giáo viên của Xa Lộ trong mục Về Xa Lộ */}
        <div className="mt-10 text-center">
          <Link
            href="/ve-xalo#giao-vien"
            className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-2xl bg-[var(--primary)] px-6 py-2.5 text-xs sm:text-sm font-black uppercase tracking-wider text-white transition-all duration-200 hover:bg-[var(--secondary)] shadow-md text-center"
          >
            Xem tất cả giáo viên
            <ChevronRight className="h-4 w-4 shrink-0" />
          </Link>
        </div>
      </div>

      {/* Modal: Popup hiển thị Profile Chi Tiết của Giáo Viên */}
      {selectedTeacher && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedTeacher(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 border border-black/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setSelectedTeacher(null)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Teacher Profile Top */}
            <div className="flex items-center gap-4 border-b border-black/5 pb-4">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 border-[var(--primary)] shadow-sm">
                <Image
                  src={selectedTeacher.img}
                  alt={selectedTeacher.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-lg sm:text-xl font-black text-[var(--foreground)]">
                    {selectedTeacher.name}
                  </h4>
                  <BadgeCheck className="h-5 w-5 text-[var(--primary)] shrink-0" />
                </div>
                <p className="mt-0.5 text-xs font-extrabold text-[var(--secondary)]">
                  {selectedTeacher.ieltsBand} • {selectedTeacher.role}
                </p>
                <p className="mt-0.5 text-[11px] font-semibold text-[var(--muted)]">
                  {selectedTeacher.experience}
                </p>
              </div>
            </div>

            {/* Specialty & Description */}
            <div className="mt-5 space-y-3.5">
              <div className="rounded-2xl bg-[var(--surface-1)] p-4 border border-black/5">
                <span className="text-[10px] font-black uppercase tracking-wider text-[var(--secondary)]">
                  Chuyên môn & Triết lý giảng dạy:
                </span>
                <p className="mt-1 text-xs sm:text-sm font-medium leading-relaxed text-[var(--foreground)]">
                  {selectedTeacher.desc}
                </p>
              </div>

              {/* Feedback Quote */}
              <div className="rounded-2xl bg-[var(--primary)]/10 p-4 border border-[var(--primary)]/30">
                <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[var(--secondary)]">
                  <MessageSquare className="h-3.5 w-3.5 text-[var(--primary)]" />
                  <span>Feedback từ học viên ({selectedTeacher.feedbackStudent}):</span>
                </div>
                <p className="mt-1.5 text-xs sm:text-sm italic font-medium leading-relaxed text-[var(--foreground)]">
                  &ldquo;{selectedTeacher.feedbackQuote}&rdquo;
                </p>
              </div>
            </div>

            {/* Action CTA */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/#test-dau-vao"
                onClick={() => setSelectedTeacher(null)}
                className="flex-1 flex h-12 items-center justify-center rounded-2xl bg-[var(--primary)] text-xs sm:text-sm font-black uppercase tracking-wider text-white transition-colors hover:bg-[var(--secondary)] shadow-md text-center"
              >
                Đăng ký Test & Học cùng giáo viên
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

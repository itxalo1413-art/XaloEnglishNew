"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { HeartHandshake, MessageSquare } from "lucide-react";

type TeacherProfile = {
  name: string;
  role: string;
  ieltsBand: string;
  specialty: string;
  experience: string;
  desc: string;
  feedbackQuote: string;
  img: string;
  fbLink: string;
};

const teachers: TeacherProfile[] = [
  {
    name: "Cô Thảo Trang",
    role: "Giáo viên Cốt lõi",
    ieltsBand: "8.5 Overall",
    specialty: "Writing & Academic Language",
    experience: "5+ năm luyện thi IELTS chuyên sâu",
    desc: "Chuyên gia bóc tách lỗi tư duy logic và cấu trúc ngữ pháp nâng cao, giúp học viên thoát bẫy dịch word-by-word.",
    feedbackQuote: "Cô chấm bài chi tiết đến từng dấu phẩy, giải thích rõ tại sao không nên dùng từ hoa mỹ sai ngữ cảnh.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=70&w=400&h=500",
    fbLink: "https://facebook.com",
  },
  {
    name: "Thầy Hữu Vinh",
    role: "Chuyên gia Lộ trình RLP",
    ieltsBand: "8.0 Overall",
    specialty: "Chiến lược tăng band & Reading",
    experience: "4+ năm nghiên cứu rubric Cambridge",
    desc: "Xây dựng chiến lược tăng điểm số theo từng tuần; xử lý triệt để bẫy Matching Heading & True/False/Not Given.",
    feedbackQuote: "Thầy Vinh hướng dẫn cách đọc quét ý chính cực nhanh, mình tăng từ 5.5 lên 7.5 Reading chỉ sau 2 tháng.",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=70&w=400&h=500",
    fbLink: "https://facebook.com",
  },
  {
    name: "Cô Ngọc Anh",
    role: "Giáo viên Nền tảng",
    ieltsBand: "CELTA Certified / 8.0",
    specialty: "Lấy gốc & Ngữ âm Phonics",
    experience: "4+ năm giảng dạy nền tảng",
    desc: "Đưa phương pháp tiếp cận ngôn ngữ tự nhiên, chữa dứt điểm nỗi sợ tiếng Anh cho người mất gốc hoàn toàn.",
    feedbackQuote: "Cô Ngọc Anh rất kiên nhẫn, tạo cảm giác học nhẹ nhàng và không bao giờ phán xét khi học viên nói sai.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=70&w=400&h=500",
    fbLink: "https://facebook.com",
  },
  {
    name: "Thầy Minh Đạt",
    role: "Gia tốc Speaking",
    ieltsBand: "8.5 Speaking",
    specialty: "Pronunciation & Fluency 1:1",
    experience: "3+ năm đào tạo phản xạ",
    desc: "Chỉnh phát âm chuẩn ngữ điệu, rèn phản xạ Part 2 & Part 3 tự nhiên, không học vẹt văn mẫu.",
    feedbackQuote: "Học với thầy Đạt như trò chuyện với người bản xứ, thầy sửa từng âm đuôi và nối âm cực kỳ chuẩn.",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=70&w=400&h=500",
    fbLink: "https://facebook.com",
  },
];

export function TeachersSection() {
  return (
    <section className="bg-[var(--background)] py-10 sm:py-14 border-t border-black/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-[5px] bg-[var(--primary)]/10 px-3.5 py-1 text-xs font-black uppercase tracking-widest text-[var(--secondary)] border border-[var(--primary)]/20">
            <HeartHandshake className="h-3.5 w-3.5 text-[var(--secondary)]" />
            Đội ngũ trực tiếp đồng hành
          </div>
          <h2 className="mt-3 font-heading text-3xl font-black tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl text-balance">
            Người trực tiếp giúp bạn “Chữa” từng điểm yếu.
          </h2>
          <p className="mt-2 text-sm font-medium leading-relaxed text-[var(--muted)] sm:text-base text-pretty">
            100% giáo viên tại Xa Lộ English có chuyên môn cao, trực tiếp chấm chữa và theo sát lộ trình RLP cá nhân của từng học viên.
          </p>
        </div>

        {/* Teachers Cards Grid */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {teachers.map((teacher) => (
            <div
              key={teacher.name}
              className="group flex flex-col rounded-[5px] bg-white p-3.5 border border-[var(--border-strong)] hover:border-[var(--secondary)] transition-all duration-300 shadow-sm"
            >
              {/* Teacher Image */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[5px] bg-[var(--surface-1)]">
                <Image
                  src={teacher.img}
                  alt={teacher.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2.5 left-2.5 rounded-[5px] bg-white/95 px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider text-[var(--secondary)] shadow-sm backdrop-blur">
                  {teacher.ieltsBand}
                </div>
              </div>

              {/* Profile Details */}
              <div className="flex flex-1 flex-col p-3 pt-4">
                <h3 className="text-lg font-black text-[var(--foreground)]">{teacher.name}</h3>
                <p className="mt-0.5 text-xs font-bold text-[var(--secondary)]">
                  {teacher.specialty}
                </p>
                <p className="mt-0.5 text-xs font-semibold text-[var(--muted)]">
                  • {teacher.experience}
                </p>

                <p className="mt-2 text-xs leading-relaxed text-[var(--muted)] line-clamp-3 text-pretty">
                  {teacher.desc}
                </p>

                {/* Feedback Quote Bubble */}
                <div className="mt-3.5 rounded-[5px] bg-[var(--surface-1)] p-3 border-l-3 border-[var(--primary)] border border-black/5">
                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-[var(--secondary)]">
                    <MessageSquare className="h-3 w-3 text-[var(--primary)]" />
                    Feedback từ học viên:
                  </div>
                  <p className="mt-1 text-xs italic text-[var(--foreground)] font-medium leading-snug text-pretty">
                    “{teacher.feedbackQuote}”
                  </p>
                </div>

                {/* Action CTAs */}
                <div className="mt-auto pt-4 flex flex-col gap-2">
                  <a
                    href={teacher.fbLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-full items-center justify-center rounded-[5px] bg-[var(--surface-1)] text-[11px] font-black uppercase tracking-wider text-[var(--secondary)] border border-[var(--secondary)]/20 transition-all hover:bg-[var(--secondary)] hover:text-white"
                  >
                    Xem Feedback & Profile GV ↗
                  </a>
                  <Link
                    href="/#test-dau-vao"
                    className="flex h-10 w-full items-center justify-center rounded-[5px] bg-[var(--primary)] text-xs font-black uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[var(--secondary)]"
                  >
                    Đăng ký học cùng GV →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

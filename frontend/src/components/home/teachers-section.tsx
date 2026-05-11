"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const teachers = [
  { 
    name: "Cô Thảo Trang", 
    role: "IELTS 8.5", 
    desc: "Giáo viên Cốt Lõi chuyên sửa lấp lỗ hổng tư duy. Dạy đúng trọng tâm.", 
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600&h=800", 
    students: "1.2k"
  },
  { 
    name: "Thầy Hữu Vinh", 
    role: "IELTS 8.0", 
    desc: "Chuyên gia Lộ Trình. Xây dựng chiến lược tăng điểm số theo từng tuần.", 
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600&h=800", 
    students: "850"
  },
  { 
    name: "Cô Ngọc Anh", 
    role: "CELTA", 
    desc: "Giáo viên Nền Tảng. Đưa phương pháp học tự nhiên, lấy lại căn bản.", 
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600&h=800", 
    students: "2.1k"
  },
  { 
    name: "Thầy Minh Đạt", 
    role: "8.5 Speaking", 
    desc: "Gia tốc Speaking & Phản xạ. Sửa phát âm giọng bản xứ chuẩn xác 100%.", 
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600&h=800", 
    students: "920"
  },
  { 
    name: "Thầy Bảo Nguyên", 
    role: "IELTS 8.5", 
    desc: "Giáo viên Advanced chuyên đẩy Target band 7.0+ bằng các kĩ thuật nâng cao.", 
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600&h=800", 
    students: "1.1k"
  },
  { 
    name: "Cô Khánh My", 
    role: "TESOL", 
    desc: "Phân tích sâu lỗi tư duy. Rèn Academic vocab cho học sinh chuyên.", 
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600&h=800", 
    students: "740"
  },
  { 
    name: "Thầy Hoàng Thiên", 
    role: "IELTS 8.0", 
    desc: "Dạy ứng dụng tiếng Anh thực chiến vào học thuật, viết hồ sơ & CV.", 
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600&h=800", 
    students: "1.5k"
  },
  { 
    name: "Cô Thuỷ Tiên", 
    role: "7.5 Writing", 
    desc: "Trợ Giảng tận tâm. Đồng hành sửa lỗi bài tập mỗi ngày vô cùng kỹ lưỡng.", 
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600&h=800", 
    students: "3.2k"
  },
];

function VerifiedBadge() {
  return (
    <svg className="h-5 w-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" d="M8.603 3.799C9.754 2.1 12.246 2.1 13.397 3.799L13.88 4.51c.36.53.948.864 1.583.924l.848.08c2.036.192 3.395 2.062 2.87 4.02l-.22.82c-.156.58-.026 1.203.35 1.688l.519.67c1.281 1.65.65 4.095-1.285 4.957l-.768.343c-.544.243-.966.711-1.156 1.286l-.28 .845c-.655 1.977-2.909 2.73-4.664 1.562l-.696-.464c-.493-.33-1.127-.33-1.62 0l-.696.464c-1.755 1.168-4.01-.415-4.664-1.562l-.28-.845c-.19-.575-.612-1.043-1.156-1.286l-.768-.343C3.47 16.485 2.84 14.04 4.12 12.39l.52-.67c.376-.485.505-1.108.349-1.688l-.22-.82c-.524-1.958.835-3.828 2.87-4.02l.849-.08c.634-.06 1.222-.394 1.582-.924L8.603 3.8zM15.42 9.404a.75.75 0 00-1.248-.808l-3.952 6.1-1.428-1.428a.75.75 0 10-1.06 1.06l2.06 2.06a.75.75 0 001.21-.112l4.418-6.82z" clipRule="evenodd" />
    </svg>
  );
}

function TeacherCard({ teacher }: { teacher: typeof teachers[0] }) {
  return (
    <div className="group relative flex flex-col rounded-[2.5rem] bg-white p-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgb(0,0,0,0.12)]">
      {/* Portait Image Container */}
      <div className="aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-[var(--surface-1)] relative">
        <Image
          src={teacher.img}
          alt={teacher.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 px-5 py-6 sm:px-6">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold tracking-tight text-[var(--foreground)]">{teacher.name}</h3>
            <VerifiedBadge />
          </div>
        </div>
        
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
          {teacher.desc}
        </p>

        <div className="mt-8 flex items-center justify-between border-t border-black/5 pt-5">
          <div className="flex items-center gap-2 text-sm font-bold text-[var(--foreground)]">
            <svg className="h-4 w-4 text-[var(--muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            {teacher.students}
            <span className="text-xs font-semibold text-[var(--muted)] ml-0.5">học viên</span>
          </div>

          <Link
            href="/lien-he"
            className="inline-flex h-10 items-center justify-center rounded-full bg-[var(--surface-1)] px-4 text-sm font-bold text-[var(--foreground)] transition-colors duration-300 hover:bg-[var(--primary)] hover:text-white"
          >
            Theo học +
          </Link>
        </div>
      </div>
    </div>
  );
}

export function TeachersSection() {
  const [showAll, setShowAll] = useState(false);
  const visibleTeachers = showAll ? teachers : teachers.slice(0, 4);

  return (
    <section className="bg-[var(--background)] py-20 sm:py-32 overflow-hidden border-t border-black/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10 text-center">
        <p className="text-sm font-extrabold uppercase tracking-widest text-[var(--accent)] mb-3">
          100% Giảng viên tinh hoa
        </p>
        <h2 className="text-4xl font-black tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
          Đội ngũ tại Xa Lộ English
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-relaxed text-[var(--muted)] sm:text-lg">
          Chúng tôi ưu tiên minh bạch hoàn toàn hồ sơ và chuyên môn của tất cả giáo viên. Hãy chọn người đồng hành phù hợp nhất với phong cách học của bạn!
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-[90rem] px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4 transition-all duration-700 ease-in-out">
          {visibleTeachers.map((teacher, i) => (
            <TeacherCard key={`${teacher.name}-${i}`} teacher={teacher} />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-7xl px-4 text-center">
        {!showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="inline-flex h-14 items-center justify-center rounded-full bg-[var(--primary)] px-8 text-sm font-extrabold uppercase tracking-widest text-[var(--on-primary)] shadow-lg shadow-[var(--primary)]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--primary-hover)] hover:shadow-xl hover:shadow-[var(--primary)]/40 cursor-pointer"
          >
            Xem toàn bộ danh sách
          </button>
        )}
      </div>
    </section>
  );
}

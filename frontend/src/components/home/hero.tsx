"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  ArrowRight,
  Stethoscope,
  X,
  BadgeCheck,
  TrendingUp,
  Sparkles,
  Layers,
  ChevronRight,
  GraduationCap,
} from "lucide-react";

export type StudentJourney = {
  id: string;
  name: string;
  initial?: string;
  avatar: string;
  targetBand: string;
  startBand: string;
  finalBand: string;
  overallGain: string;
  scores: {
    listening: { before: string; after: string; gain: string };
    reading: { before: string; after: string; gain: string };
    writing: { before: string; after: string; gain: string };
    speaking: { before: string; after: string; gain: string };
  };
  duration: string;
  course: string;
  bcbDiagnosis: string;
  rlpTreatment: string;
  quote: string;
};

const proofCards: StudentJourney[] = [
  {
    id: "thanh-truc",
    name: "Văn Thị Thanh Trúc",
    initial: "V",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=240&h=240",
    targetBand: "7.0",
    startBand: "6.5",
    finalBand: "7.5",
    overallGain: "+1.0",
    scores: {
      listening: { before: "6.5", after: "8.0", gain: "+1.5" },
      reading: { before: "7.0", after: "8.0", gain: "+1.0" },
      writing: { before: "6.0", after: "7.0", gain: "+1.0" },
      speaking: { before: "6.0", after: "6.5", gain: "+0.5" },
    },
    duration: "3 tháng",
    course: "Lộ trình RLP Bứt Phá",
    bcbDiagnosis: "Kẹt ở Writing Task 2 do triển khai luận điểm lan man và Listening Part 3 bị bẫy distractors liên tục.",
    rlpTreatment: "Dồn 80% thời gian rèn cấu trúc viết chuẩn PEEL và phương pháp bắt keyword loại trừ bẫy Listening.",
    quote: "Nhờ bảng chẩn bệnh của XLE em mới biết rõ vì sao mình thi 2 lần trước đều kẹt 6.5. Chữa đúng chỗ giúp em đạt 7.5 ngoài mong đợi!",
  },
  {
    id: "thanh-thao",
    name: "Nguyễn Thanh Thảo",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=240&h=240",
    targetBand: "7.5",
    startBand: "6.0",
    finalBand: "8.0",
    overallGain: "+2.0",
    scores: {
      listening: { before: "6.5", after: "8.5", gain: "+2.0" },
      reading: { before: "6.5", after: "8.5", gain: "+2.0" },
      writing: { before: "5.5", after: "7.5", gain: "+2.0" },
      speaking: { before: "5.5", after: "7.5", gain: "+2.0" },
    },
    duration: "4.5 tháng",
    course: "Lộ trình RLP Master",
    bcbDiagnosis: "Ngữ pháp còn lỗi câu ghép phức, phát âm thiếu intonation tự nhiên trong Speaking Part 2 & 3.",
    rlpTreatment: "Giáo viên kèm 1:1 sửa bài Writing từng dòng và luyện phản xạ Speaking theo chủ đề chuyên sâu.",
    quote: "Lớp học nhẹ nhàng, cô dạy siêu hay và chữa bài kỹ lắm luôn ạ! Nhờ lộ trình cá nhân hóa của Xa Lộ English mà em đã bứt phá Band 8.0.",
  },
  {
    id: "hien-nga",
    name: "Tạ Thị Hiền Nga",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=240&h=240",
    targetBand: "7.5",
    startBand: "6.5",
    finalBand: "8.0",
    overallGain: "+1.5",
    scores: {
      listening: { before: "7.0", after: "8.5", gain: "+1.5" },
      reading: { before: "6.5", after: "8.0", gain: "+1.5" },
      writing: { before: "6.5", after: "7.5", gain: "+1.0" },
      speaking: { before: "6.5", after: "8.0", gain: "+1.5" },
    },
    duration: "3.5 tháng",
    course: "Lộ trình RLP Chuyên Sâu",
    bcbDiagnosis: "Đọc bị chậm do dịch thầm trong đầu; Speaking thiếu tính mạch lạc khi mở rộng ý tưởng khó.",
    rlpTreatment: "Huấn luyện kỹ thuật Skimming/Scanning định vị nhanh và mindmap liên kết ý cho Speaking.",
    quote: "Cô dạy siêu kỹ và chi tiết, theo sát từng kỹ năng. Nhờ đó mà em tự tin thi và vượt mục tiêu đạt Band 8.0 ngọt ngào!",
  },
  {
    id: "minh-dung",
    name: "Hoàng Lê Minh Dũng",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=240&h=240",
    targetBand: "7.5",
    startBand: "6.0",
    finalBand: "8.0",
    overallGain: "+2.0",
    scores: {
      listening: { before: "6.5", after: "9.0", gain: "+2.5" },
      reading: { before: "6.5", after: "8.5", gain: "+2.0" },
      writing: { before: "6.0", after: "7.0", gain: "+1.0" },
      speaking: { before: "6.0", after: "7.5", gain: "+1.5" },
    },
    duration: "4 tháng",
    course: "Lộ trình RLP Master",
    bcbDiagnosis: "Thiếu từ vựng học thuật theo chủ đề (Lexical Resource) và hay bỏ lỡ tín hiệu chuyển đoạn trong Listening.",
    rlpTreatment: "Bơm 500 collocations cao cấp và bài tập nghe micro-listening bóc tách âm nối.",
    quote: "Môi trường học tập đầy cảm hứng. Quy trình chẩn chữa giúp em nhận ra đúng điểm yếu và cải thiện cực nhanh!",
  },
  {
    id: "minh-khang",
    name: "Trần Minh Khang",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=240&h=240",
    targetBand: "6.5",
    startBand: "4.5",
    finalBand: "6.5",
    overallGain: "+2.0",
    scores: {
      listening: { before: "4.5", after: "6.5", gain: "+2.0" },
      reading: { before: "5.0", after: "6.5", gain: "+1.5" },
      writing: { before: "4.5", after: "6.0", gain: "+1.5" },
      speaking: { before: "4.5", after: "6.5", gain: "+2.0" },
    },
    duration: "4.5 tháng",
    course: "Lộ trình RLP Nền Tảng Đến Bứt Phá",
    bcbDiagnosis: "Mất nền ngữ pháp cơ bản, từ vựng hạn chế dưới 1500 từ, dịch word-by-word khi nói.",
    rlpTreatment: "Tái thiết lập hệ thống phát âm Phonics, nạp 1.200 từ vựng cốt lõi và luyện phản xạ câu ngắn hàng ngày.",
    quote: "Từ một người mất gốc sợ tiếng Anh, giờ em đã tự tin cầm bằng 6.5 nộp xét tốt nghiệp trước hạn 3 tháng!",
  },
  {
    id: "ngoc-mai",
    name: "Lê Ngọc Mai",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=240&h=240",
    targetBand: "7.0",
    startBand: "5.5",
    finalBand: "7.0",
    overallGain: "+1.5",
    scores: {
      listening: { before: "6.0", after: "7.5", gain: "+1.5" },
      reading: { before: "6.0", after: "7.0", gain: "+1.0" },
      writing: { before: "5.0", after: "6.5", gain: "+1.5" },
      speaking: { before: "5.0", after: "7.0", gain: "+2.0" },
    },
    duration: "3.5 tháng",
    course: "Lộ trình RLP Cấp Tốc",
    bcbDiagnosis: "Lệch kỹ năng trầm trọng: Nghe Đọc khá nhưng Nói Viết kẹt cứng vì thiếu môi trường tương tác 1:1.",
    rlpTreatment: "Chấm chữa bài viết hàng tuần kèm 2 buổi luyện phát âm và ngữ điệu tự nhiên trực tiếp với giáo viên.",
    quote: "Giáo viên XLE chữa từng dấu câu và ngữ điệu giúp mình bứt phá kỹ năng Output vốn là nỗi ám ảnh bấy lâu.",
  },
  {
    id: "hai-dang",
    name: "Đỗ Hải Đăng",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=240&h=240",
    targetBand: "6.0",
    startBand: "Mất gốc",
    finalBand: "6.0",
    overallGain: "BỨT PHÁ",
    scores: {
      listening: { before: "3.0", after: "6.0", gain: "+3.0" },
      reading: { before: "3.5", after: "6.0", gain: "+2.5" },
      writing: { before: "3.5", after: "5.5", gain: "+2.0" },
      speaking: { before: "3.0", after: "6.0", gain: "+3.0" },
    },
    duration: "5 tháng",
    course: "Lộ trình Foundation XLE",
    bcbDiagnosis: "Hổng toàn diện cấu trúc ngữ âm, sợ nói sai và không nghe kịp tốc độ người bản xứ.",
    rlpTreatment: "Lấy lại căn bản từ âm vị chuẩn, bài nghe ngắn phân đoạn và rèn thói quen nói tiếng Anh tự nhiên.",
    quote: "Không thể tin em đã đạt 6.0 từ con số 0. XLE đã thay đổi hoàn toàn tư duy học tiếng Anh của em.",
  },
  {
    id: "quynh-anh",
    name: "Phạm Quỳnh Anh",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=240&h=240",
    targetBand: "6.5",
    startBand: "5.0",
    finalBand: "6.5",
    overallGain: "+1.5",
    scores: {
      listening: { before: "5.0", after: "7.0", gain: "+2.0" },
      reading: { before: "5.5", after: "7.0", gain: "+1.5" },
      writing: { before: "5.0", after: "6.0", gain: "+1.0" },
      speaking: { before: "5.0", after: "6.5", gain: "+1.5" },
    },
    duration: "3 tháng",
    course: "Lộ trình RLP Cấp Tốc",
    bcbDiagnosis: "Cần bằng gấp để nộp học bổng nhưng bị chững band ở Writing Task 1 và phát âm nuốt âm đuôi.",
    rlpTreatment: "Chiến thuật miêu tả biểu đồ chuẩn xác từng dạng và khắc phục triệt để lỗi s, ed, âm cuối.",
    quote: "Khóa học cứu cánh cho deadline gấp của mình. Học đúng trọng tâm giúp tiết kiệm tối đa thời gian.",
  },
  {
    id: "hoang-nam",
    name: "Vũ Hoàng Nam",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=240&h=240",
    targetBand: "7.5",
    startBand: "6.0",
    finalBand: "7.5",
    overallGain: "+1.5",
    scores: {
      listening: { before: "6.5", after: "8.0", gain: "+1.5" },
      reading: { before: "6.5", after: "8.0", gain: "+1.5" },
      writing: { before: "5.5", after: "7.0", gain: "+1.5" },
      speaking: { before: "6.0", after: "7.0", gain: "+1.0" },
    },
    duration: "4 tháng",
    course: "Lộ trình RLP Nâng Cao",
    bcbDiagnosis: "Writing thiếu tính liên kết (Coherence & Cohesion), lạm dụng từ vựng phức tạp sai ngữ cảnh.",
    rlpTreatment: "Huấn luyện mạch văn tự nhiên chuẩn học thuật, loại bỏ từ vựng sáo rỗng.",
    quote: "Sau khi được giáo viên chẩn bệnh, mình mới nhận ra bấy lâu nay mình đã học sai cách như thế nào.",
  },
  {
    id: "phuong-linh",
    name: "Nguyễn Phương Linh",
    avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=240&h=240",
    targetBand: "7.0",
    startBand: "5.5",
    finalBand: "7.0",
    overallGain: "+1.5",
    scores: {
      listening: { before: "6.0", after: "7.5", gain: "+1.5" },
      reading: { before: "6.0", after: "7.0", gain: "+1.0" },
      writing: { before: "5.0", after: "6.5", gain: "+1.5" },
      speaking: { before: "5.5", after: "7.0", gain: "+1.5" },
    },
    duration: "3.5 tháng",
    course: "Lộ trình RLP Bứt Phá",
    bcbDiagnosis: "Nghe phần Map và Multiple Choice hay bị nhầm, Speaking còn ngập ngừng khi gặp chủ đề trừu tượng.",
    rlpTreatment: "Kỹ năng định vị bản đồ và bộ khung 3 bước triển khai ý Speaking Part 3 không bao giờ bí từ.",
    quote: "Cảm ơn thầy cô XLE đã luôn theo sát, chỉ đúng điểm sai và động viên em trong suốt quá trình ôn luyện.",
  },
];

const row1Cards = proofCards.slice(0, 5);
const row2Cards = proofCards.slice(5, 10);

export function Hero() {
  const [selectedStudent, setSelectedStudent] = useState<StudentJourney | null>(null);

  return (
    <>
      {/* 1. HERO SECTION (Chứa Background Image Facebook Cover đến ngang phần Stats 98%) */}
      <section
        id="hero"
        className="relative overflow-hidden bg-[#fafafc] pt-8 pb-12 sm:pt-14 sm:pb-16"
      >
        {/* Background Image: Facebook Cover.jpg (Chỉ phủ trong khu vực Hero) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
          <Image
            src="/images/facebook-cover.jpg"
            alt="Xa Lộ English Cover"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top opacity-35"
          />
          {/* Soft Gradient Overlay for optimal text legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#fafafc]/75 via-[#fafafc]/60 to-[#fafafc]" />
        </div>

        {/* Background Ambience: Rich Purple Gradients & Brand Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[420px] bg-gradient-to-b from-[#e3e1ff]/30 via-[#f0eeff]/10 to-transparent pointer-events-none blur-3xl z-0" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Main Hero Header & Headline đúng theo style ảnh mẫu */}
          <div className="mx-auto max-w-5xl w-full flex flex-col items-center justify-center text-center px-1">
            <h1 className="w-full mt-2 font-heading tracking-tight flex flex-col items-center justify-center text-center">
              <span className="w-full text-center text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] font-[900] text-[#fe7794] tracking-tight leading-[1.15]">
                Học đúng cách khi hiểu đúng mình
              </span>
              <span className="w-full text-center mt-3 sm:mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-2xl sm:text-4xl md:text-5xl font-[900] text-[#fe7794]">
                <span>cùng</span>
                <span className="inline-flex items-center px-4 sm:px-6 py-1.5 sm:py-2 rounded-2xl sm:rounded-3xl bg-[var(--secondary)] text-white text-xl sm:text-3xl md:text-4xl font-[900] uppercase tracking-wide shadow-md">
                  <span className="underline decoration-white decoration-2 sm:decoration-3 underline-offset-4">QUY</span>&nbsp;TRÌNH CHẨN CHỮA
                </span>
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-sm sm:text-base md:text-lg font-black leading-relaxed text-[#111111] text-pretty">
              Xa Lộ English giúp bạn xác định đúng điểm yếu trước khi bắt đầu học, từ đó xây lộ trình tập trung vào những gì bạn thực sự cần cải thiện.
            </p>

            {/* CTAs */}
            <div className="mt-7 flex flex-col items-center justify-center gap-3.5 sm:flex-row w-full max-w-xl mx-auto">
              <Link
                href="/#test-dau-vao"
                className="animate-cta-pulse group inline-flex min-h-[50px] py-3.5 px-6 sm:px-8 w-full sm:w-auto items-center justify-center text-center rounded-2xl bg-[var(--secondary)] text-xs sm:text-sm font-black uppercase tracking-wider text-white transition-all duration-300 hover:bg-[var(--primary)] leading-snug shadow-lg shadow-[var(--secondary)]/30 hover:shadow-xl cursor-pointer"
              >
                <Stethoscope className="mr-2 h-4 w-4 shrink-0" />
                Nhận bảng chẩn bệnh miễn phí
                <ArrowRight className="ml-2 h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/khoa-hoc"
                className="inline-flex min-h-[50px] py-3.5 px-6 sm:px-8 w-full sm:w-auto items-center justify-center text-center rounded-2xl border-2 border-[var(--primary)] bg-white text-xs sm:text-sm font-black text-[#111111] transition-all duration-300 hover:bg-slate-100 hover:border-[var(--secondary)] hover:text-[var(--secondary)] leading-snug shadow-sm"
              >
                Xem lộ trình học phù hợp
              </Link>
            </div>
          </div>

          {/* Stats Metrics Banner (#fe7794 chữ trắng) */}
          <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl sm:rounded-3xl bg-[#fe7794] text-white shadow-xl shadow-[#fe7794]/25">
            <div className="grid grid-cols-3 divide-x divide-white/40 py-5 sm:py-7 px-2 sm:px-4">
              {/* Stat 1 */}
              <div className="p-2 sm:p-4 text-center">
                <p className="font-heading text-3xl sm:text-5xl md:text-6xl font-[900] leading-none text-white tracking-tight">
                  98%
                </p>
                <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base font-black uppercase tracking-wide text-white">
                  ĐẠT MỤC TIÊU
                </p>
              </div>

              {/* Stat 2 */}
              <div className="p-2 sm:p-4 text-center">
                <p className="font-heading text-3xl sm:text-5xl md:text-6xl font-[900] leading-none text-white tracking-tight">
                  1000+
                </p>
                <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base font-black uppercase tracking-wide text-white">
                  HỌC VIÊN
                </p>
              </div>

              {/* Stat 3 */}
              <div className="p-2 sm:p-4 text-center">
                <p className="font-heading text-3xl sm:text-5xl md:text-6xl font-[900] leading-none text-white tracking-tight whitespace-nowrap">
                  8.0 IELTS
                </p>
                <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base font-black uppercase tracking-wide text-white">
                  GIÁO VIÊN KINH NGHIỆM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SOCIAL PROOF SECTION (Phần riêng biệt, nền sạch không dính ảnh Hero) */}
      <section
        id="social-proof"
        className="relative bg-[#fafafc] py-10 sm:py-14 border-t border-black/5 overflow-hidden"
      >
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header Callout & CTA for Carousel */}
          <div className="mx-auto max-w-3xl text-center mb-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)]/15 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-[var(--secondary)] border border-[var(--primary)]/30">
              <BadgeCheck className="h-4 w-4 text-[var(--secondary)]" />
              Minh họa Social Proof
            </div>
            <h3 className="mt-2 text-xl sm:text-2xl font-black text-[var(--foreground)]">
              Bằng chứng bứt phá điểm số thật từ học viên
            </h3>
          </div>

          {/* Dual Row Continuous Rolling Carousel */}
          <div className="space-y-4 overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            {/* Row 1: Cuộn mượt mà liên tục từ phải sang trái */}
            <div className="flex w-max gap-4 animate-marquee hover:[animation-play-state:paused]">
              {[...row1Cards, ...row1Cards].map((card, idx) => (
                <SocialProofCard
                  key={`r1-${card.id}-${idx}`}
                  card={card}
                  onClick={() => setSelectedStudent(card)}
                />
              ))}
            </div>

            {/* Row 2: Cuộn ngược chiều liên tục */}
            <div className="flex w-max gap-4 animate-marquee-reverse hover:[animation-play-state:paused]">
              {[...row2Cards, ...row2Cards].map((card, idx) => (
                <SocialProofCard
                  key={`r2-${card.id}-${idx}`}
                  card={card}
                  onClick={() => setSelectedStudent(card)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Modal: Toàn bộ Hành Trình Học Viên (LMS Data View) */}
        {selectedStudent && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setSelectedStudent(null)}
          >
            <div
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 border border-black/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Student Header Info */}
              <div className="flex items-center gap-4 border-b border-black/5 pb-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border-2 border-[var(--primary)] shadow-sm">
                  <Image
                    src={selectedStudent.avatar}
                    alt={selectedStudent.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg sm:text-xl font-black uppercase text-[var(--foreground)]">
                      {selectedStudent.name}
                    </h4>
                    <span className="rounded-full bg-[var(--primary)]/15 px-2.5 py-0.5 text-xs font-black uppercase text-[var(--secondary)]">
                      LMS Verified
                    </span>
                  </div>
                  <p className="text-xs font-bold text-[var(--secondary)]">
                    {selectedStudent.course} • Thời gian học: {selectedStudent.duration}
                  </p>
                </div>
              </div>

              {/* Score Transformation Card */}
              <div className="mt-5 rounded-2xl bg-gradient-to-r from-[var(--primary)]/10 via-[var(--surface-1)] to-[var(--secondary)]/10 p-4 border border-[var(--primary)]/30">
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <span className="text-[11px] font-black uppercase tracking-wider text-[var(--muted)]">Điểm đầu vào</span>
                    <p className="font-heading text-xl font-black text-slate-700">{selectedStudent.startBand}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="rounded-full bg-[var(--secondary)] px-3 py-0.5 text-xs font-black uppercase text-white shadow-sm">
                      OVERALL {selectedStudent.overallGain}
                    </span>
                    <span className="text-base font-black text-[var(--secondary)]">➔</span>
                  </div>
                  <div className="text-center">
                    <span className="text-[11px] font-black uppercase tracking-wider text-[var(--secondary)]">Đầu ra đạt được</span>
                    <p className="font-heading text-2xl font-[900] text-[var(--secondary)]">{selectedStudent.finalBand}</p>
                  </div>
                </div>

                {/* 4 Skill Score Breakdown */}
                <div className="mt-3 grid grid-cols-4 gap-2 pt-3 border-t border-black/5 text-center">
                  <div className="rounded-xl bg-white p-2 shadow-xs">
                    <span className="text-[10px] font-bold text-[var(--muted)] block">Listening</span>
                    <span className="text-xs font-black text-[var(--foreground)]">{selectedStudent.scores.listening.after}</span>
                    <span className="text-[10px] font-black text-emerald-600 block">({selectedStudent.scores.listening.gain})</span>
                  </div>
                  <div className="rounded-xl bg-white p-2 shadow-xs">
                    <span className="text-[10px] font-bold text-[var(--muted)] block">Reading</span>
                    <span className="text-xs font-black text-[var(--foreground)]">{selectedStudent.scores.reading.after}</span>
                    <span className="text-[10px] font-black text-emerald-600 block">({selectedStudent.scores.reading.gain})</span>
                  </div>
                  <div className="rounded-xl bg-white p-2 shadow-xs">
                    <span className="text-[10px] font-bold text-[var(--muted)] block">Writing</span>
                    <span className="text-xs font-black text-[var(--foreground)]">{selectedStudent.scores.writing.after}</span>
                    <span className="text-[10px] font-black text-emerald-600 block">({selectedStudent.scores.writing.gain})</span>
                  </div>
                  <div className="rounded-xl bg-white p-2 shadow-xs">
                    <span className="text-[10px] font-bold text-[var(--muted)] block">Speaking</span>
                    <span className="text-xs font-black text-[var(--foreground)]">{selectedStudent.scores.speaking.after}</span>
                    <span className="text-[10px] font-black text-emerald-600 block">({selectedStudent.scores.speaking.gain})</span>
                  </div>
                </div>
              </div>

              {/* Chẩn & Chữa Breakdown */}
              <div className="mt-5 space-y-3">
                <div className="rounded-2xl bg-amber-500/10 p-4 border border-amber-500/20">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-800">
                    <span>🩺</span>
                    <span>Bảng Chẩn Bệnh (BCB) bóc tách điểm yếu:</span>
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm font-medium leading-relaxed text-amber-950">
                    {selectedStudent.bcbDiagnosis}
                  </p>
                </div>

                <div className="rounded-2xl bg-[var(--primary)]/15 p-4 border border-[var(--primary)]/30">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[var(--secondary)]">
                    <span>💊</span>
                    <span>Phác đồ Chữa RLP cá nhân hóa:</span>
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm font-semibold leading-relaxed text-[var(--secondary)]">
                    {selectedStudent.rlpTreatment}
                  </p>
                </div>

                <div className="rounded-2xl bg-[var(--surface-1)] p-4 border border-black/5">
                  <p className="text-xs italic font-medium leading-relaxed text-[var(--foreground)]">
                    “{selectedStudent.quote}”
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6">
                <Link
                  href="/#test-dau-vao"
                  onClick={() => setSelectedStudent(null)}
                  className="flex h-12 w-full items-center justify-center rounded-2xl bg-[var(--primary)] text-xs sm:text-sm font-black uppercase tracking-wider text-white transition-colors hover:bg-[var(--secondary)] shadow-md text-center"
                >
                  Đăng ký Test & Lộ trình như học viên này
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

// Thẻ bìa Social Proof (chuẩn phong cách mẫu Trang 3 của Brief)
function SocialProofCard({
  card,
  onClick,
}: {
  card: StudentJourney;
  onClick: () => void;
}) {
  const initialLetter = card.initial || card.name.split(" ").pop()?.[0] || "V";

  return (
    <div
      onClick={onClick}
      className="group relative flex w-[330px] sm:w-[360px] shrink-0 flex-col justify-between rounded-[2.25rem] bg-slate-100 p-4 border-2 border-white shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer overflow-hidden select-none"
    >
      {/* Background Classroom Image with translucent overlay */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=700&h=900"
          alt="Lớp học Xa Lộ English"
          fill
          className="object-cover object-center filter brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-slate-100/55 to-white/95 backdrop-blur-[2px]" />
      </div>

      {/* Top Header Watermark & Quote */}
      <div className="flex items-center justify-between px-1.5">
        <span className="text-3xl sm:text-4xl font-serif font-black text-[#fe7794] leading-none select-none">
          “
        </span>
        <div className="flex items-center gap-1 opacity-80">
          <svg className="h-4 w-4 text-slate-800 fill-current" viewBox="0 0 24 24">
            <path d="M12 2L2 22h20L12 2zm0 5l6.5 13h-13L12 7z" />
          </svg>
          <span className="text-[10px] font-black tracking-widest text-slate-800 uppercase">
            XA LỘ
          </span>
        </div>
      </div>

      {/* 1. Student Info Header Box */}
      <div className="mt-1 rounded-2xl bg-white/95 backdrop-blur-md p-3 sm:p-3.5 shadow-md border border-white/80">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-[#ece9fe] text-[#5548d9] font-black text-xl shadow-xs">
            {initialLetter}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-heading text-sm sm:text-base font-black text-slate-900 truncate">
              {card.name}
            </h4>
            <span className="inline-block mt-0.5 rounded-full bg-[#5b4fe3] px-3 py-0.5 text-[10px] sm:text-[11px] font-black uppercase text-white shadow-xs">
              BỨT PHÁ {card.finalBand} OVERALL
            </span>
          </div>
        </div>
      </div>

      {/* 2. Điểm đầu vào từng kỹ năng Box */}
      <div className="mt-2.5 rounded-2xl bg-white/95 backdrop-blur-md p-3 shadow-md border border-white/80">
        <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
          <div>
            <p className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-slate-400">
              ĐIỂM ĐẦU VÀO TỪNG KỸ NĂNG
            </p>
            <p className="text-xs font-black text-[#fe7794]">
              ĐIỂM ĐẦU VÀO: {card.startBand} Overall
            </p>
          </div>
          <span className="rounded-lg border border-[#5548d9]/30 bg-[#5548d9]/10 px-2 py-0.5 text-[8px] sm:text-[9px] font-black uppercase text-[#5548d9]">
            BCB - BẢNG CHẨN BỆNH
          </span>
        </div>

        <div className="mt-2 grid grid-cols-4 gap-1 text-center">
          <div className="p-0.5">
            <span className="block text-[8px] font-bold text-slate-400 uppercase">Listening</span>
            <span className="text-xs sm:text-sm font-black text-slate-800">{card.scores.listening.before}</span>
          </div>
          <div className="p-0.5">
            <span className="block text-[8px] font-bold text-slate-400 uppercase">Reading</span>
            <span className="text-xs sm:text-sm font-black text-slate-800">{card.scores.reading.before}</span>
          </div>
          <div className="p-0.5">
            <span className="block text-[8px] font-bold text-slate-400 uppercase">Writing</span>
            <span className="text-xs sm:text-sm font-black text-slate-800">{card.scores.writing.before}</span>
          </div>
          <div className="p-0.5">
            <span className="block text-[8px] font-bold text-slate-400 uppercase">Speaking</span>
            <span className="text-xs sm:text-sm font-black text-slate-800">{card.scores.speaking.before}</span>
          </div>
        </div>
      </div>

      {/* 3. Output Table + Overlapping Pinned Sticky Note */}
      <div className="relative mt-2.5">
        {/* White Output Score Table */}
        <div className="w-[60%] rounded-2xl bg-white/95 backdrop-blur-md p-2.5 shadow-md border border-white/80">
          <p className="text-[10px] font-black text-[#fe7794] border-b border-slate-100 pb-1">
            Your full score and explanation
          </p>
          <div className="mt-1 space-y-0.5 text-[11px] font-bold text-slate-700">
            <div className="flex items-center justify-between border-b border-slate-50 pb-0.5">
              <span className="text-[9px] text-slate-500">Listening</span>
              <span className="font-black text-slate-900 text-xs">{card.scores.listening.after}</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-50 pb-0.5">
              <span className="text-[9px] text-slate-500">Reading</span>
              <span className="font-black text-slate-900 text-xs">{card.scores.reading.after}</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-50 pb-0.5">
              <span className="text-[9px] text-slate-500">Writing</span>
              <span className="font-black text-slate-900 text-xs">{card.scores.writing.after}</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-50 pb-0.5">
              <span className="text-[9px] text-slate-500">Speaking</span>
              <span className="font-black text-slate-900 text-xs">{card.scores.speaking.after}</span>
            </div>
            <div className="flex items-center justify-between pt-0.5 text-xs text-[#5548d9]">
              <span className="font-black text-[9px] leading-tight">Overall band</span>
              <span className="font-black text-sm">{card.finalBand}</span>
            </div>
          </div>
        </div>

        {/* Overlapping Tilted Sticky Note with Pushpin */}
        <div className="absolute -right-2 top-0.5 w-[48%] rounded-2xl bg-[#6152e8] p-2.5 pt-3 text-white shadow-xl rotate-[-6deg] z-10 border border-white/30">
          {/* Pushpin at top */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex h-4 w-4 items-center justify-center rounded-full bg-[#ff5277] shadow-md border-2 border-white">
            <div className="h-1 w-1 rounded-full bg-white" />
          </div>

          <p className="text-center font-black text-[11px] uppercase tracking-tight border-b border-white/30 pb-0.5">
            OVERALL: {card.overallGain}
          </p>
          <div className="mt-1 space-y-0.5 text-[9px] sm:text-[10px] font-extrabold text-white/95">
            <p className="flex justify-between">
              <span>Listening:</span> <span>{card.scores.listening.gain}</span>
            </p>
            <p className="flex justify-between">
              <span>Reading:</span> <span>{card.scores.reading.gain}</span>
            </p>
            <p className="flex justify-between">
              <span>Writing:</span> <span>{card.scores.writing.gain}</span>
            </p>
            <p className="flex justify-between">
              <span>Speaking:</span> <span>{card.scores.speaking.gain}</span>
            </p>
          </div>
        </div>
      </div>

      {/* 4. Bottom Branding Header: XA LỘ ENGLISH ĐÃ "CHẨN" - "CHỮA" THẾ NÀO? */}
      <div className="mt-3.5 pt-2.5 text-center border-t border-slate-200/60">
        <h3 className="font-heading text-lg sm:text-xl font-[900] tracking-tight text-[#5548d9] leading-none">
          XA LỘ ENGLISH
        </h3>
        <p className="mt-1 font-heading text-xs sm:text-sm font-[900] tracking-tight text-slate-900 leading-tight">
          ĐÃ <span className="text-[#fe7794]">&ldquo;CHẨN&rdquo;</span> - <span className="text-[#fe7794]">&ldquo;CHỮA&rdquo;</span> THẾ NÀO?
        </p>
        <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-black text-[#5548d9] group-hover:underline">
          Nhấn để xem toàn bộ hành trình LMS →
        </span>
      </div>
    </div>
  );
}

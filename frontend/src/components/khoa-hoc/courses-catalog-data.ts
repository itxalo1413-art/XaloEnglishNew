export type CourseMode = "online" | "offline";

export type CourseCatalogItem = {
  id: string;
  mode: CourseMode;
  title: string;
  note?: string;
  highlights: string[];
};

export type CourseScheduleRow = {
  id: string;
  mode: CourseMode;
  courseTitle: string;
  entry: string;
  target: string;
  classSize: string;
  duration: string;
  audience: string;
};

export const courseCatalog: CourseCatalogItem[] = [
  {
    id: "pre-ielts",
    mode: "online",
    title: "PRE - IELTS",
    highlights: ["Mất gốc → kiến thức nền tảng", "BCB để chẩn, RLP để kê lộ trình", "Theo dõi tiến độ theo từng chặng"],
  },
  {
    id: "pre-core",
    mode: "online",
    title: "PRE - CORE",
    highlights: ["0 - 2.5 → 4.0 - 4.5", "Tăng thời lượng để xây nền vững", "Học đúng thứ tự, tránh học lan man"],
  },
  {
    id: "core",
    mode: "online",
    title: "CORE",
    highlights: ["3.0 - 4.0 → 4.0 - 4.5", "Sửa lỗi nghiêm trọng ở mức cơ bản", "Có checkpoint để thấy tiến bộ"],
  },
  {
    id: "upstream",
    mode: "online",
    title: "UPSTREAM",
    highlights: ["4.5 - 5.5 → 6", "Tăng độ vững ở tình huống phức tạp", "Lộ trình theo mục tiêu và band"],
  },
  {
    id: "soar",
    mode: "online",
    title: "SOAR",
    highlights: ["6.0+ → 7", "Tinh chỉnh lỗi ngữ cảnh, tăng độ tự nhiên", "Bứt tốc bằng lộ trình có kiểm soát"],
  },
  {
    id: "foundation",
    mode: "offline",
    title: "FOUNDATION",
    highlights: ["0 - 4.0 → 4.0 - 4.5", "Lớp nhỏ 10 HV/lớp", "Tập trung sửa lỗi nghiêm trọng ở mức cơ bản"],
  },
  {
    id: "momentum",
    mode: "offline",
    title: "MOMENTUM",
    highlights: ["4.5 - 5.5 → 6", "Có 2 lựa chọn lịch học", "Tăng tốc có kiểm soát theo mục tiêu"],
  },
  {
    id: "advanced",
    mode: "offline",
    title: "ADVANCED",
    highlights: ["6.0+ → 7", "Tinh chỉnh lỗi ngữ cảnh, độ tự nhiên", "Ổn định output trong tình huống phức tạp"],
  },
];

export const courseScheduleRows: CourseScheduleRow[] = [
  {
    id: "pre-ielts",
    mode: "online",
    courseTitle: "PRE - IELTS",
    entry: "Mất gốc",
    target: "Kiến thức nền tảng",
    classSize: "12 học viên/lớp",
    duration: "2 tháng - 8 tuần (48h)\n1 tuần 3 buổi, 2h/1 buổi",
    audience: "Các bạn chưa từng dùng tiếng Anh hoặc chỉ biết một vài từ tiếng Anh riêng lẻ.",
  },
  {
    id: "pre-core",
    mode: "online",
    courseTitle: "PRE - CORE",
    entry: "0 - 2.5",
    target: "4.0 - 4.5",
    classSize: "12 học viên/lớp",
    duration: "4 tháng - 16 tuần (96h)\n1 tuần 3 buổi, 2h/1 buổi",
    audience: "Các bạn cần tăng thời lượng để xây nền vững và chuẩn hóa kỹ năng trước khi vào CORE.",
  },
  {
    id: "core",
    mode: "online",
    courseTitle: "CORE",
    entry: "3.0 - 4.0",
    target: "4.0 - 4.5",
    classSize: "12 học viên/lớp",
    duration: "2 tháng - 8 tuần (48h)\n1 tuần 3 buổi, 2h/1 buổi",
    audience:
      "Các bạn dùng được tiếng Anh ở mức cơ bản, trong nhiều tình huống quen thuộc nhưng còn mắc nhiều lỗi nghiêm trọng.",
  },
  {
    id: "upstream",
    mode: "online",
    courseTitle: "UPSTREAM",
    entry: "4.5 - 5.5",
    target: "6",
    classSize: "12 học viên/lớp",
    duration:
      "3 tháng - 12 tuần (63h)\n1 tuần 3 buổi, 1h45p/1 buổi\nHOẶC\n3 tháng 1 tuần - 13 tuần (63h)\n1 tuần 2 buổi, 2h30p/1 buổi",
    audience:
      "Các bạn sử dụng được tiếng Anh ở mức trung bình - khá, trong nhiều tình huống (bao gồm cả phức tạp) nhưng còn mắc nhiều lỗi không nghiêm trọng.",
  },
  {
    id: "soar",
    mode: "online",
    courseTitle: "SOAR",
    entry: "6.0+",
    target: "7",
    classSize: "12 học viên/lớp",
    duration:
      "3 tháng - 12 tuần (63h)\n1 tuần 3 buổi, 1h45p/1 buổi\nHOẶC\n3 tháng 1 tuần - 13 tuần (63h)\n1 tuần 2 buổi, 2h30p/1 buổi",
    audience:
      "Các bạn dùng tiếng Anh ở mức khá và tốt. Dùng được trong nhiều tình huống, từ đơn giản đến phức tạp nhưng đôi khi hiểu nhầm hoặc mắc lỗi ngữ cảnh, không tự nhiên.",
  },
  {
    id: "foundation",
    mode: "offline",
    courseTitle: "FOUNDATION",
    entry: "0 - 4.0",
    target: "4.0 - 4.5",
    classSize: "10 học viên/lớp",
    duration: "3,5 tháng - 14 tuần (73.5h)\n1 tuần 3 buổi, 1h45p/1 buổi",
    audience:
      "Các bạn dùng được tiếng Anh ở mức cơ bản, trong nhiều tình huống quen thuộc nhưng còn mắc nhiều lỗi nghiêm trọng.",
  },
  {
    id: "momentum",
    mode: "offline",
    courseTitle: "MOMENTUM",
    entry: "4.5 - 5.5",
    target: "6",
    classSize: "10 học viên/lớp",
    duration:
      "3 tháng - 12 tuần (63h)\n1 tuần 3 buổi, 1h45p/1 buổi\nHOẶC\n3 tháng 1 tuần - 13 tuần (63h)\n1 tuần 2 buổi, 2h30p/1 buổi",
    audience:
      "Các bạn sử dụng được tiếng Anh ở mức trung bình - khá, trong nhiều tình huống (bao gồm cả phức tạp) nhưng còn mắc nhiều lỗi không nghiêm trọng.",
  },
  {
    id: "advanced",
    mode: "offline",
    courseTitle: "ADVANCED",
    entry: "6.0+",
    target: "7",
    classSize: "10 học viên/lớp",
    duration:
      "3 tháng - 12 tuần (63h)\n1 tuần 3 buổi, 1h45p/1 buổi\nHOẶC\n3 tháng 1 tuần - 13 tuần (63h)\n1 tuần 2 buổi, 2h30p/1 buổi",
    audience:
      "Các bạn dùng tiếng Anh ở mức khá và tốt. Dùng được trong nhiều tình huống, từ đơn giản đến phức tạp nhưng đôi khi hiểu nhầm hoặc mắc lỗi ngữ cảnh, không tự nhiên.",
  },
];

export type ComboProgramRow = {
  id: string;
  combo: "Combo 2 khoá" | "Combo 3 khoá";
  entry: string;
  target: string;
  minTime: string;
};

export const comboProgramRows: ComboProgramRow[] = [
  { id: "c2-0-2.5-6", combo: "Combo 2 khoá", entry: "0-2.5", target: "6", minTime: "Tối thiểu 7 tháng" },
  { id: "c2-3-4-6", combo: "Combo 2 khoá", entry: "3.0-4.0", target: "6", minTime: "Tối thiểu 6,5 tháng" },
  { id: "c2-4.5-5.5-7", combo: "Combo 2 khoá", entry: "4.5-5.5", target: "7", minTime: "Tối thiểu 6 tháng" },
  { id: "c3-0-2.5-7", combo: "Combo 3 khoá", entry: "0-2.5", target: "7", minTime: "Tối thiểu 10 tháng" },
  { id: "c3-3-4-7", combo: "Combo 3 khoá", entry: "3.0-4.0", target: "7", minTime: "Tối thiểu 9,5 tháng" },
];

export type OneToOnePricingRow = {
  id: string;
  mode: "ONLINE" | "OFFLINE";
  durationBandGE4: string; // formatted multiline
};

export const oneToOnePricingRows: OneToOnePricingRow[] = [
  {
    id: "1-1-online-before-18",
    mode: "ONLINE",
    durationBandGE4:
      "36h/khóa:\n- Học 2 buổi/tuần, 2h/buổi ⇒ 9 tuần (≈ 2 - 2.5 tháng)\n- Học 3 buổi/tuần, 2h/buổi ⇒ 6 tuần (1.5 tháng)",
  },
  { id: "1-1-offline", mode: "OFFLINE", durationBandGE4: "" },
];

export type ExamPracticeInfo = {
  title: string;
  modeLabel: string;
  entry: string;
  skillBlocks: { name: string; goal: string }[];
  time: string;
};

export const examPractice: ExamPracticeInfo = {
  title: "LUYỆN ĐỀ",
  modeLabel: "ONLINE (Lớp nhóm IELTS)",
  entry: "Phù hợp cho band 4.5+",
  skillBlocks: [
    {
      name: "Listening + Reading + Writing (Chủ yếu Writing)",
      goal: "Các bạn sắp thi, cần luyện đề IELTS thực chiến và chuyên sâu, tối ưu chiến thuật và nâng band trong thời gian ngắn.",
    },
    { name: "Luyện Speaking theo bộ đề", goal: "Tập trung phản xạ và chiến thuật theo bộ đề, tối ưu điểm trong thời gian ngắn." },
  ],
  time: "19h45 - 21h45",
};


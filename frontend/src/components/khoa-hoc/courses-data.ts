export type CourseTeacher = {
  title: string;
  name: string;
  highlights: string[];
};

export type Course = {
  slug: string;
  title: string;
  audienceTag: string;
  shortDesc: string;

  pain: string[];
  solution: string[];

  method: {
    chuan: string;
    ke: string;
    chua: string;
  };

  outcome: string[];
  proof: string[];
  teacher: CourseTeacher;

  comparison: {
    diagnostic: string;
    schedule: string;
    feedback: string;
    focus: string;
  };

  matchTags: string[];
};

export const courses: Course[] = [
  {
    slug: "ielts-foundation",
    title: "IELTS Foundation → Target Band",
    audienceTag: "Sinh viên",
    shortDesc: "Nền tảng chắc, chia band mục tiêu — đi từ lỗi thật tới tiến bộ đo được.",
    pain: [
      "Mất gốc một phần kỹ năng (nghe/đọc/viết) nhưng không biết ưu tiên sửa gì.",
      "Học lâu nhưng band không lên rõ ràng vì thiếu lộ trình theo dữ liệu.",
      "Dễ học lan man, không có mốc kiểm tra giữa kỳ.",
    ],
    solution: [
      "Chẩn đoán điểm yếu theo từng nhóm kỹ năng và định vị “lỗ hổng” cốt lõi.",
      "Kê lộ trình theo mục tiêu band — ưu tiên thứ tự sửa để tạo đà nhanh.",
      "Chữa tập trung đúng lỗi, kèm đánh giá lại theo mốc.",
    ],
    method: {
      chuan: "Test đầu vào + phân tích kỹ năng theo cấu trúc bài thi.",
      ke: "Lộ trình cá nhân theo band mục tiêu, có thứ tự ưu tiên lỗi cần chữa.",
      chua: "Bài tập cá nhân hoá theo lỗi; theo dõi tiến độ qua báo cáo ngắn.",
    },
    outcome: [
      "Nắm được “điểm gãy” của bản thân và biết cách sửa theo đúng mục tiêu.",
      "Tiến bộ có mốc rõ ràng (giữa kỳ/cuối giai đoạn) để dễ duy trì động lực.",
      "Học đúng thứ cần học — giảm thời gian “học lại từ đầu”.",
    ],
    proof: [
      "Case mẫu: IELTS Overall 4.0 → 6.5 sau X tháng (minh hoạ).",
      "Phản hồi tập trung vào việc hiểu rõ mình đang sửa lỗi gì mỗi buổi.",
    ],
    teacher: {
      title: "Giáo viên IELTS",
      name: "Giáo viên chuyên luyện theo dữ liệu",
      highlights: [
        "Theo sát tiến độ và phản hồi sau buổi học",
        "Chẩn đúng lỗi cốt lõi để tăng hiệu quả",
        "Thiết kế bài chữa phù hợp từng mức xuất phát",
      ],
    },
    comparison: {
      diagnostic: "Test kỹ năng + phân tích cấu trúc lỗi",
      schedule: "Lộ trình theo band mục tiêu, có thứ tự ưu tiên",
      feedback: "Báo cáo ngắn theo mốc",
      focus: "Nghe/đọc/viết theo lỗi thật",
    },
    matchTags: ["lost-base", "no-system", "missing-priority"],
  },
  {
    slug: "thpt-foundation",
    title: "Tiếng Anh THPT — Chắc nền, tự tin điểm số",
    audienceTag: "Học sinh",
    shortDesc: "Bám năng lực thi; chẩn đoán phần yếu để ôn đúng trọng tâm, tránh lãng phí thời gian.",
    pain: [
      "Điểm số phụ thuộc may rủi vì nền tảng chưa chắc.",
      "Sai ngữ pháp/từ vựng khiến đọc hiểu bị “kẹt”.",
      "Không biết phần nào cần ưu tiên trước nên học mãi không lên.",
    ],
    solution: [
      "Chẩn đoán đúng nhóm lỗi (ngữ pháp, từ vựng, đọc hiểu).",
      "Kê lộ trình theo năng lực thi và mức độ cần củng cố.",
      "Chữa theo lỗi thật, đo tiến bộ theo giai đoạn.",
    ],
    method: {
      chuan: "Bài test ngắn + phân tích điểm yếu theo đề/chuẩn thi.",
      ke: "Chọn trọng tâm theo “lỗi cốt lõi” để tạo đà điểm số.",
      chua: "Bài chữa bám lỗi; đánh giá lại sau từng giai đoạn.",
    },
    outcome: [
      "Tự tin hơn khi làm bài vì hiểu đúng chỗ sai.",
      "Nền tảng vững lên theo mốc có đo lường.",
      "Ít học lại từ đầu, tối ưu thời gian ôn.",
    ],
    proof: [
      "Phản hồi kiểu: “Biết mình đang yếu ở đâu nên học nhanh hơn”.",
      "Báo cáo tiến độ ngắn gọn, dễ theo dõi (dành cho phụ huynh).",
    ],
    teacher: {
      title: "Giáo viên THPT",
      name: "Giáo viên theo chuẩn kiểm tra",
      highlights: [
        "Bám đề/chuẩn để tăng điểm số",
        "Sửa lỗi thật, không chỉ “dạy xong”",
        "Ưu tiên nội dung theo năng lực hiện tại",
      ],
    },
    comparison: {
      diagnostic: "Phân tích lỗi theo năng lực thi",
      schedule: "Ôn theo thứ tự ưu tiên để tăng điểm",
      feedback: "Nhận xét ngắn, rõ lỗi cần sửa",
      focus: "Ngữ pháp - từ vựng - đọc hiểu",
    },
    matchTags: ["weak-reading", "grammar-gap", "missing-priority"],
  },
  {
    slug: "speaking-reflex",
    title: "Giao tiếp & phản xạ",
    audienceTag: "Mọi lứa tuổi",
    shortDesc: "Ưu tiên nói - nghe thực tế, ít lý thuyết khô; tập phản xạ để dùng được ngay.",
    pain: [
      "Học nhiều nhưng không nói trôi chảy vì thiếu cơ chế luyện phản xạ.",
      "Ngại nói, sợ sai nên né thực hành.",
      "Học lan man không biết nên bắt đầu từ đâu.",
    ],
    solution: [
      "Chẩn năng lực nói/nghe để chọn bài tập đúng mức.",
      "Kê lộ trình theo mục tiêu tình huống (học/đi làm/du lịch...).",
      "Chữa bằng bài luyện theo lỗi phát âm - phản xạ.",
    ],
    method: {
      chuan: "Test nói/nghe ngắn + đánh giá điểm nghẽn phản xạ.",
      ke: "Lộ trình theo tình huống, có vòng luyện lặp để tăng phản xạ.",
      chua: "Luyện theo lỗi thật + buổi sau có kiểm tra lại.",
    },
    outcome: [
      "Nói tự tin hơn trong tình huống thực tế.",
      "Tăng tốc độ phản xạ nghe-nói.",
      "Giảm cảm giác “học lý thuyết mà không dùng được”.",
    ],
    proof: [
      "Phản hồi: “Học không khô, mỗi buổi có mục tiêu nói rõ ràng”.",
      "Bài chữa có đo: tiến bộ tốc độ/phản xạ theo mốc.",
    ],
    teacher: {
      title: "Giáo viên Speaking",
      name: "Giáo viên luyện phản xạ",
      highlights: [
        "Thiết kế bài luyện theo tình huống",
        "Sửa lỗi phát âm/kịch bản theo buổi",
        "Tạo môi trường học dễ duy trì động lực",
      ],
    },
    comparison: {
      diagnostic: "Test phản xạ nghe-nói + điểm nghẽn",
      schedule: "Lộ trình theo tình huống, có vòng luyện",
      feedback: "Chấm lỗi phát âm/kịch bản theo buổi",
      focus: "Nói - nghe - phản xạ",
    },
    matchTags: ["need-speaking", "no-system", "missing-priority"],
  },
];

export type CourseMatchKey = {
  id: string;
  label: string;
  help: string;
  matchAnyTags: string[];
};

export const courseMatchKeys: CourseMatchKey[] = [
  {
    id: "lost-base",
    label: "Mất gốc / không lên rõ ràng",
    help: "Bạn cần chẩn đúng lỗi cốt lõi và đi theo thứ tự ưu tiên để tạo đà.",
    matchAnyTags: ["lost-base", "missing-priority", "no-system"],
  },
  {
    id: "no-system",
    label: "Học lan man / thiếu lộ trình",
    help: "Bạn muốn một lộ trình rõ ràng, có mốc kiểm tra và đầu ra cụ thể.",
    matchAnyTags: ["no-system", "missing-priority"],
  },
  {
    id: "weak-reading",
    label: "Yếu đọc hiểu / hay kẹt",
    help: "Bạn cần ưu tiên sửa lỗi đọc hiểu và nền tảng ngữ pháp - từ vựng.",
    matchAnyTags: ["weak-reading", "grammar-gap", "missing-priority"],
  },
  {
    id: "need-speaking",
    label: "Muốn nói - nghe phản xạ",
    help: "Bạn cần bài luyện phản xạ theo lỗi thật để dùng được trong tình huống.",
    matchAnyTags: ["need-speaking", "no-system"],
  },
];


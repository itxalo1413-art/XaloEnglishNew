import { UpsertCourseDto } from './dto/upsert-course.dto';

/** Khóa học mặc định — khớp nội dung trang /khoa-hoc trên website. */
export const DEFAULT_COURSES: UpsertCourseDto[] = [
  {
    title: 'IELTS Foundation → Target Band',
    slug: 'ielts-foundation',
    mode: 'online',
    note: 'Nền tảng chắc, chia band mục tiêu — đi từ lỗi thật tới tiến bộ đo được.',
    audience: 'Sinh viên',
    highlights: [
      'Chẩn đoán điểm yếu theo từng nhóm kỹ năng',
      'Lộ trình theo band mục tiêu',
      'Theo dõi tiến độ qua báo cáo ngắn',
    ],
    is_active: true,
  },
  {
    title: 'Tiếng Anh THPT — Chắc nền, tự tin điểm số',
    slug: 'thpt-foundation',
    mode: 'offline',
    note: 'Bám năng lực thi; chẩn đoán phần yếu để ôn đúng trọng tâm.',
    audience: 'Học sinh THPT',
    highlights: [
      'Phân tích lỗi theo năng lực thi',
      'Ôn theo thứ tự ưu tiên',
      'Báo cáo tiến độ cho phụ huynh',
    ],
    is_active: true,
  },
  {
    title: 'Giao tiếp & phản xạ',
    slug: 'speaking-reflex',
    mode: 'online',
    note: 'Ưu tiên nói - nghe thực tế, ít lý thuyết khô; tập phản xạ để dùng được ngay.',
    audience: 'Mọi lứa tuổi',
    highlights: [
      'Luyện phản xạ theo tình huống',
      'Sửa lỗi phát âm theo buổi',
      'Mục tiêu nói rõ từng buổi học',
    ],
    is_active: true,
  },
];

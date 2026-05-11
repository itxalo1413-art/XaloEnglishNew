const courses = [
  {
    name: "IELTS Foundation → Target Band",
    desc: "Nền tảng chắc, chia band mục tiêu; phù hợp sinh viên cần lộ trình rõ, không học lại từ đầu một cách mơ hồ.",
    tag: "Sinh viên",
  },
  {
    name: "Tiếng Anh THPT — Chắc nền, tự tin điểm số",
    desc: "Bám năng lực thi; chẩn đoán phần yếu (đọc hiểu, ngữ pháp…) để ôn đúng trọng tâm.",
    tag: "Học sinh",
  },
  {
    name: "Giao tiếp & phản xạ",
    desc: "Ưu tiên nói – nghe thực tế, ít lý thuyết khô; phù hợp người cần dùng tiếng Anh hằng ngày.",
    tag: "Mọi lứa tuổi",
  },
];

export function CoursesSection() {
  return (
    <section id="khoa-hoc" className="scroll-mt-24 bg-[var(--surface-2)] py-8 sm:py-12">
      <div className="mx-auto max-w-8xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Khóa học
        </h2>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">
          Mỗi khóa gắn với mục tiêu cụ thể — không gói “chung chung”. Bạn chọn đúng nhu cầu; chúng tôi chẩn và chữa đúng chỗ.
        </p>

        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {courses.map((c) => (
            <li
              key={c.name}
              className="flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6 transition-shadow hover:shadow-md"
            >
              <span className="w-fit rounded-full bg-[var(--background)] px-3 py-1 text-xs font-medium text-[var(--foreground)] ring-1 ring-[var(--border)]">
                {c.tag}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">{c.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">{c.desc}</p>
              <a
                href="/khoa-hoc#dang-ky-tu-van"
                className="mt-6 text-sm font-semibold text-[var(--accent)] hover:underline"
              >
                Tư vấn lộ trình →
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

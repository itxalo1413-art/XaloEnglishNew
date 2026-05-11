const steps = [
  {
    step: "1",
    title: "Chẩn — Đo đúng “đang yếu ở đâu”",
    body:
      "Test đầu vào và phân tích kỹ năng (nghe, nói, đọc, viết / ngữ pháp – từ vựng). Không đoán mò — có số liệu và nhận định cụ thể.",
  },
  {
    step: "2",
    title: "Kê đơn — Lộ trình cá nhân",
    body:
      "Từ kết quả chẩn, ghép lộ trình theo mục tiêu (IELTS, nền tảng, giao tiếp…). Mỗi học viên có thứ tự ưu tiên và mốc kiểm tra rõ ràng.",
  },
  {
    step: "3",
    title: "Chữa — Học có kiểm chứng",
    body:
      "Giờ học tập trung vào lỗi thật; sau mỗi giai đoạn có đánh giá lại. Phụ huynh và học viên nhìn thấy tiến bộ qua báo cáo ngắn, dễ hiểu.",
  },
];

export function ProcessSection() {
  return (
    <section className="bg-[var(--background)] py-16 sm:py-24">
      <div className="mx-auto max-w-8xl px-4 sm:px-6">
        <div id="chan-chua-la-gi" className="scroll-mt-24">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
            Chẩn – Chữa là gì?
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--muted)]">
            <strong className="text-[var(--foreground)]">Chẩn</strong> là bước làm rõ hiện trạng: con đang kẹt ở đâu, vì sao điểm chững lại.
            <strong className="text-[var(--foreground)]"> Chữa</strong> là học đúng chỗ yếu, có kiểm tra lại — không lan man.
            Đây là xương sống của Xa Lộ: thể hiện rằng chúng tôi không dạy đại trà mà có phân tích và cá nhân hoá.
          </p>
        </div>

        <div id="quy-trinh" className="mt-14 scroll-mt-24">
          <h3 className="text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl">
            Quy trình Chẩn – Chữa
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">
            Ba bước liên tiếp — mỗi bước có đầu ra rõ, để bạn “nhìn thấy” cách con (hoặc bạn) tiến bộ.
          </p>

          {/* Progress bar — “data nhẹ” */}
          <div className="mt-8 hidden h-2 w-full overflow-hidden rounded-full bg-[var(--secondary)]/25 sm:flex">
            <div className="h-full w-1/3 rounded-l-full bg-[var(--primary)]" aria-hidden />
            <div className="h-full w-1/3 bg-[var(--secondary)]" aria-hidden />
            <div className="h-full w-1/3 rounded-r-full bg-[var(--accent)]" aria-hidden />
          </div>
          <p className="mt-2 hidden text-center text-xs text-[var(--muted)] sm:block">
            Chẩn đoán → Lộ trình → Cải thiện có đo lường
          </p>

          <ol className="mt-10 grid gap-6 lg:grid-cols-3">
            {steps.map((s, i) => (
              <li
                key={s.step}
                className="relative rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-6 shadow-sm"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)] text-lg font-bold text-[var(--on-primary)]">
                  {s.step}
                </span>
                <h4 className="mt-4 text-lg font-semibold text-[var(--foreground)]">{s.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{s.body}</p>
                {i < steps.length - 1 && (
                  <span
                    className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-2xl text-[var(--foreground)]/25 lg:block"
                    aria-hidden
                  >
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>

        <div
          id="test-dau-vao"
          className="mt-12 scroll-mt-24 rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--surface-2)] p-6 sm:p-8"
        >
          <p className="font-semibold text-[var(--foreground)]">Bắt đầu từ test đầu vào</p>
          <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">
            Làm bài kiểm tra ngắn để có “ảnh chụp” trình độ hiện tại — bước đầu của Chẩn. Sau đó đội ngũ tư vấn giải thích kết quả và gợi ý lộ trình phù hợp.
          </p>
          <a
            href="/#dang-ky-tu-van"
            className="mt-4 inline-flex text-sm font-semibold text-[var(--accent)] underline-offset-2 hover:underline"
          >
            Đăng ký tư vấn sau test →
          </a>
        </div>
      </div>
    </section>
  );
}

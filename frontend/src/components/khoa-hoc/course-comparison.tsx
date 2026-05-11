import { courses } from "./courses-data";

export function CourseComparisonSection() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-sm font-extrabold uppercase tracking-widest text-[var(--accent)]">Course Comparison</h2>
          <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl">
            Sơ đồ so sánh tính năng
          </h3>
          <p className="mt-4 text-base font-medium leading-relaxed text-[var(--muted)]">
            Đối chiếu cực nhanh để biết bạn cần sự tập trung ở mức độ nào.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead>
                <tr>
                  <th className="w-1/4 p-4 text-sm font-black text-[var(--foreground)]">Tiêu chí</th>
                  {courses.map((c) => (
                    <th key={c.slug} className="w-1/4 p-4 text-sm font-extrabold text-[var(--foreground)]">
                      {c.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 border-t border-black/5">
                {(
                  [
                    ["Chẩn đoán", "diagnostic"],
                    ["Lộ trình", "schedule"],
                    ["Phản hồi", "feedback"],
                    ["Trọng tâm", "focus"],
                  ] as const
                ).map(([label, key]) => (
                  <tr key={key} className="group transition-colors hover:bg-[var(--surface-1)]">
                    <td className="p-4 font-bold text-[var(--foreground)] transition-colors group-hover:text-[var(--primary)]">{label}</td>
                    {courses.map((c) => (
                      <td key={c.slug} className="p-4 text-[var(--muted)] font-medium">
                        {c.comparison[key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Academic Note on Branding & Value */}
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="rounded-[2rem] bg-[var(--surface-1)] p-8 shadow-sm ring-1 ring-black/5 lg:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-[var(--primary)]/20">
                <img src="/LOGO_MAU.png" alt="" className="h-full w-full object-contain p-2" />
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-extrabold text-[var(--foreground)]">Note: Band điểm ≠ Lộ trình học (RLP)</h4>
                <p className="text-sm font-medium leading-relaxed text-[var(--muted)]">
                  Tại Xa Lộ English, việc chia lớp theo band chỉ nhằm đảm bảo học viên có nền tảng tương đối tương đồng để lớp vận hành hiệu quả. Tuy nhiên, <span className="text-[var(--foreground)] font-bold">band chỉ là điều kiện tổ chức, không phải yếu tố định vị giá trị học.</span>
                </p>
                <p className="text-sm font-medium leading-relaxed text-[var(--muted)]">
                  Trong cùng một band, mỗi học viên vẫn có Bảng Chẩn Bệnh (BCB) riêng và lộ trình (RLP) riêng. Bạn không &quot;học theo band&quot;, mà đang **học theo vấn đề cá nhân trong một môi trường band phù hợp** — vừa đảm bảo tính hệ thống, vừa giữ được mức độ cá nhân hóa thực chất.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[var(--primary)]" />
                    <span className="text-xs font-bold text-[var(--foreground)]">Band = Điểm xuất phát</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[var(--primary)]" />
                    <span className="text-xs font-bold text-[var(--foreground)]">RLP = Hành trình thực chất</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


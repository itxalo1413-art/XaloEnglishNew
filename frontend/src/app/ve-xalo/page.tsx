import { FinalCta } from "@/components/home/final-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ArrowLeft, ArrowRight, Home, Linkedin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TEAM_MEMBERS = [
  { name: "Septimus", role: "Chuyên viên marketing & tư vấn lộ trình" },
  { name: "Leo Schleifer", role: "Thiết kế học liệu & hình ảnh" },
  { name: "Jaylon Culhane", role: "Giám đốc điều hành" },
  { name: "Cooper Dias", role: "Đồng sáng lập" },
  { name: "Levin", role: "Phát triển hệ thống học tập" },
  { name: "Nolan Dokidis", role: "Trưởng nhóm giáo viên" },
  { name: "James Torff", role: "Biên soạn chương trình" },
  { name: "Ryan Siphron", role: "Giáo viên Speaking & giao tiếp" },
] as const;

export default function VeXaloPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-[#fafafa]">
        {/* Breadcrumb */}
        <div className="mx-auto flex max-w-8xl items-center gap-2 px-6 pt-8 pb-4 text-sm text-[var(--muted)] sm:px-10 lg:px-14">
          <Home className="h-4 w-4 shrink-0" aria-hidden />
          <Link href="/" className="transition hover:text-[var(--foreground)]">
            Trang chủ
          </Link>
          <span>/</span>
          <span className="text-[var(--foreground)]">Về Xa Lộ</span>
        </div>

        {/* Hero */}
        <section className="mx-auto max-w-8xl px-6 pb-16 sm:px-10 lg:px-14">
          <div className="mb-8 flex flex-col md:flex-row md:items-start md:justify-between">
            <h1 className="mb-6 max-w-3xl text-balance text-4xl leading-[1.08] font-bold tracking-tight text-[var(--foreground)] md:mb-0 md:text-5xl lg:text-[3.25rem] lg:leading-[1.05]">
              Một trung tâm học tiếng Anh “thật”
              <br />
              — rõ lộ trình, rõ tiến bộ
            </h1>
            <p className="max-w-sm text-sm leading-relaxed text-[var(--muted)]">
              Xa Lộ không chọn cách nói cho hay. Chúng tôi chọn cách làm rõ: bạn đang yếu ở đâu, cần học
              gì trước, và theo dõi tiến bộ như thế nào.
            </p>
          </div>

          <div className="mb-8 flex flex-wrap items-center gap-3">
            <Link
              href="/khoa-hoc"
              className="inline-flex rounded-lg bg-[var(--primary)] px-6 py-2.5 text-sm font-medium text-[var(--on-primary)] transition-opacity hover:opacity-90"
            >
              Xem khóa học
            </Link>
            <Link
              href="/lien-he"
              className="inline-flex rounded-lg border border-[var(--border)] px-6 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--border-strong)]"
            >
              Nhận tư vấn
            </Link>
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative overflow-hidden rounded-2xl md:w-3/5">
              <div
                className="flex h-[300px] w-full items-center justify-center bg-gradient-to-br from-[var(--primary)]/15 via-[var(--surface-2)] to-[var(--accent)]/10 md:h-[380px]"
                role="img"
                aria-label="Không gian học — ảnh minh hoạ"
              >
                <span className="text-sm text-[var(--muted)]">Hình ảnh trung tâm / đội ngũ</span>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl md:w-2/5">
              <div
                className="flex h-[300px] w-full items-center justify-center bg-gradient-to-tl from-[var(--foreground)]/10 via-[var(--surface-2)] to-[var(--secondary)]/15 md:h-[380px]"
                role="img"
                aria-label="Hoạt động học — ảnh minh hoạ"
              >
                <span className="text-sm text-[var(--muted)]">Hoạt động &amp; lớp học</span>
              </div>
            </div>
          </div>
        </section>

        {/* Về chúng tôi + chỉ số */}
        <section className="mx-auto max-w-8xl px-6 pb-16 sm:px-10 lg:px-14">
          <div className="flex flex-col gap-12 md:flex-row">
            <div className="md:w-1/2">
              <h2 className="mb-6 text-balance text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                Vì sao Xa Lộ tồn tại?
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">
                Chúng tôi bắt đầu từ một vấn đề rất thật: nhiều học viên học rất chăm nhưng không lên đều,
                còn phụ huynh luôn ở trạng thái mơ hồ vì không biết con mình đang kẹt chỗ nào.
              </p>
              <p className="mb-4 text-sm leading-relaxed text-[var(--muted)]">
                Xa Lộ ra đời để thay “học theo cảm giác” bằng một hệ thống có logic trước–sau, có đo lường,
                có trách nhiệm với kết quả — với{" "}
                <span className="font-semibold text-[var(--foreground)]">quy trình Chẩn – Chữa</span> thống nhất
                trong toàn bộ lộ trình.
              </p>
              <p className="text-sm font-semibold text-[var(--foreground)]">Tinh thần khác biệt</p>
              <ul className="mt-3 mb-4 space-y-3 text-sm leading-relaxed text-[var(--muted)]">
                <li className="flex gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary)] mt-1.5" />
                  <span><strong className="text-[var(--foreground)]">Hệ thống ra quyết định:</strong> Chẩn – Chữa không phải phương pháp dạy cố định mà là hệ thống ra quyết định dựa trên dữ liệu thật của từng người học.</span>
                </li>
                <li className="flex gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary)] mt-1.5" />
                  <span><strong className="text-[var(--foreground)]">Lớp học là công cụ:</strong> Classroom không phải là sản phẩm, mà là phương tiện thực thi lộ trình và tạo cộng hưởng học thuật.</span>
                </li>
                <li className="flex gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary)] mt-1.5" />
                  <span><strong className="text-[var(--foreground)]">Lộ trình là sản phẩm:</strong> RLP là bản kế hoạch điều trị được thiết kế riêng, không phải giáo trình cố định theo band.</span>
                </li>
              </ul>
              <Link
                href="/quy-trinh"
                className="text-sm font-medium text-[var(--foreground)] underline underline-offset-4 transition hover:text-[var(--primary)]"
              >
                Tìm hiểu quy trình
              </Link>
            </div>

            <div className="md:w-1/2">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="h-9 w-9 rounded-full border-2 border-white bg-neutral-300" />
                  <div className="h-9 w-9 rounded-full border-2 border-white bg-neutral-400" />
                  <div className="h-9 w-9 rounded-full border-2 border-white bg-neutral-500" />
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--foreground)]">
                  <span className="text-xs text-[var(--on-primary)]">+</span>
                </div>
              </div>
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-neutral-100">
                <Image src="/LOGO_MAU.png" alt="Xa Lộ English" width={40} height={40} className="h-10 w-10 object-contain" />
              </div>
              <h3 className="mb-1 text-4xl font-bold tracking-tight text-[var(--foreground)]">3+</h3>
              <p className="text-xs text-[var(--muted)]">Năm xây dựng hệ thống lớp nhỏ &amp; quy trình Chẩn – Chữa</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 md:flex-row">
            <div
              className="rounded-2xl border p-6 md:w-1/2"
              style={{ borderColor: "hsl(0,0%,88%)", backgroundColor: "hsl(0,0%,100%)" }}
            >
              <div className="mb-4 flex gap-0.5">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-[var(--accent)] text-[var(--accent)]" />
                ))}
                <Star className="h-4 w-4 text-[var(--accent)]" />
              </div>
              <p className="mb-6 text-sm leading-relaxed text-[var(--foreground)]/85">
                &ldquo;Trước chỉ biết con yếu tiếng Anh, giờ thấy rõ con kẹt ở đọc hiểu và từ vựng học thuật.
                Sau 3 tháng có bảng theo dõi, đỡ hoang mang hơn hẳn.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-neutral-400" aria-hidden />
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">Phụ huynh học sinh</p>
                  <p className="text-xs text-[var(--muted)]">Lớp 10</p>
                </div>
              </div>
            </div>

            <div
              className="flex flex-1 flex-col justify-end rounded-2xl border p-6"
              style={{ borderColor: "hsl(0,0%,88%)", backgroundColor: "hsl(0,0%,100%)" }}
            >
              <h3 className="mb-1 text-4xl font-bold tracking-tight text-[var(--foreground)]">100%</h3>
              <p className="text-xs text-[var(--muted)]">Học viên được kê lộ trình theo điểm yếu thật sau buổi Chẩn</p>
            </div>

            <div className="flex flex-1 flex-col justify-end rounded-2xl bg-[var(--foreground)] p-6">
              <h3 className="mb-1 text-4xl font-bold tracking-tight italic text-[var(--primary)]">Chẩn – Chữa</h3>
              <p className="text-xs text-white/70">Một quy trình nhất quán từ đầu vào đến theo dõi tiến độ</p>
            </div>
          </div>
        </section>

        <div className="mx-6 border-t sm:mx-10 lg:mx-14 xl:mx-auto xl:max-w-8xl" style={{ borderColor: "hsl(0,0%,90%)" }} />

        {/* Sứ mệnh — tầm nhìn — giá trị (bố cục 2 cột như mẫu) */}
        <section className="bg-[var(--background)]">
          <div className="mx-auto max-w-8xl px-6 py-16 sm:px-10 lg:px-14">
            <div className="grid items-start gap-10 md:grid-cols-12 md:gap-12 lg:gap-16">
              <div className="md:col-span-5 lg:col-span-4">
                <h2 className="text-balance text-4xl leading-[1.08] font-bold tracking-tight text-[var(--foreground)] md:text-5xl lg:text-6xl">
                  Định hướng
                  <br />
                  <span className="text-[var(--primary)]">phát triển</span>
                </h2>
              </div>

              <div className="md:col-span-7 lg:col-span-8">
                <div>
                  <h3 className="text-base font-bold text-[var(--foreground)]">Sứ mệnh</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                    Giúp người học đi đúng hướng, không lãng phí thời gian với cách học sai.
                  </p>
                </div>

                <div className="mt-8 border-t border-[var(--border)] pt-8">
                  <h3 className="text-base font-bold text-[var(--foreground)]">Tầm nhìn</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                    Trở thành nơi học tiếng Anh đáng tin cậy cho phụ huynh, học sinh và sinh viên.
                  </p>
                </div>

                <div className="mt-8 border-t border-[var(--border)] pt-8">
                  <h3 className="text-base font-bold text-[var(--foreground)]">Giá trị cốt lõi</h3>
                  <ul className="mt-4 space-y-4 text-sm leading-relaxed text-[var(--muted)]">
                    <li className="flex gap-3">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary)]"
                        aria-hidden
                      />
                      <span>
                        <strong className="font-semibold text-[var(--foreground)]">Minh bạch:</strong> Lộ trình và
                        tiến độ được trình bày rõ ràng, để phụ huynh và học viên cùng nắm được đường đi.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary)]"
                        aria-hidden
                      />
                      <span>
                        <strong className="font-semibold text-[var(--foreground)]">Cá nhân hóa:</strong> Mỗi học
                        viên có điểm xuất phát khác nhau — không áp một lộ trình chung cho tất cả.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary)]"
                        aria-hidden
                      />
                      <span>
                        <strong className="font-semibold text-[var(--foreground)]">Theo dõi tiến bộ:</strong> Dùng dữ
                        liệu và mốc kiểm tra dễ hiểu để thấy rõ đang tiến bộ ở đâu.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap justify-end gap-4">
              <Link
                href="/quy-trinh"
                className="inline-flex rounded-lg border px-5 py-2.5 text-sm font-medium text-[var(--primary)] transition-colors hover:bg-[var(--primary)]/5"
                style={{ borderColor: "var(--primary)" }}
              >
                Xem quy trình
              </Link>
            </div>

            <div
              className="mt-12 rounded-2xl border p-6 sm:p-10"
              style={{ borderColor: "hsl(0,0%,88%)", backgroundColor: "hsl(0,0%,100%)" }}
            >
              <h3 className="text-xl font-bold text-[var(--foreground)]">Vì sao chọn quy trình Chẩn – Chữa?</h3>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                Vì chúng tôi tin rằng sự tiến bộ không đến từ việc &quot;học hết giáo trình&quot;, mà đến từ việc **xử lý đúng điểm nghẽn**. Chẩn – Chữa mang lại cho học viên 3 giá trị cốt lõi ở tầng cảm nhận:
              </p>
              <div className="mt-8 grid gap-6 sm:grid-cols-3">
                {[
                  { title: "Hiểu đúng vấn đề", desc: "Học viên thấy lỗi sai của mình được phân tích cụ thể, không bị hòa lẫn với người khác." },
                  { title: "Tiến bộ rõ ràng", desc: "Mỗi buổi học đều gắn với mục tiêu cải thiện cụ thể, nhận diện được sự thay đổi năng lực." },
                  { title: "Được đồng hành", desc: "Dù học nhóm hay 1-1, học viên luôn được theo dõi và hỗ trợ cá nhân hóa xuyên suốt." }
                ].map((item) => (
                  <div key={item.title} className="rounded-xl bg-[var(--surface-2)] p-5 ring-1 ring-black/5">
                    <h4 className="font-bold text-[var(--foreground)] text-base">{item.title}</h4>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--muted)]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Ecosystem Summary */}
            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              <div className="rounded-3xl bg-[var(--foreground)] p-8 text-white shadow-2xl shadow-black/10 sm:p-12">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--primary)] mb-4">Học thuật & Dữ liệu</p>
                <h3 className="text-3xl font-bold leading-tight">
                  Hệ sinh thái <br/>
                  <span className="text-[var(--primary)]">Học thuật Cộng hưởng</span>
                </h3>
                <p className="mt-6 text-sm leading-relaxed opacity-80">
                  Tại Xa Lộ English, chúng tôi thay thế &quot;giáo án đại trà&quot; bằng một hệ thống học thuật khép kín, nơi dữ liệu năng lực thực tế quyết định mọi bước đi của học viên.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <div className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold ring-1 ring-white/20">#DeepLearning</div>
                  <div className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold ring-1 ring-white/20">#DataDriven</div>
                  <div className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold ring-1 ring-white/20">#Personalized</div>
                </div>
              </div>

              <div className="grid gap-6">
                <div className="rounded-3xl bg-white p-8 shadow-xl shadow-black/5 ring-1 ring-black/5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--surface-2)] text-[var(--primary)]">
                       <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                       </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[var(--foreground)]">BCB: Bằng chứng học thuật</h4>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                        Bảng Chẩn Bệnh (BCB) là &quot;phòng thí nghiệm&quot; nơi mọi lỗi ngôn ngữ được định danh, phân tích và lưu vết bằng dữ liệu thật, tạo niềm tin tuyệt đối vào lộ trình.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl bg-white p-8 shadow-xl shadow-black/5 ring-1 ring-black/5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--surface-2)] text-[var(--primary)]">
                       <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                       </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[var(--foreground)]">RLP: Kế hoạch Cộng hưởng</h4>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                        Resonant Lesson Plan (RLP) là chiến lược &quot;điều trị&quot; cá nhân hóa. Mỗi buổi học là một mắt xích cộng hưởng, giúp tối ưu thời gian và xử lý triệt để điểm nghẽn.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Đội ngũ — layout “Meet the team” */}
        <section className="mx-auto max-w-8xl px-6 pb-20 sm:px-10 lg:px-14 lg:pb-24">
          <div className="mb-12 grid gap-8 lg:mb-16 lg:grid-cols-2 lg:items-start lg:gap-12 xl:gap-16">
            <h2 className="max-w-xl text-balance text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
              Gặp gỡ chuyên gia đồng hành cùng bạn
            </h2>
            <p className="max-w-xl text-sm font-normal leading-relaxed text-[var(--muted)] md:text-base">
              Các khóa học có thể diễn ra trực tuyến hay tại lớp, nhưng hành trình học của bạn luôn được đồng
              hành bởi đội ngũ thật. Chúng tôi không chỉ chọn giáo viên “dạy tốt”, mà chọn người có cùng phương
              châm: hiểu học viên, theo sát tiến độ, và dạy dựa trên lỗi thật — thống nhất phương pháp Chẩn – Chữa,
              phản hồi tiến độ đều đặn để phụ huynh và học viên cùng nắm rõ lộ trình.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM_MEMBERS.map((member) => (
              <article key={member.name} className="group">
                <div
                  className="mb-4 aspect-[3/4] w-full overflow-hidden rounded-xl bg-neutral-200"
                  role="img"
                  aria-label={`Ảnh đại diện — ${member.name}`}
                >
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-neutral-200 to-neutral-300 text-center text-xs text-[var(--muted)]">
                    Ảnh đại diện
                  </div>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-bold text-[var(--foreground)]">{member.name}</h3>
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-[var(--primary)] transition-opacity hover:opacity-80"
                    aria-label={`LinkedIn — ${member.name}`}
                  >
                    <Linkedin className="h-5 w-5" strokeWidth={1.75} />
                  </a>
                </div>
                <p className="mt-1 text-sm text-[var(--muted)]">{member.role}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Triết lý Chẩn – Chữa dành cho giáo viên */}
        <section className="bg-[var(--surface-2)] py-16 sm:py-24">
          <div className="mx-auto max-w-8xl px-6 sm:px-10 lg:px-14">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl">
                  Triết lý Chẩn – Chữa <br/>
                  <span className="text-[var(--primary)] text-stroke-sm">dành cho giáo viên</span>
                </h2>
                <div className="mt-8 space-y-6">
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--primary)] rounded-full" />
                    <p className="text-base font-bold text-[var(--foreground)]">Hệ thống ra quyết định, không phải phương pháp cố định</p>
                    <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
                      Tại Xa Lộ English, giáo viên không chỉ là người truyền đạt kiến thức mà là người đưa ra quyết định dựa trên dữ liệu. Giáo viên sử dụng quy trình Chẩn – Chữa để xác định đúng vấn đề và lựa chọn phương pháp phù hợp nhất cho từng học viên.
                    </p>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--primary)] rounded-full opacity-50" />
                    <p className="text-base font-bold text-[var(--foreground)]">Cá nhân hóa thực chất</p>
                    <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
                      Lộ trình (RLP) là công cụ chính. Dù dạy lớp nhóm hay 1:1, giáo viên luôn có Bảng Chẩn Bệnh (BCB) để theo dõi tiến độ cá nhân hóa, giúp học viên cảm thấy được hiểu đúng vấn đề và được đồng hành thực sự.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-[2.5rem] bg-white p-8 shadow-xl shadow-black/5 ring-1 ring-black/5 lg:p-12">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-4">Các chuyên gia tại Xa Lộ</p>
                <div className="grid gap-4">
                  {[
                    "Tư duy giải quyết vấn đề dựa trên dữ liệu",
                    "Khả năng phân tích lỗi sai ngôn ngữ nhạy bén",
                    "Sự tận tâm trong việc theo dõi tiến độ cá nhân",
                    "Tinh thần học hỏi và chuẩn hóa quy trình"
                  ].map((skill) => (
                    <div key={skill} className="flex items-center gap-3 rounded-xl bg-[var(--surface-1)] p-4 ring-1 ring-black/5">
                      <div className="h-2 w-2 rounded-full bg-[var(--primary)]" />
                      <span className="text-sm font-semibold text-[var(--foreground)]">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Kết quả & thành tựu */}
        <section className="mx-auto max-w-8xl px-6 pb-16 sm:px-10 lg:px-14">
          <h2 className="mb-3 text-balance text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
            Kết quả &amp; thành tựu
          </h2>
          <p className="mb-10 max-w-2xl text-sm text-[var(--muted)]">
            Minh chứng theo dòng thời gian để bạn thấy hành trình phát triển của Xa Lộ.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { year: "2023", title: "Xa Lộ bắt đầu với mô hình lớp nhỏ", body: "Tập trung giải bài toán “học nhiều nhưng không biết sai ở đâu”." },
              { year: "2024", title: "Chuẩn hoá quy trình Chẩn – Chữa", body: "Áp dụng đồng nhất từ đánh giá đầu vào đến theo dõi tiến độ." },
              { year: "2025", title: "Mở rộng lộ trình cho HS, SV và luyện thi", body: "Tăng độ cá nhân hóa theo từng mục tiêu học cụ thể." },
            ].map((item) => (
              <div
                key={item.year}
                className="rounded-2xl border p-6"
                style={{ borderColor: "hsl(0,0%,88%)", backgroundColor: "hsl(0,0%,100%)" }}
              >
                <p className="text-xs font-semibold tracking-wide text-[var(--accent)] uppercase">{item.year}</p>
                <h3 className="mt-2 text-lg font-semibold text-[var(--foreground)]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Hành trình */}
        <section className="py-16" style={{ backgroundColor: "hsl(0,0%,95%)" }}>
          <div className="mx-auto max-w-8xl px-6 sm:px-10 lg:px-14">
            <h2 className="mb-2 text-balance text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
              Hành trình cùng Xa Lộ
            </h2>
            <p className="mb-12 max-w-lg text-sm text-[var(--muted)]">
              Từ buổi trao đổi đầu tiên đến lộ trình Chẩn – Chữa, chúng tôi giữ nhịp rõ ràng và trách nhiệm với
              tiến độ.
            </p>

            <div className="flex flex-col items-start gap-12 md:flex-row">
              <div className="md:w-1/2">
                <p className="mb-2 text-xs tracking-wider text-[var(--muted)] uppercase">Bước</p>
                <h3 className="mb-8 text-6xl font-bold tracking-tight text-[var(--foreground)]">01</h3>
                <div className="relative">
                  <div
                    className="relative z-10 -rotate-3 overflow-hidden rounded-2xl shadow-xl"
                    style={{ boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
                  >
                    <div
                      className="flex h-[300px] w-full items-center justify-center bg-gradient-to-br from-[var(--primary)]/20 to-[var(--surface-2)]"
                      role="img"
                      aria-label="Minh hoạ bước 1"
                    />
                  </div>
                  <div className="absolute top-4 left-8 z-0 rotate-3 opacity-60">
                    <div
                      className="overflow-hidden rounded-2xl"
                      style={{ width: "min(100%, 360px)" }}
                    >
                      <div
                        className="flex h-[280px] w-full min-w-[280px] items-center justify-center bg-gradient-to-tr from-[var(--accent)]/15 to-neutral-200"
                        role="img"
                        aria-label="Minh hoạ phụ"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex items-center gap-2">
                  <Link
                    href="/khoa-hoc"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--muted)] transition hover:border-[var(--border-strong)] hover:text-[var(--foreground)]"
                    aria-label="Xem khóa học"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/quy-trinh"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary)] text-[var(--on-primary)] transition-opacity hover:opacity-90"
                    aria-label="Xem quy trình"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="md:w-1/2 md:pt-24">
                <h3 className="mb-4 text-2xl font-bold tracking-tight text-[var(--foreground)] md:text-3xl">
                  Buổi tư vấn &amp; làm rõ mục tiêu
                </h3>
                <p className="text-sm leading-relaxed text-[var(--muted)]">
                  Bạn chia sẻ bối cảnh học, mục tiêu và điểm đang kẹt. Chúng tôi giải thích cách Chẩn – Chữa giúp
                  ưu tiên phần cần sửa trước, để không học lan man và có mốc tiến độ theo dõi được.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Đối tác / phân khúc */}
        <section className="mx-auto max-w-8xl px-6 py-16 text-center sm:px-10 lg:px-14">
          <h2 className="mb-3 text-balance text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
            Phục vụ ai?
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-sm text-[var(--muted)]">
            Thiết kế lộ trình cho từng nhóm học viên — không một giáo án chung cho tất cả.
          </p>
          <div
            className="grid grid-cols-2 overflow-hidden rounded-2xl border md:grid-cols-4"
            style={{ borderColor: "hsl(0,0%,88%)" }}
          >
            {["Phụ huynh", "Học sinh THPT", "Sinh viên", "Luyện IELTS", "Tiếng Anh học thuật", "Lớp nhỏ", "Theo dõi tiến độ", "Chẩn – Chữa"].map(
              (name, i) => (
                <div
                  key={`${name}-${i}`}
                  className="flex items-center justify-center border px-4 py-8"
                  style={{ borderColor: "hsl(0,0%,88%)" }}
                >
                  <span className="text-sm font-bold tracking-wide text-neutral-700 md:text-base">{name}</span>
                </div>
              ),
            )}
          </div>
        </section>

        {/* Cập nhật */}
        <section className="py-16" style={{ backgroundColor: "hsl(0,0%,95%)" }}>
          <div className="mx-auto max-w-8xl px-6 sm:px-10 lg:px-14">
            <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="mb-3 text-balance text-3xl font-bold tracking-tight text-[var(--foreground)] md:text-4xl">
                  Lịch khai giảng &amp; hành động tiếp theo
                </h2>
                <p className="max-w-md text-sm text-[var(--muted)]">
                  Xem lịch mở lớp gần nhất, hoặc để lại thông tin để được kê lộ trình phù hợp.
                </p>
              </div>
              <Link
                href="/lich-khai-giang"
                className="mt-4 inline-flex rounded-lg border px-5 py-2.5 text-sm font-medium text-[var(--primary)] transition-colors hover:bg-[var(--primary)]/5 md:mt-0"
                style={{ borderColor: "var(--primary)" }}
              >
                Xem lịch khai giảng
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-[#fafafa] pb-16 pt-4">
          <div className="mx-auto max-w-8xl px-6 sm:px-10 lg:px-14">
            <FinalCta />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

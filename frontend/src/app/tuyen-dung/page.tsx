import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import Link from "next/link";

const jobs = [
  {
    title: "Giáo viên IELTS (Part-time / Full-time)",
    type: "Giảng dạy",
    location: "TP.HCM",
    schedule: "Linh hoạt theo ca",
  },
  {
    title: "Giáo viên Tiếng Anh THPT",
    type: "Giảng dạy",
    location: "TP.HCM",
    schedule: "Chiều / Tối",
  },
  {
    title: "Trợ giảng tiếng Anh",
    type: "Học vụ",
    location: "TP.HCM",
    schedule: "Part-time",
  },
  {
    title: "Tư vấn tuyển sinh",
    type: "Vận hành",
    location: "TP.HCM",
    schedule: "Full-time",
  },
  {
    title: "Content Marketing (Education)",
    type: "Marketing",
    location: "TP.HCM",
    schedule: "Full-time",
  },
] as const;

export default function TuyenDungPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-white">
        {/* HERO SECTION WITH DIAGONAL CUT */}
        <div className="relative bg-white pb-[6vw] sm:pb-[4vw]">
          <section
            className="relative overflow-hidden bg-[var(--surface-2)] text-[var(--foreground)]"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 6vw), 0 100%)",
            }}
          >
            {/* Animated Stripe Mesh Gradients */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-[10%] top-0 h-[600px] w-[600px] rounded-full bg-[#f4b6cc]/40 mix-blend-multiply blur-3xl opacity-80" />
              <div className="absolute right-[5%] top-[10%] h-[500px] w-[500px] rounded-full bg-[#d0e5f2]/40 mix-blend-multiply blur-[120px] opacity-80" />
              <div className="absolute -bottom-[20%] left-[20%] h-[700px] w-[700px] rounded-full bg-[var(--primary)]/10 mix-blend-multiply blur-[100px] opacity-70" />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-28 pt-16 sm:px-6 sm:pb-36 sm:pt-24 lg:px-8 lg:pb-48 lg:pt-32">
              <div className="max-w-3xl">
                <p className="text-sm font-extrabold tracking-widest uppercase text-[var(--accent)] drop-shadow-sm mb-4">
                  Gia nhập đội ngũ Xa Lộ English
                </p>
                <h1 className="text-[3rem] font-[900] uppercase leading-[1.05] tracking-tight text-[var(--foreground)] sm:text-[4rem] lg:text-[5rem]">
                  CÙNG XÂY DỰNG
                  <br />
                  <span className="text-[var(--primary)] drop-shadow-sm">TƯƠNG LAI HỌC VẤN</span>
                </h1>
                <p className="mt-8 max-w-xl text-lg font-medium leading-relaxed text-[var(--muted)] sm:text-xl border-l-[3px] border-[var(--primary)]/30 pl-5">
                  Môi trường làm việc năng động, tôn trọng cá nhân và liên tục đào tạo. 
                  Tìm vị trí phù hợp với bạn bên dưới và trở thành một phần của Xa Lộ.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* BENTO GRID JOB LIST */}
        <section className="relative z-20 mx-auto -mt-16 w-full max-w-6xl px-4 pb-20 sm:-mt-24 sm:px-6 sm:pb-32 lg:-mt-32 lg:px-8">
          <div className="flex flex-col gap-8 lg:gap-12 lg:flex-row lg:items-start">
            <div className="lg:w-1/3 lg:sticky lg:top-24">
              <h2 className="text-2xl font-extrabold text-[var(--foreground)] sm:text-3xl">
                Vị trí đang mở
              </h2>
              <p className="mt-4 text-sm font-medium leading-relaxed text-[var(--muted)] sm:text-base">
                Tham gia cùng các chuyên gia hàng đầu trong lĩnh vực giáo dục.
                Chúng tôi liên tục tìm kiếm nhân tài cho nhiều khối phòng ban.
              </p>
            </div>

            <ul className="flex-1 space-y-4 sm:space-y-6">
              {jobs.map((job) => (
                <li
                  key={job.title}
                  className="group relative flex flex-col rounded-[2rem] bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_8px_40px_rgb(0,0,0,0.12)] hover:ring-black/10 sm:p-8"
                >
                  <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-[var(--primary)]/0 to-[var(--primary)]/0 group-hover:from-[var(--primary)]/[0.02] group-hover:to-transparent transition-colors duration-500 pointer-events-none" />

                  <div className="relative z-10 sm:flex sm:items-start sm:justify-between sm:gap-6">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl font-extrabold text-[var(--foreground)] sm:text-2xl">
                        {job.title}
                      </h3>
                      
                      <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold tracking-wide">
                        <span className="inline-flex items-center rounded-full bg-[var(--surface-2)] px-3.5 py-1.5 text-[var(--foreground)] text-[11px] uppercase ring-1 ring-black/5 transition-colors group-hover:bg-[#d0e5f2] group-hover:text-[#58798c]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#58798c] mr-2"></span>
                          {job.type}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-[var(--surface-2)] px-3.5 py-1.5 text-[var(--foreground)] text-[11px] uppercase ring-1 ring-black/5 transition-colors group-hover:bg-[#f4b6cc]/50 group-hover:text-[#aa336a]">
                          {job.location}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-[var(--surface-2)] px-3.5 py-1.5 text-[var(--foreground)] text-[11px] uppercase ring-1 ring-black/5 transition-colors group-hover:bg-[#ffd646]/30 group-hover:text-[#a68612]">
                          {job.schedule}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex items-center shrink-0 sm:mt-0">
                      <Link
                        href="/lien-he"
                        className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-full bg-[var(--surface-1)] px-6 text-sm font-bold text-[var(--foreground)] shadow-sm uppercase tracking-widest ring-1 ring-inset ring-[var(--border)] transition-all duration-300 group-hover:bg-[var(--primary)] group-hover:text-[var(--on-primary)] group-hover:shadow-lg group-hover:shadow-[var(--primary)]/20 group-hover:ring-transparent"
                      >
                        Ứng tuyển
                        <svg className="ml-2 h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-1 hover:!translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
        {/* TEACHING PHILOSOPHY SECTION */}
        <section className="bg-[var(--surface-2)] py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
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
                      Tại Xa Lộ English, giáo viên không chỉ là người truyền đạt kiến thức mà là người đưa ra quyết định dựa trên dữ liệu. Bạn sẽ dùng Chẩn – Chữa để xác định đúng điểm nghẽn và tùy biến phương pháp phù hợp nhất với từng học viên.
                    </p>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--primary)] rounded-full opacity-50" />
                    <p className="text-base font-bold text-[var(--foreground)]">Cá nhân hóa thực chất</p>
                    <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
                      Lộ trình (RLP) là công cụ chính của bạn. Dù dạy lớp nhóm hay 1:1, bạn luôn có BCB để theo dõi tiến độ cá nhân hóa, giúp học viên cảm thấy được hiểu đúng vấn đề và được đồng hành thực sự.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-[2.5rem] bg-white p-8 shadow-xl shadow-black/5 ring-1 ring-black/5 lg:p-12">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-4">Chúng tôi tìm kiếm</p>
                <div className="grid gap-4">
                  {[
                    "Tư duy giải quyết vấn đề (Solution-oriented)",
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
      </main>
      <SiteFooter />
    </>
  );
}

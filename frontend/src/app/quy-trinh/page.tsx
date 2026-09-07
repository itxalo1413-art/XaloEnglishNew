import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buildPageMetadata } from "@/lib/seo";
import { BelowFold, DeferredFinalCta } from "@/lib/deferred-public";

export const metadata: Metadata = buildPageMetadata({
  title: "Quy trình Chẩn - Chữa",
  description:
    "Tìm hiểu quy trình Chẩn - Chữa tại Xa Lộ English: xác định đúng điểm nghẽn, xây lộ trình học cá nhân hóa và theo dõi tiến bộ thực tế.",
  canonical: "/quy-trinh",
});

const khaiNiemCards = [
  { body: "Quy trình Chẩn – Chữa là nền tảng cốt lõi trong toàn bộ mô hình đào tạo tại Xa Lộ English, được áp dụng xuyên suốt cho cả lớp nhóm và lớp 1:1. Quy trình này tập trung vào việc xác định đúng “điểm nghẽn” trong năng lực học tập của từng học viên, từ đó xây dựng giải pháp học tập cá nhân hóa, thay vì sử dụng một lộ trình chung cho tất cả." },
  { body: "Mỗi học viên đều trải qua tối thiểu hai chu kỳ Chẩn – Chữa trong suốt quá trình học: trước, trong và sau khi học. (Xem chi tiết ở phần mô tả bên dưới)." },
  { body: "Khác với nhiều trung tâm tập trung vào xây dựng phương pháp dạy mang tính đại trà hoặc sản phẩm branding để thu hút học viên, Xa Lộ English đặt trọng tâm vào hiệu quả học tập thực tế. Mỗi học viên không chỉ được “dạy” mà còn được chẩn đoán đúng vấn đề và điều trị bằng giải pháp học tập phù hợp, đảm bảo tiến bộ rõ ràng và bền vững." },
] as const;

const nguyenTacItems = [
  {
    title: "Mục tiêu rõ ràng chinh phục ngoại ngữ",
    body: (
      <>
        <p>Mỗi học viên khi bắt đầu đều được xác định mục tiêu cụ thể: band điểm, thời gian đạt mục tiêu, nhu cầu sử dụng (du học, công việc, giao tiếp…). Việc làm rõ đích đến ngay từ đầu giúp cho học viên:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Định hướng đúng nội dung học</li>
          <li>Tối ưu thời gian và công sức</li>
          <li>Tăng động lực và khả năng theo sát lộ trình</li>
        </ul>
        <p className="mt-3">Học viên không học lan man mà học có chiến lược và có điểm đích rõ ràng.</p>
      </>
    ),
  },
  {
    title: "Lộ trình tối ưu (40%) – Cơ sở để cam kết quá trình học tập",
    body: (
      <>
        <p>Lộ trình được xây dựng dựa trên kết quả Chẩn nên phản ánh đúng:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Điểm mạnh – điểm yếu thực tế</li>
          <li>Nền tảng ngôn ngữ hiện tại</li>
          <li>Tốc độ tiếp thu của học viên</li>
        </ul>
        <p className="mt-3">Một lộ trình đúng chiếm khoảng 40% yếu tố quyết định hiệu quả học tập, vì nó:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Phân bổ đúng kỹ năng cần ưu tiên</li>
          <li>Tránh học lại phần đã vững</li>
          <li>Tập trung xử lý “điểm nghẽn”</li>
        </ul>
        <p className="mt-3">Đây cũng là cơ sở để trung tâm cam kết tiến trình học, không cam kết cảm tính.</p>
      </>
    ),
  },
  {
    title: "Hướng đến mục tiêu bền vững – “Học để dùng”",
    body: (
      <>
        <p>Trọng tâm không chỉ là đạt band điểm mà là sử dụng được ngôn ngữ sau khóa học. Vì vậy:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Kiến thức được xây từ nền tảng → ứng dụng</li>
          <li>Hạn chế học mẹo hoặc phụ thuộc template</li>
          <li>Phát triển tư duy ngôn ngữ và khả năng tự học</li>
        </ul>
        <p className="mt-3">Cách tiếp cận này giúp học viên duy trì năng lực lâu dài, sử dụng được trong học tập, công việc và môi trường thực tế.</p>
      </>
    ),
  },
] as const;

const chanPoints = [
  { label: "Trước khóa học:", text: "Học viên làm bài kiểm tra đầu vào. Grader chấm bài, đưa ra nhận xét qua BCB để xác định các vấn đề sơ cấp – những lỗi cơ bản hiện rõ trong bài làm." },
  { label: "Trong khóa học:", text: "Giáo viên quan sát và tương tác để phát hiện các vấn đề thứ cấp – các lỗi trong quá trình học và vận dụng kiến thức mới." },
  { label: "Cuối chặng/cuối khóa:", text: "Học viên làm bài tập về nhà và bài kiểm tra tổng kết. Từ đó GV/Grader xác định các vấn đề còn sót lại hoặc mới phát sinh." },
] as const;

const chuaPoints = [
  { label: "Trước khóa học:", text: "Giáo viên lập kế hoạch dạy dựa trên BCB – định hướng cụ thể thông qua RLP (mục tiêu chặng – phân bố kỹ năng – nội dung học)." },
  { label: "Trong khóa học:", text: "GV thiết kế bài giảng theo RLP, tập trung cải thiện các vấn đề sơ cấp." },
  { label: "Sau khóa học:", text: "GV xây dựng hoặc hướng dẫn học viên phương pháp học ngoài giờ để giải quyết vấn đề còn lại và hướng tới tự học hiệu quả." },
] as const;

const bcbSheets = [
  {
    name: "Writing Grading Sheet",
    function: "Chấm điểm và phân tích bài viết (Task 1 & Task 2)",
    role: "Xác định điểm mạnh, điểm yếu trong từng tiêu chí Writing IELTS"
  },
  {
    name: "Speaking Grading Sheet",
    function: "Ghi nhận kết quả bài nói theo 4 tiêu chí IELTS",
    role: "Xác định điểm mạnh, điểm yếu trong từng tiêu chí Speaking IELTS"
  },
  {
    name: "Diagnosis Sheet",
    function: "Phân tích chi tiết kết quả L-R-W-S & Grammar",
    role: "Phần tổng hợp quan sát lỗi học thuật theo từng dạng bài, từng kỹ năng"
  },
  {
    name: "Revision History",
    function: "Ghi lại toàn bộ các chỉnh sửa trong hệ thống",
    role: "Đảm bảo sự minh bạch, nhất quán và cải tiến liên tục"
  }
] as const;

const bcbBrandingPoints = [
  {
    title: "Minh chứng trực quan",
    desc: "BCB thay thế các con số band tổng quát bằng phân tích dữ liệu chi tiết từng dạng bài và lỗi ngôn ngữ."
  },
  {
    title: "Xây dựng niềm tin",
    desc: "Biến lời cam kết thành kế hoạch cụ thể, giúp học viên nhìn thấy rõ lộ trình 'điều trị' riêng biệt."
  },
  {
    title: "Sản phẩm có thể nhìn thấy",
    desc: "Thể hiện quá trình phân tích chuyên sâu, tạo sự khác biệt rõ rệt giữa trước và sau khi 'chữa'."
  }
] as const;

const rlpFramework = [
  {
    name: "🔹 Chẩn – Student Profile",
    desc: "Ghi lại thông tin nền tảng: mục tiêu IELTS, đích đến và điểm đầu vào. Giúp giáo viên hiểu rõ vị trí xuất phát để định hướng dạy học.",
    color: "var(--secondary)"
  },
  {
    name: "🔹 Chữa – RLP",
    desc: "Xây dựng kế hoạch học tập chi tiết: mục tiêu tuần, chiến lược luyện thi và điều chỉnh tài liệu phù hợp với năng lực thực tế.",
    color: "var(--primary)"
  }
] as const;

const rlpBrandingPoints = [
  {
    title: "Chứng minh bằng quy trình",
    desc: "RLP chuyển từ việc 'nói về phương pháp' sang 'chứng minh bằng hệ thống', nơi mỗi buổi học đều có mục tiêu cụ thể bám sát dữ liệu."
  },
  {
    title: "Tính cá nhân hóa thực chất",
    desc: "Đảm bảo quá trình học không dựa trên giáo án chung mà được thiết kế riêng cho mục tiêu và tiến độ đo lường được của từng cá nhân."
  }
] as const;

const docClosingArrowNote = "=> Vì vậy, Chẩn – Chữa không chỉ là phương pháp dạy học mà là quy chuẩn học vụ bắt buộc, quyết định chất lượng đào tạo và là nền tảng cho mọi cam kết học tập tại Xa Lộ English.";

export default function QuyTrinhChanChuaPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section id="chan-chua-la-gi" className="bg-[#fff] py-16 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-8xl px-4 sm:px-6">
            <div className="mx-auto max-w-5xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 text-sm font-bold text-[var(--foreground)] ring-1 ring-black/10">
                <span className="flex -space-x-2" aria-hidden>
                  <span className="h-6 w-6 rounded-full bg-[var(--surface-2)] ring-2 ring-white/80" />
                  <span className="h-6 w-6 rounded-full bg-[var(--surface-2)] ring-2 ring-white/80" />
                  <span className="h-6 w-6 rounded-full bg-[var(--surface-2)] ring-2 ring-white/80" />
                </span>
                <span>QUY TRÌNH CHẨN - CHỮA</span>
              </div>
              <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10">
                <div className="relative h-[120px] w-[112px] shrink-0">
                  <Image src="/quy-trinh-branding/image4.png" alt="" width={112} height={120} className="h-auto w-full drop-shadow-xl" />
                </div>
                <div className="min-w-0 text-center sm:text-left">
                  <h1 className="text-balance text-5xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-6xl lg:text-[4.5rem] lg:leading-[1.08]">
                    QUY TRÌNH <span className="text-[var(--primary)] text-stroke">CHẨN - CHỮA</span>
                  </h1>
                  <p className="mt-4 text-xl font-bold text-[var(--foreground)] sm:text-2xl">
                    (by Xa Lộ English)
                  </p>
                </div>
              </div>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="#dang-ky-tu-van"
                  className="inline-flex h-12 min-w-[220px] items-center justify-center rounded-sm bg-[var(--primary)] px-8 text-lg font-bold text-[var(--on-primary)] transition-colors hover:bg-[var(--secondary)]"
                >
                  Làm test đầu vào
                </a>
                <Link
                  href="#dang-ky-tu-van"
                  className="inline-flex h-12 min-w-[220px] items-center justify-center rounded-sm bg-white/40 px-8 text-lg font-bold text-[var(--primary)] ring-1 ring-black/10 transition-colors hover:bg-white/70"
                >
                  Đăng ký tư vấn
                </Link>
              </div>
            </div>
            <h2 className="mx-auto mt-14 max-w-5xl text-center text-balance text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl">
              I. KHÁI NIỆM: QUY TRÌNH CHẨN CHỮA?
            </h2>
            <div className="mt-12 grid gap-6 sm:gap-8 lg:grid-cols-3">
              {khaiNiemCards.map((x, i) => (
                <article
                  key={i}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-[var(--surface-2)] p-6 shadow-sm shadow-black/[0.04] ring-1 ring-black/[0.02] transition duration-300 hover:-translate-y-1 hover:border-[var(--primary)]/20 hover:shadow-lg hover:shadow-[var(--primary)]/10 sm:p-8"
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[var(--primary)] opacity-90 transition group-hover:opacity-100"
                    aria-hidden
                  />
                  <div className="mb-5 flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--primary)] text-base font-bold tabular-nums text-[var(--on-primary)] shadow-md shadow-[var(--primary)]/25">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="h-px min-w-0 flex-1 bg-[var(--primary)]/35" aria-hidden />
                  </div>
                  <p className="text-lg font-normal leading-[1.75] text-[var(--foreground)] sm:text-xl">{x.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative isolate overflow-hidden bg-[var(--surface-1)] py-14 sm:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[var(--secondary)]/5" aria-hidden />
          <div className="mx-auto max-w-8xl px-4 sm:px-6">
            <div className="relative mx-auto max-w-5xl">
              <figure className="relative overflow-hidden rounded-3xl border border-[var(--primary)]/12 bg-white/90 p-8 shadow-xl shadow-black/[0.06] backdrop-blur-sm sm:p-12">
                <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-[100%] bg-[var(--accent)]/[0.06]" aria-hidden />
                <blockquote className="relative z-10 border-l-[3px] border-[var(--primary)] pl-6 sm:pl-8">
                  <p className="text-xl font-semibold leading-[1.85] text-[var(--foreground)] sm:text-2xl lg:text-3xl">
                    "Xa Lộ English không sử dụng một phương pháp chung cho tất cả. Mỗi học viên được chẩn đoán đúng vấn đề, từ đó lựa chọn phương pháp phù hợp và thiết kế lộ trình cá nhân hóa, mục tiêu và tốc độ học riêng. Chính cách tiếp cận này tạo nên sự khác biệt rõ rệt về hiệu quả học tập, đồng thời trở thành USP cốt lõi trong hoạt động branding và tư vấn tuyển sinh của trung tâm.”
                  </p>
                </blockquote>
              </figure>
            </div>
          </div>
        </section>

        <section className="bg-[var(--background)] py-16 sm:py-24">
          <div className="mx-auto max-w-8xl px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-12 xl:gap-16">
              <div className="max-w-3xl">
                <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl">
                  Nguyên tắc vận hành của quy trình
                </h2>
                <p className="max-w-xl text-lg font-bold leading-relaxed text-[var(--foreground)] sm:text-xl mt-4">
                Quy trình được triển khai dựa trên ba nguyên tắc cốt lõi:
              </p>
              </div>
              
            </div>
            <div className="mt-12 overflow-hidden rounded-sm bg-[var(--surface-2)] shadow-sm shadow-black/10">
              <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="space-y-10 p-7 sm:p-10">
                  {nguyenTacItems.map((x) => (
                    <div key={x.title} className="flex gap-3">
                      <span
                        className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--background)] text-[var(--muted)] ring-1 ring-black/10"
                        aria-hidden
                      >
                        ✦
                      </span>
                      <div className="min-w-0 text-base font-semibold leading-relaxed text-[var(--foreground)] sm:text-lg [&_li]:font-medium [&_p]:text-base sm:[&_p]:text-lg [&_ul]:mt-3">
                        <p className="text-lg font-extrabold text-[var(--foreground)] sm:text-xl">{x.title}</p>
                        <div className="mt-3">{x.body}</div>
                      </div>
                    </div>
                  ))}
                </div>
                  <div className="relative min-h-[440px] bg-[#F5F0EA] sm:min-h-[560px] overflow-hidden">
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute inset-y-0 left-0 w-24 bg-[var(--surface-2)] lg:w-32" />
                    <div className="absolute inset-8 rounded-sm bg-black/5 ring-1 ring-black/10" />
                    <div className="absolute right-8 bottom-8 flex h-16 w-36 items-center justify-center rounded-lg bg-white/70 p-4 shadow-lg ring-1 ring-black/10 sm:w-40">
                      <span className="text-center text-sm font-extrabold tracking-widest text-[var(--primary)] sm:text-base">CORE PRINCIPLES</span>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
                       <Image src="/Logo_XLE.svg" alt="" width={300} height={300} className="grayscale" />
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </section>

        <section id="quy-trinh" className="bg-[var(--surface-2)] py-16 sm:py-24">
          <div className="mx-auto max-w-8xl px-4 sm:px-6">
            <h2 className="text-center text-balance text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl">
              II. CHI TIẾT QUY TRÌNH CHẨN - CHỮA
            </h2>
            
            <div className="mt-16 space-y-24 lg:space-y-32">
              {/* QUY TRÌNH CHẨN */}
              <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5">
                  <Image 
                    src="/quy-trinh-branding/image2.jpg" 
                    alt="Quy trình Chẩn" 
                    fill
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <div className="rounded-2xl bg-[var(--background)] p-8 shadow-xl shadow-black/5 ring-1 ring-black/5 sm:p-10">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20">
                    <span className="text-xl font-bold">01</span>
                  </div>
                  <h3 className="mt-6 text-2xl font-extrabold text-[var(--foreground)] sm:text-3xl">
                    Quy trình “CHẨN”
                  </h3>
                  <p className="mt-4 text-lg font-bold leading-relaxed text-[var(--foreground)]">
                    Quy trình chẩn là bước đi tiên quyết, được thực hiện nghiêm ngặt ở 3 giai đoạn:
                  </p>
                  <ul className="mt-8 space-y-6">
                    {chanPoints.map((c, idx) => (
                      <li key={idx} className="flex gap-4">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--surface-2)] text-sm font-extrabold text-[var(--primary)] ring-1 ring-[var(--primary)]/10">
                          {idx + 1}
                        </span>
                        <p className="text-base font-semibold leading-relaxed text-[var(--foreground)] sm:text-lg">
                          <span className="font-extrabold text-[var(--foreground)]">{c.label}</span> {c.text}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* QUY TRÌNH CHỮA */}
              <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
                <div className="order-2 rounded-2xl bg-[var(--background)] p-8 shadow-xl shadow-black/5 ring-1 ring-black/5 sm:p-10 lg:order-1">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/20">
                    <span className="text-xl font-bold">02</span>
                  </div>
                  <h3 className="mt-6 text-2xl font-extrabold text-[var(--foreground)] sm:text-3xl">
                    Quy trình “CHỮA”
                  </h3>
                  <p className="mt-4 text-lg font-bold leading-relaxed text-[var(--foreground)]">
                    Từ kết quả chẩn đoán, giải pháp điều trị được cá nhân hóa hoàn toàn:
                  </p>
                  <ul className="mt-8 space-y-6">
                    {chuaPoints.map((c, idx) => (
                      <li key={idx} className="flex gap-4">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--surface-2)] text-sm font-extrabold text-[var(--primary)] ring-1 ring-[var(--primary)]/10">
                          {idx + 1}
                        </span>
                        <p className="text-base font-semibold leading-relaxed text-[var(--foreground)] sm:text-lg">
                          <span className="font-extrabold text-[var(--foreground)]">{c.label}</span> {c.text}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5 lg:order-2">
                  <Image 
                    src="/quy-trinh-branding/image3.jpg" 
                    alt="Quy trình Chữa" 
                    fill
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-8xl px-4 sm:px-6">
            <div className="text-center">
               <h2 className="text-balance text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl">
                III. 6 BƯỚC VẬN HÀNH CHI TIẾT
              </h2>
              <p className="mt-4 text-lg font-bold text-[var(--foreground)] sm:text-xl">Sơ đồ tổng quan quy trình Chẩn - Chữa tại Xa Lộ English</p>
            </div>
            
            <div className="mt-16 overflow-hidden rounded-3xl bg-[var(--surface-2)] p-4 shadow-inner sm:p-8">
              <div className="overflow-x-auto">
                <Image
                  src="/quy-trinh-branding/image1.png"
                  alt="6 bước quy trình"
                  width={1206}
                  height={654}
                  loading="lazy"
                  sizes="100vw"
                  className="mx-auto h-auto min-w-[1000px] w-full max-w-full drop-shadow-sm"
                />
              </div>
            </div>

            <div className="mt-20 grid gap-8 lg:grid-cols-2">
              <div className="flex flex-col rounded-3xl bg-[var(--surface-2)] p-8 shadow-sm ring-1 ring-black/5 sm:p-10">
                <h3 className="text-2xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-3xl">
                  Tóm tắt logic quy trình
                </h3>
                <div className="mt-8 space-y-8">
                  <div>
                    <span className="inline-block rounded-full bg-[var(--primary)]/10 px-3 py-1 text-sm font-extrabold text-[var(--primary)] uppercase tracking-wider">
                      Cấp độ 1
                    </span>
                    <p className="mt-3 text-base font-semibold leading-relaxed text-[var(--foreground)] sm:text-lg">
                      <span className="font-extrabold text-[var(--foreground)]">Chẩn & Chữa sơ cấp:</span> Test → Chẩn → RLP → xác định bức tranh toàn cảnh
                    </p>
                  </div>
                  <div>
                    <span className="inline-block rounded-full bg-[var(--primary)]/10 px-3 py-1 text-sm font-extrabold text-[var(--primary)] uppercase tracking-wider">
                      Cấp độ 2
                    </span>
                    <p className="mt-3 text-base font-semibold leading-relaxed text-[var(--foreground)] sm:text-lg">
                      <span className="font-extrabold text-[var(--foreground)]">Chẩn & Chữa thứ cấp:</span> Quan sát → Điều chỉnh → Bổ sung tài nguyên → đảm bảo đúng lộ trình
                    </p>
                  </div>
                </div>
                <div className="mt-auto pt-10 border-t border-black/5">
                  <p className="text-base font-extrabold text-[var(--foreground)] uppercase tracking-widest sm:text-lg">Mô hình này giúp:</p>
                  <ul className="mt-4 space-y-3">
                    {[
                      "Chẩn đoán ở đầu vào (BCB) và xây dựng lộ trình học phù hợp (RLP)",
                      "Có cơ chế điều chỉnh liên tục",
                      "Giữ học viên đi đúng mục tiêu ban đầu"
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-base font-semibold text-[var(--foreground)] sm:text-lg">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-8">
                <div className="rounded-3xl bg-[var(--background)] p-8 shadow-xl shadow-black/5 ring-1 ring-black/5 sm:p-10">
                  <h3 className="text-xl font-extrabold text-[var(--foreground)] leading-tight sm:text-2xl">
                    Trục vận hành học thuật bắt buộc
                  </h3>
                  <p className="mt-4 text-base font-semibold leading-relaxed text-[var(--foreground)] sm:text-lg">
                    Quy trình Chẩn – Chữa không phải là hoạt động bổ trợ mà là trung tâm của mọi hoạt động tại Xa Lộ English. Được áp dụng xuyên suốt trong toàn bộ mô hình đào tạo (lớp nhóm và 1:1).
                  </p>
                  <p className="mt-4 text-sm font-extrabold text-[var(--foreground)] uppercase tracking-wider sm:text-base">Bao gồm các bước:</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[
                      "Kiểm tra đầu vào",
                      "Lập Bảng Chẩn Bệnh (BCB)",
                      "Xây dựng lộ trình RLP",
                      "Theo dõi - chẩn đoán",
                      "Điều chỉnh phương pháp & tài nguyên"
                    ].map(tag => (
                      <span key={tag} className="rounded-lg bg-[var(--surface-2)] px-3 py-1.5 text-sm font-bold text-[var(--foreground)] ring-1 ring-black/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 border-t border-black/5 pt-4">
                    <p className="text-sm font-extrabold text-[var(--foreground)] uppercase tracking-wider sm:text-base">Đảm bảo rằng:</p>
                    <ul className="mt-2 space-y-1.5">
                      {[
                        "Việc dạy học luôn dựa trên dữ liệu năng lực thực tế",
                        "Lộ trình được cá nhân hóa theo từng học viên",
                        "Quá trình học được theo dõi và điều chỉnh liên tục"
                      ].map(point => (
                        <li key={point} className="flex items-center gap-2 text-sm font-semibold text-[var(--foreground)] sm:text-base">
                          <span className="h-1 w-1 rounded-full bg-[var(--foreground)]" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="rounded-3xl bg-[var(--primary)] p-8 text-white shadow-2xl shadow-[var(--primary)]/20 sm:p-10">
                  <div className="space-y-4 text-base font-semibold leading-relaxed opacity-95 sm:text-lg">
                    <p>BCB (Bảng chẩn bệnh) là đầu ra bắt buộc của bước Chẩn, đồng thời là đầu vào học thuật để giáo viên thiết kế kế hoạch giảng dạy.</p>
                    <p>RLP (Resonant Lesson Plan) là khung triển khai bắt buộc để đảm bảo tiến trình học tập bám sát mục tiêu.</p>
                    <p className="border-t border-white/20 pt-4">Quy trình này được thực hiện tối thiểu hai chu kỳ chẩn – chữa trong một khóa học nhằm:</p>
                    <ul className="space-y-1 pl-4 list-disc text-sm font-semibold opacity-90 sm:text-base">
                      <li>Xác định đúng vấn đề ban đầu</li>
                      <li>Phát hiện vấn đề phát sinh</li>
                      <li>Xử lý triệt để các “điểm nghẽn” ngôn ngữ</li>
                    </ul>
                  </div>
                  <div className="mt-8 flex items-center gap-4 border-t border-white/20 pt-8">
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-white/50">
                       <Image src="/quy-trinh-branding/image4.png" alt="" width={40} height={40} className="brightness-0 invert" />
                    </div>
                    <p className="text-sm font-extrabold leading-tight italic opacity-90 sm:text-base">
                      {docClosingArrowNote}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="chi-tiet-bcb" className="bg-[#fff] py-20 sm:py-28">
          <div className="mx-auto max-w-8xl px-4 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
              <div>
                <h2 className="text-balance text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl lg:leading-[1.1]">
                  IV. CHI TIẾT CÔNG CỤ: <br className="hidden lg:block"/>
                  <span className="text-[var(--primary)] text-stroke">BẢNG CHẨN BỆNH (BCB)</span>
                </h2>
                <div className="mt-8 space-y-6 text-base font-semibold leading-relaxed text-[var(--foreground)] sm:text-lg">
                  <p>
                    Bảng Chẩn Bệnh (BCB) là tài liệu tổng hợp kết quả phân tích bài làm của học viên sau bài kiểm tra đầu vào hoặc sau một giai đoạn học cụ thể. BCB đóng vai trò như kết quả đầu ra của bước <span className="font-bold text-[var(--foreground)]">“Chẩn”</span>, là căn cứ để giáo viên lập kế hoạch giảng dạy mang tính cá nhân hóa thực chất.
                  </p>
                  <p>
                    BCB không chỉ phản ánh điểm số mà còn cho thấy rõ những dạng bài học viên gặp khó khăn, những lỗi ngữ pháp cụ thể và mức độ đáp ứng các tiêu chuẩn học thuật.
                  </p>
                </div>
                <div className="mt-10 rounded-2xl bg-[var(--surface-2)] p-6 ring-1 ring-black/5">
                  <p className="mb-4 text-sm font-extrabold uppercase tracking-widest text-[var(--accent)] sm:text-base">BCB trong Branding</p>
                  <div className="space-y-4">
                    {bcbBrandingPoints.map((point) => (
                      <div key={point.title}>
                        <p className="text-base font-extrabold text-[var(--foreground)] sm:text-lg">{point.title}</p>
                        <p className="mt-1 text-sm font-semibold text-[var(--foreground)] sm:text-base">{point.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-[var(--background)] p-6 shadow-2xl shadow-black/5 ring-1 ring-black/5 sm:p-10">
                <div className="flex items-center justify-between border-b border-black/5 pb-6">
                  <h3 className="text-xl font-bold text-[var(--foreground)]">Cấu trúc 4 Sheets dữ liệu</h3>
                  <span className="text-sm font-black uppercase tracking-widest text-[var(--primary)] opacity-50">Spreadsheet Architecture</span>
                </div>
                <div className="mt-8 space-y-4">
                  {bcbSheets.map((sheet, idx) => (
                    <div key={sheet.name} className="group flex flex-col gap-4 rounded-2xl bg-[var(--surface-2)] p-5 transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-black/5 ring-1 ring-black/5">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary)] text-sm font-extrabold text-white shadow-lg shadow-[var(--primary)]/20">
                            0{idx + 1}
                          </span>
                          <p className="font-extrabold text-[var(--foreground)]">{sheet.name}</p>
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <p className="text-xs font-black uppercase tracking-widest text-[var(--muted)] sm:text-sm">Chức năng chính</p>
                          <p className="mt-1 text-sm font-bold text-[var(--foreground)] sm:text-base">{sheet.function}</p>
                        </div>
                        <div>
                          <p className="text-xs font-black uppercase tracking-widest text-[var(--muted)] sm:text-sm">Vai trò Chẩn – Chữa</p>
                          <p className="mt-1 text-sm font-semibold text-[var(--foreground)] italic sm:text-base">{sheet.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-black/5 pt-8">
                  <p className="text-sm font-extrabold text-[var(--foreground)] italic sm:text-base">
                    BCB được thực hiện ít nhất 2 lần: Sau bài Test & Sau mỗi chặng học.
                  </p>
                  <Link
                    href="#dang-ky-tu-van"
                    className="inline-flex h-10 items-center justify-center rounded-lg bg-[var(--foreground)] px-6 text-sm font-extrabold text-white transition-opacity hover:opacity-90"
                  >
                    Nhận BCB mẫu
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="chi-tiet-rlp" className="bg-[var(--surface-2)] py-20 sm:py-28">
          <div className="mx-auto max-w-8xl px-4 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-16">
              <div className="rounded-3xl bg-white p-6 shadow-2xl shadow-black/5 ring-1 ring-black/5 sm:p-10 lg:order-2">
                <div className="flex items-center justify-between border-b border-black/5 pb-6">
                  <h3 className="text-2xl font-extrabold text-[var(--foreground)] sm:text-3xl">Cấu trúc RLP Resonant</h3>
                  <span className="text-sm font-black uppercase tracking-widest text-[var(--primary)] opacity-50">Academic Resonance</span>
                </div>
                
                <div className="mt-8 space-y-6">
                  <div className="rounded-2xl border-l-4 border-[var(--primary)] bg-[var(--surface-2)] p-6">
                    <p className="mb-2 text-sm font-black uppercase tracking-widest text-[var(--muted)] sm:text-base">Định nghĩa Cambridge</p>
                    <p className="text-xl font-extrabold italic text-[var(--foreground)] sm:text-2xl">
                      &ldquo;Resonate (v): to continue to have a powerful effect or value&rdquo;
                    </p>
                    <p className="mt-4 text-base font-semibold leading-relaxed text-[var(--foreground)] sm:text-lg">
                      Tại Xa Lộ English, kiến thức mỗi buổi học không chỉ là nền tảng mà còn là sự cộng hưởng, hỗ trợ mạnh mẽ cho các buổi học tiếp theo.
                    </p>
                  </div>

                  <div className="grid gap-4">
                    {rlpFramework.map((item) => (
                      <div key={item.name} className="rounded-2xl bg-white p-5 ring-1 ring-black/5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                        <p className="text-lg font-extrabold text-[var(--foreground)] sm:text-xl" style={{ color: item.color === 'var(--primary)' ? 'var(--primary)' : 'inherit' }}>{item.name}</p>
                        <p className="mt-2 text-sm font-semibold leading-relaxed text-[var(--foreground)] sm:text-base">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-black/5 pt-8">
                  <p className="text-sm font-extrabold text-[var(--foreground)] italic sm:text-base">
                    Lộ trình được thiết kế dựa theo nghiên cứu vấn đề theo band điểm.
                  </p>
                  <Link
                    href="#dang-ky-tu-van"
                    className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-lg bg-[var(--primary)] px-6 text-sm font-extrabold text-white transition-opacity hover:opacity-90"
                  >
                    Xem RLP mẫu
                  </Link>
                </div>
              </div>

              <div className="lg:order-1">
                <h2 className="text-balance text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl lg:leading-[1.1]">
                  V. CHI TIẾT CÔNG CỤ: <br className="hidden lg:block"/>
                  <span className="text-[var(--primary)] text-stroke">RESONANT LESSON PLAN (RLP)</span>
                </h2>
                <div className="mt-8 space-y-6 text-base font-semibold leading-relaxed text-[var(--foreground)] sm:text-lg">
                  <p>
                    Resonant Lesson Plan (RLP) không chỉ là lộ trình học mà còn là minh chứng rõ ràng cho chất lượng học thuật. RLP cho phép thương hiệu chuyển từ <span className="font-extrabold text-[var(--foreground)]">“nói về phương pháp”</span> sang <span className="font-extrabold text-[var(--foreground)]">“chứng minh bằng quy trình”</span>.
                  </p>
                  <p>
                    Mỗi học viên có một lộ trình riêng, mỗi buổi học có mục tiêu cụ thể, và sự tiến bộ được theo dõi theo từng chặng. Điều này tạo ra niềm tin mạnh mẽ vì khách hàng không chỉ nghe cam kết, mà nhìn thấy kế hoạch học ngay từ đầu.
                  </p>
                </div>
                
                <div className="mt-10 grid gap-6">
                  {rlpBrandingPoints.map((point) => (
                    <div key={point.title} className="relative pl-6">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--primary)] rounded-full" />
                      <p className="text-lg font-extrabold text-[var(--foreground)] sm:text-xl">{point.title}</p>
                      <p className="mt-2 text-base font-semibold leading-relaxed text-[var(--foreground)] sm:text-lg">{point.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-12 rounded-3xl bg-[var(--foreground)] p-8 text-white shadow-2xl shadow-black/20">
                  <p className="mb-4 text-sm font-extrabold uppercase tracking-widest text-[var(--primary)] sm:text-base">Giá trị cốt lõi</p>
                  <p className="text-base font-semibold leading-relaxed opacity-95 italic sm:text-lg">
                    &ldquo;RLP giúp Xa Lộ được định vị là trung tâm dạy theo dữ liệu, học theo lộ trình và hướng đến năng lực sử dụng ngôn ngữ bền vững, không học mẹo, không dạy đại trà.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <BelowFold minHeight={360}>
          <DeferredFinalCta />
        </BelowFold>
      </main>
      <SiteFooter />
    </>
  );
}

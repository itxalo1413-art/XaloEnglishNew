import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Sparkles, Stethoscope } from "lucide-react";

export function Hero() {
  return (
    <div className="relative bg-white pb-[4vw] sm:pb-[2vw]">
      <section
        id="hero"
        className="relative overflow-visible bg-[var(--surface-2)] text-[var(--foreground)]"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 4vw), 0 100%)",
        }}
      >
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 pt-10 sm:px-6 sm:pb-28 sm:pt-16 lg:px-8 lg:pb-36 lg:pt-20">
          {/* Badge & Headline Area */}
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch xl:gap-16">
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 self-start rounded-full bg-[var(--primary)]/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-[var(--secondary)] ring-1 ring-[var(--primary)]/20">
                <Sparkles className="h-3.5 w-3.5 text-[var(--secondary)]" />
                Quy trình Chẩn – Chữa Độc Quyền
              </div>

              <h1 className="mt-5 font-heading text-3xl font-[900] uppercase leading-[1.05] tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-[3rem] xl:text-[3.75rem] 2xl:text-[4.25rem]">
                <span className="block text-[var(--secondary)] drop-shadow-sm">Học đúng cách</span>
                <span className="block whitespace-nowrap">khi hiểu đúng mình</span>
                <span className="mt-2 block text-xl font-black lowercase tracking-normal text-[var(--primary)] sm:text-2xl lg:text-3xl">
                  cùng Quy trình Chẩn - Chữa
                </span>
              </h1>

              <p className="mt-6 max-w-2xl border-l-4 border-[var(--primary)] pl-4 py-1 text-base font-medium leading-relaxed text-[var(--muted)] sm:text-lg">
                Xa Lộ English giúp bạn xác định đúng điểm yếu trước khi bắt đầu học, từ đó xây lộ trình tập trung vào những gì bạn thực sự cần cải thiện.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
                <Link
                  href="/#test-dau-vao"
                  className="group inline-flex h-14 items-center justify-center rounded-full bg-[var(--primary)] px-8 text-sm font-black uppercase tracking-wider text-[var(--on-primary)] shadow-xl shadow-[var(--primary)]/25 transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--secondary)] hover:shadow-2xl hover:shadow-[var(--primary)]/40"
                >
                  <Stethoscope className="mr-2.5 h-4 w-4" />
                  Test trình độ & nhận Bảng Chẩn Bệnh miễn phí
                  <ArrowRight className="ml-2.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/khoa-hoc"
                  className="inline-flex h-14 items-center justify-center rounded-full bg-white px-7 text-sm font-extrabold text-[var(--foreground)] shadow-sm ring-1 ring-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--surface-1)] hover:text-[var(--primary)] hover:ring-[var(--primary)]/30"
                >
                  Xem lộ trình học phù hợp
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-bold text-[var(--muted)]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[var(--primary)]" />
                  Test 4 kỹ năng chuẩn rubric
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[var(--primary)]" />
                  Nhận Bảng Chẩn Bệnh (BCB) chi tiết
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[var(--primary)]" />
                  Lộ trình cá nhân hóa (RLP)
                </div>
              </div>
            </div>

            {/* Visual Photo Card - Tall Height */}
            <div className="relative flex flex-col">
              <div className="group relative w-full flex-1 min-h-[440px] sm:min-h-[500px] lg:min-h-[560px] overflow-hidden rounded-[2.5rem] bg-white p-3 shadow-2xl ring-1 ring-black/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgb(0,0,0,0.15)]">
                <div className="relative h-full w-full min-h-[420px] sm:min-h-[480px] lg:min-h-[540px] overflow-hidden rounded-[2rem] bg-[var(--surface-1)]">
                  <Image
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000&h=1000"
                    alt="Học viên Xa Lộ English trong buổi chẩn đoán và học lộ trình"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90" />
                  
                  <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/95 p-4 backdrop-blur-md ring-1 ring-black/5 shadow-lg">
                    <p className="text-[11px] font-black uppercase tracking-widest text-[var(--secondary)]">
                      Quy trình Chẩn – Chữa
                    </p>
                    <p className="mt-1 text-xs font-bold text-[var(--foreground)] sm:text-sm">
                      Đồng hành 1 kèm 1 & Lộ trình RLP cá nhân hóa theo từng mục tiêu
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

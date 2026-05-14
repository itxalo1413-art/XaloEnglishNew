import Link from "next/link";

export function Hero() {
  return (
    <div className="relative bg-white pb-[6vw] sm:pb-[4vw]">
      <section
        id="hero"
        className="relative overflow-visible bg-[var(--surface-2)] text-[var(--foreground)]"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 6vw), 0 100%)",
        }}
      >
        {/* Removed Animated Mesh Gradients - User requested solid colors only */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-12 sm:px-6 sm:pb-32 sm:pt-20 lg:px-8 lg:pb-40 lg:pt-28">
          
          <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,400px)] lg:items-center xl:grid-cols-[1fr_minmax(0,480px)] xl:gap-16">
            <div>
              <h1 className="font-heading text-[3.5rem] font-[900] uppercase leading-[0.95] tracking-tighter text-[var(--foreground)] sm:text-[5rem] lg:text-[6rem] xl:text-[7.5rem]">
                <span className="block text-[var(--secondary)] drop-shadow-sm">XALO ENGLISH</span>
                <span className="block">LEARNING</span>
                <span className="block text-[var(--primary)]">SYSTEM</span>
              </h1>
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-lg font-medium leading-relaxed text-[var(--muted)] sm:text-xl border-l-4 border-[var(--primary)]/30 pl-4 py-1">
                Không cần tốn thời gian học lan man. Xa Lộ giúp bạn xác định đúng điểm yếu, xây lộ trình
                phù hợp và theo dõi tiến độ rõ ràng để tiến bộ nhanh hơn.
              </p>
              <div className="mt-8 flex items-center">
                <Link
                  href="/lien-he"
                  className="group inline-flex h-16 w-full sm:w-auto items-center justify-center rounded-full bg-[var(--foreground)] px-10 text-sm font-extrabold uppercase tracking-widest text-[#fff] shadow-xl shadow-black/10 transition-all duration-500 hover:-translate-y-1 hover:bg-[var(--primary)] hover:shadow-2xl hover:shadow-[var(--primary)]/30"
                >
                  Find Your Class
                  <svg className="ml-3 h-5 w-5 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-4 sm:mt-24 sm:grid-cols-4 sm:gap-6 lg:mt-32">
            {[
              { name: "ANH THU", role: "Mất gốc", bg: "bg-[#f4b6cc]", text: "text-[#aa336a]" },
              { name: "MINH KHANG", role: "Luyện thi", bg: "bg-[#d9e0e4]", text: "text-[#58798c]" },
              { name: "NGỌC MAI", role: "Cần lộ trình", bg: "bg-[#e9e2d8]", text: "text-[#a0825e]" },
              { name: "HẢI ĐĂNG", role: "Giao tiếp", bg: "bg-[#ffd646]", text: "text-[#a68612]" },
            ].map((item) => (
              <div
                key={item.name}
                className={`group relative flex min-h-[200px] flex-col overflow-hidden rounded-[2rem] ${item.bg} p-6 shadow-xl shadow-black/5 ring-1 ring-white/60 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/15 sm:min-h-[260px]`}
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <p className={`relative z-10 text-xs font-black uppercase tracking-widest ${item.text}`}>{item.name}</p>
                <p className="relative z-10 mt-1.5 text-sm font-bold text-black/60">{item.role}</p>
                
                <div className="mt-auto flex justify-end relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1 group-hover:-translate-y-1">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-white/40 backdrop-blur-sm ${item.text}`}>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

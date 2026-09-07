import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  FileCheck,
  LineChart,
  MessageSquare,
  Milestone,
  Search,
  Sparkles,
  Stethoscope,
  Target,
  UserCheck,
} from "lucide-react";

export function ProcessTeaserSection() {
  return (
    <section className="scroll-mt-24 relative overflow-hidden bg-[var(--primary)] py-16 sm:py-24 text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-white drop-shadow-sm ring-1 ring-white/25">
            <Stethoscope className="h-3.5 w-3.5 text-white" />
            Hệ thống đào tạo độc quyền
          </div>
          <h2 className="mt-4 font-heading text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl leading-tight">
            Chẩn đúng vấn đề — Chữa đúng điểm yếu
          </h2>
          <p className="mt-4 text-base font-medium leading-relaxed text-white/90 sm:text-lg">
            Hiểu hệ thống Xa Lộ English trong 15 giây: Không bán khoá học đại trà, chúng tôi đồng hành cùng bạn qua 2 giai đoạn khép kín dựa trên dữ liệu thật.
          </p>
        </div>

        {/* 2-Column Diagnosis & Treatment Visual System */}
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* CỘT 1: CHẨN (DIAGNOSIS) */}
          <div className="relative flex flex-col rounded-[2.5rem] bg-white p-7 text-[var(--foreground)] shadow-2xl ring-1 ring-black/5 sm:p-9">
            <div className="flex items-center justify-between border-b border-black/5 pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-2)] text-[var(--secondary)] ring-1 ring-[var(--secondary)]/20">
                  <Search className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-[var(--secondary)]">Giai đoạn 01</span>
                  <h3 className="text-2xl font-black text-[var(--foreground)]">CHẨN</h3>
                </div>
              </div>
              <span className="rounded-full bg-[var(--surface-2)] px-3 py-1 text-xs font-black text-[var(--secondary)]">
                3 Bước cốt lõi
              </span>
            </div>

            <p className="mt-4 text-sm font-semibold text-[var(--muted)]">
              Mục tiêu: Bóc tách chính xác điểm nghẽn trước khi tốn thời gian và học phí.
            </p>

            <div className="mt-6 space-y-4">
              {/* Bước 1 */}
              <div className="flex gap-4 rounded-2xl bg-[var(--surface-1)] p-4 transition-all hover:bg-white hover:shadow-sm">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--secondary)] text-xs font-black text-white">
                  1
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-[var(--foreground)] text-pretty">Test đầu vào 4 kỹ năng</h4>
                  <p className="mt-1 text-xs font-medium text-[var(--muted)] leading-relaxed text-pretty">
                    Đánh giá toàn diện Listening, Reading, Writing và Speaking theo khung rubric chuẩn Cambridge.
                  </p>
                </div>
              </div>

              {/* Bước 2 */}
              <div className="flex gap-4 rounded-2xl bg-[var(--surface-1)] p-4 transition-all hover:bg-white hover:shadow-sm">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--secondary)] text-xs font-black text-white">
                  2
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-[var(--foreground)] text-pretty">Phân tích điểm mạnh – điểm yếu</h4>
                  <p className="mt-1 text-xs font-medium text-[var(--muted)] leading-relaxed text-pretty">
                    Xác định chính xác phần đang kéo band xuống và chỉ ra nguyên nhân cụ thể (ngữ pháp, từ vựng hay tư duy phản xạ).
                  </p>
                </div>
              </div>

              {/* Bước 3 */}
              <div className="flex gap-4 rounded-2xl bg-[var(--surface-1)] p-4 transition-all hover:bg-white hover:shadow-sm">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--secondary)] text-xs font-black text-white">
                  3
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-[var(--foreground)] text-pretty">Nhận Bảng Chẩn Bệnh (BCB)</h4>
                  <p className="mt-1 text-xs font-medium text-[var(--muted)] leading-relaxed text-pretty">
                    Học viên và phụ huynh nhận văn bản BCB chi tiết: Biết rõ danh sách lỗi, mức độ ưu tiên sửa và hướng cải thiện.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6">
              <div className="rounded-2xl bg-[var(--secondary)]/10 p-3.5 text-center text-xs font-bold text-[var(--secondary)] text-pretty">
                ✓ Đầu ra: Hiểu rõ 100% năng lực bản thân & không còn mông lung
              </div>
            </div>
          </div>

          {/* CỘT 2: CHỮA (TREATMENT) */}
          <div className="relative flex flex-col rounded-[2.5rem] bg-white p-7 text-[var(--foreground)] shadow-2xl ring-1 ring-black/5 sm:p-9">
            <div className="flex items-center justify-between border-b border-black/5 pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary)]/15 text-[var(--secondary)] ring-1 ring-[var(--primary)]/30">
                  <Activity className="h-6 w-6 text-[var(--secondary)]" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-[var(--secondary)]">Giai đoạn 02</span>
                  <h3 className="text-2xl font-black text-[var(--foreground)]">CHỮA</h3>
                </div>
              </div>
              <span className="rounded-full bg-[var(--primary)]/15 px-3 py-1 text-xs font-black text-[var(--secondary)]">
                4 Bước hành động
              </span>
            </div>

            <p className="mt-4 text-sm font-semibold text-[var(--muted)] text-pretty">
              Mục tiêu: Giải quyết dứt điểm lỗi sai qua lộ trình RLP cá nhân hoá.
            </p>

            <div className="mt-6 space-y-4">
              {/* Bước 4 */}
              <div className="flex gap-4 rounded-2xl bg-[var(--surface-1)] p-4 transition-all hover:bg-white hover:shadow-sm">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-xs font-black text-white">
                  4
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-[var(--foreground)] text-pretty">Kê lộ trình học phù hợp (RLP)</h4>
                  <p className="mt-1 text-xs font-medium text-[var(--muted)] leading-relaxed text-pretty">
                    Cá nhân hóa theo trình độ hiện tại, mục tiêu band điểm và thời gian biểu của riêng bạn.
                  </p>
                </div>
              </div>

              {/* Bước 5 */}
              <div className="flex gap-4 rounded-2xl bg-[var(--surface-1)] p-4 transition-all hover:bg-white hover:shadow-sm">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-xs font-black text-white">
                  5
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-[var(--foreground)] text-pretty">Học tập trung vào điểm yếu</h4>
                  <p className="mt-1 text-xs font-medium text-[var(--muted)] leading-relaxed text-pretty">
                    Không học lan man kiến thức thừa, dồn 80% năng lượng vào sửa đúng các phần đang mất điểm.
                  </p>
                </div>
              </div>

              {/* Bước 6 */}
              <div className="flex gap-4 rounded-2xl bg-[var(--surface-1)] p-4 transition-all hover:bg-white hover:shadow-sm">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-xs font-black text-white">
                  6
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-[var(--foreground)] text-pretty">Chấm chữa – Phản hồi liên tục</h4>
                  <p className="mt-1 text-xs font-medium text-[var(--muted)] leading-relaxed text-pretty">
                    Giáo viên trực tiếp sửa lỗi phát âm, ngữ pháp, bài viết đều đặn trong từng buổi học.
                  </p>
                </div>
              </div>

              {/* Bước 7 */}
              <div className="flex gap-4 rounded-2xl bg-[var(--surface-1)] p-4 transition-all hover:bg-white hover:shadow-sm">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-xs font-black text-white">
                  7
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-[var(--foreground)] text-pretty">Đo lại & Điều chỉnh</h4>
                  <p className="mt-1 text-xs font-medium text-[var(--muted)] leading-relaxed text-pretty">
                    Theo dõi tiến bộ qua từng tuần, test lại định kỳ và cập nhật RLP để luôn bám sát mục tiêu.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6">
              <div className="rounded-2xl bg-[var(--primary)]/10 p-3.5 text-center text-xs font-bold text-[var(--secondary)] text-pretty">
                ✓ Đầu ra: Vá dứt điểm lỗi sai & tiến bộ rõ ràng sau từng chặng
              </div>
            </div>
          </div>
        </div>

        {/* Big Result Formula Summary Banner */}
        <div className="mt-12 rounded-[2.5rem] bg-white/10 backdrop-blur-md p-8 ring-1 ring-white/25 shadow-2xl text-center">
          <p className="text-xs font-black uppercase tracking-widest text-white/80 drop-shadow-sm">
            Công thức cốt lõi tại Xa Lộ English
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-lg font-black sm:text-2xl md:text-3xl text-white">
            <span className="rounded-2xl bg-white/15 px-4 py-2 ring-1 ring-white/20">Biết mình yếu ở đâu</span>
            <span className="text-white">→</span>
            <span className="rounded-2xl bg-white/15 px-4 py-2 ring-1 ring-white/20">Được chữa đúng chỗ</span>
            <span className="text-white">→</span>
            <span className="rounded-2xl bg-[var(--secondary)] text-white px-4 py-2 shadow-lg shadow-black/20 ring-1 ring-white/30">Tiến bộ rõ ràng</span>
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href="/quy-trinh"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-black uppercase tracking-wider text-[var(--secondary)] shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--secondary)] hover:text-white"
            >
              Xem chi tiết Quy trình Chẩn – Chữa
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

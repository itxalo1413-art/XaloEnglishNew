"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { CheckCircle2, ChevronRight, Send, Sparkles, Stethoscope } from "lucide-react";
import { submitLead } from "@/lib/leads-api";

const SITUATION_OPTIONS = [
  { id: "mat-goc", label: "Mất gốc / Hổng kiến thức" },
  { id: "dang-hoc", label: "Đang học IELTS" },
  { id: "sap-thi", label: "Sắp thi (cần bứt band)" },
  { id: "chua-biet", label: "Chưa biết bắt đầu từ đâu" },
] as const;

const TARGET_BANDS = ["5.0 - 5.5", "6.0 - 6.5", "7.0 - 7.5", "8.0+", "Chưa rõ mục tiêu"];
const DEADLINES = ["Dưới 3 tháng (Gấp)", "3 - 6 tháng", "6 - 12 tháng", "Thong thả"];
const LEARNING_MODES = ["Online", "Offline (tại Phú Nhuận)", "Lớp 1 Kèm 1"];
const TIME_SLOTS = ["Buổi sáng (9h - 12h)", "Buổi chiều (14h - 17h)", "Buổi tối (18h - 21h)"];

export function FinalCta() {
  const [situation, setSituation] = useState<string>("mat-goc");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Step 2 (Progressive profiling after initial submit or expanded)
  const [targetBand, setTargetBand] = useState(TARGET_BANDS[1]);
  const [deadline, setDeadline] = useState(DEADLINES[1]);
  const [learningMode, setLearningMode] = useState(LEARNING_MODES[0]);
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[2]);

  const [step, setStep] = useState<1 | 2>(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onInitialSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || submitting) return;

    setSubmitting(true);
    setSubmitError(null);

    const sitLabel = SITUATION_OPTIONS.find((s) => s.id === situation)?.label ?? situation;

    try {
      await submitLead({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        purpose: `Tình trạng: ${sitLabel}`,
        timeSlot: timeSlot,
        message: `Đăng ký Test Trình Độ & Chẩn Bệnh miễn phí. Tình trạng: ${sitLabel}.`,
      });
      // Move to step 2 for progressive profiling
      setStep(2);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Gửi đăng ký thất bại. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  const onFinalizeProfiling = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const sitLabel = SITUATION_OPTIONS.find((s) => s.id === situation)?.label ?? situation;
      await submitLead({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        purpose: `Target: ${targetBand} | Deadline: ${deadline} | Hình thức: ${learningMode}`,
        timeSlot: timeSlot,
        message: `Cập nhật hồ sơ: Tình trạng: ${sitLabel} | Target: ${targetBand} | Deadline: ${deadline} | Hình thức: ${learningMode} | Khung giờ tư vấn: ${timeSlot}.`,
      });
      setSubmitted(true);
    } catch {
      // Even if secondary update fails, user lead is already recorded
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="test-dau-vao" className="scroll-mt-20 bg-[var(--primary)] text-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Brand Message & Value Props */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-white ring-1 ring-white/25">
              <Stethoscope className="h-3.5 w-3.5 text-white" />
              Test 4 Kỹ Năng Miễn Phí
            </div>

            <h2 className="mt-5 font-heading text-3xl font-black uppercase tracking-tight sm:text-4xl lg:text-5xl leading-tight text-balance">
              Đăng ký Test trình độ & Nhận Bảng Chẩn Bệnh
            </h2>

            <p className="mt-5 text-base font-medium leading-relaxed text-white/90 sm:text-lg text-pretty">
              Giáo viên Xa Lộ English sẽ trực tiếp đánh giá năng lực 4 kỹ năng của bạn, chỉ rõ điểm nghẽn và tư vấn lộ trình chữa phù hợp nhất.
            </p>

            {/* Brand Message Chốt */}
            <div className="mt-8 rounded-[2rem] bg-white/10 p-6 backdrop-blur-md ring-1 ring-white/20">
              <p className="text-[11px] font-black uppercase tracking-widest text-white/80">
                Triết lý đào tạo XLE
              </p>
              <h3 className="mt-2 text-xl font-black uppercase tracking-tight text-white sm:text-2xl text-pretty">
                Học đúng cách khi hiểu đúng mình
              </h3>
              <p className="mt-1 text-sm font-extrabold text-white/80">
                Cùng Quy trình Chẩn – Chữa
              </p>
            </div>

            <ul className="mt-6 space-y-3 text-sm font-semibold text-white/90">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-white" />
                Miễn phí 100% bài kiểm tra và buổi phân tích năng lực
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-white" />
                Nhận Bảng Chẩn Bệnh (BCB) lưu trữ trọn đời
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-white" />
                Không ép buộc mua khóa học nếu chưa sẵn sàng
              </li>
            </ul>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-6">
            <div className="rounded-[2.5rem] bg-white p-6 text-[var(--foreground)] shadow-2xl ring-1 ring-black/10 sm:p-8 md:p-10">
              {submitted ? (
                <div className="py-8 text-center animate-in fade-in duration-500">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary)]/15 text-[var(--secondary)]">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="mt-4 text-2xl font-black text-[var(--foreground)]">
                    Đăng Ký Thành Công!
                  </h3>
                  <p className="mt-2 text-sm text-[var(--muted)] font-medium leading-relaxed">
                    Cảm ơn bạn <span className="font-bold text-[var(--foreground)]">{name}</span>. Đội ngũ học vụ XLE sẽ liên hệ với bạn trong khung giờ <span className="font-bold text-[var(--foreground)]">{timeSlot}</span> để gửi đề test và hẹn lịch Chẩn bệnh.
                  </p>
                  <div className="mt-6">
                    <Link
                      href="/quy-trinh"
                      className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--primary)] px-6 text-xs font-black uppercase tracking-wider text-white shadow-md hover:bg-[var(--secondary)]"
                    >
                      Tìm hiểu thêm về Quy trình Chẩn – Chữa
                    </Link>
                  </div>
                </div>
              ) : step === 1 ? (
                /* BƯỚC 1: FORM RÚT GỌN THEO BRIEF */
                <form onSubmit={onInitialSubmit} className="space-y-6">
                  <div>
                    <span className="text-xs font-black uppercase tracking-widest text-[var(--secondary)]">
                      Bước 1 / 2: Thông tin cơ bản
                    </span>
                    <h3 className="mt-1 text-2xl font-black text-[var(--foreground)]">
                      Bạn đang ở đâu trên hành trình?
                    </h3>
                  </div>

                  {/* Single Choice: Tình trạng */}
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {SITUATION_OPTIONS.map((opt) => (
                      <label
                        key={opt.id}
                        className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-3.5 text-xs font-bold transition-all ${
                          situation === opt.id
                            ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--secondary)] ring-2 ring-[var(--primary)]/30"
                            : "border-[var(--border)] bg-[var(--surface-1)] text-[var(--foreground)] hover:bg-white"
                        }`}
                      >
                        <input
                          type="radio"
                          name="situation"
                          value={opt.id}
                          checked={situation === opt.id}
                          onChange={() => setSituation(opt.id)}
                          className="h-4 w-4 text-[var(--primary)]"
                        />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>

                  {/* Name & Phone Inputs */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-[var(--muted)]">
                        Họ và tên <span className="text-[var(--secondary)]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nhập họ và tên của bạn"
                        className="mt-1.5 h-12 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-1)] px-4 text-sm font-semibold text-[var(--foreground)] outline-none focus:border-[var(--primary)] focus:bg-white focus:ring-2 focus:ring-[var(--primary)]/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-[var(--muted)]">
                        Số điện thoại / Zalo <span className="text-[var(--secondary)]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Số điện thoại nhận tư vấn & đề test"
                        className="mt-1.5 h-12 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-1)] px-4 text-sm font-semibold text-[var(--foreground)] outline-none focus:border-[var(--primary)] focus:bg-white focus:ring-2 focus:ring-[var(--primary)]/20"
                      />
                    </div>
                  </div>

                  {submitError && (
                    <p className="text-xs font-bold text-red-600">{submitError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex h-14 w-full items-center justify-center rounded-full bg-[var(--primary)] text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-[var(--primary)]/30 transition-all hover:bg-[var(--secondary)] disabled:opacity-50 cursor-pointer"
                  >
                    {submitting ? "Đang xử lý..." : "ĐĂNG KÝ TEST MIỄN PHÍ"}
                    <Send className="ml-2 h-4 w-4" />
                  </button>
                </form>
              ) : (
                /* BƯỚC 2: PROGRESSIVE PROFILING (MỤC TIÊU & THỜI GIAN) */
                <form onSubmit={onFinalizeProfiling} className="space-y-6 animate-in fade-in duration-300">
                  <div>
                    <span className="text-xs font-black uppercase tracking-widest text-[var(--secondary)]">
                      Bước 2 / 2: Cá nhân hoá lộ trình
                    </span>
                    <h3 className="mt-1 text-2xl font-black text-[var(--foreground)]">
                      Chi tiết mục tiêu của bạn
                    </h3>
                    <p className="text-xs text-[var(--muted)] font-medium">
                      Giúp XLE chuẩn bị đề test và giáo viên phù hợp nhất cho bạn.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-[var(--muted)]">
                        Mục tiêu Band IELTS
                      </label>
                      <select
                        value={targetBand}
                        onChange={(e) => setTargetBand(e.target.value)}
                        className="mt-1.5 h-12 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-1)] px-4 text-sm font-semibold text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
                      >
                        {TARGET_BANDS.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-[var(--muted)]">
                        Thời gian dự kiến thi / hoàn thành
                      </label>
                      <select
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="mt-1.5 h-12 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-1)] px-4 text-sm font-semibold text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
                      >
                        {DEADLINES.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-[var(--muted)]">
                        Khung giờ thuận tiện để nhận tư vấn
                      </label>
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="mt-1.5 h-12 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-1)] px-4 text-sm font-semibold text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
                      >
                        {TIME_SLOTS.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex h-14 flex-1 items-center justify-center rounded-full bg-[var(--primary)] text-xs font-black uppercase tracking-wider text-white shadow-md hover:bg-[var(--secondary)] cursor-pointer"
                    >
                      {submitting ? "Đang lưu..." : "HOÀN TẤT HỒ SƠ"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSubmitted(true)}
                      className="flex h-14 items-center justify-center rounded-full bg-[var(--surface-1)] px-6 text-xs font-bold text-[var(--muted)] hover:text-[var(--foreground)] cursor-pointer"
                    >
                      Bỏ qua
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

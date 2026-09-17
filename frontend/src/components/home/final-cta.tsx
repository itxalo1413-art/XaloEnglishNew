"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  CheckCircle2,
  ChevronRight,
  PhoneCall,
  Send,
  Sparkles,
  Stethoscope,
  MessageCircle,
} from "lucide-react";
import { submitLead } from "@/lib/leads-api";

const SITUATION_OPTIONS = [
  { id: "mat-goc", label: "Mất gốc" },
  { id: "dang-hoc", label: "Đang học IELTS" },
  { id: "sap-thi", label: "Sắp thi" },
  { id: "chua-biet", label: "Chưa biết" },
] as const;

const TARGET_BANDS = ["5.0 - 5.5", "6.0 - 6.5", "7.0 - 7.5", "8.0+", "Chưa rõ mục tiêu"];
const DEADLINES = ["Dưới 3 tháng (Gấp)", "3 - 6 tháng", "6 - 12 tháng", "Thong thả"];
const LEARNING_MODES = ["Online", "Offline (tại trung tâm)", "Lớp 1 Kèm 1"];
const TIME_SLOTS = ["Buổi sáng (9h - 12h)", "Buổi chiều (14h - 17h)", "Buổi tối (18h - 21h)"];

const ZALO_URL = "https://zalo.me/0786688149";
const HOTLINE_TEL = "tel:0786688149";

export function FinalCta() {
  const [situation, setSituation] = useState<string>("mat-goc");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Step 2: Progressive profiling
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
        purpose: `Tình trạng: ${sitLabel}`,
        timeSlot: timeSlot,
        message: `Đăng ký Test Đầu Vào miễn phí. Tình trạng: ${sitLabel}.`,
      });
      // Progressive profiling
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
        purpose: `Target: ${targetBand} | Deadline: ${deadline} | Hình thức: ${learningMode}`,
        timeSlot: timeSlot,
        message: `Cập nhật hồ sơ: Tình trạng: ${sitLabel} | Target: ${targetBand} | Deadline: ${deadline} | Hình thức: ${learningMode} | Khung giờ: ${timeSlot}.`,
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="test-dau-vao" className="scroll-mt-20 bg-[var(--primary)] text-white py-12 sm:py-16 border-t border-black/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Brand Message & Thông điệp chốt */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-white border border-white/25">
              <Stethoscope className="h-3.5 w-3.5 text-white" />
              CTA Form: TEST ĐẦU VÀO
            </div>

            <h2 className="mt-4 font-heading text-3xl font-black uppercase tracking-tight sm:text-4xl lg:text-5xl leading-tight text-balance">
              Đăng ký Test trình độ & Nhận Bảng Chẩn Bệnh
            </h2>

            <p className="mt-3 text-sm font-medium leading-relaxed text-white/90 sm:text-base text-pretty">
              Giáo viên Xa Lộ English sẽ trực tiếp đánh giá năng lực 4 kỹ năng của bạn, chỉ rõ điểm nghẽn và tư vấn lộ trình chữa phù hợp nhất.
            </p>

            {/* Brand Message Chốt Nhất Quán (Theo Brief Trang 9) */}
            <div className="mt-6 rounded-3xl bg-white/15 p-6 backdrop-blur-md border border-white/25 shadow-lg">
              <p className="text-[11px] font-black uppercase tracking-widest text-white/80">
                Thông điệp thương hiệu Xa Lộ English
              </p>
              <h3 className="mt-2 text-xl font-[900] uppercase tracking-tight text-white sm:text-2xl lg:text-3xl text-balance">
                HỌC ĐÚNG CÁCH KHI HIỂU ĐÚNG MÌNH
              </h3>
              <p className="mt-1 text-sm sm:text-base font-black uppercase tracking-wide text-white/90">
                CÙNG QUY TRÌNH CHẨN CHỮA
              </p>
            </div>

            {/* Fast Contact Options (Nhắn Zalo tư vấn / Gọi hotline) */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={ZALO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-xs font-black text-[#0068FF] shadow-sm transition hover:bg-slate-100 hover:shadow"
              >
                <MessageCircle className="h-4 w-4" />
                Nhắn Zalo tư vấn ngay
              </a>
              <a
                href={HOTLINE_TEL}
                className="inline-flex items-center gap-2 rounded-2xl bg-white/20 px-4 py-2.5 text-xs font-black text-white border border-white/30 transition hover:bg-white/30"
              >
                <PhoneCall className="h-4 w-4" />
                Hotline: 0786 688 149
              </a>
            </div>

            <ul className="mt-6 space-y-2.5 text-xs sm:text-sm font-semibold text-white/90">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-white shrink-0" />
                Miễn phí 100% bài kiểm tra và buổi phân tích năng lực
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-white shrink-0" />
                Nhận Bảng Chẩn Bệnh (BCB) lưu trữ trọn đời
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-white shrink-0" />
                Không ép buộc mua khóa học nếu chưa sẵn sàng
              </li>
            </ul>
          </div>

          {/* Right Column: Lead Form Bản Rút Gọn */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-white p-6 text-[var(--foreground)] shadow-2xl border border-black/5 sm:p-8">
              {submitted ? (
                <div className="py-8 text-center animate-in fade-in duration-500">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary)]/15 text-[var(--secondary)]">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 text-xl font-black text-[var(--foreground)]">
                    Đăng Ký Thành Công!
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[var(--muted)] font-medium leading-relaxed text-pretty">
                    Cảm ơn bạn <span className="font-bold text-[var(--foreground)]">{name}</span>. Đội ngũ học vụ XLE sẽ liên hệ với bạn trong khung giờ <span className="font-bold text-[var(--foreground)]">{timeSlot}</span> để gửi đề test và hẹn lịch Chẩn bệnh.
                  </p>
                  <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      href="/quy-trinh"
                      className="inline-flex h-11 items-center justify-center rounded-2xl bg-[var(--primary)] px-6 text-xs font-black uppercase tracking-wider text-white shadow-md hover:bg-[var(--secondary)]"
                    >
                      Tìm hiểu thêm về Quy trình
                    </Link>
                  </div>
                </div>
              ) : step === 1 ? (
                /* BƯỚC 1: FORM RÚT GỌN CHUẨN BRIEF TRANG 9 */
                <form onSubmit={onInitialSubmit} className="space-y-5">
                  <div>
                    <span className="text-xs font-black uppercase tracking-widest text-[var(--secondary)]">
                      Form Lead — Bản rút gọn
                    </span>
                    <h3 className="mt-1 text-xl font-black text-[var(--foreground)]">
                      Bạn đang ở đâu?
                    </h3>
                  </div>

                  {/* Single Choice: Tình trạng (Mất gốc / Đang học IELTS / Sắp thi / Chưa biết) */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {SITUATION_OPTIONS.map((opt) => (
                      <label
                        key={opt.id}
                        className={`flex cursor-pointer items-center gap-2.5 rounded-2xl border-2 p-3 text-xs font-extrabold transition-all ${
                          situation === opt.id
                            ? "border-[var(--secondary)] bg-[var(--primary)]/15 text-[var(--secondary)] shadow-xs"
                            : "border-[var(--border)] bg-[var(--surface-1)] text-[var(--foreground)] hover:bg-white hover:border-[var(--primary)]/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="situation"
                          value={opt.id}
                          checked={situation === opt.id}
                          onChange={() => setSituation(opt.id)}
                          className="h-3.5 w-3.5 text-[var(--secondary)]"
                        />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>

                  {/* Name & Phone Inputs (Bắt buộc) */}
                  <div className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-[var(--muted)]">
                        Họ và tên <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nhập họ và tên của bạn"
                        className="mt-1 h-12 w-full rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-1)] px-4 text-xs font-semibold text-[var(--foreground)] outline-none focus:border-[var(--primary)] focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-[var(--muted)]">
                        Số điện thoại <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Nhập số điện thoại nhận tư vấn & đề test"
                        className="mt-1 h-12 w-full rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-1)] px-4 text-xs font-semibold text-[var(--foreground)] outline-none focus:border-[var(--primary)] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  {submitError && (
                    <p className="text-xs font-bold text-red-600">{submitError}</p>
                  )}

                  {/* CTA Button: ĐĂNG KÝ TEST MIỄN PHÍ with animate-cta-pulse */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="animate-cta-pulse flex min-h-[50px] w-full items-center justify-center rounded-2xl bg-[var(--primary)] px-5 py-3 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-lg transition-all hover:bg-[var(--secondary)] disabled:opacity-50 cursor-pointer text-center"
                  >
                    {submitting ? "Đang xử lý..." : "ĐĂNG KÝ TEST MIỄN PHÍ"}
                    <Send className="ml-2 h-4 w-4 shrink-0" />
                  </button>
                </form>
              ) : (
                /* BƯỚC SAU SUBMIT: PROGRESSIVE PROFILING */
                <form onSubmit={onFinalizeProfiling} className="space-y-4 animate-in fade-in duration-300">
                  <div>
                    <span className="text-xs font-black uppercase tracking-widest text-[var(--secondary)]">
                      Bước sau submit: Progressive profiling
                    </span>
                    <h3 className="mt-1 text-xl font-black text-[var(--foreground)]">
                      Cá nhân hoá lộ trình của bạn
                    </h3>
                    <p className="text-xs text-[var(--muted)] font-medium">
                      Giúp giáo viên XLE chuẩn bị đề test sát nhất với mục tiêu của bạn.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[var(--muted)]">
                          Target Band mục tiêu
                        </label>
                        <select
                          value={targetBand}
                          onChange={(e) => setTargetBand(e.target.value)}
                          className="mt-1 h-11 w-full rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-1)] px-3 text-xs font-semibold text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
                        >
                          {TARGET_BANDS.map((b) => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[var(--muted)]">
                          Deadline mục tiêu
                        </label>
                        <select
                          value={deadline}
                          onChange={(e) => setDeadline(e.target.value)}
                          className="mt-1 h-11 w-full rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-1)] px-3 text-xs font-semibold text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
                        >
                          {DEADLINES.map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[var(--muted)]">
                          Hình thức học
                        </label>
                        <select
                          value={learningMode}
                          onChange={(e) => setLearningMode(e.target.value)}
                          className="mt-1 h-11 w-full rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-1)] px-3 text-xs font-semibold text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
                        >
                          {LEARNING_MODES.map((m) => (
                            <option key={m} value={m}>{m}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[var(--muted)]">
                          Khung giờ tư vấn
                        </label>
                        <select
                          value={timeSlot}
                          onChange={(e) => setTimeSlot(e.target.value)}
                          className="mt-1 h-11 w-full rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-1)] px-3 text-xs font-semibold text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
                        >
                          {TIME_SLOTS.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => setSubmitted(true)}
                      className="flex-1 h-11 rounded-2xl border border-black/10 text-xs font-bold text-[var(--muted)] hover:bg-slate-100 cursor-pointer"
                    >
                      Bỏ qua bước này
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 h-11 rounded-2xl bg-[var(--primary)] text-xs font-black uppercase tracking-wider text-white shadow-md hover:bg-[var(--secondary)] cursor-pointer"
                    >
                      {submitting ? "Đang lưu..." : "Hoàn tất hồ sơ"}
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

"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const PURPOSE_OPTIONS = [
  { id: "study-abroad", label: "Đi du học" },
  { id: "immigration", label: "Định cư nước ngoài" },
  { id: "university", label: "Đầu vào/ đầu ra đại học" },
  { id: "career", label: "Thăng tiến trong công việc" },
  { id: "passion", label: "Rất yêu thích tiếng Anh" },
  { id: "other", label: "Lí do khác" },
] as const;

const TIME_OPTIONS = [
  { id: "morning", label: "Buổi sáng (9 a.m. – 12 p.m.)" },
  { id: "afternoon", label: "Buổi chiều (12 p.m. – 6 p.m.)" },
  { id: "evening", label: "Buổi tối (6 p.m. – 11 p.m.)" },
] as const;

export function FinalCta() {
  const [purpose, setPurpose] = useState<string>("");
  const [purposeOther, setPurposeOther] = useState("");
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !purpose || !timeSlot) return;
    if (purpose === "other" && !purposeOther.trim()) return;

    const purposeLabel =
      purpose === "other"
        ? `Lí do khác: ${purposeOther.trim()}`
        : PURPOSE_OPTIONS.find((p) => p.id === purpose)?.label ?? purpose;
    const timeLabel = TIME_OPTIONS.find((t) => t.id === timeSlot)?.label ?? timeSlot;

    const subject = encodeURIComponent("Đăng ký tư vấn — Xa Lộ English (trang chủ)");
    const body = encodeURIComponent(
      `Mục đích học tiếng Anh/ IELTS: ${purposeLabel}\n` +
        `Khung giờ tư vấn mong muốn: ${timeLabel}\n` +
        `Tên: ${name.trim()}\n` +
        `Điện thoại: ${phone.trim()}\n` +
        `Email: ${email.trim() || "(chưa điền)"}\n`
    );
    window.location.href = `mailto:hello@xaloenglish.vn?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="relative bg-[var(--primary)] pb-0">
      {/* Background fill for the bottom diagonal reveal */}
      <div className="absolute inset-x-0 bottom-0 top-[80%] bg-[var(--background)]" />
      
      <section
        id="dang-ky-tu-van"
        className="relative scroll-mt-24 py-24 sm:py-36 overflow-hidden"
        style={{
          clipPath: "polygon(0 6vw, 100% 0, 100% calc(100% - 6vw), 0 100%)",
        }}
      >
        {/* Vibrant Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] via-[#5821a8] to-[var(--accent)]" />
        
        {/* Mesh glowing orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 top-0 h-[600px] w-[600px] rounded-full bg-[#f4b6cc] mix-blend-overlay blur-[120px] opacity-60" />
          <div className="absolute right-0 bottom-0 h-[800px] w-[800px] rounded-full bg-white mix-blend-overlay blur-[150px] opacity-40" />
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-md">Sẵn sàng bước tiếp?</h2>
            <p className="mx-auto mt-5 max-w-3xl text-sm font-semibold leading-relaxed text-white/90 sm:text-lg lg:mx-0 drop-shadow-sm">
              Điền form — chúng tôi tư vấn lộ trình phù hợp và giúp bạn Chẩn bệnh mượt mà.
            </p>
          </div>

          <div className="relative mt-12 sm:mt-16">
            <div className="pointer-events-none absolute -inset-6 rounded-[3.5rem] bg-black/20 blur-2xl opacity-40" />
            <form
              onSubmit={onSubmit}
              className="relative rounded-[2.5rem] bg-white/95 p-6 text-left text-[var(--foreground)] shadow-2xl ring-1 ring-white/50 backdrop-blur-3xl sm:p-8 lg:p-12 transition-all duration-500 hover:shadow-[0_20px_50px_rgb(0,0,0,0.3)] hover:-translate-y-1"
            >
              {/* Hàng 1: mục đích — chip ngang */}
              <fieldset>
                <legend className="mb-4 block text-sm font-extrabold uppercase tracking-widest text-[var(--muted)]">
                  Mục đích học tiếng Anh / IELTS
                </legend>
                <div className="flex flex-wrap gap-2.5">
                  {PURPOSE_OPTIONS.map((opt) => (
                    <label
                      key={opt.id}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-1)] px-5 py-3 text-sm font-bold transition-all duration-300 hover:border-[var(--primary)]/50 hover:bg-[var(--primary)]/5 hover:-translate-y-0.5 hover:shadow-md has-[:checked]:border-[var(--primary)] has-[:checked]:bg-[var(--primary)] has-[:checked]:text-white has-[:checked]:shadow-lg has-[:checked]:shadow-[var(--primary)]/30"
                    >
                      <input
                        type="radio"
                        name="purpose"
                        value={opt.id}
                        checked={purpose === opt.id}
                        onChange={() => setPurpose(opt.id)}
                        className="sr-only" // Hidden radio for cleaner look
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
                {purpose === "other" && (
                  <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="block max-w-3xl text-sm">
                      <span className="mb-2 block font-extrabold text-[var(--foreground)]">Mô tả lí do khác *</span>
                      <textarea
                        value={purposeOther}
                        onChange={(e) => setPurposeOther(e.target.value)}
                        required={purpose === "other"}
                        rows={2}
                        className="w-full rounded-2xl border border-[var(--border)] bg-white px-5 py-4 text-base font-medium text-[var(--foreground)] shadow-sm outline-none transition-all duration-300 focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10"
                        placeholder="Nhập lí do của bạn"
                      />
                    </label>
                  </div>
                )}
              </fieldset>

              {/* Hàng 2: khung giờ — ba ô ngang (md+) */}
              <fieldset className="mt-8 border-t border-black/5 pt-8">
                <legend className="mb-4 block text-sm font-extrabold uppercase tracking-widest text-[var(--muted)]">
                  Khung thời gian mong muốn tư vấn
                </legend>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {TIME_OPTIONS.map((opt) => (
                    <label
                      key={opt.id}
                      className="flex min-h-[4rem] cursor-pointer items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface-1)] px-5 py-3 text-sm font-bold transition-all duration-300 hover:border-[var(--primary)]/50 hover:bg-[var(--primary)]/5 hover:-translate-y-0.5 hover:shadow-md has-[:checked]:border-[var(--primary)] has-[:checked]:bg-[var(--primary)] has-[:checked]:text-white has-[:checked]:shadow-lg has-[:checked]:shadow-[var(--primary)]/30"
                    >
                      <input
                        type="radio"
                        name="timeSlot"
                        value={opt.id}
                        checked={timeSlot === opt.id}
                        onChange={() => setTimeSlot(opt.id)}
                        className="sr-only" // Hidden radio
                      />
                      <span className="min-w-0 leading-snug">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Hàng 3: Tên | Điện thoại | Email ngang */}
              <div className="mt-8 grid grid-cols-1 gap-5 border-t border-black/5 pt-8 sm:grid-cols-3">
                <label className="block text-sm">
                  <span className="mb-2 block font-extrabold text-[var(--foreground)]">Tên *</span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                    className="h-14 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-1)] px-5 text-base font-medium text-[var(--foreground)] shadow-sm outline-none transition-all duration-300 focus:bg-white focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10"
                    placeholder="Tên của bạn"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-2 block font-extrabold text-[var(--foreground)]">Điện thoại *</span>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    className="h-14 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-1)] px-5 text-base font-medium text-[var(--foreground)] shadow-sm outline-none transition-all duration-300 focus:bg-white focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10"
                    placeholder="Số điện thoại liên hệ"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-2 block font-extrabold text-[var(--foreground)]">Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    className="h-14 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-1)] px-5 text-base font-medium text-[var(--foreground)] shadow-sm outline-none transition-all duration-300 focus:bg-white focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10"
                    placeholder="Địa chỉ Email"
                  />
                </label>
              </div>

              {/* Hàng 4: nút ngang */}
              <div className="mt-10 flex flex-col gap-4 border-t border-black/5 pt-10 sm:flex-row sm:flex-wrap sm:items-center">
                <button
                  type="submit"
                  className="group inline-flex h-16 min-w-[220px] flex-1 items-center justify-center rounded-full bg-[var(--primary)] px-8 text-sm font-extrabold text-[var(--on-primary)] shadow-xl shadow-[var(--primary)]/20 uppercase tracking-widest transition-all duration-500 hover:-translate-y-1 hover:bg-[var(--primary-hover)] hover:shadow-2xl hover:shadow-[var(--primary)]/40 sm:flex-none"
                >
                  Gửi đăng ký tư vấn
                  <svg className="ml-3 h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <Link
                  href="/lien-he"
                  className="inline-flex h-16 min-w-[220px] flex-1 items-center justify-center rounded-full bg-[var(--surface-1)] px-8 text-center text-sm font-extrabold text-[var(--foreground)] shadow-sm uppercase tracking-widest transition-all duration-300 hover:bg-white hover:text-[var(--primary)] hover:shadow-md ring-1 ring-inset ring-[var(--border)] sm:flex-none"
                >
                  Làm test đầu vào
                </Link>
              </div>

              {submitted && (
                <div className="mt-8 rounded-2xl bg-[var(--primary)]/5 p-4 text-center">
                  <p className="text-sm font-bold text-[var(--primary)]">
                    Cảm ơn bạn! Ứng dụng thư đã mở với nội dung đăng ký — chỉ cần bấm gửi email.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

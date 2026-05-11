"use client";

import { FormEvent, useState } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type QuickChoice = {
  label: string;
  goal: string;
  level: string;
};

const quickChoices: QuickChoice[] = [
  {
    label: "Học giao tiếp",
    goal: "Tôi muốn học giao tiếp và phản xạ tốt hơn.",
    level: "Cơ bản, cần luyện phản xạ nghe-nói.",
  },
  {
    label: "Mất gốc",
    goal: "Tôi muốn lấy lại nền tảng tiếng Anh từ gốc.",
    level: "Mất gốc một phần, chưa có lộ trình.",
  },
  {
    label: "Luyện thi",
    goal: "Tôi muốn luyện thi (IELTS/THPT) theo mục tiêu rõ ràng.",
    level: "Đang học nhưng chưa lên điểm ổn định.",
  },
];

export default function LienHePage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [goal, setGoal] = useState("");
  const [level, setLevel] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const applyQuickChoice = (item: QuickChoice) => {
    setGoal(item.goal);
    setLevel(item.level);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) return;

    const subject = encodeURIComponent("Đăng ký tư vấn lộ trình học - Xa Lộ English");
    const body = encodeURIComponent(
      `Họ tên: ${fullName}\nSĐT: ${phone}\nMục tiêu học: ${goal || "(chưa điền)"}\nTrình độ hiện tại: ${
        level || "(chưa điền)"
      }\n`
    );
    window.location.href = `mailto:hello@xaloenglish.vn?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* HERO */}
        <section className="border-b border-[var(--border)] bg-[var(--background)] py-16 sm:py-20">
          <div className="mx-auto max-w-8xl px-4 sm:px-6">
            <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
              Nhận tư vấn lộ trình học phù hợp với bạn
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              Không spam — Không ràng buộc — Miễn phí
            </p>
          </div>
        </section>

        {/* FORM */}
        <section className="border-b border-[var(--border)] bg-[var(--background)] py-12 sm:py-16">
          <div className="mx-auto max-w-8xl px-4 sm:px-6">
            <h2 className="text-xl font-semibold text-[var(--foreground)]">Form đăng ký tư vấn</h2>
            <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
              <form onSubmit={onSubmit} className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-6">
                <div className="grid gap-4">
                  <label className="text-sm">
                    <span className="mb-2 block font-medium text-[var(--foreground)]">Họ tên *</span>
                    <input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 text-[var(--foreground)] outline-none focus:border-[var(--border-strong)]"
                      placeholder="Nhập họ tên"
                    />
                  </label>

                  <label className="text-sm">
                    <span className="mb-2 block font-medium text-[var(--foreground)]">SĐT *</span>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 text-[var(--foreground)] outline-none focus:border-[var(--border-strong)]"
                      placeholder="Nhập số điện thoại"
                    />
                  </label>

                  <label className="text-sm">
                    <span className="mb-2 block font-medium text-[var(--foreground)]">Mục tiêu học (optional)</span>
                    <textarea
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      rows={3}
                      className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)] outline-none focus:border-[var(--border-strong)]"
                      placeholder="Ví dụ: IELTS 6.5, giao tiếp công việc..."
                    />
                  </label>

                  <label className="text-sm">
                    <span className="mb-2 block font-medium text-[var(--foreground)]">Trình độ hiện tại (optional)</span>
                    <textarea
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                      rows={3}
                      className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)] outline-none focus:border-[var(--border-strong)]"
                      placeholder="Ví dụ: mất gốc, đang ở band 4.5..."
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  className="mt-5 inline-flex h-12 items-center justify-center rounded-sm bg-[var(--primary)] px-8 text-base font-semibold text-[var(--on-primary)] shadow transition-colors hover:bg-[var(--secondary)]"
                >
                  Nhận tư vấn ngay
                </button>

                {submitted && (
                  <p className="mt-3 text-sm text-[var(--muted)]">
                    Cảm ơn bạn! Hệ thống đã mở email với nội dung đăng ký.
                  </p>
                )}
              </form>

              {/* QUICK CHOICE */}
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-6">
                <h3 className="text-base font-semibold text-[var(--foreground)]">Tôi muốn:</h3>
                <div className="mt-4 space-y-3">
                  {quickChoices.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => applyQuickChoice(item)}
                      className="w-full rounded-sm border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-left text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--border-strong)]"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <p className="mt-4 text-xs text-[var(--muted)]">
                  Click 1 lựa chọn để tự động điền mục tiêu + trình độ hiện tại vào form.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST / CAM KẾT */}
        <section className="border-b border-[var(--border)] bg-[var(--background)] py-10">
          <div className="mx-auto grid max-w-8xl gap-4 px-4 sm:grid-cols-3 sm:px-6">
            {[
              "Không spam",
              "Tư vấn trong 5–10 phút",
              "Cá nhân hoá theo từng người",
            ].map((item) => (
              <div
                key={item}
                className="rounded-sm border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-sm font-medium text-[var(--foreground)]"
              >
                ✔ {item}
              </div>
            ))}
          </div>
        </section>

        {/* SOCIAL PROOF */}
        <section className="border-b border-[var(--border)] bg-[var(--background)] py-12 sm:py-16">
          <div className="mx-auto max-w-8xl px-4 sm:px-6">
            <h2 className="text-xl font-semibold text-[var(--foreground)]">Social Proof</h2>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-6">
                <p className="text-sm leading-relaxed text-[var(--muted)]">
                  “Trước đây học lan man, sau khi tư vấn mình hiểu rõ cần sửa gì trước nên học đỡ mơ hồ hơn.”
                </p>
                <p className="mt-3 text-xs font-medium text-[var(--foreground)]">— Sinh viên năm 2</p>
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-6">
                <p className="text-sm leading-relaxed text-[var(--muted)]">
                  Case mẫu: từ nền tảng chưa vững lên mục tiêu rõ ràng sau lộ trình cá nhân hoá.
                </p>
                <p className="mt-3 text-xs font-medium text-[var(--foreground)]">— Kết quả thực tế (minh hoạ)</p>
              </div>
            </div>
          </div>
        </section>

        {/* ALTERNATIVE CONTACT */}
        <section className="bg-[var(--background)] py-12 sm:py-16">
          <div className="mx-auto max-w-8xl px-4 sm:px-6">
            <h2 className="text-xl font-semibold text-[var(--foreground)]">Liên hệ nhanh</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <a
                href="tel:0xxxxxxxxx"
                className="rounded-sm border border-[var(--border)] bg-[var(--surface-2)] px-4 py-4 text-sm font-medium text-[var(--foreground)] hover:border-[var(--border-strong)]"
              >
                Hotline: 0xxxxxxxxx
              </a>
              <a
                href="https://m.me/"
                target="_blank"
                rel="noreferrer"
                className="rounded-sm border border-[var(--border)] bg-[var(--surface-2)] px-4 py-4 text-sm font-medium text-[var(--foreground)] hover:border-[var(--border-strong)]"
              >
                Messenger (placeholder)
              </a>
              <a
                href="https://zalo.me/"
                target="_blank"
                rel="noreferrer"
                className="rounded-sm border border-[var(--border)] bg-[var(--surface-2)] px-4 py-4 text-sm font-medium text-[var(--foreground)] hover:border-[var(--border-strong)]"
              >
                Zalo (placeholder)
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}


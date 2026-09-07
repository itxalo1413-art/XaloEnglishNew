"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { fetchAvailableAcaSchedules, AcaSchedule } from "@/lib/schedules-api";
import { submitLead } from "@/lib/leads-api";
import { Calendar, Clock, Video, MapPin, User, Phone, Mail, MessageSquare } from "lucide-react";

export default function SpeakingTestBookingPage() {
  const [loading, setLoading] = useState(true);
  const [slots, setSlots] = useState<AcaSchedule[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Selection states
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlotId, setSelectedSlotId] = useState<string>("");

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [bookedDetails, setBookedDetails] = useState<{
    date: string;
    time: string;
    type: string;
    acaName?: string;
  } | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await fetchAvailableAcaSchedules();
        if (!alive) return;
        setSlots(data);
        if (data.length > 0) {
          // Pre-select first date
          const dates = Array.from(new Set(data.map((s) => s.date))).sort();
          if (dates.length > 0) {
            setSelectedDate(dates[0]);
          }
        }
      } catch (err) {
        if (!alive) return;
        setError(err instanceof Error ? err.message : "Không thể tải lịch test.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Group slots by date
  const dateMap = useMemo(() => {
    const map: Record<string, AcaSchedule[]> = {};
    for (const slot of slots) {
      if (!map[slot.date]) {
        map[slot.date] = [];
      }
      map[slot.date].push(slot);
    }
    return map;
  }, [slots]);

  // Unique sorted dates
  const availableDates = useMemo(() => {
    return Object.keys(dateMap).sort();
  }, [dateMap]);

  // Slots for currently selected date
  const slotsForSelectedDate = useMemo(() => {
    if (!selectedDate) return [];
    return dateMap[selectedDate] || [];
  }, [selectedDate, dateMap]);

  // Formatting date helper
  const formatDateLabel = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'numeric', day: 'numeric' };
      return d.toLocaleDateString("vi-VN", options);
    } catch {
      return dateStr;
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !selectedSlotId || submitting) return;

    const chosenSlot = slots.find((s) => s._id === selectedSlotId);
    if (!chosenSlot) return;

    setSubmitting(true);
    setError(null);
    try {
      await submitLead({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        purpose: `Đăng ký test Speaking 1-on-1 [${chosenSlot.type === "test_speaking_offline" ? "Offline" : "Online"}]`,
        message: message.trim() || "Đăng ký từ trang đặt lịch Test Speaking.",
        acaScheduleId: chosenSlot._id,
      });

      setBookedDetails({
        date: chosenSlot.date,
        time: `${chosenSlot.startTime} - ${chosenSlot.endTime}`,
        type: chosenSlot.type === "test_speaking_offline" ? "Trực tiếp tại cơ sở" : "Trực tuyến qua Zoom/Meet",
        acaName: chosenSlot.acaName,
      });

      setSubmitSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đăng ký lịch test thất bại. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-[var(--background)] py-14 sm:py-20 font-sans">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          
          {/* Header Description */}
          <div className="text-center mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[var(--primary)] bg-[var(--primary)]/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
              Chẩn Bệnh IELTS 1-ON-1
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-5xl">
              Đăng ký Test Speaking 1-kèm-1
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-base text-[var(--muted)] leading-relaxed">
              Trải nghiệm bài test Speaking chuẩn format IELTS và nhận đánh giá chi tiết 4 tiêu chí chấm thi trực tiếp cùng đội ngũ Academic Coordinators tại Xa Lộ English.
            </p>
          </div>

          {submitSuccess && bookedDetails ? (
            /* Success Screen */
            <div className="rounded-[2.5rem] bg-white border border-[var(--border)] p-8 text-center shadow-2xl animate-in fade-in zoom-in duration-500 max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-extrabold text-[var(--foreground)]">Đăng ký thành công!</h2>
              <p className="mt-2 text-[var(--muted)]">Hệ thống đã khóa ca trực này dành riêng cho bạn.</p>

              <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-6 text-left space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-[var(--primary)] shrink-0" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Ngày test</p>
                    <p className="font-extrabold text-[var(--foreground)]">{formatDateLabel(bookedDetails.date)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 border-t border-black/5 pt-3">
                  <Clock className="h-5 w-5 text-[var(--primary)] shrink-0" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Khung giờ</p>
                    <p className="font-extrabold text-[var(--foreground)]">{bookedDetails.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 border-t border-black/5 pt-3">
                  {bookedDetails.type.includes("Trực tuyến") ? (
                    <Video className="h-5 w-5 text-pink-600 shrink-0" />
                  ) : (
                    <MapPin className="h-5 w-5 text-blue-600 shrink-0" />
                  )}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Hình thức</p>
                    <p className="font-extrabold text-[var(--foreground)]">{bookedDetails.type}</p>
                  </div>
                </div>
                {bookedDetails.acaName && (
                  <div className="flex items-center gap-3 border-t border-black/5 pt-3">
                    <User className="h-5 w-5 text-[var(--primary)] shrink-0" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Giáo viên phụ trách</p>
                      <p className="font-extrabold text-[var(--foreground)]">{bookedDetails.acaName}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8">
                <p className="text-sm text-[var(--muted)] mb-6">
                  Chúng tôi sẽ liên hệ Zalo hoặc số điện thoại của bạn trong vòng 24h để xác nhận và gửi link phòng test trước giờ hẹn.
                </p>
                <Link
                  href="/"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--primary)] px-8 text-sm font-bold text-[var(--on-primary)] transition hover:opacity-90 shadow-md"
                >
                  Quay lại Trang chủ
                </Link>
              </div>
            </div>
          ) : (
            /* Booking Flow Form */
            <div className="space-y-8">
              {error && (
                <div className="rounded-2xl bg-red-50 border border-red-200 p-4 text-center">
                  <p className="text-sm font-bold text-red-700">{error}</p>
                </div>
              )}

              {loading ? (
                <div className="text-center py-16">
                  <div className="animate-pulse flex flex-col items-center">
                    <div className="h-10 w-10 bg-[var(--primary)]/20 rounded-full mb-3" />
                    <p className="text-sm text-[var(--muted)]">Đang tải lịch rảnh của ACA…</p>
                  </div>
                </div>
              ) : slots.length === 0 ? (
                <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-2)] p-12 text-center">
                  <p className="text-lg font-bold text-[var(--foreground)]">Hiện tại chưa có ca trực Speaking khả dụng</p>
                  <p className="mt-2 text-sm text-[var(--muted)] max-w-md mx-auto">
                    Vui lòng quay lại sau, hoặc bạn có thể liên hệ trực tiếp để được hỗ trợ sắp xếp lịch test nhanh nhất.
                  </p>
                  <Link
                    href="/lien-he"
                    className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-[var(--primary)] px-8 text-sm font-bold text-[var(--on-primary)] transition hover:opacity-90 shadow-sm"
                  >
                    Đến trang liên hệ
                  </Link>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-8">
                  {/* Step 1: Chọn ngày */}
                  <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-extrabold text-[var(--foreground)] flex items-center gap-2 mb-4">
                      <Calendar className="h-5 w-5 text-[var(--primary)]" />
                      1. Chọn ngày kiểm tra
                    </h2>
                    <div className="flex gap-2 overflow-x-auto pb-3 -mx-2 px-2 [scrollbar-width:thin] focus:outline-none">
                      {availableDates.map((dateStr) => {
                        const count = dateMap[dateStr].length;
                        const active = selectedDate === dateStr;
                        return (
                          <button
                            key={dateStr}
                            type="button"
                            onClick={() => {
                              setSelectedDate(dateStr);
                              setSelectedSlotId(""); // Reset slot selection on date change
                            }}
                            className={`flex flex-col items-center min-w-[120px] rounded-2xl border px-4 py-3.5 transition-all focus:outline-none ${
                              active
                                ? "bg-[var(--primary)] border-[var(--primary)] text-white shadow-md shadow-[var(--primary)]/20 -translate-y-0.5"
                                : "bg-[var(--surface-2)] border-[var(--border)] text-[var(--foreground)] hover:border-[var(--primary)]/50"
                            }`}
                          >
                            <span className="text-[11px] font-bold uppercase tracking-wider opacity-85">
                              {new Date(dateStr).toLocaleDateString("vi-VN", { weekday: 'short' })}
                            </span>
                            <span className="text-lg font-black mt-1">
                              {new Date(dateStr).toLocaleDateString("vi-VN", { day: 'numeric', month: 'numeric' })}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-2.5 ${
                              active ? "bg-white/20 text-white" : "bg-black/5 text-[var(--muted)]"
                            }`}>
                              {count} ca trống
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Chọn ca */}
                  {selectedDate && (
                    <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
                      <h2 className="text-lg font-extrabold text-[var(--foreground)] flex items-center gap-2 mb-4">
                        <Clock className="h-5 w-5 text-[var(--primary)]" />
                        2. Chọn ca trực khả dụng
                      </h2>
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {slotsForSelectedDate.map((slot) => {
                          const active = selectedSlotId === slot._id;
                          const isOffline = slot.type === "test_speaking_offline";
                          
                          // Styling tokens based on type
                          const slotBgColor = isOffline ? "#d0e1fd" : "#eed2e2";
                          const slotTextColor = isOffline ? "#1e3a8a" : "#831843";

                          return (
                            <button
                              key={slot._id}
                              type="button"
                              onClick={() => setSelectedSlotId(slot._id)}
                              className={`rounded-2xl border text-left p-4.5 transition-all flex flex-col justify-between min-h-[100px] relative focus:outline-none ${
                                active
                                  ? "ring-2 ring-[var(--primary)] border-transparent shadow-lg -translate-y-0.5"
                                  : "border-[var(--border)] hover:border-black/20"
                              }`}
                              style={{
                                backgroundColor: active ? undefined : slotBgColor,
                              }}
                            >
                              <div>
                                <span 
                                  className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full inline-block border border-black/10"
                                  style={{ color: slotTextColor }}
                                >
                                  {isOffline ? "Offline tại CS" : "Online"}
                                </span>
                                <p className="text-lg font-black mt-2 text-slate-900">
                                  {slot.startTime} - {slot.endTime}
                                </p>
                              </div>
                              <div className="mt-3 flex items-center justify-between border-t border-black/5 pt-2">
                                <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  {slot.acaName || "ACA"}
                                </span>
                                {active && (
                                  <span className="w-2.5 h-2.5 bg-[var(--primary)] rounded-full animate-ping" />
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Thông tin cá nhân */}
                  {selectedSlotId && (
                    <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
                      <h2 className="text-lg font-extrabold text-[var(--foreground)] flex items-center gap-2 mb-6">
                        <User className="h-5 w-5 text-[var(--primary)]" />
                        3. Nhập thông tin liên hệ
                      </h2>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <label className="block text-sm">
                          <span className="mb-2 block font-extrabold text-[var(--foreground)] flex items-center gap-1.5">
                            <User className="h-4 w-4 text-[var(--muted)]" /> Họ tên *
                          </span>
                          <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 text-sm font-medium text-[var(--foreground)] outline-none focus:bg-white focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10 transition"
                            placeholder="Họ tên của bạn"
                          />
                        </label>
                        <label className="block text-sm">
                          <span className="mb-2 block font-extrabold text-[var(--foreground)] flex items-center gap-1.5">
                            <Phone className="h-4 w-4 text-[var(--muted)]" /> Điện thoại *
                          </span>
                          <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            type="tel"
                            className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 text-sm font-medium text-[var(--foreground)] outline-none focus:bg-white focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10 transition"
                            placeholder="Số điện thoại Zalo liên hệ"
                          />
                        </label>
                        <label className="block text-sm sm:col-span-2">
                          <span className="mb-2 block font-extrabold text-[var(--foreground)] flex items-center gap-1.5">
                            <Mail className="h-4 w-4 text-[var(--muted)]" /> Email (không bắt buộc)
                          </span>
                          <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 text-sm font-medium text-[var(--foreground)] outline-none focus:bg-white focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10 transition"
                            placeholder="Địa chỉ Email"
                          />
                        </label>
                        <label className="block text-sm sm:col-span-2">
                          <span className="mb-2 block font-extrabold text-[var(--foreground)] flex items-center gap-1.5">
                            <MessageSquare className="h-4 w-4 text-[var(--muted)]" /> Ghi chú hoặc mức band IELTS hiện tại
                          </span>
                          <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={3}
                            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-sm font-medium text-[var(--foreground)] outline-none focus:bg-white focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary)]/10 transition"
                            placeholder="Nhập ghi chú hoặc band điểm mục tiêu của bạn"
                          />
                        </label>
                      </div>

                      <div className="mt-8 border-t border-black/5 pt-6 flex justify-end">
                        <button
                          type="submit"
                          disabled={submitting}
                          className="h-14 min-w-[200px] w-full sm:w-auto rounded-full bg-[var(--primary)] px-8 text-sm font-black text-[var(--on-primary)] shadow-lg shadow-[var(--primary)]/20 uppercase tracking-wider transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[var(--primary)]/30 disabled:opacity-60"
                        >
                          {submitting ? "Đang đăng ký lịch..." : "Xác nhận Đặt lịch"}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              )}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

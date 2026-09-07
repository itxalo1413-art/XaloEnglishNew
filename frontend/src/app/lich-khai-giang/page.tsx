"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { BelowFold, DeferredFinalCta } from "@/lib/deferred-public";

type ProgramGroup = "ieltsOnline" | "ieltsOffline" | "special";

type Schedule = {
  id: string;
  /** Tên lớp hiển thị (đúng danh mục bạn cung cấp) */
  className: string;
  filterKey: string;
  filterLabel: string;
  delivery: "ONLINE" | "OFFLINE";
  programGroup: ProgramGroup;
  entry?: string;
  target?: string;
  /** Khung giờ 1:1 theo bảng (Trước 18h / Sau 18h) */
  oneToOneSlot?: "Trước 18h" | "Sau 18h";
  audience: "HS" | "SV";
  timeSlot: "Sáng" | "Chiều" | "Tối";
  startDate: string;
  studyDays: string;
  studyTime: string;
  seatsLeft: number;
  shortDesc: string;
  fitFor: string;
  // This helps the user know where to map their images when they upload them later
  imagePlaceholder?: string; 
};

const schedules: Schedule[] = [
  // —— ONLINE IELTS (8 lộ trình) ——
  {
    id: "on-pre-ielts",
    className: "PRE - IELTS",
    filterKey: "on-pre-ielts",
    filterLabel: "PRE - IELTS · ONLINE",
    delivery: "ONLINE",
    programGroup: "ieltsOnline",
    audience: "SV",
    timeSlot: "Tối",
    startDate: "2026-04-18",
    studyDays: "T3 - T5 - CN",
    studyTime: "19:30 - 21:00",
    seatsLeft: 9,
    shortDesc: "Nền IELTS: từ vựng – ngữ pháp – đọc hiểu nền, đi theo BCB/RLP.",
    fitFor: "Các bạn chưa từng dùng tiếng Anh hoặc chỉ biết một vài từ tiếng Anh riêng lẻ.",
  },
  {
    id: "on-pre-core",
    className: "PRE - CORE",
    filterKey: "on-pre-core",
    filterLabel: "PRE - CORE · ONLINE",
    delivery: "ONLINE",
    programGroup: "ieltsOnline",
    audience: "SV",
    timeSlot: "Tối",
    startDate: "2026-04-21",
    studyDays: "T2 - T4 - T6",
    studyTime: "19:00 - 20:30",
    seatsLeft: 8,
    shortDesc: "Củng cố nền và xử lý lỗi nặng trước khi vào CORE.",
    fitFor:
      "Các bạn dùng được tiếng Anh ở mức cơ bản, trong nhiều tình huống quen thuộc nhưng còn mắc nhiều lỗi nghiêm trọng.",
  },
  {
    id: "on-core",
    className: "CORE",
    filterKey: "on-core",
    filterLabel: "CORE · ONLINE",
    delivery: "ONLINE",
    programGroup: "ieltsOnline",
    audience: "SV",
    timeSlot: "Tối",
    startDate: "2026-04-25",
    studyDays: "T2 - T4 - T6",
    studyTime: "20:00 - 21:30",
    seatsLeft: 5,
    shortDesc: "Tăng điểm theo nhóm lỗi, bám sát tiêu chí IELTS.",
    fitFor:
      "Các bạn sử dụng được tiếng Anh ở mức trung bình - khá, trong nhiều tình huống (bao gồm cả phức tạp) nhưng còn mắc nhiều lỗi không nghiêm trọng.",
  },
  {
    id: "on-upstream",
    className: "UPSTREAM",
    filterKey: "on-upstream",
    filterLabel: "UPSTREAM · ONLINE",
    delivery: "ONLINE",
    programGroup: "ieltsOnline",
    audience: "SV",
    timeSlot: "Tối",
    startDate: "2026-04-29",
    studyDays: "T3 - T5 - T7",
    studyTime: "20:00 - 21:30",
    seatsLeft: 4,
    shortDesc: "Tối ưu độ chính xác, mạch lạc và tự nhiên trong output.",
    fitFor:
      "Các bạn dùng tiếng Anh ở mức khá và tốt. Dùng được trong nhiều tình huống, từ đơn giản đến phức tạp nhưng đôi khi hiểu nhầm hoặc mắc lỗi ngữ cảnh, không tự nhiên.",
  },
  {
    id: "on-soar",
    className: "SOAR",
    filterKey: "on-soar",
    filterLabel: "SOAR · ONLINE",
    delivery: "ONLINE",
    programGroup: "ieltsOnline",
    audience: "SV",
    timeSlot: "Tối",
    startDate: "2026-05-03",
    studyDays: "T2 - T4 - T6",
    studyTime: "20:15 - 21:45",
    seatsLeft: 3,
    shortDesc: "Bứt tốc band cao: tinh chỉnh theo tiêu chí và giảm lỗi tinh vi.",
    fitFor:
      "Các bạn dùng tiếng Anh khá – tốt và muốn lên mức tự nhiên/chuẩn xác hơn: giảm lỗi tinh vi, tăng độ mạch lạc, phù hợp mục tiêu band cao.",
  },
  // —— OFFLINE IELTS (3 lộ trình) ——
  {
    id: "off-foundation",
    className: "FOUNDATION",
    filterKey: "off-foundation",
    filterLabel: "FOUNDATION · OFFLINE",
    delivery: "OFFLINE",
    programGroup: "ieltsOffline",
    audience: "HS",
    timeSlot: "Chiều",
    startDate: "2026-04-22",
    studyDays: "T2 - T4 - T6",
    studyTime: "16:00 - 17:30",
    seatsLeft: 7,
    shortDesc: "Chắc nền tại trung tâm: đọc hiểu – ngữ pháp – từ vựng học thuật.",
    fitFor:
      "Các bạn dùng được tiếng Anh ở mức cơ bản, trong nhiều tình huống quen thuộc nhưng còn mắc nhiều lỗi nghiêm trọng.",
  },
  {
    id: "off-momentum",
    className: "MOMENTUM",
    filterKey: "off-momentum",
    filterLabel: "MOMENTUM · OFFLINE",
    delivery: "OFFLINE",
    programGroup: "ieltsOffline",
    audience: "HS",
    timeSlot: "Chiều",
    startDate: "2026-04-30",
    studyDays: "T3 - T5 - T7",
    studyTime: "16:30 - 18:00",
    seatsLeft: 6,
    shortDesc: "Tăng tốc theo chặng, nâng độ ổn định trước kỳ thi.",
    fitFor:
      "Các bạn sử dụng được tiếng Anh ở mức trung bình - khá, trong nhiều tình huống (bao gồm cả phức tạp) nhưng còn mắc nhiều lỗi không nghiêm trọng.",
  },
  {
    id: "off-advanced",
    className: "ADVANCED",
    filterKey: "off-advanced",
    filterLabel: "ADVANCED · OFFLINE",
    delivery: "OFFLINE",
    programGroup: "ieltsOffline",
    audience: "SV",
    timeSlot: "Tối",
    startDate: "2026-05-05",
    studyDays: "T3 - T5 - T7",
    studyTime: "19:00 - 20:30",
    seatsLeft: 3,
    shortDesc: "Nâng band theo tiêu chí, xử lý lỗi nâng cao tại trung tâm.",
    fitFor:
      "Các bạn dùng tiếng Anh ở mức khá và tốt. Dùng được trong nhiều tình huống, từ đơn giản đến phức tạp nhưng đôi khi hiểu nhầm hoặc mắc lỗi ngữ cảnh, không tự nhiên.",
  },
  // —— Luyện đề ——
  {
    id: "luyen-de-on",
    className: "LUYỆN ĐỀ",
    filterKey: "luyen-de-on",
    filterLabel: "LUYỆN ĐỀ · ONLINE",
    delivery: "ONLINE",
    programGroup: "special",
    audience: "SV",
    timeSlot: "Tối",
    startDate: "2026-04-26",
    studyDays: "T2 - T4 - T6",
    studyTime: "20:30 - 22:00",
    seatsLeft: 10,
    shortDesc: "Luyện đề có hướng dẫn, chấm/chữa theo tiêu chí, bám mục tiêu thi.",
    fitFor: "Đã đạt IELTS 4.5+ và cần luyện đề theo nhịp thi thật.",
  },
  {
    id: "luyen-de-off",
    className: "LUYỆN ĐỀ",
    filterKey: "luyen-de-off",
    filterLabel: "LUYỆN ĐỀ · OFFLINE",
    delivery: "OFFLINE",
    programGroup: "special",
    audience: "SV",
    timeSlot: "Chiều",
    startDate: "2026-04-27",
    studyDays: "T3 - T5 - T7",
    studyTime: "15:30 - 17:00",
    seatsLeft: 8,
    shortDesc: "Luyện đề tại trung tâm, phản hồi chi tiết theo từng buổi.",
    fitFor: "Đã đạt IELTS 4.5+ và muốn luyện đề có giám sát tại lớp.",
  },
  // —— Combo 2 khoá (theo bảng Đầu vào / Đầu ra) ——
  ...(
    [
      { id: "c2-on-025-6", delivery: "ONLINE" as const, entry: "0-2.5", target: "6" },
      { id: "c2-on-34-6", delivery: "ONLINE" as const, entry: "3.0-4.0", target: "6" },
      { id: "c2-on-455-7", delivery: "ONLINE" as const, entry: "4.5-5.5", target: "7" },
      { id: "c2-on-025-7", delivery: "ONLINE" as const, entry: "0-2.5", target: "7" },
      { id: "c2-on-34-7", delivery: "ONLINE" as const, entry: "3.0-4.0", target: "7" },
      { id: "c2-off-025-6", delivery: "OFFLINE" as const, entry: "0-2.5", target: "6" },
      { id: "c2-off-34-6", delivery: "OFFLINE" as const, entry: "3.0-4.0", target: "6" },
      { id: "c2-off-455-7", delivery: "OFFLINE" as const, entry: "4.5-5.5", target: "7" },
      { id: "c2-off-025-7", delivery: "OFFLINE" as const, entry: "0-2.5", target: "7" },
      { id: "c2-off-34-7", delivery: "OFFLINE" as const, entry: "3.0-4.0", target: "7" },
    ] as const
  ).map((r) => {
    const filterKey = `combo2-${r.delivery.toLowerCase()}-${r.entry}-${r.target}`;
    return {
      id: r.id,
      className: "Combo 2 khoá",
      filterKey,
      filterLabel: `Combo 2 khoá · ${r.delivery} · ${r.entry} → ${r.target}`,
      delivery: r.delivery,
      programGroup: "special" as const,
      entry: r.entry,
      target: r.target,
      audience: "SV" as const,
      timeSlot: "Chiều" as const,
      startDate: "2026-04-28",
      studyDays: "T2 - T4 - T6",
      studyTime: "17:30 - 19:00",
      seatsLeft: 8,
      shortDesc: `Combo 2 khoá — Đầu vào ${r.entry} → Đầu ra ${r.target} (${r.delivery}).`,
      fitFor: `Phù hợp khi bạn xác định rõ đầu vào ${r.entry} và mục tiêu ${r.target}, muốn tối ưu lộ trình theo combo.`,
    } satisfies Schedule;
  }),
  // —— Combo 3 khoá (cùng bảng điều kiện) ——
  ...(
    [
      { id: "c3-on-025-6", delivery: "ONLINE" as const, entry: "0-2.5", target: "6" },
      { id: "c3-on-34-6", delivery: "ONLINE" as const, entry: "3.0-4.0", target: "6" },
      { id: "c3-on-455-7", delivery: "ONLINE" as const, entry: "4.5-5.5", target: "7" },
      { id: "c3-on-025-7", delivery: "ONLINE" as const, entry: "0-2.5", target: "7" },
      { id: "c3-on-34-7", delivery: "ONLINE" as const, entry: "3.0-4.0", target: "7" },
      { id: "c3-off-025-6", delivery: "OFFLINE" as const, entry: "0-2.5", target: "6" },
      { id: "c3-off-34-6", delivery: "OFFLINE" as const, entry: "3.0-4.0", target: "6" },
      { id: "c3-off-455-7", delivery: "OFFLINE" as const, entry: "4.5-5.5", target: "7" },
      { id: "c3-off-025-7", delivery: "OFFLINE" as const, entry: "0-2.5", target: "7" },
      { id: "c3-off-34-7", delivery: "OFFLINE" as const, entry: "3.0-4.0", target: "7" },
    ] as const
  ).map((r) => {
    const filterKey = `combo3-${r.delivery.toLowerCase()}-${r.entry}-${r.target}`;
    return {
      id: r.id,
      className: "Combo 3 khoá",
      filterKey,
      filterLabel: `Combo 3 khoá · ${r.delivery} · ${r.entry} → ${r.target}`,
      delivery: r.delivery,
      programGroup: "special" as const,
      entry: r.entry,
      target: r.target,
      audience: "SV" as const,
      timeSlot: "Tối" as const,
      startDate: "2026-05-01",
      studyDays: "T3 - T5 - T7",
      studyTime: "19:30 - 21:00",
      seatsLeft: 6,
      shortDesc: `Combo 3 khoá — Đầu vào ${r.entry} → Đầu ra ${r.target} (${r.delivery}).`,
      fitFor: `Phù hợp khi bạn muốn đi combo dài hơn, xác định đầu vào ${r.entry} và mục tiêu ${r.target}.`,
    } satisfies Schedule;
  }),
  // —— Lớp 1 kèm 1 (ONLINE/OFFLINE × Trước 18h / Sau 18h) ——
  ...(
    [
      { id: "11-on-before", delivery: "ONLINE" as const, oneToOneSlot: "Trước 18h" as const, timeSlot: "Chiều" as const, studyTime: "15:00 - 17:30" },
      { id: "11-on-after", delivery: "ONLINE" as const, oneToOneSlot: "Sau 18h" as const, timeSlot: "Tối" as const, studyTime: "18:30 - 21:00" },
      { id: "11-off-before", delivery: "OFFLINE" as const, oneToOneSlot: "Trước 18h" as const, timeSlot: "Chiều" as const, studyTime: "15:00 - 17:30" },
      { id: "11-off-after", delivery: "OFFLINE" as const, oneToOneSlot: "Sau 18h" as const, timeSlot: "Tối" as const, studyTime: "18:30 - 21:00" },
    ] as const
  ).map((r) => ({
    id: r.id,
    className: "Lớp 1 kèm 1",
    filterKey: `11-${r.delivery.toLowerCase()}-${r.oneToOneSlot === "Trước 18h" ? "before" : "after"}`,
    filterLabel: `Lớp 1 kèm 1 · ${r.delivery} · ${r.oneToOneSlot}`,
    delivery: r.delivery,
    programGroup: "special" as const,
    oneToOneSlot: r.oneToOneSlot,
    audience: "SV" as const,
    timeSlot: r.timeSlot,
    startDate: "2026-04-19",
    studyDays: "Theo lịch hẹn",
    studyTime: r.studyTime,
    seatsLeft: 2,
    shortDesc: `1 kèm 1 (${r.delivery}) — khung ${r.oneToOneSlot}.`,
    fitFor: "Cần lịch linh hoạt và xử lý điểm nghẽn theo BCB/RLP.",
  } satisfies Schedule)),
];

export default function LichKhaiGiangPage() {
  const [groupFilter, setGroupFilter] = useState<"all" | ProgramGroup>("all");
  const [programFilter, setProgramFilter] = useState<"all" | string>("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedClass, setSelectedClass] = useState<Schedule | null>(null);

  const filteredSchedules = useMemo(() => {
    const now = new Date("2026-04-01");
    return schedules.filter((row) => {
      const matchGroup = groupFilter === "all" || row.programGroup === groupFilter;
      const matchProgram = programFilter === "all" || row.filterKey === programFilter;
      const matchTime = timeFilter === "all" || row.timeSlot === timeFilter;
      const rowDate = new Date(row.startDate);
      const diffDays = (rowDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
      const matchDate =
        dateFilter === "all" ||
        (dateFilter === "7" && diffDays <= 7) ||
        (dateFilter === "30" && diffDays <= 30);
      return matchGroup && matchProgram && matchTime && matchDate;
    });
  }, [groupFilter, programFilter, timeFilter, dateFilter]);

  const classOptionsForGroup = useMemo(() => {
    const rows =
      groupFilter === "all"
        ? schedules
        : groupFilter === "special"
          ? schedules.filter((s) => s.programGroup === "special")
          : schedules.filter((s) => s.programGroup === groupFilter);
    const map = new Map<string, { key: string; label: string }>();
    for (const s of rows) {
      if (!map.has(s.filterKey)) map.set(s.filterKey, { key: s.filterKey, label: s.filterLabel });
    }
    return Array.from(map.values()).sort((a, b) => a.label.localeCompare(b.label, "vi"));
  }, [groupFilter]);

  // Reset program filter when switching group to avoid empty result traps.
  const handleGroupFilterChange = (value: typeof groupFilter) => {
    setGroupFilter(value);
    setProgramFilter("all");
  };

  return (
    <>
      <SiteHeader />
      <main className="flex-1 overflow-hidden bg-[var(--background)]">
        {/* HERO */}
        <section className="relative overflow-hidden py-16 sm:py-24">
          <div className="pointer-events-none absolute inset-0 bg-[var(--primary)]/5" />
          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h1 className="text-4xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
              Lịch khai giảng
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
              Cập nhật các lớp học mới nhất tại Xa Lộ English. Chọn chủ đề và thời gian phù hợp để bắt đầu hành trình của bạn.
            </p>
          </div>
        </section>

        {/* FILTER BAR (match khoa-hoc field style) */}
        <section className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6">
          <div className="rounded-[2rem] bg-black/5 p-3 sm:p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <label className="group flex items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-[var(--primary)]/25">
                  <span className="shrink-0 text-xs font-extrabold uppercase tracking-widest text-[var(--muted)]">
                    Nhóm
                  </span>
                  <select
                    value={groupFilter}
                    onChange={(e) => handleGroupFilterChange(e.target.value as typeof groupFilter)}
                    className="h-10 w-full bg-transparent text-right text-sm font-extrabold text-[var(--foreground)] outline-none"
                    aria-label="Filter nhóm chương trình"
                  >
                    <option value="all">Tất cả</option>
                    <option value="ieltsOnline">ONLINE (nhóm IELTS)</option>
                    <option value="ieltsOffline">OFFLINE (tại trung tâm)</option>
                    <option value="special">Luyện đề · Combo · 1 kèm 1</option>
                  </select>
                </label>

                <label className="group flex items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-[var(--primary)]/25">
                  <span className="shrink-0 text-xs font-extrabold uppercase tracking-widest text-[var(--muted)]">
                    Tên lớp
                  </span>
                  <select
                    value={programFilter}
                    onChange={(e) => setProgramFilter(e.target.value)}
                    className="h-10 w-full bg-transparent text-right text-sm font-extrabold text-[var(--foreground)] outline-none"
                    aria-label="Filter tên lớp"
                  >
                    <option value="all">Tất cả</option>
                    {classOptionsForGroup.map((p) => (
                      <option key={p.key} value={p.key}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="group flex items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-[var(--primary)]/25">
                  <span className="shrink-0 text-xs font-extrabold uppercase tracking-widest text-[var(--muted)]">
                    Ca học
                  </span>
                  <select
                    value={timeFilter}
                    onChange={(e) => setTimeFilter(e.target.value)}
                    className="h-10 w-full bg-transparent text-right text-sm font-extrabold text-[var(--foreground)] outline-none"
                    aria-label="Filter ca học"
                  >
                    <option value="all">Tất cả</option>
                    <option value="Sáng">Sáng</option>
                    <option value="Chiều">Chiều</option>
                    <option value="Tối">Tối</option>
                  </select>
                </label>

                <label className="group flex items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-[var(--primary)]/25">
                  <span className="shrink-0 text-xs font-extrabold uppercase tracking-widest text-[var(--muted)]">
                    Khai giảng trong vòng
                  </span>
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="h-10 w-full bg-transparent text-right text-sm font-extrabold text-[var(--foreground)] outline-none"
                    aria-label="Filter thời điểm"
                  >
                    <option value="all">Tất cả</option>
                    <option value="7">7 ngày</option>
                    <option value="30">30 ngày</option>
                  </select>
                </label>
              </div>

              {(groupFilter !== "all" ||
                programFilter !== "all" ||
                timeFilter !== "all" ||
                dateFilter !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setGroupFilter("all");
                    setProgramFilter("all");
                    setTimeFilter("all");
                    setDateFilter("all");
                  }}
                  className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-2xl bg-white px-6 text-sm font-extrabold text-[var(--foreground)] shadow-sm ring-1 ring-black/5 hover:bg-black/5"
                >
                  Xoá filter
                </button>
              )}
            </div>
          </div>
        </section>

        {/* IMAGE-BASED SCHEDULE GRID */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="mb-10 text-2xl font-extrabold text-[var(--foreground)] sm:text-3xl">Danh sách lớp học</h2>
            
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
              {filteredSchedules.map((row) => (
                <div key={row.id} className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-white text-[var(--foreground)] shadow-xl shadow-black/5 ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/10">
                  
                  {/* IMAGE BANNER PLACEHOLDER - Thay ảnh bìa vào đây */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--surface-1)]">
                    {row.imagePlaceholder ? (
                      <Image src={row.imagePlaceholder} alt={row.className} fill loading="lazy" sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[var(--surface-1)] p-6 text-center text-sm text-[var(--muted)] transition-transform duration-700 group-hover:scale-105">
                        <p>
                          <svg className="mx-auto mb-2 h-8 w-8 text-[var(--muted)]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Khu vực hiển thị ảnh Graphic KH<br/>(User sẽ upload sau)
                        </p>
                      </div>
                    )}
                    {/* Floating Badges */}
                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-black backdrop-blur-md text-[var(--primary)] shadow-sm">
                        {row.timeSlot}
                      </span>
                      <span className="rounded-full bg-white/85 px-3 py-1.5 text-xs font-black backdrop-blur-md text-[var(--foreground)] shadow-sm ring-1 ring-black/5">
                        {row.delivery}
                      </span>
                      <span className="rounded-full bg-white/85 px-3 py-1.5 text-xs font-black backdrop-blur-md text-[var(--foreground)] shadow-sm ring-1 ring-black/5">
                        {row.className}
                      </span>
                      <span className="rounded-full bg-[var(--accent)]/90 px-3 py-1.5 text-xs font-black text-white backdrop-blur-md shadow-sm">
                        Chỉ còn {row.seatsLeft} chỗ
                      </span>
                    </div>
                  </div>

                  {/* INFO CONTENT */}
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <h3 className="text-xl font-bold leading-snug text-[var(--foreground)] transition-colors group-hover:text-[var(--primary)]">
                      {row.className}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-[var(--muted)]">
                      {row.delivery}
                      {row.entry && row.target ? ` · Đầu vào ${row.entry} → Đầu ra ${row.target}` : ""}
                      {row.oneToOneSlot ? ` · ${row.oneToOneSlot}` : ""}
                    </p>
                    
                    <ul className="mt-5 mb-8 space-y-2.5 flex-1 text-sm text-[var(--muted)]">
                      <li className="flex items-baseline justify-between gap-3">
                        <span className="font-semibold">Khai giảng</span>
                        <strong className="text-[var(--foreground)]">{row.startDate}</strong>
                      </li>
                      <li className="flex items-baseline justify-between gap-3">
                        <span className="font-semibold">Lịch học</span>
                        <strong className="text-right text-[var(--foreground)]">
                          {row.studyDays} • {row.studyTime}
                        </strong>
                      </li>
                      <li className="flex items-baseline justify-between gap-3">
                        <span className="font-semibold">Đối tượng</span>
                        <strong className="text-[var(--foreground)]">{row.audience}</strong>
                      </li>
                    </ul>

                    <div className="mt-auto grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setSelectedClass(row)}
                        className="rounded-full bg-[var(--surface-1)] py-3.5 text-xs font-bold text-[var(--foreground)] transition-colors hover:bg-[var(--secondary)]/20 hover:text-[var(--primary)]"
                      >
                        Thông tin
                      </button>
                      <a
                        href={`mailto:hello@xaloenglish.vn?subject=${encodeURIComponent(`Đăng ký: ${row.filterLabel}`)}`}
                        className="flex items-center justify-center rounded-full bg-[var(--primary)] py-3.5 text-xs font-bold text-[var(--on-primary)] shadow-md shadow-[var(--primary)]/20 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[var(--primary)]/30"
                      >
                        Đăng ký
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredSchedules.length === 0 && (
              <div className="flex w-full flex-col items-center justify-center rounded-[2rem] bg-white py-20 text-center shadow-xl shadow-black/5 ring-1 ring-black/5">
                <span className="text-4xl">😔</span>
                <p className="mt-4 text-base font-semibold text-[var(--muted)]">Chưa có lớp phù hợp với bộ lọc hiện tại.</p>
                <button
                  onClick={() => {
                    setGroupFilter("all");
                    setProgramFilter("all");
                    setTimeFilter("all");
                    setDateFilter("all");
                  }}
                  className="mt-4 text-sm font-bold text-[var(--primary)] hover:underline"
                >
                  Xoá bộ lọc
                </button>
              </div>
            )}
          </div>
        </section>

        {/* TRUST STRIP - PREMIUM */}
        <section className="bg-[var(--surface-1)] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { title: "Sĩ số nhỏ", desc: "Tối đa 12 học viên mỗi lớp" },
                { title: "Cá nhân hóa", desc: "Lộ trình may đo theo trình độ" },
                { title: "Theo sát", desc: "Cập nhật tiến độ theo mốc" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col items-center rounded-3xl bg-white p-8 text-center shadow-lg shadow-black/5 transition-all hover:-translate-y-1"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)]/10 text-xl text-[var(--accent)]">
                    ✓
                  </div>
                  <h4 className="text-lg font-bold text-[var(--foreground)]">{item.title}</h4>
                  <p className="mt-2 text-sm text-[var(--muted)]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <BelowFold minHeight={360}>
          <DeferredFinalCta />
        </BelowFold>
      </main>
      <SiteFooter />

      {/* QUICK COURSE INFO POPUP */}
      {selectedClass && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[var(--background)]/80 backdrop-blur-sm p-4 transition-opacity">
          <div className="w-full max-w-lg overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-black/5 transition-all">
            <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-5">
              <h3 className="text-lg font-extrabold text-[var(--foreground)]">Chi tiết lớp học</h3>
              <button
                type="button"
                onClick={() => setSelectedClass(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--surface-1)] text-[var(--muted)] transition-colors hover:bg-black/5 hover:text-black"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <h4 className="text-xl font-bold text-[var(--primary)]">{selectedClass.className}</h4>
              <p className="mt-2 text-xs font-extrabold uppercase tracking-widest text-[var(--muted)]">
                {selectedClass.filterLabel}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{selectedClass.shortDesc}</p>
              
              <div className="mt-6 rounded-2xl bg-[var(--primary)]/5 p-5">
                <p className="text-sm font-semibold text-[var(--foreground)]">🎯 Phù hợp với ai?</p>
                <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">{selectedClass.fitFor}</p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setSelectedClass(null)}
                  className="order-2 flex h-12 flex-1 items-center justify-center rounded-full bg-[var(--surface-1)] text-sm font-bold text-[var(--foreground)] hover:bg-[var(--surface-2)] sm:order-1"
                >
                  Đóng
                </button>
                <a
                  href={`mailto:hello@xaloenglish.vn?subject=Đăng%20ký%20lớp%20Xalo%20English`}
                  className="order-1 flex h-12 flex-1 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-bold text-[var(--on-primary)] shadow-lg shadow-[var(--primary)]/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[var(--primary)]/30 sm:order-2"
                >
                  Đăng ký ngay
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

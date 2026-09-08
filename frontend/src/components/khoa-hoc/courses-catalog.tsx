"use client";

import { Fragment, useMemo, useState } from "react";
import Link from "next/link";
import type { CourseMode, CourseCatalogItem } from "./courses-catalog-data";
import { comboProgramRows, courseCatalog, courseScheduleRows, examPractice, oneToOnePricingRows } from "./courses-catalog-data";

function normBand(s: string) {
  return s.replaceAll(" ", "").trim();
}

function ModeToggle({ mode, setMode }: { mode: CourseMode; setMode: (m: CourseMode) => void }) {
  return (
    <div className="inline-flex w-full sm:w-auto rounded-[2rem] bg-black/5 p-1.5">
      <button
        type="button"
        onClick={() => setMode("online")}
        className={`flex-1 sm:flex-none inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-extrabold transition-all ${
          mode === "online" ? "bg-white text-[var(--primary)] shadow-sm ring-1 ring-black/5" : "text-[var(--muted)] hover:text-[var(--foreground)]"
        }`}
        aria-pressed={mode === "online"}
      >
        ONLINE
      </button>
      <button
        type="button"
        onClick={() => setMode("offline")}
        className={`flex-1 sm:flex-none inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-extrabold transition-all ${
          mode === "offline" ? "bg-white text-[var(--primary)] shadow-sm ring-1 ring-black/5" : "text-[var(--muted)] hover:text-[var(--foreground)]"
        }`}
        aria-pressed={mode === "offline"}
      >
        OFFLINE
      </button>
    </div>
  );
}

function CatalogCard({ item }: { item: CourseCatalogItem }) {
  return (
    <div className="group relative flex flex-col rounded-[2rem] bg-white p-7 shadow-lg shadow-black/5 ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10">
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full bg-[var(--primary)]/10 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[var(--primary)]">
          {item.mode === "online" ? "Online" : "Offline"}
        </span>
      </div>

      <h3 className="mt-5 text-xl font-extrabold text-[var(--foreground)] transition-colors group-hover:text-[var(--primary)]">
        {item.title}
      </h3>
      {item.note && <p className="mt-2 text-sm font-medium text-[var(--muted)]">{item.note}</p>}

      <ul className="mt-5 space-y-2 text-sm font-medium text-[var(--muted)]">
        {item.highlights.map((h) => (
          <li key={h} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary)]" aria-hidden />
            <span className="leading-relaxed">{h}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between">
        <Link
          href="/lien-he"
          className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--primary)] px-6 text-sm font-extrabold text-[var(--on-primary)] transition-opacity hover:opacity-90"
        >
          Nhận tư vấn
        </Link>
        <Link href="/quy-trinh" className="text-sm font-bold text-[var(--primary)] hover:opacity-90">
          Quy trình →
        </Link>
      </div>
    </div>
  );
}

function OfflineScheduleTable() {
  const onlineRows = courseScheduleRows.filter((r) => r.mode === "online");
  const offlineRows = courseScheduleRows.filter((r) => r.mode === "offline");
  return (
    <div className="mt-10 overflow-hidden rounded-[2rem] bg-white shadow-lg shadow-black/5 ring-1 ring-black/5">
      <div className="flex flex-col gap-3 border-b border-black/5 p-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-widest text-[var(--primary)]">Thông tin lớp</p>
          <h3 className="mt-2 text-2xl font-extrabold text-[var(--foreground)] sm:text-3xl">
            Đầu vào - đầu ra - sĩ số - thời lượng - đối tượng
          </h3>
          <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-[var(--muted)] sm:text-base">
            Band/level chỉ là điều kiện tổ chức; lộ trình thực tế vẫn theo BCB và RLP cá nhân. (Không hiển thị học phí.)
          </p>
        </div>
        <Link
          href="/lien-he"
          className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full bg-[var(--surface-1)] px-6 text-sm font-extrabold text-[var(--foreground)] ring-1 ring-inset ring-[var(--border)] hover:bg-[var(--secondary)]/10 hover:text-[var(--primary)]"
        >
          Hỏi lớp phù hợp
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[1080px] w-full border-collapse text-left">
          <thead className="bg-[var(--surface-1)]">
            <tr>
              <th className="p-5 text-sm font-black text-[var(--foreground)]">Khoá</th>
              <th className="p-5 text-sm font-black text-[var(--foreground)]">Đầu vào</th>
              <th className="p-5 text-sm font-black text-[var(--foreground)]">Đầu ra</th>
              <th className="p-5 text-sm font-black text-[var(--foreground)]">Sĩ số</th>
              <th className="p-5 text-sm font-black text-[var(--foreground)]">Thời lượng</th>
              <th className="p-5 text-sm font-black text-[var(--foreground)]">Phù hợp với</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {[
              { label: "ONLINE", rows: onlineRows },
              { label: "OFFLINE", rows: offlineRows },
            ].map((group) => (
              <Fragment key={group.label}>
                <tr className="bg-[var(--surface-1)]">
                  <td className="p-5 text-xs font-extrabold uppercase tracking-widest text-[var(--muted)]" colSpan={6}>
                    {group.label}
                  </td>
                </tr>
                {group.rows.map((row) => (
                  <tr key={row.id} className="align-top hover:bg-[var(--surface-1)]/60 transition-colors">
                    <td className="p-5 text-sm font-extrabold text-[var(--foreground)] whitespace-nowrap">{row.courseTitle}</td>
                    <td className="p-5 text-sm font-semibold text-[var(--foreground)] whitespace-nowrap">{row.entry}</td>
                    <td className="p-5 text-sm font-semibold text-[var(--foreground)] whitespace-nowrap">{row.target}</td>
                    <td className="p-5 text-sm font-extrabold text-[var(--foreground)] whitespace-nowrap">{row.classSize}</td>
                    <td className="p-5">
                      <p className="whitespace-pre-line text-sm font-semibold leading-relaxed text-[var(--foreground)]">
                        {row.duration}
                      </p>
                    </td>
                    <td className="p-5">
                      <p className="text-sm font-medium leading-relaxed text-[var(--muted)]">{row.audience}</p>
                    </td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function CoursesCatalogSection() {
  const [mode, setMode] = useState<CourseMode>("offline");
  const [entryFilter, setEntryFilter] = useState<string>(""); // normalized value
  const [targetFilter, setTargetFilter] = useState<string>(""); // normalized value
  const [includeComboMatches, setIncludeComboMatches] = useState(true);

  const scheduleById = useMemo(() => new Map(courseScheduleRows.map((r) => [r.id, r])), []);

  const entryOptions = useMemo(() => {
    const map = new Map<string, string>();
    for (const r of courseScheduleRows) map.set(normBand(r.entry), r.entry);
    for (const r of comboProgramRows) map.set(normBand(r.entry), r.entry);
    return Array.from(map.entries()).map(([value, label]) => ({ value, label }));
  }, []);

  const targetOptions = useMemo(() => {
    const map = new Map<string, string>();
    for (const r of courseScheduleRows) map.set(normBand(r.target), r.target);
    for (const r of comboProgramRows) map.set(normBand(r.target), r.target);
    return Array.from(map.entries()).map(([value, label]) => ({ value, label }));
  }, []);

  const items = useMemo(() => {
    return courseCatalog.filter((c) => {
      if (c.mode !== mode) return false;
      const row = scheduleById.get(c.id);
      if (!row) return false;
      if (entryFilter && normBand(row.entry) !== entryFilter) return false;
      if (targetFilter && normBand(row.target) !== targetFilter) return false;
      return true;
    });
  }, [entryFilter, mode, scheduleById, targetFilter]);

  const filteredRows = useMemo(() => {
    return courseScheduleRows.filter((r) => {
      if (entryFilter && normBand(r.entry) !== entryFilter) return false;
      if (targetFilter && normBand(r.target) !== targetFilter) return false;
      return true;
    });
  }, [entryFilter, targetFilter]);

  const filteredComboRows = useMemo(() => {
    const base = comboProgramRows;
    if (!includeComboMatches) return base;
    if (!entryFilter && !targetFilter) return base;
    return base.filter((r) => {
      if (entryFilter && normBand(r.entry) !== entryFilter) return false;
      if (targetFilter && normBand(r.target) !== targetFilter) return false;
      return true;
    });
  }, [entryFilter, targetFilter]);

  return (
    <section className="bg-[var(--surface-1)] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-sm font-extrabold uppercase tracking-widest text-[var(--primary)]">Danh mục khóa</h2>
            <h3 className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl">
              Chọn Online / Offline theo nhu cầu
            </h3>
            <p className="mt-4 text-base font-medium leading-relaxed text-[var(--muted)] sm:text-lg">
              Dù học Online hay Offline, bạn vẫn được đi theo quy trình Chẩn - Chữa: BCB để “thấy lỗi”, RLP để “biết bước tiếp theo”, và theo dõi tiến độ theo từng chặng.
            </p>
          </div>
          <ModeToggle mode={mode} setMode={setMode} />
        </div>

        <div className="mt-8 rounded-[2rem] bg-black/5 p-3 sm:p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="group flex items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-[var(--primary)]/25">
                <span className="shrink-0 text-xs font-extrabold uppercase tracking-widest text-[var(--muted)]">
                  Đầu vào
                </span>
                <select
                  value={entryFilter}
                  onChange={(e) => setEntryFilter(e.target.value)}
                  className="h-10 w-full bg-transparent text-right text-sm font-extrabold text-[var(--foreground)] outline-none"
                  aria-label="Filter đầu vào"
                >
                  <option value="">Tất cả</option>
                  {entryOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="group flex items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-[var(--primary)]/25">
                <span className="shrink-0 text-xs font-extrabold uppercase tracking-widest text-[var(--muted)]">
                  Đầu ra
                </span>
                <select
                  value={targetFilter}
                  onChange={(e) => setTargetFilter(e.target.value)}
                  className="h-10 w-full bg-transparent text-right text-sm font-extrabold text-[var(--foreground)] outline-none"
                  aria-label="Filter đầu ra"
                >
                  <option value="">Tất cả</option>
                  {targetOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="flex items-center gap-3">
              <label className="hidden sm:flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-black/5">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-[var(--primary)]"
                  checked={includeComboMatches}
                  onChange={(e) => setIncludeComboMatches(e.target.checked)}
                />
                <span className="text-xs font-extrabold uppercase tracking-widest text-[var(--muted)]">
                  Lọc combo theo điều kiện
                </span>
              </label>
              {(entryFilter || targetFilter) && (
                <button
                  type="button"
                  onClick={() => {
                    setEntryFilter("");
                    setTargetFilter("");
                  }}
                  className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-2xl bg-white px-6 text-sm font-extrabold text-[var(--foreground)] shadow-sm ring-1 ring-black/5 hover:bg-black/5"
                >
                  Xoá filter
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <CatalogCard key={item.id} item={item} />
          ))}
        </div>

        {/* Table respects entry/target filters (online + offline) */}
        <div className="mt-12">
          <div className="rounded-[2rem] bg-white shadow-lg shadow-black/5 ring-1 ring-black/5 overflow-hidden">
            <div className="flex flex-col gap-3 border-b border-black/5 p-7 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-widest text-[var(--primary)]">Thông tin lớp</p>
                <h3 className="mt-2 text-2xl font-extrabold text-[var(--foreground)] sm:text-3xl">
                  Đầu vào - đầu ra - sĩ số - thời lượng - đối tượng
                </h3>
                <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-[var(--muted)] sm:text-base">
                  Band/level chỉ là điều kiện tổ chức; lộ trình thực tế vẫn theo BCB và RLP cá nhân. (Không hiển thị học phí.)
                </p>
              </div>
              <Link
                href="/lien-he"
                className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full bg-[var(--surface-1)] px-6 text-sm font-extrabold text-[var(--foreground)] ring-1 ring-inset ring-[var(--border)] hover:bg-[var(--secondary)]/10 hover:text-[var(--primary)]"
              >
                Hỏi lớp phù hợp
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-[1080px] w-full border-collapse text-left">
                <thead className="bg-[var(--surface-1)]">
                  <tr>
                    <th className="p-5 text-sm font-black text-[var(--foreground)]">Khoá</th>
                    <th className="p-5 text-sm font-black text-[var(--foreground)]">Đầu vào</th>
                    <th className="p-5 text-sm font-black text-[var(--foreground)]">Đầu ra</th>
                    <th className="p-5 text-sm font-black text-[var(--foreground)]">Sĩ số</th>
                    <th className="p-5 text-sm font-black text-[var(--foreground)]">Thời lượng</th>
                    <th className="p-5 text-sm font-black text-[var(--foreground)]">Phù hợp với</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {filteredRows.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-6 text-sm font-semibold text-[var(--muted)]">
                        Không có khóa phù hợp với filter hiện tại.
                      </td>
                    </tr>
                  ) : (
                    [
                      { label: "ONLINE", rows: filteredRows.filter((r) => r.mode === "online") },
                      { label: "OFFLINE", rows: filteredRows.filter((r) => r.mode === "offline") },
                    ]
                      .filter((g) => g.rows.length > 0)
                      .map((group) => (
                        <Fragment key={group.label}>
                          <tr className="bg-[var(--surface-1)]">
                            <td className="p-5 text-xs font-extrabold uppercase tracking-widest text-[var(--muted)]" colSpan={6}>
                              {group.label}
                            </td>
                          </tr>
                          {group.rows.map((row) => (
                            <tr key={row.id} className="align-top hover:bg-[var(--surface-1)]/60 transition-colors">
                              <td className="p-5 text-sm font-extrabold text-[var(--foreground)] whitespace-nowrap">{row.courseTitle}</td>
                              <td className="p-5 text-sm font-semibold text-[var(--foreground)] whitespace-nowrap">{row.entry}</td>
                              <td className="p-5 text-sm font-semibold text-[var(--foreground)] whitespace-nowrap">{row.target}</td>
                              <td className="p-5 text-sm font-extrabold text-[var(--foreground)] whitespace-nowrap">{row.classSize}</td>
                              <td className="p-5">
                                <p className="whitespace-pre-line text-sm font-semibold leading-relaxed text-[var(--foreground)]">
                                  {row.duration}
                                </p>
                              </td>
                              <td className="p-5">
                                <p className="text-sm font-medium leading-relaxed text-[var(--muted)]">{row.audience}</p>
                              </td>
                            </tr>
                          ))}
                        </Fragment>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Combo programs */}
        <div className="mt-10 overflow-hidden rounded-[2rem] bg-white shadow-lg shadow-black/5 ring-1 ring-black/5">
          <div className="border-b border-black/5 p-7">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[var(--primary)]">Combo</p>
            <h3 className="mt-2 text-2xl font-extrabold text-[var(--foreground)] sm:text-3xl">
              Đầu vào - đầu ra - thời gian học tối thiểu
            </h3>
            <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-[var(--muted)] sm:text-base">
              Gợi ý thời gian theo combo khoá. Bạn có thể dùng filter Đầu vào/Đầu ra ở trên để lọc nhanh.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[860px] w-full border-collapse text-left">
              <thead className="bg-[var(--surface-1)]">
                <tr>
                  <th className="p-5 text-sm font-black text-[var(--foreground)]">Gói</th>
                  <th className="p-5 text-sm font-black text-[var(--foreground)]">Đầu vào</th>
                  <th className="p-5 text-sm font-black text-[var(--foreground)]">Đầu ra</th>
                  <th className="p-5 text-sm font-black text-[var(--foreground)]">Thời gian học*</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {filteredComboRows.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-6 text-sm font-semibold text-[var(--muted)]">
                      Không có combo phù hợp với filter hiện tại.
                    </td>
                  </tr>
                ) : (
                  filteredComboRows.map((r) => (
                    <tr key={r.id} className="hover:bg-[var(--surface-1)]/60 transition-colors">
                      <td className="p-5 text-sm font-extrabold text-[var(--foreground)] whitespace-nowrap">{r.combo}</td>
                      <td className="p-5 text-sm font-semibold text-[var(--foreground)] whitespace-nowrap">{r.entry}</td>
                      <td className="p-5 text-sm font-semibold text-[var(--foreground)] whitespace-nowrap">{r.target}</td>
                      <td className="p-5 text-sm font-semibold text-[var(--foreground)] whitespace-nowrap">{r.minTime}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 1-1 */}
        <div className="mt-10 overflow-hidden rounded-[2rem] bg-white shadow-lg shadow-black/5 ring-1 ring-black/5">
          <div className="border-b border-black/5 p-7">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[var(--primary)]">1 kèm 1</p>
            <h3 className="mt-2 text-2xl font-extrabold text-[var(--foreground)] sm:text-3xl">Lớp 1 kèm 1</h3>
            <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-[var(--muted)] sm:text-base">
              Thời lượng áp dụng cho band điểm ≥ 4.0.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href="/lien-he"
                className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--primary)] px-6 text-sm font-extrabold text-[var(--on-primary)] transition-opacity hover:opacity-90"
              >
                Nhận tư vấn 1 kèm 1
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[860px] w-full border-collapse text-left">
              <thead className="bg-[var(--surface-1)]">
                <tr>
                  <th className="p-5 text-sm font-black text-[var(--foreground)]">Hình thức</th>
                  <th className="p-5 text-sm font-black text-[var(--foreground)]">Thời lượng (band ≥ 4.0)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {oneToOnePricingRows.map((r) => (
                  <tr key={r.id} className="align-top hover:bg-[var(--surface-1)]/60 transition-colors">
                    <td className="p-5 text-sm font-extrabold text-[var(--foreground)] whitespace-nowrap">{r.mode}</td>
                    <td className="p-5">
                      {r.durationBandGE4 ? (
                        <p className="whitespace-pre-line text-sm font-semibold leading-relaxed text-[var(--foreground)]">
                          {r.durationBandGE4}
                        </p>
                      ) : (
                        <span className="text-sm font-semibold text-[var(--muted)]">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Exam practice */}
        <div className="mt-10 overflow-hidden rounded-[2rem] bg-white shadow-lg shadow-black/5 ring-1 ring-black/5">
          <div className="border-b border-black/5 p-7">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[var(--primary)]">Luyện đề</p>
            <h3 className="mt-2 text-2xl font-extrabold text-[var(--foreground)] sm:text-3xl">
              {examPractice.modeLabel}: {examPractice.title}
            </h3>
            <p className="mt-2 text-sm font-extrabold text-[var(--foreground)]">Đầu vào: <span className="font-semibold text-[var(--muted)]">{examPractice.entry}</span></p>
            <p className="mt-3 text-sm font-semibold text-[var(--foreground)]">
              Thời gian học: <span className="font-extrabold text-[var(--primary)]">{examPractice.time}</span>
            </p>
          </div>
          <div className="grid gap-4 p-7 md:grid-cols-2">
            {examPractice.skillBlocks.map((b) => (
              <div key={b.name} className="rounded-2xl bg-[var(--surface-1)] p-6 ring-1 ring-black/5">
                <p className="text-sm font-extrabold text-[var(--foreground)]">{b.name}</p>
                <p className="mt-2 text-sm font-medium leading-relaxed text-[var(--muted)]">{b.goal}</p>
              </div>
            ))}
            <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-[var(--primary)]/10 p-6 ring-1 ring-[var(--primary)]/15">
              <p className="text-sm font-extrabold text-[var(--foreground)]">
                Muốn luyện đề theo mục tiêu thi gần nhất?
              </p>
              <Link
                href="/lien-he"
                className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--primary)] px-6 text-sm font-extrabold text-[var(--on-primary)] transition-opacity hover:opacity-90"
              >
                Đăng ký tư vấn
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


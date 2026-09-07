"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { adminApi, ApiError } from "@/lib/admin-api";
import { getAdminToken } from "@/components/admin/auth";
import { uploadAdminImage } from "@/lib/admin-upload";
import {
  AdminAlert,
  AdminButton,
  AdminField,
  AdminInput,
  AdminModal,
  AdminPageHeader,
  AdminPanel,
  AdminRowActions,
  AdminSearch,
  AdminTable,
  AdminTd,
  AdminTextarea,
  AdminTh,
  Plus,
} from "@/components/admin/admin-ui";

type StudentResult = {
  _id: string;
  name: string;
  inputScore?: number;
  inputListening?: number;
  inputReading?: number;
  inputWriting?: number;
  inputSpeaking?: number;
  overall?: number;
  listening?: number;
  reading?: number;
  writing?: number;
  speaking?: number;
  className?: string;
  studyTime?: string;
  testimonial?: string;
  certificateImageUrl?: string;
  profileImgURL?: string;
  updatedAt?: string;
};

type Lead = {
  _id: string;
  name: string;
  phone: string;
  email: string;
};

type Course = {
  _id: string;
  name: string;
};

export default function AdminStudentResultsPage() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<StudentResult[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [saving, setSaving] = useState(false);

  // Modal form states
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<StudentResult | null>(null);

  const [name, setName] = useState("");
  const [selectedLeadId, setSelectedLeadId] = useState("");
  const [className, setClassName] = useState("");
  const [studyTime, setStudyTime] = useState("");
  const [testimonial, setTestimonial] = useState("");

  // Input scores (Đầu vào)
  const [inputScore, setInputScore] = useState("");
  const [inputListening, setInputListening] = useState("");
  const [inputReading, setInputReading] = useState("");
  const [inputWriting, setInputWriting] = useState("");
  const [inputSpeaking, setInputSpeaking] = useState("");

  // Output scores (Đầu ra)
  const [overall, setOverall] = useState("");
  const [listening, setListening] = useState("");
  const [reading, setReading] = useState("");
  const [writing, setWriting] = useState("");
  const [speaking, setSpeaking] = useState("");

  // Images
  const [certUrl, setCertUrl] = useState("");
  const [certFile, setCertFile] = useState<File | null>(null);
  const [profileUrl, setProfileUrl] = useState("");
  const [profileFile, setProfileFile] = useState<File | null>(null);

  const filtered = rows.filter((r) => {
    const query = q.trim().toLowerCase();
    if (!query) return true;
    return [r.name, r.className ?? ""].join(" ").toLowerCase().includes(query);
  });

  const loadData = useCallback(async () => {
    const token = getAdminToken();
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const [resultsList, leadsList, coursesList] = await Promise.all([
        adminApi.studentResults.list(token),
        adminApi.leads.list(token),
        adminApi.courses.listAll(token),
      ]);
      setRows(resultsList as StudentResult[]);
      setLeads(leadsList as Lead[]);
      setCourses(coursesList as Course[]);
    } catch (e: unknown) {
      setError(e instanceof ApiError ? e.message : "Không tải được dữ liệu bảng điểm.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const openAdd = () => {
    setEditing(null);
    setName("");
    setSelectedLeadId("");
    setClassName("");
    setStudyTime("");
    setTestimonial("");
    
    setInputScore("");
    setInputListening("");
    setInputReading("");
    setInputWriting("");
    setInputSpeaking("");

    setOverall("");
    setListening("");
    setReading("");
    setWriting("");
    setSpeaking("");

    setCertUrl("");
    setCertFile(null);
    setProfileUrl("");
    setProfileFile(null);

    setFormOpen(true);
  };

  const openEdit = (r: StudentResult) => {
    setEditing(r);
    setName(r.name);
    setSelectedLeadId("");
    setClassName(r.className ?? "");
    setStudyTime(r.studyTime ?? "");
    setTestimonial(r.testimonial ?? "");

    setInputScore(r.inputScore !== undefined ? String(r.inputScore) : "");
    setInputListening(r.inputListening !== undefined ? String(r.inputListening) : "");
    setInputReading(r.inputReading !== undefined ? String(r.inputReading) : "");
    setInputWriting(r.inputWriting !== undefined ? String(r.inputWriting) : "");
    setInputSpeaking(r.inputSpeaking !== undefined ? String(r.inputSpeaking) : "");

    setOverall(r.overall !== undefined ? String(r.overall) : "");
    setListening(r.listening !== undefined ? String(r.listening) : "");
    setReading(r.reading !== undefined ? String(r.reading) : "");
    setWriting(r.writing !== undefined ? String(r.writing) : "");
    setSpeaking(r.speaking !== undefined ? String(r.speaking) : "");

    setCertUrl(r.certificateImageUrl ?? "");
    setCertFile(null);
    setProfileUrl(r.profileImgURL ?? "");
    setProfileFile(null);

    setFormOpen(true);
  };

  const handleLeadSelect = (leadId: string) => {
    setSelectedLeadId(leadId);
    if (!leadId) return;
    const leadObj = leads.find((l) => l._id === leadId);
    if (leadObj) {
      setName(leadObj.name);
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const token = getAdminToken();
    if (!token || !name.trim()) return;

    setSaving(true);
    setError(null);
    try {
      let finalCertUrl = certUrl;
      if (certFile) {
        finalCertUrl = await uploadAdminImage(token, certFile);
      }

      let finalProfileUrl = profileUrl;
      if (profileFile) {
        finalProfileUrl = await uploadAdminImage(token, profileFile);
      }

      const payload = {
        name: name.trim(),
        className: className.trim() || undefined,
        studyTime: studyTime.trim() || undefined,
        testimonial: testimonial.trim() || undefined,
        certificateImageUrl: finalCertUrl || undefined,
        profileImgURL: finalProfileUrl || undefined,

        inputScore: inputScore ? Number(inputScore) : undefined,
        inputListening: inputListening ? Number(inputListening) : undefined,
        inputReading: inputReading ? Number(inputReading) : undefined,
        inputWriting: inputWriting ? Number(inputWriting) : undefined,
        inputSpeaking: inputSpeaking ? Number(inputSpeaking) : undefined,

        overall: overall ? Number(overall) : undefined,
        listening: listening ? Number(listening) : undefined,
        reading: reading ? Number(reading) : undefined,
        writing: writing ? Number(writing) : undefined,
        speaking: speaking ? Number(speaking) : undefined,
      };

      if (editing) {
        await adminApi.studentResults.update(token, editing._id, payload);
      } else {
        await adminApi.studentResults.create(token, payload);
      }

      setFormOpen(false);
      await loadData();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Lưu bảng điểm học viên thất bại.");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Xóa bảng điểm học viên này?")) return;
    const token = getAdminToken();
    if (!token) return;
    setSaving(true);
    try {
      await adminApi.studentResults.delete(token, id);
      await loadData();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Xóa bảng điểm thất bại.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Bảng điểm học viên"
        description="Quản lý bảng điểm học viên, bao gồm kết quả điểm đầu vào (Placement) và điểm đầu ra khóa học."
        action={
          <AdminButton variant="primary" onClick={openAdd}>
            <Plus className="h-4 w-4" />
            Thêm kết quả học viên
          </AdminButton>
        }
      />

      <div className="mt-6 flex justify-end">
        <AdminSearch value={q} onChange={setQ} placeholder="Tìm học viên / lớp học…" />
      </div>

      {error ? (
        <div className="mt-6">
          <AdminAlert>{error}</AdminAlert>
        </div>
      ) : null}

      {loading ? (
        <p className="mt-8 text-sm text-[var(--muted)]">Đang tải dữ liệu…</p>
      ) : (
        <AdminTable>
          <table className="w-full min-w-[760px] border-collapse bg-[var(--background)] text-sm">
            <thead className="bg-[var(--surface-2)]">
              <tr>
                <AdminTh>Học viên</AdminTh>
                <AdminTh>Lớp học</AdminTh>
                <AdminTh>Điểm đầu vào (Overall)</AdminTh>
                <AdminTh>Điểm đầu ra (Overall)</AdminTh>
                <AdminTh>Thao tác</AdminTh>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-sm text-[var(--muted)]">
                    Chưa có kết quả học viên nào. Nhấn nút thêm ở trên để bắt đầu.
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r._id} className="border-t border-black/5 align-middle">
                    <AdminTd>
                      <div className="flex items-center gap-3">
                        {r.profileImgURL ? (
                          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-black/10">
                            <Image src={r.profileImgURL} alt="" fill className="object-cover" unoptimized />
                          </div>
                        ) : (
                          <div className="h-10 w-10 shrink-0 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                            {r.name.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-[var(--foreground)]">{r.name}</p>
                          {r.studyTime && <p className="text-xs text-[var(--muted)]">{r.studyTime}</p>}
                        </div>
                      </div>
                    </AdminTd>
                    <AdminTd>
                      <span className="font-medium">{r.className || "—"}</span>
                    </AdminTd>
                    <AdminTd>
                      <span className="font-bold text-slate-600">
                        {r.inputScore !== undefined ? r.inputScore.toFixed(1) : "—"}
                      </span>
                    </AdminTd>
                    <AdminTd>
                      <span className="font-bold text-[var(--primary)] text-base">
                        {r.overall !== undefined ? r.overall.toFixed(1) : "—"}
                      </span>
                    </AdminTd>
                    <AdminTd>
                      <AdminRowActions
                        onEdit={() => openEdit(r)}
                        onDelete={() => onDelete(r._id)}
                        deleting={saving}
                      />
                    </AdminTd>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </AdminTable>
      )}

      <AdminModal
        open={formOpen}
        title={editing ? "Cập nhật kết quả học viên" : "Thêm kết quả học viên mới"}
        onClose={() => setFormOpen(false)}
        wide
      >
        <form onSubmit={onSubmit} className="space-y-6 max-h-[80vh] overflow-y-auto px-1">
          
          <AdminPanel title="Thông tin học viên">
            <div className="grid gap-4 sm:grid-cols-2">
              
              {!editing && (
                <AdminField label="Liên kết từ Leads (Danh sách học viên tổng)">
                  <select
                    value={selectedLeadId}
                    onChange={(e) => handleLeadSelect(e.target.value)}
                    className="h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--border-strong)]"
                  >
                    <option value="">-- Chọn để tự động điền Tên học viên --</option>
                    {leads.map((l) => (
                      <option key={l._id} value={l._id}>
                        {l.name} ({l.phone})
                      </option>
                    ))}
                  </select>
                </AdminField>
              )}

              <AdminField label="Họ tên học viên *">
                <AdminInput
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Nhập tên học viên"
                />
              </AdminField>

              <AdminField label="Lớp học (Track)">
                <select
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--border-strong)]"
                >
                  <option value="">-- Chọn khóa học --</option>
                  {courses.map((c) => (
                    <option key={c._id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </AdminField>

              <AdminField label="Thời gian học">
                <AdminInput
                  value={studyTime}
                  onChange={(e) => setStudyTime(e.target.value)}
                  placeholder="Ví dụ: 48h trong 02 tháng"
                />
              </AdminField>
            </div>
          </AdminPanel>

          <AdminPanel title="Bảng điểm Đầu Vào & Đầu Ra">
            <div className="grid gap-6 md:grid-cols-2">
              
              {/* Điểm đầu vào */}
              <div className="space-y-4 border-r border-black/5 pr-0 md:pr-6">
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-500 border-b border-black/5 pb-2">
                  Điểm đầu vào (Placement)
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <AdminField label="L (Listening)">
                    <AdminInput
                      type="number"
                      step="0.5"
                      min="0"
                      max="9.5"
                      value={inputListening}
                      onChange={(e) => setInputListening(e.target.value)}
                      placeholder="VD: 5.0"
                    />
                  </AdminField>
                  <AdminField label="R (Reading)">
                    <AdminInput
                      type="number"
                      step="0.5"
                      min="0"
                      max="9.5"
                      value={inputReading}
                      onChange={(e) => setInputReading(e.target.value)}
                      placeholder="VD: 5.5"
                    />
                  </AdminField>
                  <AdminField label="W (Writing)">
                    <AdminInput
                      type="number"
                      step="0.5"
                      min="0"
                      max="9.5"
                      value={inputWriting}
                      onChange={(e) => setInputWriting(e.target.value)}
                      placeholder="VD: 4.5"
                    />
                  </AdminField>
                  <AdminField label="S (Speaking)">
                    <AdminInput
                      type="number"
                      step="0.5"
                      min="0"
                      max="9.5"
                      value={inputSpeaking}
                      onChange={(e) => setInputSpeaking(e.target.value)}
                      placeholder="VD: 5.0"
                    />
                  </AdminField>
                  <div className="col-span-2">
                    <AdminField label="Overall đầu vào (inputScore) *">
                      <AdminInput
                        type="number"
                        step="0.5"
                        min="0"
                        max="9.5"
                        value={inputScore}
                        onChange={(e) => setInputScore(e.target.value)}
                        placeholder="VD: 5.0"
                      />
                    </AdminField>
                  </div>
                </div>
              </div>

              {/* Điểm đầu ra */}
              <div className="space-y-4">
                <h3 className="text-sm font-black uppercase tracking-wider text-[var(--primary)] border-b border-black/5 pb-2">
                  Điểm đầu ra (Target / Achieved)
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <AdminField label="L (Listening)">
                    <AdminInput
                      type="number"
                      step="0.5"
                      min="0"
                      max="9.5"
                      value={listening}
                      onChange={(e) => setListening(e.target.value)}
                      placeholder="VD: 7.0"
                    />
                  </AdminField>
                  <AdminField label="R (Reading)">
                    <AdminInput
                      type="number"
                      step="0.5"
                      min="0"
                      max="9.5"
                      value={reading}
                      onChange={(e) => setReading(e.target.value)}
                      placeholder="VD: 6.5"
                    />
                  </AdminField>
                  <AdminField label="W (Writing)">
                    <AdminInput
                      type="number"
                      step="0.5"
                      min="0"
                      max="9.5"
                      value={writing}
                      onChange={(e) => setWriting(e.target.value)}
                      placeholder="VD: 6.0"
                    />
                  </AdminField>
                  <AdminField label="S (Speaking)">
                    <AdminInput
                      type="number"
                      step="0.5"
                      min="0"
                      max="9.5"
                      value={speaking}
                      onChange={(e) => setSpeaking(e.target.value)}
                      placeholder="VD: 6.5"
                    />
                  </AdminField>
                  <div className="col-span-2">
                    <AdminField label="Overall đầu ra *">
                      <AdminInput
                        type="number"
                        step="0.5"
                        min="0"
                        max="9.5"
                        value={overall}
                        onChange={(e) => setOverall(e.target.value)}
                        placeholder="VD: 6.5"
                      />
                    </AdminField>
                  </div>
                </div>
              </div>

            </div>
          </AdminPanel>

          <AdminPanel title="Cảm nhận & Tư liệu">
            <div className="space-y-4">
              <AdminField label="Lời nhận xét / Testimonial">
                <AdminTextarea
                  rows={4}
                  value={testimonial}
                  onChange={(e) => setTestimonial(e.target.value)}
                  placeholder="Cảm nhận của học viên sau khi kết thúc khóa học..."
                />
              </AdminField>

              <div className="grid gap-4 sm:grid-cols-2">
                <AdminField label="Ảnh đại diện học viên">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfileFile(e.target.files?.[0] ?? null)}
                    className="text-sm"
                  />
                  {profileUrl && !profileFile && (
                    <div className="relative mt-2 h-16 w-16 overflow-hidden rounded-full ring-1 ring-black/10">
                      <Image src={profileUrl} alt="" fill className="object-cover" unoptimized />
                    </div>
                  )}
                </AdminField>

                <AdminField label="Ảnh bảng điểm / chứng chỉ">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCertFile(e.target.files?.[0] ?? null)}
                    className="text-sm"
                  />
                  {certUrl && !certFile && (
                    <div className="relative mt-2 h-16 w-32 overflow-hidden rounded ring-1 ring-black/10">
                      <Image src={certUrl} alt="" fill className="object-cover" unoptimized />
                    </div>
                  )}
                </AdminField>
              </div>
            </div>
          </AdminPanel>

          <div className="flex justify-end gap-3 pt-4 border-t border-black/5">
            <AdminButton type="button" variant="secondary" onClick={() => setFormOpen(false)}>
              Huỷ
            </AdminButton>
            <AdminButton type="submit" variant="primary" disabled={saving || !name.trim()}>
              Lưu bảng điểm
            </AdminButton>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}

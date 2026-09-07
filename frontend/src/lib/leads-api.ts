import { getApiBaseUrl } from "@/lib/api-base-url";

export type SubmitLeadPayload = {
  name: string;
  phone: string;
  email?: string;
  purpose?: string;
  timeSlot?: string;
  message?: string;
  acaScheduleId?: string;
};

export async function submitLead(payload: SubmitLeadPayload) {
  const res = await fetch(`${getApiBaseUrl()}/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: payload.name,
      phone: payload.phone,
      ...(payload.email?.trim() ? { email: payload.email.trim() } : {}),
      purpose: payload.purpose,
      timeSlot: payload.timeSlot,
      message: payload.message,
      acaScheduleId: payload.acaScheduleId,
    }),
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const msg = (data as { message?: string })?.message ?? `Gửi đăng ký thất bại (${res.status})`;
    throw new Error(msg);
  }
  return data;
}

/** Đọc mục đích / khung giờ từ message cũ (trước khi có field riêng). */
export function leadPurposeFromRecord(lead: {
  purpose?: string;
  message?: string;
}): string | undefined {
  if (lead.purpose?.trim()) return lead.purpose.trim();
  const m = lead.message?.match(/Mục đích[^:\n]*:\s*([^\n]+)/i);
  return m?.[1]?.trim() || undefined;
}

export function leadTimeSlotFromRecord(lead: {
  timeSlot?: string;
  message?: string;
}): string | undefined {
  if (lead.timeSlot?.trim()) return lead.timeSlot.trim();
  const m = lead.message?.match(/Khung giờ[^:\n]*:\s*([^\n]+)/i);
  return m?.[1]?.trim() || undefined;
}

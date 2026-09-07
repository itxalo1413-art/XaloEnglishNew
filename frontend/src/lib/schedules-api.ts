import { getApiBaseUrl } from "@/lib/api-base-url";

export type AcaSchedule = {
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
  type: 'test_speaking_offline' | 'test_speaking_online' | 'test_support' | 'task_aca' | 'teach';
  acaName?: string;
  isBooked: boolean;
};

export async function fetchAvailableAcaSchedules(): Promise<AcaSchedule[]> {
  const res = await fetch(`${getApiBaseUrl()}/aca-schedules`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Không tải được lịch trực của ACA.");
  }
  return res.json();
}

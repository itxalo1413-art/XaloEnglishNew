import { getApiBaseUrl } from "@/lib/api-base-url";

export async function uploadAdminImage(token: string, file: File): Promise<string> {
  const form = new FormData();
  form.append("image", file);
  const res = await fetch(`${getApiBaseUrl()}/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
  const text = await res.text();
  const data = text ? (JSON.parse(text) as { image_url?: string; message?: string }) : null;
  if (!res.ok) {
    throw new Error(data?.message ?? `Upload failed (${res.status})`);
  }
  if (!data?.image_url) throw new Error("Không nhận được URL ảnh.");
  return data.image_url;
}

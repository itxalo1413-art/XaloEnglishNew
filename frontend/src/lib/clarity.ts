/** Chỉ load Clarity khi có project ID thật (không phải placeholder). */
export function getClarityId(): string | null {
  const id = process.env.NEXT_PUBLIC_CLARITY_ID?.trim();
  if (!id) return null;
  if (/YOUR_|PLACEHOLDER|CHANGE_ME|XXX/i.test(id)) return null;
  if (!/^[a-z0-9]+$/i.test(id)) return null;
  return id;
}

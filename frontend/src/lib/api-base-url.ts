/** API base URL — browser uses same-origin proxy; server calls backend directly. */
export function getApiBaseUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");
  if (explicit) return explicit;

  if (typeof window !== "undefined") {
    return `${window.location.origin}/api/v1`;
  }

  return (
    process.env.API_INTERNAL_URL?.replace(/\/+$/, "") ||
    "http://127.0.0.1:3001/api/v1"
  );
}

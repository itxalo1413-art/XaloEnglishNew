import { getApiBaseUrl } from "@/lib/api-base-url";

export type AdminLoginResponse = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
};

export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

async function apiFetch<T>(
  path: string,
  init?: RequestInit & { token?: string },
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
  const token = init?.token;

  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  const text = await res.text();
  const data = text ? (JSON.parse(text) as unknown) : null;
  if (!res.ok) {
    const msg =
      (data as any)?.message ||
      (typeof data === "string" ? data : null) ||
      `Request failed (${res.status})`;
    throw new ApiError(msg, res.status, data);
  }
  return data as T;
}

export const adminApi = {
  login(email: string, password: string) {
    return apiFetch<AdminLoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  profile(token: string) {
    return apiFetch<{ _id: string; name: string; email: string; isAdmin: boolean }>(
      "/auth/profile",
      { token },
    );
  },

  stats(token: string) {
    return apiFetch<
      Record<string, number> & { updatedAt?: string }
    >("/dashboard/stats", { token });
  },

  leads: {
    list(token: string) {
      return apiFetch<any[]>("/leads", { token });
    },
    updateStatus(token: string, id: string, status: string) {
      return apiFetch<any>(`/leads/${id}`, {
        method: "PUT",
        token,
        body: JSON.stringify({ status }),
      });
    },
    exportCsvUrl() {
      return `${getApiBaseUrl()}/leads/export`;
    },
  },

  courses: {
    listAll(token: string) {
      return apiFetch<any[]>("/courses/all", { token });
    },
    seedDefaults(token: string) {
      return apiFetch<{ created: number; skipped: number; total: number }>(
        "/courses/seed-defaults",
        { method: "POST", token },
      );
    },
    create(token: string, payload: unknown) {
      return apiFetch<any>("/courses", {
        method: "POST",
        token,
        body: JSON.stringify(payload),
      });
    },
    update(token: string, id: string, payload: unknown) {
      return apiFetch<any>(`/courses/${id}`, {
        method: "PUT",
        token,
        body: JSON.stringify(payload),
      });
    },
    delete(token: string, id: string) {
      return apiFetch<any>(`/courses/${id}`, { method: "DELETE", token });
    },
  },

  teachers: {
    list(token: string) {
      return apiFetch<any[]>("/teachers", { token });
    },
    create(token: string, payload: unknown) {
      return apiFetch<any>("/teachers", {
        method: "POST",
        token,
        body: JSON.stringify(payload),
      });
    },
    update(token: string, id: string, payload: unknown) {
      return apiFetch<any>(`/teachers/${id}`, {
        method: "PUT",
        token,
        body: JSON.stringify(payload),
      });
    },
    delete(token: string, id: string) {
      return apiFetch<any>(`/teachers/${id}`, { method: "DELETE", token });
    },
  },

  testimonials: {
    list(token: string) {
      return apiFetch<any[]>("/testimonials", { token });
    },
    create(token: string, payload: unknown) {
      return apiFetch<any>("/testimonials", {
        method: "POST",
        token,
        body: JSON.stringify(payload),
      });
    },
    update(token: string, id: string, payload: unknown) {
      return apiFetch<any>(`/testimonials/${id}`, {
        method: "PUT",
        token,
        body: JSON.stringify(payload),
      });
    },
    delete(token: string, id: string) {
      return apiFetch<any>(`/testimonials/${id}`, { method: "DELETE", token });
    },
  },

  schedules: {
    list(token: string) {
      return apiFetch<any[]>("/schedules", { token });
    },
    create(token: string, payload: unknown) {
      return apiFetch<any>("/schedules", {
        method: "POST",
        token,
        body: JSON.stringify(payload),
      });
    },
    update(token: string, id: string, payload: unknown) {
      return apiFetch<any>(`/schedules/${id}`, {
        method: "PUT",
        token,
        body: JSON.stringify(payload),
      });
    },
    delete(token: string, id: string) {
      return apiFetch<any>(`/schedules/${id}`, { method: "DELETE", token });
    },
  },

  blogPosts: {
    list(token: string, pageSize = 50) {
      return apiFetch<{ posts: any[]; page: number; pages: number }>(
        `/blog-posts?pageNumber=1&pageSize=${pageSize}`,
        { token },
      );
    },
    create(token: string, payload: unknown) {
      return apiFetch<any>("/blog-posts", {
        method: "POST",
        token,
        body: JSON.stringify(payload),
      });
    },
    update(token: string, id: string, payload: unknown) {
      return apiFetch<any>(`/blog-posts/${id}`, {
        method: "PUT",
        token,
        body: JSON.stringify(payload),
      });
    },
    delete(token: string, id: string) {
      return apiFetch<any>(`/blog-posts/${id}`, { method: "DELETE", token });
    },
  },

  jobPositions: {
    list(token: string) {
      return apiFetch<any[]>("/job-positions/admin/all", { token });
    },
  },

  jobApplications: {
    list(token: string) {
      return apiFetch<any[]>("/job-applications", { token });
    },
  },

  settings: {
    get() {
      return apiFetch<any>("/settings", { method: "GET" });
    },
    update(token: string, payload: unknown) {
      return apiFetch<any>("/settings", {
        method: "PUT",
        token,
        body: JSON.stringify(payload),
      });
    },
  },

  acaSchedules: {
    listAll(token: string) {
      return apiFetch<any[]>("/aca-schedules/all", { token });
    },
    create(token: string, payload: unknown) {
      return apiFetch<any>("/aca-schedules", {
        method: "POST",
        token,
        body: JSON.stringify(payload),
      });
    },
    update(token: string, id: string, payload: unknown) {
      return apiFetch<any>(`/aca-schedules/${id}`, {
        method: "PUT",
        token,
        body: JSON.stringify(payload),
      });
    },
    delete(token: string, id: string) {
      return apiFetch<any>(`/aca-schedules/${id}`, { method: "DELETE", token });
    },
  },

  studentResults: {
    list(token: string) {
      return apiFetch<any[]>("/student-results", { token });
    },
    create(token: string, payload: unknown) {
      return apiFetch<any>("/student-results", {
        method: "POST",
        token,
        body: JSON.stringify(payload),
      });
    },
    update(token: string, id: string, payload: unknown) {
      return apiFetch<any>(`/student-results/${id}`, {
        method: "PUT",
        token,
        body: JSON.stringify(payload),
      });
    },
    delete(token: string, id: string) {
      return apiFetch<any>(`/student-results/${id}`, { method: "DELETE", token });
    },
  },
};


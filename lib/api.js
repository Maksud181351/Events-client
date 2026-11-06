import { authClient } from "./auth-client";

const API = process.env.NEXT_PUBLIC_API_URL;

export async function authFetch(path, options = {}) {
  const { data, error } = await authClient.token();
  if (error || !data?.token) throw new Error("Login session pawa jayni, abar login koro");

  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.token}`,
      ...(options.headers || {}),
    },
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.message || "Kichu ekta vul hoyeche");
  return body;
}

export async function publicFetch(path) {
  const res = await fetch(`${API}${path}`, { cache: "no-store" });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.message || "Data load kora jayni");
  return body;
}
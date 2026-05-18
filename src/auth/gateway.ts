export function getAuthGatewayUrl() {
  const baseUrl = process.env.AUTH_GATEWAY_URL;
  if (!baseUrl) throw new Error("Missing AUTH_GATEWAY_URL env var.");
  return baseUrl;
}

export function buildGatewayUrl(path: string) {
  return `${getAuthGatewayUrl()}${path}`;
}

export async function postJson<T>(url: string, body: Record<string, unknown>) {
  console.log("[auth] Calling endpoint", { url, method: "POST" });

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  console.log("[auth] Endpoint response", {
    url,
    status: response.status,
    ok: response.ok,
  });

  if (!response.ok) return { ok: false as const, data: null };
  const data = (await response.json()) as T;
  return { ok: true as const, data };
}

import { promises as fs } from "fs";
import path from "path";

export interface SupabaseCredentials {
  url: string;
  key: string;
  source: "env" | "runtime_config" | "unconfigured";
}

const RUNTIME_CONFIG_FILE = path.join(
  process.cwd(),
  ".local-supabase-config.json"
);

/**
 * Resolves Supabase credentials from environment variables or runtime Admin configuration.
 */
export async function getSupabaseCredentials(): Promise<SupabaseCredentials> {
  const envUrl =
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const envKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "";

  if (envUrl && envKey) {
    return {
      url: envUrl.replace(/\/$/, ""),
      key: envKey,
      source: "env",
    };
  }

  try {
    const raw = await fs.readFile(RUNTIME_CONFIG_FILE, "utf8");
    const parsed = JSON.parse(raw) as { url?: string; key?: string };
    if (parsed.url && parsed.key) {
      return {
        url: parsed.url.replace(/\/$/, ""),
        key: parsed.key,
        source: "runtime_config",
      };
    }
  } catch {
    // Ignore when local config file does not exist
  }

  return {
    url: "",
    key: "",
    source: "unconfigured",
  };
}

export async function saveRuntimeSupabaseCredentials(
  url: string,
  key: string
): Promise<void> {
  await fs.writeFile(
    RUNTIME_CONFIG_FILE,
    JSON.stringify({ url: url.trim(), key: key.trim() }, null, 2),
    "utf8"
  );
}

/**
 * Executes a REST query against Supabase PostgREST (`/rest/v1/<table>`).
 */
export async function supabaseFetch<T = unknown>(
  tableAndQuery: string,
  options: {
    method?: "GET" | "POST" | "PATCH" | "DELETE";
    body?: unknown;
    prefer?: string;
  } = {}
): Promise<{ ok: boolean; status: number; data: T | null; error?: string }> {
  const creds = await getSupabaseCredentials();
  if (creds.source === "unconfigured") {
    return {
      ok: false,
      status: 503,
      data: null,
      error: "Supabase credentials are not configured.",
    };
  }

  try {
    const response = await fetch(`${creds.url}/rest/v1/${tableAndQuery}`, {
      method: options.method || "GET",
      headers: {
        apikey: creds.key,
        Authorization: `Bearer ${creds.key}`,
        "Content-Type": "application/json",
        Prefer: options.prefer || "return=representation",
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      cache: "no-store",
    });

    if (!response.ok) {
      const errText = await response.text();
      return {
        ok: false,
        status: response.status,
        data: null,
        error: errText || `HTTP ${response.status}`,
      };
    }

    const text = await response.text();
    const data = text ? (JSON.parse(text) as T) : null;
    return {
      ok: true,
      status: response.status,
      data,
    };
  } catch (err) {
    return {
      ok: false,
      status: 500,
      data: null,
      error: err instanceof Error ? err.message : "Network error",
    };
  }
}

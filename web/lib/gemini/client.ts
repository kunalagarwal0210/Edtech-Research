import { GoogleGenerativeAI } from "@google/generative-ai";

// gemini-3.6-flash (premium) free tier caps at 20 requests/DAY — unworkable for a
// 40–50-user test (3 calls per first-win). The flash-lite tier has a far higher free
// daily limit and is ~10x faster (~2s vs ~30s), fixing both the quota blocker and the
// first-win latency risk. Output quality stays on-spec (clean RCFC, jargon-free).
const MODEL = "gemini-3.5-flash-lite";

export class GeminiError extends Error {
  constructor(message: string, readonly cause?: unknown) {
    super(message);
    this.name = "GeminiError";
  }
}

function model() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new GeminiError("GEMINI_API_KEY is not set");
  return new GoogleGenerativeAI(key).getGenerativeModel({ model: MODEL });
}

function stripFences(raw: string): string {
  return raw.trim().replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
}

const RETRY_DELAYS_MS = [800, 1600, 3200];

// Gemini free tier intermittently returns 503 ("model experiencing high demand")
// or 429 (rate limit). Both are transient — retry with backoff before giving up.
function isTransient(e: unknown): boolean {
  const status = (e as { status?: number })?.status;
  if (status === 503 || status === 429) return true;
  const msg = (e as { message?: string })?.message ?? "";
  return /\b(503|429)\b|high demand|overloaded|rate limit/i.test(msg);
}

async function generateWithRetry(prompt: string): Promise<string> {
  const m = model();
  for (let attempt = 0; ; attempt++) {
    try {
      const res = await m.generateContent(prompt);
      return res.response.text();
    } catch (e) {
      if (attempt < RETRY_DELAYS_MS.length && isTransient(e)) {
        await new Promise((r) => setTimeout(r, RETRY_DELAYS_MS[attempt]));
        continue;
      }
      throw e;
    }
  }
}

export async function generateText(opts: { system: string; user: string }): Promise<string> {
  try {
    return (await generateWithRetry(`${opts.system}\n\n---\n\n${opts.user}`)).trim();
  } catch (e) {
    throw new GeminiError("Gemini text generation failed", e);
  }
}

export async function generateJson<T>(opts: { system: string; user: string }): Promise<T> {
  let raw: string;
  try {
    raw = await generateWithRetry(
      `${opts.system}\n\nRespond with ONLY valid JSON, no prose.\n\n---\n\n${opts.user}`,
    );
  } catch (e) {
    throw new GeminiError("Gemini call failed", e);
  }
  try {
    return JSON.parse(stripFences(raw)) as T;
  } catch (e) {
    throw new GeminiError(`Gemini returned non-JSON: ${raw.slice(0, 120)}`, e);
  }
}

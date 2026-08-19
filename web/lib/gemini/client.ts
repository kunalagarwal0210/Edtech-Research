import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL = "gemini-2.0-flash";

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

export async function generateText(opts: { system: string; user: string }): Promise<string> {
  try {
    const res = await model().generateContent(
      `${opts.system}\n\n---\n\n${opts.user}`,
    );
    return res.response.text().trim();
  } catch (e) {
    throw new GeminiError("Gemini text generation failed", e);
  }
}

export async function generateJson<T>(opts: { system: string; user: string }): Promise<T> {
  let raw: string;
  try {
    const res = await model().generateContent(
      `${opts.system}\n\nRespond with ONLY valid JSON, no prose.\n\n---\n\n${opts.user}`,
    );
    raw = res.response.text();
  } catch (e) {
    throw new GeminiError("Gemini call failed", e);
  }
  try {
    return JSON.parse(stripFences(raw)) as T;
  } catch (e) {
    throw new GeminiError(`Gemini returned non-JSON: ${raw.slice(0, 120)}`, e);
  }
}

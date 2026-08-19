import { describe, it, expect, vi, beforeEach } from "vitest";

const mockGenerateContent = vi.fn();
vi.mock("@google/generative-ai", () => ({
  GoogleGenerativeAI: vi.fn(function GoogleGenerativeAI() {
    return { getGenerativeModel: () => ({ generateContent: mockGenerateContent }) };
  }),
}));

import { generateJson, GeminiError } from "@/lib/gemini/client";

beforeEach(() => {
  mockGenerateContent.mockReset();
  process.env.GEMINI_API_KEY = "test-key";
});

describe("generateJson", () => {
  it("parses a clean JSON response", async () => {
    mockGenerateContent.mockResolvedValue({
      response: { text: () => '{"ok": true, "n": 2}' },
    });
    const out = await generateJson<{ ok: boolean; n: number }>({ system: "s", user: "u" });
    expect(out).toEqual({ ok: true, n: 2 });
  });

  it("strips ```json fences before parsing", async () => {
    mockGenerateContent.mockResolvedValue({
      response: { text: () => '```json\n{"ok": true}\n```' },
    });
    const out = await generateJson<{ ok: boolean }>({ system: "s", user: "u" });
    expect(out).toEqual({ ok: true });
  });

  it("throws GeminiError on non-JSON output", async () => {
    mockGenerateContent.mockResolvedValue({ response: { text: () => "not json" } });
    await expect(generateJson({ system: "s", user: "u" })).rejects.toBeInstanceOf(GeminiError);
  });

  it("throws GeminiError when the API call rejects", async () => {
    mockGenerateContent.mockRejectedValue(new Error("429 rate limit"));
    await expect(generateJson({ system: "s", user: "u" })).rejects.toBeInstanceOf(GeminiError);
  });
});

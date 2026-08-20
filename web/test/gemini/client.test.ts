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

  it("throws GeminiError immediately on a non-transient error (no retry)", async () => {
    mockGenerateContent.mockRejectedValue(new Error("400 bad request"));
    await expect(generateJson({ system: "s", user: "u" })).rejects.toBeInstanceOf(GeminiError);
    expect(mockGenerateContent).toHaveBeenCalledTimes(1);
  });

  it("retries a transient 503 and then succeeds", async () => {
    vi.useFakeTimers();
    const overloaded = Object.assign(new Error("503 high demand"), { status: 503 });
    mockGenerateContent
      .mockRejectedValueOnce(overloaded)
      .mockResolvedValueOnce({ response: { text: () => '{"ok": true}' } });
    const p = generateJson<{ ok: boolean }>({ system: "s", user: "u" });
    await vi.runAllTimersAsync();
    await expect(p).resolves.toEqual({ ok: true });
    expect(mockGenerateContent).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  });

  it("gives up after exhausting retries on a persistent transient error", async () => {
    vi.useFakeTimers();
    mockGenerateContent.mockRejectedValue(
      Object.assign(new Error("429 rate limit"), { status: 429 }),
    );
    const p = generateJson({ system: "s", user: "u" });
    const assertion = expect(p).rejects.toBeInstanceOf(GeminiError);
    await vi.runAllTimersAsync();
    await assertion;
    expect(mockGenerateContent).toHaveBeenCalledTimes(4); // 1 initial + 3 retries
    vi.useRealTimers();
  });
});

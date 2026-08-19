import { describe, it, expect, vi, beforeEach } from "vitest";
vi.mock("@/lib/gemini/client", () => ({
  generateJson: vi.fn(),
  generateText: vi.fn(),
  GeminiError: class extends Error {},
}));
import { generateJson } from "@/lib/gemini/client";
import { POST } from "@/app/api/rebuild/route";

beforeEach(() => {
  vi.mocked(generateJson).mockReset();
});
const req = (b: unknown) => new Request("http://x", { method: "POST", body: JSON.stringify(b) });

describe("POST /api/rebuild", () => {
  it("returns structuredPrompt + pattern", async () => {
    vi.mocked(generateJson).mockResolvedValue({ structuredPrompt: "Role: ...", pattern: "Add role+context." });
    const res = await POST(req({ taskText: "JD", weakPrompt: "write a JD" }));
    expect(await res.json()).toEqual({ structuredPrompt: "Role: ...", pattern: "Add role+context." });
  });
  it("400s without weakPrompt", async () => {
    expect((await POST(req({ taskText: "JD" }))).status).toBe(400);
  });
});

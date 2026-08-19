import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/gemini/client", () => ({
  generateJson: vi.fn(),
  GeminiError: class extends Error {},
}));
import { generateJson } from "@/lib/gemini/client";
import { POST } from "@/app/api/diagnose/route";

// Block body (not expression body): `mockReset()` returns the mock itself,
// and Vitest treats a value returned from beforeEach as an auto-teardown
// callback. Once a test configures the mock to reject, that phantom
// teardown call would reject too and get misattributed as a test failure.
beforeEach(() => {
  vi.mocked(generateJson).mockReset();
});

function req(body: unknown) {
  return new Request("http://x/api/diagnose", { method: "POST", body: JSON.stringify(body) });
}

describe("POST /api/diagnose", () => {
  it("returns issues from the model", async () => {
    vi.mocked(generateJson).mockResolvedValue({ issues: ["No role given"], encouragement: "Good start!" });
    const res = await POST(req({ taskText: "JD", weakPrompt: "write a JD" }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ issues: ["No role given"], encouragement: "Good start!" });
  });

  it("400s when weakPrompt is missing", async () => {
    const res = await POST(req({ taskText: "JD" }));
    expect(res.status).toBe(400);
  });

  it("502s when the model errors", async () => {
    vi.mocked(generateJson).mockRejectedValue(new Error("boom"));
    const res = await POST(req({ taskText: "JD", weakPrompt: "x" }));
    expect(res.status).toBe(502);
  });
});

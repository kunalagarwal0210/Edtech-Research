import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/gemini/client", () => ({
  generateJson: vi.fn(),
  GeminiError: class extends Error {},
}));
import { generateJson } from "@/lib/gemini/client";
import { POST } from "@/app/api/grade-drill/route";

beforeEach(() => {
  vi.mocked(generateJson).mockReset();
});

function req(body: unknown) {
  return new Request("http://x/api/grade-drill", { method: "POST", body: JSON.stringify(body) });
}

describe("POST /api/grade-drill", () => {
  it("returns passed/feedback from the model", async () => {
    vi.mocked(generateJson).mockResolvedValue({ passed: true, feedback: "Nice, you added context." });
    const res = await POST(req({ drillId: "drill1", attempt: "As my team's manager, tell them the deadline moved to Friday because of the client review." }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ passed: true, feedback: "Nice, you added context." });
  });

  it("400s when attempt is missing", async () => {
    const res = await POST(req({ drillId: "drill1" }));
    expect(res.status).toBe(400);
  });

  it("400s when drillId is unknown", async () => {
    const res = await POST(req({ drillId: "nope", attempt: "something" }));
    expect(res.status).toBe(400);
  });

  it("502s when the model errors", async () => {
    vi.mocked(generateJson).mockRejectedValue(new Error("boom"));
    const res = await POST(req({ drillId: "drill1", attempt: "x" }));
    expect(res.status).toBe(502);
  });
});

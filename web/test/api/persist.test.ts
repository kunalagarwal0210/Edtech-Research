import { describe, it, expect, vi, beforeEach } from "vitest";
const getUser = vi.fn();
const upsert = vi.fn().mockResolvedValue({ error: null });
vi.mock("@/lib/supabase/server", () => ({
  getServerSupabase: () => ({ auth: { getUser }, from: () => ({ upsert }) }),
}));
import { POST } from "@/app/api/persist-progress/route";

beforeEach(() => {
  getUser.mockReset();
  upsert.mockClear();
});
const req = (b: unknown) => new Request("http://x", { method: "POST", body: JSON.stringify(b) });

describe("POST /api/persist-progress", () => {
  it("401s when not authenticated", async () => {
    getUser.mockResolvedValue({ data: { user: null } });
    expect((await POST(req({}))).status).toBe(401);
  });
  it("upserts progress for an authed user", async () => {
    getUser.mockResolvedValue({ data: { user: { id: "u1", email: "a@b.c" } } });
    const res = await POST(req({ taskText: "JD", firstWinAt: "2026-08-19T00:00:00Z" }));
    expect(res.status).toBe(200);
    expect(upsert).toHaveBeenCalled();
    // second upsert call is the progress table upsert (first is profiles)
    const [progressPayload, progressOptions] = upsert.mock.calls[1];
    expect(progressPayload).toMatchObject({ user_id: "u1", streak: 1 });
    expect(progressOptions).toEqual({ onConflict: "user_id", ignoreDuplicates: true });
  });
});

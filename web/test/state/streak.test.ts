import { describe, it, expect } from "vitest";
import { nextStreak } from "@/lib/state/streak";

describe("nextStreak", () => {
  it("starts a streak at 1 from null", () => {
    expect(nextStreak({ streak: 0, lastActive: null }, "2026-08-19"))
      .toEqual({ streak: 1, lastActive: "2026-08-19" });
  });
  it("does not change on the same day", () => {
    expect(nextStreak({ streak: 3, lastActive: "2026-08-19" }, "2026-08-19"))
      .toEqual({ streak: 3, lastActive: "2026-08-19" });
  });
  it("increments on a consecutive day", () => {
    expect(nextStreak({ streak: 3, lastActive: "2026-08-18" }, "2026-08-19"))
      .toEqual({ streak: 4, lastActive: "2026-08-19" });
  });
  it("resets to 1 after a gap", () => {
    expect(nextStreak({ streak: 5, lastActive: "2026-08-16" }, "2026-08-19"))
      .toEqual({ streak: 1, lastActive: "2026-08-19" });
  });
});

import { describe, it, expect, vi, beforeEach } from "vitest";
import { Ev } from "@/lib/analytics/events";
import { track, __setPosthogForTest } from "@/lib/analytics/track";

const capture = vi.fn();

beforeEach(() => capture.mockReset());

describe("track", () => {
  it("forwards event name and props to posthog", () => {
    __setPosthogForTest({ capture } as never);
    track(Ev.FirstWinCompleted, { task_type: "writing" });
    expect(capture).toHaveBeenCalledWith("first_win_completed", { task_type: "writing" });
  });

  it("is a safe no-op when posthog is not initialized", () => {
    __setPosthogForTest(null);
    expect(() => track(Ev.LandingView)).not.toThrow();
    expect(capture).not.toHaveBeenCalled();
  });

  it("headline event name is exactly first_win_completed", () => {
    expect(Ev.FirstWinCompleted).toBe("first_win_completed");
  });
});

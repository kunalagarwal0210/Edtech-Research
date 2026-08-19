import { describe, it, expect } from "vitest";
import { HERO } from "@/lib/copy";

describe("HERO copy", () => {
  it("uses the verbatim headline", () => {
    expect(HERO.headline).toBe("Get your first real AI win in 10 minutes.");
  });
  it("defines copy for all 8 day-0 steps", () => {
    expect(HERO.steps).toHaveLength(8);
    for (const s of HERO.steps) {
      expect(s.title.length).toBeGreaterThan(0);
    }
  });
  it("keeps the confidential-info notice text available", () => {
    expect(HERO.confidentialNotice).toMatch(/confidential/i);
  });
});

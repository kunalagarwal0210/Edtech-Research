import { describe, it, expect } from "vitest";
import { parseVerdict } from "@/lib/grading/parseVerdict";

describe("parseVerdict", () => {
  it("passes through a well-formed verdict", () => {
    const v = parseVerdict({
      items: { role: true, context: true, format: true, constraints: false, usable_result: true },
      passed: true, feedback: "Nice.",
    });
    expect(v.passed).toBe(true);
    expect(v.items.constraints).toBe(false);
  });
  it("coerces missing items to false and derives passed", () => {
    const v = parseVerdict({ items: { usable_result: true, role: true, context: true, format: true }, feedback: "ok" });
    // usable_result + 3 of 4 others => passed true; constraints missing => false
    expect(v.items.constraints).toBe(false);
    expect(v.passed).toBe(true);
  });
  it("fails safe on garbage input", () => {
    const v = parseVerdict("not an object");
    expect(v.passed).toBe(false);
    expect(typeof v.feedback).toBe("string");
  });
});

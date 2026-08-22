import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { Ev } from "@/lib/analytics/events";

// Guard against an event that was defined in the canonical map (Task 3) but
// never actually wired into a page/component — a silent hole that would cost us
// baseline funnel data during the soft launch. Reads every source file under
// app/ and components/ and asserts each Ev value is referenced at least once,
// either as the raw string or as an `Ev.Key` enum access.
//
// Resolved from the vitest root (web/), which is process.cwd() when the suite
// runs — see vitest.config.ts.
const appDir = join(process.cwd(), "app");
const componentsDir = join(process.cwd(), "components");

function allSource(dir: string, acc: string[] = []): string[] {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) allSource(p, acc);
    else if (/\.tsx?$/.test(p)) acc.push(readFileSync(p, "utf8"));
  }
  return acc;
}

function keyOf(v: string) {
  return Object.entries(Ev).find(([, val]) => val === v)![0];
}

describe("event coverage", () => {
  const blob = [...allSource(appDir), ...allSource(componentsDir)].join("\n");
  for (const value of Object.values(Ev)) {
    it(`fires ${value} somewhere`, () => {
      expect(blob.includes(value) || blob.includes(`Ev.${keyOf(value)}`)).toBe(
        true,
      );
    });
  }
});

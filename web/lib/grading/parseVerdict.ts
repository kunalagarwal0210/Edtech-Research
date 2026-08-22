export type RubricItems = {
  role: boolean; context: boolean; format: boolean; constraints: boolean; usable_result: boolean;
};
export type Verdict = { items: RubricItems; passed: boolean; feedback: string };

const KEYS: (keyof RubricItems)[] = ["role", "context", "format", "constraints", "usable_result"];

export function parseVerdict(raw: unknown): Verdict {
  const obj = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const itemsIn = (obj.items && typeof obj.items === "object" ? obj.items : {}) as Record<string, unknown>;
  const items = Object.fromEntries(KEYS.map((k) => [k, itemsIn[k] === true])) as unknown as RubricItems;
  const othersMet = KEYS.filter((k) => k !== "usable_result").reduce((n, k) => n + (items[k] ? 1 : 0), 0);
  const derivedPass = items.usable_result && othersMet >= 3;
  const passed = typeof obj.passed === "boolean" ? obj.passed : derivedPass;
  const feedback = typeof obj.feedback === "string" ? obj.feedback : "";
  return { items, passed, feedback };
}

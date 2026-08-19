export type AnonState = {
  taskText?: string;
  weakPrompt?: string;
  structuredPrompt?: string;
  output?: string;
  firstWinAt?: string;
};

const KEY = "naive_anon_v1";

export function readAnon(): AnonState {
  if (typeof localStorage === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}") as AnonState;
  } catch {
    return {};
  }
}

export function writeAnon(patch: Partial<AnonState>): void {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify({ ...readAnon(), ...patch }));
}

export function clearAnon(): void {
  if (typeof localStorage !== "undefined") localStorage.removeItem(KEY);
}

import { describe, it, expect, beforeEach } from "vitest";
import { readAnon, writeAnon, clearAnon } from "@/lib/state/localProgress";

beforeEach(() => localStorage.clear());

describe("localProgress", () => {
  it("returns an empty object before anything is written", () => {
    expect(readAnon()).toEqual({});
  });
  it("merges patches instead of overwriting", () => {
    writeAnon({ taskText: "draft a JD" });
    writeAnon({ weakPrompt: "write a JD" });
    expect(readAnon()).toEqual({ taskText: "draft a JD", weakPrompt: "write a JD" });
  });
  it("clears state", () => {
    writeAnon({ taskText: "x" });
    clearAnon();
    expect(readAnon()).toEqual({});
  });
  it("survives a corrupt localStorage value", () => {
    localStorage.setItem("naive_anon_v1", "{not json");
    expect(readAnon()).toEqual({});
  });
});

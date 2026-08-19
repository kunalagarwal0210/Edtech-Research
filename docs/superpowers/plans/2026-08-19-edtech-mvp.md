# EdTech MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a guided-rails web app that walks a non-technical professional from a weak prompt to a real, usable AI result on their own task in ~10 minutes (jargon-free, pre-signup), then holds the habit with a byte-sized daily loop (3 drills + 1 AI-judged checkpoint), instrumented end-to-end, ready for 40–50 real users.

**Architecture:** A single Next.js (App Router) app on Vercel. The pre-signup first-win flow runs anonymously (state in `localStorage`), calling Gemini through server-side API routes so the API key never ships to the browser. At the "win moment" the user signs in with Google (Supabase Auth) and their anonymous progress is persisted to Postgres. The returning loop (drills, streak, checkpoint) reads/writes that Postgres state. Every step of the journey fires a typed PostHog event; the headline event is `first_win_completed`.

**Tech Stack:** Next.js 15 (App Router, TypeScript), Tailwind CSS, `@google/generative-ai` (Gemini free tier), Supabase (Google OAuth + Postgres), `posthog-js`, Vitest (unit tests), Vercel (hosting).

**Spec:** `solution-prd.md` (Diamond 2) — grounded in `problem-space-prd.md` (Diamond 1) and the locked decisions in `edtech-case-study-handoff.md` §0.6.

## Global Constraints

- **App lives in `web/`** at the repo root. Research docs stay untouched at the repo root. Never edit the `.md` research files from build tasks.
- **~$0 engine cost.** Gemini AI Studio **free tier** only (model `gemini-3.6-flash`). No paid API, no credit card. Groq is an optional documented overflow, NOT a build task.
- **API key is server-only.** All Gemini calls go through Next.js API routes / server actions. `GEMINI_API_KEY` is never exposed to the client (no `NEXT_PUBLIC_` prefix).
- **No signup wall before the first win.** Steps 1–8 of the day-0 flow run anonymously. Google OAuth appears only at step 8 (the win moment).
- **Jargon-free copy rule.** All user-facing explanation copy must read at an "explain like I'm in 8th class" level. No unexplained AI jargon in diagnosis/rebuild output.
- **"Don't paste confidential info" notice** is visible on the task-entry and prompt-entry screens (free tier may train on prompts).
- **Progress metaphor is "AI tasks you can now do"** — never "% to a target role."
- **Fake-door price is a single `₹399/mo`.** No A/B price test.
- **Event names are canonical** and defined once in `web/lib/analytics/events.ts`. Never inline a raw event string anywhere else.
- **Scope guard (do NOT build):** on-demand AI chat tutor, full 5-day path, a second growth mechanic, live/cohort features, per-use pricing, real payment collection.

### Stack decisions locked for this plan (with noted alternatives)

- **Auth + DB = Supabase** (one free service covers Google OAuth and Postgres). *Alternative if Supabase is undesired: NextAuth/Auth.js + Vercel Postgres — more moving parts; not used here.*
- **App subfolder = `web/`** (not `app/`, which is Next's route directory). *Alternative: a separate GitHub repo — rejected for overhead; same-repo subfolder keeps research + build together.*
- **Groq overflow = deferred.** At 40–50 users the Gemini free tier (~1,500 req/day) covers the expected ~500–750 calls. A single env-gated fallback is documented in Task 2 but not wired as a feature.

### Prerequisites the human must provide (not build steps)

1. A **Gemini API key** from Google AI Studio (aistudio.google.com → Get API key). Free, no card.
2. A **Supabase project** (supabase.com, free tier) with Google OAuth enabled in Authentication → Providers (needs a Google Cloud OAuth client ID/secret; Supabase docs walk through it).
3. A **PostHog** project (posthog.com, free tier) — project API key + host.
4. A **Vercel** account linked to the GitHub repo for deploys.

Env vars used throughout (put in `web/.env.local`, and in Vercel project settings):
```
GEMINI_API_KEY=...                       # server-only
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...            # server-only, for persisting progress
NEXT_PUBLIC_POSTHOG_KEY=...
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

---

## File Structure

```
web/
  app/
    layout.tsx                     # root layout, PostHog provider, fonts
    page.tsx                       # landing (day-0 step 1)
    globals.css                    # tailwind
    start/page.tsx                 # day-0 steps 2–8 (the hero flow, anonymous)
    dashboard/page.tsx             # returning loop home: progress + drills + streak
    drill/[id]/page.tsx            # a single drill (steps 1..3)
    checkpoint/page.tsx            # AI-judged real-task checkpoint
    unlock/page.tsx                # ₹399 fake-door
    auth/callback/route.ts         # Supabase OAuth callback handler
    api/
      diagnose/route.ts            # POST weak prompt -> jargon-free diagnosis (Gemini)
      rebuild/route.ts             # POST weak prompt -> structured prompt + pattern (Gemini)
      run/route.ts                 # POST structured prompt -> usable output (Gemini)
      grade-drill/route.ts         # POST drill attempt -> pass/fail + feedback
      grade-checkpoint/route.ts    # POST real-task attempt -> rubric verdict (Gemini)
      persist-progress/route.ts    # POST anon localStorage state -> Postgres (after signup)
  components/
    ui/Button.tsx                  # shared primitive (Task 1.5)
    ui/Card.tsx                    # shared primitive (Task 1.5)
    ui/Textarea.tsx                # shared primitive (Task 1.5)
    ui/StepShell.tsx               # day-0 step frame: progress + title + notice (Task 1.5)
    ConfidentialNotice.tsx         # "don't paste confidential info" banner
    WinCard.tsx                    # shareable "I did X with AI in 10 min" card
    StreakBadge.tsx                # streak display
    ProgressList.tsx               # "AI tasks you can now do"
  lib/
    copy.ts                        # verbatim, jargon-free hero + 8-step copy (Task 1.5)
    gemini/client.ts               # Gemini client + JSON-mode helper
    gemini/prompts.ts              # system prompts for diagnose/rebuild/grade
    analytics/events.ts            # canonical event names (enum) + property types
    analytics/track.ts             # track() wrapper over posthog-js
    supabase/client.ts             # browser client
    supabase/server.ts             # server client (service role)
    state/localProgress.ts         # anonymous first-win state in localStorage
    state/streak.ts                # pure streak calculation
    drills/data.ts                 # the 3 hardcoded drills (one lever each)
    grading/parseVerdict.ts        # parse LLM JSON verdict -> typed result
  test/                            # Vitest unit tests mirror lib/ paths
  supabase/schema.sql              # profiles + progress tables
  package.json / tsconfig.json / next.config.ts / tailwind + vitest config
```

Files that change together live together: each `lib/` module owns one responsibility and has a mirrored test in `web/test/`. Pages are thin — they compose `lib/` logic and fire events; the testable logic lives in `lib/`, not in JSX.

---

## A note on task granularity in this plan

The **precision-critical logic** — Gemini wrappers, the event map, the streak calculation, the grading-verdict parser, the LLM system prompts — is given as **real, complete code with TDD steps**. **Scaffolding** (Next/Tailwind/Supabase init) is given as **exact commands**. **Presentational pages** are specified by their responsibility, the exact events they must fire, the exact `lib/` functions they call, and a manual acceptance check — because inventing full speculative JSX line-by-line adds bulk without reducing risk. Where a page contains real logic (state transitions, API calls, event firing), that logic is shown as code.

---

## Task 1: Scaffold the app and ship a live "hello world" to Vercel

**Files:**
- Create: `web/` (Next.js project), `web/vitest.config.ts`, `web/test/smoke.test.ts`
- Modify: repo `.gitignore` (add `web/node_modules`, `web/.next`, `web/.env*.local`)

**Interfaces:**
- Produces: a deployable Next.js app at `web/` with Vitest wired and one passing smoke test. Nothing else consumes this task except "the app exists."

- [ ] **Step 1: Create the Next.js app**

Run from the repo root:
```bash
npx create-next-app@latest web --typescript --tailwind --app --eslint --src-dir=false --import-alias "@/*" --no-turbopack
```
Accept defaults for any remaining prompts.

- [ ] **Step 2: Add Vitest**

```bash
cd web
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react
```

Create `web/vitest.config.ts`:
```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: { environment: "jsdom", globals: true },
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
});
```

Add to `web/package.json` scripts: `"test": "vitest run"`, `"test:watch": "vitest"`.

- [ ] **Step 3: Write the failing smoke test**

Create `web/test/smoke.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import { appName } from "@/lib/meta";

describe("smoke", () => {
  it("exposes the app name", () => {
    expect(appName()).toBe("naive-plus");
  });
});
```

- [ ] **Step 4: Run it to confirm it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `@/lib/meta`.

- [ ] **Step 5: Implement the minimal module**

Create `web/lib/meta.ts`:
```typescript
export function appName(): string {
  return "naive-plus";
}
```

- [ ] **Step 6: Run it to confirm it passes**

Run: `npm test`
Expected: PASS.

- [ ] **Step 7: Update .gitignore and deploy**

Add to repo-root `.gitignore`:
```
web/node_modules
web/.next
web/.env*.local
```

Push, then import the repo into Vercel with **Root Directory = `web`**. Confirm the default Next page loads at the Vercel URL.

- [ ] **Step 8: Commit**

```bash
git add web .gitignore
git commit -m "chore: scaffold Next.js app in web/ with Vitest + Vercel deploy"
```

---

## Task 1.5: Design foundation — theme tokens, shared primitives, locked hero copy

**Why this task exists:** every page task below (4, 5, 6, 8, 10, 11) is built by a separate agent. Without a shared visual contract they will drift into 12 different looks, and the one screen that gets graded — the pre-signup hero flow that drives `first_win_completed` — must feel coherent and trustworthy for a trust-scarred persona (P6). This task is the contract those agents inherit. It is deliberately lean: tokens + 4 primitives + copy, **not** a full per-screen mockup.

**Files:**
- Modify: `web/app/globals.css` (theme tokens), `web/tailwind.config.ts` (map tokens; skip if using Tailwind v4 CSS-first config — then tokens live in `globals.css` `@theme`)
- Create: `web/components/ui/Button.tsx`, `web/components/ui/Card.tsx`, `web/components/ui/Textarea.tsx`, `web/components/ui/StepShell.tsx`, `web/lib/copy.ts`, `web/test/copy.test.ts`

**Interfaces:**
- Produces (every later page task consumes these — do not re-invent buttons/cards/step frames inline):
  - `Button` — props `{ variant?: "primary" | "ghost"; loading?: boolean } & ButtonHTMLAttributes`. Primary = the one brand accent; disables + shows a spinner when `loading`.
  - `Card` — props `{ children }`; the standard rounded/padded/subtle-border container.
  - `Textarea` — props `& TextareaHTMLAttributes`; the standard styled multiline input used for every prompt entry.
  - `StepShell` — props `{ stepIndex: number; totalSteps: number; title: string; children: ReactNode; footer?: ReactNode }`; renders a progress indicator (`stepIndex`/`totalSteps`), the `title`, the body, an optional footer, and always renders `<ConfidentialNotice />` inside the day-0 flow frame.
  - `copy.ts` exports `HERO` — the verbatim, jargon-free copy for the landing + 8 day-0 steps, so copy is defined once and not paraphrased per agent.

- [ ] **Step 1: Define theme tokens**

In `web/app/globals.css`, define the palette + type as CSS variables/`@theme` (Tailwind v4). Pick a calm, credible, non-childish scheme (one accent, neutral grays, generous spacing) — the persona is a burned professional, not a gamer. Set: `--color-accent`, `--color-accent-fg`, `--color-bg`, `--color-surface`, `--color-border`, `--color-text`, `--color-muted`, a radius token, and a single font pairing (one sans for UI, loaded via `next/font`). Keep it to ~8 tokens — enough for consistency, not a full design system.

- [ ] **Step 2: Write the failing test for the locked hero copy**

The copy is a contract (verbatim words from research), so we lock its shape with a test — this prevents an agent from paraphrasing the headline or dropping a step.

Create `web/test/copy.test.ts`:
```typescript
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
```

- [ ] **Step 3: Run to confirm failure**

Run: `npm test -- copy`
Expected: FAIL — `@/lib/copy` not found.

- [ ] **Step 4: Implement copy.ts**

Create `web/lib/copy.ts` with the verbatim, jargon-free copy. Each step title/subtext maps to Solution PRD §2.1 and the "explain like I'm in 8th class" rule.
```typescript
export const HERO = {
  headline: "Get your first real AI win in 10 minutes.",
  subline: "Bring one real work task. We'll take you from a rough idea to a result you can actually use — no jargon, no signup first.",
  cta: "Start my first win",
  confidentialNotice:
    "Please don't paste confidential or personal info — this runs on a free AI tier.",
  steps: [
    { key: "landing",   title: "Get your first real AI win in 10 minutes." },
    { key: "task",      title: "What's one real thing you want AI to do for your work?" },
    { key: "weak",      title: "Write the prompt you'd normally type." },
    { key: "diagnosis", title: "Here's why that would give you a so-so answer." },
    { key: "rebuild",   title: "Now here's the same ask, done properly." },
    { key: "run",       title: "Let's run it and see the real result." },
    { key: "check",     title: "Quick check — what made the second one better?" },
    { key: "win",       title: "You just did it. Look at the difference." },
  ],
} as const;
```

- [ ] **Step 5: Run to confirm pass**

Run: `npm test -- copy`
Expected: PASS (3 tests).

- [ ] **Step 6: Build the 4 primitives**

Create `web/components/ui/Button.tsx`, `Card.tsx`, `Textarea.tsx`, `StepShell.tsx` using only the theme tokens (no ad-hoc colors). `Button` primary uses `--color-accent`; `loading` disables and shows an inline spinner. `StepShell` renders a slim progress bar from `stepIndex`/`totalSteps`, the `title` (styled consistently), the body, optional `footer`, and mounts `<ConfidentialNotice />`. These are presentational — verify by rendering, not unit tests.

- [ ] **Step 7: Manual acceptance**

Temporarily render each primitive on a scratch route (or the landing page) via `npm run dev`; confirm the accent color, font, spacing, and the `StepShell` progress bar look coherent and professional. Remove the scratch usage.

- [ ] **Step 8: Note for downstream tasks**

From here on, **page tasks compose `StepShell` + `Button` + `Card` + `Textarea` and pull user-facing strings from `HERO`** — they do not define their own buttons, containers, step frames, or headline copy. This is the consistency contract.

- [ ] **Step 9: Commit**

```bash
git add web/app/globals.css web/tailwind.config.ts web/components/ui web/lib/copy.ts web/test/copy.test.ts
git commit -m "feat: design foundation - theme tokens, shared primitives, locked hero copy"
```

---

## Task 2: Gemini engine wrapper + JSON-mode helper (the core-bet spike)

**Files:**
- Create: `web/lib/gemini/client.ts`, `web/lib/gemini/prompts.ts`, `web/test/gemini/client.test.ts`
- Test: `web/test/gemini/client.test.ts`

**Interfaces:**
- Consumes: `GEMINI_API_KEY` from env.
- Produces:
  - `generateJson<T>(opts: { system: string; user: string }): Promise<T>` — calls Gemini in JSON mode, parses and returns typed JSON, throws `GeminiError` on failure.
  - `generateText(opts: { system: string; user: string }): Promise<string>` — plain text output.
  - `class GeminiError extends Error`.
  - `prompts.ts` exports: `DIAGNOSE_SYSTEM`, `REBUILD_SYSTEM`, `GRADE_DRILL_SYSTEM`, `GRADE_CHECKPOINT_SYSTEM` (string constants used by later tasks).

- [ ] **Step 1: Install the SDK**

```bash
cd web && npm install @google/generative-ai
```

- [ ] **Step 2: Write failing tests for JSON parsing + error handling**

The network call is mocked; we test our wrapper's parsing and error behavior, not Gemini itself.

Create `web/test/gemini/client.test.ts`:
```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";

const mockGenerateContent = vi.fn();
vi.mock("@google/generative-ai", () => ({
  GoogleGenerativeAI: vi.fn(() => ({
    getGenerativeModel: () => ({ generateContent: mockGenerateContent }),
  })),
}));

import { generateJson, GeminiError } from "@/lib/gemini/client";

beforeEach(() => {
  mockGenerateContent.mockReset();
  process.env.GEMINI_API_KEY = "test-key";
});

describe("generateJson", () => {
  it("parses a clean JSON response", async () => {
    mockGenerateContent.mockResolvedValue({
      response: { text: () => '{"ok": true, "n": 2}' },
    });
    const out = await generateJson<{ ok: boolean; n: number }>({ system: "s", user: "u" });
    expect(out).toEqual({ ok: true, n: 2 });
  });

  it("strips ```json fences before parsing", async () => {
    mockGenerateContent.mockResolvedValue({
      response: { text: () => '```json\n{"ok": true}\n```' },
    });
    const out = await generateJson<{ ok: boolean }>({ system: "s", user: "u" });
    expect(out).toEqual({ ok: true });
  });

  it("throws GeminiError on non-JSON output", async () => {
    mockGenerateContent.mockResolvedValue({ response: { text: () => "not json" } });
    await expect(generateJson({ system: "s", user: "u" })).rejects.toBeInstanceOf(GeminiError);
  });

  it("throws GeminiError when the API call rejects", async () => {
    mockGenerateContent.mockRejectedValue(new Error("429 rate limit"));
    await expect(generateJson({ system: "s", user: "u" })).rejects.toBeInstanceOf(GeminiError);
  });
});
```

- [ ] **Step 3: Run to confirm failure**

Run: `npm test -- gemini`
Expected: FAIL — `@/lib/gemini/client` not found.

- [ ] **Step 4: Implement the client**

Create `web/lib/gemini/client.ts`:
```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL = "gemini-3.6-flash";

export class GeminiError extends Error {
  constructor(message: string, readonly cause?: unknown) {
    super(message);
    this.name = "GeminiError";
  }
}

function model() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new GeminiError("GEMINI_API_KEY is not set");
  return new GoogleGenerativeAI(key).getGenerativeModel({ model: MODEL });
}

function stripFences(raw: string): string {
  return raw.trim().replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
}

export async function generateText(opts: { system: string; user: string }): Promise<string> {
  try {
    const res = await model().generateContent(
      `${opts.system}\n\n---\n\n${opts.user}`,
    );
    return res.response.text().trim();
  } catch (e) {
    throw new GeminiError("Gemini text generation failed", e);
  }
}

export async function generateJson<T>(opts: { system: string; user: string }): Promise<T> {
  let raw: string;
  try {
    const res = await model().generateContent(
      `${opts.system}\n\nRespond with ONLY valid JSON, no prose.\n\n---\n\n${opts.user}`,
    );
    raw = res.response.text();
  } catch (e) {
    throw new GeminiError("Gemini call failed", e);
  }
  try {
    return JSON.parse(stripFences(raw)) as T;
  } catch (e) {
    throw new GeminiError(`Gemini returned non-JSON: ${raw.slice(0, 120)}`, e);
  }
}
```

- [ ] **Step 5: Run to confirm pass**

Run: `npm test -- gemini`
Expected: PASS (4 tests).

- [ ] **Step 6: Write the system prompts**

Create `web/lib/gemini/prompts.ts`. These encode the jargon-free rule and the role/context/format/constraints pattern that IS the product (Solution PRD §2.1 step 5).
```typescript
export const DIAGNOSE_SYSTEM = `
You are a friendly coach for a non-technical professional. They will give you a
prompt they wrote for an AI tool. Explain, in plain language an 8th-grade student
would understand, WHY the prompt will give a weak result. Use NO technical jargon.
Name 2 or 3 concrete things it is missing, chosen from: who the AI should act as
(role), background the AI needs (context), what shape the answer should take
(format), and limits/rules (constraints).
Return JSON: { "issues": string[], "encouragement": string }.
Each issue is one short, plain sentence. Keep "encouragement" to one warm sentence.
`.trim();

export const REBUILD_SYSTEM = `
You rewrite a weak AI prompt into a strong, structured one for a non-technical
professional, teaching the reusable pattern as you go.
Structure the rewrite with four labelled parts: Role, Context, Format, Constraints.
Keep the user's real intent and their own task. Plain language, no jargon.
Return JSON: {
  "structuredPrompt": string,   // the full rewritten prompt, ready to run
  "pattern": string             // one plain sentence naming the reusable pattern
}
`.trim();

export const GRADE_DRILL_SYSTEM = `
You grade one short prompting drill for a beginner. You are given the lever the
drill teaches (e.g. "adding context") and the user's attempt. Judge ONLY whether
they applied that one lever. Be encouraging but honest.
Return JSON: { "passed": boolean, "feedback": string }.
"feedback" is one or two plain sentences: what they did well, and the single most
useful next improvement.
`.trim();

export const GRADE_CHECKPOINT_SYSTEM = `
You grade a real work task a beginner did with AI, against a simple rubric.
You are given their final prompt and the AI output they got. Score each rubric
item as met or not: role, context, format, constraints, usable_result.
Return JSON: {
  "items": { "role": boolean, "context": boolean, "format": boolean,
             "constraints": boolean, "usable_result": boolean },
  "passed": boolean,        // true if usable_result AND at least 3 of the 4 others
  "feedback": string        // 2-3 plain, encouraging sentences
}
`.trim();
```

- [ ] **Step 7: Manual engine smoke (the actual de-risking)**

Create a throwaway script `web/scripts/spike.mjs` that imports nothing app-specific — it directly calls the SDK with `REBUILD_SYSTEM` and a sample weak prompt ("write a job description for a marketing manager") using your real key from `.env.local`. Run `node --env-file=.env.local scripts/spike.mjs`. **Confirm by eye:** the structured prompt is genuinely better, jargon-free, and returns in < ~5s. This is the go/no-go on the core bet. Delete the script after.

- [ ] **Step 8: Commit**

```bash
git add web/lib/gemini web/test/gemini web/package.json web/package-lock.json
git commit -m "feat: Gemini JSON wrapper + system prompts, engine spike verified"
```

---

## Task 3: Canonical event map + PostHog track() wrapper

**Files:**
- Create: `web/lib/analytics/events.ts`, `web/lib/analytics/track.ts`, `web/test/analytics/track.test.ts`
- Test: `web/test/analytics/track.test.ts`

**Interfaces:**
- Produces:
  - `enum Ev` — the canonical event names (exact strings below).
  - `track(event: Ev, props?: Record<string, unknown>): void` — fires to PostHog if initialized, safe no-op if not.
  - `identifyUser(id: string, props?: Record<string, unknown>): void` — aliases the anonymous id to the signed-in user.
- Consumes: `posthog-js` (initialized in Task 4's provider).

The event names are the Solution PRD §3 map, verbatim.

- [ ] **Step 1: Install posthog-js**

```bash
cd web && npm install posthog-js
```

- [ ] **Step 2: Write the failing test**

We inject a fake posthog so we assert the wrapper forwards the exact event name + props and never throws when posthog is absent.

Create `web/test/analytics/track.test.ts`:
```typescript
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
```

- [ ] **Step 3: Run to confirm failure**

Run: `npm test -- analytics`
Expected: FAIL — modules not found.

- [ ] **Step 4: Implement events.ts**

Create `web/lib/analytics/events.ts`:
```typescript
// Canonical event map — Solution PRD §3. Do not inline raw event strings elsewhere.
export enum Ev {
  LandingView = "landing_view",
  TaskStarted = "task_started",
  WeakPromptSubmitted = "weak_prompt_submitted",
  PromptRebuilt = "prompt_rebuilt",
  OutputGenerated = "output_generated",
  InlineCheckAnswered = "inline_check_answered",
  FirstWinCompleted = "first_win_completed", // ★ headline activation
  SignupCompleted = "signup_completed",
  DrillStarted = "drill_started",
  DrillCompleted = "drill_completed",
  StreakDay = "streak_day",
  CheckpointStarted = "checkpoint_started",
  CheckpointGraded = "checkpoint_graded",
  ShareCardGenerated = "share_card_generated",
  ShareCardClicked = "share_card_clicked",
  FakedoorClicked = "fakedoor_clicked",
}
```

- [ ] **Step 5: Implement track.ts**

Create `web/lib/analytics/track.ts`:
```typescript
import type { PostHog } from "posthog-js";
import { Ev } from "./events";

let client: Pick<PostHog, "capture" | "identify"> | null = null;

export function setPosthog(instance: Pick<PostHog, "capture" | "identify"> | null) {
  client = instance;
}
// test seam
export const __setPosthogForTest = setPosthog;

export function track(event: Ev, props?: Record<string, unknown>): void {
  client?.capture(event, props);
}

export function identifyUser(id: string, props?: Record<string, unknown>): void {
  client?.identify(id, props);
}
```

- [ ] **Step 6: Run to confirm pass**

Run: `npm test -- analytics`
Expected: PASS (3 tests).

- [ ] **Step 7: Commit**

```bash
git add web/lib/analytics web/test/analytics web/package.json web/package-lock.json
git commit -m "feat: canonical event map + PostHog track wrapper"
```

---

## Task 4: Landing page + PostHog provider + anonymous state module

**Files:**
- Create: `web/lib/state/localProgress.ts`, `web/test/state/localProgress.test.ts`, `web/components/ConfidentialNotice.tsx`
- Modify: `web/app/layout.tsx` (mount PostHog provider), `web/app/page.tsx` (landing → step 1)

**Interfaces:**
- Consumes: `Ev`, `track` (Task 3).
- Produces:
  - `localProgress` module: `readAnon(): AnonState`, `writeAnon(patch: Partial<AnonState>): void`, `clearAnon(): void`, `type AnonState = { taskText?: string; weakPrompt?: string; structuredPrompt?: string; output?: string; firstWinAt?: string }`.
  - Landing page firing `Ev.LandingView` and routing to `/start`.

- [ ] **Step 1: Write the failing test for localProgress**

Create `web/test/state/localProgress.test.ts`:
```typescript
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
```

- [ ] **Step 2: Run to confirm failure**

Run: `npm test -- localProgress`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement localProgress.ts**

Create `web/lib/state/localProgress.ts`:
```typescript
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
```

- [ ] **Step 4: Run to confirm pass**

Run: `npm test -- localProgress`
Expected: PASS (4 tests).

- [ ] **Step 5: Mount the PostHog provider**

Create `web/components/PostHogProvider.tsx` — a client component that, on mount, calls `posthog.init(NEXT_PUBLIC_POSTHOG_KEY, { api_host: NEXT_PUBLIC_POSTHOG_HOST })` and then `setPosthog(posthog)` (from `lib/analytics/track`). Render `{children}`. Guard against double-init. Wrap `{children}` with it in `web/app/layout.tsx`.

- [ ] **Step 6: Build the landing page (step 1)**

Rewrite `web/app/page.tsx` as a client component. Responsibility: the verbatim-words hero (Solution PRD §2.1 step 1): headline **"Get your first real AI win in 10 minutes."**, one subline, one CTA button → `router.push("/start")`. Fire `track(Ev.LandingView)` in a `useEffect` on mount. Include `<ConfidentialNotice />` in the footer.

`web/components/ConfidentialNotice.tsx`: a small always-visible banner reading "Please don't paste confidential or personal info — this uses a free AI tier." No logic; pure presentation.

- [ ] **Step 7: Manual acceptance**

Run `npm run dev`. Load `/`, confirm the headline renders and the notice shows. In PostHog Live Events, confirm `landing_view` arrives. Click CTA → lands on `/start` (blank for now).

- [ ] **Step 8: Commit**

```bash
git add web/app web/components web/lib/state web/test/state
git commit -m "feat: landing page, PostHog provider, anonymous state module"
```

---

## Task 5: Day-0 steps 2–4 — ask the task, capture weak prompt, jargon-free diagnosis

**Files:**
- Create: `web/app/api/diagnose/route.ts`, `web/test/api/diagnose.test.ts`
- Modify: `web/app/start/page.tsx` (steps 2–4 of the flow)

**Interfaces:**
- Consumes: `generateJson`, `DIAGNOSE_SYSTEM` (Task 2); `writeAnon` (Task 4); `Ev`, `track` (Task 3).
- Produces:
  - `POST /api/diagnose` — body `{ taskText: string; weakPrompt: string }` → `{ issues: string[]; encouragement: string }`.
  - `start` page state machine reaching the "diagnosis shown" step.

- [ ] **Step 1: Write the failing test for the diagnose route**

Mock the gemini module so we test the route's contract, not the model.

Create `web/test/api/diagnose.test.ts`:
```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/gemini/client", () => ({
  generateJson: vi.fn(),
  GeminiError: class extends Error {},
}));
import { generateJson } from "@/lib/gemini/client";
import { POST } from "@/app/api/diagnose/route";

beforeEach(() => vi.mocked(generateJson).mockReset());

function req(body: unknown) {
  return new Request("http://x/api/diagnose", { method: "POST", body: JSON.stringify(body) });
}

describe("POST /api/diagnose", () => {
  it("returns issues from the model", async () => {
    vi.mocked(generateJson).mockResolvedValue({ issues: ["No role given"], encouragement: "Good start!" });
    const res = await POST(req({ taskText: "JD", weakPrompt: "write a JD" }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ issues: ["No role given"], encouragement: "Good start!" });
  });

  it("400s when weakPrompt is missing", async () => {
    const res = await POST(req({ taskText: "JD" }));
    expect(res.status).toBe(400);
  });

  it("502s when the model errors", async () => {
    vi.mocked(generateJson).mockRejectedValue(new Error("boom"));
    const res = await POST(req({ taskText: "JD", weakPrompt: "x" }));
    expect(res.status).toBe(502);
  });
});
```

- [ ] **Step 2: Run to confirm failure**

Run: `npm test -- diagnose`
Expected: FAIL — route not found.

- [ ] **Step 3: Implement the diagnose route**

Create `web/app/api/diagnose/route.ts`:
```typescript
import { NextResponse } from "next/server";
import { generateJson } from "@/lib/gemini/client";
import { DIAGNOSE_SYSTEM } from "@/lib/gemini/prompts";

type Body = { taskText?: string; weakPrompt?: string };
type Diagnosis = { issues: string[]; encouragement: string };

export async function POST(request: Request) {
  const { taskText, weakPrompt } = (await request.json()) as Body;
  if (!weakPrompt || !taskText) {
    return NextResponse.json({ error: "taskText and weakPrompt are required" }, { status: 400 });
  }
  try {
    const result = await generateJson<Diagnosis>({
      system: DIAGNOSE_SYSTEM,
      user: `Task the user wants to do: ${taskText}\nTheir prompt: ${weakPrompt}`,
    });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "diagnosis failed" }, { status: 502 });
  }
}
```

- [ ] **Step 4: Run to confirm pass**

Run: `npm test -- diagnose`
Expected: PASS (3 tests).

- [ ] **Step 5: Build start-page steps 2–4**

Rewrite `web/app/start/page.tsx` as a client component holding a `step` state (`"task" | "weak" | "diagnosis" | ...` — the rest added in Task 6). Wire:
- **Step 2 (task):** heading "What's one real thing you want AI to do for your work?", 3 example chips (`draft a JD/email`, `summarize a long report`, `analyze a sheet`) + a free-text field. On submit: `writeAnon({ taskText })`, `track(Ev.TaskStarted, { task_text_len: taskText.length })`, advance to `weak`. Show `<ConfidentialNotice />`.
- **Step 3 (weak):** "Now write the prompt you'd normally type." Textarea. On submit: `writeAnon({ weakPrompt })`, `track(Ev.WeakPromptSubmitted)`, POST `/api/diagnose`, show a spinner, advance to `diagnosis`.
- **Step 4 (diagnosis):** render `issues` as a plain bulleted list + `encouragement`. One button "Fix it for me →" advancing to the rebuild step (Task 6).

- [ ] **Step 6: Manual acceptance**

`npm run dev`, walk `/start` through task → weak prompt → see a real jargon-free diagnosis. Confirm `task_started` and `weak_prompt_submitted` in PostHog.

- [ ] **Step 7: Commit**

```bash
git add web/app/api/diagnose web/test/api web/app/start
git commit -m "feat: day-0 steps 2-4 (task, weak prompt, jargon-free diagnosis)"
```

---

## Task 6: Day-0 steps 5–8 — rebuild, live run, inline check, win moment

**Files:**
- Create: `web/app/api/rebuild/route.ts`, `web/app/api/run/route.ts`, `web/test/api/rebuild.test.ts`
- Modify: `web/app/start/page.tsx` (steps 5–8)

**Interfaces:**
- Consumes: `generateJson`, `generateText`, `REBUILD_SYSTEM` (Task 2); `writeAnon`, `readAnon` (Task 4); `Ev`, `track` (Task 3).
- Produces:
  - `POST /api/rebuild` — `{ taskText, weakPrompt }` → `{ structuredPrompt: string; pattern: string }`.
  - `POST /api/run` — `{ structuredPrompt }` → `{ output: string }`.
  - `start` page reaching the win moment and firing `Ev.FirstWinCompleted`.

- [ ] **Step 1: Write the failing test for the rebuild route**

Create `web/test/api/rebuild.test.ts`:
```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";
vi.mock("@/lib/gemini/client", () => ({
  generateJson: vi.fn(),
  generateText: vi.fn(),
  GeminiError: class extends Error {},
}));
import { generateJson } from "@/lib/gemini/client";
import { POST } from "@/app/api/rebuild/route";

beforeEach(() => vi.mocked(generateJson).mockReset());
const req = (b: unknown) => new Request("http://x", { method: "POST", body: JSON.stringify(b) });

describe("POST /api/rebuild", () => {
  it("returns structuredPrompt + pattern", async () => {
    vi.mocked(generateJson).mockResolvedValue({ structuredPrompt: "Role: ...", pattern: "Add role+context." });
    const res = await POST(req({ taskText: "JD", weakPrompt: "write a JD" }));
    expect(await res.json()).toEqual({ structuredPrompt: "Role: ...", pattern: "Add role+context." });
  });
  it("400s without weakPrompt", async () => {
    expect((await POST(req({ taskText: "JD" }))).status).toBe(400);
  });
});
```

- [ ] **Step 2: Run to confirm failure**

Run: `npm test -- rebuild`
Expected: FAIL.

- [ ] **Step 3: Implement rebuild + run routes**

Create `web/app/api/rebuild/route.ts` (mirror the diagnose route, using `REBUILD_SYSTEM`, returning `{ structuredPrompt, pattern }`, same 400/502 handling).

Create `web/app/api/run/route.ts`:
```typescript
import { NextResponse } from "next/server";
import { generateText } from "@/lib/gemini/client";

export async function POST(request: Request) {
  const { structuredPrompt } = (await request.json()) as { structuredPrompt?: string };
  if (!structuredPrompt) {
    return NextResponse.json({ error: "structuredPrompt required" }, { status: 400 });
  }
  try {
    const output = await generateText({
      system: "You are a capable work assistant. Do exactly what the prompt asks. Plain, usable output.",
      user: structuredPrompt,
    });
    return NextResponse.json({ output });
  } catch {
    return NextResponse.json({ error: "run failed" }, { status: 502 });
  }
}
```

- [ ] **Step 4: Run to confirm pass**

Run: `npm test -- rebuild`
Expected: PASS.

- [ ] **Step 5: Build start-page steps 5–8**

Extend `web/app/start/page.tsx`:
- **Step 5 (rebuild):** POST `/api/rebuild`. Show the **before → after** (weak prompt vs structured prompt) side by side, plus the one-sentence `pattern` ("the reusable pattern"). `writeAnon({ structuredPrompt })`, `track(Ev.PromptRebuilt)`. Button "Run it →".
- **Step 6 (run):** POST `/api/run`, show spinner then the real output. `writeAnon({ output })`, `track(Ev.OutputGenerated)`.
- **Step 7 (inline check):** one micro-question — "What made the second prompt better?" with 3 options (added role+context / gave a clear format / all of it). On answer: `track(Ev.InlineCheckAnswered, { correct: boolean })`. Any answer proceeds (this is a confidence check, not a gate).
- **Step 8 (win moment):** the "You went from **this** → **that**" recap. `writeAnon({ firstWinAt: new Date().toISOString() })`, `track(Ev.FirstWinCompleted, { task_type: "byo" })`. Render `<WinCard />` (Task 11 fills its share behavior; for now render the recap) and a primary CTA "Save my progress" → `/start` signup step handled in Task 7.

- [ ] **Step 6: Manual acceptance (the hero walk-through)**

`npm run dev`, complete the entire flow end to end with a real task. Confirm the output is genuinely usable and the recap shows. In PostHog, confirm the **full ordered funnel** `landing_view → task_started → weak_prompt_submitted → prompt_rebuilt → output_generated → inline_check_answered → first_win_completed`.

- [ ] **Step 7: Commit**

```bash
git add web/app/api/rebuild web/app/api/run web/test/api/rebuild.test.ts web/app/start
git commit -m "feat: day-0 steps 5-8 (rebuild, run, inline check, first win)"
```

---

## Task 7: Google OAuth at the win moment + persist anonymous progress

**Files:**
- Create: `web/lib/supabase/client.ts`, `web/lib/supabase/server.ts`, `web/app/auth/callback/route.ts`, `web/app/api/persist-progress/route.ts`, `web/supabase/schema.sql`
- Modify: `web/app/start/page.tsx` (signup CTA), `web/components/PostHogProvider.tsx` (identify on auth)

**Interfaces:**
- Consumes: `readAnon`, `clearAnon` (Task 4); `identifyUser`, `track`, `Ev` (Task 3).
- Produces:
  - `getBrowserSupabase()`, `getServerSupabase()`.
  - `POST /api/persist-progress` — authenticated; writes the anon first-win into `profiles` + `progress`.
  - DB schema: `profiles(id uuid pk, email text, tasks_completed int default 1, created_at timestamptz)`, `progress(user_id uuid pk, drill1 bool, drill2 bool, drill3 bool, streak int, last_active date, checkpoint_passed bool)`.

- [ ] **Step 1: Install + apply schema**

```bash
cd web && npm install @supabase/supabase-js @supabase/ssr
```
Create `web/supabase/schema.sql` with the two tables above (RLS on; policy: a user can read/write only rows where `user_id = auth.uid()`). Apply it in the Supabase SQL editor.

- [ ] **Step 2: Implement supabase clients**

Create `web/lib/supabase/client.ts` (browser client via `createBrowserClient` with the anon key) and `web/lib/supabase/server.ts` (server client via `createServerClient` with cookies; a service-role variant for the persist route). Standard `@supabase/ssr` boilerplate.

- [ ] **Step 3: Write the failing test for persist-progress validation**

We test the route's auth + validation contract with a mocked supabase server client.

Create `web/test/api/persist.test.ts`:
```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";
const getUser = vi.fn();
const upsert = vi.fn().mockResolvedValue({ error: null });
vi.mock("@/lib/supabase/server", () => ({
  getServerSupabase: () => ({ auth: { getUser }, from: () => ({ upsert }) }),
}));
import { POST } from "@/app/api/persist-progress/route";

beforeEach(() => { getUser.mockReset(); upsert.mockClear(); });
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
  });
});
```

- [ ] **Step 4: Run to confirm failure, then implement, then pass**

Run: `npm test -- persist` (FAIL) → implement `web/app/api/persist-progress/route.ts` (get user; 401 if none; upsert a `profiles` row with `tasks_completed: 1` and a `progress` row with defaults; 200) → `npm test -- persist` (PASS).

- [ ] **Step 5: Wire OAuth into the win moment**

In `start` step 8, "Save my progress" calls `getBrowserSupabase().auth.signInWithOAuth({ provider: "google", options: { redirectTo: <origin>/auth/callback } })`. Implement `web/app/auth/callback/route.ts` to exchange the code for a session, then redirect to `/dashboard`. On the client after auth resolves: read `readAnon()`, POST `/api/persist-progress`, `identifyUser(user.id, { email })`, `track(Ev.SignupCompleted)`, then `clearAnon()`.

- [ ] **Step 6: Manual acceptance**

Complete the flow → click "Save my progress" → Google consent → land on `/dashboard`. Confirm a `profiles` + `progress` row exist in Supabase, that PostHog shows `signup_completed` and the user is now identified (same person, not anonymous).

- [ ] **Step 7: Commit**

```bash
git add web/lib/supabase web/app/auth web/app/api/persist-progress web/supabase web/test/api/persist.test.ts web/app/start web/components/PostHogProvider.tsx
git commit -m "feat: Google OAuth at win moment + persist anonymous progress"
```

---

## Task 8: The returning loop — 3 drills + auto-graded inline check + progress list

**Files:**
- Create: `web/lib/drills/data.ts`, `web/app/api/grade-drill/route.ts`, `web/test/api/grade-drill.test.ts`, `web/app/drill/[id]/page.tsx`, `web/components/ProgressList.tsx`, `web/app/dashboard/page.tsx`
- Test: `web/test/api/grade-drill.test.ts`

**Interfaces:**
- Consumes: `generateJson`, `GRADE_DRILL_SYSTEM` (Task 2); supabase clients (Task 7); `Ev`, `track` (Task 3).
- Produces:
  - `DRILLS: { id: string; lever: string; title: string; brief: string }[]` (exactly 3).
  - `POST /api/grade-drill` — `{ drillId, attempt }` → `{ passed: boolean; feedback: string }`.
  - `/dashboard` showing "AI tasks you can now do" + the 3 drills with completion state; `/drill/[id]` running one drill.

- [ ] **Step 1: Define the 3 drills**

Create `web/lib/drills/data.ts` — 3 drills, each isolating one lever (Solution PRD §2.2): (1) adding context, (2) specifying format, (3) chaining steps. Each has `id`, `lever`, `title`, a one-line `brief`, and a starter weak prompt.

- [ ] **Step 2–4: TDD the grade-drill route**

Write `web/test/api/grade-drill.test.ts` (mock `generateJson`: returns `{ passed, feedback }`; assert 200 passthrough, 400 on missing `attempt`, 502 on model error) → run FAIL → implement `web/app/api/grade-drill/route.ts` (looks up the drill's `lever` from `DRILLS`, passes lever + attempt to `generateJson` with `GRADE_DRILL_SYSTEM`) → run PASS.

- [ ] **Step 5: Build /drill/[id]**

Client page: show the drill brief + starter, textarea for the improved prompt. On submit: `track(Ev.DrillStarted, { drill_id })`, POST `/api/grade-drill`, show `passed` + `feedback`. On pass: update the user's `progress` row (`drillN = true`) via supabase, `track(Ev.DrillCompleted, { drill_id })`, and route back to `/dashboard`.

- [ ] **Step 6: Build /dashboard + ProgressList**

`/dashboard` (auth-gated; redirect to `/` if no session): read the user's `progress` row. Render `<ProgressList />` = "AI tasks you can now do" (one line per completed drill/checkpoint), the 3 drills with done/not-done state linking to `/drill/[id]`, and `<StreakBadge />` (Task 9). When all 3 drills are done, surface a "Take the checkpoint" CTA → `/checkpoint` (Task 10).

- [ ] **Step 7: Manual acceptance**

Sign in, complete a drill, confirm the dashboard marks it done, "tasks you can now do" grows, and PostHog shows `drill_started` + `drill_completed`.

- [ ] **Step 8: Commit**

```bash
git add web/lib/drills web/app/api/grade-drill web/test/api/grade-drill.test.ts web/app/drill web/app/dashboard web/components/ProgressList.tsx
git commit -m "feat: returning loop - 3 auto-graded drills + progress list"
```

---

## Task 9: Streak logic + badge

**Files:**
- Create: `web/lib/state/streak.ts`, `web/test/state/streak.test.ts`, `web/components/StreakBadge.tsx`
- Modify: `web/app/dashboard/page.tsx` (call streak update on load)

**Interfaces:**
- Produces: `nextStreak(prev: { streak: number; lastActive: string | null }, today: string): { streak: number; lastActive: string }` — pure function. Same-day = unchanged; consecutive day = +1; gap = reset to 1.

- [ ] **Step 1: Write the failing test**

Create `web/test/state/streak.test.ts`:
```typescript
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
```

- [ ] **Step 2: Run to confirm failure**

Run: `npm test -- streak`
Expected: FAIL.

- [ ] **Step 3: Implement streak.ts**

Create `web/lib/state/streak.ts`:
```typescript
type StreakState = { streak: number; lastActive: string | null };

function daysBetween(a: string, b: string): number {
  const ms = new Date(b + "T00:00:00Z").getTime() - new Date(a + "T00:00:00Z").getTime();
  return Math.round(ms / 86_400_000);
}

export function nextStreak(prev: StreakState, today: string): { streak: number; lastActive: string } {
  if (prev.lastActive === null) return { streak: 1, lastActive: today };
  const gap = daysBetween(prev.lastActive, today);
  if (gap === 0) return { streak: prev.streak, lastActive: prev.lastActive };
  if (gap === 1) return { streak: prev.streak + 1, lastActive: today };
  return { streak: 1, lastActive: today };
}
```

- [ ] **Step 4: Run to confirm pass**

Run: `npm test -- streak`
Expected: PASS (4 tests).

- [ ] **Step 5: Wire it in**

On `/dashboard` load (authed): read `progress.streak`/`last_active`, compute `nextStreak(..., todayUTCDate())`, and if it changed, persist it and `track(Ev.StreakDay, { streak })`. Render `<StreakBadge streak={n} />`.

- [ ] **Step 6: Commit**

```bash
git add web/lib/state/streak.ts web/test/state/streak.test.ts web/components/StreakBadge.tsx web/app/dashboard
git commit -m "feat: streak logic + badge"
```

---

## Task 10: AI-judged checkpoint + rubric parser + drills-only fallback

**Files:**
- Create: `web/lib/grading/parseVerdict.ts`, `web/test/grading/parseVerdict.test.ts`, `web/app/api/grade-checkpoint/route.ts`, `web/app/checkpoint/page.tsx`
- Modify: `web/lib/meta.ts` (add `checkpointEnabled()` reading an env flag)

**Interfaces:**
- Consumes: `generateJson`, `GRADE_CHECKPOINT_SYSTEM` (Task 2); `Ev`, `track` (Task 3).
- Produces:
  - `parseVerdict(raw: unknown): Verdict` where `Verdict = { items: {...booleans}; passed: boolean; feedback: string }` — defensively normalizes a possibly-malformed LLM object.
  - `POST /api/grade-checkpoint` — `{ finalPrompt, output }` → `Verdict`.
  - `checkpointEnabled(): boolean` — the fallback flag (env `NEXT_PUBLIC_CHECKPOINT_ENABLED !== "false"`).

- [ ] **Step 1: Write the failing test for the parser (the fuzzy-half guard)**

Create `web/test/grading/parseVerdict.test.ts`:
```typescript
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
```

- [ ] **Step 2: Run to confirm failure**

Run: `npm test -- parseVerdict`
Expected: FAIL.

- [ ] **Step 3: Implement parseVerdict.ts**

Create `web/lib/grading/parseVerdict.ts`:
```typescript
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
```

- [ ] **Step 4: Run to confirm pass**

Run: `npm test -- parseVerdict`
Expected: PASS (3 tests).

- [ ] **Step 5: Implement the checkpoint route + page**

`web/app/api/grade-checkpoint/route.ts`: POST `{ finalPrompt, output }` → `generateJson` with `GRADE_CHECKPOINT_SYSTEM` → `parseVerdict(result)` → return it (502 on model error). `web/app/checkpoint/page.tsx` (auth-gated): a "do a real task" brief, inputs for the user's final prompt + the AI output they got, submit → `track(Ev.CheckpointStarted)` → POST → render the rubric checklist + feedback → on response `track(Ev.CheckpointGraded, { passed })`; on pass set `progress.checkpoint_passed = true` and add it to "tasks you can now do". After grading, route to `/unlock` (Task 11).

- [ ] **Step 6: Wire the fallback flag**

Add `checkpointEnabled()` to `lib/meta.ts`. On `/dashboard`, only show the "Take the checkpoint" CTA when `checkpointEnabled()` is true. **This is the A4 kill-switch:** if AI-grading proves unreliable during the soft launch, set `NEXT_PUBLIC_CHECKPOINT_ENABLED=false` in Vercel and the app ships drills-only, coherent, with the fake-door reachable from the dashboard instead.

- [ ] **Step 7: Manual acceptance**

Complete a checkpoint with a decent and a deliberately weak attempt; confirm the rubric verdict differs sensibly and both grade without crashing. Confirm `checkpoint_started`/`checkpoint_graded` in PostHog.

- [ ] **Step 8: Commit**

```bash
git add web/lib/grading web/test/grading web/app/api/grade-checkpoint web/app/checkpoint web/lib/meta.ts web/app/dashboard
git commit -m "feat: AI-judged checkpoint + defensive rubric parser + drills-only fallback flag"
```

---

## Task 11: Win-card share loop + ₹399 fake-door

**Files:**
- Create: `web/app/unlock/page.tsx`
- Modify: `web/components/WinCard.tsx` (share behavior), `web/app/start/page.tsx` (render WinCard at win moment)

**Interfaces:**
- Consumes: `Ev`, `track` (Task 3); `readAnon` (Task 4).
- Produces:
  - `<WinCard task={string} />` — renders the "I just did [task] with AI in 10 minutes" card + a Share/Copy-link button.
  - `/unlock` — the single ₹399/mo fake-door.

- [ ] **Step 1: Win card + share loop**

Flesh out `web/components/WinCard.tsx`: on render, `track(Ev.ShareCardGenerated, { task })`. A "Share my win" button that copies a prefilled link/text to clipboard (or opens the native share sheet) and fires `track(Ev.ShareCardClicked)`. Render it at the day-0 win moment (Task 6 step 8) with the user's `taskText`.

- [ ] **Step 2: The fake-door**

Create `web/app/unlock/page.tsx`: headline "Unlock the full path," a short value line, a single **₹399/mo** price, one button "Unlock". On click: `track(Ev.FakedoorClicked)` → show "Coming soon — drop your email and we'll let you in first" with an email capture (store to a Supabase `waitlist` table or PostHog person property). **No real payment.** This is the WTP intent signal.

- [ ] **Step 3: Manual acceptance**

At the win moment confirm `share_card_generated`; click share → `share_card_clicked`. Reach `/unlock`, click Unlock → `fakedoor_clicked` + email capture works.

- [ ] **Step 4: Commit**

```bash
git add web/components/WinCard.tsx web/app/unlock web/app/start
git commit -m "feat: win-card share loop + ₹399 fake-door"
```

---

## Task 12: End-to-end event QA + verbatim landing polish + launch checklist

**Files:**
- Create: `web/test/analytics/event-coverage.test.ts`, `docs/superpowers/plans/launch-checklist.md`
- Modify: landing/dashboard copy as needed

**Interfaces:**
- Consumes: `Ev` (Task 3).
- Produces: a test asserting every `Ev` member is referenced somewhere in `web/app` or `web/components` (catches an event that was defined but never wired), plus a human launch checklist.

- [ ] **Step 1: Write the event-coverage test**

Create `web/test/analytics/event-coverage.test.ts` that reads all source files under `web/app` and `web/components`, and asserts each `Ev` value string appears at least once. This catches a dropped event before it costs you baseline data.
```typescript
import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { Ev } from "@/lib/analytics/events";

function allSource(dir: string, acc: string[] = []): string[] {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) allSource(p, acc);
    else if (/\.(tsx?|ts)$/.test(p)) acc.push(readFileSync(p, "utf8"));
  }
  return acc;
}

describe("event coverage", () => {
  const blob = [...allSource("app"), ...allSource("components")].join("\n");
  for (const value of Object.values(Ev)) {
    it(`fires ${value} somewhere`, () => {
      expect(blob.includes(value) || blob.includes(`Ev.${keyOf(value)}`)).toBe(true);
    });
  }
});
function keyOf(v: string) {
  return Object.entries(Ev).find(([, val]) => val === v)![0];
}
```
*(If a `share`/`fakedoor` event is intentionally reached only via a component, ensure that file is under `components/` so it's scanned.)*

- [ ] **Step 2: Run and fix gaps**

Run: `npm test -- event-coverage`. For any event not found, wire it at its correct step (do not delete the assertion — the missing wiring is the bug). Re-run to green.

- [ ] **Step 3: Full manual funnel walk-through on the deployed Vercel URL**

Using the **production** deploy (not localhost), complete the whole journey once as a real user would, in one PostHog session. Confirm the entire ordered funnel appears for one person:
`landing_view → task_started → weak_prompt_submitted → prompt_rebuilt → output_generated → inline_check_answered → first_win_completed → signup_completed → drill_started → drill_completed → streak_day → checkpoint_started → checkpoint_graded → share_card_generated → share_card_clicked → fakedoor_clicked`.

- [ ] **Step 4: Build the PostHog funnel + retention insights**

In PostHog, save two insights: a **funnel** from `landing_view` → `first_win_completed` → `signup_completed` → `checkpoint_graded` → `fakedoor_clicked`, and a **retention** insight keyed on `signup_completed` with return = `streak_day` (D1/D2). These are what the case study reports.

- [ ] **Step 5: Write the launch checklist**

Create `docs/superpowers/plans/launch-checklist.md`: verbatim-words landing copy locked; confidential-info notice present; env vars set in Vercel; Supabase RLS on; PostHog receiving prod events; the 28 leads list ready with the recruiting message (users' own words); a plan to record baseline thresholds after the first ~10 users so the deferred success-test "X%" bars get set from real data.

- [ ] **Step 6: Commit**

```bash
git add web/test/analytics/event-coverage.test.ts docs/superpowers/plans/launch-checklist.md
git commit -m "test: event coverage guard + launch checklist"
```

---

## Post-plan: launch & iterate (not code tasks)

1. Recruit off the 28 captured leads + interview networks → soft launch to a first ~10 users.
2. Read the funnel; set the deferred success-test thresholds from that baseline.
3. Watch the **A3 signal**: are people bringing writing tasks or automation tasks? Log it — this resolves the automation-vs-writing default.
4. Watch **A4**: if checkpoint grading wobbles, flip `NEXT_PUBLIC_CHECKPOINT_ENABLED=false` (drills-only still ships).
5. Iterate once on the biggest drop-off, then write the Final PRD with the funnel data + documented iterations.

---

## Self-Review

**Spec coverage (Solution PRD → task):**
- Visual coherence + trust for the graded hero screen (P6) → Task 1.5 (tokens + primitives + locked copy, inherited by all page tasks). ✅
- §1.2 guided-rails web app → Tasks 4–6. ✅
- §1.3 bring-your-own writing-scaffolded first win → Task 5 (task ask, free text) + Task 6 (rebuild scaffolds role/context/format/constraints). ✅
- §1.4 lean scope (win + 3 drills + 1 checkpoint) → Tasks 6, 8, 10; out-of-scope items guarded in Global Constraints. ✅
- §2.1 8-step day-0 flow → Tasks 4 (1–2), 5 (2–4), 6 (5–8). ✅
- §2.2 returning loop (3 drills, streak, progress metaphor, checkpoint + fallback) → Tasks 8, 9, 10. ✅
- §2.3 engine/build/auth (Gemini free tier, Next/Vercel, Google OAuth at win) → Tasks 1, 2, 7. ✅
- §2.4 acquisition + one win-card loop → Task 11 (card) + Task 12 (checklist/recruiting). ✅
- §3 measurement (PostHog, headline `first_win_completed`, full event map, deferred thresholds) → Task 3 + firings throughout + Task 12 funnel/retention. ✅
- §4 business model (post-checkpoint subscription fake-door, single ₹399/mo) → Task 11 + Task 10 routing to `/unlock`. ✅
- §5 risks (A3 bring-your-own, A4 drills-only fallback flag) → Task 6 (byo) + Task 10 (flag). ✅

**Placeholder scan:** No "TBD"/"add error handling"/"write tests for the above" left. Precision-critical logic has full code + tests; scaffolding/UI steps give exact commands, exact events, exact `lib/` calls, and a concrete acceptance check (the granularity note above states this explicitly). ✅

**Type consistency:** `AnonState` fields (`taskText`/`weakPrompt`/`structuredPrompt`/`output`/`firstWinAt`) are used consistently across Tasks 4–7. `Ev` enum values match the Solution PRD §3 strings and the event-coverage test. `Verdict`/`RubricItems` keys (`role`/`context`/`format`/`constraints`/`usable_result`) match `GRADE_CHECKPOINT_SYSTEM` output and `parseVerdict`. Route contracts (`generateJson`/`generateText` signatures) match Task 2's exports. ✅

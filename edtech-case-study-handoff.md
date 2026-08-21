# EdTech Case Study — Session Handoff

**Owner:** Kunal Agarwal
**Assignment:** PM course, Week 5 / Cohort 8 / Case Study 4
**Deadline:** 26 August 2026
**Handoff written:** 17 August 2026 · **Updated:** 21 August 2026 (Session 12)
**Current phase:** Diamond 2 — **BUILD IN PROGRESS. Engine BLOCKER (Session 11 free-tier 20/day cap)
RESOLVED — switched to `gemini-3.5-flash-lite` (`2990600`), live-verified end-to-end (~2s/call, killed
BOTH the quota AND the latency risk). Tasks 8 + 9 DONE (returning loop: 3 auto-graded drills + real
`/dashboard` + streak), each review-clean after one fix round. A Critical pre-existing Task-7 bug was
found + fixed en route (persist wiped returning-user progress on every login). PAUSED at user request
after Task 9. Remaining: Tasks 10–12.** (See Section 0.13.) 32/32 tests + build green on `edtech-mvp-build`.
Tasks 1–7 DONE and the full day-0 first-win flow was **live-verified end-to-end** (Gemini, PostHog
funnel, Google OAuth + Supabase persistence all confirmed on real infra — see Section 0.9). Both
PRDs drafted (`problem-space-prd.md` + `solution-prd.md`); the open forks from Section 0.5 are
resolved (Section 0.6). Build is on branch `edtech-mvp-build`. The UI redesign was FINALIZED in Figma
(brand = **"Plainly"**, refs `docs/design/ai-coach-optimized.jsx` + `plainly-design-system.jsx`) and
is now **PORTED onto the wired app** (Session 10, commit `da6dacb`) — but Zscaler on the office laptop
blocked the live Gemini call past "Diagnose it," so the port is **build-verified only, not yet
eyeballed or run end-to-end.** **NEXT: on the home network, verify the flow visually + run it past
Diagnose to the win, then resume at Task 8** (see Section 0.11).

> **⚠️ READ THIS FIRST (Session 2, 18 Aug) — continuing on a different laptop.**
> The detailed decision log lived in Claude Code *memory* on the original laptop
> (`~/.claude/projects/.../memory/edtech-locked-hypothesis.md`), which does NOT travel between
> machines. So Section 0 below is the **self-contained source of truth** — everything needed to
> pick up on the office laptop is here. Sections 1–8 are the original Session-1 record (kept for
> history); where they differ from Section 0, **Section 0 (v2) wins.**

---

## 0. CURRENT STATE — Locked hypothesis v2 (source of truth, 18 Aug)

Reached via a `/grilling` session (10 decisions) on 17 Aug, then **pivoted after the team's
~12-interview primary round** on 18 Aug. Full interview synthesis is in
`edtech-primary-research.md`; the survey to validate at scale is in `validation-survey.md`.

### The hypothesis (v2)
> A **non-technical professional in a tech-enabled role or company** (marketing, HR, ops,
> finance, or a career-switcher), **self-motivated by career ROI**, is stuck at "where do I
> start," bounces off jargon in the first 15 minutes, can't commit to scheduled live sessions,
> and has learned things before that never stuck because they had nowhere to apply them. So if
> we anchor on **one real task they want to do with AI**, walk them to actually doing it in a
> jargon-free ~10-minute first win, confirm it with an inline check, and bring them back with a
> byte-sized daily loop, they'll get past the drop-off point where course-takers normally quit.

**Wedge in one line:** move people from *"I can prompt"* → *"I can actually use and build with
it"* — on their own real task.

### What changed v1 → v2 (from the interviews)
- **Anchor pivoted from target-ROLE to real-TASK-in-current-job.** The interview mass wants to
  use AI better in the job they *already have* — not switch roles. Career-switchers are ONE
  high-intent sub-segment, not the center. (This also keeps us on the brief's "Tech & AI" wedge;
  the role frame was drifting toward SAP/ERP, off-AI.)
- **Progress metaphor:** "% toward a target role" → "AI tasks you can now do for your job."
- The daily doing-loop / first-win / streak / proof-first mechanics are UNCHANGED — validated by
  ~12 interviews, not just one.

### The 10 locked decisions (v2)
1. **Persona** — non-technical, tech-enabled-role, career-ROI-motivated professional.
   De-prioritize (validated): lawyers/therapists/low-job-relevance pros, senior devs,
   mandated/low-intent users.
2. **Problem** — navigation ("where do I start") is the *hook*; capability/doing on a real task
   is the *product*.
3. **Archetype** — gamified daily *doing*-loop; progress = AI tasks you can now do (not % to role).
4. **Exercise** — hybrid: daily auto-graded drills + periodic real-task checkpoints (AI-judged
   vs a rubric). Fallback if AI-judging wobbles: drills alone still ship a coherent MVP.
5. **Scope** — ONE task-path, end-to-end; NO live CV/LinkedIn/job-board engine.
   **HARDCODED TASK (resolved 18 Aug from the 12 interviews, not waiting on survey):**
   *"Get AI to actually do a real work task for you" — go from a weak one-line prompt to a
   structured, reliable, usable result.* Chosen because it's the one task shared across all
   target roles, uses the single common natural-language surface, gives a clean <10-min first
   win, and directly attacks the biggest named opportunity (shallow prompt-in/out usage). Beats
   "build a mini-app" (intimidating, not universal) and domain-specific tasks (bespoke,
   non-generalizing). Survey Q5/Q6 will confirm or flag "build a tool" as a contender.
6. **First win** — one jargon-free ~10-min guided success, pre-signup: user brings ONE real task
   (draft a JD/email, summarize a long report, analyze a sheet) → app walks weak prompt → good
   structured prompt → usable output. Signup wall comes AFTER the first success.
7. **Content** — AI-generated + hand-curated, ~1 week deep, hardcoded, no CMS.
8. **Measurement** — activation (headline: completed pre-signup first win) · D1/D2 return
   (retention proxy) · completion funnel. Measuring leading indicators of habit, not habit itself
   (defensible for a 1-week test).
9. **Acquisition + loop** — manual targeted recruiting (landing page in users' verbatim words) +
   ONE shareable progress-card loop (seeded/instrumented, not yet proven).
10. **Business** — fake-door WTP; shape is **per-use-case / case-by-case** (interviews rejected
    big upfront fees; buyers already burned). B2B L&D later.

### Three elements to fold into design (from the primary round)
- **Jargon wall** — first 15 min decide retention; "explain like I'm in 8th class." Cheap,
  high-leverage constraint.
- **On-demand AI tutor** — resolves "want a mentor" vs "no time for live." Strong pull BUT
  scope-creep risk for a 1-week MVP; treat as stretch, not day-1 core.
- **Trust / proof-first** — trust is the scarce resource; free genuine first win before any ask.

### Success test (falsifiable — set the X's from baseline)
Activation ≥X% complete pre-signup first win · ≥X% return for session 2 in 24–48h · ≥X% reach
the first real-task checkpoint · ≥X% click the fake-door unlock.

### Open risks (name in PRD, not blockers)
1. Checkpoint-grading bet — AI-judged real tasks are the fuzzy half; drills alone are the fallback.
2. On-demand tutor scope — tempting but could sink the one-week build; guard it.
3. Persona-evidence: still light on *non-technical* switchers specifically (the one full capture,
   AV, was a finance→SAP switcher; the 12-round is broader). Survey + more interviews firm it up.

### Files in this folder (Session 2 inventory)
| File | What it is |
|------|------------|
| `edtech-case-study-handoff.md` | THIS doc — source of truth (Section 0 = current). |
| `edtech-primary-research.md` | Synthesis of the ~12 team interviews (Discovery). Feeds the PRD. |
| `validation-survey.md` | 12-Q survey to validate signals at scale + pick the task-path. Not a blocker; patch results into PRD. |
| `primary-interview-guide.md` / `.xlsx` | Behavioral interview guide (questions, personas, kill criteria). |
| `interview-capture-template.md` / `.xlsx` | Per-interview capture template. **The .xlsx holds Interview 1 (AV) real data.** |
| `Week 5 __ Case Study 4 __ Cohort 8.docx` | The original assignment brief. |

### Immediate next step
Draft the **Problem Space PRD** (Monday EOD checkpoint) off Section 0, in the VMS Discovery
structure (problem space · research · personas · pain points · insights · assumptions). Use
`[survey pending]` placeholders where quantitative validation will slot in. The task-path,
persona, and loop are all settled — nothing blocks the PRD or the build.

---

## 0.5 SESSION 3 — Solution convergence + economics grill (18 Aug)

**Status:** Diamond 1 Define COMPLETE — Problem Space PRD drafted (`problem-space-prd.md`).
Repo now on GitHub (`kunalagarwal0210/Edtech-Research`; pushed via `gh` as personal account,
credential helper scoped local to the repo so the work machine's global git is untouched).
Validation survey floated for responses. Entering Diamond 2 (solution design). Metric
thresholds (the "X%" blanks in the success test) deliberately **deferred** — "build & decide
from baseline later." Not a blocker.

### Engine decision — RESOLVED in principle
- First-win engine = **live LLM on rails**, powered by a **free-tier API** (Google Gemini AI
  Studio / Groq Llama) — **no credit card, ~$0.** Math: ~50 users × ~10–15 calls over the week
  ≈ 500–750 calls total; Gemini free tier = ~1,500 req/day → a fraction of a single day's
  quota across the whole test. The "no paid API / too costly" constraint **dissolves** at
  case-study scale.
- Caveats: per-minute rate limits (15 RPM Gemini / 30 RPM Groq) → light request queue if many
  users hit it in the same minute (e.g. a live class demo); Gemini *free* tier may train on
  prompts → steer users to non-sensitive tasks or use Groq; add a "don't paste confidential
  info" notice regardless.

### BYO-account (ChatGPT Go / Claude Pro) — REJECTED (not viable)
- Consumer subscriptions ≠ API access. **Anthropic banned** subscription OAuth in third-party
  apps (Feb–Apr 2026, server-enforced). OpenAI "Sign in with ChatGPT" is **identity-only**;
  using a plan's model quota in an external app is a first-party Codex preview / unofficial
  reverse-engineered hack (fragile, ToS-risky). Not a foundation for a graded MVP.
- Only legit way to use a user's own sub = **copy-paste bridge** (app builds the structured
  prompt → user runs it in their own ChatGPT/Claude → pastes result back). $0, ToS-safe, but a
  copy-paste seam + can't inspect/grade output tightly. Treat as an **optional secondary
  toggle, not core.**

### Economics / viability grill — key findings (feed a Business Model section)
- **Cost = engagement = success metric.** Free tier hides that COGS scales with the daily
  usage the loop is designed to maximize. At real engagement + a good model, COGS plausibly
  **₹150–500/user/mo** → can exceed a burned persona's WTP.
- **Monetization contradiction:** docs lock "per-use-case" WTP (decision 10 / A6) but the
  product is a daily-habit **subscription** loop. Pick one → **recommend subscription** (matches
  the streak/return loop).
- **Success-is-churn:** teaching prompting well → user graduates to free ChatGPT; retention
  story *after* the skill sticks is unproven. **Platform-as-competitor:** base models coach
  prompting natively → thin-wrapper defensibility risk.
- **Likely resolution:** consumer daily-habit app = **wedge / engagement proof**; real revenue
  = **B2B / Team per-seat** (has budget, clears COGS). Consumer freemium: free tier (cheap
  model for drills, cached hardcoded content, capped tutor) + a modest **subscription**
  (₹199–399/mo) tested via fake-door.
- **Case-study scope reminder:** the deliverable only needs a **fake-door WTP test + a
  defensible business hypothesis**, NOT solved economics. Do **not** ship the "per-use-case"
  line alongside a subscription loop — that contradiction is the gradeable crack.

### OPEN decisions — ALL RESOLVED in Session 4 (see Section 0.6)
1. ✅ **Engine** — free-tier live LLM (Gemini AI Studio primary, Groq overflow), ~$0.
2. ✅ **Build** — AI-assisted Next.js/Vercel.
3. ✅ **Content depth** — lean (Day-0 win + 3 drills + 1 checkpoint).
4. ✅ **Business model** — subscription; consumer = wedge, B2B later; ₹399/mo fake-door test.

---

## 0.6 SESSION 4 — Solution DEFINED via grilling (18 Aug)

**Status:** Diamond 2 solution convergence COMPLETE. Ran an 11-decision `/grilling` session
(4 rounds, walking a design tree). All decisions locked; full spec in `solution-prd.md`.
Next session = **build.** Nothing blocks it.

### The solution in one line
A **guided-rails web app** that walks a non-technical professional from a weak prompt to a
real, usable AI result on their **own task in ~10 minutes** (jargon-free, pre-signup), then
holds the habit with a **byte-sized daily loop** (3 drills + 1 AI-judged real-task checkpoint).

### The 11 locked solution decisions
| # | Decision | Choice |
|---|----------|--------|
| Q1 | Product form | Guided-rails web app (not chat / not content-library / not extension) |
| Q2 | First-win task | **Bring-your-own** real task; writing (weak→structured prompt) is the scaffolded default — hedges the A3 automation tension |
| Q3 | Scope | Lean: pre-signup win + 3 drills + 1 checkpoint |
| Q4 | Engine | Gemini AI Studio free tier (Groq overflow), ~$0, "no confidential info" notice |
| Q5 | Build | AI-assisted Next.js on Vercel |
| Q6 | Auth | No wall through first win → Google OAuth at the win moment |
| Q7 | Day-0 flow | 8 steps: land → ask task first → weak attempt → jargon-free diagnosis → rebuild structured prompt → live run → inline check → win → signup |
| Q8 | Daily loop | 3 drills (one prompt lever each) + streak + AI-judged checkpoint; progress = "tasks you can now do"; drills-only fallback |
| Q9 | Acquisition + growth | Manual recruiting off the **28 captured leads** + one instrumented "win card" |
| Q10 | Metrics | PostHog free tier; headline = `first_win_completed` (pre-signup activation); full event map; thresholds from baseline |
| Q11 | Business | Post-checkpoint subscription fake-door, single **₹399/mo**, click = WTP intent |

### Explicitly OUT of scope (creep guard)
On-demand AI tutor (build grading, not a tutor — feedback outranked tutor 10/37 vs 6/37 in
Survey B) · full 5-day path · second growth mechanic · live/cohort features · solved economics ·
per-use pricing.

### Carried-forward open items (NOT blockers)
1. **Automation-vs-writing** first-win default (A3) — resolve from live-test behavior.
2. **AI-grading reliability** at the checkpoint (A4) — drills-only fallback ready.
3. **Trustworthy price** — ₹399 is a test, not a finding.
4. **Handoff↔PRD contradiction** — decision 10 below still says "per-use-case"; the PRDs now
   lock **subscription**. Reconcile when priced. *(Deliberately left for Kunal to decide.)*

### Not yet started
The build itself (scaffold → day-0 flow → loop → checkpoint → instrumentation → landing →
recruit → soft launch → baseline thresholds → iterate). See `solution-prd.md` §6.

---

## 0.7 SESSION 5 — Build kickoff (19 Aug)

**Status:** Diamond 2 build STARTED. Executing `solution-prd.md` §6 through a written,
task-by-task implementation plan using **Superpowers subagent-driven development** (a fresh
implementer subagent per task → task review → fix loop → final whole-branch review). All build
work is on branch **`edtech-mvp-build`** (branched off `main`; not yet merged).

### Plan + recovery map
- **Implementation plan:** `docs/superpowers/plans/2026-08-19-edtech-mvp.md` — 13 tasks
  (1, 1.5, 2–12), risk-ordered: engine spike + pre-signup hero flow first, fuzzy AI-judged
  checkpoint late with a drills-only fallback flag.
- **SDD ledger (source of truth for build progress):** `.superpowers/sdd/2026-08-19-edtech-mvp/progress.md`
  (git-ignored scratch; holds the conflict scan, per-task completions, and every ruling).

### Stack (locked in the plan)
Next.js 15 (App Router) + TypeScript + Tailwind v4, in a **`web/`** subfolder (research docs
stay at repo root). Engine: **Gemini AI Studio free tier** (`gemini-2.0-flash`), ~$0. Auth + DB:
**Supabase** (Google OAuth + Postgres). Analytics: **PostHog** free tier. Hosting: **Vercel**.
Tests: **Vitest**.

### Progress
- ✅ **Task 1** — scaffold + Vitest + smoke test (commit `64c6425`; spec ✅, quality approved).
- 🔨 **Task 1.5** — design foundation (theme tokens, 4 shared primitives, locked `HERO` copy) —
  in progress at time of writing.

### Prerequisites pending (HUMAN — needed from Task 2 onward)
Drop these into `web/.env.local` (git-ignored, never committed): `GEMINI_API_KEY`; Supabase
`NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` + `SUPABASE_SERVICE_ROLE_KEY`;
PostHog `NEXT_PUBLIC_POSTHOG_KEY` + `NEXT_PUBLIC_POSTHOG_HOST`. Vercel dashboard import
(Root Directory = `web`) is a deferred human step; no live URL exists yet.

### Open build rulings (full text in the ledger)
1. Vercel dashboard import is a human step — agent scaffolds/commits, defers the import.
2. `ConfidentialNotice` component pulled forward into Task 1.5 (StepShell depends on it; was Task 4).
3. Vitest CJS/ESM cosmetic warning deferred to final review (one-line fix).

### Note on the older per-use-vs-subscription contradiction
Still unreconciled by design — decision 10 (Section 0, below) says "per-use-case"; the PRDs and
the build lock **subscription** (₹399/mo fake-door). Left for Kunal to reconcile when priced.

---

## 0.8 SESSION 6 — Env wired, branch verified, Task 2 code done; live spike BLOCKED by Zscaler (19 Aug)

**Where we stopped:** on the **office laptop**. Company Zscaler proxy blocks outbound calls to
the Gemini API, so the Task 2 live "engine spike" (the go/no-go on the core bet) could not run.
**Resume on the home laptop** — everything else is ready and pushed.

### Done this session (all pushed to `edtech-mvp-build`)
- **Env keys configured** in `web/.env.local` (git-ignored — NOT pushed, must be re-created at
  home). Gemini key, Supabase (URL `https://jnjpdswroxsarnwdcnrp.supabase.co` derived from
  project ref + anon + service_role), PostHog (`phc_…` key, host defaulted to **US** cloud
  `https://us.i.posthog.com`). ⚠️ **Verify PostHog region is US** (else events silently drop).
- **Branch verified building on this machine:** `npm ci` clean (0 vulns), `npm test`, and
  `npm run build` all pass. Note the scaffold actually pulled **Next.js 16.3.1** (Turbopack),
  not the "Next 15" the plan names — `create-next-app@latest` grabbed the newer major. Builds
  clean; no action needed, plan text just runs slightly behind.
- **Task 2 CODE complete + committed as WIP:** `web/lib/gemini/client.ts` (generateJson/
  generateText/GeminiError), `web/lib/gemini/prompts.ts` (the 4 `*_SYSTEM` constants),
  `web/test/gemini/client.test.ts`. **Offline tests: 8/8 passing** (4 prior + 4 new; mocked SDK,
  no network). SDK `@google/generative-ai` installed.

### NOT done — the resume checklist for home
1. **Re-create `web/.env.local`** with the keys above (they're git-ignored, don't travel).
2. **Run the Task 2 live engine spike** (plan Task 2, Step 7) on the unblocked home network:
   directly call Gemini with `REBUILD_SYSTEM` + a sample weak prompt; confirm by eye the
   structured rebuild is genuinely better + jargon-free + returns in a few seconds. **This is the
   core-bet go/no-go.** If it works → Task 2 is truly done. If Gemini is unreachable/unusable →
   escalate (fallback engine per Session 3, e.g. Groq).
3. **Task 2 has NOT been through task review yet** — it was stopped mid-flow. After the spike
   passes, dispatch the SDD task reviewer against the Task 2 diff (spec + quality), clear any
   findings, then mark Task 2 complete.
4. Continue Tasks 3–12 via the same subagent-driven-development flow.

### Recovery notes
- The `.superpowers/sdd/…/progress.md` ledger is **git-ignored** — it does NOT travel between
  machines (same gotcha as Session 2's memory file). Recovery = `git log` + this section. The
  ledger will be re-created fresh at home from git history.
- Build progress lives on branch **`edtech-mvp-build`** (not merged to `main`).
- Still-pending human setup for later tasks: Supabase `schema.sql` apply + Google OAuth provider
  (Task 7), PostHog project confirmed receiving events (Task 4+), Vercel import Root Dir = `web`.

---

## 0.9 SESSIONS 7–8 — Tasks 2–7 done, full first-win flow LIVE-VERIFIED, then paused for a UI redesign (19–20 Aug, home)

**Where we are now:** the entire pre-signup first-win flow **plus** the sign-in/persistence handoff
is built, reviewed, and **verified working on live infrastructure**. Build is paused by choice to
fix the visual design before continuing to Task 8.

### Tasks completed (all on `edtech-mvp-build`, each via fresh-implementer → review → fix SDD loop)
- **Task 2 — Gemini engine.** Live spike passed (core bet GO). Model id corrected: `gemini-2.0-flash`
  is RETIRED → now **`gemini-3.6-flash`**. `web/lib/gemini/{client,prompts}.ts`.
- **Task 3 — Canonical event map + `track()`** (`web/lib/analytics/`). 16 events; headline
  `first_win_completed`.
- **Task 4 — Landing page + PostHog provider + anonymous localStorage state** (`web/lib/state/localProgress.ts`).
- **Task 5 — Day-0 steps 2–4** (task → weak prompt → jargon-free diagnosis); `/api/diagnose`.
- **Task 6 — Day-0 steps 5–8** (rebuild before/after → live run → inline check → win recap);
  `/api/rebuild`, `/api/run`.
- **Task 7 — Google OAuth at the win moment + persist** (`@supabase/ssr`, `/auth/callback`,
  `/api/persist-progress`, `web/supabase/schema.sql`, minimal placeholder `/dashboard`).

### Live end-to-end verification (20 Aug, controller browser walkthrough)
- Full flow rendered correctly with **real Gemini output** (a usable client follow-up email).
- **PostHog funnel confirmed in order:** `landing_view → task_started → weak_prompt_submitted →
  prompt_rebuilt → output_generated → inline_check_answered → first_win_completed`, all as one
  anonymous user; then on sign-in an **`Identify`** + `signup_completed` fired and every later event
  is attributed to the real email. Anonymous→identified stitch works.
- **Supabase rows confirmed** (queried via REST): a `profiles` row (email, `tasks_completed:1`) and a
  matching `progress` row. OAuth code-exchange (`/auth/callback` 307) and `/api/persist-progress` 200
  both verified in the dev server log.
- HUMAN SETUP now DONE: `schema.sql` applied; Google OAuth provider enabled (Google Cloud client +
  Supabase). PostHog region confirmed **US** and receiving events.

### ⚠️ Risks surfaced (address at launch prep, not blockers)
1. **First-win latency:** the 3 sequential Gemini calls took ~32s + ~33s + ~9s ≈ **~74s of waiting**
   on the live run (earlier ~17s/call). Real drop-off risk for 40–50 users. Mitigations to weigh:
   stream the output, faster model setting, or an honest "~30s" progress cue. Not a code bug.
2. **`signup_completed` / persist fired twice** in dev — React strict-mode double-mount; harmless
   (idempotent upsert), does not happen in the production build. Optional one-line effect guard later.

### ⏸ Why paused — the UI redesign (current task)
The Task-1.5 design foundation was deliberately lean (~8 tokens + 4 bare primitives); on screen it
reads plain and under-designed for a trust-scarred persona. **Decision:** the user generates a
better design in **Figma Make** and **Lovable** (paste-ready prompts saved at
`docs/design/design-generation-prompts.md`), compares, and picks one. Claude then **ports the visual
language into the existing `@theme` tokens + `components/ui` primitives + day-0 screens** — the
working backend/logic (Gemini, PostHog, Supabase, anon state) stays untouched; we do NOT regenerate
the app. First-win flow gets designed first; dashboard/drills inherit the system.

### NEXT-SESSION resume checklist
1. User brings back the chosen design: generated **code** + **screenshots** + **palette/font**.
2. Claude rebuilds tokens + the 4 primitives + landing/`/start` screens to match; verifies every
   screen in the browser.
3. Resume the plan at **Task 8** (returning loop: 3 AI-graded drills + real `/dashboard` +
   ProgressList). Task 8 replaces the placeholder `/dashboard` and should thread real progress into
   persist (currently hardcoded defaults — a deferred Task-7 minor).
4. Remaining after: Tasks 9–12 (streak, checkpoint, win-card + ₹399 fake-door, event-coverage QA +
   Vercel launch). Secrets pasted in chat should be **rotated** before/after the case study.

### Recovery notes (unchanged gotchas)
- `.superpowers/…/progress.md` ledger and `web/.env.local` are **git-ignored** — they do NOT travel
  between machines. Recovery = `git log` + this section; `.env.local` must be re-created from the
  keys in the Supabase/Gemini/PostHog dashboards.

---

## 0.10 SESSION 9 — Design FINALIZED in Figma; about to port it into the app (20 Aug, home)

**Where we are now:** the redesign that Session 8 paused for is **done and committed**. The user
built the design themselves in **Figma** (not the Figma Make/Lovable generation route from Session 8)
and committed two self-contained React reference files. Next action is the actual port. A
brainstorming/`architectural` planning pass was started this session but **stopped before decisions
were captured** (user's token budget for the session ran low) — so the 3 open decisions below are the
first thing to settle next session.

### Session housekeeping done
- `git pull` on `edtech-mvp-build` (`df5ea71 → 54f2bd7`, fast-forward) — pulled Session 7–8 work
  (API routes, Supabase/PostHog wiring, `/start` flow, tests, `design-generation-prompts.md`).
- Local dev server confirmed running: `cd web && npm run dev` → http://localhost:3000, all routes
  (`/`, `/start`, `/dashboard`) return 200. **Gotcha fixed:** the pull added deps (`posthog-js`,
  `@supabase/*`) not yet installed → 500 until `npm install`; also had to kill an orphaned
  Next dev process holding port 3000. Next 16 refuses a second dev server on the same dir.

### The finalized design (committed reference files)
| File | What it is |
|------|------------|
| `docs/design/ai-coach-optimized.jsx` | The **working prototype** — one self-contained React component running the full 8-screen flow with dummy `setTimeout` logic + inline `<style>` CSS. This is the visual source of truth. |
| `docs/design/plainly-design-system.jsx` | A **design-system showcase board** — same components wrapped in a docs board: color swatches, type scale, radius/elevation/spacing, brand-mark states, component library, and all 8 screens rendered in desktop-browser + 375px phone frames. |

**Finalized design decisions (baked into both files):**
- **Brand: "Plainly"**, tagline *"AI, made plain"*. Wordmark highlights the hidden "**ai**" in
  pl-**ai**-nly with a warm highlighter swipe.
- **Mascot decision: NO character** — an abstract **"GrowthMark"** (ascending bars climbing to a
  spark) that fills with progress and celebrates on Win. Grown-up, not childish.
- **Font: Nunito** (weights 400–900).
- **Palette:** primary indigo `#5B6CFF`, pressable button dark edge `#3B49CC`, positive `#22C55E`,
  warm accent `#FFC24B`, danger `#FF6B6B`, canvas `#F6F7FB`, surface `#FFFFFF`, text `#1A1D2E`,
  muted `#6B7080`, border `#E7E9F0`.
- **Signature interaction:** Duolingo-style **pressable button** (4px darker bottom edge, presses down).
- **Layout:** desktop = 2-col **coach rail + content**; collapses to single-column mobile at 860px.
- **Anti-terminal:** prompts render as soft note-cards (`.code-soft`), never monospace.

### The real job (what "port" means here)
The existing `web/` app **already has the whole 8-step flow wired to real logic** — `/api/diagnose`,
`/api/rebuild`, `/api/run`, Supabase Google OAuth, PostHog analytics, anon localStorage state — but
with the *plain* Task-1.5 design (blue `#2563eb`, Inter, bare `Button`/`Card`/`StepShell`/`Textarea`,
tokens in `web/app/globals.css`). **Port = lift the Figma VISUAL system onto the already-wired app,
keeping all working logic.** Do NOT re-implement the dummy `setTimeout` logic from the JSX files.

Mapping already scouted:
- Tokens live in `web/app/globals.css` (Tailwind v4 `@theme inline`, CSS-var tokens) — swap
  accent→indigo, add the full Plainly palette, radii, shadow; switch font Inter→Nunito in
  `web/app/layout.tsx` (`next/font/google`).
- Components in `web/components/ui/` (`Button`, `Card`, `StepShell`, `Textarea`) + `ConfidentialNotice`
  get restyled; NEW components needed: `GrowthMark` (brand mark), coach-rail variant of `StepShell`,
  chips, trust pills, Plainly `Logo`, Win celebration.
- Screens: `web/app/page.tsx` (landing) + `web/app/start/page.tsx` (7 steps) restyle in place; all
  fetch/state/analytics calls stay exactly as-is.

### ⚠️ 3 OPEN DECISIONS to settle FIRST next session (brainstorm was cut off here)
1. **Styling approach** — (A, recommended) re-express the design through the existing Tailwind v4
   `@theme` tokens + typed React components (consistent, easiest to "build further"), vs (B) paste the
   Figma's raw inline CSS verbatim into a global stylesheet with `className`-based components (exact
   1:1 match, but two styling systems coexist).
2. **Scope of first increment** — (A) re-skin the wired flow only (landing + 7 steps), leave
   `/dashboard` for later; vs (B) flow + `/dashboard` together; vs (C) design-system foundation +
   showcase page first, screens next.
3. **Copy source** — (A, recommended) keep the research-locked copy in `web/lib/copy.ts` verbatim and
   only add Figma's new visual elements (brand, coach rail, trust pills) with microcopy reconciled to
   the locked source; vs (B) adopt the Figma wording as-is (it tweaks some titles, e.g. "…do for you?"
   vs the locked "…for your work?"). NOTE the JSX also softened some diagnosis copy — reconcile against
   `web/lib/copy.ts` + the `/api/diagnose` output, which are the research-locked source.

### NEXT-SESSION resume checklist
1. Settle the 3 decisions above (recommend A/A/A).
2. Port tokens + font, restyle the 4 primitives, add the new components (GrowthMark, coach rail, chips,
   pills, Logo, Win), restyle landing + `/start`. Verify every screen in the browser at
   http://localhost:3000. Keep all API/auth/analytics/state untouched.
3. Then resume the plan at **Task 8** (returning loop: 3 AI-graded drills + real `/dashboard` +
   ProgressList); the new design system carries into the dashboard/drills.
4. Remaining after: Tasks 9–12 (streak, checkpoint, win-card + ₹399 fake-door, event-coverage QA +
   Vercel launch). Rotate the pasted secrets before/after the case study.

---

## 0.11 SESSION 10 — Plainly design PORTED onto the wired app (20 Aug, office laptop → continue home)

**Where we are now:** the 3 open decisions from Section 0.10 were settled **A / A / A** and the port is
**done, committed, and pushed** (`da6dacb` on `edtech-mvp-build`). The whole first-win flow now wears the
Plainly visual system. It is **build-verified only** — `npm run build` is fully green (compile +
TypeScript + lint; `/` and `/start` prerender clean) — but **NOT yet visually checked and NOT run past
the "Diagnose it" step**, because the office laptop's **Zscaler proxy blocked the live Gemini call**
again (same wall as Session 6). Switching to the home laptop to finish verification.

### The 3 decisions (locked A/A/A)
1. **Styling approach A** — re-expressed through Tailwind v4 `@theme` tokens + typed React components
   (not raw inline-CSS verbatim). A handful of signature interactions that Tailwind can't express live
   as small classes in `globals.css`.
2. **Scope A** — re-skinned the **wired flow only** (landing + the 7 `/start` steps). `/dashboard`
   left as-is for Task 8.
3. **Copy source A** — `web/lib/copy.ts` `HERO` kept **verbatim** (research-locked). New visual
   microcopy (eyebrow, trust pills, coach tips, ledes) added in a **separate `UI` block** in the same
   file — locked strings untouched.

### What changed (commit `da6dacb`, 13 files)
- **`web/app/globals.css`** — full Plainly palette + radii + shadow as `@theme` tokens (indigo
  `#5B6CFF`, edge `#3B49CC`, positive, warm `#FFC24B`, danger, canvas `#F6F7FB`, …); plus signature
  CSS: wordmark highlighter (`.hl`), coach-rail gradient, `.code-soft` note-cards, springy progress
  fill, hero/win gradients, `bob`/`dot` keyframes, `prefers-reduced-motion` guard. Legacy `accent`
  token aliased to primary so nothing dangles.
- **`web/app/layout.tsx`** — font Inter → **Nunito** (400–900) via `next/font/google`.
- **NEW `web/components/ui/`**: `Logo.tsx` (Pl-**ai**-nly wordmark + gradient mark), `GrowthMark.tsx`
  (ascending-bars brand mark, `lit`/`celebrate` props), `icons.tsx` (Lock, Tick, Check, GoogleMark, Dots).
- **Restyled primitives**: `Button` (Duolingo pressable pill + `block` prop), `Card` (rounded-20 +
  shadow + `className` passthrough), `Textarea` (soft note-card + focus ring), `StepShell` (2-col
  **coach rail + GrowthMark + gradient progress**, new `coach`/`lede`/`onStartOver` props, collapses to
  single column at 860px), `ConfidentialNotice` (warm lock card).
- **Screens**: `app/page.tsx` → 2-col hero (eyebrow, trust pills, floating-card visual);
  `app/start/page.tsx` → all 7 steps reskinned **in place** + a dedicated full-width **Win** screen.
- **`web/lib/copy.ts`** — `HERO` untouched; appended `UI` block for the new microcopy only.

### Untouched by design (logic preserved)
Every `fetch`/`track`/`writeAnon`/OAuth/state call in `/start`, all `/api/*` routes, auth, analytics,
anon localStorage — and `/dashboard` (Task 8). The port lifted only the visual layer; no dummy
`setTimeout` logic from the JSX refs was copied in.

### NEXT-SESSION resume checklist (home network)
1. `git checkout edtech-mvp-build && git pull` → **re-create `web/.env.local`** (git-ignored; Gemini +
   Supabase + PostHog keys from their dashboards) → `npm install` → `npm run dev`.
2. **Visually verify** `/` → `/start` through all 7 steps to the win screen, incl. the 860px mobile
   collapse. This is the human-eyes check the office laptop couldn't do.
3. **Run the flow past "Diagnose it"** (the exact step Zscaler blocked = `/api/diagnose` → Gemini):
   confirm diagnose → rebuild → run → win all render with **real** output, and the PostHog funnel still
   fires in order (`landing_view → … → first_win_completed`). Since the build is green, any failure here
   is runtime/visual, not a build break.
4. Then **resume the plan at Task 8** (returning loop: 3 AI-graded drills + real `/dashboard` +
   ProgressList); the Plainly system carries into the dashboard/drills.
5. Remaining after: Tasks 9–12 (streak, checkpoint, win-card + ₹399 fake-door, event-coverage QA +
   Vercel launch). Rotate any pasted secrets before/after the case study.

### Carried-forward risks (unchanged, from Section 0.9)
- **First-win latency** — 3 sequential Gemini calls ≈ 30–70s of waiting; this visual port didn't touch
  it. Weigh streaming / faster model / honest progress cue at launch prep.
- **Gotchas** — `.env.local` + the `.superpowers/…/progress.md` ledger are git-ignored (don't travel);
  Next 16 refuses a second dev server on the same dir (kill orphans holding port 3000).

---

## 0.12 SESSION 11 — Port live-verified end-to-end; 2 engine fixes committed; BLOCKED on free-tier 20/day cap (20 Aug, home)

**Where we are now:** on the **home network** the Session-10 Plainly port was finally run past "Diagnose
it" against live Gemini. The full pre-signup first-win flow **works end-to-end** — but the process
surfaced (a) a core-payoff bug, now fixed, and (b) a hard engine constraint that **blocks the real user
test**. All fixes are committed to `edtech-mvp-build` (`7deaa5e`), not yet merged.

### Live end-to-end verification (this session)
- `git pull` (`54f2bd7 → 9b71bd3`, fast-forward). `.env.local` present, `node_modules` present,
  `npm run dev` clean on http://localhost:3000; `/`, `/start`, `/dashboard` all 200.
- **Full Gemini chain confirmed working with real output:** `/api/diagnose` 200, `/api/rebuild` 200,
  `/api/run` 200 (a real marketing-manager JD draft). OAuth `/auth/callback` 307 → `/dashboard` 200;
  `/api/persist-progress` 200 (fired twice — the known React strict-mode double-mount, idempotent).
- **Latency measured (the flagged risk, in the flesh):** single calls ranged **5–36s**; rebuild alone
  hit 26.7s and 35.7s. Three stacked ≈ a minute-plus of waiting. Unchanged by this session's fixes.

### Bug found + FIXED — the first-win dead-ended on a question list (commit `7deaa5e`)
- **Symptom (user-caught):** the "YOUR RESULT" step sometimes returned *clarifying questions*
  ("Before I create the draft, please share…") instead of a finished draft — then the app still
  celebrated the "win". Dead-end at the exact trust moment.
- **Root cause:** `/api/run` is single-shot (no second turn), but its system prompt only said "Do exactly
  what the prompt asks" — it never forbade asking questions. For underspecified tasks (draft a JD/email)
  the model *sometimes* asks for details. Stochastic, pre-existing (NOT from the design port — the port
  didn't touch these routes; Session 8 just got lucky).
- **Fix:** rewrote the run system prompt — produce the COMPLETE one-shot deliverable, NEVER ask
  questions, use clearly-marked `[placeholders]` for missing details. **Live-confirmed once** (produced a
  JD draft, no questions) before the daily quota ran out.

### Second fix — transient-failure retry + error visibility (same commit)
- The 502s seen mid-review were **Gemini transient failures**, surfaced via added `console.error` in all
  three route `catch` blocks (were silent). TWO modes confirmed: **503 "high demand"** (Google-side model
  overload) and **429 "exceeded quota"** (free-tier limit).
- Added **central retry-with-backoff** (800/1600/3200ms) in `web/lib/gemini/client.ts` for 503/429, so
  normal spikes self-recover. Unit-tested (retry-then-success + exhaustion, fake timers). **24/24 tests
  pass, production build green.**

### 🚨 BLOCKER — free-tier daily cap makes the 40–50-user test impossible on this engine
- **`gemini-3.6-flash` free tier = 20 requests/DAY (hard cap; confirmed exhausted this session).**
- Each first-win = **3 calls** (diagnose + rebuild + run) → **~6 first-wins/day total, across all users**,
  before retries or daily-loop drills. The brief needs **40–50 users**. Not feasible.
- This **falsifies the Session-3 engine math** ("~1,500 req/day, a fraction of quota") by ~75×. The "$0
  free tier dissolves the cost constraint" assumption is dead for this model.
- Note: my in-session probing/testing burned part of the daily quota — but the 20/day cap is the real
  ceiling regardless.

### NEXT-SESSION resume checklist (quota resets next day)
1. **ENGINE DECISION FIRST (blocks everything).** Recommended order:
   (A) **Switch to a higher-limit free Gemini model** — `gemini-3.6-flash` is a premium/newest model with
       a punishing RPD; an older/`flash-lite` tier typically gets far higher free daily limits. Likely a
       **one-line `MODEL` change** in `web/lib/gemini/client.ts` — try this first, confirm RPD + that
       output quality/jargon-free-ness still holds via a quick spike.
   (B) **Wire the Groq overflow fallback** (the Session-3 plan) — much higher free limits; more work.
   (C) **Enable Gemini billing** — trivial cost at this scale, abandons the "$0" premise.
2. Once the engine has adequate headroom: **one clean end-to-end pass** confirming diagnose→rebuild→run
   render real output, the run gives a *draft not questions* (re-verify the `7deaa5e` fix across a few
   runs), and the PostHog funnel fires in order.
3. **Then resume the plan at Task 8** (returning loop: 3 AI-graded drills + real `/dashboard` +
   ProgressList); the Plainly system carries into the dashboard/drills.
4. Remaining after: Tasks 9–12 (streak, checkpoint, win-card + ₹399 fake-door, event-coverage QA + Vercel
   launch). Rotate any pasted secrets before/after the case study.

### Carried-forward risks
- **First-win latency** 5–36s/call — still open; weigh streaming / faster model / honest progress cue.
  A higher-limit but *faster* model (fix 1A) could help both the quota AND the latency at once.
- **Gotchas** (unchanged) — `.env.local` + `.superpowers/…/progress.md` are git-ignored (don't travel);
  Next 16 refuses a second dev server on the same dir (kill orphans on port 3000); Bash-tool cwd sits in
  `web/` this session, so drop the `cd web`.

---

## 0.13 SESSION 12 — engine unblocked; Tasks 8 + 9 built (returning loop + streak); Critical Task-7 bug fixed (21 Aug, home)

**Where we are now:** the Session-11 engine blocker is gone and the **returning loop is built**. Tasks 8
and 9 are done via the same subagent-driven-development loop (fresh implementer → task review → fix
round → scoped re-review), each **review-clean after one fix round**. Build is on `edtech-mvp-build`,
**32/32 tests + `npm run build` exit 0**, 5 commits ahead of origin at handoff time. **Paused after Task 9
at the user's request** — Task 10 not started.

### Engine BLOCKER resolved — `gemini-3.5-flash-lite` (commit `2990600`)
- Took option A from Section 0.12: one-line `MODEL` change in `web/lib/gemini/client.ts`,
  `gemini-3.6-flash` → **`gemini-3.5-flash-lite`** (flash-lite free tier has a far higher daily limit).
- **Live-verified the full diagnose→rebuild→run chain end-to-end** on real infra: **~2s/call (~6.3s total)**
  vs the prior ~30s/call (~74s) — this ALSO retired the **first-win latency risk** (Section 0.9/0.12) in the
  same change. Output stayed on-spec (clean Role/Context/Format/Constraints, jargon-free); the run returns a
  **complete deliverable, not a question list** — re-verified 3/3 underspecified runs (the `7deaa5e` fix holds
  on the new model). 24/24 tests + build green at that point.
- Groq overflow (B) and Gemini billing (C) were **not needed**. Note: `gemini-2.5-flash-lite` is retired for
  new keys — Google's 404 points to `3.5-flash-lite`.

### Task 8 — the returning loop (commits `dd0fdc9`, `47deb29`)
- `web/lib/drills/data.ts` (3 drills, ids `drill1/2/3` mapping to the DB columns, one lever each: adding
  context / specifying format / chaining steps), `web/app/api/grade-drill/route.ts` (TDD, mirrors the
  `diagnose` route contract), `web/app/drill/[id]/page.tsx`, `web/components/ProgressList.tsx`, and a **real
  `web/app/dashboard/page.tsx`** hub (Plainly design) that **preserves the live post-OAuth persist/identify/
  clearAnon bootstrap** (guarded against strict-mode double-fire with a `useRef`).
- Forward-refs handled without breaking the build: `StreakBadge` (Task 9) left as a commented insertion
  point; the "Take the checkpoint" CTA renders as a non-navigating "coming up next" affordance (Task 10 wires
  it to `/checkpoint`).
- Fix round 1: `Ev.DrillStarted` moved from page-mount to the submit handler (was measuring views, not
  attempts); `Ev.DrillCompleted` gated inside `if (user)`; dashboard progress-fetch error now logged.

### Task 9 — streak logic + badge (commits `8d7925a`, `f8491dd`)
- `web/lib/state/streak.ts` (pure `nextStreak`, verbatim from the plan), `web/components/StreakBadge.tsx`
  (Plainly warm-accent pill), and dashboard wiring (adds `last_active` to the select, computes/persists the
  streak on load, fires `Ev.StreakDay`). Display shows `Math.max(1, streak)` so an active user never sees "0".

### 🐞 Critical bug FOUND + FIXED (Ruling F, commit `f8491dd`) — was hiding in "live-verified" Task-7 code
- **`/api/persist-progress` reset the ENTIRE progress row on EVERY dashboard load**, not just at signup —
  blind `upsert` of `{drill1/2/3:false, streak:0, last_active:today, checkpoint_passed:false}`. The dashboard
  calls that route on every mount, *before* reading progress. Net effect: **every returning-user login wiped
  their completed drills AND pinned the streak at 0.** The whole returning loop (Tasks 8+9) was non-functional
  past a user's first page load.
- **Why it hid until now:** every prior "live-verified" walkthrough only did a single signup→dashboard
  session — **no one ever tested a second login.** In the real 40–50-user test this would have silently
  destroyed the retention data the case study is graded on. The review loop caught it.
- **Fix:** the progress upsert now uses `{ onConflict: "user_id", ignoreDuplicates: true }` (inserts a new
  row once, no-ops on an existing one) and initializes `streak: 1` (signup day = day-1 activity). A regression
  test in `web/test/api/persist.test.ts` asserts both and **fails against the old code**.

### ⚠️ Carried-forward risk to close before the user test
- The returning-loop fixes (drill persistence + streak across days) are **unit + build verified but NOT yet
  exercised against live Supabase over two separate logins** — the exact gap that hid the Task-7 bug. Do a
  **two-login live check** (sign in → complete a drill → sign out → sign back in on a later date, or force the
  date) to confirm drills persist and the streak advances on real infra, BEFORE recruiting users.

### NEXT-SESSION resume checklist
1. (Recommended first) Run the **two-login live Supabase check** above to close the carried-forward risk.
2. **Resume at Task 10** — AI-judged checkpoint + defensive `parseVerdict` rubric parser + the **A4 drills-only
   kill-switch** (`NEXT_PUBLIC_CHECKPOINT_ENABLED`). Brief already extracted at
   `.superpowers/sdd/2026-08-19-edtech-mvp/task-10-brief.md`. It modifies the dashboard (gate the checkpoint
   CTA behind `checkpointEnabled()`) and routes to `/unlock` (Task 11) — handle that forward-ref like Task 8's
   checkpoint affordance (non-navigating until Task 11 exists).
3. Then Tasks 11 (win-card + ₹399 fake-door) and 12 (event-coverage QA + Vercel launch — **Task 12's Vercel
   deploy is a human/controller trigger**).
4. Rotate any pasted secrets before/after the case study.

### Gotchas (unchanged)
- `web/.env.local` + `.superpowers/…/progress.md` (the SDD ledger) are **git-ignored** — they do NOT travel
  between machines; recreate `.env.local` from the Gemini/Supabase/PostHog dashboards, and the ledger recovers
  from `git log` + this section. Next 16 refuses a second dev server on the same dir (kill orphans on port
  3000). Bash-tool cwd sits in `web/` — drop the `cd web`.

---

## 1. The assignment (in one paragraph)

Design **and build** an MVP for a new-age learning platform that helps *non-technical
professionals* become comfortable with Tech & AI — Duolingo-inspired (continuous,
interactive, habit-forming). The user, problem, and scope are deliberately open ("you
decide"). Unlike prior weeks, this doesn't stop at a PRD/prototype: it must be a working
MVP put in front of **40–50 real users**, with an acquisition strategy + growth loop,
full funnel (acquisition → retention), product + business metrics, event tracking across
the key journey, and documented insights + iterations from real usage.

**Working model:** group discovery/problem-convergence first, then each person builds
their own solution individually (same as prior case studies: gig economy, elder care,
vendor management).

## 2. Approach

Double diamond, same as the Vendor Management week:

- **Diamond 1 — Discover → Define (now → Tue):** secondary research (done, below) +
  fast primary interviews → converge on ONE persona + ONE sharp pain point.
  Output = **Problem Space PRD** (brief's Monday EOD checkpoint).
- **Diamond 2 — Develop → Deliver (Wed → 26th):** solution design → tight MVP →
  40–50 real users → event tracking → iterate. Output = working MVP + funnel data +
  Final PRD.

**Biggest risk this week:** scope creep. The brief itself says "take a very small pain
point and very few features, but build it end to end." Define must be ruthless.

## 3. Secondary research findings (Discover)

> NOTE ON SOURCES: figures below come from secondary aggregators citing primary reports
> (WEF, PwC, IDC, edX). Treat them as directional. Verify against the primary reports
> before putting any specific number in the PRD — they vary between sources.

**Finding 1 — Demand is real and broad, not niche.**
- WEF Future of Jobs framing: ~60% of workers will need training by 2027; ~half currently
  lack access to adequate training. (via pmi.org, citing WEF 2023)
- PwC 2025 Global Workforce Survey: ~80% of the global workforce will need new skills by
  2027 — but this spans admin staff to executives, so *depth* of reskilling varies a lot.
  (via digitalapplied.com / iternal.ai)
- Only ~1/3 of employees report receiving any AI training in the past year. (via
  workera.ai, citing IDC)
- IDC estimate: skills shortages may cost the global economy up to $5.5T by 2026. (via
  workera.ai)

**Finding 2 — The real problem isn't access to content; it's COMPLETION.** (Strongest signal.)
- Free MOOCs: ~5–15% completion. ~50% of dropouts happen in the first two weeks. (via
  skillademia.com, citing edX Research 2024 / MIT-edX)
- What fixes it, and by how much: micro-learning under 2h → 80%+ completion; immediate
  hands-on projects → dropout −22%; social cohort features → −28%; daily nudges → −15%;
  AI-driven personalization → completion +35–45% vs static paths. (same source)
- The brief's own line — "most existing learning experiences are built around consuming
  content" — IS this problem. The category doesn't need more content; it needs a mechanism
  that gets people past week two.

**Finding 3 — Duolingo's transferable mechanics (not the vanity numbers).**
- One tiny daily behavior (a single short lesson); streaks built on loss aversion;
  onboarding that delivers a first win BEFORE asking for sign-up.
- They optimize for streak-establishment (a 7-day metric) because it predicts long-term
  retention. DAU/MAU ~37% (very high for consumer). (via youngurbanproject.com;
  mechanics via uladshauchenka.com, lennysnewsletter.com, trypropel.ai)
- HONESTY FLAG: headline DAU figures disagree across sources (~34M and ~47.7M both cited
  for 2025). Don't quote a specific user count — the mechanics are the reusable insight.

**Synthesis / product thesis:**
> The wedge is NOT "teach AI." It's "get a non-technical professional to their first real,
> useful AI win in under 10 minutes, then build a daily habit around small wins so they
> actually get past week two."

## 4. Persona candidates (pick ONE — this is the convergence decision)

- **A. AI-anxious individual contributor** (marketer / HR exec, 2–8 yrs exp, "use AI" is
  now expected of them). Knows they should use AI, feels behind, bounced off tutorials.
  → Highest volume, easiest to recruit 40–50, first-win MVP is demonstrable. **Current
  front-runner (recommendation, not conclusion).**
- **B. Career-switcher / job-seeker** (non-tech grad → AI-adjacent role). High emotional
  urgency, but hard to show a "win" in one MVP week.
- **C. Small-business owner / solo founder** automating real tasks. Concrete high value,
  but each user's need is bespoke → hard to standardize an MVP.

## 5. Strategic decision on record: why AI as the wedge (not "tech in general")

The brief allows "Tech & AI," so "learn any technology" is in scope. We're still leaning
AI as the *entry wedge* (not the whole vision). Reasoning:

- **MVP needs ONE repeatable first win.** "Learn any tech" has no single first win — SQL,
  Figma, Excel, Git each have different magic moments. You'd end up building a
  content catalog, which the brief says is the already-solved, non-opportunity.
- **AI has one common surface (natural language).** A single first-win loop generalizes
  across very different users. That's the rare property: broad audience + single loop.
  "Any tech" = broad audience, no single loop. A specific skill = single loop, tiny
  audience. AI sits in the sweet spot.
- **Urgency.** "Learn some tech" is a decade-old, low-emotion want. "Everyone's using AI
  and I'm falling behind" is acute and right-now — critical for a week graded on real
  traction (40–50 users + retention).
- **Narrowing the wedge ≠ narrowing the vision.** Vision can stay "make non-tech
  professionals confident with technology." Enter through the sharpest door (AI), broaden
  later — like Amazon (books) or Duolingo (one language mechanic).
- **What would flip this:** if interviews show people's real tried-and-failed stories are
  NOT about AI (e.g., marketer's true pain is "can't pull my own data / don't know SQL"),
  follow the pain, not the hypothesis. AI is the strongest STARTING bet the interviews
  are allowed to overturn.

## 6. Primary research plan

**What we're trying to achieve (the 5 outputs):**
1. Confirm or kill the persona bet — real pain shows up as *action* (they've already
   tried & failed something). No prior attempts = pain not real enough.
2. The exact moment it breaks — specific, e.g. "opened ChatGPT to write a JD, didn't know
   what to type, got a generic answer, gave up."
3. **The "first win"** — the ONE time AI genuinely saved them time on a real task. Collect
   5–6 of these; the recurring 2–3 tasks become the MVP's core loop. (Most important.)
4. Their actual words — reuse verbatim in landing page + acquisition messaging.
5. De-risked scope — insurance against building a beautiful MVP for a problem nobody has.

**Method:** 6–8 short behavioral interviews (NOT a survey). Past-tense questions only —
don't pitch the idea and ask "would you use this?" (people are polite). Recruit persona A
first: colleagues, ex-colleagues, cohort networks, LinkedIn.

**Interview guide:**
1. Tell me about the last time you tried to learn an AI/tech tool for work. What made you start?
2. Walk me through what actually happened — where did you get stuck or stop?
3. What have you tried (courses, YouTube, ChatGPT, a colleague)? What happened with each?
4. When you DID use an AI tool successfully, what was that moment? What made it click?
5. What does "I'm now comfortable with this" actually look like for you? How would you know?
6. If you stopped a course halfway, what was going on that week?
7. What would make you come back to a learning app tomorrow, not "someday"?

**Success test:** afterward, can you fill this in with evidence behind every blank —
> "[specific person] can't [specific task] because [specific reason]; today they
> [workaround], which fails because [reason]."
If yes → ready to converge + write Problem Space PRD. If not → 1–2 more conversations first.

## 7. Open decisions / next steps

- [ ] **Decide the persona** (A / B / C / something the interviews surface).
- [ ] Run 6–8 primary interviews using the guide above; capture the "first win" stories.
- [ ] Once converged: draft the **Problem Space PRD** (structure like VMS Discovery:
      problem space, research, personas, pain points, insights, assumptions).
- [ ] Then move into Diamond 2: solution design → tight MVP → growth loop + event tracking plan.

## 8. Reference: prior case study (VMS) for format continuity

VMS week produced a 15–17pg PRD (Discovery → Opportunity → Product Strategy → Solution
Design) then a built product (landing, auth, search, onboarding, verification, risk
scoring, dashboards) deployed on Vercel with analytics. Use the same Discovery-section
structure for this week's Problem Space PRD.

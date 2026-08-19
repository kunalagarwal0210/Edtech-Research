# EdTech Case Study — Session Handoff

**Owner:** Kunal Agarwal
**Assignment:** PM course, Week 5 / Cohort 8 / Case Study 4
**Deadline:** 26 August 2026
**Handoff written:** 17 August 2026 · **Updated:** 19 August 2026 (Session 6)
**Current phase:** Diamond 2 — **BUILD IN PROGRESS** (Tasks 1, 1.5 done; Task 2 code done, live
spike pending). Both PRDs drafted (`problem-space-prd.md` + `solution-prd.md`); the 4 open forks
from Section 0.5 are all resolved via an 11-decision grilling session (see Section 0.6). The MVP
build is underway on branch `edtech-mvp-build` via a written implementation plan + Superpowers
subagent-driven execution (see Section 0.7). **⚠️ Paused on office laptop — Zscaler blocks the
Gemini spike; resume at home (see Section 0.8).**

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

# Solution PRD — EdTech Case Study 4

**Owner:** Kunal Agarwal · **Group:** nAi+ve Tribe
**Assignment:** PM course · Week 5 · Cohort 8 · Case Study 4
**Deliverable:** Diamond 2 output (Develop → Deliver) · working MVP for 40–50 users
**Deadline (assignment):** 26 August 2026
**Version:** Draft v1 · 18 August 2026
**Status:** Solution DEFINED (converged via `/grilling`, 4 rounds). Ready to build. Metric
thresholds deferred to baseline; task-path (A3) and price are live questions the test resolves.

> **Scope of this document.** This is the *Solution* PRD — it picks up where
> `problem-space-prd.md` (Diamond 1) stops. Problem, persona, and wedge are settled there and
> not re-argued here; this doc specifies **what we build, how it's instrumented, and how we
> take it to 40–50 real users.** Every decision below was converged in a grilling session and
> is traceable to a Discovery insight or a survey signal.

---

## 0. TL;DR

A **guided-rails web app** that walks a non-technical professional from a weak prompt to a
**real, usable AI result on their own task in ~10 minutes** — jargon-free, before any signup —
then holds the habit with a **byte-sized daily loop** (3 drills + a real-task checkpoint).
Built AI-assisted on Next.js/Vercel, powered by a **free-tier live LLM (~$0)**, instrumented
end-to-end in PostHog, recruited manually off 28 already-captured leads, and monetised via a
single post-checkpoint **subscription fake-door**.

The MVP is deliberately lean: one persona, one first-win task, one loop, one growth mechanic,
one fake-door. Scope creep is the named enemy of the week.

---

## 1. Product Strategy

### 1.1 The thesis (carried from Diamond 1)
Move a non-technical professional from **"I can prompt"** → **"I can actually use and build with
it"** — anchored on one real task they already want to do, proven with a free applied first win
*before* any ask, then habituated with a daily loop. The category's failure is completion +
application, not content; this product is a mechanism to get past the week-two wall.

### 1.2 Product form — a guided-rails web app *(decision Q1)*
Not a chat coach, not a content-lesson library, not a browser extension. A **guided,
step-by-step web experience on live-LLM rails.**

| Why this form | Rejected alternatives |
|---|---|
| Only form that delivers a **controllable, reliable, gradeable** <10-min win | **Chat coach** — flexible but can't guarantee a reliable win or grade it |
| Matches the drills + checkpoint loop natively | **Content-lesson app** — risks the content-consumption trap Discovery rejected |
| Runs on the free-tier live-LLM engine | **Browser overlay / BYO ChatGPT** — fragile, ToS-risky, rejected as core |

### 1.3 The first-win task — bring-your-own, writing-scaffolded *(decision Q2 · Assumption A3)*
The user brings **any real task**; the flow defaults to and scaffolds the **writing pattern**
(weak prompt → structured, usable output). This is the honest hedge on the A3 tension: both
surveys leaned toward *automation/building* over writing, but (a) that sample skews technical,
(b) automation can't deliver a clean <10-min pre-signup win, and (c) the wedge's "and build"
half is a *destination*, not the first-win task. Letting the user bring their own task serves
Insight #2 ("customize the destination, not the effort") and lets an automation-minded user
bring an automation prompt without us betting the MVP on delivering true automation.
**The live test resolves whether to shift the default.**

### 1.4 MVP scope — lean *(decision Q3)*
**In:** pre-signup first win + 3 daily drills + 1 real-task checkpoint.
**Out (guarding creep):** on-demand AI tutor, full 5-day path, a second growth mechanic,
live/cohort features, solved economics, per-use pricing. Enough to measure activation + D1/D2
return without risking not shipping.

---

## 2. Solution Design

### 2.1 The day-0 first-win flow (the hero, pre-signup) *(decision Q7)*
Eight steps, each mapped to a Discovery lever:

| # | Step | Discovery lever |
|---|------|-----------------|
| 1 | **Landing** — headline in users' verbatim words: *"Get your first real AI win in 10 minutes."* | Acquisition messaging (interview verbatim) |
| 2 | **Ask the task first** — "What's one real thing you want AI to do for your work?" 3 example chips (draft a JD/email · summarize a long report · analyze a sheet) + free text | Reverse onboarding (Insight #2); P1 navigation |
| 3 | **User's weak attempt** — they type their real first prompt | Meets them where they are (P3 shallow usage) |
| 4 | **Jargon-free diagnosis** — *why* it's weak, "explain like I'm in 8th class" | P2 jargon wall |
| 5 | **Rebuild into a structured prompt** — role · context · format · constraints, teaching the transferable pattern as it goes | **The actual product** — P3 → capability |
| 6 | **Live run → usable output** (Gemini) | Real applied win (P4) |
| 7 | **Inline check** — one micro-question confirming what made it better | Format T3 (inline check) |
| 8 | **Win moment → signup wall** — *"You went from this → that"* → save + continue | Proof-before-signup (P6 trust) |

Step 5 is the core: it teaches a **reusable pattern**, not a one-off answer. That's the
difference between "I got one good output" and "I can do this myself next time."

### 2.2 The returning daily loop *(decision Q8)*
- **3 drills**, each 10–15 min, isolating **one prompt lever** — (1) adding context, (2)
  specifying format, (3) chaining steps — auto-graded with an inline check.
- **Progress metaphor:** *"AI tasks you can now do"* — **not** "% to a target role" (locked
  decision 3).
- **Daily streak** — Duolingo-style loss-aversion.
- **Checkpoint (day 3–4):** a full real task the user does with AI, **AI-judged against a
  rubric** — the one bet-with-a-fallback. *If AI-grading wobbles, drills-alone still ships a
  coherent MVP* (Assumption A4).

Applied practice is the loudest survey signal (practical exercises 20/37, hands-on the #2
problem) — the checkpoint is where that gets proven; feedback-on-work outranked a chat tutor
(10/37 vs 6/37), which is why we build **grading**, not a tutor.

### 2.3 Engine, build, auth *(decisions Q4, Q5, Q6)*
- **Engine:** Gemini AI Studio **free tier** (Groq/Llama as rate-limit overflow), **~$0** at
  test scale (~500–750 calls vs ~1,500/day free quota). Visible *"don't paste confidential
  info"* notice (free tier may train on prompts). Copy-paste bridge stays an optional later
  toggle, not core.
- **Build:** **AI-assisted Next.js on Vercel** — same stack as the VMS build; full control of
  the flow, first-class event tracking, free hosting.
- **Auth:** **no wall through the first win** → **Google OAuth** at the win moment (peak
  motivation; natural "save your progress" ask; lowest friction for a one-week test).

### 2.4 Acquisition + growth loop *(decision Q9)*
- **Acquisition:** manual targeted recruiting — start with the **28 leads already captured**
  from Survey B, plus interview networks + LinkedIn/cohort → the verbatim-words landing page.
  The leads make 40–50 users achievable with **zero paid acquisition.**
- **Growth loop:** **one** instrumented "win card" — *"I just did [task] with AI in 10
  minutes"* — generated at the win moment, seeded and measured. One loop only; a second
  mechanic is scope creep.

---

## 3. Measurement & Event Tracking *(decision Q10)*

**Tool:** PostHog free tier (funnels, retention, session events out of the box).

**Headline metric:** `first_win_completed` — completed the pre-signup first win (activation).

**Supporting:** D1/D2 return (retention proxy) · full completion funnel · checkpoint reach ·
fake-door click.

**Event map (the full journey):**
```
landing_view → task_started → weak_prompt_submitted → prompt_rebuilt →
output_generated → inline_check_answered → first_win_completed  ★activation
→ signup_completed → drill_started/completed ×3 → streak_day →
checkpoint_started → checkpoint_graded → share_card_generated →
share_card_clicked → fakedoor_clicked
```

**Thresholds:** the success-test "X%" bars stay **deliberately deferred** — set from baseline
after soft launch, not guessed up front. Measuring leading indicators of habit (activation +
early return), defensible for a one-week test.

---

## 4. Business Model — fake-door WTP *(decision Q11)*

The deliverable needs a **fake-door WTP test + a defensible business hypothesis**, not solved
economics.

- **Placement:** after the checkpoint — the point of most demonstrated value.
- **Framing:** **subscription** (matches the daily-habit loop and both surveys' lean; resolves
  the docs' per-use-vs-subscription contradiction *toward subscription*).
- **Mechanic:** "Unlock the full path" → click = intent → "coming soon, drop your email."
- **Price:** single **₹399/mo** shown — tests the *trustworthy-not-scammy entry* for a burned
  persona. (Surveys named ₹1000–2000, but that's enthusiasts; 40–50 users can't A/B price.)
- **Business hypothesis on record:** consumer daily-habit app = **wedge / engagement proof**;
  durable revenue likely **B2B / team per-seat** later (has budget, clears the ₹150–500/user/mo
  COGS that consumer WTP may not). Not solved here — deliberately.

---

## 5. Risks & Open Items (carried forward, none blocking)

| # | Item | Handling |
|---|------|----------|
| A1 | Daily loop substituting for cohort accountability (biggest external bet) | The 40–50-user retention test measures exactly this |
| A3 | Automation-vs-writing first-win task | Bring-your-own hedges it; live-test behavior resolves the default |
| A4 | AI-grading reliability at the checkpoint | Drills-alone fallback ships a coherent MVP |
| — | Trustworthy price | ₹399 is a fake-door test, not a finding |
| — | Handoff still says "per-use-case" WTP | Reconcile with the subscription lean when decided |

---

## 6. Build Plan (next actions)

1. Scaffold Next.js/Vercel app + PostHog + Google OAuth.
2. Build the 8-step day-0 flow on Gemini rails (steps 2–6 are the core; polish step 5).
3. Build the 3 drills + streak + progress ("tasks you can now do").
4. Build the AI-judged checkpoint + rubric (with drills-only fallback wired).
5. Wire the full event map + the win-card share loop + the ₹399 fake-door.
6. Verbatim-words landing page.
7. Recruit off the 28 leads → soft launch → set baseline thresholds → iterate.

---

### Appendix — source map
- `problem-space-prd.md` — Diamond 1: problem, persona, pain points, insights, assumptions.
- `edtech-case-study-handoff.md` — Section 0 locked decisions; Section 0.6 solution convergence.
- `edtech-primary-research.md` · `secondary-research-round2.md` · `quantitative-proxies.md` —
  research backing.
- Survey response files (n=6, n=37) — signal behind survey-tagged decisions.

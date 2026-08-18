# Secondary Research — Round 2 (stress-testing Locked Hypothesis v2)

**Date:** 18 Aug 2026 · **Purpose:** pressure-test the 10 locked decisions in
`edtech-case-study-handoff.md` (Section 0) against fresh secondary sources before drafting
the Problem Space PRD. Same caveat as Round 1: these are aggregator/blog citations of
primary reports (McKinsey, KPMG, IDC, Udemy, etc.) — treat as directional, verify any number
before it goes in the PRD.

---

## 1. AI skills gap & urgency (supports Decision 1 — persona, and urgency case)

- 59% of enterprise leaders say their org has an AI skills gap in 2026; only 24% of
  individual contributors strongly agree their employer prepared them to use AI effectively.
  (via [Skillsoft](https://www.skillsoft.com/blog/the-ai-skills-gap-in-the-workplace-the-statistics-that-matter-in-2026))
- 91% of HR professionals believe employees *overstate* their own AI proficiency — i.e. the
  gap is bigger than self-report suggests. (via Skillsoft)
- Demand side is real: 4 in 5 employees want to learn how to use AI in their profession.
  (via Skillsoft)
- McKinsey: C-suite estimates only 4% of staff use GenAI for ≥30% of daily work; actual
  employee-reported figure is 13% — leadership underestimates real usage 3x. 47% of
  employees expect to be using GenAI for >30% of tasks within a year (vs. only 20% of
  leaders expecting that). (via [Silicon Canals](https://siliconcanals.com/t-mckinsey-surveyed-c-suite-executives-and-found-they-believed-only-4-of-their-staff-used-ai-for-at-least-30-of-daily-work-the-real-figure-from-the-employees-themselves-was-13-meaning-ai-ha/))
- **Read for the PRD:** confirms career-ROI urgency is real and workers are ahead of their
  orgs, not waiting on top-down training — supports self-directed / bring-your-own-tool
  product framing over an enterprise-LMS framing.

## 2. Formal AI training coverage + effectiveness (supports "learned before, didn't stick")

- 68% of US employees received **no** AI training in the past 12 months; of those who did
  get trained, only 18% say it prepared them to work independently. (via [Metaintro](https://www.metaintro.com/blog/85-percent-workers-cannot-connect-ai-training-job-2026) / [PSHRA](https://pshra.org/survey-workplace-ai-training-not-keeping-pace-with-increasing-adoption/))
- 85% of workers can't connect the AI training they received to their actual job, because
  it's delivered in generic modules disconnected from real tasks. (via Metaintro)
- **HONESTY FLAG:** two different "no training" figures circulate (68% vs 35% in different
  cuts of similar surveys) — don't quote a single precise number in the PRD, cite the range
  and the *direction* (majority under-trained, and what training exists is generic/untethered
  from real work).
- **Read for the PRD:** directly validates the "learned things before that never stuck
  because nowhere to apply them" line in the persona — the failure mode is genericness, not
  lack of exposure. Strengthens the case for the hardcoded real-task anchor (Decision 5).

## 3. Shallow prompt usage — the "I can prompt but can't really use it" gap (supports the wedge line directly)

- 86% of workers admit they aren't using AI tools to full potential; 82% say they aren't
  familiar with practical day-to-day use cases. One enterprise survey: ~55% use AI weekly,
  but 85% don't use it in any way that generates business value. (via [Apollo Technical](https://www.apollotechnical.com/why-employees-still-arent-getting-the-most-out-of-ai-at-work/))
- Only ~10% of the workforce is assessed as "AI-proficient" — most are beginners with poor
  prompting skills. (via [Section AI](https://www.sectionai.com/blog/new-data-on-ai-proficiency))
- Understanding of "prompt engineering" barely moved: 22% (2024) → 26% (2025), +4pp in a
  year despite a year of hype and tool rollout. (via HR Dive / Forrester coverage)
- Common failure pattern named across sources: vague instructions → bad output → user gives
  up → usage stays shallow (email drafts, grammar polish, quick search) and never reaches
  anything transformational. (via Apollo Technical)
- **Read for the PRD:** this is the strongest external validation of the wedge line —
  *"I can prompt" → "I can actually use and build with it."* The literature independently
  converges on the exact same gap: high tool access, near-universal shallow/failed usage,
  low structured-prompting literacy. This is citable as the category-level opportunity, not
  just an interview finding.

## 4. Jargon / onboarding friction (supports "bounces off jargon in first 15 min")

- Training-gap literature frames the barrier in three buckets: organizational (unclear
  policy), technological (integration/trust), and individual (skills + habit-formation +
  psychological). The individual bucket is the one this product can actually address.
  (via [Moveworks](https://www.moveworks.com/us/en/resources/blog/ai-adoption-strategy-for-a-successful-ai-integration))
- 63% of employees believe AI would boost their job satisfaction, but more than half don't
  know how their company actually uses it — a *clarity* gap, not a motivation gap.
  (via myHRfuture)
- Recommended mitigation pattern in the literature matches the hypothesis almost exactly:
  start with accessible, low-jargon entry points to build confidence before layering in
  more advanced capability. (via myHRfuture)
- **No source directly measured a "first 15 minutes" drop-off window for AI tools
  specifically** — that stat in the handoff (Section 3, Finding 2) is from general MOOC
  dropout research (edX), not AI-training-specific. Flag as `[extrapolated from MOOC data,
  not AI-training-specific]` if quoted in the PRD.

## 5. Applied/task-based learning vs passive content (supports the checkpoint + real-task-loop design)

- Retention: ~5% for lecture/passive content vs ~75% for hands-on practice/task application.
  Active learners retained 93.5% after one month vs 79% for passive learners.
  (via [Bridge](https://www.getbridge.com/blog/learning-analytics/10-stats-about-learning-retention-youll-want-forget/) / iSpring)
- Xerox study (classic, still widely cited): only 13% of traditionally-taught skills got
  applied on the job; active-learning-with-immediate-application designs raised that to 75%+.
  (via ChangeThroughPlay)
- **Read for the PRD:** this is the strongest secondary support for Decision 4 (hybrid drills
  + real-task checkpoints) and Decision 6 (first win = doing a real task, not watching
  content). The gap between "taught" and "applied" is the same gap the product is designed
  to close.

## 6. Live cohort vs self-paced completion (nuances Decision 9 / the "can't commit to live sessions" pain point)

- Cohort-based courses: ~64% completion vs ~48% for self-paced in one dataset; another
  source cites a starker 60–70% (cohort) vs 10–15% (self-paced) gap. Driver named: shared
  deadlines + peer accountability, not content quality. (via [Ruzuku](https://www.ruzuku.com/learn/articles/cohort-vs-self-paced))
- Self-paced still wins on accessibility — professionals who need learning to fit around
  work rather than compete with it, and global/timezone reach. (via Ruzuku, FourthRev)
- **HONESTY FLAG — this is a real tension, not a clean win for the hypothesis.** The
  literature says live/cohort structure reliably beats self-paced on completion. The
  hypothesis is betting that a byte-sized daily loop + streak + first-win mechanics can
  substitute for live accountability. That substitution is *not* independently validated by
  this literature — the closest evidence is Duolingo's own DAU/streak numbers (Round 1,
  Finding 3), which is a consumer-language-app category, not professional upskilling.
  **This is the single biggest external risk to flag in the PRD's assumptions section.**
  Mitigating factor: the interview round (primary data, stronger signal than secondary here)
  directly heard "can't commit to scheduled live sessions" as a named pain — so the target
  persona is self-selecting out of the format that secondary data says works best. Worth
  naming as a deliberate bet, not an oversight.

## 7. AI tutoring effectiveness (relevant to the "on-demand AI tutor" stretch feature, Risk #2)

- Positive: a 2025 RCT found AI tutoring outperformed in-class active learning (effect size
  0.73–1.3 SD) when it combined personalized pacing, immediate feedback, and step-by-step
  guidance (meta-review of 28 studies, ~4,600 learners). (via [Brookings](https://www.brookings.edu/articles/what-the-research-shows-about-generative-ai-in-tutoring/))
- Limitation: AI tutoring still under-performs on real-time adaptation — it follows
  predictable response patterns and struggles when a learner needs re-scaffolding, vs. a
  human tutor. Best results in a 2025 AIR evaluation came from a **hybrid** AI+human model
  (effect size 0.42), not pure AI. (via Bookbot / AIR)
- **Read for the PRD:** supports keeping on-demand AI tutor as a stretch/day-2 feature, not
  core MVP scope, exactly as Risk #2 already frames it — the evidence base for *pure* AI
  tutoring at MVP quality is thinner than for the structured-drill mechanic.

## 8. Career-switcher segment (touches Risk #3 — thin persona evidence for switchers)

- AI skills now appear in ~16.5% of entry-level job postings (spring 2026), up from ~10.5%
  (fall 2025) — nearly 3x growth, but still a minority of postings. (via Nucamp)
- Signal is shifting toward **AI literacy + domain expertise combined**, not deep technical
  retraining — "domain expertise + AI literacy" is described as the profile employers want,
  which is closer to the in-role professional than the ground-up career-switcher.
  (via multiple bootcamp-industry sources)
- **Read for the PRD:** secondary data leans toward confirming the v2 pivot (in-role task
  anchor over role-switch anchor) — the market signal is "add AI literacy to what you
  already do," not "become an AI person from scratch." Switchers remain a real but smaller
  slice. This is consistent with, not contradicting, Risk #3 — still worth 2–3 more targeted
  interviews if time allows, but secondary data doesn't argue for re-centering on switchers.

## 9. Gamification / streak mechanics for skill-building (supports Decision 3 — archetype)

- Streak-wager mechanics: +14% D14 retention in one study; apps combining streaks +
  milestones see 40–60% higher DAU than single-mechanic apps. (via Trophy.so / Plotline)
- Mechanism is loss aversion — losing a streak hurts ~2x more than gaining the equivalent
  reward feels good, matching the Duolingo mechanic already cited in Round 1.
- **Caveat directly relevant here:** the evidence base for streaks/gamification is strongest
  in language-learning and fitness apps; a review of gamification in health/fitness found
  effect **depends heavily on design** and "gamification" is too broad a bucket to treat as
  one proven formula. (via The Decision Lab)
- **Read for the PRD:** reasonable support for the mechanic, but should be framed as "adapted
  from a validated adjacent category" rather than "proven for professional AI upskilling" —
  no source found gamified-streak data specifically for professional/B2B skill apps at
  Duolingo-comparable scale.

## 10. Willingness to pay (supports Decision 10 — business model, consumer side)

- Individual/consumer WTP for professional skill-upgrade courses (digital marketing, sales,
  finance-type) clusters at **$300–$2,000**; hobby-learning courses cluster lower ($10–$300).
  (via BuddyBoss / LearnWorlds pricing-guide roundups)
- Market signal: **subscription fatigue** — buyers increasingly prefer one-time/lifetime
  purchases over recurring fees, which is directional support for Decision 10's per-use-case
  framing over a subscription default.
  - **Caveat:** this WTP data is about *paid, marketed courses* in general — not
    specifically fake-door tested, not specifically for an unproven MVP with no brand trust.
    Early-stage per-use-case pricing in the interviews (Decision 10) is a much lower-trust
    context than these benchmark figures assume. Treat as a ceiling/reference point, not a
    prediction.
- On the employer/B2B side (relevant to "B2B L&D later"): 87% of business leaders are
  prioritizing upskilling/reskilling for AI-readiness; nearly half of firms say they'd pay an
  11–15% salary premium for AI skills. (via KPMG, HR Dive / CFO Dive) — signals a viable
  later B2B channel once the individual product has traction.

## 11. Competitive landscape (context, not a locked decision — worth a paragraph in the PRD)

- **Multiverse** is the closest adjacent player: an "AI upskilling & adoption platform" for
  individuals and employers, spanning AI/data/tech skills, positioned around "learning
  science" and real skills change. Mostly enterprise/apprenticeship-sold, not a consumer
  daily-habit product. (via [Multiverse](https://www.multiverse.io/))
- Gamified-LMS players (TalentLMS, Centrical, Coursebox, D2L Lumi) target **L&D teams
  buying for their org**, not individual consumers self-serving a daily habit loop — none
  found that combine Duolingo-style daily streak mechanics with *task-anchored* (not
  content-anchored) AI upskilling for individual professionals.
- **Read for the PRD:** the specific combination this hypothesis is betting on — individual
  (not enterprise-sold), daily habit loop (not a course), anchored on the user's own real
  task (not generic content) — does not appear to have a direct incumbent in the sources
  found. That's either white space or a sign no one has cracked the retention problem this
  way yet; the interviews + fake-door test are the way to find out which.

---

## Synthesis — what this changes for the PRD

**Reinforced, cite with confidence:**
- The core wedge (shallow prompting → real capability) — independently and strongly
  validated by secondary data (Section 3), not just the 12 interviews.
- Task-based/applied-learning design (checkpoints, real-task first win) — well-supported by
  learning-retention research (Section 5).
- Generic, disconnected-from-real-work training as the failure mode of existing options
  (Section 2) — matches "learned before, never stuck."
- Keeping on-demand AI tutor as stretch, not core (Section 7) — secondary evidence agrees
  pure-AI tutoring is the weaker bet vs. structured drills.

**Needs an explicit assumption/risk callout in the PRD (not blockers, but be honest):**
- **Live/cohort format reliably outperforms self-paced on completion in the general
  literature** (Section 6) — the daily-loop mechanic is betting it can substitute for that,
  which is a real, named bet, not a settled fact. This is the single most important new risk
  to add alongside the existing three in Section 0.
- Gamification/streak evidence is strong in language/fitness apps, unproven at this
  combination (professional + task-anchored) — frame as "adapted," not "proven" (Section 9).
- WTP benchmarks ($300–$2,000) are ceiling references from trusted/marketed courses, not
  predictions for an untrusted fake-door MVP (Section 10).

**No direct competitor found** combining individual-consumer + daily habit loop +
task-anchored (not content-anchored) AI upskilling — worth one sentence in the PRD's
competitive-landscape section either way.

# Problem Space PRD — EdTech Case Study 4

**Owner:** Kunal Agarwal
**Assignment:** PM course · Week 5 · Cohort 8 · Case Study 4
**Deliverable:** Diamond 1 output (Discover → Define) · Monday EOD checkpoint
**Deadline (assignment):** 26 August 2026
**Version:** Draft v1.1 · 18 August 2026
**Status:** Persona, problem, and task-path LOCKED (v2). Quantitative validation: **first survey wave patched in (n=6, directional)**; markers remain where more responses are still needed.

> **Scope of this document.** This is the *Problem Space* PRD — Discovery through problem
> definition, in the VMS Discovery structure (problem space · research · personas · pain
> points · insights · assumptions). It deliberately stops before solution spec. The MVP
> design, funnel, and metrics plan are Diamond 2 and live in a separate Product PRD.
> `[survey pending]` marks every place quantitative validation will slot in; none of these
> are blockers to the build — the persona, task-path, and loop are settled.
>
> **Survey wave 1 patched in (18 Aug, n=6).** First responses to *"How professionals learn to
> use AI at work — 2-min survey"* are folded into Sections 2.4, 4, and 6 below, tagged
> `[survey n=6]`. **This is a small, non-random sample** (analyst-heavy; includes one
> self-identified coder and one CA, both near the anti-persona line) — read every figure as
> directional, not statistical. Markers stay `[survey pending — more responses]` where a
> larger wave is still needed for confidence.

---

## 0. TL;DR

Non-technical professionals in tech-enabled roles are under near-universal pressure to "use
AI," have broad tool *access*, and yet use those tools shallowly — prompt in, output out,
nothing more. The blocker isn't access to content; it's that they don't know where to start,
bounce off jargon in the first 15 minutes, and have learned things before that never stuck
because there was nowhere to apply them.

**The opportunity is not "teach AI from zero." It's moving people from *"I can prompt"* →
*"I can actually use and build with it,"* anchored on one real task they already want to do
in the job they already have.** We prove value with a jargon-free ~10-minute first win
*before* any signup or payment, then hold the habit with a byte-sized daily loop.

Both primary interviews (~12) and secondary research converge on this. The single biggest
honest risk: structured live/cohort formats reliably beat self-paced on completion in the
literature, and we are betting a daily-habit loop can substitute for that accountability.

---

## 1. Problem Space

### 1.1 The assignment framing
Design **and build** an MVP for a new-age learning platform that helps *non-technical
professionals* get comfortable with Tech & AI — Duolingo-inspired (continuous, interactive,
habit-forming) — then put it in front of 40–50 real users with an acquisition strategy,
growth loop, full funnel, and event tracking. The brief's own constraint: *"take a very
small pain point and very few features, but build it end to end."* Scope creep is the
primary risk of the week.

### 1.2 The category-level problem
The learning market treats the AI-skills gap as a **content** problem — more courses, more
videos, more modules. The evidence says it is a **completion and application** problem:

- Free MOOCs complete at ~5–15%, with ~50% of dropouts in the first two weeks. (Round 1,
  edX/MIT-edX via skillademia)
- 85% of workers who *did* receive AI training can't connect it to their actual job because
  it arrives as generic, disconnected modules. (Round 2, Metaintro/PSHRA)
- Passive content retains ~5% vs ~75% for hands-on application; the classic Xerox finding is
  13% of taught skills applied on the job vs 75%+ when taught with immediate application.
  (Round 2, Bridge / ChangeThroughPlay)

More content does not move any of these. A mechanism that gets a learner past the first-15-
minutes wall and lands a real applied win does.

### 1.3 The specific problem we are solving
> A non-technical professional in a tech-enabled role, self-motivated by career ROI, is
> stuck at "where do I start," bounces off jargon in the first 15 minutes, can't commit to
> scheduled live sessions, and has learned things before that never stuck because they had
> nowhere to apply them.

They already have AI tools. What they lack is a way to get from shallow, unreliable prompting
to actually using AI to do a real piece of their own work — and a reason to come back
tomorrow.

### 1.4 Why now (urgency)
- ~80% of the workforce will need new skills by 2027 (PwC, Round 1); 4 in 5 employees *want*
  to learn to use AI in their profession (Round 2, Skillsoft).
- Workers are ahead of their employers: McKinsey found actual employee GenAI usage (13% for
  ≥30% of daily work) is ~3x what the C-suite believes (4%), and 47% of employees expect to
  cross that threshold within a year. (Round 2, McKinsey via Silicon Canals) The demand is
  self-directed and immediate, not waiting on top-down training.
- "Everyone's using AI and I'm falling behind" is an acute, right-now anxiety — the emotional
  fuel a habit product needs, and the reason AI (not "tech in general") is the entry wedge.

### 1.5 The wedge (one line)
Move people from **"I can prompt"** → **"I can actually use and build with it"** — on their
own real task.

---

## 2. Research

Two evidence streams: a qualitative primary round (~12 interviews, 18 Aug) and two rounds of
secondary desk research. Full detail in `edtech-primary-research.md`,
`secondary-research-round2.md`, and the kickoff handoff. **Honesty caveat carried through:**
the ~12 interviews are a small non-random qualitative sample (no percentages attached — that
would be false precision); secondary figures are aggregators citing primary reports (WEF,
PwC, IDC, McKinsey, edX) and should be verified against source reports before any specific
number enters a graded deliverable.

### 2.1 Primary research — who we talked to
~12 interviews shared in the 18 Aug session, spanning: senior developer, architect/interior
designer, lawyer, therapist, AP-processor → aspiring SAP consultant, product+marketing at an
HRMS company, corporate professional (Reliance), SEO specialist, HR (IT company), wealth
manager (ex-engineer), project manager (Kotak), and a course mentor. Method: open-ended,
behavioral, past-tense (no "would you use this?" pitching).

### 2.2 Primary research — eight converging themes
- **T1 — "I don't know where to start / what to learn next."** *(Strongest, most repeated.)*
  Everyone recommends a different tool; the beginner can't tell which is theirs. *"I need to
  start. I don't need to explore hundreds of tools."* (architect)
- **T2 — Jargon is the immediate bounce.** The wealth manager closed a video after 15 minutes
  over unfamiliar jargon; the mentor said bootcamps were unfollowable for the same reason.
  Recurring refrain: *"explain it like I'm in 8th class."* The first 15 minutes decide
  retention.
- **T3 — Passive long-form loses people; byte-sized + interactive + daily is what they ask
  for.** Multiple interviewees independently wanted 10–15 min daily lessons over 1–2 hr
  videos; the Kotak PM explicitly wanted an inline quiz to confirm understanding.
- **T4 — Learning only sticks when attached to a real task with somewhere to apply it.** The
  SEO specialist learned Analytics but had no chance to apply it → lost it. Theory without
  application fails.
- **T5 — They want mentorship, but can't commit to live sessions.** The want is "someone
  answers *my* specific doubt, on demand" — not a fixed timetable. *[hypothesis: an
  always-available AI tutor resolves this better than live cohorts.]*
- **T6 — The market feels like clutter + hype + burned money → deep distrust.** One
  professional spent ~₹45k, feels burned, "won't spend more unless it's really trustworthy."
  Trust is the scarce resource.
- **T7 — Non-technical professionals use AI shallowly — prompt in, output out, nothing
  more.** Most usage is a faster Google search. **This shallow-usage gap is the actual
  opportunity.**
- **T8 — Motivation splits into "mandated" vs "self-motivated by career ROI."** Mandated /
  low-intent users (lawyer, Reliance professional, therapist) convert poorly for a voluntary
  product; career-ROI users (SAP switcher, wealth manager, HR, architect) have trigger,
  intent, and conditional willingness to pay.

### 2.3 Secondary research — how it corroborates
- **Shallow usage is a category-level fact, not just our sample.** 86% of workers admit they
  aren't using AI to full potential; ~55% use it weekly but 85% generate no business value
  from it; only ~10% are "AI-proficient"; prompt-engineering literacy moved only 22%→26% in a
  year. (Round 2, Apollo Technical / Section AI) — independent, strong validation of T7 and
  the wedge.
- **Applied learning beats passive content decisively** (Section 1.2 figures) — validates T4
  and the real-task-first-win design.
- **Existing training fails on genericness** (85% can't connect it to their job) — validates
  T4/T6 and the "learned before, never stuck" persona line.
- **AI skills gap is real and broad** — 59% of leaders report a gap; only 24% of ICs feel
  prepared. (Round 2, Skillsoft) — validates urgency and persona.

### 2.4 Quantitative gaps — secondary proxies + what the survey must still confirm
The 12-question validation survey (`validation-survey.md`) converts the qualitative signals
into countable evidence and doubles as the task-path picker. Where possible we've attached
**directional secondary proxies** (full working in `quantitative-proxies.md`) — these are
*other populations* (mostly enterprise/India surveys + OpenAI usage data), not our recruited
audience, so each gap keeps a `[confirm own survey]` marker:
- **Q4 — pain rank:** *proxy* — ~55% of people "don't know where to start" with AI (Newsweek);
  time/momentum ≈58–59% (Skillsoft). **`[survey n=6]`:** navigation is the top blocker, but the
  dominant flavor is *"couldn't tell which course/tool was actually worth it"* (3/6) slightly
  ahead of *"didn't know where to start"* (2/6) — i.e. the pain reads as trust/evaluation
  (P6-adjacent) as much as pure navigation. **Jargon (P2) drew zero picks** (it may not have
  been offered as an option, so this neither confirms nor kills it — it stays qualitative-only).
  `[confirm rank order + test jargon explicitly, survey pending — more responses]`
- **Q5/Q6 — task:** *strong proxy* — OpenAI/NBER (1M+ convos) puts **writing at ~40% of work
  usage**, mostly editing/refining existing text — directly backs the hardcoded "weak prompt →
  structured, usable output" task. **`[survey n=6]` — TENSION, watch this:** Q6 top pick was
  **"automate a repetitive task" (4/6)**; "analyze/summarize" and "research faster" got 1 each;
  **"write/draft work content" — the hardcoded task — drew 0.** Open-ended Q5 echoes automation
  ("reduce manual work," "automate repetitive tasks," "MIS file mapping"). This is Assumption A3
  firing: *this recruited sample* wants automation, not writing. Countervailing: n=6 is tiny and
  automation-leaning; "automate a repetitive task" is far harder to deliver as a clean <10-min
  pre-signup win than a writing task; and the task was chosen for universality + single NL
  surface. **Not a pivot on this evidence — logged as a live tension to re-check as responses
  land.** `[re-rank task on larger wave; watch automation-vs-writing gap, survey pending — more responses]`
- **Q7/Q8 — format:** *proxy* — long courses complete at ~5–15%; 5–15 min daily fits the
  working-adult constraint (microlearning research) → backs byte-sized daily. **`[survey n=6]`
  — confirmed:** "10–15 min daily bites" won **5/6** over a long weekend session; inline
  quiz/activity (Q8) drew **6/6 Yes-or-Maybe (4 Yes, 2 Maybe, 0 No)**. Both format bets hold.
- **Q9/Q10/Q11 — WTP:** *partial proxy* — subscription fatigue favors per-use-case shape; 76%
  of Indian professionals intend to invest in training in 2026 (Simplilearn) → WTP exists but
  is trust-gated. **The "trustworthy, not scammy" price point is un-proxyable** (India course
  fees ₹35k–₹1.5L are the *distrusted* ceiling our persona is burned by, not our price).
  **`[survey n=6]`:** payment shape leans **"free first, then decide" (4/6)** — validates the
  proof-first free win — with **monthly subscription (2/6)** the next choice and no clean vote
  for per-use (one text answer asked for usage-based lowest-token pricing). Named fair prices
  clustered **₹999 / ₹1000–1500 / ₹2000 / ₹2000** — i.e. **~₹1000–2000/mo, well above the
  ₹199–399 floated in the handoff and comfortably clear of the ₹150–500 COGS worry.** Caveat:
  only 2/6 had "felt burned," so this wave is less trust-scarred than the interview cohort — the
  price may soften on a more representative sample. Still trust-gated; fake-door confirms.
  `[trustworthy price still needs fake-door + larger survey wave]`
- **Q3 — segment conversion:** *size only* — 85% of Indian pros use AI but only 26% feel ready,
  76% willing to invest (Simplilearn) → persona pool is large and motivated. *Differential*
  conversion (career-ROI beats mandated) is **not** proxyable. **`[survey n=6]`:** too small and
  self-selected (survey-takers are already engaged) to read segment conversion. `[own survey Q3
  at scale / funnel only]`

---

## 3. Personas

### 3.1 Primary persona — "The AI-anxious in-role professional" *(TARGET)*
- **Who:** Non-technical professional in a tech-enabled role or company — marketing, HR, ops,
  finance — or a career-switcher as one high-intent sub-segment. 2–10 yrs experience.
- **Motivation:** Career ROI. "Everyone's using AI; I need to not fall behind, and it could
  cut my workload / help me get promoted / expand what I can offer."
- **Current behavior:** Has AI tools (ChatGPT / Copilot / Gemini, often enterprise). Uses them
  shallowly — prompting and summarizing, a faster Google. Doesn't know what happens "after
  the prompt" or what else is possible.
- **What they've tried and how it failed:** YouTube (clutter, can't judge quality; demos use
  paid tools they don't have), courses (started, lost momentum, dropped), self-teaching
  (learned but couldn't apply → forgot).
- **Jobs-to-be-done:** (1) "Tell me where to start without making me evaluate 100 tools." (2)
  "Get me a real, useful win on *my* actual work, fast." (3) "Explain it like I'm in 8th
  class." (4) "Answer my specific doubt when I hit it — I can't attend live sessions." (5)
  "Earn my trust before you ask me to pay."
- **Emotional state:** Anxious, behind, a little burned, but genuinely motivated.
- **Representative interviews:** wealth manager (#10), SAP switcher (#5), HRMS professional
  (#6), HR (#9), architect (#2).

### 3.2 Secondary / adjacent persona — "The career-switcher" *(sub-segment, high-intent)*
Non-tech background moving toward an AI-adjacent role (e.g. AP-processor → SAP consultant).
Highest emotional urgency, repeated start-drop-restart cycles. Real but a smaller slice; the
v2 pivot deliberately made this a sub-segment of the in-role persona rather than the center,
because the market signal is "add AI literacy to what you already do," not "become an AI
person from scratch" (Round 2, Nucamp / bootcamp sources). `[survey Q3 confirms conversion.]`

### 3.3 Anti-personas — explicitly de-prioritized *(validated by interviews)*
- **Low-job-relevance / structurally-discouraged professions** — lawyer (billing-by-hours
  disincentive), therapist (can't automate, no benefit). Won't learn voluntarily.
- **Technical / senior developers** — token-budget-capped, not learning-motivated the way this
  product needs (senior dev, #1).
- **Mandated / low-intent users** — Reliance professional (#7); convert poorly for a
  *voluntary* product.
- **Anyone whose real need is a different product** — the therapist's subscription-tracker.

Keeping these out is what keeps MVP scope tight.

---

## 4. Pain Points

Ranked by strength of signal across primary + secondary. **`[survey n=6]`: navigation (P1)
confirmed top blocker — but split as "can't tell which is worth it" (3/6, trust-adjacent) ≈
"where do I start" (2/6); jargon (P2) drew 0 picks but may not have been an option, so its rank
is unconfirmed either way.** `[survey pending — more responses to re-rank at scale.]`

| # | Pain | Evidence | Severity |
|---|------|----------|----------|
| P1 | **"Where do I start / what next?"** — no clarity on first step, next step, or payoff; tool-choice paralysis. | T1 (strongest, most repeated); named by architect, SAP switcher, HRMS pro. **Proxy: ~55% "don't know where to start" (Newsweek). `[survey n=6]`: top blocker — "can't tell which tool/course is worth it" 3/6, "where to start" 2/6.** | Hook |
| P2 | **Jargon wall in the first 15 min** — non-technical learners bounce before any value. | T2; wealth manager closed video at 15 min; mentor on bootcamps. | High / actionable |
| P3 | **Shallow usage** — prompt-in/output-out; unaware of what's possible after the prompt. | T7; corroborated by 86% "not full potential," ~10% proficient (secondary). | **The core opportunity** |
| P4 | **Learned it but couldn't apply it → forgot** — theory with no place to land. | T4; SEO specialist, HR; Xerox 13%→75% applied-learning gap (secondary). | High |
| P5 | **Momentum death** — start a course/video, drop off in week one or two. | T3; SAP switcher's start-drop-restart; MOOC ~5–15% completion (secondary). | High |
| P6 | **Can't judge what's worth it + burned money → distrust** — YouTube clutter, FOMO course traps, paid-tool demos. | T6; ~₹45k spent and burned; "won't spend unless trustworthy." | Conversion blocker |
| P7 | **Wants on-demand help, can't do live** — mentorship pull vs. no-time-for-timetable. | T5; architect wants a mentor, wealth manager has no time for live. | Design tension |

**The through-line:** P1 is the *hook* that gets attention; P3 (shallow usage) is the real
*product* opportunity; P2/P4/P5/P6 are the reasons every existing option fails to convert the
first into the second.

---

## 5. Insights

The non-obvious conclusions that shape the solution:

1. **The problem is completion + application, not content.** The category over-invests in
   content and under-invests in getting anyone past week two and into applied use. This is
   where the wedge lives.
2. **Reverse the onboarding.** Don't push content — *first ask "what do you want to do with
   AI?"* then prescribe a single minimal path to doing that one thing. Customize the
   *destination*, not the *effort* (resolves the "just tell me where to start" vs "make it
   personal to me" tension).
3. **The first win must be real, applied, and pre-signup.** A genuine ~10-minute win on the
   learner's own task — before any signup wall — is the trust mechanism that counters
   burned-buyer distrust (P6). Proof before payment.
4. **Jargon is a cheap, high-leverage constraint.** "Explain like I'm in 8th class" as a hard
   design rule directly addresses the make-or-break first-15-minutes window (P2).
5. **The shallow-usage gap is the sellable transformation.** "I can prompt" → "I can actually
   use and build with it" is both what users implicitly want and what the market data says is
   near-universally missing — a rare case of strong primary + secondary agreement.
6. **On-demand beats live for this persona.** The mentorship want is real but the live
   timetable is a non-starter; async, always-available, personalized help resolves the
   tension (P7) — but see Assumption A2 on scope risk.
7. **No direct incumbent** appears to combine individual-consumer + daily habit loop +
   task-anchored (not content-anchored) AI upskilling. Adjacent players (Multiverse; gamified
   LMSs like TalentLMS/Centrical/Coursebox) sell to enterprise L&D, not to an individual
   building a daily habit. Likely white space — or an unsolved-retention warning; the
   fake-door test tells us which.

---

## 6. Assumptions & Risks

Named honestly per the brief. None are blockers to the build; each has a fallback or a
validation path.

| # | Assumption / bet | Why we believe it | Risk if wrong | Mitigation / fallback |
|---|------------------|-------------------|---------------|-----------------------|
| A1 | **A daily-habit loop can substitute for live/cohort accountability.** | Duolingo mechanics; streaks +14% D14 retention; persona self-selects out of live. | **Biggest external risk.** Literature says cohort (~64%) reliably beats self-paced (~48%) on completion; our substitution isn't independently proven outside language apps. | Frame as a deliberate bet, not a settled fact. Instrument retention hard; the 40–50-user test measures exactly this. |
| A2 | **On-demand AI tutor resolves the mentorship-vs-no-time tension.** | T5; AI tutoring RCTs show strong effect *when* it has pacing + immediate feedback. | Pure-AI tutoring underperforms hybrid AI+human; and it's scope-creep that could sink a one-week MVP. | Treat as stretch / day-2, **not** day-1 core. Drills + checkpoints ship a coherent MVP without it. |
| A3 | **The hardcoded task ("weak prompt → structured, usable output") is the right universal first win.** | Shared across all target roles; single natural-language surface; clean <10-min win; attacks the shallow-usage gap directly. **Backed by OpenAI/NBER usage data: writing ≈40% of work AI use, mostly editing/refining text.** | Users might most want automation or a domain-specific task instead. | **`[survey n=6]` — this assumption is now under active tension.** Q6 top pick was **"automate a repetitive task" (4/6)**; **"write/draft content" drew 0.** Countervailing: n=6 & automation-leaning sample; automation is much harder to deliver as a clean <10-min pre-signup win; task chosen for universality. **Holding the writing task on current evidence, flagged as the top thing to re-check on a larger wave.** Task is hardcoded and swappable if the signal persists. `[survey pending — more responses]` |
| A4 | **AI-judged real-task checkpoints work well enough for an MVP.** | Enables applied grading at scale. | AI-judging may wobble on open-ended real tasks (the fuzzy half of the design). | Auto-graded drills alone still ship a coherent MVP — the checkpoint is the upgrade, not the floor. |
| A5 | **Persona evidence covers non-technical switchers specifically.** | 12-round is broad; secondary leans toward the in-role frame. | Switcher sub-segment evidence is still light (one full capture, AV, was finance→SAP). | 2–3 more targeted interviews + `[survey Q3]`; not re-centering on switchers on current evidence. |
| A6 | **Willingness to pay is real, conditional, and ~~per-use-case shaped~~ subscription-shaped after a free first win.** | T6/T8; **76% of Indian pros intend to invest in training in 2026 (Simplilearn)** → WTP exists. **`[survey n=6]` revises the shape:** payment leans **"free first, then decide" (4/6)** then **monthly subscription (2/6)**, with *no* clean per-use vote — this **resolves the docs' per-use-vs-subscription contradiction toward subscription-after-free-trial.** | Burned buyers may not convert without brand trust; India course fees ₹35k–₹1.5L are the *distrusted* ceiling, not our price. | Fake-door WTP test, proof-first free win. **`[survey n=6]` named prices cluster ₹1000–2000/mo (₹999/₹1000–1500/₹2000/₹2000) — above the ₹199–399 floated and clear of the ₹150–500 COGS.** Caveat: only 2/6 were "burned," so price may soften on a more scarred sample. `[trustworthy price still needs fake-door + larger wave]` |

---

## 7. Success Test for Discovery (are we ready to build?)

The Discovery-phase falsifiable check — can we complete this sentence with evidence behind
every blank?

> "[The in-role AI-anxious professional] can't [move from shallow prompting to doing a real
> work task with AI] because [they don't know where to start, bounce off jargon, and have
> nowhere to apply what they learn]; today they [use AI as a faster Google / drop courses in
> week one], which fails because [it never lands an applied win or a reason to return]."

**Every blank is filled with converging primary + secondary evidence.** → Ready to converge
and move into Diamond 2 (solution design → MVP → 40–50 users → funnel + event tracking). The
`[survey pending]` items sharpen the numbers but do not block the build.

---

## 8. What's next (bridge to Diamond 2)

- **Survey wave 1 (n=6) patched into Sections 2.4, 4, 6** (18 Aug). Keep patching as more
  responses land; the open items are: re-rank Q4 pain order + test jargon explicitly, resolve
  the **automation-vs-writing task tension (A3)**, and firm up the trustworthy price.
- 2–3 more targeted interviews on the non-technical-switcher sub-segment (A5).
- Product PRD: MVP scope (one persona · one first-win task · one loop, per the brief's
  anti-sprawl rule), the funnel (acquisition → activation → D1/D2 return → checkpoint →
  fake-door WTP), the event-tracking plan, and the growth loop (shareable progress card).

---

### Appendix — source map
- `edtech-case-study-handoff.md` — Section 0 locked decisions (source of truth) + kickoff
  secondary research (Round 1).
- `edtech-primary-research.md` — full 12-interview synthesis (themes T1–T8).
- `secondary-research-round2.md` — 11-section desk research stress-testing the hypothesis.
- `validation-survey.md` — 12-Q survey / task-path picker (`[survey pending]` source).
- `How professionals learn to use AI at work — 2-min survey (Responses).xlsx` — survey wave 1
  raw responses (n=6, 18 Aug); source for all `[survey n=6]` tags above.
- `interview-capture-template.xlsx` — Interview 1 (AV) real capture; template for the rest.

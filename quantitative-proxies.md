# Quantitative Proxies for the `[survey pending]` Gaps

**Date:** 18 Aug 2026 · **Purpose:** fill the PRD's `[survey pending]` quantitative gaps with
the best available *secondary* numbers, as **directional proxies** — not a substitute for the
team's own validation survey.

> **⚠️ READ THIS — what these numbers are and aren't.**
> The survey gaps (pain ranking, task preference, format, WTP, segment conversion) are, by
> definition, things that must be measured on **our own audience** to be decision-grade.
> The figures below come from *other populations* — mostly US/global enterprise surveys, a
> few India-specific, plus OpenAI's own usage data and self-selected Reddit/Quora/blog
> threads. They tell us whether our qualitative signals point the same way the broader world
> does (they do), and give defensible reference ranges. They do **not** tell us how *our 40–50
> recruited users* will rank pains or what price *they* will call trustworthy. So every
> `[survey pending]` marker stays in the PRD — now annotated "directional proxy: X; confirm
> with own survey" rather than deleted. Source quality is labeled per row: 🟢 primary/large-n,
> 🟡 aggregator/vendor survey, 🔴 self-selected forum/blog (weakest).

---

## Gap Q4 — Pain ranking: is "where do I start" actually #1?

| Proxy finding | Source | Quality |
|---|---|---|
| **55% of people say they don't know where to start with AI** — even though 49% feel direct pressure to adopt it. | Newsweek, citing employee survey | 🟡 |
| **Time is the single most common constraint** on developing AI skills — 58% of leaders, 59% of ICs. | Skillsoft 2026 | 🟡 |
| 66% of workers had to **teach themselves** AI on the job; 54% say employer training is inadequate; only 16% of ICs got training *before* a tool rollout. | Skillsoft / MIT Open Learning | 🟡 |
| Beginners "try ChatGPT once or twice, get mediocre results, and either give up or settle into low-value usage" — the momentum-death + shallow-usage pattern, in the wild. | Nate's Substack, andresc Substack | 🔴 |

**Read:** The **"don't know where to start" pain (P1) is corroborated as a top-tier barrier at
~55%** in an external survey — the single closest external number to our T1. Note secondary
data elevates **time/momentum (P5)** to co-#1 alongside it (58–59%), which our interviews also
heard (start-drop-restart). Jargon (P2) is *not* separately quantified at scale in what we
found — it remains a primary-only, qualitative signal.
**PRD annotation:** P1 ≈ 55% "where to start" · P5 ≈ 58–59% time/momentum · P2 = qualitative only.
`[confirm rank order with own survey Q4]`

---

## Gap Q5/Q6 — Task preference: is the hardcoded "prompt → usable output" task right?

The strongest proxy here is OpenAI's own large-n usage study (NBER WP-34255, Sept 2025,
1M+ conversations) — as close to ground-truth on "what people actually do with AI" as exists.

| Task category | Share of usage | Source | Quality |
|---|---|---|---|
| **Writing** (generate/edit/critique communication) | **28.3% overall; ~40% of *work* messages** | OpenAI/NBER 2025 | 🟢 |
| Seeking information | 21.3% | OpenAI/NBER 2025 | 🟢 |
| Practical guidance | (top-3; together with above = **78%** of all use) | OpenAI/NBER 2025 | 🟢 |
| At-work task mix: writing dominates; most requests **modify existing text** (edit/critique/translate) rather than create from scratch | — | OpenAI/NBER 2025 | 🟢 |
| Enterprise task ranking (older): code 66%, copywriting 58%, customer support 57% | Statista/Bloomberg 2023 | 🟡 |

**Read:** This is strong support for the hardcoded task. **Writing/drafting work content is the
single largest real-world AI task (~40% of work usage)** and runs on the exact
natural-language surface the first-win is built on. It confirms survey option Q6-a ("write/draft
work content") as the most likely #1 — and, crucially, shows most usage is *editing/refining*
text, i.e. exactly the "weak prompt → structured, reliable output" motion we're teaching.
The "build a tool" contender (Q6-d) is **not** supported as a mass first-task by usage data —
it's a minority, higher-friction activity (consistent with our decision to reject "build a
mini-app" as the universal first win).
**PRD annotation (A3):** hardcoded task backed by OpenAI usage data — writing ≈ 40% of work use,
the dominant surface. `[confirm the specific task with own survey Q5/Q6; watch for "build a tool" upside]`

---

## Gap Q7/Q8 — Format: byte-sized daily + inline quiz demand

| Proxy finding | Source | Quality |
|---|---|---|
| Long online courses complete at **~5–15%**; typical failure pattern = "buy on a motivated weekend, binge a few lessons, get busy Monday, never return." | Pixteller / microlearning roundups | 🟡🔴 |
| Long courses assume "large blocks of uninterrupted time + sustained motivation across weeks" — an assumption that "falls apart immediately" for working adults; **5–15 min daily sessions** fit the real constraint. | Pixteller, Adobe eLearning | 🟡 |
| Cohort/structured ~64% vs self-paced ~48% completion (from Round 2) — structure beats no-structure regardless of length. | Ruzuku (Round 2) | 🟡 |

**Read:** Consistent external support for **byte-sized daily** as the format most likely to be
completed (T3). No clean external number for the **inline-quiz (Q8)** preference specifically —
it stays a primary-only signal (Kotak PM asked for it directly). Note the same tension as
Round 2 §6: structure drives completion, and our loop is the structure substituting for a
cohort.
**PRD annotation:** byte-sized daily = externally supported; inline quiz = qualitative only.
`[confirm demand with own survey Q7/Q8]`

---

## Gap Q9/Q10/Q11 — Willingness to pay: shape + trustworthy price

**Shape (per-use-case vs subscription vs one-time):**
| Proxy finding | Source | Quality |
|---|---|---|
| Clear **subscription fatigue** — cumulative monthly costs stressful; users increasingly prefer **one-time / pay-for-what-you-want** over recurring fees. | Tom's Guide, Substack threads | 🔴 |
| Consumer online-course WTP (global): pro-upskilling $300–$2,000; one-time purchases often convert better than subscriptions for individual creators. | Round 2 (BuddyBoss/LearnWorlds) | 🟡 |

**Price point (India-specific, since interviews were ₹-denominated):**
| Proxy finding | Source | Quality |
|---|---|---|
| Indian AI course fees span **₹15k–₹1.5L**; working professionals "should budget" **₹60k–₹1.2L**; short bootcamps **₹35k–₹80k**; PG diplomas ₹1.5L–₹4L. | upGrad / CollegeVidya / ONROL 2026 | 🟡 |
| **76% of Indian professionals** say they're likely to invest in a professional certificate/training program in 2026; 56% of mid-career want significantly more training. | Simplilearn 2026 Sentiment Survey | 🟡 |

**Read — handle with care.** These are prices for *established, trust-bearing* course brands
with placement promises. Our interviews (T6) show our persona is **burned and distrustful** of
exactly these ₹35k–₹1.5L products — one spent ~₹45k and won't spend again "unless it's really
trustworthy." So the course-market range is a **ceiling/reference, not our price**. The
directionally useful proxies for us are (a) **subscription fatigue → validates per-use-case /
low-commitment shape** (Decision 10), and (b) **76% stated intent to pay for *some* training**
→ WTP exists, but is trust-gated. The "trustworthy, not scammy" price point (Q11) is genuinely
un-proxyable from secondary data — it's specific to our brand-less MVP and *must* come from our
own survey + fake-door test.
**PRD annotation (A6):** WTP exists (76% intent) & shape favors per-use-case (subscription
fatigue); price point un-proxyable. `[trustworthy price MUST come from own survey Q11 + fake-door]`

---

## Gap Q3 / Persona — does the self-motivated, tech-enabled segment convert best?

| Proxy finding | Source | Quality |
|---|---|---|
| **85% of Indian professionals regularly use AI at work, but only 26% feel prepared** to leverage it for career growth. | Simplilearn 2026 | 🟡 |
| **84% of Indian professionals feel unprepared** to find a new job in 2026. | LinkedIn 2026 | 🟡 |
| **90%+ of Indian employees** already use GenAI tools; ~34% expect to use them frequently soon. | Business Standard / India Skills Report 2026 | 🟡 |
| Global: only 24% of ICs feel employer-prepared; 4 in 5 employees *want* to learn AI for their profession. | Skillsoft (Round 2) | 🟡 |

**Read:** The proxies size the **top of the funnel** — a very large, self-aware,
under-prepared, motivated pool (85% use AI, 26% feel ready, 76% willing to invest). This
strongly supports the *existence and size* of the target persona and its career-ROI
motivation. What secondary data **cannot** do is prove *differential conversion* between our
segments — that the career-ROI/tech-enabled group converts better than mandated/low-intent
users. That's a claim only our own funnel (or survey Q3 cross-tab) can settle.
**PRD annotation:** persona size & motivation well-proxied (85%/26%/76%); *differential
conversion* still `[own survey Q3 / funnel only]`.

---

## Summary table — what got filled, what didn't

| Gap | Proxy strength | Best number | Still needs own data? |
|---|---|---|---|
| Q4 pain rank | Medium | "where to start" ≈55%; time/momentum ≈58% | Yes — rank order & jargon |
| Q5/Q6 task | **Strong (OpenAI 🟢)** | writing ≈40% of work use | Light — confirm + "build a tool" upside |
| Q7 format | Medium | daily 5–15 min fits; long courses 5–15% complete | Yes — inline quiz demand |
| Q9/Q10 WTP shape | Medium | subscription fatigue → per-use-case; 76% intent | Partly |
| Q11 price point | **None usable** | ₹35k–₹1.5L = distrusted ceiling, not our price | **Yes — critical, own data only** |
| Q3 conversion | Size only | 85% use / 26% ready / 76% invest | Yes — differential conversion |

**Bottom line:** secondary research **corroborates the direction of every qualitative signal**
and lets us attach defensible reference numbers to most gaps — strongest on the *task* (OpenAI
usage data) and *persona size*. It **cannot** settle the two most decision-critical unknowns:
the **trustworthy price point** and **differential segment conversion**. Those stay
survey/fake-door-only. Net: the PRD's evidence base is materially stronger, and the survey
scope can now narrow to the handful of things only our own audience can answer.

---

### Sources
- OpenAI / NBER WP-34255 "How People Use ChatGPT" (Sept 2025) — [openai.com](https://openai.com/index/how-people-are-using-chatgpt/) · [nber.org](https://www.nber.org/papers/w34255)
- Newsweek — "Most employees don't know how to adopt AI" (55% don't know where to start)
- Skillsoft 2026 AI skills-gap statistics · Simplilearn 2026 Professional Sentiment Survey · LinkedIn 2026 · Business Standard / India Skills Report 2026
- upGrad / CollegeVidya / ONROL 2026 (India AI course fees)
- Pixteller / Adobe eLearning (microlearning) · Tom's Guide (subscription fatigue)
- Reddit/Quora/Substack threads (🔴 self-selected, directional only): Nate's Substack, andresc Substack, levels.fyi, itch.io/Spotify community

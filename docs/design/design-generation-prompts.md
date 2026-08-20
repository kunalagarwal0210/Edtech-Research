# Design generation prompts — first-win flow

Two paste-ready prompts to generate the UI design for the EdTech MVP's day-0 first-win flow.
Use **Figma Make** and **Lovable**, compare results, keep whichever you like. Whatever you
generate is a **design source** — Claude ports the look into the existing Next.js app; we do
**not** replace the working frontend/backend.

**When you send results back, include:** (1) the generated code (copy component files or share
the project/export link), (2) a screenshot of each screen state, (3) the color palette + font
choices if the tool lists them.

**Aesthetic default (both prompts):** calm, credible, trustworthy — soft neutral palette, ONE
warm accent used sparingly, generous whitespace, subtle depth (soft shadows/hairline borders),
one clean modern sans. Grown-up and reassuring, **not** gamified or childish, **not** cold
enterprise. To try a different feel, change the one "Visual direction" line (e.g. "warm and
encouraging with rounded shapes and friendly color" or "bold editorial with big display type,
high contrast").

**Do not invent copy** — the wording below is locked from user research. Use it verbatim.

---

## PROMPT A — for Figma Make

```
Design a cohesive, high-fidelity, responsive UI for a guided web app that helps a
non-technical working professional get their first real, usable result from AI in about
10 minutes. Persona: a cautious, trust-scarred professional (marketing/HR/ops/finance) who
has been burned by AI hype and jargon — the design must feel calm, credible, and reassuring,
like they're in good hands. Not gamified, not childish, not cold enterprise.

Visual direction: calm and trustworthy — soft neutral background, ONE warm accent color used
sparingly, generous whitespace, subtle depth (soft shadows and hairline borders), one clean
modern sans-serif (e.g. Inter). Rounded corners, clear typographic hierarchy, WCAG AA contrast.
Design mobile-first (375px) and desktop.

Produce a design SYSTEM plus every screen state below as separate frames.

Design system to define and show:
- Color tokens: background, surface/card, border, text, muted text, accent, accent-foreground,
  and a soft positive/encouragement color.
- Type scale: display, heading, body, small/label. Pick one sans font.
- Spacing scale, corner radius, and 1–2 shadow levels.
Components: primary button (filled accent) + secondary/ghost button, button loading state
(spinner + disabled), a selectable option button (default + selected), pill-style example
"chip", card, multiline text input, a slim step progress bar, small uppercase eyebrow labels,
and a small muted "confidential info" notice banner.

Screens (this is a single flow; a progress bar sits at the top of steps 1–7):

0) Landing
   - Big headline: "Get your first real AI win in 10 minutes."
   - Subline: "Bring one real work task. We'll take you from a rough idea to a result you can
     actually use — no jargon, no signup first."
   - Primary button: "Start my first win"
   - Footer notice: "Please don't paste confidential or personal info — this runs on a free AI tier."

1) Task entry (progress 1 of 7)
   - Title: "What's one real thing you want AI to do for your work?"
   - Three example chips: "draft a JD/email", "summarize a long report", "analyze a sheet"
   - A large multiline text input, placeholder: "e.g. Draft a job description for a marketing manager"
   - Primary button: "Next →"
   - The confidential notice at the bottom.

2) Weak prompt (progress 2 of 7)
   - Title: "Write the prompt you'd normally type."
   - Multiline input, placeholder: "Type the prompt you'd normally type into an AI tool..."
   - Primary button: "Diagnose it →" (also show its loading state labelled "Diagnosing...")

3) Diagnosis (progress 3 of 7)
   - Title: "Here's why that would give you a so-so answer."
   - A card with a bulleted list of 3 short plain-language issues, e.g.:
       • "It leaves out key background details, like the fact that the call was about an important project deadline."
       • "It doesn't set rules for the email, such as keeping the tone polite and asking to reschedule."
       • "It doesn't tell the AI who you are acting as, like a helpful project manager."
     and one warm encouragement line below in the positive color:
       "You have a great starting point, and adding just a few more details will help the AI write the perfect email for you!"
   - Primary button: "Fix it for me →"

4) Rebuild — before/after (progress 4 of 7)
   - Title: "Now here's the same ask, done properly."
   - A "BEFORE" card (eyebrow label BEFORE) showing a weak prompt: "write an email to a client who missed a call"
   - An "AFTER" card (eyebrow label AFTER) showing a structured prompt with four labelled parts:
       Role: You are an experienced, professional account manager...
       Context: My client missed our scheduled project deadline check-in call today...
       Format: Draft a short email with a clear Subject line and Body, using bracketed placeholders...
       Constraints: Keep a warm, supportive, professional tone; under 150 words; two clear next steps.
   - Below: "The reusable pattern: The Role-Context-Format-Constraints framework gives the AI a
     clear identity, background, expected layout, and boundaries to generate a precise draft."
   - Primary button: "Run it →" (loading state "Rewriting...")

5) Run output (progress 5 of 7)
   - Title: "Let's run it and see the real result."
   - A card containing a finished, professional email (subject line + greeting + body + two
     numbered next steps + sign-off with [bracketed] placeholders).
   - Primary button: "Continue →" (loading state "Running...")

6) Inline check (progress 6 of 7)
   - Title: "Quick check — what made the second one better?"
   - Three selectable option buttons: "It added a role and context", "It gave a clear format", "All of it"
   - Primary button: "See the win →"

7) Win (progress 7 of 7, bar full)
   - Title: "You just did it. Look at the difference."
   - A "THIS" card (eyebrow THIS) with the weak prompt, and a "BECAME THIS" card (eyebrow
     BECAME THIS) with the structured prompt.
   - A line: "You just went from a rough idea to something you can actually use."
   - Primary CTA: "Save my progress" (style it as a Sign-in-with-Google button — this is where
     the user signs in to save).

Keep all copy exactly as written. Deliver the design system and all 8 frames, responsive.
```

---

## PROMPT B — for Lovable

```
Build a FRONT-END-ONLY, static prototype (no backend, no auth, no database, no real API calls —
use the hardcoded placeholder text I provide for all "AI" outputs). Stack: React + Tailwind CSS
+ shadcn/ui. This is a design/visual prototype I will port into a separate Next.js app, so keep
components small, composable, and Tailwind-based, and expose the palette + type as Tailwind theme
tokens / CSS variables.

Do NOT add Supabase, sign-in logic, routing to a backend, or any network request. The whole thing
is one page that steps through 8 states using local React state — a button advances to the next
state.

Product: a guided web app that walks a non-technical working professional from a weak AI prompt to
a real, usable result in ~10 minutes. Persona: a cautious, trust-scarred professional
(marketing/HR/ops/finance) burned by AI hype and jargon. The UI must feel calm, credible, and
reassuring — not gamified, not childish, not cold enterprise.

Visual direction: calm and trustworthy — soft neutral background, ONE warm accent color used
sparingly, generous whitespace, subtle depth (soft shadows, hairline borders), one clean modern
sans-serif (e.g. Inter), rounded corners, strong typographic hierarchy, WCAG AA contrast.
Mobile-first (375px) and desktop responsive.

Define a small design token set (Tailwind theme + CSS variables): colors (background, surface,
border, text, muted, accent, accent-foreground, positive), a type scale, spacing, radius, and 1–2
shadow levels. Components: primary + ghost Button (with a loading/disabled state), a selectable
option Button, a pill Chip, a Card, a Textarea, a slim step ProgressBar, small uppercase eyebrow
Labels, and a muted ConfidentialNotice banner.

Render these 8 states in order (progress bar on steps 1–7). Use this copy verbatim:

0) Landing — headline "Get your first real AI win in 10 minutes."; subline "Bring one real work
   task. We'll take you from a rough idea to a result you can actually use — no jargon, no signup
   first."; primary button "Start my first win"; footer notice "Please don't paste confidential or
   personal info — this runs on a free AI tier."

1) Task entry (1 of 7) — title "What's one real thing you want AI to do for your work?"; three
   example chips "draft a JD/email", "summarize a long report", "analyze a sheet"; a large Textarea
   placeholder "e.g. Draft a job description for a marketing manager"; primary button "Next →";
   the confidential notice at the bottom.

2) Weak prompt (2 of 7) — title "Write the prompt you'd normally type."; Textarea placeholder
   "Type the prompt you'd normally type into an AI tool..."; primary button "Diagnose it →" (show
   its loading state "Diagnosing...").

3) Diagnosis (3 of 7) — title "Here's why that would give you a so-so answer."; a Card with three
   bulleted plain-language issues:
     • "It leaves out key background details, like the fact that the call was about an important project deadline."
     • "It doesn't set rules for the email, such as keeping the tone polite and asking to reschedule."
     • "It doesn't tell the AI who you are acting as, like a helpful project manager."
   and one warm encouragement line in the positive color: "You have a great starting point, and
   adding just a few more details will help the AI write the perfect email for you!"; primary
   button "Fix it for me →".

4) Rebuild before/after (4 of 7) — title "Now here's the same ask, done properly."; a BEFORE card
   with "write an email to a client who missed a call"; an AFTER card with a structured prompt in
   four labelled parts (Role / Context / Format / Constraints) for a polite client follow-up email;
   a line "The reusable pattern: The Role-Context-Format-Constraints framework gives the AI a clear
   identity, background, expected layout, and boundaries to generate a precise draft."; primary
   button "Run it →" (loading "Rewriting...").

5) Run output (5 of 7) — title "Let's run it and see the real result."; a Card containing a
   finished professional email (subject + greeting + body + two numbered next steps + sign-off with
   [bracketed] placeholders); primary button "Continue →" (loading "Running...").

6) Inline check (6 of 7) — title "Quick check — what made the second one better?"; three selectable
   options "It added a role and context", "It gave a clear format", "All of it"; primary button
   "See the win →".

7) Win (7 of 7, bar full) — title "You just did it. Look at the difference."; a THIS card (weak
   prompt) and a BECAME THIS card (structured prompt); a line "You just went from a rough idea to
   something you can actually use."; primary CTA styled as a Sign-in-with-Google button labelled
   "Save my progress".

Keep all copy exactly as written. Front-end only.
```

---

## After you generate

1. Pick the direction you like best (across both tools).
2. Send Claude: the generated **code** (best), **screenshots** of each state, and the **palette + font**.
3. Claude rebuilds the app's `@theme` tokens + the `Button/Card/Textarea/StepShell` primitives +
   the day-0 screens to match, then verifies every screen in the browser.
4. Then we resume the plan at **Task 8** (returning loop) with the new design system in place.

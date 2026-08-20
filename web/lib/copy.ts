export const HERO = {
  headline: "Get your first real AI win in 10 minutes.",
  subline:
    "Bring one real work task. We'll take you from a rough idea to a result you can actually use — no jargon, no signup first.",
  cta: "Start my first win",
  confidentialNotice:
    "Please don't paste confidential or personal info — this runs on a free AI tier.",
  steps: [
    { key: "landing", title: "Get your first real AI win in 10 minutes." },
    { key: "task", title: "What's one real thing you want AI to do for your work?" },
    { key: "weak", title: "Write the prompt you'd normally type." },
    { key: "diagnosis", title: "Here's why that would give you a so-so answer." },
    { key: "rebuild", title: "Now here's the same ask, done properly." },
    { key: "run", title: "Let's run it and see the real result." },
    { key: "check", title: "Quick check — what made the second one better?" },
    { key: "win", title: "You just did it. Look at the difference." },
  ],
} as const;

/**
 * New visual microcopy introduced by the Plainly design (brand, coach rail,
 * trust pills). The research-locked strings above are the source of truth for
 * headlines/step titles; these are presentational additions only.
 */
export const UI = {
  eyebrow: "AI, made plain · no jargon",
  trustPills: ["No signup to start", "Free to try", "~10 minutes"],
  /** short coaching line shown in the guide rail, keyed by step */
  coach: {
    task: "Tell me one real task. Anything you'd normally hand off.",
    weak: "Just write it the way you normally would — I'll take a look.",
    diagnosis: "Good news — this is very fixable. Here's what's missing.",
    rebuild: "Same request — now with a clear role, context, format and limits.",
    run: "Here's the real output from your improved prompt.",
    check: "One quick check to lock it in — no wrong answers.",
    win: "You did it — here's the difference you just made.",
  },
  /** optional helper line under the step title */
  lede: {
    task: "Pick an example or describe your own task.",
    weak: "Don't overthink it — just write what you'd ask an AI tool.",
    check: "Choose the answer that feels most right to you.",
  },
} as const;

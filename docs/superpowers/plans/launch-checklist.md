# Plainly — Launch Checklist

The pre-flight list for putting the MVP in front of the first ~10 users, then
scaling to the 40–50 the case study needs. Code is complete on
`edtech-tasks-10-12` (Tasks 1–12); everything below is the human/deploy-time
work that turns the built app into a live, instrumented test.

Sections marked **[human]** need a person with dashboard access; **[deploy]**
happens at/after the Vercel import.

---

## 1. Code readiness (verify before deploy)

- [ ] `npm test` green (currently 36/36 including the event-coverage guard).
- [ ] `npm run build` exits 0.
- [ ] Event-coverage test passing — proves every `Ev` in the canonical map is
      actually wired somewhere in `app/` or `components/` (no silent funnel holes).
- [ ] Confidential-info notice (`ConfidentialNotice`) renders on every screen that
      takes user text: `/start` (weak prompt + rebuild), `/checkpoint`. Free-tier
      Gemini may train on prompts — this notice is required, not optional.
- [ ] A4 kill-switch wired: `NEXT_PUBLIC_CHECKPOINT_ENABLED=false` hides the
      dashboard CTA **and** redirects a direct `/checkpoint` URL to `/dashboard`
      (drills-only fallback ships coherently).

## 2. Copy lock (research-locked, do not edit at launch)

- [ ] Landing `HERO` copy in `web/lib/copy.ts` matches the interview verbatim —
      this is the research-locked source; the Figma port only *added* a separate
      `UI` block for new visual microcopy, it did not overwrite `HERO`.
- [ ] Recruiting message (Section 5) uses users' own words from the primary round.

## 3. Environment — Vercel **[deploy]**

Import the repo with **Root Directory = `web`** (research docs live at repo root).
Set every var below in the Vercel project (Production + Preview). None are
committed (`.env.local` is git-ignored).

- [ ] `GEMINI_API_KEY`
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `NEXT_PUBLIC_POSTHOG_KEY`
- [ ] `NEXT_PUBLIC_POSTHOG_HOST` — **must be the US host** (`https://us.i.posthog.com`);
      a region mismatch silently drops every event.
- [ ] `NEXT_PUBLIC_CHECKPOINT_ENABLED` — leave unset (defaults ON); flip to
      `false` only if checkpoint grading wobbles in the wild.
- [ ] Model in use is `gemini-3.5-flash-lite` (`web/lib/gemini/client.ts`) —
      the higher free-tier daily cap + ~2s latency that unblocked the test.
      `gemini-3.6-flash` (20/day) and the retired `gemini-2.0/2.5` ids must NOT
      come back.

## 4. Auth + data — Supabase **[human]**

- [ ] `web/supabase/schema.sql` applied to the project (`profiles` + `progress`).
- [ ] **Row Level Security ON** for both tables, with policies scoping rows to
      the authed user. Verify a user cannot read another user's `progress`.
- [ ] Google OAuth provider enabled (Google Cloud OAuth client + Supabase Auth),
      with the deployed Vercel domain added to the redirect/allowed URLs.
- [ ] `/auth/callback` code-exchange works against the **production** domain, not
      just localhost.

## 5. Analytics — PostHog **[human]**

- [ ] Project is receiving events from the **production** deploy (not just dev).
- [ ] Anonymous → identified stitch confirmed: pre-signup events attach to the
      same person after `signup_completed` fires `Identify`.
- [ ] Save the **funnel** insight:
      `landing_view → first_win_completed → signup_completed → checkpoint_graded → fakedoor_clicked`.
- [ ] Save the **retention** insight: keyed on `signup_completed`, return event
      `streak_day` (D1/D2). This is the habit proxy the case study reports on.
- [ ] Fake-door WTP: `fakedoor_clicked` count + `waitlist_email` person property
      captured on `/unlock`.

## 6. Full funnel walk-through (on the live URL) **[deploy]**

Complete the whole journey once, as one person, on the **deployed** URL, and
confirm this ordered funnel appears end-to-end in PostHog:

```
landing_view → task_started → weak_prompt_submitted → prompt_rebuilt →
output_generated → inline_check_answered → first_win_completed →
signup_completed → drill_started → drill_completed → streak_day →
checkpoint_started → checkpoint_graded → share_card_generated →
share_card_clicked → fakedoor_clicked
```

- [ ] **Two-login persistence check (carried-forward risk).** Sign in → complete
      a drill → sign out → sign back in (force a later date if needed). Confirm
      the completed drill persists and the streak advances. This is the exact gap
      that hid the Session-12 persist bug — do not skip it before recruiting.

## 7. Recruiting **[human]**

- [ ] The 28 captured leads list is ready with contact channel.
- [ ] Recruiting message drafted in users' own words (from the primary round),
      pointing at the live URL. First wave: ~10 users.
- [ ] "Don't paste confidential info" reminder is in the message as well as in-app.

## 8. Baseline thresholds (post-launch, first iteration)

The success-test "X%" bars were deliberately deferred — set them from real data,
not guesses.

- [ ] After the first ~10 users, read the funnel and record baselines for:
      activation (`first_win_completed` rate), D1/D2 return (`streak_day`),
      checkpoint reach, fake-door click rate.
- [ ] Set the falsifiable X% targets from that baseline.
- [ ] Log the **A3 signal**: are users bringing *writing* tasks or *automation*
      tasks? Resolves the bring-your-own default.
- [ ] Watch **A4**: if checkpoint grading is unreliable, flip
      `NEXT_PUBLIC_CHECKPOINT_ENABLED=false`.
- [ ] Iterate once on the biggest drop-off, then write the Final PRD with the
      funnel data + documented iterations.

## 9. Housekeeping

- [ ] Rotate any API keys/secrets that were pasted into chat, before and after the
      case study.

"use client";

// Task 11: the single ₹399/mo fake-door. Reached after the checkpoint is
// passed (see app/checkpoint/page.tsx). No real payment happens here — the
// "Unlock" click is the willingness-to-pay signal we care about, and the
// email capture is a waitlist stored as a PostHog person property (no
// Supabase table for a throwaway fake-door — see task-11 ruling).

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Logo } from "@/components/ui/Logo";
import { Lock, Tick } from "@/components/ui/icons";
import { track, setPersonProperties } from "@/lib/analytics/track";
import { Ev } from "@/lib/analytics/events";

export default function UnlockPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleUnlockClick() {
    track(Ev.FakedoorClicked);
    setUnlocked(true);
  }

  function handleEmailSubmit() {
    const trimmed = email.trim();
    if (!trimmed) return;
    setPersonProperties({ waitlist_email: trimmed });
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-[720px] items-center justify-between px-6 py-[18px]">
        <Logo size={20} />
      </header>
      <main className="mx-auto flex max-w-[560px] flex-col items-center gap-5 px-6 pb-14 pt-6 text-center">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Lock size={22} />
        </span>
        <h1 className="text-[30px] font-black leading-tight tracking-[-0.01em] text-text max-[860px]:text-[24px]">
          Unlock the full path
        </h1>
        <p className="text-[15px] font-semibold leading-snug text-muted">
          You&apos;ve got the basics down. The full path keeps you sharp with new
          drills every week and a coach that checks your work — so using AI at
          work stays a habit, not a one-off.
        </p>

        {!unlocked ? (
          <Card className="w-full">
            <div className="mb-1 text-[13px] font-extrabold uppercase tracking-[0.12em] text-muted">
              Plainly Full Path
            </div>
            <div className="mb-4 text-[38px] font-black tracking-[-0.01em] text-text">
              ₹399<span className="text-lg font-bold text-muted">/mo</span>
            </div>
            <Button block onClick={handleUnlockClick}>
              Unlock
            </Button>
          </Card>
        ) : (
          <Card className="w-full border-primary/40 bg-primary/[0.03]">
            <div className="mb-2 flex items-center justify-center gap-2 text-[13px] font-extrabold uppercase tracking-[0.12em] text-primary">
              Coming soon
            </div>
            {!submitted ? (
              <>
                <p className="mb-4 text-[15px] font-semibold leading-snug text-text">
                  Coming soon — drop your email and we&apos;ll let you in first.
                </p>
                <div className="flex flex-col gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@work.com"
                    className="w-full rounded-lg border-2 border-border bg-surface px-[18px] py-3 text-base leading-relaxed text-text outline-none transition-[border-color,box-shadow] placeholder:text-muted focus:border-primary focus:shadow-[0_0_0_3px_rgba(91,108,255,0.15)]"
                  />
                  <Button block onClick={handleEmailSubmit} disabled={!email.trim()}>
                    Notify me
                  </Button>
                </div>
              </>
            ) : (
              <p className="flex items-center justify-center gap-2 text-[15px] font-bold text-positive">
                <Tick size={16} /> You&apos;re on the list. We&apos;ll email you.
              </p>
            )}
          </Card>
        )}
      </main>
    </div>
  );
}

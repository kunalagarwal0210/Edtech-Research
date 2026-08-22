"use client";

// Task 11: the day-0 growth loop. Rendered once at the win moment (see
// app/start/page.tsx step === "win"). Fires ShareCardGenerated on render so
// we can measure how many first-wins actually produce a shareable moment,
// and ShareCardClicked when the user actually shares/copies it.

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { track } from "@/lib/analytics/track";
import { Ev } from "@/lib/analytics/events";

type WinCardProps = {
  task: string;
};

export function shareText(task: string, url: string): string {
  return `I just did "${task}" with AI in 10 minutes on Plainly. Try it yourself: ${url}`;
}

export function WinCard({ task }: WinCardProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    track(Ev.ShareCardGenerated, { task });
    // Fire once per mount — this card only renders at the win moment.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleShare() {
    track(Ev.ShareCardClicked);
    const url = typeof window !== "undefined" ? window.location.origin : "https://plainly.app";
    const text = shareText(task, url);

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ text, url });
        return;
      } catch {
        // user cancelled the native share sheet — fall through to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked (e.g. insecure context) — nothing more we can do
    }
  }

  return (
    <Card className="mb-5 border-primary/40 bg-primary/[0.03] text-center">
      <div className="mb-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-primary">
        Share your win
      </div>
      <p className="mb-4 text-[15px] font-bold leading-snug text-text">
        I just did &ldquo;{task}&rdquo; with AI in 10 minutes.
      </p>
      <Button variant="ghost" onClick={handleShare}>
        {copied ? "Copied! ✓" : "Share my win"}
      </Button>
    </Card>
  );
}

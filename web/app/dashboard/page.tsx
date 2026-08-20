"use client";

// Minimal placeholder — Task 8 replaces this with the real dashboard.
// Runs the post-auth persist/identify flow once the OAuth session lands here.

import { useEffect, useState } from "react";
import { getBrowserSupabase } from "@/lib/supabase/client";
import { readAnon, clearAnon } from "@/lib/state/localProgress";
import { identifyUser, track } from "@/lib/analytics/track";
import { Ev } from "@/lib/analytics/events";

export default function DashboardPage() {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function persist() {
      const supabase = getBrowserSupabase();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const anon = readAnon();
      await fetch("/api/persist-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(anon),
      });

      identifyUser(user.id, { email: user.email });
      track(Ev.SignupCompleted);
      clearAnon();

      if (!cancelled) setSaved(true);
    }

    persist();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="flex min-h-full flex-col items-center justify-center gap-2 p-8 text-center">
      <p className="text-sm text-muted">{saved ? "Progress saved." : "Saving your progress..."}</p>
    </main>
  );
}

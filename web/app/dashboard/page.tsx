"use client";

// Task 8: the returning loop hub. Preserves the load-bearing post-OAuth
// bootstrap (persist anon progress -> identify -> clear anon) verified live
// in Task 7, then renders the real dashboard from the user's `progress` row.

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getBrowserSupabase } from "@/lib/supabase/client";
import { readAnon, clearAnon } from "@/lib/state/localProgress";
import { identifyUser, track } from "@/lib/analytics/track";
import { Ev } from "@/lib/analytics/events";
import { Logo } from "@/components/ui/Logo";
import { GrowthMark } from "@/components/ui/GrowthMark";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressList } from "@/components/ProgressList";
import { StreakBadge } from "@/components/StreakBadge";
import { Tick } from "@/components/ui/icons";
import { DRILLS } from "@/lib/drills/data";
import { nextStreak } from "@/lib/state/streak";
import { checkpointEnabled } from "@/lib/meta";

type Progress = {
  drill1: boolean;
  drill2: boolean;
  drill3: boolean;
  streak: number;
  last_active: string | null;
  checkpoint_passed: boolean;
};

export default function DashboardPage() {
  const router = useRouter();
  const bootstrapped = useRef(false);
  const [saved, setSaved] = useState(false);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (bootstrapped.current) return;
    bootstrapped.current = true;
    let cancelled = false;

    async function persist() {
      const supabase = getBrowserSupabase();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.replace("/");
        return;
      }

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

      const { data: row, error: progressError } = await supabase
        .from("progress")
        .select("drill1, drill2, drill3, streak, last_active, checkpoint_passed")
        .eq("user_id", user.id)
        .single();

      if (progressError) {
        console.error("[dashboard] failed to load progress:", progressError);
      }

      let finalRow = row as Progress | null;

      if (finalRow) {
        const today = new Date().toISOString().slice(0, 10);
        const updated = nextStreak(
          { streak: finalRow.streak, lastActive: finalRow.last_active },
          today
        );
        if (updated.streak !== finalRow.streak || updated.lastActive !== finalRow.last_active) {
          finalRow = { ...finalRow, streak: updated.streak, last_active: updated.lastActive };
          await supabase
            .from("progress")
            .update({ streak: updated.streak, last_active: updated.lastActive })
            .eq("user_id", user.id);
          track(Ev.StreakDay, { streak: updated.streak });
        }
      }

      if (!cancelled) {
        setProgress(finalRow);
        setLoading(false);
      }
    }

    persist();

    return () => {
      cancelled = true;
    };
  }, [router]);

  const doneDrills = DRILLS.filter((d) => progress?.[d.id]);
  const tasksYouCanNowDo = doneDrills.map((d) => d.title);
  if (progress?.checkpoint_passed) {
    tasksYouCanNowDo.push("A real task, start to finish");
  }
  const allDrillsDone = DRILLS.every((d) => progress?.[d.id]);

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-[820px] items-center justify-between px-6 py-[18px]">
        <Logo size={20} />
      </header>

      <main className="mx-auto flex max-w-[820px] flex-col gap-6 px-6 pb-14 pt-2">
        <div className="flex items-center gap-4">
          <GrowthMark size={72} lit={doneDrills.length + 1} />
          <div>
            <h1 className="text-[26px] font-black leading-tight tracking-[-0.01em] text-text">
              Your dashboard
            </h1>
            <p className="text-[15px] font-semibold text-muted">
              {saved ? "Progress saved." : "Saving your progress..."}
            </p>
          </div>
          {progress && <StreakBadge streak={progress.streak} />}
        </div>

        <Card>
          <div className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.12em] text-primary">
            AI tasks you can now do
          </div>
          {loading ? (
            <p className="text-[15px] font-semibold text-muted">Loading...</p>
          ) : (
            <ProgressList items={tasksYouCanNowDo} />
          )}
        </Card>

        <div>
          <h2 className="mb-3 text-[13px] font-extrabold uppercase tracking-[0.1em] text-muted">
            Drills
          </h2>
          <div className="flex flex-col gap-3">
            {DRILLS.map((drill) => {
              const done = Boolean(progress?.[drill.id]);
              return (
                <Link key={drill.id} href={`/drill/${drill.id}`}>
                  <Card
                    className={`flex items-center justify-between gap-4 transition-shadow hover:shadow-float ${
                      done ? "border-positive/40" : ""
                    }`}
                  >
                    <div>
                      <div className="text-[15px] font-extrabold text-text">{drill.title}</div>
                      <div className="text-[13px] font-semibold text-muted">{drill.brief}</div>
                    </div>
                    {done ? (
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-positive/[0.13] text-positive">
                        <Tick size={16} />
                      </span>
                    ) : (
                      <span className="shrink-0 text-sm font-extrabold text-primary">Start →</span>
                    )}
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {allDrillsDone && checkpointEnabled() && !progress?.checkpoint_passed && (
          <Card className="border-primary/25 bg-primary/5">
            <div className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-primary">
              Coming up next
            </div>
            <p className="mb-4 text-[15px] font-bold text-text">
              You&apos;ve done all 3 drills. The checkpoint is next.
            </p>
            <Link href="/checkpoint">
              <Button block>Take the checkpoint →</Button>
            </Link>
          </Card>
        )}
      </main>
    </div>
  );
}

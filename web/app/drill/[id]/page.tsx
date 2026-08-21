"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Logo } from "@/components/ui/Logo";
import { Textarea } from "@/components/ui/Textarea";
import { ConfidentialNotice } from "@/components/ConfidentialNotice";
import { Tick } from "@/components/ui/icons";
import { getDrill } from "@/lib/drills/data";
import { getBrowserSupabase } from "@/lib/supabase/client";
import { track } from "@/lib/analytics/track";
import { Ev } from "@/lib/analytics/events";

type Grade = { passed: boolean; feedback: string };

export default function DrillPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const drill = getDrill(params.id);

  const [attempt, setAttempt] = useState(drill?.starter ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [grade, setGrade] = useState<Grade | null>(null);
  const [saving, setSaving] = useState(false);

  if (!drill) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-3 p-8 text-center">
        <p className="text-sm font-semibold text-muted">That drill doesn&apos;t exist.</p>
        <Button variant="ghost" onClick={() => router.push("/dashboard")}>
          Back to dashboard
        </Button>
      </main>
    );
  }

  async function handleSubmit() {
    const trimmed = attempt.trim();
    if (!trimmed || !drill) return;
    track(Ev.DrillStarted, { drill_id: drill.id });
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/grade-drill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ drillId: drill.id, attempt: trimmed }),
      });
      if (!res.ok) throw new Error("grading failed");
      const data = (await res.json()) as Grade;
      setGrade(data);
      if (data.passed) {
        setSaving(true);
        const supabase = getBrowserSupabase();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          await supabase
            .from("progress")
            .update({ [drill.id]: true, last_active: new Date().toISOString().slice(0, 10) })
            .eq("user_id", user.id);
          track(Ev.DrillCompleted, { drill_id: drill.id });
        }
        setSaving(false);
      }
    } catch {
      setError("Something went wrong grading your attempt. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-[720px] items-center justify-between px-6 py-[18px]">
        <Logo size={20} />
      </header>
      <main className="mx-auto flex max-w-[720px] flex-col gap-5 px-6 pb-14 pt-2">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-primary">
            Drill · {drill.lever}
          </span>
          <h1 className="mb-2 mt-2 text-[28px] font-black leading-tight tracking-[-0.01em] text-text">
            {drill.title}
          </h1>
          <p className="text-[15px] font-semibold leading-snug text-muted">{drill.brief}</p>
        </div>

        <Card>
          <div className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.12em] text-muted">
            Weak prompt
          </div>
          <div className="code-soft text-[15px] text-muted">{drill.starter}</div>
        </Card>

        <div className="flex flex-col gap-3">
          <Textarea
            rows={5}
            value={attempt}
            onChange={(e) => setAttempt(e.target.value)}
            placeholder="Rewrite the prompt above..."
          />
          <ConfidentialNotice />
          {error && <p className="text-sm font-semibold text-danger">{error}</p>}
          <Button
            block
            onClick={handleSubmit}
            disabled={!attempt.trim() || loading || saving}
            loading={loading || saving}
          >
            {loading ? "Grading..." : "Check my prompt →"}
          </Button>
        </div>

        {grade && (
          <Card className={grade.passed ? "border-positive/40" : "border-warm/50"}>
            <div
              className={`mb-3 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.12em] ${
                grade.passed ? "text-positive" : "text-warm"
              }`}
            >
              {grade.passed && <Tick size={14} />}
              {grade.passed ? "Passed" : "Not quite yet"}
            </div>
            <p className="text-[15px] font-semibold leading-relaxed text-text">{grade.feedback}</p>
            {grade.passed && (
              <Button block className="mt-4" onClick={() => router.push("/dashboard")}>
                Back to dashboard →
              </Button>
            )}
          </Card>
        )}
      </main>
    </div>
  );
}

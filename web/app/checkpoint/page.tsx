"use client";

// Task 10: the AI-judged checkpoint. A real work task, graded against a
// simple rubric by Gemini, gated behind having done all 3 drills (dashboard
// enforces that gate before linking here). Auth-gated the same way the
// dashboard is.

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getBrowserSupabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Logo } from "@/components/ui/Logo";
import { Textarea } from "@/components/ui/Textarea";
import { ConfidentialNotice } from "@/components/ConfidentialNotice";
import { Tick } from "@/components/ui/icons";
import { track } from "@/lib/analytics/track";
import { Ev } from "@/lib/analytics/events";
import { checkpointEnabled } from "@/lib/meta";
import type { Verdict } from "@/lib/grading/parseVerdict";

const RUBRIC_LABELS: Record<keyof Verdict["items"], string> = {
  role: "You told the AI who to act as",
  context: "You gave the AI the background it needed",
  format: "You said what shape the answer should take",
  constraints: "You gave clear limits or rules",
  usable_result: "The result was actually usable",
};

export default function CheckpointPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [finalPrompt, setFinalPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // A4 kill-switch: when the checkpoint is disabled (drills-only mode) the
    // dashboard hides its CTA, but a direct /checkpoint URL would still work —
    // enforce the gate on the route itself too.
    if (!checkpointEnabled()) {
      router.replace("/dashboard");
      return;
    }
    let cancelled = false;
    async function checkAuth() {
      const supabase = getBrowserSupabase();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.replace("/");
        return;
      }
      if (!cancelled) setCheckingAuth(false);
    }
    checkAuth();
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function handleSubmit() {
    const trimmedPrompt = finalPrompt.trim();
    const trimmedOutput = output.trim();
    if (!trimmedPrompt || !trimmedOutput) return;
    track(Ev.CheckpointStarted);
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/grade-checkpoint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ finalPrompt: trimmedPrompt, output: trimmedOutput }),
      });
      if (!res.ok) throw new Error("grading failed");
      const data = (await res.json()) as Verdict;
      setVerdict(data);
      track(Ev.CheckpointGraded, { passed: data.passed });
      if (data.passed) {
        setSaving(true);
        const supabase = getBrowserSupabase();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          await supabase
            .from("progress")
            .update({ checkpoint_passed: true })
            .eq("user_id", user.id);
        }
        setSaving(false);
        router.push("/unlock");
      }
    } catch {
      setError("Something went wrong grading your task. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (checkingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-sm font-semibold text-muted">Loading...</p>
      </main>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-[720px] items-center justify-between px-6 py-[18px]">
        <Logo size={20} />
      </header>
      <main className="mx-auto flex max-w-[720px] flex-col gap-5 px-6 pb-14 pt-2">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-primary">
            Checkpoint
          </span>
          <h1 className="mb-2 mt-2 text-[28px] font-black leading-tight tracking-[-0.01em] text-text">
            Do one real task with AI
          </h1>
          <p className="text-[15px] font-semibold leading-snug text-muted">
            Pick something real from your job — an email, a summary, a plan. Write the
            final prompt you used, paste the answer you got back, and we&apos;ll check
            it against the pattern you&apos;ve been practicing.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <div className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-muted">
              Your final prompt
            </div>
            <Textarea
              rows={5}
              value={finalPrompt}
              onChange={(e) => setFinalPrompt(e.target.value)}
              placeholder="The prompt you actually sent to the AI..."
            />
          </div>
          <div>
            <div className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-muted">
              The AI&apos;s output
            </div>
            <Textarea
              rows={6}
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              placeholder="Paste what the AI gave you back..."
            />
          </div>
          <ConfidentialNotice />
          {error && <p className="text-sm font-semibold text-danger">{error}</p>}
          <Button
            block
            onClick={handleSubmit}
            disabled={!finalPrompt.trim() || !output.trim() || loading || saving}
            loading={loading || saving}
          >
            {loading ? "Grading..." : "Check my task →"}
          </Button>
        </div>

        {verdict && (
          <Card className={verdict.passed ? "border-positive/40" : "border-warm/50"}>
            <div
              className={`mb-3 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.12em] ${
                verdict.passed ? "text-positive" : "text-warm"
              }`}
            >
              {verdict.passed && <Tick size={14} />}
              {verdict.passed ? "Passed" : "Not quite yet"}
            </div>
            <ul className="mb-3 flex flex-col gap-2">
              {(Object.keys(RUBRIC_LABELS) as (keyof Verdict["items"])[]).map((key) => (
                <li key={key} className="flex items-center gap-2 text-[14px] font-semibold text-text">
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                      verdict.items[key]
                        ? "bg-positive/[0.13] text-positive"
                        : "bg-border text-muted"
                    }`}
                  >
                    {verdict.items[key] && <Tick size={11} />}
                  </span>
                  {RUBRIC_LABELS[key]}
                </li>
              ))}
            </ul>
            <p className="text-[15px] font-semibold leading-relaxed text-text">
              {verdict.feedback}
            </p>
            {!verdict.passed && (
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

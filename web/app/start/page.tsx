"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StepShell } from "@/components/ui/StepShell";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Card } from "@/components/ui/Card";
import { Logo } from "@/components/ui/Logo";
import { GrowthMark } from "@/components/ui/GrowthMark";
import { Check, Tick, GoogleMark } from "@/components/ui/icons";
import { HERO, UI } from "@/lib/copy";
import { writeAnon } from "@/lib/state/localProgress";
import { track } from "@/lib/analytics/track";
import { Ev } from "@/lib/analytics/events";
import { getBrowserSupabase } from "@/lib/supabase/client";

type Step = "task" | "weak" | "diagnosis" | "rebuild" | "run" | "check" | "win";

const TOTAL_STEPS = HERO.steps.length - 1; // exclude "landing"

const TASK_EXAMPLES = ["draft a JD/email", "summarize a long report", "analyze a sheet"];

type Diagnosis = { issues: string[]; encouragement: string };
type Rebuild = { structuredPrompt: string; pattern: string };

const CHECK_OPTIONS = [
  { label: "It added a role and context", correct: false },
  { label: "It gave a clear format", correct: false },
  { label: "All of it", correct: true },
] as const;

const EYEBROW = "text-[11px] font-extrabold uppercase tracking-[0.12em]";

function stepIndex(step: Step): number {
  return { task: 1, weak: 2, diagnosis: 3, rebuild: 4, run: 5, check: 6, win: 7 }[step];
}

function titleFor(step: Step): string {
  return HERO.steps.find((s) => s.key === step)?.title ?? "";
}

export default function StartPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("task");
  const [taskText, setTaskText] = useState("");
  const [weakPrompt, setWeakPrompt] = useState("");
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
  const [structuredPrompt, setStructuredPrompt] = useState("");
  const [pattern, setPattern] = useState("");
  const [output, setOutput] = useState("");
  const [checkAnswer, setCheckAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startOver = () => router.push("/");

  function handleTaskSubmit() {
    const trimmed = taskText.trim();
    if (!trimmed) return;
    writeAnon({ taskText: trimmed });
    track(Ev.TaskStarted, { task_text_len: trimmed.length });
    setStep("weak");
  }

  async function handleWeakSubmit() {
    const trimmed = weakPrompt.trim();
    if (!trimmed) return;
    writeAnon({ weakPrompt: trimmed });
    track(Ev.WeakPromptSubmitted);
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskText, weakPrompt: trimmed }),
      });
      if (!res.ok) throw new Error("diagnosis failed");
      const data = (await res.json()) as Diagnosis;
      setDiagnosis(data);
      setStep("diagnosis");
    } catch {
      setError("Something went wrong getting your diagnosis. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleRebuild() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/rebuild", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskText, weakPrompt }),
      });
      if (!res.ok) throw new Error("rebuild failed");
      const data = (await res.json()) as Rebuild;
      setStructuredPrompt(data.structuredPrompt);
      setPattern(data.pattern);
      writeAnon({ structuredPrompt: data.structuredPrompt });
      track(Ev.PromptRebuilt);
      setStep("rebuild");
    } catch {
      setError("Something went wrong rebuilding your prompt. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleRun() {
    setStep("run");
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ structuredPrompt }),
      });
      if (!res.ok) throw new Error("run failed");
      const data = (await res.json()) as { output: string };
      setOutput(data.output);
      writeAnon({ output: data.output });
      track(Ev.OutputGenerated);
    } catch {
      setError("Something went wrong running your prompt. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleCheckAnswer(label: string, correct: boolean) {
    setCheckAnswer(label);
    track(Ev.InlineCheckAnswered, { correct });
  }

  function handleWin() {
    writeAnon({ firstWinAt: new Date().toISOString() });
    track(Ev.FirstWinCompleted, { task_type: "byo" });
    setStep("win");
  }

  async function handleSaveProgress() {
    await getBrowserSupabase().auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

  if (step === "task") {
    return (
      <StepShell
        stepIndex={stepIndex(step)}
        totalSteps={TOTAL_STEPS}
        title={titleFor(step)}
        coach={UI.coach.task}
        lede={UI.lede.task}
        onStartOver={startOver}
      >
        <div className="flex flex-wrap gap-2">
          {TASK_EXAMPLES.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => setTaskText(example)}
              className="rounded-full border-[1.5px] border-warm/55 bg-warm/[0.14] px-[15px] py-[7px] text-sm font-bold text-text transition-colors hover:bg-warm/30"
            >
              {example}
            </button>
          ))}
        </div>
        <Textarea
          rows={5}
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="e.g. Draft a job description for a marketing manager"
        />
        <Button block onClick={handleTaskSubmit} disabled={!taskText.trim()}>
          Next →
        </Button>
      </StepShell>
    );
  }

  if (step === "weak") {
    return (
      <StepShell
        stepIndex={stepIndex(step)}
        totalSteps={TOTAL_STEPS}
        title={titleFor(step)}
        coach={UI.coach.weak}
        lede={UI.lede.weak}
        onStartOver={startOver}
      >
        <Textarea
          rows={5}
          value={weakPrompt}
          onChange={(e) => setWeakPrompt(e.target.value)}
          placeholder="Type the prompt you'd normally type into an AI tool..."
        />
        {error && <p className="text-sm font-semibold text-danger">{error}</p>}
        <Button
          block
          onClick={handleWeakSubmit}
          disabled={!weakPrompt.trim() || loading}
          loading={loading}
        >
          {loading ? "Diagnosing..." : "Diagnose it →"}
        </Button>
      </StepShell>
    );
  }

  if (step === "diagnosis" && diagnosis) {
    return (
      <StepShell
        stepIndex={stepIndex(step)}
        totalSteps={TOTAL_STEPS}
        title={titleFor(step)}
        coach={UI.coach.diagnosis}
        onStartOver={startOver}
      >
        <Card>
          <ul className="flex flex-col gap-4">
            {diagnosis.issues.map((issue, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-danger/[0.13] text-sm font-extrabold text-danger">
                  {i + 1}
                </span>
                <span className="text-[15px] font-semibold leading-snug text-text">
                  {issue}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-[18px] border-t border-border pt-4 text-[15px] font-bold leading-snug text-positive">
            🌱 {diagnosis.encouragement}
          </div>
        </Card>
        {error && <p className="text-sm font-semibold text-danger">{error}</p>}
        <Button block onClick={handleRebuild} disabled={loading} loading={loading}>
          {loading ? "Rewriting..." : "Fix it for me →"}
        </Button>
      </StepShell>
    );
  }

  if (step === "rebuild") {
    return (
      <StepShell
        stepIndex={stepIndex(step)}
        totalSteps={TOTAL_STEPS}
        title={titleFor(step)}
        coach={UI.coach.rebuild}
        onStartOver={startOver}
      >
        <div className="grid grid-cols-2 gap-4 max-[860px]:grid-cols-1">
          <Card>
            <div className={`${EYEBROW} mb-3 text-danger`}>Before</div>
            <div className="code-soft text-[15px] text-muted">{weakPrompt}</div>
          </Card>
          <Card className="border-primary/40">
            <div className={`${EYEBROW} mb-3 text-primary`}>After</div>
            <div className="code-soft is-after text-[15px] text-text">
              {structuredPrompt}
            </div>
          </Card>
        </div>
        <Card className="border-primary/25 bg-primary/5">
          <p className="text-[15px] font-bold leading-snug text-text">
            <span className="text-primary">The reusable pattern: </span>
            {pattern}
          </p>
        </Card>
        <Button block onClick={handleRun}>
          Run it →
        </Button>
      </StepShell>
    );
  }

  if (step === "run") {
    return (
      <StepShell
        stepIndex={stepIndex(step)}
        totalSteps={TOTAL_STEPS}
        title={titleFor(step)}
        coach={UI.coach.run}
        onStartOver={startOver}
      >
        {loading && (
          <div className="flex items-center gap-3 text-sm font-semibold text-muted">
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"
            />
            Running your prompt — this can take up to 20 seconds...
          </div>
        )}
        {!loading && error && <p className="text-sm font-semibold text-danger">{error}</p>}
        {!loading && output && (
          <Card>
            <div className={`${EYEBROW} mb-4 flex items-center gap-2 text-positive`}>
              <span className="inline-block h-2 w-2 rounded-full bg-positive" /> AI Output
            </div>
            <p className="whitespace-pre-wrap text-[15px] font-semibold leading-relaxed text-text">
              {output}
            </p>
          </Card>
        )}
        {!loading && output && (
          <Button block onClick={() => setStep("check")}>
            Continue →
          </Button>
        )}
      </StepShell>
    );
  }

  if (step === "check") {
    return (
      <StepShell
        stepIndex={stepIndex(step)}
        totalSteps={TOTAL_STEPS}
        title={titleFor(step)}
        coach={UI.coach.check}
        lede={UI.lede.check}
        onStartOver={startOver}
      >
        <div className="flex flex-col gap-3">
          {CHECK_OPTIONS.map((opt) => {
            const selected = checkAnswer === opt.label;
            return (
              <button
                key={opt.label}
                type="button"
                onClick={() => handleCheckAnswer(opt.label, opt.correct)}
                className={`flex w-full items-center gap-3 rounded-lg border-2 px-[18px] py-[15px] text-left text-base font-bold transition-colors ${
                  selected
                    ? "border-primary bg-primary/[0.08] text-primary"
                    : "border-border bg-surface text-text hover:border-primary hover:bg-primary/[0.04]"
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                    selected ? "border-primary bg-primary text-white" : "border-border"
                  }`}
                >
                  {selected && <Check />}
                </span>
                {opt.label}
              </button>
            );
          })}
        </div>
        <Button block onClick={handleWin} disabled={!checkAnswer}>
          See the win →
        </Button>
      </StepShell>
    );
  }

  // step === "win" — dedicated full-width celebration (not the coach-rail shell)
  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-[1120px] items-center justify-between px-6 py-[18px]">
        <Logo size={22} />
      </header>
      <div className="mx-auto max-w-[1000px] px-6 pb-14 pt-2">
        <div className="win-panel relative overflow-hidden rounded-[28px] p-9 max-[860px]:p-6">
          <span className="pointer-events-none absolute left-[30px] top-[18px] text-[22px]">✨</span>
          <span className="pointer-events-none absolute right-[44px] top-10 text-base">🎉</span>
          <span className="pointer-events-none absolute bottom-[30px] left-[60px] text-lg">⭐</span>

          <div className="text-center">
            <div className="inline-block">
              <GrowthMark size={132} lit={4} celebrate />
            </div>
            <div className="mb-3 mt-[6px]">
              <span className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-positive/40 bg-surface px-4 py-2 text-sm font-extrabold text-positive shadow-[0_4px_14px_rgba(34,197,94,0.15)]">
                <Tick size={15} /> First win unlocked
              </span>
            </div>
            <h1 className="mb-2 text-[34px] font-black tracking-[-0.01em] text-text max-[860px]:text-[26px]">
              {titleFor("win")}
            </h1>
            <p className="mb-6 font-bold text-muted">
              From a rough idea to something you can actually use.
            </p>
          </div>

          <div className="mb-5 grid grid-cols-2 gap-4 max-[860px]:grid-cols-1">
            <Card>
              <div className={`${EYEBROW} mb-3 text-danger`}>This</div>
              <div className="code-soft text-sm text-muted">{weakPrompt}</div>
            </Card>
            <Card className="border-primary/40">
              <div className={`${EYEBROW} mb-3 text-primary`}>Became this</div>
              <div className="code-soft is-after text-sm text-text">{structuredPrompt}</div>
            </Card>
          </div>

          {output && (
            <Card className="mb-5">
              <div className={`${EYEBROW} mb-3 text-positive`}>Your result</div>
              <p className="whitespace-pre-wrap text-sm font-semibold leading-relaxed text-text">
                {output}
              </p>
            </Card>
          )}

          <p className="mb-6 text-center text-[17px] font-bold leading-snug">
            You just went from a rough idea to something you can actually use. That&apos;s your
            first real AI win. 🎉
          </p>

          <div className="mx-auto max-w-[420px]">
            <button
              type="button"
              onClick={handleSaveProgress}
              className="flex w-full items-center justify-center gap-3 rounded-md border-2 border-border bg-surface px-5 py-[14px] text-base font-extrabold text-text shadow-[0_2px_8px_rgba(20,22,40,0.05)] transition-shadow hover:shadow-[0_6px_18px_rgba(20,22,40,0.1)]"
            >
              <GoogleMark /> Save my progress with Google
            </button>
            <p className="mt-3 text-center text-[12.5px] font-semibold text-muted">
              Your progress is saved privately to your account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

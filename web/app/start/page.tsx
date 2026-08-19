"use client";

import { useState } from "react";
import { StepShell } from "@/components/ui/StepShell";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Card } from "@/components/ui/Card";
import { HERO } from "@/lib/copy";
import { writeAnon } from "@/lib/state/localProgress";
import { track } from "@/lib/analytics/track";
import { Ev } from "@/lib/analytics/events";

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

function stepIndex(step: Step): number {
  return { task: 1, weak: 2, diagnosis: 3, rebuild: 4, run: 5, check: 6, win: 7 }[step];
}

function titleFor(step: Step): string {
  return HERO.steps.find((s) => s.key === step)?.title ?? "";
}

export default function StartPage() {
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

  function handleSaveProgress() {
    // TODO(Task 7): wire Google OAuth signup here.
  }

  if (step === "task") {
    return (
      <StepShell stepIndex={stepIndex(step)} totalSteps={TOTAL_STEPS} title={titleFor(step)}>
        <div className="flex flex-wrap gap-2">
          {TASK_EXAMPLES.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => setTaskText(example)}
              className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-text hover:bg-border/40"
            >
              {example}
            </button>
          ))}
        </div>
        <Textarea
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="e.g. Draft a job description for a marketing manager"
        />
        <Button onClick={handleTaskSubmit} disabled={!taskText.trim()}>
          Next →
        </Button>
      </StepShell>
    );
  }

  if (step === "weak") {
    return (
      <StepShell stepIndex={stepIndex(step)} totalSteps={TOTAL_STEPS} title={titleFor(step)}>
        <Textarea
          value={weakPrompt}
          onChange={(e) => setWeakPrompt(e.target.value)}
          placeholder="Type the prompt you'd normally type into an AI tool..."
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button onClick={handleWeakSubmit} disabled={!weakPrompt.trim() || loading} loading={loading}>
          {loading ? "Diagnosing..." : "Diagnose it →"}
        </Button>
      </StepShell>
    );
  }

  if (step === "diagnosis" && diagnosis) {
    return (
      <StepShell stepIndex={stepIndex(step)} totalSteps={TOTAL_STEPS} title={titleFor(step)}>
        <Card>
          <ul className="list-disc space-y-2 pl-5 text-sm text-text">
            {diagnosis.issues.map((issue, i) => (
              <li key={i}>{issue}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">{diagnosis.encouragement}</p>
        </Card>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button onClick={handleRebuild} disabled={loading} loading={loading}>
          {loading ? "Rewriting..." : "Fix it for me →"}
        </Button>
      </StepShell>
    );
  }

  if (step === "rebuild") {
    return (
      <StepShell stepIndex={stepIndex(step)} totalSteps={TOTAL_STEPS} title={titleFor(step)}>
        <Card>
          <p className="text-xs font-medium uppercase tracking-wide text-muted">Before</p>
          <p className="mt-1 whitespace-pre-wrap text-sm text-text">{weakPrompt}</p>
        </Card>
        <Card>
          <p className="text-xs font-medium uppercase tracking-wide text-muted">After</p>
          <p className="mt-1 whitespace-pre-wrap text-sm text-text">{structuredPrompt}</p>
        </Card>
        <p className="text-sm text-muted">
          <span className="font-medium text-text">The reusable pattern: </span>
          {pattern}
        </p>
        <Button onClick={handleRun}>Run it →</Button>
      </StepShell>
    );
  }

  if (step === "run") {
    return (
      <StepShell stepIndex={stepIndex(step)} totalSteps={TOTAL_STEPS} title={titleFor(step)}>
        {loading && (
          <div className="flex items-center gap-3 text-sm text-muted">
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            />
            Running your prompt — this can take up to 20 seconds...
          </div>
        )}
        {!loading && error && <p className="text-sm text-red-500">{error}</p>}
        {!loading && output && (
          <Card>
            <p className="whitespace-pre-wrap text-sm text-text">{output}</p>
          </Card>
        )}
        {!loading && output && (
          <Button onClick={() => setStep("check")}>Continue →</Button>
        )}
      </StepShell>
    );
  }

  if (step === "check") {
    return (
      <StepShell stepIndex={stepIndex(step)} totalSteps={TOTAL_STEPS} title={titleFor(step)}>
        <div className="flex flex-col gap-2">
          {CHECK_OPTIONS.map((opt) => (
            <button
              key={opt.label}
              type="button"
              onClick={() => handleCheckAnswer(opt.label, opt.correct)}
              className={`rounded-md border px-4 py-3 text-left text-sm transition-colors ${
                checkAnswer === opt.label
                  ? "border-accent bg-accent/10 text-text"
                  : "border-border bg-surface text-text hover:bg-border/40"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <Button onClick={handleWin} disabled={!checkAnswer}>
          See the win →
        </Button>
      </StepShell>
    );
  }

  // step === "win"
  return (
    <StepShell stepIndex={stepIndex("win")} totalSteps={TOTAL_STEPS} title={titleFor("win")}>
      <Card>
        <p className="text-xs font-medium uppercase tracking-wide text-muted">This</p>
        <p className="mt-1 whitespace-pre-wrap text-sm text-text">{weakPrompt}</p>
      </Card>
      <Card>
        <p className="text-xs font-medium uppercase tracking-wide text-muted">Became this</p>
        <p className="mt-1 whitespace-pre-wrap text-sm text-text">{structuredPrompt}</p>
      </Card>
      <Card>
        <p className="text-xs font-medium uppercase tracking-wide text-muted">Your result</p>
        <p className="mt-1 whitespace-pre-wrap text-sm text-text">{output}</p>
      </Card>
      <p className="text-sm text-muted">You just went from a rough idea to something you can actually use.</p>
      {/* TODO(Task 7): this CTA attaches Google OAuth signup; placeholder for now. */}
      <Button onClick={handleSaveProgress}>Save my progress</Button>
    </StepShell>
  );
}

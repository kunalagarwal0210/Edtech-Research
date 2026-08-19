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

// Task 6 adds the remaining Day-0 steps ("rebuild", "run", "check", "win").
// This union is deliberately left open for that work.
type Step = "task" | "weak" | "diagnosis" | "rebuild";

const TOTAL_STEPS = HERO.steps.length - 1; // exclude "landing"

const TASK_EXAMPLES = ["draft a JD/email", "summarize a long report", "analyze a sheet"];

type Diagnosis = { issues: string[]; encouragement: string };

function stepIndex(step: Step): number {
  return { task: 1, weak: 2, diagnosis: 3, rebuild: 4 }[step];
}

function titleFor(step: Step): string {
  const key = step === "rebuild" ? "rebuild" : step;
  return HERO.steps.find((s) => s.key === key)?.title ?? "";
}

export default function StartPage() {
  const [step, setStep] = useState<Step>("task");
  const [taskText, setTaskText] = useState("");
  const [weakPrompt, setWeakPrompt] = useState("");
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
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
        <Button onClick={() => setStep("rebuild")}>Fix it for me →</Button>
      </StepShell>
    );
  }

  // "rebuild" placeholder — Task 6 replaces this with the real rebuild step.
  return (
    <StepShell stepIndex={stepIndex("rebuild")} totalSteps={TOTAL_STEPS} title={titleFor("rebuild")}>
      <p className="text-sm text-muted">Coming soon.</p>
    </StepShell>
  );
}

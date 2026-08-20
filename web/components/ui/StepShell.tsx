import type { ReactNode } from "react";
import { ConfidentialNotice } from "@/components/ConfidentialNotice";
import { Logo } from "@/components/ui/Logo";
import { GrowthMark } from "@/components/ui/GrowthMark";

type StepShellProps = {
  stepIndex: number;
  totalSteps: number;
  title: string;
  /** short coaching line shown in the guide rail */
  coach?: string;
  /** optional helper line under the title */
  lede?: string;
  /** when provided, renders a "Start over" link in the top bar */
  onStartOver?: () => void;
  children: ReactNode;
};

export function StepShell({
  stepIndex,
  totalSteps,
  title,
  coach,
  lede,
  onStartOver,
  children,
}: StepShellProps) {
  const progress = Math.min(100, Math.max(0, (stepIndex / totalSteps) * 100));
  const pct = Math.round(progress);
  const lit = Math.max(1, Math.min(4, Math.round((stepIndex / totalSteps) * 4)));

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-[1120px] items-center justify-between px-6 py-[18px]">
        <Logo size={22} />
        {onStartOver && (
          <button
            type="button"
            onClick={onStartOver}
            className="text-sm font-bold text-muted transition-colors hover:text-text"
          >
            ← Start over
          </button>
        )}
      </header>

      <div className="mx-auto grid max-w-[1120px] grid-cols-[300px_1fr] items-start gap-10 px-6 pb-14 pt-2 max-[860px]:grid-cols-1 max-[860px]:gap-[18px] max-[860px]:pb-10">
        {/* coach rail */}
        <aside className="sticky top-6 flex flex-col gap-5 max-[860px]:static max-[860px]:flex-row max-[860px]:items-center max-[860px]:gap-[14px]">
          <div className="coach-rail flex flex-col items-center gap-3 rounded-card border border-border p-[22px] text-center max-[860px]:flex-1 max-[860px]:flex-row max-[860px]:p-[14px] max-[860px]:text-left">
            <GrowthMark size={94} lit={lit} />
            {coach && (
              <div className="w-full rounded-md border border-border bg-surface px-[14px] py-3 shadow-[0_4px_14px_rgba(20,22,40,0.06)] max-[860px]:hidden">
                <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-primary">
                  Your guide
                </span>
                <p className="mt-[5px] text-sm font-bold leading-snug text-text">
                  {coach}
                </p>
              </div>
            )}
          </div>
          <div className="px-1 max-[860px]:hidden">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-muted">
                Step {stepIndex} of {totalSteps}
              </span>
              <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-primary">
                {pct}%
              </span>
            </div>
            <div
              className="h-2 overflow-hidden rounded-full bg-border"
              role="progressbar"
              aria-valuenow={stepIndex}
              aria-valuemin={0}
              aria-valuemax={totalSteps}
            >
              <div className="p-fill h-full rounded-full" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </aside>

        {/* content */}
        <section className="min-w-0">
          <h1 className="mb-2 text-[32px] font-black leading-[1.12] tracking-[-0.01em] text-text max-[860px]:text-[26px]">
            {title}
          </h1>
          {lede && <p className="mb-5 text-base font-semibold text-muted">{lede}</p>}
          <div className="flex flex-col gap-4">{children}</div>
          <div className="mt-5">
            <ConfidentialNotice />
          </div>
        </section>
      </div>
    </div>
  );
}

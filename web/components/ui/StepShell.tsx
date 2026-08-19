import type { ReactNode } from "react";
import { ConfidentialNotice } from "@/components/ConfidentialNotice";

type StepShellProps = {
  stepIndex: number;
  totalSteps: number;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function StepShell({
  stepIndex,
  totalSteps,
  title,
  children,
  footer,
}: StepShellProps) {
  const progress = Math.min(100, Math.max(0, (stepIndex / totalSteps) * 100));

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-6 px-4 py-10">
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-border"
        role="progressbar"
        aria-valuenow={stepIndex}
        aria-valuemin={0}
        aria-valuemax={totalSteps}
      >
        <div
          className="h-full rounded-full bg-accent transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <h1 className="text-2xl font-semibold leading-tight text-text">
        {title}
      </h1>

      <div className="flex flex-col gap-4">{children}</div>

      {footer && <div className="flex flex-col gap-3">{footer}</div>}

      <ConfidentialNotice />
    </div>
  );
}

import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
};

export function Card({ children }: CardProps) {
  return (
    <div className="rounded-md border border-border bg-surface p-6 shadow-sm">
      {children}
    </div>
  );
}

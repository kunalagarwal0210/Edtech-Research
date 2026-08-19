import type { TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className = "", ...rest }: TextareaProps) {
  return (
    <textarea
      className={`w-full min-h-32 rounded-md border border-border bg-surface p-3 text-sm text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent ${className}`}
      {...rest}
    />
  );
}

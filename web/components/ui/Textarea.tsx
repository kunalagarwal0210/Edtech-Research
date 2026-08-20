import type { TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

/* Soft note-card input — rounded, 2px border, indigo focus ring. */
export function Textarea({ className = "", ...rest }: TextareaProps) {
  return (
    <textarea
      className={`w-full min-h-32 resize-none rounded-lg border-2 border-border bg-surface px-[18px] py-4 text-base leading-relaxed text-text outline-none transition-[border-color,box-shadow] placeholder:text-muted focus:border-primary focus:shadow-[0_0_0_3px_rgba(91,108,255,0.15)] ${className}`}
      {...rest}
    />
  );
}

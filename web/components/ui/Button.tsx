import type { ButtonHTMLAttributes } from "react";

type ButtonProps = {
  variant?: "primary" | "ghost";
  loading?: boolean;
  block?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/* Duolingo-style pressable button: a 4px darker bottom edge that presses down
   on :active. Primary is the indigo fill; ghost is a bordered outline. */
const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-extrabold select-none " +
  "transition-[transform,border-bottom-width,background,border-color] duration-75 " +
  "disabled:cursor-not-allowed disabled:opacity-55";

const variants = {
  primary:
    "bg-primary text-white text-base px-[30px] py-[14px] border-b-4 border-edge " +
    "active:translate-y-[3px] active:border-b active:[border-bottom-width:1px]",
  ghost:
    "bg-transparent text-primary text-base px-6 py-3 border-2 border-border " +
    "hover:border-primary hover:bg-primary/5",
};

export function Button({
  variant = "primary",
  loading = false,
  block = false,
  disabled,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} ${block ? "w-full" : ""} ${className}`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      {children}
    </button>
  );
}

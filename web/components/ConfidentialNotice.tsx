import { HERO } from "@/lib/copy";

/**
 * Small, always-visible, muted banner reminding users not to paste
 * confidential or personal info. Pure presentational — no state, no props.
 */
export function ConfidentialNotice() {
  return (
    <p className="text-xs text-[var(--color-muted)] text-center">
      {HERO.confidentialNotice}
    </p>
  );
}

import { HERO } from "@/lib/copy";
import { Lock } from "@/components/ui/icons";

/**
 * Warm note-card reminding users not to paste confidential or personal info.
 * Pure presentational — no state, no props.
 */
export function ConfidentialNotice() {
  return (
    <div className="flex items-start gap-2 rounded-md border-[1.5px] border-warm/55 bg-warm/10 px-4 py-3 text-[13.5px] font-semibold text-muted">
      <span className="mt-px shrink-0 text-warm">
        <Lock />
      </span>
      <span>{HERO.confidentialNotice}</span>
    </div>
  );
}

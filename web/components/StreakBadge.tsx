/* StreakBadge — compact pill showing the user's current daily streak.
   Grown-up, no mascot: a number + a plain label, warm accent for the count. */

type StreakBadgeProps = {
  streak: number;
};

export function StreakBadge({ streak }: StreakBadgeProps) {
  const shown = Math.max(1, streak);
  return (
    <div className="ml-auto flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 shadow-card">
      <span className="text-[18px] font-black leading-none text-warm">{shown}</span>
      <span className="text-[12px] font-bold leading-none text-muted">
        day{shown === 1 ? "" : "s"} streak
      </span>
    </div>
  );
}

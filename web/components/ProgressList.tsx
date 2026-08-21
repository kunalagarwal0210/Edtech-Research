import { Tick } from "@/components/ui/icons";

type ProgressListProps = {
  /** plain-language names of AI tasks the user can now do, in completion order */
  items: string[];
};

/**
 * "AI tasks you can now do" — the product's progress metaphor. Never a
 * percent-to-role bar; just a growing list of concrete things unlocked.
 */
export function ProgressList({ items }: ProgressListProps) {
  if (items.length === 0) {
    return (
      <p className="text-[15px] font-semibold text-muted">
        Complete a drill below to start your list.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-3">
          <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-positive/[0.13] text-positive">
            <Tick size={14} />
          </span>
          <span className="text-[15px] font-bold leading-snug text-text">{item}</span>
        </li>
      ))}
    </ul>
  );
}

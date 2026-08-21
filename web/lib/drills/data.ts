export type Drill = {
  id: "drill1" | "drill2" | "drill3";
  lever: string;
  title: string;
  brief: string;
  starter: string;
};

// Solution PRD §2.2 — each drill isolates exactly one prompting lever.
export const DRILLS: Drill[] = [
  {
    id: "drill1",
    lever: "adding context",
    title: "Add context",
    brief: "Rewrite this prompt so the AI knows the background it needs to give a useful answer.",
    starter: "Write a message telling my team about the new deadline.",
  },
  {
    id: "drill2",
    lever: "specifying format",
    title: "Specify the format",
    brief: "Rewrite this prompt so the AI knows exactly what shape the answer should take.",
    starter: "Give me some ideas for our team meeting agenda.",
  },
  {
    id: "drill3",
    lever: "chaining steps",
    title: "Chain the steps",
    brief: "Rewrite this prompt so the AI does the task in clear, separate steps instead of all at once.",
    starter: "Read this customer feedback and tell me what to do about it.",
  },
];

export function getDrill(id: string): Drill | undefined {
  return DRILLS.find((d) => d.id === id);
}

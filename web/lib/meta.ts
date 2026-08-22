export function appName(): string {
  return "Plainly";
}

// A4 kill-switch: if AI-judged checkpoint grading proves unreliable during
// soft launch, set NEXT_PUBLIC_CHECKPOINT_ENABLED=false in Vercel to ship
// drills-only. Defaults ON when unset.
export function checkpointEnabled(): boolean {
  return process.env.NEXT_PUBLIC_CHECKPOINT_ENABLED !== "false";
}

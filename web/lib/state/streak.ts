type StreakState = { streak: number; lastActive: string | null };

function daysBetween(a: string, b: string): number {
  const ms = new Date(b + "T00:00:00Z").getTime() - new Date(a + "T00:00:00Z").getTime();
  return Math.round(ms / 86_400_000);
}

export function nextStreak(prev: StreakState, today: string): { streak: number; lastActive: string } {
  if (prev.lastActive === null) return { streak: 1, lastActive: today };
  const gap = daysBetween(prev.lastActive, today);
  if (gap === 0) return { streak: prev.streak, lastActive: prev.lastActive };
  if (gap === 1) return { streak: prev.streak + 1, lastActive: today };
  return { streak: 1, lastActive: today };
}

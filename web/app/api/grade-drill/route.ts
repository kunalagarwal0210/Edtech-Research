import { NextResponse } from "next/server";
import { generateJson } from "@/lib/gemini/client";
import { GRADE_DRILL_SYSTEM } from "@/lib/gemini/prompts";
import { getDrill } from "@/lib/drills/data";

type Body = { drillId?: string; attempt?: string };
type Grade = { passed: boolean; feedback: string };

export async function POST(request: Request) {
  const { drillId, attempt } = (await request.json()) as Body;
  if (!drillId || !attempt) {
    return NextResponse.json({ error: "drillId and attempt are required" }, { status: 400 });
  }
  const drill = getDrill(drillId);
  if (!drill) {
    return NextResponse.json({ error: "unknown drillId" }, { status: 400 });
  }
  try {
    const result = await generateJson<Grade>({
      system: GRADE_DRILL_SYSTEM,
      user: `Lever this drill teaches: ${drill.lever}\nUser's attempt: ${attempt}`,
    });
    return NextResponse.json(result);
  } catch (e) {
    console.error("[grade-drill] failed:", e);
    return NextResponse.json({ error: "grading failed" }, { status: 502 });
  }
}

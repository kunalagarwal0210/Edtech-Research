import { NextResponse } from "next/server";
import { generateJson } from "@/lib/gemini/client";
import { GRADE_CHECKPOINT_SYSTEM } from "@/lib/gemini/prompts";
import { parseVerdict } from "@/lib/grading/parseVerdict";

type Body = { finalPrompt?: string; output?: string };

export async function POST(request: Request) {
  const { finalPrompt, output } = (await request.json()) as Body;
  if (!finalPrompt || !output) {
    return NextResponse.json({ error: "finalPrompt and output are required" }, { status: 400 });
  }
  try {
    const result = await generateJson<unknown>({
      system: GRADE_CHECKPOINT_SYSTEM,
      user: `User's final prompt: ${finalPrompt}\nAI output they got: ${output}`,
    });
    return NextResponse.json(parseVerdict(result));
  } catch (e) {
    console.error("[grade-checkpoint] failed:", e);
    return NextResponse.json({ error: "grading failed" }, { status: 502 });
  }
}

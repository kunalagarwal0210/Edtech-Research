import { NextResponse } from "next/server";
import { generateJson } from "@/lib/gemini/client";
import { DIAGNOSE_SYSTEM } from "@/lib/gemini/prompts";

type Body = { taskText?: string; weakPrompt?: string };
type Diagnosis = { issues: string[]; encouragement: string };

export async function POST(request: Request) {
  const { taskText, weakPrompt } = (await request.json()) as Body;
  if (!weakPrompt || !taskText) {
    return NextResponse.json({ error: "taskText and weakPrompt are required" }, { status: 400 });
  }
  try {
    const result = await generateJson<Diagnosis>({
      system: DIAGNOSE_SYSTEM,
      user: `Task the user wants to do: ${taskText}\nTheir prompt: ${weakPrompt}`,
    });
    return NextResponse.json(result);
  } catch (e) {
    console.error("[diagnose] failed:", e);
    return NextResponse.json({ error: "diagnosis failed" }, { status: 502 });
  }
}

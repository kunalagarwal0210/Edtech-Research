import { NextResponse } from "next/server";
import { generateJson } from "@/lib/gemini/client";
import { REBUILD_SYSTEM } from "@/lib/gemini/prompts";

type Body = { taskText?: string; weakPrompt?: string };
type Rebuild = { structuredPrompt: string; pattern: string };

export async function POST(request: Request) {
  const { taskText, weakPrompt } = (await request.json()) as Body;
  if (!weakPrompt || !taskText) {
    return NextResponse.json({ error: "taskText and weakPrompt are required" }, { status: 400 });
  }
  try {
    const result = await generateJson<Rebuild>({
      system: REBUILD_SYSTEM,
      user: `Task the user wants to do: ${taskText}\nTheir weak prompt: ${weakPrompt}`,
    });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "rebuild failed" }, { status: 502 });
  }
}

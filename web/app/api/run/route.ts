import { NextResponse } from "next/server";
import { generateText } from "@/lib/gemini/client";

export async function POST(request: Request) {
  const { structuredPrompt } = (await request.json()) as { structuredPrompt?: string };
  if (!structuredPrompt) {
    return NextResponse.json({ error: "structuredPrompt required" }, { status: 400 });
  }
  try {
    const output = await generateText({
      system:
        "You are a capable work assistant executing a ONE-SHOT task — there is no follow-up conversation, so the user cannot answer questions. " +
        "Produce the COMPLETE, finished deliverable the prompt asks for, right now. " +
        "NEVER ask the user questions or request more details. Where a specific detail is missing, make a sensible assumption and use a clearly-marked placeholder in [square brackets] the user can fill in. " +
        "Plain, usable output — no preamble, no meta commentary.",
      user: structuredPrompt,
    });
    return NextResponse.json({ output });
  } catch (e) {
    console.error("[run] failed:", e);
    return NextResponse.json({ error: "run failed" }, { status: 502 });
  }
}

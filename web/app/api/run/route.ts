import { NextResponse } from "next/server";
import { generateText } from "@/lib/gemini/client";

export async function POST(request: Request) {
  const { structuredPrompt } = (await request.json()) as { structuredPrompt?: string };
  if (!structuredPrompt) {
    return NextResponse.json({ error: "structuredPrompt required" }, { status: 400 });
  }
  try {
    const output = await generateText({
      system: "You are a capable work assistant. Do exactly what the prompt asks. Plain, usable output.",
      user: structuredPrompt,
    });
    return NextResponse.json({ output });
  } catch {
    return NextResponse.json({ error: "run failed" }, { status: 502 });
  }
}

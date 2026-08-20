import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase/server";

type Body = { taskText?: string; firstWinAt?: string };

export async function POST(request: Request) {
  const supabase = await getServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "not authenticated" }, { status: 401 });
  }

  const _body = (await request.json().catch(() => ({}))) as Body;

  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    email: user.email,
    tasks_completed: 1,
  });

  if (error) {
    return NextResponse.json({ error: "failed to persist progress" }, { status: 500 });
  }

  await supabase.from("progress").upsert({
    user_id: user.id,
    drill1: false,
    drill2: false,
    drill3: false,
    streak: 0,
    last_active: new Date().toISOString().slice(0, 10),
    checkpoint_passed: false,
  });

  return NextResponse.json({ ok: true });
}

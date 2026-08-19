"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ConfidentialNotice } from "@/components/ConfidentialNotice";
import { HERO } from "@/lib/copy";
import { track } from "@/lib/analytics/track";
import { Ev } from "@/lib/analytics/events";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    track(Ev.LandingView);
  }, []);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
      <main className="flex w-full max-w-xl flex-col items-center gap-6 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
          {HERO.headline}
        </h1>
        <p className="text-base text-muted sm:text-lg">{HERO.subline}</p>
        <Button onClick={() => router.push("/start")}>{HERO.cta}</Button>
      </main>
      <footer className="mt-12 w-full max-w-xl">
        <ConfidentialNotice />
      </footer>
    </div>
  );
}

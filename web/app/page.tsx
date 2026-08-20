"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { GrowthMark } from "@/components/ui/GrowthMark";
import { ConfidentialNotice } from "@/components/ConfidentialNotice";
import { Tick } from "@/components/ui/icons";
import { HERO, UI } from "@/lib/copy";
import { track } from "@/lib/analytics/track";
import { Ev } from "@/lib/analytics/events";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    track(Ev.LandingView);
  }, []);

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-[1120px] items-center justify-between px-6 py-[18px]">
        <Logo size={22} />
      </header>

      <main className="mx-auto grid max-w-[1120px] grid-cols-[1.05fr_0.95fr] items-center gap-12 px-6 pb-14 pt-2 max-[860px]:grid-cols-1 max-[860px]:gap-5 max-[860px]:pb-10 max-[860px]:text-center">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-primary">
            {UI.eyebrow}
          </span>
          <h1 className="mb-[18px] mt-[14px] text-[52px] font-black leading-[1.05] tracking-[-0.02em] max-[860px]:text-[34px]">
            {HERO.headline}
          </h1>
          <p className="mb-7 max-w-[30ch] text-[19px] font-semibold leading-[1.55] text-muted max-[860px]:mx-auto">
            {HERO.subline}
          </p>
          <div className="mb-[22px] flex flex-wrap gap-3 max-[860px]:justify-center">
            <Button onClick={() => router.push("/start")}>{HERO.cta} →</Button>
          </div>
          <div className="flex flex-wrap gap-2 max-[860px]:justify-center">
            {UI.trustPills.map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-[7px] rounded-full border-[1.5px] border-border bg-surface px-[14px] py-2 text-[13px] font-bold text-muted"
              >
                <span className="text-positive">
                  <Tick size={14} />
                </span>
                {label}
              </span>
            ))}
          </div>
          <div className="mt-4 max-w-md max-[860px]:mx-auto">
            <ConfidentialNotice />
          </div>
        </div>

        <div className="relative flex min-h-[360px] items-center justify-center max-[860px]:order-first max-[860px]:min-h-0">
          <div className="hero-stage relative flex h-[340px] w-[340px] items-center justify-center rounded-[36px] max-[860px]:h-[240px] max-[860px]:w-[240px]">
            <div className="bob">
              <GrowthMark size={200} lit={4} />
            </div>
            <div className="absolute left-[-8px] top-2 flex items-center gap-2 rounded-md border border-border bg-surface px-[14px] py-[10px] text-[13px] font-bold shadow-float max-[860px]:left-0">
              ✨ Better prompt
            </div>
            <div className="absolute bottom-[26px] right-[-14px] flex items-center gap-2 rounded-md border border-border bg-surface px-[14px] py-[10px] text-[13px] font-bold shadow-float max-[860px]:right-0">
              📧 Ready-to-send email
            </div>
            <div className="absolute bottom-[-6px] left-[34px] flex items-center gap-2 rounded-md border border-border bg-surface px-[14px] py-[10px] text-[13px] font-bold text-positive shadow-float">
              <Tick size={14} /> First win
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

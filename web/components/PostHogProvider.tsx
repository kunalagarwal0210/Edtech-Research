"use client";

import { useEffect, type ReactNode } from "react";
import posthog from "posthog-js";
import { setPosthog } from "@/lib/analytics/track";

/**
 * Initializes the PostHog client once on mount and wires it into the
 * app-wide `track()` helper. Renders children unchanged — no visual output.
 */
export function PostHogProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

    if (key && !posthog.__loaded) {
      posthog.init(key, { api_host: host });
    }

    if (key) setPosthog(posthog);
  }, []);

  return <>{children}</>;
}

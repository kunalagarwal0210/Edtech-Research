import type { PostHog } from "posthog-js";
import { Ev } from "./events";

let client: Pick<PostHog, "capture" | "identify"> | null = null;

export function setPosthog(instance: Pick<PostHog, "capture" | "identify"> | null) {
  client = instance;
}
// test seam
export const __setPosthogForTest = setPosthog;

export function track(event: Ev, props?: Record<string, unknown>): void {
  client?.capture(event, props);
}

export function identifyUser(id: string, props?: Record<string, unknown>): void {
  client?.identify(id, props);
}

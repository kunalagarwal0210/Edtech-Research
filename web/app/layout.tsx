import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { PostHogProvider } from "@/components/PostHogProvider";
import { appName } from "@/lib/meta";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-ui",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: `${appName()} — Get your first real AI win in 10 minutes`,
    template: `%s · ${appName()}`,
  },
  description:
    "Bring one real work task. We'll take you from a rough idea to a result you can actually use — no jargon, no signup first.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${nunito.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}

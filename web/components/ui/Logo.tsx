/* Plainly wordmark — gradient growth-mark + "Pl-ai-nly" with the hidden "ai"
   highlighted (the .hl class lives in globals.css). */

type LogoProps = {
  size?: number;
  tagline?: boolean;
};

export function Logo({ size = 22, tagline = false }: LogoProps) {
  return (
    <span className="inline-flex items-center gap-[11px]">
      <svg
        className="shrink-0"
        width="36"
        height="36"
        viewBox="0 0 40 40"
        fill="none"
        aria-label="Plainly logo"
        style={{ boxShadow: "0 4px 12px rgba(91,108,255,.32)", borderRadius: 11 }}
      >
        <defs>
          <linearGradient
            id="plainly-lg"
            x1="6"
            y1="6"
            x2="34"
            y2="34"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#7C8AFF" />
            <stop offset="1" stopColor="#4A57E0" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="12" fill="url(#plainly-lg)" />
        <rect x="9" y="24" width="5" height="7" rx="2" fill="#fff" opacity="0.55" />
        <rect x="17" y="19" width="5" height="12" rx="2" fill="#fff" opacity="0.8" />
        <rect x="25" y="12" width="5" height="19" rx="2" fill="#fff" />
        <path
          d="M27.5 7.5 l0.9 2.7 l2.7 0.9 l-2.7 0.9 l-0.9 2.7 l-0.9 -2.7 l-2.7 -0.9 l2.7 -0.9 Z"
          fill="#FFC24B"
        />
      </svg>
      <span
        className="inline-flex flex-col"
        style={{ gap: tagline ? 3 : 0 }}
      >
        <span
          className="font-black leading-none tracking-[-0.02em] text-text"
          style={{ fontSize: size }}
        >
          Pl
          <span className="hl">
            <span>ai</span>
          </span>
          nly
        </span>
        {tagline && (
          <span
            className="font-extrabold uppercase tracking-[0.14em] text-muted"
            style={{ fontSize: size * 0.42 }}
          >
            AI, made plain
          </span>
        )}
      </span>
    </span>
  );
}

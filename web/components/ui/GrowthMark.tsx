/* GrowthMark — Plainly's brand mark. Ascending bars climbing to a spark; the
   bars fill in as the user progresses (`lit`), and the mark celebrates on the
   win screen (`celebrate`). No character/mascot by design. */

type GrowthMarkProps = {
  size?: number;
  /** how many of the 4 bars are filled (1–4) */
  lit?: number;
  celebrate?: boolean;
};

const BARS = [
  { x: 15, y: 78, h: 22 },
  { x: 41, y: 62, h: 38 },
  { x: 67, y: 46, h: 54 },
  { x: 93, y: 28, h: 72 },
];

const LIT_COLOR = ["#C7CBFF", "#9AA6FF", "#6D7BFF", "#5B6CFF"];

export function GrowthMark({ size = 120, lit = 4, celebrate = false }: GrowthMarkProps) {
  const reached = lit >= 4 || celebrate;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
    >
      <line
        x1="12"
        y1="102"
        x2="108"
        y2="102"
        stroke="#E7E9F0"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {BARS.map((b, idx) => (
        <rect
          key={idx}
          x={b.x}
          y={b.y}
          width="16"
          height={b.h}
          rx="5"
          fill={idx < lit ? LIT_COLOR[idx] : "#E7E9F0"}
          style={{ transition: "fill .45s ease" }}
        />
      ))}
      <g
        transform="translate(101 16)"
        opacity={reached ? 1 : 0.28}
        style={{ transition: "opacity .45s ease" }}
      >
        <path
          d="M0 -10 L2 -2 L10 0 L2 2 L0 10 L-2 2 L-10 0 L-2 -2 Z"
          fill="#FFC24B"
        />
      </g>
      {celebrate && (
        <g fill="#FFC24B">
          <path d="M22 42 l1.3 3.6 l3.6 1.3 l-3.6 1.3 l-1.3 3.6 l-1.3 -3.6 l-3.6 -1.3 l3.6 -1.3 Z" />
          <path d="M66 26 l1 2.8 l2.8 1 l-2.8 1 l-1 2.8 l-1 -2.8 l-2.8 -1 l2.8 -1 Z" />
        </g>
      )}
    </svg>
  );
}

import type { Project } from "@/data/projects";

/**
 * Generated placeholder artwork for a project. Replace with a real screenshot by setting
 * `image` on the project in `src/data/projects.ts` (see README).
 */
export function ProjectArt({ art, title, id }: { art: Project["art"]; title: string; id: string }) {
  const gradient = `grad-${id}`;

  return (
    <svg
      viewBox="0 0 640 400"
      role="img"
      aria-label={`${title} preview (placeholder illustration)`}
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={gradient} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={art.from} />
          <stop offset="1" stopColor={art.to} />
        </linearGradient>
      </defs>
      <rect width="640" height="400" fill={`url(#${gradient})`} />
      <circle cx="560" cy="40" r="140" fill="#fff" opacity="0.1" />
      <circle cx="60" cy="380" r="120" fill="#000" opacity="0.1" />

      {/* Window chrome */}
      <g transform="translate(70 50)">
        <rect width="500" height="300" rx="16" fill="#fff" opacity="0.96" />
        <rect width="500" height="34" rx="16" fill="#17151c" opacity="0.08" />
        <circle cx="22" cy="17" r="5" fill="#17151c" opacity="0.25" />
        <circle cx="40" cy="17" r="5" fill="#17151c" opacity="0.25" />
        <circle cx="58" cy="17" r="5" fill="#17151c" opacity="0.25" />
        {art.variant === "form" && <FormArt accent={art.from} />}
        {art.variant === "dashboard" && <DashboardArt accent={art.from} second={art.to} />}
        {art.variant === "builder" && <BuilderArt accent={art.from} second={art.to} />}
      </g>
    </svg>
  );
}

const ink = "#17151c";

function FormArt({ accent }: { accent: string }) {
  return (
    <g transform="translate(28 56)">
      {/* stepper */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${i * 70} 0)`}>
          <circle cx="12" cy="12" r="12" fill={i === 0 ? accent : ink} opacity={i === 0 ? 1 : 0.14} />
          {i < 2 && <rect x="30" y="11" width="36" height="2" fill={ink} opacity="0.14" />}
        </g>
      ))}
      <rect y="46" width="190" height="12" rx="6" fill={ink} opacity="0.7" />
      <rect y="72" width="200" height="34" rx="8" fill={ink} opacity="0.07" />
      <rect y="116" width="200" height="34" rx="8" fill={ink} opacity="0.07" />
      <rect y="160" width="96" height="34" rx="8" fill={accent} />
      {/* compare cards */}
      {[0, 1].map((i) => (
        <g key={i} transform={`translate(${240 + i * 112} 10)`}>
          <rect width="100" height="184" rx="10" fill={ink} opacity="0.06" />
          <rect x="12" y="14" width="56" height="9" rx="4" fill={ink} opacity="0.6" />
          <rect x="12" y="36" width="76" height="26" rx="6" fill={accent} opacity={i === 0 ? 1 : 0.55} />
          {[0, 1, 2, 3].map((j) => (
            <rect key={j} x="12" y={78 + j * 24} width={72 - j * 8} height="8" rx="4" fill={ink} opacity="0.2" />
          ))}
        </g>
      ))}
    </g>
  );
}

function DashboardArt({ accent, second }: { accent: string; second: string }) {
  const bars = [46, 70, 58, 92, 76, 110, 98];
  return (
    <g transform="translate(24 50)">
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${i * 156} 0)`}>
          <rect width="144" height="56" rx="10" fill={ink} opacity="0.06" />
          <rect x="12" y="12" width="48" height="7" rx="3.5" fill={ink} opacity="0.35" />
          <rect x="12" y="28" width="72" height="16" rx="5" fill={i === 1 ? second : accent} />
        </g>
      ))}
      <g transform="translate(0 72)">
        <rect width="290" height="140" rx="10" fill={ink} opacity="0.05" />
        {bars.map((h, i) => (
          <rect key={i} x={16 + i * 38} y={124 - h} width="24" height={h} rx="5" fill={i % 2 ? second : accent} />
        ))}
      </g>
      <g transform="translate(304 72)">
        <rect width="148" height="140" rx="10" fill={ink} opacity="0.05" />
        <circle cx="74" cy="70" r="40" fill="none" stroke={ink} strokeOpacity="0.12" strokeWidth="16" />
        <circle
          cx="74"
          cy="70"
          r="40"
          fill="none"
          stroke={accent}
          strokeWidth="16"
          strokeDasharray="150 251"
          strokeLinecap="round"
          transform="rotate(-90 74 70)"
        />
      </g>
    </g>
  );
}

function BuilderArt({ accent, second }: { accent: string; second: string }) {
  return (
    <g transform="translate(24 50)">
      {/* block list */}
      <rect width="120" height="212" rx="10" fill={ink} opacity="0.06" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x="12" y={14 + i * 38} width="96" height="28" rx="7" fill={i === 1 ? accent : ink} opacity={i === 1 ? 1 : 0.14} />
      ))}
      {/* desktop preview */}
      <g transform="translate(136 0)">
        <rect width="210" height="212" rx="10" fill={ink} opacity="0.05" />
        <rect x="16" y="16" width="178" height="62" rx="8" fill={second} opacity="0.9" />
        <rect x="16" y="90" width="120" height="10" rx="5" fill={ink} opacity="0.55" />
        <rect x="16" y="110" width="170" height="8" rx="4" fill={ink} opacity="0.2" />
        <rect x="16" y="126" width="150" height="8" rx="4" fill={ink} opacity="0.2" />
        <rect x="16" y="150" width="84" height="28" rx="14" fill={accent} />
      </g>
      {/* mobile preview */}
      <g transform="translate(362 0)">
        <rect width="90" height="212" rx="14" fill={ink} opacity="0.05" />
        <rect x="10" y="14" width="70" height="40" rx="6" fill={second} opacity="0.9" />
        <rect x="10" y="66" width="56" height="8" rx="4" fill={ink} opacity="0.55" />
        <rect x="10" y="82" width="70" height="6" rx="3" fill={ink} opacity="0.2" />
        <rect x="10" y="94" width="60" height="6" rx="3" fill={ink} opacity="0.2" />
        <rect x="10" y="114" width="52" height="20" rx="10" fill={accent} />
      </g>
    </g>
  );
}

"use client";

/**
 * ComplianceRadar — Sonar/Radar animation for the hero section.
 *
 * DESIGN:
 *   - Sweep origin at bottom-left (outside viewport), sweep arcs across visible area
 *   - Uses smooth sinusoidal back-and-forth motion (no hard jumps)
 *   - Concentric arc rings centered on the sweep origin
 *   - 4 regulation "blips" that light up when the sweep passes over them
 *   - Blips drift slightly with each ping (military sonar feel)
 *   - § symbol prominently visible
 */

import { useEffect, useState, useRef, useCallback } from "react";
import { useAnimationFrame } from "framer-motion";

/* ── Geometry ── */
const SWEEP_ORIGIN = { x: -80, y: 520 };
const VISUAL_CENTER = { x: 200, y: 200 };

/** Sweep arc range (degrees from SWEEP_ORIGIN).
 *  The visible viewport from bottom-left spans roughly 20° to 75°. */
const ARC_START = 20;
const ARC_END = 75;
const ARC_RANGE = ARC_END - ARC_START;

/** How many seconds for one complete back-and-forth sweep cycle */
const SWEEP_PERIOD = 8;

/* ── Arc ring distances from SWEEP_ORIGIN ── */
const RING_RADII = [320, 420, 520, 620];

/* ── Regulation blips ── */
interface Blip {
  id: string;
  label: string;
  color: string;
  baseAngle: number;
  baseDist: number;
}

const BLIPS: Blip[] = [
  { id: "nisg", label: "NISG", color: "#3b82f6", baseAngle: 52, baseDist: 380 },
  { id: "aiact", label: "AI Act", color: "#a78bfa", baseAngle: 38, baseDist: 500 },
  { id: "dora", label: "DORA", color: "#34d399", baseAngle: 62, baseDist: 460 },
  { id: "cra", label: "CRA", color: "#f97316", baseAngle: 34, baseDist: 520 },
];

/* ── Helpers ── */
function polarToXY(angleDeg: number, dist: number, origin = SWEEP_ORIGIN) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: origin.x + dist * Math.cos(rad),
    y: origin.y - dist * Math.sin(rad),
  };
}

function drift(): number {
  return (Math.random() - 0.5) * 18;
}

/** Smooth sinusoidal sweep angle — continuously oscillates between ARC_START and ARC_END.
 *  Returns angle in degrees. No jumps. */
function getSweepAngle(elapsed: number): number {
  // sin goes from -1 to 1, map to 0..1
  const t = (Math.sin((elapsed / SWEEP_PERIOD) * Math.PI * 2 - Math.PI / 2) + 1) / 2;
  return ARC_START + t * ARC_RANGE;
}

/* ═══════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════ */
export default function ComplianceRadar({ className = "" }: { className?: string }) {
  const sweepAngleRef = useRef(ARC_START);
  const prevSweepRef = useRef(ARC_START);
  const [, forceRender] = useState(0);

  /* Blip states */
  const [blipStates, setBlipStates] = useState(() =>
    BLIPS.map((b) => ({
      ...b,
      currentAngle: b.baseAngle + (Math.random() - 0.5) * 8,
      currentDist: b.baseDist + (Math.random() - 0.5) * 15,
      brightness: 0.18,
      pingTime: -10, // start unpinged
    }))
  );
  const blipStatesRef = useRef(blipStates);
  blipStatesRef.current = blipStates;

  // eslint-disable-next-line react-hooks/purity -- initializing ref with current time is intentional
  const startTimeRef = useRef(Date.now());

  /* Main animation loop */
  useAnimationFrame(() => {
    const elapsed = (Date.now() - startTimeRef.current) / 1000;
    const currentAngle = getSweepAngle(elapsed);
    const prevAngle = prevSweepRef.current;
    sweepAngleRef.current = currentAngle;
    prevSweepRef.current = currentAngle;

    /* Check blip pings */
    const states = blipStatesRef.current;
    let needsUpdate = false;
    const updated = states.map((bs) => {
      const blipAngle = bs.currentAngle;

      /* Did the sweep cross this blip since last frame? */
      const crossed =
        (prevAngle <= blipAngle && currentAngle >= blipAngle) ||
        (prevAngle >= blipAngle && currentAngle <= blipAngle);

      /* Also check proximity for slow movements */
      const proximity = Math.abs(blipAngle - currentAngle);

      if ((crossed || proximity < 2.5) && elapsed - bs.pingTime > 2.0) {
        needsUpdate = true;
        return {
          ...bs,
          brightness: 1,
          pingTime: elapsed,
          currentAngle: bs.baseAngle + drift() * 0.35,
          currentDist: bs.baseDist + drift(),
        };
      }

      /* Fade out — longer glow for better visibility */
      const timeSincePing = elapsed - bs.pingTime;
      const newBrightness =
        timeSincePing < 4.5
          ? Math.max(0.18, 1 - (timeSincePing / 4.5) * 0.82)
          : 0.18;

      if (Math.abs(newBrightness - bs.brightness) > 0.01) {
        needsUpdate = true;
        return { ...bs, brightness: newBrightness };
      }
      return bs;
    });

    if (needsUpdate) {
      setBlipStates(updated);
    }
  });

  /* 30fps render for sweep line */
  useEffect(() => {
    const interval = setInterval(() => forceRender((n) => n + 1), 33);
    return () => clearInterval(interval);
  }, []);

  const sweepAngle = sweepAngleRef.current;
  const sweepEnd = polarToXY(sweepAngle, 720);

  /* Arc path builder */
  const makeArc = useCallback((radius: number) => {
    const start = polarToXY(ARC_START, radius);
    const end = polarToXY(ARC_END, radius);
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 0 ${end.x} ${end.y}`;
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(250,204,21,0.05) 0%, transparent 70%)",
        }}
      />

      <svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Glow filter for pinged blips */}
          <filter id="blip-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Softer glow for arcs */}
          <filter id="arc-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gold gradient for § */}
          <linearGradient
            id="para-grad"
            x1="180"
            y1="160"
            x2="220"
            y2="240"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#FACC15" />
            <stop offset="1" stopColor="#EAB308" />
          </linearGradient>
        </defs>

        {/* ── CONCENTRIC ARC RINGS ── */}
        {RING_RADII.map((r, i) => (
          <path
            key={r}
            d={makeArc(r)}
            stroke="#FACC15"
            strokeOpacity={0.06 + i * 0.025}
            strokeWidth={0.8}
            fill="none"
            strokeDasharray="3 8"
            filter="url(#arc-glow)"
          />
        ))}

        {/* ── SUBTLE RADIAL GRID LINES ── */}
        {[25, 35, 45, 55, 65, 75].map((a) => {
          const inner = polarToXY(a, 280);
          const outer = polarToXY(a, 660);
          return (
            <line
              key={a}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke="#FACC15"
              strokeOpacity="0.03"
              strokeWidth="0.5"
            />
          );
        })}

        {/* ── TRAILING SWEEP CONE ── */}
        {(() => {
          const trailSize = 8; // degrees of trailing glow
          const coneA1 = sweepAngle;
          const coneA2 = sweepAngle - trailSize;
          const p1 = polarToXY(coneA1, 720);
          const p2 = polarToXY(coneA2, 720);
          // Arc direction: 0 = counter-clockwise (since coneA2 < coneA1)
          return (
            <path
              d={`M ${SWEEP_ORIGIN.x} ${SWEEP_ORIGIN.y} L ${p1.x} ${p1.y} A 720 720 0 0 1 ${p2.x} ${p2.y} Z`}
              fill="#FACC15"
              opacity="0.035"
            />
          );
        })()}

        {/* ── SWEEP LINE ── */}
        <line
          x1={SWEEP_ORIGIN.x}
          y1={SWEEP_ORIGIN.y}
          x2={sweepEnd.x}
          y2={sweepEnd.y}
          stroke="#FACC15"
          strokeOpacity="0.3"
          strokeWidth="1"
        />
        {/* Bright tip */}
        <circle
          cx={sweepEnd.x}
          cy={sweepEnd.y}
          r="2"
          fill="#FACC15"
          opacity="0.5"
        />

        {/* ── § SYMBOL ── */}
        <text
          x={VISUAL_CENTER.x}
          y={VISUAL_CENTER.y + 8}
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="Syne, Georgia, 'Times New Roman', serif"
          fontWeight="700"
          fontSize="42"
          fill="url(#para-grad)"
          opacity="0.5"
        >
          &#167;
        </text>

        {/* ── REGULATION BLIPS ── */}
        {blipStates.map((bs) => {
          const pos = polarToXY(bs.currentAngle, bs.currentDist);
          const isPinged = bs.brightness > 0.5;
          const coreR = 3 + bs.brightness * 2.5;

          return (
            <g key={bs.id}>
              {/* Expanding ping ring */}
              {isPinged && (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={8 + (1 - bs.brightness) * 12}
                  fill="none"
                  stroke={bs.color}
                  strokeOpacity={bs.brightness * 0.35}
                  strokeWidth="1.5"
                />
              )}

              {/* Outer halo glow */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={coreR + 5}
                fill={bs.color}
                opacity={bs.brightness * 0.12}
                filter={isPinged ? "url(#blip-glow)" : undefined}
              />

              {/* Core dot */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={coreR}
                fill={bs.color}
                opacity={Math.max(0.18, bs.brightness)}
                filter={isPinged ? "url(#blip-glow)" : undefined}
              />

              {/* Label — fades in on ping */}
              <text
                x={pos.x}
                y={pos.y - coreR - 8}
                textAnchor="middle"
                fontSize="9"
                fontFamily="'DM Mono', monospace"
                fontWeight="600"
                fill={bs.color}
                opacity={Math.max(0, bs.brightness - 0.25)}
                letterSpacing="0.06em"
              >
                {bs.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

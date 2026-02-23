"use client";

/**
 * ComplianceRadar — Premium Sonar/Radar animation for the hero section.
 *
 * FEATURES:
 *   - 12 regulation blips in 3 tiers (inner/middle/outer)
 *   - Constellation network: golden connection lines between related regulations
 *   - HUD micro-details: Jarvis-style status text on ping
 *   - 3-layer sweep afterglow (comet tail effect)
 *   - Ring pulse on blip ping (nearest arc segment brightens)
 *   - Scan-complete pulse every 16s (expanding circle)
 *   - Particle trail behind sweep line
 *   - Mouse parallax for 3D depth (optional props from parent)
 */

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import {
  useAnimationFrame,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";

/* ═══════════════════════════════════════════
   GEOMETRY
   ═══════════════════════════════════════════ */
const SWEEP_ORIGIN = { x: -80, y: 520 };
const VISUAL_CENTER = { x: 240, y: 160 };

const ARC_START = 20;
const ARC_END = 75;
const ARC_RANGE = ARC_END - ARC_START;
const SWEEP_PERIOD = 18;

const RING_RADII = [320, 420, 520, 620];

/* ═══════════════════════════════════════════
   BLIP CONFIGURATION — 12 EU Regulations
   ═══════════════════════════════════════════ */
interface Blip {
  id: string;
  label: string;
  color: string;
  baseAngle: number;
  baseDist: number;
  tier: 1 | 2 | 3;
}

const BLIPS: Blip[] = [
  // Tier 1 — inner band (350-420): core regulations
  { id: "nisg",   label: "NISG",      color: "#3b82f6", baseAngle: 52, baseDist: 380, tier: 1 },
  { id: "dsgvo",  label: "DSGVO",     color: "#06b6d4", baseAngle: 40, baseDist: 400, tier: 1 },
  { id: "aiact",  label: "AI Act",    color: "#a78bfa", baseAngle: 30, baseDist: 370, tier: 1 },
  { id: "dora",   label: "DORA",      color: "#34d399", baseAngle: 62, baseDist: 410, tier: 1 },

  // Tier 2 — middle band (440-520): active regulations
  { id: "cra",    label: "CRA",       color: "#f97316", baseAngle: 35, baseDist: 500, tier: 2 },
  { id: "csrd",   label: "CSRD",      color: "#10b981", baseAngle: 48, baseDist: 470, tier: 2 },
  { id: "bafg",   label: "BaFG",      color: "#c084fc", baseAngle: 58, baseDist: 490, tier: 2 },
  { id: "hschg",  label: "HSchG",     color: "#f59e0b", baseAngle: 68, baseDist: 460, tier: 2 },

  // Tier 3 — outer band (540-620): emerging regulations
  { id: "mica",     label: "MiCA",       color: "#eab308", baseAngle: 25, baseDist: 570, tier: 3 },
  { id: "dsa",      label: "DSA",        color: "#818cf8", baseAngle: 44, baseDist: 560, tier: 3 },
  { id: "eprivacy", label: "ePrivacy",   color: "#a78bfa", baseAngle: 55, baseDist: 590, tier: 3 },
  { id: "greencl",  label: "Green Cl.",  color: "#4ade80", baseAngle: 72, baseDist: 550, tier: 3 },
];


/* ═══════════════════════════════════════════
   HUD MESSAGES
   ═══════════════════════════════════════════ */
const HUD_MESSAGES: string[] = [
  "[STATUS: RISK]",
  "[SCAN: 100%]",
  "[COMPLIANT]",
  "[PRIORITY: HIGH]",
  "[AUDIT: PENDING]",
  "[DEADLINE: NEAR]",
  "[RISK: ELEVATED]",
  "[MONITORING...]",
  "[CLASSIFIED]",
  "[PRIORITY: MED]",
];

/* ═══════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════ */
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

function getSweepAngle(elapsed: number): number {
  const t = (Math.sin((elapsed / SWEEP_PERIOD) * Math.PI * 2 - Math.PI / 2) + 1) / 2;
  return ARC_START + t * ARC_RANGE;
}

function randomHudMessage(): string {
  return HUD_MESSAGES[Math.floor(Math.random() * HUD_MESSAGES.length)];
}

/** HUD opacity — slow fade-in, hold, gentle fade-out (readable!) */
function getHudOpacity(timeSincePing: number): number {
  if (timeSincePing > 2.2) return 0;
  if (timeSincePing < 0.15) {
    // Quick fade-in
    return (timeSincePing / 0.15) * 0.7;
  }
  if (timeSincePing < 1.4) {
    // Stable hold — readable
    return 0.7;
  }
  // Gentle fade-out
  return 0.7 * (1 - (timeSincePing - 1.4) / 0.8);
}

/** Find nearest ring index for a given distance */
function nearestRingIndex(dist: number): number {
  let best = 0;
  let bestDiff = Math.abs(RING_RADII[0] - dist);
  for (let i = 1; i < RING_RADII.length; i++) {
    const diff = Math.abs(RING_RADII[i] - dist);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = i;
    }
  }
  return best;
}

/* ═══════════════════════════════════════════
   TIER CONFIG
   ═══════════════════════════════════════════ */
const TIER_CONFIG = {
  1: { restOpacity: 0.22, coreMin: 3, coreRange: 2.5, labelSize: 9, driftFactor: 0.25, useFilter: true },
  2: { restOpacity: 0.16, coreMin: 2.5, coreRange: 2, labelSize: 8, driftFactor: 0.35, useFilter: false },
  3: { restOpacity: 0.12, coreMin: 2, coreRange: 1.5, labelSize: 7, driftFactor: 0.5, useFilter: false },
} as const;

/* ═══════════════════════════════════════════
   STATE TYPES
   ═══════════════════════════════════════════ */
interface BlipState extends Blip {
  currentAngle: number;
  currentDist: number;
  brightness: number;
  pingTime: number;
  hudMessage: string;
}

interface RingPulse {
  ringIndex: number;
  centerAngle: number;
  activatedAt: number;
}

interface Particle {
  x: number;
  y: number;
  spawnedAt: number;
  lifetime: number;
}

/* ═══════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════ */
const MAX_RING_PULSES = 3;
const RING_PULSE_LIFETIME = 2;
const MAX_PARTICLES = 10;
const PARTICLE_SPAWN_INTERVAL = 0.4;
const SCAN_PULSE_INTERVAL = 36;
const SCAN_PULSE_DURATION = 2.5;

/* ═══════════════════════════════════════════
   DEFAULT MOTION VALUE (fallback when no mouse)
   ═══════════════════════════════════════════ */
const ZERO = 0;

/* ═══════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════ */
interface ComplianceRadarProps {
  className?: string;
  mouseX?: MotionValue<number>;
  mouseY?: MotionValue<number>;
}

export default function ComplianceRadar({
  className = "",
  mouseX,
  mouseY,
}: ComplianceRadarProps) {
  const sweepAngleRef = useRef(ARC_START);
  const prevSweepRef = useRef(ARC_START);
  const [, forceRender] = useState(0);

  /* ── Parallax transforms ── */
  const fallbackX = useMemo(() => ({ get: () => ZERO }) as MotionValue<number>, []);
  const fallbackY = useMemo(() => ({ get: () => ZERO }) as MotionValue<number>, []);

  const mX = mouseX ?? fallbackX;
  const mY = mouseY ?? fallbackY;

  // Arc layer: moves opposite to mouse
  const arcTx = useTransform(mX, [-1, 1], [4, -4]);
  const arcTy = useTransform(mY, [-1, 1], [3, -3]);

  // Blip/connection layer: moves with mouse
  const blipTx = useTransform(mX, [-1, 1], [-3, 3]);
  const blipTy = useTransform(mY, [-1, 1], [-2, 2]);

  // Smooth spring for parallax values
  const arcTxSmooth = useSpring(arcTx, { stiffness: 50, damping: 20 });
  const arcTySmooth = useSpring(arcTy, { stiffness: 50, damping: 20 });
  const blipTxSmooth = useSpring(blipTx, { stiffness: 50, damping: 20 });
  const blipTySmooth = useSpring(blipTy, { stiffness: 50, damping: 20 });

  /* ── Parallax values for SVG transforms ── */
  const arcTransformRef = useRef("translate(0,0)");
  const blipTransformRef = useRef("translate(0,0)");

  /* ── Blip states ── */
  const [blipStates, setBlipStates] = useState<BlipState[]>(() =>
    BLIPS.map((b) => ({
      ...b,
      currentAngle: b.baseAngle + (Math.random() - 0.5) * 8,
      currentDist: b.baseDist + (Math.random() - 0.5) * 15,
      brightness: TIER_CONFIG[b.tier].restOpacity,
      pingTime: -10,
      hudMessage: randomHudMessage(),
    }))
  );
  const blipStatesRef = useRef(blipStates);
  blipStatesRef.current = blipStates;

  /* ── Additional effect refs ── */
  const ringPulsesRef = useRef<RingPulse[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const lastParticleSpawnRef = useRef(0);
  const scanPulseRef = useRef({ lastTrigger: 0, progress: -1 });

  // eslint-disable-next-line react-hooks/purity -- initializing ref with current time is intentional
  const startTimeRef = useRef(Date.now());
  const elapsedRef = useRef(0);

  /* ═══════ MAIN ANIMATION LOOP ═══════ */
  useAnimationFrame(() => {
    const elapsed = (Date.now() - startTimeRef.current) / 1000;
    elapsedRef.current = elapsed;
    const currentAngle = getSweepAngle(elapsed);
    const prevAngle = prevSweepRef.current;
    sweepAngleRef.current = currentAngle;
    prevSweepRef.current = currentAngle;

    /* ── Update parallax transforms ── */
    arcTransformRef.current = `translate(${arcTxSmooth.get()},${arcTySmooth.get()})`;
    blipTransformRef.current = `translate(${blipTxSmooth.get()},${blipTySmooth.get()})`;

    /* ── Check blip pings ── */
    const states = blipStatesRef.current;
    let needsUpdate = false;
    const newlyPinged: string[] = [];

    const updated = states.map((bs) => {
      const cfg = TIER_CONFIG[bs.tier];
      const blipAngle = bs.currentAngle;

      const crossed =
        (prevAngle <= blipAngle && currentAngle >= blipAngle) ||
        (prevAngle >= blipAngle && currentAngle <= blipAngle);
      const proximity = Math.abs(blipAngle - currentAngle);

      if ((crossed || proximity < 2.5) && elapsed - bs.pingTime > 4.0) {
        needsUpdate = true;
        newlyPinged.push(bs.id);

        return {
          ...bs,
          brightness: 1,
          pingTime: elapsed,
          currentAngle: bs.baseAngle + drift() * cfg.driftFactor,
          currentDist: bs.baseDist + drift(),
          hudMessage: randomHudMessage(),
        };
      }

      const timeSincePing = elapsed - bs.pingTime;
      const newBrightness =
        timeSincePing < 6
          ? Math.max(cfg.restOpacity, 1 - (timeSincePing / 6) * (1 - cfg.restOpacity))
          : cfg.restOpacity;

      if (Math.abs(newBrightness - bs.brightness) > 0.01) {
        needsUpdate = true;
        return { ...bs, brightness: newBrightness };
      }
      return bs;
    });

    /* ── Ring pulse for newly pinged blips ── */
    if (newlyPinged.length > 0) {
      for (const pingedId of newlyPinged) {
        const pingedBlip = updated.find((b) => b.id === pingedId);
        if (pingedBlip) {
          const rp = ringPulsesRef.current;
          rp.push({
            ringIndex: nearestRingIndex(pingedBlip.currentDist),
            centerAngle: pingedBlip.currentAngle,
            activatedAt: elapsed,
          });
          while (rp.length > MAX_RING_PULSES) rp.shift();
        }
      }
    }

    /* ── Cleanup expired ring pulses ── */
    ringPulsesRef.current = ringPulsesRef.current.filter(
      (rp) => elapsed - rp.activatedAt < RING_PULSE_LIFETIME
    );

    /* ── Particle spawning ── */
    if (elapsed - lastParticleSpawnRef.current > PARTICLE_SPAWN_INTERVAL) {
      lastParticleSpawnRef.current = elapsed;
      const dist = 300 + Math.random() * 300;
      const pos = polarToXY(currentAngle, dist);
      particlesRef.current.push({
        x: pos.x,
        y: pos.y,
        spawnedAt: elapsed,
        lifetime: 1.5 + Math.random(),
      });
      // Cap particles
      while (particlesRef.current.length > MAX_PARTICLES) {
        particlesRef.current.shift();
      }
    }

    /* ── Cleanup expired particles ── */
    particlesRef.current = particlesRef.current.filter(
      (p) => elapsed - p.spawnedAt < p.lifetime
    );

    /* ── Scan complete pulse ── */
    const sp = scanPulseRef.current;
    if (elapsed - sp.lastTrigger > SCAN_PULSE_INTERVAL) {
      sp.lastTrigger = elapsed;
      sp.progress = 0;
    }
    if (sp.progress >= 0) {
      sp.progress = (elapsed - sp.lastTrigger) / SCAN_PULSE_DURATION;
      if (sp.progress > 1) sp.progress = -1;
    }

    if (needsUpdate) {
      setBlipStates(updated);
    }
  });

  /*
   * 30fps render tick for sweep line + visual effects.
   *
   * This is intentionally separate from useAnimationFrame above.
   * useAnimationFrame runs at ~60fps to update physics/state in refs,
   * but does NOT trigger React re-renders. This setInterval triggers
   * re-renders at a capped 30fps so the sweep line, particles, and
   * scan pulse animate smoothly without paying the cost of a full
   * React render on every animation frame.
   */
  useEffect(() => {
    const interval = setInterval(() => forceRender((n) => n + 1), 33);
    return () => clearInterval(interval);
  }, []);

  /* ── Current render values ── */
  const sweepAngle = sweepAngleRef.current;
  const sweepEnd = polarToXY(sweepAngle, 720);
  const elapsed = elapsedRef.current;

  /* Arc path builder */
  const makeArc = useCallback((radius: number) => {
    const start = polarToXY(ARC_START, radius);
    const end = polarToXY(ARC_END, radius);
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 0 ${end.x} ${end.y}`;
  }, []);

  /* Ring pulse arcs and multi-layer afterglow cones removed */

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
          {/* Glow filter for tier-1 pinged blips */}
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

          {/* Gold gradient for section symbol */}
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

        {/* ══════════ ARC LAYER (parallax: opposite) ══════════ */}
        <g transform={arcTransformRef.current}>
          {/* Concentric arc rings */}
          {RING_RADII.map((r, i) => (
            <path
              key={r}
              d={makeArc(r)}
              stroke="#FACC15"
              strokeOpacity={0.025 + i * 0.01}
              strokeWidth={0.5}
              fill="none"
              strokeDasharray="2 12"
            />
          ))}

          {/* Radial grid lines removed — too visible on dark backgrounds */}

          {/* Ring pulses removed — looked like random arcs */}
        </g>

        {/* ══════════ SWEEP LAYER (no parallax) ══════════ */}
        <g>
          {/* Afterglow cone (single subtle wedge behind sweep) */}
          {(() => {
            const coneA1 = sweepAngle;
            const coneA2 = sweepAngle - 12;
            const p1 = polarToXY(coneA1, 720);
            const p2 = polarToXY(coneA2, 720);
            return (
              <path
                d={`M ${SWEEP_ORIGIN.x} ${SWEEP_ORIGIN.y} L ${p1.x} ${p1.y} A 720 720 0 0 1 ${p2.x} ${p2.y} Z`}
                fill="#FACC15"
                opacity={0.025}
              />
            );
          })()}

          {/* Sweep line */}
          <line
            x1={SWEEP_ORIGIN.x}
            y1={SWEEP_ORIGIN.y}
            x2={sweepEnd.x}
            y2={sweepEnd.y}
            stroke="#FACC15"
            strokeOpacity="0.12"
            strokeWidth="0.7"
          />

          {/* Particle trail */}
          {particlesRef.current.map((p, i) => {
            const age = elapsed - p.spawnedAt;
            const fade = Math.max(0, 0.3 * (1 - age / p.lifetime));
            return (
              <circle
                key={`particle-${i}`}
                cx={p.x}
                cy={p.y}
                r={1}
                fill="#FACC15"
                opacity={fade}
              />
            );
          })}
        </g>

        {/* ══════════ SCAN COMPLETE PULSE (no parallax) ══════════ */}
        {scanPulseRef.current.progress >= 0 && scanPulseRef.current.progress <= 1 && (
          <circle
            cx={VISUAL_CENTER.x}
            cy={VISUAL_CENTER.y}
            r={10 + scanPulseRef.current.progress * 290}
            fill="none"
            stroke="#FACC15"
            strokeWidth={1.5}
            opacity={0.15 * (1 - scanPulseRef.current.progress)}
          />
        )}

        {/* ══════════ BLIP LAYER (parallax: with mouse) ══════════ */}
        <g transform={blipTransformRef.current}>
          {blipStates.map((bs) => {
            const pos = polarToXY(bs.currentAngle, bs.currentDist);
            const cfg = TIER_CONFIG[bs.tier];
            const isPinged = bs.brightness > 0.5;
            const coreR = cfg.coreMin + bs.brightness * cfg.coreRange;
            const timeSincePing = elapsed - bs.pingTime;

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
                  filter={isPinged && cfg.useFilter ? "url(#blip-glow)" : undefined}
                />

                {/* Core dot */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={coreR}
                  fill={bs.color}
                  opacity={Math.max(cfg.restOpacity, bs.brightness)}
                  filter={isPinged && cfg.useFilter ? "url(#blip-glow)" : undefined}
                />

                {/* Label — fades in on ping */}
                <text
                  x={pos.x}
                  y={pos.y - coreR - 8}
                  textAnchor="middle"
                  fontSize={cfg.labelSize}
                  fontFamily="'DM Mono', monospace"
                  fontWeight="600"
                  fill={bs.color}
                  opacity={Math.max(0, bs.brightness - 0.25)}
                  letterSpacing="0.06em"
                >
                  {bs.label}
                </text>

                {/* HUD micro-detail — Jarvis effect */}
                {timeSincePing < 2.2 && timeSincePing >= 0 && (
                  <text
                    x={pos.x + coreR + 10}
                    y={pos.y + 3}
                    textAnchor="start"
                    fontSize="5.5"
                    fontFamily="'DM Mono', monospace"
                    fontWeight="500"
                    fill="#FACC15"
                    opacity={getHudOpacity(timeSincePing)}
                    letterSpacing="0.08em"
                  >
                    {bs.hudMessage}
                  </text>
                )}
              </g>
            );
          })}
        </g>

        {/* ══════════ SYMBOL LAYER (no parallax, anchored) ══════════ */}
        <text
          x={VISUAL_CENTER.x}
          y={VISUAL_CENTER.y}
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="Syne, Georgia, 'Times New Roman', serif"
          fontWeight="700"
          fontSize="34"
          fill="url(#para-grad)"
          opacity="0.3"
        >
          &#167;
        </text>
      </svg>
    </div>
  );
}

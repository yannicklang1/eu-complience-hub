"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface AnimatedCounterProps {
  /** Target number to count to */
  target: number;
  /** Suffix to display after the number (e.g., "+", "%", "M") */
  suffix?: string;
  /** Prefix to display before the number (e.g., "€", ">") */
  prefix?: string;
  /** Duration of the animation in seconds (default: 2) */
  duration?: number;
  /** CSS class for the number text */
  className?: string;
  /** Whether to format number with locale separator */
  formatNumber?: boolean;
}

export default function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2,
  className = "",
  formatNumber = false,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) =>
    formatNumber ? Math.round(latest).toLocaleString("de-AT") : Math.round(latest).toString()
  );

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          animate(motionValue, target, {
            duration,
            ease: [0.25, 0.46, 0.45, 0.94] as const,
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, motionValue, target, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

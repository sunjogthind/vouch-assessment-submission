"use client";

import { useEffect, useRef, useState } from "react";

const TRACE_PATH =
  "M0,70 L40,66 L80,72 L120,64 L160,70 L200,60 L240,68 L280,66 L320,70 L360,66";
const ANIMATION_DURATION = 2600; // ms

export default function LiveMonitorCard() {
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const [showVerdict, setShowVerdict] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [traceProgress, setTraceProgress] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setReduceMotion(true);
      setTraceProgress(1);
      setShowVerdict(true);
      return;
    }

    const path = pathRef.current;
    const dot = dotRef.current;
    if (!path || !dot) return;

    const totalLength = path.getTotalLength();
    let start: number | null = null;
    let rafId: number;

    function step(ts: number) {
      if (!start) start = ts;
      const t = Math.min((ts - start) / ANIMATION_DURATION, 1);
      setTraceProgress(t);

      const pt = path!.getPointAtLength(t * totalLength);
      dot!.setAttribute("cx", String(pt.x));
      dot!.setAttribute("cy", String(pt.y));

      if (t < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setShowVerdict(true);
      }
    }

    // Small delay so the card is visible before the animation starts
    const timeout = setTimeout(() => {
      rafId = requestAnimationFrame(step);
    }, 400);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Build a stroke-dasharray / dashoffset to reveal the path progressively
  const dashStyles = reduceMotion
    ? {}
    : {
        strokeDasharray: 1000,
        strokeDashoffset: 1000 - 1000 * traceProgress,
      };

  return (
    <div className="relative rounded-[22px] bg-ink p-6 text-white shadow-[0_30px_60px_-25px_rgba(0,0,0,0.5)]">
      {/* Top row */}
      <div className="mb-1.5 flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 rounded-[20px] bg-white/12 px-2.5 py-1 text-[11px] text-white">
          <span
            className="pulse-dot h-1.5 w-1.5 rounded-full bg-[#4ADE80]"
            style={{ animation: reduceMotion ? "none" : "pulse 1.6s infinite" }}
          />
          Live feed
        </div>
        <div className="font-sans text-[12px] text-[#8A8A8A]">
          VCH-4471 · xentag 8842-A
        </div>
      </div>

      <h3 className="disp text-[30px]">mRNA vaccine</h3>
      <div className="text-[12px] text-[#8A8A8A]">
        Spec band 2–8°C · Toronto → Hamilton
      </div>

      {/* Chart area */}
      <div className="relative my-3.5 h-[150px]">
        <svg
          className="h-full w-full overflow-visible"
          viewBox="0 0 360 150"
          preserveAspectRatio="none"
        >
          {/* Spec band */}
          <rect x="0" y="40" width="360" height="55" fill="rgba(74,222,128,0.10)" />
          <line x1="0" y1="40" x2="360" y2="40" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="0" y1="95" x2="360" y2="95" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="4 4" />
          <text x="6" y="34" fill="#6B7280" fontSize="9" fontFamily="Inter">8°C</text>
          <text x="6" y="108" fill="#6B7280" fontSize="9" fontFamily="Inter">2°C</text>

          {/* Animated trace path */}
          <path
            ref={pathRef}
            fill="none"
            stroke="#FFE614"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d={TRACE_PATH}
            style={dashStyles}
          />
          {/* Traveling dot */}
          <circle
            ref={dotRef}
            r="4"
            fill="#FFE614"
            cx={reduceMotion ? 360 : 0}
            cy={reduceMotion ? 66 : 70}
            style={{ opacity: traceProgress > 0 ? 1 : 0 }}
          />
        </svg>
      </div>

      {/* Verdict chip — fades up on completion */}
      <div
        className="flex items-center gap-2.5 rounded-[12px] border border-[rgba(74,222,128,0.3)] bg-[rgba(74,222,128,0.12)] px-3.5 py-[11px] transition-all duration-500 ease-out"
        style={{
          opacity: showVerdict ? 1 : 0,
          transform: showVerdict ? "translateY(0)" : "translateY(6px)",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          className="h-[18px] w-[18px] shrink-0 text-[#4ADE80]"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
        <div className="text-[13px]">
          <b className="font-semibold">Verified in spec.</b>{" "}
          <span className="text-[11.5px] text-[#9CA3AF]">
            Certificate issued · tamper-evident · portable
          </span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface ExerciseAnimationProps {
  position: "sitting" | "standing" | "lying";
  category: string;
  exerciseId?: string;
}

/* ─── Sparkle helper (used by AnklePumpsSVG) ─── */
function Sparkle({ x, y, size = 3, delay = "0s", dur = "2.4s" }: {
  x: number; y: number; size?: number; delay?: string; dur?: string;
}) {
  const s = size;
  const t = s * 0.28;
  return (
    <g transform={`translate(${x} ${y})`} style={{ pointerEvents: "none" }}>
      <path d={`M 0 ${-s} L ${t} ${-t} L ${s} 0 L ${t} ${t} L 0 ${s} L ${-t} ${t} L ${-s} 0 L ${-t} ${-t} Z`} fill="#fff3a8">
        <animate attributeName="opacity" values="0.15;1;0.15" dur={dur} begin={delay} repeatCount="indefinite" />
        <animateTransform attributeName="transform" type="scale" values="0.6;1.15;0.6" dur={dur} begin={delay} repeatCount="indefinite" additive="sum" />
      </path>
      <circle r={s * 0.35} fill="#ffffff">
        <animate attributeName="opacity" values="0.1;0.9;0.1" dur={dur} begin={delay} repeatCount="indefinite" />
      </circle>
    </g>
  );
}

/* ─── Ankle Pumps crystal SVG ─── */
const ANKLE_X = 210;
const ANKLE_Y = 282;

function AnklePumpsSVG({ progress, className }: { progress: number; className?: string }) {
  const footRef = useRef<SVGGElement | null>(null);
  const glowRef = useRef<SVGCircleElement | null>(null);
  const arrowUpRef = useRef<SVGPolygonElement | null>(null);
  const arrowDownRef = useRef<SVGPolygonElement | null>(null);

  useEffect(() => {
    const s = Math.sin(progress * Math.PI * 2);
    const angle = s < 0 ? s * 28 : s * 40;
    if (footRef.current) footRef.current.setAttribute("transform", `rotate(${angle} ${ANKLE_X} ${ANKLE_Y})`);
    if (glowRef.current) { glowRef.current.setAttribute("r", String(14 + Math.abs(s) * 6)); glowRef.current.style.opacity = String(0.35 + Math.abs(s) * 0.5); }
    if (arrowUpRef.current) arrowUpRef.current.style.opacity = String(Math.max(0, -s));
    if (arrowDownRef.current) arrowDownRef.current.style.opacity = String(Math.max(0, s));
  }, [progress]);

  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="Animated crystal geode leg performing an ankle pump exercise">
      <defs>
        <linearGradient id="apCrystalBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f3e7ff" /><stop offset="40%" stopColor="#b48cd6" /><stop offset="100%" stopColor="#4a2d6b" />
        </linearGradient>
        <linearGradient id="apCrystalFacet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fdf6ff" /><stop offset="100%" stopColor="#8a63b3" stopOpacity="0.3" />
        </linearGradient>
        <radialGradient id="apGeode" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fff4d6" /><stop offset="35%" stopColor="#d9a8ff" /><stop offset="75%" stopColor="#5a3a82" /><stop offset="100%" stopColor="#2a1840" />
        </radialGradient>
        <linearGradient id="apStone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6b6256" /><stop offset="100%" stopColor="#2e2a24" />
        </linearGradient>
        <radialGradient id="apShadow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#2a1840" stopOpacity="0.35" /><stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="apGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fff3a8" stopOpacity="0.9" /><stop offset="100%" stopColor="#fff3a8" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="270" cy="372" rx="92" ry="9" fill="url(#apShadow)" />

      <g>
        <path d="M 14 202 L 14 188 Q 18 184 26 184 L 196 184 Q 204 184 206 192 L 204 202 Z" fill="url(#apStone)" />
        {[30, 70, 110, 150, 180].map((x) => (
          <path key={x} d={`M ${x} 186 q 3 -4 6 0 q 3 -3 5 1`} fill="none" stroke="#6b8f4a" strokeWidth="1.4" strokeLinecap="round" />
        ))}
        <path d="M 26 202 L 24 296 L 38 296 L 36 202 Z" fill="url(#apStone)" />
        <path d="M 176 202 L 174 262 L 188 262 L 186 202 Z" fill="url(#apStone)" />
      </g>

      <g>
        <path d="M 24 173 L 36 156 L 198 156 L 212 173 L 198 190 L 36 190 Z" fill="url(#apCrystalBody)" stroke="#2a1840" strokeWidth="1.2" strokeLinejoin="round" />
        <line x1="36" y1="156" x2="48" y2="190" stroke="#fdf6ff" strokeWidth="0.8" opacity="0.55" />
        <line x1="100" y1="156" x2="92" y2="190" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.4" />
        <line x1="160" y1="156" x2="170" y2="190" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.4" />
        <line x1="198" y1="156" x2="198" y2="190" stroke="#2a1840" strokeWidth="0.8" opacity="0.6" />
        <path d="M 40 158 L 196 158 L 188 168 L 50 168 Z" fill="url(#apCrystalFacet)" opacity="0.7" />
        <Sparkle x={70} y={172} size={2.4} delay="0.2s" />
        <Sparkle x={140} y={172} size={2} delay="1.1s" />
      </g>

      <g>
        <path d="M 188 186 L 200 192 L 200 282 L 188 288 Z" fill="url(#apCrystalBody)" stroke="#2a1840" strokeWidth="1" strokeLinejoin="round" />
        <path d="M 232 186 L 220 192 L 220 282 L 232 288 Z" fill="url(#apCrystalBody)" stroke="#2a1840" strokeWidth="1" strokeLinejoin="round" />
        <path d="M 200 192 L 220 192 L 220 282 L 200 282 Z" fill="#3d2358" stroke="#1a0e2a" strokeWidth="0.8" />
        <line x1="210" y1="198" x2="210" y2="276" stroke="#e0b8ff" strokeWidth="1.4" opacity="0.7" />
        {[218, 238, 258].map((y) => (
          <g key={y}><polygon points={`210,${y - 4} 214,${y} 210,${y + 4} 206,${y}`} fill="#fff3a8" opacity="0.85" /></g>
        ))}
        <path d="M 190 190 L 198 194 L 198 280 L 190 284 Z" fill="url(#apCrystalFacet)" opacity="0.5" />
        <Sparkle x={210} y={228} size={2.2} delay="0.6s" />
        <Sparkle x={210} y={268} size={1.8} delay="1.4s" />
      </g>

      <g>
        <circle cx="212" cy="173" r="24" fill="url(#apGeode)" stroke="#1a0e2a" strokeWidth="1.2" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return <line key={i} x1={212 + Math.cos(a) * 8} y1={173 + Math.sin(a) * 8} x2={212 + Math.cos(a) * 14} y2={173 + Math.sin(a) * 14} stroke="#fdf6ff" strokeWidth="1" opacity="0.75" />;
        })}
        <circle cx="212" cy="173" r="6" fill="#fff3a8" opacity="0.9" />
        <circle cx="210" cy="171" r="2" fill="#fdf6ff" />
      </g>

      <g ref={footRef}>
        <path d="M 192 280 L 192 296 Q 192 304, 202 304 L 284 304 Q 298 304, 302 296 L 304 288 Q 302 280, 294 280 L 226 280 Z" fill="url(#apCrystalBody)" stroke="#2a1840" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M 200 282 L 290 282 L 286 290 L 206 290 Z" fill="url(#apCrystalFacet)" opacity="0.6" />
        <line x1="232" y1="280" x2="226" y2="304" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.5" />
        <line x1="268" y1="280" x2="276" y2="304" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.5" />
        <path d="M 196 301 L 296 301 L 294 304 L 200 304 Z" fill="#1a0e2a" opacity="0.7" />
        <polygon points="240,286 245,290 240,294 235,290" fill="#fff3a8" />
        <circle cx="298" cy="286" r="2" fill="#fff3a8" />
      </g>

      <g>
        <circle ref={glowRef} cx={ANKLE_X} cy={ANKLE_Y} r="14" fill="url(#apGlow)" />
        <circle cx={ANKLE_X} cy={ANKLE_Y} r="16" fill="url(#apGeode)" stroke="#1a0e2a" strokeWidth="1" />
        {Array.from({ length: 10 }).map((_, i) => {
          const a = (i / 10) * Math.PI * 2;
          return <line key={i} x1={ANKLE_X + Math.cos(a) * 6} y1={ANKLE_Y + Math.sin(a) * 6} x2={ANKLE_X + Math.cos(a) * 10} y2={ANKLE_Y + Math.sin(a) * 10} stroke="#fdf6ff" strokeWidth="0.9" opacity="0.7" />;
        })}
        <circle cx={ANKLE_X} cy={ANKLE_Y} r="3" fill="#fff3a8" />
      </g>

      <g opacity="0.5">
        <path d="M 320 240 A 70 70 0 0 1 320 330" fill="none" stroke="#9a72c4" strokeWidth="1.5" strokeDasharray="3 5" />
        <polygon ref={arrowUpRef} points="315,243 325,243 320,234" fill="#9a72c4" />
        <polygon ref={arrowDownRef} points="315,327 325,327 320,336" fill="#9a72c4" />
      </g>
    </svg>
  );
}

/* ─── Heel Raise SVG ─── */
function HeelRaiseSVG({ progress, className }: { progress: number; className?: string }) {
  const bodyRef = useRef<SVGGElement | null>(null);
  const footRef = useRef<SVGGElement | null>(null);
  const cueRef = useRef<SVGTextElement | null>(null);
  const arrowRef = useRef<SVGGElement | null>(null);

  const PIVOT_X = 218;
  const PIVOT_Y = 356;

  useEffect(() => {
    let e: number;
    if (progress < 0.35) e = progress / 0.35;
    else if (progress < 0.55) e = 1;
    else if (progress < 0.95) e = 1 - (progress - 0.55) / 0.4;
    else e = 0;
    const eased = e * e * (3 - 2 * e);
    const riseY = -18 * eased;
    if (bodyRef.current) bodyRef.current.setAttribute("transform", `translate(0 ${riseY})`);
    const footAngle = 22 * eased;
    if (footRef.current) footRef.current.setAttribute("transform", `rotate(${footAngle} ${PIVOT_X} ${PIVOT_Y})`);
    if (arrowRef.current) arrowRef.current.style.opacity = String(0.3 + eased * 0.55);
    if (cueRef.current) {
      const label = progress < 0.35 ? "RISE" : progress < 0.55 ? "HOLD" : "LOWER";
      if (cueRef.current.textContent !== label) cueRef.current.textContent = label;
    }
  }, [progress]);

  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="Animated crystal geode figure performing a heel raise">
      <defs>
        <linearGradient id="hrCrystalBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f3e7ff" /><stop offset="40%" stopColor="#b48cd6" /><stop offset="100%" stopColor="#4a2d6b" />
        </linearGradient>
        <linearGradient id="hrCrystalFacet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fdf6ff" /><stop offset="100%" stopColor="#8a63b3" stopOpacity="0.3" />
        </linearGradient>
        <radialGradient id="hrGeode" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fff4d6" /><stop offset="35%" stopColor="#d9a8ff" /><stop offset="75%" stopColor="#5a3a82" /><stop offset="100%" stopColor="#2a1840" />
        </radialGradient>
        <linearGradient id="hrStone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6b6256" /><stop offset="100%" stopColor="#2e2a24" />
        </linearGradient>
      </defs>

      <g>
        <rect x="20" y="358" width="360" height="22" rx="4" fill="url(#hrStone)" />
        {[40, 90, 150, 280, 340].map((x) => (
          <path key={x} d={`M ${x} 360 q 3 -4 6 0 q 3 -3 5 1`} fill="none" stroke="#6b8f4a" strokeWidth="1.4" strokeLinecap="round" />
        ))}
        <rect x="20" y="358" width="360" height="3" fill="#7a7060" opacity="0.6" />
      </g>

      <g ref={bodyRef}>
        <g>
          <circle cx="188" cy="74" r="16" fill="url(#hrGeode)" stroke="#1a0e2a" strokeWidth="1.2" />
          <path d="M 202 72 L 208 76 L 202 80 Z" fill="url(#hrCrystalBody)" stroke="#1a0e2a" strokeWidth="0.8" strokeLinejoin="round" />
          {Array.from({ length: 10 }).map((_, i) => { const a = (i / 10) * Math.PI * 2; return <line key={i} x1={188 + Math.cos(a) * 6} y1={74 + Math.sin(a) * 6} x2={188 + Math.cos(a) * 11} y2={74 + Math.sin(a) * 11} stroke="#fdf6ff" strokeWidth="0.9" opacity="0.7" />; })}
          <circle cx="188" cy="74" r="3.5" fill="#fff3a8" opacity="0.9" />
        </g>
        <g>
          <path d="M 178 94 L 198 94 L 202 174 L 176 174 Z" fill="url(#hrCrystalBody)" stroke="#2a1840" strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M 182 98 L 196 98 L 198 168 L 180 168 Z" fill="url(#hrCrystalFacet)" opacity="0.65" />
          <line x1="188" y1="100" x2="190" y2="170" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
          <Sparkle x={188} y={130} size={2.4} delay="0.4s" />
          <Sparkle x={186} y={156} size={2} delay="1.1s" />
        </g>
        <g>
          <path d="M 196 102 L 206 102 L 208 168 L 198 168 Z" fill="url(#hrCrystalBody)" stroke="#2a1840" strokeWidth="1" strokeLinejoin="round" opacity="0.85" />
          <circle cx="203" cy="174" r="6" fill="url(#hrGeode)" stroke="#1a0e2a" strokeWidth="0.9" />
        </g>
        <g>
          <circle cx="188" cy="180" r="13" fill="url(#hrGeode)" stroke="#1a0e2a" strokeWidth="1.2" />
          {Array.from({ length: 10 }).map((_, i) => { const a = (i / 10) * Math.PI * 2; return <line key={i} x1={188 + Math.cos(a) * 5} y1={180 + Math.sin(a) * 5} x2={188 + Math.cos(a) * 9} y2={180 + Math.sin(a) * 9} stroke="#fdf6ff" strokeWidth="0.9" opacity="0.75" />; })}
          <circle cx="188" cy="180" r="3" fill="#fff3a8" opacity="0.9" />
        </g>
        <g>
          <path d="M 180 182 L 198 182 L 200 262 L 178 262 Z" fill="url(#hrCrystalBody)" stroke="#2a1840" strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M 184 186 L 196 186 L 198 258 L 182 258 Z" fill="url(#hrCrystalFacet)" opacity="0.65" />
          <line x1="190" y1="188" x2="192" y2="258" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
          <g>
            <circle cx="189" cy="262" r="11" fill="url(#hrGeode)" stroke="#1a0e2a" strokeWidth="1.2" />
            {Array.from({ length: 10 }).map((_, i) => { const a = (i / 10) * Math.PI * 2; return <line key={i} x1={189 + Math.cos(a) * 4} y1={262 + Math.sin(a) * 4} x2={189 + Math.cos(a) * 8} y2={262 + Math.sin(a) * 8} stroke="#fdf6ff" strokeWidth="0.9" opacity="0.75" />; })}
            <circle cx="189" cy="262" r="3" fill="#fff3a8" opacity="0.9" />
          </g>
          <path d="M 182 264 L 198 264 L 196 342 L 180 342 Z" fill="url(#hrCrystalBody)" stroke="#2a1840" strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M 185 268 L 196 268 L 194 338 L 183 338 Z" fill="url(#hrCrystalFacet)" opacity="0.65" />
          <line x1="190" y1="270" x2="188" y2="338" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
          <Sparkle x={188} y={220} size={2.4} delay="0.3s" />
          <Sparkle x={188} y={305} size={2.2} delay="0.9s" />
          <g>
            <circle cx="188" cy="344" r="9" fill="url(#hrGeode)" stroke="#1a0e2a" strokeWidth="1" />
            {Array.from({ length: 8 }).map((_, i) => { const a = (i / 8) * Math.PI * 2; return <line key={i} x1={188 + Math.cos(a) * 3} y1={344 + Math.sin(a) * 3} x2={188 + Math.cos(a) * 6} y2={344 + Math.sin(a) * 6} stroke="#fdf6ff" strokeWidth="0.8" opacity="0.7" />; })}
          </g>
        </g>
      </g>

      <g ref={footRef}>
        <path d="M 160 356 Q 158 348 168 346 L 200 344 Q 220 344 232 350 Q 240 354 238 360 L 168 360 Q 160 360 160 356 Z" fill="url(#hrCrystalBody)" stroke="#2a1840" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M 172 350 Q 200 348 228 352" fill="none" stroke="#fdf6ff" strokeWidth="0.8" opacity="0.55" />
        <path d="M 160 356 Q 162 352 168 352" fill="none" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.5" />
        <line x1="218" y1="346" x2="218" y2="360" stroke="#2a1840" strokeWidth="0.8" opacity="0.5" />
      </g>

      <g ref={arrowRef} opacity="0.3">
        <path d="M 330 300 L 340 318 L 334 318 L 334 330 L 326 330 L 326 318 L 320 318 Z" fill="url(#hrStone)" stroke="#1a140a" strokeWidth="1" strokeLinejoin="round" />
        <path d="M 330 302 L 337 316 L 332 316 L 332 328 L 328 328 L 328 316 L 323 316 Z" fill="#8a8070" opacity="0.55" />
      </g>

      <text ref={cueRef} x="200" y="40" textAnchor="middle" fontSize="22" fontWeight="600" letterSpacing="6" fill="#e8d4ff" style={{ fontFamily: "ui-serif, Georgia, serif" }}>RISE</text>
    </svg>
  );
}

/* ─── Progress driver with play/pause/speed/reset ─── */
function useAnimationProgress(cycleDurationMs = 3000, playing = true, speed = 1) {
  const [progress, setProgress] = useState(0);
  const accumulated = useRef(0);
  const lastTs = useRef<number | null>(null);

  const reset = () => { accumulated.current = 0; lastTs.current = null; setProgress(0); };

  useEffect(() => {
    if (!playing) { lastTs.current = null; return; }
    let raf: number;
    function tick(ts: number) {
      if (lastTs.current !== null) {
        accumulated.current += (ts - lastTs.current) * speed;
      }
      lastTs.current = ts;
      setProgress((accumulated.current % cycleDurationMs) / cycleDurationMs);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, speed, cycleDurationMs]);

  return { progress, reset };
}

const SPEEDS = [{ label: "0.5×", value: 0.5 }, { label: "1×", value: 1 }, { label: "1.5×", value: 1.5 }];

/* ─── Player controls UI ─── */
function PlayerControls({ playing, onToggle, onReset, speed, onSpeed }: {
  playing: boolean; onToggle: () => void; onReset: () => void;
  speed: number; onSpeed: (s: number) => void;
}) {
  return (
    <div className="flex flex-col gap-3 px-4 py-4" style={{ background: "#f5eddf", borderTop: "1px solid #e0d0bc" }}>
      <div className="flex gap-2">
        <button
          onClick={onToggle}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 font-semibold"
          style={{ background: "#40513b", color: "#fdf8f0", fontSize: "1rem", border: "none", minHeight: "52px" }}
        >
          {playing ? "⏸ Pause" : "▶ Play"}
        </button>
        <button
          onClick={onReset}
          className="flex items-center justify-center rounded-xl px-4"
          style={{ background: "#e0d8cc", color: "#3d3123", border: "none", fontSize: "1.2rem", minHeight: "52px" }}
          aria-label="Restart"
        >
          ↺
        </button>
      </div>
      <div className="flex items-center justify-between">
        <span style={{ fontSize: "0.85rem", color: "#8b6355", fontWeight: 600, letterSpacing: "0.05em" }}>SPEED</span>
        <div className="flex rounded-xl overflow-hidden" style={{ border: "1px solid #d4c4ac" }}>
          {SPEEDS.map((s) => (
            <button
              key={s.value}
              onClick={() => onSpeed(s.value)}
              style={{
                padding: "6px 14px",
                fontSize: "0.9rem",
                fontWeight: speed === s.value ? 700 : 400,
                background: speed === s.value ? "#40513b" : "#fdf8f0",
                color: speed === s.value ? "#fdf8f0" : "#5c4033",
                border: "none",
                cursor: "pointer",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Step Ups crystal SVG ─── */
function GeodeMedallion({ r, inner = 4, outer = 8, count = 10 }: { r: number; inner?: number; outer?: number; count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const a = (i / count) * Math.PI * 2;
        return <line key={i} x1={Math.cos(a) * inner} y1={Math.sin(a) * inner} x2={Math.cos(a) * outer} y2={Math.sin(a) * outer} stroke="#fdf6ff" strokeWidth="0.9" opacity="0.75" />;
      })}
      <circle r={Math.max(2, r * 0.22)} fill="#fff3a8" opacity="0.9" />
    </>
  );
}

type SuPose = {
  hip: [number, number];
  rKnee: [number, number]; rAnkle: [number, number]; rFoot: [number, number];
  lKnee: [number, number]; lAnkle: [number, number]; lFoot: [number, number];
  lHeelLift: number;
};

const SU_STAND: SuPose = { hip: [200, 180], rKnee: [216, 262], rAnkle: [216, 340], rFoot: [216, 356], lKnee: [184, 262], lAnkle: [184, 340], lFoot: [184, 356], lHeelLift: 0 };
const SU_LIFT: SuPose  = { hip: [206, 188], rKnee: [248, 232], rAnkle: [254, 296], rFoot: [256, 320], lKnee: [186, 268], lAnkle: [186, 340], lFoot: [186, 356], lHeelLift: 0 };
const SU_PLANT: SuPose = { hip: [216, 188], rKnee: [286, 252], rAnkle: [292, 318], rFoot: [292, 320], lKnee: [186, 262], lAnkle: [186, 338], lFoot: [186, 356], lHeelLift: 0.85 };
const SU_APEX: SuPose  = { hip: [252, 146], rKnee: [276, 226], rAnkle: [292, 318], rFoot: [292, 320], lKnee: [232, 226], lAnkle: [214, 296], lFoot: [212, 312], lHeelLift: 0 };
const SU_TOP: SuPose   = { hip: [264, 144], rKnee: [280, 226], rAnkle: [292, 318], rFoot: [292, 320], lKnee: [248, 226], lAnkle: [254, 318], lFoot: [254, 320], lHeelLift: 0 };
const SU_SETTLE: SuPose = { hip: [264, 152], rKnee: [280, 232], rAnkle: [292, 318], rFoot: [292, 320], lKnee: [248, 232], lAnkle: [254, 318], lFoot: [254, 320], lHeelLift: 0 };

function suLerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function suLerpPt(a: [number, number], b: [number, number], t: number): [number, number] { return [suLerp(a[0], b[0], t), suLerp(a[1], b[1], t)]; }
function suLerpPose(a: SuPose, b: SuPose, t: number): SuPose {
  return {
    hip: suLerpPt(a.hip, b.hip, t), rKnee: suLerpPt(a.rKnee, b.rKnee, t), rAnkle: suLerpPt(a.rAnkle, b.rAnkle, t), rFoot: suLerpPt(a.rFoot, b.rFoot, t),
    lKnee: suLerpPt(a.lKnee, b.lKnee, t), lAnkle: suLerpPt(a.lAnkle, b.lAnkle, t), lFoot: suLerpPt(a.lFoot, b.lFoot, t),
    lHeelLift: suLerp(a.lHeelLift, b.lHeelLift, t),
  };
}
const suEase = (t: number) => t * t * (3 - 2 * t);

const SU_KEYS: Array<[number, SuPose]> = [
  [0.00, SU_STAND], [0.15, SU_LIFT], [0.30, SU_PLANT], [0.45, SU_APEX],
  [0.55, SU_TOP], [0.62, SU_SETTLE], [0.68, SU_TOP],
  [0.78, SU_APEX], [0.88, SU_PLANT], [0.95, SU_LIFT], [1.00, SU_STAND],
];

function suPoseAt(p: number): SuPose {
  for (let i = 0; i < SU_KEYS.length - 1; i++) {
    const [t0, a] = SU_KEYS[i]; const [t1, b] = SU_KEYS[i + 1];
    if (p <= t1) { const u = suEase((p - t0) / Math.max(1e-6, t1 - t0)); return suLerpPose(a, b, u); }
  }
  return SU_KEYS[SU_KEYS.length - 1][1];
}

function suLimbQuad(a: [number, number], b: [number, number], w: number) {
  const dx = b[0] - a[0]; const dy = b[1] - a[1]; const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len; const ny = dx / len;
  const p1 = [a[0] + nx * w, a[1] + ny * w]; const p2 = [b[0] + nx * w, b[1] + ny * w];
  const p3 = [b[0] - nx * w, b[1] - ny * w]; const p4 = [a[0] - nx * w, a[1] - ny * w];
  return `M ${p1[0]} ${p1[1]} L ${p2[0]} ${p2[1]} L ${p3[0]} ${p3[1]} L ${p4[0]} ${p4[1]} Z`;
}

function suHalfOval(cx: number, cy: number, rx: number, ry: number, tilt = 0) {
  const cos = Math.cos(tilt), sin = Math.sin(tilt);
  const tx = (x: number, y: number): [number, number] => { const dx = x - cx, dy = y - cy; return [cx + dx * cos - dy * sin, cy + dx * sin + dy * cos]; };
  const [l1x, l1y] = tx(cx - rx, cy); const [r1x, r1y] = tx(cx + rx, cy);
  const [tx1, ty1] = tx(cx - rx, cy - ry * 1.2); const [tx2, ty2] = tx(cx + rx, cy - ry * 1.2);
  return `M ${l1x} ${l1y} C ${tx1} ${ty1} ${tx2} ${ty2} ${r1x} ${r1y} Z`;
}

function StepUpsSVG({ progress, className }: { progress: number; className?: string }) {
  const cueRef = useRef<SVGTextElement | null>(null);
  const headRef = useRef<SVGGElement | null>(null);
  const torsoRef = useRef<SVGPathElement | null>(null);
  const torsoFacetRef = useRef<SVGPathElement | null>(null);
  const torsoLineRef = useRef<SVGLineElement | null>(null);
  const hipRef = useRef<SVGGElement | null>(null);
  const rThighRef = useRef<SVGPathElement | null>(null);
  const rShinRef = useRef<SVGPathElement | null>(null);
  const rThighFacetRef = useRef<SVGPathElement | null>(null);
  const rShinFacetRef = useRef<SVGPathElement | null>(null);
  const rKneeRef = useRef<SVGGElement | null>(null);
  const rAnkleRef = useRef<SVGGElement | null>(null);
  const rFootRef = useRef<SVGPathElement | null>(null);
  const rFootFacetRef = useRef<SVGPathElement | null>(null);
  const lThighRef = useRef<SVGPathElement | null>(null);
  const lShinRef = useRef<SVGPathElement | null>(null);
  const lThighFacetRef = useRef<SVGPathElement | null>(null);
  const lShinFacetRef = useRef<SVGPathElement | null>(null);
  const lKneeRef = useRef<SVGGElement | null>(null);
  const lAnkleRef = useRef<SVGGElement | null>(null);
  const lFootRef = useRef<SVGPathElement | null>(null);
  const lFootFacetRef = useRef<SVGPathElement | null>(null);
  const rThighEdgeRef = useRef<SVGPathElement | null>(null);
  const rShinEdgeRef = useRef<SVGPathElement | null>(null);
  const lThighEdgeRef = useRef<SVGPathElement | null>(null);
  const lShinEdgeRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const pose = suPoseAt(progress);
    const [hx, hy] = pose.hip;
    const rHip: [number, number] = [hx + 8, hy + 2];
    const lHip: [number, number] = [hx - 8, hy + 2];

    if (rThighRef.current) rThighRef.current.setAttribute("d", suLimbQuad(rHip, pose.rKnee, 12));
    if (rShinRef.current) rShinRef.current.setAttribute("d", suLimbQuad(pose.rKnee, pose.rAnkle, 11));
    if (lThighRef.current) lThighRef.current.setAttribute("d", suLimbQuad(lHip, pose.lKnee, 12));
    if (lShinRef.current) lShinRef.current.setAttribute("d", suLimbQuad(pose.lKnee, pose.lAnkle, 11));

    function setLimbFacet(el: SVGPathElement | null, a: [number, number], b: [number, number], w: number) {
      if (!el) return;
      const mx = (a[0] + b[0]) * 0.5; const my = (a[1] + b[1]) * 0.5;
      const dx = b[0] - a[0]; const dy = b[1] - a[1]; const len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len; const ny = dx / len;
      const d = `M ${mx - nx * w * 0.3} ${my - ny * w * 0.3} L ${mx + nx * w * 0.6} ${my + ny * w * 0.6} L ${mx + nx * w * 0.3} ${my + ny * w * 0.3} L ${mx - nx * w * 0.6} ${my - ny * w * 0.6} Z`;
      el.setAttribute("d", d);
    }
    setLimbFacet(rThighFacetRef.current, rHip, pose.rKnee, 10);
    setLimbFacet(rShinFacetRef.current, pose.rKnee, pose.rAnkle, 9);
    setLimbFacet(lThighFacetRef.current, lHip, pose.lKnee, 10);
    setLimbFacet(lShinFacetRef.current, pose.lKnee, pose.lAnkle, 9);

    function setLimbEdges(el: SVGPathElement | null, a: [number, number], b: [number, number], w: number) {
      if (!el) return;
      const dx = b[0] - a[0]; const dy = b[1] - a[1]; const len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len; const ny = dx / len;
      const sa: [number, number] = [a[0] + (dx / len) * 6, a[1] + (dy / len) * 6];
      const sb: [number, number] = [b[0] - (dx / len) * 6, b[1] - (dy / len) * 6];
      const off = w * 0.55;
      const c1 = `M ${sa[0]} ${sa[1]} L ${sb[0]} ${sb[1]}`;
      const c2 = `M ${sa[0] + nx * off} ${sa[1] + ny * off} L ${sb[0] - nx * off} ${sb[1] - ny * off}`;
      const c3 = `M ${sa[0] - nx * off} ${sa[1] - ny * off} L ${sb[0] + nx * off} ${sb[1] + ny * off}`;
      el.setAttribute("d", `${c1} ${c2} ${c3}`);
    }
    setLimbEdges(rThighEdgeRef.current, rHip, pose.rKnee, 12);
    setLimbEdges(rShinEdgeRef.current, pose.rKnee, pose.rAnkle, 11);
    setLimbEdges(lThighEdgeRef.current, lHip, pose.lKnee, 12);
    setLimbEdges(lShinEdgeRef.current, pose.lKnee, pose.lAnkle, 11);

    if (rKneeRef.current) rKneeRef.current.setAttribute("transform", `translate(${pose.rKnee[0]} ${pose.rKnee[1]})`);
    if (rAnkleRef.current) rAnkleRef.current.setAttribute("transform", `translate(${pose.rAnkle[0]} ${pose.rAnkle[1]})`);
    if (lKneeRef.current) lKneeRef.current.setAttribute("transform", `translate(${pose.lKnee[0]} ${pose.lKnee[1]})`);
    if (lAnkleRef.current) lAnkleRef.current.setAttribute("transform", `translate(${pose.lAnkle[0]} ${pose.lAnkle[1]})`);

    if (rFootRef.current) rFootRef.current.setAttribute("d", suHalfOval(pose.rFoot[0], pose.rFoot[1], 24, 9));
    if (rFootFacetRef.current) rFootFacetRef.current.setAttribute("d", suHalfOval(pose.rFoot[0], pose.rFoot[1] - 1, 16, 5));
    const lTilt = -pose.lHeelLift * 0.5;
    if (lFootRef.current) lFootRef.current.setAttribute("d", suHalfOval(pose.lFoot[0], pose.lFoot[1], 24, 9, lTilt));
    if (lFootFacetRef.current) lFootFacetRef.current.setAttribute("d", suHalfOval(pose.lFoot[0], pose.lFoot[1] - 1, 16, 5, lTilt));

    const sx = hx, sy = hy - 88;
    const torsoD = `M ${sx - 16} ${sy} L ${sx + 16} ${sy} L ${hx + 18} ${hy - 8} L ${hx - 18} ${hy - 8} Z`;
    if (torsoRef.current) torsoRef.current.setAttribute("d", torsoD);
    if (torsoFacetRef.current) torsoFacetRef.current.setAttribute("d", `M ${sx - 12} ${sy + 4} L ${sx + 12} ${sy + 4} L ${hx + 12} ${hy - 12} L ${hx - 12} ${hy - 12} Z`);
    if (torsoLineRef.current) { torsoLineRef.current.setAttribute("x1", String(sx)); torsoLineRef.current.setAttribute("y1", String(sy + 6)); torsoLineRef.current.setAttribute("x2", String(hx)); torsoLineRef.current.setAttribute("y2", String(hy - 10)); }
    if (headRef.current) headRef.current.setAttribute("transform", `translate(${hx - 186} ${sy - 18 - 74})`);
    if (hipRef.current) hipRef.current.setAttribute("transform", `translate(${hx} ${hy})`);

    if (cueRef.current) {
      const label = progress < 0.15 ? "READY" : progress < 0.30 ? "LIFT" : progress < 0.45 ? "PLANT" : progress < 0.62 ? "DRIVE UP" : progress < 0.70 ? "STAND" : "STEP DOWN";
      if (cueRef.current.textContent !== label) cueRef.current.textContent = label;
    }
  }, [progress]);

  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="Animated crystal geode figure performing step-ups">
      <defs>
        <linearGradient id="suCrystalBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f3e7ff" />
          <stop offset="40%" stopColor="#b48cd6" />
          <stop offset="100%" stopColor="#4a2d6b" />
        </linearGradient>
        <linearGradient id="suCrystalFacet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fdf6ff" />
          <stop offset="100%" stopColor="#8a63b3" stopOpacity="0.3" />
        </linearGradient>
        <radialGradient id="suGeode" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fff4d6" />
          <stop offset="35%" stopColor="#d9a8ff" />
          <stop offset="75%" stopColor="#5a3a82" />
          <stop offset="100%" stopColor="#2a1840" />
        </radialGradient>
        <linearGradient id="suStone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6b6256" />
          <stop offset="100%" stopColor="#2e2a24" />
        </linearGradient>
        <linearGradient id="suStep" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8a7a64" />
          <stop offset="100%" stopColor="#3e342a" />
        </linearGradient>
      </defs>

      {/* Ground */}
      <g>
        <rect x="20" y="358" width="360" height="22" rx="4" fill="url(#suStone)" />
        <rect x="20" y="358" width="360" height="3" fill="#7a7060" opacity="0.6" />
        {[40, 90, 340].map((x) => (
          <path key={x} d={`M ${x} 360 q 3 -4 6 0 q 3 -3 5 1`} fill="none" stroke="#6b8f4a" strokeWidth="1.4" strokeLinecap="round" />
        ))}
      </g>

      {/* Step platform */}
      <g>
        <rect x="248" y="320" width="120" height="40" rx="3" fill="url(#suStep)" stroke="#1a140a" strokeWidth="1.2" />
        <rect x="248" y="320" width="120" height="6" fill="#a89878" opacity="0.6" />
        {[262, 296, 332, 358].map((x) => (
          <path key={x} d={`M ${x} 320 q 3 -4 6 0 q 3 -3 5 1`} fill="none" stroke="#6b8f4a" strokeWidth="1.3" strokeLinecap="round" />
        ))}
      </g>

      {/* LEFT (trailing/support) leg */}
      <g>
        <path ref={lThighRef} d="" fill="url(#suCrystalBody)" stroke="#2a1840" strokeWidth="1.2" strokeLinejoin="round" />
        <path ref={lThighFacetRef} d="" fill="url(#suCrystalFacet)" opacity="0.55" />
        <path ref={lThighEdgeRef} d="" fill="none" stroke="#fdf6ff" strokeWidth="0.8" opacity="0.55" strokeLinecap="round" />
        <path ref={lShinRef} d="" fill="url(#suCrystalBody)" stroke="#2a1840" strokeWidth="1.2" strokeLinejoin="round" />
        <path ref={lShinFacetRef} d="" fill="url(#suCrystalFacet)" opacity="0.55" />
        <path ref={lShinEdgeRef} d="" fill="none" stroke="#fdf6ff" strokeWidth="0.8" opacity="0.55" strokeLinecap="round" />
        <path ref={lFootRef} d="" fill="url(#suCrystalBody)" stroke="#2a1840" strokeWidth="1.1" />
        <path ref={lFootFacetRef} d="" fill="url(#suCrystalFacet)" opacity="0.55" />
        <g ref={lKneeRef}>
          <circle r="11" fill="url(#suGeode)" stroke="#1a0e2a" strokeWidth="1.1" />
          <GeodeMedallion r={11} inner={4} outer={8} count={10} />
        </g>
        <g ref={lAnkleRef}>
          <circle r="9" fill="url(#suGeode)" stroke="#1a0e2a" strokeWidth="1" />
          <GeodeMedallion r={9} inner={3} outer={6} count={8} />
        </g>
      </g>

      {/* RIGHT (lead) leg */}
      <g>
        <path ref={rThighRef} d="" fill="url(#suCrystalBody)" stroke="#2a1840" strokeWidth="1.2" strokeLinejoin="round" />
        <path ref={rThighFacetRef} d="" fill="url(#suCrystalFacet)" opacity="0.55" />
        <path ref={rThighEdgeRef} d="" fill="none" stroke="#fdf6ff" strokeWidth="0.8" opacity="0.55" strokeLinecap="round" />
        <path ref={rShinRef} d="" fill="url(#suCrystalBody)" stroke="#2a1840" strokeWidth="1.2" strokeLinejoin="round" />
        <path ref={rShinFacetRef} d="" fill="url(#suCrystalFacet)" opacity="0.55" />
        <path ref={rShinEdgeRef} d="" fill="none" stroke="#fdf6ff" strokeWidth="0.8" opacity="0.55" strokeLinecap="round" />
        <path ref={rFootRef} d="" fill="url(#suCrystalBody)" stroke="#2a1840" strokeWidth="1.1" />
        <path ref={rFootFacetRef} d="" fill="url(#suCrystalFacet)" opacity="0.55" />
        <g ref={rKneeRef}>
          <circle r="11" fill="url(#suGeode)" stroke="#1a0e2a" strokeWidth="1.1" />
          <GeodeMedallion r={11} inner={4} outer={8} count={10} />
        </g>
        <g ref={rAnkleRef}>
          <circle r="9" fill="url(#suGeode)" stroke="#1a0e2a" strokeWidth="1" />
          <GeodeMedallion r={9} inner={3} outer={6} count={8} />
        </g>
        <Sparkle x={220} y={280} size={2.2} delay="0.7s" />
      </g>

      {/* TORSO */}
      <g>
        <path ref={torsoRef} d="" fill="url(#suCrystalBody)" stroke="#2a1840" strokeWidth="1.2" strokeLinejoin="round" />
        <path ref={torsoFacetRef} d="" fill="url(#suCrystalFacet)" opacity="0.65" />
        <line ref={torsoLineRef} stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        <Sparkle x={200} y={130} size={2.6} delay="0.4s" />
        <Sparkle x={194} y={154} size={2} delay="1.1s" />
      </g>

      {/* HEAD */}
      <g ref={headRef}>
        <circle cx="186" cy="74" r="16" fill="url(#suGeode)" stroke="#1a0e2a" strokeWidth="1.2" />
        {Array.from({ length: 10 }).map((_, i) => {
          const a = (i / 10) * Math.PI * 2;
          return <line key={i} x1={186 + Math.cos(a) * 6} y1={74 + Math.sin(a) * 6} x2={186 + Math.cos(a) * 11} y2={74 + Math.sin(a) * 11} stroke="#fdf6ff" strokeWidth="0.9" opacity="0.7" />;
        })}
        <circle cx="186" cy="74" r="3.5" fill="#fff3a8" opacity="0.9" />
      </g>

      {/* HIP joint */}
      <g ref={hipRef}>
        <circle r="14" fill="url(#suGeode)" stroke="#1a0e2a" strokeWidth="1.2" />
        <GeodeMedallion r={14} inner={5} outer={9} count={10} />
      </g>

      <text ref={cueRef} x="200" y="40" textAnchor="middle" fontSize="20" fontWeight="600" letterSpacing="5" fill="#e8d4ff" style={{ fontFamily: "ui-serif, Georgia, serif" }}>
        READY
      </text>
    </svg>
  );
}

/* ─── Terminal Knee Extension crystal SVG ─── */
function TerminalKneeExtensionSVG({ progress, className }: { progress: number; className?: string }) {
  const thighRef = useRef<SVGGElement | null>(null);
  const shinRef = useRef<SVGGElement | null>(null);
  const bodyRef = useRef<SVGGElement | null>(null);
  const trunkRef = useRef<SVGGElement | null>(null);
  const bandRef = useRef<SVGPathElement | null>(null);
  const cueRef = useRef<SVGTextElement | null>(null);

  useEffect(() => {
    let bent: number;
    if (progress < 0.4) bent = 1 - progress / 0.4;
    else if (progress < 0.6) bent = 0;
    else if (progress < 0.95) bent = (progress - 0.6) / 0.35;
    else bent = 1;
    const eased = bent * bent * (3 - 2 * bent);

    const maxDeg = 18;
    const thetaDeg = maxDeg * eased;
    const thetaRad = (thetaDeg * Math.PI) / 180;
    const legLen = 84;
    const dropY = 2 * legLen * (1 - Math.cos(thetaRad));
    const leanX = -22 * eased;

    if (bodyRef.current) bodyRef.current.setAttribute("transform", `translate(0 ${dropY})`);
    if (trunkRef.current) trunkRef.current.setAttribute("transform", `translate(${leanX} 0)`);
    if (thighRef.current) thighRef.current.setAttribute("transform", `rotate(${-thetaDeg} 200 178)`);
    if (shinRef.current) shinRef.current.setAttribute("transform", `rotate(${thetaDeg} 200 346)`);

    if (bandRef.current) {
      const kneeX = 200 + legLen * Math.sin(thetaRad);
      const kneeY = 346 - legLen * Math.cos(thetaRad);
      const topY = kneeY - 4; const botY = kneeY + 4;
      const d = `M 320 306 Q ${(320 + kneeX + 15) / 2} ${(306 + topY) / 2 - 8} ${kneeX + 15} ${topY} Q ${kneeX} ${topY - 2} ${kneeX + 15} ${topY - 8} Q ${kneeX + 30} ${(topY + botY) / 2} ${kneeX + 15} ${botY + 8} Q ${kneeX} ${botY + 2} ${kneeX + 15} ${botY} Q ${(320 + kneeX + 15) / 2} ${(312 + botY) / 2 + 8} 320 312 Z`;
      bandRef.current.setAttribute("d", d);
      bandRef.current.setAttribute("opacity", String(0.55 + (1 - eased) * 0.35));
    }

    if (cueRef.current) {
      const label = progress < 0.4 ? "EXTEND" : progress < 0.6 ? "HOLD" : "RELEASE";
      if (cueRef.current.textContent !== label) cueRef.current.textContent = label;
    }
  }, [progress]);

  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="Animated crystal geode figure performing terminal knee extension">
      <defs>
        <linearGradient id="tkeCrystalBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f3e7ff" />
          <stop offset="40%" stopColor="#b48cd6" />
          <stop offset="100%" stopColor="#4a2d6b" />
        </linearGradient>
        <linearGradient id="tkeCrystalFacet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fdf6ff" />
          <stop offset="100%" stopColor="#8a63b3" stopOpacity="0.3" />
        </linearGradient>
        <radialGradient id="tkeGeode" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fff4d6" />
          <stop offset="35%" stopColor="#d9a8ff" />
          <stop offset="75%" stopColor="#5a3a82" />
          <stop offset="100%" stopColor="#2a1840" />
        </radialGradient>
        <linearGradient id="tkeStone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6b6256" />
          <stop offset="100%" stopColor="#2e2a24" />
        </linearGradient>
        <linearGradient id="tkeBand" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#c25a4a" />
          <stop offset="50%" stopColor="#e88a6f" />
          <stop offset="100%" stopColor="#c25a4a" />
        </linearGradient>
      </defs>

      {/* Ground */}
      <g>
        <rect x="20" y="358" width="360" height="22" rx="4" fill="url(#tkeStone)" />
        {[40, 90, 150, 210, 280, 340].map((x) => (
          <path key={x} d={`M ${x} 360 q 3 -4 6 0 q 3 -3 5 1`} fill="none" stroke="#6b8f4a" strokeWidth="1.4" strokeLinecap="round" />
        ))}
        <rect x="20" y="358" width="360" height="3" fill="#7a7060" opacity="0.6" />
      </g>

      {/* Anchor post */}
      <g>
        <rect x="320" y="300" width="14" height="58" fill="url(#tkeStone)" stroke="#1a140a" strokeWidth="1" />
        <ellipse cx="327" cy="300" rx="9" ry="4" fill="#8a8070" />
      </g>

      {/* Resistance band */}
      <path ref={bandRef} d="M 320 306 Q 270 268 215 260 Q 200 258 215 252 Q 240 258 215 266 Q 270 276 320 312 Z" fill="url(#tkeBand)" stroke="#7a2f24" strokeWidth="1" opacity="0.7" />

      {/* BODY */}
      <g ref={bodyRef}>
        {/* Support leg */}
        <g opacity="0.4">
          <path d="M 184 180 L 198 180 L 178 340 L 162 340 Z" fill="url(#tkeCrystalBody)" stroke="#2a1840" strokeWidth="1" strokeLinejoin="round" />
          <circle cx="180" cy="262" r="9" fill="url(#tkeGeode)" stroke="#1a0e2a" strokeWidth="1" />
        </g>

        <g ref={trunkRef}>
          {/* TORSO */}
          <g>
            <path d="M 186 92 L 214 92 L 218 172 L 182 172 Z" fill="url(#tkeCrystalBody)" stroke="#2a1840" strokeWidth="1.2" strokeLinejoin="round" />
            <path d="M 190 96 L 210 96 L 212 164 L 192 164 Z" fill="url(#tkeCrystalFacet)" opacity="0.65" />
            <line x1="196" y1="100" x2="198" y2="166" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
            <line x1="206" y1="100" x2="208" y2="166" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
            <Sparkle x={200} y={120} size={2.4} delay="0.4s" />
          </g>
          {/* HEAD */}
          <g>
            <circle cx="200" cy="74" r="16" fill="url(#tkeGeode)" stroke="#1a0e2a" strokeWidth="1.2" />
            {Array.from({ length: 10 }).map((_, i) => {
              const a = (i / 10) * Math.PI * 2;
              return <line key={i} x1={200 + Math.cos(a) * 6} y1={74 + Math.sin(a) * 6} x2={200 + Math.cos(a) * 11} y2={74 + Math.sin(a) * 11} stroke="#fdf6ff" strokeWidth="0.9" opacity="0.7" />;
            })}
            <circle cx="200" cy="74" r="3.5" fill="#fff3a8" opacity="0.9" />
          </g>
        </g>

        {/* THIGH */}
        <g ref={thighRef}>
          <path d="M 186 178 L 214 178 L 216 262 L 184 262 Z" fill="url(#tkeCrystalBody)" stroke="#2a1840" strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M 190 182 L 210 182 L 212 258 L 190 258 Z" fill="url(#tkeCrystalFacet)" opacity="0.65" />
          <line x1="200" y1="186" x2="200" y2="258" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        </g>

        {/* HIP */}
        <g>
          <circle cx="200" cy="180" r="14" fill="url(#tkeGeode)" stroke="#1a0e2a" strokeWidth="1.2" />
          {Array.from({ length: 10 }).map((_, i) => {
            const a = (i / 10) * Math.PI * 2;
            return <line key={i} x1={200 + Math.cos(a) * 5} y1={180 + Math.sin(a) * 5} x2={200 + Math.cos(a) * 9} y2={180 + Math.sin(a) * 9} stroke="#fdf6ff" strokeWidth="0.9" opacity="0.75" />;
          })}
          <circle cx="200" cy="180" r="3" fill="#fff3a8" opacity="0.9" />
        </g>
      </g>

      {/* Support foot */}
      <ellipse cx="170" cy="354" rx="20" ry="9" fill="url(#tkeCrystalBody)" stroke="#2a1840" strokeWidth="1" opacity="0.4" />

      {/* SHIN + foot — rotates around ankle (planted) */}
      <g ref={shinRef}>
        <path d="M 186 262 L 214 262 L 216 340 L 184 340 Z" fill="url(#tkeCrystalBody)" stroke="#2a1840" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M 190 266 L 210 266 L 212 334 L 190 334 Z" fill="url(#tkeCrystalFacet)" opacity="0.65" />
        <line x1="200" y1="270" x2="200" y2="332" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        <Sparkle x={200} y={300} size={2.2} delay="0.9s" />
        <ellipse cx="206" cy="358" rx="26" ry="11" fill="url(#tkeCrystalBody)" stroke="#2a1840" strokeWidth="1.1" />
        <ellipse cx="206" cy="356" rx="18" ry="6" fill="url(#tkeCrystalFacet)" opacity="0.55" />
        <g>
          <circle cx="200" cy="346" r="10" fill="url(#tkeGeode)" stroke="#1a0e2a" strokeWidth="1" />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2;
            return <line key={i} x1={200 + Math.cos(a) * 3} y1={346 + Math.sin(a) * 3} x2={200 + Math.cos(a) * 6} y2={346 + Math.sin(a) * 6} stroke="#fdf6ff" strokeWidth="0.8" opacity="0.7" />;
          })}
        </g>
        <g>
          <circle cx="200" cy="262" r="12" fill="url(#tkeGeode)" stroke="#1a0e2a" strokeWidth="1.2" />
          {Array.from({ length: 10 }).map((_, i) => {
            const a = (i / 10) * Math.PI * 2;
            return <line key={i} x1={200 + Math.cos(a) * 4} y1={262 + Math.sin(a) * 4} x2={200 + Math.cos(a) * 8} y2={262 + Math.sin(a) * 8} stroke="#fdf6ff" strokeWidth="0.9" opacity="0.75" />;
          })}
          <circle cx="200" cy="262" r="3" fill="#fff3a8" opacity="0.9" />
        </g>
      </g>

      <text ref={cueRef} x="200" y="40" textAnchor="middle" fontSize="22" fontWeight="600" letterSpacing="6" fill="#e8d4ff" style={{ fontFamily: "ui-serif, Georgia, serif" }}>
        EXTEND
      </text>
    </svg>
  );
}

/* ─── Straight Leg Raise crystal SVG ─── */
function StraightLegRaiseSVG({ progress, className }: { progress: number; className?: string }) {
  const legRef = useRef<SVGGElement | null>(null);
  const cueRef = useRef<SVGTextElement | null>(null);
  const arrowRef = useRef<SVGGElement | null>(null);

  useEffect(() => {
    let e: number;
    if (progress < 0.35) e = progress / 0.35;
    else if (progress < 0.55) e = 1;
    else if (progress < 0.95) e = 1 - (progress - 0.55) / 0.4;
    else e = 0;

    const eased = e * e * (3 - 2 * e);
    const angle = -70 * eased;

    if (legRef.current) legRef.current.setAttribute("transform", `rotate(${angle} 100 290)`);
    if (arrowRef.current) arrowRef.current.style.opacity = String(0.25 + eased * 0.55);

    if (cueRef.current) {
      const label = progress < 0.35 ? "LIFT" : progress < 0.55 ? "HOLD" : "LOWER";
      if (cueRef.current.textContent !== label) cueRef.current.textContent = label;
    }
  }, [progress]);

  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="Animated crystal geode leg performing a straight leg raise exercise">
      <defs>
        <linearGradient id="slrCrystalBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f3e7ff" />
          <stop offset="40%" stopColor="#b48cd6" />
          <stop offset="100%" stopColor="#4a2d6b" />
        </linearGradient>
        <linearGradient id="slrCrystalFacet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fdf6ff" />
          <stop offset="100%" stopColor="#8a63b3" stopOpacity="0.3" />
        </linearGradient>
        <radialGradient id="slrGeode" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fff4d6" />
          <stop offset="35%" stopColor="#d9a8ff" />
          <stop offset="75%" stopColor="#5a3a82" />
          <stop offset="100%" stopColor="#2a1840" />
        </radialGradient>
        <linearGradient id="slrStone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6b6256" />
          <stop offset="100%" stopColor="#2e2a24" />
        </linearGradient>
      </defs>

      {/* Mat */}
      <g>
        <rect x="20" y="318" width="360" height="22" rx="4" fill="url(#slrStone)" />
        {[40, 90, 150, 210, 280, 340].map((x) => (
          <path key={x} d={`M ${x} 320 q 3 -4 6 0 q 3 -3 5 1`} fill="none" stroke="#6b8f4a" strokeWidth="1.4" strokeLinecap="round" />
        ))}
        <rect x="20" y="318" width="360" height="3" fill="#7a7060" opacity="0.6" />
      </g>

      {/* HEAD */}
      <g>
        <circle cx="52" cy="290" r="20" fill="url(#slrGeode)" stroke="#1a0e2a" strokeWidth="1.2" />
        {Array.from({ length: 10 }).map((_, i) => {
          const a = (i / 10) * Math.PI * 2;
          return <line key={i} x1={52 + Math.cos(a) * 7} y1={290 + Math.sin(a) * 7} x2={52 + Math.cos(a) * 12} y2={290 + Math.sin(a) * 12} stroke="#fdf6ff" strokeWidth="0.9" opacity="0.7" />;
        })}
        <circle cx="52" cy="290" r="4" fill="#fff3a8" opacity="0.9" />
      </g>

      {/* TORSO */}
      <g>
        <path d="M 68 278 L 84 272 L 110 272 L 118 280 L 110 308 L 84 308 L 68 302 Z" fill="url(#slrCrystalBody)" stroke="#2a1840" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M 78 276 L 108 276 L 104 292 L 82 292 Z" fill="url(#slrCrystalFacet)" opacity="0.65" />
        <line x1="88" y1="276" x2="92" y2="304" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        <line x1="100" y1="276" x2="98" y2="304" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        <Sparkle x={80} y={290} size={2.4} delay="0.4s" />
        <Sparkle x={100} y={284} size={2} delay="1.1s" />
      </g>

      {/* HIP */}
      <g>
        <circle cx="100" cy="290" r="18" fill="url(#slrGeode)" stroke="#1a0e2a" strokeWidth="1.2" />
        {Array.from({ length: 10 }).map((_, i) => {
          const a = (i / 10) * Math.PI * 2;
          return <line key={i} x1={100 + Math.cos(a) * 6} y1={290 + Math.sin(a) * 6} x2={100 + Math.cos(a) * 11} y2={290 + Math.sin(a) * 11} stroke="#fdf6ff" strokeWidth="0.9" opacity="0.75" />;
        })}
        <circle cx="100" cy="290" r="4" fill="#fff3a8" opacity="0.9" />
      </g>

      {/* WORKING LEG */}
      <g ref={legRef}>
        <path d="M 112 278 L 124 272 L 300 272 L 312 280 L 300 308 L 124 308 Z" fill="url(#slrCrystalBody)" stroke="#2a1840" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M 128 276 L 296 276 L 290 292 L 134 292 Z" fill="url(#slrCrystalFacet)" opacity="0.65" />
        <line x1="150" y1="276" x2="148" y2="304" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        <line x1="200" y1="276" x2="202" y2="304" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        <line x1="250" y1="276" x2="248" y2="304" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        <circle cx="210" cy="290" r="14" fill="url(#slrGeode)" stroke="#1a0e2a" strokeWidth="1" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return <line key={i} x1={210 + Math.cos(a) * 5} y1={290 + Math.sin(a) * 5} x2={210 + Math.cos(a) * 9} y2={290 + Math.sin(a) * 9} stroke="#fdf6ff" strokeWidth="0.8" opacity="0.7" />;
        })}
        <circle cx="210" cy="290" r="3" fill="#fff3a8" opacity="0.9" />
        <path d="M 302 284 L 318 264 Q 326 260 328 268 L 322 286 Q 320 292 312 292 Z" fill="url(#slrCrystalBody)" stroke="#2a1840" strokeWidth="1.1" strokeLinejoin="round" />
        <path d="M 308 278 L 322 266 L 318 278 L 306 286 Z" fill="url(#slrCrystalFacet)" opacity="0.55" />
        <circle cx="324" cy="266" r="2" fill="#fff3a8" />
        <g>
          <circle cx="306" cy="290" r="11" fill="url(#slrGeode)" stroke="#1a0e2a" strokeWidth="1" />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2;
            return <line key={i} x1={306 + Math.cos(a) * 4} y1={290 + Math.sin(a) * 4} x2={306 + Math.cos(a) * 7} y2={290 + Math.sin(a) * 7} stroke="#fdf6ff" strokeWidth="0.8" opacity="0.7" />;
          })}
        </g>
        <Sparkle x={160} y={284} size={3} delay="0s" />
        <Sparkle x={230} y={298} size={2.2} delay="0.7s" />
        <Sparkle x={280} y={280} size={2.6} delay="1.3s" />
      </g>

      {/* Arrow cue */}
      <g ref={arrowRef} opacity="0.25">
        <path d="M 210 130 L 220 148 L 214 148 L 214 160 L 206 160 L 206 148 L 200 148 Z" fill="#c5b4e3" stroke="#9b84c8" strokeWidth="1" strokeLinejoin="round" />
        <path d="M 210 132 L 217 146 L 212 146 L 212 158 L 208 158 L 208 146 L 203 146 Z" fill="#e0d4f7" opacity="0.8" />
      </g>

      <text ref={cueRef} x="200" y="80" textAnchor="middle" fontSize="22" fontWeight="600" letterSpacing="6" fill="#e8d4ff" style={{ fontFamily: "ui-serif, Georgia, serif" }}>
        LIFT
      </text>
    </svg>
  );
}

/* ─── Standing Knee Bend crystal SVG ─── */
function StandingKneeBendSVG({ progress, className }: { progress: number; className?: string }) {
  const shinRef = useRef<SVGGElement | null>(null);
  const footRef = useRef<SVGGElement | null>(null);
  const cueRef = useRef<SVGTextElement | null>(null);
  const arrowRef = useRef<SVGGElement | null>(null);

  useEffect(() => {
    let e: number;
    if (progress < 0.35) e = progress / 0.35;
    else if (progress < 0.55) e = 1;
    else if (progress < 0.95) e = 1 - (progress - 0.55) / 0.4;
    else e = 0;

    const eased = e * e * (3 - 2 * e);
    const angle = 90 + 135 * eased;

    if (shinRef.current) shinRef.current.setAttribute("transform", `rotate(${angle} 200 262)`);
    if (footRef.current) footRef.current.style.opacity = String(0.5 + eased * 0.5);
    if (arrowRef.current) arrowRef.current.style.opacity = String(0.25 + eased * 0.55);

    if (cueRef.current) {
      const label = progress < 0.35 ? "BEND" : progress < 0.55 ? "HOLD" : "STRAIGHTEN";
      if (cueRef.current.textContent !== label) cueRef.current.textContent = label;
    }
  }, [progress]);

  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="Animated crystal geode figure performing a standing knee bend exercise">
      <defs>
        <linearGradient id="skbCrystalBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f3e7ff" />
          <stop offset="40%" stopColor="#b48cd6" />
          <stop offset="100%" stopColor="#4a2d6b" />
        </linearGradient>
        <linearGradient id="skbCrystalFacet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fdf6ff" />
          <stop offset="100%" stopColor="#8a63b3" stopOpacity="0.3" />
        </linearGradient>
        <radialGradient id="skbGeode" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fff4d6" />
          <stop offset="35%" stopColor="#d9a8ff" />
          <stop offset="75%" stopColor="#5a3a82" />
          <stop offset="100%" stopColor="#2a1840" />
        </radialGradient>
        <linearGradient id="skbStone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6b6256" />
          <stop offset="100%" stopColor="#2e2a24" />
        </linearGradient>
      </defs>

      {/* Ground */}
      <g>
        <rect x="20" y="358" width="360" height="22" rx="4" fill="url(#skbStone)" />
        {[40, 90, 150, 210, 280, 340].map((x) => (
          <path key={x} d={`M ${x} 360 q 3 -4 6 0 q 3 -3 5 1`} fill="none" stroke="#6b8f4a" strokeWidth="1.4" strokeLinecap="round" />
        ))}
        <rect x="20" y="358" width="360" height="3" fill="#7a7060" opacity="0.6" />
      </g>

      {/* SUPPORT LEG */}
      <g opacity="0.4">
        <path d="M 192 178 L 208 178 L 210 258 L 190 258 Z" fill="url(#skbCrystalBody)" stroke="#2a1840" strokeWidth="1" strokeLinejoin="round" />
        <circle cx="200" cy="266" r="10" fill="url(#skbGeode)" stroke="#1a0e2a" strokeWidth="1" />
        <path d="M 192 258 L 208 258 L 210 340 L 190 340 Z" fill="url(#skbCrystalBody)" stroke="#2a1840" strokeWidth="1" strokeLinejoin="round" />
        <ellipse cx="212" cy="354" rx="20" ry="9" fill="url(#skbCrystalBody)" stroke="#2a1840" strokeWidth="1" />
      </g>

      {/* TORSO */}
      <g>
        <path d="M 186 92 L 214 92 L 218 172 L 182 172 Z" fill="url(#skbCrystalBody)" stroke="#2a1840" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M 190 96 L 210 96 L 212 164 L 192 164 Z" fill="url(#skbCrystalFacet)" opacity="0.65" />
        <line x1="196" y1="100" x2="198" y2="166" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        <line x1="206" y1="100" x2="208" y2="166" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        <Sparkle x={200} y={120} size={2.4} delay="0.4s" />
        <Sparkle x={196} y={150} size={2} delay="1.1s" />
      </g>

      {/* HEAD */}
      <g>
        <circle cx="200" cy="74" r="16" fill="url(#skbGeode)" stroke="#1a0e2a" strokeWidth="1.2" />
        {Array.from({ length: 10 }).map((_, i) => {
          const a = (i / 10) * Math.PI * 2;
          return <line key={i} x1={200 + Math.cos(a) * 6} y1={74 + Math.sin(a) * 6} x2={200 + Math.cos(a) * 11} y2={74 + Math.sin(a) * 11} stroke="#fdf6ff" strokeWidth="0.9" opacity="0.7" />;
        })}
        <circle cx="200" cy="74" r="3.5" fill="#fff3a8" opacity="0.9" />
      </g>

      {/* HIP */}
      <g>
        <circle cx="200" cy="180" r="14" fill="url(#skbGeode)" stroke="#1a0e2a" strokeWidth="1.2" />
        {Array.from({ length: 10 }).map((_, i) => {
          const a = (i / 10) * Math.PI * 2;
          return <line key={i} x1={200 + Math.cos(a) * 5} y1={180 + Math.sin(a) * 5} x2={200 + Math.cos(a) * 9} y2={180 + Math.sin(a) * 9} stroke="#fdf6ff" strokeWidth="0.9" opacity="0.75" />;
        })}
        <circle cx="200" cy="180" r="3" fill="#fff3a8" opacity="0.9" />
      </g>

      {/* THIGH */}
      <g>
        <path d="M 190 180 L 210 180 L 212 256 L 188 256 Z" fill="url(#skbCrystalBody)" stroke="#2a1840" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M 194 184 L 206 184 L 208 250 L 196 250 Z" fill="url(#skbCrystalFacet)" opacity="0.65" />
        <line x1="198" y1="190" x2="200" y2="250" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        <Sparkle x={200} y={210} size={2.6} delay="0.7s" />
      </g>

      {/* SHIN + foot — rotates backward around knee */}
      <g ref={shinRef}>
        <path d="M 212 250 L 220 262 L 212 274 L 290 272 L 296 262 L 290 252 Z" fill="url(#skbCrystalBody)" stroke="#2a1840" strokeWidth="1" strokeLinejoin="round" />
        <path d="M 218 254 L 288 256 L 286 260 L 220 260 Z" fill="url(#skbCrystalFacet)" opacity="0.55" />
        <line x1="240" y1="252" x2="238" y2="272" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        <line x1="265" y1="252" x2="267" y2="272" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        <g ref={footRef} transform="rotate(-18 300 262)">
          <ellipse cx="314" cy="262" rx="20" ry="11" fill="url(#skbCrystalBody)" stroke="#2a1840" strokeWidth="1.1" />
          <ellipse cx="314" cy="260" rx="14" ry="6" fill="url(#skbCrystalFacet)" opacity="0.55" />
          <line x1="304" y1="258" x2="324" y2="258" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.5" />
          <line x1="308" y1="266" x2="320" y2="266" stroke="#fdf6ff" strokeWidth="0.6" opacity="0.35" />
        </g>
        <g>
          <circle cx="300" cy="262" r="10" fill="url(#skbGeode)" stroke="#1a0e2a" strokeWidth="1" />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2;
            return <line key={i} x1={300 + Math.cos(a) * 4} y1={262 + Math.sin(a) * 4} x2={300 + Math.cos(a) * 7} y2={262 + Math.sin(a) * 7} stroke="#fdf6ff" strokeWidth="0.8" opacity="0.7" />;
          })}
        </g>
        <g>
          <circle cx="200" cy="262" r="12" fill="url(#skbGeode)" stroke="#1a0e2a" strokeWidth="1.2" />
          {Array.from({ length: 10 }).map((_, i) => {
            const a = (i / 10) * Math.PI * 2;
            return <line key={i} x1={200 + Math.cos(a) * 4} y1={262 + Math.sin(a) * 4} x2={200 + Math.cos(a) * 8} y2={262 + Math.sin(a) * 8} stroke="#fdf6ff" strokeWidth="0.9" opacity="0.75" />;
          })}
          <circle cx="200" cy="262" r="3" fill="#fff3a8" opacity="0.9" />
        </g>
        <Sparkle x={250} y={256} size={2.8} delay="0.2s" />
        <Sparkle x={280} y={268} size={2} delay="1.0s" />
      </g>

      {/* Arrow cue */}
      <g ref={arrowRef} opacity="0.25">
        <path d="M 240 170 A 50 50 0 0 0 170 230" fill="none" stroke="#c5b4e3" strokeWidth="2.5" strokeLinecap="round" />
        <polygon points="165,228 172,240 178,232" fill="#c5b4e3" stroke="#9b84c8" strokeWidth="0.8" strokeLinejoin="round" />
      </g>

      <text ref={cueRef} x="200" y="40" textAnchor="middle" fontSize="22" fontWeight="600" letterSpacing="5" fill="#e8d4ff" style={{ fontFamily: "ui-serif, Georgia, serif" }}>
        BEND
      </text>
    </svg>
  );
}

/* ─── Standing Hip Abduction crystal SVG ─── */
function StandingHipAbductionSVG({ progress, className }: { progress: number; className?: string }) {
  const legRef = useRef<SVGGElement | null>(null);
  const cueRef = useRef<SVGTextElement | null>(null);
  const arrowRef = useRef<SVGGElement | null>(null);

  useEffect(() => {
    let e: number;
    if (progress < 0.35) e = progress / 0.35;
    else if (progress < 0.55) e = 1;
    else if (progress < 0.95) e = 1 - (progress - 0.55) / 0.4;
    else e = 0;

    const eased = e * e * (3 - 2 * e);
    const angle = -28 * eased;

    if (legRef.current) legRef.current.setAttribute("transform", `rotate(${angle} 200 180)`);
    if (arrowRef.current) arrowRef.current.style.opacity = String(0.3 + eased * 0.55);

    if (cueRef.current) {
      const label = progress < 0.35 ? "LIFT" : progress < 0.55 ? "HOLD" : "LOWER";
      if (cueRef.current.textContent !== label) cueRef.current.textContent = label;
    }
  }, [progress]);

  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="Animated crystal geode figure performing a standing hip abduction exercise">
      <defs>
        <linearGradient id="shaCrystalBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f3e7ff" />
          <stop offset="40%" stopColor="#b48cd6" />
          <stop offset="100%" stopColor="#4a2d6b" />
        </linearGradient>
        <linearGradient id="shaCrystalFacet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fdf6ff" />
          <stop offset="100%" stopColor="#8a63b3" stopOpacity="0.3" />
        </linearGradient>
        <radialGradient id="shaGeode" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fff4d6" />
          <stop offset="35%" stopColor="#d9a8ff" />
          <stop offset="75%" stopColor="#5a3a82" />
          <stop offset="100%" stopColor="#2a1840" />
        </radialGradient>
        <linearGradient id="shaStone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6b6256" />
          <stop offset="100%" stopColor="#2e2a24" />
        </linearGradient>
      </defs>

      {/* Ground */}
      <g>
        <rect x="20" y="358" width="360" height="22" rx="4" fill="url(#shaStone)" />
        {[40, 90, 150, 210, 280, 340].map((x) => (
          <path key={x} d={`M ${x} 360 q 3 -4 6 0 q 3 -3 5 1`} fill="none" stroke="#6b8f4a" strokeWidth="1.4" strokeLinecap="round" />
        ))}
        <rect x="20" y="358" width="360" height="3" fill="#7a7060" opacity="0.6" />
      </g>

      {/* SUPPORT LEG */}
      <g opacity="0.45">
        <path d="M 174 178 L 186 178 L 188 258 L 172 258 Z" fill="url(#shaCrystalBody)" stroke="#2a1840" strokeWidth="1" strokeLinejoin="round" />
        <circle cx="180" cy="266" r="10" fill="url(#shaGeode)" stroke="#1a0e2a" strokeWidth="1" />
        <path d="M 174 258 L 186 258 L 188 340 L 172 340 Z" fill="url(#shaCrystalBody)" stroke="#2a1840" strokeWidth="1" strokeLinejoin="round" />
        <ellipse cx="192" cy="354" rx="18" ry="9" fill="url(#shaCrystalBody)" stroke="#2a1840" strokeWidth="1" />
      </g>

      {/* TORSO */}
      <g>
        <path d="M 186 92 L 214 92 L 218 172 L 182 172 Z" fill="url(#shaCrystalBody)" stroke="#2a1840" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M 190 96 L 210 96 L 212 164 L 192 164 Z" fill="url(#shaCrystalFacet)" opacity="0.65" />
        <line x1="196" y1="100" x2="198" y2="166" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        <line x1="206" y1="100" x2="208" y2="166" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        <Sparkle x={200} y={120} size={2.4} delay="0.4s" />
        <Sparkle x={196} y={150} size={2} delay="1.1s" />
      </g>

      {/* HEAD */}
      <g>
        <circle cx="200" cy="74" r="16" fill="url(#shaGeode)" stroke="#1a0e2a" strokeWidth="1.2" />
        {Array.from({ length: 10 }).map((_, i) => {
          const a = (i / 10) * Math.PI * 2;
          return <line key={i} x1={200 + Math.cos(a) * 6} y1={74 + Math.sin(a) * 6} x2={200 + Math.cos(a) * 11} y2={74 + Math.sin(a) * 11} stroke="#fdf6ff" strokeWidth="0.9" opacity="0.7" />;
        })}
        <circle cx="200" cy="74" r="3.5" fill="#fff3a8" opacity="0.9" />
      </g>

      {/* HIP */}
      <g>
        <circle cx="200" cy="180" r="14" fill="url(#shaGeode)" stroke="#1a0e2a" strokeWidth="1.2" />
        {Array.from({ length: 10 }).map((_, i) => {
          const a = (i / 10) * Math.PI * 2;
          return <line key={i} x1={200 + Math.cos(a) * 5} y1={180 + Math.sin(a) * 5} x2={200 + Math.cos(a) * 9} y2={180 + Math.sin(a) * 9} stroke="#fdf6ff" strokeWidth="0.9" opacity="0.75" />;
        })}
        <circle cx="200" cy="180" r="3" fill="#fff3a8" opacity="0.9" />
      </g>

      {/* WORKING LEG */}
      <g ref={legRef}>
        <path d="M 212 170 L 228 174 L 230 252 L 212 256 Z" fill="url(#shaCrystalBody)" stroke="#2a1840" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M 216 174 L 224 176 L 226 248 L 218 248 Z" fill="url(#shaCrystalFacet)" opacity="0.65" />
        <line x1="218" y1="190" x2="222" y2="246" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        <path d="M 216 254 L 232 258 L 234 340 L 216 344 Z" fill="url(#shaCrystalBody)" stroke="#2a1840" strokeWidth="1" strokeLinejoin="round" />
        <path d="M 220 260 L 228 262 L 230 334 L 222 336 Z" fill="url(#shaCrystalFacet)" opacity="0.55" />
        <line x1="222" y1="276" x2="226" y2="332" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        <g>
          <circle cx="224" cy="260" r="12" fill="url(#shaGeode)" stroke="#1a0e2a" strokeWidth="1.2" />
          {Array.from({ length: 10 }).map((_, i) => {
            const a = (i / 10) * Math.PI * 2;
            return <line key={i} x1={224 + Math.cos(a) * 4} y1={260 + Math.sin(a) * 4} x2={224 + Math.cos(a) * 8} y2={260 + Math.sin(a) * 8} stroke="#fdf6ff" strokeWidth="0.9" opacity="0.75" />;
          })}
          <circle cx="224" cy="260" r="3" fill="#fff3a8" opacity="0.9" />
        </g>
        <g>
          <circle cx="228" cy="350" r="9" fill="url(#shaGeode)" stroke="#1a0e2a" strokeWidth="1" />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2;
            return <line key={i} x1={228 + Math.cos(a) * 3} y1={350 + Math.sin(a) * 3} x2={228 + Math.cos(a) * 6} y2={350 + Math.sin(a) * 6} stroke="#fdf6ff" strokeWidth="0.8" opacity="0.7" />;
          })}
        </g>
        <ellipse cx="244" cy="356" rx="20" ry="11" fill="url(#shaCrystalBody)" stroke="#2a1840" strokeWidth="1.1" />
        <ellipse cx="244" cy="354" rx="14" ry="6" fill="url(#shaCrystalFacet)" opacity="0.55" />
        <line x1="234" y1="352" x2="254" y2="352" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.5" />
        <Sparkle x={220} y={210} size={2.6} delay="0.3s" />
        <Sparkle x={226} y={300} size={2.2} delay="0.9s" />
      </g>

      {/* Arrow cue */}
      <g ref={arrowRef} opacity="0.3">
        <path d="M 280 280 A 55 55 0 0 1 290 190" fill="none" stroke="#c5b4e3" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 4" />
        <polygon points="288,188 296,176 302,186" fill="#c5b4e3" stroke="#9b84c8" strokeWidth="0.8" strokeLinejoin="round" />
        <text x="300" y="240" fontSize="11" fontWeight="600" fill="#e8d4ff" style={{ fontFamily: "ui-serif, Georgia, serif" }}>OUT</text>
      </g>

      <text ref={cueRef} x="200" y="40" textAnchor="middle" fontSize="22" fontWeight="600" letterSpacing="6" fill="#e8d4ff" style={{ fontFamily: "ui-serif, Georgia, serif" }}>
        LIFT
      </text>
    </svg>
  );
}

/* ─── Single Leg Balance crystal SVG ─── */
const SLB_DOWN = {
  thigh: [218, 178, 240, 178, 242, 262, 220, 262],
  shin: [220, 262, 242, 262, 244, 340, 222, 340],
  footCx: 232, footCy: 356,
  kneeCx: 231, kneeCy: 262,
  ankleCx: 233, ankleCy: 340,
};
const SLB_UP = {
  thigh: [212, 178, 232, 178, 256, 240, 240, 252],
  shin: [240, 252, 256, 240, 240, 312, 224, 312],
  footCx: 226, footCy: 318,
  kneeCx: 248, kneeCy: 246,
  ankleCx: 232, ankleCy: 312,
};
function slbLerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function slbLerpArr(a: number[], b: number[], t: number) { return a.map((v, i) => slbLerp(v, b[i], t)); }
function slbQuadPath(p: number[]) { return `M ${p[0]} ${p[1]} L ${p[2]} ${p[3]} L ${p[4]} ${p[5]} L ${p[6]} ${p[7]} Z`; }
function slbHalfOval(cx: number, cy: number, rx: number, ry: number) { return `M ${cx - rx} ${cy} A ${rx} ${ry} 0 0 1 ${cx + rx} ${cy} Z`; }

function SingleLegBalanceSVG({ progress, className }: { progress: number; className?: string }) {
  const thighRef = useRef<SVGPathElement | null>(null);
  const shinRef = useRef<SVGPathElement | null>(null);
  const footARef = useRef<SVGPathElement | null>(null);
  const footBRef = useRef<SVGPathElement | null>(null);
  const kneeRef = useRef<SVGGElement | null>(null);
  const ankleRef = useRef<SVGGElement | null>(null);
  const cueRef = useRef<SVGTextElement | null>(null);

  useEffect(() => {
    let lift = 0;
    if (progress < 0.4) lift = 0;
    else if (progress < 0.5) { const t = (progress - 0.4) / 0.1; lift = t * t * (3 - 2 * t); }
    else if (progress < 0.9) lift = 1;
    else { const t = (progress - 0.9) / 0.1; lift = 1 - t * t * (3 - 2 * t); }

    const thigh = slbLerpArr(SLB_DOWN.thigh, SLB_UP.thigh, lift);
    const shin = slbLerpArr(SLB_DOWN.shin, SLB_UP.shin, lift);
    const footCx = slbLerp(SLB_DOWN.footCx, SLB_UP.footCx, lift);
    const footCy = slbLerp(SLB_DOWN.footCy, SLB_UP.footCy, lift);
    const kneeCx = slbLerp(SLB_DOWN.kneeCx, SLB_UP.kneeCx, lift);
    const kneeCy = slbLerp(SLB_DOWN.kneeCy, SLB_UP.kneeCy, lift);
    const ankleCx = slbLerp(SLB_DOWN.ankleCx, SLB_UP.ankleCx, lift);
    const ankleCy = slbLerp(SLB_DOWN.ankleCy, SLB_UP.ankleCy, lift);

    thighRef.current?.setAttribute("d", slbQuadPath(thigh));
    shinRef.current?.setAttribute("d", slbQuadPath(shin));
    footARef.current?.setAttribute("d", slbHalfOval(footCx, footCy, 22, 14));
    footBRef.current?.setAttribute("d", slbHalfOval(footCx, footCy - 1, 14, 8));
    kneeRef.current?.setAttribute("transform", `translate(${kneeCx - SLB_UP.kneeCx} ${kneeCy - SLB_UP.kneeCy})`);
    ankleRef.current?.setAttribute("transform", `translate(${ankleCx - SLB_UP.ankleCx} ${ankleCy - SLB_UP.ankleCy})`);

    if (cueRef.current) {
      const label = lift < 0.5 ? "STEADY" : "BALANCE";
      if (cueRef.current.textContent !== label) cueRef.current.textContent = label;
    }
  }, [progress]);

  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="Animated crystal geode figure performing single-leg balance">
      <defs>
        <linearGradient id="slbCrystalBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f3e7ff" />
          <stop offset="40%" stopColor="#b48cd6" />
          <stop offset="100%" stopColor="#4a2d6b" />
        </linearGradient>
        <linearGradient id="slbCrystalFacet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fdf6ff" />
          <stop offset="100%" stopColor="#8a63b3" stopOpacity="0.3" />
        </linearGradient>
        <radialGradient id="slbGeode" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fff4d6" />
          <stop offset="35%" stopColor="#d9a8ff" />
          <stop offset="75%" stopColor="#5a3a82" />
          <stop offset="100%" stopColor="#2a1840" />
        </radialGradient>
        <linearGradient id="slbStone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6b6256" />
          <stop offset="100%" stopColor="#2e2a24" />
        </linearGradient>
      </defs>

      {/* Ground */}
      <g>
        <rect x="20" y="358" width="360" height="22" rx="4" fill="url(#slbStone)" />
        {[40, 90, 150, 210, 280, 340].map((x) => (
          <path key={x} d={`M ${x} 360 q 3 -4 6 0 q 3 -3 5 1`} fill="none" stroke="#6b8f4a" strokeWidth="1.4" strokeLinecap="round" />
        ))}
        <rect x="20" y="358" width="360" height="3" fill="#7a7060" opacity="0.6" />
      </g>

      {/* SUPPORT LEG */}
      <g>
        <path d="M 186 178 L 214 178 L 216 340 L 184 340 Z" fill="url(#slbCrystalBody)" stroke="#2a1840" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M 190 182 L 210 182 L 212 334 L 192 334 Z" fill="url(#slbCrystalFacet)" opacity="0.65" />
        <line x1="200" y1="188" x2="200" y2="332" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        <Sparkle x={200} y={240} size={2.4} delay="0.4s" />
        <path d={slbHalfOval(200, 356, 32, 16)} fill="url(#slbCrystalBody)" stroke="#2a1840" strokeWidth="1.1" />
        <path d={slbHalfOval(200, 355, 22, 9)} fill="url(#slbCrystalFacet)" opacity="0.55" />
      </g>

      {/* MOVING LEG */}
      <g>
        <path ref={thighRef} d={slbQuadPath(SLB_DOWN.thigh)} fill="url(#slbCrystalBody)" stroke="#2a1840" strokeWidth="1.1" strokeLinejoin="round" />
        <path ref={shinRef} d={slbQuadPath(SLB_DOWN.shin)} fill="url(#slbCrystalBody)" stroke="#2a1840" strokeWidth="1.1" strokeLinejoin="round" />
        <path ref={footARef} d={slbHalfOval(SLB_DOWN.footCx, SLB_DOWN.footCy, 22, 14)} fill="url(#slbCrystalBody)" stroke="#2a1840" strokeWidth="1.1" />
        <path ref={footBRef} d={slbHalfOval(SLB_DOWN.footCx, SLB_DOWN.footCy - 1, 14, 8)} fill="url(#slbCrystalFacet)" opacity="0.55" />
        <g ref={kneeRef}>
          <circle cx={SLB_UP.kneeCx} cy={SLB_UP.kneeCy} r="11" fill="url(#slbGeode)" stroke="#1a0e2a" strokeWidth="1.1" />
          {Array.from({ length: 10 }).map((_, i) => {
            const a = (i / 10) * Math.PI * 2;
            return <line key={i} x1={SLB_UP.kneeCx + Math.cos(a) * 4} y1={SLB_UP.kneeCy + Math.sin(a) * 4} x2={SLB_UP.kneeCx + Math.cos(a) * 8} y2={SLB_UP.kneeCy + Math.sin(a) * 8} stroke="#fdf6ff" strokeWidth="0.8" opacity="0.7" />;
          })}
        </g>
        <g ref={ankleRef}>
          <circle cx={SLB_UP.ankleCx} cy={SLB_UP.ankleCy} r="8" fill="url(#slbGeode)" stroke="#1a0e2a" strokeWidth="1" />
          {Array.from({ length: 10 }).map((_, i) => {
            const a = (i / 10) * Math.PI * 2;
            return <line key={i} x1={SLB_UP.ankleCx + Math.cos(a) * 3} y1={SLB_UP.ankleCy + Math.sin(a) * 3} x2={SLB_UP.ankleCx + Math.cos(a) * 6} y2={SLB_UP.ankleCy + Math.sin(a) * 6} stroke="#fdf6ff" strokeWidth="0.7" opacity="0.7" />;
          })}
        </g>
      </g>

      {/* TORSO */}
      <g>
        <path d="M 186 92 L 214 92 L 218 172 L 182 172 Z" fill="url(#slbCrystalBody)" stroke="#2a1840" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M 190 96 L 210 96 L 212 164 L 192 164 Z" fill="url(#slbCrystalFacet)" opacity="0.65" />
        <line x1="196" y1="100" x2="198" y2="166" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        <line x1="206" y1="100" x2="208" y2="166" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        <Sparkle x={200} y={130} size={2.4} delay="0.4s" />
      </g>

      {/* ARMS */}
      <g opacity="0.7">
        <path d="M 180 108 L 152 154 L 148 160 L 152 160 L 180 116 Z" fill="url(#slbCrystalBody)" stroke="#2a1840" strokeWidth="0.9" strokeLinejoin="round" />
      </g>
      <g opacity="0.7">
        <path d="M 220 108 L 248 154 L 252 160 L 248 160 L 220 116 Z" fill="url(#slbCrystalBody)" stroke="#2a1840" strokeWidth="0.9" strokeLinejoin="round" />
      </g>

      {/* HEAD */}
      <g>
        <circle cx="200" cy="74" r="16" fill="url(#slbGeode)" stroke="#1a0e2a" strokeWidth="1.2" />
        {Array.from({ length: 10 }).map((_, i) => {
          const a = (i / 10) * Math.PI * 2;
          return <line key={i} x1={200 + Math.cos(a) * 6} y1={74 + Math.sin(a) * 6} x2={200 + Math.cos(a) * 11} y2={74 + Math.sin(a) * 11} stroke="#fdf6ff" strokeWidth="0.9" opacity="0.7" />;
        })}
        <circle cx="200" cy="74" r="3.5" fill="#fff3a8" opacity="0.9" />
      </g>

      {/* HIP medallion */}
      <g>
        <circle cx="200" cy="180" r="14" fill="url(#slbGeode)" stroke="#1a0e2a" strokeWidth="1.2" />
        {Array.from({ length: 10 }).map((_, i) => {
          const a = (i / 10) * Math.PI * 2;
          return <line key={i} x1={200 + Math.cos(a) * 5} y1={180 + Math.sin(a) * 5} x2={200 + Math.cos(a) * 9} y2={180 + Math.sin(a) * 9} stroke="#fdf6ff" strokeWidth="0.9" opacity="0.75" />;
        })}
        <circle cx="200" cy="180" r="3" fill="#fff3a8" opacity="0.9" />
      </g>

      {/* Support knee + ankle */}
      <g>
        <circle cx="200" cy="262" r="11" fill="url(#slbGeode)" stroke="#1a0e2a" strokeWidth="1.1" />
        {Array.from({ length: 10 }).map((_, i) => {
          const a = (i / 10) * Math.PI * 2;
          return <line key={i} x1={200 + Math.cos(a) * 4} y1={262 + Math.sin(a) * 4} x2={200 + Math.cos(a) * 8} y2={262 + Math.sin(a) * 8} stroke="#fdf6ff" strokeWidth="0.8" opacity="0.7" />;
        })}
      </g>
      <g>
        <circle cx="200" cy="340" r="9" fill="url(#slbGeode)" stroke="#1a0e2a" strokeWidth="1" />
        {Array.from({ length: 10 }).map((_, i) => {
          const a = (i / 10) * Math.PI * 2;
          return <line key={i} x1={200 + Math.cos(a) * 3.5} y1={340 + Math.sin(a) * 3.5} x2={200 + Math.cos(a) * 7} y2={340 + Math.sin(a) * 7} stroke="#fdf6ff" strokeWidth="0.7" opacity="0.7" />;
        })}
      </g>

      <text ref={cueRef} x="200" y="40" textAnchor="middle" fontSize="22" fontWeight="600" letterSpacing="6" fill="#e8d4ff" style={{ fontFamily: "ui-serif, Georgia, serif" }}>
        STEADY
      </text>
    </svg>
  );
}

/* ─── Short Arc Quad crystal SVG ─── */
function ShortArcQuadSVG({ progress, className }: { progress: number; className?: string }) {
  const shinRef = useRef<SVGGElement | null>(null);
  const cueRef = useRef<SVGTextElement | null>(null);
  const arrowRef = useRef<SVGGElement | null>(null);

  useEffect(() => {
    let e: number;
    if (progress < 0.4) e = progress / 0.4;
    else if (progress < 0.6) e = 1;
    else if (progress < 0.95) e = 1 - (progress - 0.6) / 0.35;
    else e = 0;

    const eased = e * e * (3 - 2 * e);
    const angle = 30 * (1 - eased);

    if (shinRef.current) shinRef.current.setAttribute("transform", `rotate(${angle} 248 200)`);
    if (arrowRef.current) arrowRef.current.style.opacity = String(0.35 + eased * 0.55);

    if (cueRef.current) {
      const label = progress < 0.4 ? "LIFT" : progress < 0.6 ? "HOLD" : "LOWER";
      if (cueRef.current.textContent !== label) cueRef.current.textContent = label;
    }
  }, [progress]);

  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="Animated crystal geode leg performing a short arc quad exercise">
      <defs>
        <linearGradient id="saqCrystalBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f3e7ff" />
          <stop offset="40%" stopColor="#b48cd6" />
          <stop offset="100%" stopColor="#4a2d6b" />
        </linearGradient>
        <linearGradient id="saqCrystalFacet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fdf6ff" />
          <stop offset="100%" stopColor="#8a63b3" stopOpacity="0.3" />
        </linearGradient>
        <radialGradient id="saqGeode" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fff4d6" />
          <stop offset="35%" stopColor="#d9a8ff" />
          <stop offset="75%" stopColor="#5a3a82" />
          <stop offset="100%" stopColor="#2a1840" />
        </radialGradient>
        <linearGradient id="saqStone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6b6256" />
          <stop offset="100%" stopColor="#2e2a24" />
        </linearGradient>
        <radialGradient id="saqBolster" cx="0.5" cy="0.35" r="0.6">
          <stop offset="0%" stopColor="#a8b97a" />
          <stop offset="60%" stopColor="#5d7240" />
          <stop offset="100%" stopColor="#2f3d1f" />
        </radialGradient>
      </defs>

      {/* Mossy stone surface */}
      <g>
        <rect x="20" y="268" width="360" height="22" rx="4" fill="url(#saqStone)" />
        {[40, 90, 150, 210, 280, 340].map((x) => (
          <path key={x} d={`M ${x} 270 q 3 -4 6 0 q 3 -3 5 1`} fill="none" stroke="#6b8f4a" strokeWidth="1.4" strokeLinecap="round" />
        ))}
        <rect x="20" y="268" width="360" height="3" fill="#7a7060" opacity="0.6" />
      </g>

      {/* HIP */}
      <g>
        <circle cx="48" cy="220" r="22" fill="url(#saqGeode)" stroke="#1a0e2a" strokeWidth="1.2" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return <line key={i} x1={48 + Math.cos(a) * 8} y1={220 + Math.sin(a) * 8} x2={48 + Math.cos(a) * 13} y2={220 + Math.sin(a) * 13} stroke="#fdf6ff" strokeWidth="0.9" opacity="0.7" />;
        })}
      </g>

      {/* THIGH */}
      <g>
        <path d="M 60 210 L 76 204 L 220 184 L 234 196 L 222 212 L 76 230 L 60 224 Z" fill="url(#saqCrystalBody)" stroke="#2a1840" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M 80 206 L 218 188 L 214 198 L 86 214 Z" fill="url(#saqCrystalFacet)" opacity="0.65" />
        <line x1="100" y1="206" x2="104" y2="226" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        <line x1="150" y1="200" x2="148" y2="222" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        <line x1="195" y1="192" x2="200" y2="216" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        <Sparkle x={95} y={216} size={2.4} delay="0.4s" />
        <Sparkle x={140} y={210} size={3} delay="1.1s" />
        <Sparkle x={185} y={200} size={2} delay="1.9s" />
        <Sparkle x={48} y={214} size={2.4} delay="0.9s" />
      </g>

      {/* BOLSTER — mossy log under the knee */}
      <g>
        <ellipse cx="248" cy="240" rx="46" ry="22" fill="url(#saqBolster)" stroke="#1f2a14" strokeWidth="1.2" />
        <ellipse cx="248" cy="234" rx="38" ry="10" fill="#cbe09a" opacity="0.45" />
        {[210, 226, 244, 262, 280].map((x, i) => (
          <path key={x} d={`M ${x} 222 q 3 -5 6 0 q 3 -4 5 1`} fill="none" stroke="#9ec46a" strokeWidth="1.4" strokeLinecap="round" opacity={0.85 - i * 0.05} />
        ))}
        <ellipse cx="204" cy="240" rx="6" ry="20" fill="#3d4f24" opacity="0.6" />
        <ellipse cx="292" cy="240" rx="6" ry="20" fill="#3d4f24" opacity="0.6" />
      </g>

      {/* SHIN + ankle + foot + knee — all rotate around the knee */}
      <g ref={shinRef}>
        <path d="M 262 188 L 268 200 L 262 212 L 348 210 L 354 200 L 348 190 Z" fill="url(#saqCrystalBody)" stroke="#2a1840" strokeWidth="1" strokeLinejoin="round" />
        <path d="M 268 192 L 348 194 L 346 198 L 270 198 Z" fill="url(#saqCrystalFacet)" opacity="0.55" />
        <line x1="300" y1="190" x2="298" y2="210" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        <line x1="328" y1="190" x2="330" y2="210" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        <ellipse cx="374" cy="200" rx="24" ry="13" fill="url(#saqCrystalBody)" stroke="#2a1840" strokeWidth="1.1" />
        <ellipse cx="374" cy="198" rx="16" ry="7" fill="url(#saqCrystalFacet)" opacity="0.55" />
        <line x1="362" y1="196" x2="386" y2="196" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.5" />
        <line x1="366" y1="204" x2="382" y2="204" stroke="#fdf6ff" strokeWidth="0.6" opacity="0.35" />
        <g>
          <circle cx="358" cy="200" r="13" fill="url(#saqGeode)" stroke="#1a0e2a" strokeWidth="1" />
          {Array.from({ length: 10 }).map((_, i) => {
            const a = (i / 10) * Math.PI * 2;
            return <line key={i} x1={358 + Math.cos(a) * 5} y1={200 + Math.sin(a) * 5} x2={358 + Math.cos(a) * 9} y2={200 + Math.sin(a) * 9} stroke="#fdf6ff" strokeWidth="0.8" opacity="0.7" />;
          })}
        </g>
        <g>
          <circle cx="248" cy="200" r="20" fill="url(#saqGeode)" stroke="#1a0e2a" strokeWidth="1.2" />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            return <line key={i} x1={248 + Math.cos(a) * 7} y1={200 + Math.sin(a) * 7} x2={248 + Math.cos(a) * 12} y2={200 + Math.sin(a) * 12} stroke="#fdf6ff" strokeWidth="0.9" opacity="0.75" />;
          })}
          <circle cx="248" cy="200" r="5" fill="#fff3a8" opacity="0.9" />
        </g>
        <Sparkle x={290} y={194} size={3} delay="0s" />
        <Sparkle x={335} y={206} size={2.2} delay="0.7s" />
        <Sparkle x={376} y={190} size={2.6} delay="1.3s" />
      </g>

      {/* Arrow cue */}
      <g ref={arrowRef} opacity="0.35">
        <path d="M 374 150 L 384 168 L 378 168 L 378 180 L 370 180 L 370 168 L 364 168 Z" fill="#c5b4e3" stroke="#9b84c8" strokeWidth="1" strokeLinejoin="round" />
        <path d="M 374 152 L 381 166 L 376 166 L 376 178 L 372 178 L 372 166 L 367 166 Z" fill="#e0d4f7" opacity="0.8" />
      </g>

      <text ref={cueRef} x="200" y="80" textAnchor="middle" fontSize="22" fontWeight="600" letterSpacing="6" fill="#e8d4ff" style={{ fontFamily: "ui-serif, Georgia, serif" }}>
        LIFT
      </text>
    </svg>
  );
}

/* ─── Quad Set crystal SVG ─── */
function QuadSetSVG({ progress, className }: { progress: number; className?: string }) {
  const quadGlowRef = useRef<SVGRectElement | null>(null);
  const veinRef = useRef<SVGLineElement | null>(null);
  const kneeGroupRef = useRef<SVGGElement | null>(null);
  const ankleGroupRef = useRef<SVGGElement | null>(null);
  const auraRef = useRef<SVGEllipseElement | null>(null);
  const arrowRef = useRef<SVGGElement | null>(null);
  const cueRef = useRef<SVGTextElement | null>(null);

  useEffect(() => {
    let c: number;
    if (progress < 0.25) c = progress / 0.25;
    else if (progress < 0.7) c = 1;
    else if (progress < 0.95) c = 1 - (progress - 0.7) / 0.25;
    else c = 0;

    if (quadGlowRef.current) quadGlowRef.current.style.opacity = String(c * 0.85);
    if (veinRef.current) {
      veinRef.current.style.opacity = String(0.4 + c * 0.55);
      veinRef.current.setAttribute("stroke-width", String(1.2 + c * 1.8));
    }
    if (auraRef.current) auraRef.current.style.opacity = String(c * 0.7);
    if (arrowRef.current) {
      arrowRef.current.style.opacity = String(0.2 + c * 0.8);
      arrowRef.current.setAttribute("transform", `translate(0 ${c * 2.5})`);
    }
    if (kneeGroupRef.current) kneeGroupRef.current.setAttribute("transform", `translate(0 ${c * 3})`);
    if (ankleGroupRef.current) ankleGroupRef.current.setAttribute("transform", `translate(${-c * 2} 0)`);
    if (cueRef.current) {
      const label = progress < 0.25 ? "TENSE" : progress < 0.7 ? "HOLD" : "RELEASE";
      if (cueRef.current.textContent !== label) cueRef.current.textContent = label;
    }
  }, [progress]);

  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="Animated crystal geode leg performing a quad set exercise">
      <defs>
        <linearGradient id="qCrystalBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f3e7ff" />
          <stop offset="40%" stopColor="#b48cd6" />
          <stop offset="100%" stopColor="#4a2d6b" />
        </linearGradient>
        <linearGradient id="qCrystalFacet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fdf6ff" />
          <stop offset="100%" stopColor="#8a63b3" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="qQuadGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff3a8" />
          <stop offset="100%" stopColor="#ffb347" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id="qGeode" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fff4d6" />
          <stop offset="35%" stopColor="#d9a8ff" />
          <stop offset="75%" stopColor="#5a3a82" />
          <stop offset="100%" stopColor="#2a1840" />
        </radialGradient>
        <linearGradient id="qStone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6b6256" />
          <stop offset="100%" stopColor="#2e2a24" />
        </linearGradient>
        <radialGradient id="qAura" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fff3a8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#fff3a8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Mossy stone surface */}
      <g>
        <rect x="20" y="248" width="360" height="22" rx="4" fill="url(#qStone)" />
        {[40, 90, 150, 210, 280, 340].map((x) => (
          <path key={x} d={`M ${x} 250 q 3 -4 6 0 q 3 -3 5 1`} fill="none" stroke="#6b8f4a" strokeWidth="1.4" strokeLinecap="round" />
        ))}
        <rect x="20" y="248" width="360" height="3" fill="#7a7060" opacity="0.6" />
      </g>

      {/* HIP */}
      <g>
        <circle cx="48" cy="220" r="22" fill="url(#qGeode)" stroke="#1a0e2a" strokeWidth="1.2" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return <line key={i} x1={48 + Math.cos(a) * 8} y1={220 + Math.sin(a) * 8} x2={48 + Math.cos(a) * 13} y2={220 + Math.sin(a) * 13} stroke="#fdf6ff" strokeWidth="0.9" opacity="0.7" />;
        })}
      </g>

      {/* Contraction aura */}
      <ellipse ref={auraRef} cx="140" cy="218" rx="80" ry="26" fill="url(#qAura)" style={{ opacity: 0 }} />

      {/* THIGH */}
      <g>
        <path d="M 60 204 L 76 198 L 220 200 L 234 214 L 220 230 L 76 232 L 60 226 Z" fill="url(#qCrystalBody)" stroke="#2a1840" strokeWidth="1.2" strokeLinejoin="round" />
        <rect ref={quadGlowRef} x="76" y="200" width="148" height="30" rx="6" fill="url(#qQuadGlow)" style={{ opacity: 0, mixBlendMode: "screen" }} />
        <path d="M 80 202 L 218 204 L 212 212 L 86 212 Z" fill="url(#qCrystalFacet)" opacity="0.65" />
        <line x1="100" y1="200" x2="104" y2="232" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        <line x1="150" y1="200" x2="148" y2="232" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        <line x1="195" y1="200" x2="200" y2="232" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        <line ref={veinRef} x1="78" y1="216" x2="222" y2="216" stroke="#fff3a8" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
        {[110, 150, 190].map((x) => (
          <polygon key={x} points={`${x},212 ${x + 4},216 ${x},220 ${x - 4},216`} fill="#fff3a8" opacity="0.9" />
        ))}
        <Sparkle x={130} y={196} size={2.2} delay="0.3s" />
        <Sparkle x={180} y={196} size={1.8} delay="1.1s" />
      </g>

      {/* SHIN */}
      <g>
        <path d="M 262 204 L 268 216 L 262 228 L 348 226 L 354 216 L 348 206 Z" fill="url(#qCrystalBody)" stroke="#2a1840" strokeWidth="1" strokeLinejoin="round" />
        <path d="M 268 208 L 348 210 L 346 214 L 270 214 Z" fill="url(#qCrystalFacet)" opacity="0.55" />
        <line x1="300" y1="206" x2="298" y2="226" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        <line x1="328" y1="206" x2="330" y2="226" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        <Sparkle x={315} y={202} size={1.8} delay="0.7s" />
      </g>

      {/* KNEE */}
      <g ref={kneeGroupRef}>
        <circle cx="248" cy="216" r="20" fill="url(#qGeode)" stroke="#1a0e2a" strokeWidth="1.2" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return <line key={i} x1={248 + Math.cos(a) * 7} y1={216 + Math.sin(a) * 7} x2={248 + Math.cos(a) * 12} y2={216 + Math.sin(a) * 12} stroke="#fdf6ff" strokeWidth="0.9" opacity="0.75" />;
        })}
        <circle cx="248" cy="216" r="5" fill="#fff3a8" opacity="0.9" />
      </g>

      {/* ANKLE + foot */}
      <g ref={ankleGroupRef}>
        <path d="M 350 210 L 372 188 Q 380 184 382 192 L 378 214 Q 376 220 368 220 Z" fill="url(#qCrystalBody)" stroke="#2a1840" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M 354 208 L 374 192 L 372 204 L 358 214 Z" fill="url(#qCrystalFacet)" opacity="0.55" />
        <circle cx="378" cy="190" r="2" fill="#fff3a8" />
        <g>
          <circle cx="358" cy="216" r="13" fill="url(#qGeode)" stroke="#1a0e2a" strokeWidth="1" />
          {Array.from({ length: 10 }).map((_, i) => {
            const a = (i / 10) * Math.PI * 2;
            return <line key={i} x1={358 + Math.cos(a) * 5} y1={216 + Math.sin(a) * 5} x2={358 + Math.cos(a) * 9} y2={216 + Math.sin(a) * 9} stroke="#fdf6ff" strokeWidth="0.8" opacity="0.7" />;
          })}
        </g>
      </g>

      {/* Arrow cue */}
      <g ref={arrowRef} style={{ opacity: 0.2 }}>
        <rect x="244" y="138" width="8" height="28" rx="3" fill="#c5b4e3" stroke="#9b84c8" strokeWidth="1" />
        <polygon points="248,178 236,162 260,162" fill="#c5b4e3" stroke="#9b84c8" strokeWidth="1" strokeLinejoin="round" />
        <path d="M 246 143 q 2 -3 4 0" fill="none" stroke="#6b8f4a" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M 250 164 q -2 3 -4 0" fill="none" stroke="#6b8f4a" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="246" cy="150" r="1.3" fill="#8fbc5a" opacity="0.85" />
      </g>

      <text ref={cueRef} x="200" y="80" textAnchor="middle" fontSize="22" fontWeight="600" letterSpacing="6" fill="#e8d4ff" style={{ fontFamily: "ui-serif, Georgia, serif" }}>
        TENSE
      </text>
    </svg>
  );
}

/* ─── Heel Slide crystal SVG ─── */
function HeelSlideSVG({ progress, className }: { progress: number; className?: string }) {
  const thighRef = useRef<SVGGElement | null>(null);
  const kneeRef = useRef<SVGGElement | null>(null);
  const shinRef = useRef<SVGGElement | null>(null);
  const cueRef = useRef<SVGTextElement | null>(null);
  const trailRef = useRef<SVGLineElement | null>(null);
  const footRef = useRef<SVGGElement | null>(null);

  useEffect(() => {
    let b: number;
    if (progress < 0.4) b = progress / 0.4;
    else if (progress < 0.55) b = 1;
    else if (progress < 0.95) b = 1 - (progress - 0.55) / 0.4;
    else b = 0;

    const eased = b * b * (3 - 2 * b);

    const L1 = 200;
    const L2 = 110;
    const maxAlpha = Math.asin(L2 / L1) * 0.95;
    const alpha = eased * maxAlpha;
    const sinBeta = Math.min(1, (L1 / L2) * Math.sin(alpha));
    const beta = Math.asin(sinBeta);

    const alphaDeg = (alpha * 180) / Math.PI;
    const betaDeg = (beta * 180) / Math.PI;

    const thighT = `rotate(${-alphaDeg} 48 220)`;
    if (thighRef.current) thighRef.current.setAttribute("transform", thighT);
    if (kneeRef.current) kneeRef.current.setAttribute("transform", thighT);
    if (shinRef.current) {
      shinRef.current.setAttribute(
        "transform",
        `${thighT} rotate(${betaDeg + alphaDeg} 248 216)`
      );
    }

    const kneeX = 48 + L1 * Math.cos(alpha);
    const heelX = kneeX + L2 * Math.cos(beta);

    if (trailRef.current) {
      trailRef.current.setAttribute("x1", String(heelX));
      trailRef.current.setAttribute("x2", "358");
      trailRef.current.style.opacity = String(0.15 + eased * 0.55);
    }

    if (footRef.current) {
      footRef.current.setAttribute("transform", `translate(${heelX - 358}, 0)`);
    }

    if (cueRef.current) {
      const label =
        progress < 0.4 ? "SLIDE IN" : progress < 0.55 ? "HOLD" : "SLIDE OUT";
      if (cueRef.current.textContent !== label) cueRef.current.textContent = label;
    }
  }, [progress]);

  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      role="img"
      aria-label="Animated crystal geode leg performing a heel slide exercise"
    >
      <defs>
        <linearGradient id="hsCrystalBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f3e7ff" />
          <stop offset="40%" stopColor="#b48cd6" />
          <stop offset="100%" stopColor="#4a2d6b" />
        </linearGradient>
        <linearGradient id="hsCrystalFacet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fdf6ff" />
          <stop offset="100%" stopColor="#8a63b3" stopOpacity="0.3" />
        </linearGradient>
        <radialGradient id="hsGeode" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fff4d6" />
          <stop offset="35%" stopColor="#d9a8ff" />
          <stop offset="75%" stopColor="#5a3a82" />
          <stop offset="100%" stopColor="#2a1840" />
        </radialGradient>
        <linearGradient id="hsStone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6b6256" />
          <stop offset="100%" stopColor="#2e2a24" />
        </linearGradient>
      </defs>

      {/* Mossy stone surface */}
      <g>
        <rect x="20" y="248" width="360" height="22" rx="4" fill="url(#hsStone)" />
        {[40, 90, 150, 210, 280, 340].map((x) => (
          <path
            key={x}
            d={`M ${x} 250 q 3 -4 6 0 q 3 -3 5 1`}
            fill="none"
            stroke="#6b8f4a"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        ))}
        <rect x="20" y="248" width="360" height="3" fill="#7a7060" opacity="0.6" />
      </g>

      {/* Heel-trail */}
      <line
        ref={trailRef}
        x1="358"
        y1="246"
        x2="358"
        y2="246"
        stroke="#fff3a8"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.15"
      />

      {/* HIP — geode anchor */}
      <g>
        <circle cx="48" cy="220" r="22" fill="url(#hsGeode)" stroke="#1a0e2a" strokeWidth="1.2" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return (
            <line key={i} x1={48 + Math.cos(a) * 8} y1={220 + Math.sin(a) * 8} x2={48 + Math.cos(a) * 13} y2={220 + Math.sin(a) * 13} stroke="#fdf6ff" strokeWidth="0.9" opacity="0.7" />
          );
        })}
      </g>

      {/* THIGH */}
      <g ref={thighRef}>
        <path d="M 60 204 L 76 198 L 220 200 L 234 214 L 220 230 L 76 232 L 60 226 Z" fill="url(#hsCrystalBody)" stroke="#2a1840" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M 80 202 L 218 204 L 212 212 L 86 212 Z" fill="url(#hsCrystalFacet)" opacity="0.65" />
        <line x1="100" y1="200" x2="104" y2="232" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        <line x1="150" y1="200" x2="148" y2="232" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        <line x1="195" y1="200" x2="200" y2="232" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        <Sparkle x={95} y={212} size={2.4} delay="0.4s" />
        <Sparkle x={140} y={220} size={3} delay="1.1s" />
        <Sparkle x={180} y={208} size={2} delay="1.9s" />
        <Sparkle x={215} y={222} size={2.6} delay="0.2s" />
      </g>

      <Sparkle x={48} y={214} size={2.4} delay="0.9s" />

      {/* SHIN + ankle */}
      <g ref={shinRef}>
        <path d="M 262 204 L 268 216 L 262 228 L 348 226 L 354 216 L 348 206 Z" fill="url(#hsCrystalBody)" stroke="#2a1840" strokeWidth="1" strokeLinejoin="round" />
        <path d="M 268 208 L 348 210 L 346 214 L 270 214 Z" fill="url(#hsCrystalFacet)" opacity="0.55" />
        <line x1="300" y1="206" x2="298" y2="226" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        <line x1="328" y1="206" x2="330" y2="226" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        <g>
          <circle cx="358" cy="216" r="13" fill="url(#hsGeode)" stroke="#1a0e2a" strokeWidth="1" />
          {Array.from({ length: 10 }).map((_, i) => {
            const a = (i / 10) * Math.PI * 2;
            return (
              <line key={i} x1={358 + Math.cos(a) * 5} y1={216 + Math.sin(a) * 5} x2={358 + Math.cos(a) * 9} y2={216 + Math.sin(a) * 9} stroke="#fdf6ff" strokeWidth="0.8" opacity="0.7" />
            );
          })}
        </g>
        <Sparkle x={290} y={210} size={3} delay="0s" />
        <Sparkle x={335} y={222} size={2.2} delay="0.7s" />
      </g>

      {/* FOOT — slides with heel */}
      <g ref={footRef}>
        <ellipse cx="374" cy="216" rx="24" ry="14" fill="url(#hsCrystalBody)" stroke="#2a1840" strokeWidth="1.1" />
        <ellipse cx="374" cy="214" rx="16" ry="8" fill="url(#hsCrystalFacet)" opacity="0.55" />
        <line x1="362" y1="212" x2="386" y2="212" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.5" />
        <line x1="366" y1="220" x2="382" y2="220" stroke="#fdf6ff" strokeWidth="0.6" opacity="0.35" />
        <Sparkle x={376} y={206} size={3.2} delay="1.3s" />
        <Sparkle x={367} y={192} size={2} delay="2.1s" />
        <Sparkle x={355} y={232} size={1.8} delay="1.6s" />
      </g>

      {/* KNEE — drawn last so it sits on top */}
      <g ref={kneeRef}>
        <circle cx="248" cy="216" r="20" fill="url(#hsGeode)" stroke="#1a0e2a" strokeWidth="1.2" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return (
            <line key={i} x1={248 + Math.cos(a) * 7} y1={216 + Math.sin(a) * 7} x2={248 + Math.cos(a) * 12} y2={216 + Math.sin(a) * 12} stroke="#fdf6ff" strokeWidth="0.9" opacity="0.75" />
          );
        })}
        <circle cx="248" cy="216" r="5" fill="#fff3a8" opacity="0.9" />
      </g>

      {/* Cue label */}
      <text
        ref={cueRef}
        x="200"
        y="80"
        textAnchor="middle"
        fontSize="22"
        fontWeight="600"
        letterSpacing="6"
        fill="#e8d4ff"
        style={{ fontFamily: "ui-serif, Georgia, serif" }}
      >
        SLIDE IN
      </text>
    </svg>
  );
}

/* ─── Long Arc Quad crystal SVG ─── */
function LongArcQuadSVG({ progress, className }: { progress: number; className?: string }) {
  const shinRef = useRef<SVGGElement | null>(null);
  const cueRef = useRef<SVGTextElement | null>(null);
  const arrowRef = useRef<SVGGElement | null>(null);

  useEffect(() => {
    let e: number;
    if (progress < 0.4) e = progress / 0.4;
    else if (progress < 0.6) e = 1;
    else if (progress < 0.95) e = 1 - (progress - 0.6) / 0.35;
    else e = 0;

    const eased = e * e * (3 - 2 * e);
    const angle = 90 * (1 - eased);

    if (shinRef.current) shinRef.current.setAttribute("transform", `rotate(${angle} 240 200)`);
    if (arrowRef.current) arrowRef.current.style.opacity = String(0.35 + eased * 0.55);

    if (cueRef.current) {
      const label = progress < 0.4 ? "EXTEND" : progress < 0.6 ? "HOLD" : "BEND";
      if (cueRef.current.textContent !== label) cueRef.current.textContent = label;
    }
  }, [progress]);

  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="Animated crystal geode leg performing a long arc quad exercise">
      <defs>
        <linearGradient id="laqCrystalBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f3e7ff" />
          <stop offset="40%" stopColor="#b48cd6" />
          <stop offset="100%" stopColor="#4a2d6b" />
        </linearGradient>
        <linearGradient id="laqCrystalFacet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fdf6ff" />
          <stop offset="100%" stopColor="#8a63b3" stopOpacity="0.3" />
        </linearGradient>
        <radialGradient id="laqGeode" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fff4d6" />
          <stop offset="35%" stopColor="#d9a8ff" />
          <stop offset="75%" stopColor="#5a3a82" />
          <stop offset="100%" stopColor="#2a1840" />
        </radialGradient>
        <linearGradient id="laqStone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6b6256" />
          <stop offset="100%" stopColor="#2e2a24" />
        </linearGradient>
        <linearGradient id="laqBench" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8a7e6e" />
          <stop offset="100%" stopColor="#4a4238" />
        </linearGradient>
      </defs>

      {/* Stone bench */}
      <g>
        <rect x="40" y="220" width="220" height="18" rx="3" fill="url(#laqBench)" stroke="#2e2a24" strokeWidth="1" />
        <rect x="50" y="238" width="16" height="60" rx="2" fill="url(#laqBench)" stroke="#2e2a24" strokeWidth="1" />
        <rect x="210" y="238" width="16" height="60" rx="2" fill="url(#laqBench)" stroke="#2e2a24" strokeWidth="1" />
        {[60, 100, 140, 180].map((x) => (
          <path key={x} d={`M ${x} 218 q 3 -4 6 0 q 3 -3 5 1`} fill="none" stroke="#6b8f4a" strokeWidth="1.2" strokeLinecap="round" />
        ))}
      </g>

      {/* HIP */}
      <g>
        <circle cx="80" cy="200" r="22" fill="url(#laqGeode)" stroke="#1a0e2a" strokeWidth="1.2" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return <line key={i} x1={80 + Math.cos(a) * 8} y1={200 + Math.sin(a) * 8} x2={80 + Math.cos(a) * 13} y2={200 + Math.sin(a) * 13} stroke="#fdf6ff" strokeWidth="0.9" opacity="0.7" />;
        })}
      </g>

      {/* TORSO */}
      <g>
        <path d="M 72 120 L 88 120 L 92 186 L 80 192 L 68 186 Z" fill="url(#laqCrystalBody)" stroke="#2a1840" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M 76 124 L 86 124 L 88 180 L 78 184 Z" fill="url(#laqCrystalFacet)" opacity="0.65" />
        <line x1="78" y1="140" x2="82" y2="180" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        <Sparkle x={80} y={150} size={2.4} delay="0.3s" />
      </g>

      {/* HEAD */}
      <g>
        <circle cx="80" cy="100" r="18" fill="url(#laqGeode)" stroke="#1a0e2a" strokeWidth="1.2" />
        {Array.from({ length: 10 }).map((_, i) => {
          const a = (i / 10) * Math.PI * 2;
          return <line key={i} x1={80 + Math.cos(a) * 6} y1={100 + Math.sin(a) * 6} x2={80 + Math.cos(a) * 11} y2={100 + Math.sin(a) * 11} stroke="#fdf6ff" strokeWidth="0.9" opacity="0.7" />;
        })}
        <circle cx="80" cy="100" r="4" fill="#fff3a8" opacity="0.9" />
        <Sparkle x={80} y={92} size={2} delay="1.1s" />
      </g>

      {/* THIGH */}
      <g>
        <path d="M 94 188 L 108 182 L 230 184 L 244 196 L 230 212 L 108 210 L 94 204 Z" fill="url(#laqCrystalBody)" stroke="#2a1840" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M 110 186 L 226 188 L 222 196 L 114 196 Z" fill="url(#laqCrystalFacet)" opacity="0.65" />
        <line x1="130" y1="186" x2="132" y2="206" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        <line x1="170" y1="186" x2="168" y2="206" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        <line x1="210" y1="186" x2="212" y2="206" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        <Sparkle x={140} y={196} size={3} delay="0s" />
        <Sparkle x={190} y={200} size={2.2} delay="0.8s" />
      </g>

      {/* SHIN + ankle + foot + knee — all rotate around the knee */}
      <g ref={shinRef}>
        <path d="M 254 188 L 260 200 L 254 212 L 340 210 L 346 200 L 340 190 Z" fill="url(#laqCrystalBody)" stroke="#2a1840" strokeWidth="1" strokeLinejoin="round" />
        <path d="M 260 192 L 340 194 L 338 198 L 262 198 Z" fill="url(#laqCrystalFacet)" opacity="0.55" />
        <line x1="290" y1="190" x2="288" y2="210" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        <line x1="320" y1="190" x2="322" y2="210" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.45" />
        <ellipse cx="366" cy="200" rx="24" ry="13" fill="url(#laqCrystalBody)" stroke="#2a1840" strokeWidth="1.1" />
        <ellipse cx="366" cy="198" rx="16" ry="7" fill="url(#laqCrystalFacet)" opacity="0.55" />
        <line x1="354" y1="196" x2="378" y2="196" stroke="#fdf6ff" strokeWidth="0.7" opacity="0.5" />
        <line x1="358" y1="204" x2="374" y2="204" stroke="#fdf6ff" strokeWidth="0.6" opacity="0.35" />
        <g>
          <circle cx="350" cy="200" r="13" fill="url(#laqGeode)" stroke="#1a0e2a" strokeWidth="1" />
          {Array.from({ length: 10 }).map((_, i) => {
            const a = (i / 10) * Math.PI * 2;
            return <line key={i} x1={350 + Math.cos(a) * 5} y1={200 + Math.sin(a) * 5} x2={350 + Math.cos(a) * 9} y2={200 + Math.sin(a) * 9} stroke="#fdf6ff" strokeWidth="0.8" opacity="0.7" />;
          })}
        </g>
        <g>
          <circle cx="240" cy="200" r="20" fill="url(#laqGeode)" stroke="#1a0e2a" strokeWidth="1.2" />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            return <line key={i} x1={240 + Math.cos(a) * 7} y1={200 + Math.sin(a) * 7} x2={240 + Math.cos(a) * 12} y2={200 + Math.sin(a) * 12} stroke="#fdf6ff" strokeWidth="0.9" opacity="0.75" />;
          })}
          <circle cx="240" cy="200" r="5" fill="#fff3a8" opacity="0.9" />
        </g>
        <Sparkle x={290} y={194} size={3} delay="0.2s" />
        <Sparkle x={330} y={206} size={2.2} delay="0.9s" />
        <Sparkle x={368} y={190} size={2.6} delay="1.4s" />
      </g>

      {/* Arrow cue */}
      <g ref={arrowRef} opacity="0.35">
        <path d="M 366 150 L 376 168 L 370 168 L 370 180 L 362 180 L 362 168 L 356 168 Z" fill="#c5b4e3" stroke="#9b84c8" strokeWidth="1" strokeLinejoin="round" />
        <path d="M 366 152 L 373 166 L 368 166 L 368 178 L 364 178 L 364 166 L 359 166 Z" fill="#e0d4f7" opacity="0.8" />
      </g>

      <text ref={cueRef} x="200" y="80" textAnchor="middle" fontSize="22" fontWeight="600" letterSpacing="6" fill="#e8d4ff" style={{ fontFamily: "ui-serif, Georgia, serif" }}>
        EXTEND
      </text>
    </svg>
  );
}

/* ─── Generic fallback animations ─── */
function GenericAnimation({ position, category }: { position: string; category: string }) {
  const isBalance = category === "balance";

  if (position === "lying") {
    return (
      <div className="flex items-center justify-center w-full rounded-xl" style={{ height: 140, background: "#f0e8d8" }}>
        <svg width="200" height="100" viewBox="0 0 200 100">
          <line x1="20" y1="78" x2="180" y2="78" stroke="#87a878" strokeWidth="2" />
          <ellipse cx="110" cy="75" rx="55" ry="8" fill="#c5b4e3" />
          <circle cx="40" cy="68" r="12" fill="#d4a5a5" />
          <motion.g animate={{ rotate: [0, -25, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} style={{ originX: "100px", originY: "75px" }}>
            <ellipse cx="150" cy="75" rx="30" ry="7" fill="#87a878" />
          </motion.g>
        </svg>
      </div>
    );
  }

  if (position === "sitting") {
    return (
      <div className="flex items-center justify-center w-full rounded-xl" style={{ height: 140, background: "#f0e8d8" }}>
        <svg width="160" height="130" viewBox="0 0 160 130">
          <rect x="30" y="80" width="100" height="10" rx="4" fill="#c9a84c" />
          <rect x="35" y="90" width="8" height="35" rx="3" fill="#c9a84c" />
          <rect x="117" y="90" width="8" height="35" rx="3" fill="#c9a84c" />
          <rect x="60" y="50" width="40" height="32" rx="10" fill="#c5b4e3" />
          <circle cx="80" cy="36" r="16" fill="#d4a5a5" />
          <rect x="50" y="78" width="60" height="12" rx="6" fill="#87a878" />
          <motion.g animate={{ rotate: [0, 30, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} style={{ originX: "105px", originY: "90px" }}>
            <rect x="75" y="90" width="30" height="10" rx="5" fill={isBalance ? "#c5b4e3" : "#87a878"} />
          </motion.g>
        </svg>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full rounded-xl" style={{ height: 160, background: "#f0e8d8" }}>
      <svg width="160" height="150" viewBox="0 0 160 150">
        <rect x="100" y="60" width="8" height="80" rx="3" fill="#c9a84c" />
        <rect x="100" y="60" width="40" height="8" rx="3" fill="#c9a84c" />
        <line x1="10" y1="138" x2="150" y2="138" stroke="#87a878" strokeWidth="2" />
        <rect x="58" y="55" width="32" height="42" rx="10" fill="#c5b4e3" />
        <circle cx="74" cy="38" r="18" fill="#d4a5a5" />
        <line x1="90" y1="70" x2="104" y2="80" stroke="#d4a5a5" strokeWidth="6" strokeLinecap="round" />
        <rect x="60" y="97" width="14" height="42" rx="6" fill="#87a878" />
        <motion.g animate={isBalance ? { rotate: [0, 20, 0] } : { rotate: [0, -30, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} style={{ originX: "86px", originY: "97px" }}>
          <rect x="72" y="97" width="14" height="42" rx="6" fill={isBalance ? "#c5b4e3" : "#87a878"} />
        </motion.g>
      </svg>
    </div>
  );
}

/* ─── Main export ─── */
export default function ExerciseAnimation({ position, category, exerciseId }: ExerciseAnimationProps) {
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const { progress, reset } = useAnimationProgress(3000, playing, speed);

  if (exerciseId === "ex-01") {
    return (
      <div className="w-full rounded-xl overflow-hidden" style={{ background: "#1a0e2a" }}>
        <AnklePumpsSVG progress={progress} className="w-full h-auto" />
        <PlayerControls
          playing={playing}
          onToggle={() => setPlaying((p) => !p)}
          onReset={reset}
          speed={speed}
          onSpeed={setSpeed}
        />
      </div>
    );
  }

  if (exerciseId === "ex-09") {
    return (
      <div className="w-full rounded-xl overflow-hidden" style={{ background: "#1a0e2a" }}>
        <HeelRaiseSVG progress={progress} className="w-full h-auto" />
        <PlayerControls
          playing={playing}
          onToggle={() => setPlaying((p) => !p)}
          onReset={reset}
          speed={speed}
          onSpeed={setSpeed}
        />
      </div>
    );
  }

  if (exerciseId === "ex-10") {
    return (
      <div className="w-full rounded-xl overflow-hidden" style={{ background: "#1a0e2a" }}>
        <TerminalKneeExtensionSVG progress={progress} className="w-full h-auto" />
        <PlayerControls
          playing={playing}
          onToggle={() => setPlaying((p) => !p)}
          onReset={reset}
          speed={speed}
          onSpeed={setSpeed}
        />
      </div>
    );
  }

  if (exerciseId === "ex-05") {
    return (
      <div className="w-full rounded-xl overflow-hidden" style={{ background: "#1a0e2a" }}>
        <StraightLegRaiseSVG progress={progress} className="w-full h-auto" />
        <PlayerControls
          playing={playing}
          onToggle={() => setPlaying((p) => !p)}
          onReset={reset}
          speed={speed}
          onSpeed={setSpeed}
        />
      </div>
    );
  }

  if (exerciseId === "ex-12") {
    return (
      <div className="w-full rounded-xl overflow-hidden" style={{ background: "#1a0e2a" }}>
        <StepUpsSVG progress={progress} className="w-full h-auto" />
        <PlayerControls
          playing={playing}
          onToggle={() => setPlaying((p) => !p)}
          onReset={reset}
          speed={speed}
          onSpeed={setSpeed}
        />
      </div>
    );
  }

  if (exerciseId === "ex-07") {
    return (
      <div className="w-full rounded-xl overflow-hidden" style={{ background: "#1a0e2a" }}>
        <StandingKneeBendSVG progress={progress} className="w-full h-auto" />
        <PlayerControls
          playing={playing}
          onToggle={() => setPlaying((p) => !p)}
          onReset={reset}
          speed={speed}
          onSpeed={setSpeed}
        />
      </div>
    );
  }

  if (exerciseId === "ex-08") {
    return (
      <div className="w-full rounded-xl overflow-hidden" style={{ background: "#1a0e2a" }}>
        <StandingHipAbductionSVG progress={progress} className="w-full h-auto" />
        <PlayerControls
          playing={playing}
          onToggle={() => setPlaying((p) => !p)}
          onReset={reset}
          speed={speed}
          onSpeed={setSpeed}
        />
      </div>
    );
  }

  if (exerciseId === "ex-11") {
    return (
      <div className="w-full rounded-xl overflow-hidden" style={{ background: "#1a0e2a" }}>
        <SingleLegBalanceSVG progress={progress} className="w-full h-auto" />
        <PlayerControls
          playing={playing}
          onToggle={() => setPlaying((p) => !p)}
          onReset={reset}
          speed={speed}
          onSpeed={setSpeed}
        />
      </div>
    );
  }

  if (exerciseId === "ex-04") {
    return (
      <div className="w-full rounded-xl overflow-hidden" style={{ background: "#1a0e2a" }}>
        <ShortArcQuadSVG progress={progress} className="w-full h-auto" />
        <PlayerControls
          playing={playing}
          onToggle={() => setPlaying((p) => !p)}
          onReset={reset}
          speed={speed}
          onSpeed={setSpeed}
        />
      </div>
    );
  }

  if (exerciseId === "ex-02") {
    return (
      <div className="w-full rounded-xl overflow-hidden" style={{ background: "#1a0e2a" }}>
        <QuadSetSVG progress={progress} className="w-full h-auto" />
        <PlayerControls
          playing={playing}
          onToggle={() => setPlaying((p) => !p)}
          onReset={reset}
          speed={speed}
          onSpeed={setSpeed}
        />
      </div>
    );
  }

  if (exerciseId === "ex-06") {
    return (
      <div className="w-full rounded-xl overflow-hidden" style={{ background: "#1a0e2a" }}>
        <LongArcQuadSVG progress={progress} className="w-full h-auto" />
        <PlayerControls
          playing={playing}
          onToggle={() => setPlaying((p) => !p)}
          onReset={reset}
          speed={speed}
          onSpeed={setSpeed}
        />
      </div>
    );
  }

  if (exerciseId === "ex-03") {
    return (
      <div className="w-full rounded-xl overflow-hidden" style={{ background: "#1a0e2a" }}>
        <HeelSlideSVG progress={progress} className="w-full h-auto" />
        <PlayerControls
          playing={playing}
          onToggle={() => setPlaying((p) => !p)}
          onReset={reset}
          speed={speed}
          onSpeed={setSpeed}
        />
      </div>
    );
  }

  return <GenericAnimation position={position} category={category} />;
}

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

  return <GenericAnimation position={position} category={category} />;
}

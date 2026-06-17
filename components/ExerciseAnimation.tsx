"use client";

import { motion } from "framer-motion";

interface ExerciseAnimationProps {
  position: "sitting" | "standing" | "lying";
  category: string;
}

export default function ExerciseAnimation({ position, category }: ExerciseAnimationProps) {
  const isBalance = category === "balance";

  if (position === "lying") {
    return (
      <div className="flex items-center justify-center w-full rounded-xl" style={{ height: 140, background: "#f0e8d8" }}>
        <svg width="200" height="100" viewBox="0 0 200 100">
          {/* floor line */}
          <line x1="20" y1="78" x2="180" y2="78" stroke="#87a878" strokeWidth="2" />
          {/* body */}
          <ellipse cx="110" cy="75" rx="55" ry="8" fill="#c5b4e3" />
          {/* head */}
          <circle cx="40" cy="68" r="12" fill="#d4a5a5" />
          {/* animated leg */}
          <motion.g
            animate={{ rotate: [0, -25, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ originX: "100px", originY: "75px" }}
          >
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
          {/* chair seat */}
          <rect x="30" y="80" width="100" height="10" rx="4" fill="#c9a84c" />
          {/* chair legs */}
          <rect x="35" y="90" width="8" height="35" rx="3" fill="#c9a84c" />
          <rect x="117" y="90" width="8" height="35" rx="3" fill="#c9a84c" />
          {/* body */}
          <rect x="60" y="50" width="40" height="32" rx="10" fill="#c5b4e3" />
          {/* head */}
          <circle cx="80" cy="36" r="16" fill="#d4a5a5" />
          {/* thighs */}
          <rect x="50" y="78" width="60" height="12" rx="6" fill="#87a878" />
          {/* animated lower leg */}
          <motion.g
            animate={{ rotate: [0, 30, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ originX: "105px", originY: "90px" }}
          >
            <rect x="75" y="90" width="30" height="10" rx="5" fill={isBalance ? "#c5b4e3" : "#87a878"} />
          </motion.g>
        </svg>
      </div>
    );
  }

  // standing
  return (
    <div className="flex items-center justify-center w-full rounded-xl" style={{ height: 160, background: "#f0e8d8" }}>
      <svg width="160" height="150" viewBox="0 0 160 150">
        {/* chair for support */}
        <rect x="100" y="60" width="8" height="80" rx="3" fill="#c9a84c" />
        <rect x="100" y="60" width="40" height="8" rx="3" fill="#c9a84c" />
        {/* floor */}
        <line x1="10" y1="138" x2="150" y2="138" stroke="#87a878" strokeWidth="2" />
        {/* body */}
        <rect x="58" y="55" width="32" height="42" rx="10" fill="#c5b4e3" />
        {/* head */}
        <circle cx="74" cy="38" r="18" fill="#d4a5a5" />
        {/* arm to chair */}
        <line x1="90" y1="70" x2="104" y2="80" stroke="#d4a5a5" strokeWidth="6" strokeLinecap="round" />
        {/* legs */}
        <rect x="60" y="97" width="14" height="42" rx="6" fill="#87a878" />
        <motion.g
          animate={isBalance ? { rotate: [0, 20, 0] } : { rotate: [0, -30, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "86px", originY: "97px" }}
        >
          <rect x="72" y="97" width="14" height="42" rx="6" fill={isBalance ? "#c5b4e3" : "#87a878"} />
        </motion.g>
      </svg>
    </div>
  );
}

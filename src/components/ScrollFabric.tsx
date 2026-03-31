"use client";

import { motion } from "framer-motion";

const COLORS = [
  "#B31B1B", "#2E6DA4", "#2A9D8F", "#6A994E",
  "#E76F51", "#7B2D8E", "#E9C46A", "#D44D4D",
  "#4A90D9", "#E07A5F", "#81B29A", "#F2CC8F",
  "#3D405B", "#264653",
];

export default function ScrollFabric() {
  const squares = Array.from({ length: 20 }, (_, i) => ({
    color: COLORS[i % COLORS.length],
    delay: i * 0.06,
  }));

  return (
    <div className="flex items-center gap-1.5 py-4 overflow-hidden">
      {squares.map((sq, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: sq.delay,
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-sm flex-shrink-0"
          style={{ backgroundColor: sq.color, opacity: 0.85 }}
        />
      ))}
      {/* Capsule end */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3 }}
        className="flex-shrink-0 ml-1"
      >
        <svg width="32" height="40" viewBox="0 0 32 40" fill="none">
          <rect x="2" y="5" width="28" height="30" rx="14" fill="#8A8D8F" />
          <rect x="6" y="9" width="20" height="22" rx="10" fill="#B0B3B5" />
          <ellipse cx="16" cy="20" rx="6" ry="7" fill="#8A8D8F" opacity="0.4" />
        </svg>
      </motion.div>
    </div>
  );
}

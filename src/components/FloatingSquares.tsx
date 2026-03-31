"use client";

import { motion } from "framer-motion";

const COLORS = [
  "#B31B1B", "#2E6DA4", "#2A9D8F", "#6A994E",
  "#E76F51", "#7B2D8E", "#E9C46A", "#D44D4D",
  "#4A90D9", "#81B29A",
];

interface Square {
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
}

function generateSquares(count: number): Square[] {
  const squares: Square[] = [];
  for (let i = 0; i < count; i++) {
    squares.push({
      x: (i * 37 + 13) % 100,
      y: (i * 53 + 7) % 100,
      size: 12 + (i % 5) * 6,
      color: COLORS[i % COLORS.length],
      delay: (i * 0.3) % 3,
      duration: 8 + (i % 4) * 2,
    });
  }
  return squares;
}

const squares = generateSquares(14);

export default function FloatingSquares() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {squares.map((sq, i) => (
        <motion.div
          key={i}
          className="absolute rounded-sm opacity-10"
          style={{
            left: `${sq.x}%`,
            top: `${sq.y}%`,
            width: sq.size,
            height: sq.size,
            backgroundColor: sq.color,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 8, -8, 0],
            opacity: [0.06, 0.12, 0.06],
          }}
          transition={{
            duration: sq.duration,
            delay: sq.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

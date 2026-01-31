import { useState, useEffect } from "react";
import { motion } from "motion/react";

type BreathPhase = "inhale" | "hold1" | "exhale" | "hold2";

export function StabilizeCardContent() {
  const [phase, setPhase] = useState<BreathPhase>("inhale");
  const [cycle, setCycle] = useState(0);
  const totalCycles = 4; // 4 cycles = ~60 seconds

  const phaseConfig = {
    inhale: { duration: 4, label: "Breathe in", next: "hold1" },
    hold1: { duration: 4, label: "Hold", next: "exhale" },
    exhale: { duration: 4, label: "Breathe out", next: "hold2" },
    hold2: { duration: 4, label: "Hold", next: "inhale" },
  };

  const currentConfig = phaseConfig[phase];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentConfig.next === "inhale") {
        const nextCycle = cycle + 1;
        if (nextCycle >= totalCycles) {
          return;
        }
        setCycle(nextCycle);
      }
      setPhase(currentConfig.next as BreathPhase);
    }, currentConfig.duration * 1000);

    return () => clearTimeout(timer);
  }, [phase, cycle, currentConfig]);

  // Define the path for each side of the square
  // Square is 80x80, centered at (50, 50) in a 100x100 viewBox
  const squareSize = 60;
  const center = 50;
  const halfSize = squareSize / 2;

  const pathSegments = {
    // Top side (left to right) - inhale
    top: `M ${center - halfSize} ${center - halfSize} L ${center + halfSize} ${center - halfSize}`,
    // Right side (top to bottom) - hold1
    right: `M ${center + halfSize} ${center - halfSize} L ${center + halfSize} ${center + halfSize}`,
    // Bottom side (right to left) - exhale
    bottom: `M ${center + halfSize} ${center + halfSize} L ${center - halfSize} ${center + halfSize}`,
    // Left side (bottom to top) - hold2
    left: `M ${center - halfSize} ${center + halfSize} L ${center - halfSize} ${center - halfSize}`,
  };

  const getCurrentPath = () => {
    switch (phase) {
      case "inhale": return pathSegments.top;
      case "hold1": return pathSegments.right;
      case "exhale": return pathSegments.bottom;
      case "hold2": return pathSegments.left;
    }
  };

  return (
    <div className="flex flex-col items-center py-6 px-4 bg-white/40 rounded-xl">
      <p className="text-xs text-[#5F6F68] mb-4">
        Cycle {cycle + 1} of {totalCycles}
      </p>

      {/* Breathing Animation - Drawing Square */}
      <svg width="80" height="80" viewBox="0 0 100 100" className="mb-6">
        {/* Background square outline (subtle) */}
        <rect
          x={center - halfSize}
          y={center - halfSize}
          width={squareSize}
          height={squareSize}
          fill="none"
          stroke="#B8C9BC"
          strokeWidth="2"
          opacity="0.2"
        />
        
        {/* Animated drawing path */}
        <motion.path
          key={phase}
          d={getCurrentPath()}
          fill="none"
          stroke="#A7C7B7"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: currentConfig.duration,
            ease: "linear",
          }}
        />
      </svg>

      <motion.p
        key={phase}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-base font-medium text-[#1F2A24]"
      >
        {currentConfig.label}
      </motion.p>

      <p className="text-xs text-[#5F6F68] mt-1">
        {currentConfig.duration} seconds
      </p>

      {/* Progress Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalCycles }).map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              i <= cycle ? "bg-[#A7C7B7]" : "bg-[#B8C9BC]/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
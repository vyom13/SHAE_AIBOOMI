import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";

interface StabilizeActionProps {
  title: string;
  onComplete: () => void;
  onClose: () => void;
}

type BreathPhase = "inhale" | "hold1" | "exhale" | "hold2";

export function StabilizeAction({ title, onComplete, onClose }: StabilizeActionProps) {
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
          onComplete();
          return;
        }
        setCycle(nextCycle);
      }
      setPhase(currentConfig.next as BreathPhase);
    }, currentConfig.duration * 1000);

    return () => clearTimeout(timer);
  }, [phase, cycle, currentConfig, onComplete]);

  const getSquareScale = () => {
    switch (phase) {
      case "inhale": return 1.5;
      case "hold1": return 1.5;
      case "exhale": return 1;
      case "hold2": return 1;
    }
  };

  return (
    <div className="fixed inset-0 bg-[#E8EDE6] z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold text-[#1F2A24]">{title}</h2>
          <p className="text-sm text-[#5F6F68]">
            Cycle {cycle + 1} of {totalCycles}
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/60 rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-[#5F6F68]" />
        </button>
      </div>

      {/* Breathing Animation */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <motion.div
          className="w-32 h-32 bg-[#A7C7B7] rounded-2xl"
          animate={{
            scale: getSquareScale(),
          }}
          transition={{
            duration: currentConfig.duration,
            ease: "easeInOut",
          }}
        />

        <motion.p
          key={phase}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-medium text-[#1F2A24] mt-12"
        >
          {currentConfig.label}
        </motion.p>

        <p className="text-sm text-[#5F6F68] mt-2">
          {currentConfig.duration} seconds
        </p>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-2 pb-8">
        {Array.from({ length: totalCycles }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${
              i <= cycle ? "bg-[#A7C7B7]" : "bg-[#B8C9BC]/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

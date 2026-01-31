import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";

export function ActivateCardContent() {
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [isRunning, setIsRunning] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          setIsCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleStop = () => {
    setIsRunning(false);
    setIsCompleted(true);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((120 - timeLeft) / 120) * 100;
  const circumference = 2 * Math.PI * 56; // radius 56

  return (
    <div className="flex flex-col items-center py-6 px-4 bg-white/40 rounded-xl">
      {/* Timer Display */}
      <div className="relative w-32 h-32 mb-4">
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="#B8C9BC"
            strokeWidth="6"
            fill="none"
            opacity="0.2"
          />
          {/* Progress circle */}
          <motion.circle
            cx="64"
            cy="64"
            r="56"
            stroke="#D7C9A8"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{
              strokeDashoffset: circumference - (circumference * progress) / 100,
            }}
            transition={{ duration: 0.5 }}
          />
        </svg>

        {/* Time text */}
        <div className="absolute inset-0 flex items-center justify-center">
          {isCompleted ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <Check className="w-8 h-8 text-[#D7C9A8]" />
              <p className="text-xs text-[#5F6F68] mt-1">Nice!</p>
            </motion.div>
          ) : (
            <div className="text-center">
              <p className="text-3xl font-semibold text-[#1F2A24]">
                {minutes}:{seconds.toString().padStart(2, "0")}
              </p>
              {isRunning && (
                <p className="text-xs text-[#5F6F68] mt-1">Keep going</p>
              )}
            </div>
          )}
        </div>
      </div>

      {!isCompleted && (
        <>
          <p className="text-xs text-[#5F6F68] text-center mb-4">
            You can stop anytime. Even 10 seconds counts.
          </p>
          
          <button
            onClick={handleStop}
            className="w-full py-3 px-4 bg-[#D7C9A8] text-white rounded-xl font-medium hover:bg-[#D7C9A8]/90 transition-colors"
          >
            I'm done for now
          </button>
        </>
      )}
    </div>
  );
}

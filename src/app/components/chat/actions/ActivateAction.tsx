import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { X, Check } from "lucide-react";

interface ActivateActionProps {
  title: string;
  onComplete: () => void;
  onClose: () => void;
}

export function ActivateAction({ title, onComplete, onClose }: ActivateActionProps) {
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
    onComplete();
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((120 - timeLeft) / 120) * 100;

  return (
    <div className="fixed inset-0 bg-[#E8EDE6] z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold text-[#1F2A24]">{title}</h2>
          <p className="text-sm text-[#5F6F68]">Just get started, momentum will follow</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/60 rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-[#5F6F68]" />
        </button>
      </div>

      {/* Timer Display */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="relative w-48 h-48">
          {/* Background circle */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="#B8C9BC"
              strokeWidth="8"
              fill="none"
              opacity="0.2"
            />
            {/* Progress circle */}
            <motion.circle
              cx="96"
              cy="96"
              r="88"
              stroke="#D7C9A8"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={552.92}
              initial={{ strokeDashoffset: 552.92 }}
              animate={{
                strokeDashoffset: 552.92 - (552.92 * progress) / 100,
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
                <Check className="w-12 h-12 text-[#D7C9A8]" />
                <p className="text-sm text-[#5F6F68] mt-2">Nice work!</p>
              </motion.div>
            ) : (
              <div className="text-center">
                <p className="text-5xl font-semibold text-[#1F2A24]">
                  {minutes}:{seconds.toString().padStart(2, "0")}
                </p>
                {isRunning && (
                  <p className="text-sm text-[#5F6F68] mt-2">Keep going</p>
                )}
              </div>
            )}
          </div>
        </div>

        {!isCompleted && (
          <p className="text-sm text-[#5F6F68] mt-8 text-center max-w-xs">
            You can stop anytime. Even 10 seconds is progress.
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="px-6 pb-6">
        {isCompleted ? (
          <button
            onClick={() => {
              onComplete();
              onClose();
            }}
            className="w-full py-4 px-6 bg-[#D7C9A8] text-white rounded-2xl font-medium hover:bg-[#D7C9A8]/90 transition-colors"
          >
            Done
          </button>
        ) : (
          <button
            onClick={handleStop}
            className="w-full py-4 px-6 bg-[#D7C9A8] text-white rounded-2xl font-medium hover:bg-[#D7C9A8]/90 transition-colors"
          >
            I'm done for now
          </button>
        )}
      </div>
    </div>
  );
}
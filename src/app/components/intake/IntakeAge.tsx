import { Calendar, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface IntakeAgeProps {
  onNext: (value: string) => void;
  onBack: () => void;
  onSkip?: () => void;
  initialValue?: string;
}

export function IntakeAge({ onNext, onBack, initialValue = "" }: IntakeAgeProps) {
  const [selectedAge, setSelectedAge] = useState(initialValue);
  const [showUnder18Message, setShowUnder18Message] = useState(false);

  const ageRanges = [
    "Under 18",
    "18–24",
    "25–34",
    "35–44",
    "45–54",
    "55+",
  ];

  const handleAgeSelect = (range: string) => {
    setSelectedAge(range);
    if (range === "Under 18") {
      setShowUnder18Message(true);
    } else {
      setShowUnder18Message(false);
    }
  };

  const canContinue = selectedAge && selectedAge !== "Under 18";

  const handleContinue = () => {
    if (canContinue) {
      onNext(selectedAge);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#EDF1EB] to-[#E8EBE6]" />

      {/* Progress */}
      <div className="relative px-6 pt-8 pb-4">
        <div className="flex gap-1.5">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                i <= 1 ? "bg-[#6B8E70]" : "bg-[#D4DAD1]"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative flex-1 flex flex-col justify-center p-6 overflow-y-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-8 max-w-sm mx-auto w-full"
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/60 backdrop-blur-sm">
            <Calendar className="w-8 h-8 text-[#6B8E70]" strokeWidth={1.5} />
          </div>

          {/* Question */}
          <div className="space-y-6">
            <h2 className="text-[1.75rem] leading-tight text-[#2C3E32]">
              Which age range do you fall into?
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {ageRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => handleAgeSelect(range)}
                  className={`w-full py-4 px-5 rounded-xl border-2 transition-all duration-200 text-left ${
                    selectedAge === range
                      ? "bg-[#6B8E70] border-[#6B8E70] text-white"
                      : "bg-white/70 border-[#D4DAD1] text-[#2C3E32] hover:border-[#9DB8A1]"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>

            {/* Under 18 message */}
            {showUnder18Message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#E8EDE6] rounded-xl p-4"
              >
                <p className="text-sm text-[#5A6B5E] leading-relaxed">
                  SHAE is currently available for users 18 and older. If you need support, please reach out to a trusted adult or counselor.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="relative p-6"
      >
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="px-6 py-4 text-[#6B8E70] rounded-2xl border-2 border-[#B8C9BC] hover:border-[#9DB8A1] transition-colors duration-200"
          >
            Back
          </button>
          <button
            onClick={handleContinue}
            disabled={!canContinue}
            className={`flex-1 rounded-2xl px-6 py-4 flex items-center justify-center gap-2 transition-colors duration-200 ${
              canContinue
                ? "bg-[#6B8E70] text-white hover:bg-[#5D7D63]"
                : "bg-[#D4DAD1] text-[#8A9A8E] cursor-not-allowed"
            }`}
          >
            <span>Continue</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
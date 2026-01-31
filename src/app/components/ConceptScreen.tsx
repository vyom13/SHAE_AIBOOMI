import { ArrowRight, Layers } from "lucide-react";
import { motion } from "motion/react";

interface ConceptScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export function ConceptScreen({ onNext, onBack }: ConceptScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col h-full"
    >
      {/* Soft Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#EDF1EB] to-[#E5E9E3]" />

      {/* Progress Indicator */}
      <div className="relative px-6 pt-8 pb-4">
        <div className="flex gap-1.5">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                i <= 1 ? "bg-[#6B8E70]" : "bg-[#D4DAD1]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative flex-1 flex flex-col justify-between p-6">
        <div className="flex-1 flex flex-col justify-center">
          {/* Visual Metaphor */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8 flex justify-center"
          >
            <div className="relative w-48 h-48">
              {/* Layered pathways illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="192" height="192" viewBox="0 0 192 192" fill="none">
                  <motion.path
                    d="M 48 96 Q 96 48, 144 96"
                    stroke="#9DB8A1"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                  />
                  <motion.path
                    d="M 40 96 Q 96 64, 152 96"
                    stroke="#B8C9BC"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.5 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                  <motion.path
                    d="M 32 96 Q 96 80, 160 96"
                    stroke="#C5D3C8"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.4 }}
                    transition={{ duration: 1.5, delay: 0.7 }}
                  />
                  <motion.circle
                    cx="96"
                    cy="96"
                    r="8"
                    fill="#6B8E70"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.5, duration: 0.3 }}
                  />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center space-y-6"
          >
            <div className="space-y-3">
              <h2 className="text-[1.75rem] leading-tight text-[#2C3E32]">
                What SHAE does
              </h2>
              <p className="text-lg text-[#5A6B5E] leading-relaxed px-4">
                SHAE helps you pause, reflect, and reset—one conversation at a time.
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 w-8 h-8 rounded-full bg-[#9DB8A1]/30 flex items-center justify-center flex-shrink-0">
                  <Layers className="w-4 h-4 text-[#6B8E70]" />
                </div>
                <div className="text-left">
                  <p className="text-[#2C3E32] text-base">
                    A space for daily emotional check-ins
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 w-8 h-8 rounded-full bg-[#9DB8A1]/30 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#6B8E70]" />
                </div>
                <div className="text-left">
                  <p className="text-[#2C3E32] text-base">
                    Thoughtful prompts to understand your patterns
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 w-8 h-8 rounded-full bg-[#9DB8A1]/30 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#6B8E70]" />
                </div>
                <div className="text-left">
                  <p className="text-[#2C3E32] text-base">
                    A companion that remembers your journey
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex gap-3"
        >
          <button
            onClick={onBack}
            className="px-6 py-4 text-[#6B8E70] rounded-2xl border-2 border-[#B8C9BC] hover:border-[#9DB8A1] transition-colors duration-200"
          >
            Back
          </button>
          <button
            onClick={onNext}
            className="flex-1 bg-[#6B8E70] text-white rounded-2xl px-6 py-4 flex items-center justify-center gap-2 hover:bg-[#5D7D63] transition-colors duration-200"
          >
            <span>Continue</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

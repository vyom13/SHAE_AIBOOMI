import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

interface IntakeCompleteProps {
  onComplete: () => void;
  onBack: () => void;
  onNext: () => void;
}

export function IntakeComplete({ onComplete, onBack, onNext }: IntakeCompleteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#EDF1EB] to-[#E8EBE6]" />

      {/* Progress - all filled */}
      <div className="relative px-6 pt-8 pb-4">
        <div className="flex gap-1.5">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="h-1 flex-1 rounded-full bg-[#6B8E70] transition-colors duration-300"
            />
          ))}
        </div>
      </div>

      <div className="relative flex-1 flex flex-col justify-center p-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center space-y-8 max-w-sm mx-auto"
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/60 backdrop-blur-sm mx-auto">
            <CheckCircle2 className="w-10 h-10 text-[#6B8E70]" strokeWidth={1.5} />
          </div>

          {/* Text */}
          <div className="space-y-6">
            <h2 className="text-[2rem] leading-tight text-[#2C3E32]">
              Thank you for sharing.
            </h2>
            <div className="space-y-4">
              <p className="text-lg text-[#5A6B5E] leading-relaxed">
                We'll use this only to make your experience feel more 'you'.
              </p>
              <p className="text-base text-[#7A8A7E] leading-relaxed">
                You can change or remove this anytime.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="relative p-6 space-y-3"
      >
        <button
          onClick={onNext}
          className="w-full bg-[#6B8E70] text-white rounded-2xl px-6 py-4 hover:bg-[#5D7D63] transition-colors duration-200"
        >
          Continue
        </button>
        <button
          onClick={onBack}
          className="w-full text-[#7A8A7E] py-2 text-sm hover:text-[#6B8E70] transition-colors duration-200"
        >
          Go back
        </button>
      </motion.div>
    </motion.div>
  );
}
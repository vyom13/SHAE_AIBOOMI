import { User, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface IntakeNameProps {
  onNext: (name: string) => void;
  onBack: () => void;
  onSkip?: () => void;
  initialValue?: string;
}

export function IntakeName({ onNext, onBack, initialValue = "" }: IntakeNameProps) {
  const [name, setName] = useState(initialValue);

  const canContinue = name.trim().length > 0;

  const handleContinue = () => {
    if (canContinue) {
      onNext(name);
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
                i === 0 ? "bg-[#6B8E70]" : "bg-[#D4DAD1]"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative flex-1 flex flex-col justify-center p-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-8 max-w-sm mx-auto w-full"
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/60 backdrop-blur-sm">
            <User className="w-8 h-8 text-[#6B8E70]" strokeWidth={1.5} />
          </div>

          {/* Question */}
          <div className="space-y-6">
            <h2 className="text-[1.75rem] leading-tight text-[#2C3E32]">
              What should I call you?
            </h2>

            {/* Input */}
            <div className="space-y-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full bg-white/70 backdrop-blur-sm border-2 border-[#D4DAD1] rounded-2xl px-5 py-4 text-[#2C3E32] placeholder:text-[#9AA8A0] focus:border-[#6B8E70] focus:outline-none transition-colors duration-200"
                autoFocus
              />
              <p className="text-sm text-[#7A8A7E] px-2">
                First name or nickname—totally up to you
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
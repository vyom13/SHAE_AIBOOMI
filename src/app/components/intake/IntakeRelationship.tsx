import { Users, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface IntakeRelationshipProps {
  onNext: (value: string) => void;
  onSkip?: () => void;
  onBack: () => void;
  initialValue?: string;
}

export function IntakeRelationship({ onNext, onSkip, onBack, initialValue = "" }: IntakeRelationshipProps) {
  const [selectedStatus, setSelectedStatus] = useState(initialValue);

  const handleContinue = () => {
    onNext(selectedStatus);
  };

  const statuses = [
    "Single",
    "In a relationship",
    "Married",
    "Separated / Divorced",
    "It's complicated",
    "Prefer not to say",
  ];

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
                i <= 3 ? "bg-[#6B8E70]" : "bg-[#D4DAD1]"
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
            <Users className="w-8 h-8 text-[#6B8E70]" strokeWidth={1.5} />
          </div>

          {/* Question */}
          <div className="space-y-6">
            <h2 className="text-[1.75rem] leading-tight text-[#2C3E32]">
              What does your personal life look like right now?
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`w-full py-4 px-5 rounded-xl border-2 transition-all duration-200 text-left ${
                    selectedStatus === status
                      ? "bg-[#6B8E70] border-[#6B8E70] text-white"
                      : "bg-white/70 border-[#D4DAD1] text-[#2C3E32] hover:border-[#9DB8A1]"
                  }`}
                >
                  {status}
                </button>
              ))}
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
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="px-6 py-4 text-[#6B8E70] rounded-2xl border-2 border-[#B8C9BC] hover:border-[#9DB8A1] transition-colors duration-200"
          >
            Back
          </button>
          <button
            onClick={handleContinue}
            className="flex-1 bg-[#6B8E70] text-white rounded-2xl px-6 py-4 flex items-center justify-center gap-2 hover:bg-[#5D7D63] transition-colors duration-200"
          >
            <span>Continue</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        <button
          onClick={onSkip}
          className="w-full text-[#7A8A7E] py-2 text-sm hover:text-[#6B8E70] transition-colors duration-200"
        >
          Skip for now
        </button>
      </motion.div>
    </motion.div>
  );
}

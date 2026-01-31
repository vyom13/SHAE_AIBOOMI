import { Briefcase, ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface IntakeRoleProps {
  onNext: (value: string) => void;
  onSkip?: () => void;
  onBack: () => void;
  initialValue?: string;
}

export function IntakeRole({ onNext, onSkip, onBack, initialValue = "" }: IntakeRoleProps) {
  const [selectedRole, setSelectedRole] = useState(initialValue);
  const [isOpen, setIsOpen] = useState(false);

  const handleContinue = () => {
    onNext(selectedRole);
  };

  const roles = [
    "Student",
    "Working professional",
    "Business / Self-employed",
    "Managing home or caregiving",
    "Between jobs",
    "Retired",
    "Other / Prefer not to say",
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
                i <= 2 ? "bg-[#6B8E70]" : "bg-[#D4DAD1]"
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
            <Briefcase className="w-8 h-8 text-[#6B8E70]" strokeWidth={1.5} />
          </div>

          {/* Question */}
          <div className="space-y-6">
            <h2 className="text-[1.75rem] leading-tight text-[#2C3E32]">
              Which best describes your current life setup?
            </h2>

            {/* Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-white/70 backdrop-blur-sm border-2 border-[#D4DAD1] rounded-2xl px-5 py-4 text-left flex items-center justify-between hover:border-[#9DB8A1] transition-colors duration-200"
              >
                <span className={selectedRole ? "text-[#2C3E32]" : "text-[#9AA8A0]"}>
                  {selectedRole || "Select one"}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#6B8E70] transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border-2 border-[#D4DAD1] overflow-hidden shadow-lg z-10"
                >
                  {roles.map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        setSelectedRole(role);
                        setIsOpen(false);
                      }}
                      className="w-full px-5 py-4 text-left hover:bg-[#EDF1EB] transition-colors duration-150 text-[#2C3E32]"
                    >
                      {role}
                    </button>
                  ))}
                </motion.div>
              )}
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

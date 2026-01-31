import { ArrowRight, Layers, X, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Checkbox } from "@/app/components/ui/checkbox";

interface ConceptTrustScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export function ConceptTrustScreen({ onNext, onBack }: ConceptTrustScreenProps) {
  const [hasAgreed, setHasAgreed] = useState(false);
  
  const notItems = [
    {
      text: "Not therapy",
      description: "SHAE is for reflection, not clinical treatment",
    },
    {
      text: "Not diagnosis",
      description: "We don't label or categorize your experiences",
    },
    {
      text: "Not advice",
      description: "You lead the conversation, we listen and reflect",
    },
  ];

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

      {/* Header with Back Button and Progress */}
      <div className="relative px-6 pt-8 pb-4">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onBack}
            className="flex items-center justify-center text-[#6B8E70] hover:text-[#5D7D63] transition-colors duration-200"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1" />
        </div>
        <div className="flex gap-1.5">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                i <= 0 ? "bg-[#6B8E70]" : "bg-[#D4DAD1]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="relative flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#B8C9BC] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:opacity-0 hover:[&::-webkit-scrollbar-thumb]:opacity-100 [&::-webkit-scrollbar-thumb]:transition-opacity">
        <div className="px-6 space-y-8 pb-32">
          {/* What SHAE Does Section */}
          <div className="space-y-4">
            {/* Visual Metaphor */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="flex justify-center"
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
                      transition={{ duration: 1.5, delay: 0.2 }}
                    />
                    <motion.path
                      d="M 40 96 Q 96 64, 152 96"
                      stroke="#B8C9BC"
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.5 }}
                      transition={{ duration: 1.5, delay: 0.4 }}
                    />
                    <motion.path
                      d="M 32 96 Q 96 80, 160 96"
                      stroke="#C5D3C8"
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.4 }}
                      transition={{ duration: 1.5, delay: 0.6 }}
                    />
                    <motion.circle
                      cx="96"
                      cy="96"
                      r="8"
                      fill="#6B8E70"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.4, duration: 0.3 }}
                    />
                  </svg>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
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

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="h-px bg-gradient-to-r from-transparent via-[#B8C9BC] to-transparent"
          />

          {/* What SHAE Is Not Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center space-y-3">
              <h2 className="text-[1.75rem] leading-tight text-[#2C3E32]">
                What SHAE is not
              </h2>
              <p className="text-base text-[#5A6B5E] leading-relaxed px-4">
                Let's be clear about boundaries—this helps build trust
              </p>
            </div>

            {/* Not Items */}
            <div className="space-y-3">
              {notItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#E8EDE6] flex items-center justify-center flex-shrink-0">
                      <X className="w-5 h-5 text-[#6B8E70]" strokeWidth={2.5} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-[#2C3E32]">{item.text}</p>
                      <p className="text-sm text-[#5A6B5E]">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Reassurance */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="text-center"
            >
              <p className="text-sm text-[#5A6B5E] leading-relaxed">
                SHAE is a companion for daily emotional hygiene.<br />
                If you need professional help, please reach out to a therapist.
              </p>
            </motion.div>
          </motion.div>

          {/* Agreement Checkbox */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-5"
          >
            <div className="flex items-start gap-3">
              <Checkbox
                id="understand-agreement"
                checked={hasAgreed}
                onCheckedChange={(checked) => setHasAgreed(checked === true)}
                className="mt-0.5"
              />
              <label
                htmlFor="understand-agreement"
                className="text-sm text-[#2C3E32] leading-relaxed cursor-pointer flex-1"
              >
                I understand what SHAE is and what it is not
              </label>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Fixed Navigation at Bottom */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        className="relative p-6 bg-gradient-to-t from-[#EDF1EB] to-transparent"
      >
        <button
          onClick={onNext}
          disabled={!hasAgreed}
          className={`w-full rounded-2xl px-6 py-4 flex items-center justify-center gap-2 transition-all duration-200 ${
            hasAgreed
              ? "bg-[#6B8E70] text-white hover:bg-[#5D7D63] cursor-pointer"
              : "bg-[#D4DAD1] text-[#9BA8A0] cursor-not-allowed"
          }`}
        >
          <span>Continue</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </motion.div>
    </motion.div>
  );
}
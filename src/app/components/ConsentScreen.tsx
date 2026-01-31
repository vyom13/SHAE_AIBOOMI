import { ArrowRight, Lock, Bell, Database } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Switch } from "@/app/components/ui/switch";
import { Checkbox } from "@/app/components/ui/checkbox";

interface ConsentScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export function ConsentScreen({ onNext, onBack }: ConsentScreenProps) {
  const [memoryConsent, setMemoryConsent] = useState(true);
  const [nudgeConsent, setNudgeConsent] = useState(true);
  const [hasAgreed, setHasAgreed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col h-full"
    >
      {/* Soft Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#EBF0EE] to-[#E5EAE7]" />

      {/* Progress Indicator */}
      <div className="relative px-6 pt-8 pb-4">
        <div className="flex gap-1.5">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                i <= 4 ? "bg-[#6B8E70]" : "bg-[#D4DAD1]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative flex-1 flex flex-col p-6 overflow-hidden">
        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto pb-6">
          {/* Header */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8 text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#9DB8A1]/20 mb-4">
              <Lock className="w-8 h-8 text-[#6B8E70]" />
            </div>
            <h2 className="text-[1.75rem] leading-tight text-[#2C3E32] mb-3">
              You're always in control
            </h2>
            <p className="text-base text-[#5A6B5E] leading-relaxed px-4">
              SHAE responds, you decide
            </p>
          </motion.div>

          {/* Consent Options */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="space-y-4 mb-6"
          >
            {/* Memory Consent */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E8EDE6] flex items-center justify-center flex-shrink-0">
                  <Database className="w-5 h-5 text-[#6B8E70]" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-[#2C3E32]">Remember our conversations</p>
                    <Switch
                      checked={memoryConsent}
                      onCheckedChange={setMemoryConsent}
                    />
                  </div>
                  <p className="text-sm text-[#5A6B5E] leading-relaxed">
                    Let SHAE remember context across check-ins to provide more personalized reflections
                  </p>
                </div>
              </div>
            </div>

            {/* Nudge Consent */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E8EDE6] flex items-center justify-center flex-shrink-0">
                  <Bell className="w-5 h-5 text-[#6B8E70]" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-[#2C3E32]">Gentle check-in nudges</p>
                    <Switch
                      checked={nudgeConsent}
                      onCheckedChange={setNudgeConsent}
                    />
                  </div>
                  <p className="text-sm text-[#5A6B5E] leading-relaxed">
                    Receive occasional reminders to check in with yourself (you pick the timing)
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Privacy Reassurance */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="bg-[#E8EDE6]/50 rounded-xl p-4 mb-6"
          >
            <p className="text-sm text-[#5A6B5E] leading-relaxed text-center">
              🔒 Your conversations are private and encrypted. You can delete your data anytime from settings.
            </p>
          </motion.div>

          {/* Agreement Checkbox */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-5"
          >
            <div className="flex items-start gap-3">
              <Checkbox
                id="terms-agreement"
                checked={hasAgreed}
                onCheckedChange={(checked) => setHasAgreed(checked === true)}
                className="mt-0.5"
              />
              <label
                htmlFor="terms-agreement"
                className="text-sm text-[#2C3E32] leading-relaxed cursor-pointer flex-1"
              >
                I understand and agree to proceed with SHAE
              </label>
            </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex gap-3 pt-4"
        >
          <button
            onClick={onBack}
            className="px-6 py-4 text-[#6B8E70] rounded-2xl border-2 border-[#B8C9BC] hover:border-[#9DB8A1] transition-colors duration-200"
          >
            Back
          </button>
          <button
            onClick={onNext}
            disabled={!hasAgreed}
            className={`flex-1 rounded-2xl px-6 py-4 flex items-center justify-center gap-2 transition-all duration-200 ${
              hasAgreed
                ? "bg-[#6B8E70] text-white hover:bg-[#5D7D63] cursor-pointer"
                : "bg-[#D4DAD1] text-[#9BA8A0] cursor-not-allowed"
            }`}
          >
            <span>Continue</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
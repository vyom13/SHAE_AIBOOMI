import { motion } from "motion/react";
import { ArrowLeft, Bell } from "lucide-react";
import { useState } from "react";

interface NotificationsScreenProps {
  onBack: () => void;
}

export function NotificationsScreen({ onBack }: NotificationsScreenProps) {
  const [nudgesEnabled, setNudgesEnabled] = useState(true);

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-[#EDF1EB] to-[#E8EBE6]">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-[#B8C9BC]/20 px-6 py-4 flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-[#E8EDE6] rounded-full transition-colors"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5 text-[#6B8E70]" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-medium text-[#2C3E2F]">Notifications</h1>
          <p className="text-xs text-[#6B8E70]">Manage your nudges</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-lg mx-auto space-y-6"
        >
          {/* Hero Card */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg text-center space-y-3">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#6B8E70]/10">
              <Bell className="w-7 h-7 text-[#6B8E70]" />
            </div>
            <h2 className="text-xl font-semibold text-[#2C3E2F]">
              Stay Connected
            </h2>
            <p className="text-xs text-[#5F6F68] leading-relaxed">
              Gentle nudges to help you build daily habits
            </p>
          </div>

          {/* Nudges Section */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-[#2C3E2F] mb-3">
              Daily Nudges
            </h3>

            {/* Nudges Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-xl bg-[#6B8E70]/10 flex items-center justify-center flex-shrink-0">
                  <Bell className="w-5 h-5 text-[#6B8E70]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#2C3E2F]">
                    Enable Nudges
                  </p>
                  <p className="text-xs text-[#5F6F68]">
                    {nudgesEnabled ? "You'll receive daily reminders" : "Nudges are turned off"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setNudgesEnabled(!nudgesEnabled)}
                className={`relative w-12 h-7 rounded-full transition-colors ${
                  nudgesEnabled ? "bg-[#6B8E70]" : "bg-[#D1D5D8]"
                }`}
              >
                <motion.div
                  layout
                  className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
                  animate={{
                    left: nudgesEnabled ? "26px" : "4px",
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
            </div>

            {/* Nudge Description */}
            {nudgesEnabled && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="pt-2 border-t border-[#B8C9BC]/20"
              >
                <p className="text-xs text-[#5F6F68] leading-relaxed">
                  SHAE will send you gentle reminders to check in with yourself, reflect on your day, and complete your micro-actions.
                </p>
              </motion.div>
            )}
          </div>

          {/* What are nudges? */}
          <div className="bg-[#6B8E70]/5 rounded-2xl p-5">
            <h4 className="text-sm font-semibold text-[#2C3E2F] mb-3">
              What are nudges?
            </h4>
            <div className="space-y-3 text-xs text-[#5F6F68] leading-relaxed">
              <p>
                Nudges are gentle reminders designed to help you build consistent emotional wellness habits without feeling overwhelming.
              </p>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-[#6B8E70] mt-0.5">•</span>
                  <span>Daily check-in reminders</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6B8E70] mt-0.5">•</span>
                  <span>Micro-action completion prompts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6B8E70] mt-0.5">•</span>
                  <span>Reflection time suggestions</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Info Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="px-4 py-3 bg-[#6B8E70]/10 rounded-xl"
          >
            <p className="text-xs text-[#5F6F68] leading-relaxed text-center">
              <strong className="text-[#2C3E2F]">Note:</strong> You can adjust notification settings anytime to suit your rhythm and preferences.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

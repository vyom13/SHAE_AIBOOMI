import { useState } from "react";
import { motion } from "motion/react";
import { Clock, Wind, Lightbulb, Waves, Zap, X, Trash2, Check } from "lucide-react";
import { StabilizeCardContent } from "./actions/StabilizeCardContent";
import { ReleaseCardContent } from "./actions/ReleaseCardContent";
import { ActivateCardContent } from "./actions/ActivateCardContent";

type MicroActionVariant = "stabilize" | "release" | "reflect" | "process" | "activate";
type CardState = "idle" | "active" | "completed";

interface MicroActionCardProps {
  variant: MicroActionVariant;
  title: string;
  description: string;
  timing?: number; // in seconds
  memoryEnabled?: boolean;
  nudgeAllowed?: boolean;
  autoSuggest?: boolean;
  showConsent?: boolean;
  onStart: () => void;
  onSkip: () => void;
  onComplete?: () => void;
  isActive?: boolean;
}

const variantConfig = {
  stabilize: {
    accent: "#A7C7B7",
    icon: Wind,
    label: "STABILIZE",
  },
  release: {
    accent: "#E6B8A2",
    icon: Zap,
    label: "RELEASE",
  },
  reflect: {
    accent: "#C3C7E5",
    icon: Lightbulb,
    label: "REFLECT",
  },
  process: {
    accent: "#B8C4E6",
    icon: Waves,
    label: "PROCESS",
  },
  activate: {
    accent: "#D7C9A8",
    icon: Clock,
    label: "ACTIVATE",
  },
};

export function MicroActionCard({
  variant,
  title,
  description,
  timing,
  showConsent = false,
  onStart,
  onSkip,
  onComplete,
  isActive = false,
}: MicroActionCardProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;
  const [isHovered, setIsHovered] = useState(false);

  const handleStart = () => {
    onStart();
  };

  const handleSkip = () => {
    onSkip();
  };

  const handleComplete = () => {
    if (onComplete) {
      onComplete();
    }
  };

  // Show active state with content
  if (isActive) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-[328px]"
      >
        <div
          className="bg-[#F6F7F4] rounded-2xl p-4 shadow-lg"
          style={{
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${config.accent}40` }}
            >
              <Icon
                className="w-4 h-4"
                style={{ color: config.accent }}
              />
            </div>
            <span
              className="text-xs font-medium tracking-wide"
              style={{ 
                color: config.accent,
                letterSpacing: "0.04em"
              }}
            >
              {config.label}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-[#1F2A24] mb-4">
            {title}
          </h3>

          {/* Active Content */}
          {variant === "stabilize" && <StabilizeCardContent />}
          {variant === "release" && <ReleaseCardContent />}
          {variant === "activate" && <ActivateCardContent />}

          {/* Done Button */}
          <button
            onClick={handleComplete}
            className="w-full mt-4 py-3 px-4 rounded-xl font-medium text-sm text-white transition-all duration-200 min-h-[44px]"
            style={{
              backgroundColor: config.accent,
            }}
          >
            Done
          </button>
        </div>
      </motion.div>
    );
  }

  // Show initial card content (idle state)
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-[328px]"
    >
      <div
        className="bg-[#F6F7F4] rounded-2xl p-4 shadow-lg"
        style={{
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${config.accent}40` }}
          >
            <Icon
              className="w-4 h-4"
              style={{ color: config.accent }}
            />
          </div>
          <span
            className="text-xs font-medium tracking-wide"
            style={{ 
              color: config.accent,
              letterSpacing: "0.04em"
            }}
          >
            {config.label}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-[#1F2A24] mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[#5F6F68] leading-relaxed mb-3">
          {description}
        </p>

        {/* Timing (if provided) */}
        {timing && (
          <div className="flex items-center gap-1.5 mb-4">
            <Clock className="w-3.5 h-3.5 text-[#5F6F68]" />
            <span className="text-xs text-[#5F6F68]">
              {timing < 60 ? `${timing} seconds` : `${Math.floor(timing / 60)} minutes`}
            </span>
          </div>
        )}

        {/* Consent Note */}
        {showConsent && (
          <div className="mb-4 px-3 py-2 bg-white/60 rounded-lg">
            <p className="text-xs text-[#5F6F68] opacity-70">
              This won't be saved unless you choose.
            </p>
          </div>
        )}

        {/* CTA Row */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleStart}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex-1 py-3 px-4 rounded-xl font-medium text-sm text-white transition-all duration-200 min-h-[44px]"
            style={{
              backgroundColor: config.accent,
              filter: isHovered ? "brightness(0.92)" : "brightness(1)",
            }}
          >
            Try this
          </button>
          <button
            onClick={handleSkip}
            className="px-4 py-3 rounded-xl font-medium text-sm text-[#5F6F68] hover:bg-white/60 transition-colors duration-200 min-h-[44px]"
          >
            Not now
          </button>
        </div>
      </div>
    </motion.div>
  );
}
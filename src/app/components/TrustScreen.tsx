import { ArrowRight, ShieldCheck, X } from "lucide-react";
import { motion } from "motion/react";

interface TrustScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export function TrustScreen({ onNext, onBack }: TrustScreenProps) {
  const notItems = [
    {
      icon: X,
      text: "Not therapy",
      description: "SHAE is for reflection, not clinical treatment",
    },
    {
      icon: X,
      text: "Not diagnosis",
      description: "We don't label or categorize your experiences",
    },
    {
      icon: X,
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
      <div className="absolute inset-0 bg-gradient-to-br from-[#EBF0EE] to-[#E3E8E5]" />

      {/* Progress Indicator */}
      <div className="relative px-6 pt-8 pb-4">
        <div className="flex gap-1.5">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                i <= 2 ? "bg-[#6B8E70]" : "bg-[#D4DAD1]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative flex-1 flex flex-col justify-between p-6">
        <div className="flex-1 flex flex-col justify-center">
          {/* Header with Shield Icon */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8 text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#9DB8A1]/20 mb-4">
              <ShieldCheck className="w-8 h-8 text-[#6B8E70]" />
            </div>
            <h2 className="text-[1.75rem] leading-tight text-[#2C3E32] mb-3">
              What SHAE is not
            </h2>
            <p className="text-base text-[#5A6B5E] leading-relaxed px-4">
              Let's be clear about boundaries—this helps build trust
            </p>
          </motion.div>

          {/* Not Items */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="space-y-4"
          >
            {notItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#E8EDE6] flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-[#6B8E70]" strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-[#2C3E32]">{item.text}</p>
                    <p className="text-sm text-[#5A6B5E]">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Reassurance */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-6 text-center"
          >
            <p className="text-sm text-[#5A6B5E] leading-relaxed">
              SHAE is a companion for daily emotional hygiene.<br />
              If you need professional help, please reach out to a therapist.
            </p>
          </motion.div>
        </div>

        {/* Navigation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
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
            <span>I understand</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

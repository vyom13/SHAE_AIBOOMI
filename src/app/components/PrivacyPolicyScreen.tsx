import { motion } from "motion/react";
import { ArrowLeft, Shield } from "lucide-react";

interface PrivacyPolicyScreenProps {
  onBack: () => void;
}

export function PrivacyPolicyScreen({ onBack }: PrivacyPolicyScreenProps) {
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
          <h1 className="text-lg font-medium text-[#2C3E2F]">Privacy Policy</h1>
          <p className="text-xs text-[#6B8E70]">Your data, your control</p>
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
              <Shield className="w-7 h-7 text-[#6B8E70]" />
            </div>
            <h2 className="text-xl font-semibold text-[#2C3E2F]">
              Your Privacy Matters
            </h2>
            <p className="text-xs text-[#5F6F68] leading-relaxed">
              Last updated: January 31, 2026
            </p>
          </div>

          {/* Privacy Sections */}
          <div className="space-y-4">
            {[
              {
                title: "What We Collect",
                content: "We collect only the information you choose to share: your name, age, responses to intake questions, and conversation history with SHAE. This helps us provide personalized support and improve your experience."
              },
              {
                title: "How We Use Your Data",
                content: "Your data powers your SHAE experience: personalizing conversations, suggesting relevant micro-actions, and tracking your progress. We never sell your data or use it for advertising."
              },
              {
                title: "Data Storage & Security",
                content: "All conversations and personal data are encrypted and stored securely. Your data is accessible only to you through your secure session. We use industry-standard security practices to protect your information."
              },
              {
                title: "Your Control",
                content: "You own your data. You can review, edit, or delete your information at any time through your Profile settings. You can also request a complete export of your data."
              },
              {
                title: "Data Retention",
                content: "We retain your data for as long as you maintain an active account. If you delete your account, we remove your personal data within 30 days, except where required by law."
              },
              {
                title: "Third-Party Services",
                content: "SHAE uses Meta's Llama model for AI conversations. Your data is processed according to strict privacy standards and is not used to train public AI models."
              },
              {
                title: "Children's Privacy",
                content: "SHAE is designed for adults aged 20-40. We do not knowingly collect information from individuals under 18."
              },
              {
                title: "Changes to This Policy",
                content: "We may update this policy as SHAE evolves. We'll notify you of significant changes through the app and via email."
              },
              {
                title: "Contact Us",
                content: "Questions about privacy? Reach us at privacy@shae.app or through the app's support feature."
              }
            ].map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 shadow-sm"
              >
                <h3 className="text-sm font-semibold text-[#2C3E2F] mb-2">
                  {section.title}
                </h3>
                <p className="text-xs text-[#5F6F68] leading-relaxed">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="px-4 py-3 bg-[#6B8E70]/10 rounded-xl"
          >
            <p className="text-xs text-[#5F6F68] leading-relaxed text-center">
              <strong className="text-[#2C3E2F]">Important:</strong> SHAE is not a substitute for professional mental health care. If you're in crisis, please contact emergency services or a mental health professional.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

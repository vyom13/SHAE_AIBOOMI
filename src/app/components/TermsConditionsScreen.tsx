import { motion } from "motion/react";
import { ArrowLeft, FileText } from "lucide-react";

interface TermsConditionsScreenProps {
  onBack: () => void;
}

export function TermsConditionsScreen({ onBack }: TermsConditionsScreenProps) {
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
          <h1 className="text-lg font-medium text-[#2C3E2F]">Terms & Conditions</h1>
          <p className="text-xs text-[#6B8E70]">Using SHAE responsibly</p>
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
              <FileText className="w-7 h-7 text-[#6B8E70]" />
            </div>
            <h2 className="text-xl font-semibold text-[#2C3E2F]">
              Terms of Service
            </h2>
            <p className="text-xs text-[#5F6F68] leading-relaxed">
              Last updated: January 31, 2026
            </p>
          </div>

          {/* Terms Sections */}
          <div className="space-y-4">
            {[
              {
                title: "Acceptance of Terms",
                content: "By accessing and using SHAE, you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use the service."
              },
              {
                title: "Description of Service",
                content: "SHAE (Self-Help Agentic Experience) is an AI-powered mental wellness companion designed to support emotional well-being through conversation and personalized micro-actions. SHAE is not a substitute for professional mental health treatment."
              },
              {
                title: "User Eligibility",
                content: "SHAE is intended for adults aged 18 and above. By using SHAE, you confirm that you meet this age requirement and have the capacity to enter into this agreement."
              },
              {
                title: "User Responsibilities",
                content: "You agree to provide accurate information during onboarding, use SHAE in good faith for personal wellness, and not misuse the service for harmful, illegal, or inappropriate purposes. You're responsible for maintaining the confidentiality of your account."
              },
              {
                title: "Not Medical Advice",
                content: "SHAE provides general wellness support and is not a licensed medical or mental health professional. Content from SHAE should not be considered medical advice, diagnosis, or treatment. Always seek professional help for serious mental health concerns."
              },
              {
                title: "Crisis Situations",
                content: "If you are experiencing a mental health crisis, suicidal thoughts, or immediate danger, please contact emergency services (911) or a crisis helpline immediately. SHAE is not equipped to handle emergency situations."
              },
              {
                title: "Intellectual Property",
                content: "All content, features, and functionality of SHAE are owned by SHAE and are protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, or distribute any part of SHAE without permission."
              },
              {
                title: "Limitation of Liability",
                content: "SHAE is provided 'as is' without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of the service. Your use of SHAE is at your own risk."
              },
              {
                title: "Data Usage",
                content: "By using SHAE, you consent to our collection and use of data as described in our Privacy Policy. Your conversations and progress data are used to personalize your experience."
              },
              {
                title: "Account Termination",
                content: "We reserve the right to suspend or terminate your account if you violate these terms or engage in behavior that harms SHAE or other users. You may delete your account at any time through Profile settings."
              },
              {
                title: "Modifications to Service",
                content: "We may modify, suspend, or discontinue any aspect of SHAE at any time. We'll provide notice of significant changes when possible, but are not obligated to do so."
              },
              {
                title: "Changes to Terms",
                content: "We may update these Terms from time to time. Continued use of SHAE after changes constitutes acceptance of the new Terms. We'll notify you of material changes."
              },
              {
                title: "Governing Law",
                content: "These Terms are governed by the laws of India. Any disputes will be resolved in accordance with Indian jurisdiction."
              },
              {
                title: "Contact Information",
                content: "For questions about these Terms, contact us at legal@shae.app or through the app's support feature."
              }
            ].map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.04 }}
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

          {/* Agreement Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="px-4 py-3 bg-[#6B8E70]/10 rounded-xl"
          >
            <p className="text-xs text-[#5F6F68] leading-relaxed text-center">
              <strong className="text-[#2C3E2F]">By using SHAE, you agree to these Terms & Conditions.</strong> Your mental wellness journey is important to us, and these terms help ensure a safe, respectful experience for everyone.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

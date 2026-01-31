import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface WelcomeScreenProps {
  onNext: () => void;
}

export function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col h-full"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E8EDE6] via-[#EAE4DB] to-[#DFE0DD]" />
      
      {/* Content */}
      <div className="relative flex-1 flex flex-col justify-between p-6 pt-16">
        {/* Logo/Brand */}
        <div className="flex-1 flex flex-col justify-center items-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-12"
          >
            {/* Abstract breathing illustration */}
            <div className="relative w-32 h-32">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full bg-[#9DB8A1] opacity-40"
              />
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute inset-4 rounded-full bg-[#B8C9BC] opacity-30"
              />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute inset-8 rounded-full bg-[#C5D3C8] opacity-20"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center space-y-4 max-w-sm"
          >
            <h1 className="text-[2rem] leading-tight tracking-tight text-[#2C3E32]">
              A calmer way to check in with yourself
            </h1>
            <p className="text-lg text-[#5A6B5E] leading-relaxed">
              No labels. No judgment. Just clarity.
            </p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="space-y-4"
        >
          <button
            onClick={onNext}
            className="w-full bg-[#6B8E70] text-white rounded-2xl px-6 py-4 flex items-center justify-center gap-2 hover:bg-[#5D7D63] transition-colors duration-200"
          >
            <span className="text-lg">Get started</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-center text-sm text-[#7A8A7E]">
            Takes about 2 minutes
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

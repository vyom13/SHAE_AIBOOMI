import { Sparkles, Compass } from "lucide-react";
import { motion } from "motion/react";

interface StartScreenProps {
  onStart: () => void;
  onExplore: () => void;
  onBack: () => void;
}

export function StartScreen({ onStart, onExplore, onBack }: StartScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col h-full"
    >
      {/* Soft Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E8EDE6] via-[#EDF1EB] to-[#E3E8E5]" />

      {/* Progress Indicator */}
      <div className="relative px-6 pt-8 pb-4">
        <div className="flex gap-1.5">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-1 flex-1 rounded-full bg-[#6B8E70] transition-colors duration-300"
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative flex-1 flex flex-col justify-between p-6">
        <div className="flex-1 flex flex-col justify-center">
          {/* Celebration Graphic */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            className="mb-8 flex justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-32 h-32 rounded-full bg-gradient-to-br from-[#9DB8A1] to-[#6B8E70] flex items-center justify-center"
              >
                <Sparkles className="w-16 h-16 text-white" strokeWidth={1.5} />
              </motion.div>
              {/* Floating particles */}
              <motion.div
                animate={{
                  y: [-10, -20, -10],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -right-2 w-3 h-3 rounded-full bg-[#B8C9BC]"
              />
              <motion.div
                animate={{
                  y: [-5, -15, -5],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute -top-2 -left-4 w-2 h-2 rounded-full bg-[#C5D3C8]"
              />
              <motion.div
                animate={{
                  y: [-8, -18, -8],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute top-0 right-8 w-2.5 h-2.5 rounded-full bg-[#9DB8A1]"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center space-y-6"
          >
            <div className="space-y-3">
              <h2 className="text-[2rem] leading-tight text-[#2C3E32]">
                Let's Talk!
              </h2>
              <p className="text-lg text-[#5A6B5E] leading-relaxed px-4">
                SHAE is ready to be your companion for reflection and clarity
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6">
              <p className="text-base text-[#2C3E32] leading-relaxed">
                Remember: there are no right or wrong answers here. Just honest moments with yourself.
              </p>
            </div>
          </motion.div>
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="space-y-3"
        >
          <button
            onClick={onStart}
            className="w-full bg-[#6B8E70] text-white rounded-2xl px-6 py-4 flex items-center justify-center gap-2 hover:bg-[#5D7D63] transition-colors duration-200"
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-lg">Begin with SHAE</span>
          </button>
          
          <p className="text-center text-sm text-[#7A8A7E] pt-2">
            You can change your mind anytime
          </p>
          
          {/* Back button for navigation */}
          <button
            onClick={onBack}
            className="w-full text-[#7A8A7E] py-2 text-sm hover:text-[#6B8E70] transition-colors duration-200"
          >
            Go back
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
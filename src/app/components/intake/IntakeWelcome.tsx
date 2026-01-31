import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

interface IntakeWelcomeProps {
  onNext: () => void;
  onSkip: () => void;
}

interface Translation {
  greeting: string;
  intro: string;
  tagline: string;
  button: string;
  language: string;
}

const translations: Translation[] = [
  {
    language: "English",
    greeting: "Hi, I'm SHAE.",
    intro:
      "Before we begin, I'd love to get to know you a little. Only what you're comfortable sharing.",
    tagline: "No labels. No judgment. Just clarity.",
    button: "Sounds good",
  },
  {
    language: "हिंदी",
    greeting: "नमस्ते, मैं SHAE हूं।",
    intro:
      "शुरू करने से पहले, मैं आपके बारे में थोड़ा जानना चाहूंगी। सिर्फ वही जो आप साझा करने में सहज हों।",
    tagline: "कोई लेबल नहीं। कोई निर्णय नहीं। बस स्पष्टता।",
    button: "ठीक है",
  },
  {
    language: "తెలుగు",
    greeting: "హాయ్, నేను SHAE.",
    intro:
      "మనం ప్రారంభించే ముందు, మీ గురించి కొంచెం తెలుసుకోవాలనుకుంటున్నాను. మీరు సౌకర్యంగా భాగస్వామ్యం చేయగలిగినది మాత్రమే.",
    tagline: "లేబుల్స్ లేవు. తీర్పు లేదు. కేవలం స్పష్టత.",
    button: "సరే",
  },
  {
    language: "ਪੰਜਾਬੀ",
    greeting: "ਹੈਲੋ, ਮੈਂ SHAE ਹਾਂ।",
    intro:
      "ਸ਼ੁਰੂ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ, ਮੈਂ ਤੁਹਾਡੇ ਬਾਰੇ ਥੋੜਾ ਜਾਣਨਾ ਚਾਹਾਂਗੀ। ਸਿਰਫ਼ ਉਹੀ ਜੋ ਤੁਸੀਂ ਸਾਂਝਾ ਕਰਨ ਵਿੱਚ ਸਹਿਜ ਹੋ।",
    tagline: "ਕੋਈ ਲੇਬਲ ਨਹੀਂ। ਕੋਈ ਫ਼ੈਸਲਾ ਨਹੀਂ। ਸਿਰਫ਼ ਸਪਸ਼ਟਤਾ।",
    button: "ਠੀਕ ਹੈ",
  },
  {
    language: "தமிழ்",
    greeting: "வணக்கம், நான் SHAE.",
    intro:
      "நாம் தொடங்கும் முன், உங்களை பற்றி கொஞ்சம் தெரிந்துகொள்ள விரும்புகிறேன். நீங்கள் வசதியாக பகிர்ந்துகொள்ளக்கூடியது மட்டும்.",
    tagline: "லேபிள்கள் இல்லை. தீர்ப்பு இல்லை. தெளிவு மட்டுமே.",
    button: "சரி",
  },
  {
    language: "বাংলা",
    greeting: "হাই, আমি SHAE।",
    intro:
      "শুরু করার আগে, আমি আপনার সম্পর্কে একটু জানতে চাই। শুধুমাত্র যা আপনি শেয়ার করতে স্বাচ্ছন্দ্য বোধ করেন।",
    tagline: "কোনো লেবেল নেই। কোনো বিচার নেই। শুধু স্পষ্টতা।",
    button: "ঠিক আছে",
  },
];

export function IntakeWelcome({
  onNext,
  onSkip,
}: IntakeWelcomeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(
          (prev) => (prev + 1) % translations.length,
        );
        setIsAnimating(false);
      }, 300); // Half of the transition duration
    }, 4000); // Change language every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const currentTranslation = translations[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#EDF1EB] to-[#E8EBE6]" />

      <div className="relative flex-1 flex flex-col justify-center p-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center space-y-8 max-w-sm mx-auto"
        >
          {/* Animated Breathing Illustration */}
          <div className="flex justify-center">
            <div className="relative w-48 h-48 flex items-center justify-center">
              {/* Outer circle */}
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute w-48 h-48 rounded-full bg-gradient-to-br from-[#B8C9BC]/40 to-[#9DB8A1]/40"
              />

              {/* Middle circle */}
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.5, 0.7, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3,
                }}
                className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-[#9DB8A1]/60 to-[#7A9B7E]/60"
              />

              {/* Inner circle */}
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.5, 0.7, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6,
                }}
                className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-[#7A9B7E]/20 to-[#6B8E70]/20"
              />
            </div>
          </div>

          {/* Text */}
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                }}
                className="space-y-4"
              >
                {/* Language Indicator */}
                <div className="flex justify-center mb-2">
                  <span className="text-xs text-[#6B8E70] bg-[#6B8E70]/10 px-3 py-1 rounded-full">
                    {currentTranslation.language}
                  </span>
                </div>

                <h1 className="text-[2rem] leading-tight text-[#2C3E32]">
                  {currentTranslation.greeting}
                </h1>
                <div className="space-y-2">
                  <p className="text-lg text-[#5A6B5E] leading-relaxed">
                    {currentTranslation.intro}
                  </p>
                  <p className="text-base text-[#7A8A7E]">
                    {currentTranslation.tagline}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* CTAs */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="relative p-6"
      >
        <button
          onClick={onNext}
          className="w-full bg-[#6B8E70] text-white rounded-2xl px-6 py-4 hover:bg-[#5D7D63] transition-colors duration-200"
        >
          {currentTranslation.button}
        </button>
      </motion.div>
    </motion.div>
  );
}
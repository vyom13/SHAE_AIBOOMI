import { useState } from "react";
import { motion } from "motion/react";
import { Trash2 } from "lucide-react";

export function ReleaseCardContent() {
  const [text, setText] = useState("");
  const [isBurning, setIsBurning] = useState(false);

  const handleBurn = () => {
    if (!text.trim()) return;
    
    setIsBurning(true);
    setTimeout(() => {
      setText("");
      setIsBurning(false);
    }, 1500);
  };

  return (
    <div className="relative">
      <motion.div
        animate={{
          opacity: isBurning ? 0 : 1,
          scale: isBurning ? 0.95 : 1,
        }}
        transition={{ duration: 1.5 }}
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What do you want to release?"
          className="w-full h-32 bg-white rounded-xl p-3 resize-none outline-none text-sm text-[#1F2A24] placeholder:text-[#8FA895] border border-[#B8C9BC]/20 focus:border-[#E6B8A2] transition-colors"
          autoFocus
        />
        
        <p className="text-xs text-center text-[#5F6F68] opacity-70 mt-2 mb-3">
          This won't be saved. It's just for you, right now.
        </p>
        
        <button
          onClick={handleBurn}
          disabled={!text.trim() || isBurning}
          className="w-full py-3 px-4 bg-[#E6B8A2] text-white rounded-xl font-medium hover:bg-[#E6B8A2]/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Let it go
        </button>
      </motion.div>

      {isBurning && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 1] }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <span className="text-5xl">🔥</span>
        </motion.div>
      )}
    </div>
  );
}

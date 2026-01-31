import { useState } from "react";
import { motion } from "motion/react";
import { X, Trash2 } from "lucide-react";

interface ReleaseActionProps {
  title: string;
  onComplete: () => void;
  onClose: () => void;
}

export function ReleaseAction({ title, onComplete, onClose }: ReleaseActionProps) {
  const [text, setText] = useState("");
  const [isBurning, setIsBurning] = useState(false);

  const handleBurn = () => {
    setIsBurning(true);
    setTimeout(() => {
      setText("");
      setIsBurning(false);
      onComplete();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-[#E8EDE6] z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#B8C9BC]/20">
        <div>
          <h2 className="text-lg font-semibold text-[#1F2A24]">{title}</h2>
          <p className="text-sm text-[#5F6F68]">Write it down, then let it go</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/60 rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-[#5F6F68]" />
        </button>
      </div>

      {/* Writing Area */}
      <div className="flex-1 flex flex-col px-6 py-8">
        <motion.div
          animate={{
            opacity: isBurning ? 0 : 1,
            scale: isBurning ? 0.95 : 1,
          }}
          transition={{ duration: 1.5 }}
          className="flex-1"
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What do you want to release? Write freely..."
            className="w-full h-full bg-white rounded-2xl p-6 resize-none outline-none text-[#1F2A24] placeholder:text-[#8FA895] shadow-sm border border-[#B8C9BC]/20 focus:border-[#E6B8A2] transition-colors"
            autoFocus
          />
        </motion.div>

        {isBurning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-[#E8EDE6]"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0],
              }}
              transition={{
                duration: 1.5,
                ease: "easeOut",
              }}
              className="text-6xl"
            >
              🔥
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Actions */}
      <div className="px-6 pb-6 space-y-3">
        <p className="text-xs text-center text-[#5F6F68] opacity-70">
          This won't be saved. It's just for you, right now.
        </p>
        <div className="flex gap-3">
          <button
            onClick={handleBurn}
            disabled={!text.trim() || isBurning}
            className="flex-1 py-4 px-6 bg-[#E6B8A2] text-white rounded-2xl font-medium hover:bg-[#E6B8A2]/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Let it go
          </button>
          <button
            onClick={onClose}
            className="px-6 py-4 rounded-2xl font-medium text-[#5F6F68] hover:bg-white/60 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState, useRef, useEffect } from "react";
import { Send, Menu, Mic, Square, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { MicroActionSuggestion } from "./chat/MicroActionSuggestion";
import { MenuDropdown } from "./MenuDropdown";
import { sendMessage } from "../services/api";
import { getSessionId } from "../utils/session";

interface Message {
  id: string;
  text: string;
  sender: "user" | "shae" | "system";
  timestamp: Date;
  showMicroActions?: boolean;
}

interface ChatScreenProps {
  onBack: () => void;
  onProfileOpen: () => void;
  onCommunityOpen: () => void;
  onSettingsOpen: () => void;
  onNotificationsOpen: () => void;
  onAboutOpen: () => void;
  onPrivacyOpen: () => void;
  onTermsOpen: () => void;
}

export function ChatScreen({ onBack, onProfileOpen, onCommunityOpen, onSettingsOpen, onNotificationsOpen, onAboutOpen, onPrivacyOpen, onTermsOpen }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey there 👋 I'm SHAE. I'm here to listen, reflect, and explore alongside you—no judgments, no prescriptions. What's on your mind today?",
      sender: "shae",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showMicroActions, setShowMicroActions] = useState(false);
  const [activeActionId, setActiveActionId] = useState<string | null>(null);
  const [completedActionId, setCompletedActionId] = useState<string | null>(null);
  const [completedActionIds, setCompletedActionIds] = useState<string[]>([]);
  const [messageCount, setMessageCount] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [showMicroActions]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const messageText = inputValue;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setMessageCount((prev) => prev + 1);

    // Show SHAE typing indicator
    setIsTyping(true);

    try {
      // Call the LLAMA backend
      const response = await sendMessage(getSessionId(), messageText);

      // Create SHAE message from response
      const shaeMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.reply,
        sender: "shae",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, shaeMessage]);
      setIsTyping(false);

      // Only show micro actions when backend explicitly suggests them
      // This respects the coaching agent's orchestration logic
      if (response.ui_actions && response.ui_actions.length > 0) {
        const suggestedAction = response.ui_actions[0];
        const matchingAction = microActions.find(a => a.id === suggestedAction.id);

        if (matchingAction) {
          // Backend coaching agent suggested this specific action
          setTimeout(() => {
            setShowMicroActions(true);
          }, 1000);
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);

      // Show error message to user
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting right now. Please try again in a moment.",
        sender: "shae",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };

  // Micro actions that match backend ALLOWED_UI_ACTIONS (prompts.py)
  // Only includes actions that exist in both frontend and backend
  const microActions = [
    {
      id: "square_breathing",
      variant: "stabilize" as const,
      title: "Square Breathing",
      description: "A calming 4-4-4-4 breath pattern to ground yourself right now.",
      timing: 60,
      showConsent: false,
    },
    {
      id: "burn_journaling",
      variant: "release" as const,
      title: "Burn Journaling",
      description: "Write what's weighing on you, then let it go—no saving, no holding on.",
      showConsent: true,
    },
    {
      id: "two_minute_rule",
      variant: "activate" as const,
      title: "2-Minute Rule",
      description: "Pick one small thing. Just start. Momentum will follow.",
      timing: 120,
      showConsent: false,
    },
  ];

  const handleActionStart = (actionId: string) => {
    setActiveActionId(actionId);
  };

  const handleActionSkip = (actionId: string) => {
    setShowMicroActions(false);
    
    // Add a gentle acknowledgment from SHAE
    setTimeout(() => {
      const skipMessage: Message = {
        id: Date.now().toString(),
        text: "That's okay. I'm here whenever you're ready. What else is on your mind?",
        sender: "shae",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, skipMessage]);
    }, 300);
  };

  const handleActionComplete = (actionId: string) => {
    const completedAction = microActions.find(a => a.id === actionId);
    
    // Hide micro actions immediately
    setShowMicroActions(false);
    setActiveActionId(null);

    // Add compact completion message to chat
    if (completedAction) {
      const completionMessage: Message = {
        id: Date.now().toString(),
        text: `✓ Completed: ${completedAction.title}`,
        sender: "system",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, completionMessage]);
      setCompletedActionIds((prev) => [...prev, actionId]);
    }

    // Add affirmation from SHAE after a brief delay
    setTimeout(() => {
      const completeMessage: Message = {
        id: Date.now().toString(),
        text: "Nice work. How are you feeling now?",
        sender: "shae",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, completeMessage]);
    }, 500);
  };

  const handleActionClose = () => {
    setShowMicroActions(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = async () => {
    try {
      // In a real app, you would request microphone permission here
      // const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      setIsRecording(true);
      setRecordingDuration(0);
      
      // Start timer
      recordingIntervalRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
      
      // In a real implementation, start recording audio here
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const handleStopRecording = async () => {
    // Stop timer
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
      recordingIntervalRef.current = null;
    }

    // In a real implementation, stop recording and process audio here
    // For now, we'll simulate sending a voice message
    const voiceMessageText = "🎤 Voice message (transcription would appear here)";
    const voiceMessage: Message = {
      id: Date.now().toString(),
      text: voiceMessageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, voiceMessage]);
    setMessageCount((prev) => prev + 1);
    setIsRecording(false);
    setRecordingDuration(0);

    // Show SHAE typing indicator
    setIsTyping(true);

    try {
      // Call the LLAMA backend
      const response = await sendMessage("default-session", voiceMessageText);

      const shaeMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.reply,
        sender: "shae",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, shaeMessage]);
      setIsTyping(false);

      // Only show micro actions when backend explicitly suggests them
      // This respects the coaching agent's orchestration logic
      if (response.ui_actions && response.ui_actions.length > 0) {
        const suggestedAction = response.ui_actions[0];
        const matchingAction = microActions.find(a => a.id === suggestedAction.id);

        if (matchingAction) {
          // Backend coaching agent suggested this specific action
          setTimeout(() => {
            setShowMicroActions(true);
          }, 1000);
        }
      }
    } catch (error) {
      console.error("Error sending voice message:", error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting right now. Please try again in a moment.",
        sender: "shae",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };

  const handleCancelRecording = () => {
    // Stop timer
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
      recordingIntervalRef.current = null;
    }
    
    setIsRecording(false);
    setRecordingDuration(0);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full bg-gradient-to-br from-[#E8EDE6] to-[#E3E8E5] relative"
    >
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-[#B8C9BC]/20 px-6 py-4 flex items-center justify-between relative"
      >
        <div className="w-9" /> {/* Spacer for centering */}
        <div className="flex-1 text-center">
          <h1 className="text-lg font-medium text-[#2C3E2F]">SHAE</h1>
          <p className="text-xs text-[#6B8E70]">here to listen</p>
        </div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 hover:bg-[#E8EDE6] rounded-full transition-colors"
          aria-label="Menu"
        >
          <Menu className="w-5 h-5 text-[#6B8E70]" />
        </button>
      </div>

      {/* Menu Dropdown */}
      <MenuDropdown
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onProfileClick={onProfileOpen}
        onCommunityClick={onCommunityOpen}
        onSettingsClick={onSettingsOpen}
        onNotificationsClick={onNotificationsOpen}
        onAboutClick={onAboutOpen}
        onPrivacyClick={onPrivacyOpen}
        onTermsClick={onTermsOpen}
      />

      {/* Messages Area */}
      <div 
        className={`flex-1 overflow-y-auto px-6 py-6 space-y-4 transition-all duration-300 ${
          activeActionId ? 'blur-sm' : ''
        }`}
      >
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${
              message.sender === "user" 
                ? "justify-end" 
                : message.sender === "system"
                ? "justify-center"
                : "justify-start"
            }`}
          >
            {message.sender === "system" ? (
              // Compact system message for completed actions
              <div className="bg-[#F6F7F4] rounded-full px-4 py-2 shadow-sm border border-[#B8C9BC]/20">
                <p className="text-xs text-[#5F6F68]">{message.text}</p>
              </div>
            ) : (
              // Regular user/SHAE messages
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.sender === "user"
                    ? "bg-[#6B8E70] text-white rounded-br-md"
                    : "bg-white text-[#2C3E2F] rounded-bl-md shadow-sm"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
              </div>
            )}
          </motion.div>
        ))}

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex justify-start"
            >
              <div className="bg-white text-[#2C3E2F] rounded-2xl rounded-bl-md shadow-sm px-4 py-3">
                <div className="flex space-x-1.5">
                  <motion.div
                    className="w-2 h-2 bg-[#B8C9BC] rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-[#B8C9BC] rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-[#B8C9BC] rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Micro-Action Suggestions - Inline in chat */}
        {showMicroActions && !activeActionId && (
          <MicroActionSuggestion
            actions={microActions}
            onStart={handleActionStart}
            onSkip={handleActionSkip}
            onComplete={handleActionComplete}
            activeActionId={activeActionId}
            completedActionId={completedActionId}
            completedActionIds={completedActionIds}
          />
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Active Micro Action Overlay - Centered when active */}
      <AnimatePresence>
        {activeActionId && showMicroActions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-10 px-6 py-20"
          >
            <MicroActionSuggestion
              actions={microActions}
              onStart={handleActionStart}
              onSkip={handleActionSkip}
              onComplete={handleActionComplete}
              activeActionId={activeActionId}
              completedActionId={completedActionId}
              completedActionIds={completedActionIds}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <div className="bg-white/80 backdrop-blur-sm border-t border-[#B8C9BC]/20 px-6 py-4">
        <AnimatePresence mode="wait">
          {isRecording ? (
            // Recording Interface
            <motion.div
              key="recording"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-4"
            >
              {/* Recording Indicator */}
              <div className="flex-1 bg-white rounded-2xl border border-[#6B8E70] px-4 py-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.7, 1]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-3 h-3 bg-red-500 rounded-full"
                  />
                  <span className="text-sm text-[#2C3E2F] font-medium">
                    {formatRecordingTime(recordingDuration)}
                  </span>
                  <span className="text-xs text-[#8FA895]">Recording...</span>
                </div>
              </div>

              {/* Cancel Button */}
              <button
                onClick={handleCancelRecording}
                className="p-3 rounded-full bg-[#E8EDE6] text-[#6B8E70] hover:bg-[#D4DAD1] transition-all duration-200"
                aria-label="Cancel recording"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Stop/Send Button */}
              <button
                onClick={handleStopRecording}
                className="p-3 rounded-full bg-[#6B8E70] text-white hover:bg-[#5D7D63] shadow-md hover:shadow-lg transition-all duration-200"
                aria-label="Send voice message"
              >
                <Send className="w-5 h-5" />
              </button>
            </motion.div>
          ) : (
            // Text Input Interface
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-end gap-3"
            >
              <div className="flex-1 bg-white rounded-2xl border border-[#B8C9BC]/30 focus-within:border-[#6B8E70] transition-colors shadow-sm">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share what's on your mind..."
                  className="w-full px-4 py-3 bg-transparent resize-none outline-none text-sm text-[#2C3E2F] placeholder:text-[#8FA895] max-h-32"
                  rows={1}
                  style={{
                    minHeight: "44px",
                    maxHeight: "128px",
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = "44px";
                    target.style.height = Math.min(target.scrollHeight, 128) + "px";
                  }}
                />
              </div>

              {/* Conditional Button: Mic or Send */}
              {inputValue.trim() ? (
                <button
                  onClick={handleSend}
                  className="p-3 rounded-full bg-[#6B8E70] text-white hover:bg-[#5D7D63] shadow-md hover:shadow-lg transition-all duration-200"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleStartRecording}
                  className="p-3 rounded-full bg-[#6B8E70] text-white hover:bg-[#5D7D63] shadow-md hover:shadow-lg transition-all duration-200"
                  aria-label="Record voice message"
                >
                  <Mic className="w-5 h-5" />
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Settings, Lock, RotateCcw, AlertTriangle, X } from "lucide-react";
import { useState } from "react";

interface SettingsScreenProps {
  onBack: () => void;
  onResetData: () => void;
}

export function SettingsScreen({ onBack, onResetData }: SettingsScreenProps) {
  const [passcodeEnabled, setPasscodeEnabled] = useState(false);
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [confirmPasscode, setConfirmPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState("");

  const handleTogglePasscode = () => {
    if (passcodeEnabled) {
      // Disable passcode
      setPasscodeEnabled(false);
      setPasscode("");
      setConfirmPasscode("");
    } else {
      // Show modal to set passcode
      setShowPasscodeModal(true);
    }
  };

  const handleSavePasscode = () => {
    setPasscodeError("");
    
    if (passcode.length < 4) {
      setPasscodeError("Passcode must be at least 4 characters");
      return;
    }
    
    if (passcode !== confirmPasscode) {
      setPasscodeError("Passcodes don't match");
      return;
    }

    // Save passcode (in a real app, this would be securely stored)
    setPasscodeEnabled(true);
    setShowPasscodeModal(false);
    setPasscode("");
    setConfirmPasscode("");
  };

  const handleResetData = () => {
    setShowResetModal(false);
    onResetData();
  };

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
          <h1 className="text-lg font-medium text-[#2C3E2F]">Settings</h1>
          <p className="text-xs text-[#6B8E70]">Manage your preferences</p>
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
              <Settings className="w-7 h-7 text-[#6B8E70]" />
            </div>
            <h2 className="text-xl font-semibold text-[#2C3E2F]">
              App Settings
            </h2>
            <p className="text-xs text-[#5F6F68] leading-relaxed">
              Customize your SHAE experience
            </p>
          </div>

          {/* Settings Sections */}
          <div className="space-y-4">
            {/* Security Section */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-semibold text-[#2C3E2F] mb-3">
                Security & Privacy
              </h3>

              {/* Passcode Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-xl bg-[#6B8E70]/10 flex items-center justify-center flex-shrink-0">
                    <Lock className="w-5 h-5 text-[#6B8E70]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#2C3E2F]">
                      App Passcode
                    </p>
                    <p className="text-xs text-[#5F6F68]">
                      {passcodeEnabled ? "Passcode is active" : "Protect your data"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleTogglePasscode}
                  className={`relative w-12 h-7 rounded-full transition-colors ${
                    passcodeEnabled ? "bg-[#6B8E70]" : "bg-[#D1D5D8]"
                  }`}
                >
                  <motion.div
                    layout
                    className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
                    animate={{
                      left: passcodeEnabled ? "26px" : "4px",
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
            </div>

            {/* Data Management Section */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-semibold text-[#2C3E2F] mb-3">
                Data Management
              </h3>

              {/* Reset Data Button */}
              <button
                onClick={() => setShowResetModal(true)}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50/50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-red-500/20 transition-colors">
                  <RotateCcw className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-red-600">
                    Reset All Data
                  </p>
                  <p className="text-xs text-red-600/70">
                    Clear all conversations and settings
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Info Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="px-4 py-3 bg-[#6B8E70]/10 rounded-xl"
          >
            <p className="text-xs text-[#5F6F68] leading-relaxed text-center">
              <strong className="text-[#2C3E2F]">Note:</strong> Your data is stored locally on your device. Resetting will permanently delete all your conversations and progress.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Passcode Modal */}
      <AnimatePresence>
        {showPasscodeModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPasscodeModal(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
            >
              <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden">
                {/* Modal Header */}
                <div className="bg-[#6B8E70]/5 px-6 py-4 flex items-center justify-between border-b border-[#B8C9BC]/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#6B8E70]/10 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-[#6B8E70]" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[#2C3E2F]">
                        Set Passcode
                      </h3>
                      <p className="text-xs text-[#5F6F68]">
                        Create a secure passcode
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowPasscodeModal(false)}
                    className="p-2 hover:bg-[#E8EDE6] rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-[#6B8E70]" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <label className="text-xs font-medium text-[#2C3E2F] mb-2 block">
                      Enter Passcode
                    </label>
                    <input
                      type="password"
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      placeholder="Minimum 4 characters"
                      className="w-full px-4 py-3 bg-[#F6F7F4] rounded-xl border border-[#B8C9BC]/20 focus:outline-none focus:border-[#6B8E70] focus:bg-white transition-colors text-sm text-[#2C3E2F]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#2C3E2F] mb-2 block">
                      Confirm Passcode
                    </label>
                    <input
                      type="password"
                      value={confirmPasscode}
                      onChange={(e) => setConfirmPasscode(e.target.value)}
                      placeholder="Re-enter passcode"
                      className="w-full px-4 py-3 bg-[#F6F7F4] rounded-xl border border-[#B8C9BC]/20 focus:outline-none focus:border-[#6B8E70] focus:bg-white transition-colors text-sm text-[#2C3E2F]"
                    />
                  </div>

                  {passcodeError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="px-3 py-2 bg-red-50 rounded-lg"
                    >
                      <p className="text-xs text-red-600">{passcodeError}</p>
                    </motion.div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => {
                        setShowPasscodeModal(false);
                        setPasscode("");
                        setConfirmPasscode("");
                        setPasscodeError("");
                      }}
                      className="flex-1 px-4 py-3 bg-[#F6F7F4] text-[#5F6F68] rounded-xl font-medium text-sm hover:bg-[#E8EDE6] transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSavePasscode}
                      className="flex-1 px-4 py-3 bg-[#6B8E70] text-white rounded-xl font-medium text-sm hover:bg-[#5D7D63] transition-colors"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Reset Confirmation Modal */}
      <AnimatePresence>
        {showResetModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowResetModal(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
            >
              <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden">
                {/* Modal Header */}
                <div className="bg-red-50 px-6 py-4 flex items-center justify-between border-b border-red-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-red-900">
                        Reset All Data?
                      </h3>
                      <p className="text-xs text-red-700">
                        This action cannot be undone
                      </p>
                    </div>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-4">
                  <p className="text-sm text-[#5F6F68] leading-relaxed">
                    Are you sure you want to reset all your data? This will permanently delete:
                  </p>
                  <ul className="space-y-2 text-xs text-[#5F6F68]">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">•</span>
                      <span>All conversations with SHAE</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">•</span>
                      <span>Your micro-actions and progress</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">•</span>
                      <span>Profile information and settings</span>
                    </li>
                  </ul>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setShowResetModal(false)}
                      className="flex-1 px-4 py-3 bg-[#F6F7F4] text-[#5F6F68] rounded-xl font-medium text-sm hover:bg-[#E8EDE6] transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleResetData}
                      className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-medium text-sm hover:bg-red-700 transition-colors"
                    >
                      Reset Data
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

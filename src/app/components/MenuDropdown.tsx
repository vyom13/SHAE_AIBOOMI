import { motion, AnimatePresence } from "motion/react";
import { User, Users, Shield, FileText, Settings, Info, Bell, X } from "lucide-react";

interface MenuDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileClick: () => void;
  onCommunityClick: () => void;
  onSettingsClick: () => void;
  onNotificationsClick: () => void;
  onAboutClick: () => void;
  onPrivacyClick: () => void;
  onTermsClick: () => void;
}

export function MenuDropdown({
  isOpen,
  onClose,
  onProfileClick,
  onCommunityClick,
  onSettingsClick,
  onNotificationsClick,
  onAboutClick,
  onPrivacyClick,
  onTermsClick,
}: MenuDropdownProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />

          {/* Dropdown Menu */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 right-6 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 w-56"
          >
            {/* Menu Items */}
            <div className="py-2">
              <button
                onClick={() => {
                  onProfileClick();
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-[#F6F7F4] transition-colors text-left"
              >
                <User className="w-5 h-5 text-[#6B8E70]" />
                <span className="text-sm font-medium text-[#2C3E2F]">
                  Profile
                </span>
              </button>
              <button
                onClick={() => {
                  onCommunityClick();
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-[#F6F7F4] transition-colors text-left"
              >
                <Users className="w-5 h-5 text-[#6B8E70]" />
                <span className="text-sm font-medium text-[#2C3E2F]">
                  Community
                </span>
              </button>
              <button
                onClick={() => {
                  onSettingsClick();
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-[#F6F7F4] transition-colors text-left"
              >
                <Settings className="w-5 h-5 text-[#6B8E70]" />
                <span className="text-sm font-medium text-[#2C3E2F]">
                  Settings
                </span>
              </button>
              <button
                onClick={() => {
                  onNotificationsClick();
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-[#F6F7F4] transition-colors text-left"
              >
                <Bell className="w-5 h-5 text-[#6B8E70]" />
                <span className="text-sm font-medium text-[#2C3E2F]">
                  Notifications
                </span>
              </button>
              <button
                onClick={() => {
                  onAboutClick();
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-[#F6F7F4] transition-colors text-left"
              >
                <Info className="w-5 h-5 text-[#6B8E70]" />
                <span className="text-sm font-medium text-[#2C3E2F]">
                  About
                </span>
              </button>
              <button
                onClick={() => {
                  onPrivacyClick();
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-[#F6F7F4] transition-colors text-left"
              >
                <Shield className="w-5 h-5 text-[#6B8E70]" />
                <span className="text-sm font-medium text-[#2C3E2F]">
                  Privacy
                </span>
              </button>
              <button
                onClick={() => {
                  onTermsClick();
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-[#F6F7F4] transition-colors text-left"
              >
                <FileText className="w-5 h-5 text-[#6B8E70]" />
                <span className="text-sm font-medium text-[#2C3E2F]">
                  Terms
                </span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
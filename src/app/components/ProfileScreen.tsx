import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, User, Calendar, Briefcase, Heart, Users as UsersIcon, Smile } from "lucide-react";

interface ProfileData {
  name: string;
  age: string;
  role: string;
  relationship: string;
  dependents: string;
  ease: string;
}

interface ProfileScreenProps {
  onBack: () => void;
  initialData?: ProfileData;
  onSave?: (data: ProfileData) => void;
}

export function ProfileScreen({ onBack, initialData, onSave }: ProfileScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>(
    initialData || {
      name: "",
      age: "",
      role: "",
      relationship: "",
      dependents: "",
      ease: "",
    }
  );

  const handleSave = () => {
    setIsEditing(false);
    if (onSave) {
      onSave(profileData);
    }
  };

  const fields = [
    {
      key: "name" as keyof ProfileData,
      label: "Name",
      icon: User,
      placeholder: "Your name",
      hint: "First name or nickname",
    },
    {
      key: "age" as keyof ProfileData,
      label: "Age",
      icon: Calendar,
      placeholder: "Your age",
      hint: "How old are you?",
    },
    {
      key: "role" as keyof ProfileData,
      label: "Role",
      icon: Briefcase,
      placeholder: "What you do",
      hint: "Your primary role or work",
    },
    {
      key: "relationship" as keyof ProfileData,
      label: "Relationship Status",
      icon: Heart,
      placeholder: "Your relationship status",
      hint: "e.g., Single, In a relationship, etc.",
    },
    {
      key: "dependents" as keyof ProfileData,
      label: "Dependents",
      icon: UsersIcon,
      placeholder: "Dependents",
      hint: "Anyone who depends on you",
    },
    {
      key: "ease" as keyof ProfileData,
      label: "What comes easily",
      icon: Smile,
      placeholder: "What feels natural to you",
      hint: "Your strengths or what you enjoy",
    },
  ];

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
          <h1 className="text-lg font-medium text-[#2C3E2F]">Profile</h1>
          <p className="text-xs text-[#6B8E70]">Your information</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 text-sm font-medium text-[#6B8E70] hover:bg-[#E8EDE6] rounded-xl transition-colors"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-[#6B8E70] hover:bg-[#5D7D63] rounded-xl transition-colors"
          >
            Save
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-4 max-w-lg mx-auto"
        >
          {fields.map((field, index) => (
            <motion.div
              key={field.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#6B8E70]/10 flex items-center justify-center flex-shrink-0">
                  <field.icon className="w-5 h-5 text-[#6B8E70]" />
                </div>
                <div className="flex-1 space-y-2">
                  <label className="text-sm font-medium text-[#2C3E2F] block">
                    {field.label}
                  </label>
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={profileData[field.key]}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            [field.key]: e.target.value,
                          })
                        }
                        placeholder={field.placeholder}
                        className="w-full bg-white border-2 border-[#D4DAD1] rounded-xl px-4 py-2.5 text-sm text-[#2C3E32] placeholder:text-[#9AA8A0] focus:border-[#6B8E70] focus:outline-none transition-colors"
                      />
                      <p className="text-xs text-[#7A8A7E]">{field.hint}</p>
                    </>
                  ) : (
                    <p className="text-sm text-[#5F6F68] leading-relaxed">
                      {profileData[field.key] || (
                        <span className="text-[#9AA8A0] italic">
                          Not provided
                        </span>
                      )}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Info Note */}
        {!isEditing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 px-4 py-3 bg-white/40 rounded-xl max-w-lg mx-auto"
          >
            <p className="text-xs text-[#5F6F68] leading-relaxed">
              This information helps SHAE understand you better and provide more
              personalized support. You can update it anytime.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

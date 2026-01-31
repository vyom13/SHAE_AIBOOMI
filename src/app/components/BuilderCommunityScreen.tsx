import { motion } from "motion/react";
import { ArrowLeft, Search, Users, Heart, Briefcase, Home, Sparkles, MessageCircle } from "lucide-react";
import { useState } from "react";

interface BuilderCommunityScreenProps {
  onBack: () => void;
}

const communityGroups = [
  {
    id: 1,
    name: "Workplace Stress",
    description: "Navigate workplace challenges and find balance",
    icon: Briefcase,
    members: 234,
    color: "#A7C7B7",
  },
  {
    id: 2,
    name: "Relationships & Connection",
    description: "Build healthier relationships and communication",
    icon: Heart,
    members: 189,
    color: "#E6B8A2",
  },
  {
    id: 3,
    name: "Daily Mindfulness",
    description: "Share practices for staying present and calm",
    icon: Sparkles,
    members: 312,
    color: "#C3C7E5",
  },
  {
    id: 4,
    name: "Family & Caregiving",
    description: "Support for parents and caregivers",
    icon: Home,
    members: 156,
    color: "#D7C9A8",
  },
  {
    id: 5,
    name: "Personal Growth",
    description: "Explore self-discovery and development",
    icon: MessageCircle,
    members: 278,
    color: "#B8C4E6",
  },
];

export function BuilderCommunityScreen({ onBack }: BuilderCommunityScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGroups = communityGroups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <h1 className="text-lg font-medium text-[#2C3E2F]">Builder Community</h1>
          <p className="text-xs text-[#6B8E70]">Connect with others</p>
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
          {/* Hero Section */}
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold text-[#2C3E2F]">
              Find Your Community
            </h2>
            <p className="text-sm text-[#5F6F68] leading-relaxed">
              Join groups on topics that resonate with you
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B8E70]/60" />
            <input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white/70 backdrop-blur-sm rounded-2xl border border-[#B8C9BC]/20 focus:outline-none focus:border-[#6B8E70] focus:bg-white transition-colors text-sm text-[#2C3E2F] placeholder:text-[#6B8E70]/50"
            />
          </div>

          {/* Community Groups */}
          <div className="space-y-3">
            {filteredGroups.length > 0 ? (
              filteredGroups.map((group, index) => {
                const Icon = group.icon;
                return (
                  <motion.button
                    key={group.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="w-full bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-sm hover:shadow-md hover:bg-white/90 transition-all text-left"
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${group.color}30` }}
                      >
                        <Icon
                          className="w-6 h-6"
                          style={{ color: group.color }}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-[#2C3E2F] mb-1">
                          {group.name}
                        </h3>
                        <p className="text-xs text-[#5F6F68] leading-relaxed mb-2">
                          {group.description}
                        </p>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-[#6B8E70]/60" />
                          <span className="text-xs text-[#6B8E70]/80">
                            {group.members} members
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-[#5F6F68]">
                  No groups found matching "{searchQuery}"
                </p>
              </div>
            )}
          </div>

          {/* Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="px-4 py-3 bg-white/40 rounded-xl"
          >
            <p className="text-xs text-[#5F6F68] leading-relaxed text-center">
              Community features are coming soon. We're building a safe,
              supportive space for connection.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
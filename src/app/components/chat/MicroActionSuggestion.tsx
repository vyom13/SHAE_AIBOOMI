import { MicroActionCard } from "./MicroActionCard";
import { motion } from "motion/react";

interface MicroAction {
  id: string;
  variant: "stabilize" | "release" | "reflect" | "process" | "activate";
  title: string;
  description: string;
  timing?: number;
  showConsent?: boolean;
}

interface MicroActionSuggestionProps {
  actions: MicroAction[];
  onStart: (actionId: string) => void;
  onSkip: (actionId: string) => void;
  onComplete?: (actionId: string) => void;
  activeActionId?: string | null;
  completedActionId?: string | null;
  completedActionIds?: string[];
}

export function MicroActionSuggestion({ 
  actions, 
  onStart, 
  onSkip, 
  onComplete, 
  activeActionId,
  completedActionIds = []
}: MicroActionSuggestionProps) {
  // Filter out completed actions and show the first available one
  const availableActions = actions.filter(action => !completedActionIds.includes(action.id));
  
  // If no actions available, don't render anything
  if (availableActions.length === 0) {
    return null;
  }
  
  const currentAction = availableActions[0];

  return (
    <div className="flex flex-col gap-3">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-start"
      >
        <p className="text-xs text-[#5F6F68] px-2">
          Here's something that might help right now:
        </p>
      </motion.div>

      {/* Single micro-action card */}
      <MicroActionCard
        key={currentAction.id}
        variant={currentAction.variant}
        title={currentAction.title}
        description={currentAction.description}
        timing={currentAction.timing}
        showConsent={currentAction.showConsent}
        onStart={() => onStart(currentAction.id)}
        onSkip={() => onSkip(currentAction.id)}
        onComplete={() => onComplete?.(currentAction.id)}
        isActive={activeActionId === currentAction.id}
      />
    </div>
  );
}
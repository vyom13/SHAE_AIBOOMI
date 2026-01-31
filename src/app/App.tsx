import { useState } from "react";
import { StartScreen } from "@/app/components/StartScreen";
import { ChatScreen } from "@/app/components/ChatScreen";
import { ProfileScreen } from "@/app/components/ProfileScreen";
import { BuilderCommunityScreen } from "@/app/components/BuilderCommunityScreen";
import { SettingsScreen } from "@/app/components/SettingsScreen";
import { NotificationsScreen } from "@/app/components/NotificationsScreen";
import { AboutScreen } from "@/app/components/AboutScreen";
import { PrivacyPolicyScreen } from "@/app/components/PrivacyPolicyScreen";
import { TermsConditionsScreen } from "@/app/components/TermsConditionsScreen";
import { IntakeWelcome } from "@/app/components/intake/IntakeWelcome";
import { IntakeName } from "@/app/components/intake/IntakeName";
import { IntakeAge } from "@/app/components/intake/IntakeAge";
import { IntakeRole } from "@/app/components/intake/IntakeRole";
import { IntakeRelationship } from "@/app/components/intake/IntakeRelationship";
import { IntakeDependents } from "@/app/components/intake/IntakeDependents";
import { IntakeEase } from "@/app/components/intake/IntakeEase";
import { IntakeComplete } from "@/app/components/intake/IntakeComplete";
import { AnimatePresence } from "motion/react";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [profileData, setProfileData] = useState({
    name: "",
    age: "",
    role: "",
    relationship: "",
    dependents: "",
    ease: "",
  });

  const handleNext = () => {
    setCurrentScreen(currentScreen + 1);
  };

  const handleBack = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const handleSkipIntake = () => {
    // Skip to start screen (screen 7 now since we removed screens 1 and 8)
    setCurrentScreen(7);
  };

  const handleStart = () => {
    console.log("Starting conversation with SHAE");
    setCurrentScreen(9);
  };

  const handleExplore = () => {
    console.log("Exploring SHAE");
    setCurrentScreen(9);
  };

  const handleOpenProfile = () => {
    setCurrentScreen(10); // Profile screen
  };

  const handleOpenCommunity = () => {
    setCurrentScreen(11); // Community screen
  };

  const handleOpenSettings = () => {
    setCurrentScreen(12); // Settings screen
  };

  const handleOpenNotifications = () => {
    setCurrentScreen(13); // Notifications screen
  };

  const handleOpenAbout = () => {
    setCurrentScreen(14); // About screen
  };

  const handleOpenPrivacy = () => {
    setCurrentScreen(15); // Privacy screen
  };

  const handleOpenTerms = () => {
    setCurrentScreen(16); // Terms screen
  };

  const handleResetData = () => {
    // Reset all data and go back to the beginning
    setProfileData({
      name: "",
      age: "",
      role: "",
      relationship: "",
      dependents: "",
      ease: "",
    });
    setCurrentScreen(0);
  };

  const handleBackToChat = () => {
    setCurrentScreen(9); // Return to chat
  };

  const handleSaveProfile = (data: typeof profileData) => {
    setProfileData(data);
  };

  // Intake data handlers - called by each intake screen
  const handleNameSubmit = (name: string) => {
    setProfileData(prev => ({ ...prev, name }));
    handleNext();
  };

  const handleAgeSubmit = (age: string) => {
    setProfileData(prev => ({ ...prev, age }));
    handleNext();
  };

  const handleRoleSubmit = (role: string) => {
    setProfileData(prev => ({ ...prev, role }));
    handleNext();
  };

  const handleRelationshipSubmit = (relationship: string) => {
    setProfileData(prev => ({ ...prev, relationship }));
    handleNext();
  };

  const handleDependentsSubmit = (dependents: string) => {
    setProfileData(prev => ({ ...prev, dependents }));
    handleNext();
  };

  const handleEaseSubmit = (ease: string) => {
    setProfileData(prev => ({ ...prev, ease }));
    handleNext();
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-[#E8EDE6] to-[#E3E8E5] overflow-hidden">
      {/* Mobile Container */}
      <div className="max-w-md mx-auto h-full relative">
        <AnimatePresence mode="wait">
          {/* Initial onboarding */}
          {currentScreen === 0 && (
            <IntakeWelcome
              key="intake-welcome"
              onNext={handleNext}
              onSkip={handleSkipIntake}
            />
          )}

          {/* Intake flow - screen numbers adjusted after removing screen 1 */}
          {currentScreen === 1 && (
            <IntakeName
              key="intake-name"
              onNext={handleNameSubmit}
              onSkip={handleSkipIntake}
              onBack={handleBack}
              initialValue={profileData.name}
            />
          )}
          {currentScreen === 2 && (
            <IntakeAge
              key="intake-age"
              onNext={handleAgeSubmit}
              onSkip={handleSkipIntake}
              onBack={handleBack}
              initialValue={profileData.age}
            />
          )}
          {currentScreen === 3 && (
            <IntakeRole
              key="intake-role"
              onNext={handleRoleSubmit}
              onSkip={handleSkipIntake}
              onBack={handleBack}
              initialValue={profileData.role}
            />
          )}
          {currentScreen === 4 && (
            <IntakeRelationship
              key="intake-relationship"
              onNext={handleRelationshipSubmit}
              onSkip={handleSkipIntake}
              onBack={handleBack}
              initialValue={profileData.relationship}
            />
          )}
          {currentScreen === 5 && (
            <IntakeDependents
              key="intake-dependents"
              onNext={handleDependentsSubmit}
              onSkip={handleSkipIntake}
              onBack={handleBack}
              initialValue={profileData.dependents}
            />
          )}
          {currentScreen === 6 && (
            <IntakeEase
              key="intake-ease"
              onNext={handleEaseSubmit}
              onSkip={handleSkipIntake}
              onBack={handleBack}
              initialValue={profileData.ease}
            />
          )}
          {currentScreen === 7 && (
            <IntakeComplete
              key="intake-complete"
              onComplete={handleNext}
              onBack={handleBack}
              onNext={handleNext}
            />
          )}

          {/* Start screen and main app */}
          {currentScreen === 8 && (
            <StartScreen
              key="start"
              onStart={handleStart}
              onExplore={handleExplore}
              onBack={handleBack}
            />
          )}
          {currentScreen === 9 && (
            <ChatScreen 
              key="chat" 
              onBack={handleBack} 
              onProfileOpen={handleOpenProfile}
              onCommunityOpen={handleOpenCommunity}
              onSettingsOpen={handleOpenSettings}
              onNotificationsOpen={handleOpenNotifications}
              onAboutOpen={handleOpenAbout}
              onPrivacyOpen={handleOpenPrivacy}
              onTermsOpen={handleOpenTerms}
            />
          )}
          {currentScreen === 10 && (
            <ProfileScreen 
              key="profile" 
              onBack={handleBackToChat} 
              initialData={profileData}
              onSave={handleSaveProfile} 
            />
          )}
          {currentScreen === 11 && (
            <BuilderCommunityScreen key="community" onBack={handleBackToChat} />
          )}
          {currentScreen === 12 && (
            <SettingsScreen key="settings" onBack={handleBackToChat} onResetData={handleResetData} />
          )}
          {currentScreen === 13 && (
            <NotificationsScreen key="notifications" onBack={handleBackToChat} />
          )}
          {currentScreen === 14 && (
            <AboutScreen key="about" onBack={handleBackToChat} />
          )}
          {currentScreen === 15 && (
            <PrivacyPolicyScreen key="privacy" onBack={handleBackToChat} />
          )}
          {currentScreen === 16 && (
            <TermsConditionsScreen key="terms" onBack={handleBackToChat} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
import React from 'react';
import { Header } from './components/Layout/Header';
import { ChatContainer } from './components/Chat/ChatContainer';
import { TaskList } from './components/TaskList/TaskList';
import { Calendar } from './components/Calendar';
import { SettingsModal } from './components/settings/SettingsModal';
import { OnboardingModal } from './components/Onboarding/OnboardingModal';
import { useMessages } from './hooks/useMessages';
import { useSettings } from './hooks/useSettings';
import { useTheme } from './hooks/useTheme';
import { useOnboarding } from './hooks/useOnboarding';
import { useVoiceMode } from './hooks/useVoiceMode';
import { generateResponse } from './utils/messageHandler';

export function App() {
  const { messages, addMessage, clearMessages } = useMessages();
  const { settings, setSettings, resetSettings } = useSettings();
  const currentTheme = useTheme(settings.theme);
  const { isOnboardingComplete, completeOnboarding } = useOnboarding();
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user' as const,
      timestamp: new Date(),
    };
    addMessage(userMessage);

    // Generate and add bot response
    const response = await generateResponse(content, {
      settings,
      addMessage,
    });

    const botMessage = {
      id: (Date.now() + 1).toString(),
      content: response,
      sender: 'bot' as const,
      timestamp: new Date(),
    };
    addMessage(botMessage);
  };

  const { isActive, isListening, toggleVoiceMode } = useVoiceMode(handleSendMessage);

  React.useEffect(() => {
    if (isOnboardingComplete && settings.profile.name && messages.length === 0) {
      const greeting = {
        id: Date.now().toString(),
        content: `Hi ${settings.profile.name}! I'm your AI assistant. How can I help you today?`,
        sender: 'bot' as const,
        timestamp: new Date(),
      };
      addMessage(greeting);
    }
  }, [isOnboardingComplete, settings.profile.name, messages.length, addMessage]);

  const handleOnboardingComplete = (name: string) => {
    setSettings({
      ...settings,
      profile: {
        ...settings.profile,
        name,
      },
    });
    completeOnboarding();
  };

  return (
    <div className={`h-screen ${currentTheme === 'dark' ? 'dark' : ''}`}>
      {!isOnboardingComplete ? (
        <OnboardingModal onComplete={handleOnboardingComplete} />
      ) : (
        <div className={`w-full h-full flex flex-col md:flex-row overflow-hidden ${
          currentTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
        }`}>
          <div className="flex-1 flex flex-col h-full">
            <Header
              botName={settings.profile.botName}
              onSettingsClick={() => setIsSettingsOpen(true)}
              onCalendarClick={() => setIsCalendarOpen(!isCalendarOpen)}
              onVoiceClick={toggleVoiceMode}
              isVoiceActive={isActive}
              isVoiceListening={isListening}
            />
            
            <ChatContainer
              messages={messages}
              onSendMessage={handleSendMessage}
            />
          </div>

          {isCalendarOpen && (
            <div className="w-full md:w-96 border-l border-gray-200 dark:border-gray-700">
              <Calendar onClose={() => setIsCalendarOpen(false)} />
            </div>
          )}

          <SettingsModal
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            settings={settings}
            onSettingsChange={setSettings}
            onResetChat={clearMessages}
            onRestoreDefaults={resetSettings}
          />
        </div>
      )}
    </div>
  );
}
import React, { useState, useRef, useEffect } from 'react';
import { Message, Task } from './types';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { TaskList } from './components/TaskList/TaskList';
import { generateResponse } from './utils/messageHandler';
import { loadTasks, saveTasks } from './utils/localStorage';
import { Bot, Settings, Calendar as CalendarIcon } from 'lucide-react';
import { SettingsModal } from './components/settings/SettingsModal';
import { useSettings } from './hooks/useSettings';
import { useTheme } from './hooks/useTheme';
import { Calendar } from './components/Calendar';
import { VoiceModeButton } from './components/VoiceMode/VoiceModeButton';

export function App() {
  // ... existing state declarations ...

  return (
    <div className={`h-screen ${currentTheme === 'dark' ? 'dark' : ''} transition-colors`}>
      <div className={`w-full h-full flex flex-col md:flex-row overflow-hidden ${
        currentTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
      }`}>
        <div className="flex-1 flex flex-col h-full">
          <div className={`bg-blue-500 text-white p-4 flex items-center justify-between shadow-md`}>
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6" />
              <h1 className="text-xl font-semibold">{settings.profile.botName || 'AI Assistant'}</h1>
            </div>
            <div className="flex items-center gap-2">
              <VoiceModeButton onMessage={handleSendMessage} />
              <button
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                className="p-2 hover:bg-blue-600 rounded-full transition-colors"
                title="Calendar"
              >
                <CalendarIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 hover:bg-blue-600 rounded-full transition-colors"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* ... rest of the component ... */}
        </div>

        {/* ... Calendar and Settings modals ... */}
      </div>
    </div>
  );
}
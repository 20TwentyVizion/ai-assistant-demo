import React from 'react';
import { Bot, Settings, Calendar as CalendarIcon, Mic } from 'lucide-react';

interface HeaderProps {
  botName: string;
  onSettingsClick: () => void;
  onCalendarClick: () => void;
  onVoiceClick: () => void;
  isVoiceActive: boolean;
  isVoiceListening: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  botName = 'AI Assistant',
  onSettingsClick,
  onCalendarClick,
  onVoiceClick,
  isVoiceActive = false,
  isVoiceListening = false,
}) => {
  return (
    <div className="bg-blue-500 text-white p-4 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-2">
        <Bot className="w-6 h-6" />
        <h1 className="text-xl font-semibold">{botName}</h1>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onVoiceClick}
          className={`p-2 hover:bg-blue-600 rounded-full transition-colors relative ${
            isVoiceActive ? 'bg-blue-600' : ''
          }`}
          title={isVoiceActive ? 'Disable voice mode' : 'Enable voice mode'}
        >
          <Mic className="w-5 h-5" />
          {isVoiceListening && (
            <span className="absolute -top-1 -right-1 w-3 h-3">
              <span className="absolute inline-flex w-full h-full rounded-full bg-red-400 opacity-75 animate-ping" />
              <span className="relative inline-flex w-3 h-3 rounded-full bg-red-500" />
            </span>
          )}
        </button>
        <button
          onClick={onCalendarClick}
          className="p-2 hover:bg-blue-600 rounded-full transition-colors"
          title="Calendar"
        >
          <CalendarIcon className="w-5 h-5" />
        </button>
        <button
          onClick={onSettingsClick}
          className="p-2 hover:bg-blue-600 rounded-full transition-colors"
          title="Settings"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
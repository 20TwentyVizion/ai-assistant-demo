import React from 'react';
import { Mic, MicOff } from 'lucide-react';

interface VoiceModeToggleProps {
  isActive: boolean;
  onToggle: () => void;
  isListening: boolean;
}

export const VoiceModeToggle: React.FC<VoiceModeToggleProps> = ({
  isActive,
  onToggle,
  isListening,
}) => {
  return (
    <button
      onClick={onToggle}
      className={`fixed bottom-24 right-4 md:right-8 p-4 rounded-full shadow-lg transition-all transform ${
        isActive 
          ? 'bg-blue-500 hover:bg-blue-600' 
          : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
      } ${isListening ? 'scale-110 animate-pulse' : 'scale-100'}`}
      title={isActive ? 'Disable voice mode' : 'Enable voice mode'}
    >
      {isActive ? (
        <Mic className="w-6 h-6 text-white" />
      ) : (
        <MicOff className="w-6 h-6 text-gray-600 dark:text-gray-300" />
      )}
    </button>
  );
};
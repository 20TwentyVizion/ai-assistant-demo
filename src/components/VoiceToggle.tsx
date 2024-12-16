import React from 'react';
import { Mic, MicOff } from 'lucide-react';

interface VoiceToggleProps {
  isVoiceEnabled: boolean;
  onToggle: () => void;
  isRecording: boolean;
}

export const VoiceToggle: React.FC<VoiceToggleProps> = ({
  isVoiceEnabled,
  onToggle,
  isRecording,
}) => {
  return (
    <button
      onClick={onToggle}
      className={`p-2 rounded-full transition-colors ${
        isVoiceEnabled
          ? 'bg-blue-500 text-white hover:bg-blue-600'
          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
      } ${isRecording ? 'animate-pulse' : ''}`}
      title={isVoiceEnabled ? 'Disable voice' : 'Enable voice'}
    >
      {isVoiceEnabled ? (
        <Mic className="w-5 h-5" />
      ) : (
        <MicOff className="w-5 h-5" />
      )}
    </button>
  );
};
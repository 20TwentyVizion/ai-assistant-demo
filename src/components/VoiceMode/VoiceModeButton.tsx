import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useVoiceMode } from '../../hooks/useVoiceMode';

interface VoiceModeButtonProps {
  onMessage: (text: string) => void;
}

export const VoiceModeButton: React.FC<VoiceModeButtonProps> = ({ onMessage }) => {
  const { isActive, isListening, toggleVoiceMode } = useVoiceMode(onMessage);

  return (
    <button
      onClick={toggleVoiceMode}
      className={`p-2 hover:bg-blue-600 rounded-full transition-colors relative`}
      title={isActive ? 'Disable voice mode' : 'Enable voice mode'}
    >
      {isActive ? (
        <Mic className="w-5 h-5 text-white" />
      ) : (
        <MicOff className="w-5 h-5 text-white" />
      )}
      {isListening && (
        <span className="absolute -top-1 -right-1 w-3 h-3">
          <span className="absolute inline-flex w-full h-full rounded-full bg-red-400 opacity-75 animate-ping" />
          <span className="relative inline-flex w-3 h-3 rounded-full bg-red-500" />
        </span>
      )}
    </button>
  );
};
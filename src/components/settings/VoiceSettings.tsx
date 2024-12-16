import React from 'react';
import { VoiceType } from '../../types/voice';
import { Volume2, VolumeX } from 'lucide-react';

interface VoiceSettingsProps {
  enabled: boolean;
  type: VoiceType;
  pitch: number;
  rate: number;
  onVoiceChange: (type: VoiceType) => void;
  onToggleVoice: (enabled: boolean) => void;
  onPitchChange: (pitch: number) => void;
  onRateChange: (rate: number) => void;
}

export const VoiceSettings: React.FC<VoiceSettingsProps> = ({
  enabled,
  type,
  pitch,
  rate,
  onVoiceChange,
  onToggleVoice,
  onPitchChange,
  onRateChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">
          Text-to-Speech
        </label>
        <button
          onClick={() => onToggleVoice(!enabled)}
          className={`p-2 rounded-full transition-colors ${
            enabled
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
          title={enabled ? 'Disable voice' : 'Enable voice'}
        >
          {enabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>
      </div>

      <div className={enabled ? 'space-y-4' : 'space-y-4 opacity-50 pointer-events-none'}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Voice Type
          </label>
          <select
            value={type}
            onChange={(e) => onVoiceChange(e.target.value as VoiceType)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={!enabled}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="neutral">Neutral</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pitch
          </label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={pitch}
            onChange={(e) => onPitchChange(parseFloat(e.target.value))}
            className="w-full"
            disabled={!enabled}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Lower</span>
            <span>Higher</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Speed
          </label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={rate}
            onChange={(e) => onRateChange(parseFloat(e.target.value))}
            className="w-full"
            disabled={!enabled}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Slower</span>
            <span>Faster</span>
          </div>
        </div>
      </div>
    </div>
  );
};
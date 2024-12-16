export type VoiceType = 'male' | 'female' | 'neutral';

export interface VoiceSettings {
  enabled: boolean;
  type: VoiceType;
  pitch: number;
  rate: number;
}

export const defaultVoiceSettings: VoiceSettings = {
  enabled: false,
  type: 'neutral',
  pitch: 1,
  rate: 1,
};
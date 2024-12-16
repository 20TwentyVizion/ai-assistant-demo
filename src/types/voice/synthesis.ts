export interface VoicePreset {
  voiceName: string;
  pitch: number;
  rate: number;
}

export const voicePresets: Record<VoiceType, VoicePreset> = {
  male: {
    voiceName: 'Microsoft David',
    pitch: 0.9,
    rate: 0.9,
  },
  female: {
    voiceName: 'Microsoft Zira',
    pitch: 1.1,
    rate: 1,
  },
  neutral: {
    voiceName: 'Microsoft Mark',
    pitch: 1,
    rate: 1,
  },
};
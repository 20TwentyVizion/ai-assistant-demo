export type VoiceType = 'male' | 'female' | 'neutral';

export interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
}

export interface SpeechError {
  error: string;
  message: string;
}

export interface VoiceConfig {
  type: VoiceType;
  pitch?: number;
  rate?: number;
}
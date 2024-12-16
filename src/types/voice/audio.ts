export interface AudioConfig {
  echoCancellation?: boolean;
  noiseSuppression?: boolean;
  autoGainControl?: boolean;
  channelCount?: number;
  sampleRate?: number;
  sampleSize?: number;
}

export interface AudioLevel {
  timestamp: number;
  level: number;
}
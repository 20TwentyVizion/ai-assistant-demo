export interface VoiceState {
  isRecording: boolean;
  mediaRecorder: MediaRecorder | null;
  stream: MediaStream | null;
}

export interface AudioData {
  blob: Blob;
  chunks: Blob[];
}

export interface VoiceError {
  code: string;
  message: string;
  details?: unknown;
}

export type VoiceEventHandler = (event: VoiceError | null) => void;
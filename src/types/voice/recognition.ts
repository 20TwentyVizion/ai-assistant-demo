export interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
}

export interface SpeechError {
  error: string;
  message: string;
  originalError?: string;
}
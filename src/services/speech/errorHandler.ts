import { SpeechError } from '../../types/voice/recognition';

export const createSpeechError = (
  type: string,
  message: string,
  originalError?: any
): SpeechError => {
  console.error(`Speech Error (${type}):`, message, originalError);
  return {
    error: type,
    message,
    originalError: originalError?.message || originalError
  };
};
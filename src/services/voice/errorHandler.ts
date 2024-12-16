import { VoiceError } from './types';

export const VoiceErrorCodes = {
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  RECORDING_IN_PROGRESS: 'RECORDING_IN_PROGRESS',
  NO_RECORDER: 'NO_RECORDER',
  RECORDER_ERROR: 'RECORDER_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

export function createVoiceError(code: keyof typeof VoiceErrorCodes, message: string, details?: unknown): VoiceError {
  return { code, message, details };
}

export function handleVoiceError(error: unknown): VoiceError {
  if (error instanceof Error) {
    if (error.name === 'NotAllowedError') {
      return createVoiceError(
        'PERMISSION_DENIED',
        'Microphone permission was denied. Please allow microphone access to use voice features.'
      );
    }
    return createVoiceError('RECORDER_ERROR', error.message, error);
  }
  return createVoiceError('UNKNOWN_ERROR', 'An unknown error occurred', error);
}
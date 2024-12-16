import { MessageError } from './types';

export const MessageErrorCodes = {
  GENERATION_FAILED: 'GENERATION_FAILED',
  INVALID_INPUT: 'INVALID_INPUT',
  NETWORK_ERROR: 'NETWORK_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

export function createMessageError(
  code: keyof typeof MessageErrorCodes,
  message: string,
  details?: unknown
): MessageError {
  console.error(`Message Error (${code}):`, message, details);
  return { code, message, details };
}

export function handleMessageError(error: unknown): MessageError {
  if (error instanceof Error) {
    if (error.name === 'NetworkError') {
      return createMessageError(
        'NETWORK_ERROR',
        'Failed to connect to the message service. Please check your connection.'
      );
    }
    return createMessageError('GENERATION_FAILED', error.message, error);
  }
  return createMessageError('UNKNOWN_ERROR', 'An unknown error occurred', error);
}
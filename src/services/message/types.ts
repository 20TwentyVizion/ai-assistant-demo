import { ChatbotSettings } from '../../types/settings';
import { Message } from '../../types';

export interface MessageContext {
  settings: ChatbotSettings;
  addMessage: (message: Message) => void;
}

export interface MessageResponse {
  content: string;
  error?: string;
}

export interface MessageError {
  code: string;
  message: string;
  details?: unknown;
}
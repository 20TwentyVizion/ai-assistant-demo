import { useCallback } from 'react';
import { Message } from '../types';
import { generateResponse } from '../utils/messageHandler';
import { ChatbotSettings } from '../types/settings';

interface UseMessageHandlerProps {
  settings: ChatbotSettings;
  addMessage: (message: Message) => void;
}

export const useMessageHandler = ({ settings, addMessage }: UseMessageHandlerProps) => {
  const handleMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };
    
    addMessage(userMessage);

    const response = await generateResponse(content, {
      settings,
      addMessage,
    });

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: response,
      sender: 'bot',
      timestamp: new Date(),
    };
    
    addMessage(botMessage);
  }, [settings, addMessage]);

  return handleMessage;
};
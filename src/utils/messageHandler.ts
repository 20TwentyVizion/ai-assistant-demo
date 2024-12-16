import { Message } from '../types';
import { MessageContext } from '../services/message/types';
import { processMessage } from '../services/message/messageProcessor';

export async function generateResponse(
  content: string,
  context: MessageContext
): Promise<string> {
  try {
    const response = await processMessage(content, context);
    
    if (response.error) {
      console.error('Error processing message:', response.error);
    }
    
    return response.content;
  } catch (error) {
    console.error('Error handling message:', error);
    return "I'm sorry, but I encountered an unexpected error. Please try again.";
  }
}
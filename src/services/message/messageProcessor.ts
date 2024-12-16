import { MessageContext, MessageResponse } from './types';
import { handleMessageError } from './errorHandler';
import { parseCommand } from '../../utils/messageParser';
import { analyzeSentiment } from '../../utils/sentiment';
import { formatResponse } from '../../utils/responseFormatter';
import { geminiService } from '../gemini/geminiService';
import { speechService } from '../speech/speechService';
import { timeService } from '../timeService';

export async function processMessage(
  content: string,
  context: MessageContext
): Promise<MessageResponse> {
  try {
    const sentiment = await analyzeSentiment(content);
    const command = parseCommand(content);
    
    const timeInfo = timeService.getCurrentTimeInfo();
    const contextInfo = {
      currentTime: timeInfo.time,
      currentDate: timeInfo.date,
      greeting: timeService.getGreeting(),
      holiday: timeInfo.holiday?.name,
      userProfile: context.settings.profile,
      timezone: timeInfo.timezone
    };

    const geminiResponse = await geminiService.generateResponse(
      content,
      JSON.stringify(contextInfo)
    );

    if (geminiResponse.error) {
      throw new Error(geminiResponse.error);
    }

    const formattedResponse = formatResponse(
      geminiResponse.text,
      sentiment,
      {
        includeEmoji: context.settings.useEmojis,
        includePrefix: true,
        personality: context.settings.personality,
        tone: context.settings.tone,
      }
    );

    if (context.settings.voice.enabled) {
      await speechService.synthesizeSpeech(formattedResponse);
    }

    return { content: formattedResponse };
  } catch (error) {
    const messageError = handleMessageError(error);
    return {
      content: "I apologize, but I encountered an error processing your request. Please try again.",
      error: messageError.message
    };
  }
}
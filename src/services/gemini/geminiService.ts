import { GoogleGenerativeAI } from '@google/generative-ai';
import { API_CONFIG } from '../../config/api';
import { GeminiResponse } from './types';

class GeminiService {
  private static instance: GeminiService;
  private model: any;

  private constructor() {
    const genAI = new GoogleGenerativeAI(API_CONFIG.GEMINI.API_KEY);
    this.model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  async generateResponse(prompt: string, context: string = ''): Promise<GeminiResponse> {
    try {
      const result = await this.model.generateContent(
        `${context ? 'Context: ' + context + '\n' : ''}User message: ${prompt}`
      );
      return { text: result.response.text() };
    } catch (error) {
      console.error('Error generating response:', error);
      return { 
        text: this.getFallbackResponse(),
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private getFallbackResponse(): string {
    const fallbacks = [
      "I apologize, but I'm having trouble processing your request right now.",
      "I couldn't generate a specific response, but I'm here to help. Could you rephrase that?",
      "There seems to be a temporary issue. Please try again in a moment.",
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }
}

export const geminiService = GeminiService.getInstance();
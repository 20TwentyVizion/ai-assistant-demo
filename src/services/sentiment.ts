import { GoogleGenerativeAI } from '@google/generative-ai';
import { SentimentAnalysis, SentimentType } from '../types/sentiment';
import { API_CONFIG } from '../config/api';

class SentimentService {
  private static instance: SentimentService;
  private model: any;

  private constructor() {
    const genAI = new GoogleGenerativeAI(API_CONFIG.GEMINI.API_KEY);
    this.model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  static getInstance(): SentimentService {
    if (!SentimentService.instance) {
      SentimentService.instance = new SentimentService();
    }
    return SentimentService.instance;
  }

  async analyzeSentiment(text: string): Promise<SentimentAnalysis> {
    try {
      const prompt = `Analyze the sentiment of the following text and respond with only a JSON object containing 'type' (positive, neutral, or negative) and 'score' (between -1 and 1): "${text}"`;
      
      const result = await this.model.generateContent(prompt);
      const response = JSON.parse(result.response.text());
      
      return {
        type: response.type as SentimentType,
        score: response.score,
      };
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      return this.fallbackAnalysis(text);
    }
  }

  private fallbackAnalysis(text: string): SentimentAnalysis {
    const words = text.toLowerCase().split(/\s+/);
    let score = 0;
    
    const positiveWords = new Set([
      'good', 'great', 'awesome', 'excellent', 'happy', 'love', 'wonderful',
      'fantastic', 'nice', 'thanks', 'thank', 'pleased', 'excited', 'amazing',
      'perfect', 'brilliant', 'delighted', 'joy', 'grateful', 'appreciate',
    ]);

    const negativeWords = new Set([
      'bad', 'terrible', 'awful', 'horrible', 'sad', 'hate', 'disappointed',
      'angry', 'upset', 'unfortunate', 'sorry', 'fail', 'failed', 'wrong',
      'frustrated', 'annoyed', 'worried', 'confused', 'difficult', 'problem',
    ]);

    const intensifiers = new Set([
      'very', 'really', 'extremely', 'absolutely', 'totally',
    ]);

    let hasIntensifier = false;
    
    words.forEach((word, index) => {
      if (intensifiers.has(word)) {
        hasIntensifier = true;
      } else {
        let multiplier = hasIntensifier ? 2 : 1;
        if (positiveWords.has(word)) score += (1 * multiplier);
        if (negativeWords.has(word)) score -= (1 * multiplier);
        hasIntensifier = false;
      }
    });
    
    const normalizedScore = Math.max(-1, Math.min(1, score / 5));
    
    return {
      type: normalizedScore > 0.1 ? 'positive' : normalizedScore < -0.1 ? 'negative' : 'neutral',
      score: normalizedScore,
    };
  }
}

export const sentimentService = SentimentService.getInstance();
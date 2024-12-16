import { ResponseTone, SentimentType } from '../types/sentiment';
import { responseTones } from '../config/tones';

class ResponseFormatter {
  private static instance: ResponseFormatter;
  private tones: ResponseTone;

  private constructor() {
    this.tones = responseTones;
  }

  static getInstance(): ResponseFormatter {
    if (!ResponseFormatter.instance) {
      ResponseFormatter.instance = new ResponseFormatter();
    }
    return ResponseFormatter.instance;
  }

  formatResponse(response: string, sentiment: SentimentAnalysis): string {
    const tone = this.getToneForSentiment(sentiment);
    const prefix = this.getPrefix(tone, sentiment.score);
    const emoji = this.getEmoji(tone, sentiment.score);
    const formattedResponse = this.adjustResponseTone(response, sentiment);
    
    return `${prefix} ${emoji} ${formattedResponse}`;
  }

  private getToneForSentiment(sentiment: SentimentAnalysis): ResponseTone[SentimentType] {
    return this.tones[sentiment.type];
  }

  private getPrefix(tone: ResponseTone[SentimentType], score: number): string {
    const prefixes = tone.prefixes;
    const index = Math.min(
      Math.floor(Math.abs(score) * prefixes.length),
      prefixes.length - 1
    );
    return prefixes[index];
  }

  private getEmoji(tone: ResponseTone[SentimentType], score: number): string {
    const emojis = tone.emojis;
    const index = Math.min(
      Math.floor(Math.abs(score) * emojis.length),
      emojis.length - 1
    );
    return emojis[index];
  }

  private adjustResponseTone(response: string, sentiment: SentimentAnalysis): string {
    if (sentiment.type === 'negative' && sentiment.score < -0.5) {
      return this.addSupportiveElements(response);
    }
    return response;
  }

  private addSupportiveElements(response: string): string {
    const supportivePhrases = [
      "Here's what we can do to help: ",
      "Let's work through this together: ",
      "I understand this is challenging. Here's a suggestion: ",
    ];
    
    const randomPhrase = supportivePhrases[
      Math.floor(Math.random() * supportivePhrases.length)
    ];
    
    return `${randomPhrase}${response}`;
  }
}

export const responseFormatter = ResponseFormatter.getInstance();
import { SentimentAnalysis, SentimentType } from '../types/sentiment';

const positiveWords = new Set([
  'good', 'great', 'awesome', 'excellent', 'happy', 'love', 'wonderful',
  'fantastic', 'nice', 'thanks', 'thank', 'pleased', 'excited', 'amazing',
]);

const negativeWords = new Set([
  'bad', 'terrible', 'awful', 'horrible', 'sad', 'hate', 'disappointed',
  'angry', 'upset', 'unfortunate', 'sorry', 'fail', 'failed', 'wrong',
]);

export const analyzeSentiment = (text: string): SentimentAnalysis => {
  const words = text.toLowerCase().split(/\s+/);
  let score = 0;
  
  words.forEach(word => {
    if (positiveWords.has(word)) score += 1;
    if (negativeWords.has(word)) score -= 1;
  });
  
  let type: SentimentType = 'neutral';
  if (score > 0) type = 'positive';
  if (score < 0) type = 'negative';
  
  return { type, score };
};
export type SentimentType = 'positive' | 'neutral' | 'negative';

export interface SentimentAnalysis {
  type: SentimentType;
  score: number;
}

export interface ResponseTone {
  positive: {
    prefixes: string[];
    emojis: string[];
  };
  neutral: {
    prefixes: string[];
    emojis: string[];
  };
  negative: {
    prefixes: string[];
    emojis: string[];
  };
}
import { SentimentType } from '../../types/sentiment';

export interface ResponseOptions {
  includeEmoji?: boolean;
  includePrefix?: boolean;
}

export interface FormattedResponse {
  text: string;
  sentiment: SentimentType;
  score: number;
}

export interface ResponseTemplate {
  prefix: string;
  emoji: string;
}
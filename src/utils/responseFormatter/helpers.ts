import { SentimentType } from '../../types/sentiment';
import { responseTemplates } from './templates';
import { ResponseTemplate } from './types';

export const getResponseTemplate = (
  sentiment: SentimentType,
  score: number
): ResponseTemplate => {
  const templates = responseTemplates[sentiment];
  const index = Math.min(
    Math.floor(Math.abs(score) * templates.prefixes.length),
    templates.prefixes.length - 1
  );

  return {
    prefix: templates.prefixes[index],
    emoji: templates.emojis[Math.floor(Math.random() * templates.emojis.length)],
  };
};

export const addSupportiveContext = (text: string): string => {
  const supportivePhrases = [
    "Here's what we can do to help: ",
    "Let's work through this together: ",
    "I understand this is challenging. Here's a suggestion: ",
  ];
  
  const randomPhrase = supportivePhrases[
    Math.floor(Math.random() * supportivePhrases.length)
  ];
  
  return `${randomPhrase}${text}`;
};
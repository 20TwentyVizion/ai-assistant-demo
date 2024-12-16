import { SentimentAnalysis } from '../../types/sentiment';
import { ResponseOptions } from './types';
import { getResponseTemplate, addSupportiveContext } from './helpers';

export const formatResponse = (
  text: string,
  sentiment: SentimentAnalysis,
  options: ResponseOptions = { includeEmoji: true, includePrefix: true }
): string => {
  const { prefix, emoji } = getResponseTemplate(sentiment.type, sentiment.score);
  
  let formattedText = text;

  // Add supportive context for strongly negative sentiments
  if (sentiment.type === 'negative' && sentiment.score < -0.5) {
    formattedText = addSupportiveContext(formattedText);
  }

  // Build the response with optional components
  const components = [];
  
  if (options.includePrefix) {
    components.push(prefix);
  }
  
  if (options.includeEmoji) {
    components.push(emoji);
  }
  
  components.push(formattedText);

  return components.join(' ');
};

export * from './types';
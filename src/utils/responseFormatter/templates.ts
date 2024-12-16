import { SentimentType } from '../../types/sentiment';

export const responseTemplates: Record<SentimentType, {
  prefixes: string[];
  emojis: string[];
}> = {
  positive: {
    prefixes: [
      "That's fantastic!",
      "I'm really excited about this!",
      "Wonderful news!",
      "I'm delighted to hear that!",
      "This is excellent!",
      "You're doing great!",
    ],
    emojis: ['😊', '🎉', '✨', '👍', '🌟', '💫', '🙌'],
  },
  neutral: {
    prefixes: [
      "I understand.",
      "Here's what I can tell you:",
      "Let me help you with that.",
      "I see what you mean.",
      "Here's the information:",
      "Let's look at this together.",
    ],
    emojis: ['📝', '💡', '🔍', '✅', '📌', '🎯'],
  },
  negative: {
    prefixes: [
      "I understand this is frustrating.",
      "I'm here to help you through this.",
      "Let's work on solving this together.",
      "I hear your concern.",
      "We'll figure this out.",
      "I'm committed to helping you resolve this.",
    ],
    emojis: ['🤝', '💪', '🌟', '💭', '🎯', '✨'],
  },
};
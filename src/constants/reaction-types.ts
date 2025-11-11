export const REACTION_TYPES = {
  LIKE: 'like',
  LOVE: 'love',
  TIP: 'tip',
  COLLECT: 'collect',
} as const;

export type ReactionType = typeof REACTION_TYPES[keyof typeof REACTION_TYPES];

export const REACTION_EMOJIS: Record<ReactionType, string> = {
  like: '👍',
  love: '❤️',
  tip: '💰',
  collect: '⭐',
};


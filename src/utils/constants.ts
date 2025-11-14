export const MAX_POST_LENGTH = 10000;
export const MAX_COMMENT_LENGTH = 5000;
export const DEFAULT_GAS_LIMIT = 100000n;
export const DEFAULT_GAS_PRICE = 20000000000n;

export const CONTRACT_EVENTS = {
  POST_CREATED: 'PostCreated',
  COMMENT_ADDED: 'CommentAdded',
  REACTION_ADDED: 'ReactionAdded',
  PROFILE_UPDATED: 'ProfileUpdated',
} as const;



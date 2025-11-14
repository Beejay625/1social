export const BADGE_TYPES = {
  VERIFIED: 'verified',
  CREATOR: 'creator',
  INFLUENCER: 'influencer',
  BRAND: 'brand',
} as const;

export type BadgeType = typeof BADGE_TYPES[keyof typeof BADGE_TYPES];



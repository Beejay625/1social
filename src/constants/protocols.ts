export const PROTOCOLS = {
  FARCASTER: 'farcaster',
  LENS: 'lens',
  MIRROR: 'mirror',
  INSTAGRAM: 'instagram',
  TWITTER: 'twitter',
} as const;

export type Protocol = typeof PROTOCOLS[keyof typeof PROTOCOLS];

export const PROTOCOL_NAMES: Record<Protocol, string> = {
  farcaster: 'Farcaster',
  lens: 'Lens Protocol',
  mirror: 'Mirror',
  instagram: 'Instagram',
  twitter: 'Twitter (X)',
};



export const CHAIN_IDS = {
  MAINNET: 1,
  BASE: 8453,
  OPTIMISM: 10,
  ARBITRUM: 42161,
  POLYGON: 137,
} as const;

export type ChainId = typeof CHAIN_IDS[keyof typeof CHAIN_IDS];

export const CHAIN_NAMES: Record<ChainId, string> = {
  1: 'Ethereum Mainnet',
  8453: 'Base',
  10: 'Optimism',
  42161: 'Arbitrum',
  137: 'Polygon',
};


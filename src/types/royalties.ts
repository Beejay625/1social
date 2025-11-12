export interface Royalty {
  id: string;
  contentId: string;
  creator: string;
  recipient: string;
  percentage: number;
  amount: string;
  timestamp: number;
}

export interface RoyaltyDistribution {
  id: string;
  royaltyId: string;
  recipient: string;
  amount: string;
  timestamp: number;
}


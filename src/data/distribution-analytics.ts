export interface DistributionPattern {
  platform: string;
  totalShares: number;
  viralCoefficient: number;
  reachMultiplier: number;
  topShares: ShareEvent[];
}

export interface ShareEvent {
  id: string;
  contentId: string;
  contentTitle: string;
  platform: string;
  sharedBy: string;
  timestamp: string;
  reach: number;
  engagement: number;
}

export const distributionPatterns: DistributionPattern[] = [
  {
    platform: "farcaster",
    totalShares: 234,
    viralCoefficient: 1.8,
    reachMultiplier: 3.2,
    topShares: [
      {
        id: "share-1",
        contentId: "post-123",
        contentTitle: "Product Launch",
        platform: "farcaster",
        sharedBy: "@influencer1",
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        reach: 12500,
        engagement: 890,
      },
      {
        id: "share-2",
        contentId: "post-456",
        contentTitle: "Tutorial Video",
        platform: "farcaster",
        sharedBy: "@user456",
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        reach: 8900,
        engagement: 567,
      },
    ],
  },
  {
    platform: "instagram",
    totalShares: 189,
    viralCoefficient: 1.5,
    reachMultiplier: 2.8,
    topShares: [
      {
        id: "share-3",
        contentId: "post-789",
        contentTitle: "Behind the Scenes",
        platform: "instagram",
        sharedBy: "@creator123",
        timestamp: new Date(Date.now() - 259200000).toISOString(),
        reach: 15600,
        engagement: 1234,
      },
    ],
  },
];

export const distributionStats = {
  totalShares: 423,
  avgViralCoefficient: 1.65,
  avgReachMultiplier: 3.0,
  topPerformingPlatform: "farcaster",
  totalReach: 125000,
};

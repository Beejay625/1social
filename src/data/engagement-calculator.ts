export interface EngagementMetric {
  platform: string;
  followers: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  engagementRate: number;
}

export interface EngagementBreakdown {
  type: string;
  count: number;
  percentage: number;
}

export const engagementMetrics: EngagementMetric[] = [
  {
    platform: "farcaster",
    followers: 12500,
    likes: 890,
    comments: 120,
    shares: 45,
    saves: 23,
    engagementRate: 8.6,
  },
  {
    platform: "instagram",
    followers: 8900,
    likes: 1240,
    comments: 89,
    shares: 34,
    saves: 156,
    engagementRate: 17.1,
  },
];

export const engagementBreakdown: EngagementBreakdown[] = [
  {
    type: "Likes",
    count: 2130,
    percentage: 68,
  },
  {
    type: "Comments",
    count: 209,
    percentage: 7,
  },
  {
    type: "Shares",
    count: 79,
    percentage: 3,
  },
  {
    type: "Saves",
    count: 179,
    percentage: 6,
  },
];

export const calculatorStats = {
  totalEngagement: 2597,
  avgEngagementRate: 12.8,
  bestPerformingPlatform: "instagram",
  engagementGrowth: 15.2,
};

export interface AudienceGrowth {
  platform: string;
  currentFollowers: number;
  growth: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    percentage: number;
  };
  trend: "growing" | "stable" | "declining";
  growthRate: number;
  peakGrowthDay: string;
  peakGrowthTime: string;
}

export interface GrowthEvent {
  id: string;
  platform: string;
  type: "spike" | "drop" | "steady";
  date: string;
  change: number;
  reason?: string;
}

export const audienceGrowth: AudienceGrowth[] = [
  {
    platform: "farcaster",
    currentFollowers: 12500,
    growth: {
      today: 45,
      thisWeek: 312,
      thisMonth: 1245,
      percentage: 11.1,
    },
    trend: "growing",
    growthRate: 3.2,
    peakGrowthDay: "Tuesday",
    peakGrowthTime: "2 PM",
  },
  {
    platform: "instagram",
    currentFollowers: 23400,
    growth: {
      today: 89,
      thisWeek: 567,
      thisMonth: 2345,
      percentage: 11.1,
    },
    trend: "growing",
    growthRate: 2.8,
    peakGrowthDay: "Wednesday",
    peakGrowthTime: "3 PM",
  },
];

export const growthEvents: GrowthEvent[] = [
  {
    id: "event-1",
    platform: "farcaster",
    type: "spike",
    date: new Date(Date.now() - 86400000 * 3).toISOString(),
    change: 156,
    reason: "Viral post about product launch",
  },
  {
    id: "event-2",
    platform: "instagram",
    type: "spike",
    date: new Date(Date.now() - 86400000 * 7).toISOString(),
    change: 234,
    reason: "Influencer collaboration",
  },
];

export const growthStats = {
  totalFollowers: 35900,
  totalGrowthThisMonth: 3590,
  avgGrowthRate: 3.0,
  fastestGrowingPlatform: "farcaster",
};

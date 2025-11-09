export interface Competitor {
  id: string;
  name: string;
  handle: string;
  platform: string;
  followers: number;
  engagementRate: number;
  avgPostsPerWeek: number;
  growthRate: number;
  lastAnalyzed: string;
}

export interface CompetitorComparison {
  metric: string;
  yourValue: number;
  competitorValue: number;
  difference: number;
  status: "ahead" | "behind" | "equal";
}

export const competitors: Competitor[] = [
  {
    id: "comp-1",
    name: "Competitor A",
    handle: "@competitorA",
    platform: "farcaster",
    followers: 150000,
    engagementRate: 7.5,
    avgPostsPerWeek: 12,
    growthRate: 8.2,
    lastAnalyzed: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
  {
    id: "comp-2",
    name: "Competitor B",
    handle: "@competitorB",
    platform: "x",
    followers: 200000,
    engagementRate: 6.8,
    avgPostsPerWeek: 15,
    growthRate: 10.5,
    lastAnalyzed: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
];

export const competitorComparisons: CompetitorComparison[] = [
  {
    metric: "Engagement Rate",
    yourValue: 8.5,
    competitorValue: 7.5,
    difference: 13.3,
    status: "ahead",
  },
  {
    metric: "Followers",
    yourValue: 125000,
    competitorValue: 150000,
    difference: -16.7,
    status: "behind",
  },
  {
    metric: "Growth Rate",
    yourValue: 12.5,
    competitorValue: 8.2,
    difference: 52.4,
    status: "ahead",
  },
];

export const competitorStats = {
  totalCompetitors: 8,
  avgEngagementRate: 7.2,
  avgGrowthRate: 9.1,
  topCompetitor: "Competitor A",
  lastUpdate: "6 hours ago",
};


export interface Competitor {
  id: string;
  name: string;
  platform: string;
  username: string;
  metrics: {
    followers: number;
    engagementRate: number;
    avgLikes: number;
    avgComments: number;
    postingFrequency: number;
  };
  comparison: {
    followerGap: number;
    engagementGap: number;
    performance: "better" | "worse" | "similar";
  };
  lastAnalyzed: string;
}

export interface CompetitorInsight {
  id: string;
  competitorId: string;
  type: "strength" | "weakness" | "opportunity";
  title: string;
  description: string;
  recommendation: string;
}

export const competitors: Competitor[] = [
  {
    id: "comp-1",
    name: "Competitor A",
    platform: "farcaster",
    username: "@competitor-a",
    metrics: {
      followers: 18900,
      engagementRate: 6.8,
      avgLikes: 1280,
      avgComments: 89,
      postingFrequency: 12,
    },
    comparison: {
      followerGap: 6400,
      engagementGap: -1.7,
      performance: "worse",
    },
    lastAnalyzed: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "comp-2",
    name: "Competitor B",
    platform: "instagram",
    username: "@competitor-b",
    metrics: {
      followers: 15600,
      engagementRate: 5.2,
      avgLikes: 810,
      avgComments: 45,
      postingFrequency: 8,
    },
    comparison: {
      followerGap: -7800,
      engagementGap: 3.3,
      performance: "better",
    },
    lastAnalyzed: new Date(Date.now() - 7200000).toISOString(),
  },
];

export const competitorInsights: CompetitorInsight[] = [
  {
    id: "insight-1",
    competitorId: "comp-1",
    type: "opportunity",
    title: "Higher Engagement Opportunity",
    description: "Your engagement rate is 1.7% higher than Competitor A",
    recommendation: "Leverage your higher engagement to grow faster",
  },
  {
    id: "insight-2",
    competitorId: "comp-2",
    type: "strength",
    title: "Stronger Performance",
    description: "You outperform Competitor B in engagement rate",
    recommendation: "Continue current content strategy",
  },
];

export const competitorStats = {
  totalCompetitors: 5,
  analyzedToday: 2,
  avgEngagementGap: 2.1,
  topPerformer: "Your Brand",
};

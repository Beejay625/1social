export interface Competitor {
  id: string;
  name: string;
  platforms: string[];
  followers: number;
  engagementRate: number;
  postingFrequency: number;
  contentTypes: string[];
  strengths: string[];
  weaknesses: string[];
}

export interface CompetitorComparison {
  metric: string;
  yourValue: number;
  competitorValues: Record<string, number>;
  yourRank: number;
  totalCompetitors: number;
}

export const competitors: Competitor[] = [
  {
    id: "comp-1",
    name: "Competitor A",
    platforms: ["farcaster", "x", "instagram"],
    followers: 45000,
    engagementRate: 7.8,
    postingFrequency: 15,
    contentTypes: ["announcements", "tutorials", "community"],
    strengths: ["Strong community engagement", "Consistent posting"],
    weaknesses: ["Limited platform diversity", "Lower video content"],
  },
  {
    id: "comp-2",
    name: "Competitor B",
    platforms: ["instagram", "tiktok", "youtube"],
    followers: 78000,
    engagementRate: 6.5,
    postingFrequency: 20,
    contentTypes: ["videos", "stories", "reels"],
    strengths: ["High video content", "Strong visual presence"],
    weaknesses: ["Lower engagement rate", "Less Web3 focus"],
  },
  {
    id: "comp-3",
    name: "Competitor C",
    platforms: ["farcaster", "x", "linkedin"],
    followers: 32000,
    engagementRate: 9.2,
    postingFrequency: 12,
    contentTypes: ["thought leadership", "articles", "threads"],
    strengths: ["High engagement rate", "Quality content"],
    weaknesses: ["Lower posting frequency", "Smaller audience"],
  },
];

export const competitorComparisons: CompetitorComparison[] = [
  {
    metric: "Engagement Rate",
    yourValue: 8.5,
    competitorValues: {
      "Competitor A": 7.8,
      "Competitor B": 6.5,
      "Competitor C": 9.2,
    },
    yourRank: 2,
    totalCompetitors: 4,
  },
  {
    metric: "Followers",
    yourValue: 37000,
    competitorValues: {
      "Competitor A": 45000,
      "Competitor B": 78000,
      "Competitor C": 32000,
    },
    yourRank: 3,
    totalCompetitors: 4,
  },
  {
    metric: "Posting Frequency",
    yourValue: 12,
    competitorValues: {
      "Competitor A": 15,
      "Competitor B": 20,
      "Competitor C": 12,
    },
    yourRank: 2,
    totalCompetitors: 4,
  },
];

export const competitorAnalysisStats = {
  totalCompetitorsTracked: 3,
  avgEngagementRate: 7.8,
  marketPosition: "2nd",
  competitiveAdvantage: "High engagement rate and Web3 focus",
};


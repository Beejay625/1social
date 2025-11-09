export interface AudienceSegment {
  id: string;
  name: string;
  size: number;
  growth: number;
  engagementRate: number;
  topInterests: string[];
  demographics: {
    age: string;
    location: string;
    gender: string;
  };
}

export interface AudienceInsight {
  id: string;
  type: "growth" | "engagement" | "demographic" | "behavior";
  title: string;
  description: string;
  impact: "positive" | "negative" | "neutral";
  recommendation: string;
}

export const audienceSegments: AudienceSegment[] = [
  {
    id: "segment-1",
    name: "Web3 Creators",
    size: 4500,
    growth: 12.5,
    engagementRate: 8.5,
    topInterests: ["crypto", "NFTs", "decentralization"],
    demographics: {
      age: "25-34",
      location: "North America",
      gender: "60% Male, 40% Female",
    },
  },
  {
    id: "segment-2",
    name: "Tech Enthusiasts",
    size: 3200,
    growth: 8.3,
    engagementRate: 6.2,
    topInterests: ["technology", "startups", "innovation"],
    demographics: {
      age: "30-44",
      location: "Global",
      gender: "55% Male, 45% Female",
    },
  },
];

export const audienceInsights: AudienceInsight[] = [
  {
    id: "insight-1",
    type: "growth",
    title: "Rapid follower growth",
    description: "Your audience grew 15% faster this month compared to last month",
    impact: "positive",
    recommendation: "Continue posting content that resonates with new followers",
  },
  {
    id: "insight-2",
    type: "engagement",
    title: "Peak engagement times",
    description: "Tuesday and Thursday afternoons show highest engagement rates",
    impact: "positive",
    recommendation: "Schedule more content during these peak times",
  },
];

export const audienceStats = {
  totalFollowers: 12500,
  growthRate: 12.5,
  avgEngagementRate: 7.8,
  topLocation: "North America",
  topAgeGroup: "25-34",
};

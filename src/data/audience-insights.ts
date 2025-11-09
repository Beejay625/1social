export interface AudienceSegment {
  id: string;
  name: string;
  size: number;
  growth: number;
  demographics: {
    ageGroups: Record<string, number>;
    locations: Record<string, number>;
    interests: string[];
  };
  engagementRate: number;
  topPlatforms: string[];
}

export interface AudienceInsight {
  id: string;
  type: "growth" | "engagement" | "demographics" | "behavior";
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  recommendation: string;
  confidence: number;
}

export const audienceSegments: AudienceSegment[] = [
  {
    id: "segment-1",
    name: "Web3 Builders",
    size: 12500,
    growth: 15.5,
    demographics: {
      ageGroups: { "25-34": 45, "35-44": 30, "18-24": 15, "45+": 10 },
      locations: { "United States": 40, "Europe": 30, "Asia": 20, "Other": 10 },
      interests: ["Web3", "Crypto", "DeFi", "NFTs", "Blockchain"],
    },
    engagementRate: 8.5,
    topPlatforms: ["farcaster", "x", "discord"],
  },
  {
    id: "segment-2",
    name: "Content Creators",
    size: 8900,
    growth: 12.3,
    demographics: {
      ageGroups: { "18-24": 35, "25-34": 40, "35-44": 20, "45+": 5 },
      locations: { "United States": 35, "Europe": 25, "Asia": 30, "Other": 10 },
      interests: ["Content Creation", "Social Media", "Marketing", "Design"],
    },
    engagementRate: 7.2,
    topPlatforms: ["instagram", "tiktok", "youtube"],
  },
  {
    id: "segment-3",
    name: "Tech Enthusiasts",
    size: 15600,
    growth: 18.7,
    demographics: {
      ageGroups: { "25-34": 50, "35-44": 30, "18-24": 15, "45+": 5 },
      locations: { "United States": 45, "Europe": 25, "Asia": 25, "Other": 5 },
      interests: ["Technology", "AI", "Software", "Innovation"],
    },
    engagementRate: 9.1,
    topPlatforms: ["x", "linkedin", "farcaster"],
  },
];

export const audienceInsights: AudienceInsight[] = [
  {
    id: "insight-1",
    type: "growth",
    title: "Rapid Growth in Web3 Segment",
    description: "Web3 Builders segment has grown 15.5% in the last month",
    impact: "high",
    recommendation: "Increase Web3-focused content to capitalize on growth",
    confidence: 92,
  },
  {
    id: "insight-2",
    type: "engagement",
    title: "High Engagement During Evening Hours",
    description: "Engagement rates are 40% higher between 6-9 PM",
    impact: "high",
    recommendation: "Schedule more posts during evening hours",
    confidence: 88,
  },
  {
    id: "insight-3",
    type: "demographics",
    title: "Growing 25-34 Age Group",
    description: "25-34 age group now represents 45% of total audience",
    impact: "medium",
    recommendation: "Tailor content to resonate with this demographic",
    confidence: 85,
  },
];

export const audienceStats = {
  totalAudience: 37000,
  monthlyGrowth: 15.2,
  avgEngagementRate: 8.3,
  topLocation: "United States",
  mostActivePlatform: "farcaster",
};


export interface Hashtag {
  id: string;
  tag: string;
  platform: string;
  volume: number;
  growth: number;
  engagement: number;
  difficulty: "low" | "medium" | "high";
  relatedTags: string[];
  topPosts: number;
  trend: "rising" | "stable" | "declining";
}

export interface HashtagResearch {
  id: string;
  query: string;
  hashtags: Hashtag[];
  insights: {
    bestTimeToPost: string;
    recommendedTags: string[];
    audienceOverlap: number;
  };
  createdAt: string;
}

export interface HashtagPerformance {
  hashtag: string;
  platform: string;
  impressions: number;
  engagement: number;
  reach: number;
  usageCount: number;
  avgEngagementRate: number;
}

export const hashtagResearch: HashtagResearch[] = [
  {
    id: "research-1",
    query: "social media management",
    hashtags: [
      {
        id: "tag-1",
        tag: "#SocialMediaManagement",
        platform: "all",
        volume: 125000,
        growth: 15.5,
        engagement: 8.2,
        difficulty: "medium",
        relatedTags: ["#SMM", "#SocialMedia", "#Marketing"],
        topPosts: 450,
        trend: "rising",
      },
      {
        id: "tag-2",
        tag: "#ContentMarketing",
        platform: "all",
        volume: 89000,
        growth: 8.3,
        engagement: 7.5,
        difficulty: "high",
        relatedTags: ["#Content", "#Marketing", "#DigitalMarketing"],
        topPosts: 320,
        trend: "stable",
      },
    ],
    insights: {
      bestTimeToPost: "Tuesday 2 PM",
      recommendedTags: ["#SocialMediaManagement", "#ContentMarketing", "#DigitalMarketing"],
      audienceOverlap: 65,
    },
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export const hashtagPerformance: HashtagPerformance[] = [
  {
    hashtag: "#Web3Builders",
    platform: "farcaster",
    impressions: 45000,
    engagement: 3200,
    reach: 38000,
    usageCount: 45,
    avgEngagementRate: 7.1,
  },
  {
    hashtag: "#SocialMediaTools",
    platform: "x",
    impressions: 32000,
    engagement: 2100,
    reach: 28000,
    usageCount: 32,
    avgEngagementRate: 6.6,
  },
];

export const trendingHashtags: Hashtag[] = [
  {
    id: "trend-1",
    tag: "#AIPowered",
    platform: "all",
    volume: 245000,
    growth: 245.5,
    engagement: 12.3,
    difficulty: "low",
    relatedTags: ["#AI", "#Automation", "#Innovation"],
    topPosts: 890,
    trend: "rising",
  },
  {
    id: "trend-2",
    tag: "#Web3Social",
    platform: "farcaster",
    volume: 156000,
    growth: 189.2,
    engagement: 9.8,
    difficulty: "medium",
    relatedTags: ["#Web3", "#Decentralized", "#Social"],
    topPosts: 567,
    trend: "rising",
  },
];

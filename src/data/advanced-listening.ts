export interface ListeningQuery {
  id: string;
  name: string;
  keywords: string[];
  platforms: string[];
  status: "active" | "paused" | "archived";
  matchCount: number;
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  createdAt: string;
  lastMatch: string;
}

export interface Mention {
  id: string;
  queryId: string;
  platform: string;
  author: string;
  content: string;
  sentiment: "positive" | "neutral" | "negative";
  engagement: number;
  timestamp: string;
  url: string;
  tags: string[];
}

export interface ListeningDashboard {
  totalQueries: number;
  activeQueries: number;
  totalMentions: number;
  mentionsToday: number;
  sentimentBreakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
  topKeywords: { keyword: string; count: number }[];
  trendingTopics: { topic: string; growth: number }[];
}

export const listeningQueries: ListeningQuery[] = [
  {
    id: "query-1",
    name: "Brand Mentions",
    keywords: ["1social", "1Social", "one social"],
    platforms: ["farcaster", "x", "instagram"],
    status: "active",
    matchCount: 1245,
    sentiment: {
      positive: 856,
      neutral: 312,
      negative: 77,
    },
    createdAt: new Date(Date.now() - 2592000000).toISOString(),
    lastMatch: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: "query-2",
    name: "Competitor Monitoring",
    keywords: ["competitor", "alternative", "vs"],
    platforms: ["x", "farcaster"],
    status: "active",
    matchCount: 892,
    sentiment: {
      positive: 234,
      neutral: 512,
      negative: 146,
    },
    createdAt: new Date(Date.now() - 1728000000).toISOString(),
    lastMatch: new Date(Date.now() - 3600000).toISOString(),
  },
];

export const recentMentions: Mention[] = [
  {
    id: "mention-1",
    queryId: "query-1",
    platform: "farcaster",
    author: "@builder123",
    content: "Just discovered 1Social and it's amazing! The AI features are incredible.",
    sentiment: "positive",
    engagement: 45,
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    url: "https://farcaster.xyz/...",
    tags: ["product", "ai"],
  },
  {
    id: "mention-2",
    queryId: "query-1",
    platform: "x",
    author: "@creator456",
    content: "Looking for a social media management tool. Anyone tried 1Social?",
    sentiment: "neutral",
    engagement: 12,
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    url: "https://x.com/...",
    tags: ["question"],
  },
];

export const listeningDashboard: ListeningDashboard = {
  totalQueries: 8,
  activeQueries: 6,
  totalMentions: 2137,
  mentionsToday: 47,
  sentimentBreakdown: {
    positive: 1090,
    neutral: 824,
    negative: 223,
  },
  topKeywords: [
    { keyword: "1social", count: 1245 },
    { keyword: "social media", count: 892 },
    { keyword: "management", count: 567 },
  ],
  trendingTopics: [
    { topic: "AI-powered tools", growth: 245 },
    { topic: "Web3 social", growth: 189 },
    { topic: "Content automation", growth: 156 },
  ],
};


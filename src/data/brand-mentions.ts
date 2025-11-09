export interface BrandMention {
  id: string;
  platform: string;
  author: string;
  content: string;
  sentiment: "positive" | "negative" | "neutral";
  engagement: number;
  timestamp: string;
  url: string;
}

export interface BrandMentionTrend {
  date: string;
  mentions: number;
  positive: number;
  negative: number;
  neutral: number;
}

export const brandMentions: BrandMention[] = [
  {
    id: "mention-1",
    platform: "farcaster",
    author: "@creator123",
    content: "Just tried @yourbrand and it's amazing! The UI is so clean 🚀",
    sentiment: "positive",
    engagement: 124,
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    url: "#",
  },
  {
    id: "mention-2",
    platform: "x",
    author: "@user456",
    content: "Anyone else having issues with @yourbrand today?",
    sentiment: "negative",
    engagement: 45,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    url: "#",
  },
  {
    id: "mention-3",
    platform: "instagram",
    author: "@influencer789",
    content: "Check out this cool feature from @yourbrand ✨",
    sentiment: "positive",
    engagement: 890,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    url: "#",
  },
];

export const brandMentionTrends: BrandMentionTrend[] = [
  {
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
    mentions: 120,
    positive: 85,
    negative: 15,
    neutral: 20,
  },
  {
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    mentions: 145,
    positive: 105,
    negative: 20,
    neutral: 20,
  },
  {
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
    mentions: 180,
    positive: 130,
    negative: 25,
    neutral: 25,
  },
  {
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    mentions: 165,
    positive: 120,
    negative: 20,
    neutral: 25,
  },
  {
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    mentions: 200,
    positive: 150,
    negative: 30,
    neutral: 20,
  },
  {
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    mentions: 185,
    positive: 140,
    negative: 25,
    neutral: 20,
  },
];

export const brandMentionStats = {
  totalMentions: 1240,
  positiveMentions: 920,
  negativeMentions: 180,
  neutralMentions: 140,
  sentimentScore: 0.74,
  topPlatform: "farcaster",
  growthRate: 12.5,
};

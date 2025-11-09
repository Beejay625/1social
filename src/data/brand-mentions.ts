export const brandMentions = [
  {
    id: "mention-1",
    platform: "farcaster",
    author: "@cryptouser",
    content: "Just tried @yourbrand and it's amazing!",
    sentiment: "positive",
    engagement: 45,
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "mention-2",
    platform: "x",
    author: "@techlover",
    content: "Anyone else using @yourbrand? Thoughts?",
    sentiment: "neutral",
    engagement: 23,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "mention-3",
    platform: "instagram",
    author: "@creator123",
    content: "Love the new features from @yourbrand!",
    sentiment: "positive",
    engagement: 89,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
];

export const mentionStats = {
  totalMentions: 1240,
  positive: 856,
  neutral: 312,
  negative: 72,
  avgEngagement: 34.5,
  responseRate: 78.2,
};

export const mentionTrends = [
  {
    id: "trend-1",
    period: "Last 7 days",
    mentions: 245,
    change: 12.5,
    sentiment: "positive",
  },
];


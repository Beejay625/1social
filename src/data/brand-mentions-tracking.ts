export const brandMentionsStats = {
  totalMentions: 1240,
  positive: 856,
  neutral: 312,
  negative: 72,
  growth: 18.5,
  responseRate: 78.2,
};

export const recentMentions = [
  {
    id: "mention-1",
    platform: "farcaster",
    author: "@cryptouser",
    content: "Just tried @yourbrand and it's amazing! The new features are incredible.",
    sentiment: "positive",
    engagement: 45,
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    responded: true,
    responseTime: "15 minutes",
  },
  {
    id: "mention-2",
    platform: "x",
    author: "@techlover",
    content: "Anyone else using @yourbrand? Thoughts on the latest update?",
    sentiment: "neutral",
    engagement: 23,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    responded: false,
    responseTime: null,
  },
  {
    id: "mention-3",
    platform: "instagram",
    author: "@creator123",
    content: "Love the new features from @yourbrand! Keep up the great work!",
    sentiment: "positive",
    engagement: 89,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    responded: true,
    responseTime: "45 minutes",
  },
];

export const mentionTrends = [
  {
    period: "Last 7 days",
    mentions: 245,
    change: 12.5,
    sentiment: "positive",
    topPlatform: "farcaster",
  },
  {
    period: "Last 30 days",
    mentions: 1240,
    change: 18.5,
    sentiment: "positive",
    topPlatform: "instagram",
  },
];

export const topMentionDrivers = [
  {
    driver: "Product Launch",
    mentions: 245,
    sentiment: 88,
    growth: 35,
  },
  {
    driver: "Feature Updates",
    mentions: 189,
    sentiment: 82,
    growth: 22,
  },
  {
    driver: "Community Engagement",
    mentions: 156,
    sentiment: 91,
    growth: 18,
  },
];

export const mentionAlerts = [
  {
    id: "alert-1",
    type: "spike",
    severity: "high",
    title: "Mention Spike Detected",
    description: "Mentions increased by 45% in the last 2 hours",
    platform: "farcaster",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "alert-2",
    type: "negative",
    severity: "medium",
    title: "Negative Mention Alert",
    description: "Negative sentiment increased by 15%",
    platform: "x",
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
];


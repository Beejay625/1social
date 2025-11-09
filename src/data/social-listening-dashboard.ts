export const listeningStats = {
  keywordsMonitored: 24,
  totalMentions: 3456,
  avgSentiment: 78,
  trendingTopics: 8,
  alertsTriggered: 12,
};

export const monitoredKeywords = [
  {
    id: "keyword-1",
    keyword: "yourbrand",
    mentions: 1240,
    sentiment: 82,
    growth: 18.5,
    trend: "up",
    alerts: 3,
  },
  {
    id: "keyword-2",
    keyword: "product launch",
    mentions: 456,
    sentiment: 88,
    growth: 35.2,
    trend: "up",
    alerts: 2,
  },
  {
    id: "keyword-3",
    keyword: "competitor mention",
    mentions: 234,
    sentiment: 65,
    growth: 12.3,
    trend: "stable",
    alerts: 1,
  },
];

export const trendingTopics = [
  {
    id: "topic-1",
    topic: "Web3 Creator Economy",
    mentions: 1234,
    growth: 45.2,
    sentiment: 85,
    relevance: "high",
    platforms: ["farcaster", "x", "lens"],
  },
  {
    id: "topic-2",
    topic: "Social Media Management",
    mentions: 890,
    growth: 28.5,
    sentiment: 78,
    relevance: "high",
    platforms: ["x", "instagram"],
  },
  {
    id: "topic-3",
    topic: "AI Content Creation",
    mentions: 567,
    growth: 32.1,
    sentiment: 82,
    relevance: "medium",
    platforms: ["farcaster", "x"],
  },
];

export const listeningAlerts = [
  {
    id: "alert-1",
    type: "spike",
    keyword: "yourbrand",
    title: "Mention Spike Detected",
    description: "Mentions increased by 45% in the last hour",
    severity: "high",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    actionRequired: true,
  },
  {
    id: "alert-2",
    type: "sentiment",
    keyword: "product launch",
    title: "Positive Sentiment Trend",
    description: "Positive sentiment increased by 15%",
    severity: "low",
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    actionRequired: false,
  },
];

export const listeningInsights = [
  {
    id: "insight-1",
    type: "opportunity",
    title: "Engage with Trending Topic",
    description: "Web3 Creator Economy is trending - consider creating content",
    impact: "high",
    confidence: 88,
  },
  {
    id: "insight-2",
    type: "warning",
    title: "Competitor Mention Increase",
    description: "Competitor mentions increased by 25%",
    impact: "medium",
    confidence: 75,
  },
];

export const platformBreakdown = [
  {
    platform: "farcaster",
    mentions: 1234,
    sentiment: 85,
    growth: 22.5,
  },
  {
    platform: "x",
    mentions: 890,
    sentiment: 78,
    growth: 18.3,
  },
  {
    platform: "instagram",
    mentions: 567,
    sentiment: 82,
    growth: 15.7,
  },
];


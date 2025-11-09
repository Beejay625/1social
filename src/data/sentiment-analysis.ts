export const sentimentMetrics = {
  overallSentiment: 78,
  positive: 65,
  neutral: 25,
  negative: 10,
  sentimentTrend: "improving",
  avgSentimentScore: 7.8,
};

export const sentimentByPlatform = [
  {
    platform: "farcaster",
    sentiment: 82,
    positive: 70,
    neutral: 22,
    negative: 8,
    trend: "improving",
  },
  {
    platform: "x",
    sentiment: 75,
    positive: 62,
    neutral: 28,
    negative: 10,
    trend: "stable",
  },
  {
    platform: "instagram",
    sentiment: 81,
    positive: 68,
    neutral: 24,
    negative: 8,
    trend: "improving",
  },
  {
    platform: "lens",
    sentiment: 79,
    positive: 66,
    neutral: 26,
    negative: 8,
    trend: "improving",
  },
];

export const sentimentTrends = [
  {
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    sentiment: 72,
    positive: 58,
    neutral: 30,
    negative: 12,
  },
  {
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
    sentiment: 75,
    positive: 62,
    neutral: 27,
    negative: 11,
  },
  {
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 21).toISOString(),
    sentiment: 78,
    positive: 65,
    neutral: 25,
    negative: 10,
  },
];

export const sentimentAlerts = [
  {
    id: "alert-1",
    type: "negative_spike",
    severity: "high",
    title: "Negative Sentiment Spike Detected",
    description: "Negative mentions increased by 35% in the last 24 hours",
    platform: "x",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    actionRequired: true,
  },
  {
    id: "alert-2",
    type: "positive_trend",
    severity: "low",
    title: "Positive Sentiment Trend",
    description: "Positive sentiment increased by 12% this week",
    platform: "farcaster",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    actionRequired: false,
  },
];

export const topSentimentDrivers = [
  {
    id: "driver-1",
    factor: "Product Launch",
    impact: "high",
    sentiment: 85,
    mentions: 245,
    trend: "positive",
  },
  {
    id: "driver-2",
    factor: "Customer Support",
    impact: "medium",
    sentiment: 72,
    mentions: 189,
    trend: "improving",
  },
  {
    id: "driver-3",
    factor: "Feature Updates",
    impact: "high",
    sentiment: 88,
    mentions: 312,
    trend: "positive",
  },
];

export const sentimentInsights = [
  {
    id: "insight-1",
    type: "opportunity",
    title: "Engage with Positive Mentions",
    description: "245 positive mentions this week - consider engaging to amplify",
    impact: "high",
    action: "Respond to top positive mentions to boost engagement",
  },
  {
    id: "insight-2",
    type: "warning",
    title: "Address Negative Feedback",
    description: "10% negative sentiment - review recent negative mentions",
    impact: "medium",
    action: "Review and respond to negative feedback promptly",
  },
];


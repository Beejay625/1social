export const healthScore = {
  overall: 85,
  content: 88,
  engagement: 87,
  growth: 82,
  compliance: 94,
  trend: "improving",
};

export const healthMetrics = [
  {
    metric: "Content Quality",
    score: 88,
    status: "excellent",
    trend: "up",
    change: 3,
    description: "High-quality content drives strong performance",
  },
  {
    metric: "Engagement Rate",
    score: 87,
    status: "excellent",
    trend: "up",
    change: 5,
    description: "6.2% engagement rate above industry average",
  },
  {
    metric: "Follower Growth",
    score: 82,
    status: "good",
    trend: "up",
    change: 8,
    description: "Steady growth with 12.5% monthly increase",
  },
  {
    metric: "Response Time",
    score: 88,
    status: "excellent",
    trend: "stable",
    change: 0,
    description: "Average response time of 2.8 hours",
  },
  {
    metric: "Compliance",
    score: 94,
    status: "excellent",
    trend: "up",
    change: 2,
    description: "100% compliance rate with no violations",
  },
];

export const healthTrends = [
  {
    period: "Last 7 days",
    score: 85,
    change: 2,
    trend: "up",
  },
  {
    period: "Last 30 days",
    score: 83,
    change: 5,
    trend: "up",
  },
  {
    period: "Last 90 days",
    score: 80,
    change: 8,
    trend: "up",
  },
];

export const healthAlerts = [
  {
    id: "alert-1",
    type: "warning",
    severity: "medium",
    title: "Follower Growth Slowing",
    description: "Growth rate decreased by 2% this week",
    metric: "growth",
    actionRequired: true,
  },
  {
    id: "alert-2",
    type: "info",
    severity: "low",
    title: "Compliance Score Excellent",
    description: "Maintaining 100% compliance rate",
    metric: "compliance",
    actionRequired: false,
  },
];

export const healthRecommendations = [
  {
    id: "rec-1",
    priority: "high",
    title: "Boost Follower Growth",
    description: "Implement growth strategies to increase follower acquisition",
    impact: "Increase growth score by 5 points",
    effort: "medium",
  },
  {
    id: "rec-2",
    priority: "medium",
    title: "Maintain Content Quality",
    description: "Continue producing high-quality content",
    impact: "Maintain current excellent score",
    effort: "low",
  },
];

export const healthByPlatform = [
  {
    platform: "farcaster",
    score: 89,
    content: 91,
    engagement: 89,
    growth: 88,
    compliance: 95,
  },
  {
    platform: "instagram",
    score: 87,
    content: 88,
    engagement: 88,
    growth: 85,
    compliance: 94,
  },
  {
    platform: "x",
    score: 82,
    content: 85,
    engagement: 85,
    growth: 78,
    compliance: 92,
  },
  {
    platform: "lens",
    score: 86,
    content: 87,
    engagement: 87,
    growth: 83,
    compliance: 93,
  },
];


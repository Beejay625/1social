export const engagementScore = {
  overall: 87,
  quality: 92,
  quantity: 85,
  responsiveness: 88,
  trend: "improving",
};

export const engagementByPlatform = [
  {
    platform: "farcaster",
    score: 89,
    quality: 94,
    quantity: 87,
    responsiveness: 86,
    trend: "improving",
  },
  {
    platform: "instagram",
    score: 88,
    quality: 91,
    quantity: 88,
    responsiveness: 85,
    trend: "stable",
  },
  {
    platform: "x",
    score: 85,
    quality: 88,
    quantity: 84,
    responsiveness: 83,
    trend: "improving",
  },
  {
    platform: "lens",
    score: 87,
    quality: 90,
    quantity: 86,
    responsiveness: 85,
    trend: "stable",
  },
];

export const engagementFactors = [
  {
    factor: "Response Time",
    score: 88,
    weight: 25,
    status: "excellent",
    description: "Average response time of 2.8 hours",
  },
  {
    factor: "Engagement Rate",
    score: 92,
    weight: 30,
    status: "excellent",
    description: "6.2% average engagement rate",
  },
  {
    factor: "Content Quality",
    score: 90,
    weight: 25,
    status: "excellent",
    description: "High-quality content drives engagement",
  },
  {
    factor: "Audience Interaction",
    score: 85,
    weight: 20,
    status: "good",
    description: "Active audience participation",
  },
];

export const engagementTrends = [
  {
    period: "Last 7 days",
    score: 87,
    change: 3,
    trend: "up",
  },
  {
    period: "Last 30 days",
    score: 85,
    change: 5,
    trend: "up",
  },
  {
    period: "Last 90 days",
    score: 82,
    change: 8,
    trend: "up",
  },
];

export const engagementRecommendations = [
  {
    id: "rec-1",
    priority: "high",
    title: "Improve Response Time on X",
    description: "Response time on X is 4.2 hours - aim for under 3 hours",
    impact: "Increase engagement score by 3 points",
    effort: "medium",
  },
  {
    id: "rec-2",
    priority: "medium",
    title: "Increase Engagement Frequency",
    description: "Post more frequently to maintain audience interest",
    impact: "Increase quantity score by 5 points",
    effort: "low",
  },
  {
    id: "rec-3",
    priority: "low",
    title: "Enhance Content Variety",
    description: "Add more video content to improve engagement quality",
    impact: "Increase quality score by 2 points",
    effort: "high",
  },
];


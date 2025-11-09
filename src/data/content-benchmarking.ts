export const industryBenchmarks = {
  engagementRate: {
    farcaster: { average: 5.2, top: 8.5, your: 6.8 },
    x: { average: 3.1, top: 6.2, your: 4.5 },
    instagram: { average: 4.8, top: 9.2, your: 7.1 },
    lens: { average: 4.5, top: 7.8, your: 5.9 },
    mirror: { average: 3.8, top: 6.5, your: 4.2 },
  },
  reach: {
    farcaster: { average: 8500, top: 25000, your: 12500 },
    x: { average: 6200, top: 18000, your: 9800 },
    instagram: { average: 12000, top: 35000, your: 18500 },
    lens: { average: 7800, top: 22000, your: 11200 },
    mirror: { average: 4500, top: 12000, your: 6800 },
  },
  postingFrequency: {
    farcaster: { average: 3.5, top: 7, your: 5 },
    x: { average: 5.2, top: 12, your: 8 },
    instagram: { average: 4.8, top: 10, your: 6 },
    lens: { average: 2.8, top: 6, your: 4 },
    mirror: { average: 1.5, top: 4, your: 2 },
  },
  responseTime: {
    farcaster: { average: 4.2, top: 1.5, your: 2.8 },
    x: { average: 5.8, top: 2.1, your: 3.5 },
    instagram: { average: 6.5, top: 2.5, your: 4.2 },
    lens: { average: 5.2, top: 2.0, your: 3.1 },
    mirror: { average: 8.5, top: 3.5, your: 5.8 },
  },
};

export const benchmarkComparison = [
  {
    metric: "Engagement Rate",
    yourValue: 6.2,
    industryAverage: 4.3,
    topPerformers: 8.1,
    percentile: 75,
    status: "above_average",
  },
  {
    metric: "Reach per Post",
    yourValue: 11200,
    industryAverage: 7800,
    topPerformers: 22400,
    percentile: 68,
    status: "above_average",
  },
  {
    metric: "Posting Frequency",
    yourValue: 5.0,
    industryAverage: 3.6,
    topPerformers: 7.8,
    percentile: 72,
    status: "above_average",
  },
  {
    metric: "Response Time (hours)",
    yourValue: 3.9,
    industryAverage: 6.0,
    topPerformers: 2.3,
    percentile: 65,
    status: "above_average",
  },
  {
    metric: "Content Quality Score",
    yourValue: 87,
    industryAverage: 75,
    topPerformers: 95,
    percentile: 78,
    status: "above_average",
  },
];

export const benchmarkByContentType = [
  {
    type: "video",
    yourEngagement: 8.5,
    industryAverage: 6.2,
    topPerformers: 11.5,
    percentile: 72,
  },
  {
    type: "image",
    yourEngagement: 5.8,
    industryAverage: 4.1,
    topPerformers: 7.8,
    percentile: 68,
  },
  {
    type: "carousel",
    yourEngagement: 7.2,
    industryAverage: 5.5,
    topPerformers: 9.2,
    percentile: 70,
  },
  {
    type: "text",
    yourEngagement: 4.2,
    industryAverage: 3.2,
    topPerformers: 5.8,
    percentile: 65,
  },
];

export const benchmarkGoals = [
  {
    metric: "Engagement Rate",
    current: 6.2,
    goal: 8.0,
    gap: 1.8,
    timeframe: "90 days",
    actionItems: [
      "Increase video content by 40%",
      "Optimize posting times",
      "Improve content quality",
    ],
  },
  {
    metric: "Reach per Post",
    current: 11200,
    goal: 18000,
    gap: 6800,
    timeframe: "90 days",
    actionItems: [
      "Expand hashtag strategy",
      "Increase cross-platform promotion",
      "Leverage influencer partnerships",
    ],
  },
  {
    metric: "Response Time",
    current: 3.9,
    goal: 2.0,
    gap: 1.9,
    timeframe: "60 days",
    actionItems: [
      "Implement auto-reply system",
      "Set up response alerts",
      "Optimize team workflows",
    ],
  },
];

export const benchmarkInsights = [
  {
    id: "insight-1",
    type: "strength",
    title: "Video Content Performance",
    description: "Your video content performs 37% above industry average",
    metric: "engagement",
    value: 8.5,
    benchmark: 6.2,
  },
  {
    id: "insight-2",
    type: "opportunity",
    title: "Posting Frequency Opportunity",
    description: "Increasing posting frequency could boost reach by 25%",
    metric: "reach",
    value: 5.0,
    benchmark: 7.8,
  },
  {
    id: "insight-3",
    type: "strength",
    title: "Response Time Excellence",
    description: "Your response time is 35% faster than industry average",
    metric: "response",
    value: 3.9,
    benchmark: 6.0,
  },
];


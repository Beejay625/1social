export const performanceInsights = [
  {
    id: "insight-1",
    type: "opportunity",
    category: "content",
    title: "Video Content Performs 2.5x Better",
    description: "Video posts generate 2.5x more engagement than static images",
    impact: "high",
    confidence: 92,
    recommendation: "Increase video content production by 40%",
    expectedImprovement: "25% increase in overall engagement",
    metrics: {
      videoEngagement: 8.5,
      imageEngagement: 3.4,
      difference: 150,
    },
  },
  {
    id: "insight-2",
    type: "strength",
    category: "timing",
    title: "Tuesday 2 PM is Your Peak Time",
    description: "Posts published on Tuesday at 2 PM show 23% higher engagement",
    impact: "high",
    confidence: 88,
    recommendation: "Schedule high-priority content for Tuesday afternoons",
    expectedImprovement: "Maintain current strong performance",
    metrics: {
      tuesday2pm: 8.2,
      average: 6.7,
      difference: 22,
    },
  },
  {
    id: "insight-3",
    type: "opportunity",
    category: "hashtags",
    title: "Underutilized Hashtag Strategy",
    description: "Posts with 5-7 hashtags perform 18% better than those with fewer",
    impact: "medium",
    confidence: 85,
    recommendation: "Increase hashtag usage to 5-7 per post",
    expectedImprovement: "15% increase in reach",
    metrics: {
      optimalHashtags: 7.2,
      currentAverage: 3.8,
      difference: 18,
    },
  },
  {
    id: "insight-4",
    type: "warning",
    category: "engagement",
    title: "Response Time Needs Improvement",
    description: "Response time increased by 15% this month, affecting engagement",
    impact: "medium",
    confidence: 90,
    recommendation: "Implement automated response workflows",
    expectedImprovement: "Reduce response time by 30%",
    metrics: {
      current: 3.9,
      target: 2.7,
      difference: -15,
    },
  },
];

export const insightCategories = [
  {
    category: "content",
    insights: 12,
    avgImpact: "high",
    topInsight: "Video Content Performs 2.5x Better",
  },
  {
    category: "timing",
    insights: 8,
    avgImpact: "high",
    topInsight: "Tuesday 2 PM is Your Peak Time",
  },
  {
    category: "hashtags",
    insights: 6,
    avgImpact: "medium",
    topInsight: "Underutilized Hashtag Strategy",
  },
  {
    category: "engagement",
    insights: 10,
    avgImpact: "medium",
    topInsight: "Response Time Needs Improvement",
  },
];

export const insightImpact = {
  high: 8,
  medium: 12,
  low: 4,
  total: 24,
};

export const actionableInsights = performanceInsights.filter(
  (insight) => insight.impact === "high" || insight.impact === "medium"
);


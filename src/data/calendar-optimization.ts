export const optimizationScore = {
  overall: 88,
  timing: 92,
  frequency: 85,
  distribution: 87,
  trend: "improving",
};

export const optimizationRecommendations = [
  {
    id: "opt-1",
    type: "timing",
    priority: "high",
    title: "Optimize Posting Schedule",
    description: "Reschedule 12 posts to optimal time slots",
    impact: "Increase engagement by 18%",
    postsAffected: 12,
    currentScore: 78,
    potentialScore: 92,
  },
  {
    id: "opt-2",
    type: "frequency",
    priority: "medium",
    title: "Increase Posting Frequency",
    description: "Add 3 more posts per week for better reach",
    impact: "Increase reach by 15%",
    postsAffected: 3,
    currentScore: 82,
    potentialScore: 88,
  },
  {
    id: "opt-3",
    type: "distribution",
    priority: "high",
    title: "Improve Cross-Platform Distribution",
    description: "Distribute 8 posts across more platforms",
    impact: "Increase total reach by 25%",
    postsAffected: 8,
    currentScore: 80,
    potentialScore: 90,
  },
];

export const optimalTimeSlots = [
  {
    day: "Monday",
    time: "14:00",
    score: 88,
    engagement: 8.2,
    reach: 12500,
    recommendation: "Schedule high-priority content",
  },
  {
    day: "Tuesday",
    time: "14:00",
    score: 92,
    engagement: 9.1,
    reach: 15200,
    recommendation: "Best time for product launches",
  },
  {
    day: "Wednesday",
    time: "15:00",
    score: 85,
    engagement: 7.8,
    reach: 11800,
    recommendation: "Good for educational content",
  },
  {
    day: "Thursday",
    time: "10:00",
    score: 87,
    engagement: 8.0,
    reach: 12200,
    recommendation: "Ideal for announcements",
  },
  {
    day: "Friday",
    time: "16:00",
    score: 84,
    engagement: 7.6,
    reach: 11200,
    recommendation: "Good for community content",
  },
];

export const calendarGaps = [
  {
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
    time: "14:00",
    platform: "farcaster",
    opportunity: "high",
    recommendedContent: "Product update",
  },
  {
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
    time: "10:00",
    platform: "instagram",
    opportunity: "medium",
    recommendedContent: "Behind the scenes",
  },
  {
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
    time: "15:00",
    platform: "x",
    opportunity: "high",
    recommendedContent: "Industry insights",
  },
];

export const optimizationStats = {
  postsOptimized: 45,
  avgImprovement: 18,
  timeSaved: "8 hours",
  engagementIncrease: 22,
};

export const optimizationHistory = [
  {
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    optimizations: 12,
    improvement: 15,
    engagementIncrease: 18,
  },
  {
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
    optimizations: 8,
    improvement: 12,
    engagementIncrease: 14,
  },
  {
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 21).toISOString(),
    optimizations: 15,
    improvement: 20,
    engagementIncrease: 25,
  },
];


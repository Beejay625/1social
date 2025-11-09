export const contentForecasts = [
  {
    id: "forecast-1",
    contentId: "content-1",
    title: "Product Launch Announcement",
    platform: "farcaster",
    predictedReach: 12500,
    predictedEngagement: 890,
    predictedEngagementRate: 7.12,
    confidence: 85,
    factors: [
      { name: "Historical Performance", impact: "high", value: "+15%" },
      { name: "Timing", impact: "medium", value: "+8%" },
      { name: "Content Type", impact: "high", value: "+12%" },
      { name: "Hashtag Performance", impact: "low", value: "+3%" },
    ],
    forecastDate: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "forecast-2",
    contentId: "content-2",
    title: "Weekly Update Post",
    platform: "x",
    predictedReach: 8500,
    predictedEngagement: 425,
    predictedEngagementRate: 5.0,
    confidence: 78,
    factors: [
      { name: "Historical Performance", impact: "medium", value: "+5%" },
      { name: "Timing", impact: "high", value: "+12%" },
      { name: "Content Type", impact: "medium", value: "+6%" },
      { name: "Audience Growth", impact: "low", value: "+2%" },
    ],
    forecastDate: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id: "forecast-3",
    contentId: "content-3",
    title: "Behind the Scenes Video",
    platform: "instagram",
    predictedReach: 18500,
    predictedEngagement: 1480,
    predictedEngagementRate: 8.0,
    confidence: 92,
    factors: [
      { name: "Historical Performance", impact: "high", value: "+20%" },
      { name: "Timing", impact: "high", value: "+15%" },
      { name: "Content Type", impact: "high", value: "+18%" },
      { name: "Video Performance", impact: "high", value: "+22%" },
    ],
    forecastDate: new Date(Date.now() + 1000 * 60 * 60 * 72).toISOString(),
  },
];

export const forecastAccuracy = {
  overall: 87.5,
  byPlatform: [
    { platform: "farcaster", accuracy: 89.2 },
    { platform: "x", accuracy: 85.7 },
    { platform: "instagram", accuracy: 91.3 },
    { platform: "lens", accuracy: 83.4 },
    { platform: "mirror", accuracy: 88.1 },
  ],
  byContentType: [
    { type: "video", accuracy: 92.1 },
    { type: "image", accuracy: 86.5 },
    { type: "text", accuracy: 84.2 },
    { type: "carousel", accuracy: 88.9 },
  ],
};

export const forecastTrends = [
  {
    period: "Last 7 days",
    avgPredictedReach: 12500,
    avgActualReach: 12800,
    variance: 2.4,
    avgPredictedEngagement: 890,
    avgActualEngagement: 910,
    varianceEngagement: 2.2,
  },
  {
    period: "Last 30 days",
    avgPredictedReach: 11800,
    avgActualReach: 12100,
    variance: 2.5,
    avgPredictedEngagement: 850,
    avgActualEngagement: 870,
    varianceEngagement: 2.4,
  },
];

export const forecastRecommendations = [
  {
    id: "rec-1",
    type: "timing",
    contentId: "content-1",
    recommendation: "Post at 2:00 PM EST for 15% higher engagement",
    impact: "high",
    confidence: 88,
  },
  {
    id: "rec-2",
    type: "hashtags",
    contentId: "content-2",
    recommendation: "Add 3 trending hashtags to increase reach by 12%",
    impact: "medium",
    confidence: 75,
  },
  {
    id: "rec-3",
    type: "format",
    contentId: "content-3",
    recommendation: "Convert to video format for 25% higher engagement",
    impact: "high",
    confidence: 92,
  },
];


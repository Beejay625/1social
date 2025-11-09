export interface PerformancePrediction {
  id: string;
  content: string;
  platform: string;
  predictedEngagement: number;
  predictedReach: number;
  predictedClicks: number;
  confidence: number;
  bestTimeToPost: string;
  recommendations: string[];
  riskFactors: string[];
}

export interface PredictionAccuracy {
  metric: string;
  accuracy: number;
  trend: "improving" | "stable" | "declining";
}

export const performancePredictions: PerformancePrediction[] = [
  {
    id: "pred-1",
    content: "New product launch announcement with exciting features",
    platform: "farcaster",
    predictedEngagement: 1500,
    predictedReach: 15000,
    predictedClicks: 450,
    confidence: 92,
    bestTimeToPost: "Tuesday, 2 PM",
    recommendations: [
      "Add more visual elements",
      "Include a call-to-action",
      "Post during peak engagement hours",
    ],
    riskFactors: ["Low historical engagement for similar content"],
  },
  {
    id: "pred-2",
    content: "Educational thread about Web3 trends",
    platform: "x",
    predictedEngagement: 2400,
    predictedReach: 25000,
    predictedClicks: 680,
    confidence: 88,
    bestTimeToPost: "Thursday, 10 AM",
    recommendations: ["Use thread format", "Include statistics"],
    riskFactors: [],
  },
];

export const predictionAccuracy: PredictionAccuracy[] = [
  {
    metric: "Engagement",
    accuracy: 88,
    trend: "improving",
  },
  {
    metric: "Reach",
    accuracy: 85,
    trend: "stable",
  },
  {
    metric: "Clicks",
    accuracy: 82,
    trend: "improving",
  },
];

export const predictorStats = {
  totalPredictions: 245,
  avgConfidence: 87.5,
  avgAccuracy: 85,
  predictionsToday: 12,
  topPerformingPrediction: "Educational thread about Web3 trends",
};


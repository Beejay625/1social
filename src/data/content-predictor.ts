export interface ContentPrediction {
  id: string;
  contentId: string;
  contentTitle: string;
  predictedMetrics: {
    reach: number;
    engagement: number;
    engagementRate: number;
    clicks: number;
    conversions: number;
  };
  confidence: number;
  factors: PredictionFactor[];
  recommendedActions: string[];
  predictedAt: string;
}

export interface PredictionFactor {
  factor: string;
  impact: "positive" | "negative" | "neutral";
  weight: number;
  description: string;
}

export const contentPredictions: ContentPrediction[] = [
  {
    id: "pred-1",
    contentId: "post-1",
    contentTitle: "Product Launch Announcement",
    predictedMetrics: {
      reach: 12500,
      engagement: 890,
      engagementRate: 7.1,
      clicks: 234,
      conversions: 12,
    },
    confidence: 87,
    factors: [
      {
        factor: "Posting Time",
        impact: "positive",
        weight: 0.25,
        description: "Optimal posting time for target audience",
      },
      {
        factor: "Hashtag Performance",
        impact: "positive",
        weight: 0.20,
        description: "High-performing hashtags included",
      },
      {
        factor: "Content Type",
        impact: "positive",
        weight: 0.15,
        description: "Announcement posts perform well",
      },
    ],
    recommendedActions: [
      "Post during peak hours (2-4 PM)",
      "Include trending hashtags",
      "Add call-to-action",
    ],
    predictedAt: new Date(Date.now() - 3600000).toISOString(),
  },
];

export const predictionStats = {
  totalPredictions: 234,
  avgConfidence: 82.5,
  accuracy: 85.3,
  predictionsToday: 12,
};

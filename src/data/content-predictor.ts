export interface ContentPrediction {
  id: string;
  content: string;
  predictedEngagement: number;
  predictedReach: number;
  predictedClicks: number;
  confidence: number;
  recommendations: string[];
  bestTimeToPost: string;
  bestChannels: string[];
}

export const contentPredictions: ContentPrediction[] = [
  {
    id: "pred-1",
    content: "🎉 Introducing our new feature! Check it out...",
    predictedEngagement: 1240,
    predictedReach: 12500,
    predictedClicks: 340,
    confidence: 87,
    recommendations: [
      "Add a call-to-action for better click-through",
      "Post on Tuesday 2 PM for maximum engagement",
      "Use 3-5 relevant hashtags",
    ],
    bestTimeToPost: "Tuesday, 2:00 PM",
    bestChannels: ["farcaster", "instagram", "x"],
  },
  {
    id: "pred-2",
    content: "Behind the scenes: How we build products...",
    predictedEngagement: 890,
    predictedReach: 8900,
    predictedClicks: 210,
    confidence: 75,
    recommendations: [
      "Consider adding a video for higher engagement",
      "Post on Thursday 10 AM",
      "Use storytelling format",
    ],
    bestTimeToPost: "Thursday, 10:00 AM",
    bestChannels: ["instagram", "farcaster"],
  },
  {
    id: "pred-3",
    content: "Quick tip: Use this trick to improve your workflow",
    predictedEngagement: 1560,
    predictedReach: 15600,
    predictedClicks: 520,
    confidence: 92,
    recommendations: [
      "This format performs well for your audience",
      "Post on Monday 1 PM",
      "Consider creating a carousel with more tips",
    ],
    bestTimeToPost: "Monday, 1:00 PM",
    bestChannels: ["x", "farcaster", "lens"],
  },
];

export const predictionAccuracy = {
  engagement: 89,
  reach: 85,
  clicks: 82,
  overall: 85,
};

export const predictionHistory = [
  {
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    predicted: 1200,
    actual: 1180,
    accuracy: 98,
  },
  {
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    predicted: 890,
    actual: 920,
    accuracy: 97,
  },
  {
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    predicted: 1560,
    actual: 1620,
    accuracy: 96,
  },
];


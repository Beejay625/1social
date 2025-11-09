export interface SentimentData {
  platform: string;
  overall: {
    positive: number;
    neutral: number;
    negative: number;
    score: number;
  };
  trend: "improving" | "stable" | "declining";
  recentMentions: SentimentMention[];
}

export interface SentimentMention {
  id: string;
  content: string;
  platform: string;
  sentiment: "positive" | "neutral" | "negative";
  confidence: number;
  author: string;
  timestamp: string;
  url?: string;
}

export const sentimentData: SentimentData[] = [
  {
    platform: "farcaster",
    overall: {
      positive: 68,
      neutral: 25,
      negative: 7,
      score: 0.61,
    },
    trend: "improving",
    recentMentions: [
      {
        id: "mention-1",
        content: "Love the new features! Great work team!",
        platform: "farcaster",
        sentiment: "positive",
        confidence: 0.95,
        author: "@user123",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: "mention-2",
        content: "The interface could be improved",
        platform: "farcaster",
        sentiment: "neutral",
        confidence: 0.78,
        author: "@user456",
        timestamp: new Date(Date.now() - 7200000).toISOString(),
      },
    ],
  },
  {
    platform: "instagram",
    overall: {
      positive: 72,
      neutral: 20,
      negative: 8,
      score: 0.64,
    },
    trend: "stable",
    recentMentions: [
      {
        id: "mention-3",
        content: "Amazing product! Highly recommend!",
        platform: "instagram",
        sentiment: "positive",
        confidence: 0.92,
        author: "@influencer1",
        timestamp: new Date(Date.now() - 1800000).toISOString(),
      },
    ],
  },
];

export const sentimentStats = {
  overallScore: 0.625,
  totalMentions: 1245,
  positiveMentions: 870,
  negativeMentions: 87,
  avgConfidence: 0.87,
  trend: "improving",
};


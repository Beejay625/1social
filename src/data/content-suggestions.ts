export interface ContentSuggestion {
  id: string;
  type: "trending-topic" | "hashtag" | "format" | "timing" | "audience";
  title: string;
  description: string;
  confidence: number;
  impact: "high" | "medium" | "low";
  suggestedContent?: string;
  relatedTrends?: string[];
  recommendedChannels?: string[];
  estimatedReach?: number;
  estimatedEngagement?: number;
  createdAt: string;
}

export interface TrendBasedSuggestion extends ContentSuggestion {
  trendData: {
    trendName: string;
    growthRate: number;
    currentVolume: number;
    relatedHashtags: string[];
    topPerformers: string[];
  };
}

export const contentSuggestions: ContentSuggestion[] = [
  {
    id: "suggestion-1",
    type: "trending-topic",
    title: "AI Innovation Trending",
    description: "AI innovation topics are trending with 250% growth. Create content around AI tools and automation.",
    confidence: 92,
    impact: "high",
    suggestedContent: "Share insights on AI-powered social media tools and automation features",
    relatedTrends: ["#AI", "#Automation", "#Innovation"],
    recommendedChannels: ["farcaster", "x"],
    estimatedReach: 45000,
    estimatedEngagement: 3200,
    createdAt: new Date().toISOString(),
  },
  {
    id: "suggestion-2",
    type: "hashtag",
    title: "High-Performing Hashtag Opportunity",
    description: "#Web3Builders is performing 3x better than your average hashtags",
    confidence: 88,
    impact: "high",
    suggestedContent: "Include #Web3Builders in your next 3 posts",
    relatedTrends: ["#Web3", "#Builders", "#Crypto"],
    recommendedChannels: ["farcaster", "lens"],
    estimatedReach: 38000,
    estimatedEngagement: 2800,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "suggestion-3",
    type: "timing",
    title: "Optimal Posting Time",
    description: "Your audience is 40% more active on Tuesdays at 2 PM",
    confidence: 85,
    impact: "medium",
    suggestedContent: "Schedule important announcements for Tuesday afternoons",
    recommendedChannels: ["instagram", "farcaster"],
    estimatedReach: 52000,
    estimatedEngagement: 4100,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "suggestion-4",
    type: "format",
    title: "Video Content Opportunity",
    description: "Video posts perform 2.5x better than images in your niche",
    confidence: 90,
    impact: "high",
    suggestedContent: "Convert your top 5 image posts to video format",
    recommendedChannels: ["instagram", "farcaster"],
    estimatedReach: 67000,
    estimatedEngagement: 5400,
    createdAt: new Date(Date.now() - 10800000).toISOString(),
  },
];

export const suggestionCategories = {
  trending: contentSuggestions.filter((s) => s.type === "trending-topic"),
  hashtags: contentSuggestions.filter((s) => s.type === "hashtag"),
  timing: contentSuggestions.filter((s) => s.type === "timing"),
  format: contentSuggestions.filter((s) => s.type === "format"),
};


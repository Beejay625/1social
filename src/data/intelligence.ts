import type {
  ChannelId,
  ContentHashtag,
  ContentRecommendation,
  IntelligenceAnomaly,
  IntelligenceForecast,
} from "@/types/publishing";

export const intelligenceForecasts: IntelligenceForecast[] = [
  {
    id: "forecast-1",
    metric: "Reach velocity",
    current: "18%",
    predicted: "+24%",
    timeframe: "Next 7 days",
    confidence: 0.87,
    factors: ["Seasonal uptick", "Scheduled AMA", "Creator spotlight"],
  },
  {
    id: "forecast-2",
    metric: "Engagement rate",
    current: "26%",
    predicted: "+31%",
    timeframe: "Next 14 days",
    confidence: 0.72,
    factors: ["Content mix shift", "Best-time optimization"],
  },
  {
    id: "forecast-3",
    metric: "Follower growth",
    current: "+12%",
    predicted: "+18%",
    timeframe: "Next 30 days",
    confidence: 0.91,
    factors: ["Viral potential", "Cross-channel sync"],
  },
];

export const intelligenceAnomalies: IntelligenceAnomaly[] = [
  {
    id: "anomaly-1",
    type: "Spike",
    channel: "farcaster",
    metric: "Reach",
    deviation: "+142%",
    detectedAt: "2 hours ago",
    explanation: "Unusual engagement spike on AMA announcement—likely viral momentum.",
  },
  {
    id: "anomaly-2",
    type: "Dip",
    channel: "instagram",
    metric: "Saves",
    deviation: "-38%",
    detectedAt: "5 hours ago",
    explanation: "Save rate dropped below threshold—check content format changes.",
  },
];

export const contentHashtags: ContentHashtag[] = [
  { tag: "#web3", trend: "up", usage: 1240, growth: "+18%" },
  { tag: "#buildinpublic", trend: "up", usage: 890, growth: "+12%" },
  { tag: "#creator", trend: "stable", usage: 650, growth: "+3%" },
  { tag: "#nft", trend: "down", usage: 420, growth: "-8%" },
];

export const contentRecommendations: ContentRecommendation[] = [
  {
    id: "rec-1",
    type: "Format",
    suggestion: "Try carousel posts—your carousel content performs 34% better than single images.",
    impact: "High",
  },
  {
    id: "rec-2",
    type: "Timing",
    suggestion: "Shift Instagram posts to 18:00 UTC—your audience is 2.3x more active then.",
    impact: "Medium",
  },
  {
    id: "rec-3",
    type: "Topic",
    suggestion: "Double down on 'community wins' content—it drives 28% more saves.",
    impact: "High",
  },
];


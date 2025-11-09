export interface Trend {
  id: string;
  keyword: string;
  category: string;
  volume: number;
  growth: number;
  sentiment: "positive" | "negative" | "neutral";
  platforms: string[];
  relatedTrends: string[];
  firstSeen: string;
}

export interface TrendAlert {
  id: string;
  keyword: string;
  type: "spike" | "decline" | "emerging";
  severity: "high" | "medium" | "low";
  change: number;
  detectedAt: string;
  description: string;
}

export const trends: Trend[] = [
  {
    id: "trend-1",
    keyword: "#Web3Creator",
    category: "Technology",
    volume: 15200,
    growth: 18.5,
    sentiment: "positive",
    platforms: ["farcaster", "x", "lens"],
    relatedTrends: ["#decentralized", "#creator"],
    firstSeen: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: "trend-2",
    keyword: "AI Content Tools",
    category: "Marketing",
    volume: 8900,
    growth: 12.3,
    sentiment: "positive",
    platforms: ["x", "linkedin"],
    relatedTrends: ["#AI", "#content"],
    firstSeen: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
];

export const trendAlerts: TrendAlert[] = [
  {
    id: "alert-1",
    keyword: "#Web3Creator",
    type: "spike",
    severity: "high",
    change: 45.2,
    detectedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    description: "Sudden spike in mentions - 45% increase in 2 hours",
  },
  {
    id: "alert-2",
    keyword: "AI Content Tools",
    type: "emerging",
    severity: "medium",
    change: 28.5,
    detectedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    description: "New emerging trend detected",
  },
];

export const trendStats = {
  activeTrends: 15,
  trendingKeywords: 8,
  avgGrowth: 15.2,
  topTrend: "#Web3Creator",
  alertsToday: 5,
};


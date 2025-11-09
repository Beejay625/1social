export interface BrandSafetyAlert {
  id: string;
  type: "negative-sentiment" | "competitor-mention" | "crisis" | "reputation-risk";
  severity: "low" | "medium" | "high" | "critical";
  title: string;
  description: string;
  platform: string;
  detectedAt: string;
  status: "new" | "investigating" | "resolved" | "false-positive";
  url?: string;
}

export interface BrandSafetyScore {
  overall: number;
  sentiment: number;
  mentions: number;
  engagement: number;
  reputation: number;
  trend: "improving" | "stable" | "declining";
}

export const brandSafetyAlerts: BrandSafetyAlert[] = [
  {
    id: "alert-1",
    type: "negative-sentiment",
    severity: "medium",
    title: "Negative Sentiment Spike",
    description: "Negative mentions increased by 45% in the last 24 hours",
    platform: "x",
    detectedAt: new Date(Date.now() - 7200000).toISOString(),
    status: "investigating",
    url: "https://x.com/...",
  },
  {
    id: "alert-2",
    type: "competitor-mention",
    severity: "low",
    title: "Competitor Comparison",
    description: "Multiple mentions comparing brand to competitor",
    platform: "farcaster",
    detectedAt: new Date(Date.now() - 3600000).toISOString(),
    status: "new",
  },
  {
    id: "alert-3",
    type: "reputation-risk",
    severity: "high",
    title: "Potential Reputation Risk",
    description: "Negative review gaining traction",
    platform: "instagram",
    detectedAt: new Date(Date.now() - 1800000).toISOString(),
    status: "investigating",
  },
];

export const brandSafetyScore: BrandSafetyScore = {
  overall: 85,
  sentiment: 82,
  mentions: 88,
  engagement: 87,
  reputation: 83,
  trend: "stable",
};

export const brandSafetyTrends = [
  { date: "2024-01-01", score: 88 },
  { date: "2024-01-08", score: 87 },
  { date: "2024-01-15", score: 86 },
  { date: "2024-01-22", score: 85 },
  { date: "2024-01-29", score: 85 },
  { date: "2024-02-05", score: 85 },
  { date: "2024-02-12", score: 85 },
];


export interface AccountHealthMetric {
  platform: string;
  accountId: string;
  accountName: string;
  healthScore: number;
  status: "healthy" | "warning" | "critical";
  metrics: {
    engagementRate: number;
    postingFrequency: number;
    responseTime: number;
    contentQuality: number;
    audienceGrowth: number;
  };
  issues: AccountHealthIssue[];
  lastChecked: string;
}

export interface AccountHealthIssue {
  id: string;
  type: "low-engagement" | "inactive" | "spam-risk" | "api-error" | "rate-limit";
  severity: "warning" | "critical";
  message: string;
  detectedAt: string;
  resolvedAt?: string;
}

export const accountHealthMetrics: AccountHealthMetric[] = [
  {
    platform: "farcaster",
    accountId: "farcaster-1",
    accountName: "@builders",
    healthScore: 92,
    status: "healthy",
    metrics: {
      engagementRate: 8.5,
      postingFrequency: 12,
      responseTime: 2.3,
      contentQuality: 9.1,
      audienceGrowth: 4.2,
    },
    issues: [],
    lastChecked: new Date().toISOString(),
  },
  {
    platform: "instagram",
    accountId: "instagram-1",
    accountName: "@creators",
    healthScore: 78,
    status: "warning",
    metrics: {
      engagementRate: 5.2,
      postingFrequency: 8,
      responseTime: 4.1,
      contentQuality: 7.8,
      audienceGrowth: 2.1,
    },
    issues: [
      {
        id: "issue-1",
        type: "low-engagement",
        severity: "warning",
        message: "Engagement rate dropped 15% in last 7 days",
        detectedAt: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: "issue-2",
        type: "response-time",
        severity: "warning",
        message: "Average response time increased to 4.1 hours",
        detectedAt: new Date(Date.now() - 172800000).toISOString(),
      },
    ],
    lastChecked: new Date().toISOString(),
  },
  {
    platform: "x",
    accountId: "x-1",
    accountName: "@innovators",
    healthScore: 65,
    status: "critical",
    metrics: {
      engagementRate: 3.1,
      postingFrequency: 2,
      responseTime: 8.5,
      contentQuality: 6.2,
      audienceGrowth: -1.2,
    },
    issues: [
      {
        id: "issue-3",
        type: "inactive",
        severity: "critical",
        message: "Only 2 posts in last 7 days - below recommended minimum",
        detectedAt: new Date(Date.now() - 259200000).toISOString(),
      },
      {
        id: "issue-4",
        type: "low-engagement",
        severity: "critical",
        message: "Engagement rate critically low at 3.1%",
        detectedAt: new Date(Date.now() - 345600000).toISOString(),
      },
    ],
    lastChecked: new Date().toISOString(),
  },
];

export const healthTrends = [
  { date: "2024-01-01", score: 85 },
  { date: "2024-01-08", score: 87 },
  { date: "2024-01-15", score: 89 },
  { date: "2024-01-22", score: 88 },
  { date: "2024-01-29", score: 86 },
  { date: "2024-02-05", score: 84 },
  { date: "2024-02-12", score: 82 },
];


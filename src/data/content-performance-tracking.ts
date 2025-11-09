export interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  change: number;
  trend: "up" | "down" | "stable";
  period: "daily" | "weekly" | "monthly";
}

export interface TopPerformingContent {
  id: string;
  title: string;
  platform: string;
  publishedAt: string;
  metrics: {
    reach: number;
    engagement: number;
    engagementRate: number;
    clicks: number;
    conversions: number;
  };
  performanceScore: number;
}

export const performanceMetrics: PerformanceMetric[] = [
  {
    id: "metric-1",
    name: "Total Reach",
    value: 125000,
    change: 12.5,
    trend: "up",
    period: "weekly",
  },
  {
    id: "metric-2",
    name: "Engagement Rate",
    value: 8.5,
    change: 2.3,
    trend: "up",
    period: "weekly",
  },
  {
    id: "metric-3",
    name: "Click-Through Rate",
    value: 4.2,
    change: -0.8,
    trend: "down",
    period: "weekly",
  },
  {
    id: "metric-4",
    name: "Conversion Rate",
    value: 3.1,
    change: 0.5,
    trend: "up",
    period: "weekly",
  },
];

export const topPerformingContent: TopPerformingContent[] = [
  {
    id: "content-1",
    title: "Product Launch Announcement",
    platform: "farcaster",
    publishedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    metrics: {
      reach: 45000,
      engagement: 3200,
      engagementRate: 7.1,
      clicks: 890,
      conversions: 45,
    },
    performanceScore: 92,
  },
  {
    id: "content-2",
    title: "Weekly Community Update",
    platform: "instagram",
    publishedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    metrics: {
      reach: 38000,
      engagement: 2800,
      engagementRate: 7.4,
      clicks: 650,
      conversions: 32,
    },
    performanceScore: 88,
  },
  {
    id: "content-3",
    title: "Tutorial: Getting Started Guide",
    platform: "x",
    publishedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    metrics: {
      reach: 32000,
      engagement: 2400,
      engagementRate: 7.5,
      clicks: 720,
      conversions: 28,
    },
    performanceScore: 85,
  },
];

export const performanceTrackingStats = {
  totalContent: 156,
  avgEngagementRate: 7.8,
  topPerformingPlatform: "farcaster",
  bestPerformingDay: "Tuesday",
  bestPerformingTime: "2 PM",
};


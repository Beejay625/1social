export interface HealthMetric {
  platform: string;
  score: number;
  status: "healthy" | "warning" | "critical";
  issues: string[];
}

export interface HealthTrend {
  date: string;
  score: number;
  issues: number;
}

export const accountHealthMetrics: HealthMetric[] = [
  {
    platform: "farcaster",
    score: 95,
    status: "healthy",
    issues: [],
  },
  {
    platform: "instagram",
    score: 78,
    status: "warning",
    issues: ["Token expiring soon", "Low engagement rate"],
  },
  {
    platform: "x",
    score: 88,
    status: "healthy",
    issues: ["Rate limit approaching"],
  },
];

export const healthTrends: HealthTrend[] = [
  {
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
    score: 85,
    issues: 2,
  },
  {
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    score: 87,
    issues: 1,
  },
  {
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
    score: 89,
    issues: 1,
  },
  {
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    score: 91,
    issues: 0,
  },
  {
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    score: 90,
    issues: 1,
  },
  {
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    score: 92,
    issues: 0,
  },
];

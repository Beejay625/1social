export interface PerformanceAlert {
  id: string;
  metric: string;
  threshold: number;
  current: number;
  trend: "up" | "down";
  severity: "critical" | "warning" | "info";
  timestamp: string;
  resolved: boolean;
}

export const performanceAlerts: PerformanceAlert[] = [
  {
    id: "alert-1",
    metric: "Engagement Rate",
    threshold: 5,
    current: 2.3,
    trend: "down",
    severity: "warning",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
    resolved: false,
  },
  {
    id: "alert-2",
    metric: "Response Time",
    threshold: 2,
    current: 4.5,
    trend: "up",
    severity: "critical",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    resolved: false,
  },
  {
    id: "alert-3",
    metric: "Follower Growth",
    threshold: 100,
    current: 250,
    trend: "up",
    severity: "info",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    resolved: true,
  },
];

export const alertStats = {
  activeAlerts: 2,
  resolvedToday: 5,
  avgResolutionTime: "18 minutes",
  mostCommonMetric: "Engagement Rate",
};

export interface PerformanceAlert {
  id: string;
  postId: string;
  postTitle: string;
  type: "overperformance" | "underperformance" | "anomaly" | "trend";
  severity: "info" | "warning" | "critical";
  metric: string;
  currentValue: number;
  expectedValue: number;
  deviation: number;
  message: string;
  recommendation: string;
  detectedAt: string;
  acknowledged: boolean;
  actionTaken?: string;
}

export interface AlertRule {
  id: string;
  name: string;
  enabled: boolean;
  metric: string;
  condition: "above" | "below" | "deviation";
  threshold: number;
  channels: string[];
  notificationChannels: ("email" | "push" | "in-app")[];
}

export const performanceAlerts: PerformanceAlert[] = [
  {
    id: "alert-1",
    postId: "post-1",
    postTitle: "AI Features Launch",
    type: "overperformance",
    severity: "info",
    metric: "engagement_rate",
    currentValue: 12.5,
    expectedValue: 5.0,
    deviation: 150,
    message: "Post is performing 150% above expected engagement rate",
    recommendation: "Consider boosting this post or creating similar content",
    detectedAt: new Date(Date.now() - 3600000).toISOString(),
    acknowledged: false,
  },
  {
    id: "alert-2",
    postId: "post-2",
    postTitle: "Weekly Update",
    type: "underperformance",
    severity: "warning",
    metric: "reach",
    currentValue: 1200,
    expectedValue: 5000,
    deviation: -76,
    message: "Post reach is 76% below expected. May need optimization.",
    recommendation: "Review posting time, hashtags, or content format",
    detectedAt: new Date(Date.now() - 7200000).toISOString(),
    acknowledged: false,
  },
  {
    id: "alert-3",
    postId: "post-3",
    postTitle: "Product Announcement",
    type: "anomaly",
    severity: "critical",
    metric: "click_through_rate",
    currentValue: 0.2,
    expectedValue: 3.5,
    deviation: -94,
    message: "Click-through rate is critically low - possible link issue",
    recommendation: "Check link functionality and consider A/B testing different CTAs",
    detectedAt: new Date(Date.now() - 10800000).toISOString(),
    acknowledged: true,
    actionTaken: "Link verified, testing new CTA",
  },
  {
    id: "alert-4",
    postId: "post-4",
    postTitle: "Community Spotlight",
    type: "trend",
    severity: "info",
    metric: "comments",
    currentValue: 45,
    expectedValue: 20,
    deviation: 125,
    message: "Unusually high comment volume detected",
    recommendation: "Engage with comments to maintain momentum",
    detectedAt: new Date(Date.now() - 14400000).toISOString(),
    acknowledged: false,
  },
];

export const alertRules: AlertRule[] = [
  {
    id: "rule-1",
    name: "High Engagement Alert",
    enabled: true,
    metric: "engagement_rate",
    condition: "above",
    threshold: 200,
    channels: ["farcaster", "instagram", "x"],
    notificationChannels: ["push", "in-app"],
  },
  {
    id: "rule-2",
    name: "Low Reach Warning",
    enabled: true,
    metric: "reach",
    condition: "below",
    threshold: 50,
    channels: ["instagram", "x"],
    notificationChannels: ["email", "in-app"],
  },
  {
    id: "rule-3",
    name: "Anomaly Detection",
    enabled: true,
    metric: "click_through_rate",
    condition: "deviation",
    threshold: 80,
    channels: ["farcaster", "instagram", "x", "lens"],
    notificationChannels: ["push", "email", "in-app"],
  },
];

export const alertStats = {
  total: performanceAlerts.length,
  unacknowledged: performanceAlerts.filter((a) => !a.acknowledged).length,
  bySeverity: {
    critical: performanceAlerts.filter((a) => a.severity === "critical").length,
    warning: performanceAlerts.filter((a) => a.severity === "warning").length,
    info: performanceAlerts.filter((a) => a.severity === "info").length,
  },
  byType: {
    overperformance: performanceAlerts.filter((a) => a.type === "overperformance").length,
    underperformance: performanceAlerts.filter((a) => a.type === "underperformance").length,
    anomaly: performanceAlerts.filter((a) => a.type === "anomaly").length,
    trend: performanceAlerts.filter((a) => a.type === "trend").length,
  },
};


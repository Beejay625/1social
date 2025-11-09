export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  metrics: string[];
  frequency: "daily" | "weekly" | "monthly" | "custom";
  recipients: string[];
}

export interface CustomMetric {
  id: string;
  name: string;
  formula: string;
  description: string;
}

export const reportTemplates: ReportTemplate[] = [
  {
    id: "template-1",
    name: "Executive Summary",
    description: "High-level overview for leadership",
    category: "executive",
    metrics: [
      "Total reach",
      "Engagement rate",
      "Follower growth",
      "Top performing content",
      "ROI",
    ],
    frequency: "weekly",
    recipients: ["executives@company.com"],
  },
  {
    id: "template-2",
    name: "Content Performance",
    description: "Detailed content analytics",
    category: "content",
    metrics: [
      "Post performance",
      "Content type breakdown",
      "Best posting times",
      "Hashtag performance",
      "Engagement trends",
    ],
    frequency: "weekly",
    recipients: ["content-team@company.com"],
  },
  {
    id: "template-3",
    name: "Campaign Report",
    description: "Campaign-specific metrics",
    category: "campaigns",
    metrics: [
      "Campaign reach",
      "Engagement",
      "Conversions",
      "Budget spent",
      "ROI",
    ],
    frequency: "custom",
    recipients: ["marketing@company.com"],
  },
];

export const customMetrics: CustomMetric[] = [
  {
    id: "metric-1",
    name: "Engagement per Follower",
    formula: "(likes + comments + shares) / followers",
    description: "Average engagement per follower",
  },
  {
    id: "metric-2",
    name: "Content Efficiency Score",
    formula: "(engagement_rate * reach) / time_spent",
    description: "Content performance efficiency",
  },
  {
    id: "metric-3",
    name: "Brand Mention Velocity",
    formula: "mentions / time_period",
    description: "Rate of brand mentions over time",
  },
];

export const reportSchedules = [
  {
    id: "schedule-1",
    reportId: "template-1",
    frequency: "weekly",
    day: "Monday",
    time: "09:00",
    timezone: "UTC",
    enabled: true,
  },
  {
    id: "schedule-2",
    reportId: "template-2",
    frequency: "weekly",
    day: "Friday",
    time: "17:00",
    timezone: "UTC",
    enabled: true,
  },
];

export const reportHistory = [
  {
    id: "report-1",
    templateId: "template-1",
    generatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    status: "sent",
    recipients: 3,
  },
  {
    id: "report-2",
    templateId: "template-2",
    generatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    status: "sent",
    recipients: 5,
  },
];


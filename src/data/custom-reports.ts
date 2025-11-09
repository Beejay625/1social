export interface CustomReport {
  id: string;
  name: string;
  description: string;
  metrics: ReportMetric[];
  filters: ReportFilter;
  schedule?: {
    frequency: "daily" | "weekly" | "monthly";
    recipients: string[];
    format: "pdf" | "csv" | "excel";
  };
  lastGenerated?: string;
  usageCount: number;
}

export interface ReportMetric {
  id: string;
  name: string;
  formula?: string;
  type: "standard" | "custom";
  aggregation: "sum" | "avg" | "max" | "min" | "count";
}

export interface ReportFilter {
  dateRange: {
    start: string;
    end: string;
  };
  platforms?: string[];
  contentTypes?: string[];
  tags?: string[];
}

export const customReports: CustomReport[] = [
  {
    id: "report-1",
    name: "Executive Summary",
    description: "High-level metrics for executive review",
    metrics: [
      {
        id: "m1",
        name: "Total Reach",
        type: "standard",
        aggregation: "sum",
      },
      {
        id: "m2",
        name: "Engagement Rate",
        type: "standard",
        aggregation: "avg",
      },
      {
        id: "m3",
        name: "ROI",
        type: "custom",
        formula: "(Revenue - Cost) / Cost * 100",
        aggregation: "avg",
      },
    ],
    filters: {
      dateRange: {
        start: new Date(Date.now() - 2592000000).toISOString(),
        end: new Date().toISOString(),
      },
      platforms: ["farcaster", "instagram", "x"],
    },
    schedule: {
      frequency: "weekly",
      recipients: ["exec@company.com"],
      format: "pdf",
    },
    lastGenerated: new Date(Date.now() - 86400000 * 2).toISOString(),
    usageCount: 24,
  },
  {
    id: "report-2",
    name: "Content Performance Analysis",
    description: "Detailed content performance metrics",
    metrics: [
      {
        id: "m4",
        name: "Top Performing Content",
        type: "standard",
        aggregation: "max",
      },
      {
        id: "m5",
        name: "Avg Engagement per Post",
        type: "custom",
        formula: "Total Engagement / Post Count",
        aggregation: "avg",
      },
    ],
    filters: {
      dateRange: {
        start: new Date(Date.now() - 604800000).toISOString(),
        end: new Date().toISOString(),
      },
    },
    usageCount: 12,
  },
];

export const reportStats = {
  totalReports: 8,
  scheduledReports: 3,
  customMetrics: 15,
  avgGenerationTime: "2.3 seconds",
};


export interface ExportJob {
  id: string;
  name: string;
  type: "analytics" | "content" | "engagement" | "reports";
  format: "pdf" | "csv" | "excel" | "json";
  status: "pending" | "processing" | "completed" | "failed";
  createdAt: string;
  completedAt?: string;
  fileSize?: string;
  downloadUrl?: string;
  filters?: {
    dateRange: string;
    platforms: string[];
    metrics: string[];
  };
}

export interface ExportTemplate {
  id: string;
  name: string;
  description: string;
  type: string;
  format: string;
  metrics: string[];
  usageCount: number;
}

export const exportJobs: ExportJob[] = [
  {
    id: "export-1",
    name: "Q1 Analytics Report",
    type: "analytics",
    format: "pdf",
    status: "completed",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    completedAt: new Date(Date.now() - 82800000).toISOString(),
    fileSize: "2.4 MB",
    downloadUrl: "/exports/q1-analytics.pdf",
    filters: {
      dateRange: "Jan 1 - Mar 31, 2024",
      platforms: ["farcaster", "instagram", "x"],
      metrics: ["reach", "engagement", "conversions"],
    },
  },
  {
    id: "export-2",
    name: "Content Performance Data",
    type: "content",
    format: "csv",
    status: "processing",
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    filters: {
      dateRange: "Last 30 days",
      platforms: ["all"],
      metrics: ["impressions", "clicks", "engagement"],
    },
  },
  {
    id: "export-3",
    name: "Engagement Metrics",
    type: "engagement",
    format: "excel",
    status: "pending",
    createdAt: new Date(Date.now() - 600000).toISOString(),
    filters: {
      dateRange: "Last 7 days",
      platforms: ["farcaster", "instagram"],
      metrics: ["likes", "comments", "shares"],
    },
  },
];

export const exportTemplates: ExportTemplate[] = [
  {
    id: "template-1",
    name: "Executive Summary",
    description: "High-level metrics for executive reporting",
    type: "analytics",
    format: "pdf",
    metrics: ["reach", "engagement", "conversions", "roi"],
    usageCount: 45,
  },
  {
    id: "template-2",
    name: "Detailed Analytics",
    description: "Comprehensive analytics export",
    type: "analytics",
    format: "excel",
    metrics: ["all"],
    usageCount: 89,
  },
];

export const exportStats = {
  totalExports: 156,
  exportsToday: 8,
  avgFileSize: "1.8 MB",
  mostUsedFormat: "pdf",
};


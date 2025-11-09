export interface ExportJob {
  id: string;
  name: string;
  type: "report" | "data" | "analytics";
  format: "pdf" | "csv" | "excel" | "json" | "png";
  status: "pending" | "processing" | "completed" | "failed";
  createdAt: string;
  completedAt?: string;
  downloadUrl?: string;
  size?: number;
  sizeFormatted?: string;
  filters?: {
    dateRange: { start: string; end: string };
    platforms?: string[];
    metrics?: string[];
  };
}

export interface ExportTemplate {
  id: string;
  name: string;
  description: string;
  type: "report" | "data" | "analytics";
  format: "pdf" | "csv" | "excel";
  includes: string[];
  usageCount: number;
  lastUsed?: string;
}

export const exportJobs: ExportJob[] = [
  {
    id: "export-1",
    name: "Monthly Performance Report",
    type: "report",
    format: "pdf",
    status: "completed",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    completedAt: new Date(Date.now() - 1800000).toISOString(),
    downloadUrl: "/exports/monthly-report-jan-2024.pdf",
    size: 2450000,
    sizeFormatted: "2.45 MB",
    filters: {
      dateRange: {
        start: new Date(Date.now() - 2592000000).toISOString(),
        end: new Date().toISOString(),
      },
      platforms: ["farcaster", "instagram", "x"],
      metrics: ["reach", "engagement", "conversions"],
    },
  },
  {
    id: "export-2",
    name: "Content Performance Data",
    type: "data",
    format: "csv",
    status: "completed",
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    completedAt: new Date(Date.now() - 5400000).toISOString(),
    downloadUrl: "/exports/content-performance.csv",
    size: 890000,
    sizeFormatted: "890 KB",
    filters: {
      dateRange: {
        start: new Date(Date.now() - 604800000).toISOString(),
        end: new Date().toISOString(),
      },
      platforms: ["all"],
    },
  },
  {
    id: "export-3",
    name: "Analytics Dashboard Export",
    type: "analytics",
    format: "png",
    status: "processing",
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    filters: {
      dateRange: {
        start: new Date(Date.now() - 86400000 * 7).toISOString(),
        end: new Date().toISOString(),
      },
    },
  },
];

export const exportTemplates: ExportTemplate[] = [
  {
    id: "template-1",
    name: "Monthly Performance Report",
    description: "Comprehensive monthly performance report with all key metrics",
    type: "report",
    format: "pdf",
    includes: ["Overview", "Platform Breakdown", "Top Content", "Engagement Analysis"],
    usageCount: 12,
    lastUsed: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: "template-2",
    name: "Content Performance CSV",
    description: "Export all content performance data in CSV format",
    type: "data",
    format: "csv",
    includes: ["Content ID", "Title", "Platform", "Metrics", "Performance Score"],
    usageCount: 28,
    lastUsed: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "template-3",
    name: "Analytics Dashboard",
    description: "Export analytics dashboard as image",
    type: "analytics",
    format: "png",
    includes: ["Charts", "Metrics", "Trends"],
    usageCount: 15,
    lastUsed: new Date(Date.now() - 86400000 * 7).toISOString(),
  },
];

export const exportStats = {
  totalExports: 156,
  exportsThisMonth: 23,
  avgExportSize: 1.8,
  avgExportSizeFormatted: "1.8 MB",
  mostUsedFormat: "pdf",
  mostUsedTemplate: "Monthly Performance Report",
};

export const analyticsReports = [
  {
    id: "report-1",
    name: "Monthly Performance Summary",
    type: "summary",
    generatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    period: "last_30_days",
    size: "2.4 MB",
  },
  {
    id: "report-2",
    name: "Channel Comparison Analysis",
    type: "comparison",
    generatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    period: "last_7_days",
    size: "1.8 MB",
  },
  {
    id: "report-3",
    name: "Audience Growth Report",
    type: "growth",
    generatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    period: "last_90_days",
    size: "3.2 MB",
  },
];

export const customMetrics = [
  {
    id: "metric-1",
    name: "Engagement Rate by Time",
    formula: "engagements / impressions * 100",
    category: "engagement",
    lastCalculated: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "metric-2",
    name: "ROI per Post",
    formula: "revenue / post_count",
    category: "revenue",
    lastCalculated: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: "metric-3",
    name: "Content Quality Score",
    formula: "(likes + shares) / views * 100",
    category: "quality",
    lastCalculated: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
];

export const dataExports = [
  {
    id: "export-1",
    name: "All Posts Data",
    format: "csv",
    status: "completed",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    size: "45 MB",
  },
  {
    id: "export-2",
    name: "Analytics Raw Data",
    format: "json",
    status: "processing",
    createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    size: null,
  },
];


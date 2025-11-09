export const customReports = [
  {
    id: "report-1",
    name: "Weekly Performance Summary",
    type: "performance",
    frequency: "weekly",
    lastGenerated: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    recipients: 5,
  },
  {
    id: "report-2",
    name: "Monthly Executive Dashboard",
    type: "executive",
    frequency: "monthly",
    lastGenerated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    recipients: 3,
  },
];

export const reportTemplates = [
  {
    id: "template-1",
    name: "Engagement Report",
    description: "Detailed engagement metrics",
    category: "analytics",
  },
  {
    id: "template-2",
    name: "ROI Report",
    description: "Return on investment analysis",
    category: "business",
  },
];

export const reportingStats = {
  totalReports: 24,
  scheduledReports: 8,
  avgGenerationTime: "45s",
};

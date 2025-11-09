export interface ROICalculation {
  id: string;
  campaignName: string;
  period: string;
  investment: {
    adSpend: number;
    contentCreation: number;
    tools: number;
    total: number;
  };
  returns: {
    revenue: number;
    leads: number;
    conversions: number;
    engagement: number;
  };
  roi: number;
  roas: number;
  paybackPeriod: string;
  createdAt: string;
}

export interface ROIMetric {
  label: string;
  value: number;
  format: "currency" | "percentage" | "number";
  trend: "up" | "down" | "stable";
}

export const roiCalculations: ROICalculation[] = [
  {
    id: "roi-1",
    campaignName: "Q1 Product Launch Campaign",
    period: "Jan - Mar 2024",
    investment: {
      adSpend: 5000,
      contentCreation: 2000,
      tools: 500,
      total: 7500,
    },
    returns: {
      revenue: 45000,
      leads: 234,
      conversions: 89,
      engagement: 12500,
    },
    roi: 500,
    roas: 6.0,
    paybackPeriod: "2 weeks",
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
  },
  {
    id: "roi-2",
    campaignName: "Social Media Engagement Drive",
    period: "Feb - Apr 2024",
    investment: {
      adSpend: 3000,
      contentCreation: 1500,
      tools: 500,
      total: 5000,
    },
    returns: {
      revenue: 28000,
      leads: 156,
      conversions: 45,
      engagement: 8900,
    },
    roi: 460,
    roas: 5.6,
    paybackPeriod: "3 weeks",
    createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
  },
];

export const roiMetrics: ROIMetric[] = [
  {
    label: "Total ROI",
    value: 480,
    format: "percentage",
    trend: "up",
  },
  {
    label: "Average ROAS",
    value: 5.8,
    format: "number",
    trend: "up",
  },
  {
    label: "Total Revenue",
    value: 73000,
    format: "currency",
    trend: "up",
  },
  {
    label: "Total Investment",
    value: 12500,
    format: "currency",
    trend: "stable",
  },
];

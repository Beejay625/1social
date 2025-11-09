export interface ROICalculation {
  id: string;
  campaign: string;
  platform: string;
  investment: number;
  revenue: number;
  roi: number;
  period: string;
  timestamp: string;
}

export interface ROIMetric {
  metric: string;
  value: number;
  change: number;
  trend: "up" | "down" | "stable";
}

export const roiCalculations: ROICalculation[] = [
  {
    id: "roi-1",
    campaign: "Q4 Product Launch",
    platform: "farcaster",
    investment: 5000,
    revenue: 25000,
    roi: 400,
    period: "30 days",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: "roi-2",
    campaign: "Holiday Promotion",
    platform: "instagram",
    investment: 8000,
    revenue: 45000,
    roi: 462.5,
    period: "45 days",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
  },
];

export const roiMetrics: ROIMetric[] = [
  {
    metric: "Average ROI",
    value: 431.25,
    change: 12.5,
    trend: "up",
  },
  {
    metric: "Total Revenue",
    value: 70000,
    change: 25.3,
    trend: "up",
  },
  {
    metric: "Total Investment",
    value: 13000,
    change: -5.2,
    trend: "down",
  },
];

export const roiStats = {
  totalROI: 431.25,
  totalRevenue: 70000,
  totalInvestment: 13000,
  bestPerformingCampaign: "Holiday Promotion",
  avgROI: 431.25,
};

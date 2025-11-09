export interface AnalyticsDashboard {
  id: string;
  name: string;
  description: string;
  widgets: DashboardWidget[];
  isDefault: boolean;
  createdAt: string;
  lastViewed: string;
  viewCount: number;
}

export interface DashboardWidget {
  id: string;
  type: "metric" | "chart" | "table" | "list";
  title: string;
  data: any;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface DashboardMetric {
  label: string;
  value: number;
  change: number;
  trend: "up" | "down" | "stable";
  format: "number" | "percentage" | "currency";
}

export const analyticsDashboards: AnalyticsDashboard[] = [
  {
    id: "dashboard-1",
    name: "Overview Dashboard",
    description: "Key metrics and performance overview",
    isDefault: true,
    widgets: [
      {
        id: "widget-1",
        type: "metric",
        title: "Total Reach",
        data: { value: 125000, change: 12.5, trend: "up" },
        position: { x: 0, y: 0, width: 3, height: 2 },
      },
      {
        id: "widget-2",
        type: "metric",
        title: "Engagement Rate",
        data: { value: 8.5, change: 2.3, trend: "up" },
        position: { x: 3, y: 0, width: 3, height: 2 },
      },
      {
        id: "widget-3",
        type: "chart",
        title: "Performance Over Time",
        data: {},
        position: { x: 0, y: 2, width: 6, height: 4 },
      },
    ],
    createdAt: new Date(Date.now() - 2592000000).toISOString(),
    lastViewed: new Date().toISOString(),
    viewCount: 234,
  },
  {
    id: "dashboard-2",
    name: "Campaign Performance",
    description: "Detailed campaign analytics and metrics",
    isDefault: false,
    widgets: [
      {
        id: "widget-4",
        type: "metric",
        title: "Campaign Reach",
        data: { value: 45000, change: -5.2, trend: "down" },
        position: { x: 0, y: 0, width: 4, height: 2 },
      },
      {
        id: "widget-5",
        type: "table",
        title: "Top Performing Posts",
        data: {},
        position: { x: 0, y: 2, width: 6, height: 4 },
      },
    ],
    createdAt: new Date(Date.now() - 1728000000).toISOString(),
    lastViewed: new Date(Date.now() - 86400000).toISOString(),
    viewCount: 89,
  },
];

export const dashboardMetrics: DashboardMetric[] = [
  {
    label: "Total Reach",
    value: 125000,
    change: 12.5,
    trend: "up",
    format: "number",
  },
  {
    label: "Engagement Rate",
    value: 8.5,
    change: 2.3,
    trend: "up",
    format: "percentage",
  },
  {
    label: "Total Engagement",
    value: 10625,
    change: 15.8,
    trend: "up",
    format: "number",
  },
  {
    label: "Conversion Rate",
    value: 3.2,
    change: -0.5,
    trend: "down",
    format: "percentage",
  },
];


export const performanceMetrics = [
  {
    id: "metric-1",
    name: "API Response Time",
    value: 145,
    unit: "ms",
    threshold: 200,
    status: "healthy",
    trend: "down",
    change: -12,
  },
  {
    id: "metric-2",
    name: "Database Query Time",
    value: 89,
    unit: "ms",
    threshold: 150,
    status: "healthy",
    trend: "down",
    change: -5,
  },
  {
    id: "metric-3",
    name: "Error Rate",
    value: 0.2,
    unit: "%",
    threshold: 1,
    status: "healthy",
    trend: "down",
    change: -0.1,
  },
  {
    id: "metric-4",
    name: "CPU Usage",
    value: 65,
    unit: "%",
    threshold: 80,
    status: "warning",
    trend: "up",
    change: 8,
  },
];

export const systemAlerts = [
  {
    id: "alert-1",
    type: "warning",
    message: "High CPU usage detected",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    resolved: false,
  },
  {
    id: "alert-2",
    type: "info",
    message: "Scheduled maintenance completed",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    resolved: true,
  },
  {
    id: "alert-3",
    type: "error",
    message: "Database connection timeout",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    resolved: true,
  },
];

export const uptimeStats = {
  current: 99.98,
  last30Days: 99.95,
  last90Days: 99.92,
  incidents: 2,
};


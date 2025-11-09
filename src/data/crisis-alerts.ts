export const crisisAlerts = [
  {
    id: "alert-1",
    severity: "high",
    type: "negative_sentiment",
    message: "Sudden spike in negative mentions detected",
    mentions: 45,
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    status: "active",
  },
  {
    id: "alert-2",
    severity: "medium",
    type: "competitor_activity",
    message: "Competitor launched similar product",
    mentions: 12,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    status: "monitoring",
  },
];

export const crisisStats = {
  activeAlerts: 2,
  resolvedToday: 3,
  avgResponseTime: "15 minutes",
  preventionRate: 87.5,
};

export const crisisTemplates = [
  {
    id: "template-1",
    name: "Negative Sentiment Response",
    category: "sentiment",
    usage: 8,
  },
  {
    id: "template-2",
    name: "Product Issue Response",
    category: "product",
    usage: 5,
  },
];



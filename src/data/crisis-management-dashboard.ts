export const crisisStatus = {
  activeCrises: 2,
  resolvedCrises: 8,
  avgResolutionTime: "4.2 hours",
  responseRate: 95,
};

export const activeCrises = [
  {
    id: "crisis-1",
    title: "Negative Sentiment Spike",
    severity: "high",
    platform: "x",
    detectedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    status: "active",
    mentions: 45,
    sentiment: 35,
    responseActions: 3,
    lastUpdate: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "crisis-2",
    title: "Brand Safety Alert",
    severity: "medium",
    platform: "instagram",
    detectedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    status: "monitoring",
    mentions: 23,
    sentiment: 58,
    responseActions: 1,
    lastUpdate: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
];

export const crisisHistory = [
  {
    id: "crisis-3",
    title: "Service Outage Response",
    severity: "high",
    platform: "farcaster",
    detectedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    resolvedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
    resolutionTime: "3.5 hours",
    status: "resolved",
  },
  {
    id: "crisis-4",
    title: "Negative Review Campaign",
    severity: "medium",
    platform: "x",
    detectedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
    resolvedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 13).toISOString(),
    resolutionTime: "5.2 hours",
    status: "resolved",
  },
];

export const crisisResponseTemplates = [
  {
    id: "template-1",
    name: "Service Outage Response",
    category: "technical",
    severity: "high",
    responseTime: "immediate",
    usage: 12,
  },
  {
    id: "template-2",
    name: "Negative Feedback Response",
    category: "customer_service",
    severity: "medium",
    responseTime: "1 hour",
    usage: 28,
  },
  {
    id: "template-3",
    name: "Brand Safety Alert",
    category: "compliance",
    severity: "high",
    responseTime: "immediate",
    usage: 8,
  },
];

export const crisisMetrics = {
  avgDetectionTime: "15 minutes",
  avgResolutionTime: "4.2 hours",
  responseRate: 95,
  satisfactionRate: 88,
};


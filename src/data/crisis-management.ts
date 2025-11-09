export interface CrisisAlert {
  id: string;
  severity: "critical" | "high" | "medium" | "low";
  title: string;
  description: string;
  platform: string;
  mentions: number;
  sentiment: "negative" | "neutral";
  detectedAt: string;
  status: "active" | "resolved" | "monitoring";
}

export interface CrisisResponse {
  id: string;
  alertId: string;
  action: string;
  takenBy: string;
  timestamp: string;
  result: string;
}

export const crisisAlerts: CrisisAlert[] = [
  {
    id: "crisis-1",
    severity: "high",
    title: "Negative sentiment spike detected",
    description: "Multiple negative mentions about service outage",
    platform: "x",
    mentions: 45,
    sentiment: "negative",
    detectedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    status: "active",
  },
  {
    id: "crisis-2",
    severity: "medium",
    title: "Competitor comparison trending",
    description: "Users comparing your brand unfavorably to competitor",
    platform: "farcaster",
    mentions: 23,
    sentiment: "negative",
    detectedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    status: "monitoring",
  },
];

export const crisisResponses: CrisisResponse[] = [
  {
    id: "response-1",
    alertId: "crisis-1",
    action: "Posted public apology and status update",
    takenBy: "Sarah Johnson",
    timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    result: "Sentiment improved by 15%",
  },
  {
    id: "response-2",
    alertId: "crisis-1",
    action: "Engaged with top complainers directly",
    takenBy: "Alex Chen",
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    result: "Resolved 8 individual complaints",
  },
];

export const crisisStats = {
  activeCrises: 2,
  resolvedToday: 3,
  avgResponseTime: "18 minutes",
  resolutionRate: 92,
  riskLevel: "medium",
};


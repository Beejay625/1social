export interface CrisisAlert {
  id: string;
  title: string;
  severity: "low" | "medium" | "high" | "critical";
  type: "negative-trend" | "viral-negative" | "media-coverage" | "security-breach";
  detectedAt: string;
  status: "detected" | "acknowledged" | "responding" | "resolved";
  affectedPlatforms: string[];
  metrics: {
    mentions: number;
    reach: number;
    sentiment: number;
  };
  assignedTo?: string;
  responsePlan?: string;
}

export interface CrisisResponse {
  id: string;
  crisisId: string;
  action: string;
  takenBy: string;
  takenAt: string;
  status: "in-progress" | "completed";
  impact: string;
}

export const crisisAlerts: CrisisAlert[] = [
  {
    id: "crisis-1",
    title: "Negative Sentiment Surge",
    severity: "high",
    type: "negative-trend",
    detectedAt: new Date(Date.now() - 3600000).toISOString(),
    status: "responding",
    affectedPlatforms: ["x", "farcaster"],
    metrics: {
      mentions: 234,
      reach: 45000,
      sentiment: 25,
    },
    assignedTo: "Sarah Chen",
    responsePlan: "Issue public statement and engage with affected users",
  },
  {
    id: "crisis-2",
    title: "Viral Negative Post",
    severity: "critical",
    type: "viral-negative",
    detectedAt: new Date(Date.now() - 1800000).toISOString(),
    status: "acknowledged",
    affectedPlatforms: ["instagram", "x"],
    metrics: {
      mentions: 567,
      reach: 125000,
      sentiment: 15,
    },
    assignedTo: "Mike Johnson",
  },
];

export const crisisResponses: CrisisResponse[] = [
  {
    id: "response-1",
    crisisId: "crisis-1",
    action: "Published official response",
    takenBy: "Sarah Chen",
    takenAt: new Date(Date.now() - 1800000).toISOString(),
    status: "completed",
    impact: "Reduced negative sentiment by 30%",
  },
  {
    id: "response-2",
    crisisId: "crisis-1",
    action: "Engaged with top complainers",
    takenBy: "Sarah Chen",
    takenAt: new Date(Date.now() - 900000).toISOString(),
    status: "in-progress",
    impact: "Ongoing engagement",
  },
];

export const crisisStats = {
  activeCrises: 2,
  resolvedToday: 1,
  avgResponseTime: "45 minutes",
  resolutionRate: 85,
};


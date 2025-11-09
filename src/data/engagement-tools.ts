export const engagementTools = [
  {
    id: "tool-1",
    name: "Auto-Reply",
    description: "Automatically respond to comments and mentions",
    enabled: true,
    responses: 1240,
    avgResponseTime: "2 min",
  },
  {
    id: "tool-2",
    name: "Mention Tracking",
    description: "Track brand mentions across platforms",
    enabled: true,
    mentions: 3420,
    lastCheck: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
  },
  {
    id: "tool-3",
    name: "Comment Moderation",
    description: "Automated comment filtering",
    enabled: false,
    filtered: 890,
    lastCheck: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
];

export const engagementMetrics = {
  totalEngagements: 45600,
  avgResponseTime: "15 min",
  satisfactionRate: 92,
  activeTools: 2,
};


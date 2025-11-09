export const moderationRules = [
  {
    id: "rule-1",
    name: "Spam Detection",
    enabled: true,
    action: "flag",
    matches: 1240,
    lastMatch: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
  },
  {
    id: "rule-2",
    name: "Profanity Filter",
    enabled: true,
    action: "block",
    matches: 342,
    lastMatch: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "rule-3",
    name: "Duplicate Content",
    enabled: false,
    action: "warn",
    matches: 89,
    lastMatch: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
];

export const moderationQueue = [
  {
    id: "queue-1",
    content: "Check out this amazing product!",
    author: "@user123",
    channel: "farcaster",
    reason: "spam",
    severity: "high",
    reportedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    status: "pending",
  },
  {
    id: "queue-2",
    content: "Great work team!",
    author: "@user456",
    channel: "instagram",
    reason: "inappropriate",
    severity: "low",
    reportedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    status: "reviewed",
  },
];

export const moderationStats = {
  totalFlagged: 1240,
  resolved: 1156,
  pending: 84,
  falsePositives: 12,
};


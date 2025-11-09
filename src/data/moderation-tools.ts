export interface ModerationItem {
  id: string;
  type: "spam" | "inappropriate" | "copyright" | "hate-speech";
  content: string;
  author: string;
  platform: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "pending" | "reviewed" | "resolved" | "dismissed";
  reportedAt: string;
}

export interface ModerationRule {
  id: string;
  name: string;
  type: string;
  action: "delete" | "flag" | "warn" | "ban";
  enabled: boolean;
  matches: number;
}

export const moderationItems: ModerationItem[] = [
  {
    id: "mod-1",
    type: "spam",
    content: "Check out this amazing deal! Click here now!",
    author: "@spammer123",
    platform: "farcaster",
    severity: "medium",
    status: "pending",
    reportedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "mod-2",
    type: "inappropriate",
    content: "Inappropriate content detected",
    author: "@user456",
    platform: "x",
    severity: "high",
    status: "reviewed",
    reportedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
];

export const moderationRules: ModerationRule[] = [
  {
    id: "rule-1",
    name: "Auto-delete spam",
    type: "spam",
    action: "delete",
    enabled: true,
    matches: 124,
  },
  {
    id: "rule-2",
    name: "Flag inappropriate content",
    type: "inappropriate",
    action: "flag",
    enabled: true,
    matches: 45,
  },
];

export const moderationStats = {
  totalItems: 234,
  pendingReview: 12,
  resolvedToday: 45,
  autoResolved: 189,
  avgResolutionTime: "15 minutes",
};


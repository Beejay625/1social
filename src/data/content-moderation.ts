export interface ModerationQueue {
  id: string;
  content: string;
  platform: string;
  author: string;
  type: "comment" | "post" | "message";
  flaggedReason: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "pending" | "approved" | "rejected" | "escalated";
  flaggedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface ModerationRule {
  id: string;
  name: string;
  type: "keyword" | "spam" | "toxicity" | "custom";
  action: "hide" | "delete" | "flag" | "notify";
  enabled: boolean;
  matchCount: number;
}

export const moderationQueue: ModerationQueue[] = [
  {
    id: "mod-1",
    content: "This is spam content with links",
    platform: "farcaster",
    author: "@user123",
    type: "comment",
    flaggedReason: "Spam detection",
    severity: "medium",
    status: "pending",
    flaggedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "mod-2",
    content: "Inappropriate language detected",
    platform: "x",
    author: "@user456",
    type: "comment",
    flaggedReason: "Toxicity detection",
    severity: "high",
    status: "pending",
    flaggedAt: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: "mod-3",
    content: "Legitimate user comment",
    platform: "instagram",
    author: "@user789",
    type: "comment",
    flaggedReason: "False positive",
    severity: "low",
    status: "approved",
    flaggedAt: new Date(Date.now() - 7200000).toISOString(),
    reviewedBy: "Sarah Chen",
    reviewedAt: new Date(Date.now() - 3600000).toISOString(),
  },
];

export const moderationRules: ModerationRule[] = [
  {
    id: "rule-1",
    name: "Spam Detection",
    type: "spam",
    action: "hide",
    enabled: true,
    matchCount: 234,
  },
  {
    id: "rule-2",
    name: "Toxicity Filter",
    type: "toxicity",
    action: "flag",
    enabled: true,
    matchCount: 89,
  },
  {
    id: "rule-3",
    name: "Custom Keywords",
    type: "keyword",
    action: "notify",
    enabled: true,
    matchCount: 45,
  },
];

export const moderationStats = {
  totalFlagged: 368,
  pendingReview: 12,
  approved: 289,
  rejected: 67,
  avgReviewTime: "15 minutes",
};


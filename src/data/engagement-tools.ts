export interface EngagementTool {
  id: string;
  name: string;
  type: "auto-reply" | "mention-tracking" | "comment-moderation" | "dm-management" | "engagement-boost";
  status: "active" | "paused" | "disabled";
  settings: Record<string, any>;
  stats: {
    totalActions: number;
    successRate: number;
    lastAction: string;
  };
}

export interface AutoReplyRule {
  id: string;
  trigger: string;
  response: string;
  platforms: string[];
  conditions: string[];
  enabled: boolean;
  matchCount: number;
}

export interface EngagementCampaign {
  id: string;
  name: string;
  type: "like" | "comment" | "follow" | "share";
  targetAudience: string;
  status: "active" | "paused" | "completed";
  startDate: string;
  endDate?: string;
  metrics: {
    target: number;
    current: number;
    completionRate: number;
  };
}

export const engagementTools: EngagementTool[] = [
  {
    id: "tool-1",
    name: "Auto Reply",
    type: "auto-reply",
    status: "active",
    settings: {
      enabled: true,
      responseDelay: 300,
      maxRepliesPerDay: 50,
    },
    stats: {
      totalActions: 1245,
      successRate: 98.5,
      lastAction: new Date(Date.now() - 1800000).toISOString(),
    },
  },
  {
    id: "tool-2",
    name: "Mention Tracking",
    type: "mention-tracking",
    status: "active",
    settings: {
      trackKeywords: ["@brand", "brand name"],
      notifyOnMention: true,
    },
    stats: {
      totalActions: 892,
      successRate: 100,
      lastAction: new Date(Date.now() - 3600000).toISOString(),
    },
  },
  {
    id: "tool-3",
    name: "Comment Moderation",
    type: "comment-moderation",
    status: "active",
    settings: {
      autoHideSpam: true,
      filterKeywords: ["spam", "scam"],
      requireApproval: false,
    },
    stats: {
      totalActions: 567,
      successRate: 95.2,
      lastAction: new Date(Date.now() - 7200000).toISOString(),
    },
  },
];

export const autoReplyRules: AutoReplyRule[] = [
  {
    id: "rule-1",
    trigger: "thank you",
    response: "You're welcome! We're glad we could help. 😊",
    platforms: ["farcaster", "x"],
    conditions: ["contains", "thank"],
    enabled: true,
    matchCount: 234,
  },
  {
    id: "rule-2",
    trigger: "question",
    response: "Thanks for your question! Our team will get back to you soon.",
    platforms: ["instagram", "x"],
    conditions: ["contains", "?"],
    enabled: true,
    matchCount: 156,
  },
];

export const engagementCampaigns: EngagementCampaign[] = [
  {
    id: "campaign-1",
    name: "Q1 Community Engagement",
    type: "like",
    targetAudience: "Followers",
    status: "active",
    startDate: new Date(Date.now() - 2592000000).toISOString(),
    metrics: {
      target: 10000,
      current: 7845,
      completionRate: 78.45,
    },
  },
  {
    id: "campaign-2",
    name: "Comment Engagement Drive",
    type: "comment",
    targetAudience: "Active Users",
    status: "active",
    startDate: new Date(Date.now() - 1728000000).toISOString(),
    metrics: {
      target: 5000,
      current: 3245,
      completionRate: 64.9,
    },
  },
];

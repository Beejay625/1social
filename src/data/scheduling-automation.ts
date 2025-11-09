export interface AutomationRule {
  id: string;
  name: string;
  description: string;
  trigger: "time-based" | "event-based" | "content-based";
  conditions: string[];
  actions: string[];
  status: "active" | "paused" | "disabled";
  lastRun?: string;
  runCount: number;
  successRate: number;
}

export interface ScheduledAutomation {
  id: string;
  ruleId: string;
  ruleName: string;
  scheduledFor: string;
  status: "pending" | "running" | "completed" | "failed";
  result?: string;
}

export const automationRules: AutomationRule[] = [
  {
    id: "rule-1",
    name: "Auto-post Best Performing Content",
    description: "Automatically repost top-performing content every week",
    trigger: "time-based",
    conditions: ["Content engagement > 1000", "Content age > 7 days"],
    actions: ["Select top 3 posts", "Schedule for optimal times", "Post to all platforms"],
    status: "active",
    lastRun: new Date(Date.now() - 86400000).toISOString(),
    runCount: 12,
    successRate: 95.8,
  },
  {
    id: "rule-2",
    name: "Respond to High-Priority Mentions",
    description: "Auto-respond to mentions with high engagement",
    trigger: "event-based",
    conditions: ["Mention engagement > 50", "Sentiment is positive"],
    actions: ["Send thank you message", "Tag relevant team member"],
    status: "active",
    lastRun: new Date(Date.now() - 3600000).toISOString(),
    runCount: 45,
    successRate: 98.2,
  },
  {
    id: "rule-3",
    name: "Weekly Performance Report",
    description: "Generate and send weekly performance reports",
    trigger: "time-based",
    conditions: ["Day of week is Monday", "Time is 9 AM"],
    actions: ["Generate report", "Send to team", "Post summary"],
    status: "active",
    lastRun: new Date(Date.now() - 86400000 * 2).toISOString(),
    runCount: 8,
    successRate: 100,
  },
];

export const scheduledAutomations: ScheduledAutomation[] = [
  {
    id: "scheduled-1",
    ruleId: "rule-1",
    ruleName: "Auto-post Best Performing Content",
    scheduledFor: new Date(Date.now() + 86400000).toISOString(),
    status: "pending",
  },
  {
    id: "scheduled-2",
    ruleId: "rule-3",
    ruleName: "Weekly Performance Report",
    scheduledFor: new Date(Date.now() + 86400000 * 5).toISOString(),
    status: "pending",
  },
];

export const automationStats = {
  totalRules: 8,
  activeRules: 6,
  totalRuns: 234,
  successRate: 96.5,
  timeSaved: "45 hours",
};


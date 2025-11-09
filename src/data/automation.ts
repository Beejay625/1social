export const automationRules = [
  {
    id: "rule-1",
    name: "Auto-reply to mentions",
    enabled: true,
    trigger: "mention",
    action: "reply",
    executions: 1240,
    successRate: 98.5,
  },
  {
    id: "rule-2",
    name: "Schedule best time posts",
    enabled: true,
    trigger: "schedule",
    action: "publish",
    executions: 3420,
    successRate: 100,
  },
  {
    id: "rule-3",
    name: "Archive old posts",
    enabled: false,
    trigger: "time",
    action: "archive",
    executions: 890,
    successRate: 95.2,
  },
];

export const automationTemplates = [
  {
    id: "template-1",
    name: "Social Media Auto-Responder",
    description: "Automatically respond to comments and mentions",
    category: "engagement",
    uses: 245,
  },
  {
    id: "template-2",
    name: "Content Recycling",
    description: "Automatically repost top-performing content",
    category: "content",
    uses: 189,
  },
  {
    id: "template-3",
    name: "Analytics Reporter",
    description: "Send weekly analytics reports via email",
    category: "reporting",
    uses: 156,
  },
];

export const automationLogs = [
  {
    id: "log-1",
    rule: "Auto-reply to mentions",
    status: "success",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    details: "Replied to @user123",
  },
  {
    id: "log-2",
    rule: "Schedule best time posts",
    status: "success",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    details: "Published 3 posts",
  },
  {
    id: "log-3",
    rule: "Archive old posts",
    status: "error",
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    details: "Failed to archive: connection timeout",
  },
];


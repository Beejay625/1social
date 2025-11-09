export const workflowTemplates = [
  {
    id: "workflow-1",
    name: "Content Approval Flow",
    description: "Multi-step approval for content publishing",
    steps: 3,
    usage: 45,
    category: "publishing",
  },
  {
    id: "workflow-2",
    name: "Crisis Response",
    description: "Automated response to negative mentions",
    steps: 5,
    usage: 12,
    category: "moderation",
  },
  {
    id: "workflow-3",
    name: "Weekly Report",
    description: "Generate and send weekly analytics reports",
    steps: 4,
    usage: 28,
    category: "reporting",
  },
];

export const activeWorkflows = [
  {
    id: "active-1",
    name: "Auto-publish approved content",
    status: "running",
    executions: 1240,
    successRate: 98.5,
    lastRun: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: "active-2",
    name: "Daily digest email",
    status: "running",
    executions: 365,
    successRate: 100,
    lastRun: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "active-3",
    name: "Content moderation queue",
    status: "paused",
    executions: 890,
    successRate: 95.2,
    lastRun: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

export const workflowTriggers = [
  { id: "trigger-1", name: "Schedule", description: "Time-based triggers" },
  { id: "trigger-2", name: "Event", description: "Event-based triggers" },
  { id: "trigger-3", name: "Webhook", description: "External webhook triggers" },
  { id: "trigger-4", name: "Manual", description: "Manual execution" },
];


export const integrationTemplates = [
  {
    id: "template-1",
    name: "Slack Notifications",
    description: "Send notifications to Slack channels",
    category: "communication",
    difficulty: "easy",
    estimatedTime: "15 min",
  },
  {
    id: "template-2",
    name: "Zapier Webhook",
    description: "Connect to Zapier workflows",
    category: "automation",
    difficulty: "medium",
    estimatedTime: "30 min",
  },
  {
    id: "template-3",
    name: "Custom API Integration",
    description: "Build custom API integration",
    category: "custom",
    difficulty: "hard",
    estimatedTime: "2 hours",
  },
];

export const customIntegrations = [
  {
    id: "custom-1",
    name: "Internal CRM Sync",
    status: "active",
    lastSync: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    requests: 1240,
    errors: 2,
  },
  {
    id: "custom-2",
    name: "Marketing Automation",
    status: "active",
    lastSync: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    requests: 3420,
    errors: 0,
  },
  {
    id: "custom-3",
    name: "Legacy System Bridge",
    status: "paused",
    lastSync: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    requests: 890,
    errors: 15,
  },
];

export const integrationEvents = [
  { id: "event-1", name: "post.published", description: "Triggered when a post is published" },
  { id: "event-2", name: "post.scheduled", description: "Triggered when a post is scheduled" },
  { id: "event-3", name: "analytics.updated", description: "Triggered when analytics are updated" },
  { id: "event-4", name: "user.created", description: "Triggered when a user is created" },
];


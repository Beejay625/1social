export const notificationPreferences = [
  {
    id: "notif-email",
    label: "Email notifications",
    description: "Receive updates via email",
    enabled: true,
    channels: ["approval", "performance", "mentions"],
  },
  {
    id: "notif-slack",
    label: "Slack notifications",
    description: "Get alerts in Slack",
    enabled: true,
    channels: ["approval", "alerts"],
  },
  {
    id: "notif-push",
    label: "Push notifications",
    description: "Browser push notifications",
    enabled: false,
    channels: ["mentions", "performance"],
  },
];

export const workspaceSettings = {
  name: "1Social Workspace",
  timezone: "UTC",
  dateFormat: "MM/DD/YYYY",
  defaultChannels: ["farcaster", "instagram"] as const,
  autoApprove: false,
  approvalRequired: true,
  maxScheduledPosts: 100,
};

export const teamPermissions = [
  {
    role: "Admin",
    permissions: ["all"],
    members: 2,
  },
  {
    role: "Editor",
    permissions: ["create", "edit", "schedule"],
    members: 3,
  },
  {
    role: "Viewer",
    permissions: ["view"],
    members: 1,
  },
];

export const integrationSettings = [
  {
    id: "integ-ga",
    name: "Google Analytics",
    connected: true,
    lastSync: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    syncFrequency: "hourly",
  },
  {
    id: "integ-slack",
    name: "Slack",
    connected: true,
    lastSync: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    syncFrequency: "realtime",
  },
  {
    id: "integ-zapier",
    name: "Zapier",
    connected: false,
    lastSync: null,
    syncFrequency: null,
  },
];



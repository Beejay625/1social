export const notificationPreferences = [
  {
    id: "pref-1",
    type: "email",
    category: "publishing",
    enabled: true,
    frequency: "immediate",
  },
  {
    id: "pref-2",
    type: "push",
    category: "analytics",
    enabled: true,
    frequency: "daily",
  },
  {
    id: "pref-3",
    type: "sms",
    category: "alerts",
    enabled: false,
    frequency: "immediate",
  },
];

export const recentNotifications = [
  {
    id: "notif-1",
    title: "Post published successfully",
    message: "Your post was published to Farcaster and Instagram",
    type: "success",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    read: false,
  },
  {
    id: "notif-2",
    title: "New mention detected",
    message: "@user123 mentioned your brand",
    type: "info",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    read: false,
  },
  {
    id: "notif-3",
    title: "Weekly report ready",
    message: "Your weekly analytics report is available",
    type: "info",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    read: true,
  },
];

export const notificationChannels = [
  { id: "email", name: "Email", enabled: true, icon: "📧" },
  { id: "push", name: "Push", enabled: true, icon: "🔔" },
  { id: "sms", name: "SMS", enabled: false, icon: "💬" },
  { id: "slack", name: "Slack", enabled: true, icon: "💬" },
];


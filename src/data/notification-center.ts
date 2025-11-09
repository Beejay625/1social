export interface Notification {
  id: string;
  type: "success" | "warning" | "error" | "info" | "mention" | "approval";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  priority: "high" | "medium" | "low";
  category: string;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  categories: Record<string, boolean>;
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
}

export const notifications: Notification[] = [
  {
    id: "notif-1",
    type: "success",
    title: "Post Published Successfully",
    message: "Your post 'Product Launch' has been published to Instagram",
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    read: false,
    actionUrl: "/content/post-1",
    priority: "medium",
    category: "publishing",
  },
  {
    id: "notif-2",
    type: "mention",
    title: "New Mention",
    message: "@user123 mentioned you in a post",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: false,
    actionUrl: "/mentions/mention-1",
    priority: "high",
    category: "engagement",
  },
  {
    id: "notif-3",
    type: "approval",
    title: "Approval Required",
    message: "Content 'Weekly Update' is pending your approval",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    read: true,
    actionUrl: "/approvals/approval-1",
    priority: "high",
    category: "workflow",
  },
  {
    id: "notif-4",
    type: "warning",
    title: "Low Engagement Alert",
    message: "Recent posts are performing below average",
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    read: false,
    priority: "medium",
    category: "analytics",
  },
  {
    id: "notif-5",
    type: "info",
    title: "Weekly Report Ready",
    message: "Your weekly performance report is now available",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    read: true,
    actionUrl: "/reports/weekly-1",
    priority: "low",
    category: "reports",
  },
];

export const notificationSettings: NotificationSettings = {
  email: true,
  push: true,
  sms: false,
  categories: {
    publishing: true,
    engagement: true,
    workflow: true,
    analytics: true,
    reports: false,
  },
  quietHours: {
    enabled: true,
    start: "22:00",
    end: "08:00",
  },
};

export const notificationStats = {
  totalNotifications: 234,
  unreadNotifications: 12,
  notificationsToday: 8,
  avgResponseTime: "15 minutes",
};


export interface SmartNotification {
  id: string;
  type: "alert" | "reminder" | "insight" | "action" | "system";
  priority: "low" | "medium" | "high" | "urgent";
  category: "engagement" | "performance" | "scheduling" | "team" | "system";
  title: string;
  message: string;
  actionUrl?: string;
  actionLabel?: string;
  metadata?: {
    postId?: string;
    userId?: string;
    metric?: string;
    value?: number;
  };
  read: boolean;
  createdAt: string;
  expiresAt?: string;
}

export interface NotificationPreference {
  category: string;
  enabled: boolean;
  channels: ("email" | "push" | "in-app")[];
  priorityThreshold: "low" | "medium" | "high" | "urgent";
}

export const smartNotifications: SmartNotification[] = [
  {
    id: "notif-1",
    type: "alert",
    priority: "urgent",
    category: "performance",
    title: "Post Performance Alert",
    message: "Your post 'AI Features Launch' is performing 250% above average! Consider boosting it.",
    actionUrl: "/post/post-1",
    actionLabel: "View Post",
    metadata: {
      postId: "post-1",
      metric: "engagement",
      value: 250,
    },
    read: false,
    createdAt: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: "notif-2",
    type: "reminder",
    priority: "high",
    category: "scheduling",
    title: "Scheduling Conflict Detected",
    message: "2 posts are scheduled for the same time on Instagram. Resolve conflict?",
    actionUrl: "/conflicts",
    actionLabel: "Resolve",
    metadata: {
      postId: "post-2",
    },
    read: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "notif-3",
    type: "insight",
    priority: "medium",
    category: "engagement",
    title: "Trending Topic Opportunity",
    message: "#Web3Builders is trending with 250% growth. Create content now?",
    actionUrl: "/suggestions",
    actionLabel: "View Suggestions",
    read: false,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "notif-4",
    type: "action",
    priority: "high",
    category: "team",
    title: "Approval Required",
    message: "Sarah Chen requested approval for 'Product Launch' post",
    actionUrl: "/workflow",
    actionLabel: "Review",
    metadata: {
      userId: "user-1",
      postId: "post-3",
    },
    read: true,
    createdAt: new Date(Date.now() - 10800000).toISOString(),
  },
  {
    id: "notif-5",
    type: "alert",
    priority: "medium",
    category: "performance",
    title: "Account Health Warning",
    message: "Instagram account engagement dropped 15% in last 7 days",
    actionUrl: "/account-health",
    actionLabel: "View Details",
    read: false,
    createdAt: new Date(Date.now() - 14400000).toISOString(),
  },
];

export const notificationStats = {
  total: smartNotifications.length,
  unread: smartNotifications.filter((n) => !n.read).length,
  urgent: smartNotifications.filter((n) => n.priority === "urgent").length,
  byCategory: {
    performance: smartNotifications.filter((n) => n.category === "performance").length,
    scheduling: smartNotifications.filter((n) => n.category === "scheduling").length,
    engagement: smartNotifications.filter((n) => n.category === "engagement").length,
    team: smartNotifications.filter((n) => n.category === "team").length,
    system: smartNotifications.filter((n) => n.category === "system").length,
  },
};

export const notificationPreferences: NotificationPreference[] = [
  {
    category: "performance",
    enabled: true,
    channels: ["push", "in-app"],
    priorityThreshold: "medium",
  },
  {
    category: "scheduling",
    enabled: true,
    channels: ["email", "push", "in-app"],
    priorityThreshold: "high",
  },
  {
    category: "engagement",
    enabled: true,
    channels: ["in-app"],
    priorityThreshold: "low",
  },
  {
    category: "team",
    enabled: true,
    channels: ["email", "push", "in-app"],
    priorityThreshold: "medium",
  },
];


export interface SmartNotification {
  id: string;
  type: "alert" | "reminder" | "insight" | "achievement";
  title: string;
  message: string;
  priority: "high" | "medium" | "low";
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export const smartNotifications: SmartNotification[] = [
  {
    id: "notif-1",
    type: "alert",
    title: "High engagement detected",
    message: "Your latest post has 3x higher engagement than average",
    priority: "high",
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    read: false,
  },
  {
    id: "notif-2",
    type: "reminder",
    title: "Schedule posts for tomorrow",
    message: "You have 5 posts scheduled but 3 time slots are still empty",
    priority: "medium",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    read: false,
  },
  {
    id: "notif-3",
    type: "achievement",
    title: "Milestone reached",
    message: "You've reached 10k followers on Farcaster!",
    priority: "high",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    read: true,
  },
];

export const notificationStats = {
  totalNotifications: 124,
  unreadNotifications: 8,
  avgResponseTime: "12 minutes",
  mostCommonType: "insight",
};

export interface ScheduledPost {
  id: string;
  content: string;
  platforms: string[];
  scheduledFor: string;
  status: "queued" | "scheduled" | "published" | "failed" | "cancelled";
  priority: "low" | "medium" | "high" | "urgent";
  createdAt: string;
  createdBy: string;
  retryCount?: number;
  errorMessage?: string;
}

export interface QueueStats {
  totalQueued: number;
  scheduledToday: number;
  publishedToday: number;
  failedToday: number;
  averageQueueTime: number;
}

export interface QueueSettings {
  autoPublish: boolean;
  maxRetries: number;
  retryDelay: number;
  priorityOrdering: boolean;
  conflictResolution: "skip" | "reschedule" | "merge";
}

export const schedulingQueue: ScheduledPost[] = [
  {
    id: "queue-1",
    content: "Exciting product launch coming soon! Stay tuned 🚀",
    platforms: ["farcaster", "instagram", "x"],
    scheduledFor: new Date(Date.now() + 3600000).toISOString(),
    status: "scheduled",
    priority: "high",
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    createdBy: "user-1",
  },
  {
    id: "queue-2",
    content: "Weekly community update - check out what's new!",
    platforms: ["farcaster"],
    scheduledFor: new Date(Date.now() + 7200000).toISOString(),
    status: "queued",
    priority: "medium",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    createdBy: "user-2",
  },
  {
    id: "queue-3",
    content: "Thank you to our amazing community! 🙏",
    platforms: ["instagram", "x"],
    scheduledFor: new Date(Date.now() - 1800000).toISOString(),
    status: "published",
    priority: "low",
    createdAt: new Date(Date.now() - 10800000).toISOString(),
    createdBy: "user-1",
  },
  {
    id: "queue-4",
    content: "New feature announcement",
    platforms: ["farcaster"],
    scheduledFor: new Date(Date.now() - 3600000).toISOString(),
    status: "failed",
    priority: "high",
    createdAt: new Date(Date.now() - 14400000).toISOString(),
    createdBy: "user-3",
    retryCount: 2,
    errorMessage: "API rate limit exceeded",
  },
];

export const queueStats: QueueStats = {
  totalQueued: 4,
  scheduledToday: 12,
  publishedToday: 8,
  failedToday: 1,
  averageQueueTime: 45,
};

export const queueSettings: QueueSettings = {
  autoPublish: true,
  maxRetries: 3,
  retryDelay: 300000,
  priorityOrdering: true,
  conflictResolution: "reschedule",
};

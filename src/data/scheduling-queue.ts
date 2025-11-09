export interface ScheduledPost {
  id: string;
  content: string;
  platforms: string[];
  scheduledTime: string;
  status: "scheduled" | "published" | "failed";
  author: string;
  engagement?: number;
}

export interface QueueStats {
  totalScheduled: number;
  publishedToday: number;
  failedToday: number;
  avgPostsPerDay: number;
}

export const schedulingQueue: ScheduledPost[] = [
  {
    id: "post-1",
    content: "Excited to announce our new feature! 🚀",
    platforms: ["farcaster", "x", "instagram"],
    scheduledTime: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
    status: "scheduled",
    author: "Alex Chen",
  },
  {
    id: "post-2",
    content: "Weekly update: Here's what we've been working on...",
    platforms: ["farcaster", "lens"],
    scheduledTime: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    status: "scheduled",
    author: "Sarah Johnson",
  },
  {
    id: "post-3",
    content: "Thank you to our amazing community! 🙏",
    platforms: ["x", "instagram"],
    scheduledTime: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    status: "published",
    author: "Mike Rodriguez",
    engagement: 1240,
  },
];

export const queueStats: QueueStats = {
  totalScheduled: 45,
  publishedToday: 8,
  failedToday: 0,
  avgPostsPerDay: 5.2,
};

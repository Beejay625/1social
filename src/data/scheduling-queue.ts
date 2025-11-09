export const scheduledPosts = [
  {
    id: "scheduled-1",
    content: "Excited to announce our new feature!",
    platforms: ["farcaster", "instagram", "x"],
    scheduledTime: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
    status: "scheduled",
    author: "John Doe",
  },
  {
    id: "scheduled-2",
    content: "Behind the scenes: How we build products",
    platforms: ["farcaster", "lens"],
    scheduledTime: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    status: "scheduled",
    author: "Jane Smith",
  },
  {
    id: "scheduled-3",
    content: "Weekly update: What's new this week",
    platforms: ["x", "instagram"],
    scheduledTime: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
    status: "pending",
    author: "Team",
  },
];

export const queueStats = {
  totalScheduled: 24,
  pendingApproval: 5,
  readyToPublish: 19,
  nextPostIn: "2 hours",
};

export const queueFilters = [
  { id: "all", label: "All Posts", count: 24 },
  { id: "scheduled", label: "Scheduled", count: 19 },
  { id: "pending", label: "Pending", count: 5 },
];



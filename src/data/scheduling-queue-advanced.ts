export const queueStats = {
  totalQueued: 45,
  scheduled: 32,
  pending: 13,
  avgQueueTime: "2.5 hours",
  nextPost: new Date(Date.now() + 1000 * 60 * 60 * 3).toISOString(),
};

export const queueItems = [
  {
    id: "queue-1",
    content: "Product launch announcement",
    platforms: ["farcaster", "instagram", "x"],
    scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 3).toISOString(),
    status: "scheduled",
    priority: "high",
    estimatedReach: 12500,
    estimatedEngagement: 890,
    queuedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "queue-2",
    content: "Weekly community update",
    platforms: ["farcaster", "lens"],
    scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    status: "pending",
    priority: "medium",
    estimatedReach: 8500,
    estimatedEngagement: 425,
    queuedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "queue-3",
    content: "Tutorial video post",
    platforms: ["instagram", "x"],
    scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
    status: "scheduled",
    priority: "high",
    estimatedReach: 18500,
    estimatedEngagement: 1480,
    queuedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
  },
];

export const queueOptimization = {
  optimized: 28,
  totalOptimized: 45,
  avgImprovement: 18,
  timeSlotsOptimized: 12,
};

export const queueRecommendations = [
  {
    id: "rec-1",
    type: "timing",
    title: "Reschedule for Better Engagement",
    description: "Move 3 posts to optimal time slots",
    impact: "15% engagement increase",
    postsAffected: 3,
  },
  {
    id: "rec-2",
    type: "distribution",
    title: "Add Cross-Platform Distribution",
    description: "Distribute 5 posts across more platforms",
    impact: "25% reach increase",
    postsAffected: 5,
  },
];


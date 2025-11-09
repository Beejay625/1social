export interface SchedulingConflict {
  id: string;
  type: "time" | "channel" | "content" | "resource";
  severity: "warning" | "error" | "info";
  title: string;
  description: string;
  affectedPosts: string[];
  suggestedResolution: string;
  detectedAt: string;
}

export interface ConflictResolution {
  conflictId: string;
  resolution: "reschedule" | "split" | "merge" | "ignore";
  newSchedule?: {
    postId: string;
    newDate: string;
    newTime: string;
  }[];
  appliedAt: string;
}

export const detectedConflicts: SchedulingConflict[] = [
  {
    id: "conflict-1",
    type: "time",
    severity: "error",
    title: "Overlapping Schedule Times",
    description: "Two posts are scheduled for the same time on Instagram",
    affectedPosts: ["post-1", "post-2"],
    suggestedResolution: "Reschedule one post 2 hours later to maintain optimal posting cadence",
    detectedAt: new Date().toISOString(),
  },
  {
    id: "conflict-2",
    type: "channel",
    severity: "warning",
    title: "High Frequency Posting",
    description: "5 posts scheduled within 1 hour on X (Twitter)",
    affectedPosts: ["post-3", "post-4", "post-5", "post-6", "post-7"],
    suggestedResolution: "Spread posts across 3 hours to avoid audience fatigue",
    detectedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "conflict-3",
    type: "content",
    severity: "info",
    title: "Similar Content Detected",
    description: "Two posts with similar content scheduled within 24 hours",
    affectedPosts: ["post-8", "post-9"],
    suggestedResolution: "Consider merging or spacing out by 48 hours",
    detectedAt: new Date(Date.now() - 7200000).toISOString(),
  },
];

export const conflictStats = {
  total: 3,
  errors: 1,
  warnings: 1,
  info: 1,
  resolved: 0,
  pending: 3,
};


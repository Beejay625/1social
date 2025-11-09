export interface RecyclingRule {
  id: string;
  name: string;
  enabled: boolean;
  criteria: {
    minEngagementRate: number;
    minAge: number;
    platforms: string[];
    contentTypes: string[];
  };
  schedule: {
    frequency: "daily" | "weekly" | "monthly";
    maxReposts: number;
    timeWindow: string;
  };
  performance: {
    totalReposts: number;
    avgEngagementIncrease: number;
    successRate: number;
  };
}

export interface RecycledContent {
  id: string;
  originalPostId: string;
  originalTitle: string;
  originalPublishedAt: string;
  recycledAt: string;
  platform: string;
  performance: {
    originalEngagement: number;
    recycledEngagement: number;
    improvement: number;
  };
  status: "scheduled" | "published" | "failed";
}

export const recyclingRules: RecyclingRule[] = [
  {
    id: "rule-1",
    name: "Top Performing Posts",
    enabled: true,
    criteria: {
      minEngagementRate: 5.0,
      minAge: 30,
      platforms: ["farcaster", "instagram"],
      contentTypes: ["post", "image"],
    },
    schedule: {
      frequency: "weekly",
      maxReposts: 3,
      timeWindow: "9 AM - 5 PM",
    },
    performance: {
      totalReposts: 45,
      avgEngagementIncrease: 12.5,
      successRate: 87,
    },
  },
  {
    id: "rule-2",
    name: "Evergreen Content",
    enabled: true,
    criteria: {
      minEngagementRate: 4.0,
      minAge: 60,
      platforms: ["all"],
      contentTypes: ["post", "article"],
    },
    schedule: {
      frequency: "monthly",
      maxReposts: 5,
      timeWindow: "All day",
    },
    performance: {
      totalReposts: 23,
      avgEngagementIncrease: 8.3,
      successRate: 78,
    },
  },
];

export const recycledContent: RecycledContent[] = [
  {
    id: "recycle-1",
    originalPostId: "post-123",
    originalTitle: "Product Launch Announcement",
    originalPublishedAt: new Date(Date.now() - 2592000000 * 2).toISOString(),
    recycledAt: new Date(Date.now() - 86400000).toISOString(),
    platform: "farcaster",
    performance: {
      originalEngagement: 1250,
      recycledEngagement: 1420,
      improvement: 13.6,
    },
    status: "published",
  },
  {
    id: "recycle-2",
    originalPostId: "post-456",
    originalTitle: "Tutorial: Getting Started",
    originalPublishedAt: new Date(Date.now() - 2592000000 * 3).toISOString(),
    recycledAt: new Date(Date.now() + 86400000).toISOString(),
    platform: "instagram",
    performance: {
      originalEngagement: 890,
      recycledEngagement: 0,
      improvement: 0,
    },
    status: "scheduled",
  },
];

export const recyclingStats = {
  totalRecycled: 68,
  avgEngagementIncrease: 10.4,
  successRate: 82.5,
  activeRules: 2,
  scheduledRecycles: 5,
};


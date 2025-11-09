export interface Influencer {
  id: string;
  name: string;
  username: string;
  platform: string;
  avatar: string;
  metrics: {
    followers: number;
    engagementRate: number;
    avgLikes: number;
    avgComments: number;
    reach: number;
  };
  status: "active" | "pending" | "inactive";
  collaborationHistory: Collaboration[];
  rating: number;
  tags: string[];
}

export interface Collaboration {
  id: string;
  influencerId: string;
  campaignId: string;
  campaignName: string;
  status: "planned" | "active" | "completed" | "cancelled";
  startDate: string;
  endDate?: string;
  performance?: {
    reach: number;
    engagement: number;
    conversions: number;
  };
}

export const influencers: Influencer[] = [
  {
    id: "inf-1",
    name: "Tech Creator",
    username: "@techcreator",
    platform: "farcaster",
    avatar: "TC",
    metrics: {
      followers: 45000,
      engagementRate: 8.5,
      avgLikes: 3825,
      avgComments: 234,
      reach: 38000,
    },
    status: "active",
    collaborationHistory: [
      {
        id: "collab-1",
        influencerId: "inf-1",
        campaignId: "camp-1",
        campaignName: "Product Launch",
        status: "completed",
        startDate: new Date(Date.now() - 86400000 * 30).toISOString(),
        endDate: new Date(Date.now() - 86400000 * 20).toISOString(),
        performance: {
          reach: 38000,
          engagement: 3230,
          conversions: 45,
        },
      },
    ],
    rating: 4.8,
    tags: ["tech", "web3", "productivity"],
  },
  {
    id: "inf-2",
    name: "Design Expert",
    username: "@designexpert",
    platform: "instagram",
    avatar: "DE",
    metrics: {
      followers: 67000,
      engagementRate: 7.2,
      avgLikes: 4824,
      avgComments: 289,
      reach: 56000,
    },
    status: "active",
    collaborationHistory: [],
    rating: 4.6,
    tags: ["design", "creativity", "visual"],
  },
];

export const influencerStats = {
  totalInfluencers: 12,
  activeCollaborations: 3,
  avgEngagementRate: 7.8,
  totalReach: 450000,
  topPerformingInfluencer: "Tech Creator",
};


export interface Influencer {
  id: string;
  name: string;
  username: string;
  platform: string;
  followers: number;
  engagementRate: number;
  category: string;
  status: "active" | "pending" | "inactive";
  collaborationHistory: number;
  avgPerformance: number;
  avatar?: string;
}

export interface CollaborationCampaign {
  id: string;
  name: string;
  influencerId: string;
  influencerName: string;
  status: "draft" | "active" | "completed" | "cancelled";
  startDate: string;
  endDate?: string;
  budget: number;
  deliverables: string[];
  metrics: {
    reach: number;
    engagement: number;
    conversions: number;
    roi: number;
  };
}

export const influencers: Influencer[] = [
  {
    id: "inf-1",
    name: "Alex Thompson",
    username: "@alexthompson",
    platform: "instagram",
    followers: 125000,
    engagementRate: 8.5,
    category: "Tech",
    status: "active",
    collaborationHistory: 5,
    avgPerformance: 92,
  },
  {
    id: "inf-2",
    name: "Sarah Martinez",
    username: "@sarahmartinez",
    platform: "farcaster",
    followers: 89000,
    engagementRate: 9.2,
    category: "Web3",
    status: "active",
    collaborationHistory: 3,
    avgPerformance: 88,
  },
  {
    id: "inf-3",
    name: "Mike Chen",
    username: "@mikechen",
    platform: "x",
    followers: 156000,
    engagementRate: 7.8,
    category: "Business",
    status: "pending",
    collaborationHistory: 2,
    avgPerformance: 85,
  },
];

export const collaborationCampaigns: CollaborationCampaign[] = [
  {
    id: "campaign-1",
    name: "Q1 Product Launch",
    influencerId: "inf-1",
    influencerName: "Alex Thompson",
    status: "active",
    startDate: new Date(Date.now() - 86400000 * 5).toISOString(),
    endDate: new Date(Date.now() + 86400000 * 25).toISOString(),
    budget: 5000,
    deliverables: ["3 Instagram posts", "1 Reel", "Stories coverage"],
    metrics: {
      reach: 125000,
      engagement: 8900,
      conversions: 234,
      roi: 185,
    },
  },
  {
    id: "campaign-2",
    name: "Web3 Community Building",
    influencerId: "inf-2",
    influencerName: "Sarah Martinez",
    status: "active",
    startDate: new Date(Date.now() - 86400000 * 10).toISOString(),
    endDate: new Date(Date.now() + 86400000 * 20).toISOString(),
    budget: 3000,
    deliverables: ["5 Farcaster casts", "Community engagement"],
    metrics: {
      reach: 89000,
      engagement: 7200,
      conversions: 156,
      roi: 220,
    },
  },
];

export const influencerStats = {
  totalInfluencers: 12,
  activeCollaborations: 4,
  totalBudget: 15000,
  avgROI: 195,
  topPerformingInfluencer: "Alex Thompson",
};


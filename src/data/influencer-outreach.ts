export interface Influencer {
  id: string;
  name: string;
  handle: string;
  platform: string;
  followers: number;
  engagementRate: number;
  category: string;
  status: "contacted" | "negotiating" | "contracted" | "completed" | "declined";
  reach: number;
  lastContact: string;
}

export interface OutreachCampaign {
  id: string;
  name: string;
  influencers: string[];
  budget: number;
  status: "planning" | "active" | "completed" | "cancelled";
  startDate: string;
  endDate: string;
  expectedReach: number;
}

export const influencers: Influencer[] = [
  {
    id: "inf-1",
    name: "Alice Web3",
    handle: "@aliceweb3",
    platform: "farcaster",
    followers: 125000,
    engagementRate: 8.5,
    category: "Web3 Creator",
    status: "contracted",
    reach: 106250,
    lastContact: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: "inf-2",
    name: "Tech Guru",
    handle: "@techguru",
    platform: "x",
    followers: 250000,
    engagementRate: 6.2,
    category: "Technology",
    status: "negotiating",
    reach: 155000,
    lastContact: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
];

export const outreachCampaigns: OutreachCampaign[] = [
  {
    id: "campaign-1",
    name: "Q4 Product Launch",
    influencers: ["inf-1", "inf-2"],
    budget: 15000,
    status: "active",
    startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 25).toISOString(),
    expectedReach: 500000,
  },
];

export const outreachStats = {
  totalInfluencers: 25,
  activeCampaigns: 3,
  totalReach: 2500000,
  avgEngagementRate: 7.2,
  totalBudget: 45000,
};

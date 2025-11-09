export const influencerProfiles = [
  {
    id: "inf-1",
    name: "Tech Influencer",
    handle: "@techguru",
    followers: 125000,
    engagementRate: 4.5,
    category: "technology",
    status: "active",
    lastPost: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "inf-2",
    name: "Lifestyle Creator",
    handle: "@lifestylepro",
    followers: 89000,
    engagementRate: 6.2,
    category: "lifestyle",
    status: "active",
    lastPost: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: "inf-3",
    name: "Crypto Expert",
    handle: "@cryptomaster",
    followers: 234000,
    engagementRate: 3.8,
    category: "crypto",
    status: "pending",
    lastPost: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

export const collaborationCampaigns = [
  {
    id: "camp-1",
    name: "Q1 Product Launch",
    influencers: 3,
    budget: 50000,
    status: "active",
    startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString(),
  },
  {
    id: "camp-2",
    name: "Holiday Campaign",
    influencers: 5,
    budget: 75000,
    status: "planned",
    startDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 45).toISOString(),
  },
];

export const influencerMetrics = {
  totalInfluencers: 12,
  activeCampaigns: 3,
  totalReach: 1250000,
  avgEngagementRate: 4.8,
};


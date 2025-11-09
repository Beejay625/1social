export const influencerProfiles = [
  {
    id: "inf-1",
    name: "Crypto Creator",
    handle: "@cryptocreator",
    followers: 125000,
    engagementRate: 4.8,
    category: "crypto",
    status: "contacted",
    lastContact: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "inf-2",
    name: "Tech Influencer",
    handle: "@techinfluencer",
    followers: 89000,
    engagementRate: 5.2,
    category: "technology",
    status: "pending",
    lastContact: null,
  },
];

export const outreachCampaigns = [
  {
    id: "campaign-1",
    name: "Q1 Product Launch",
    influencers: 5,
    responses: 3,
    status: "active",
    startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
];

export const outreachStats = {
  totalContacts: 24,
  responseRate: 62.5,
  avgEngagementRate: 4.9,
  activeCampaigns: 2,
};


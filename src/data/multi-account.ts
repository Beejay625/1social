export const socialAccounts = [
  {
    id: "account-1",
    platform: "farcaster",
    username: "@yourbrand",
    followers: 12500,
    status: "connected",
    lastSync: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
  },
  {
    id: "account-2",
    platform: "instagram",
    username: "@yourbrand",
    followers: 8900,
    status: "connected",
    lastSync: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: "account-3",
    platform: "x",
    username: "@yourbrand",
    followers: 15200,
    status: "connected",
    lastSync: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
];

export const accountStats = {
  totalAccounts: 5,
  connectedAccounts: 5,
  totalFollowers: 36600,
  avgEngagement: 4.8,
};

export const accountHealth = [
  {
    id: "health-1",
    platform: "farcaster",
    healthScore: 95,
    issues: [],
  },
  {
    id: "health-2",
    platform: "instagram",
    healthScore: 88,
    issues: ["Token expiring soon"],
  },
];



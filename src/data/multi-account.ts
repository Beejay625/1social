export interface SocialAccount {
  id: string;
  platform: string;
  username: string;
  displayName: string;
  avatar: string;
  status: "connected" | "disconnected" | "error";
  followers: number;
  following: number;
  posts: number;
  lastSync: string;
  health: {
    score: number;
    status: "healthy" | "warning" | "critical";
  };
}

export interface AccountGroup {
  id: string;
  name: string;
  description: string;
  accounts: string[];
  createdAt: string;
}

export const socialAccounts: SocialAccount[] = [
  {
    id: "account-1",
    platform: "farcaster",
    username: "@builders",
    displayName: "Builders Community",
    avatar: "BC",
    status: "connected",
    followers: 12500,
    following: 890,
    posts: 456,
    lastSync: new Date().toISOString(),
    health: {
      score: 92,
      status: "healthy",
    },
  },
  {
    id: "account-2",
    platform: "instagram",
    username: "@creators",
    displayName: "Creators Hub",
    avatar: "CH",
    status: "connected",
    followers: 23400,
    following: 1200,
    posts: 289,
    lastSync: new Date(Date.now() - 3600000).toISOString(),
    health: {
      score: 78,
      status: "warning",
    },
  },
  {
    id: "account-3",
    platform: "x",
    username: "@innovators",
    displayName: "Innovators",
    avatar: "IN",
    status: "connected",
    followers: 18900,
    following: 567,
    posts: 678,
    lastSync: new Date(Date.now() - 7200000).toISOString(),
    health: {
      score: 85,
      status: "healthy",
    },
  },
];

export const accountGroups: AccountGroup[] = [
  {
    id: "group-1",
    name: "Main Accounts",
    description: "Primary brand accounts",
    accounts: ["account-1", "account-2"],
    createdAt: new Date(Date.now() - 2592000000).toISOString(),
  },
  {
    id: "group-2",
    name: "Community Accounts",
    description: "Community-focused accounts",
    accounts: ["account-1", "account-3"],
    createdAt: new Date(Date.now() - 1728000000).toISOString(),
  },
];

export const accountStats = {
  totalAccounts: 8,
  connectedAccounts: 7,
  disconnectedAccounts: 1,
  totalFollowers: 125000,
  totalPosts: 2345,
};

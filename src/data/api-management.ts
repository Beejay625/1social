export interface APIKey {
  id: string;
  name: string;
  key: string;
  keyPreview: string;
  permissions: string[];
  status: "active" | "revoked" | "expired";
  createdAt: string;
  lastUsed?: string;
  usageCount: number;
  rateLimit: {
    requests: number;
    period: string;
  };
}

export interface APIUsage {
  id: string;
  endpoint: string;
  method: string;
  status: number;
  timestamp: string;
  responseTime: number;
  userId?: string;
}

export const apiKeys: APIKey[] = [
  {
    id: "key-1",
    name: "Production API Key",
    key: "sk_live_1234567890abcdef",
    keyPreview: "sk_live_...cdef",
    permissions: ["read", "write", "publish"],
    status: "active",
    createdAt: new Date(Date.now() - 2592000000).toISOString(),
    lastUsed: new Date(Date.now() - 3600000).toISOString(),
    usageCount: 1234,
    rateLimit: {
      requests: 1000,
      period: "hour",
    },
  },
  {
    id: "key-2",
    name: "Read-Only API Key",
    key: "sk_read_0987654321fedcba",
    keyPreview: "sk_read_...dcba",
    permissions: ["read"],
    status: "active",
    createdAt: new Date(Date.now() - 1728000000).toISOString(),
    lastUsed: new Date(Date.now() - 7200000).toISOString(),
    usageCount: 567,
    rateLimit: {
      requests: 500,
      period: "hour",
    },
  },
  {
    id: "key-3",
    name: "Development Key",
    key: "sk_dev_abcdef1234567890",
    keyPreview: "sk_dev_...7890",
    permissions: ["read", "write"],
    status: "active",
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
    lastUsed: new Date(Date.now() - 86400000 * 5).toISOString(),
    usageCount: 89,
    rateLimit: {
      requests: 100,
      period: "hour",
    },
  },
];

export const recentAPIUsage: APIUsage[] = [
  {
    id: "usage-1",
    endpoint: "/api/v1/posts",
    method: "GET",
    status: 200,
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    responseTime: 145,
    userId: "user-1",
  },
  {
    id: "usage-2",
    endpoint: "/api/v1/posts",
    method: "POST",
    status: 201,
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    responseTime: 234,
    userId: "user-2",
  },
  {
    id: "usage-3",
    endpoint: "/api/v1/analytics",
    method: "GET",
    status: 200,
    timestamp: new Date(Date.now() - 5400000).toISOString(),
    responseTime: 189,
    userId: "user-1",
  },
];

export const apiStats = {
  totalKeys: 5,
  activeKeys: 4,
  totalRequests: 45678,
  requestsToday: 1234,
  avgResponseTime: 178,
  successRate: 99.2,
};


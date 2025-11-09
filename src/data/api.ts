import type { Webhook } from "@/types/publishing";

export const apiEndpoints = [
  {
    id: "endpoint-1",
    path: "/api/v1/posts",
    method: "POST",
    description: "Create a new post",
    requests: 1240,
    successRate: 98.5,
    avgResponseTime: 145,
    lastUsed: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "endpoint-2",
    path: "/api/v1/analytics",
    method: "GET",
    description: "Fetch analytics data",
    requests: 3420,
    successRate: 99.2,
    avgResponseTime: 89,
    lastUsed: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: "endpoint-3",
    path: "/api/v1/webhooks",
    method: "POST",
    description: "Register webhook",
    requests: 56,
    successRate: 100,
    avgResponseTime: 234,
    lastUsed: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
];

export const apiKeys = [
  {
    id: "key-1",
    name: "Production API Key",
    key: "sk_live_...a3f2",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    lastUsed: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    requests: 45600,
    status: "active",
  },
  {
    id: "key-2",
    name: "Development Key",
    key: "sk_test_...b8e1",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    lastUsed: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    requests: 1230,
    status: "active",
  },
  {
    id: "key-3",
    name: "Legacy Integration",
    key: "sk_legacy_...c9d2",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString(),
    lastUsed: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    requests: 890,
    status: "inactive",
  },
];

export const webhookEvents: Webhook[] = [
  {
    id: "webhook-1",
    name: "Post Published",
    url: "https://api.example.com/webhooks/posts",
    events: ["post.published", "post.updated"],
    status: "active",
    lastTriggered: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    successRate: 98.2,
  },
  {
    id: "webhook-2",
    name: "Analytics Update",
    url: "https://analytics.example.com/webhook",
    events: ["analytics.updated"],
    status: "active",
    lastTriggered: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    successRate: 99.5,
  },
  {
    id: "webhook-3",
    name: "Approval Required",
    url: "https://slack.example.com/webhooks/approvals",
    events: ["approval.required", "approval.completed"],
    status: "paused",
    lastTriggered: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    successRate: 95.8,
  },
];

export const rateLimits = [
  {
    endpoint: "/api/v1/posts",
    limit: 1000,
    window: "hour",
    current: 124,
    remaining: 876,
  },
  {
    endpoint: "/api/v1/analytics",
    limit: 5000,
    window: "hour",
    current: 3420,
    remaining: 1580,
  },
  {
    endpoint: "/api/v1/webhooks",
    limit: 100,
    window: "hour",
    current: 56,
    remaining: 44,
  },
];



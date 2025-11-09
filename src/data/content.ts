import type { AssetItem, ChannelId, VersionEntry } from "@/types/publishing";

export const contentLibrary: AssetItem[] = [
  {
    id: "asset-1",
    title: "Product launch hero image",
    type: "image",
    owner: "Leo",
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    accent: "from-purple-400 via-fuchsia-500 to-pink-500",
  },
  {
    id: "asset-2",
    title: "AMA teaser video",
    type: "video",
    owner: "Kai",
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    accent: "from-blue-400 via-cyan-500 to-emerald-500",
  },
  {
    id: "asset-3",
    title: "Q1 roadmap deck",
    type: "doc",
    owner: "Ameena",
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    accent: "from-amber-400 via-orange-500 to-rose-500",
  },
  {
    id: "asset-4",
    title: "Creator spotlight carousel",
    type: "image",
    owner: "Leo",
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    accent: "from-indigo-400 via-purple-500 to-pink-500",
  },
];

export const contentVersions: VersionEntry[] = [
  {
    id: "version-1",
    author: "Kai",
    summary: "Updated copy for clarity",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    status: "live",
  },
  {
    id: "version-2",
    author: "Leo",
    summary: "Added new hero image",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    status: "queued",
  },
  {
    id: "version-3",
    author: "Ameena",
    summary: "Revised CTA based on feedback",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    status: "archived",
  },
];

export const contentPerformanceData = [
  {
    id: "perf-1",
    title: "Founder AMA teaser",
    channel: "farcaster" as ChannelId,
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    metrics: {
      reach: 12400,
      engagement: 3420,
      saves: 890,
      shares: 234,
      clicks: 567,
    },
    performance: "excellent",
    trend: [45, 52, 68, 74, 82, 88, 92],
    score: 92,
    reach: 12400,
    engagement: 27.6,
    conversion: 4.6,
  },
  {
    id: "perf-2",
    title: "Design drops recap",
    channel: "instagram" as ChannelId,
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    metrics: {
      reach: 8900,
      engagement: 2100,
      saves: 567,
      shares: 123,
      clicks: 234,
    },
    performance: "good",
    trend: [32, 38, 45, 52, 58, 62, 65],
    score: 65,
    reach: 8900,
    engagement: 23.6,
    conversion: 2.6,
  },
];

export const workflowAutomationRules = [
  {
    id: "auto-1",
    name: "Auto-approve low-risk posts",
    trigger: "Post scheduled",
    condition: "Engagement score < 50",
    action: "Auto-approve and publish",
    status: "active",
    runs: 12,
    executions: 12,
  },
  {
    id: "auto-2",
    name: "Escalate overdue approvals",
    trigger: "Approval overdue",
    condition: "Overdue by > 2 hours",
    action: "Notify fallback approver",
    status: "active",
    runs: 3,
    executions: 3,
  },
  {
    id: "auto-3",
    name: "Cross-post viral content",
    trigger: "Post engagement spike",
    condition: "Engagement > 500% baseline",
    action: "Auto-syndicate to all channels",
    status: "inactive",
    runs: 0,
    executions: 0,
  },
];


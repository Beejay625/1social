import type { ChannelId } from "@/types/publishing";

export const audienceSegments = [
  {
    id: "segment-1",
    label: "Power users",
    channel: "farcaster" as ChannelId,
    size: 12400,
    growth: 18.2,
    engagement: 8.4,
    coverage: 85,
    benchmark: 72,
    trend: [85, 87, 84, 86, 88, 85, 87],
  },
  {
    id: "segment-2",
    label: "New followers",
    channel: "instagram" as ChannelId,
    size: 8900,
    growth: 24.5,
    engagement: 6.2,
    coverage: 62,
    benchmark: 68,
    trend: [58, 60, 62, 61, 63, 62, 62],
  },
  {
    id: "segment-3",
    label: "Creator cohort",
    channel: "farcaster" as ChannelId,
    size: 3200,
    growth: 12.8,
    engagement: 9.1,
    coverage: 78,
    benchmark: 75,
    trend: [75, 76, 77, 78, 77, 78, 78],
  },
  {
    id: "segment-4",
    label: "Lurkers",
    channel: "instagram" as ChannelId,
    size: 15600,
    growth: 5.3,
    engagement: 2.1,
    coverage: 45,
    benchmark: 55,
    trend: [42, 43, 44, 45, 44, 45, 45],
  },
];

export const sentimentHistory = [
  { date: "Mon", positive: 68, neutral: 22, negative: 10 },
  { date: "Tue", positive: 72, neutral: 20, negative: 8 },
  { date: "Wed", positive: 65, neutral: 25, negative: 10 },
  { date: "Thu", positive: 70, neutral: 23, negative: 7 },
  { date: "Fri", positive: 74, neutral: 19, negative: 7 },
  { date: "Sat", positive: 71, neutral: 21, negative: 8 },
  { date: "Sun", positive: 69, neutral: 24, negative: 7 },
];

export const topPerformers = [
  {
    id: "top-1",
    title: "Founder AMA announcement",
    channel: "farcaster" as ChannelId,
    performance: 94,
    reach: 18200,
    engagement: 28.4,
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
  {
    id: "top-2",
    title: "Product launch carousel",
    channel: "instagram" as ChannelId,
    performance: 87,
    reach: 12400,
    engagement: 24.2,
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: "top-3",
    title: "Community spotlight thread",
    channel: "farcaster" as ChannelId,
    performance: 82,
    reach: 9800,
    engagement: 22.8,
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
  },
];

export const channelPerformance = [
  {
    channel: "farcaster" as ChannelId,
    reach: 182000,
    engagement: 26.4,
    growth: 18.2,
    topPost: "Founder AMA announcement",
  },
  {
    channel: "instagram" as ChannelId,
    reach: 124000,
    engagement: 24.2,
    growth: 12.8,
    topPost: "Product launch carousel",
  },
  {
    channel: "x" as ChannelId,
    reach: 89000,
    engagement: 18.6,
    growth: 8.4,
    topPost: "Thread announcement",
  },
  {
    channel: "lens" as ChannelId,
    reach: 56000,
    engagement: 22.1,
    growth: 24.6,
    topPost: "Mirror publication",
  },
];



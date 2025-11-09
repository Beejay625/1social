import type {
  AbTest,
  Campaign,
  ChannelId,
  Competitor,
  ContentTemplate,
  Notification,
  TrendTopic,
  Webhook,
} from "@/types/publishing";

export const abTests: AbTest[] = [
  {
    id: "test-1",
    title: "Headline variations for AMA post",
    status: "running",
    variants: [
      {
        id: "variant-a",
        label: "Variant A",
        description: "Direct question format",
        performance: 12.4,
        participants: 1240,
      },
      {
        id: "variant-b",
        label: "Variant B",
        description: "Teaser format",
        performance: 15.8,
        participants: 1180,
        winner: true,
      },
    ],
    startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    metric: "Engagement rate",
  },
  {
    id: "test-2",
    title: "Carousel vs single image",
    status: "completed",
    variants: [
      {
        id: "variant-a",
        label: "Carousel",
        description: "5-slide carousel",
        performance: 28.3,
        participants: 2100,
        winner: true,
      },
      {
        id: "variant-b",
        label: "Single",
        description: "Single hero image",
        performance: 18.7,
        participants: 1950,
      },
    ],
    startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    endDate: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    metric: "Save rate",
  },
];

export const campaigns: Campaign[] = [
  {
    id: "campaign-1",
    name: "Q1 Creator Spotlight",
    status: "active",
    channels: ["farcaster", "instagram", "lens"],
    startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
    reach: 245000,
    engagement: 18.4,
    conversions: 1240,
    budget: 5000,
    spent: 3200,
  },
  {
    id: "campaign-2",
    name: "Product Launch Week",
    status: "completed",
    channels: ["farcaster", "x", "mirror"],
    startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    endDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 23).toISOString(),
    reach: 189000,
    engagement: 22.1,
    conversions: 890,
    budget: 3000,
    spent: 3000,
  },
];

export const contentTemplates: ContentTemplate[] = [
  {
    id: "template-1",
    name: "Product Announcement",
    description: "Standard format for feature launches",
    category: "Product",
    channels: ["farcaster", "instagram", "x"],
    preview: "🎉 Introducing [Feature]...",
    usage: 24,
  },
  {
    id: "template-2",
    name: "Community Highlight",
    description: "Showcase creator wins and milestones",
    category: "Community",
    channels: ["farcaster", "instagram"],
    preview: "Shoutout to [Creator] for...",
    usage: 18,
  },
  {
    id: "template-3",
    name: "Behind the Scenes",
    description: "BTS content for team culture",
    category: "Culture",
    channels: ["instagram", "farcaster"],
    preview: "Here's what we're building...",
    usage: 12,
  },
];

export const webhooks: Webhook[] = [
  {
    id: "webhook-1",
    name: "Slack notifications",
    url: "https://hooks.slack.com/services/...",
    events: ["post.published", "workflow.approved", "alert.triggered"],
    status: "active",
    lastTriggered: "2 min ago",
  },
  {
    id: "webhook-2",
    name: "Analytics sync",
    url: "https://api.analytics.com/webhook",
    events: ["post.published", "metric.updated"],
    status: "active",
    lastTriggered: "15 min ago",
  },
  {
    id: "webhook-3",
    name: "Backup archive",
    url: "https://archive.internal/api",
    events: ["post.published"],
    status: "inactive",
  },
];

export const notifications: Notification[] = [
  {
    id: "notif-1",
    type: "success",
    title: "Post published successfully",
    message: "Your AMA teaser is now live on Farcaster and Instagram",
    timestamp: "5 min ago",
    read: false,
    actionUrl: "#",
  },
  {
    id: "notif-2",
    type: "info",
    title: "Workflow approval needed",
    message: "Kai requested approval for 'Design drops recap'",
    timestamp: "12 min ago",
    read: false,
    actionUrl: "#",
  },
  {
    id: "notif-3",
    type: "warning",
    title: "Campaign budget alert",
    message: "Q1 Creator Spotlight has used 64% of budget",
    timestamp: "1 hour ago",
    read: true,
    actionUrl: "#",
  },
  {
    id: "notif-4",
    type: "success",
    title: "A/B test completed",
    message: "Variant B won with 15.8% engagement rate",
    timestamp: "2 hours ago",
    read: true,
    actionUrl: "#",
  },
];

export const competitors: Competitor[] = [
  {
    id: "comp-1",
    name: "BuilderDAO",
    handle: "@builderdao",
    channels: ["farcaster", "lens", "x"],
    followers: 125000,
    growth: 8.2,
    engagement: 19.4,
  },
  {
    id: "comp-2",
    name: "CreatorHub",
    handle: "@creatorhub",
    channels: ["instagram", "farcaster"],
    followers: 89000,
    growth: 12.1,
    engagement: 22.8,
  },
  {
    id: "comp-3",
    name: "SocialStack",
    handle: "@socialstack",
    channels: ["x", "lens", "mirror"],
    followers: 156000,
    growth: 6.8,
    engagement: 16.2,
  },
];

export const trendTopics: TrendTopic[] = [
  {
    id: "trend-1",
    topic: "Web3 creator economy",
    volume: 12400,
    growth: 18.5,
    sentiment: "positive",
    relatedChannels: ["farcaster", "lens", "mirror"],
  },
  {
    id: "trend-2",
    topic: "AI content tools",
    volume: 8900,
    growth: 24.2,
    sentiment: "positive",
    relatedChannels: ["x", "farcaster"],
  },
  {
    id: "trend-3",
    topic: "Community building",
    volume: 15200,
    growth: 12.8,
    sentiment: "positive",
    relatedChannels: ["farcaster", "instagram"],
  },
];


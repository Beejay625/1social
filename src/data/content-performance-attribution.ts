export const performanceAttribution = {
  totalContent: 1245,
  attributedConversions: 856,
  attributionRate: 68.8,
  totalRevenue: 45600,
  attributedRevenue: 31200,
  avgContentLifetime: 45,
  avgAttributionWindow: 14,
};

export const topPerformingContent = [
  {
    id: "content-1",
    title: "Product Launch Video",
    platform: "farcaster",
    contentType: "video",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
    metrics: {
      reach: 18500,
      engagement: 1480,
      engagementRate: 8.0,
      conversions: 245,
      revenue: 12250,
      roi: 312.5,
    },
    attribution: {
      firstTouch: 156,
      lastTouch: 89,
      assisted: 67,
      totalWeight: 92,
    },
    performanceScore: 94,
  },
  {
    id: "content-2",
    title: "Tutorial Series Part 1",
    platform: "instagram",
    contentType: "carousel",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 21).toISOString(),
    metrics: {
      reach: 15200,
      engagement: 1216,
      engagementRate: 8.0,
      conversions: 189,
      revenue: 9450,
      roi: 287.5,
    },
    attribution: {
      firstTouch: 112,
      lastTouch: 77,
      assisted: 45,
      totalWeight: 87,
    },
    performanceScore: 91,
  },
  {
    id: "content-3",
    title: "Feature Announcement",
    platform: "x",
    contentType: "text",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    metrics: {
      reach: 9800,
      engagement: 588,
      engagementRate: 6.0,
      conversions: 134,
      revenue: 6700,
      roi: 245.8,
    },
    attribution: {
      firstTouch: 89,
      lastTouch: 45,
      assisted: 23,
      totalWeight: 78,
    },
    performanceScore: 85,
  },
];

export const attributionByPlatform = [
  {
    platform: "farcaster",
    contentCount: 312,
    conversions: 245,
    revenue: 12250,
    avgAttributionWeight: 28.5,
    topContent: "Product Launch Video",
  },
  {
    platform: "instagram",
    contentCount: 289,
    conversions: 189,
    revenue: 9450,
    avgAttributionWeight: 32.1,
    topContent: "Tutorial Series Part 1",
  },
  {
    platform: "x",
    contentCount: 256,
    conversions: 134,
    revenue: 6700,
    avgAttributionWeight: 18.7,
    topContent: "Feature Announcement",
  },
  {
    platform: "lens",
    contentCount: 198,
    conversions: 98,
    revenue: 4900,
    avgAttributionWeight: 20.7,
    topContent: "Community Update",
  },
];

export const attributionByContentType = [
  {
    type: "video",
    contentCount: 145,
    conversions: 312,
    revenue: 15600,
    avgAttributionWeight: 35.2,
    conversionRate: 8.5,
  },
  {
    type: "carousel",
    contentCount: 189,
    conversions: 234,
    revenue: 11700,
    avgAttributionWeight: 28.7,
    conversionRate: 7.2,
  },
  {
    type: "image",
    contentCount: 456,
    conversions: 198,
    revenue: 9900,
    avgAttributionWeight: 18.5,
    conversionRate: 5.8,
  },
  {
    type: "text",
    contentCount: 312,
    conversions: 112,
    revenue: 5600,
    avgAttributionWeight: 12.3,
    conversionRate: 4.2,
  },
];

export const attributionFunnel = [
  {
    stage: "Awareness",
    content: 1245,
    attributed: 856,
    rate: 68.8,
    description: "Content that drives initial awareness",
  },
  {
    stage: "Consideration",
    content: 856,
    attributed: 623,
    rate: 72.8,
    description: "Content that influences consideration",
  },
  {
    stage: "Conversion",
    content: 623,
    attributed: 456,
    rate: 73.2,
    description: "Content that drives final conversion",
  },
];

export const attributionInsights = [
  {
    id: "insight-1",
    type: "opportunity",
    title: "Video Content Drives Conversions",
    description: "Video content accounts for 45% of attributed conversions",
    metric: "conversions",
    value: 312,
    total: 856,
    recommendation: "Increase video content production by 30%",
  },
  {
    id: "insight-2",
    type: "strength",
    title: "Farcaster High Attribution",
    description: "Farcaster content has highest attribution weight",
    metric: "attribution",
    value: 28.5,
    benchmark: 22.0,
    recommendation: "Maintain focus on Farcaster content strategy",
  },
  {
    id: "insight-3",
    type: "opportunity",
    title: "Text Content Underperforming",
    description: "Text content has lowest attribution weight",
    metric: "attribution",
    value: 12.3,
    benchmark: 18.0,
    recommendation: "Enhance text content with visuals or CTAs",
  },
];


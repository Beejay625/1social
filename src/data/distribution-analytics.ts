export const distributionMetrics = {
  totalDistributions: 1245,
  avgReach: 12500,
  avgEngagement: 890,
  distributionRate: 87.5,
  crossPlatformPosts: 856,
};

export const distributionByChannel = [
  {
    channel: "farcaster",
    posts: 312,
    reach: 12500,
    engagement: 890,
    distributionRate: 92,
    avgShares: 45,
  },
  {
    channel: "instagram",
    posts: 289,
    reach: 18500,
    engagement: 1480,
    distributionRate: 88,
    avgShares: 67,
  },
  {
    channel: "x",
    posts: 256,
    reach: 9800,
    engagement: 588,
    distributionRate: 85,
    avgShares: 34,
  },
  {
    channel: "lens",
    posts: 198,
    reach: 11200,
    engagement: 672,
    distributionRate: 90,
    avgShares: 28,
  },
];

export const topDistributedContent = [
  {
    id: "dist-1",
    title: "Product Launch Announcement",
    platforms: ["farcaster", "instagram", "x", "lens"],
    totalReach: 52000,
    totalEngagement: 3840,
    distributionScore: 94,
    viralCoefficient: 2.3,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
  {
    id: "dist-2",
    title: "Tutorial Video Series",
    platforms: ["instagram", "farcaster", "x"],
    totalReach: 38500,
    totalEngagement: 2890,
    distributionScore: 87,
    viralCoefficient: 1.8,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
  },
  {
    id: "dist-3",
    title: "Community Spotlight",
    platforms: ["farcaster", "lens", "x"],
    totalReach: 29800,
    totalEngagement: 2235,
    distributionScore: 82,
    viralCoefficient: 1.5,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
];

export const distributionPatterns = [
  {
    pattern: "Simultaneous Multi-Platform",
    usage: 456,
    avgPerformance: 92,
    description: "Posting to all platforms at once",
  },
  {
    pattern: "Staggered Distribution",
    usage: 312,
    avgPerformance: 85,
    description: "Posting with time delays between platforms",
  },
  {
    pattern: "Platform-Specific",
    usage: 289,
    avgPerformance: 78,
    description: "Content optimized for specific platforms",
  },
  {
    pattern: "Cross-Promotion",
    usage: 188,
    avgPerformance: 88,
    description: "Promoting content across platforms",
  },
];

export const distributionInsights = [
  {
    id: "insight-1",
    type: "opportunity",
    title: "Increase Cross-Platform Distribution",
    description: "Only 68% of content is distributed across multiple platforms",
    recommendation: "Increase cross-platform distribution to reach 85%",
    impact: "high",
  },
  {
    id: "insight-2",
    type: "strength",
    title: "Strong Viral Coefficient",
    description: "Average viral coefficient of 1.9 indicates good content sharing",
    recommendation: "Maintain current distribution strategy",
    impact: "medium",
  },
];


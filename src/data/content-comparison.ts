export interface ContentComparison {
  id: string;
  contentA: {
    id: string;
    title: string;
    platform: string;
    publishedAt: string;
  };
  contentB: {
    id: string;
    title: string;
    platform: string;
    publishedAt: string;
  };
  metrics: ComparisonMetrics;
  insights: string[];
  winner: "A" | "B" | "tie";
}

export interface ComparisonMetrics {
  reach: { a: number; b: number; difference: number };
  engagement: { a: number; b: number; difference: number };
  engagementRate: { a: number; b: number; difference: number };
  clicks: { a: number; b: number; difference: number };
  conversions: { a: number; b: number; difference: number };
}

export const contentComparisons: ContentComparison[] = [
  {
    id: "comp-1",
    contentA: {
      id: "post-1",
      title: "Product Launch - Version A",
      platform: "farcaster",
      publishedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    },
    contentB: {
      id: "post-2",
      title: "Product Launch - Version B",
      platform: "farcaster",
      publishedAt: new Date(Date.now() - 86400000 * 6).toISOString(),
    },
    metrics: {
      reach: { a: 12500, b: 18900, difference: 51.2 },
      engagement: { a: 890, b: 1450, difference: 62.9 },
      engagementRate: { a: 7.1, b: 7.7, difference: 8.5 },
      clicks: { a: 234, b: 389, difference: 66.2 },
      conversions: { a: 12, b: 23, difference: 91.7 },
    },
    insights: [
      "Version B performed 51% better in reach",
      "Higher engagement rate suggests better content quality",
      "Version B's CTA was more effective",
    ],
    winner: "B",
  },
];

export const comparisonStats = {
  totalComparisons: 24,
  avgPerformanceGain: 18.5,
  topPerformingFactor: "Visual Content",
  mostComparedPlatform: "farcaster",
};


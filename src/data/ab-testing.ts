export interface ABTest {
  id: string;
  name: string;
  description: string;
  status: "draft" | "running" | "completed" | "paused";
  startDate: string;
  endDate?: string;
  variants: ABTestVariant[];
  metrics: {
    totalParticipants: number;
    conversionRate: number;
    confidenceLevel: number;
    winner?: string;
  };
  createdAt: string;
}

export interface ABTestVariant {
  id: string;
  name: string;
  content: string;
  platform: string;
  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
    engagement: number;
    conversionRate: number;
  };
  performance: number;
}

export const abTests: ABTest[] = [
  {
    id: "test-1",
    name: "Product Launch Headline Test",
    description: "Testing different headlines for product launch announcement",
    status: "running",
    startDate: new Date(Date.now() - 86400000 * 2).toISOString(),
    variants: [
      {
        id: "variant-1",
        name: "Version A - Exciting",
        content: "🚀 Exciting Product Launch Coming Soon!",
        platform: "farcaster",
        metrics: {
          impressions: 12500,
          clicks: 890,
          conversions: 45,
          engagement: 1200,
          conversionRate: 5.1,
        },
        performance: 72,
      },
      {
        id: "variant-2",
        name: "Version B - Professional",
        content: "Introducing Our Latest Innovation",
        platform: "farcaster",
        metrics: {
          impressions: 11800,
          clicks: 1020,
          conversions: 67,
          engagement: 1350,
          conversionRate: 6.6,
        },
        performance: 85,
      },
    ],
    metrics: {
      totalParticipants: 24300,
      conversionRate: 5.8,
      confidenceLevel: 87,
      winner: "variant-2",
    },
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: "test-2",
    name: "CTA Button Color Test",
    description: "Testing different CTA button colors for engagement",
    status: "completed",
    startDate: new Date(Date.now() - 86400000 * 7).toISOString(),
    endDate: new Date(Date.now() - 86400000 * 2).toISOString(),
    variants: [
      {
        id: "variant-3",
        name: "Blue CTA",
        content: "Learn More",
        platform: "instagram",
        metrics: {
          impressions: 45000,
          clicks: 2340,
          conversions: 156,
          engagement: 3200,
          conversionRate: 6.7,
        },
        performance: 78,
      },
      {
        id: "variant-4",
        name: "Green CTA",
        content: "Learn More",
        platform: "instagram",
        metrics: {
          impressions: 43800,
          clicks: 2890,
          conversions: 198,
          engagement: 3800,
          conversionRate: 6.8,
        },
        performance: 92,
      },
    ],
    metrics: {
      totalParticipants: 88800,
      conversionRate: 6.75,
      confidenceLevel: 95,
      winner: "variant-4",
    },
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
];

export const abTestingStats = {
  totalTests: 12,
  activeTests: 3,
  completedTests: 8,
  avgImprovement: 18.5,
  bestPerformingTest: "CTA Button Color Test",
};


export interface ContentAnalytic {
  id: string;
  contentId: string;
  title: string;
  platform: string;
  views: number;
  engagement: number;
  engagementRate: number;
  clicks: number;
  shares: number;
  timestamp: string;
}

export interface AnalyticsTrend {
  date: string;
  views: number;
  engagement: number;
  clicks: number;
}

export const contentAnalytics: ContentAnalytic[] = [
  {
    id: "analytics-1",
    contentId: "content-123",
    title: "Product Launch Announcement",
    platform: "farcaster",
    views: 12500,
    engagement: 1240,
    engagementRate: 9.9,
    clicks: 340,
    shares: 89,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "analytics-2",
    contentId: "content-124",
    title: "Weekly Update Thread",
    platform: "x",
    views: 8900,
    engagement: 890,
    engagementRate: 10.0,
    clicks: 210,
    shares: 45,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
];

export const analyticsTrends: AnalyticsTrend[] = [
  {
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
    views: 12000,
    engagement: 1100,
    clicks: 300,
  },
  {
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    views: 13500,
    engagement: 1300,
    clicks: 350,
  },
  {
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
    views: 11800,
    engagement: 1150,
    clicks: 290,
  },
];

export const analyticsStats = {
  totalViews: 125000,
  totalEngagement: 12400,
  avgEngagementRate: 9.9,
  totalClicks: 3400,
  topPerformer: "Product Launch Announcement",
};



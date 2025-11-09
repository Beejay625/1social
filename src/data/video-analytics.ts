export interface VideoPerformance {
  id: string;
  title: string;
  platform: string;
  url: string;
  thumbnail: string;
  duration: number;
  durationFormatted: string;
  publishedAt: string;
  metrics: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
    watchTime: number;
    watchTimeFormatted: string;
    avgWatchPercentage: number;
    engagementRate: number;
  };
  performanceScore: number;
}

export interface VideoInsight {
  id: string;
  videoId: string;
  type: "retention" | "engagement" | "audience" | "content";
  title: string;
  description: string;
  recommendation: string;
  impact: "high" | "medium" | "low";
}

export const videoPerformances: VideoPerformance[] = [
  {
    id: "video-1",
    title: "Product Launch Announcement",
    platform: "youtube",
    url: "https://youtube.com/watch?v=...",
    thumbnail: "/thumbnails/product-launch.jpg",
    duration: 180,
    durationFormatted: "3:00",
    publishedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    metrics: {
      views: 12500,
      likes: 890,
      comments: 234,
      shares: 156,
      watchTime: 225000,
      watchTimeFormatted: "62.5 hours",
      avgWatchPercentage: 75,
      engagementRate: 10.2,
    },
    performanceScore: 88,
  },
  {
    id: "video-2",
    title: "Getting Started Tutorial",
    platform: "tiktok",
    url: "https://tiktok.com/@...",
    thumbnail: "/thumbnails/tutorial.jpg",
    duration: 60,
    durationFormatted: "1:00",
    publishedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    metrics: {
      views: 45000,
      likes: 3200,
      comments: 890,
      shares: 567,
      watchTime: 2700000,
      watchTimeFormatted: "750 hours",
      avgWatchPercentage: 90,
      engagementRate: 10.3,
    },
    performanceScore: 92,
  },
  {
    id: "video-3",
    title: "Feature Demo",
    platform: "instagram",
    url: "https://instagram.com/reel/...",
    thumbnail: "/thumbnails/feature-demo.jpg",
    duration: 30,
    durationFormatted: "0:30",
    publishedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    metrics: {
      views: 28000,
      likes: 2100,
      comments: 456,
      shares: 234,
      watchTime: 840000,
      watchTimeFormatted: "233.3 hours",
      avgWatchPercentage: 85,
      engagementRate: 10.0,
    },
    performanceScore: 85,
  },
];

export const videoInsights: VideoInsight[] = [
  {
    id: "insight-1",
    videoId: "video-2",
    type: "retention",
    title: "High Retention Rate",
    description: "90% average watch percentage indicates strong content engagement",
    recommendation: "Create more content similar to this style and format",
    impact: "high",
  },
  {
    id: "insight-2",
    videoId: "video-1",
    type: "engagement",
    title: "Strong Comment Engagement",
    description: "High comment-to-view ratio suggests audience is highly engaged",
    recommendation: "Respond to comments to boost engagement further",
    impact: "medium",
  },
  {
    id: "insight-3",
    videoId: "video-3",
    type: "content",
    title: "Optimal Video Length",
    description: "30-second videos show best performance for Instagram Reels",
    recommendation: "Focus on creating more 30-second content for Instagram",
    impact: "high",
  },
];

export const videoAnalyticsStats = {
  totalVideos: 45,
  totalViews: 1250000,
  totalWatchTime: 12500,
  totalWatchTimeFormatted: "12,500 hours",
  avgEngagementRate: 9.8,
  topPlatform: "tiktok",
  bestPerformingVideo: "Getting Started Tutorial",
};


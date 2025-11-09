export interface VideoPerformance {
  id: string;
  title: string;
  platform: string;
  url: string;
  thumbnail: string;
  metrics: {
    views: number;
    watchTime: number;
    avgWatchTime: number;
    completionRate: number;
    engagement: number;
    shares: number;
  };
  publishedAt: string;
  duration: number;
}

export interface VideoInsight {
  id: string;
  videoId: string;
  type: "peak-moment" | "drop-off" | "engagement-spike";
  timestamp: number;
  description: string;
  recommendation: string;
}

export const videoPerformance: VideoPerformance[] = [
  {
    id: "video-1",
    title: "Product Demo Video",
    platform: "instagram",
    url: "/videos/product-demo.mp4",
    thumbnail: "/thumbnails/product-demo.jpg",
    metrics: {
      views: 45600,
      watchTime: 234000,
      avgWatchTime: 85,
      completionRate: 72.5,
      engagement: 3450,
      shares: 234,
    },
    publishedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    duration: 120,
  },
  {
    id: "video-2",
    title: "Tutorial: Getting Started",
    platform: "farcaster",
    url: "/videos/tutorial.mp4",
    thumbnail: "/thumbnails/tutorial.jpg",
    metrics: {
      views: 23400,
      watchTime: 189000,
      avgWatchTime: 92,
      completionRate: 78.2,
      engagement: 1890,
      shares: 156,
    },
    publishedAt: new Date(Date.now() - 86400000 * 14).toISOString(),
    duration: 120,
  },
];

export const videoInsights: VideoInsight[] = [
  {
    id: "insight-1",
    videoId: "video-1",
    type: "peak-moment",
    timestamp: 45,
    description: "Highest engagement at 45 seconds",
    recommendation: "Consider starting videos with similar content",
  },
  {
    id: "insight-2",
    videoId: "video-1",
    type: "drop-off",
    timestamp: 90,
    description: "Significant drop-off at 90 seconds",
    recommendation: "Review content at this point for improvement",
  },
];

export const videoStats = {
  totalVideos: 45,
  totalViews: 234000,
  avgCompletionRate: 75.3,
  totalWatchTime: 1890000,
  topPerformingPlatform: "instagram",
};

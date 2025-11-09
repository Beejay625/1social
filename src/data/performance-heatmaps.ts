export interface HeatmapData {
  day: string;
  hour: number;
  engagement: number;
  posts: number;
}

export interface PerformanceHeatmap {
  platform: string;
  data: HeatmapData[];
  bestTime: string;
  worstTime: string;
}

export const performanceHeatmaps: PerformanceHeatmap[] = [
  {
    platform: "farcaster",
    bestTime: "Tuesday, 2 PM",
    worstTime: "Sunday, 6 AM",
    data: [
      { day: "Monday", hour: 9, engagement: 8.5, posts: 12 },
      { day: "Monday", hour: 14, engagement: 12.3, posts: 15 },
      { day: "Tuesday", hour: 14, engagement: 15.8, posts: 18 },
      { day: "Wednesday", hour: 10, engagement: 9.2, posts: 10 },
      { day: "Thursday", hour: 15, engagement: 11.5, posts: 14 },
      { day: "Friday", hour: 13, engagement: 10.8, posts: 13 },
      { day: "Saturday", hour: 11, engagement: 7.2, posts: 8 },
      { day: "Sunday", hour: 6, engagement: 3.1, posts: 3 },
    ],
  },
];

export const heatmapStats = {
  totalDataPoints: 168,
  analyzedPosts: 1240,
  bestDay: "Tuesday",
  bestHour: 14,
  avgEngagement: 9.8,
};


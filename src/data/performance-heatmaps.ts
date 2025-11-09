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
      { day: "Tuesday", hour: 9, engagement: 9.2, posts: 11 },
      { day: "Tuesday", hour: 14, engagement: 15.8, posts: 18 },
      { day: "Wednesday", hour: 10, engagement: 9.2, posts: 10 },
      { day: "Wednesday", hour: 15, engagement: 10.5, posts: 12 },
      { day: "Thursday", hour: 12, engagement: 10.2, posts: 13 },
      { day: "Thursday", hour: 15, engagement: 11.5, posts: 14 },
      { day: "Friday", hour: 12, engagement: 10.8, posts: 13 },
      { day: "Friday", hour: 18, engagement: 9.5, posts: 11 },
      { day: "Saturday", hour: 11, engagement: 7.2, posts: 8 },
      { day: "Saturday", hour: 15, engagement: 6.8, posts: 7 },
      { day: "Sunday", hour: 9, engagement: 5.2, posts: 5 },
      { day: "Sunday", hour: 18, engagement: 4.1, posts: 4 },
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


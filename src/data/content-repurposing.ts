export interface RepurposingTask {
  id: string;
  sourceContent: {
    id: string;
    title: string;
    platform: string;
    type: string;
  };
  targetPlatform: string;
  targetType: string;
  status: "pending" | "processing" | "completed" | "failed";
  progress: number;
  createdAt: string;
  completedAt?: string;
  result?: {
    url?: string;
    performance?: number;
  };
}

export interface RepurposingTemplate {
  id: string;
  name: string;
  sourceType: string;
  targetType: string;
  description: string;
  usageCount: number;
  avgPerformance: number;
}

export const repurposingTasks: RepurposingTask[] = [
  {
    id: "task-1",
    sourceContent: {
      id: "content-1",
      title: "Product Launch Blog Post",
      platform: "website",
      type: "blog",
    },
    targetPlatform: "instagram",
    targetType: "carousel",
    status: "completed",
    progress: 100,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    completedAt: new Date(Date.now() - 86400000).toISOString(),
    result: {
      url: "/content/repurposed-1",
      performance: 85,
    },
  },
  {
    id: "task-2",
    sourceContent: {
      id: "content-2",
      title: "Twitter Thread",
      platform: "x",
      type: "thread",
    },
    targetPlatform: "linkedin",
    targetType: "article",
    status: "processing",
    progress: 65,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "task-3",
    sourceContent: {
      id: "content-3",
      title: "YouTube Video",
      platform: "youtube",
      type: "video",
    },
    targetPlatform: "tiktok",
    targetType: "short",
    status: "pending",
    progress: 0,
    createdAt: new Date(Date.now() - 1800000).toISOString(),
  },
];

export const repurposingTemplates: RepurposingTemplate[] = [
  {
    id: "template-1",
    name: "Blog to Instagram Carousel",
    sourceType: "blog",
    targetType: "carousel",
    description: "Convert blog posts into Instagram carousel posts",
    usageCount: 45,
    avgPerformance: 82,
  },
  {
    id: "template-2",
    name: "Video to Shorts",
    sourceType: "video",
    targetType: "short",
    description: "Extract highlights from long videos for short-form content",
    usageCount: 32,
    avgPerformance: 78,
  },
  {
    id: "template-3",
    name: "Thread to Article",
    sourceType: "thread",
    targetType: "article",
    description: "Convert Twitter threads into LinkedIn articles",
    usageCount: 28,
    avgPerformance: 85,
  },
];

export const repurposingStats = {
  totalTasks: 156,
  completedTasks: 142,
  avgPerformanceGain: 18.5,
  timeSaved: "120 hours",
  topTemplate: "Blog to Instagram Carousel",
};

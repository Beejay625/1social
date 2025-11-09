export const videoContent = [
  {
    id: "video-1",
    title: "Product Demo Video",
    duration: "2:34",
    views: 12400,
    engagement: 890,
    status: "published",
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: "video-2",
    title: "Tutorial Series Ep 1",
    duration: "5:12",
    views: 8900,
    engagement: 567,
    status: "scheduled",
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
];

export const videoAnalytics = {
  totalVideos: 24,
  totalViews: 125000,
  avgEngagement: 6.8,
  topPerformer: "Product Demo Video",
};

export const videoTemplates = [
  {
    id: "template-1",
    name: "Product Showcase",
    duration: "30s",
    category: "marketing",
  },
  {
    id: "template-2",
    name: "Behind the Scenes",
    duration: "60s",
    category: "content",
  },
];


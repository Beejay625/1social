export const insights = [
  {
    id: "insight-1",
    title: "Peak engagement time detected",
    description: "Your audience is most active between 2-4 PM EST",
    type: "opportunity",
    impact: "high",
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: "insight-2",
    title: "Content performance declining",
    description: "Engagement rate dropped 15% this week",
    type: "warning",
    impact: "medium",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: "insight-3",
    title: "New trending hashtag",
    description: "#Web3Social is trending in your niche",
    type: "opportunity",
    impact: "low",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
];

export const insightCategories = [
  { id: "performance", label: "Performance", count: 12 },
  { id: "audience", label: "Audience", count: 8 },
  { id: "content", label: "Content", count: 15 },
  { id: "timing", label: "Timing", count: 6 },
];

export const actionableInsights = [
  {
    id: "action-1",
    insight: "Post more video content",
    reason: "Videos have 3x higher engagement",
    priority: "high",
  },
  {
    id: "action-2",
    insight: "Engage with mentions faster",
    reason: "Response time affects brand perception",
    priority: "medium",
  },
];


export const aiAssistants = [
  {
    id: "assistant-1",
    name: "Content Writer",
    description: "Generate engaging social media posts",
    category: "content",
    usage: 1240,
    rating: 4.8,
  },
  {
    id: "assistant-2",
    name: "Analytics Analyst",
    description: "Analyze performance and provide insights",
    category: "analytics",
    usage: 890,
    rating: 4.6,
  },
  {
    id: "assistant-3",
    name: "Schedule Optimizer",
    description: "Find best times to post",
    category: "scheduling",
    usage: 2340,
    rating: 4.9,
  },
];

export const aiConversations = [
  {
    id: "conv-1",
    query: "What's my best performing post this week?",
    response: "Your best performing post this week is 'Product Launch Announcement' with 12.4k engagements.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "conv-2",
    query: "Suggest content ideas for next week",
    response: "Based on your audience, I suggest: 1) Behind-the-scenes content 2) User testimonials 3) Product tutorials",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
];

export const aiCapabilities = [
  { id: "cap-1", name: "Content Generation", enabled: true },
  { id: "cap-2", name: "Sentiment Analysis", enabled: true },
  { id: "cap-3", name: "Hashtag Suggestions", enabled: true },
  { id: "cap-4", name: "Image Analysis", enabled: false },
];


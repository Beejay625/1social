export const trendingTopics = [
  {
    id: "trend-1",
    topic: "#Web3Social",
    mentions: 12400,
    growth: 45,
    category: "technology",
    relatedHashtags: ["#Web3", "#SocialFi", "#Decentralized"],
  },
  {
    id: "trend-2",
    topic: "#CreatorEconomy",
    mentions: 8900,
    growth: 32,
    category: "business",
    relatedHashtags: ["#Creators", "#Influencer", "#Content"],
  },
];

export const trendAlerts = [
  {
    id: "alert-1",
    topic: "#Web3Social",
    message: "Rapid growth detected: +45% in last 24 hours",
    severity: "high",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
];

export const trendStats = {
  topicsTracked: 12,
  avgGrowth: 28.5,
  topCategory: "technology",
};


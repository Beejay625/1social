export interface HashtagResearch {
  id: string;
  hashtag: string;
  volume: number;
  growth: number;
  difficulty: "low" | "medium" | "high";
  relatedHashtags: string[];
  topPosts: number;
  avgEngagement: number;
}

export interface HashtagTrend {
  hashtag: string;
  trend: "up" | "down" | "stable";
  change: number;
  volume: number;
}

export const hashtagResearch: HashtagResearch[] = [
  {
    id: "hashtag-1",
    hashtag: "#web3creator",
    volume: 15200,
    growth: 18.5,
    difficulty: "medium",
    relatedHashtags: ["#web3", "#creator", "#decentralized"],
    topPosts: 1240,
    avgEngagement: 890,
  },
  {
    id: "hashtag-2",
    hashtag: "#socialmedia",
    volume: 245000,
    growth: 5.2,
    difficulty: "high",
    relatedHashtags: ["#marketing", "#content", "#digital"],
    topPosts: 8900,
    avgEngagement: 1200,
  },
];

export const hashtagTrends: HashtagTrend[] = [
  {
    hashtag: "#web3creator",
    trend: "up",
    change: 18.5,
    volume: 15200,
  },
  {
    hashtag: "#decentralized",
    trend: "up",
    change: 12.3,
    volume: 8900,
  },
  {
    hashtag: "#socialmedia",
    trend: "stable",
    change: 2.1,
    volume: 245000,
  },
];

export const researchStats = {
  hashtagsResearched: 45,
  trendingHashtags: 12,
  avgVolume: 12500,
  topHashtag: "#web3creator",
};

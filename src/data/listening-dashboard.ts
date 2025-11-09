export interface ListeningAlert {
  id: string;
  keyword: string;
  mentions: number;
  sentiment: "positive" | "negative" | "neutral";
  trend: "up" | "down" | "stable";
  topChannels: string[];
  lastMention: string;
}

export interface ListeningTopic {
  id: string;
  topic: string;
  volume: number;
  growth: number;
  sentiment: number;
  topInfluencers: string[];
  relatedKeywords: string[];
}

export const listeningAlerts: ListeningAlert[] = [
  {
    id: "alert-1",
    keyword: "yourbrand",
    mentions: 1240,
    sentiment: "positive",
    trend: "up",
    topChannels: ["farcaster", "x", "instagram"],
    lastMention: "5 min ago",
  },
  {
    id: "alert-2",
    keyword: "#web3creator",
    mentions: 890,
    sentiment: "positive",
    trend: "up",
    topChannels: ["farcaster", "lens"],
    lastMention: "12 min ago",
  },
  {
    id: "alert-3",
    keyword: "competitor mention",
    mentions: 450,
    sentiment: "neutral",
    trend: "stable",
    topChannels: ["x", "farcaster"],
    lastMention: "1 hour ago",
  },
];

export const listeningTopics: ListeningTopic[] = [
  {
    id: "topic-1",
    topic: "Web3 Creator Economy",
    volume: 15200,
    growth: 18.5,
    sentiment: 0.78,
    topInfluencers: ["@creator1", "@builder2", "@web3guru"],
    relatedKeywords: ["creator economy", "web3", "decentralized"],
  },
  {
    id: "topic-2",
    topic: "AI Content Tools",
    volume: 12400,
    growth: 24.2,
    sentiment: 0.82,
    topInfluencers: ["@aitools", "@contentai", "@creatortech"],
    relatedKeywords: ["AI", "content creation", "automation"],
  },
];

export const listeningStats = {
  totalMentions: 15680,
  avgSentiment: 0.75,
  topKeyword: "yourbrand",
  alertsActive: 12,
  topicsTracked: 8,
};


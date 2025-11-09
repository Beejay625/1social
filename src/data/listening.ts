export const listeningKeywords = [
  {
    id: "keyword-1",
    term: "yourbrand",
    mentions: 1240,
    sentiment: "positive",
    reach: 45000,
    lastMention: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: "keyword-2",
    term: "#yourhashtag",
    mentions: 890,
    sentiment: "neutral",
    reach: 32000,
    lastMention: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "keyword-3",
    term: "competitor brand",
    mentions: 2340,
    sentiment: "negative",
    reach: 78000,
    lastMention: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
];

export const recentMentions = [
  {
    id: "mention-1",
    author: "@user123",
    content: "Just tried @yourbrand and it's amazing!",
    platform: "farcaster",
    sentiment: "positive",
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    engagement: 45,
  },
  {
    id: "mention-2",
    author: "@user456",
    content: "When will @yourbrand support new features?",
    platform: "instagram",
    sentiment: "neutral",
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    engagement: 12,
  },
];

export const listeningAlerts = [
  {
    id: "alert-1",
    type: "spike",
    keyword: "yourbrand",
    message: "Mention spike detected: +250% in last hour",
    severity: "high",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: "alert-2",
    type: "sentiment",
    keyword: "yourbrand",
    message: "Negative sentiment detected",
    severity: "medium",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
];


export const helpCategories = [
  {
    id: "getting-started",
    name: "Getting Started",
    articles: 12,
    icon: "🚀",
  },
  {
    id: "publishing",
    name: "Publishing",
    articles: 24,
    icon: "📝",
  },
  {
    id: "analytics",
    name: "Analytics",
    articles: 18,
    icon: "📊",
  },
  {
    id: "integrations",
    name: "Integrations",
    articles: 15,
    icon: "🔌",
  },
  {
    id: "billing",
    name: "Billing",
    articles: 8,
    icon: "💳",
  },
];

export const popularArticles = [
  {
    id: "article-1",
    title: "How to connect your Farcaster account",
    category: "getting-started",
    views: 1240,
    helpful: 89,
  },
  {
    id: "article-2",
    title: "Scheduling posts across multiple platforms",
    category: "publishing",
    views: 980,
    helpful: 76,
  },
  {
    id: "article-3",
    title: "Understanding engagement metrics",
    category: "analytics",
    views: 756,
    helpful: 65,
  },
  {
    id: "article-4",
    title: "Setting up webhooks",
    category: "integrations",
    views: 542,
    helpful: 48,
  },
];

export const supportTickets = [
  {
    id: "ticket-1",
    subject: "Unable to publish to Instagram",
    status: "open",
    priority: "high",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    lastReply: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: "ticket-2",
    subject: "Question about API rate limits",
    status: "in-progress",
    priority: "medium",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    lastReply: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: "ticket-3",
    subject: "Feature request: Bulk editing",
    status: "closed",
    priority: "low",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    lastReply: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
];


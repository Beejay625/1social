import type { ChannelId } from "@/types/publishing";

export const searchFilters = {
  types: [
    { id: "all", label: "All content" },
    { id: "posts", label: "Posts" },
    { id: "assets", label: "Assets" },
    { id: "templates", label: "Templates" },
    { id: "campaigns", label: "Campaigns" },
  ],
  channels: [
    { id: "all", label: "All channels" },
    { id: "farcaster", label: "Farcaster" },
    { id: "instagram", label: "Instagram" },
    { id: "x", label: "X" },
    { id: "lens", label: "Lens" },
    { id: "mirror", label: "Mirror" },
  ],
  dateRanges: [
    { id: "all", label: "All time" },
    { id: "today", label: "Today" },
    { id: "week", label: "This week" },
    { id: "month", label: "This month" },
    { id: "quarter", label: "This quarter" },
  ],
};

export const recentSearches = [
  { query: "AMA announcement", count: 12, lastSearched: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
  { query: "product launch", count: 8, lastSearched: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
  { query: "creator spotlight", count: 15, lastSearched: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() },
];

export const savedSearches = [
  {
    id: "saved-1",
    name: "High-performing posts",
    query: "performance:excellent engagement:>20%",
    results: 24,
    lastRun: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: "saved-2",
    name: "Pending approvals",
    query: "status:pending approval:required",
    results: 8,
    lastRun: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: "saved-3",
    name: "This week's content",
    query: "date:this-week channel:farcaster,instagram",
    results: 32,
    lastRun: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
];

export const searchSuggestions = [
  { term: "engagement rate", category: "metrics" },
  { term: "scheduled posts", category: "content" },
  { term: "approval workflow", category: "workflow" },
  { term: "analytics dashboard", category: "reporting" },
  { term: "team members", category: "team" },
];



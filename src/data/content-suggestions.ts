export interface ContentSuggestion {
  id: string;
  type: "post" | "hashtag" | "time" | "content";
  title: string;
  description: string;
  category: string;
  priority: "high" | "medium" | "low";
  confidence: number;
}

export interface SuggestionCategory {
  id: string;
  name: string;
  count: number;
  color: string;
}

export const contentSuggestions: ContentSuggestion[] = [
  {
    id: "suggestion-1",
    type: "post",
    title: "Create product announcement post",
    description: "Based on your posting history, a product announcement would perform well",
    category: "Product",
    priority: "high",
    confidence: 92,
  },
  {
    id: "suggestion-2",
    type: "hashtag",
    title: "Add trending hashtags",
    description: "#web3creator and #decentralized are trending in your niche",
    category: "Engagement",
    priority: "medium",
    confidence: 78,
  },
  {
    id: "suggestion-3",
    type: "time",
    title: "Post at optimal time",
    description: "Tuesday 2 PM shows 25% higher engagement for your audience",
    category: "Optimization",
    priority: "high",
    confidence: 85,
  },
];

export const suggestionCategories: SuggestionCategory[] = [
  {
    id: "product",
    name: "Product",
    count: 12,
    color: "blue",
  },
  {
    id: "engagement",
    name: "Engagement",
    count: 8,
    color: "purple",
  },
  {
    id: "optimization",
    name: "Optimization",
    count: 15,
    color: "green",
  },
];

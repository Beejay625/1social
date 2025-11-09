export interface CalendarAISuggestion {
  id: string;
  type: "post" | "campaign" | "optimization" | "reminder";
  title: string;
  description: string;
  suggestedDate: string;
  suggestedTime: string;
  priority: "high" | "medium" | "low";
  reasoning: string;
  channels: string[];
}

export interface CalendarAIAnalysis {
  date: string;
  score: number;
  factors: {
    factor: string;
    impact: "positive" | "negative" | "neutral";
    description: string;
  }[];
}

export const calendarAISuggestions: CalendarAISuggestion[] = [
  {
    id: "suggestion-1",
    type: "post",
    title: "Product launch announcement",
    description: "Based on your audience activity, this would be optimal timing",
    suggestedDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(),
    suggestedTime: "14:00",
    priority: "high",
    reasoning: "Tuesday 2 PM shows 23% higher engagement for your audience",
    channels: ["farcaster", "instagram", "x"],
  },
  {
    id: "suggestion-2",
    type: "campaign",
    title: "Start Q2 campaign",
    description: "Optimal window for campaign launch based on competitor analysis",
    suggestedDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
    suggestedTime: "10:00",
    priority: "high",
    reasoning: "Low competition period with high audience availability",
    channels: ["farcaster", "instagram", "lens", "x"],
  },
  {
    id: "suggestion-3",
    type: "optimization",
    title: "Reschedule low-performing post",
    description: "Move this post to a better time slot",
    suggestedDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
    suggestedTime: "15:30",
    priority: "medium",
    reasoning: "Original time slot has 40% lower engagement potential",
    channels: ["instagram"],
  },
  {
    id: "suggestion-4",
    type: "reminder",
    title: "Engage with trending topic",
    description: "Join conversation about 'Web3 creator economy'",
    suggestedDate: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
    suggestedTime: "16:00",
    priority: "medium",
    reasoning: "Trending topic with 18.5% growth, relevant to your audience",
    channels: ["farcaster", "x"],
  },
];

export const calendarAIAnalysis: CalendarAIAnalysis[] = [
  {
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1).toISOString(),
    score: 85,
    factors: [
      {
        factor: "Day of week",
        impact: "positive",
        description: "Monday shows strong engagement for your content",
      },
      {
        factor: "Competitor activity",
        impact: "positive",
        description: "Low competition during this period",
      },
      {
        factor: "Audience availability",
        impact: "neutral",
        description: "Average audience online during this time",
      },
    ],
  },
  {
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(),
    score: 92,
    factors: [
      {
        factor: "Day of week",
        impact: "positive",
        description: "Tuesday is your best performing day",
      },
      {
        factor: "Historical performance",
        impact: "positive",
        description: "Similar posts performed 25% better on Tuesdays",
      },
      {
        factor: "Trend alignment",
        impact: "positive",
        description: "Aligns with trending topics in your niche",
      },
    ],
  },
];

export const calendarAIStats = {
  suggestionsAccepted: 45,
  suggestionsDeclined: 12,
  avgImprovement: 18,
  timeSaved: "12 hours",
};


export interface PerformanceInsight {
  id: string;
  type: "opportunity" | "strength" | "warning";
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  recommendation: string;
  metrics: {
    current: number;
    potential: number;
    improvement: number;
  };
  priority: number;
}

export const performanceInsights: PerformanceInsight[] = [
  {
    id: "insight-1",
    type: "opportunity",
    title: "Increase Posting Frequency",
    description: "Posting 3x per week could increase engagement by 25%",
    impact: "high",
    recommendation: "Schedule 3 additional posts per week during peak hours",
    metrics: {
      current: 5,
      potential: 8,
      improvement: 25,
    },
    priority: 1,
  },
  {
    id: "insight-2",
    type: "strength",
    title: "Strong Video Performance",
    description: "Video content performs 40% better than average",
    impact: "high",
    recommendation: "Continue creating video content, consider increasing video post ratio",
    metrics: {
      current: 8.5,
      potential: 10,
      improvement: 40,
    },
    priority: 2,
  },
  {
    id: "insight-3",
    type: "warning",
    title: "Declining Engagement Rate",
    description: "Engagement rate has decreased by 8% over the last month",
    impact: "medium",
    recommendation: "Review content strategy and audience targeting",
    metrics: {
      current: 5.2,
      potential: 5.7,
      improvement: -8,
    },
    priority: 3,
  },
];

export const insightStats = {
  totalInsights: 12,
  opportunities: 5,
  strengths: 4,
  warnings: 3,
  avgImpact: "medium",
  actionableInsights: 8,
};

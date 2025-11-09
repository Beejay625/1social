export interface IndustryBenchmark {
  industry: string;
  avgEngagementRate: number;
  avgReach: number;
  avgFollowers: number;
  avgPostingFrequency: number;
}

export interface BenchmarkComparison {
  metric: string;
  yourValue: number;
  industryAvg: number;
  percentile: number;
  status: "above" | "average" | "below";
}

export const industryBenchmarks: IndustryBenchmark[] = [
  {
    industry: "Technology",
    avgEngagementRate: 3.2,
    avgReach: 12500,
    avgFollowers: 45000,
    avgPostingFrequency: 4.2,
  },
  {
    industry: "SaaS",
    avgEngagementRate: 4.1,
    avgReach: 18900,
    avgFollowers: 67000,
    avgPostingFrequency: 5.1,
  },
  {
    industry: "Creator Economy",
    avgEngagementRate: 5.8,
    avgReach: 23400,
    avgFollowers: 89000,
    avgPostingFrequency: 6.3,
  },
];

export const benchmarkComparisons: BenchmarkComparison[] = [
  {
    metric: "Engagement Rate",
    yourValue: 4.8,
    industryAvg: 4.1,
    percentile: 75,
    status: "above",
  },
  {
    metric: "Average Reach",
    yourValue: 18900,
    industryAvg: 18900,
    percentile: 50,
    status: "average",
  },
  {
    metric: "Posting Frequency",
    yourValue: 5.2,
    industryAvg: 5.1,
    percentile: 55,
    status: "above",
  },
  {
    metric: "Response Time",
    yourValue: 2.5,
    industryAvg: 4.2,
    percentile: 85,
    status: "above",
  },
];

export const benchmarkInsights = [
  {
    id: "insight-1",
    type: "strength",
    title: "Strong engagement rate",
    description: "Your engagement rate is 17% above industry average",
    recommendation: "Continue current content strategy",
  },
  {
    id: "insight-2",
    type: "opportunity",
    title: "Increase posting frequency",
    description: "Posting 5.2x per week vs industry avg of 5.1x",
    recommendation: "Consider increasing to 6-7 posts per week",
  },
  {
    id: "insight-3",
    type: "strength",
    title: "Fast response time",
    description: "Average response time of 2.5 hours vs 4.2 hours industry avg",
    recommendation: "Maintain this excellent response rate",
  },
];


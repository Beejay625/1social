export interface EngagementScore {
  contentId: string;
  contentTitle: string;
  platform: string;
  qualityScore: number;
  quantityScore: number;
  overallScore: number;
  factors: ScoreFactor[];
  publishedAt: string;
}

export interface ScoreFactor {
  name: string;
  weight: number;
  score: number;
  impact: "positive" | "negative" | "neutral";
}

export const engagementScores: EngagementScore[] = [
  {
    contentId: "post-1",
    contentTitle: "Product Launch Announcement",
    platform: "farcaster",
    qualityScore: 85,
    quantityScore: 78,
    overallScore: 82,
    factors: [
      {
        name: "Comment Quality",
        weight: 0.3,
        score: 88,
        impact: "positive",
      },
      {
        name: "Share Rate",
        weight: 0.25,
        score: 82,
        impact: "positive",
      },
      {
        name: "Response Time",
        weight: 0.2,
        score: 75,
        impact: "neutral",
      },
      {
        name: "Engagement Depth",
        weight: 0.25,
        score: 85,
        impact: "positive",
      },
    ],
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    contentId: "post-2",
    contentTitle: "Tutorial Video",
    platform: "instagram",
    qualityScore: 72,
    quantityScore: 89,
    overallScore: 79,
    factors: [
      {
        name: "Comment Quality",
        weight: 0.3,
        score: 70,
        impact: "neutral",
      },
      {
        name: "Share Rate",
        weight: 0.25,
        score: 95,
        impact: "positive",
      },
      {
        name: "Response Time",
        weight: 0.2,
        score: 65,
        impact: "negative",
      },
      {
        name: "Engagement Depth",
        weight: 0.25,
        score: 75,
        impact: "neutral",
      },
    ],
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

export const engagementScoreStats = {
  avgQualityScore: 78.5,
  avgQuantityScore: 83.5,
  avgOverallScore: 80.5,
  topScoringContent: "Product Launch Announcement",
  improvementAreas: ["Response Time", "Comment Quality"],
};

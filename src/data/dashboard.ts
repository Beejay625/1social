import type {
  BestTimeSlot,
  ConversionStage,
  GrowthPoint,
  InsightRecommendation,
  MetricInsight,
  MetricKpi,
  MetricKpiId,
  ReachConversionPoint,
} from "@/types/publishing";

export const audienceDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

export const bestTimeGrid: BestTimeSlot[] = [
  { slot: "Morning", values: [3, 4, 4, 5, 5, 3, 2] },
  { slot: "Midday", values: [4, 5, 5, 5, 4, 4, 3] },
  { slot: "Evening", values: [5, 5, 4, 3, 3, 5, 5] },
];

export const insightRecommendations: InsightRecommendation[] = [
  {
    id: "rec-1",
    title: "Leverage reels on Friday evenings",
    detail: "Engagement index peaks at 92 for Instagram around 6-8pm UTC.",
  },
  {
    id: "rec-2",
    title: "Double down on Farcaster threads midweek",
    detail: "Follower velocity up 18% on Wednesdays after lunchtime posts.",
  },
  {
    id: "rec-3",
    title: "Sync creator shout-outs",
    detail: "Shared Farcaster + Instagram drops outperform single-channel by 34%.",
  },
];

export const metricKpiSeed: MetricKpi[] = [
  {
    id: "reach",
    label: "Total reach",
    value: 182,
    unit: "k",
    delta: 14,
    deltaLabel: "vs last 7 days",
    trend: [138, 146, 152, 164, 175, 182],
  },
  {
    id: "conversion",
    label: "Conversion rate",
    value: 3.4,
    unit: "%",
    delta: 0.6,
    deltaLabel: "vs last launch",
    trend: [2.4, 2.7, 2.9, 3.1, 3.2, 3.4],
  },
  {
    id: "growth",
    label: "Audience growth",
    value: 26,
    unit: "score",
    delta: 8,
    deltaLabel: "vs rolling avg",
    trend: [14, 16, 18, 19, 22, 26],
  },
];

export const reachConversionTrend: ReachConversionPoint[] = [
  { label: "Mon", reach: 24, conversionRate: 2.6, conversions: 102 },
  { label: "Tue", reach: 28, conversionRate: 2.9, conversions: 114 },
  { label: "Wed", reach: 32, conversionRate: 3.2, conversions: 128 },
  { label: "Thu", reach: 36, conversionRate: 3.4, conversions: 142 },
  { label: "Fri", reach: 41, conversionRate: 3.9, conversions: 160 },
  { label: "Sat", reach: 38, conversionRate: 3.5, conversions: 149 },
  { label: "Sun", reach: 31, conversionRate: 3.1, conversions: 134 },
];

export const growthMomentumTrend: GrowthPoint[] = [
  { label: "Week 1", farcaster: 42, instagram: 54, total: 96 },
  { label: "Week 2", farcaster: 48, instagram: 59, total: 107 },
  { label: "Week 3", farcaster: 51, instagram: 63, total: 114 },
  { label: "Week 4", farcaster: 57, instagram: 68, total: 125 },
];

export const conversionStages: ConversionStage[] = [
  { id: "reach", label: "Reach", value: 18200, delta: 12 },
  { id: "engaged", label: "Engaged", value: 9600, delta: 9 },
  { id: "clicks", label: "Link clicks", value: 4100, delta: 6 },
  { id: "conversions", label: "Conversions", value: 1280, delta: 3 },
];

export const metricInsightPool: MetricInsight[] = [
  {
    id: "insight-reach",
    headline: "Reach momentum is accelerating",
    detail:
      "Total reach has grown 14% week-over-week. Queue a weekend teaser to capitalise on the Friday surge.",
    metric: "reach" as MetricKpiId,
  },
  {
    id: "insight-conversion",
    headline: "Conversion rate uplift",
    detail:
      "Conversion rate climbed by 0.6 pts after running Reown wallet prompts inline with the composer.",
    metric: "conversion" as MetricKpiId,
  },
  {
    id: "insight-growth",
    headline: "Audience compound growth",
    detail:
      "Audience growth score is up 8 pts. Schedule a midweek AMA to keep Farcaster growth compounding.",
    metric: "growth" as MetricKpiId,
  },
];


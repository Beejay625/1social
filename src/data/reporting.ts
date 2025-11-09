import type {
  ReportingAlert,
  ReportingAlertCategory,
  ReportingBenchmarkRow,
  ReportingExecMetric,
  ReportingGoal,
  ReportingVarianceBreakdown,
} from "@/types/publishing";

export const reportingExecMetrics: ReportingExecMetric[] = [
  {
    id: "exec-reach",
    label: "Net new reach",
    primary: "1.8M",
    delta: "+12% WoW",
    summary: "Primarily driven by Farcaster mirrors and Lens boosts.",
    gradient: "from-purple-500 via-fuchsia-500 to-rose-500",
  },
  {
    id: "exec-engagement",
    label: "Cross-network engagement",
    primary: "26.4%",
    delta: "+3.2 pts",
    summary: "Instagram saves and Lens comments posted their highest week yet.",
    gradient: "from-sky-500 via-cyan-500 to-emerald-400",
  },
  {
    id: "exec-retention",
    label: "Returning creators",
    primary: "74%",
    delta: "+6 pts",
    summary: "Warm-up sequences helped Lens and Mirror keep high-intent talent.",
    gradient: "from-amber-400 via-orange-400 to-pink-500",
  },
];

export const reportingVarianceBreakdowns: ReportingVarianceBreakdown[] = [
  {
    id: "variance-reach",
    dimension: "Reach variance map",
    range: "Last 30 days vs prior 30",
    items: [
      { label: "Farcaster OGs", variance: "+18%", contribution: 0.32 },
      { label: "Instagram carousel", variance: "+11%", contribution: 0.24 },
      { label: "Lens collectors", variance: "+9%", contribution: 0.18 },
      { label: "X threads", variance: "+4%", contribution: 0.15 },
      { label: "Mirror essays", variance: "+2%", contribution: 0.11 },
    ],
  },
  {
    id: "variance-engagement",
    dimension: "Engagement variance",
    range: "Last 14 days vs baseline",
    items: [
      { label: "Comments", variance: "+5.1 pts", contribution: 0.33 },
      { label: "Saves", variance: "+3.4 pts", contribution: 0.27 },
      { label: "Reposts", variance: "+2.7 pts", contribution: 0.22 },
      { label: "Reactions", variance: "+1.4 pts", contribution: 0.12 },
      { label: "Clickthrough", variance: "+0.8 pts", contribution: 0.06 },
    ],
  },
];

export const reportingBenchmarkMatrix: ReportingBenchmarkRow[] = [
  {
    channel: "farcaster",
    yourScore: 89,
    cohort: 78,
    percentile: "92nd",
  },
  {
    channel: "instagram",
    yourScore: 83,
    cohort: 80,
    percentile: "88th",
  },
  {
    channel: "x",
    yourScore: 74,
    cohort: 77,
    percentile: "61st",
  },
  {
    channel: "lens",
    yourScore: 91,
    cohort: 70,
    percentile: "96th",
  },
  {
    channel: "mirror",
    yourScore: 68,
    cohort: 72,
    percentile: "54th",
  },
];

export const reportingGoalProgress: ReportingGoal[] = [
  {
    id: "goal-reach",
    title: "Reach 2M weekly impressions",
    target: 2000000,
    current: 1785000,
    due: "In 9 days",
    owner: "Kai",
  },
  {
    id: "goal-contributors",
    title: "Activate 25 creator contributors",
    target: 25,
    current: 19,
    due: "In 14 days",
    owner: "Ameena",
  },
  {
    id: "goal-retention",
    title: "Hold retention above 70%",
    target: 70,
    current: 74,
    due: "This cycle",
    owner: "Leo",
  },
];

export const reportingAlertFilters = [
  { id: "all", label: "All alerts" },
  { id: "positive", label: "Positive trend" },
  { id: "risk", label: "Risks" },
  { id: "ops", label: "Ops" },
];

export const reportingAlertFeed: ReportingAlert[] = [
  {
    id: "alert-1",
    category: "positive",
    title: "Farcaster reach beat target by 12%",
    detail: "Three partner mirrors stacked boosts. Consider upgrading syndication rights.",
    timestamp: "12 min ago",
    action: "Open deck",
  },
  {
    id: "alert-2",
    category: "risk",
    title: "Instagram saves slipping vs target",
    detail: "Content mix shifted to motion reels. Flagging for creative QA tomorrow.",
    timestamp: "34 min ago",
    action: "Assign owner",
  },
  {
    id: "alert-3",
    category: "ops",
    title: "CSV exports skipped S3 archival",
    detail: "Daily automation hit rate limit. Re-run export to keep data sync for RevOps.",
    timestamp: "1 hr ago",
    action: "Retry sync",
  },
];


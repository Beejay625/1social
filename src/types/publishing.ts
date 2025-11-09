export type ChannelId = "farcaster" | "instagram" | "x" | "lens" | "mirror";

export type SocialPost = {
  id: string;
  author: string;
  avatarGradient: string;
  content: string;
  highlight?: string;
  channels: ChannelId[];
  createdAt: string;
};

export type ApprovalStatus = "pending" | "approved" | "changes";

export type StepEscalation = {
  notifyAfterHours: number;
  routeTo: string;
  fallback: string;
  triggeredAt?: string;
};

export type ApprovalStep = {
  id: string;
  label: string;
  approver: string;
  status: ApprovalStatus;
  due: string;
  escalation?: StepEscalation;
};

export type Comment = {
  id: string;
  author: string;
  message: string;
  at: string;
  tone?: "note" | "mention";
};

export type PlannedPostStatus = "queued" | "draft" | "approved";

export type PlannedPost = {
  id: string;
  title: string;
  summary: string;
  scheduledFor: string;
  channels: ChannelId[];
  status: PlannedPostStatus;
  owner: string;
  approvalSteps: ApprovalStep[];
  commentThread: Comment[];
  approvalTemplateId?: string;
};

export type MetricUnit = "k" | "%" | "score";

export type MetricKpiId = "reach" | "conversion" | "growth";

export type MetricKpi = {
  id: MetricKpiId;
  label: string;
  value: number;
  unit: MetricUnit;
  delta: number;
  deltaLabel: string;
  trend: number[];
};

export type ReachConversionPoint = {
  label: string;
  reach: number;
  conversionRate: number;
  conversions: number;
};

export type GrowthPoint = {
  label: string;
  farcaster: number;
  instagram: number;
  total: number;
};

export type ConversionStage = {
  id: string;
  label: string;
  value: number;
  delta: number;
};

export type PresenceStatus = "drafting" | "reviewing" | "approving" | "observing";

export type PresenceMember = {
  id: string;
  name: string;
  role: string;
  status: PresenceStatus;
  focus: string;
};

export type ApprovalRoute = {
  id: string;
  stage: string;
  owners: string[];
  fallback: string;
};

export type ApprovalTemplateStep = {
  id: string;
  label: string;
  approver: string;
  dueOffsetHours: number;
  escalation?: Omit<StepEscalation, "triggeredAt">;
};

export type ApprovalTemplate = {
  id: string;
  name: string;
  description: string;
  summary: string;
  steps: ApprovalTemplateStep[];
};

export type RepostEventStatus = "mirroring" | "queued" | "complete";

export type RepostEvent = {
  id: string;
  source: ChannelId;
  targets: ChannelId[];
  scheduledFor: string;
  status: RepostEventStatus;
};

export type SyndicationEntry = {
  id: string;
  title: string;
  timestamp: string;
  networks: ChannelId[];
  effect: string;
};

export type AutomationTemplate = {
  id: string;
  name: string;
  description: string;
  channels: ChannelId[];
  cadence: string;
  duration: string;
};

export type WarmupHealth = "excellent" | "steady" | "watch";

export type WarmupProgram = {
  id: string;
  title: string;
  health: WarmupHealth;
  score: number;
  nextAction: string;
};

export type SequenceStatus = "active" | "paused" | "draft";

export type SequencePlay = {
  id: string;
  label: string;
  steps: number;
  window: string;
  status: SequenceStatus;
};

export type BenchmarkMetric = {
  id: string;
  label: string;
  farcaster: number;
  instagram: number;
  cohort: number;
};

export type SentimentSample = {
  id: string;
  segment: string;
  positive: number;
  neutral: number;
  negative: number;
  highlight: string;
};

export type RetentionStage = {
  id: string;
  stage: string;
  rate: number;
  note: string;
};

export type AssetItemType = "image" | "video" | "doc";

export type AssetItem = {
  id: string;
  title: string;
  type: AssetItemType;
  owner: string;
  updatedAt: string;
  accent: string;
};

export type VersionStatus = "live" | "queued" | "archived";

export type VersionEntry = {
  id: string;
  author: string;
  summary: string;
  timestamp: string;
  status: VersionStatus;
};

export type CalendarImpact = "spotlight" | "boost" | "check-in";

export type CalendarSlot = {
  id: string;
  label: string;
  day: string;
  time: string;
  owner: string;
  channels: ChannelId[];
  impact: CalendarImpact;
};

export type AudienceTrendPoint = {
  day: string;
  farcaster: number;
  instagram: number;
};

export type AiToneOption = {
  id: string;
  label: string;
  description: string;
};

export type AiPersona = {
  id: string;
  label: string;
  summary: string;
};

export type AiDraftIdea = {
  id: string;
  headline: string;
  snippet: string;
};

export type AiSmartReply = {
  id: string;
  channel: ChannelId;
  author: string;
  message: string;
  suggestion: string;
};

export type AiActivityLogEntry = {
  id: string;
  action: string;
  detail: string;
  timestamp: string;
};

export type ReportingExecMetric = {
  id: string;
  label: string;
  primary: string;
  delta: string;
  summary: string;
  gradient: string;
};

export type VarianceItem = {
  label: string;
  variance: string;
  contribution: number;
};

export type ReportingVarianceBreakdown = {
  id: string;
  dimension: string;
  range: string;
  items: VarianceItem[];
};

export type ReportingBenchmarkRow = {
  channel: ChannelId;
  yourScore: number;
  cohort: number;
  percentile: string;
};

export type ReportingGoal = {
  id: string;
  title: string;
  target: number;
  current: number;
  due: string;
  owner: string;
};

export type ReportingAlertCategory = "positive" | "risk" | "ops";

export type ReportingAlert = {
  id: string;
  category: ReportingAlertCategory;
  title: string;
  detail: string;
  timestamp: string;
  action: string;
};

export type IntelligenceForecast = {
  id: string;
  metric: string;
  current: string;
  predicted: string;
  timeframe: string;
  confidence: number;
  factors: string[];
};

export type AnomalyType = "Spike" | "Dip";

export type IntelligenceAnomaly = {
  id: string;
  type: AnomalyType;
  channel: ChannelId;
  metric: string;
  deviation: string;
  detectedAt: string;
  explanation: string;
};

export type ContentHashtag = {
  tag: string;
  trend: "up" | "down" | "stable";
  usage: number;
  growth: string;
};

export type ContentRecommendation = {
  id: string;
  type: string;
  suggestion: string;
  impact: "High" | "Medium" | "Low";
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  gradient: string;
  permissions: string[];
  lastActive: string;
};

export type TeamActivityEntry = {
  id: string;
  member: string;
  action: string;
  target: string;
  timestamp: string;
};

export type IntegrationStatus = "connected" | "available" | "pending";

export type Integration = {
  id: string;
  name: string;
  description: string;
  status: IntegrationStatus;
  icon: string;
};

export type AbTestVariant = {
  id: string;
  label: string;
  description: string;
  performance: number;
  participants: number;
  winner?: boolean;
};

export type AbTest = {
  id: string;
  title: string;
  status: "running" | "completed" | "draft";
  variants: AbTestVariant[];
  startDate: string;
  endDate?: string;
  metric: string;
};

export type Campaign = {
  id: string;
  name: string;
  status: "active" | "paused" | "completed";
  channels: ChannelId[];
  startDate: string;
  endDate?: string;
  reach: number;
  engagement: number;
  conversions: number;
  budget?: number;
  spent?: number;
};

export type ContentTemplate = {
  id: string;
  name: string;
  description: string;
  category: string;
  channels: ChannelId[];
  preview: string;
  usage: number;
};

export type Webhook = {
  id: string;
  name: string;
  url: string;
  events: string[];
  status: "active" | "inactive";
  lastTriggered?: string;
};

export type Notification = {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
};

export type Competitor = {
  id: string;
  name: string;
  handle: string;
  channels: ChannelId[];
  followers: number;
  growth: number;
  engagement: number;
};

export type TrendTopic = {
  id: string;
  topic: string;
  volume: number;
  growth: number;
  sentiment: "positive" | "neutral" | "negative";
  relatedChannels: ChannelId[];
};

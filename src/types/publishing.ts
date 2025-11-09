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

export type InsightRecommendation = {
  id: string;
  title: string;
  detail: string;
};

export type BestTimeSlot = {
  slot: string;
  values: number[];
};

export type MetricInsight = {
  id: string;
  headline: string;
  detail: string;
  metric: MetricKpiId;
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

export type AiActivityEntry = {
  id: string;
  action: string;
  detail: string;
  timestamp: string;
};


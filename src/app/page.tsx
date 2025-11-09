'use client';

import { networks } from "@/config";
import { appKitModal } from "@/context";
import { channelCatalog } from "@/constants/channelCatalog";
import { 
  approvalStatusTokens,
  impactTokens,
  presenceStatusTokens,
  repostStatusTokens,
  scheduleStatusStyles,
  sequenceStatusTokens,
  warmupHealthTokens,
} from "@/constants/statusTokens";
import {
  audienceDays,
  audienceTrendSeries,
  bestTimeGrid,
  conversionStages,
  growthMomentumTrend,
  insightRecommendations,
  metricInsightPool,
  metricKpiSeed,
  reachConversionTrend,
} from "@/data/dashboard";
import { aiActivityLog, aiDraftIdeas, aiPersonas, aiSmartReplies, aiToneOptions } from "@/data/ai";
import {
  abTests,
  campaigns,
  competitors,
  contentTemplates,
  notifications,
  trendTopics,
  webhooks,
} from "@/data/features";
import {
  contentHashtags,
  contentRecommendations,
  intelligenceAnomalies,
  intelligenceForecasts,
} from "@/data/intelligence";
import { integrationsAvailable } from "@/data/integrations";
import {
  reportingAlertFeed,
  reportingAlertFilters,
  reportingBenchmarkMatrix,
  reportingExecMetrics,
  reportingGoalProgress,
  reportingVarianceBreakdowns,
} from "@/data/reporting";
import { teamActivityLog, teamMembers } from "@/data/team";
import {
  audienceSegments,
  channelPerformance,
  sentimentHistory,
  topPerformers,
} from "@/data/analytics";
import {
  collaborationChecklists,
  collaborationHandoffs,
  collaborationMentions,
  realTimeActivity,
} from "@/data/collaboration";
import {
  contentLibrary,
  contentPerformanceData,
  contentVersions,
  workflowAutomationRules,
} from "@/data/content";
import {
  exportFormats,
  exportHistory,
  importSources,
} from "@/data/export";
import {
  activeSessions,
  securityLogs,
  securitySettings,
} from "@/data/security";
import {
  billingPlans,
  invoiceHistory,
  usageMetrics,
} from "@/data/billing";
import {
  helpCategories,
  popularArticles,
  supportTickets,
} from "@/data/help";
import {
  releases,
  upcomingFeatures,
} from "@/data/changelog";
import {
  mobileApps,
  mobileFeatures,
  deviceStats,
} from "@/data/mobile";
import {
  brandAssets,
  brandGuidelines,
  brandUsage,
} from "@/data/brand";
import {
  backupHistory,
  backupSchedules,
  restorePoints,
} from "@/data/backup";
import { truncateAddress, velocityBadge } from "@/utils/account";
import { buildSparklinePath, heatLevelClass } from "@/utils/charts";
import { formatMetricDelta, formatMetricValue, metricDeltaTone } from "@/utils/metrics";
import { percentWidthClass, pickProgressWidthClass, scoreWidthClass } from "@/utils/progress";
import { formatRelativeTime, formatScheduleLabel, formatTimeUntil } from "@/utils/time";
import { useEffect, useMemo, useState } from "react";
import { useAccount, useChainId, useDisconnect } from "wagmi";
import type {
  ApprovalRoute,
  ApprovalStatus,
  ApprovalStep,
  ApprovalTemplate,
  AssetItem,
  AutomationTemplate,
  BenchmarkMetric,
  CalendarSlot,
  ChannelId,
  Comment,
  ConversionStage,
  GrowthPoint,
  MetricKpi,
  MetricKpiId,
  MetricUnit,
  PlannedPost,
  PresenceMember,
  PresenceStatus,
  ReachConversionPoint,
  RepostEvent,
  RetentionStage,
  SequencePlay,
  SentimentSample,
  SocialPost,
  SyndicationEntry,
  VersionEntry,
  WarmupProgram,
} from "@/types/publishing";

const initialPosts: SocialPost[] = [
  {
    id: "launch-1",
    author: "Ameena O.",
    avatarGradient: "from-fuchsia-400 via-purple-500 to-sky-400",
    highlight: "Morning drop from the product pod",
    content:
      "Rolled out the refreshed onboarding flow. Seeing a 19% lift in completion. Sharing the story across Farcaster and Instagram highlights today.",
    channels: ["farcaster", "instagram"],
    createdAt: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
  },
  {
    id: "growth-2",
    author: "Leo F.",
    avatarGradient: "from-emerald-300 via-teal-400 to-cyan-400",
    highlight: "Community pulse",
    content:
      "Farcaster crew loved the behind-the-scenes reel. Scheduling the next creator AMA for tomorrow.",
    channels: ["farcaster"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: "growth-3",
    author: "Kai L.",
    avatarGradient: "from-amber-300 via-orange-500 to-rose-500",
    highlight: "Design diary",
    content:
      "Experimented with carousel storytelling for the roadmap update. Instagram engagement is pacing +24% week over week.",
    channels: ["instagram"],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 7).toISOString(),
  },
  {
    id: "growth-4",
    author: "You",
    avatarGradient: "from-slate-400 via-slate-600 to-slate-800",
    highlight: "Cross-network sync",
    content:
      "Testing the new Lens + X syndication path. Warm-up health looks strong so far.",
    channels: ["x", "lens"],
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
];

const initialPlannedPosts: PlannedPost[] = (() => {
  const plan1ScheduledFor = new Date(Date.now() + 1000 * 60 * 60 * 5).toISOString();
  const plan1Template = getApprovalTemplate("multi-channel-launch");
  const plan1Steps = plan1Template
    ? instantiateApprovalSteps(plan1Template, plan1ScheduledFor, "plan-1")
    : [
        {
          id: "strategy-plan-1",
          label: "Channel strategy",
          approver: "Kai",
          status: "approved" as ApprovalStatus,
          due: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        },
        {
          id: "creative-plan-1",
          label: "Creative polish",
          approver: "Leo",
          status: "approved" as ApprovalStatus,
          due: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        },
      ];

  const plan2ScheduledFor = new Date(Date.now() + 1000 * 60 * 60 * 28).toISOString();
  const plan2Template = getApprovalTemplate("creative-spotlight");
  const plan2Steps = plan2Template
    ? instantiateApprovalSteps(plan2Template, plan2ScheduledFor, "plan-2")
    : [
        {
          id: "outline-plan-2",
          label: "Outline review",
          approver: "Ameena",
          status: "pending" as ApprovalStatus,
          due: new Date(Date.now() + 1000 * 60 * 60 * 4).toISOString(),
        },
        {
          id: "design-plan-2",
          label: "Design QA",
          approver: "Leo",
          status: "pending" as ApprovalStatus,
          due: new Date(Date.now() + 1000 * 60 * 60 * 10).toISOString(),
        },
      ];

  const plan3ScheduledFor = new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString();
  const plan3Template = getApprovalTemplate("creative-spotlight");
  const plan3Steps = plan3Template
    ? instantiateApprovalSteps(plan3Template, plan3ScheduledFor, "plan-3")
    : [
        {
          id: "story-plan-3",
          label: "Story arc",
          approver: "Ameena",
          status: "changes" as ApprovalStatus,
          due: new Date(Date.now() + 1000 * 60 * 60 * 6).toISOString(),
        },
        {
          id: "audio-plan-3",
          label: "Audio sync",
          approver: "Kai",
          status: "pending" as ApprovalStatus,
          due: new Date(Date.now() + 1000 * 60 * 60 * 20).toISOString(),
        },
      ];

  const plan4ScheduledFor = new Date(Date.now() + 1000 * 60 * 60 * 12).toISOString();
  const plan4Template = getApprovalTemplate("post-launch-measure");
  const plan4Steps = plan4Template
    ? instantiateApprovalSteps(plan4Template, plan4ScheduledFor, "plan-4")
    : [
        {
          id: "mirror-proof-plan-4",
          label: "Proofread essay",
          approver: "Kai",
          status: "pending" as ApprovalStatus,
          due: new Date(Date.now() + 1000 * 60 * 60 * 4).toISOString(),
        },
        {
          id: "thread-sync-plan-4",
          label: "Thread alignment",
          approver: "Ameena",
          status: "pending" as ApprovalStatus,
          due: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString(),
        },
      ];

  return [
    {
      id: "plan-1",
      title: "Founder AMA teaser",
      summary: "Carousel introducing tomorrow's community AMA.",
      scheduledFor: plan1ScheduledFor,
      channels: ["farcaster", "instagram"],
      status: "approved",
      owner: "Ameena",
      approvalSteps: plan1Steps,
      approvalTemplateId: plan1Template?.id,
      commentThread: [
        {
          id: "comment-plan-1-1",
          author: "Kai",
          message: "Carousel cover looks sharp. Added final copy tweaks.",
          at: new Date(Date.now() - 1000 * 60 * 32).toISOString(),
          tone: "note",
        },
        {
          id: "comment-plan-1-2",
          author: "Leo",
          message: "Uploaded motion version to the asset locker.",
          at: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
          tone: "mention",
        },
      ],
    },
    {
      id: "plan-2",
      title: "Design drops recap",
      summary: "Thread covering the remix design sprint learnings.",
      scheduledFor: plan2ScheduledFor,
      channels: ["farcaster"],
      status: "queued",
      owner: "Kai",
      approvalSteps: plan2Steps,
      approvalTemplateId: plan2Template?.id,
      commentThread: [
        {
          id: "comment-plan-2-1",
          author: "Ameena",
          message: "Need designer sign-off before 6PM.",
          at: new Date(Date.now() - 1000 * 60 * 75).toISOString(),
          tone: "mention",
        },
      ],
    },
    {
      id: "plan-3",
      title: "Creator highlight reel",
      summary: "Vertical reel featuring three community wins.",
      scheduledFor: plan3ScheduledFor,
      channels: ["instagram"],
      status: "draft",
      owner: "Leo",
      approvalSteps: plan3Steps.map((step, index) =>
        index === 0
          ? { ...step, status: "changes" as ApprovalStatus }
          : step,
      ),
      approvalTemplateId: plan3Template?.id,
      commentThread: [
        {
          id: "comment-plan-3-1",
          author: "Leo",
          message: "Pull new community shots for reel slots 2 and 3.",
          at: new Date(Date.now() - 1000 * 60 * 145).toISOString(),
          tone: "note",
        },
      ],
    },
    {
      id: "plan-4",
      title: "Syndication rollout",
      summary: "Mirror essay with X recap thread to follow.",
      scheduledFor: plan4ScheduledFor,
      channels: ["mirror", "x"],
      status: "queued",
      owner: "You",
      approvalSteps: plan4Steps,
      approvalTemplateId: plan4Template?.id,
      commentThread: [
        {
          id: "comment-plan-4-1",
          author: "Ameena",
          message: "Need to sync CTA copy with Lens drop.",
          at: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
          tone: "mention",
        },
      ],
    },
  ];
})();

const automationTemplates: AutomationTemplate[] = [
  {
    id: "launch-cadence",
    name: "Launch cadence",
    description: "3-part tease, launch, recap flow across Farcaster, Instagram & X.",
    channels: ["farcaster", "instagram", "x"],
    cadence: "3 drops in 48h",
    duration: "2 days",
  },
  {
    id: "creator-spotlight",
    name: "Creator spotlight",
    description: "Weekly spotlight featuring community wins across Instagram and Lens.",
    channels: ["instagram", "lens"],
    cadence: "1 drop per week",
    duration: "4 weeks",
  },
  {
    id: "farcaster-thread",
    name: "Farcaster threadstorm",
    description: "Deep-dive threads paired with Mirror collect recaps and Lens follow-ups.",
    channels: ["farcaster", "mirror", "lens"],
    cadence: "Thread + AMA",
    duration: "3 days",
  },
];

const warmupPrograms: WarmupProgram[] = [
  {
    id: "growth-track",
    title: "Growth track warm-up",
    health: "excellent",
    score: 92,
    nextAction: "Queue creator DM invites",
  },
  {
    id: "re-engage",
    title: "Re-engage cohort",
    health: "steady",
    score: 78,
    nextAction: "Schedule reminder drop",
  },
  {
    id: "new-subs",
    title: "New subscriber primer",
    health: "watch",
    score: 63,
    nextAction: "Refresh welcome template assets",
  },
];

const sequencePlays: SequencePlay[] = [
  {
    id: "sequence-1",
    label: "Launch runway",
    steps: 4,
    window: "7 days",
    status: "active",
  },
  {
    id: "sequence-2",
    label: "Creator drip",
    steps: 3,
    window: "14 days",
    status: "paused",
  },
  {
    id: "sequence-3",
    label: "Community nurture",
    steps: 5,
    window: "21 days",
    status: "draft",
  },
];

const benchmarkMetrics: BenchmarkMetric[] = [
  {
    id: "engagement",
    label: "Avg engagement / post",
    farcaster: 18,
    instagram: 26,
    cohort: 14,
  },
  {
    id: "reach",
    label: "Audience reach %",
    farcaster: 42,
    instagram: 48,
    cohort: 33,
  },
  {
    id: "save-rate",
    label: "Save rate %",
    farcaster: 8,
    instagram: 21,
    cohort: 9,
  },
];

const sentimentSamples: SentimentSample[] = [
  {
    id: "builders",
    segment: "Builders",
    positive: 64,
    neutral: 27,
    negative: 9,
    highlight: "High praise for roadmap clarity.",
  },
  {
    id: "creators",
    segment: "Creators",
    positive: 53,
    neutral: 31,
    negative: 16,
    highlight: "Requests for more behind-the-scenes.",
  },
  {
    id: "collectors",
    segment: "Collectors",
    positive: 48,
    neutral: 39,
    negative: 13,
    highlight: "Watching token integrations closely.",
  },
];

const retentionStages: RetentionStage[] = [
  {
    id: "stage-aware",
    stage: "Aware",
    rate: 92,
    note: "+6% WoW via multi-channel launches",
  },
  {
    id: "stage-engage",
    stage: "Engaged",
    rate: 74,
    note: "Creators reels lifted engagement",
  },
  {
    id: "stage-advocate",
    stage: "Advocate",
    rate: 38,
    note: "Warm-up sequences fueling referrals",
  },
];

const assetLibrary: AssetItem[] = [
  {
    id: "asset-1",
    title: "AMA carousel v2",
    type: "image",
    owner: "Ameena",
    updatedAt: "2h ago",
    accent: "from-purple-400 via-fuchsia-500 to-rose-400",
  },
  {
    id: "asset-2",
    title: "Founder AMA recap",
    type: "video",
    owner: "Leo",
    updatedAt: "6h ago",
    accent: "from-sky-400 via-cyan-400 to-emerald-400",
  },
  {
    id: "asset-3",
    title: "Community stats one-pager",
    type: "doc",
    owner: "Kai",
    updatedAt: "1d ago",
    accent: "from-amber-400 via-orange-400 to-pink-400",
  },
  {
    id: "asset-4",
    title: "Creator testimonials cut",
    type: "video",
    owner: "You",
    updatedAt: "3d ago",
    accent: "from-indigo-400 via-purple-400 to-teal-400",
  },
];

const versionHistory: VersionEntry[] = [
  {
    id: "version-1",
    author: "Kai",
    summary: "Adjusted CTA messaging pre-launch.",
    timestamp: "Today • 13:20 UTC",
    status: "live",
  },
  {
    id: "version-2",
    author: "Leo",
    summary: "Updated hero animation assets.",
    timestamp: "Today • 09:05 UTC",
    status: "queued",
  },
  {
    id: "version-3",
    author: "Ameena",
    summary: "Archived v1 onboarding flow copy.",
    timestamp: "Yesterday • 18:41 UTC",
    status: "archived",
  },
];

const calendarSlots: CalendarSlot[] = [
  {
    id: "cal-1",
    label: "Creator AMA warm-up",
    day: "Tue",
    time: "10:00",
    owner: "Ameena",
    channels: ["farcaster"],
    impact: "boost",
  },
  {
    id: "cal-2",
    label: "Launch sync reel",
    day: "Thu",
    time: "14:00",
    owner: "Leo",
    channels: ["instagram"],
    impact: "spotlight",
  },
  {
    id: "cal-3",
    label: "Community pulse thread",
    day: "Sat",
    time: "11:00",
    owner: "Kai",
    channels: ["farcaster"],
    impact: "check-in",
  },
];

const teamPresenceRoster: PresenceMember[] = [
  {
    id: "presence-1",
    name: "Ameena",
    role: "Product lead",
    status: "drafting",
    focus: "Polishing launch recap",
  },
  {
    id: "presence-2",
    name: "Leo",
    role: "Creative",
    status: "reviewing",
    focus: "Checking hero animation loop",
  },
  {
    id: "presence-3",
    name: "Kai",
    role: "Community",
    status: "approving",
    focus: "Routing feedback to founders",
  },
  {
    id: "presence-4",
    name: "You",
    role: "Ops",
    status: "observing",
    focus: "Monitoring warm-up health",
  },
];

const approvalRoutes: ApprovalRoute[] = [
  {
    id: "route-1",
    stage: "Awareness",
    owners: ["Ameena", "Kai"],
    fallback: "Route to You if unresponsive",
  },
  {
    id: "route-2",
    stage: "Creative QA",
    owners: ["Leo"],
    fallback: "Escalate to @design-lead",
  },
  {
    id: "route-3",
    stage: "Wallet signing",
    owners: ["You"],
    fallback: "Ping #wallet-ops",
  },
];

const approvalRoutesById = approvalRoutes.reduce<Record<string, ApprovalRoute>>(
  (accumulator, route) => {
    accumulator[route.id] = route;
    return accumulator;
  },
  {},
);

const approvalTemplates: ApprovalTemplate[] = [
  {
    id: "multi-channel-launch",
    name: "Multi-channel launch",
    summary: "Strategy, creative, then wallet sign-off ahead of a big drop.",
    description:
      "Ideal for coordinated launches where channel strategy, creative polish, and signing need staggered checkpoints with fast escalations.",
    steps: [
      {
        id: "awareness-strategy",
        label: approvalRoutesById["route-1"]?.stage ?? "Awareness",
        approver: approvalRoutesById["route-1"]?.owners[0] ?? "Ameena",
        dueOffsetHours: -8,
        escalation: {
          notifyAfterHours: 2,
          routeTo: approvalRoutesById["route-1"]?.owners[1] ?? "Kai",
          fallback: approvalRoutesById["route-1"]?.fallback ?? "Route to You if unresponsive",
        },
      },
      {
        id: "creative-pass",
        label: approvalRoutesById["route-2"]?.stage ?? "Creative QA",
        approver: approvalRoutesById["route-2"]?.owners[0] ?? "Leo",
        dueOffsetHours: -4,
        escalation: {
          notifyAfterHours: 1,
          routeTo: "Ameena",
          fallback: approvalRoutesById["route-2"]?.fallback ?? "Escalate to @design-lead",
        },
      },
      {
        id: "wallet-sign",
        label: approvalRoutesById["route-3"]?.stage ?? "Wallet signing",
        approver: approvalRoutesById["route-3"]?.owners[0] ?? "You",
        dueOffsetHours: -1,
        escalation: {
          notifyAfterHours: 0.5,
          routeTo: "Kai",
          fallback: approvalRoutesById["route-3"]?.fallback ?? "Ping #wallet-ops",
        },
      },
    ],
  },
  {
    id: "creative-spotlight",
    name: "Creative spotlight",
    summary: "Deep creative loop with follow-up polish right before launch.",
    description:
      "Use when creative assets need multiple passes. Adds a final polish window and escalates quickly to keep the launch slot protected.",
    steps: [
      {
        id: "concept-pass",
        label: "Concept approval",
        approver: "Leo",
        dueOffsetHours: -10,
        escalation: {
          notifyAfterHours: 3,
          routeTo: "Ameena",
          fallback: "Escalate to @design-lead",
        },
      },
      {
        id: "motion-pass",
        label: "Motion / asset polish",
        approver: "Kai",
        dueOffsetHours: -6,
        escalation: {
          notifyAfterHours: 2,
          routeTo: "Leo",
          fallback: "Route to You if unresponsive",
        },
      },
      {
        id: "final-copy",
        label: "Final copy & CTA check",
        approver: "Ameena",
        dueOffsetHours: -2,
        escalation: {
          notifyAfterHours: 1,
          routeTo: "You",
          fallback: "Ping #wallet-ops",
        },
      },
    ],
  },
  {
    id: "post-launch-measure",
    name: "Post-launch measure",
    summary: "Quick pre-launch check and post-launch health review.",
    description:
      "Blend a lightweight launch check with a follow-up measurement window to confirm the drop is performing and reroute if not.",
    steps: [
      {
        id: "preflight",
        label: "Preflight check",
        approver: "Ameena",
        dueOffsetHours: -3,
        escalation: {
          notifyAfterHours: 1,
          routeTo: "Kai",
          fallback: "Route to You if unresponsive",
        },
      },
      {
        id: "go-live-confirm",
        label: "Go-live confirmation",
        approver: "You",
        dueOffsetHours: -0.5,
        escalation: {
          notifyAfterHours: 0.5,
          routeTo: "Leo",
          fallback: "Ping #wallet-ops",
        },
      },
      {
        id: "post-launch-review",
        label: "Post-launch performance review",
        approver: "Kai",
        dueOffsetHours: 4,
        escalation: {
          notifyAfterHours: 2,
          routeTo: "Ameena",
          fallback: "Escalate to @design-lead",
        },
      },
    ],
  },
];

function getApprovalTemplate(templateId: string | undefined | null) {
  return approvalTemplates.find((template) => template.id === templateId) ?? null;
}

function instantiateApprovalSteps(
  template: ApprovalTemplate,
  scheduledFor: string,
  seed: string,
): ApprovalStep[] {
  const launchTime = new Date(scheduledFor).getTime();
  return template.steps.map((step, index) => {
    const dueTime = launchTime + step.dueOffsetHours * 60 * 60 * 1000;
    const baseEscalation = step.escalation
      ? {
          ...step.escalation,
        }
      : undefined;
    return {
      id: `${step.id}-${seed}-${index}`,
      label: step.label,
      approver: step.approver,
      status: "pending" as ApprovalStatus,
      due: new Date(dueTime).toISOString(),
      escalation: baseEscalation,
    };
  });
}

const reportingDecks = [
  {
    id: "deck-weekly",
    title: "Weekly performance deck",
    timeframe: "Last 7 days",
    size: "12 slides",
    status: "Fresh",
    accent: "from-fuchsia-500 via-purple-500 to-indigo-500",
  },
  {
    id: "deck-monthly",
    title: "Month-end recap",
    timeframe: "May 2025",
    size: "22 slides",
    status: "Queued",
    accent: "from-emerald-400 via-teal-400 to-sky-400",
  },
  {
    id: "deck-investor",
    title: "Investor growth brief",
    timeframe: "Quarter to date",
    size: "16 slides",
    status: "Needs review",
    accent: "from-amber-400 via-orange-400 to-pink-400",
  },
];

const reportingExports = [
  {
    id: "export-csv",
    label: "CSV sync",
    description: "Export audience growth + engagement metrics.",
    lastRun: "Today • 08:10 UTC",
    destination: "Google Sheets • Marketing KPIs",
  },
  {
    id: "export-s3",
    label: "S3 archival",
    description: "Store daily raw metrics for analytics warehouse.",
    lastRun: "Yesterday • 21:45 UTC",
    destination: "s3://1social/rollups/",
  },
  {
    id: "export-airtable",
    label: "Airtable snapshot",
    description: "Push KPI snapshots for stakeholder dashboard.",
    lastRun: "Today • 05:30 UTC",
    destination: "Airtable • 1Social KPIs",
  },
];

const reportingSnapshots = [
  {
    id: "snapshot-reach",
    title: "Reach velocity",
    value: "+18%",
    description: "Comparing current week vs. rolling average.",
    tone: "bg-emerald-400/20 text-emerald-100",
  },
  {
    id: "snapshot-retention",
    title: "Retention lift",
    value: "+6 pts",
    description: "Alignment across Farcaster + Lens campaigns.",
    tone: "bg-sky-400/20 text-sky-100",
  },
  {
    id: "snapshot-engagement",
    title: "Engagement blend",
    value: "26%",
    description: "Aggregate saves, replies, and reshares.",
    tone: "bg-purple-400/20 text-purple-100",
  },
];

const engagementFilters = {
  sentiments: [
    { id: "all", label: "All" },
    { id: "positive", label: "Positive" },
    { id: "neutral", label: "Neutral" },
    { id: "negative", label: "Needs attention" },
  ],
  status: [
    { id: "open", label: "Open" },
    { id: "in-progress", label: "In progress" },
    { id: "resolved", label: "Resolved" },
  ],
};

const engagementInboxItems = [
  {
    id: "inbox-1",
    author: "Jess C.",
    channel: "farcaster" as ChannelId,
    message: "AMA replay was 🔥 — can we get the deck you showed?",
    sentiment: "positive",
    status: "open",
    timeAgo: "6 min",
    tags: ["Deck request", "AMA"],
  },
  {
    id: "inbox-2",
    author: "LensCollective",
    channel: "lens" as ChannelId,
    message: "Seeing inconsistent analytics exports this week.",
    sentiment: "negative",
    status: "in-progress",
    timeAgo: "18 min",
    tags: ["Analytics", "Exports"],
  },
  {
    id: "inbox-3",
    author: "Kai (internal)",
    channel: "x" as ChannelId,
    message: "Pulled a smart reply for BuilderDAO thread—looks good?",
    sentiment: "neutral",
    status: "resolved",
    timeAgo: "42 min",
    tags: ["Smart reply", "Follow-up"],
  },
  {
    id: "inbox-4",
    author: "Nova",
    channel: "instagram" as ChannelId,
    message: "Need access to the AI tone panel for our team.",
    sentiment: "positive",
    status: "open",
    timeAgo: "1 hr",
    tags: ["AI", "Request"],
  },
];

const engagementTriageQueues = [
  {
    id: "queue-priority",
    title: "Priority follow-ups",
    count: 3,
    description: "High-impact creators or urgent issues to address today.",
  },
  {
    id: "queue-feedback",
    title: "Feedback to review",
    count: 5,
    description: "Product feedback awaiting routing to owners.",
  },
  {
    id: "queue-automation",
    title: "Automation ready",
    count: 4,
    description: "Conversations prepped for smart reply or auto close.",
  },
];

const repostLedger: RepostEvent[] = [
  {
    id: "repost-1",
    source: "farcaster",
    targets: ["x", "lens"],
    scheduledFor: "Today · 15:00",
    status: "mirroring",
  },
  {
    id: "repost-2",
    source: "instagram",
    targets: ["mirror"],
    scheduledFor: "Today · 18:00",
    status: "queued",
  },
  {
    id: "repost-3",
    source: "lens",
    targets: ["farcaster", "instagram"],
    scheduledFor: "Yesterday · 21:00",
    status: "complete",
  },
];

const syndicationHistory: SyndicationEntry[] = [
  {
    id: "sync-1",
    title: "AMA launch wave",
    timestamp: "Today • 11:40 UTC",
    networks: ["farcaster", "instagram", "x"],
    effect: "+18% reach vs last wave",
  },
  {
    id: "sync-2",
    title: "Creator spotlight remix",
    timestamp: "Yesterday • 19:05 UTC",
    networks: ["lens", "mirror"],
    effect: "Collects up 24%",
  },
  {
    id: "sync-3",
    title: "Community pulse recap",
    timestamp: "Mon • 16:22 UTC",
    networks: ["farcaster", "lens"],
    effect: "Farcaster saves +11%",
  },
];

// Using imported versions from data modules

const sentimentAlerts = [
  {
    id: "alert-1",
    type: "negative_swing",
    severity: "medium",
    message: "Negative sentiment increased 15% on Wednesday",
    channel: "farcaster" as ChannelId,
    at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    resolved: false,
  },
  {
    id: "alert-2",
    type: "anomaly",
    severity: "low",
    message: "Unusual sentiment pattern detected in Creator cohort",
    channel: "instagram" as ChannelId,
    at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    resolved: false,
  },
];

// Recommendation playbooks data
const recommendationPlaybooks = [
  {
    id: "playbook-1",
    title: "Boost reach on Farcaster",
    priority: "high",
    metric: "reach" as MetricKpiId,
    steps: [
      { id: "step-1", action: "Schedule 3 posts during peak hours (11-14 UTC)", status: "pending" },
      { id: "step-2", action: "Engage with top 10 power users from last week", status: "pending" },
      { id: "step-3", action: "Cross-post top performing Instagram reel to Farcaster", status: "completed" },
    ],
    creativeAngles: [
      "Behind-the-scenes content performs 2.3x better",
      "Threads with visual assets get 40% more engagement",
    ],
    channelGuidance: {
      farcaster: "Use native Farcaster features like casts and reactions",
      instagram: "Sync highlights to maintain consistency",
    },
  },
  {
    id: "playbook-2",
    title: "Improve conversion rate",
    priority: "medium",
    metric: "conversion" as MetricKpiId,
    steps: [
      { id: "step-4", action: "Add clear CTAs to next 5 posts", status: "pending" },
      { id: "step-5", action: "Test wallet connection flow messaging", status: "pending" },
    ],
    creativeAngles: [
      "Posts with 'Connect wallet' CTA convert 3x higher",
      "Video tutorials drive 2.5x more conversions than static posts",
    ],
    channelGuidance: {
      farcaster: "Leverage Farcaster's native wallet integration",
      instagram: "Use swipe-up links in Stories for conversions",
    },
  },
  {
    id: "playbook-3",
    title: "Re-engage lurkers segment",
    priority: "high",
    metric: "growth" as MetricKpiId,
    steps: [
      { id: "step-6", action: "Create personalized DM campaign for inactive users", status: "pending" },
      { id: "step-7", action: "Schedule reminder posts during their active hours", status: "pending" },
    ],
    creativeAngles: [
      "Personalized content increases engagement by 45%",
      "Reminder posts work best on weekends for this segment",
    ],
    channelGuidance: {
      instagram: "Use Instagram DMs for personalized outreach",
      farcaster: "Create exclusive content to drive engagement",
    },
  },
];

// Using imported versions from data/content.ts
const contentPerformancePosts = contentPerformanceData;
const workflowAutomations = workflowAutomationRules;

const competitorAnalysis = [
  {
    id: "comp-1",
    name: "Competitor A",
    channel: "farcaster" as ChannelId,
    metrics: {
      followers: 45600,
      avgEngagement: 8.4,
      postFrequency: "12/week",
      topContent: "Product updates",
    },
    comparison: {
      followers: "+12%",
      engagement: "-2.3%",
      frequency: "Same",
    },
  },
  {
    id: "comp-2",
    name: "Competitor B",
    channel: "instagram" as ChannelId,
    metrics: {
      followers: 23400,
      avgEngagement: 6.8,
      postFrequency: "8/week",
      topContent: "Behind scenes",
    },
    comparison: {
      followers: "-8%",
      engagement: "+4.1%",
      frequency: "+2 posts",
    },
  },
];

const socialListeningMentions = [
  {
    id: "listen-1",
    keyword: "1Social",
    source: "farcaster" as ChannelId,
    author: "@crypto_builder",
    content: "Just tried 1Social for the first time—game changer for cross-posting!",
    sentiment: "positive",
    engagement: 24,
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "listen-2",
    keyword: "1Social",
    source: "x" as ChannelId,
    author: "@web3_marketer",
    content: "Anyone else having issues with 1Social's scheduling feature?",
    sentiment: "negative",
    engagement: 8,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "listen-3",
    keyword: "social media tool",
    source: "lens" as ChannelId,
    author: "@creator_dao",
    content: "Looking for a tool that supports Farcaster and Instagram simultaneously",
    sentiment: "neutral",
    engagement: 12,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
];

const influencerProfiles = [
  {
    id: "inf-1",
    name: "Crypto Creator",
    handle: "@crypto_creator",
    channel: "farcaster" as ChannelId,
    followers: 45600,
    engagementRate: 8.4,
    avgReach: 12400,
    category: "Web3",
    collaborationStatus: "active",
    lastPost: "2 hours ago",
  },
  {
    id: "inf-2",
    name: "Design Studio",
    handle: "@design_studio",
    channel: "instagram" as ChannelId,
    followers: 23400,
    engagementRate: 6.8,
    avgReach: 8900,
    category: "Design",
    collaborationStatus: "pending",
    lastPost: "5 hours ago",
  },
];

const crisisAlerts = [
  {
    id: "crisis-1",
    severity: "high",
    type: "Negative sentiment spike",
    channel: "farcaster" as ChannelId,
    description: "Negative mentions increased 45% in the last 2 hours",
    affectedPosts: 3,
    detectedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    status: "active",
  },
  {
    id: "crisis-2",
    severity: "medium",
    type: "Engagement drop",
    channel: "instagram" as ChannelId,
    description: "Engagement rate dropped below baseline by 28%",
    affectedPosts: 5,
    detectedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    status: "monitoring",
  },
];

const socialCommerceProducts = [
  {
    id: "product-1",
    name: "1Social Pro Plan",
    price: "$99/month",
    status: "active",
    sales: 124,
    revenue: "$12,276",
    conversionRate: 3.2,
    channels: ["farcaster", "instagram"] as ChannelId[],
  },
  {
    id: "product-2",
    name: "Creator Toolkit",
    price: "$49/month",
    status: "active",
    sales: 89,
    revenue: "$4,361",
    conversionRate: 2.8,
    channels: ["instagram"] as ChannelId[],
  },
];

const calendarEvents = [
  {
    id: "event-1",
    title: "Product launch",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
    channels: ["farcaster", "instagram", "x"] as ChannelId[],
    type: "campaign",
    status: "scheduled",
  },
  {
    id: "event-2",
    title: "Community AMA",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
    channels: ["farcaster"] as ChannelId[],
    type: "event",
    status: "planned",
  },
];

// Social listening / monitoring
const socialListeningTopics = [
  {
    id: "topic-1",
    keyword: "wallet integration",
    mentions: 124,
    sentiment: "positive",
    trend: "up",
    topChannels: ["farcaster", "x"] as ChannelId[],
    recentMentions: [
      { author: "User123", message: "Love the new wallet feature!", channel: "farcaster" as ChannelId },
      { author: "CryptoFan", message: "Wallet integration is seamless", channel: "x" as ChannelId },
    ],
  },
  {
    id: "topic-2",
    keyword: "product launch",
    mentions: 89,
    sentiment: "neutral",
    trend: "stable",
    topChannels: ["instagram", "farcaster"] as ChannelId[],
    recentMentions: [
      { author: "EarlyAdopter", message: "Excited for the launch", channel: "instagram" as ChannelId },
    ],
  },
  {
    id: "topic-3",
    keyword: "community AMA",
    mentions: 156,
    sentiment: "positive",
    trend: "up",
    topChannels: ["farcaster", "lens"] as ChannelId[],
    recentMentions: [
      { author: "CommunityMember", message: "Great AMA session!", channel: "farcaster" as ChannelId },
    ],
  },
];

// Advanced analytics breakdown
const analyticsBreakdown = [
  {
    id: "breakdown-1",
    metric: "Reach",
    total: 124000,
    breakdown: [
      { channel: "farcaster" as ChannelId, value: 68000, percent: 55 },
      { channel: "instagram" as ChannelId, value: 42000, percent: 34 },
      { channel: "x" as ChannelId, value: 14000, percent: 11 },
    ],
    trend: [110, 115, 118, 120, 122, 124],
  },
  {
    id: "breakdown-2",
    metric: "Engagement",
    total: 8920,
    breakdown: [
      { channel: "farcaster" as ChannelId, value: 5120, percent: 57 },
      { channel: "instagram" as ChannelId, value: 3120, percent: 35 },
      { channel: "x" as ChannelId, value: 680, percent: 8 },
    ],
    trend: [8200, 8400, 8600, 8700, 8800, 8920],
  },
];

// Content ideas generator
const contentIdeas = [
  {
    id: "idea-1",
    title: "Behind-the-scenes: Building wallet integration",
    type: "BTS",
    estimatedEngagement: 8.5,
    channels: ["farcaster", "instagram"] as ChannelId[],
    tags: ["product", "development"],
  },
  {
    id: "idea-2",
    title: "Community spotlight: Top contributors this month",
    type: "Community",
    estimatedEngagement: 9.2,
    channels: ["farcaster", "lens"] as ChannelId[],
    tags: ["community", "spotlight"],
  },
  {
    id: "idea-3",
    title: "Tutorial: How to connect your wallet",
    type: "Educational",
    estimatedEngagement: 7.8,
    channels: ["instagram", "x"] as ChannelId[],
    tags: ["tutorial", "onboarding"],
  },
];

const contentModerationQueue = [
  {
    id: "mod-1",
    content: "Check out our new product launch! 🚀",
    channel: "farcaster" as ChannelId,
    flaggedReason: "Potential spam",
    flaggedBy: "Auto-moderation",
    priority: "medium",
    submittedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    status: "pending",
  },
  {
    id: "mod-2",
    content: "Join our community AMA tomorrow at 3 PM",
    channel: "instagram" as ChannelId,
    flaggedReason: "Scheduled content review",
    flaggedBy: "System",
    priority: "low",
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    status: "approved",
  },
];

const roiCampaigns = [
  {
    id: "roi-1",
    name: "Q1 Product Launch",
    spend: 5000,
    revenue: 25000,
    roi: 400,
    conversions: 124,
    cpa: 40.32,
    period: "Last 30 days",
  },
  {
    id: "roi-2",
    name: "Community Growth Campaign",
    spend: 2000,
    revenue: 12000,
    roi: 500,
    conversions: 89,
    cpa: 22.47,
    period: "Last 30 days",
  },
];

const managedAccounts = [
  {
    id: "account-1",
    name: "1Social Official",
    platform: "farcaster" as ChannelId,
    followers: 45600,
    status: "connected",
    lastSync: "2 minutes ago",
    postsToday: 3,
  },
  {
    id: "account-2",
    name: "1Social Instagram",
    platform: "instagram" as ChannelId,
    followers: 23400,
    status: "connected",
    lastSync: "5 minutes ago",
    postsToday: 2,
  },
  {
    id: "account-3",
    name: "1Social X",
    platform: "x" as ChannelId,
    followers: 18900,
    status: "disconnected",
    lastSync: "2 hours ago",
    postsToday: 0,
  },
];

const recycledContent = [
  {
    id: "recycle-1",
    originalTitle: "Product launch announcement",
    originalDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    originalChannel: "farcaster" as ChannelId,
    repurposedAs: "Instagram Reel",
    performance: "+45% engagement",
    status: "scheduled",
  },
  {
    id: "recycle-2",
    originalTitle: "Community spotlight",
    originalDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
    originalChannel: "instagram" as ChannelId,
    repurposedAs: "Farcaster thread",
    performance: "+32% reach",
    status: "published",
  },
];

const engagementAutomationRules = [
  {
    id: "auto-engage-1",
    name: "Auto-reply to mentions",
    trigger: "Brand mention detected",
    action: "Send thank you message",
    status: "active",
    executions: 124,
    lastRun: "5 minutes ago",
  },
  {
    id: "auto-engage-2",
    name: "Welcome new followers",
    trigger: "New follower",
    action: "Send welcome DM",
    status: "active",
    executions: 89,
    lastRun: "10 minutes ago",
  },
  {
    id: "auto-engage-3",
    name: "Respond to questions",
    trigger: "Question detected",
    action: "Route to support team",
    status: "inactive",
    executions: 0,
    lastRun: "Never",
  },
];

// Content moderation
const moderationQueue = [
  {
    id: "mod-1",
    content: "Check out our new product launch! 🚀",
    author: "@user123",
    channel: "farcaster" as ChannelId,
    flaggedReason: "spam",
    severity: "medium",
    reportedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    status: "pending",
  },
  {
    id: "mod-2",
    content: "This is amazing! Love it!",
    author: "@user456",
    channel: "instagram" as ChannelId,
    flaggedReason: "inappropriate",
    severity: "low",
    reportedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    status: "reviewed",
  },
  {
    id: "mod-3",
    content: "Great work team!",
    author: "@user789",
    channel: "x" as ChannelId,
    flaggedReason: "copyright",
    severity: "high",
    reportedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    status: "pending",
  },
];

// Brand safety alerts
const brandSafetyAlerts = [
  {
    id: "safety-1",
    type: "negative_sentiment",
    channel: "farcaster" as ChannelId,
    message: "Spike in negative mentions detected",
    severity: "high",
    mentions: 45,
    at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    resolved: false,
  },
  {
    id: "safety-2",
    type: "competitor_mention",
    channel: "instagram" as ChannelId,
    message: "Competitor mentioned in trending post",
    severity: "medium",
    mentions: 12,
    at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    resolved: false,
  },
  {
    id: "safety-3",
    type: "fake_account",
    channel: "x" as ChannelId,
    message: "Potential fake account impersonating brand",
    severity: "high",
    mentions: 1,
    at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    resolved: true,
  },
];

// API management
const apiKeys = [
  {
    id: "api-1",
    name: "Production API Key",
    key: "sk_live_...abc123",
    permissions: ["read", "write", "publish"],
    lastUsed: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    requests: 12500,
    status: "active",
  },
  {
    id: "api-2",
    name: "Development API Key",
    key: "sk_test_...xyz789",
    permissions: ["read", "write"],
    lastUsed: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    requests: 3200,
    status: "active",
  },
  {
    id: "api-3",
    name: "Analytics Only",
    key: "sk_analytics_...def456",
    permissions: ["read"],
    lastUsed: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    requests: 8900,
    status: "revoked",
  },
];

// Hashtag analytics
const hashtagAnalytics = [
  {
    id: "hashtag-1",
    hashtag: "#Web3Social",
    posts: 1240,
    reach: 245000,
    engagement: 8900,
    growth: 24.5,
    trend: "up" as const,
  },
  {
    id: "hashtag-2",
    hashtag: "#Decentralized",
    posts: 890,
    reach: 189000,
    engagement: 5600,
    growth: 12.3,
    trend: "up" as const,
  },
  {
    id: "hashtag-3",
    hashtag: "#CryptoCommunity",
    posts: 2100,
    reach: 456000,
    engagement: 12300,
    growth: -5.2,
    trend: "down" as const,
  },
];

// Post performance comparison
const performanceComparison = [
  {
    id: "comp-1",
    metric: "Reach",
    current: 125000,
    previous: 98000,
    change: 27.6,
    trend: "up" as const,
  },
  {
    id: "comp-2",
    metric: "Engagement Rate",
    current: 8.5,
    previous: 7.2,
    change: 18.1,
    trend: "up" as const,
  },
  {
    id: "comp-3",
    metric: "Conversion",
    current: 890,
    previous: 1200,
    change: -25.8,
    trend: "down" as const,
  },
];

// Content library management
const contentLibraryItems = [
  {
    id: "lib-1",
    title: "Product Launch Assets",
    type: "image",
    size: "2.4 MB",
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    usage: 12,
    tags: ["product", "launch", "marketing"],
    channels: ["farcaster", "instagram"] as ChannelId[],
  },
  {
    id: "lib-2",
    title: "Brand Guidelines Video",
    type: "video",
    size: "45.2 MB",
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    usage: 8,
    tags: ["brand", "guidelines", "video"],
    channels: ["instagram", "x"] as ChannelId[],
  },
  {
    id: "lib-3",
    title: "Community Template",
    type: "template",
    size: "128 KB",
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    usage: 24,
    tags: ["template", "community"],
    channels: ["farcaster", "lens"] as ChannelId[],
  },
];

// Advanced search
const searchHistory = [
  {
    id: "search-1",
    query: "product launch",
    results: 45,
    searchedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "search-2",
    query: "engagement rate > 5%",
    results: 12,
    searchedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "search-3",
    query: "farcaster posts last week",
    results: 89,
    searchedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

// User management & permissions
const userRoles = [
  {
    id: "role-1",
    name: "Admin",
    permissions: ["create", "edit", "delete", "approve", "publish", "manage_users"],
    users: 3,
    description: "Full access to all features",
  },
  {
    id: "role-2",
    name: "Content Creator",
    permissions: ["create", "edit"],
    users: 8,
    description: "Can create and edit content",
  },
  {
    id: "role-3",
    name: "Approver",
    permissions: ["create", "edit", "approve"],
    users: 5,
    description: "Can create, edit, and approve content",
  },
];

// Export & backup
const exportHistoryItems = [
  {
    id: "export-1",
    name: "Q1 Campaign Data",
    type: "csv",
    size: "2.3 MB",
    exportedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    status: "completed",
  },
  {
    id: "export-2",
    name: "All Posts Backup",
    type: "json",
    size: "15.7 MB",
    exportedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    status: "completed",
  },
  {
    id: "export-3",
    name: "Analytics Report",
    type: "pdf",
    size: "8.1 MB",
    exportedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    status: "processing",
  },
];

// Revenue tracking
const revenueData = [
  {
    id: "rev-1",
    source: "Sponsored Posts",
    amount: 12500,
    period: "This Month",
    growth: 18.5,
    trend: "up" as const,
  },
  {
    id: "rev-2",
    source: "Affiliate Links",
    amount: 8900,
    period: "This Month",
    growth: 12.3,
    trend: "up" as const,
  },
  {
    id: "rev-3",
    source: "Product Sales",
    amount: 45600,
    period: "This Month",
    growth: -5.2,
    trend: "down" as const,
  },
];

// Multi-language support
const languageSettings = [
  {
    id: "lang-1",
    language: "English",
    code: "en",
    posts: 1240,
    engagement: 8.5,
    status: "active",
  },
  {
    id: "lang-2",
    language: "Spanish",
    code: "es",
    posts: 890,
    engagement: 9.2,
    status: "active",
  },
  {
    id: "lang-3",
    language: "French",
    code: "fr",
    posts: 560,
    engagement: 7.8,
    status: "active",
  },
];

// Post analytics deep dive
const postAnalytics = [
  {
    id: "analytics-1",
    postId: "post-123",
    title: "Product Launch Announcement",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    impressions: 125000,
    reach: 98000,
    engagement: 12400,
    clicks: 890,
    saves: 450,
    shares: 320,
    engagementRate: 9.9,
  },
  {
    id: "analytics-2",
    postId: "post-124",
    title: "Community Spotlight",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    impressions: 89000,
    reach: 72000,
    engagement: 8900,
    clicks: 560,
    saves: 320,
    shares: 180,
    engagementRate: 10.0,
  },
  {
    id: "analytics-3",
    postId: "post-125",
    title: "Tutorial: Wallet Setup",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    impressions: 156000,
    reach: 134000,
    engagement: 18900,
    clicks: 1200,
    saves: 890,
    shares: 450,
    engagementRate: 12.1,
  },
];

// Content calendar views
const calendarViews = [
  {
    id: "view-1",
    name: "Week View",
    posts: 24,
    scheduled: 18,
    draft: 6,
    dateRange: "Dec 16 - Dec 22",
  },
  {
    id: "view-2",
    name: "Month View",
    posts: 89,
    scheduled: 72,
    draft: 17,
    dateRange: "December 2024",
  },
  {
    id: "view-3",
    name: "List View",
    posts: 156,
    scheduled: 134,
    draft: 22,
    dateRange: "All Time",
  },
];

// Team collaboration tools
const collaborationTools = [
  {
    id: "collab-1",
    name: "Content Review Board",
    type: "review",
    activeMembers: 5,
    pendingReviews: 12,
    completedToday: 8,
  },
  {
    id: "collab-2",
    name: "Creative Briefs",
    type: "brief",
    activeMembers: 3,
    pendingReviews: 4,
    completedToday: 2,
  },
  {
    id: "collab-3",
    name: "Asset Requests",
    type: "request",
    activeMembers: 7,
    pendingReviews: 6,
    completedToday: 5,
  },
];

// Content performance predictions
const performancePredictions = [
  {
    id: "pred-1",
    postTitle: "Product Launch Announcement",
    predictedReach: 125000,
    predictedEngagement: 12400,
    confidence: 85,
    bestTime: "10:00 AM",
    bestDay: "Tuesday",
  },
  {
    id: "pred-2",
    postTitle: "Community Spotlight",
    predictedReach: 89000,
    predictedEngagement: 8900,
    confidence: 78,
    bestTime: "3:00 PM",
    bestDay: "Thursday",
  },
  {
    id: "pred-3",
    postTitle: "Tutorial Series",
    predictedReach: 156000,
    predictedEngagement: 18900,
    confidence: 92,
    bestTime: "12:00 PM",
    bestDay: "Monday",
  },
];

// Automated content suggestions
const automatedSuggestions = [
  {
    id: "suggestion-1",
    type: "trending_topic",
    title: "Post about #Web3Social trend",
    reason: "Trending hashtag with 24.5% growth",
    estimatedEngagement: 8.5,
    priority: "high",
  },
  {
    id: "suggestion-2",
    type: "best_time",
    title: "Schedule post for 10:00 AM Tuesday",
    reason: "Historically highest engagement time",
    estimatedEngagement: 9.2,
    priority: "medium",
  },
  {
    id: "suggestion-3",
    type: "content_gap",
    title: "Create educational content",
    reason: "Low engagement on educational posts",
    estimatedEngagement: 7.8,
    priority: "low",
  },
];

// Social media monitoring dashboard
const monitoringAlerts = [
  {
    id: "alert-1",
    type: "mention",
    source: "farcaster",
    message: "Brand mentioned in trending post",
    sentiment: "positive",
    reach: 12500,
    at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "alert-2",
    type: "hashtag",
    source: "instagram",
    message: "#Web3Social trending in your niche",
    sentiment: "neutral",
    reach: 8900,
    at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "alert-3",
    type: "competitor",
    source: "x",
    message: "Competitor launched new feature",
    sentiment: "neutral",
    reach: 15600,
    at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
];

// Content scheduling optimization
const schedulingOptimization = [
  {
    id: "opt-1",
    channel: "farcaster" as ChannelId,
    optimalTime: "10:00 AM",
    optimalDay: "Tuesday",
    expectedEngagement: 9.5,
    currentAvgEngagement: 7.2,
    improvement: 31.9,
  },
  {
    id: "opt-2",
    channel: "instagram" as ChannelId,
    optimalTime: "3:00 PM",
    optimalDay: "Thursday",
    expectedEngagement: 8.8,
    currentAvgEngagement: 6.5,
    improvement: 35.4,
  },
  {
    id: "opt-3",
    channel: "x" as ChannelId,
    optimalTime: "12:00 PM",
    optimalDay: "Monday",
    expectedEngagement: 7.9,
    currentAvgEngagement: 5.8,
    improvement: 36.2,
  },
];

// Audience growth tracking
const audienceGrowth = [
  {
    id: "growth-1",
    channel: "farcaster" as ChannelId,
    currentFollowers: 125000,
    growthThisWeek: 2500,
    growthRate: 2.0,
    trend: "up" as const,
  },
  {
    id: "growth-2",
    channel: "instagram" as ChannelId,
    currentFollowers: 89000,
    growthThisWeek: 1800,
    growthRate: 2.1,
    trend: "up" as const,
  },
  {
    id: "growth-3",
    channel: "x" as ChannelId,
    currentFollowers: 156000,
    growthThisWeek: 3200,
    growthRate: 2.1,
    trend: "up" as const,
  },
];

// Engagement rate analysis
const engagementRateAnalysis = [
  {
    id: "eng-1",
    metric: "Average Engagement Rate",
    value: 8.5,
    benchmark: 6.2,
    performance: "above_average",
    change: 12.3,
  },
  {
    id: "eng-2",
    metric: "Peak Engagement Time",
    value: 10.2,
    benchmark: 7.8,
    performance: "above_average",
    change: 30.8,
  },
  {
    id: "eng-3",
    metric: "Content Quality Score",
    value: 7.8,
    benchmark: 6.5,
    performance: "above_average",
    change: 20.0,
  },
];

const dashboardSections: { id: string; label: string }[] = [
  { id: "broadcast", label: "Compose" },
  { id: "plan", label: "Scheduling" },
  { id: "workflow", label: "Workflow" },
  { id: "distribution", label: "Distribution" },
  { id: "ai", label: "AI Studio" },
  { id: "reporting", label: "Reporting" },
  { id: "engagement", label: "Engagement" },
  { id: "insights", label: "Insights" },
  { id: "automation", label: "Automation" },
  { id: "ops", label: "Ops" },
  { id: "intelligence", label: "Intelligence" },
  { id: "content", label: "Content Intel" },
  { id: "team", label: "Team" },
  { id: "integrations", label: "Integrations" },
  { id: "ab-testing", label: "A/B Testing" },
  { id: "campaigns", label: "Campaigns" },
  { id: "templates", label: "Templates" },
  { id: "webhooks", label: "Webhooks" },
  { id: "notifications", label: "Notifications" },
  { id: "competitors", label: "Competitors" },
  { id: "trends", label: "Trends" },
  { id: "listening", label: "Social Listening" },
  { id: "influencers", label: "Influencers" },
  { id: "crisis", label: "Crisis Management" },
  { id: "commerce", label: "Social Commerce" },
  { id: "calendar-advanced", label: "Advanced Calendar" },
  { id: "moderation", label: "Content Moderation" },
  { id: "brand-safety", label: "Brand Safety" },
  { id: "api-management", label: "API Management" },
  { id: "hashtag-analytics", label: "Hashtag Analytics" },
  { id: "performance-comparison", label: "Performance Comparison" },
  { id: "content-library", label: "Content Library" },
  { id: "advanced-search", label: "Advanced Search" },
  { id: "user-management", label: "User Management" },
  { id: "export-backup", label: "Export & Backup" },
  { id: "revenue-tracking", label: "Revenue Tracking" },
  { id: "multi-language", label: "Multi-language" },
  { id: "post-analytics", label: "Post Analytics" },
  { id: "calendar-views", label: "Calendar Views" },
  { id: "team-collaboration", label: "Team Collaboration" },
  { id: "performance-predictions", label: "Performance Predictions" },
  { id: "automated-suggestions", label: "Automated Suggestions" },
  { id: "monitoring-dashboard", label: "Monitoring Dashboard" },
  { id: "scheduling-optimization", label: "Scheduling Optimization" },
  { id: "audience-growth", label: "Audience Growth" },
  { id: "engagement-analysis", label: "Engagement Analysis" },
];
const chartColorTokens = {
  reach: "text-sky-300",
  conversionRate: "text-amber-300",
  total: "text-purple-300",
  farcaster: "text-emerald-300",
  instagram: "text-fuchsia-300",
} as const;

export default function Home() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { disconnect } = useDisconnect();

  const [draft, setDraft] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [feedback, setFeedback] = useState<
    { tone: "error" | "success"; message: string } | null
  >(null);
  const [channelState, setChannelState] = useState<Record<ChannelId, boolean>>({
    farcaster: true,
    instagram: true,
    x: false,
    lens: false,
    mirror: false,
  });
  const [posts, setPosts] = useState<SocialPost[]>(initialPosts);

  const [plannedPosts, setPlannedPosts] =
    useState<PlannedPost[]>(initialPlannedPosts);
  const [scheduleTitle, setScheduleTitle] = useState("");
  const [scheduleSummary, setScheduleSummary] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduleFeedback, setScheduleFeedback] = useState<
    { tone: "error" | "success"; message: string } | null
  >(null);
  const [scheduleChannels, setScheduleChannels] = useState<
    Record<ChannelId, boolean>
  >({
    farcaster: true,
    instagram: false,
    x: false,
    lens: false,
    mirror: false,
  });
  const [selectedWorkflowPostId, setSelectedWorkflowPostId] = useState<string>(
    initialPlannedPosts[0]?.id ?? "",
  );
  const [workflowNote, setWorkflowNote] = useState("");
  const [selectedApprovalTemplateId, setSelectedApprovalTemplateId] = useState<string>(
    approvalTemplates[0]?.id ?? "",
  );
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(
    automationTemplates[0]?.id ?? "",
  );
  const [selectedSequenceId, setSelectedSequenceId] = useState<string>(
    sequencePlays[0]?.id ?? "",
  );
  const [distributionMatrix, setDistributionMatrix] =
    useState<Record<ChannelId, boolean>>({
      farcaster: true,
      instagram: true,
      x: true,
      lens: false,
      mirror: false,
    });
  const [aiDraft, setAiDraft] = useState("");
  const [selectedToneId, setSelectedToneId] = useState<string>(
    aiToneOptions[0]?.id ?? "",
  );
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>(
    aiPersonas[0]?.id ?? "",
  );
  const [selectedIdeaId, setSelectedIdeaId] = useState<string>(
    aiDraftIdeas[0]?.id ?? "",
  );
  const [selectedDeckId, setSelectedDeckId] = useState<string>(
    reportingDecks[0]?.id ?? "",
  );
  const [selectedExportId, setSelectedExportId] = useState<string>(
    reportingExports[0]?.id ?? "",
  );
  const [selectedHelpCategory, setSelectedHelpCategory] = useState<string>(
    helpCategories?.[0]?.id ?? "",
  );
  const [selectedReleaseId, setSelectedReleaseId] = useState<string>(
    releases?.[0]?.id ?? "",
  );
  const [selectedSentimentFilter, setSelectedSentimentFilter] =
    useState<string>("all");
  const [selectedEngagementStatus, setSelectedEngagementStatus] =
    useState<string>("open");
  const [reportingView, setReportingView] = useState<"overview" | "exports" | "deep-dive">(
    "overview",
  );
  const [selectedExecMetricId, setSelectedExecMetricId] = useState<string>(
    reportingExecMetrics[0]?.id ?? "",
  );
  const [selectedVarianceId, setSelectedVarianceId] = useState<string>(
    reportingVarianceBreakdowns[0]?.id ?? "",
  );
  const [selectedBenchmarkChannel, setSelectedBenchmarkChannel] = useState<ChannelId>(
    reportingBenchmarkMatrix[0]?.channel ?? "farcaster",
  );
  const [selectedAlertFilter, setSelectedAlertFilter] = useState<string>(
    reportingAlertFilters[0]?.id ?? "all",
  );
  const [calendarView, setCalendarView] = useState<"week" | "month">("week");
  const [calendarFocus, setCalendarFocus] = useState<string>("Thu");
  const [selectedAbTestId, setSelectedAbTestId] = useState<string>(abTests[0]?.id ?? "");
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(campaigns[0]?.id ?? "");
  const [selectedContentTemplateId, setSelectedContentTemplateId] = useState<string>(contentTemplates[0]?.id ?? "");
  const [selectedWebhookId, setSelectedWebhookId] = useState<string>(webhooks[0]?.id ?? "");
  const [notificationFilter, setNotificationFilter] = useState<"all" | "unread">("all");
  const [selectedCompetitorId, setSelectedCompetitorId] = useState<string>(competitors[0]?.id ?? "");
  const [selectedTrendId, setSelectedTrendId] = useState<string>(trendTopics[0]?.id ?? "");
  const [selectedForecastId, setSelectedForecastId] = useState<string>(
    intelligenceForecasts[0]?.id ?? "",
  );
  const [selectedRecommendationId, setSelectedRecommendationId] = useState<string>(
    contentRecommendations[0]?.id ?? "",
  );
  const [selectedPerformancePostId, setSelectedPerformancePostId] = useState<string>(
    contentPerformancePosts?.[0]?.id ?? "",
  );
  const [selectedAutomationId, setSelectedAutomationId] = useState<string>(
    workflowAutomations?.[0]?.id ?? "",
  );
  const [selectedNotificationId, setSelectedNotificationId] = useState<string>("");
    const [selectedApiKeyId, setSelectedApiKeyId] = useState<string>(
      apiKeys?.[0]?.id ?? "",
    );
    const [selectedWebhookId, setSelectedWebhookId] = useState<string>(
      webhookEvents?.[0]?.id ?? "",
    );
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchTypeFilter, setSearchTypeFilter] = useState<string>("all");
  const [selectedMentionId, setSelectedMentionId] = useState<string>(
    socialListeningMentions[0]?.id ?? "",
  );
  const [selectedInfluencerId, setSelectedInfluencerId] = useState<string>(
    influencerProfiles[0]?.id ?? "",
  );
  const [selectedCrisisId, setSelectedCrisisId] = useState<string>(
    crisisAlerts[0]?.id ?? "",
  );
  const [selectedProductId, setSelectedProductId] = useState<string>(
    socialCommerceProducts[0]?.id ?? "",
  );
  const [selectedEventId, setSelectedEventId] = useState<string>(
    calendarEvents[0]?.id ?? "",
  );
  const [selectedSegmentId, setSelectedSegmentId] = useState<string>("");
  const [listeningKeywordFilter, setListeningKeywordFilter] = useState<string>("all");
  const [listeningSentimentFilter, setListeningSentimentFilter] = useState<string>("all");
  const [selectedModerationId, setSelectedModerationId] = useState<string>(
    contentModerationQueue[0]?.id ?? "",
  );
  const [selectedRoiId, setSelectedRoiId] = useState<string>(
    roiCampaigns[0]?.id ?? "",
  );
  const [selectedAccountId, setSelectedAccountId] = useState<string>(
    managedAccounts[0]?.id ?? "",
  );
  const [selectedRecycledId, setSelectedRecycledId] = useState<string>(
    recycledContent[0]?.id ?? "",
  );
  const [selectedEngagementRuleId, setSelectedEngagementRuleId] = useState<string>(
    engagementAutomationRules[0]?.id ?? "",
  );

  const activeNetwork = useMemo(
    () => networks.find((network) => network.id === chainId),
    [chainId],
  );

  const activeChannels = useMemo(
    () =>
      (Object.keys(channelState) as ChannelId[]).filter(
        (id) => channelState[id],
      ),
    [channelState],
  );

  const scheduleActiveChannels = useMemo(
    () =>
      (Object.keys(scheduleChannels) as ChannelId[]).filter(
        (id) => scheduleChannels[id],
      ),
    [scheduleChannels],
  );

  const sortedPlannedPosts = useMemo(
    () =>
      [...plannedPosts].sort(
        (a, b) =>
          new Date(a.scheduledFor).getTime() -
          new Date(b.scheduledFor).getTime(),
      ),
    [activeChannels, plannedPosts],
  );

  useEffect(() => {
    if (!sortedPlannedPosts.length) {
      setSelectedWorkflowPostId("");
      return;
    }
    const exists = sortedPlannedPosts.some(
      (plan) => plan.id === selectedWorkflowPostId,
    );
    if (!exists) {
      setSelectedWorkflowPostId(sortedPlannedPosts[0]?.id ?? "");
    }
  }, [selectedWorkflowPostId, sortedPlannedPosts]);

  const workflowContext = useMemo(() => {
    const selectedPlan =
      sortedPlannedPosts.find((plan) => plan.id === selectedWorkflowPostId) ??
      sortedPlannedPosts[0] ??
      null;

    if (!selectedPlan) {
      return {
        selectedPlan: null,
        steps: [] as ApprovalStep[],
        comments: [] as Comment[],
      };
    }

    const orderedComments = [...selectedPlan.commentThread].sort(
      (a, b) => new Date(b.at).getTime() - new Date(a.at).getTime(),
    );

    return {
      selectedPlan,
      steps: selectedPlan.approvalSteps,
      comments: orderedComments,
    };
  }, [selectedWorkflowPostId, sortedPlannedPosts]);

  const audienceInsights = useMemo(() => {
    const farcasterSeries = audienceTrendSeries.map((item) => item.farcaster);
    const instagramSeries = audienceTrendSeries.map((item) => item.instagram);
    const farcasterPath = buildSparklinePath(farcasterSeries);
    const instagramPath = buildSparklinePath(instagramSeries);
    const farcasterDelta =
      farcasterSeries[farcasterSeries.length - 1] - farcasterSeries[0];
    const instagramDelta =
      instagramSeries[instagramSeries.length - 1] - instagramSeries[0];
    const farcasterLatest = farcasterSeries[farcasterSeries.length - 1];
    const instagramLatest = instagramSeries[instagramSeries.length - 1];

    const topSlot = bestTimeGrid
      .flatMap((row) =>
        row.values.map((value: number, columnIndex: number) => ({
          slot: row.slot,
          day: audienceDays[columnIndex],
          value,
        })),
      )
      .reduce(
        (best, current) => (current.value > best.value ? current : best),
        {
          slot: bestTimeGrid[0].slot,
          day: audienceDays[0],
          value: bestTimeGrid[0].values[0],
        },
      );

    return {
      farcasterPath,
      instagramPath,
      farcasterDelta,
      instagramDelta,
      farcasterLatest,
      instagramLatest,
      topSlot,
    };
  }, []);

  const selectedTemplate = useMemo(
    () =>
      automationTemplates.find((template) => template.id === selectedTemplateId) ??
      automationTemplates[0] ??
      null,
    [selectedTemplateId],
  );

  const selectedSequence = useMemo(
    () =>
      sequencePlays.find((sequence) => sequence.id === selectedSequenceId) ??
      sequencePlays[0] ??
      null,
    [selectedSequenceId],
  );

  const calendarByDay = useMemo(() => {
    const grouped = audienceDays.map((day) => ({
      day,
      slots: calendarSlots.filter((slot) => slot.day === day),
    }));
    return grouped;
  }, []);

  const activeDistributionLabels = useMemo(
    () =>
      ((Object.keys(distributionMatrix) as ChannelId[]).filter(
        (key) => distributionMatrix[key],
      ))
        .map((key) => channelCatalog[key].label)
        .sort((a, b) => a.localeCompare(b)),
    [distributionMatrix],
  );

  const selectedTone = useMemo(
    () => aiToneOptions.find((tone) => tone.id === selectedToneId) ?? aiToneOptions[0],
    [selectedToneId],
  );

  const selectedPersona = useMemo(
    () => aiPersonas.find((persona) => persona.id === selectedPersonaId) ?? aiPersonas[0],
    [selectedPersonaId],
  );

  const selectedIdea = useMemo(
    () => aiDraftIdeas.find((idea) => idea.id === selectedIdeaId) ?? aiDraftIdeas[0],
    [selectedIdeaId],
  );

  const aiCharacterCount = aiDraft.length;

  const selectedDeck = useMemo(
    () => reportingDecks.find((deck) => deck.id === selectedDeckId) ?? reportingDecks[0],
    [selectedDeckId],
  );

  const selectedExport = useMemo(
    () =>
      reportingExports.find((exportJob) => exportJob.id === selectedExportId) ??
      reportingExports[0],
    [selectedExportId],
  );

  const filteredEngagementItems = useMemo(
    () =>
      engagementInboxItems.filter((item) => {
        const sentimentMatches =
          selectedSentimentFilter === "all" || item.sentiment === selectedSentimentFilter;
        const statusMatches = item.status === selectedEngagementStatus;
        return sentimentMatches && statusMatches;
      }),
    [selectedEngagementStatus, selectedSentimentFilter],
  );

  const engagementCounts = useMemo(() => {
    const sentiments = engagementFilters.sentiments.reduce<Record<string, number>>(
      (accumulator, filter) => {
        accumulator[filter.id] =
          filter.id === "all"
            ? engagementInboxItems.length
            : engagementInboxItems.filter((item) => item.sentiment === filter.id).length;
        return accumulator;
      },
      {},
    );
    const statuses = engagementFilters.status.reduce<Record<string, number>>(
      (accumulator, filter) => {
        accumulator[filter.id] = engagementInboxItems.filter(
          (item) => item.status === filter.id,
        ).length;
        return accumulator;
      },
      {},
    );
    return { sentiments, statuses };
  }, []);

  const selectedExecMetric = useMemo(
    () =>
      reportingExecMetrics.find((metric) => metric.id === selectedExecMetricId) ??
      reportingExecMetrics[0],
    [selectedExecMetricId],
  );

  const selectedVariance = useMemo(
    () =>
      reportingVarianceBreakdowns.find((set) => set.id === selectedVarianceId) ??
      reportingVarianceBreakdowns[0],
    [selectedVarianceId],
  );

  const benchmarkDetails = useMemo(
    () =>
      reportingBenchmarkMatrix.find((row) => row.channel === selectedBenchmarkChannel) ??
      reportingBenchmarkMatrix[0],
    [selectedBenchmarkChannel],
  );

  const goalProgressWithPercent = useMemo(
    () =>
      reportingGoalProgress.map((goal) => {
        const percentage = Math.min(
          1,
          goal.current / (goal.target === 0 ? 1 : goal.target),
        );
        return { ...goal, percentage };
      }),
    [],
  );

  const filteredAlerts = useMemo(
    () =>
      reportingAlertFeed.filter((alert) =>
        selectedAlertFilter === "all"
          ? true
          : alert.category === selectedAlertFilter,
      ),
    [selectedAlertFilter],
  );

  const analyticsSnapshot = useMemo(() => {
    const farcasterLive = posts.filter((post) =>
      post.channels.includes("farcaster"),
    ).length;
    const instagramLive = posts.filter((post) =>
      post.channels.includes("instagram"),
    ).length;
    const crossposted = posts.filter((post) => post.channels.length > 1).length;
    const scheduledTotal = plannedPosts.length;
    const reachVelocity = Math.min(
      100,
      farcasterLive * 12 + instagramLive * 10 + scheduledTotal * 8,
    );
    const next = sortedPlannedPosts[0];
    const syncCoverage = posts.length
      ? Math.round((crossposted / posts.length) * 100)
      : 0;
    const runwayHours = next
      ? Math.max(
          1,
          Math.round(
            (new Date(next.scheduledFor).getTime() - Date.now()) /
              (1000 * 60 * 60),
          ),
        )
      : 0;
    const runwayLabel = !next
      ? "Add a plan"
      : runwayHours <= 3
      ? "Today"
      : `${Math.floor(runwayHours / 24)}d ${runwayHours % 24}h`;
    const velocityToken = velocityBadge(reachVelocity);
    const channelBreakdown = (Object.keys(channelCatalog) as ChannelId[]).map(
      (channelId) => {
        const live = posts.filter((post) =>
          post.channels.includes(channelId),
        ).length;
        const scheduled = plannedPosts.filter((plan) =>
          plan.channels.includes(channelId),
        ).length;
        const total = live + scheduled;
        const livePercent = total ? Math.round((live / total) * 100) : 0;
        return {
          channelId,
          live,
          scheduled,
          livePercent,
          total,
        };
      },
    );
    const tiles = [
      {
        id: "velocity",
        title: "Reach velocity",
        value: `${reachVelocity}%`,
        helper: `Live: ${farcasterLive + instagramLive} • Scheduled: ${scheduledTotal}`,
        badge: velocityToken,
      },
      {
        id: "alignment",
        title: "Cross-channel alignment",
        value: `${syncCoverage}%`,
        helper: `${crossposted} of ${posts.length || 0} posts mirrored`,
        badge: { label: "Sync rate", tone: "bg-white/15 text-white" },
      },
      {
        id: "runway",
        title: "Schedule runway",
        value: runwayLabel,
        helper: `Next slot: ${
          next ? formatScheduleLabel(next.scheduledFor) : "Nothing booked"
        }`,
        badge: { label: "Planner", tone: "bg-sky-400/25 text-sky-100" },
      },
    ];
    const enhancedKpis = metricKpiSeed.map((kpi) => {
      if (kpi.id === "reach") {
        const value = Math.round(
          kpi.value + (farcasterLive + instagramLive + scheduledTotal) * 3,
        );
        const delta = Math.round(kpi.delta + crossposted * 0.8);
        return { ...kpi, value, delta };
      }
      if (kpi.id === "conversion") {
        const value = parseFloat(
          (kpi.value + Math.min(1.2, activeChannels.length * 0.2)).toFixed(1),
        );
        const delta = parseFloat(
          (kpi.delta + (activeChannels.length > 1 ? 0.2 : 0)).toFixed(1),
        );
        return { ...kpi, value, delta };
      }
      if (kpi.id === "growth") {
        const value = Math.round(
          kpi.value + Math.max(0, plannedPosts.length - 2) * 2,
        );
        const delta = Math.round(kpi.delta + channelBreakdown.length * 1.5);
        return { ...kpi, value, delta };
      }
      return kpi;
    });
    const metricDashboard = {
      kpis: enhancedKpis,
      chartSeries: {
        reachConversion: reachConversionTrend,
        growthMomentum: growthMomentumTrend,
      },
      conversionStages,
      insightPool: metricInsightPool,
    };
    return {
      farcasterLive,
      instagramLive,
      scheduledTotal,
      tiles,
      channelBreakdown,
      nextSlot: next ? formatScheduleLabel(next.scheduledFor) : "Add a slot",
      velocityToken,
      metricDashboard,
    };
  }, [activeChannels, plannedPosts, posts, sortedPlannedPosts]);

  const metricCards = useMemo(() =>
    analyticsSnapshot.metricDashboard.kpis.map((kpi) => {
      const displayValue = formatMetricValue(kpi.value, kpi.unit);
      const deltaLabel = formatMetricDelta(kpi.delta, kpi.unit);
      const deltaTone = metricDeltaTone(kpi.delta);
      const path = buildSparklinePath(kpi.trend, 160, 48);
      return {
        ...kpi,
        displayValue,
        deltaLabel,
        deltaTone,
        path,
      };
    }),
  [analyticsSnapshot.metricDashboard.kpis]);

  const reachConversionSeries =
    analyticsSnapshot.metricDashboard.chartSeries.reachConversion;
  const growthMomentumSeries =
    analyticsSnapshot.metricDashboard.chartSeries.growthMomentum;

  const [comparisonVisibility, setComparisonVisibility] = useState({
    reach: true,
    conversionRate: true,
  });
  const [activeComparisonIndex, setActiveComparisonIndex] = useState(() =>
    Math.max(0, reachConversionSeries.length - 1),
  );

  useEffect(() => {
    setComparisonVisibility({ reach: true, conversionRate: true });
    setActiveComparisonIndex(Math.max(0, reachConversionSeries.length - 1));
  }, [reachConversionSeries]);

  const comparisonChart = useMemo(() => {
    const reachValues = reachConversionSeries.map((point) => point.reach);
    const conversionValues = reachConversionSeries.map(
      (point) => point.conversionRate,
    );
    return {
      points: reachConversionSeries,
      reachPath: buildSparklinePath(reachValues, 320, 140),
      conversionPath: buildSparklinePath(conversionValues, 320, 140),
    };
  }, [reachConversionSeries]);

  const [growthVisibility, setGrowthVisibility] = useState({
    total: true,
    farcaster: true,
    instagram: true,
  });
  const [activeGrowthIndex, setActiveGrowthIndex] = useState(() =>
    Math.max(0, growthMomentumSeries.length - 1),
  );

  useEffect(() => {
    setGrowthVisibility({ total: true, farcaster: true, instagram: true });
    setActiveGrowthIndex(Math.max(0, growthMomentumSeries.length - 1));
  }, [growthMomentumSeries]);

  const growthChart = useMemo(() => {
    const totalPath = buildSparklinePath(
      growthMomentumSeries.map((point) => point.total),
      320,
      140,
    );
    const farcasterPath = buildSparklinePath(
      growthMomentumSeries.map((point) => point.farcaster),
      320,
      140,
    );
    const instagramPath = buildSparklinePath(
      growthMomentumSeries.map((point) => point.instagram),
      320,
      140,
    );
    return {
      points: growthMomentumSeries,
      totalPath,
      farcasterPath,
      instagramPath,
    };
  }, [growthMomentumSeries]);

  const activeComparisonPoint =
    comparisonChart.points[
      Math.min(activeComparisonIndex, comparisonChart.points.length - 1)
    ] ?? comparisonChart.points[comparisonChart.points.length - 1];

  const activeGrowthPoint =
    growthChart.points[
      Math.min(activeGrowthIndex, growthChart.points.length - 1)
    ] ?? growthChart.points[growthChart.points.length - 1];

  const toggleComparisonSeries = (key: "reach" | "conversionRate") => {
    setComparisonVisibility((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      if (!next.reach && !next.conversionRate) {
        return prev;
      }
      return next;
    });
  };

  const toggleGrowthSeries = (
    key: "total" | "farcaster" | "instagram",
  ) => {
    setGrowthVisibility((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      if (!next.total && !next.farcaster && !next.instagram) {
        return prev;
      }
      return next;
    });
  };

  const handleToggle = (channelId: ChannelId) => {
    setChannelState((prev) => ({
      ...prev,
      [channelId]: !prev[channelId],
    }));
  };

  const handleScheduleToggle = (channelId: ChannelId) => {
    setScheduleChannels((prev) => ({
      ...prev,
      [channelId]: !prev[channelId],
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isPosting) return;

    const trimmed = draft.trim();
    if (!trimmed) {
      setFeedback({ tone: "error", message: "Write your update first." });
      return;
    }

    if (activeChannels.length === 0) {
      setFeedback({
        tone: "error",
        message: "Pick at least one channel to share this update.",
      });
      return;
    }

    setIsPosting(true);
    setFeedback(null);

    window.setTimeout(() => {
      setPosts((prev) => [
        {
          id: `mock-${Date.now()}`,
          author: "You",
          avatarGradient: "from-rose-400 via-violet-500 to-indigo-500",
          highlight: "Simulated cross-post",
          content: trimmed,
          channels: activeChannels,
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ]);
      setDraft("");
      setIsPosting(false);
      setFeedback({
        tone: "success",
        message: `Shared to ${activeChannels
          .map((id) => channelCatalog[id].label)
          .join(" & ")}`,
      });
    }, 700);
  };

  const handleScheduleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isScheduling) return;

    const trimmedTitle = scheduleTitle.trim();
    if (!trimmedTitle) {
      setScheduleFeedback({
        tone: "error",
        message: "Give your scheduled post a headline.",
      });
      return;
    }

    if (!scheduleDate || !scheduleTime) {
      setScheduleFeedback({
        tone: "error",
        message: "Choose when this update should launch.",
      });
      return;
    }

    if (scheduleActiveChannels.length === 0) {
      setScheduleFeedback({
        tone: "error",
        message: "Pick at least one channel for the schedule.",
      });
      return;
    }

    setIsScheduling(true);
    setScheduleFeedback(null);

    const isoTimestamp = new Date(
      `${scheduleDate}T${scheduleTime}:00`,
    ).toISOString();

    window.setTimeout(() => {
      const stamp = Date.now();
      const commentTimestamp = new Date().toISOString();
      const launchDate = new Date(isoTimestamp).getTime();

      const newPlan: PlannedPost = {
        id: `plan-${stamp}`,
          title: trimmedTitle,
          summary:
            scheduleSummary.trim() ||
            "We will enrich this summary closer to launch.",
          scheduledFor: isoTimestamp,
          channels: scheduleActiveChannels,
          status: "queued",
          owner: "You",
        approvalSteps: [
          {
            id: `strategy-${stamp}`,
            label: "Strategy check",
            approver: "Ameena",
            status: "pending",
            due: new Date(launchDate - 1000 * 60 * 60 * 2).toISOString(),
          },
          {
            id: `creative-${stamp}`,
            label: "Creative polish",
            approver: "Kai",
            status: "pending",
            due: new Date(launchDate - 1000 * 60 * 45).toISOString(),
          },
        ],
        commentThread: [
          {
            id: `comment-${stamp}`,
            author: "You",
            message: "Queued this drop for auto-publish.",
            at: commentTimestamp,
            tone: "note",
          },
        ],
      };

      setPlannedPosts((prev) => [...prev, newPlan]);
      setScheduleTitle("");
      setScheduleSummary("");
      setScheduleDate("");
      setScheduleTime("");
      setScheduleChannels({
        farcaster: true,
        instagram: false,
        x: false,
        lens: false,
        mirror: false,
      });
      setIsScheduling(false);
      setScheduleFeedback({
        tone: "success",
        message: `Slotted for ${formatScheduleLabel(isoTimestamp)} on ${scheduleActiveChannels
          .map((id) => channelCatalog[id].label)
          .join(" & ")}`,
      });
    }, 600);
  };

  const handleOpenWallet = () => {
    appKitModal.open();
  };

  const handleDisconnectWallet = () => {
    disconnect();
  };

  const handleWorkflowSelect = (postId: string) => {
    setSelectedWorkflowPostId(postId);
    setWorkflowNote("");
  };

  const handleWorkflowCommentSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const trimmed = workflowNote.trim();
    if (!trimmed || !workflowContext.selectedPlan) return;
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: "You",
      message: trimmed,
      at: new Date().toISOString(),
      tone: "note",
    };
    setPlannedPosts((prev) =>
      prev.map((plan) =>
        plan.id === workflowContext.selectedPlan?.id
          ? { ...plan, commentThread: [newComment, ...plan.commentThread] }
          : plan,
      ),
    );
    setWorkflowNote("");
  };

  const handleApprovalAction = (
    planId: string,
    action: "approve" | "changes",
  ) => {
    setPlannedPosts((prev) =>
      prev.map((plan) => {
        if (plan.id !== planId || !plan.approvalSteps.length) return plan;

        const updatedSteps = plan.approvalSteps.map((step) => ({ ...step }));
        const updatedComments = [...plan.commentThread];
        const timestamp = new Date().toISOString();

        if (action === "approve") {
          const pendingIndex = updatedSteps.findIndex(
            (step) => step.status === "pending" || step.status === "changes",
          );
          if (pendingIndex === -1) return plan;
          const targetStep = updatedSteps[pendingIndex];
          updatedSteps[pendingIndex] = { ...targetStep, status: "approved" };
          updatedComments.unshift({
            id: `comment-${Date.now()}-approve`,
            author: "You",
            message: `Approved ${targetStep.label}.`,
            at: timestamp,
            tone: "note",
          });
          const allApproved = updatedSteps.every(
            (step) => step.status === "approved",
          );
          const nextStatus = allApproved ? "approved" : "queued";
          return {
            ...plan,
            approvalSteps: updatedSteps,
            status: nextStatus,
            commentThread: updatedComments,
          };
        }

        const pendingIndex = updatedSteps.findIndex(
          (step) => step.status === "pending",
        );
        const targetIndex =
          pendingIndex !== -1 ? pendingIndex : updatedSteps.length - 1;
        const targetStep = updatedSteps[targetIndex];
        updatedSteps[targetIndex] = { ...targetStep, status: "changes" };
        updatedComments.unshift({
          id: `comment-${Date.now()}-changes`,
          author: "You",
          message: `Requested edits on ${targetStep.label}.`,
          at: timestamp,
          tone: "mention",
        });

        return {
          ...plan,
          approvalSteps: updatedSteps,
          status: "draft",
          commentThread: updatedComments,
        };
      }),
    );
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplateId(templateId);
  };

  const handleDistributionToggle = (channelId: ChannelId) => {
    setDistributionMatrix((prev) => ({
      ...prev,
      [channelId]: !prev[channelId],
    }));
  };

  const handleToneSelect = (toneId: string) => {
    setSelectedToneId(toneId);
  };

  const handlePersonaSelect = (personaId: string) => {
    setSelectedPersonaId(personaId);
  };

  const handleIdeaSelect = (ideaId: string) => {
    setSelectedIdeaId(ideaId);
  };

  const handleApplyIdea = (ideaId: string, snippet: string) => {
    setSelectedIdeaId(ideaId);
    setAiDraft(snippet);
  };

  const handleInsertSmartReply = (suggestion: string) => {
    setAiDraft((prev) => {
      if (!prev.trim()) return suggestion;
      return `${prev.trim()}\n\n${suggestion}`;
    });
  };

  const handleDeckSelect = (deckId: string) => {
    setSelectedDeckId(deckId);
  };

  const handleExportSelect = (exportId: string) => {
    setSelectedExportId(exportId);
  };

  const handleSentimentFilterChange = (filterId: string) => {
    setSelectedSentimentFilter(filterId);
  };

  const handleStatusFilterChange = (filterId: string) => {
    setSelectedEngagementStatus(filterId);
  };

  const handleReportingViewChange = (
    view: "overview" | "exports" | "deep-dive",
  ) => {
    setReportingView(view);
  };

  const handleExecMetricSelect = (metricId: string) => {
    setSelectedExecMetricId(metricId);
  };

  const handleVarianceSelect = (varianceId: string) => {
    setSelectedVarianceId(varianceId);
  };

  const handleBenchmarkSelect = (channelId: ChannelId) => {
    setSelectedBenchmarkChannel(channelId);
  };

  const handleAlertFilterChange = (filterId: string) => {
    setSelectedAlertFilter(filterId);
  };

  const handleSequenceSelect = (sequenceId: string) => {
    setSelectedSequenceId(sequenceId);
  };

  const handleCalendarViewToggle = (view: "week" | "month") => {
    setCalendarView(view);
  };

  const handleCalendarFocusChange = (day: string) => {
    setCalendarFocus(day);
  };

  const handleForecastSelect = (forecastId: string) => {
    setSelectedForecastId(forecastId);
  };

  const handleRecommendationSelect = (recId: string) => {
    setSelectedRecommendationId(recId);
  };

  const handlePerformancePostSelect = (postId: string) => {
    setSelectedPerformancePostId(postId);
  };

  const handleAutomationSelect = (autoId: string) => {
    setSelectedAutomationId(autoId);
  };

  const handleNotificationSelect = (notifId: string) => {
    setSelectedNotificationId(notifId);
  };

  const handleContentTemplateSelect = (templateId: string) => {
    setSelectedContentTemplateId(templateId);
  };

  const handleAbTestSelect = (testId: string) => {
    setSelectedAbTestId(testId);
  };

  const selectedPerformancePost = useMemo(
    () =>
      contentPerformancePosts.find((p) => p.id === selectedPerformancePostId) ??
      contentPerformancePosts[0],
    [selectedPerformancePostId],
  );

  const selectedAutomation = useMemo(
    () =>
      workflowAutomations.find((a) => a.id === selectedAutomationId) ?? workflowAutomations[0],
    [selectedAutomationId],
  );

  const selectedContentTemplate = useMemo(
    () =>
      contentTemplates.find((t) => t.id === selectedContentTemplateId) ?? contentTemplates[0],
    [selectedContentTemplateId],
  );

  const selectedAbTest = useMemo(
    () => abTests.find((t) => t.id === selectedAbTestId) ?? abTests[0],
    [selectedAbTestId],
  );

  const unreadNotifications = useMemo(
    () => notifications.filter((n) => !n.read),
    [],
  );

  const handleMentionSelect = (mentionId: string) => {
    setSelectedMentionId(mentionId);
  };

  const handleInfluencerSelect = (influencerId: string) => {
    setSelectedInfluencerId(influencerId);
  };

  const handleCrisisSelect = (crisisId: string) => {
    setSelectedCrisisId(crisisId);
  };

  const handleProductSelect = (productId: string) => {
    setSelectedProductId(productId);
  };

  const handleEventSelect = (eventId: string) => {
    setSelectedEventId(eventId);
  };

  const handleModerationSelect = (modId: string) => {
    setSelectedModerationId(modId);
  };

  const handleRoiSelect = (roiId: string) => {
    setSelectedRoiId(roiId);
  };

  const handleAccountSelect = (accountId: string) => {
    setSelectedAccountId(accountId);
  };

  const handleRecycledSelect = (recycledId: string) => {
    setSelectedRecycledId(recycledId);
  };

  const handleEngagementRuleSelect = (ruleId: string) => {
    setSelectedEngagementRuleId(ruleId);
  };

  const selectedModeration = useMemo(
    () =>
      contentModerationQueue.find((m) => m.id === selectedModerationId) ??
      contentModerationQueue[0],
    [selectedModerationId],
  );

  const selectedRoi = useMemo(
    () => roiCampaigns.find((r) => r.id === selectedRoiId) ?? roiCampaigns[0],
    [selectedRoiId],
  );

  const selectedAccount = useMemo(
    () =>
      managedAccounts.find((a) => a.id === selectedAccountId) ?? managedAccounts[0],
    [selectedAccountId],
  );

  const selectedRecycled = useMemo(
    () =>
      recycledContent.find((r) => r.id === selectedRecycledId) ?? recycledContent[0],
    [selectedRecycledId],
  );

  const selectedEngagementRule = useMemo(
    () =>
      engagementAutomationRules.find((r) => r.id === selectedEngagementRuleId) ??
      engagementAutomationRules[0],
    [selectedEngagementRuleId],
  );

  const filteredMentions = useMemo(
    () =>
      socialListeningMentions.filter((mention) => {
        const keywordMatches =
          listeningKeywordFilter === "all" || mention.keyword === listeningKeywordFilter;
        const sentimentMatches =
          listeningSentimentFilter === "all" || mention.sentiment === listeningSentimentFilter;
        return keywordMatches && sentimentMatches;
      }),
    [listeningKeywordFilter, listeningSentimentFilter],
  );

  const selectedMention = useMemo(
    () =>
      socialListeningMentions.find((m) => m.id === selectedMentionId) ??
      socialListeningMentions[0],
    [selectedMentionId],
  );

  const selectedInfluencer = useMemo(
    () =>
      influencerProfiles.find((i) => i.id === selectedInfluencerId) ?? influencerProfiles[0],
    [selectedInfluencerId],
  );

  const selectedCrisis = useMemo(
    () => crisisAlerts.find((c) => c.id === selectedCrisisId) ?? crisisAlerts[0],
    [selectedCrisisId],
  );

  const selectedProduct = useMemo(
    () =>
      socialCommerceProducts.find((p) => p.id === selectedProductId) ??
      socialCommerceProducts[0],
    [selectedProductId],
  );

  const selectedEvent = useMemo(
    () => calendarEvents.find((e) => e.id === selectedEventId) ?? calendarEvents[0],
    [selectedEventId],
  );

  const selectedForecast = useMemo(
    () => intelligenceForecasts.find((f) => f.id === selectedForecastId) ?? intelligenceForecasts[0],
    [selectedForecastId],
  );

  const selectedRecommendation = useMemo(
    () =>
      contentRecommendations.find((r) => r.id === selectedRecommendationId) ??
      contentRecommendations[0],
    [selectedRecommendationId],
  );

  const comparisonMetrics = useMemo(() => {
    if (!activeComparisonPoint) {
      return {
        label: "—",
        reach: "0k",
        conversionRate: "0.0%",
        conversions: "0",
      };
    }
    return {
      label: activeComparisonPoint.label,
      reach: `${activeComparisonPoint.reach}k`,
      conversionRate: `${activeComparisonPoint.conversionRate.toFixed(1)}%`,
      conversions: activeComparisonPoint.conversions.toLocaleString(),
    };
  }, [activeComparisonPoint]);

  const growthMetrics = useMemo(() => {
    if (!activeGrowthPoint) {
      return {
        label: "—",
        total: "0k",
        farcaster: "0k",
        instagram: "0k",
      };
    }
    return {
      label: activeGrowthPoint.label,
      total: `${activeGrowthPoint.total}k`,
      farcaster: `${activeGrowthPoint.farcaster}k`,
      instagram: `${activeGrowthPoint.instagram}k`,
    };
  }, [activeGrowthPoint]);

  const automatedInsight = useMemo(() => {
    const kpis = analyticsSnapshot.metricDashboard.kpis;
    if (!kpis.length) return null;
    const ranked = [...kpis].sort((a, b) => b.delta - a.delta);
    const focus = ranked[0];
    const template =
      metricInsightPool.find((entry) => entry.metric === focus.id) ??
      metricInsightPool[0] ?? {
        id: "fallback-insight",
        headline: "Momentum steady",
        detail: "Keep steady cadence to sustain reach.",
        metric: "reach" as MetricKpiId,
      };
    const secondary = metricInsightPool.filter(
      (entry) => entry.metric !== focus.id,
    );
    return {
      primary: {
        ...template,
        metricLabel: focus.label,
        value: formatMetricValue(focus.value, focus.unit),
        delta: formatMetricDelta(focus.delta, focus.unit),
        deltaLabel: focus.deltaLabel,
      },
      secondary,
    };
  }, [analyticsSnapshot.metricDashboard.kpis]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-sky-600 text-white">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-16 lg:px-12">
        <header className="relative isolate overflow-hidden rounded-4xl border border-white/15 bg-white/10 p-8 sm:p-10 shadow-[0_20px_70px_rgba(59,7,100,0.35)] backdrop-blur-2xl lg:px-12 lg:py-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div className="absolute -left-32 top-10 h-64 w-64 rounded-full bg-gradient-to-br from-fuchsia-500/40 via-sky-400/30 to-indigo-500/40 blur-3xl" />
            <div className="absolute bottom-[-6rem] right-[-3rem] h-72 w-72 rounded-full bg-gradient-to-br from-sky-400/30 via-purple-500/25 to-rose-500/30 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08)_0%,_transparent_55%)]" />
          </div>
          <div className="relative grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="max-w-2xl space-y-6 sm:space-y-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-slate-100/90">
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
                1Social Platform
            </span>
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-[52px]">
                  Align your voice across every channel.
          </h1>
                <p className="text-lg leading-relaxed text-slate-100/80 md:text-xl">
                  Share once, syndicate instantly, and keep Reown wallet
                  signatures ready for Farcaster. This preview shows how your
                  launch team can stay in lockstep.
            </p>
          </div>
              <div className="grid gap-3 text-sm text-slate-100/80 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-3xl border border-white/15 bg-white/10 p-4">
                  <span className="mt-0.5 h-2.5 w-2.5 rounded-full bg-emerald-300" />
                <div>
                    <p className="font-semibold text-white">Multichannel Posting</p>
                    <p>Mirror every update to Farcaster and Instagram in seconds.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-3xl border border-white/15 bg-white/10 p-4">
                  <span className="mt-0.5 h-2.5 w-2.5 rounded-full bg-sky-300" />
                  <div>
                    <p className="font-semibold text-white">Wallet-Ready Flows</p>
                    <p>Stay connected with Reown AppKit to approve content fast.</p>
                  </div>
                </div>
              </div>
            <nav className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
              {dashboardSections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] text-slate-100 transition hover:border-white/40 hover:bg-white/15"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
                  {section.label}
                </a>
              ))}
            </nav>
            </div>
            <div className="w-full max-w-md place-self-center space-y-5">
              <div className="relative overflow-hidden rounded-4xl border border-white/15 bg-slate-950/60 p-7 sm:p-8 shadow-2xl shadow-purple-600/20 backdrop-blur-3xl">
                <div className="absolute -top-10 right-[-30%] h-40 w-40 rounded-full bg-gradient-to-br from-sky-400/30 via-fuchsia-500/20 to-emerald-400/20 blur-2xl" />
                <div className="absolute bottom-[-24%] left-[-10%] h-36 w-36 rounded-full bg-gradient-to-br from-indigo-500/25 via-purple-500/20 to-transparent blur-2xl" />
                <div className="relative flex flex-col gap-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-slate-200/80">
                    Wallet Center
                  </p>
                      <h2 className="text-lg font-semibold text-white">
                    {isConnected
                          ? "Reown wallet connected."
                          : "Sign in with Reown wallet"}
                      </h2>
                      <p className="text-sm leading-relaxed text-slate-200/75">
                        {isConnected
                          ? "You are ready to approve Farcaster signatures and publish."
                          : "Connect your Reown wallet to prep Farcaster signatures and sync drafts."}
                  </p>
                </div>
                <span
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold ${
                    isConnected
                          ? "border-emerald-400/40 bg-emerald-400/15 text-emerald-100"
                          : "border-rose-400/40 bg-rose-400/20 text-rose-100"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isConnected ? "bg-emerald-300" : "bg-rose-300"
                    }`}
                  />
                  {isConnected ? "Live" : "Offline"}
                </span>
              </div>

                  <div className="grid gap-3 rounded-3xl border border-white/15 bg-slate-950/70 p-4 text-sm text-slate-100/80">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs uppercase tracking-[0.35em] text-slate-300/70">
                        Address
                      </span>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-slate-200/70">
                        {isConnected ? "Connected" : "Offline"}
                      </span>
                    </div>
                    <p className="truncate text-base font-semibold text-white">
                  {truncateAddress(address)}
                </p>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-300/60">
                  {activeNetwork?.name ?? "No network selected"}
          </p>
        </div>

                  <ul className="grid gap-3 text-sm text-slate-200/80 sm:grid-cols-2 sm:gap-4">
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-300" />
                      <div>
                        <p className="font-semibold text-white">Farcaster-ready signing</p>
                        <p>Approve casts straight from the dashboard without tab-hopping.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-300" />
                      <div>
                        <p className="font-semibold text-white">Secure sync</p>
                        <p>Reown AppKit keeps your session fresh across every channel.</p>
                      </div>
                    </li>
                  </ul>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={handleOpenWallet}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-indigo-500/40 transition hover:shadow-xl hover:shadow-indigo-500/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {isConnected ? "Manage wallet" : "Connect wallet"}
                </button>
                {isConnected && (
                  <button
                    type="button"
                    onClick={handleDisconnectWallet}
                        className="inline-flex items-center justify-center rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-white/60 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Disconnect
                  </button>
                )}
              </div>

                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-slate-300/70">
                    <span>Mock environment</span>
                    <span>No real posts sent</span>
            </div>
                </div>
              </div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-200/60 text-center sm:text-left">
                Need help? Ping the team in #wallet-ops.
          </p>
        </div>
          </div>
        </header>

        <section className="grid gap-4 rounded-4xl border border-white/15 bg-white/5 p-6 shadow-[0_14px_50px_rgba(76,29,149,0.25)] backdrop-blur-2xl sm:grid-cols-2 xl:grid-cols-3">
          {metricCards.map((card) => (
            <article
              key={card.id}
              className="relative flex flex-col justify-between gap-4 overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-5 shadow-inner shadow-purple-900/20"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                    {card.label}
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-white">
                    {card.displayValue}
                  </p>
                  <p className="mt-1 text-xs text-slate-200/70">{card.deltaLabel}</p>
                </div>
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${card.deltaTone.tone}`}
                >
                  <span>{card.deltaTone.icon}</span>
                  {card.deltaLabel}
                </span>
              </div>
              <svg
                viewBox="0 0 160 48"
                role="img"
                aria-label={`${card.label} sparkline`}
                className="h-16 w-full text-sky-300"
              >
                <path
                  d={card.path}
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="3"
                />
              </svg>
            </article>
          ))}
        </section>

        <section
          id="broadcast"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/20 bg-white/10 p-8 shadow-[0_18px_60px_rgba(91,33,182,0.35)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold">Create a broadcast</h2>
              <p className="text-sm text-slate-100/75">
                Choose where this update should land. We will expand into more
                social destinations soon.
              </p>
            </header>

            <div className="flex flex-wrap gap-3">
              {(Object.keys(channelCatalog) as ChannelId[]).map((channelId) => {
                const channel = channelCatalog[channelId];
                const active = channelState[channelId];
                return (
                  <button
                    key={channelId}
                    type="button"
                    aria-label={`Toggle ${channel.label}`}
                    onClick={() => handleToggle(channelId)}
                    className={`group flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                      active
                        ? "border-transparent bg-white text-slate-900 shadow-xl shadow-white/30"
                        : "border-white/30 bg-white/10 text-slate-100/80 hover:bg-white/20"
                    }`}
                  >
                    <span
                      className={`h-2.5 w-2.5 rounded-full transition ${
                        active ? channel.dot : "bg-white/40"
                      }`}
                    />
                    <span>{channel.label}</span>
                  </button>
                );
              })}
        </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-inner shadow-purple-500/20"
            >
              <label className="space-y-2">
                <span className="text-sm font-semibold uppercase tracking-wide text-slate-200/80">
                  Your story
                </span>
                <textarea
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Tell the world what you're shipping..."
                  className="min-h-[140px] w-full resize-none rounded-2xl border border-white/20 bg-slate-950/60 p-4 text-base text-slate-50 placeholder:text-slate-400 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/60"
                />
              </label>

              <div className="flex flex-col gap-4 text-sm text-slate-100/70">
                {activeChannels.map((channelId) => (
                  <div
                    key={channelId}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3"
                  >
                    <span
                      className={`mt-1 h-2.5 w-2.5 rounded-full ${channelCatalog[channelId].dot}`}
                    />
                    <div>
                      <p className="font-semibold text-white">
                        {channelCatalog[channelId].label}
                      </p>
                      <p>{channelCatalog[channelId].description}</p>
                    </div>
                  </div>
                ))}
                {activeChannels.length === 0 && (
                  <p className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-3 text-center font-medium text-slate-200/70">
                    Select at least one channel to broadcast.
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-200/60">
                  Posting is simulated • No blockchain writes
                </p>
                <button
                  type="submit"
                  disabled={isPosting}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-fuchsia-500/40 transition hover:shadow-xl hover:shadow-fuchsia-500/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isPosting ? "Sharing..." : "Post to all"}
                </button>
              </div>

              <div aria-live="polite" className="min-h-6 text-sm">
                {feedback && (
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-medium ${
                      feedback.tone === "success"
                        ? "bg-emerald-400/20 text-emerald-100"
                        : "bg-rose-500/30 text-rose-100"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        feedback.tone === "success"
                          ? "bg-emerald-300"
                          : "bg-rose-300"
                      }`}
                    />
                    {feedback.message}
                  </span>
                )}
              </div>
            </form>
          </article>

          <aside className="flex flex-col gap-6 rounded-4xl border border-white/20 bg-white/10 p-6 shadow-[0_18px_60px_rgba(14,116,144,0.35)] backdrop-blur-2xl">
            <h2 className="text-xl font-semibold text-white">
              Recent multichannel posts
            </h2>
            <div className="flex flex-col gap-4">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/20"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${post.avatarGradient} text-sm font-semibold uppercase text-white shadow-lg`}
                      >
                        {post.author.slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {post.author}
                        </p>
                        <p className="text-xs uppercase tracking-wider text-slate-300/60">
                          {formatRelativeTime(post.createdAt)}
          </p>
        </div>
                    </div>
                    {post.highlight && (
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-slate-100/80">
                        {post.highlight}
                      </span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-slate-100/85">
                    {post.content}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.channels.map((channelId) => (
                      <span
                        key={`${post.id}-${channelId}`}
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${channelCatalog[channelId].badge}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${channelCatalog[channelId].dot}`}
                        />
                        {channelCatalog[channelId].label}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
        </div>
          </aside>
        </section>

        <section
          id="plan"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/20 bg-white/10 p-8 shadow-[0_18px_60px_rgba(56,189,248,0.3)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Plan the week</h2>
              <p className="text-sm text-slate-100/75">
                Stage drops for later. Scheduling is simulated, giving a feel for calendar orchestration.
              </p>
            </header>

            <form
              onSubmit={handleScheduleSubmit}
              className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-slate-950/40 p-6 shadow-inner shadow-sky-500/20"
            >
              <div className="grid gap-4 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)]">
                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-200/70">
                    Headline
                  </span>
                  <input
                    value={scheduleTitle}
                    onChange={(event) => setScheduleTitle(event.target.value)}
                    placeholder="e.g. Creators AMA countdown"
                    className="rounded-2xl border border-white/20 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/60"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-200/70">
                    Summary
                  </span>
                  <textarea
                    value={scheduleSummary}
                    onChange={(event) => setScheduleSummary(event.target.value)}
                    placeholder="Optional teaser to brief the team."
                    className="h-[88px] w-full resize-none rounded-2xl border border-white/20 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/60"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-200/70">
                    Launch date
                  </span>
                  <input
                    type="date"
                    value={scheduleDate}
                    onChange={(event) => setScheduleDate(event.target.value)}
                    className="rounded-2xl border border-white/20 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-white focus:outline-none focus:ring-2 focus:ring-white/60"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-200/70">
                    Launch time
                  </span>
                  <input
                    type="time"
                    value={scheduleTime}
                    onChange={(event) => setScheduleTime(event.target.value)}
                    className="rounded-2xl border border-white/20 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-white focus:outline-none focus:ring-2 focus:ring-white/60"
                  />
                </label>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-200/70">
                  Channels
                </p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {(Object.keys(channelCatalog) as ChannelId[]).map((channelId) => {
                    const channel = channelCatalog[channelId];
                    const active = scheduleChannels[channelId];
                    return (
                      <label
                        key={`schedule-${channelId}`}
                        className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 ${
                          active
                            ? "border-transparent bg-white text-slate-900 shadow-xl shadow-white/25"
                            : "border-white/30 bg-white/10 text-slate-100/80 hover:bg-white/15"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={active}
                          onChange={() => handleScheduleToggle(channelId)}
                          className="sr-only"
                        />
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${
                            active ? channel.dot : "bg-white/40"
                          }`}
                        />
                        <span>{channel.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-slate-200/70">
                  Scheduling is mock-only—use it to prototype cadence.
                </p>
                <button
                  type="submit"
                  disabled={isScheduling}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-cyan-500/30 transition hover:shadow-xl hover:shadow-cyan-500/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isScheduling ? "Scheduling..." : "Schedule broadcast"}
                </button>
              </div>

              <div aria-live="polite" className="min-h-6 text-sm">
                {scheduleFeedback && (
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-medium ${
                      scheduleFeedback.tone === "success"
                        ? "bg-emerald-400/20 text-emerald-100"
                        : "bg-rose-500/30 text-rose-100"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        scheduleFeedback.tone === "success"
                          ? "bg-emerald-300"
                          : "bg-rose-300"
                      }`}
                    />
                    {scheduleFeedback.message}
                  </span>
                )}
              </div>
            </form>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-200/70">
                  Upcoming timeline
                </h3>
                <span className="text-xs text-slate-100/70">
                  {analyticsSnapshot.scheduledTotal} scheduled
                </span>
              </div>
              <ol className="space-y-4">
                {sortedPlannedPosts.map((plan) => {
                  const accent =
                    channelCatalog[plan.channels[0]]?.accent ??
                    "from-slate-200 to-slate-400";
                  const statusBadge = scheduleStatusStyles[plan.status];
                  const isSelected =
                    workflowContext.selectedPlan?.id === plan.id;
                  const canApprove = plan.approvalSteps.some(
                    (step) =>
                      step.status === "pending" || step.status === "changes",
                  );

                  return (
                    <li
                      key={plan.id}
                      className={`relative overflow-hidden rounded-3xl border bg-white/5 p-5 shadow-lg shadow-sky-900/20 transition ${
                        isSelected
                          ? "border-white/60 ring-2 ring-white/30"
                          : "border-white/10 hover:border-white/30"
                      }`}
                    >
                      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-transparent via-white/40 to-transparent" />
                      <div className="flex flex-col gap-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${accent} text-xs font-semibold uppercase text-white shadow-lg`}
                            >
                              {plan.owner.slice(0, 2)}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-white">
                                {plan.title}
                              </p>
                              <p className="text-xs uppercase tracking-wider text-slate-300/60">
                                {formatScheduleLabel(plan.scheduledFor)} ·{" "}
                                {formatTimeUntil(plan.scheduledFor)}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${statusBadge.badge}`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${statusBadge.dot}`}
                            />
                            {statusBadge.label}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-100/85">
                          {plan.summary}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {plan.channels.map((channelId) => (
                            <span
                              key={`${plan.id}-${channelId}`}
                              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${channelCatalog[channelId].badge}`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${channelCatalog[channelId].dot}`}
                              />
                              {channelCatalog[channelId].label}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {plan.approvalSteps.map((step) => {
                            const token = approvalStatusTokens[step.status];
                            return (
                              <span
                                key={`${plan.id}-${step.id}`}
                                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${token.badge}`}
                              >
                                <span
                                  className={`h-1.5 w-1.5 rounded-full ${token.dot}`}
                                />
                                {step.label}
                                <span className="text-[10px] uppercase tracking-wider text-white/70">
                                  {formatTimeUntil(step.due)}
                                </span>
                              </span>
                            );
                          })}
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <button
                            type="button"
                            onClick={() => handleApprovalAction(plan.id, "approve")}
                            disabled={!canApprove}
                            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:border-white/60 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            Approve step
                          </button>
                          <button
                            type="button"
                            onClick={() => handleApprovalAction(plan.id, "changes")}
                            className="inline-flex items-center gap-2 rounded-full border border-amber-400/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-100 transition hover:bg-amber-400/20"
                          >
                            Request edits
                          </button>
                          <button
                            type="button"
                            onClick={() => handleWorkflowSelect(plan.id)}
                            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:border-white/40 hover:bg-white/10"
                          >
                            Review workflow
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
                {sortedPlannedPosts.length === 0 && (
                  <li className="rounded-3xl border border-dashed border-white/20 bg-white/5 p-6 text-center text-sm text-slate-100/70">
                    No scheduled content yet. Queue your first post above.
                  </li>
                )}
              </ol>
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/20 bg-white/10 p-6 shadow-[0_18px_60px_rgba(59,7,100,0.25)] backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-200/70">
                    Growth pulse
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-white">
                    Snapshot analytics
                  </h3>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${analyticsSnapshot.velocityToken.tone}`}
                >
                  {analyticsSnapshot.velocityToken.label}
                </span>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {analyticsSnapshot.tiles.map((tile) => (
                  <div
                    key={tile.id}
                    className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-inner shadow-purple-900/20"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-200/70">
                        {tile.title}
                      </h4>
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-semibold ${tile.badge.tone}`}
                      >
                        {tile.badge.label}
                      </span>
                    </div>
                    <p className="mt-4 text-3xl font-semibold text-white">
                      {tile.value}
                    </p>
                    <p className="mt-2 text-xs text-slate-100/70">{tile.helper}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-4xl border border-white/20 bg-white/10 p-6 shadow-[0_18px_60px_rgba(14,116,144,0.25)] backdrop-blur-2xl">
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-200/70">
                Channel breakdown
              </h3>
              <p className="mt-2 text-sm text-slate-100/75">
                Compare live vs scheduled presence per network.
              </p>
              <div className="mt-5 space-y-5">
                {analyticsSnapshot.channelBreakdown.map(
                  ({ channelId, live, scheduled, livePercent, total }) => {
                    const widthClass = percentWidthClass(
                      total ? livePercent : 0,
                    );
                    const queuePercent = total
                      ? Math.max(0, 100 - livePercent)
                      : 100;
                    return (
                      <div
                        key={channelId}
                        className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-4"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span
                              className={`h-2.5 w-2.5 rounded-full ${channelCatalog[channelId].dot}`}
                            />
                            <p className="text-sm font-semibold text-white">
                              {channelCatalog[channelId].label}
                            </p>
                          </div>
                          <span className="text-xs text-slate-200/70">
                            {live} live · {scheduled} scheduled
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${channelCatalog[channelId].accent} ${widthClass}`}
                          />
                        </div>
                        <p className="text-xs text-slate-200/70">
                          Live {livePercent}% • Queue {queuePercent}%
                        </p>
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          </aside>
        </section>

        <section
          id="workflow"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.95fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(168,85,247,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">
                Workflow control center
              </h2>
              <p className="text-sm text-slate-100/75">
                Assign ownership, track approvals, and keep the team in sync.
                Select a planned post to review the latest activity.
              </p>
            </header>

            <div className="flex flex-wrap gap-2">
              {sortedPlannedPosts.map((plan) => {
                const isActive = workflowContext.selectedPlan?.id === plan.id;
                return (
                  <button
                    key={`workflow-tab-${plan.id}`}
                    type="button"
                    onClick={() => handleWorkflowSelect(plan.id)}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold uppercase tracking-wide transition ${
                      isActive
                        ? "border-white/60 bg-white text-slate-900 shadow-lg shadow-white/30"
                        : "border-white/20 bg-white/5 text-slate-100 hover:border-white/40 hover:bg-white/10"
                    }`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <span className="text-xs font-medium text-slate-400">
                      {plan.owner}
                    </span>
                    {plan.title}
                  </button>
                );
              })}
            </div>

            {workflowContext.selectedPlan ? (
              <div className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                  <div className="space-y-6">
                    <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                            Owner
                          </p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            {workflowContext.selectedPlan.owner}
                          </p>
                        </div>
                        <span
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${scheduleStatusStyles[workflowContext.selectedPlan.status].badge}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${scheduleStatusStyles[workflowContext.selectedPlan.status].dot}`}
                          />
                          {scheduleStatusStyles[workflowContext.selectedPlan.status].label}
                        </span>
                      </div>
                      <p className="mt-4 text-xs uppercase tracking-[0.35em] text-slate-200/60">
                        Launch window
                      </p>
                      <p className="mt-1 text-sm text-slate-100/80">
                        {formatScheduleLabel(workflowContext.selectedPlan.scheduledFor)} ·{" "}
                        {formatTimeUntil(workflowContext.selectedPlan.scheduledFor)}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {workflowContext.selectedPlan.channels.map((channelId) => (
                          <span
                            key={`workflow-channel-${workflowContext.selectedPlan?.id}-${channelId}`}
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${channelCatalog[channelId].badge}`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${channelCatalog[channelId].dot}`}
                            />
                            {channelCatalog[channelId].label}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                        Approval steps
                      </h3>
                      <ol className="space-y-3">
                        {workflowContext.steps.map((step) => {
                          const token = approvalStatusTokens[step.status];
                          return (
                            <li
                              key={`workflow-step-${step.id}`}
                              className="flex items-center justify-between gap-4 rounded-3xl border border-white/15 bg-white/5 p-4"
                            >
                              <div className="flex items-center gap-3">
                                <span
                                  className={`h-2.5 w-2.5 rounded-full ${token.dot}`}
                                />
                                <div>
                                  <p className="text-sm font-semibold text-white">
                                    {step.label}
                                  </p>
                                  <p className="text-xs text-slate-200/70">
                                    {step.approver} · {formatTimeUntil(step.due)}
                                  </p>
                                </div>
                              </div>
                              <span
                                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${token.badge}`}
                              >
                                {token.label}
                              </span>
                            </li>
                          );
                        })}
                      </ol>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                        Team comments
                      </h3>
                      <span className="text-xs text-slate-200/70">
                        {workflowContext.comments.length} notes
                      </span>
                    </div>
                    <div className="space-y-3 overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-4">
                      <div className="max-h-64 space-y-3 overflow-y-auto pr-2">
                        {workflowContext.comments.map((comment) => (
                          <article
                            key={comment.id}
                            className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <p className="text-sm font-semibold text-white">
                                {comment.author}
                              </p>
                              <span className="text-xs text-slate-300/70">
                                {formatRelativeTime(comment.at)}
                              </span>
                            </div>
                            <p className="mt-2 text-sm leading-relaxed text-slate-100/80">
                              {comment.message}
                            </p>
                          </article>
                        ))}
                        {workflowContext.comments.length === 0 && (
                          <p className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-4 text-center text-sm text-slate-200/70">
                            No comments yet. Leave guidance for the team below.
                          </p>
                        )}
                      </div>
                      <form
                        onSubmit={handleWorkflowCommentSubmit}
                        className="mt-2 flex flex-col gap-3"
                      >
                        <label className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                          Add a note
                        </label>
                        <textarea
                          value={workflowNote}
                          onChange={(event) => setWorkflowNote(event.target.value)}
                          placeholder="Share updates or requests for this post..."
                          className="min-h-[96px] rounded-2xl border border-white/20 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/60"
                        />
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-400 via-fuchsia-500 to-indigo-500 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-lg shadow-purple-600/40 transition hover:shadow-xl hover:shadow-purple-600/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                          Post comment
                        </button>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                      Live presence
                    </h3>
                    <p className="mt-2 text-xs text-slate-200/70">
                      Who is currently touching this rollout.
                    </p>
                    <ul className="mt-4 space-y-3">
                      {teamPresenceRoster.map((member) => {
                        const token = presenceStatusTokens[member.status];
                        return (
                          <li
                            key={member.id}
                            className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                          >
                            <span
                              className={`mt-1 h-2.5 w-2.5 rounded-full ${token.dot}`}
                            />
                            <div className="space-y-1 text-sm text-slate-100/80">
                              <div className="flex items-center justify-between gap-3">
                                <p className="font-semibold text-white">{member.name}</p>
                                <span
                                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${token.badge}`}
                                >
                                  {token.label}
                                </span>
                              </div>
                              <p className="text-xs uppercase tracking-[0.3em] text-slate-200/60">
                                {member.role}
                              </p>
                              <p className="text-xs text-slate-200/70">{member.focus}</p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                      Approval routing
                    </h3>
                    <p className="mt-2 text-xs text-slate-200/70">
                      View who signs off each stage and how fallbacks trigger.
                    </p>
                    <ol className="mt-4 space-y-3">
                      {approvalRoutes.map((route) => (
                        <li
                          key={route.id}
                          className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-sm font-semibold text-white">{route.stage}</p>
                            <span className="text-xs text-slate-200/70">
                              {route.owners.length} owner{route.owners.length === 1 ? "" : "s"}
                            </span>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-200/80">
                            {route.owners.map((owner) => (
                              <span
                                key={`${route.id}-${owner}`}
                                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 uppercase tracking-[0.3em]"
                              >
                                {owner}
                              </span>
                            ))}
                          </div>
                          <p className="mt-3 text-xs text-slate-200/70">{route.fallback}</p>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-3">
                    <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                          Mentions
                        </h3>
                        <span className="text-xs text-slate-200/70">
                          {collaborationMentions.filter((m) => !m.resolved && m.planId === workflowContext.selectedPlan?.id).length} active
                        </span>
                      </div>
                      <ul className="mt-4 space-y-3">
                        {collaborationMentions
                          .filter((mention) => mention.planId === workflowContext.selectedPlan?.id)
                          .map((mention) => (
                            <li
                              key={mention.id}
                              className={`rounded-2xl border border-white/10 bg-slate-950/40 p-4 ${mention.resolved ? "opacity-60" : ""}`}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <p className="text-xs font-semibold text-white">{mention.mentionedBy}</p>
                                <span className={`text-[10px] uppercase tracking-wider ${mention.resolved ? "text-emerald-300" : "text-amber-300"}`}>
                                  {mention.resolved ? "Resolved" : "Pending"}
                                </span>
                              </div>
                              <p className="mt-2 text-sm text-slate-100/80">{mention.message}</p>
                              <p className="mt-2 text-xs text-slate-200/60">
                                {formatRelativeTime(mention.at)}
                              </p>
                            </li>
                          ))}
                        {collaborationMentions.filter((m) => m.planId === workflowContext.selectedPlan?.id).length === 0 && (
                          <li className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-4 text-center text-xs text-slate-200/70">
                            No mentions for this post
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                          Checklists
                        </h3>
                        <span className="text-xs text-slate-200/70">
                          {collaborationChecklists
                            .find((c) => c.planId === workflowContext.selectedPlan?.id)
                            ?.items.filter((i) => !i.checked).length ?? 0} pending
                        </span>
                      </div>
                      <ul className="mt-4 space-y-3">
                        {collaborationChecklists
                          .find((checklist) => checklist.planId === workflowContext.selectedPlan?.id)
                          ?.items.map((item) => (
                            <li
                              key={item.id}
                              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/40 p-3"
                            >
                              <input
                                type="checkbox"
                                checked={item.checked}
                                readOnly
                                aria-label={item.label}
                                className="h-4 w-4 rounded border-white/20 bg-white/5 text-emerald-400 focus:ring-2 focus:ring-emerald-400/50"
                              />
                              <div className="flex-1">
                                <p className={`text-sm ${item.checked ? "text-slate-400 line-through" : "text-white"}`}>
                                  {item.label}
                                </p>
                                <p className="text-xs text-slate-200/60">{item.assignedTo}</p>
                              </div>
                            </li>
                          ))}
                        {!collaborationChecklists.find((c) => c.planId === workflowContext.selectedPlan?.id) && (
                          <li className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-4 text-center text-xs text-slate-200/70">
                            No checklist for this post
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                          Handoffs
                        </h3>
                        <span className="text-xs text-slate-200/70">
                          {collaborationHandoffs.filter((h) => h.planId === workflowContext.selectedPlan?.id && h.status === "pending").length} active
                        </span>
                      </div>
                      <ul className="mt-4 space-y-3">
                        {collaborationHandoffs
                          .filter((handoff) => handoff.planId === workflowContext.selectedPlan?.id)
                          .map((handoff) => (
                            <li
                              key={handoff.id}
                              className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <div>
                                  <p className="text-xs font-semibold text-white">{handoff.from} → {handoff.to}</p>
                                  <p className="mt-1 text-sm text-slate-100/80">{handoff.action}</p>
                                </div>
                                <span className={`text-[10px] uppercase tracking-wider ${handoff.status === "completed" ? "text-emerald-300" : "text-amber-300"}`}>
                                  {handoff.status}
                                </span>
                              </div>
                              <p className="mt-2 text-xs text-slate-200/60">
                                {formatRelativeTime(handoff.at)}
                              </p>
                            </li>
                          ))}
                        {collaborationHandoffs.filter((h) => h.planId === workflowContext.selectedPlan?.id).length === 0 && (
                          <li className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-4 text-center text-xs text-slate-200/70">
                            No handoffs for this post
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="rounded-3xl border border-dashed border-white/20 bg-white/5 p-6 text-center text-sm text-slate-200/70">
                Add a schedule first to unlock workflow tracking.
              </p>
            )}
          </article>

          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(59,7,100,0.2)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Audience insights</h2>
              <p className="text-sm text-slate-100/75">
                Track growth momentum, prime publishing windows, and actionable
                follow-ups across Farcaster and Instagram.
              </p>
            </header>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/15 bg-slate-950/40 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                      Reach vs conversion
                    </p>
                    <p className="mt-1 text-xs text-slate-200/60">
                      Toggle lines to inspect how reach drives wallet conversions.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleComparisonSeries("reach")}
                      className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider transition ${
                        comparisonVisibility.reach
                          ? "border-white/70 bg-white text-slate-900 shadow-lg shadow-white/30"
                          : "border-white/20 bg-white/5 text-slate-100 hover:border-white/40 hover:bg-white/10"
                      }`}
                    >
                      Reach
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleComparisonSeries("conversionRate")}
                      className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider transition ${
                        comparisonVisibility.conversionRate
                          ? "border-white/70 bg-white text-slate-900 shadow-lg shadow-white/30"
                          : "border-white/20 bg-white/5 text-slate-100 hover:border-white/40 hover:bg-white/10"
                      }`}
                    >
                      Conversion
                    </button>
                  </div>
                </div>
                <div className="mt-5 space-y-4">
                  <div className="flex flex-wrap gap-4 text-sm text-white">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.25em] text-slate-200/60">
                        Focus · {comparisonMetrics.label}
                      </p>
                    </div>
                    {comparisonVisibility.reach && (
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-200/60">
                          Reach
                        </p>
                        <p className="text-lg font-semibold">
                          {comparisonMetrics.reach}
                        </p>
                      </div>
                    )}
                    {comparisonVisibility.conversionRate && (
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-200/60">
                          Conversion rate
                        </p>
                        <p className="text-lg font-semibold">
                          {comparisonMetrics.conversionRate}
                        </p>
                        <p className="text-xs text-slate-200/60">
                          {comparisonMetrics.conversions} conversions
                        </p>
                      </div>
                    )}
                  </div>
                  <svg
                    viewBox="0 0 320 140"
                    role="img"
                    aria-label="Reach versus conversion chart"
                    className="h-36 w-full text-white/40"
                  >
                    <line
                      x1="0"
                      y1="130"
                      x2="320"
                      y2="130"
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="1"
                    />
                    {comparisonVisibility.reach && (
                      <path
                        d={comparisonChart.reachPath}
                        className={`${chartColorTokens.reach}`}
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="3"
                      />
                    )}
                    {comparisonVisibility.conversionRate && (
                      <path
                        d={comparisonChart.conversionPath}
                        className={`${chartColorTokens.conversionRate}`}
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="3"
                        strokeDasharray="6 4"
                      />
                    )}
                  </svg>
                  <div className="flex flex-wrap gap-2">
                    {comparisonChart.points.map((point, index) => {
                      const isActive = index === activeComparisonIndex;
                      return (
                        <button
                          key={`comparison-${point.label}`}
                          type="button"
                          onMouseEnter={() => setActiveComparisonIndex(index)}
                          onFocus={() => setActiveComparisonIndex(index)}
                          className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider transition ${
                            isActive
                              ? "border-white/80 bg-white text-slate-900 shadow-lg shadow-white/30"
                              : "border-white/20 bg-white/5 text-slate-100 hover:border-white/40 hover:bg-white/10"
                          }`}
                        >
                          {point.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/15 bg-slate-950/40 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                      Audience momentum
                    </p>
                    <p className="mt-1 text-xs text-slate-200/60">
                      Focus on total growth or drill into each network.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleGrowthSeries("total")}
                      className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider transition ${
                        growthVisibility.total
                          ? "border-white/70 bg-white text-slate-900 shadow-lg shadow-white/30"
                          : "border-white/20 bg-white/5 text-slate-100 hover:border-white/40 hover:bg-white/10"
                      }`}
                    >
                      Total
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleGrowthSeries("farcaster")}
                      className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider transition ${
                        growthVisibility.farcaster
                          ? "border-white/70 bg-white text-slate-900 shadow-lg shadow-white/30"
                          : "border-white/20 bg-white/5 text-slate-100 hover:border-white/40 hover:bg-white/10"
                      }`}
                    >
                      Farcaster
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleGrowthSeries("instagram")}
                      className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider transition ${
                        growthVisibility.instagram
                          ? "border-white/70 bg-white text-slate-900 shadow-lg shadow-white/30"
                          : "border-white/20 bg-white/5 text-slate-100 hover:border-white/40 hover:bg-white/10"
                      }`}
                    >
                      Instagram
                    </button>
                  </div>
                </div>
                <div className="mt-5 space-y-4">
                  <div className="flex flex-wrap gap-4 text-sm text-white">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.25em] text-slate-200/60">
                        Focus · {growthMetrics.label}
                      </p>
                    </div>
                    {growthVisibility.total && (
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-200/60">
                          Total network
                        </p>
                        <p className="text-lg font-semibold">
                          {growthMetrics.total}
                        </p>
                      </div>
                    )}
                    {growthVisibility.farcaster && (
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-200/60">
                          Farcaster
                        </p>
                        <p className="text-lg font-semibold">
                          {growthMetrics.farcaster}
                        </p>
                      </div>
                    )}
                    {growthVisibility.instagram && (
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-200/60">
                          Instagram
                        </p>
                        <p className="text-lg font-semibold">
                          {growthMetrics.instagram}
                        </p>
                      </div>
                    )}
                  </div>
                  <svg
                    viewBox="0 0 320 140"
                    role="img"
                    aria-label="Audience growth comparison chart"
                    className="h-36 w-full text-white/40"
                  >
                    <line
                      x1="0"
                      y1="130"
                      x2="320"
                      y2="130"
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="1"
                    />
                    {growthVisibility.total && (
                      <path
                        d={growthChart.totalPath}
                        className={`${chartColorTokens.total}`}
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="3"
                      />
                    )}
                    {growthVisibility.farcaster && (
                      <path
                        d={growthChart.farcasterPath}
                        className={`${chartColorTokens.farcaster}`}
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="3"
                        strokeDasharray="4 4"
                      />
                    )}
                    {growthVisibility.instagram && (
                      <path
                        d={growthChart.instagramPath}
                        className={`${chartColorTokens.instagram}`}
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="3"
                        strokeDasharray="2 4"
                      />
                    )}
                  </svg>
                  <div className="flex flex-wrap gap-2">
                    {growthChart.points.map((point, index) => {
                      const isActive = index === activeGrowthIndex;
                      return (
                        <button
                          key={`growth-${point.label}`}
                          type="button"
                          onMouseEnter={() => setActiveGrowthIndex(index)}
                          onFocus={() => setActiveGrowthIndex(index)}
                          className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider transition ${
                            isActive
                              ? "border-white/80 bg-white text-slate-900 shadow-lg shadow-white/30"
                              : "border-white/20 bg-white/5 text-slate-100 hover:border-white/40 hover:bg-white/10"
                          }`}
                        >
                          {point.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/15 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                    Farcaster followers
                  </p>
                  <span className="text-xs font-semibold text-emerald-200">
                    +{audienceInsights.farcasterDelta}
                  </span>
                </div>
                <p className="mt-2 text-3xl font-semibold text-white">
                  {audienceInsights.farcasterLatest}k
                </p>
                <svg
                  viewBox="0 0 140 42"
                  role="img"
                  aria-label="Farcaster follower sparkline"
                  className="mt-3 h-12 w-full text-emerald-300"
                >
                  <path
                    d={audienceInsights.farcasterPath}
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="3"
                  />
                </svg>
              </div>
              <div className="rounded-3xl border border-white/15 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                    Instagram followers
                  </p>
                  <span className="text-xs font-semibold text-fuchsia-200">
                    +{audienceInsights.instagramDelta}
                  </span>
                </div>
                <p className="mt-2 text-3xl font-semibold text-white">
                  {audienceInsights.instagramLatest}k
                </p>
                <svg
                  viewBox="0 0 140 42"
                  role="img"
                  aria-label="Instagram follower sparkline"
                  className="mt-3 h-12 w-full text-fuchsia-300"
                >
                  <path
                    d={audienceInsights.instagramPath}
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="3"
                  />
                </svg>
              </div>
            </div>

            <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Best time heatmap
                </h3>
                <span className="text-xs text-slate-200/70">
                  Peak slot · {audienceInsights.topSlot.day} · {audienceInsights.topSlot.slot}
                </span>
              </div>
              <div className="mt-4 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40">
                <table className="w-full border-collapse text-xs text-slate-100">
                  <thead>
                    <tr>
                      <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-400">
                        Slot
                      </th>
                      {audienceDays.map((day) => (
                        <th
                          key={`heatmap-day-${day}`}
                          className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-400"
                        >
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bestTimeGrid.map((row) => (
                      <tr key={`heatmap-${row.slot}`}>
                        <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-400">
                          {row.slot}
                        </th>
                        {row.values.map((value: number, index: number) => (
                          <td key={`heatmap-${row.slot}-${index}`} className="px-3 py-2">
                            <span
                              className={`flex h-8 w-12 items-center justify-center rounded-xl text-[11px] font-semibold ${heatLevelClass(
                                value,
                              )}`}
                            >
                              {value}
                            </span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                    Channel benchmarking
                  </h3>
                  <span className="text-xs text-slate-200/70">Cohort median</span>
                </div>
                <div className="mt-4 space-y-4">
                  {benchmarkMetrics.map((metric) => (
                    <div key={metric.id} className="space-y-3">
                      <div className="flex items-center justify-between text-sm text-white">
                        <span>{metric.label}</span>
                        <span className="text-xs text-slate-200/70">
                          Cohort {metric.cohort}%
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-slate-200/70">
                          <span>Farcaster</span>
                          <span>{metric.farcaster}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r from-purple-400 via-fuchsia-500 to-orange-300 ${percentWidthClass(
                              metric.farcaster,
                            )}`}
                          />
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-200/70">
                          <span>Instagram</span>
                          <span>{metric.instagram}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-red-400 ${percentWidthClass(
                              metric.instagram,
                            )}`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Community sentiment
                </h3>
                <div className="mt-4 space-y-3">
                  {sentimentSamples.map((sample) => (
                    <div
                      key={sample.id}
                      className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-white">{sample.segment}</p>
                        <span className="text-xs text-emerald-200">
                          +{sample.positive - sample.negative} net
                        </span>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] text-slate-200/70">
                        <span>Pos {sample.positive}%</span>
                        <span>Neu {sample.neutral}%</span>
                        <span>Neg {sample.negative}%</span>
                      </div>
                      <p className="mt-3 text-xs text-slate-100/75">{sample.highlight}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Retention funnel
                </h3>
                <span className="text-xs text-slate-200/70">Last 30 days</span>
              </div>
              <div className="mt-4 space-y-3">
                {retentionStages.map((stage) => (
                  <div key={stage.id} className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-white">
                      <span>{stage.stage}</span>
                      <span>{stage.rate}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400 ${percentWidthClass(
                          stage.rate,
                        )}`}
                      />
                    </div>
                    <p className="text-xs text-slate-200/70">{stage.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Audience segmentation
                </h3>
                <span className="text-xs text-slate-200/70">{audienceSegments.length} segments</span>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {audienceSegments.map((segment) => {
                  const coverageDiff = segment.coverage - segment.benchmark;
                  const trendPath = buildSparklinePath(segment.trend);
                  return (
                    <div
                      key={segment.id}
                      className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-white">{segment.label}</p>
                          <p className="mt-1 text-xs text-slate-200/70">
                            {channelCatalog[segment.channel].label} · {(segment.size / 1000).toFixed(1)}k
                          </p>
                        </div>
                        <span className={`text-xs font-semibold ${coverageDiff >= 0 ? "text-emerald-300" : "text-amber-300"}`}>
                          {coverageDiff >= 0 ? "+" : ""}{coverageDiff}% vs benchmark
                        </span>
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <p className="text-slate-200/60">Growth</p>
                          <p className="mt-1 font-semibold text-white">+{segment.growth}%</p>
                        </div>
                        <div>
                          <p className="text-slate-200/60">Engagement</p>
                          <p className="mt-1 font-semibold text-white">{segment.engagement}%</p>
                        </div>
                        <div>
                          <p className="text-slate-200/60">Coverage</p>
                          <p className="mt-1 font-semibold text-white">{segment.coverage}%</p>
                        </div>
                      </div>
                      <svg
                        viewBox="0 0 140 30"
                        role="img"
                        aria-label={`${segment.label} coverage trend`}
                        className="mt-3 h-8 w-full text-sky-300"
                      >
                        <path
                          d={trendPath}
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                    Sentiment trends
                  </h3>
                  <span className="text-xs text-slate-200/70">Last 7 days</span>
                </div>
                <div className="mt-4 space-y-3">
                  <svg
                    viewBox="0 0 320 120"
                    role="img"
                    aria-label="Sentiment trend chart"
                    className="h-32 w-full text-white/40"
                  >
                    <line
                      x1="0"
                      y1="110"
                      x2="320"
                      y2="110"
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="1"
                    />
                    <path
                      d={buildSparklinePath(sentimentHistory.map((h) => h.positive))}
                      className="text-emerald-300"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                    />
                    <path
                      d={buildSparklinePath(sentimentHistory.map((h) => h.neutral))}
                      className="text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                    <path
                      d={buildSparklinePath(sentimentHistory.map((h) => h.negative))}
                      className="text-rose-300"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                      strokeDasharray="2 4"
                    />
                  </svg>
                  <div className="flex flex-wrap gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-300" />
                      <span className="text-slate-200/70">Positive</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-slate-400" />
                      <span className="text-slate-200/70">Neutral</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-rose-300" />
                      <span className="text-slate-200/70">Negative</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                    Sentiment alerts
                  </h3>
                  <span className="text-xs text-slate-200/70">
                    {sentimentAlerts.filter((a) => !a.resolved).length} active
                  </span>
                </div>
                <ul className="mt-4 space-y-3">
                  {sentimentAlerts.map((alert) => (
                    <li
                      key={alert.id}
                      className={`rounded-2xl border p-4 ${alert.severity === "medium" ? "border-amber-400/50 bg-amber-400/10" : "border-slate-400/50 bg-slate-400/10"}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[10px] uppercase tracking-wider ${alert.severity === "medium" ? "text-amber-300" : "text-slate-300"}`}>
                          {alert.type.replace("_", " ")}
                        </span>
                        <span className="text-xs text-slate-200/70">
                          {channelCatalog[alert.channel].label}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-white">{alert.message}</p>
                      <p className="mt-2 text-xs text-slate-200/60">
                        {formatRelativeTime(alert.at)}
                      </p>
                    </li>
                  ))}
                  {sentimentAlerts.length === 0 && (
                    <li className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-4 text-center text-xs text-slate-200/70">
                      No active alerts
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Recommendation playbooks
                </h3>
                <span className="text-xs text-slate-200/70">
                  {recommendationPlaybooks.filter((p) => p.priority === "high").length} high priority
                </span>
              </div>
              <div className="mt-4 space-y-4">
                {recommendationPlaybooks.map((playbook) => {
                  const completedSteps = playbook.steps.filter((s) => s.status === "completed").length;
                  const totalSteps = playbook.steps.length;
                  return (
                    <div
                      key={playbook.id}
                      className="rounded-2xl border border-white/10 bg-slate-950/40 p-5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-semibold text-white">{playbook.title}</h4>
                            <span className={`text-[10px] uppercase tracking-wider ${playbook.priority === "high" ? "text-rose-300" : "text-amber-300"}`}>
                              {playbook.priority}
                            </span>
                          </div>
                          <p className="mt-2 text-xs text-slate-200/70">
                            {completedSteps}/{totalSteps} steps completed
                          </p>
                        </div>
                        <span className={`text-xs font-semibold uppercase tracking-wider ${playbook.metric === "conversion" ? chartColorTokens.conversionRate : playbook.metric === "reach" ? chartColorTokens.reach : playbook.metric === "growth" ? "text-emerald-300" : "text-slate-300"}`}>
                          {playbook.metric}
                        </span>
                      </div>
                      <ul className="mt-4 space-y-2">
                        {playbook.steps.map((step) => (
                          <li
                            key={step.id}
                            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3"
                          >
                            <span className={`h-2 w-2 rounded-full ${step.status === "completed" ? "bg-emerald-300" : "bg-slate-400"}`} />
                            <p className={`flex-1 text-sm ${step.status === "completed" ? "text-slate-400 line-through" : "text-white"}`}>
                              {step.action}
                            </p>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-200/70">
                            Creative angles
                          </p>
                          <ul className="mt-2 space-y-1">
                            {playbook.creativeAngles.map((angle, idx) => (
                              <li key={idx} className="text-xs text-slate-200/70">
                                • {angle}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-200/70">
                            Channel guidance
                          </p>
                          <ul className="mt-2 space-y-1">
                            {Object.entries(playbook.channelGuidance).map(([channel, guidance]) => (
                              <li key={channel} className="text-xs text-slate-200/70">
                                <span className="font-semibold text-white">{channelCatalog[channel as ChannelId].label}:</span> {guidance}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                Recommendations
              </h3>
              <div className="grid gap-3">
                {insightRecommendations.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-3xl border border-white/15 bg-white/5 p-4 shadow-inner shadow-purple-900/20"
                  >
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-2 text-sm text-slate-100/80">{item.detail}</p>
                  </article>
                ))}
              </div>
            </div>
          </article>
        </section>

        <section
          id="insights"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.95fr)]"
        >
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                Best time heatmap
              </h3>
              <span className="text-xs text-slate-200/70">
                Peak: {audienceInsights?.topSlot.day} · {audienceInsights?.topSlot.slot}
              </span>
            </div>
            <div className="mt-4 overflow-hidden rounded-3xl border border-white/15 bg-slate-950/40">
              <table className="w-full border-collapse text-xs text-slate-100">
                <thead>
                  <tr>
                    <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-400">
                      Slot
                    </th>
                    {audienceDays.map((day) => (
                      <th
                        key={`day-${day}`}
                        className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-400"
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bestTimeGrid.map((row) => (
                    <tr key={`slot-${row.slot}`}>
                      <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-400">
                        {row.slot}
                      </th>
                      {row.values.map((value: number, index: number) => (
                        <td key={`slot-${row.slot}-${index}`} className="px-3 py-2">
                          <span
                            className={`flex h-8 w-12 items-center justify-center rounded-xl text-[11px] font-semibold ${heatLevelClass(
                              value,
                            )}`}
                          >
                            {value}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
              Recommendations
            </h3>
            <div className="grid gap-3">
              {automatedInsight && (
                <article className="rounded-3xl border border-emerald-400/40 bg-emerald-500/10 p-5 shadow-inner shadow-emerald-500/20">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-emerald-200">
                    Automated signal · {automatedInsight.primary.metricLabel}
                  </p>
                  <h4 className="mt-2 text-lg font-semibold text-white">
                    {automatedInsight.primary.headline}
                  </h4>
                  <p className="mt-2 text-sm text-emerald-50/80">
                    {automatedInsight.primary.detail}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-100">
                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/20 px-3 py-1">
                      {automatedInsight.primary.value}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/50 bg-emerald-400/30 px-3 py-1 text-emerald-900">
                      {automatedInsight.primary.delta}
                    </span>
                  </div>
                  <p className="mt-1 text-xs uppercase tracking-[0.3em] text-emerald-100/70">
                    {automatedInsight.primary.deltaLabel}
                  </p>
                  {automatedInsight.secondary.length > 0 && (
                    <ul className="mt-4 space-y-2 text-xs text-emerald-100/80">
                      {automatedInsight.secondary.map((item) => (
                        <li key={item.id} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-300" />
                          <span>{item.headline}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              )}
              {insightRecommendations.map((item) => (
                <article
                  key={item.id}
                  className="rounded-3xl border border-white/15 bg-white/5 p-4 shadow-inner shadow-purple-900/20"
                >
                  <p className="text-sm font-semibold text-white">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm text-slate-100/80">
                    {item.detail}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/15 bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Farcaster followers
                </p>
                <span className="text-xs font-semibold text-emerald-200">
                  +{audienceInsights.farcasterDelta}
                </span>
              </div>
              <p className="mt-2 text-3xl font-semibold text-white">
                {audienceInsights.farcasterLatest}k
              </p>
              <svg
                viewBox="0 0 140 42"
                role="img"
                aria-label="Farcaster follower sparkline"
                className="mt-3 h-12 w-full text-emerald-300"
              >
                <path
                  d={audienceInsights.farcasterPath}
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="3"
                />
              </svg>
            </div>
            <div className="rounded-3xl border border-white/15 bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Instagram followers
                </p>
                <span className="text-xs font-semibold text-fuchsia-200">
                  +{audienceInsights.instagramDelta}
                </span>
              </div>
              <p className="mt-2 text-3xl font-semibold text-white">
                {audienceInsights.instagramLatest}k
              </p>
              <svg
                viewBox="0 0 140 42"
                role="img"
                aria-label="Instagram follower sparkline"
                className="mt-3 h-12 w-full text-fuchsia-300"
              >
                <path
                  d={audienceInsights.instagramPath}
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="3"
                />
              </svg>
            </div>
          </div>
        </section>

        <section
          id="distribution"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(56,189,248,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Distribution control</h2>
              <p className="text-sm text-slate-100/75">
                Manage channel availability, track mirrors, and review syndication performance at
                a glance.
              </p>
            </header>

            <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Channel availability
                </h3>
                <span className="text-xs text-slate-200/70">
                  {Object.values(distributionMatrix).filter(Boolean).length} active
                </span>
              </div>
              <p className="mt-3 text-xs text-slate-200/70">
                Toggle which networks automatically receive mirrored drops.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {(Object.keys(channelCatalog) as ChannelId[]).map((channelId) => {
                  const channel = channelCatalog[channelId];
                  const active = distributionMatrix[channelId];
                  return (
                    <button
                      key={`distribution-toggle-${channelId}`}
                      type="button"
                      onClick={() => handleDistributionToggle(channelId)}
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold uppercase tracking-wide transition ${
                        active
                          ? "border-white/70 bg-white text-slate-900 shadow-lg shadow-white/30"
                          : "border-white/20 bg-white/5 text-slate-100 hover:border-white/40 hover:bg-white/10"
                      }`}
                    >
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${active ? channel.dot : "bg-white/40"}`}
                      />
                      {channel.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                    Repost tracker
                  </h3>
                  <span className="text-xs text-slate-200/70">{repostLedger.length} routes</span>
                </div>
                <ul className="mt-4 space-y-3">
                  {repostLedger.map((event) => (
                    <li
                      key={event.id}
                      className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                    >
                      <div className="flex items-center justify-between text-sm text-white">
                        <span>{channelCatalog[event.source].label} →</span>
                        <span>{event.scheduledFor}</span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {event.targets.map((target) => (
                          <span
                            key={`${event.id}-${target}`}
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${channelCatalog[target].badge}`}
                          >
                            {channelCatalog[target].label}
                          </span>
                        ))}
                      </div>
                      <span
                        className={`mt-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${repostStatusTokens[event.status].badge}`}
                      >
                        {repostStatusTokens[event.status].label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                    Syndication history
                  </h3>
                  <span className="text-xs text-slate-200/70">
                    {syndicationHistory.length} syncs
                  </span>
                </div>
                <ol className="mt-4 space-y-3">
                  {syndicationHistory.map((entry) => (
                    <li
                      key={entry.id}
                      className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                    >
                      <div className="flex items-center justify-between text-sm text-white">
                        <span>{entry.title}</span>
                        <span className="text-xs text-slate-200/70">{entry.timestamp}</span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {entry.networks.map((networkId) => (
                          <span
                            key={`${entry.id}-${networkId}`}
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${channelCatalog[networkId].badge}`}
                          >
                            {channelCatalog[networkId].label}
                          </span>
                        ))}
                      </div>
                      <p className="mt-2 text-xs text-slate-200/70">{entry.effect}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(14,116,144,0.2)] backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Distribution summary
                </h3>
                <span className="text-xs text-slate-200/70">
                  {`${activeDistributionLabels.length}/${Object.keys(channelCatalog).length} networks`}
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-100/75">
                Keep the multi-network footprint balanced—toggle channels above to simulate rollout
                reach.
              </p>
              <div className="mt-4 space-y-3 text-xs text-slate-200/70">
                <p>
                  Active networks:{" "}
                  {activeDistributionLabels.length
                    ? activeDistributionLabels.join(", ")
                    : "None"}
                </p>
                <p>
                  Upcoming mirrors: {repostLedger.filter((event) => event.status !== "complete").length}
                </p>
                <p>
                  Completed syncs: {repostLedger.filter((event) => event.status === "complete").length}
                </p>
              </div>
            </div>
          </aside>
        </section>

        <section
          id="ai"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(147,51,234,0.35)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">AI Studio</h2>
              <p className="text-sm text-slate-100/75">
                Auto-draft posts, tune tone, and pull smart replies before publishing everywhere.
              </p>
            </header>

            <div className="rounded-3xl border border-white/15 bg-slate-950/40 p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                    Auto-draft composer
                  </h3>
                  <p className="mt-2 text-xs text-slate-200/70">
                    Feed AI the scenario. Adjust tone and persona to converge on the right voice.
                  </p>
                </div>
                <span className="text-xs text-slate-200/60">
                  {aiCharacterCount} characters
                </span>
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-slate-200/60">
                Base idea · {selectedIdea.headline}
              </p>
              <textarea
                value={aiDraft}
                onChange={(event) => setAiDraft(event.target.value)}
                placeholder="Summarize the AMA highlights with a confident tone..."
                className="mt-4 min-h-[160px] w-full resize-y rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/60"
              />
              <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)]">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                    Tone
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {aiToneOptions.map((tone) => {
                      const active = tone.id === selectedToneId;
                      return (
                        <button
                          key={tone.id}
                          type="button"
                          onClick={() => handleToneSelect(tone.id)}
                          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider transition ${
                            active
                              ? "border-white/70 bg-white text-slate-900 shadow-lg shadow-white/30"
                              : "border-white/20 bg-white/5 text-slate-100 hover:border-white/40 hover:bg-white/10"
                          }`}
                        >
                          {tone.label}
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-3 text-xs text-slate-200/70">{selectedTone.description}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                    Persona
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {aiPersonas.map((persona) => {
                      const active = persona.id === selectedPersonaId;
                      return (
                        <button
                          key={persona.id}
                          type="button"
                          onClick={() => handlePersonaSelect(persona.id)}
                          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider transition ${
                            active
                              ? "border-emerald-400/50 bg-emerald-400/20 text-emerald-100 shadow-lg shadow-emerald-500/30"
                              : "border-white/20 bg-white/5 text-slate-100 hover:border-white/40 hover:bg-white/10"
                          }`}
                        >
                          {persona.label}
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-3 text-xs text-slate-200/70">{selectedPersona.summary}</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Jump-start ideas
                </h3>
                <span className="text-xs text-slate-200/70">
                  {aiDraftIdeas.length} suggestions
                </span>
              </div>
              <div className="mt-4 grid gap-3 lg:grid-cols-3">
                {aiDraftIdeas.map((idea) => {
                  const active = idea.id === selectedIdeaId;
                  return (
                    <div
                      key={idea.id}
                      className={`flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-slate-950/40 p-4 ${
                        active ? "ring-1 ring-white/40" : ""
                      }`}
                    >
                      <div>
                        <p className="text-sm font-semibold text-white">{idea.headline}</p>
                        <p className="mt-2 text-xs text-slate-200/70">{idea.snippet}</p>
                      </div>
                      <div className="mt-4 flex items-center justify-between text-xs text-slate-200/70">
                        <button
                          type="button"
                          onClick={() => handleApplyIdea(idea.id, idea.snippet)}
                          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 uppercase tracking-[0.3em] text-white hover:border-white/40 hover:bg-white/10"
                        >
                          Use idea
                        </button>
                        <button
                          type="button"
                          onClick={() => handleIdeaSelect(idea.id)}
                          className={`rounded-full border px-2 py-1 text-[10px] uppercase tracking-[0.3em] ${
                            active
                              ? "border-white/70 bg-white text-slate-900"
                              : "border-white/20 text-slate-200/70"
                          }`}
                        >
                          Mark
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(59,7,100,0.25)] backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Smart replies
                </h3>
                <span className="text-xs text-slate-200/70">{aiSmartReplies.length} queued</span>
              </div>
              <ul className="mt-4 space-y-3">
                {aiSmartReplies.map((item) => (
                  <li
                    key={item.id}
                    className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                  >
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-200/60">
                      <span>{channelCatalog[item.channel].label}</span>
                      <span>{item.author}</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-100/85">{item.message}</p>
                    <button
                      type="button"
                      onClick={() => handleInsertSmartReply(item.suggestion)}
                      className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/50 bg-emerald-400/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-100 hover:border-emerald-300/70 hover:bg-emerald-400/30"
                    >
                      Insert suggestion
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(56,189,248,0.25)] backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  AI activity log
                </h3>
                <span className="text-xs text-slate-200/70">{aiActivityLog.length} entries</span>
              </div>
              <ul className="mt-4 space-y-3">
                {aiActivityLog.map((entry) => (
                  <li
                    key={entry.id}
                    className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-100/80"
                  >
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-200/60">
                      <span>{entry.action}</span>
                      <span>{entry.timestamp}</span>
                    </div>
                    <p className="mt-2">{entry.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>

        <section
          id="reporting"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(14,165,233,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Reporting hub</h2>
              <p className="text-sm text-slate-100/75">
                Preview decks, schedule exports, and review KPI snapshots before sharing with
                stakeholders.
              </p>
            </header>

            <div className="flex flex-wrap gap-2">
              {[
                { id: "overview", label: "Executive overview" },
                { id: "exports", label: "Decks & exports" },
                { id: "deep-dive", label: "Variance deep-dive" },
              ].map((view) => {
                const active = reportingView === view.id;
                return (
                  <button
                    key={view.id}
                    type="button"
                    onClick={() =>
                      handleReportingViewChange(view.id as "overview" | "exports" | "deep-dive")
                    }
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold uppercase tracking-wide transition ${
                      active
                        ? "border-white/70 bg-white text-slate-900 shadow-lg shadow-white/30"
                        : "border-white/20 bg-white/5 text-slate-100 hover:border-white/40 hover:bg-white/10"
                    }`}
                  >
                    {view.label}
                  </button>
                );
              })}
            </div>

            {reportingView === "overview" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                    Executive dashboard
                  </h3>
                  <div className="mt-3 grid gap-3 md:grid-cols-3">
                    {reportingExecMetrics.map((metric) => {
                      const active = metric.id === selectedExecMetricId;
                      return (
                        <button
                          key={metric.id}
                          type="button"
                          onClick={() => handleExecMetricSelect(metric.id)}
                          className={`flex h-full flex-col justify-between rounded-3xl border p-5 text-left transition ${
                            active
                              ? "border-white/70 bg-white text-slate-900 shadow-lg shadow-white/30"
                              : "border-white/15 bg-white/5 text-slate-100 hover:border-white/40 hover:bg-white/10"
                          }`}
                        >
                          <div className="space-y-3">
                            <p className="text-xs uppercase tracking-[0.3em] text-slate-200/70">
                              {metric.label}
                            </p>
                            <div
                              className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-gradient-to-r ${metric.gradient} px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white`}
                            >
                              {metric.primary}
                            </div>
                            <p className="text-xs uppercase tracking-[0.3em] text-slate-200/70">
                              {metric.delta}
                            </p>
                          </div>
                          <p className="text-xs text-slate-200/80">{metric.summary}</p>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-4 rounded-3xl border border-white/15 bg-slate-950/40 p-5 text-sm text-slate-100/85">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-200/60">
                      Spotlight insight
                    </p>
                    <p className="mt-2 text-base font-semibold text-white">
                      {selectedExecMetric.summary}
                    </p>
                    <p className="mt-2 text-xs text-slate-200/70">
                      Calibrate next week's briefing with this data point—auto-attach to Monday's KPI
                      deck.
                    </p>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                        Goal runway
                      </h3>
                      <p className="mt-2 text-xs text-slate-200/70">
                        Track mission-critical KPIs with owner visibility.
                      </p>
                    </div>
                    <span className="text-xs text-slate-200/70">
                      {goalProgressWithPercent.filter((goal) => goal.percentage >= 1).length} goals
                      completed
                    </span>
                  </div>
                  <ul className="mt-4 space-y-3">
                    {goalProgressWithPercent.map((goal) => {
                      const widthClass = pickProgressWidthClass(goal.percentage);
                      return (
                        <li
                          key={goal.id}
                          className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-100/85"
                        >
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-white">{goal.title}</p>
                            <span className="text-xs uppercase tracking-[0.3em] text-slate-200/60">
                              {goal.due}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-slate-200/70">Owner: {goal.owner}</p>
                          <div className="mt-3 h-2 rounded-full bg-white/10">
                            <div
                              className={`h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 ${widthClass}`}
                            />
                          </div>
                          <p className="mt-2 text-xs text-slate-200/70">
                            {goal.current.toLocaleString()} / {goal.target.toLocaleString()}{" "}
                            ({Math.round(goal.percentage * 100)}%)
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            )}

            {reportingView === "exports" && (
              <>
                <div className="grid gap-4 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)]">
                  <div className="space-y-3">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                      Deck library
                    </h3>
                    <ul className="space-y-2">
                      {reportingDecks.map((deck) => {
                        const active = deck.id === selectedDeckId;
                        return (
                          <li key={deck.id}>
                            <button
                              type="button"
                              onClick={() => handleDeckSelect(deck.id)}
                              className={`flex w-full items-center justify-between gap-3 rounded-2xl border px-3 py-3 text-left text-sm transition ${
                                active
                                  ? "border-white/70 bg-white text-slate-900 shadow-lg shadow-white/30"
                                  : "border-white/15 bg-white/5 text-slate-100 hover:border-white/40 hover:bg-white/10"
                              }`}
                            >
                              <div>
                                <p className="font-semibold">{deck.title}</p>
                                <p className="text-xs text-slate-200/70">{deck.timeframe}</p>
                              </div>
                              <span className="text-xs uppercase tracking-[0.3em] text-slate-200/70">
                                {deck.status}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="rounded-3xl border border-white/15 bg-slate-950/40 p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                      Deck preview
                    </p>
                      <div
                        className={`mt-4 flex h-48 flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-br ${selectedDeck.accent} p-6 text-white`}
                      >
                        <div>
                          <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                            {selectedDeck.timeframe}
                          </p>
                          <h4 className="mt-3 text-xl font-semibold">{selectedDeck.title}</h4>
                        </div>
                        <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em]">
                          <span>{selectedDeck.size}</span>
                          <span>{selectedDeck.status}</span>
                        </div>
                      </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white hover:border-white/40 hover:bg-white/15"
                      >
                        Download PDF
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white hover:border-white/40 hover:bg-white/15"
                      >
                        Share link
                      </button>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                      Export automations
                    </h3>
                    <span className="text-xs text-slate-200/70">{reportingExports.length} jobs</span>
                  </div>
                  <div className="mt-4 grid gap-3 lg:grid-cols-3">
                    {reportingExports.map((exportJob) => {
                      const active = exportJob.id === selectedExportId;
                      return (
                        <button
                          key={exportJob.id}
                          type="button"
                          onClick={() => handleExportSelect(exportJob.id)}
                          className={`flex h-full flex-col justify-between rounded-2xl border px-4 py-4 text-left text-sm transition ${
                            active
                              ? "border-white/70 bg-white text-slate-900 shadow-lg shadow-white/30"
                              : "border-white/15 bg-white/5 text-slate-100 hover:border-white/40 hover:bg-white/10"
                          }`}
                        >
                          <div>
                            <p className="font-semibold">{exportJob.label}</p>
                            <p className="mt-2 text-xs text-slate-200/70">
                              {exportJob.description}
                            </p>
                          </div>
                          <div className="mt-4 space-y-1 text-[11px] uppercase tracking-[0.3em] text-slate-200/60">
                            <p>{exportJob.lastRun}</p>
                            <p>{exportJob.destination}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-100/85">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-200/60">
                      <span>Active export</span>
                      <span>{selectedExport.lastRun}</span>
                    </div>
                    <p className="mt-2 font-semibold text-white">{selectedExport.label}</p>
                    <p className="mt-1 text-xs text-slate-200/70">{selectedExport.description}</p>
                    <p className="mt-3 text-xs uppercase tracking-[0.3em] text-slate-200/60">
                      Destination: {selectedExport.destination}
                    </p>
                  </div>
                </div>
              </>
            )}

            {reportingView === "deep-dive" && (
              <div className="space-y-6">
                <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                        Variance explorer
                      </h3>
                      <p className="mt-2 text-xs text-slate-200/70">
                        Diagnose where performance diverged from targets.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {reportingVarianceBreakdowns.map((set) => {
                        const active = set.id === selectedVarianceId;
                        return (
                          <button
                            key={set.id}
                            type="button"
                            onClick={() => handleVarianceSelect(set.id)}
                            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider transition ${
                              active
                                ? "border-emerald-400/60 bg-emerald-400/20 text-emerald-100"
                                : "border-white/20 bg-white/5 text-slate-100 hover:border-white/40 hover:bg-white/10"
                            }`}
                          >
                            {set.dimension}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-slate-200/70">
                    Comparing {selectedVariance.range}
                  </p>
                  <ul className="mt-4 space-y-3">
                    {selectedVariance.items.map((item) => {
                      const widthClass = pickProgressWidthClass(item.contribution);
                      return (
                        <li
                          key={item.label}
                          className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-100/85"
                        >
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-white">{item.label}</p>
                            <span className="text-xs uppercase tracking-[0.3em] text-slate-200/60">
                              {item.variance}
                            </span>
                          </div>
                          <div className="mt-3 h-2 rounded-full bg-white/10">
                            <div
                              className={`h-full rounded-full bg-gradient-to-r from-sky-400 via-blue-500 to-purple-500 ${widthClass}`}
                            />
                          </div>
                          <p className="mt-2 text-xs text-slate-200/70">
                            Contribution to delta: {(item.contribution * 100).toFixed(0)}%
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                      Benchmark matrix
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {reportingBenchmarkMatrix.map((row) => {
                        const active = row.channel === selectedBenchmarkChannel;
                        return (
                          <button
                            key={row.channel}
                            type="button"
                            onClick={() => handleBenchmarkSelect(row.channel)}
                            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider transition ${
                              active
                                ? "border-white/70 bg-white text-slate-900 shadow-lg shadow-white/30"
                                : "border-white/20 bg-white/5 text-slate-100 hover:border-white/40 hover:bg-white/10"
                            }`}
                          >
                            {channelCatalog[row.channel].label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
                    <table className="min-w-full divide-y divide-white/10 text-sm text-slate-100/85">
                      <thead className="bg-white/5 text-xs uppercase tracking-[0.35em] text-slate-200/70">
                        <tr>
                          <th className="px-4 py-3 text-left">Channel</th>
                          <th className="px-4 py-3 text-left">Your score</th>
                          <th className="px-4 py-3 text-left">Cohort</th>
                          <th className="px-4 py-3 text-left">Percentile</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10 bg-slate-950/30">
                        {reportingBenchmarkMatrix.map((row) => {
                          const active = row.channel === selectedBenchmarkChannel;
                          return (
                            <tr
                              key={row.channel}
                              className={active ? "bg-white/10" : ""}
                            >
                              <td className="px-4 py-3 uppercase tracking-[0.3em]">
                                {channelCatalog[row.channel].label}
                              </td>
                              <td className="px-4 py-3">{row.yourScore}</td>
                              <td className="px-4 py-3 text-slate-200/70">{row.cohort}</td>
                              <td className="px-4 py-3 text-slate-200/70">{row.percentile}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-100/85">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-200/60">
                      {channelCatalog[benchmarkDetails.channel].label} focus
                    </p>
                    <p className="mt-2 text-base font-semibold text-white">
                      {benchmarkDetails.percentile} percentile vs cohort score {benchmarkDetails.cohort}.
                    </p>
                    <p className="mt-2 text-xs text-slate-200/70">
                      Share this with the team to double down on what's working and triage the laggards.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(59,7,100,0.2)] backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  KPI snapshots
                </h3>
                <span className="text-xs text-slate-200/70">
                  {reportingSnapshots.length} metrics
                </span>
              </div>
              <div className="mt-4 space-y-3">
                {reportingSnapshots.map((snapshot) => (
                  <div
                    key={snapshot.id}
                    className={`rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white ${snapshot.tone}`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{snapshot.title}</p>
                      <span className="text-lg font-semibold">{snapshot.value}</span>
                    </div>
                    <p className="mt-2 text-xs text-white/80">{snapshot.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(14,165,233,0.2)] backdrop-blur-2xl">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Alert center
                </h3>
                <div className="flex flex-wrap gap-2">
                  {reportingAlertFilters.map((filter) => {
                    const active = selectedAlertFilter === filter.id;
                    return (
                      <button
                        key={filter.id}
                        type="button"
                        onClick={() => handleAlertFilterChange(filter.id)}
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider transition ${
                          active
                            ? "border-white/70 bg-white text-slate-900 shadow-lg shadow-white/30"
                            : "border-white/20 bg-white/5 text-slate-100 hover:border-white/40 hover:bg-white/10"
                        }`}
                      >
                        {filter.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <ul className="mt-4 space-y-3">
                {filteredAlerts.map((alert) => (
                  <li
                    key={alert.id}
                    className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-100/85"
                  >
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-200/60">
                      <span>{alert.title}</span>
                      <span>{alert.timestamp}</span>
                    </div>
                    <p className="mt-2 text-xs text-slate-200/75">{alert.detail}</p>
                    <button
                      type="button"
                      className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/50 bg-emerald-400/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-100 hover:border-emerald-300/70 hover:bg-emerald-400/30"
                    >
                      {alert.action}
                    </button>
                  </li>
                ))}
                {filteredAlerts.length === 0 && (
                  <li className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-6 text-center text-xs uppercase tracking-[0.3em] text-slate-200/60">
                    No alerts for this filter.
                  </li>
                )}
              </ul>
            </div>
          </aside>
        </section>

        <section
          id="engagement"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(34,197,94,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Engagement center</h2>
              <p className="text-sm text-slate-100/75">
                Triage replies, apply smart responses, and route feedback without leaving the
                dashboard.
              </p>
            </header>

            <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {engagementFilters.sentiments.map((filter) => {
                    const active = selectedSentimentFilter === filter.id;
                    const count = engagementCounts.sentiments[filter.id] ?? 0;
                    return (
                      <button
                        key={filter.id}
                        type="button"
                        onClick={() => handleSentimentFilterChange(filter.id)}
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider transition ${
                          active
                            ? "border-white/70 bg-white text-slate-900 shadow-lg shadow-white/30"
                            : "border-white/20 bg-white/5 text-slate-100 hover:border-white/40 hover:bg-white/10"
                        }`}
                      >
                        {filter.label}
                        <span className="text-[10px] text-slate-200/70">{count}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="flex flex-wrap gap-2">
                  {engagementFilters.status.map((filter) => {
                    const active = selectedEngagementStatus === filter.id;
                    const count = engagementCounts.statuses[filter.id] ?? 0;
                    return (
                      <button
                        key={filter.id}
                        type="button"
                        onClick={() => handleStatusFilterChange(filter.id)}
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider transition ${
                          active
                            ? "border-emerald-400/50 bg-emerald-400/20 text-emerald-100"
                            : "border-white/20 bg-white/5 text-slate-100 hover:border-white/40 hover:bg-white/10"
                        }`}
                      >
                        {filter.label}
                        <span className="text-[10px]">
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <ul className="mt-4 space-y-3">
                {filteredEngagementItems.map((item) => (
                  <li
                    key={item.id}
                    className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-100/85"
                  >
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-200/60">
                      <span>{channelCatalog[item.channel].label}</span>
                      <span>{item.timeAgo}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="font-semibold text-white">{item.author}</p>
                      <span className="text-xs uppercase tracking-[0.3em] text-slate-200/60">
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-2">{item.message}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.3em] text-slate-200/60">
                      {item.tags.map((tag) => (
                        <span
                          key={`${item.id}-${tag}`}
                          className="rounded-full border border-white/15 bg-white/10 px-3 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white hover:border-white/40 hover:bg-white/15"
                      >
                        Reply
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white hover:border-white/40 hover:bg-white/15"
                      >
                        Assign
                      </button>
                    </div>
                  </li>
                ))}
                {filteredEngagementItems.length === 0 && (
                  <li className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-6 text-center text-sm text-slate-200/70">
                    All caught up for this filter.
                  </li>
                )}
              </ul>
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(59,7,100,0.2)] backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Triage queues
                </h3>
                <span className="text-xs text-slate-200/70">
                  {engagementTriageQueues.reduce((acc, queue) => acc + queue.count, 0)} total
                </span>
              </div>
              <div className="mt-4 space-y-3">
                {engagementTriageQueues.map((queue) => (
                  <div
                    key={queue.id}
                    className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-100/80"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-white">{queue.title}</p>
                      <span className="text-xs uppercase tracking-[0.3em] text-slate-200/60">
                        {queue.count}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-slate-200/70">{queue.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section
          id="content-performance"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(168,85,247,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Content performance</h2>
              <p className="text-sm text-slate-100/75">
                Track post performance, identify top performers, and optimize content strategy.
              </p>
            </header>

            <div className="space-y-4">
              {contentPerformancePosts.map((post) => (
                <div
                  key={post.id}
                  className="rounded-3xl border border-white/15 bg-white/5 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className={`h-2.5 w-2.5 rounded-full ${channelCatalog[post.channel].dot}`} />
                        <h3 className="text-sm font-semibold text-white">{post.title}</h3>
                        <span className={`text-xs font-semibold ${post.performance === "excellent" ? "text-emerald-300" : "text-amber-300"}`}>
                          {post.performance === "excellent" ? "↑" : "↓"}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-slate-200/70">
                        {formatRelativeTime(post.publishedAt)} · {channelCatalog[post.channel].label}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-white">Score: {post.score}</p>
                      <p className="text-xs text-slate-200/70">Performance</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4 text-xs">
                    <div>
                      <p className="text-slate-200/60">Reach</p>
                      <p className="mt-1 text-sm font-semibold text-white">{(post.reach / 1000).toFixed(1)}k</p>
                    </div>
                    <div>
                      <p className="text-slate-200/60">Engagement</p>
                      <p className="mt-1 text-sm font-semibold text-white">{post.engagement}%</p>
                    </div>
                    <div>
                      <p className="text-slate-200/60">Conversion</p>
                      <p className="mt-1 text-sm font-semibold text-white">{post.conversion}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(168,85,247,0.2)] backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  A/B Tests
                </h3>
                <span className="text-xs text-slate-200/70">
                  {abTests.filter((t) => t.status === "running").length} active
                </span>
              </div>
              <div className="mt-4 space-y-4">
                {abTests.map((test) => (
                  <div
                    key={test.id}
                    className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-white">{test.title}</h4>
                      <span className={`text-[10px] uppercase tracking-wider ${test.status === "running" ? "text-emerald-300" : "text-slate-300"}`}>
                        {test.status}
                      </span>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      {test.variants.map((variant, idx) => {
                        const isWinner = variant.winner === true;
                        return (
                          <div
                            key={variant.id}
                            className={`rounded-xl border p-3 ${isWinner ? "border-emerald-400/50 bg-emerald-400/10" : "border-white/10 bg-white/5"}`}
                          >
                            <p className="text-xs text-slate-200/70">{variant.label}</p>
                            <p className="mt-1 text-sm font-semibold text-white">{variant.performance}%</p>
                          </div>
                        );
                      })}
                    </div>
                    {test.variants.find((v) => v.winner) && (
                      <p className="mt-3 text-xs text-slate-200/70">
                        Winner: {test.variants.find((v) => v.winner)?.label}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(168,85,247,0.2)] backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Content templates
                </h3>
                <span className="text-xs text-slate-200/70">{contentTemplates.length} available</span>
              </div>
              <div className="mt-4 space-y-3">
                {contentTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-white">{template.name}</h4>
                      <span className="text-xs text-slate-200/70">{template.usage} uses</span>
                    </div>
                    <p className="mt-2 text-xs text-slate-200/70">{template.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {template.channels.map((channel) => (
                        <span
                          key={`${template.id}-${channel}`}
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wider ${channelCatalog[channel].badge}`}
                        >
                          <span className={`h-1 w-1 rounded-full ${channelCatalog[channel].dot}`} />
                          {channelCatalog[channel].label}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white hover:border-white/40 hover:bg-white/15"
                    >
                      Use template
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section
          id="automation"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(14,116,144,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Campaign automation</h2>
              <p className="text-sm text-slate-100/75">
                Launch best-practice playbooks, coordinate recurring drops, and ensure every
                warm-up sequence stays on pace.
              </p>
            </header>

            <div className="flex flex-wrap gap-3">
              {automationTemplates.map((template) => {
                const isActive = selectedTemplate?.id === template.id;
                return (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => handleTemplateSelect(template.id)}
                    className={`inline-flex items-center gap-3 rounded-3xl border px-4 py-3 text-sm font-semibold uppercase tracking-wide transition ${
                      isActive
                        ? "border-white/70 bg-white text-slate-900 shadow-lg shadow-white/30"
                        : "border-white/20 bg-white/5 text-slate-100 hover:border-white/40 hover:bg-white/10"
                    }`}
                  >
                    <span className="text-[11px] font-medium text-slate-400">
                      {template.cadence}
                    </span>
                    {template.name}
                  </button>
                );
              })}
            </div>

            {selectedTemplate && (
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                <div className="rounded-3xl border border-white/15 bg-white/5 p-6">
                  <h3 className="text-sm font-semibold text-white">
                    {selectedTemplate.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-100/80">
                    {selectedTemplate.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedTemplate.channels.map((channelId) => (
                      <span
                        key={`${selectedTemplate.id}-${channelId}`}
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${channelCatalog[channelId].badge}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${channelCatalog[channelId].dot}`}
                        />
                        {channelCatalog[channelId].label}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 grid gap-3 text-xs uppercase tracking-[0.35em] text-slate-200/70 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                      <p>Cadence</p>
                      <p className="mt-1 text-sm font-semibold tracking-normal text-white">
                        {selectedTemplate.cadence}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                      <p>Duration</p>
                      <p className="mt-1 text-sm font-semibold tracking-normal text-white">
                        {selectedTemplate.duration}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 rounded-3xl border border-white/15 bg-white/5 p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                      Recurring schedule
                    </h3>
                    <span className="text-xs text-slate-200/70">Mocked timeline</span>
                  </div>
                  <div className="space-y-2 text-sm text-white">
                    <p>Drop window</p>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-200/70">
                          Start
                        </p>
                        <p>Next Monday · 09:00 UTC</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-200/70">
                          Repeat
                        </p>
                        <p>Every 2 weeks</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                      Upcoming drops
                    </p>
                    <ul className="space-y-2 text-sm text-slate-100/80">
                      <li className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                        <span>Week 1 · Tease cast</span>
                        <span>Mon · 09:00</span>
                      </li>
                      <li className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                        <span>Week 1 · IG stories</span>
                        <span>Tue · 12:00</span>
                      </li>
                      <li className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                        <span>Week 2 · Launch reel</span>
                        <span>Thu · 14:00</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(59,7,100,0.2)] backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Warm-up programs
                </h3>
                <span className="text-xs text-slate-200/70">Health scores</span>
              </div>
              <div className="mt-4 space-y-3">
                {warmupPrograms.map((program) => {
                  const token = warmupHealthTokens[program.health];
                  return (
                    <div
                      key={program.id}
                      className="rounded-3xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-white">{program.title}</p>
                        <span
                          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${token.badge}`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${token.dot}`} />
                          {token.label}
                        </span>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs text-slate-200/70">
                          <span>Score</span>
                          <span>{program.score}</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400 ${scoreWidthClass(
                              program.score,
                            )}`}
                          />
                        </div>
                      </div>
                      <p className="mt-3 text-xs text-slate-200/70">{program.nextAction}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(168,85,247,0.25)] backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Sequence board
                </h3>
                <span className="text-xs text-slate-200/70">{sequencePlays.length} programs</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {sequencePlays.map((sequence) => {
                  const isActive = selectedSequence?.id === sequence.id;
                  return (
                    <button
                      key={sequence.id}
                      type="button"
                      onClick={() => handleSequenceSelect(sequence.id)}
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider transition ${
                        isActive
                          ? "border-white/70 bg-white text-slate-900 shadow-lg shadow-white/30"
                          : "border-white/20 bg-white/5 text-slate-100 hover:border-white/40 hover:bg-white/10"
                      }`}
                    >
                      {sequence.label}
                    </button>
                  );
                })}
              </div>
              {selectedSequence && (
                <div className="mt-4 space-y-3 rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between text-sm text-white">
                    <span>{selectedSequence.label}</span>
                    <span className="text-xs text-slate-200/70">
                      {selectedSequence.steps} steps · {selectedSequence.window}
                    </span>
                  </div>
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${sequenceStatusTokens[selectedSequence.status].badge}`}
                  >
                    {sequenceStatusTokens[selectedSequence.status].label}
                  </span>
                  <ul className="space-y-2 text-sm text-slate-100/80">
                    <li className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                      Step 1 · Kickoff DM
                    </li>
                    <li className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                      Step 2 · Warm audience thread
                    </li>
                    <li className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                      Step 3 · Reel + highlights
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(14,116,144,0.2)] backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Automation rules
                </h3>
                <span className="text-xs text-slate-200/70">
                  {workflowAutomations.filter((a) => a.status === "active").length} active
                </span>
              </div>
              <div className="mt-4 space-y-3">
                {workflowAutomations.map((automation) => (
                  <div
                    key={automation.id}
                    className={`rounded-2xl border p-4 ${automation.status === "active" ? "border-emerald-400/50 bg-emerald-400/10" : "border-white/10 bg-slate-950/40"}`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-white">{automation.name}</h4>
                      <span className={`text-[10px] uppercase tracking-wider ${automation.status === "active" ? "text-emerald-300" : "text-slate-300"}`}>
                        {automation.status}
                      </span>
                    </div>
                    <div className="mt-3 space-y-2 text-xs text-slate-200/70">
                      <div className="flex items-center justify-between">
                        <span>Trigger:</span>
                        <span className="text-white">{automation.trigger}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Condition:</span>
                        <span className="text-white">{automation.condition}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Action:</span>
                        <span className="text-white">{automation.action}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Executions:</span>
                        <span className="text-white">{automation.executions}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section
          id="ops"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(59,7,100,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Publishing ops</h2>
              <p className="text-sm text-slate-100/75">
                Manage creative assets, compare revisions, and align your content calendar in
                one streamlined mock view.
              </p>
            </header>

            <div className="grid gap-4 lg:grid-cols-2">
              {assetLibrary.map((asset) => (
                <div
                  key={asset.id}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 shadow-inner shadow-purple-900/15"
                >
                  <div className="absolute inset-0 opacity-20 blur-2xl transition duration-500 group-hover:opacity-30">
                    <div
                      className={`absolute inset-4 rounded-3xl bg-gradient-to-br ${asset.accent}`}
                    />
                  </div>
                  <div className="relative space-y-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/80">
                      {asset.type}
                    </span>
                    <h3 className="text-sm font-semibold text-white">{asset.title}</h3>
                    <div className="flex items-center justify-between text-xs text-slate-200/70">
                      <span>{asset.owner}</span>
                      <span>{asset.updatedAt}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
              <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                Version history
              </h3>
              <ol className="mt-4 space-y-3">
                {versionHistory.map((entry) => (
                  <li
                    key={entry.id}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                  >
                    <span className="mt-1 h-2 w-2 rounded-full bg-white/40" />
                    <div className="space-y-1 text-sm text-slate-100/80">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold text-white">{entry.author}</p>
                        <span className="text-xs text-slate-200/70">{entry.timestamp}</span>
                      </div>
                      <p>{entry.summary}</p>
                      <span
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${
                          entry.status === "live"
                            ? "border-emerald-400/50 bg-emerald-400/20 text-emerald-100"
                            : entry.status === "queued"
                            ? "border-sky-400/50 bg-sky-400/20 text-sky-100"
                            : "border-white/20 bg-white/10 text-slate-100"
                        }`}
                      >
                        {entry.status}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(14,116,144,0.25)] backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Content calendar
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCalendarViewToggle("week")}
                    className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider transition ${
                      calendarView === "week"
                        ? "border-white/70 bg-white text-slate-900 shadow-lg shadow-white/30"
                        : "border-white/20 bg-white/5 text-slate-100 hover:border-white/40 hover:bg-white/10"
                    }`}
                  >
                    Week
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCalendarViewToggle("month")}
                    className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider transition ${
                      calendarView === "month"
                        ? "border-white/70 bg-white text-slate-900 shadow-lg shadow-white/30"
                        : "border-white/20 bg-white/5 text-slate-100 hover:border-white/40 hover:bg-white/10"
                    }`}
                  >
                    Month
                  </button>
                </div>
              </div>
              <p className="mt-3 text-xs text-slate-200/70">
                {calendarView === "week"
                  ? "Review the coming week's cross-channel cadence."
                  : "Month view coming soon — using weekly mock data."}
              </p>
              <div className="mt-4 grid gap-3">
                <div className="flex flex-wrap gap-2">
                  {audienceDays.map((day) => {
                    const isFocus = calendarFocus === day;
                    return (
                      <button
                        key={`calendar-day-${day}`}
                        type="button"
                        onClick={() => handleCalendarFocusChange(day)}
                        className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider transition ${
                          isFocus
                            ? "border-white/70 bg-white text-slate-900 shadow-lg shadow-white/30"
                            : "border-white/20 bg-white/5 text-slate-100 hover:border-white/40 hover:bg-white/10"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="grid gap-3">
                    {calendarByDay.map(({ day, slots }) => {
                      const isFocus = calendarFocus === day;
                      return (
                        <div key={`calendar-column-${day}`} className="space-y-2">
                          <p
                            className={`text-xs font-semibold uppercase tracking-[0.35em] ${
                              isFocus ? "text-white" : "text-slate-200/70"
                            }`}
                          >
                            {day}
                          </p>
                          {slots.length === 0 && (
                            <p className="rounded-2xl border border-dashed border-white/15 bg-white/5 px-3 py-2 text-xs text-slate-200/60">
                              Open slot
                            </p>
                          )}
                          {slots.map((slot) => (
                            <div
                              key={slot.id}
                              className={`space-y-2 rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2 ${
                                isFocus ? "ring-1 ring-white/30" : ""
                              }`}
                            >
                              <div className="flex items-center justify-between text-xs text-slate-200/80">
                                <span>{slot.time}</span>
                                <span>{slot.owner}</span>
                              </div>
                              <p className="text-sm font-semibold text-white">{slot.label}</p>
                              <div className="flex flex-wrap items-center gap-2">
                                <span
                                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${impactTokens[slot.impact].badge}`}
                                >
                                  {impactTokens[slot.impact].label}
                                </span>
                                {slot.channels.map((channelId) => (
                                  <span
                                    key={`${slot.id}-${channelId}`}
                                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${channelCatalog[channelId].badge}`}
                                  >
                                    {channelCatalog[channelId].label}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section
          id="intelligence"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(139,92,246,0.35)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Intelligence hub</h2>
              <p className="text-sm text-slate-100/75">
                Predictive forecasts, anomaly detection, and what-if scenarios to stay ahead of
                performance trends.
              </p>
            </header>

            <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Performance forecasts
                </h3>
                <span className="text-xs text-slate-200/70">
                  {intelligenceForecasts.length} predictions
                </span>
              </div>
              <div className="mt-4 grid gap-3 lg:grid-cols-3">
                {intelligenceForecasts.map((forecast) => {
                  const active = forecast.id === selectedForecastId;
                  return (
                    <button
                      key={forecast.id}
                      type="button"
                      onClick={() => handleForecastSelect(forecast.id)}
                      className={`flex h-full flex-col justify-between rounded-2xl border px-4 py-4 text-left text-sm transition ${
                        active
                          ? "border-white/70 bg-white text-slate-900 shadow-lg shadow-white/30"
                          : "border-white/15 bg-white/5 text-slate-100 hover:border-white/40 hover:bg-white/10"
                      }`}
                    >
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-200/70">
                          {forecast.metric}
                        </p>
                        <p className="mt-2 text-lg font-semibold text-white">
                          {forecast.predicted}
                        </p>
                        <p className="mt-1 text-xs text-slate-200/70">{forecast.timeframe}</p>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs">
                        <span className="text-slate-200/70">
                          Confidence: {Math.round(forecast.confidence * 100)}%
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-100/85">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-200/60">
                  {selectedForecast.metric} forecast
                </p>
                <p className="mt-2 text-base font-semibold text-white">
                  Predicted: {selectedForecast.predicted} (from {selectedForecast.current})
                </p>
                <p className="mt-2 text-xs text-slate-200/70">
                  Key factors: {selectedForecast.factors.join(", ")}
                </p>
                <p className="mt-3 text-xs text-slate-200/70">
                  Confidence: {Math.round(selectedForecast.confidence * 100)}% ·{" "}
                  {selectedForecast.timeframe}
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Anomaly detection
                </h3>
                <span className="text-xs text-slate-200/70">
                  {intelligenceAnomalies.length} detected
                </span>
              </div>
              <ul className="mt-4 space-y-3">
                {intelligenceAnomalies.map((anomaly) => (
                  <li
                    key={anomaly.id}
                    className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-100/85"
                  >
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-200/60">
                      <span>{anomaly.type}</span>
                      <span>{anomaly.detectedAt}</span>
                    </div>
                    <p className="mt-2 font-semibold text-white">
                      {anomaly.metric} on {channelCatalog[anomaly.channel].label}:{" "}
                      {anomaly.deviation}
                    </p>
                    <p className="mt-2 text-xs text-slate-200/70">{anomaly.explanation}</p>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(59,7,100,0.2)] backdrop-blur-2xl">
              <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                Forecast accuracy
              </h3>
              <p className="mt-2 text-sm text-slate-100/85">
                Last 30 days: 87% accuracy across all predictions. Model improves with more data.
              </p>
            </div>
          </aside>
        </section>

        <section
          id="content"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(236,72,153,0.35)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Content intelligence</h2>
              <p className="text-sm text-slate-100/75">
                Hashtag trends, format recommendations, and content performance insights to optimize
                your strategy.
              </p>
            </header>

            <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Hashtag trends
                </h3>
                <span className="text-xs text-slate-200/70">{contentHashtags.length} tracked</span>
              </div>
              <div className="mt-4 grid gap-3 lg:grid-cols-2">
                {contentHashtags.map((item) => (
                  <div
                    key={item.tag}
                    className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-100/85"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-white">{item.tag}</p>
                      <span
                        className={`text-xs uppercase tracking-[0.3em] ${
                          item.trend === "up"
                            ? "text-emerald-300"
                            : item.trend === "down"
                              ? "text-rose-300"
                              : "text-slate-300"
                        }`}
                      >
                        {item.trend}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-slate-200/70">
                      <span>{item.usage.toLocaleString()} uses</span>
                      <span>{item.growth}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Content recommendations
                </h3>
                <span className="text-xs text-slate-200/70">
                  {contentRecommendations.length} suggestions
                </span>
              </div>
              <ul className="mt-4 space-y-3">
                {contentRecommendations.map((rec) => {
                  const active = rec.id === selectedRecommendationId;
                  return (
                    <li key={rec.id}>
                      <button
                        type="button"
                        onClick={() => handleRecommendationSelect(rec.id)}
                        className={`w-full rounded-2xl border px-4 py-3 text-left text-sm transition ${
                          active
                            ? "border-white/70 bg-white text-slate-900 shadow-lg shadow-white/30"
                            : "border-white/15 bg-white/5 text-slate-100 hover:border-white/40 hover:bg-white/10"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs uppercase tracking-[0.3em] text-slate-200/70">
                            {rec.type}
                          </span>
                          <span
                            className={`text-xs uppercase tracking-[0.3em] ${
                              rec.impact === "High"
                                ? "text-emerald-300"
                                : rec.impact === "Medium"
                                  ? "text-amber-300"
                                  : "text-slate-300"
                            }`}
                          >
                            {rec.impact}
                          </span>
                        </div>
                        <p className="mt-2 text-sm font-semibold text-white">{rec.suggestion}</p>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(59,7,100,0.2)] backdrop-blur-2xl">
              <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                Recommendation impact
              </h3>
              <p className="mt-2 text-sm text-slate-100/85">
                {selectedRecommendation.suggestion}
              </p>
              <p className="mt-3 text-xs text-slate-200/70">
                Impact level: {selectedRecommendation.impact}
              </p>
            </div>
          </aside>
        </section>

        <section
          id="team"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(34,197,94,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Team management</h2>
              <p className="text-sm text-slate-100/75">
                Manage team members, roles, permissions, and track activity across the dashboard.
              </p>
            </header>

            <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Team members
                </h3>
                <span className="text-xs text-slate-200/70">{teamMembers.length} active</span>
              </div>
              <ul className="mt-4 space-y-3">
                {teamMembers.map((member) => (
                  <li
                    key={member.id}
                    className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${member.gradient} text-xs font-semibold uppercase text-white shadow-lg`}
                      >
                        {member.avatar}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-white">{member.name}</p>
                          <span className="text-xs text-slate-200/70">{member.lastActive}</span>
                        </div>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-200/60">
                          {member.role}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {member.permissions.map((perm) => (
                            <span
                              key={`${member.id}-${perm}`}
                              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-100"
                            >
                              {perm}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Activity log
                </h3>
                <span className="text-xs text-slate-200/70">
                  {teamActivityLog.length} recent actions
                </span>
              </div>
              <ul className="mt-4 space-y-3">
                {teamActivityLog.map((activity) => (
                  <li
                    key={activity.id}
                    className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-100/85"
                  >
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-200/60">
                      <span>{activity.member}</span>
                      <span>{activity.timestamp}</span>
                    </div>
                    <p className="mt-2 font-semibold text-white">{activity.action}</p>
                    <p className="mt-1 text-xs text-slate-200/70">{activity.target}</p>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(59,7,100,0.2)] backdrop-blur-2xl">
              <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                Team summary
              </h3>
              <p className="mt-2 text-sm text-slate-100/85">
                {teamMembers.length} active members with varying permission levels. All team
                activity is logged for transparency.
              </p>
            </div>
          </aside>
        </section>

        <section
          id="integrations"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(14,165,233,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Integrations hub</h2>
              <p className="text-sm text-slate-100/75">
                Connect external tools, sync data, and automate workflows across your stack.
              </p>
            </header>

            <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Available integrations
                </h3>
                <span className="text-xs text-slate-200/70">
                  {integrationsAvailable.length} services
                </span>
              </div>
              <div className="mt-4 grid gap-3 lg:grid-cols-2">
                {integrationsAvailable.map((integration) => (
                  <div
                    key={integration.id}
                    className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xs font-semibold uppercase text-white">
                            {integration.icon}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">{integration.name}</p>
                            <p className="mt-1 text-xs text-slate-200/70">
                              {integration.description}
                            </p>
                          </div>
                        </div>
                      </div>
                      <span
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${
                          integration.status === "connected"
                            ? "border-emerald-400/50 bg-emerald-400/20 text-emerald-100"
                            : "border-white/20 bg-white/5 text-slate-100"
                        }`}
                      >
                        {integration.status === "connected" ? "Connected" : "Available"}
                      </span>
                    </div>
                    <div className="mt-3 flex gap-2">
                      {integration.status === "connected" ? (
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white hover:border-white/40 hover:bg-white/15"
                        >
                          Manage
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 rounded-full border border-emerald-400/50 bg-emerald-400/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-100 hover:border-emerald-300/70 hover:bg-emerald-400/30"
                        >
                          Connect
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(59,7,100,0.2)] backdrop-blur-2xl">
              <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                Integration status
              </h3>
              <p className="mt-2 text-sm text-slate-100/85">
                {integrationsAvailable.filter((i) => i.status === "connected").length} connected,{" "}
                {integrationsAvailable.filter((i) => i.status === "available").length} available to
                connect.
              </p>
            </div>
          </aside>
        </section>

        <section
          id="content-library"
          className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(168,85,247,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Content library</h2>
              <p className="text-sm text-slate-100/75">
                Manage assets, track versions, and organize your content collection.
              </p>
            </header>

            <div className="space-y-4">
              {contentLibrary.map((asset) => (
                <div
                  key={asset.id}
                  className="rounded-3xl border border-white/15 bg-white/5 p-5 transition hover:border-white/30"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-10 w-10 rounded-xl bg-gradient-to-br ${asset.accent} flex items-center justify-center text-xs font-bold text-white`}
                        >
                          {asset.type === "image" ? "IMG" : asset.type === "video" ? "VID" : "DOC"}
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-white">{asset.title}</h3>
                          <p className="mt-1 text-xs text-slate-200/70">
                            {asset.owner} · {formatRelativeTime(asset.updatedAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:border-white/40 hover:bg-white/15"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(168,85,247,0.2)] backdrop-blur-2xl">
              <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                Version history
              </h3>
              <div className="mt-4 space-y-3">
                {contentVersions.map((version) => (
                  <div
                    key={version.id}
                    className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white">{version.author}</p>
                        <p className="mt-1 text-xs text-slate-200/70">{version.summary}</p>
                      </div>
                      <span
                        className={`text-[10px] uppercase tracking-wider ${
                          version.status === "live"
                            ? "text-emerald-300"
                            : version.status === "queued"
                              ? "text-amber-300"
                              : "text-slate-300"
                        }`}
                      >
                        {version.status}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-slate-200/60">
                      {formatRelativeTime(version.timestamp)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(168,85,247,0.2)] backdrop-blur-2xl">
              <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                Top performers
              </h3>
              <div className="mt-4 space-y-3">
                {topPerformers.map((post) => (
                  <div
                    key={post.id}
                    className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white">{post.title}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${channelCatalog[post.channel].dot}`}
                          />
                          <span className="text-xs text-slate-200/70">
                            {channelCatalog[post.channel].label}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-white">{post.performance}</p>
                        <p className="text-xs text-slate-200/70">Score</p>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <p className="text-slate-200/60">Reach</p>
                        <p className="mt-1 text-sm font-semibold text-white">
                          {(post.reach / 1000).toFixed(1)}k
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-200/60">Engagement</p>
                        <p className="mt-1 text-sm font-semibold text-white">{post.engagement}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section
          id="audience-analytics"
          className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(14,116,144,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Audience segmentation</h2>
              <p className="text-sm text-slate-100/75">
                Analyze audience segments, track growth, and optimize targeting.
              </p>
            </header>

            <div className="space-y-4">
              {audienceSegments.map((segment) => {
                const isSelected = segment.id === selectedSegmentId;
                return (
                  <div
                    key={segment.id}
                    className={`rounded-3xl border p-5 transition ${
                      isSelected
                        ? "border-white/30 bg-white/10"
                        : "border-white/15 bg-white/5 hover:border-white/25"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span
                            className={`h-2.5 w-2.5 rounded-full ${channelCatalog[segment.channel].dot}`}
                          />
                          <h3 className="text-sm font-semibold text-white">{segment.label}</h3>
                        </div>
                        <div className="mt-3 grid grid-cols-3 gap-4 text-xs">
                          <div>
                            <p className="text-slate-200/60">Size</p>
                            <p className="mt-1 text-sm font-semibold text-white">
                              {(segment.size / 1000).toFixed(1)}k
                            </p>
                          </div>
                          <div>
                            <p className="text-slate-200/60">Growth</p>
                            <p className="mt-1 text-sm font-semibold text-emerald-300">
                              +{segment.growth}%
                            </p>
                          </div>
                          <div>
                            <p className="text-slate-200/60">Engagement</p>
                            <p className="mt-1 text-sm font-semibold text-white">
                              {segment.engagement}%
                            </p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="flex items-center justify-between text-xs text-slate-200/70">
                            <span>Coverage</span>
                            <span>
                              {segment.coverage}% vs {segment.benchmark}% benchmark
                            </span>
                          </div>
                          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                            <div
                              className={`h-full bg-gradient-to-r ${channelCatalog[segment.channel].accent}`}
                              style={{ width: `${segment.coverage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(14,116,144,0.2)] backdrop-blur-2xl">
              <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                Sentiment history
              </h3>
              <div className="mt-4 space-y-2">
                {sentimentHistory.map((day) => (
                  <div key={day.date} className="flex items-center gap-3">
                    <span className="w-12 text-xs text-slate-200/70">{day.date}</span>
                    <div className="flex-1 flex items-center gap-1 h-6 rounded-full overflow-hidden bg-white/10">
                      <div
                        className="h-full bg-emerald-400"
                        style={{ width: `${day.positive}%` }}
                      />
                      <div
                        className="h-full bg-slate-400"
                        style={{ width: `${day.neutral}%` }}
                      />
                      <div
                        className="h-full bg-rose-400"
                        style={{ width: `${day.negative}%` }}
                      />
                    </div>
                    <div className="flex gap-2 text-xs">
                      <span className="text-emerald-300">{day.positive}%</span>
                      <span className="text-slate-300">{day.neutral}%</span>
                      <span className="text-rose-300">{day.negative}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(14,116,144,0.2)] backdrop-blur-2xl">
              <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                Channel performance
              </h3>
              <div className="mt-4 space-y-4">
                {channelPerformance.map((channel) => (
                  <div
                    key={channel.channel}
                    className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${channelCatalog[channel.channel].dot}`}
                      />
                      <h4 className="text-sm font-semibold text-white">
                        {channelCatalog[channel.channel].label}
                      </h4>
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
                      <div>
                        <p className="text-slate-200/60">Reach</p>
                        <p className="mt-1 text-sm font-semibold text-white">
                          {(channel.reach / 1000).toFixed(0)}k
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-200/60">Engagement</p>
                        <p className="mt-1 text-sm font-semibold text-white">
                          {channel.engagement}%
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-200/60">Growth</p>
                        <p className="mt-1 text-sm font-semibold text-emerald-300">
                          +{channel.growth}%
                        </p>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-slate-200/70">Top: {channel.topPost}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section
          id="collaboration-tools"
          className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(236,72,153,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Collaboration</h2>
              <p className="text-sm text-slate-100/75">
                Mentions, checklists, handoffs, and real-time activity.
              </p>
            </header>

            <div className="space-y-6">
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Mentions
                </h3>
                <div className="space-y-3">
                  {collaborationMentions.map((mention) => (
                    <div
                      key={mention.id}
                      className={`rounded-2xl border p-4 ${
                        mention.resolved
                          ? "border-white/10 bg-slate-950/40 opacity-60"
                          : "border-white/15 bg-white/5"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm text-white">
                            <span className="font-semibold">{mention.mentionedBy}</span> mentioned{" "}
                            <span className="font-semibold">{mention.mentionedTo}</span>
                          </p>
                          <p className="mt-1 text-xs text-slate-200/70">{mention.message}</p>
                          <p className="mt-2 text-xs text-slate-200/60">
                            {formatRelativeTime(mention.at)}
                          </p>
                        </div>
                        {mention.resolved && (
                          <span className="text-[10px] uppercase tracking-wider text-emerald-300">
                            Resolved
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Checklists
                </h3>
                <div className="space-y-4">
                  {collaborationChecklists.map((checklist) => (
                    <div
                      key={checklist.id}
                      className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                    >
                      <h4 className="text-sm font-semibold text-white">{checklist.title}</h4>
                      <div className="mt-3 space-y-2">
                        {checklist.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-2"
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                id={`checkbox-${item.id}`}
                                checked={item.checked}
                                readOnly
                                aria-label={item.label}
                                className="h-4 w-4 rounded border-white/20 bg-white/10 text-purple-500"
                              />
                              <label
                                htmlFor={`checkbox-${item.id}`}
                                className={`text-xs cursor-pointer ${
                                  item.checked ? "text-slate-400 line-through" : "text-white"
                                }`}
                              >
                                {item.label}
                              </label>
                            </div>
                            <span className="text-xs text-slate-200/70">{item.assignedTo}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Handoffs
                </h3>
                <div className="space-y-3">
                  {collaborationHandoffs.map((handoff) => (
                    <div
                      key={handoff.id}
                      className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-white">
                            <span className="font-semibold">{handoff.from}</span> →{" "}
                            <span className="font-semibold">{handoff.to}</span>
                          </p>
                          <p className="mt-1 text-xs text-slate-200/70">{handoff.action}</p>
                          <p className="mt-2 text-xs text-slate-200/60">
                            {formatRelativeTime(handoff.at)}
                          </p>
                        </div>
                        <span
                          className={`text-[10px] uppercase tracking-wider ${
                            handoff.status === "completed"
                              ? "text-emerald-300"
                              : "text-amber-300"
                          }`}
                        >
                          {handoff.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(236,72,153,0.2)] backdrop-blur-2xl">
              <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                Real-time activity
              </h3>
              <div className="mt-4 space-y-3">
                {realTimeActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
                        {activity.user.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-white">
                          <span className="font-semibold">{activity.user}</span> {activity.action}{" "}
                          <span className="text-slate-200/70">{activity.target}</span>
                        </p>
                        <p className="mt-1 text-xs text-slate-200/60">
                          {formatRelativeTime(activity.timestamp)} · {activity.type}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section
          id="listening"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(139,92,246,0.35)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Social listening</h2>
              <p className="text-sm text-slate-100/75">
                Monitor brand mentions, track keywords, and respond to conversations across all
                channels in real-time.
              </p>
            </header>

            <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Brand mentions
                </h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setListeningKeywordFilter("all")}
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider transition ${
                      listeningKeywordFilter === "all"
                        ? "border-white/70 bg-white text-slate-900 shadow-lg shadow-white/30"
                        : "border-white/20 bg-white/5 text-slate-100 hover:border-white/40 hover:bg-white/10"
                    }`}
                  >
                    All keywords
                  </button>
                  <button
                    type="button"
                    onClick={() => setListeningSentimentFilter("all")}
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider transition ${
                      listeningSentimentFilter === "all"
                        ? "border-white/70 bg-white text-slate-900 shadow-lg shadow-white/30"
                        : "border-white/20 bg-white/5 text-slate-100 hover:border-white/40 hover:bg-white/10"
                    }`}
                  >
                    All sentiment
                  </button>
                </div>
              </div>
              <ul className="mt-4 space-y-3">
                {filteredMentions.map((mention) => {
                  const active = mention.id === selectedMentionId;
                  return (
                    <li key={mention.id}>
                      <button
                        type="button"
                        onClick={() => handleMentionSelect(mention.id)}
                        className={`w-full rounded-2xl border px-4 py-4 text-left text-sm transition ${
                          active
                            ? "border-white/70 bg-white text-slate-900 shadow-lg shadow-white/30"
                            : "border-white/15 bg-white/5 text-slate-100 hover:border-white/40 hover:bg-white/10"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-white">
                                {mention.author}
                              </span>
                              <span
                                className={`text-xs uppercase tracking-[0.3em] ${
                                  mention.sentiment === "positive"
                                    ? "text-emerald-300"
                                    : mention.sentiment === "negative"
                                      ? "text-rose-300"
                                      : "text-slate-300"
                                }`}
                              >
                                {mention.sentiment}
                              </span>
                            </div>
                            <p className="mt-2 text-sm text-slate-100/85">{mention.content}</p>
                            <div className="mt-2 flex items-center gap-3 text-xs text-slate-200/70">
                              <span>{channelCatalog[mention.source].label}</span>
                              <span>•</span>
                              <span>{mention.engagement} engagements</span>
                              <span>•</span>
                              <span>{formatRelativeTime(mention.timestamp)}</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(59,7,100,0.2)] backdrop-blur-2xl">
              <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                Mention details
              </h3>
              <p className="mt-2 text-sm text-slate-100/85">{selectedMention.content}</p>
              <p className="mt-3 text-xs text-slate-200/70">
                Keyword: {selectedMention.keyword} • Sentiment: {selectedMention.sentiment}
              </p>
            </div>
          </aside>
        </section>

        <section
          id="influencers"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(236,72,153,0.35)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Influencer management</h2>
              <p className="text-sm text-slate-100/75">
                Discover, track, and collaborate with influencers to amplify your brand reach.
              </p>
            </header>

            <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Influencer profiles
                </h3>
                <span className="text-xs text-slate-200/70">
                  {influencerProfiles.length} tracked
                </span>
              </div>
              <div className="mt-4 grid gap-3">
                {influencerProfiles.map((influencer) => {
                  const active = influencer.id === selectedInfluencerId;
                  return (
                    <button
                      key={influencer.id}
                      type="button"
                      onClick={() => handleInfluencerSelect(influencer.id)}
                      className={`rounded-2xl border px-4 py-4 text-left text-sm transition ${
                        active
                          ? "border-white/70 bg-white text-slate-900 shadow-lg shadow-white/30"
                          : "border-white/15 bg-white/5 text-slate-100 hover:border-white/40 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{influencer.name}</p>
                          <p className="mt-1 text-xs text-slate-200/70">{influencer.handle}</p>
                        </div>
                        <span
                          className={`text-xs uppercase tracking-[0.3em] ${
                            influencer.collaborationStatus === "active"
                              ? "text-emerald-300"
                              : "text-amber-300"
                          }`}
                        >
                          {influencer.collaborationStatus}
                        </span>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <p className="text-slate-200/60">Followers</p>
                          <p className="mt-1 font-semibold text-white">
                            {(influencer.followers / 1000).toFixed(1)}k
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-200/60">Engagement</p>
                          <p className="mt-1 font-semibold text-white">
                            {influencer.engagementRate}%
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-200/60">Avg reach</p>
                          <p className="mt-1 font-semibold text-white">
                            {(influencer.avgReach / 1000).toFixed(1)}k
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(59,7,100,0.2)] backdrop-blur-2xl">
              <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                Influencer insights
              </h3>
              <p className="mt-2 text-sm text-slate-100/85">
                {selectedInfluencer.name} has {selectedInfluencer.followers.toLocaleString()}{" "}
                followers with {selectedInfluencer.engagementRate}% engagement rate. Category:{" "}
                {selectedInfluencer.category}.
              </p>
            </div>
          </aside>
        </section>

        <section
          id="crisis"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(239,68,68,0.35)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Crisis management</h2>
              <p className="text-sm text-slate-100/75">
                Detect and respond to potential crises before they escalate. Monitor sentiment
                spikes and engagement anomalies.
              </p>
            </header>

            <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Active alerts
                </h3>
                <span className="text-xs text-slate-200/70">
                  {crisisAlerts.filter((a) => a.status === "active").length} active
                </span>
              </div>
              <ul className="mt-4 space-y-3">
                {crisisAlerts.map((alert) => {
                  const active = alert.id === selectedCrisisId;
                  return (
                    <li key={alert.id}>
                      <button
                        type="button"
                        onClick={() => handleCrisisSelect(alert.id)}
                        className={`w-full rounded-2xl border px-4 py-4 text-left text-sm transition ${
                          active
                            ? "border-white/70 bg-white text-slate-900 shadow-lg shadow-white/30"
                            : alert.severity === "high"
                              ? "border-rose-400/50 bg-rose-400/10 text-slate-100"
                              : "border-amber-400/50 bg-amber-400/10 text-slate-100 hover:border-amber-400/70 hover:bg-amber-400/20"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold">{alert.type}</p>
                            <p className="mt-1 text-xs text-slate-200/70">{alert.description}</p>
                          </div>
                          <span
                            className={`text-xs uppercase tracking-[0.3em] ${
                              alert.severity === "high"
                                ? "text-rose-300"
                                : "text-amber-300"
                            }`}
                          >
                            {alert.severity}
                          </span>
                        </div>
                        <div className="mt-3 flex items-center gap-3 text-xs text-slate-200/70">
                          <span>{channelCatalog[alert.channel].label}</span>
                          <span>•</span>
                          <span>{alert.affectedPosts} posts affected</span>
                          <span>•</span>
                          <span>{formatRelativeTime(alert.detectedAt)}</span>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(59,7,100,0.2)] backdrop-blur-2xl">
              <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                Crisis response
              </h3>
              <p className="mt-2 text-sm text-slate-100/85">
                {selectedCrisis.type}: {selectedCrisis.description}. Status:{" "}
                {selectedCrisis.status}.
              </p>
            </div>
          </aside>
        </section>

        <section
          id="commerce"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(34,197,94,0.35)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Social commerce</h2>
              <p className="text-sm text-slate-100/75">
                Track product sales, conversion rates, and revenue generated directly from social
                media posts.
              </p>
            </header>

            <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Product catalog
                </h3>
                <span className="text-xs text-slate-200/70">
                  {socialCommerceProducts.length} products
                </span>
              </div>
              <div className="mt-4 grid gap-3">
                {socialCommerceProducts.map((product) => {
                  const active = product.id === selectedProductId;
                  return (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => handleProductSelect(product.id)}
                      className={`rounded-2xl border px-4 py-4 text-left text-sm transition ${
                        active
                          ? "border-white/70 bg-white text-slate-900 shadow-lg shadow-white/30"
                          : "border-white/15 bg-white/5 text-slate-100 hover:border-white/40 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{product.name}</p>
                          <p className="mt-1 text-xs text-slate-200/70">{product.price}</p>
                        </div>
                        <span
                          className={`text-xs uppercase tracking-[0.3em] ${
                            product.status === "active"
                              ? "text-emerald-300"
                              : "text-slate-300"
                          }`}
                        >
                          {product.status}
                        </span>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <p className="text-slate-200/60">Sales</p>
                          <p className="mt-1 font-semibold text-white">{product.sales}</p>
                        </div>
                        <div>
                          <p className="text-slate-200/60">Revenue</p>
                          <p className="mt-1 font-semibold text-white">{product.revenue}</p>
                        </div>
                        <div>
                          <p className="text-slate-200/60">Conversion</p>
                          <p className="mt-1 font-semibold text-white">
                            {product.conversionRate}%
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(59,7,100,0.2)] backdrop-blur-2xl">
              <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                Product performance
              </h3>
              <p className="mt-2 text-sm text-slate-100/85">
                {selectedProduct.name}: {selectedProduct.sales} sales, {selectedProduct.revenue}{" "}
                revenue, {selectedProduct.conversionRate}% conversion rate.
              </p>
            </div>
          </aside>
        </section>

        <section
          id="calendar-advanced"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(14,165,233,0.35)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Advanced calendar</h2>
              <p className="text-sm text-slate-100/75">
                Visualize campaigns, events, and content schedules across all channels in a
                unified calendar view.
              </p>
            </header>

            <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Upcoming events
                </h3>
                <span className="text-xs text-slate-200/70">{calendarEvents.length} scheduled</span>
              </div>
              <div className="mt-4 space-y-3">
                {calendarEvents.map((event) => {
                  const active = event.id === selectedEventId;
                  return (
                    <button
                      key={event.id}
                      type="button"
                      onClick={() => handleEventSelect(event.id)}
                      className={`w-full rounded-2xl border px-4 py-4 text-left text-sm transition ${
                        active
                          ? "border-white/70 bg-white text-slate-900 shadow-lg shadow-white/30"
                          : "border-white/15 bg-white/5 text-slate-100 hover:border-white/40 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{event.title}</p>
                          <p className="mt-1 text-xs text-slate-200/70">
                            {formatScheduleLabel(event.date)} • {event.type}
                          </p>
                        </div>
                        <span
                          className={`text-xs uppercase tracking-[0.3em] ${
                            event.status === "scheduled"
                              ? "text-emerald-300"
                              : "text-amber-300"
                          }`}
                        >
                          {event.status}
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {event.channels.map((channelId) => (
                          <span
                            key={`${event.id}-${channelId}`}
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${channelCatalog[channelId].badge}`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${channelCatalog[channelId].dot}`}
                            />
                            {channelCatalog[channelId].label}
                          </span>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(59,7,100,0.2)] backdrop-blur-2xl">
              <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                Event details
              </h3>
              <p className="mt-2 text-sm text-slate-100/85">
                {selectedEvent.title} scheduled for {formatScheduleLabel(selectedEvent.date)} on{" "}
                {selectedEvent.channels.map((c) => channelCatalog[c].label).join(", ")}.
              </p>
            </div>
          </aside>
        </section>
        <section
          id="api-management"
          className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(59,130,246,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">API Management</h2>
              <p className="text-sm text-slate-100/75">
                Manage API keys, monitor endpoints, and configure webhooks.
              </p>
            </header>

            <div className="space-y-4">
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  API Keys
                </h3>
                <div className="space-y-3">
                  {apiKeys.map((key) => {
                    const isSelected = key.id === selectedApiKeyId;
                    return (
                      <div
                        key={key.id}
                        className={`rounded-2xl border p-4 transition ${
                          isSelected
                            ? "border-white/30 bg-white/10"
                            : "border-white/10 bg-slate-950/40 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-white">{key.name}</p>
                            <p className="mt-1 font-mono text-xs text-slate-200/70">{key.key}</p>
                            <div className="mt-3 flex items-center gap-4 text-xs text-slate-200/70">
                              <span>{key.requests.toLocaleString()} requests</span>
                              <span>·</span>
                              <span>Last used {formatRelativeTime(key.lastUsed)}</span>
                            </div>
                          </div>
                          <span
                            className={`text-[10px] uppercase tracking-wider ${
                              key.status === "active" ? "text-emerald-300" : "text-slate-300"
                            }`}
                          >
                            {key.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Endpoints
                </h3>
                <div className="space-y-3">
                  {apiEndpoints.map((endpoint) => (
                    <div
                      key={endpoint.id}
                      className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <span
                              className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                                endpoint.method === "GET"
                                  ? "bg-blue-500/20 text-blue-300"
                                  : "bg-emerald-500/20 text-emerald-300"
                              }`}
                            >
                              {endpoint.method}
                            </span>
                            <code className="text-sm text-white">{endpoint.path}</code>
                          </div>
                          <p className="mt-2 text-xs text-slate-200/70">{endpoint.description}</p>
                          <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
                            <div>
                              <p className="text-slate-200/60">Requests</p>
                              <p className="mt-1 text-sm font-semibold text-white">
                                {endpoint.requests.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-slate-200/60">Success</p>
                              <p className="mt-1 text-sm font-semibold text-emerald-300">
                                {endpoint.successRate}%
                              </p>
                            </div>
                            <div>
                              <p className="text-slate-200/60">Avg time</p>
                              <p className="mt-1 text-sm font-semibold text-white">
                                {endpoint.avgResponseTime}ms
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(59,130,246,0.2)] backdrop-blur-2xl">
              <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                Webhooks
              </h3>
              <div className="mt-4 space-y-3">
                {webhookEvents.map((webhook) => (
                  <div
                    key={webhook.id}
                    className={`rounded-2xl border p-4 ${
                      webhook.status === "active"
                        ? "border-emerald-400/50 bg-emerald-400/10"
                        : "border-white/10 bg-slate-950/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white">{webhook.name}</p>
                        <p className="mt-1 font-mono text-xs text-slate-200/70">{webhook.url}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {webhook.events.map((event) => (
                            <span
                              key={event}
                              className="rounded-full bg-white/10 px-2 py-1 text-[10px] text-slate-200/70"
                            >
                              {event}
                            </span>
                          ))}
                        </div>
                        <div className="mt-3 flex items-center gap-4 text-xs text-slate-200/70">
                          <span>Success: {webhook.successRate}%</span>
                          <span>·</span>
                          <span>Last: {formatRelativeTime(webhook.lastTriggered)}</span>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] uppercase tracking-wider ${
                          webhook.status === "active" ? "text-emerald-300" : "text-slate-300"
                        }`}
                      >
                        {webhook.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(59,130,246,0.2)] backdrop-blur-2xl">
              <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                Rate Limits
              </h3>
              <div className="mt-4 space-y-3">
                {rateLimits.map((limit) => {
                  const usagePercent = (limit.current / limit.limit) * 100;
                  return (
                    <div
                      key={limit.endpoint}
                      className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <code className="text-xs text-white">{limit.endpoint}</code>
                        <span className="text-xs text-slate-200/70">
                          {limit.current}/{limit.limit} per {limit.window}
                        </span>
                      </div>
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className={`h-full ${
                            usagePercent > 80 ? "bg-rose-400" : usagePercent > 50 ? "bg-amber-400" : "bg-emerald-400"
                          }`}
                          style={{ width: `${usagePercent}%` }}
                        />
                      </div>
                      <p className="mt-2 text-xs text-slate-200/70">
                        {limit.remaining} remaining
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>
        </section>

        <section
          id="moderation"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(251,146,60,0.35)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Content moderation</h2>
              <p className="text-sm text-slate-100/75">
                Review and approve content before publishing. Manage flagged posts and maintain
                brand safety.
              </p>
            </header>

            <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Moderation queue
                </h3>
                <span className="text-xs text-slate-200/70">
                  {contentModerationQueue.filter((m) => m.status === "pending").length} pending
                </span>
              </div>
              <ul className="mt-4 space-y-3">
                {contentModerationQueue.map((item) => {
                  const active = item.id === selectedModerationId;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => handleModerationSelect(item.id)}
                        className={`w-full rounded-2xl border px-4 py-4 text-left text-sm transition ${
                          active
                            ? "border-white/70 bg-white text-slate-900 shadow-lg shadow-white/30"
                            : item.status === "pending"
                              ? "border-amber-400/50 bg-amber-400/10 text-slate-100"
                              : "border-white/15 bg-white/5 text-slate-100 hover:border-white/40 hover:bg-white/10"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-semibold">{item.content}</p>
                            <p className="mt-1 text-xs text-slate-200/70">
                              {item.flaggedReason} • {channelCatalog[item.channel].label}
                            </p>
                            <p className="mt-2 text-xs text-slate-200/60">
                              Flagged by {item.flaggedBy} • {formatRelativeTime(item.submittedAt)}
                            </p>
                          </div>
                          <span
                            className={`text-xs uppercase tracking-[0.3em] ${
                              item.status === "pending"
                                ? "text-amber-300"
                                : item.status === "approved"
                                  ? "text-emerald-300"
                                  : "text-slate-300"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(59,7,100,0.2)] backdrop-blur-2xl">
              <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                Moderation details
              </h3>
              <p className="mt-2 text-sm text-slate-100/85">{selectedModeration.content}</p>
              <p className="mt-3 text-xs text-slate-200/70">
                Status: {selectedModeration.status} • Priority: {selectedModeration.priority}
              </p>
            </div>
          </aside>
        </section>

        <section
          id="roi"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(34,197,94,0.35)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">ROI tracking</h2>
              <p className="text-sm text-slate-100/75">
                Measure return on investment for your social media campaigns. Track spend, revenue,
                and conversions.
              </p>
            </header>

            <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Campaign ROI
                </h3>
                <span className="text-xs text-slate-200/70">
                  {roiCampaigns.length} campaigns
                </span>
              </div>
              <div className="mt-4 grid gap-3">
                {roiCampaigns.map((campaign) => {
                  const active = campaign.id === selectedRoiId;
                  return (
                    <button
                      key={campaign.id}
                      type="button"
                      onClick={() => handleRoiSelect(campaign.id)}
                      className={`rounded-2xl border px-4 py-4 text-left text-sm transition ${
                        active
                          ? "border-white/70 bg-white text-slate-900 shadow-lg shadow-white/30"
                          : "border-white/15 bg-white/5 text-slate-100 hover:border-white/40 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{campaign.name}</p>
                          <p className="mt-1 text-xs text-slate-200/70">{campaign.period}</p>
                        </div>
                        <span className="text-xs font-semibold text-emerald-300">
                          {campaign.roi}% ROI
                        </span>
                      </div>
                      <div className="mt-3 grid grid-cols-4 gap-2 text-xs">
                        <div>
                          <p className="text-slate-200/60">Spend</p>
                          <p className="mt-1 font-semibold text-white">
                            ${campaign.spend.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-200/60">Revenue</p>
                          <p className="mt-1 font-semibold text-white">
                            ${campaign.revenue.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-200/60">Conversions</p>
                          <p className="mt-1 font-semibold text-white">{campaign.conversions}</p>
                        </div>
                        <div>
                          <p className="text-slate-200/60">CPA</p>
                          <p className="mt-1 font-semibold text-white">${campaign.cpa}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(59,7,100,0.2)] backdrop-blur-2xl">
              <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                ROI summary
              </h3>
              <p className="mt-2 text-sm text-slate-100/85">
                {selectedRoi.name}: {selectedRoi.roi}% ROI with ${selectedRoi.revenue.toLocaleString()}{" "}
                revenue from ${selectedRoi.spend.toLocaleString()} spend.
              </p>
            </div>
          </aside>
        </section>

        <section
          id="accounts"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(139,92,246,0.35)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Account management</h2>
              <p className="text-sm text-slate-100/75">
                Manage multiple social media accounts across platforms. Monitor connection status
                and sync activity.
              </p>
            </header>

            <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Connected accounts
                </h3>
                <span className="text-xs text-slate-200/70">
                  {managedAccounts.filter((a) => a.status === "connected").length} connected
                </span>
              </div>
              <div className="mt-4 grid gap-3">
                {managedAccounts.map((account) => {
                  const active = account.id === selectedAccountId;
                  return (
                    <button
                      key={account.id}
                      type="button"
                      onClick={() => handleAccountSelect(account.id)}
                      className={`rounded-2xl border px-4 py-4 text-left text-sm transition ${
                        active
                          ? "border-white/70 bg-white text-slate-900 shadow-lg shadow-white/30"
                          : "border-white/15 bg-white/5 text-slate-100 hover:border-white/40 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{account.name}</p>
                          <p className="mt-1 text-xs text-slate-200/70">
                            {channelCatalog[account.platform].label}
                          </p>
                        </div>
                        <span
                          className={`text-xs uppercase tracking-[0.3em] ${
                            account.status === "connected"
                              ? "text-emerald-300"
                              : "text-rose-300"
                          }`}
                        >
                          {account.status}
                        </span>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <p className="text-slate-200/60">Followers</p>
                          <p className="mt-1 font-semibold text-white">
                            {(account.followers / 1000).toFixed(1)}k
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-200/60">Posts today</p>
                          <p className="mt-1 font-semibold text-white">{account.postsToday}</p>
                        </div>
                        <div>
                          <p className="text-slate-200/60">Last sync</p>
                          <p className="mt-1 font-semibold text-white">{account.lastSync}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(59,7,100,0.2)] backdrop-blur-2xl">
              <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                Account status
              </h3>
              <p className="mt-2 text-sm text-slate-100/85">
                {selectedAccount.name} is {selectedAccount.status} with{" "}
                {selectedAccount.followers.toLocaleString()} followers. Last synced{" "}
                {selectedAccount.lastSync}.
              </p>
            </div>
          </aside>
        </section>

        <section
          id="recycling"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(168,85,247,0.35)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Content recycling</h2>
              <p className="text-sm text-slate-100/75">
                Repurpose top-performing content across different channels and formats to maximize
                reach and engagement.
              </p>
            </header>

            <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Recycled content
                </h3>
                <span className="text-xs text-slate-200/70">
                  {recycledContent.length} items
                </span>
              </div>
              <div className="mt-4 space-y-3">
                {recycledContent.map((item) => {
                  const active = item.id === selectedRecycledId;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleRecycledSelect(item.id)}
                      className={`w-full rounded-2xl border px-4 py-4 text-left text-sm transition ${
                        active
                          ? "border-white/70 bg-white text-slate-900 shadow-lg shadow-white/30"
                          : "border-white/15 bg-white/5 text-slate-100 hover:border-white/40 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{item.originalTitle}</p>
                          <p className="mt-1 text-xs text-slate-200/70">
                            {channelCatalog[item.originalChannel].label} → {item.repurposedAs}
                          </p>
                          <p className="mt-2 text-xs text-slate-200/60">
                            Original: {formatRelativeTime(item.originalDate)}
                          </p>
                        </div>
                        <span
                          className={`text-xs uppercase tracking-[0.3em] ${
                            item.status === "published"
                              ? "text-emerald-300"
                              : item.status === "scheduled"
                                ? "text-amber-300"
                                : "text-slate-300"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <div className="mt-3 rounded-xl border border-white/10 bg-slate-950/40 p-3">
                        <p className="text-xs text-emerald-300 font-semibold">
                          {item.performance}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(59,7,100,0.2)] backdrop-blur-2xl">
              <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                Recycling insights
              </h3>
              <p className="mt-2 text-sm text-slate-100/85">
                {selectedRecycled.originalTitle} repurposed as {selectedRecycled.repurposedAs} with{" "}
                {selectedRecycled.performance} performance improvement.
              </p>
            </div>
          </aside>
        </section>

        <section
          id="engagement-auto"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(14,165,233,0.35)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Engagement automation</h2>
              <p className="text-sm text-slate-100/75">
                Automate responses, welcome messages, and engagement actions to maintain active
                community interaction.
              </p>
            </header>

            <div className="rounded-3xl border border-white/15 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Automation rules
                </h3>
                <span className="text-xs text-slate-200/70">
                  {engagementAutomationRules.filter((r) => r.status === "active").length} active
                </span>
              </div>
              <div className="mt-4 space-y-3">
                {engagementAutomationRules.map((rule) => {
                  const active = rule.id === selectedEngagementRuleId;
                  return (
                    <button
                      key={rule.id}
                      type="button"
                      onClick={() => handleEngagementRuleSelect(rule.id)}
                      className={`w-full rounded-2xl border px-4 py-4 text-left text-sm transition ${
                        active
                          ? "border-white/70 bg-white text-slate-900 shadow-lg shadow-white/30"
                          : "border-white/15 bg-white/5 text-slate-100 hover:border-white/40 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{rule.name}</p>
                          <p className="mt-1 text-xs text-slate-200/70">
                            {rule.trigger} → {rule.action}
                          </p>
                        </div>
                        <span
                          className={`text-xs uppercase tracking-[0.3em] ${
                            rule.status === "active"
                              ? "text-emerald-300"
                              : "text-slate-300"
                          }`}
                        >
                          {rule.status}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs text-slate-200/70">
                        <span>{rule.executions} executions</span>
                        <span>Last run: {rule.lastRun}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(59,7,100,0.2)] backdrop-blur-2xl">
              <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                Rule performance
              </h3>
              <p className="mt-2 text-sm text-slate-100/85">
                {selectedEngagementRule.name}: {selectedEngagementRule.executions} executions
                completed. Status: {selectedEngagementRule.status}.
              </p>
            </div>
          </aside>
        </section>

        <section
          id="moderation"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(239,68,68,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Content moderation</h2>
              <p className="text-sm text-slate-100/75">
                Review and manage flagged content, spam, and inappropriate posts across all channels.
              </p>
            </header>

            <div className="space-y-4">
              {moderationQueue.map((item) => (
                <div
                  key={item.id}
                  className={`rounded-3xl border p-6 ${item.severity === "high" ? "border-red-400/50 bg-red-400/10" : item.severity === "medium" ? "border-amber-400/50 bg-amber-400/10" : "border-white/15 bg-white/5"}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className={`h-2.5 w-2.5 rounded-full ${channelCatalog[item.channel].dot}`} />
                        <span className="text-sm font-semibold text-white">{item.author}</span>
                        <span className={`text-[10px] uppercase tracking-wider ${item.severity === "high" ? "text-red-300" : item.severity === "medium" ? "text-amber-300" : "text-slate-300"}`}>
                          {item.severity}
                        </span>
                        <span className={`text-[10px] uppercase tracking-wider ${item.status === "pending" ? "text-amber-300" : "text-emerald-300"}`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-slate-100/85">{item.content}</p>
                      <div className="mt-4 flex items-center gap-4 text-xs text-slate-200/70">
                        <span>Flagged: {item.flaggedReason}</span>
                        <span>·</span>
                        <span>{formatRelativeTime(item.reportedAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(239,68,68,0.2)] backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Moderation stats
                </h3>
              </div>
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Pending reviews</p>
                  <p className="mt-1 text-2xl font-semibold text-white">
                    {moderationQueue.filter((m) => m.status === "pending").length}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">High severity</p>
                  <p className="mt-1 text-xl font-semibold text-white">
                    {moderationQueue.filter((m) => m.severity === "high").length}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Reviewed today</p>
                  <p className="mt-1 text-xl font-semibold text-white">
                    {moderationQueue.filter((m) => m.status === "reviewed").length}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section
          id="brand-safety"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(34,197,94,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Brand safety</h2>
              <p className="text-sm text-slate-100/75">
                Monitor brand reputation, detect threats, and protect your brand identity across platforms.
              </p>
            </header>

            <div className="space-y-4">
              {brandSafetyAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`rounded-3xl border p-6 ${alert.severity === "high" && !alert.resolved ? "border-red-400/50 bg-red-400/10" : alert.severity === "medium" && !alert.resolved ? "border-amber-400/50 bg-amber-400/10" : "border-white/15 bg-white/5"}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className={`h-2.5 w-2.5 rounded-full ${channelCatalog[alert.channel].dot}`} />
                        <h3 className="text-lg font-semibold text-white">{alert.message}</h3>
                        <span className={`text-[10px] uppercase tracking-wider ${alert.severity === "high" ? "text-red-300" : "text-amber-300"}`}>
                          {alert.severity}
                        </span>
                        {alert.resolved && (
                          <span className="text-[10px] uppercase tracking-wider text-emerald-300">
                            resolved
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-xs text-slate-200/70 capitalize">
                        {alert.type.replace("_", " ")} · {alert.mentions} mentions
                      </p>
                      <div className="mt-4 flex items-center gap-4 text-xs text-slate-200/70">
                        <span>{formatRelativeTime(alert.at)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(34,197,94,0.2)] backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Safety overview
                </h3>
              </div>
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Active alerts</p>
                  <p className="mt-1 text-2xl font-semibold text-white">
                    {brandSafetyAlerts.filter((a) => !a.resolved).length}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">High severity</p>
                  <p className="mt-1 text-xl font-semibold text-white">
                    {brandSafetyAlerts.filter((a) => a.severity === "high" && !a.resolved).length}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Resolved</p>
                  <p className="mt-1 text-xl font-semibold text-white">
                    {brandSafetyAlerts.filter((a) => a.resolved).length}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section
          id="api-management"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(168,85,247,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">API management</h2>
              <p className="text-sm text-slate-100/75">
                Manage API keys, monitor usage, and control access to your social media management platform.
              </p>
            </header>

            <div className="space-y-4">
              {apiKeys.map((apiKey) => (
                <div
                  key={apiKey.id}
                  className={`rounded-3xl border p-6 ${apiKey.status === "active" ? "border-emerald-400/50 bg-emerald-400/10" : "border-white/15 bg-white/5"}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-white">{apiKey.name}</h3>
                        <span className={`text-[10px] uppercase tracking-wider ${apiKey.status === "active" ? "text-emerald-300" : "text-slate-300"}`}>
                          {apiKey.status}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-slate-200/70 font-mono">{apiKey.key}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {apiKey.permissions.map((perm) => (
                          <span
                            key={`${apiKey.id}-${perm}`}
                            className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-slate-200/70"
                          >
                            {perm}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <p className="text-slate-200/60">Total requests</p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            {apiKey.requests.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-200/60">Last used</p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            {formatRelativeTime(apiKey.lastUsed)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(168,85,247,0.2)] backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  API stats
                </h3>
              </div>
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Active keys</p>
                  <p className="mt-1 text-2xl font-semibold text-white">
                    {apiKeys.filter((k) => k.status === "active").length}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Total requests</p>
                  <p className="mt-1 text-xl font-semibold text-white">
                    {apiKeys.reduce((acc, k) => acc + k.requests, 0).toLocaleString()}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Avg per key</p>
                  <p className="mt-1 text-xl font-semibold text-white">
                    {Math.round(apiKeys.reduce((acc, k) => acc + k.requests, 0) / apiKeys.length).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section
          id="hashtag-analytics"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(59,130,246,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Hashtag analytics</h2>
              <p className="text-sm text-slate-100/75">
                Track hashtag performance, growth trends, and engagement metrics across your campaigns.
              </p>
            </header>

            <div className="space-y-4">
              {hashtagAnalytics.map((hashtag) => (
                <div
                  key={hashtag.id}
                  className="rounded-3xl border border-white/15 bg-white/5 p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-white">{hashtag.hashtag}</h3>
                        <span className={`text-[10px] uppercase tracking-wider ${hashtag.trend === "up" ? "text-emerald-300" : "text-red-300"}`}>
                          {hashtag.trend}
                        </span>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <div>
                          <p className="text-xs text-slate-200/60">Posts</p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            {hashtag.posts.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-200/60">Reach</p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            {(hashtag.reach / 1000).toFixed(0)}k
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-200/60">Engagement</p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            {(hashtag.engagement / 1000).toFixed(1)}k
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-200/60">Growth</p>
                          <p className={`mt-1 text-sm font-semibold ${hashtag.growth > 0 ? "text-emerald-300" : "text-red-300"}`}>
                            {hashtag.growth > 0 ? "+" : ""}{hashtag.growth}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(59,130,246,0.2)] backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Hashtag summary
                </h3>
              </div>
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Total hashtags</p>
                  <p className="mt-1 text-2xl font-semibold text-white">{hashtagAnalytics.length}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Total posts</p>
                  <p className="mt-1 text-xl font-semibold text-white">
                    {hashtagAnalytics.reduce((acc, h) => acc + h.posts, 0).toLocaleString()}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Combined reach</p>
                  <p className="mt-1 text-xl font-semibold text-white">
                    {(hashtagAnalytics.reduce((acc, h) => acc + h.reach, 0) / 1000).toFixed(0)}k
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section
          id="performance-comparison"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(139,92,246,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Performance comparison</h2>
              <p className="text-sm text-slate-100/75">
                Compare current performance metrics against previous periods to track growth and identify trends.
              </p>
            </header>

            <div className="space-y-4">
              {performanceComparison.map((comp) => (
                <div
                  key={comp.id}
                  className="rounded-3xl border border-white/15 bg-white/5 p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-white">{comp.metric}</h3>
                        <span className={`text-[10px] uppercase tracking-wider ${comp.trend === "up" ? "text-emerald-300" : "text-red-300"}`}>
                          {comp.trend}
                        </span>
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-slate-200/60">Current</p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            {typeof comp.current === "number" && comp.current > 1000
                              ? (comp.current / 1000).toFixed(1) + "k"
                              : comp.current}
                            {comp.metric === "Engagement Rate" && "%"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-200/60">Previous</p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            {typeof comp.previous === "number" && comp.previous > 1000
                              ? (comp.previous / 1000).toFixed(1) + "k"
                              : comp.previous}
                            {comp.metric === "Engagement Rate" && "%"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-200/60">Change</p>
                          <p className={`mt-1 text-sm font-semibold ${comp.change > 0 ? "text-emerald-300" : "text-red-300"}`}>
                            {comp.change > 0 ? "+" : ""}{comp.change}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(139,92,246,0.2)] backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Comparison summary
                </h3>
              </div>
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Metrics tracked</p>
                  <p className="mt-1 text-2xl font-semibold text-white">{performanceComparison.length}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Improving</p>
                  <p className="mt-1 text-xl font-semibold text-white">
                    {performanceComparison.filter((c) => c.trend === "up").length}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Declining</p>
                  <p className="mt-1 text-xl font-semibold text-white">
                    {performanceComparison.filter((c) => c.trend === "down").length}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section
          id="export-import"
          className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(34,197,94,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Export & Import</h2>
              <p className="text-sm text-slate-100/75">
                Export your data in various formats or import from external sources.
              </p>
            </header>

            <div className="space-y-6">
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Export Data
                </h3>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <div className="mb-4">
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                      Select Format
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {exportFormats.map((format) => (
                        <button
                          key={format.id}
                          type="button"
                          className="rounded-xl border border-white/20 bg-white/5 p-3 text-left text-sm text-white hover:border-white/40 hover:bg-white/10"
                        >
                          <p className="font-semibold">{format.label}</p>
                          <p className="mt-1 text-xs text-slate-200/70">{format.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="w-full rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white hover:border-white/40 hover:bg-white/15"
                  >
                    Export Now
                  </button>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Export History
                </h3>
                <div className="space-y-3">
                  {exportHistory.map((exportItem) => (
                    <div
                      key={exportItem.id}
                      className={`rounded-2xl border p-4 ${
                        exportItem.status === "completed"
                          ? "border-emerald-400/50 bg-emerald-400/10"
                          : "border-amber-400/50 bg-amber-400/10"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-white">{exportItem.name}</p>
                          <div className="mt-2 flex items-center gap-4 text-xs text-slate-200/70">
                            <span className="uppercase">{exportItem.format}</span>
                            {exportItem.size && <span>· {exportItem.size}</span>}
                            <span>· {formatRelativeTime(exportItem.createdAt)}</span>
                          </div>
                        </div>
                        <span
                          className={`text-[10px] uppercase tracking-wider ${
                            exportItem.status === "completed" ? "text-emerald-300" : "text-amber-300"
                          }`}
                        >
                          {exportItem.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(34,197,94,0.2)] backdrop-blur-2xl">
              <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                Import Sources
              </h3>
              <div className="mt-4 space-y-3">
                {importSources.map((source) => (
                  <div
                    key={source.id}
                    className={`rounded-2xl border p-4 ${
                      source.connected
                        ? "border-emerald-400/50 bg-emerald-400/10"
                        : "border-white/10 bg-slate-950/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{source.icon}</span>
                        <div>
                          <p className="text-sm font-semibold text-white">{source.name}</p>
                          <p className="text-xs text-slate-200/70">{source.description}</p>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] uppercase tracking-wider ${
                          source.connected ? "text-emerald-300" : "text-slate-300"
                        }`}
                      >
                        {source.connected ? "Connected" : "Connect"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section
          id="security"
          className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(239,68,68,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Security</h2>
              <p className="text-sm text-slate-100/75">
                Monitor security logs, manage sessions, and configure security settings.
              </p>
            </header>

            <div className="space-y-6">
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Security Logs
                </h3>
                <div className="space-y-3">
                  {securityLogs.map((log) => (
                    <div
                      key={log.id}
                      className={`rounded-2xl border p-4 ${
                        log.status === "success"
                          ? "border-emerald-400/50 bg-emerald-400/10"
                          : "border-rose-400/50 bg-rose-400/10"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-white">{log.type}</p>
                          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-200/70">
                            <span>{log.user}</span>
                            <span>·</span>
                            <span>{log.ip}</span>
                            <span>·</span>
                            <span>{log.location}</span>
                            <span>·</span>
                            <span>{formatRelativeTime(log.timestamp)}</span>
                          </div>
                        </div>
                        <span
                          className={`text-[10px] uppercase tracking-wider ${
                            log.status === "success" ? "text-emerald-300" : "text-rose-300"
                          }`}
                        >
                          {log.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Security Settings
                </h3>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-200/70">Two-Factor Auth</span>
                      <span className={securitySettings.twoFactorEnabled ? "text-emerald-300" : "text-slate-300"}>
                        {securitySettings.twoFactorEnabled ? "Enabled" : "Disabled"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-200/70">Password Expiry</span>
                      <span className="text-white">{securitySettings.passwordExpiry} days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-200/70">Session Timeout</span>
                      <span className="text-white">{securitySettings.sessionTimeout} minutes</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-200/70">Require MFA</span>
                      <span className={securitySettings.requireMfa ? "text-emerald-300" : "text-slate-300"}>
                        {securitySettings.requireMfa ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(239,68,68,0.2)] backdrop-blur-2xl">
              <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                Active Sessions
              </h3>
              <div className="mt-4 space-y-3">
                {activeSessions.map((session) => (
                  <div
                    key={session.id}
                    className={`rounded-2xl border p-4 ${
                      session.current
                        ? "border-emerald-400/50 bg-emerald-400/10"
                        : "border-white/10 bg-slate-950/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white">{session.device}</p>
                        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-200/70">
                          <span>{session.browser}</span>
                          <span>·</span>
                          <span>{session.ip}</span>
                          <span>·</span>
                          <span>{session.location}</span>
                        </div>
                        <p className="mt-2 text-xs text-slate-200/70">
                          Last active: {formatRelativeTime(session.lastActive)}
                        </p>
                      </div>
                      {session.current && (
                        <span className="text-[10px] uppercase tracking-wider text-emerald-300">
                          Current
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section
          id="billing"
          className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(168,85,247,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Billing & Usage</h2>
              <p className="text-sm text-slate-100/75">
                Manage your subscription, view usage, and access invoices.
              </p>
            </header>

            <div className="space-y-6">
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Current Plan
                </h3>
                <div className="grid gap-3">
                  {billingPlans.map((plan) => (
                    <div
                      key={plan.id}
                      className={`rounded-2xl border p-4 ${
                        plan.current
                          ? "border-purple-400/50 bg-purple-400/10"
                          : "border-white/10 bg-slate-950/40"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <p className="text-lg font-semibold text-white">{plan.name}</p>
                            {plan.current && (
                              <span className="text-[10px] uppercase tracking-wider text-purple-300">
                                Current
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-2xl font-bold text-white">
                            ${plan.price}
                            <span className="ml-1 text-sm font-normal text-slate-200/70">/{plan.interval}</span>
                          </p>
                          <ul className="mt-3 space-y-1 text-xs text-slate-200/70">
                            {plan.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <span>✓</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Usage
                </h3>
                <div className="space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-200/70">Posts</span>
                      <span className="text-sm font-semibold text-white">
                        {usageMetrics.postsUsed.toLocaleString()} / {usageMetrics.postsLimit.toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full bg-emerald-400"
                        style={{ width: `${(usageMetrics.postsUsed / usageMetrics.postsLimit) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-200/70">Accounts</span>
                      <span className="text-sm font-semibold text-white">
                        {usageMetrics.accountsUsed} / {usageMetrics.accountsLimit}
                      </span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full bg-blue-400"
                        style={{ width: `${(usageMetrics.accountsUsed / usageMetrics.accountsLimit) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-200/70">Storage</span>
                      <span className="text-sm font-semibold text-white">
                        {usageMetrics.storageUsed} GB / {usageMetrics.storageLimit} GB
                      </span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full bg-purple-400"
                        style={{ width: `${(usageMetrics.storageUsed / usageMetrics.storageLimit) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(168,85,247,0.2)] backdrop-blur-2xl">
              <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                Invoice History
              </h3>
              <div className="mt-4 space-y-3">
                {invoiceHistory.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white">
                          ${invoice.amount} - {new Date(invoice.date).toLocaleDateString()}
                        </p>
                        <p className="mt-1 text-xs text-slate-200/70">
                          {formatRelativeTime(invoice.date)}
                        </p>
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-emerald-300">
                        {invoice.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section
          id="content-library"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(99,102,241,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Content library</h2>
              <p className="text-sm text-slate-100/75">
                Manage your media assets, templates, and reusable content across all channels.
              </p>
            </header>

            <div className="space-y-4">
              {contentLibraryItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl border border-white/15 bg-white/5 p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                        <span className="text-xs uppercase tracking-wider text-slate-300">
                          {item.type}
                        </span>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <div>
                          <p className="text-xs text-slate-200/60">Size</p>
                          <p className="mt-1 text-sm font-semibold text-white">{item.size}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-200/60">Usage</p>
                          <p className="mt-1 text-sm font-semibold text-white">{item.usage} times</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-200/60">Uploaded</p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            {formatRelativeTime(item.uploadedAt)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-200/60">Channels</p>
                          <p className="mt-1 text-sm font-semibold text-white">{item.channels.length}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={`${item.id}-${tag}`}
                            className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-slate-200/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(99,102,241,0.2)] backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Library stats
                </h3>
              </div>
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Total assets</p>
                  <p className="mt-1 text-2xl font-semibold text-white">{contentLibraryItems.length}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Total usage</p>
                  <p className="mt-1 text-xl font-semibold text-white">
                    {contentLibraryItems.reduce((acc, item) => acc + item.usage, 0)}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Storage used</p>
                  <p className="mt-1 text-xl font-semibold text-white">~50 MB</p>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section
          id="advanced-search"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(34,197,94,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Advanced search</h2>
              <p className="text-sm text-slate-100/75">
                Search across all content, posts, and analytics with powerful filters and queries.
              </p>
            </header>

            <div className="space-y-4">
              {searchHistory.map((search) => (
                <div
                  key={search.id}
                  className="rounded-3xl border border-white/15 bg-white/5 p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-white">{search.query}</h3>
                        <span className="text-xs text-slate-200/70">{search.results} results</span>
                      </div>
                      <div className="mt-4 flex items-center gap-4 text-xs text-slate-200/70">
                        <span>{formatRelativeTime(search.searchedAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(34,197,94,0.2)] backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Search stats
                </h3>
              </div>
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Recent searches</p>
                  <p className="mt-1 text-2xl font-semibold text-white">{searchHistory.length}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Total results</p>
                  <p className="mt-1 text-xl font-semibold text-white">
                    {searchHistory.reduce((acc, s) => acc + s.results, 0)}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section
          id="user-management"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(236,72,153,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">User management & permissions</h2>
              <p className="text-sm text-slate-100/75">
                Manage team members, roles, and access permissions across your organization.
              </p>
            </header>

            <div className="space-y-4">
              {userRoles.map((role) => (
                <div
                  key={role.id}
                  className="rounded-3xl border border-white/15 bg-white/5 p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-white">{role.name}</h3>
                        <span className="text-xs text-slate-200/70">{role.users} users</span>
                      </div>
                      <p className="mt-2 text-sm text-slate-200/70">{role.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {role.permissions.map((perm) => (
                          <span
                            key={`${role.id}-${perm}`}
                            className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-slate-200/70"
                          >
                            {perm}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(236,72,153,0.2)] backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Role summary
                </h3>
              </div>
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Total roles</p>
                  <p className="mt-1 text-2xl font-semibold text-white">{userRoles.length}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Total users</p>
                  <p className="mt-1 text-xl font-semibold text-white">
                    {userRoles.reduce((acc, r) => acc + r.users, 0)}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section
          id="export-backup"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(251,146,60,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Export & backup</h2>
              <p className="text-sm text-slate-100/75">
                Export your data, create backups, and manage data retention policies.
              </p>
            </header>

            <div className="space-y-4">
              {exportHistoryItems.map((exportItem) => (
                <div
                  key={exportItem.id}
                  className={`rounded-3xl border p-6 ${exportItem.status === "completed" ? "border-emerald-400/50 bg-emerald-400/10" : "border-amber-400/50 bg-amber-400/10"}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-white">{exportItem.name}</h3>
                        <span className="text-xs uppercase tracking-wider text-slate-300">
                          {exportItem.type}
                        </span>
                        <span className={`text-[10px] uppercase tracking-wider ${exportItem.status === "completed" ? "text-emerald-300" : "text-amber-300"}`}>
                          {exportItem.status}
                        </span>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-slate-200/60">Size</p>
                          <p className="mt-1 text-sm font-semibold text-white">{exportItem.size}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-200/60">Exported</p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            {formatRelativeTime(exportItem.exportedAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(251,146,60,0.2)] backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Export summary
                </h3>
              </div>
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Total exports</p>
                  <p className="mt-1 text-2xl font-semibold text-white">{exportHistoryItems.length}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Completed</p>
                  <p className="mt-1 text-xl font-semibold text-white">
                    {exportHistoryItems.filter((e) => e.status === "completed").length}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section
          id="revenue-tracking"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(34,197,94,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Revenue tracking</h2>
              <p className="text-sm text-slate-100/75">
                Track revenue from sponsored posts, affiliate links, and product sales across all channels.
              </p>
            </header>

            <div className="space-y-4">
              {revenueData.map((revenue) => (
                <div
                  key={revenue.id}
                  className="rounded-3xl border border-white/15 bg-white/5 p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-white">{revenue.source}</h3>
                        <span className={`text-[10px] uppercase tracking-wider ${revenue.trend === "up" ? "text-emerald-300" : "text-red-300"}`}>
                          {revenue.trend}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-slate-200/70">{revenue.period}</p>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-slate-200/60">Amount</p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            ${(revenue.amount / 1000).toFixed(1)}k
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-200/60">Growth</p>
                          <p className={`mt-1 text-sm font-semibold ${revenue.growth > 0 ? "text-emerald-300" : "text-red-300"}`}>
                            {revenue.growth > 0 ? "+" : ""}{revenue.growth}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(34,197,94,0.2)] backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Revenue summary
                </h3>
              </div>
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Total revenue</p>
                  <p className="mt-1 text-2xl font-semibold text-white">
                    ${(revenueData.reduce((acc, r) => acc + r.amount, 0) / 1000).toFixed(1)}k
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Revenue sources</p>
                  <p className="mt-1 text-xl font-semibold text-white">{revenueData.length}</p>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section
          id="multi-language"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(59,130,246,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Multi-language support</h2>
              <p className="text-sm text-slate-100/75">
                Manage content across multiple languages and track performance by language.
              </p>
            </header>

            <div className="space-y-4">
              {languageSettings.map((lang) => (
                <div
                  key={lang.id}
                  className="rounded-3xl border border-white/15 bg-white/5 p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-white">{lang.language}</h3>
                        <span className="text-xs uppercase tracking-wider text-slate-300">
                          {lang.code}
                        </span>
                        <span className={`text-[10px] uppercase tracking-wider ${lang.status === "active" ? "text-emerald-300" : "text-slate-300"}`}>
                          {lang.status}
                        </span>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                        <div>
                          <p className="text-xs text-slate-200/60">Posts</p>
                          <p className="mt-1 text-sm font-semibold text-white">{lang.posts}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-200/60">Engagement</p>
                          <p className="mt-1 text-sm font-semibold text-white">{lang.engagement}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(59,130,246,0.2)] backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Language stats
                </h3>
              </div>
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Active languages</p>
                  <p className="mt-1 text-2xl font-semibold text-white">
                    {languageSettings.filter((l) => l.status === "active").length}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Total posts</p>
                  <p className="mt-1 text-xl font-semibold text-white">
                    {languageSettings.reduce((acc, l) => acc + l.posts, 0)}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section
          id="post-analytics"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(139,92,246,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Post analytics deep dive</h2>
              <p className="text-sm text-slate-100/75">
                Detailed analytics for individual posts including impressions, engagement, clicks, and saves.
              </p>
            </header>

            <div className="space-y-4">
              {postAnalytics.map((analytics) => (
                <div
                  key={analytics.id}
                  className="rounded-3xl border border-white/15 bg-white/5 p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-white">{analytics.title}</h3>
                        <span className="text-xs text-slate-200/70">
                          {formatRelativeTime(analytics.publishedAt)}
                        </span>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <div>
                          <p className="text-xs text-slate-200/60">Impressions</p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            {(analytics.impressions / 1000).toFixed(0)}k
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-200/60">Reach</p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            {(analytics.reach / 1000).toFixed(0)}k
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-200/60">Engagement</p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            {(analytics.engagement / 1000).toFixed(1)}k
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-200/60">Engagement Rate</p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            {analytics.engagementRate}%
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <div>
                          <p className="text-xs text-slate-200/60">Clicks</p>
                          <p className="mt-1 text-sm font-semibold text-white">{analytics.clicks}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-200/60">Saves</p>
                          <p className="mt-1 text-sm font-semibold text-white">{analytics.saves}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-200/60">Shares</p>
                          <p className="mt-1 text-sm font-semibold text-white">{analytics.shares}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(139,92,246,0.2)] backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Analytics summary
                </h3>
              </div>
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Posts tracked</p>
                  <p className="mt-1 text-2xl font-semibold text-white">{postAnalytics.length}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Avg engagement rate</p>
                  <p className="mt-1 text-xl font-semibold text-white">
                    {(postAnalytics.reduce((acc, a) => acc + a.engagementRate, 0) / postAnalytics.length).toFixed(1)}%
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Total impressions</p>
                  <p className="mt-1 text-xl font-semibold text-white">
                    {(postAnalytics.reduce((acc, a) => acc + a.impressions, 0) / 1000).toFixed(0)}k
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section
          id="help"
          className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(34,197,94,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Help Center</h2>
              <p className="text-sm text-slate-100/75">
                Find answers, tutorials, and get support for your questions.
              </p>
            </header>

            <div className="space-y-6">
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Categories
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {helpCategories.map((category) => {
                    const isSelected = category.id === selectedHelpCategory;
                    return (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => setSelectedHelpCategory(category.id)}
                        className={`rounded-2xl border p-4 text-left transition ${
                          isSelected
                            ? "border-white/30 bg-white/10"
                            : "border-white/10 bg-slate-950/40 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{category.icon}</span>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-white">{category.name}</p>
                            <p className="mt-1 text-xs text-slate-200/70">{category.articles} articles</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Popular Articles
                </h3>
                <div className="space-y-3">
                  {popularArticles.map((article) => (
                    <div
                      key={article.id}
                      className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                    >
                      <p className="text-sm font-semibold text-white">{article.title}</p>
                      <div className="mt-2 flex items-center gap-4 text-xs text-slate-200/70">
                        <span>{article.views} views</span>
                        <span>·</span>
                        <span>{article.helpful}% helpful</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(34,197,94,0.2)] backdrop-blur-2xl">
              <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                Support Tickets
              </h3>
              <div className="mt-4 space-y-3">
                {supportTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className={`rounded-2xl border p-4 ${
                      ticket.status === "open"
                        ? "border-rose-400/50 bg-rose-400/10"
                        : ticket.status === "in-progress"
                          ? "border-amber-400/50 bg-amber-400/10"
                          : "border-white/10 bg-slate-950/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white">{ticket.subject}</p>
                        <div className="mt-2 flex items-center gap-3 text-xs text-slate-200/70">
                          <span className="uppercase">{ticket.status}</span>
                          <span>·</span>
                          <span className="uppercase">{ticket.priority}</span>
                          <span>·</span>
                          <span>{formatRelativeTime(ticket.lastReply)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section
          id="changelog"
          className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(168,85,247,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Changelog</h2>
              <p className="text-sm text-slate-100/75">
                Stay updated with the latest releases and upcoming features.
              </p>
            </header>

            <div className="space-y-6">
              {releases.map((release) => (
                <div
                  key={release.id}
                  className={`rounded-2xl border p-4 ${
                    release.type === "major"
                      ? "border-purple-400/50 bg-purple-400/10"
                      : "border-white/10 bg-slate-950/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <p className="text-lg font-semibold text-white">v{release.version}</p>
                        <span className="text-[10px] uppercase tracking-wider text-slate-200/70">
                          {release.type}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-200/70">
                        {formatRelativeTime(release.date)}
                      </p>
                      {release.features.length > 0 && (
                        <div className="mt-3">
                          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                            New Features
                          </p>
                          <ul className="space-y-1 text-xs text-slate-200/70">
                            {release.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <span className="text-emerald-300">+</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {release.improvements.length > 0 && (
                        <div className="mt-3">
                          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                            Improvements
                          </p>
                          <ul className="space-y-1 text-xs text-slate-200/70">
                            {release.improvements.map((improvement, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <span className="text-blue-300">~</span>
                                <span>{improvement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {release.fixes.length > 0 && (
                        <div className="mt-3">
                          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                            Fixes
                          </p>
                          <ul className="space-y-1 text-xs text-slate-200/70">
                            {release.fixes.map((fix, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <span className="text-rose-300">×</span>
                                <span>{fix}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(168,85,247,0.2)] backdrop-blur-2xl">
              <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                Upcoming Features
              </h3>
              <div className="mt-4 space-y-3">
                {upcomingFeatures.map((feature) => (
                  <div
                    key={feature.id}
                    className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                  >
                    <p className="text-sm font-semibold text-white">{feature.title}</p>
                    <p className="mt-1 text-xs text-slate-200/70">{feature.description}</p>
                    <div className="mt-3 flex items-center gap-3 text-xs text-slate-200/70">
                      <span className="uppercase">{feature.status}</span>
                      <span>·</span>
                      <span>{feature.estimatedRelease}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section
          id="mobile"
          className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(59,130,246,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Mobile Apps</h2>
              <p className="text-sm text-slate-100/75">
                Manage your social media on the go with our mobile applications.
              </p>
            </header>

            <div className="space-y-6">
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Available Apps
                </h3>
                <div className="space-y-3">
                  {mobileApps.map((app) => (
                    <div
                      key={app.id}
                      className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-lg font-semibold text-white">{app.platform}</p>
                          <p className="mt-1 text-xs text-slate-200/70">v{app.version}</p>
                          <div className="mt-3 flex items-center gap-4 text-xs text-slate-200/70">
                            <span>{app.downloads.toLocaleString()} downloads</span>
                            <span>·</span>
                            <span>⭐ {app.rating}</span>
                            <span>·</span>
                            <span>{app.reviews} reviews</span>
                          </div>
                        </div>
                        <span
                          className={`text-[10px] uppercase tracking-wider ${
                            app.status === "active" ? "text-emerald-300" : "text-slate-300"
                          }`}
                        >
                          {app.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Features
                </h3>
                <div className="space-y-3">
                  {mobileFeatures.map((feature) => (
                    <div
                      key={feature.id}
                      className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-white">{feature.name}</p>
                          <p className="mt-1 text-xs text-slate-200/70">{feature.description}</p>
                        </div>
                        <span
                          className={`text-[10px] uppercase tracking-wider ${
                            feature.enabled ? "text-emerald-300" : "text-slate-300"
                          }`}
                        >
                          {feature.enabled ? "Enabled" : "Disabled"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(59,130,246,0.2)] backdrop-blur-2xl">
              <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                Device Usage
              </h3>
              <div className="mt-4 space-y-3">
                {deviceStats.map((stat) => (
                  <div key={stat.device} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white">{stat.device}</span>
                      <span className="text-sm font-semibold text-white">{stat.percentage}%</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full bg-blue-400"
                        style={{ width: `${stat.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section
          id="brand"
          className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(236,72,153,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Brand Guidelines</h2>
              <p className="text-sm text-slate-100/75">
                Access brand assets, guidelines, and usage information.
              </p>
            </header>

            <div className="space-y-6">
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Brand Assets
                </h3>
                <div className="space-y-3">
                  {brandAssets.map((asset) => (
                    <div
                      key={asset.id}
                      className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-white">{asset.name}</p>
                          <div className="mt-2 flex items-center gap-3 text-xs text-slate-200/70">
                            <span className="uppercase">{asset.type}</span>
                            <span>·</span>
                            <span className="uppercase">{asset.format}</span>
                            <span>·</span>
                            <span>{asset.size}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:border-white/40 hover:bg-white/15"
                        >
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Brand Colors
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {Object.entries(brandGuidelines.colors).map(([name, color]) => (
                    <div key={name} className="rounded-xl border border-white/10 bg-slate-950/40 p-3">
                      <div
                        className="mb-2 h-12 w-full rounded-lg"
                        style={{ backgroundColor: color }}
                      />
                      <p className="text-xs font-semibold text-white capitalize">{name}</p>
                      <p className="mt-1 font-mono text-xs text-slate-200/70">{color}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(236,72,153,0.2)] backdrop-blur-2xl">
              <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                Usage Statistics
              </h3>
              <div className="mt-4 space-y-3">
                {brandUsage.map((usage) => (
                  <div
                    key={usage.id}
                    className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white">{usage.platform}</p>
                        <div className="mt-2 flex items-center gap-3 text-xs text-slate-200/70">
                          <span>{usage.instances} instances</span>
                          <span>·</span>
                          <span>Last used {formatRelativeTime(usage.lastUsed)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section
          id="backup"
          className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(139,92,246,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Backup & Restore</h2>
              <p className="text-sm text-slate-100/75">
                Manage automated backups and restore points for your data.
              </p>
            </header>

            <div className="space-y-6">
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Backup Schedules
                </h3>
                <div className="space-y-3">
                  {backupSchedules.map((schedule) => (
                    <div
                      key={schedule.id}
                      className={`rounded-2xl border p-4 ${
                        schedule.status === "active"
                          ? "border-emerald-400/50 bg-emerald-400/10"
                          : "border-white/10 bg-slate-950/40"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-white">{schedule.name}</p>
                          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-200/70">
                            <span className="uppercase">{schedule.frequency}</span>
                            <span>·</span>
                            <span>{schedule.time}</span>
                            <span>·</span>
                            <span>{schedule.size}</span>
                          </div>
                          <div className="mt-3 flex items-center gap-4 text-xs text-slate-200/70">
                            <span>Last: {formatRelativeTime(schedule.lastRun)}</span>
                            <span>·</span>
                            <span>Next: {formatRelativeTime(schedule.nextRun)}</span>
                          </div>
                        </div>
                        <span
                          className={`text-[10px] uppercase tracking-wider ${
                            schedule.status === "active" ? "text-emerald-300" : "text-slate-300"
                          }`}
                        >
                          {schedule.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Backup History
                </h3>
                <div className="space-y-3">
                  {backupHistory.map((backup) => (
                    <div
                      key={backup.id}
                      className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-white">
                            {backup.type === "automatic" ? "Automatic Backup" : "Manual Backup"}
                          </p>
                          <div className="mt-2 flex items-center gap-3 text-xs text-slate-200/70">
                            <span>{backup.size}</span>
                            <span>·</span>
                            <span>{formatRelativeTime(backup.date)}</span>
                          </div>
                        </div>
                        <span
                          className={`text-[10px] uppercase tracking-wider ${
                            backup.status === "completed" ? "text-emerald-300" : "text-amber-300"
                          }`}
                        >
                          {backup.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(139,92,246,0.2)] backdrop-blur-2xl">
              <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                Restore Points
              </h3>
              <div className="mt-4 space-y-3">
                {restorePoints.map((point) => (
                  <div
                    key={point.id}
                    className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white">{point.name}</p>
                        <div className="mt-2 flex items-center gap-3 text-xs text-slate-200/70">
                          <span>{point.size}</span>
                          <span>·</span>
                          <span>{formatRelativeTime(point.date)}</span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {point.items.map((item) => (
                            <span
                              key={item}
                              className="rounded-full bg-white/10 px-2 py-1 text-[10px] text-slate-200/70"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:border-white/40 hover:bg-white/15"
                      >
                        Restore
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section
          id="calendar-views"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(99,102,241,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Content calendar views</h2>
              <p className="text-sm text-slate-100/75">
                Switch between different calendar views to manage your content schedule effectively.
              </p>
            </header>

            <div className="space-y-4">
              {calendarViews.map((view) => (
                <div
                  key={view.id}
                  className="rounded-3xl border border-white/15 bg-white/5 p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-white">{view.name}</h3>
                        <span className="text-xs text-slate-200/70">{view.dateRange}</span>
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-slate-200/60">Total posts</p>
                          <p className="mt-1 text-sm font-semibold text-white">{view.posts}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-200/60">Scheduled</p>
                          <p className="mt-1 text-sm font-semibold text-white">{view.scheduled}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-200/60">Drafts</p>
                          <p className="mt-1 text-sm font-semibold text-white">{view.draft}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(99,102,241,0.2)] backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  View summary
                </h3>
              </div>
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Available views</p>
                  <p className="mt-1 text-2xl font-semibold text-white">{calendarViews.length}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Total posts</p>
                  <p className="mt-1 text-xl font-semibold text-white">
                    {calendarViews.reduce((acc, v) => acc + v.posts, 0)}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section
          id="team-collaboration"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(236,72,153,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Team collaboration tools</h2>
              <p className="text-sm text-slate-100/75">
                Streamline team workflows with review boards, creative briefs, and asset requests.
              </p>
            </header>

            <div className="space-y-4">
              {collaborationTools.map((tool) => (
                <div
                  key={tool.id}
                  className="rounded-3xl border border-white/15 bg-white/5 p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-white">{tool.name}</h3>
                        <span className="text-xs uppercase tracking-wider text-slate-300">
                          {tool.type}
                        </span>
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-slate-200/60">Active members</p>
                          <p className="mt-1 text-sm font-semibold text-white">{tool.activeMembers}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-200/60">Pending reviews</p>
                          <p className="mt-1 text-sm font-semibold text-white">{tool.pendingReviews}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-200/60">Completed today</p>
                          <p className="mt-1 text-sm font-semibold text-white">{tool.completedToday}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(236,72,153,0.2)] backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Collaboration summary
                </h3>
              </div>
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Active tools</p>
                  <p className="mt-1 text-2xl font-semibold text-white">{collaborationTools.length}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Total pending</p>
                  <p className="mt-1 text-xl font-semibold text-white">
                    {collaborationTools.reduce((acc, t) => acc + t.pendingReviews, 0)}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section
          id="performance-predictions"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(34,197,94,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Content performance predictions</h2>
              <p className="text-sm text-slate-100/75">
                AI-powered predictions for post performance to optimize your content strategy.
              </p>
            </header>

            <div className="space-y-4">
              {performancePredictions.map((prediction) => (
                <div
                  key={prediction.id}
                  className="rounded-3xl border border-white/15 bg-white/5 p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-white">{prediction.postTitle}</h3>
                        <span className="text-xs text-slate-200/70">{prediction.confidence}% confidence</span>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <div>
                          <p className="text-xs text-slate-200/60">Predicted reach</p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            {(prediction.predictedReach / 1000).toFixed(0)}k
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-200/60">Predicted engagement</p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            {(prediction.predictedEngagement / 1000).toFixed(1)}k
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-200/60">Best time</p>
                          <p className="mt-1 text-sm font-semibold text-white">{prediction.bestTime}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-200/60">Best day</p>
                          <p className="mt-1 text-sm font-semibold text-white">{prediction.bestDay}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(34,197,94,0.2)] backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Predictions summary
                </h3>
              </div>
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Active predictions</p>
                  <p className="mt-1 text-2xl font-semibold text-white">{performancePredictions.length}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Avg confidence</p>
                  <p className="mt-1 text-xl font-semibold text-white">
                    {Math.round(performancePredictions.reduce((acc, p) => acc + p.confidence, 0) / performancePredictions.length)}%
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section
          id="automated-suggestions"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(251,146,60,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Automated content suggestions</h2>
              <p className="text-sm text-slate-100/75">
                AI-powered suggestions to improve your content strategy and engagement.
              </p>
            </header>

            <div className="space-y-4">
              {automatedSuggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className={`rounded-3xl border p-6 ${suggestion.priority === "high" ? "border-red-400/50 bg-red-400/10" : suggestion.priority === "medium" ? "border-amber-400/50 bg-amber-400/10" : "border-white/15 bg-white/5"}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-white">{suggestion.title}</h3>
                        <span className={`text-[10px] uppercase tracking-wider ${suggestion.priority === "high" ? "text-red-300" : suggestion.priority === "medium" ? "text-amber-300" : "text-slate-300"}`}>
                          {suggestion.priority}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-slate-200/70">{suggestion.reason}</p>
                      <div className="mt-4 flex items-center gap-4 text-xs">
                        <div>
                          <p className="text-slate-200/60">Estimated engagement</p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            {suggestion.estimatedEngagement}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(251,146,60,0.2)] backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Suggestions summary
                </h3>
              </div>
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Active suggestions</p>
                  <p className="mt-1 text-2xl font-semibold text-white">{automatedSuggestions.length}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">High priority</p>
                  <p className="mt-1 text-xl font-semibold text-white">
                    {automatedSuggestions.filter((s) => s.priority === "high").length}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section
          id="monitoring-dashboard"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(59,130,246,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Social media monitoring</h2>
              <p className="text-sm text-slate-100/75">
                Real-time alerts for mentions, hashtags, and competitor activity across platforms.
              </p>
            </header>

            <div className="space-y-4">
              {monitoringAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="rounded-3xl border border-white/15 bg-white/5 p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className={`h-2.5 w-2.5 rounded-full ${channelCatalog[alert.source as ChannelId].dot}`} />
                        <h3 className="text-lg font-semibold text-white">{alert.message}</h3>
                        <span className={`text-[10px] uppercase tracking-wider ${alert.sentiment === "positive" ? "text-emerald-300" : alert.sentiment === "negative" ? "text-red-300" : "text-slate-300"}`}>
                          {alert.sentiment}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-slate-200/70 capitalize">{alert.type}</p>
                      <div className="mt-4 flex items-center gap-4 text-xs">
                        <div>
                          <p className="text-slate-200/60">Reach</p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            {(alert.reach / 1000).toFixed(1)}k
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-200/60">Time</p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            {formatRelativeTime(alert.at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(59,130,246,0.2)] backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Monitoring summary
                </h3>
              </div>
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Active alerts</p>
                  <p className="mt-1 text-2xl font-semibold text-white">{monitoringAlerts.length}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Positive sentiment</p>
                  <p className="mt-1 text-xl font-semibold text-white">
                    {monitoringAlerts.filter((a) => a.sentiment === "positive").length}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section
          id="scheduling-optimization"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(139,92,246,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Scheduling optimization</h2>
              <p className="text-sm text-slate-100/75">
                AI-powered recommendations for optimal posting times to maximize engagement.
              </p>
            </header>

            <div className="space-y-4">
              {schedulingOptimization.map((opt) => (
                <div
                  key={opt.id}
                  className="rounded-3xl border border-white/15 bg-white/5 p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className={`h-2.5 w-2.5 rounded-full ${channelCatalog[opt.channel].dot}`} />
                        <h3 className="text-lg font-semibold text-white">
                          {channelCatalog[opt.channel].label}
                        </h3>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <div>
                          <p className="text-xs text-slate-200/60">Optimal time</p>
                          <p className="mt-1 text-sm font-semibold text-white">{opt.optimalTime}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-200/60">Optimal day</p>
                          <p className="mt-1 text-sm font-semibold text-white">{opt.optimalDay}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-200/60">Expected engagement</p>
                          <p className="mt-1 text-sm font-semibold text-white">{opt.expectedEngagement}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-200/60">Improvement</p>
                          <p className="mt-1 text-sm font-semibold text-emerald-300">
                            +{opt.improvement.toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(139,92,246,0.2)] backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Optimization summary
                </h3>
              </div>
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Channels optimized</p>
                  <p className="mt-1 text-2xl font-semibold text-white">{schedulingOptimization.length}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Avg improvement</p>
                  <p className="mt-1 text-xl font-semibold text-white">
                    +{Math.round(schedulingOptimization.reduce((acc, o) => acc + o.improvement, 0) / schedulingOptimization.length)}%
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section
          id="audience-growth"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(34,197,94,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Audience growth tracking</h2>
              <p className="text-sm text-slate-100/75">
                Monitor follower growth, growth rates, and trends across all your channels.
              </p>
            </header>

            <div className="space-y-4">
              {audienceGrowth.map((growth) => (
                <div
                  key={growth.id}
                  className="rounded-3xl border border-white/15 bg-white/5 p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className={`h-2.5 w-2.5 rounded-full ${channelCatalog[growth.channel].dot}`} />
                        <h3 className="text-lg font-semibold text-white">
                          {channelCatalog[growth.channel].label}
                        </h3>
                        <span className={`text-[10px] uppercase tracking-wider ${growth.trend === "up" ? "text-emerald-300" : "text-red-300"}`}>
                          {growth.trend}
                        </span>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <div>
                          <p className="text-xs text-slate-200/60">Current followers</p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            {(growth.currentFollowers / 1000).toFixed(0)}k
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-200/60">Growth this week</p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            +{(growth.growthThisWeek / 1000).toFixed(1)}k
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-200/60">Growth rate</p>
                          <p className="mt-1 text-sm font-semibold text-white">{growth.growthRate}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(34,197,94,0.2)] backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Growth summary
                </h3>
              </div>
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Total followers</p>
                  <p className="mt-1 text-2xl font-semibold text-white">
                    {(audienceGrowth.reduce((acc, g) => acc + g.currentFollowers, 0) / 1000).toFixed(0)}k
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Weekly growth</p>
                  <p className="mt-1 text-xl font-semibold text-white">
                    +{(audienceGrowth.reduce((acc, g) => acc + g.growthThisWeek, 0) / 1000).toFixed(1)}k
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section
          id="engagement-analysis"
          className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
        >
          <article className="flex flex-col gap-6 rounded-4xl border border-white/15 bg-white/10 p-8 shadow-[0_18px_60px_rgba(168,85,247,0.25)] backdrop-blur-2xl">
            <header className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold text-white">Engagement rate analysis</h2>
              <p className="text-sm text-slate-100/75">
                Deep dive into engagement metrics and compare against industry benchmarks.
              </p>
            </header>

            <div className="space-y-4">
              {engagementRateAnalysis.map((analysis) => (
                <div
                  key={analysis.id}
                  className="rounded-3xl border border-white/15 bg-white/5 p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-white">{analysis.metric}</h3>
                        <span className={`text-[10px] uppercase tracking-wider ${analysis.performance === "above_average" ? "text-emerald-300" : "text-red-300"}`}>
                          {analysis.performance.replace("_", " ")}
                        </span>
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-slate-200/60">Your value</p>
                          <p className="mt-1 text-sm font-semibold text-white">{analysis.value}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-200/60">Benchmark</p>
                          <p className="mt-1 text-sm font-semibold text-white">{analysis.benchmark}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-200/60">Change</p>
                          <p className={`mt-1 text-sm font-semibold ${analysis.change > 0 ? "text-emerald-300" : "text-red-300"}`}>
                            {analysis.change > 0 ? "+" : ""}{analysis.change}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <aside className="flex flex-col gap-6">
            <div className="rounded-4xl border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(168,85,247,0.2)] backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Analysis summary
                </h3>
              </div>
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Metrics tracked</p>
                  <p className="mt-1 text-2xl font-semibold text-white">{engagementRateAnalysis.length}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs text-slate-200/60">Above benchmark</p>
                  <p className="mt-1 text-xl font-semibold text-white">
                    {engagementRateAnalysis.filter((a) => a.performance === "above_average").length}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </section>

      </main>
    </div>
  );
}

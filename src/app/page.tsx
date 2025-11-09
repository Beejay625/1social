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
import {
  performanceMetrics,
  systemAlerts,
  uptimeStats,
} from "@/data/performance";
import {
  auditLogs,
  compliancePolicies,
  dataRetentionPolicies,
} from "@/data/compliance";
import {
  customIntegrations,
  integrationEvents,
  integrationTemplates,
} from "@/data/integrations-builder";
import {
  activeWorkflows,
  workflowTemplates,
  workflowTriggers,
} from "@/data/workflows";
import {
  moderationQueue,
  moderationRules,
  moderationStats,
} from "@/data/moderation";
import {
  apiDocumentation,
  codeSnippets,
  sdkVersions,
} from "@/data/developer";
import {
  customizationOptions,
  domainSettings,
  whiteLabelSettings,
} from "@/data/white-label";
import {
  analyticsReports,
  customMetrics,
  dataExports,
} from "@/data/advanced-analytics";
import {
  notificationChannels,
  notificationPreferences,
  recentNotifications,
} from "@/data/notifications-center";
import {
  automationLogs,
  automationRules,
  automationTemplates as automationTemplatesData,
} from "@/data/automation";
import {
  calendarEvents,
  calendarViews,
  timeSlots,
} from "@/data/calendar";
import {
  listeningAlerts,
  listeningKeywords,
  recentMentions,
} from "@/data/listening";
import {
  collaborationCampaigns,
  influencerMetrics,
  influencerProfiles,
} from "@/data/influencer-mgmt";
import {
  crisisAlerts,
  crisisResponseTemplates,
  crisisStats,
} from "@/data/crisis";
import {
  commerceStats,
  productCatalog,
  shoppingPosts,
} from "@/data/commerce";
import {
  recycledContent,
  recyclingRules,
  recyclingStats,
} from "@/data/recycling";
import {
  aiAssistants,
  aiCapabilities,
  aiConversations,
} from "@/data/ai-assistant";
import {
  actionableInsights,
  insightCategories,
  insights,
} from "@/data/insights";
import {
  experimentMetrics,
  experimentTemplates,
  experiments,
} from "@/data/experiments";
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

// Content performance benchmarking
const performanceBenchmarks = [
  {
    id: "bench-1",
    metric: "Engagement Rate",
    yourValue: 8.5,
    industryAverage: 6.2,
    topPerformers: 12.3,
    percentile: 75,
  },
  {
    id: "bench-2",
    metric: "Reach per Post",
    yourValue: 125000,
    industryAverage: 98000,
    topPerformers: 245000,
    percentile: 68,
  },
  {
    id: "bench-3",
    metric: "Posting Frequency",
    yourValue: 12,
    industryAverage: 8,
    topPerformers: 20,
    percentile: 72,
  },
];

// Content repurposing tools
const repurposingTools = [
  {
    id: "repurpose-1",
    originalTitle: "Product Launch Video",
    originalChannel: "instagram" as ChannelId,
    repurposedAs: "Farcaster Thread",
    performance: "+45% engagement",
    status: "completed",
  },
  {
    id: "repurpose-2",
    originalTitle: "Blog Post: Web3 Guide",
    originalChannel: "x" as ChannelId,
    repurposedAs: "Instagram Carousel",
    performance: "+32% reach",
    status: "scheduled",
  },
  {
    id: "repurpose-3",
    originalTitle: "Twitter Thread",
    originalChannel: "x" as ChannelId,
    repurposedAs: "LinkedIn Article",
    performance: "+28% clicks",
    status: "draft",
  },
];

// Social media ROI calculator
const roiCalculations = [
  {
    id: "roi-1",
    campaign: "Q1 Product Launch",
    investment: 50000,
    revenue: 125000,
    roi: 150,
    period: "30 days",
  },
  {
    id: "roi-2",
    campaign: "Community Growth",
    investment: 30000,
    revenue: 89000,
    roi: 196.7,
    period: "45 days",
  },
  {
    id: "roi-3",
    campaign: "Brand Awareness",
    investment: 25000,
    revenue: 56000,
    roi: 124,
    period: "60 days",
  },
];

// Content approval workflows
const approvalWorkflows = [
  {
    id: "workflow-1",
    name: "Standard Content Review",
    steps: 3,
    avgTime: "2 hours",
    status: "active",
    approvalsToday: 12,
  },
  {
    id: "workflow-2",
    name: "Quick Approval",
    steps: 1,
    avgTime: "15 minutes",
    status: "active",
    approvalsToday: 8,
  },
  {
    id: "workflow-3",
    name: "Executive Review",
    steps: 5,
    avgTime: "1 day",
    status: "active",
    approvalsToday: 3,
  },
];

// Social media compliance & legal
const complianceChecks = [
  {
    id: "compliance-1",
    type: "Copyright Check",
    status: "passed",
    checkedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    items: 45,
  },
  {
    id: "compliance-2",
    type: "Brand Guidelines",
    status: "passed",
    checkedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    items: 32,
  },
  {
    id: "compliance-3",
    type: "Legal Review",
    status: "pending",
    checkedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    items: 12,
  },
];

// Content calendar templates
const calendarTemplates = [
  {
    id: "template-1",
    name: "Weekly Content Mix",
    posts: 7,
    channels: ["farcaster", "instagram", "x"] as ChannelId[],
    usage: 24,
  },
  {
    id: "template-2",
    name: "Product Launch Sequence",
    posts: 12,
    channels: ["farcaster", "instagram"] as ChannelId[],
    usage: 8,
  },
  {
    id: "template-3",
    name: "Community Engagement",
    posts: 5,
    channels: ["farcaster", "lens"] as ChannelId[],
    usage: 15,
  },
];

// Influencer outreach management
const influencerOutreach = [
  {
    id: "outreach-1",
    influencer: "@cryptocreator",
    status: "contacted",
    responseRate: 85,
    collaborationValue: 12500,
    at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "outreach-2",
    influencer: "@web3designer",
    status: "negotiating",
    responseRate: 92,
    collaborationValue: 8900,
    at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id: "outreach-3",
    influencer: "@defiexplainer",
    status: "confirmed",
    responseRate: 78,
    collaborationValue: 15600,
    at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  },
];

// Social media crisis response
const crisisResponse = [
  {
    id: "crisis-1",
    type: "Negative Sentiment Spike",
    severity: "high",
    detectedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    responseTime: "15 minutes",
    status: "resolved",
  },
  {
    id: "crisis-2",
    type: "Brand Mention Issue",
    severity: "medium",
    detectedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    responseTime: "45 minutes",
    status: "monitoring",
  },
  {
    id: "crisis-3",
    type: "Competitor Attack",
    severity: "low",
    detectedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    responseTime: "2 hours",
    status: "resolved",
  },
];

// Content A/B testing results
const abTestResults = [
  {
    id: "ab-1",
    testName: "Headline Variation",
    variantA: "Launch Announcement",
    variantB: "Introducing New Product",
    winner: "A",
    confidence: 92,
    improvement: 18.5,
  },
  {
    id: "ab-2",
    testName: "Image Style",
    variantA: "Minimalist",
    variantB: "Bold Graphics",
    winner: "B",
    confidence: 85,
    improvement: 24.3,
  },
  {
    id: "ab-3",
    testName: "Posting Time",
    variantA: "Morning",
    variantB: "Evening",
    winner: "A",
    confidence: 78,
    improvement: 12.7,
  },
];

// Social media listening insights
const listeningInsights = [
  {
    id: "insight-1",
    topic: "Web3 Social",
    mentions: 12500,
    sentiment: "positive",
    trend: "up",
    growth: 24.5,
  },
  {
    id: "insight-2",
    topic: "Decentralized Platforms",
    mentions: 8900,
    sentiment: "neutral",
    trend: "up",
    growth: 18.2,
  },
  {
    id: "insight-3",
    topic: "Crypto Community",
    mentions: 15600,
    sentiment: "positive",
    trend: "stable",
    growth: 5.3,
  },
];

// Social media content library
const contentLibrary = [
  {
    id: "lib-1",
    title: "Product Showcase Video",
    type: "video",
    size: "12.5 MB",
    uploadDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    usage: 8,
    channels: ["instagram", "farcaster"] as ChannelId[],
  },
  {
    id: "lib-2",
    title: "Brand Logo Pack",
    type: "image",
    size: "2.3 MB",
    uploadDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    usage: 24,
    channels: ["x", "lens", "mirror"] as ChannelId[],
  },
  {
    id: "lib-3",
    title: "Product Demo GIF",
    type: "gif",
    size: "5.7 MB",
    uploadDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    usage: 15,
    channels: ["instagram", "x"] as ChannelId[],
  },
];

// Content performance comparison
const contentComparisons = [
  {
    id: "comp-1",
    metric: "Engagement Rate",
    current: 9.2,
    previous: 7.8,
    change: 17.9,
    period: "vs last month",
  },
  {
    id: "comp-2",
    metric: "Reach",
    current: 125000,
    previous: 98000,
    change: 27.6,
    period: "vs last month",
  },
  {
    id: "comp-3",
    metric: "Click-through Rate",
    current: 4.5,
    previous: 3.2,
    change: 40.6,
    period: "vs last month",
  },
];

// Social media competitor analysis
const competitorAnalysis = [
  {
    id: "comp-1",
    competitor: "@competitor1",
    followers: 125000,
    avgEngagement: 8.5,
    postsPerWeek: 12,
    growthRate: 5.2,
    yourFollowers: 98000,
    yourAvgEngagement: 9.2,
  },
  {
    id: "comp-2",
    competitor: "@competitor2",
    followers: 89000,
    avgEngagement: 7.8,
    postsPerWeek: 8,
    growthRate: 3.5,
    yourFollowers: 98000,
    yourAvgEngagement: 9.2,
  },
  {
    id: "comp-3",
    competitor: "@competitor3",
    followers: 156000,
    avgEngagement: 6.9,
    postsPerWeek: 15,
    growthRate: 4.8,
    yourFollowers: 98000,
    yourAvgEngagement: 9.2,
  },
];

// Content scheduling optimization
const schedulingOptimizations = [
  {
    id: "opt-1",
    channel: "farcaster" as ChannelId,
    recommendedTime: "10:00 AM",
    expectedEngagement: 12400,
    currentAvg: 8900,
    improvement: 39.3,
  },
  {
    id: "opt-2",
    channel: "instagram" as ChannelId,
    recommendedTime: "3:00 PM",
    expectedEngagement: 15600,
    currentAvg: 11200,
    improvement: 39.3,
  },
  {
    id: "opt-3",
    channel: "x" as ChannelId,
    recommendedTime: "12:00 PM",
    expectedEngagement: 18900,
    currentAvg: 14500,
    improvement: 30.3,
  },
];

// Social media engagement analytics
const engagementAnalytics = [
  {
    id: "eng-1",
    type: "Likes",
    count: 12400,
    change: 12.5,
    trend: "up",
  },
  {
    id: "eng-2",
    type: "Comments",
    count: 890,
    change: 8.3,
    trend: "up",
  },
  {
    id: "eng-3",
    type: "Shares",
    count: 1560,
    change: -2.1,
    trend: "down",
  },
  {
    id: "eng-4",
    type: "Saves",
    count: 2340,
    change: 15.7,
    trend: "up",
  },
];

// Content calendar integration
const calendarIntegrations = [
  {
    id: "cal-1",
    platform: "Google Calendar",
    status: "connected",
    events: 24,
    lastSync: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: "cal-2",
    platform: "Outlook",
    status: "connected",
    events: 18,
    lastSync: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "cal-3",
    platform: "Apple Calendar",
    status: "disconnected",
    events: 0,
    lastSync: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

// Social media automation rules
const automationRules = [
  {
    id: "rule-1",
    name: "Auto-reply to mentions",
    trigger: "Brand mention",
    action: "Send thank you message",
    status: "active",
    executions: 124,
  },
  {
    id: "rule-2",
    name: "Schedule best time posts",
    trigger: "New post created",
    action: "Optimize posting time",
    status: "active",
    executions: 89,
  },
  {
    id: "rule-3",
    name: "Auto-archive old posts",
    trigger: "Post older than 30 days",
    action: "Archive post",
    status: "paused",
    executions: 12,
  },
];

// Content performance tracking
const performanceTracking = [
  {
    id: "track-1",
    content: "Product Launch Announcement",
    impressions: 125000,
    engagement: 12400,
    engagementRate: 9.9,
    clicks: 890,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "track-2",
    content: "Community Spotlight",
    impressions: 98000,
    engagement: 8900,
    engagementRate: 9.1,
    clicks: 650,
    date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id: "track-3",
    content: "Educational Tutorial",
    impressions: 156000,
    engagement: 18900,
    engagementRate: 12.1,
    clicks: 1240,
    date: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  },
];

// Content performance dashboard
const performanceDashboard = [
  {
    id: "dash-1",
    metric: "Total Reach",
    value: 1250000,
    change: 12.5,
    trend: "up",
    period: "Last 30 days",
  },
  {
    id: "dash-2",
    metric: "Total Engagement",
    value: 124000,
    change: 8.3,
    trend: "up",
    period: "Last 30 days",
  },
  {
    id: "dash-3",
    metric: "Avg Engagement Rate",
    value: 9.9,
    change: 2.1,
    trend: "up",
    period: "Last 30 days",
  },
];

// Content collaboration tools
const collaborationTools = [
  {
    id: "collab-1",
    tool: "Content Review Board",
    activeUsers: 5,
    pendingReviews: 8,
    completedToday: 12,
  },
  {
    id: "collab-2",
    tool: "Creative Brief Builder",
    activeBriefs: 3,
    completedBriefs: 24,
    avgCompletionTime: "2 hours",
  },
  {
    id: "collab-3",
    tool: "Asset Request System",
    pendingRequests: 5,
    fulfilledToday: 8,
    avgFulfillmentTime: "4 hours",
  },
];

// Social media analytics export
const analyticsExports = [
  {
    id: "export-1",
    name: "Monthly Performance Report",
    format: "PDF",
    size: "2.5 MB",
    exportedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    status: "ready",
  },
  {
    id: "export-2",
    name: "Engagement Analytics",
    format: "CSV",
    size: "1.2 MB",
    exportedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    status: "ready",
  },
  {
    id: "export-3",
    name: "Campaign Summary",
    format: "Excel",
    size: "3.8 MB",
    exportedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    status: "ready",
  },
];

// Content approval queue
const approvalQueue = [
  {
    id: "approval-1",
    content: "Product Launch Post",
    author: "Ameena O.",
    submittedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    priority: "high",
    status: "pending",
  },
  {
    id: "approval-2",
    content: "Community Update",
    author: "Leo F.",
    submittedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    priority: "medium",
    status: "pending",
  },
  {
    id: "approval-3",
    content: "Educational Content",
    author: "Kai L.",
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    priority: "low",
    status: "approved",
  },
];

// Social media post templates
const postTemplates = [
  {
    id: "template-1",
    name: "Product Announcement",
    category: "Marketing",
    usage: 45,
    avgEngagement: 9.2,
    channels: ["farcaster", "instagram", "x"] as ChannelId[],
  },
  {
    id: "template-2",
    name: "Community Spotlight",
    category: "Community",
    usage: 32,
    avgEngagement: 8.5,
    channels: ["farcaster", "lens"] as ChannelId[],
  },
  {
    id: "template-3",
    name: "Educational Post",
    category: "Education",
    usage: 28,
    avgEngagement: 7.8,
    channels: ["instagram", "x", "mirror"] as ChannelId[],
  },
];

// Content performance insights
const performanceInsights = [
  {
    id: "insight-1",
    insight: "Video content performs 40% better than images",
    impact: "high",
    recommendation: "Increase video content by 25%",
  },
  {
    id: "insight-2",
    insight: "Posts published at 10 AM get 30% more engagement",
    impact: "medium",
    recommendation: "Schedule more posts for 10 AM",
  },
  {
    id: "insight-3",
    insight: "Farcaster channel shows highest engagement rates",
    impact: "high",
    recommendation: "Focus more content on Farcaster",
  },
];

// Social media engagement tracking
const engagementTracking = [
  {
    id: "eng-track-1",
    type: "Mentions",
    count: 1240,
    change: 15.2,
    topChannel: "farcaster" as ChannelId,
  },
  {
    id: "eng-track-2",
    type: "Direct Messages",
    count: 890,
    change: 8.5,
    topChannel: "instagram" as ChannelId,
  },
  {
    id: "eng-track-3",
    type: "Comments",
    count: 1560,
    change: 12.3,
    topChannel: "x" as ChannelId,
  },
];

// Content calendar views
const calendarViews = [
  {
    id: "view-1",
    view: "Week View",
    posts: 24,
    scheduled: 18,
    published: 6,
  },
  {
    id: "view-2",
    view: "Month View",
    posts: 98,
    scheduled: 72,
    published: 26,
  },
  {
    id: "view-3",
    view: "List View",
    posts: 156,
    scheduled: 124,
    published: 32,
  },
];

// Social media hashtag performance
const hashtagPerformance = [
  {
    id: "hashtag-1",
    hashtag: "#Web3Social",
    posts: 45,
    reach: 125000,
    engagement: 12400,
    growth: 24.5,
  },
  {
    id: "hashtag-2",
    hashtag: "#Decentralized",
    posts: 32,
    reach: 89000,
    engagement: 8900,
    growth: 18.2,
  },
  {
    id: "hashtag-3",
    hashtag: "#CryptoCommunity",
    posts: 28,
    reach: 156000,
    engagement: 18900,
    growth: 15.7,
  },
];

// Content repurposing suggestions
const repurposingSuggestions = [
  {
    id: "repurpose-1",
    original: "Blog Post: Web3 Guide",
    suggestion: "Create Instagram carousel",
    potentialReach: 125000,
    effort: "low",
  },
  {
    id: "repurpose-2",
    original: "Video Tutorial",
    suggestion: "Extract key moments as GIFs",
    potentialReach: 89000,
    effort: "medium",
  },
  {
    id: "repurpose-3",
    original: "Twitter Thread",
    suggestion: "Convert to LinkedIn article",
    potentialReach: 156000,
    effort: "low",
  },
];

// Social media content performance dashboard
const contentPerformanceDashboard = [
  {
    id: "perf-dash-1",
    metric: "Total Impressions",
    value: 1250000,
    change: 15.2,
    trend: "up",
    period: "Last 7 days",
  },
  {
    id: "perf-dash-2",
    metric: "Total Clicks",
    value: 8900,
    change: 22.5,
    trend: "up",
    period: "Last 7 days",
  },
  {
    id: "perf-dash-3",
    metric: "Conversion Rate",
    value: 4.5,
    change: 8.3,
    trend: "up",
    period: "Last 7 days",
  },
];

// Social media content library management
const contentLibraryManagement = [
  {
    id: "lib-mgmt-1",
    category: "Videos",
    count: 24,
    totalSize: "125.5 MB",
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "lib-mgmt-2",
    category: "Images",
    count: 156,
    totalSize: "89.2 MB",
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
  {
    id: "lib-mgmt-3",
    category: "Documents",
    count: 32,
    totalSize: "12.8 MB",
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

// Social media content performance comparison
const contentPerformanceComparison = [
  {
    id: "comp-perf-1",
    period: "This Week",
    reach: 125000,
    engagement: 12400,
    clicks: 890,
    conversions: 45,
  },
  {
    id: "comp-perf-2",
    period: "Last Week",
    reach: 98000,
    engagement: 8900,
    clicks: 650,
    conversions: 32,
  },
  {
    id: "comp-perf-3",
    period: "This Month",
    reach: 1250000,
    engagement: 124000,
    clicks: 8900,
    conversions: 450,
  },
];

// Social media competitor analysis
const socialMediaCompetitorAnalysis = [
  {
    id: "comp-social-1",
    competitor: "Competitor A",
    followers: 125000,
    engagementRate: 8.5,
    avgPostsPerWeek: 12,
    growthRate: 5.2,
    yourAdvantage: "Higher engagement rate",
  },
  {
    id: "comp-social-2",
    competitor: "Competitor B",
    followers: 89000,
    engagementRate: 7.8,
    avgPostsPerWeek: 8,
    growthRate: 3.5,
    yourAdvantage: "More consistent posting",
  },
  {
    id: "comp-social-3",
    competitor: "Competitor C",
    followers: 156000,
    engagementRate: 6.9,
    avgPostsPerWeek: 15,
    growthRate: 4.8,
    yourAdvantage: "Better content quality",
  },
];

// Content scheduling optimization
const contentSchedulingOptimization = [
  {
    id: "sched-opt-1",
    day: "Monday",
    bestTime: "10:00 AM",
    expectedEngagement: 12400,
    currentAvg: 8900,
    improvement: 39.3,
  },
  {
    id: "sched-opt-2",
    day: "Wednesday",
    bestTime: "3:00 PM",
    expectedEngagement: 15600,
    currentAvg: 11200,
    improvement: 39.3,
  },
  {
    id: "sched-opt-3",
    day: "Friday",
    bestTime: "12:00 PM",
    expectedEngagement: 18900,
    currentAvg: 14500,
    improvement: 30.3,
  },
];

// Social media engagement analytics
const socialMediaEngagementAnalytics = [
  {
    id: "eng-analytics-1",
    channel: "farcaster" as ChannelId,
    likes: 12400,
    comments: 890,
    shares: 1560,
    saves: 2340,
    engagementRate: 9.9,
  },
  {
    id: "eng-analytics-2",
    channel: "instagram" as ChannelId,
    likes: 8900,
    comments: 650,
    shares: 890,
    saves: 1890,
    engagementRate: 10.0,
  },
  {
    id: "eng-analytics-3",
    channel: "x" as ChannelId,
    likes: 15600,
    comments: 1240,
    shares: 2340,
    saves: 0,
    engagementRate: 12.1,
  },
];

// Content calendar integration
const contentCalendarIntegration = [
  {
    id: "cal-integration-1",
    service: "Google Calendar",
    status: "connected",
    eventsSynced: 24,
    lastSync: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: "cal-integration-2",
    service: "Outlook Calendar",
    status: "connected",
    eventsSynced: 18,
    lastSync: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "cal-integration-3",
    service: "Apple Calendar",
    status: "disconnected",
    eventsSynced: 0,
    lastSync: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

// Social media automation rules
const socialMediaAutomationRules = [
  {
    id: "auto-rule-1",
    name: "Auto-reply to mentions",
    trigger: "Brand mention detected",
    action: "Send thank you message",
    status: "active",
    executions: 124,
    lastExecuted: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: "auto-rule-2",
    name: "Schedule best time posts",
    trigger: "New post created",
    action: "Optimize posting time",
    status: "active",
    executions: 89,
    lastExecuted: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "auto-rule-3",
    name: "Auto-archive old posts",
    trigger: "Post older than 30 days",
    action: "Archive post",
    status: "paused",
    executions: 12,
    lastExecuted: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

// Content performance tracking
const contentPerformanceTracking = [
  {
    id: "track-perf-1",
    contentTitle: "Product Launch Announcement",
    platform: "farcaster" as ChannelId,
    impressions: 125000,
    engagement: 12400,
    clicks: 890,
    conversions: 45,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "track-perf-2",
    contentTitle: "Community Spotlight",
    platform: "instagram" as ChannelId,
    impressions: 98000,
    engagement: 8900,
    clicks: 650,
    conversions: 32,
    date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id: "track-perf-3",
    contentTitle: "Educational Tutorial",
    platform: "x" as ChannelId,
    impressions: 156000,
    engagement: 18900,
    clicks: 1240,
    conversions: 78,
    date: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
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
  { id: "performance-benchmarks", label: "Performance Benchmarks" },
  { id: "content-repurposing", label: "Content Repurposing" },
  { id: "roi-calculator", label: "ROI Calculator" },
  { id: "approval-workflows", label: "Approval Workflows" },
  { id: "compliance-legal", label: "Compliance & Legal" },
  { id: "calendar-templates", label: "Calendar Templates" },
  { id: "influencer-outreach", label: "Influencer Outreach" },
  { id: "crisis-response", label: "Crisis Response" },
  { id: "ab-test-results", label: "A/B Test Results" },
  { id: "listening-insights", label: "Listening Insights" },
  { id: "budget-management", label: "Budget Management" },
  { id: "calendar-sync", label: "Calendar Sync" },
  { id: "team-performance", label: "Team Performance" },
  { id: "engagement-predictions", label: "Engagement Predictions" },
  { id: "audit-tools", label: "Audit Tools" },
  { id: "distribution-analytics", label: "Distribution Analytics" },
  { id: "influencer-campaigns", label: "Influencer Campaigns" },
  { id: "automated-responses", label: "Automated Responses" },
  { id: "content-tags", label: "Content Tags" },
  { id: "analytics-reports", label: "Analytics Reports" },
  { id: "performance-heatmaps", label: "Performance Heatmaps" },
  { id: "trend-analysis", label: "Trend Analysis" },
  { id: "creation-workflows", label: "Creation Workflows" },
  { id: "content-library", label: "Content Library" },
  { id: "performance-comparison", label: "Performance Comparison" },
  { id: "competitor-analysis", label: "Competitor Analysis" },
  { id: "scheduling-optimization", label: "Scheduling Optimization" },
  { id: "engagement-analytics", label: "Engagement Analytics" },
  { id: "calendar-integration", label: "Calendar Integration" },
  { id: "automation-rules", label: "Automation Rules" },
  { id: "performance-tracking", label: "Performance Tracking" },
  { id: "performance-dashboard", label: "Performance Dashboard" },
  { id: "collaboration-tools", label: "Collaboration Tools" },
  { id: "analytics-export", label: "Analytics Export" },
  { id: "approval-queue", label: "Approval Queue" },
  { id: "post-templates", label: "Post Templates" },
  { id: "performance-insights", label: "Performance Insights" },
  { id: "engagement-tracking", label: "Engagement Tracking" },
  { id: "calendar-views", label: "Calendar Views" },
  { id: "hashtag-performance", label: "Hashtag Performance" },
  { id: "repurposing-suggestions", label: "Repurposing Suggestions" },
  { id: "content-performance-dashboard", label: "Content Performance Dashboard" },
  { id: "content-library-management", label: "Content Library Management" },
  { id: "content-performance-comparison", label: "Content Performance Comparison" },
  { id: "social-competitor-analysis", label: "Social Competitor Analysis" },
  { id: "content-scheduling-optimization", label: "Content Scheduling Optimization" },
  { id: "social-engagement-analytics", label: "Social Engagement Analytics" },
  { id: "content-calendar-integration", label: "Content Calendar Integration" },
  { id: "social-automation-rules", label: "Social Automation Rules" },
  { id: "content-performance-tracking", label: "Content Performance Tracking" },
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
  const [selectedPerformanceMetric, setSelectedPerformanceMetric] = useState<string>(
    performanceMetrics?.[0]?.id ?? "",
  );
  const [selectedCompliancePolicy, setSelectedCompliancePolicy] = useState<string>(
    compliancePolicies?.[0]?.id ?? "",
  );
  const [selectedWorkflowTemplate, setSelectedWorkflowTemplate] = useState<string>(
    workflowTemplates?.[0]?.id ?? "",
  );
  const [selectedAutomationRule, setSelectedAutomationRule] = useState<string>(
    automationRules?.[0]?.id ?? "",
  );
  const [selectedAnalyticsReport, setSelectedAnalyticsReport] = useState<string>(
    analyticsReports?.[0]?.id ?? "",
  );
  const [selectedCalendarView, setSelectedCalendarView] = useState<string>("month");
  const [selectedKeyword, setSelectedKeyword] = useState<string>(
    listeningKeywords?.[0]?.id ?? "",
  );
  const [selectedInfluencer, setSelectedInfluencer] = useState<string>(
    influencerProfiles?.[0]?.id ?? "",
  );
  const [selectedCrisisAlert, setSelectedCrisisAlert] = useState<string>(
    crisisAlerts?.[0]?.id ?? "",
  );
  const [selectedProduct, setSelectedProduct] = useState<string>(
    productCatalog?.[0]?.id ?? "",
  );
  const [selectedAiAssistant, setSelectedAiAssistant] = useState<string>(
    aiAssistants?.[0]?.id ?? "",
  );
  const [selectedInsightCategory, setSelectedInsightCategory] = useState<string>(
    insightCategories?.[0]?.id ?? "",
  );
  const [selectedExperiment, setSelectedExperiment] = useState<string>(
    experiments?.[0]?.id ?? "",
  );
  const [selectedHashtag, setSelectedHashtag] = useState<string>(
    hashtagSuggestions?.[0]?.id ?? "",
  );
  const [selectedInfluencer, setSelectedInfluencer] = useState<string>(
    influencerProfiles?.[0]?.id ?? "",
  );
  const [selectedTemplate, setSelectedTemplate] = useState<string>(
    contentTemplates?.[0]?.id ?? "",
  );
  const [selectedAccount, setSelectedAccount] = useState<string>(
    socialAccounts?.[0]?.id ?? "",
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
                                : "border-
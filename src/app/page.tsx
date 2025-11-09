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
import {
  hashtagPerformance,
  hashtagSuggestions,
  hashtagTrends,
} from "@/data/hashtag-research";
import {
  influencerProfiles,
  outreachCampaigns,
  outreachStats,
} from "@/data/influencer-outreach";
import {
  roiBreakdown,
  roiMetrics,
  roiProjections,
} from "@/data/roi-calculator";
import {
  contentTemplates,
  templateCategories,
  templateStats,
} from "@/data/content-templates";
import {
  growthInsights,
  growthMetrics,
  growthProjections,
} from "@/data/audience-growth";
import {
  accountHealth,
  accountStats,
  socialAccounts,
} from "@/data/multi-account";
import {
  engagementTools,
  engagementMetrics,
} from "@/data/engagement-tools";
import {
  videoContent,
  videoAnalytics,
  videoTemplates,
} from "@/data/video";
import {
  trendingTopics,
  trendAlerts,
  trendStats,
} from "@/data/trends";
import {
  socialCommerceProducts,
  shoppingPosts,
  commerceStats,
} from "@/data/social-commerce";
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


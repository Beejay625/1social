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
import { truncateAddress, velocityBadge } from "@/utils/account";
import { buildSparklinePath, heatLevelClass } from "@/utils/charts";
import { formatMetricDelta, formatMetricValue, metricDeltaTone } from "@/utils/metrics";
import { percentWidthClass, scoreWidthClass } from "@/utils/progress";
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

const reportingExecMetrics = [
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

const reportingVarianceBreakdowns = [
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

const reportingBenchmarkMatrix = [
  {
    channel: "farcaster" as ChannelId,
    yourScore: 89,
    cohort: 78,
    percentile: "92nd",
  },
  {
    channel: "instagram" as ChannelId,
    yourScore: 83,
    cohort: 80,
    percentile: "88th",
  },
  {
    channel: "x" as ChannelId,
    yourScore: 74,
    cohort: 77,
    percentile: "61st",
  },
  {
    channel: "lens" as ChannelId,
    yourScore: 91,
    cohort: 70,
    percentile: "96th",
  },
  {
    channel: "mirror" as ChannelId,
    yourScore: 68,
    cohort: 72,
    percentile: "54th",
  },
];

const reportingGoalProgress = [
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

const reportingAlertFilters = [
  { id: "all", label: "All alerts" },
  { id: "positive", label: "Positive trend" },
  { id: "risk", label: "Risks" },
  { id: "ops", label: "Ops" },
];

const reportingAlertFeed = [
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

const progressWidthTokens: { threshold: number; className: string }[] = [
  { threshold: 0.05, className: "w-[5%]" },
  { threshold: 0.15, className: "w-[15%]" },
  { threshold: 0.25, className: "w-[25%]" },
  { threshold: 0.35, className: "w-[35%]" },
  { threshold: 0.45, className: "w-[45%]" },
  { threshold: 0.55, className: "w-[55%]" },
  { threshold: 0.65, className: "w-[65%]" },
  { threshold: 0.75, className: "w-[75%]" },
  { threshold: 0.85, className: "w-[85%]" },
  { threshold: 0.95, className: "w-[95%]" },
  { threshold: Number.POSITIVE_INFINITY, className: "w-full" },
];

const pickProgressWidthClass = (value: number) => {
  const token =
    progressWidthTokens.find((entry) => value <= entry.threshold) ??
    progressWidthTokens[progressWidthTokens.length - 1];
  return token.className;
};

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

const intelligenceForecasts = [
  {
    id: "forecast-1",
    metric: "Reach velocity",
    current: "18%",
    predicted: "+24%",
    timeframe: "Next 7 days",
    confidence: 0.87,
    factors: ["Seasonal uptick", "Scheduled AMA", "Creator spotlight"],
  },
  {
    id: "forecast-2",
    metric: "Engagement rate",
    current: "26%",
    predicted: "+31%",
    timeframe: "Next 14 days",
    confidence: 0.72,
    factors: ["Content mix shift", "Best-time optimization"],
  },
  {
    id: "forecast-3",
    metric: "Follower growth",
    current: "+12%",
    predicted: "+18%",
    timeframe: "Next 30 days",
    confidence: 0.91,
    factors: ["Viral potential", "Cross-channel sync"],
  },
];

const intelligenceAnomalies = [
  {
    id: "anomaly-1",
    type: "Spike",
    channel: "farcaster" as ChannelId,
    metric: "Reach",
    deviation: "+142%",
    detectedAt: "2 hours ago",
    explanation: "Unusual engagement spike on AMA announcement—likely viral momentum.",
  },
  {
    id: "anomaly-2",
    type: "Dip",
    channel: "instagram" as ChannelId,
    metric: "Saves",
    deviation: "-38%",
    detectedAt: "5 hours ago",
    explanation: "Save rate dropped below threshold—check content format changes.",
  },
];

const contentHashtags = [
  { tag: "#web3", trend: "up", usage: 1240, growth: "+18%" },
  { tag: "#buildinpublic", trend: "up", usage: 890, growth: "+12%" },
  { tag: "#creator", trend: "stable", usage: 650, growth: "+3%" },
  { tag: "#nft", trend: "down", usage: 420, growth: "-8%" },
];

const contentRecommendations = [
  {
    id: "rec-1",
    type: "Format",
    suggestion: "Try carousel posts—your carousel content performs 34% better than single images.",
    impact: "High",
  },
  {
    id: "rec-2",
    type: "Timing",
    suggestion: "Shift Instagram posts to 18:00 UTC—your audience is 2.3x more active then.",
    impact: "Medium",
  },
  {
    id: "rec-3",
    type: "Topic",
    suggestion: "Double down on 'community wins' content—it drives 28% more saves.",
    impact: "High",
  },
];

const teamMembers = [
  {
    id: "member-1",
    name: "Ameena",
    role: "Strategy Lead",
    avatar: "AM",
    gradient: "from-rose-400 via-violet-500 to-indigo-500",
    permissions: ["Schedule", "Approve", "Export"],
    lastActive: "5 min ago",
  },
  {
    id: "member-2",
    name: "Kai",
    role: "Content Manager",
    avatar: "KA",
    gradient: "from-emerald-400 via-cyan-500 to-blue-500",
    permissions: ["Schedule", "Edit"],
    lastActive: "12 min ago",
  },
  {
    id: "member-3",
    name: "Leo",
    role: "Creative Director",
    avatar: "LE",
    gradient: "from-amber-400 via-orange-500 to-pink-500",
    permissions: ["Edit", "Approve"],
    lastActive: "1 hour ago",
  },
];

const teamActivityLog = [
  {
    id: "activity-1",
    member: "Ameena",
    action: "Approved workflow",
    target: "Founder AMA teaser",
    timestamp: "2 min ago",
  },
  {
    id: "activity-2",
    member: "Kai",
    action: "Scheduled post",
    target: "Design drops recap",
    timestamp: "15 min ago",
  },
  {
    id: "activity-3",
    member: "Leo",
    action: "Uploaded asset",
    target: "Creator highlight reel",
    timestamp: "1 hour ago",
  },
];

const integrationsAvailable = [
  {
    id: "integ-1",
    name: "Google Analytics",
    description: "Sync audience insights and conversion data.",
    status: "connected",
    icon: "GA",
  },
  {
    id: "integ-2",
    name: "Slack",
    description: "Get alerts and updates in your workspace.",
    status: "connected",
    icon: "SL",
  },
  {
    id: "integ-3",
    name: "Zapier",
    description: "Automate workflows with 5000+ apps.",
    status: "available",
    icon: "ZP",
  },
  {
    id: "integ-4",
    name: "Notion",
    description: "Export reports and sync content calendar.",
    status: "available",
    icon: "NO",
  },
];

// Collaboration features data
const collaborationMentions = [
  {
    id: "mention-1",
    planId: "plan-1",
    mentionedBy: "Leo",
    mentionedTo: "You",
    message: "@You Need your sign-off on the wallet signature flow",
    at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    resolved: false,
  },
  {
    id: "mention-2",
    planId: "plan-2",
    mentionedBy: "Ameena",
    mentionedTo: "Kai",
    message: "@Kai Can you review the design drops recap copy?",
    at: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    resolved: true,
  },
  {
    id: "mention-3",
    planId: "plan-3",
    mentionedBy: "Kai",
    mentionedTo: "Leo",
    message: "@Leo Pull new community shots for reel slots 2 and 3",
    at: new Date(Date.now() - 1000 * 60 * 145).toISOString(),
    resolved: false,
  },
];

const collaborationChecklists = [
  {
    id: "checklist-1",
    planId: "plan-1",
    title: "Pre-launch checklist",
    items: [
      { id: "item-1", label: "Final copy review", checked: true, assignedTo: "Kai" },
      { id: "item-2", label: "Asset upload", checked: true, assignedTo: "Leo" },
      { id: "item-3", label: "Wallet signature prep", checked: false, assignedTo: "You" },
    ],
  },
  {
    id: "checklist-2",
    planId: "plan-2",
    title: "Design QA checklist",
    items: [
      { id: "item-4", label: "Typography check", checked: false, assignedTo: "Leo" },
      { id: "item-5", label: "Color contrast", checked: false, assignedTo: "Leo" },
      { id: "item-6", label: "Mobile preview", checked: false, assignedTo: "Ameena" },
    ],
  },
];

const collaborationHandoffs = [
  {
    id: "handoff-1",
    planId: "plan-1",
    from: "Kai",
    to: "You",
    action: "Request wallet signature",
    status: "pending",
    at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "handoff-2",
    planId: "plan-3",
    from: "Leo",
    to: "Ameena",
    action: "Request asset upload",
    status: "completed",
    at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
];

// Audience segmentation data
const audienceSegments = [
  {
    id: "segment-1",
    label: "Power users",
    channel: "farcaster" as ChannelId,
    size: 12400,
    growth: 18.2,
    engagement: 8.4,
    coverage: 85,
    benchmark: 72,
    trend: [85, 87, 84, 86, 88, 85, 87],
  },
  {
    id: "segment-2",
    label: "New followers",
    channel: "instagram" as ChannelId,
    size: 8900,
    growth: 24.5,
    engagement: 6.2,
    coverage: 62,
    benchmark: 68,
    trend: [58, 60, 62, 61, 63, 62, 62],
  },
  {
    id: "segment-3",
    label: "Creator cohort",
    channel: "farcaster" as ChannelId,
    size: 3200,
    growth: 12.8,
    engagement: 9.1,
    coverage: 78,
    benchmark: 75,
    trend: [75, 76, 77, 78, 77, 78, 78],
  },
  {
    id: "segment-4",
    label: "Lurkers",
    channel: "instagram" as ChannelId,
    size: 15600,
    growth: 5.3,
    engagement: 2.1,
    coverage: 45,
    benchmark: 55,
    trend: [42, 43, 44, 45, 44, 45, 45],
  },
];

// Enhanced sentiment tracking data
const sentimentHistory = [
  { date: "Mon", positive: 68, neutral: 22, negative: 10 },
  { date: "Tue", positive: 72, neutral: 20, negative: 8 },
  { date: "Wed", positive: 65, neutral: 25, negative: 10 },
  { date: "Thu", positive: 70, neutral: 23, negative: 7 },
  { date: "Fri", positive: 74, neutral: 19, negative: 7 },
  { date: "Sat", positive: 71, neutral: 21, negative: 8 },
  { date: "Sun", positive: 69, neutral: 24, negative: 7 },
];

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
  const [selectedForecastId, setSelectedForecastId] = useState<string>(
    intelligenceForecasts[0]?.id ?? "",
  );
  const [selectedRecommendationId, setSelectedRecommendationId] = useState<string>(
    contentRecommendations[0]?.id ?? "",
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


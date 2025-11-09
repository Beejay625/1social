'use client';

import { networks } from "@/config";
import { appKitModal } from "@/context";
import { formatRelativeTime, formatScheduleLabel, formatTimeUntil } from "@/utils/time";
import { useEffect, useMemo, useState } from "react";
import { useAccount, useChainId, useDisconnect } from "wagmi";

type ChannelId = "farcaster" | "instagram" | "x" | "lens" | "mirror";

type SocialPost = {
  id: string;
  author: string;
  avatarGradient: string;
  content: string;
  highlight?: string;
  channels: ChannelId[];
  createdAt: string;
};

type ApprovalStatus = "pending" | "approved" | "changes";

type StepEscalation = {
  notifyAfterHours: number;
  routeTo: string;
  fallback: string;
  triggeredAt?: string;
};

type ApprovalStep = {
  id: string;
  label: string;
  approver: string;
  status: ApprovalStatus;
  due: string;
  escalation?: StepEscalation;
};

type Comment = {
  id: string;
  author: string;
  message: string;
  at: string;
  tone?: "note" | "mention";
};

type PlannedPost = {
  id: string;
  title: string;
  summary: string;
  scheduledFor: string;
  channels: ChannelId[];
  status: "queued" | "draft" | "approved";
  owner: string;
  approvalSteps: ApprovalStep[];
  commentThread: Comment[];
  approvalTemplateId?: string;
};

type MetricUnit = "k" | "%" | "score";

type MetricKpiId = "reach" | "conversion" | "growth";

type MetricKpi = {
  id: MetricKpiId;
  label: string;
  value: number;
  unit: MetricUnit;
  delta: number;
  deltaLabel: string;
  trend: number[];
};

type ReachConversionPoint = {
  label: string;
  reach: number;
  conversionRate: number;
  conversions: number;
};

type GrowthPoint = {
  label: string;
  farcaster: number;
  instagram: number;
  total: number;
};

type ConversionStage = {
  id: string;
  label: string;
  value: number;
  delta: number;
};

type PresenceStatus = "drafting" | "reviewing" | "approving" | "observing";

type PresenceMember = {
  id: string;
  name: string;
  role: string;
  status: PresenceStatus;
  focus: string;
};

type ApprovalRoute = {
  id: string;
  stage: string;
  owners: string[];
  fallback: string;
};

type ApprovalTemplateStep = {
  id: string;
  label: string;
  approver: string;
  dueOffsetHours: number;
  escalation?: Omit<StepEscalation, "triggeredAt">;
};

type ApprovalTemplate = {
  id: string;
  name: string;
  description: string;
  summary: string;
  steps: ApprovalTemplateStep[];
};

type RepostEvent = {
  id: string;
  source: ChannelId;
  targets: ChannelId[];
  scheduledFor: string;
  status: "mirroring" | "queued" | "complete";
};

type SyndicationEntry = {
  id: string;
  title: string;
  timestamp: string;
  networks: ChannelId[];
  effect: string;
};

type AutomationTemplate = {
  id: string;
  name: string;
  description: string;
  channels: ChannelId[];
  cadence: string;
  duration: string;
};

type WarmupProgram = {
  id: string;
  title: string;
  health: "excellent" | "steady" | "watch";
  score: number;
  nextAction: string;
};

type SequencePlay = {
  id: string;
  label: string;
  steps: number;
  window: string;
  status: "active" | "paused" | "draft";
};

type BenchmarkMetric = {
  id: string;
  label: string;
  farcaster: number;
  instagram: number;
  cohort: number;
};

type SentimentSample = {
  id: string;
  segment: string;
  positive: number;
  neutral: number;
  negative: number;
  highlight: string;
};

type RetentionStage = {
  id: string;
  stage: string;
  rate: number;
  note: string;
};

type AssetItem = {
  id: string;
  title: string;
  type: "image" | "video" | "doc";
  owner: string;
  updatedAt: string;
  accent: string;
};

type VersionEntry = {
  id: string;
  author: string;
  summary: string;
  timestamp: string;
  status: "live" | "queued" | "archived";
};

type CalendarSlot = {
  id: string;
  label: string;
  day: string;
  time: string;
  owner: string;
  channels: ChannelId[];
  impact: "spotlight" | "boost" | "check-in";
};

const channelCatalog: Record<
  ChannelId,
  {
    label: string;
    accent: string;
    badge: string;
    dot: string;
    description: string;
  }
> = {
  farcaster: {
    label: "Farcaster",
    accent: "from-purple-400 via-fuchsia-400 to-orange-300",
    badge: "bg-purple-500/20 text-purple-50 border border-purple-400/40",
    dot: "bg-purple-300",
    description: "Push into the onchain conversation instantly.",
  },
  instagram: {
    label: "Instagram",
    accent: "from-amber-400 via-pink-400 to-red-400",
    badge: "bg-pink-500/20 text-pink-50 border border-pink-400/40",
    dot: "bg-pink-300",
    description: "Keep your visual community engaged.",
  },
  x: {
    label: "X",
    accent: "from-slate-400 via-slate-500 to-slate-700",
    badge: "bg-slate-500/20 text-slate-100 border border-slate-400/40",
    dot: "bg-slate-300",
    description: "Pulse quick takes across the broader timeline.",
  },
  lens: {
    label: "Lens",
    accent: "from-green-400 via-emerald-400 to-teal-400",
    badge: "bg-emerald-400/20 text-emerald-100 border border-emerald-300/40",
    dot: "bg-emerald-300",
    description: "Reach web3-native audiences with Lens publications.",
  },
  mirror: {
    label: "Mirror",
    accent: "from-cyan-400 via-sky-400 to-blue-400",
    badge: "bg-cyan-400/20 text-cyan-100 border border-cyan-300/40",
    dot: "bg-cyan-300",
    description: "Long-form drops synced via Mirror collectable posts.",
  },
};

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

const getApprovalTemplate = (templateId: string | undefined | null) =>
  approvalTemplates.find((template) => template.id === templateId) ?? null;

const instantiateApprovalSteps = (
  template: ApprovalTemplate,
  scheduledFor: string,
  seed: string,
): ApprovalStep[] => {
  const launchTime = new Date(scheduledFor).getTime();
  return template.steps.map((step, index) => {
    const dueTime =
      launchTime + step.dueOffsetHours * 60 * 60 * 1000;
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
};

const aiToneOptions = [
  {
    id: "confident",
    label: "Confident",
    description: "Direct, upbeat copy for launches and bold announcements.",
  },
  {
    id: "friendly",
    label: "Friendly",
    description: "Warm tone to humanize updates and community shoutouts.",
  },
  {
    id: "analytical",
    label: "Analytical",
    description: "Data-forward voice for performance threads and recaps.",
  },
  {
    id: "playful",
    label: "Playful",
    description: "Light and witty for memes, teasers, and hype reels.",
  },
];

const aiPersonas = [
  {
    id: "founder",
    label: "Founder POV",
    summary: "Highlights vision, roadmap, and strategic takeaways.",
  },
  {
    id: "community",
    label: "Community Squad",
    summary: "Amplifies wins, spotlights creators, and invites feedback.",
  },
  {
    id: "product",
    label: "Product Updates",
    summary: "Explains new features, guides users, and asks for inputs.",
  },
];

const aiDraftIdeas = [
  {
    id: "idea-1",
    headline: "Post-launch gratitude thread",
    snippet:
      "Huge thanks to everyone who joined today's AMA—here are three takeaways we promised, plus a Carrot on what's next.",
  },
  {
    id: "idea-2",
    headline: "Tease tomorrow's drop",
    snippet:
      "Tomorrow we unbox our creator analytics hub. Get ready for KPI snapshots, auto exports, and sentiment overlays.",
  },
  {
    id: "idea-3",
    headline: "Community highlight reel",
    snippet:
      "We spotlighted 5 builders who grew >20% this month. Here's the combo of tactics they used and templates to remix.",
  },
];

const aiSmartReplies = [
  {
    id: "reply-1",
    channel: "farcaster" as ChannelId,
    author: "Jess C.",
    message: "Loved the new onboarding deck—does it cover campaign sequencing?",
    suggestion:
      "Thanks Jess! Yes—slides 6-8 walk through the sequencing playbook. Happy to DM a version tailored for your team.",
  },
  {
    id: "reply-2",
    channel: "lens" as ChannelId,
    author: "BuilderDAO",
    message: "Seeing inconsistent analytics exports this week.",
    suggestion:
      "Great question. CSV exports ship with the next release—shoot me your email and I'll add you to the early group.",
  },
  {
    id: "reply-3",
    channel: "x" as ChannelId,
    author: "Nova",
    message: "Can we try the AI tone tweaks on custom workflows?",
    suggestion:
      "We're testing custom tone training with a few teams right now. DM me your use case and I'll loop you in.",
  },
];

const aiActivityLog = [
  {
    id: "activity-1",
    action: "Tone adjustment",
    detail: "Shifted the AMA recap to the confident tone template.",
    timestamp: "2 min ago",
  },
  {
    id: "activity-2",
    action: "Auto draft",
    detail: "Generated draft for next week's creator spotlight.",
    timestamp: "12 min ago",
  },
  {
    id: "activity-3",
    action: "Smart reply",
    detail: "Suggested Lens response for BuilderDAO.",
    timestamp: "25 min ago",
  },
];

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
];
const audienceTrendData = [
  { day: "Mon", farcaster: 12, instagram: 24 },
  { day: "Tue", farcaster: 18, instagram: 28 },
  { day: "Wed", farcaster: 26, instagram: 32 },
  { day: "Thu", farcaster: 28, instagram: 36 },
  { day: "Fri", farcaster: 34, instagram: 44 },
  { day: "Sat", farcaster: 30, instagram: 40 },
  { day: "Sun", farcaster: 22, instagram: 37 },
];

const audienceDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const bestTimeGrid = [
  { slot: "Morning", values: [3, 4, 4, 5, 5, 3, 2] },
  { slot: "Midday", values: [4, 5, 5, 5, 4, 4, 3] },
  { slot: "Evening", values: [5, 5, 4, 3, 3, 5, 5] },
];

const insightRecommendations = [
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

const formatRelativeTime = (isoString: string) => {
  const elapsed = Date.now() - new Date(isoString).getTime();
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (elapsed < minute) return "Just now";
  if (elapsed < hour) {
    const minutes = Math.floor(elapsed / minute);
    return `${minutes} min${minutes === 1 ? "" : "s"} ago`;
  }
  if (elapsed < day) {
    const hours = Math.floor(elapsed / hour);
    return `${hours} hr${hours === 1 ? "" : "s"} ago`;
  }
  const days = Math.floor(elapsed / day);
  return `${days} day${days === 1 ? "" : "s"} ago`;
};

const formatScheduleLabel = (isoString: string) => {
  const date = new Date(isoString);
  return Intl.DateTimeFormat("en", {
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
  }).format(date);
};

const formatTimeUntil = (isoString: string) => {
  const target = new Date(isoString).getTime();
  const diff = target - Date.now();
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff <= 0) return "Now";
  if (diff < hour) {
    const minutes = Math.round(diff / minute);
    return `in ${minutes} min${minutes === 1 ? "" : "s"}`;
  }
  if (diff < day) {
    const hours = Math.round(diff / hour);
    return `in ${hours} hr${hours === 1 ? "" : "s"}`;
  }
  const days = Math.round(diff / day);
  return `in ${days} day${days === 1 ? "" : "s"}`;
};

const scheduleStatusStyles: Record<
  PlannedPost["status"],
  { label: string; badge: string; dot: string }
> = {
  approved: {
    label: "Approved",
    badge: "bg-emerald-400/20 text-emerald-50 border border-emerald-300/40",
    dot: "bg-emerald-300",
  },
  queued: {
    label: "Queued",
    badge: "bg-cyan-400/20 text-cyan-50 border border-cyan-300/40",
    dot: "bg-cyan-300",
  },
  draft: {
    label: "Needs edits",
    badge: "bg-amber-400/20 text-amber-50 border border-amber-300/40",
    dot: "bg-amber-300",
  },
};

const truncateAddress = (value?: string) => {
  if (!value) return "Not connected";
  return `${value.slice(0, 6)}…${value.slice(-4)}`;
};

const velocityBadge = (value: number) => {
  if (value > 90) return { label: "Blazing", tone: "bg-emerald-400/25 text-emerald-100" };
  if (value > 70) return { label: "Pacing", tone: "bg-cyan-400/25 text-cyan-100" };
  if (value > 50) return { label: "Steady", tone: "bg-amber-400/25 text-amber-100" };
  return { label: "Warming up", tone: "bg-rose-400/25 text-rose-100" };
};

const percentWidthClass = (percent: number) => {
  if (percent >= 95) return "w-[95%]";
  if (percent >= 80) return "w-[80%]";
  if (percent >= 65) return "w-[65%]";
  if (percent >= 50) return "w-[50%]";
  if (percent >= 35) return "w-[35%]";
  if (percent >= 20) return "w-[20%]";
  return "w-[12%]";
};

const buildSparklinePath = (
  values: number[],
  width = 140,
  height = 42,
): string => {
  if (values.length === 0) return "";
  const max = Math.max(...values);
  const min = Math.min(...values);
  const verticalRange = max === min ? 1 : max - min;
  const horizontalStep = width / (values.length - 1 || 1);

  return values
    .map((value, index) => {
      const x = index * horizontalStep;
      const y = height - ((value - min) / verticalRange) * height;
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
};

const heatLevelClass = (score: number) => {
  if (score >= 5) return "bg-emerald-400/60 text-slate-900";
  if (score === 4) return "bg-emerald-300/50 text-slate-900";
  if (score === 3) return "bg-emerald-200/50 text-slate-900";
  if (score === 2) return "bg-emerald-200/30 text-slate-900";
  return "bg-white/10 text-slate-200";
};

const formatMetricValue = (value: number, unit: MetricUnit) => {
  if (unit === "k") {
    return `${value.toLocaleString()}k`;
  }
  if (unit === "%") {
    return `${value.toFixed(1)}%`;
  }
  return `${value.toFixed(0)} pts`;
};

const formatMetricDelta = (delta: number, unit: MetricUnit) => {
  const prefix = delta > 0 ? "+" : delta < 0 ? "" : "±";
  if (delta === 0) {
    return `${prefix}0${unit === "score" ? " pts" : unit === "%" ? "%" : "k"}`;
  }
  if (unit === "k") {
    return `${prefix}${Math.abs(delta).toFixed(0)}k`;
  }
  if (unit === "%") {
    return `${prefix}${Math.abs(delta).toFixed(1)}%`;
  }
  return `${prefix}${Math.abs(delta).toFixed(0)} pts`;
};

const metricDeltaTone = (delta: number) => {
  if (delta > 0) {
    return {
      tone: "bg-emerald-400/20 text-emerald-100",
      icon: "▲",
    };
  }
  if (delta < 0) {
    return {
      tone: "bg-rose-500/30 text-rose-100",
      icon: "▼",
    };
  }
  return {
    tone: "bg-white/10 text-white",
    icon: "■",
  };
};

const chartColorTokens = {
  reach: "text-sky-300",
  conversionRate: "text-amber-300",
  total: "text-purple-300",
  farcaster: "text-emerald-300",
  instagram: "text-fuchsia-300",
} as const;

const approvalStatusTokens: Record<
  ApprovalStatus,
  { label: string; badge: string; dot: string }
> = {
  approved: {
    label: "Approved",
    badge: "bg-emerald-400/20 text-emerald-100 border border-emerald-300/40",
    dot: "bg-emerald-300",
  },
  pending: {
    label: "Pending",
    badge: "bg-cyan-400/20 text-cyan-100 border border-cyan-300/40",
    dot: "bg-cyan-300",
  },
  changes: {
    label: "Needs edits",
    badge: "bg-amber-400/25 text-amber-100 border border-amber-300/40",
    dot: "bg-amber-300",
  },
};

const warmupHealthTokens: Record<
  WarmupProgram["health"],
  { label: string; badge: string; dot: string }
> = {
  excellent: {
    label: "Excellent",
    badge: "bg-emerald-400/25 text-emerald-100 border border-emerald-300/40",
    dot: "bg-emerald-300",
  },
  steady: {
    label: "Steady",
    badge: "bg-sky-400/25 text-sky-100 border border-sky-300/40",
    dot: "bg-sky-300",
  },
  watch: {
    label: "Watch",
    badge: "bg-amber-400/25 text-amber-100 border border-amber-300/40",
    dot: "bg-amber-300",
  },
};

const sequenceStatusTokens: Record<
  SequencePlay["status"],
  { label: string; badge: string }
> = {
  active: { label: "Active", badge: "bg-emerald-400/20 text-emerald-100" },
  paused: { label: "Paused", badge: "bg-amber-400/20 text-amber-100" },
  draft: { label: "Draft", badge: "bg-white/15 text-white" },
};

const impactTokens: Record<
  CalendarSlot["impact"],
  { label: string; badge: string }
> = {
  spotlight: {
    label: "Spotlight",
    badge: "bg-fuchsia-400/25 text-fuchsia-100 border border-fuchsia-300/40",
  },
  boost: {
    label: "Boost",
    badge: "bg-sky-400/25 text-sky-100 border border-sky-300/40",
  },
  "check-in": {
    label: "Check-in",
    badge: "bg-emerald-400/20 text-emerald-100 border border-emerald-300/40",
  },
};

const scoreWidthClass = (score: number) => {
  if (score >= 95) return "w-[95%]";
  if (score >= 85) return "w-[85%]";
  if (score >= 75) return "w-[75%]";
  if (score >= 65) return "w-[65%]";
  if (score >= 55) return "w-[55%]";
  return "w-[40%]";
};

const presenceStatusTokens: Record<
  PresenceStatus,
  { label: string; badge: string; dot: string }
> = {
  drafting: {
    label: "Drafting",
    badge: "bg-purple-400/20 text-purple-100 border border-purple-300/40",
    dot: "bg-purple-300",
  },
  reviewing: {
    label: "Reviewing",
    badge: "bg-sky-400/20 text-sky-100 border border-sky-300/40",
    dot: "bg-sky-300",
  },
  approving: {
    label: "Approving",
    badge: "bg-emerald-400/20 text-emerald-100 border border-emerald-300/40",
    dot: "bg-emerald-300",
  },
  observing: {
    label: "Observing",
    badge: "bg-white/15 text-white border border-white/20",
    dot: "bg-white",
  },
};

const repostStatusTokens: Record<
  RepostEvent["status"],
  { label: string; badge: string }
> = {
  mirroring: {
    label: "Mirroring now",
    badge: "bg-emerald-400/20 text-emerald-100 border border-emerald-300/40",
  },
  queued: {
    label: "Queued",
    badge: "bg-amber-400/20 text-amber-100 border border-amber-300/40",
  },
  complete: {
    label: "Complete",
    badge: "bg-white/15 text-white border border-white/20",
  },
};

const metricKpiSeed: MetricKpi[] = [
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

const reachConversionTrend: ReachConversionPoint[] = [
  { label: "Mon", reach: 24, conversionRate: 2.6, conversions: 102 },
  { label: "Tue", reach: 28, conversionRate: 2.9, conversions: 114 },
  { label: "Wed", reach: 32, conversionRate: 3.2, conversions: 128 },
  { label: "Thu", reach: 36, conversionRate: 3.4, conversions: 142 },
  { label: "Fri", reach: 41, conversionRate: 3.9, conversions: 160 },
  { label: "Sat", reach: 38, conversionRate: 3.5, conversions: 149 },
  { label: "Sun", reach: 31, conversionRate: 3.1, conversions: 134 },
];

const growthMomentumTrend: GrowthPoint[] = [
  { label: "Week 1", farcaster: 42, instagram: 54, total: 96 },
  { label: "Week 2", farcaster: 48, instagram: 59, total: 107 },
  { label: "Week 3", farcaster: 51, instagram: 63, total: 114 },
  { label: "Week 4", farcaster: 57, instagram: 68, total: 125 },
];

const conversionStages: ConversionStage[] = [
  { id: "reach", label: "Reach", value: 18200, delta: 12 },
  { id: "engaged", label: "Engaged", value: 9600, delta: 9 },
  { id: "clicks", label: "Link clicks", value: 4100, delta: 6 },
  { id: "conversions", label: "Conversions", value: 1280, delta: 3 },
];

const metricInsightPool = [
  {
    id: "insight-reach",
    headline: "Reach momentum is accelerating",
    detail: "Total reach has grown 14% week-over-week. Queue a weekend teaser to capitalise on the Friday surge.",
    metric: "reach" as MetricKpiId,
  },
  {
    id: "insight-conversion",
    headline: "Conversion rate uplift",
    detail: "Conversion rate climbed by 0.6 pts after running Reown wallet prompts inline with the composer.",
    metric: "conversion" as MetricKpiId,
  },
  {
    id: "insight-growth",
    headline: "Audience compound growth",
    detail: "Audience growth score is up 8 pts. Schedule a midweek AMA to keep Farcaster growth compounding.",
    metric: "growth" as MetricKpiId,
  },
];

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
  const [calendarView, setCalendarView] = useState<"week" | "month">("week");
  const [calendarFocus, setCalendarFocus] = useState<string>("Thu");

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
    const farcasterSeries = audienceTrendData.map((item) => item.farcaster);
    const instagramSeries = audienceTrendData.map((item) => item.instagram);
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
        row.values.map((value, columnIndex) => ({
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

  const handleSequenceSelect = (sequenceId: string) => {
    setSelectedSequenceId(sequenceId);
  };

  const handleCalendarViewToggle = (view: "week" | "month") => {
    setCalendarView(view);
  };

  const handleCalendarFocusChange = (day: string) => {
    setCalendarFocus(day);
  };

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
                        {row.values.map((value, index) => (
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
                      {row.values.map((value, index) => (
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
      </main>
    </div>
  );
}

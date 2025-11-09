'use client';

import { networks } from "@/config";
import { appKitModal } from "@/context";
import { useEffect, useMemo, useState } from "react";
import { useAccount, useChainId, useDisconnect } from "wagmi";

type ChannelId = "farcaster" | "instagram";

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

type ApprovalStep = {
  id: string;
  label: string;
  approver: string;
  status: ApprovalStatus;
  due: string;
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
];

const initialPlannedPosts: PlannedPost[] = [
  {
    id: "plan-1",
    title: "Founder AMA teaser",
    summary: "Carousel introducing tomorrow's community AMA.",
    scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 5).toISOString(),
    channels: ["farcaster", "instagram"],
    status: "approved",
    owner: "Ameena",
    approvalSteps: [
      {
        id: "strategy",
        label: "Channel strategy",
        approver: "Kai",
        status: "approved",
        due: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      },
      {
        id: "creative",
        label: "Creative polish",
        approver: "Leo",
        status: "approved",
        due: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      },
    ],
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
    scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 28).toISOString(),
    channels: ["farcaster"],
    status: "queued",
    owner: "Kai",
    approvalSteps: [
      {
        id: "outline",
        label: "Outline review",
        approver: "Ameena",
        status: "pending",
        due: new Date(Date.now() + 1000 * 60 * 60 * 4).toISOString(),
      },
      {
        id: "design",
        label: "Design QA",
        approver: "Leo",
        status: "pending",
        due: new Date(Date.now() + 1000 * 60 * 60 * 10).toISOString(),
      },
    ],
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
    scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
    channels: ["instagram"],
    status: "draft",
    owner: "Leo",
    approvalSteps: [
      {
        id: "story",
        label: "Story arc",
        approver: "Ameena",
        status: "changes",
        due: new Date(Date.now() + 1000 * 60 * 60 * 6).toISOString(),
      },
      {
        id: "audio",
        label: "Audio sync",
        approver: "Kai",
        status: "pending",
        due: new Date(Date.now() + 1000 * 60 * 60 * 20).toISOString(),
      },
    ],
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
  });
  const [selectedWorkflowPostId, setSelectedWorkflowPostId] = useState<string>(
    initialPlannedPosts[0]?.id ?? "",
  );
  const [workflowNote, setWorkflowNote] = useState("");

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
                <defs>
                  <linearGradient id={`spark-${card.id}`} x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="rgba(125,211,252,0.5)" />
                    <stop offset="100%" stopColor="rgba(125,211,252,0)" />
                  </linearGradient>
                </defs>
              </svg>
            </article>
          ))}
        </section>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
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

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)]">
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

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.95fr)]">
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

            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-200/70">
                  Best time heatmap
                </h3>
                <span className="text-xs text-slate-200/70">
                  Peak: {audienceInsights.topSlot.day} ·{" "}
                  {audienceInsights.topSlot.slot}
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
          </article>
        </section>
      </main>
    </div>
  );
}

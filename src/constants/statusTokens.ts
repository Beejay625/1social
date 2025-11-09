import type {
  CalendarImpact,
  PlannedPostStatus,
  PresenceStatus,
  RepostEventStatus,
  SequenceStatus,
  WarmupHealth,
  ApprovalStatus,
} from "@/types/publishing";

export const scheduleStatusStyles: Record<
  PlannedPostStatus,
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

export const approvalStatusTokens: Record<
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

export const warmupHealthTokens: Record<
  WarmupHealth,
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

export const sequenceStatusTokens: Record<
  SequenceStatus,
  { label: string; badge: string }
> = {
  active: { label: "Active", badge: "bg-emerald-400/20 text-emerald-100" },
  paused: { label: "Paused", badge: "bg-amber-400/20 text-amber-100" },
  draft: { label: "Draft", badge: "bg-white/15 text-white" },
};

export const impactTokens: Record<
  CalendarImpact,
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

export const presenceStatusTokens: Record<
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

export const repostStatusTokens: Record<
  RepostEventStatus,
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


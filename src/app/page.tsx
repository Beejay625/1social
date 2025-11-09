'use client';

import { appKitModal } from "@/context";
import { useMemo, useState } from "react";
import { useAccount, useDisconnect, useNetwork } from "wagmi";

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

type PlannedPost = {
  id: string;
  title: string;
  summary: string;
  scheduledFor: string;
  channels: ChannelId[];
  status: "queued" | "draft" | "approved";
  owner: string;
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
    summary: "Carousel introducing tomorrow’s community AMA.",
    scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 5).toISOString(),
    channels: ["farcaster", "instagram"],
    status: "approved",
    owner: "Ameena",
  },
  {
    id: "plan-2",
    title: "Design drops recap",
    summary: "Thread covering the remix design sprint learnings.",
    scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 28).toISOString(),
    channels: ["farcaster"],
    status: "queued",
    owner: "Kai",
  },
  {
    id: "plan-3",
    title: "Creator highlight reel",
    summary: "Vertical reel featuring three community wins.",
    scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
    channels: ["instagram"],
    status: "draft",
    owner: "Leo",
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
    label: "Draft",
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

export default function Home() {
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

  const activeChannels = useMemo(
    () =>
      (Object.keys(channelState) as ChannelId[]).filter(
        (id) => channelState[id],
      ),
    [channelState],
  );

  const handleToggle = (channelId: ChannelId) => {
    setChannelState((prev) => ({
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-sky-600 text-white">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-16 lg:px-12">
        <header className="flex flex-col gap-10 rounded-4xl bg-white/10 p-8 backdrop-blur-xl shadow-[0_20px_70px_rgba(59,7,100,0.35)] lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium uppercase tracking-wide text-slate-100">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              1Social • Unified voice for every channel
            </span>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              Post once. Shine twice.
            </h1>
            <p className="text-lg text-slate-100/80">
              Draft a story, pick your destinations, and we mirror it across
              Farcaster and Instagram instantly. This mock dashboard previews
              how the unified publishing flow will feel.
            </p>
          </div>
          <div className="flex flex-col items-start gap-4">
            <div className="rounded-3xl border border-white/20 bg-white/10 px-6 py-5 text-start shadow-lg backdrop-blur-2xl">
              <p className="text-sm text-slate-100/70">
                Connect your wallet to enable Farcaster signing, powered by
                Reown AppKit.
              </p>
              <div className="mt-4 flex justify-center">
                <appkit-button />
              </div>
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-200/60">
              Mock environment • No real posts sent
            </p>
          </div>
        </header>

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
      </main>
    </div>
  );
}

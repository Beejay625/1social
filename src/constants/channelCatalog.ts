import type { ChannelId } from "@/types/publishing";

export const channelCatalog: Record<
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


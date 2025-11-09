export const truncateAddress = (value?: string) => {
  if (!value) return "Not connected";
  return `${value.slice(0, 6)}…${value.slice(-4)}`;
};

export const velocityBadge = (value: number) => {
  if (value > 90) {
    return { label: "Blazing", tone: "bg-emerald-400/25 text-emerald-100" };
  }
  if (value > 70) {
    return { label: "Pacing", tone: "bg-cyan-400/25 text-cyan-100" };
  }
  if (value > 50) {
    return { label: "Steady", tone: "bg-amber-400/25 text-amber-100" };
  }
  return { label: "Warming up", tone: "bg-rose-400/25 text-rose-100" };
};


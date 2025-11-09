import type { MetricUnit } from "@/types/publishing";

export const formatMetricValue = (value: number, unit: MetricUnit) => {
  if (unit === "k") {
    return `${value.toLocaleString()}k`;
  }
  if (unit === "%") {
    return `${value.toFixed(1)}%`;
  }
  return `${value.toFixed(0)} pts`;
};

export const formatMetricDelta = (delta: number, unit: MetricUnit) => {
  const prefix = delta > 0 ? "+" : delta < 0 ? "" : "±";

  if (delta === 0) {
    if (unit === "score") return `${prefix}0 pts`;
    if (unit === "%") return `${prefix}0%`;
    return `${prefix}0k`;
  }

  if (unit === "k") {
    return `${prefix}${Math.abs(delta).toFixed(0)}k`;
  }
  if (unit === "%") {
    return `${prefix}${Math.abs(delta).toFixed(1)}%`;
  }
  return `${prefix}${Math.abs(delta).toFixed(0)} pts`;
};

export const metricDeltaTone = (delta: number) => {
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


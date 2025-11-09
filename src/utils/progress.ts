const thresholds = [
  { min: 95, className: "w-[95%]" },
  { min: 85, className: "w-[85%]" },
  { min: 80, className: "w-[80%]" },
  { min: 75, className: "w-[75%]" },
  { min: 65, className: "w-[65%]" },
  { min: 55, className: "w-[55%]" },
  { min: 50, className: "w-[50%]" },
  { min: 35, className: "w-[35%]" },
  { min: 20, className: "w-[20%]" },
  { min: 12, className: "w-[12%]" },
];

export const percentWidthClass = (percent: number) => {
  const value = Math.max(0, Math.min(100, percent));
  const match = thresholds.find((threshold) => value >= threshold.min);
  return match?.className ?? "w-[8%]";
};

export const scoreWidthClass = (score: number) => {
  const value = Math.max(0, Math.min(100, score));
  if (value >= 95) return "w-[95%]";
  if (value >= 85) return "w-[85%]";
  if (value >= 75) return "w-[75%]";
  if (value >= 65) return "w-[65%]";
  if (value >= 55) return "w-[55%]";
  if (value >= 45) return "w-[45%]";
  return "w-[35%]";
};

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

export const pickProgressWidthClass = (value: number) => {
  const token =
    progressWidthTokens.find((entry) => value <= entry.threshold) ??
    progressWidthTokens[progressWidthTokens.length - 1];
  return token.className;
};


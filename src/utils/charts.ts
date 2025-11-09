const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const buildSparklinePath = (
  values: number[],
  width = 140,
  height = 42,
): string => {
  if (values.length === 0) return "";

  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const verticalRange = maxValue - minValue || 1;
  const stepX = values.length > 1 ? width / (values.length - 1) : width;

  const normalizeY = (value: number) => {
    const normalized = (value - minValue) / verticalRange;
    return clamp(height - normalized * height, 0, height);
  };

  let path = `M 0 ${normalizeY(values[0]).toFixed(2)}`;

  values.forEach((value, index) => {
    if (index === 0) return;
    const x = (index * stepX).toFixed(2);
    const y = normalizeY(value).toFixed(2);
    path += ` L ${x} ${y}`;
  });

  return path;
};

export const heatLevelClass = (value: number) => {
  const score = clamp(value, 0, 100);

  if (score >= 85) {
    return "bg-emerald-500/20 text-emerald-100 border border-emerald-400/30";
  }
  if (score >= 70) {
    return "bg-cyan-500/20 text-cyan-100 border border-cyan-400/30";
  }
  if (score >= 55) {
    return "bg-amber-500/20 text-amber-100 border border-amber-400/30";
  }

  return "bg-rose-500/20 text-rose-100 border border-rose-400/30";
};


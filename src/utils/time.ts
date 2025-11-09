export const formatRelativeTime = (isoString: string): string => {
  const timestamp = new Date(isoString).getTime();
  if (Number.isNaN(timestamp)) return "Unknown";

  const elapsed = Date.now() - timestamp;
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

export const formatScheduleLabel = (isoString: string): string => {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "Unknown time";

  return Intl.DateTimeFormat("en", {
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
  }).format(date);
};

export const formatTimeUntil = (isoString: string): string => {
  const timestamp = new Date(isoString).getTime();
  if (Number.isNaN(timestamp)) return "Unknown";

  const diff = timestamp - Date.now();
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


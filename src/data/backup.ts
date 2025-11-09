export const backupSchedules = [
  {
    id: "backup-1",
    name: "Daily Backup",
    frequency: "daily",
    time: "02:00 UTC",
    lastRun: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    nextRun: new Date(Date.now() + 1000 * 60 * 60 * 18).toISOString(),
    status: "active",
    size: "2.4 GB",
  },
  {
    id: "backup-2",
    name: "Weekly Archive",
    frequency: "weekly",
    time: "Sunday 03:00 UTC",
    lastRun: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    nextRun: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
    status: "active",
    size: "8.7 GB",
  },
];

export const backupHistory = [
  {
    id: "history-1",
    date: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    type: "automatic",
    size: "2.4 GB",
    status: "completed",
    downloadUrl: "#",
  },
  {
    id: "history-2",
    date: new Date(Date.now() - 1000 * 60 * 60 * 32).toISOString(),
    type: "automatic",
    size: "2.3 GB",
    status: "completed",
    downloadUrl: "#",
  },
  {
    id: "history-3",
    date: new Date(Date.now() - 1000 * 60 * 60 * 56).toISOString(),
    type: "manual",
    size: "2.5 GB",
    status: "completed",
    downloadUrl: "#",
  },
];

export const restorePoints = [
  {
    id: "restore-1",
    name: "Before major update",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    size: "2.2 GB",
    items: ["posts", "analytics", "settings"],
  },
  {
    id: "restore-2",
    name: "Monthly snapshot",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    size: "2.0 GB",
    items: ["all"],
  },
];


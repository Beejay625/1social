export const recycledContent = [
  {
    id: "recycle-1",
    originalPost: "Post from 30 days ago",
    reposted: 3,
    engagement: 1240,
    lastRepost: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    nextScheduled: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
  {
    id: "recycle-2",
    originalPost: "Top performing post",
    reposted: 5,
    engagement: 3420,
    lastRepost: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    nextScheduled: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10).toISOString(),
  },
];

export const recyclingRules = [
  {
    id: "rule-1",
    name: "Repost top performers monthly",
    enabled: true,
    threshold: 1000,
    frequency: "monthly",
    executions: 12,
  },
  {
    id: "rule-2",
    name: "Archive low performers",
    enabled: true,
    threshold: 100,
    frequency: "weekly",
    executions: 45,
  },
];

export const recyclingStats = {
  totalRecycled: 124,
  avgEngagementIncrease: 15,
  timeSaved: "40 hours",
  topPerformer: "Post from 30 days ago",
};


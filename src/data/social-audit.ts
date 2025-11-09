export interface AuditCategory {
  id: string;
  name: string;
  score: number;
  maxScore: number;
  issues: AuditIssue[];
  recommendations: string[];
}

export interface AuditIssue {
  id: string;
  severity: "critical" | "warning" | "info";
  title: string;
  description: string;
  impact: string;
  fixable: boolean;
}

export const auditCategories: AuditCategory[] = [
  {
    id: "content-quality",
    name: "Content Quality",
    score: 85,
    maxScore: 100,
    issues: [
      {
        id: "issue-1",
        severity: "warning",
        title: "Low engagement on recent posts",
        description: "Last 10 posts have engagement rate below 5%",
        impact: "Reduced reach and visibility",
        fixable: true,
      },
      {
        id: "issue-2",
        severity: "info",
        title: "Inconsistent posting schedule",
        description: "Posting frequency varies significantly",
        impact: "Lower audience retention",
        fixable: true,
      },
    ],
    recommendations: [
      "Increase posting frequency to 3-5 times per week",
      "Use more visual content (images/videos)",
      "Engage with comments within 2 hours",
    ],
  },
  {
    id: "profile-optimization",
    name: "Profile Optimization",
    score: 92,
    maxScore: 100,
    issues: [
      {
        id: "issue-3",
        severity: "info",
        title: "Bio could be more descriptive",
        description: "Current bio is 45 characters, consider expanding",
        impact: "Lower discoverability",
        fixable: true,
      },
    ],
    recommendations: [
      "Add keywords relevant to your niche",
      "Include a call-to-action in bio",
      "Update profile picture to be more recognizable",
    ],
  },
  {
    id: "hashtag-strategy",
    name: "Hashtag Strategy",
    score: 78,
    maxScore: 100,
    issues: [
      {
        id: "issue-4",
        severity: "warning",
        title: "Overusing same hashtags",
        description: "Using same 5 hashtags in 80% of posts",
        impact: "Reduced reach potential",
        fixable: true,
      },
      {
        id: "issue-5",
        severity: "info",
        title: "Missing niche-specific hashtags",
        description: "Not using hashtags specific to your industry",
        impact: "Missing targeted audience",
        fixable: true,
      },
    ],
    recommendations: [
      "Research trending hashtags in your niche",
      "Use mix of popular and niche hashtags",
      "Create branded hashtag for campaigns",
    ],
  },
  {
    id: "engagement-rate",
    name: "Engagement Rate",
    score: 88,
    maxScore: 100,
    issues: [
      {
        id: "issue-6",
        severity: "info",
        title: "Response time could be faster",
        description: "Average response time is 4 hours",
        impact: "Lower engagement quality",
        fixable: true,
      },
    ],
    recommendations: [
      "Aim for response time under 2 hours",
      "Use automated responses for common questions",
      "Engage proactively with followers' content",
    ],
  },
];

export const auditScore = {
  overall: 86,
  previous: 82,
  trend: "up",
  lastRun: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  nextScheduled: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
};

export const auditHistory = [
  {
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    score: 86,
    changes: "+4 points",
  },
  {
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString(),
    score: 82,
    changes: "+3 points",
  },
  {
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 16).toISOString(),
    score: 79,
    changes: "+2 points",
  },
];


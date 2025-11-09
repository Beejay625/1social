export interface AuditCategory {
  id: string;
  name: string;
  score: number;
  maxScore: number;
  status: "excellent" | "good" | "needs-improvement" | "critical";
  issues: AuditIssue[];
  recommendations: string[];
}

export interface AuditIssue {
  id: string;
  title: string;
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  impact: string;
  fixable: boolean;
}

export interface AuditReport {
  id: string;
  overallScore: number;
  categories: AuditCategory[];
  generatedAt: string;
  nextAuditDate: string;
  summary: {
    totalIssues: number;
    criticalIssues: number;
    resolvedIssues: number;
    improvementAreas: string[];
  };
}

export const auditReport: AuditReport = {
  id: "audit-1",
  overallScore: 78,
  categories: [
    {
      id: "content-quality",
      name: "Content Quality",
      score: 85,
      maxScore: 100,
      status: "excellent",
      issues: [],
      recommendations: [
        "Continue maintaining high content quality standards",
        "Consider A/B testing different content formats",
      ],
    },
    {
      id: "engagement",
      name: "Engagement",
      score: 72,
      maxScore: 100,
      status: "good",
      issues: [
        {
          id: "issue-1",
          title: "Low comment engagement rate",
          severity: "medium",
          description: "Comment engagement is 15% below industry average",
          impact: "Reduced community interaction and brand loyalty",
          fixable: true,
        },
      ],
      recommendations: [
        "Ask questions in posts to encourage comments",
        "Respond to comments within 2 hours",
      ],
    },
    {
      id: "consistency",
      name: "Posting Consistency",
      score: 65,
      maxScore: 100,
      status: "needs-improvement",
      issues: [
        {
          id: "issue-2",
          title: "Irregular posting schedule",
          severity: "high",
          description: "Posts are not published at consistent times",
          impact: "Reduced algorithm visibility and audience engagement",
          fixable: true,
        },
      ],
      recommendations: [
        "Set up a consistent posting schedule",
        "Use content calendar to plan ahead",
      ],
    },
  ],
  generatedAt: new Date(Date.now() - 86400000).toISOString(),
  nextAuditDate: new Date(Date.now() + 2592000000).toISOString(),
  summary: {
    totalIssues: 2,
    criticalIssues: 0,
    resolvedIssues: 0,
    improvementAreas: ["Posting Consistency", "Engagement"],
  },
};

export const auditStats = {
  lastAuditScore: 78,
  previousScore: 72,
  improvement: 6,
  totalIssuesFound: 2,
  issuesResolved: 0,
  nextAuditIn: "29 days",
};

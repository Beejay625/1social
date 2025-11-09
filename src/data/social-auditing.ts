export interface AuditReport {
  id: string;
  name: string;
  type: "full" | "content" | "engagement" | "compliance";
  status: "completed" | "in_progress" | "scheduled";
  score: number;
  totalIssues: number;
  criticalIssues: number;
  recommendations: AuditRecommendation[];
  createdAt: string;
  completedAt?: string;
}

export interface AuditRecommendation {
  id: string;
  category: string;
  priority: "high" | "medium" | "low";
  title: string;
  description: string;
  impact: string;
}

export const auditReports: AuditReport[] = [
  {
    id: "audit-1",
    name: "Q1 2024 Full Audit",
    type: "full",
    status: "completed",
    score: 87,
    totalIssues: 12,
    criticalIssues: 2,
    recommendations: [
      {
        id: "rec-1",
        category: "Content Strategy",
        priority: "high",
        title: "Improve Posting Frequency",
        description: "Increase posting frequency on Instagram from 3 to 5 posts per week",
        impact: "Expected 15% increase in engagement",
      },
      {
        id: "rec-2",
        category: "Engagement",
        priority: "medium",
        title: "Respond to Comments Faster",
        description: "Average response time is 8 hours, aim for under 2 hours",
        impact: "Improved customer satisfaction and retention",
      },
    ],
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    completedAt: new Date(Date.now() - 86400000 * 6).toISOString(),
  },
];

export const auditStats = {
  totalAudits: 8,
  avgScore: 84.5,
  totalIssuesFound: 45,
  criticalIssues: 8,
  recommendationsImplemented: 32,
};


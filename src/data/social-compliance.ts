export interface ComplianceCheck {
  id: string;
  type: "copyright" | "trademark" | "privacy" | "accessibility" | "advertising";
  status: "passed" | "failed" | "warning" | "pending";
  contentId: string;
  contentTitle: string;
  platform: string;
  checkedAt: string;
  issues?: string[];
  recommendations?: string[];
}

export interface ComplianceRule {
  id: string;
  name: string;
  type: "copyright" | "trademark" | "privacy" | "accessibility" | "advertising";
  enabled: boolean;
  severity: "critical" | "high" | "medium" | "low";
  matchCount: number;
  lastMatched?: string;
}

export const complianceChecks: ComplianceCheck[] = [
  {
    id: "check-1",
    type: "copyright",
    status: "passed",
    contentId: "content-1",
    contentTitle: "Product Launch Post",
    platform: "instagram",
    checkedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "check-2",
    type: "advertising",
    status: "warning",
    contentId: "content-2",
    contentTitle: "Promotional Campaign",
    platform: "x",
    checkedAt: new Date(Date.now() - 7200000).toISOString(),
    issues: ["Missing disclosure statement"],
    recommendations: ["Add #ad or #sponsored tag"],
  },
  {
    id: "check-3",
    type: "privacy",
    status: "failed",
    contentId: "content-3",
    contentTitle: "User Testimonial",
    platform: "farcaster",
    checkedAt: new Date(Date.now() - 10800000).toISOString(),
    issues: ["No consent obtained", "Personal information visible"],
    recommendations: ["Obtain written consent", "Blur personal information"],
  },
];

export const complianceRules: ComplianceRule[] = [
  {
    id: "rule-1",
    name: "Copyright Detection",
    type: "copyright",
    enabled: true,
    severity: "critical",
    matchCount: 12,
    lastMatched: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "rule-2",
    name: "Advertising Disclosure",
    type: "advertising",
    enabled: true,
    severity: "high",
    matchCount: 8,
    lastMatched: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "rule-3",
    name: "Privacy Compliance",
    type: "privacy",
    enabled: true,
    severity: "critical",
    matchCount: 5,
    lastMatched: new Date(Date.now() - 7200000).toISOString(),
  },
];

export const complianceStats = {
  totalChecks: 156,
  passedChecks: 142,
  failedChecks: 8,
  warningChecks: 6,
  complianceScore: 91,
  lastAudit: new Date(Date.now() - 86400000 * 7).toISOString(),
};


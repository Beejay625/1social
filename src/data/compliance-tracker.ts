export interface ComplianceCheck {
  id: string;
  content: string;
  platform: string;
  checkType: "copyright" | "trademark" | "privacy" | "accessibility" | "advertising";
  status: "pass" | "fail" | "warning" | "pending";
  checkedAt: string;
  issues: string[];
  score: number;
}

export interface ComplianceRule {
  id: string;
  name: string;
  type: string;
  enabled: boolean;
  severity: "critical" | "warning" | "info";
  description: string;
  matches: number;
}

export const complianceChecks: ComplianceCheck[] = [
  {
    id: "check-1",
    content: "Product launch announcement",
    platform: "farcaster",
    checkType: "copyright",
    status: "pass",
    checkedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    issues: [],
    score: 100,
  },
  {
    id: "check-2",
    content: "Promotional post with claims",
    platform: "instagram",
    checkType: "advertising",
    status: "warning",
    checkedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    issues: ["Unsubstantiated performance claims"],
    score: 75,
  },
];

export const complianceRules: ComplianceRule[] = [
  {
    id: "rule-1",
    name: "Copyright Check",
    type: "copyright",
    enabled: true,
    severity: "critical",
    description: "Check for copyrighted content",
    matches: 234,
  },
  {
    id: "rule-2",
    name: "Advertising Compliance",
    type: "advertising",
    enabled: true,
    severity: "warning",
    description: "Verify advertising claims compliance",
    matches: 89,
  },
];

export const complianceStats = {
  totalChecks: 1245,
  passedChecks: 1150,
  failedChecks: 45,
  warnings: 50,
  avgScore: 92.5,
  complianceRate: 92.4,
};



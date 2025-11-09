export const compliancePolicies = [
  {
    id: "policy-1",
    name: "GDPR Compliance",
    status: "compliant",
    lastAudit: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    nextAudit: new Date(Date.now() + 1000 * 60 * 60 * 24 * 335).toISOString(),
    requirements: ["Data encryption", "Right to deletion", "Data portability"],
  },
  {
    id: "policy-2",
    name: "CCPA Compliance",
    status: "compliant",
    lastAudit: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(),
    nextAudit: new Date(Date.now() + 1000 * 60 * 60 * 24 * 320).toISOString(),
    requirements: ["Opt-out mechanisms", "Data disclosure", "Non-discrimination"],
  },
  {
    id: "policy-3",
    name: "SOC 2 Type II",
    status: "in-progress",
    lastAudit: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(),
    nextAudit: new Date(Date.now() + 1000 * 60 * 60 * 24 * 305).toISOString(),
    requirements: ["Security controls", "Availability", "Processing integrity"],
  },
];

export const dataRetentionPolicies = [
  {
    id: "retention-1",
    type: "User Data",
    period: 90,
    unit: "days",
    autoDelete: true,
  },
  {
    id: "retention-2",
    type: "Analytics Data",
    period: 365,
    unit: "days",
    autoDelete: true,
  },
  {
    id: "retention-3",
    type: "Backup Data",
    period: 30,
    unit: "days",
    autoDelete: false,
  },
];

export const auditLogs = [
  {
    id: "audit-1",
    action: "Data export requested",
    user: "admin@example.com",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    ip: "192.168.1.100",
    status: "success",
  },
  {
    id: "audit-2",
    action: "User data deleted",
    user: "support@example.com",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    ip: "10.0.0.5",
    status: "success",
  },
  {
    id: "audit-3",
    action: "Privacy settings updated",
    user: "admin@example.com",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    ip: "192.168.1.100",
    status: "success",
  },
];


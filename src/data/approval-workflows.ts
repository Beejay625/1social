export const workflowStats = {
  activeWorkflows: 8,
  pendingApprovals: 12,
  avgApprovalTime: "4.5 hours",
  approvalRate: 92,
};

export const activeWorkflows = [
  {
    id: "workflow-1",
    name: "Product Launch Content",
    status: "pending",
    currentStep: "Content Review",
    assignedTo: "Sarah Chen",
    progress: 60,
    startedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    estimatedCompletion: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
    steps: [
      { name: "Draft Creation", status: "completed", completedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString() },
      { name: "Content Review", status: "in_progress", assignedTo: "Sarah Chen" },
      { name: "Legal Review", status: "pending" },
      { name: "Final Approval", status: "pending" },
    ],
  },
  {
    id: "workflow-2",
    name: "Social Media Campaign",
    status: "in_progress",
    currentStep: "Legal Review",
    assignedTo: "Mike Johnson",
    progress: 75,
    startedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    estimatedCompletion: new Date(Date.now() + 1000 * 60 * 60 * 1).toISOString(),
    steps: [
      { name: "Campaign Planning", status: "completed", completedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString() },
      { name: "Content Creation", status: "completed", completedAt: new Date(Date.now() - 1000 * 60 * 60 * 7).toISOString() },
      { name: "Legal Review", status: "in_progress", assignedTo: "Mike Johnson" },
      { name: "Final Approval", status: "pending" },
    ],
  },
];

export const approvalTemplates = [
  {
    id: "template-1",
    name: "Standard Content Approval",
    steps: 3,
    avgTime: "3 hours",
    usage: 45,
  },
  {
    id: "template-2",
    name: "Campaign Approval",
    steps: 5,
    avgTime: "6 hours",
    usage: 28,
  },
  {
    id: "template-3",
    name: "Quick Approval",
    steps: 2,
    avgTime: "1 hour",
    usage: 67,
  },
];

export const pendingApprovals = [
  {
    id: "approval-1",
    content: "Product launch announcement",
    requester: "Sarah Chen",
    type: "content",
    priority: "high",
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    waitingTime: "2 hours",
  },
  {
    id: "approval-2",
    content: "Social media campaign",
    requester: "Mike Johnson",
    type: "campaign",
    priority: "medium",
    submittedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    waitingTime: "30 minutes",
  },
];

export const workflowMetrics = {
  avgWorkflowTime: "4.5 hours",
  completionRate: 92,
  bottlenecks: ["Legal Review", "Final Approval"],
};

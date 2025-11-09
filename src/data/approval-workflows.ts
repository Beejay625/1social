export interface ApprovalWorkflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  isActive: boolean;
  usedCount: number;
}

export interface WorkflowStep {
  id: string;
  name: string;
  approver: {
    name: string;
    role: string;
  };
  required: boolean;
  order: number;
}

export interface WorkflowInstance {
  id: string;
  workflowId: string;
  contentTitle: string;
  status: "approved" | "rejected" | "in-progress" | "pending";
  currentStep: number;
  steps: Array<{
    name: string;
    status: "completed" | "in-progress" | "pending";
    completedAt?: string;
  }>;
  startedAt: string;
}

export const workflowStats = {
  activeWorkflows: 8,
  pendingApprovals: 12,
  avgApprovalTime: "4.5 hours",
  approvalRate: 92,
};

export const approvalWorkflows: ApprovalWorkflow[] = [
  {
    id: "workflow-1",
    name: "Standard Content Review",
    description: "Standard 3-step content approval process",
    isActive: true,
    usedCount: 45,
    steps: [
      {
        id: "step-1",
        name: "Content Review",
        approver: { name: "Sarah Chen", role: "Content Manager" },
        required: true,
        order: 1,
      },
      {
        id: "step-2",
        name: "Legal Review",
        approver: { name: "Legal Team", role: "Legal" },
        required: true,
        order: 2,
      },
      {
        id: "step-3",
        name: "Final Approval",
        approver: { name: "Mike Johnson", role: "Marketing Director" },
        required: true,
        order: 3,
      },
    ],
  },
  {
    id: "workflow-2",
    name: "Quick Approval",
    description: "Single-step quick approval for low-risk content",
    isActive: true,
    usedCount: 67,
    steps: [
      {
        id: "step-1",
        name: "Quick Review",
        approver: { name: "Sarah Chen", role: "Content Manager" },
        required: true,
        order: 1,
      },
    ],
  },
  {
    id: "workflow-3",
    name: "Executive Review",
    description: "Multi-step approval for high-stakes content",
    isActive: true,
    usedCount: 12,
    steps: [
      {
        id: "step-1",
        name: "Content Review",
        approver: { name: "Sarah Chen", role: "Content Manager" },
        required: true,
        order: 1,
      },
      {
        id: "step-2",
        name: "Legal Review",
        approver: { name: "Legal Team", role: "Legal" },
        required: true,
        order: 2,
      },
      {
        id: "step-3",
        name: "Marketing Review",
        approver: { name: "Mike Johnson", role: "Marketing Director" },
        required: true,
        order: 3,
      },
      {
        id: "step-4",
        name: "Executive Approval",
        approver: { name: "CEO", role: "Executive" },
        required: true,
        order: 4,
      },
    ],
  },
];

export const activeWorkflows = approvalWorkflows.filter((w) => w.isActive);

export const workflowInstances: WorkflowInstance[] = [
  {
    id: "instance-1",
    workflowId: "workflow-1",
    contentTitle: "Product Launch Announcement",
    status: "in-progress",
    currentStep: 2,
    steps: [
      { name: "Content Review", status: "completed", completedAt: new Date(Date.now() - 3600000).toISOString() },
      { name: "Legal Review", status: "in-progress" },
      { name: "Final Approval", status: "pending" },
    ],
    startedAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "instance-2",
    workflowId: "workflow-2",
    contentTitle: "Weekly Community Update",
    status: "approved",
    currentStep: 1,
    steps: [{ name: "Quick Review", status: "completed", completedAt: new Date(Date.now() - 1800000).toISOString() }],
    startedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "instance-3",
    workflowId: "workflow-1",
    contentTitle: "Social Media Campaign",
    status: "pending",
    currentStep: 1,
    steps: [
      { name: "Content Review", status: "pending" },
      { name: "Legal Review", status: "pending" },
      { name: "Final Approval", status: "pending" },
    ],
    startedAt: new Date(Date.now() - 1800000).toISOString(),
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

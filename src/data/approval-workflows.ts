export interface ApprovalWorkflow {
  id: string;
  name: string;
  description: string;
  steps: ApprovalStep[];
  isActive: boolean;
  createdAt: string;
  usedCount: number;
}

export interface ApprovalStep {
  id: string;
  order: number;
  name: string;
  approver: {
    id: string;
    name: string;
    role: string;
  };
  required: boolean;
  autoApprove?: {
    condition: string;
    timeout: number;
  };
}

export interface WorkflowInstance {
  id: string;
  workflowId: string;
  contentId: string;
  contentTitle: string;
  status: "pending" | "in-progress" | "approved" | "rejected" | "cancelled";
  currentStep: number;
  steps: StepStatus[];
  createdAt: string;
  completedAt?: string;
}

export interface StepStatus {
  stepId: string;
  status: "pending" | "approved" | "rejected" | "skipped";
  approver?: string;
  comment?: string;
  timestamp?: string;
}

export const approvalWorkflows: ApprovalWorkflow[] = [
  {
    id: "workflow-1",
    name: "Standard Content Approval",
    description: "Standard 2-step approval for all content",
    steps: [
      {
        id: "step-1",
        order: 1,
        name: "Content Review",
        approver: {
          id: "user-1",
          name: "Sarah Chen",
          role: "Content Manager",
        },
        required: true,
      },
      {
        id: "step-2",
        order: 2,
        name: "Final Approval",
        approver: {
          id: "user-2",
          name: "Mike Johnson",
          role: "Marketing Director",
        },
        required: true,
        autoApprove: {
          condition: "after 24 hours",
          timeout: 86400000,
        },
      },
    ],
    isActive: true,
    createdAt: new Date(Date.now() - 2592000000).toISOString(),
    usedCount: 156,
  },
  {
    id: "workflow-2",
    name: "Quick Approval",
    description: "Single-step approval for routine content",
    steps: [
      {
        id: "step-3",
        order: 1,
        name: "Quick Review",
        approver: {
          id: "user-3",
          name: "Emma Wilson",
          role: "Social Media Manager",
        },
        required: true,
      },
    ],
    isActive: true,
    createdAt: new Date(Date.now() - 1728000000).toISOString(),
    usedCount: 89,
  },
];

export const workflowInstances: WorkflowInstance[] = [
  {
    id: "instance-1",
    workflowId: "workflow-1",
    contentId: "post-1",
    contentTitle: "Product Launch Announcement",
    status: "in-progress",
    currentStep: 1,
    steps: [
      {
        stepId: "step-1",
        status: "approved",
        approver: "Sarah Chen",
        comment: "Looks good, approved!",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        stepId: "step-2",
        status: "pending",
      },
    ],
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "instance-2",
    workflowId: "workflow-2",
    contentId: "post-2",
    contentTitle: "Weekly Update Post",
    status: "approved",
    currentStep: 1,
    steps: [
      {
        stepId: "step-3",
        status: "approved",
        approver: "Emma Wilson",
        timestamp: new Date(Date.now() - 1800000).toISOString(),
      },
    ],
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    completedAt: new Date(Date.now() - 1800000).toISOString(),
  },
];


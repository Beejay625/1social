export interface ApprovalRequest {
  id: string;
  content: string;
  author: string;
  platform: string;
  status: "pending" | "approved" | "rejected" | "changes-requested";
  submittedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  comments?: string;
  priority: "low" | "medium" | "high" | "urgent";
}

export interface ApprovalWorkflow {
  id: string;
  name: string;
  steps: ApprovalStep[];
  enabled: boolean;
  autoApprove: boolean;
  timeoutHours: number;
}

export interface ApprovalStep {
  id: string;
  name: string;
  approver: string;
  order: number;
  required: boolean;
  status: "pending" | "approved" | "rejected";
}

export const approvalRequests: ApprovalRequest[] = [
  {
    id: "req-1",
    content: "New product announcement post",
    author: "Alice Chen",
    platform: "farcaster",
    status: "pending",
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    priority: "high",
  },
  {
    id: "req-2",
    content: "Weekly update thread",
    author: "Bob Smith",
    platform: "x",
    status: "approved",
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    reviewedBy: "Sarah Johnson",
    reviewedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    priority: "medium",
  },
];

export const approvalWorkflows: ApprovalWorkflow[] = [
  {
    id: "workflow-1",
    name: "Standard Content Approval",
    enabled: true,
    autoApprove: false,
    timeoutHours: 24,
    steps: [
      {
        id: "step-1",
        name: "Editor Review",
        approver: "Editor",
        order: 1,
        required: true,
        status: "pending",
      },
      {
        id: "step-2",
        name: "Manager Approval",
        approver: "Manager",
        order: 2,
        required: true,
        status: "pending",
      },
    ],
  },
];

export const approvalStats = {
  pendingRequests: 8,
  approvedToday: 12,
  rejectedToday: 2,
  avgApprovalTime: "4 hours",
  totalRequests: 245,
};



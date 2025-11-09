export interface WorkflowStep {
  id: string;
  type: "approval" | "review" | "notification" | "automation";
  name: string;
  assignee?: string;
  conditions?: string[];
  order: number;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  enabled: boolean;
  executions: number;
}

export const workflowTemplates: WorkflowTemplate[] = [
  {
    id: "workflow-1",
    name: "Content Approval Workflow",
    description: "Standard 3-step approval process",
    enabled: true,
    executions: 124,
    steps: [
      {
        id: "step-1",
        type: "review",
        name: "Content Review",
        assignee: "Content Team",
        order: 1,
      },
      {
        id: "step-2",
        type: "approval",
        name: "Manager Approval",
        assignee: "Sarah Johnson",
        conditions: ["Content quality check passed"],
        order: 2,
      },
      {
        id: "step-3",
        type: "automation",
        name: "Auto Publish",
        order: 3,
      },
    ],
  },
  {
    id: "workflow-2",
    name: "Crisis Response Workflow",
    description: "Automated crisis detection and response",
    enabled: true,
    executions: 8,
    steps: [
      {
        id: "step-1",
        type: "automation",
        name: "Detect Negative Sentiment",
        conditions: ["Sentiment < 0.3", "Mentions > 10"],
        order: 1,
      },
      {
        id: "step-2",
        type: "notification",
        name: "Alert Team",
        assignee: "All Managers",
        order: 2,
      },
      {
        id: "step-3",
        type: "approval",
        name: "Response Approval",
        assignee: "Crisis Team",
        order: 3,
      },
    ],
  },
];

export const workflowStats = {
  activeWorkflows: 5,
  totalExecutions: 456,
  avgCompletionTime: "2.5 hours",
  successRate: 94,
};


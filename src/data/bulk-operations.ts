export interface BulkOperation {
  id: string;
  name: string;
  type: "publish" | "delete" | "schedule" | "update";
  items: number;
  status: "pending" | "running" | "completed" | "failed";
  progress: number;
  startedAt: string;
  completedAt?: string;
}

export interface BulkOperationTemplate {
  id: string;
  name: string;
  description: string;
  type: string;
  usage: number;
}

export const bulkOperations: BulkOperation[] = [
  {
    id: "bulk-1",
    name: "Schedule 50 posts",
    type: "schedule",
    items: 50,
    status: "running",
    progress: 65,
    startedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: "bulk-2",
    name: "Update hashtags",
    type: "update",
    items: 120,
    status: "completed",
    progress: 100,
    startedAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
    completedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
];

export const bulkOperationTemplates: BulkOperationTemplate[] = [
  {
    id: "template-1",
    name: "Bulk Schedule Posts",
    description: "Schedule multiple posts at once",
    type: "schedule",
    usage: 45,
  },
  {
    id: "template-2",
    name: "Bulk Delete Drafts",
    description: "Delete multiple drafts",
    type: "delete",
    usage: 12,
  },
  {
    id: "template-3",
    name: "Bulk Update Tags",
    description: "Update tags across multiple posts",
    type: "update",
    usage: 28,
  },
];

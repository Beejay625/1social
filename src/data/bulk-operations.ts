export interface BulkOperation {
  id: string;
  type: "edit" | "delete" | "schedule" | "publish" | "archive" | "tag";
  status: "pending" | "processing" | "completed" | "failed";
  affectedCount: number;
  successCount: number;
  failedCount: number;
  createdAt: string;
  completedAt?: string;
  errors?: string[];
}

export interface BulkEditField {
  field: "channels" | "tags" | "status" | "category" | "priority";
  value: any;
}

export const bulkOperations: BulkOperation[] = [
  {
    id: "bulk-1",
    type: "schedule",
    status: "completed",
    affectedCount: 15,
    successCount: 15,
    failedCount: 0,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    completedAt: new Date(Date.now() - 3300000).toISOString(),
  },
  {
    id: "bulk-2",
    type: "tag",
    status: "processing",
    affectedCount: 42,
    successCount: 38,
    failedCount: 4,
    createdAt: new Date(Date.now() - 600000).toISOString(),
    errors: [
      "Post 'post-12' not found",
      "Post 'post-23' is archived",
      "Post 'post-31' permission denied",
      "Post 'post-45' invalid tag format",
    ],
  },
  {
    id: "bulk-3",
    type: "delete",
    status: "pending",
    affectedCount: 8,
    successCount: 0,
    failedCount: 0,
    createdAt: new Date(Date.now() - 120000).toISOString(),
  },
];

export const bulkOperationTemplates = [
  {
    id: "template-1",
    name: "Schedule Weekly Batch",
    description: "Schedule selected posts for next week",
    type: "schedule",
    config: {
      dateRange: "next-week",
      timeSlots: ["09:00", "12:00", "15:00", "18:00"],
      channels: ["farcaster", "instagram"],
    },
  },
  {
    id: "template-2",
    name: "Tag by Category",
    description: "Add category tags to selected posts",
    type: "tag",
    config: {
      tags: ["product-launch", "announcement"],
    },
  },
];


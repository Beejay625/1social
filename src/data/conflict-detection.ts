export interface Conflict {
  id: string;
  type: "edit" | "delete" | "schedule";
  document: string;
  users: string[];
  detectedAt: string;
  resolved: boolean;
  resolution?: string;
}

export const detectedConflicts: Conflict[] = [
  {
    id: "conflict-1",
    type: "edit",
    document: "Product Launch Post",
    users: ["Alex Chen", "Sarah Johnson"],
    detectedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    resolved: false,
  },
  {
    id: "conflict-2",
    type: "schedule",
    document: "Weekly Update",
    users: ["Mike Rodriguez", "Emma Wilson"],
    detectedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    resolved: true,
    resolution: "Merged schedules",
  },
];

export const conflictStats = {
  totalConflicts: 12,
  resolvedConflicts: 10,
  activeConflicts: 2,
  avgResolutionTime: "8 minutes",
  conflictRate: 2.5,
};

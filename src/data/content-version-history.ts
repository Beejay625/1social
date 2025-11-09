export interface ContentVersion {
  id: string;
  contentId: string;
  version: number;
  author: string;
  changes: string;
  timestamp: string;
  restored: boolean;
}

export const contentVersionHistory: ContentVersion[] = [
  {
    id: "version-1",
    contentId: "content-123",
    version: 3,
    author: "Alex Chen",
    changes: "Updated headline and added call-to-action",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    restored: false,
  },
  {
    id: "version-2",
    contentId: "content-123",
    version: 2,
    author: "Sarah Johnson",
    changes: "Revised copy and updated hashtags",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    restored: false,
  },
  {
    id: "version-3",
    contentId: "content-123",
    version: 1,
    author: "Alex Chen",
    changes: "Initial draft created",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    restored: false,
  },
];

export const versionStats = {
  totalVersions: 1240,
  avgVersionsPerContent: 3.2,
  mostActiveEditor: "Alex Chen",
  versionsToday: 45,
};

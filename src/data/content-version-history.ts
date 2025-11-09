export interface ContentVersion {
  id: string;
  contentId: string;
  version: number;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  changes: VersionChange[];
  createdAt: string;
  status: "draft" | "published" | "archived";
  metadata?: {
    channels?: string[];
    tags?: string[];
    scheduledFor?: string;
  };
}

export interface VersionChange {
  type: "added" | "deleted" | "modified" | "formatted";
  field: string;
  oldValue?: string;
  newValue?: string;
  position?: number;
}

export interface VersionComparison {
  versionA: ContentVersion;
  versionB: ContentVersion;
  differences: VersionChange[];
}

export const contentVersionHistory: Record<string, ContentVersion[]> = {
  "post-1": [
    {
      id: "version-1-1",
      contentId: "post-1",
      version: 1,
      content: "Exciting announcement coming soon!",
      author: {
        id: "user-1",
        name: "Sarah Chen",
        avatar: "SC",
      },
      changes: [
        {
          type: "added",
          field: "content",
          newValue: "Exciting announcement coming soon!",
        },
      ],
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      status: "draft",
    },
    {
      id: "version-1-2",
      contentId: "post-1",
      version: 2,
      content: "Exciting announcement: We're launching new AI-powered features! 🚀",
      author: {
        id: "user-2",
        name: "Mike Johnson",
        avatar: "MJ",
      },
      changes: [
        {
          type: "modified",
          field: "content",
          oldValue: "Exciting announcement coming soon!",
          newValue: "Exciting announcement: We're launching new AI-powered features! 🚀",
        },
        {
          type: "added",
          field: "tags",
          newValue: "ai,features,launch",
        },
      ],
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      status: "draft",
    },
    {
      id: "version-1-3",
      contentId: "post-1",
      version: 3,
      content: "🎉 Exciting announcement: We're launching new AI-powered features! 🚀\n\nThese tools will help you create, schedule, and optimize your content like never before.",
      author: {
        id: "user-1",
        name: "Sarah Chen",
        avatar: "SC",
      },
      changes: [
        {
          type: "added",
          field: "content",
          newValue: "🎉 Exciting announcement: We're launching new AI-powered features! 🚀\n\nThese tools will help you create, schedule, and optimize your content like never before.",
          position: 0,
        },
        {
          type: "formatted",
          field: "content",
          oldValue: "single line",
          newValue: "multi-line with emoji",
        },
      ],
      createdAt: new Date(Date.now() - 43200000).toISOString(),
      status: "published",
      metadata: {
        channels: ["farcaster", "instagram"],
        tags: ["ai", "features", "launch"],
        scheduledFor: new Date(Date.now() - 43200000).toISOString(),
      },
    },
  ],
  "post-2": [
    {
      id: "version-2-1",
      contentId: "post-2",
      version: 1,
      content: "Check out our latest blog post",
      author: {
        id: "user-3",
        name: "Emma Wilson",
        avatar: "EW",
      },
      changes: [
        {
          type: "added",
          field: "content",
          newValue: "Check out our latest blog post",
        },
      ],
      createdAt: new Date(Date.now() - 259200000).toISOString(),
      status: "published",
      metadata: {
        channels: ["farcaster"],
        tags: ["blog"],
      },
    },
  ],
};

export const versionStats = {
  totalVersions: 4,
  totalChanges: 8,
  averageVersionsPerPost: 2.0,
  mostActiveEditor: "Sarah Chen",
  recentActivity: 2,
};


export interface LiveEditor {
  id: string;
  name: string;
  avatar: string;
  cursorPosition: number;
  isTyping: boolean;
  color: string;
  lastSeen: string;
}

export interface CollaborationSession {
  id: string;
  contentId: string;
  editors: LiveEditor[];
  changes: CollaborationChange[];
  startedAt: string;
  isActive: boolean;
}

export interface CollaborationChange {
  id: string;
  editorId: string;
  editorName: string;
  type: "insert" | "delete" | "format";
  position: number;
  content: string;
  timestamp: string;
}

export const activeCollaborationSessions: CollaborationSession[] = [
  {
    id: "collab-1",
    contentId: "post-1",
    editors: [
      {
        id: "user-1",
        name: "Sarah Chen",
        avatar: "SC",
        cursorPosition: 45,
        isTyping: true,
        color: "bg-blue-500",
        lastSeen: new Date().toISOString(),
      },
      {
        id: "user-2",
        name: "Mike Johnson",
        avatar: "MJ",
        cursorPosition: 120,
        isTyping: false,
        color: "bg-green-500",
        lastSeen: new Date(Date.now() - 30000).toISOString(),
      },
    ],
    changes: [
      {
        id: "change-1",
        editorId: "user-1",
        editorName: "Sarah Chen",
        type: "insert",
        position: 45,
        content: "exciting new features",
        timestamp: new Date(Date.now() - 120000).toISOString(),
      },
      {
        id: "change-2",
        editorId: "user-2",
        editorName: "Mike Johnson",
        type: "format",
        position: 0,
        content: "bold",
        timestamp: new Date(Date.now() - 60000).toISOString(),
      },
    ],
    startedAt: new Date(Date.now() - 600000).toISOString(),
    isActive: true,
  },
];

export const presenceIndicators = [
  {
    userId: "user-1",
    name: "Sarah Chen",
    status: "active",
    currentSection: "Compose",
    avatar: "SC",
    color: "bg-blue-500",
  },
  {
    userId: "user-2",
    name: "Mike Johnson",
    status: "active",
    currentSection: "Scheduling",
    avatar: "MJ",
    color: "bg-green-500",
  },
  {
    userId: "user-3",
    name: "Emma Wilson",
    status: "away",
    currentSection: "Analytics",
    avatar: "EW",
    color: "bg-purple-500",
  },
];


export interface CollaborationSession {
  id: string;
  document: string;
  participants: string[];
  lastActivity: string;
  status: "active" | "idle";
}

export interface PresenceIndicator {
  userId: string;
  name: string;
  status: "online" | "away" | "offline";
  currentDocument?: string;
  lastSeen: string;
}

export const activeCollaborationSessions: CollaborationSession[] = [
  {
    id: "session-1",
    document: "Q1 Campaign Strategy",
    participants: ["Alex Chen", "Sarah Johnson", "Mike Rodriguez"],
    lastActivity: "2 min ago",
    status: "active",
  },
  {
    id: "session-2",
    document: "Product Launch Post",
    participants: ["Sarah Johnson", "Emma Wilson"],
    lastActivity: "15 min ago",
    status: "idle",
  },
];

export const presenceIndicators: PresenceIndicator[] = [
  {
    userId: "user-1",
    name: "Alex Chen",
    status: "online",
    currentDocument: "Q1 Campaign Strategy",
    lastSeen: "now",
  },
  {
    userId: "user-2",
    name: "Sarah Johnson",
    status: "online",
    currentDocument: "Product Launch Post",
    lastSeen: "now",
  },
  {
    userId: "user-3",
    name: "Mike Rodriguez",
    status: "away",
    lastSeen: "5 min ago",
  },
  {
    userId: "user-4",
    name: "Emma Wilson",
    status: "offline",
    lastSeen: "1 hour ago",
  },
];

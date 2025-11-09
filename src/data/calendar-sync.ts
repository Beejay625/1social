export interface CalendarSync {
  id: string;
  name: string;
  type: "google" | "outlook" | "apple" | "ical";
  status: "connected" | "disconnected" | "syncing" | "error";
  lastSync: string;
  syncFrequency: "realtime" | "hourly" | "daily";
  calendars: SyncedCalendar[];
  syncDirection: "bidirectional" | "import" | "export";
}

export interface SyncedCalendar {
  id: string;
  name: string;
  color: string;
  eventCount: number;
  lastSynced: string;
  enabled: boolean;
}

export const calendarSyncs: CalendarSync[] = [
  {
    id: "sync-1",
    name: "Google Calendar",
    type: "google",
    status: "connected",
    lastSync: new Date().toISOString(),
    syncFrequency: "realtime",
    calendars: [
      {
        id: "cal-1",
        name: "Content Calendar",
        color: "#3b82f6",
        eventCount: 45,
        lastSynced: new Date().toISOString(),
        enabled: true,
      },
      {
        id: "cal-2",
        name: "Team Events",
        color: "#8b5cf6",
        eventCount: 12,
        lastSynced: new Date(Date.now() - 3600000).toISOString(),
        enabled: true,
      },
    ],
    syncDirection: "bidirectional",
  },
  {
    id: "sync-2",
    name: "Outlook Calendar",
    type: "outlook",
    status: "connected",
    lastSync: new Date(Date.now() - 7200000).toISOString(),
    syncFrequency: "hourly",
    calendars: [
      {
        id: "cal-3",
        name: "Marketing Schedule",
        color: "#10b981",
        eventCount: 28,
        lastSynced: new Date(Date.now() - 7200000).toISOString(),
        enabled: true,
      },
    ],
    syncDirection: "import",
  },
];

export const syncStats = {
  totalCalendars: 3,
  totalEvents: 85,
  syncedToday: 23,
  pendingSync: 2,
};


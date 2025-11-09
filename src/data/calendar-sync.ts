export interface CalendarConnection {
  id: string;
  provider: "google" | "outlook" | "apple" | "ical";
  account: string;
  status: "connected" | "disconnected" | "error";
  lastSync: string;
  eventsSynced: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  calendar: string;
  synced: boolean;
}

export const calendarConnections: CalendarConnection[] = [
  {
    id: "conn-1",
    provider: "google",
    account: "user@example.com",
    status: "connected",
    lastSync: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    eventsSynced: 45,
  },
  {
    id: "conn-2",
    provider: "outlook",
    account: "user@company.com",
    status: "connected",
    lastSync: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    eventsSynced: 32,
  },
];

export const calendarEvents: CalendarEvent[] = [
  {
    id: "event-1",
    title: "Product Launch",
    startTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(),
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 60).toISOString(),
    calendar: "google",
    synced: true,
  },
  {
    id: "event-2",
    title: "Team Meeting",
    startTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3 + 1000 * 60 * 30).toISOString(),
    calendar: "outlook",
    synced: true,
  },
];

export const syncStats = {
  totalConnections: 3,
  activeConnections: 2,
  eventsSynced: 77,
  lastSyncTime: "15 minutes ago",
  syncSuccessRate: 98,
};

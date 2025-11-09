export interface CalendarView {
  id: string;
  name: string;
  type: "week" | "month" | "agenda" | "timeline";
  filters: {
    platforms: string[];
    status: string[];
    tags: string[];
  };
  isDefault: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  platform: string;
  scheduledFor: string;
  status: "scheduled" | "published" | "draft" | "cancelled";
  type: "post" | "story" | "reel" | "thread";
  color: string;
}

export const calendarViews: CalendarView[] = [
  {
    id: "view-1",
    name: "This Week",
    type: "week",
    filters: {
      platforms: ["farcaster", "instagram", "x"],
      status: ["scheduled", "published"],
      tags: [],
    },
    isDefault: true,
  },
  {
    id: "view-2",
    name: "This Month",
    type: "month",
    filters: {
      platforms: ["all"],
      status: ["scheduled"],
      tags: [],
    },
    isDefault: false,
  },
  {
    id: "view-3",
    name: "Agenda View",
    type: "agenda",
    filters: {
      platforms: ["all"],
      status: ["scheduled", "draft"],
      tags: [],
    },
    isDefault: false,
  },
];

export const calendarEvents: CalendarEvent[] = [
  {
    id: "event-1",
    title: "Product Launch Announcement",
    platform: "farcaster",
    scheduledFor: new Date(Date.now() + 86400000).toISOString(),
    status: "scheduled",
    type: "post",
    color: "#3b82f6",
  },
  {
    id: "event-2",
    title: "Weekly Update",
    platform: "instagram",
    scheduledFor: new Date(Date.now() + 86400000 * 2).toISOString(),
    status: "scheduled",
    type: "story",
    color: "#8b5cf6",
  },
  {
    id: "event-3",
    title: "Community Spotlight",
    platform: "x",
    scheduledFor: new Date(Date.now() + 86400000 * 3).toISOString(),
    status: "draft",
    type: "thread",
    color: "#10b981",
  },
];

export const calendarStats = {
  scheduledThisWeek: 12,
  scheduledThisMonth: 45,
  publishedThisWeek: 8,
  draftCount: 5,
};


export const calendarEvents = [
  {
    id: "event-1",
    title: "Product Launch Announcement",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
    channels: ["farcaster", "instagram", "x"],
    status: "scheduled",
    type: "post",
  },
  {
    id: "event-2",
    title: "Weekly Team Meeting",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
    channels: ["internal"],
    status: "draft",
    type: "meeting",
  },
  {
    id: "event-3",
    title: "Holiday Campaign Start",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10).toISOString(),
    channels: ["farcaster", "instagram"],
    status: "scheduled",
    type: "campaign",
  },
];

export const calendarViews = [
  { id: "day", label: "Day", icon: "📅" },
  { id: "week", label: "Week", icon: "📆" },
  { id: "month", label: "Month", icon: "🗓️" },
  { id: "agenda", label: "Agenda", icon: "📋" },
];

export const timeSlots = [
  { time: "09:00", available: true, posts: 2 },
  { time: "12:00", available: true, posts: 5 },
  { time: "15:00", available: false, posts: 0 },
  { time: "18:00", available: true, posts: 3 },
];


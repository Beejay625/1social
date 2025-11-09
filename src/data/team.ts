import type { TeamActivityEntry, TeamMember } from "@/types/publishing";

export const teamMembers: TeamMember[] = [
  {
    id: "member-1",
    name: "Ameena",
    role: "Strategy Lead",
    avatar: "AM",
    gradient: "from-rose-400 via-violet-500 to-indigo-500",
    permissions: ["Schedule", "Approve", "Export"],
    lastActive: "5 min ago",
  },
  {
    id: "member-2",
    name: "Kai",
    role: "Content Manager",
    avatar: "KA",
    gradient: "from-emerald-400 via-cyan-500 to-blue-500",
    permissions: ["Schedule", "Edit"],
    lastActive: "12 min ago",
  },
  {
    id: "member-3",
    name: "Leo",
    role: "Creative Director",
    avatar: "LE",
    gradient: "from-amber-400 via-orange-500 to-pink-500",
    permissions: ["Edit", "Approve"],
    lastActive: "1 hour ago",
  },
];

export const teamActivityLog: TeamActivityEntry[] = [
  {
    id: "activity-1",
    member: "Ameena",
    action: "Approved workflow",
    target: "Founder AMA teaser",
    timestamp: "2 min ago",
  },
  {
    id: "activity-2",
    member: "Kai",
    action: "Scheduled post",
    target: "Design drops recap",
    timestamp: "15 min ago",
  },
  {
    id: "activity-3",
    member: "Leo",
    action: "Uploaded asset",
    target: "Creator highlight reel",
    timestamp: "1 hour ago",
  },
];


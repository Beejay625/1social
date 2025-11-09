import type { ChannelId } from "@/types/publishing";

export const collaborationMentions = [
  {
    id: "mention-1",
    planId: "plan-1",
    mentionedBy: "Leo",
    mentionedTo: "You",
    message: "@You Need your sign-off on the wallet signature flow",
    at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    resolved: false,
  },
  {
    id: "mention-2",
    planId: "plan-2",
    mentionedBy: "Ameena",
    mentionedTo: "Kai",
    message: "@Kai Can you review the design drops recap copy?",
    at: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    resolved: true,
  },
  {
    id: "mention-3",
    planId: "plan-3",
    mentionedBy: "Kai",
    mentionedTo: "Leo",
    message: "@Leo Pull new community shots for reel slots 2 and 3",
    at: new Date(Date.now() - 1000 * 60 * 145).toISOString(),
    resolved: false,
  },
];

export const collaborationChecklists = [
  {
    id: "checklist-1",
    planId: "plan-1",
    title: "Pre-launch checklist",
    items: [
      { id: "item-1", label: "Final copy review", checked: true, assignedTo: "Kai" },
      { id: "item-2", label: "Asset upload", checked: true, assignedTo: "Leo" },
      { id: "item-3", label: "Wallet signature prep", checked: false, assignedTo: "You" },
    ],
  },
  {
    id: "checklist-2",
    planId: "plan-2",
    title: "Design QA checklist",
    items: [
      { id: "item-4", label: "Typography check", checked: false, assignedTo: "Leo" },
      { id: "item-5", label: "Color contrast", checked: false, assignedTo: "Leo" },
      { id: "item-6", label: "Mobile preview", checked: false, assignedTo: "Ameena" },
    ],
  },
];

export const collaborationHandoffs = [
  {
    id: "handoff-1",
    planId: "plan-1",
    from: "Kai",
    to: "You",
    action: "Request wallet signature",
    status: "pending",
    at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "handoff-2",
    planId: "plan-3",
    from: "Leo",
    to: "Ameena",
    action: "Request asset upload",
    status: "completed",
    at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
];

export const realTimeActivity = [
  {
    id: "activity-1",
    user: "Ameena",
    action: "approved",
    target: "Founder AMA teaser",
    timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    type: "workflow",
  },
  {
    id: "activity-2",
    user: "Kai",
    action: "scheduled",
    target: "Design drops recap",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    type: "post",
  },
  {
    id: "activity-3",
    user: "Leo",
    action: "uploaded",
    target: "Creator highlight reel",
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    type: "asset",
  },
  {
    id: "activity-4",
    user: "You",
    action: "commented",
    target: "Product launch post",
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    type: "comment",
  },
];



export const crisisAlerts = [
  {
    id: "crisis-1",
    title: "Negative sentiment spike detected",
    severity: "high",
    source: "farcaster",
    mentions: 45,
    sentiment: "negative",
    detectedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    status: "active",
  },
  {
    id: "crisis-2",
    title: "Competitor comparison trending",
    severity: "medium",
    source: "instagram",
    mentions: 23,
    sentiment: "neutral",
    detectedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    status: "monitoring",
  },
];

export const crisisResponseTemplates = [
  {
    id: "template-1",
    name: "Apology Response",
    content: "We apologize for any inconvenience. Our team is looking into this matter.",
    category: "apology",
    uses: 12,
  },
  {
    id: "template-2",
    name: "Clarification Response",
    content: "Thank you for bringing this to our attention. Let us clarify...",
    category: "clarification",
    uses: 8,
  },
  {
    id: "template-3",
    name: "Escalation Response",
    content: "We understand your concern. Please contact our support team directly.",
    category: "escalation",
    uses: 5,
  },
];

export const crisisStats = {
  activeCrises: 1,
  resolvedToday: 3,
  avgResponseTime: "15 minutes",
  satisfactionRate: 85,
};


import type {
  AiActivityEntry,
  AiDraftIdea,
  AiPersona,
  AiSmartReply,
  AiToneOption,
  ChannelId,
} from "@/types/publishing";

export const aiToneOptions: AiToneOption[] = [
  {
    id: "confident",
    label: "Confident",
    description: "Direct, upbeat copy for launches and bold announcements.",
  },
  {
    id: "friendly",
    label: "Friendly",
    description: "Warm tone to humanize updates and community shoutouts.",
  },
  {
    id: "analytical",
    label: "Analytical",
    description: "Data-forward voice for performance threads and recaps.",
  },
  {
    id: "playful",
    label: "Playful",
    description: "Light and witty for memes, teasers, and hype reels.",
  },
];

export const aiPersonas: AiPersona[] = [
  {
    id: "founder",
    label: "Founder POV",
    summary: "Highlights vision, roadmap, and strategic takeaways.",
  },
  {
    id: "community",
    label: "Community Squad",
    summary: "Amplifies wins, spotlights creators, and invites feedback.",
  },
  {
    id: "product",
    label: "Product Updates",
    summary: "Explains new features, guides users, and asks for inputs.",
  },
];

export const aiDraftIdeas: AiDraftIdea[] = [
  {
    id: "idea-1",
    headline: "Post-launch gratitude thread",
    snippet:
      "Huge thanks to everyone who joined today's AMA—here are three takeaways we promised, plus a Carrot on what's next.",
  },
  {
    id: "idea-2",
    headline: "Tease tomorrow's drop",
    snippet:
      "Tomorrow we unbox our creator analytics hub. Get ready for KPI snapshots, auto exports, and sentiment overlays.",
  },
  {
    id: "idea-3",
    headline: "Community highlight reel",
    snippet:
      "We spotlighted 5 builders who grew >20% this month. Here's the combo of tactics they used and templates to remix.",
  },
];

export const aiSmartReplies: AiSmartReply[] = [
  {
    id: "reply-1",
    channel: "farcaster" as ChannelId,
    author: "Jess C.",
    message: "Loved the new onboarding deck—does it cover campaign sequencing?",
    suggestion:
      "Thanks Jess! Yes—slides 6-8 walk through the sequencing playbook. Happy to DM a version tailored for your team.",
  },
  {
    id: "reply-2",
    channel: "lens" as ChannelId,
    author: "BuilderDAO",
    message: "Seeing inconsistent analytics exports this week.",
    suggestion:
      "Great question. CSV exports ship with the next release—shoot me your email and I'll add you to the early group.",
  },
  {
    id: "reply-3",
    channel: "x" as ChannelId,
    author: "Nova",
    message: "Can we try the AI tone tweaks on custom workflows?",
    suggestion:
      "We're testing custom tone training with a few teams right now. DM me your use case and I'll loop you in.",
  },
];

export const aiActivityLog: AiActivityEntry[] = [
  {
    id: "activity-1",
    action: "Tone adjustment",
    detail: "Shifted the AMA recap to the confident tone template.",
    timestamp: "2 min ago",
  },
  {
    id: "activity-2",
    action: "Auto draft",
    detail: "Generated draft for next week's creator spotlight.",
    timestamp: "12 min ago",
  },
  {
    id: "activity-3",
    action: "Smart reply",
    detail: "Suggested Lens response for BuilderDAO.",
    timestamp: "25 min ago",
  },
];


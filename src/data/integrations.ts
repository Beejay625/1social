import type { Integration } from "@/types/publishing";

export const integrationsAvailable: Integration[] = [
  {
    id: "integ-1",
    name: "Google Analytics",
    description: "Sync audience insights and conversion data.",
    status: "connected",
    icon: "GA",
  },
  {
    id: "integ-2",
    name: "Slack",
    description: "Get alerts and updates in your workspace.",
    status: "connected",
    icon: "SL",
  },
  {
    id: "integ-3",
    name: "Zapier",
    description: "Automate workflows with 5000+ apps.",
    status: "available",
    icon: "ZP",
  },
  {
    id: "integ-4",
    name: "Notion",
    description: "Export reports and sync content calendar.",
    status: "available",
    icon: "NO",
  },
];


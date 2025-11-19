export interface ContentTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  platforms: string[];
  usageCount: number;
  lastUsed: string;
  variables: string[];
  preview: string;
}

export interface TemplateCategory {
  id: string;
  name: string;
  count: number;
  icon: string;
}

export const contentTemplates: ContentTemplate[] = [
  {
    id: "template-1",
    name: "Product Launch Announcement",
    category: "Announcements",
    description: "Template for announcing new product launches",
    platforms: ["farcaster", "x", "instagram"],
    usageCount: 45,
    lastUsed: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    variables: ["productName", "launchDate", "features"],
    preview: "🚀 Exciting news! We're launching {productName} on {launchDate}! Features: {features}",
  },
  {
    id: "template-2",
    name: "Weekly Update Thread",
    category: "Updates",
    description: "Template for weekly team updates",
    platforms: ["farcaster", "x"],
    usageCount: 32,
    lastUsed: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    variables: ["weekNumber", "highlights"],
    preview: "📊 Week {weekNumber} Update:\n\n{highlights}",
  },
];

export const templateCategories: TemplateCategory[] = [
  { id: "announcements", name: "Announcements", count: 12, icon: "📢" },
  { id: "updates", name: "Updates", count: 8, icon: "📊" },
  { id: "promotions", name: "Promotions", count: 15, icon: "🎉" },
  { id: "educational", name: "Educational", count: 10, icon: "📚" },
];

export const templateStats = {
  totalTemplates: 45,
  totalUsage: 1240,
  mostUsed: "Product Launch Announcement",
  avgUsagePerTemplate: 27.5,
};







export const contentTemplates = [
  {
    id: "template-1",
    name: "Product Announcement",
    category: "marketing",
    platforms: ["farcaster", "instagram", "x"],
    usage: 45,
    lastUsed: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: "template-2",
    name: "Behind the Scenes",
    category: "content",
    platforms: ["instagram", "farcaster"],
    usage: 32,
    lastUsed: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: "template-3",
    name: "User Testimonial",
    category: "social-proof",
    platforms: ["farcaster", "x", "lens"],
    usage: 28,
    lastUsed: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
];

export const templateCategories = [
  { id: "marketing", label: "Marketing", count: 12 },
  { id: "content", label: "Content", count: 8 },
  { id: "social-proof", label: "Social Proof", count: 6 },
];

export const templateStats = {
  totalTemplates: 26,
  mostUsed: "Product Announcement",
  avgUsage: 35,
};


export interface ContentAsset {
  id: string;
  name: string;
  type: "image" | "video" | "document" | "audio" | "template";
  url: string;
  thumbnail?: string;
  size: number;
  format: string;
  uploadedAt: string;
  uploadedBy: string;
  tags: string[];
  usageCount: number;
  lastUsed?: string;
  metadata?: {
    dimensions?: { width: number; height: number };
    duration?: number;
    durationFormatted?: string;
  };
}

export interface ContentFolder {
  id: string;
  name: string;
  description?: string;
  assetCount: number;
  createdAt: string;
  color?: string;
}

export const contentAssets: ContentAsset[] = [
  {
    id: "asset-1",
    name: "Product Launch Banner",
    type: "image",
    url: "/assets/product-launch-banner.jpg",
    thumbnail: "/assets/thumbnails/product-launch-banner.jpg",
    size: 2450000,
    format: "jpg",
    uploadedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    uploadedBy: "Sarah Chen",
    tags: ["product", "launch", "banner"],
    usageCount: 12,
    lastUsed: new Date(Date.now() - 86400000 * 2).toISOString(),
    metadata: {
      dimensions: { width: 1920, height: 1080 },
    },
  },
  {
    id: "asset-2",
    name: "Tutorial Video - Getting Started",
    type: "video",
    url: "/assets/tutorial-getting-started.mp4",
    thumbnail: "/assets/thumbnails/tutorial-getting-started.jpg",
    size: 45600000,
    format: "mp4",
    uploadedAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    uploadedBy: "Mike Johnson",
    tags: ["tutorial", "video", "getting-started"],
    usageCount: 8,
    lastUsed: new Date(Date.now() - 86400000 * 3).toISOString(),
    metadata: {
      duration: 180,
      durationFormatted: "3:00",
    },
  },
  {
    id: "asset-3",
    name: "Brand Guidelines PDF",
    type: "document",
    url: "/assets/brand-guidelines.pdf",
    thumbnail: "/assets/thumbnails/brand-guidelines.jpg",
    size: 3200000,
    format: "pdf",
    uploadedAt: new Date(Date.now() - 86400000 * 30).toISOString(),
    uploadedBy: "Emma Wilson",
    tags: ["brand", "guidelines", "document"],
    usageCount: 45,
    lastUsed: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "asset-4",
    name: "Social Media Template - Announcement",
    type: "template",
    url: "/assets/templates/announcement.psd",
    thumbnail: "/assets/thumbnails/announcement-template.jpg",
    size: 12000000,
    format: "psd",
    uploadedAt: new Date(Date.now() - 86400000 * 15).toISOString(),
    uploadedBy: "Sarah Chen",
    tags: ["template", "announcement", "design"],
    usageCount: 23,
    lastUsed: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
];

export const contentFolders: ContentFolder[] = [
  {
    id: "folder-1",
    name: "Product Assets",
    description: "All product-related images and videos",
    assetCount: 45,
    createdAt: new Date(Date.now() - 2592000000).toISOString(),
    color: "#3b82f6",
  },
  {
    id: "folder-2",
    name: "Templates",
    description: "Reusable content templates",
    assetCount: 28,
    createdAt: new Date(Date.now() - 1728000000).toISOString(),
    color: "#8b5cf6",
  },
  {
    id: "folder-3",
    name: "Brand Assets",
    description: "Logos, brand guidelines, and brand materials",
    assetCount: 32,
    createdAt: new Date(Date.now() - 2592000000).toISOString(),
    color: "#10b981",
  },
];

export const contentLibraryStats = {
  totalAssets: 156,
  totalSize: 2340000000,
  totalSizeFormatted: "2.34 GB",
  mostUsedAsset: "Product Launch Banner",
  recentUploads: 8,
};


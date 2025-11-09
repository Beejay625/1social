export interface ContentAsset {
  id: string;
  name: string;
  type: "image" | "video" | "document" | "template";
  category: string;
  url: string;
  thumbnail?: string;
  size: string;
  uploadedAt: string;
  uploadedBy: string;
  tags: string[];
  usageCount: number;
  lastUsed?: string;
}

export interface ContentCategory {
  id: string;
  name: string;
  description: string;
  assetCount: number;
  icon: string;
}

export const contentLibrary: ContentAsset[] = [
  {
    id: "asset-1",
    name: "Product Launch Banner",
    type: "image",
    category: "Marketing",
    url: "/assets/product-banner.jpg",
    thumbnail: "/assets/thumbnails/product-banner.jpg",
    size: "2.4 MB",
    uploadedAt: new Date(Date.now() - 2592000000).toISOString(),
    uploadedBy: "Sarah Chen",
    tags: ["product", "launch", "banner"],
    usageCount: 12,
    lastUsed: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "asset-2",
    name: "Tutorial Video",
    type: "video",
    category: "Educational",
    url: "/assets/tutorial-video.mp4",
    thumbnail: "/assets/thumbnails/tutorial-video.jpg",
    size: "45.8 MB",
    uploadedAt: new Date(Date.now() - 1728000000).toISOString(),
    uploadedBy: "Mike Johnson",
    tags: ["tutorial", "video", "educational"],
    usageCount: 8,
    lastUsed: new Date(Date.now() - 172800000).toISOString(),
  },
];

export const contentCategories: ContentCategory[] = [
  {
    id: "marketing",
    name: "Marketing",
    description: "Marketing materials and promotional content",
    assetCount: 45,
    icon: "📢",
  },
  {
    id: "educational",
    name: "Educational",
    description: "Tutorials and educational content",
    assetCount: 23,
    icon: "📚",
  },
  {
    id: "templates",
    name: "Templates",
    description: "Reusable content templates",
    assetCount: 34,
    icon: "📝",
  },
];

export const libraryStats = {
  totalAssets: 156,
  totalSize: "2.4 GB",
  mostUsedCategory: "Marketing",
  recentUploads: 8,
};

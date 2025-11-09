export interface ContentTemplate {
  id: string;
  name: string;
  description: string;
  category: "announcement" | "promotional" | "educational" | "engagement" | "news";
  content: string;
  variables: TemplateVariable[];
  usageCount: number;
  lastUsed: string;
  createdAt: string;
  tags: string[];
  platforms: string[];
}

export interface TemplateVariable {
  name: string;
  type: "text" | "number" | "date" | "url" | "hashtag";
  required: boolean;
  defaultValue?: string;
  placeholder: string;
}

export interface TemplateCategory {
  id: string;
  name: string;
  description: string;
  templateCount: number;
  icon: string;
}

export const templateLibrary: ContentTemplate[] = [
  {
    id: "template-1",
    name: "Product Launch",
    description: "Template for announcing new product launches",
    category: "announcement",
    content: "🎉 Exciting news! We're launching {productName} - {description}. Get early access: {link} #ProductLaunch #Innovation",
    variables: [
      {
        name: "productName",
        type: "text",
        required: true,
        placeholder: "Product Name",
      },
      {
        name: "description",
        type: "text",
        required: true,
        placeholder: "Brief description",
      },
      {
        name: "link",
        type: "url",
        required: true,
        placeholder: "https://...",
      },
    ],
    usageCount: 45,
    lastUsed: new Date(Date.now() - 86400000).toISOString(),
    createdAt: new Date(Date.now() - 2592000000).toISOString(),
    tags: ["launch", "product", "announcement"],
    platforms: ["farcaster", "x", "instagram"],
  },
  {
    id: "template-2",
    name: "Weekly Update",
    description: "Template for weekly team updates",
    category: "news",
    content: "📊 Weekly Update: {summary}. Key highlights: {highlights}. Read more: {link}",
    variables: [
      {
        name: "summary",
        type: "text",
        required: true,
        placeholder: "Brief summary",
      },
      {
        name: "highlights",
        type: "text",
        required: false,
        placeholder: "Key highlights",
      },
      {
        name: "link",
        type: "url",
        required: false,
        placeholder: "https://...",
      },
    ],
    usageCount: 89,
    lastUsed: new Date(Date.now() - 3600000).toISOString(),
    createdAt: new Date(Date.now() - 1728000000).toISOString(),
    tags: ["update", "weekly", "news"],
    platforms: ["farcaster", "x"],
  },
];

export const templateCategories: TemplateCategory[] = [
  {
    id: "announcement",
    name: "Announcements",
    description: "Product launches, updates, and major announcements",
    templateCount: 12,
    icon: "📢",
  },
  {
    id: "promotional",
    name: "Promotional",
    description: "Sales, offers, and promotional content",
    templateCount: 8,
    icon: "🎯",
  },
  {
    id: "educational",
    name: "Educational",
    description: "Tutorials, tips, and educational content",
    templateCount: 15,
    icon: "📚",
  },
  {
    id: "engagement",
    name: "Engagement",
    description: "Questions, polls, and engagement posts",
    templateCount: 10,
    icon: "💬",
  },
];


export const brandGuidelines = {
  logo: {
    primary: "/logo-primary.svg",
    secondary: "/logo-secondary.svg",
    usage: "Use primary logo on light backgrounds, secondary on dark",
  },
  colors: {
    primary: "#8B5CF6",
    secondary: "#EC4899",
    accent: "#10B981",
    dark: "#0F172A",
  },
  typography: {
    heading: "Inter",
    body: "Inter",
    mono: "JetBrains Mono",
  },
  spacing: {
    unit: 4,
    scale: [4, 8, 12, 16, 24, 32, 48, 64],
  },
};

export const brandAssets = [
  {
    id: "asset-1",
    name: "Logo - SVG",
    type: "logo",
    format: "svg",
    size: "12 KB",
    downloadUrl: "#",
  },
  {
    id: "asset-2",
    name: "Logo - PNG (White)",
    type: "logo",
    format: "png",
    size: "45 KB",
    downloadUrl: "#",
  },
  {
    id: "asset-3",
    name: "Brand Colors Palette",
    type: "colors",
    format: "json",
    size: "2 KB",
    downloadUrl: "#",
  },
  {
    id: "asset-4",
    name: "Social Media Templates",
    type: "template",
    format: "psd",
    size: "2.4 MB",
    downloadUrl: "#",
  },
];

export const brandUsage = [
  {
    id: "usage-1",
    platform: "Website",
    instances: 12,
    lastUsed: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "usage-2",
    platform: "Social Media",
    instances: 45,
    lastUsed: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "usage-3",
    platform: "Email",
    instances: 8,
    lastUsed: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
];


export interface BrandingSettings {
  id: string;
  name: string;
  logo: {
    light: string;
    dark: string;
    favicon: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  typography: {
    fontFamily: string;
    headingFont?: string;
  };
  customDomain?: string;
  status: "active" | "draft" | "archived";
  updatedAt: string;
}

export interface WhiteLabelFeature {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  category: "branding" | "domain" | "email" | "support";
}

export const brandingSettings: BrandingSettings[] = [
  {
    id: "branding-1",
    name: "Default Branding",
    logo: {
      light: "/logos/logo-light.svg",
      dark: "/logos/logo-dark.svg",
      favicon: "/logos/favicon.ico",
    },
    colors: {
      primary: "#8B5CF6",
      secondary: "#EC4899",
      accent: "#10B981",
      background: "#0F172A",
      text: "#FFFFFF",
    },
    typography: {
      fontFamily: "Inter",
      headingFont: "Inter",
    },
    status: "active",
    updatedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: "branding-2",
    name: "Client Branding",
    logo: {
      light: "/logos/client-logo-light.svg",
      dark: "/logos/client-logo-dark.svg",
      favicon: "/logos/client-favicon.ico",
    },
    colors: {
      primary: "#3B82F6",
      secondary: "#1E40AF",
      accent: "#60A5FA",
      background: "#1E293B",
      text: "#F1F5F9",
    },
    typography: {
      fontFamily: "Roboto",
      headingFont: "Roboto",
    },
    customDomain: "client.1social.app",
    status: "active",
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
];

export const whiteLabelFeatures: WhiteLabelFeature[] = [
  {
    id: "feature-1",
    name: "Custom Logo",
    description: "Upload custom logos for light and dark themes",
    enabled: true,
    category: "branding",
  },
  {
    id: "feature-2",
    name: "Custom Domain",
    description: "Use your own domain for the platform",
    enabled: true,
    category: "domain",
  },
  {
    id: "feature-3",
    name: "Custom Email Templates",
    description: "Branded email templates for notifications",
    enabled: true,
    category: "email",
  },
  {
    id: "feature-4",
    name: "Custom Support Portal",
    description: "White-label support portal with your branding",
    enabled: false,
    category: "support",
  },
];

export const whiteLabelStats = {
  activeBrandings: 2,
  customDomains: 1,
  enabledFeatures: 3,
  totalBrandings: 5,
};

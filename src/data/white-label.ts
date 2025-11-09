export interface BrandingConfig {
  id: string;
  name: string;
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  customDomain?: string;
  favicon?: string;
  status: "active" | "pending" | "inactive";
}

export interface WhiteLabelFeature {
  id: string;
  name: string;
  enabled: boolean;
  description: string;
}

export const brandingConfig: BrandingConfig = {
  id: "brand-1",
  name: "Company Branding",
  logo: "/branding/logo.png",
  primaryColor: "#3B82F6",
  secondaryColor: "#8B5CF6",
  fontFamily: "Inter",
  customDomain: "social.company.com",
  favicon: "/branding/favicon.ico",
  status: "active",
};

export const whiteLabelFeatures: WhiteLabelFeature[] = [
  {
    id: "feature-1",
    name: "Custom Logo",
    enabled: true,
    description: "Replace default logo with your brand logo",
  },
  {
    id: "feature-2",
    name: "Custom Colors",
    enabled: true,
    description: "Customize primary and secondary brand colors",
  },
  {
    id: "feature-3",
    name: "Custom Domain",
    enabled: true,
    description: "Use your own domain name",
  },
  {
    id: "feature-4",
    name: "Custom Email Templates",
    enabled: false,
    description: "Branded email notifications and reports",
  },
  {
    id: "feature-5",
    name: "Remove Branding",
    enabled: true,
    description: "Remove all platform branding elements",
  },
];

export const whiteLabelStats = {
  customizationLevel: 85,
  featuresEnabled: 4,
  totalFeatures: 5,
  lastUpdated: new Date(Date.now() - 86400000 * 3).toISOString(),
};

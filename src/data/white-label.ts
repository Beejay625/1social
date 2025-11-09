export const whiteLabelSettings = {
  enabled: true,
  brandName: "Your Brand",
  logo: "/custom-logo.svg",
  primaryColor: "#8B5CF6",
  secondaryColor: "#EC4899",
  customDomain: "app.yourbrand.com",
  emailFrom: "noreply@yourbrand.com",
};

export const customizationOptions = [
  {
    id: "option-1",
    name: "Logo",
    type: "image",
    value: "/custom-logo.svg",
    editable: true,
  },
  {
    id: "option-2",
    name: "Primary Color",
    type: "color",
    value: "#8B5CF6",
    editable: true,
  },
  {
    id: "option-3",
    name: "Favicon",
    type: "image",
    value: "/favicon.ico",
    editable: true,
  },
  {
    id: "option-4",
    name: "Email Templates",
    type: "template",
    value: "custom",
    editable: true,
  },
];

export const domainSettings = [
  {
    id: "domain-1",
    domain: "app.yourbrand.com",
    status: "active",
    ssl: true,
    lastVerified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: "domain-2",
    domain: "social.yourbrand.com",
    status: "pending",
    ssl: false,
    lastVerified: null,
  },
];


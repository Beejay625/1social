export const mobileApps = [
  {
    id: "ios",
    platform: "iOS",
    version: "2.4.0",
    downloads: 12500,
    rating: 4.7,
    reviews: 342,
    status: "active",
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: "android",
    platform: "Android",
    version: "2.4.0",
    downloads: 18900,
    rating: 4.5,
    reviews: 521,
    status: "active",
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
];

export const mobileFeatures = [
  {
    id: "feature-1",
    name: "Push notifications",
    enabled: true,
    description: "Get notified about post performance and mentions",
  },
  {
    id: "feature-2",
    name: "Offline mode",
    enabled: true,
    description: "Draft posts without internet connection",
  },
  {
    id: "feature-3",
    name: "Quick publish",
    enabled: true,
    description: "Publish directly from mobile camera",
  },
  {
    id: "feature-4",
    name: "Biometric auth",
    enabled: false,
    description: "Secure login with Face ID or fingerprint",
  },
];

export const deviceStats = [
  {
    device: "iPhone",
    users: 45,
    percentage: 45,
  },
  {
    device: "Android",
    users: 38,
    percentage: 38,
  },
  {
    device: "Desktop",
    users: 17,
    percentage: 17,
  },
];


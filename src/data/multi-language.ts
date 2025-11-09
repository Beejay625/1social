export const supportedLanguages = [
  { code: "en", name: "English", nativeName: "English", isDefault: true },
  { code: "es", name: "Spanish", nativeName: "Español", isDefault: false },
  { code: "fr", name: "French", nativeName: "Français", isDefault: false },
  { code: "de", name: "German", nativeName: "Deutsch", isDefault: false },
  { code: "pt", name: "Portuguese", nativeName: "Português", isDefault: false },
  { code: "ja", name: "Japanese", nativeName: "日本語", isDefault: false },
  { code: "zh", name: "Chinese", nativeName: "中文", isDefault: false },
  { code: "ko", name: "Korean", nativeName: "한국어", isDefault: false },
];

export const multilingualContent = [
  {
    id: "content-1",
    originalLanguage: "en",
    title: "Product Launch Announcement",
    translations: [
      {
        language: "es",
        title: "Anuncio de Lanzamiento de Producto",
        status: "published",
        platform: "farcaster",
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
        engagement: 234,
      },
      {
        language: "fr",
        title: "Annonce de Lancement de Produit",
        status: "scheduled",
        platform: "x",
        scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
      },
      {
        language: "de",
        title: "Produktstart-Ankündigung",
        status: "draft",
        platform: "instagram",
      },
    ],
  },
  {
    id: "content-2",
    originalLanguage: "en",
    title: "Weekly Update",
    translations: [
      {
        language: "es",
        title: "Actualización Semanal",
        status: "published",
        platform: "x",
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
        engagement: 156,
      },
      {
        language: "ja",
        title: "週次アップデート",
        status: "published",
        platform: "lens",
        publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
        engagement: 89,
      },
    ],
  },
];

export const languagePerformance = [
  {
    language: "en",
    posts: 245,
    engagement: 1850,
    avgEngagement: 7.55,
    reach: 12500,
    growth: 12.5,
  },
  {
    language: "es",
    posts: 89,
    engagement: 712,
    avgEngagement: 8.0,
    reach: 8900,
    growth: 18.2,
  },
  {
    language: "fr",
    posts: 56,
    engagement: 445,
    avgEngagement: 7.95,
    reach: 5600,
    growth: 15.8,
  },
  {
    language: "de",
    posts: 34,
    engagement: 267,
    avgEngagement: 7.85,
    reach: 3400,
    growth: 22.1,
  },
  {
    language: "ja",
    posts: 23,
    engagement: 189,
    avgEngagement: 8.22,
    reach: 2300,
    growth: 28.5,
  },
];

export const translationStatus = {
  totalContent: 456,
  translated: 312,
  translationRate: 68.4,
  pending: 89,
  inProgress: 55,
  byLanguage: [
    { language: "es", translated: 145, pending: 23 },
    { language: "fr", translated: 98, pending: 15 },
    { language: "de", translated: 45, pending: 12 },
    { language: "ja", translated: 24, pending: 8 },
  ],
};

export const translationWorkflow = [
  {
    step: 1,
    name: "Content Creation",
    status: "completed",
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    step: 2,
    name: "AI Translation",
    status: "completed",
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    step: 3,
    name: "Human Review",
    status: "in_progress",
    assignedTo: "Sarah Chen",
    dueAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    step: 4,
    name: "Localization",
    status: "pending",
  },
  {
    step: 5,
    name: "Publish",
    status: "pending",
  },
];

export const localizationSettings = {
  autoTranslate: true,
  requireReview: true,
  targetLanguages: ["es", "fr", "de", "ja"],
  translationProvider: "ai_with_human_review",
  culturalAdaptation: true,
  timezoneHandling: "local",
};


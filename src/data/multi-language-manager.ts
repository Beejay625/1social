export interface LanguageContent {
  id: string;
  originalId: string;
  language: string;
  content: string;
  status: "draft" | "translated" | "reviewed" | "published";
  translator: string;
  translatedAt: string;
  qualityScore: number;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  enabled: boolean;
  contentCount: number;
}

export const languageContents: LanguageContent[] = [
  {
    id: "lang-1",
    originalId: "content-123",
    language: "es",
    content: "¡Anuncio emocionante! Estamos lanzando nuestro nuevo producto...",
    status: "translated",
    translator: "AI Translator",
    translatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    qualityScore: 95,
  },
  {
    id: "lang-2",
    originalId: "content-123",
    language: "fr",
    content: "Annonce excitante ! Nous lançons notre nouveau produit...",
    status: "reviewed",
    translator: "AI Translator",
    translatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    qualityScore: 92,
  },
];

export const supportedLanguages: Language[] = [
  { code: "en", name: "English", nativeName: "English", enabled: true, contentCount: 450 },
  { code: "es", name: "Spanish", nativeName: "Español", enabled: true, contentCount: 320 },
  { code: "fr", name: "French", nativeName: "Français", enabled: true, contentCount: 280 },
  { code: "de", name: "German", nativeName: "Deutsch", enabled: true, contentCount: 195 },
  { code: "ja", name: "Japanese", nativeName: "日本語", enabled: true, contentCount: 150 },
];

export const languageStats = {
  totalLanguages: 5,
  totalTranslations: 1395,
  avgQualityScore: 93.2,
  pendingTranslations: 12,
  mostTranslatedLanguage: "Spanish",
};


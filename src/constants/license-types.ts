export const LICENSE_TYPES = {
  CC0: 'CC0',
  CC_BY: 'CC-BY',
  CC_BY_SA: 'CC-BY-SA',
  COMMERCIAL: 'commercial',
} as const;

export type LicenseType = typeof LICENSE_TYPES[keyof typeof LICENSE_TYPES];


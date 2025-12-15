export enum ConsolePlatform {
  XBOX_360 = 'Xbox 360',
  XBOX_ORIGINAL = 'Original Xbox',
}

export interface Game {
  id: string;
  title: string;
  publisher: string;
  platform: ConsolePlatform;
  dateAdded: string;
  fpsBoost: string | null; // "N", "60hz", "120hz", or null/undefined
  format?: string; // e.g., "XBLA", "Disc Only"
}
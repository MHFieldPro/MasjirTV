
export enum MediaType {
  IMAGE = 'image',
  PRAYER_TABLE = 'prayer_table',
}

export interface PrayerSchedule {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  date?: string;
}

export interface SlideItem {
  id: string;
  type: MediaType;
  url: string;
  duration: number; // Duration in milliseconds
  title?: string;
  description?: string;
  source: string; // Origin identifier for verification
  data?: any; // For custom component data
}

export interface NewsItem {
  id: string;
  text: string;
  category: string;
}

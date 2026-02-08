
export enum MediaType {
  IMAGE = 'image',
  PRAYER_TABLE = 'prayer_table',
  VIDEO = 'video',
  CUSTOM_PAGE = 'custom_page',
}

export interface PrayerTime {
  adhan: string;
  iqama?: string;
}

export interface PrayerSchedule {
  fajr: string | PrayerTime;
  sunrise: string | PrayerTime;
  dhuhr: string | PrayerTime;
  asr: string | PrayerTime;
  maghrib: string | PrayerTime;
  isha: string | PrayerTime;
  date?: string;
}

export interface SlideItem {
  id: string;
  type: MediaType;
  url?: string; // Optional for custom pages/videos
  duration: number; // Duration in milliseconds
  title?: string;
  description?: string;
  source: string; // Origin identifier for verification
  data?: any; // For custom component data
  component?: React.ComponentType<any>; // For custom React pages
  hideNewsBar?: boolean; // Optional: hide news bar when this slide is active
}

export interface NewsItem {
  id: string;
  text: string;
  category: string;
}


import { MediaType, SlideItem, NewsItem } from '../types';

// Static fallback prayer times (Calgary example)
export const CALGARY_PRAYER_SCHEDULE = {
  fajr: '6:30',
  sunrise: '7:30',
  dhuhr: '2:30',
  asr: '4:10',
  maghrib: '7:34',
  isha: '8:40',
  date: '2026-01-24'
};

export const GALLERY_IMAGES: SlideItem[] = [
  {
    id: 'g1',
    type: MediaType.IMAGE,
    url: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=1920&h=1080',
    duration: 8000,
    title: 'Community Gallery',
    description: 'Recent highlights from our library.',
    source: 'Cloud Assets'
  },
    {
      id: 'g4',
      type: MediaType.IMAGE,
      url: 'https://ministrypass-prod.s3.amazonaws.com/uploads/2019/04/Please-Silence-Your-Mobile-Device-Minimalist_Title-Slide-1.jpg',
      duration: 8000,
      title: 'Please Silence Your Mobile Device',
      description: 'Reminder for attendees.',
      source: 'Ministry Pass'
    },
  {
    id: 'g2',
    type: MediaType.IMAGE,
    url: 'https://d1dncmkdpaif79.cloudfront.net/public/dev.hamitay@gmail.com/image/abuu%20huraira%20parking1.png',
    duration: 8000,
    title: 'Collaborative Spaces',
    description: 'Enhancing productivity through design.',
    source: 'Local Folder'
  },
  {
    id: 'g3',
    type: MediaType.IMAGE,
    url: 'https://tse4.mm.bing.net/th/id/OIP.0raxKyzINQZvN3b_Z-YksQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',
    duration: 8000,
    title: 'Modern Architecture',
    description: 'Our new facility extension.',
    source: 'Cloud Assets'
  }
];

export const MOCK_NEWS: NewsItem[] = [
  { id: 'n1', text: 'Important: Annual community meeting moved to Hall B at 7 PM tonight.', category: 'COMMUNITY' },
  { id: 'n2', text: 'New educational classes starting this Monday for all ages. Register online.', category: 'CLASSES' },
  { id: 'n3', text: 'Prayer times adjusted for the coming week. Please check the latest schedule.', category: 'PRAYER' },
  { id: 'n4', text: 'Ramadan 2025 preparations are underway. Volunteer opportunities available.', category: 'RAMADAN' },
  { id: 'n5', text: 'Weekly maintenance scheduled for Sunday at 12:00 AM. Systems may be offline.', category: 'DEFAULT' },
];

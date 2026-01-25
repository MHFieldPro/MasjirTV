
import { MediaType, SlideItem, NewsItem } from '../types';

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
    id: 'g2',
    type: MediaType.IMAGE,
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1920&h=1080',
    duration: 8000,
    title: 'Collaborative Spaces',
    description: 'Enhancing productivity through design.',
    source: 'Local Folder'
  },
  {
    id: 'g3',
    type: MediaType.IMAGE,
    url: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&q=80&w=1920&h=1080',
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

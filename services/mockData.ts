
import { MediaType, SlideItem, NewsItem } from '../types';

// Static fallback prayer times (Calgary example)
export const CALGARY_PRAYER_SCHEDULE = {
  fajr: { adhan: '6:33 AM', iqama: '7:00 AM' },
  sunrise: { adhan: '8:03 AM' },
  dhuhr: { adhan: '12:50 PM', iqama: '1:00 PM' },
  asr: { adhan: '3:11 PM', iqama: '3:30 PM' },
  maghrib: { adhan: '5:38 PM', iqama: '5:48 PM' },
  isha: { adhan: '7:08 PM', iqama: '7:30 PM' },
  date: '2026-02-07'
};

export const GALLERY_IMAGES: SlideItem[] = [
  {
    id: 'sample-image',
    type: MediaType.IMAGE,
    url: 'https://d1dncmkdpaif79.cloudfront.net/public/dev.hamitay@gmail.com/image/donation11.gif',
    duration: 8000,
    title: 'Sample Image',
    description: 'This is a test slide with overlays.',
    source: '',
     hideNewsBar: false
  },//,
  // {
  //   id: 'g1',
  //   type: MediaType.IMAGE,
  //   url: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=1920&h=1080',
  //   duration: 8000,
  //   title: 'Community Gallery',
  //   description: 'Recent highlights from our library.',
  //   source: 'Cloud Assets'
  // },
  // {
  //   id: 'g4',
  //   type: MediaType.IMAGE,
  //   url: 'https://ministrypass-prod.s3.amazonaws.com/uploads/2019/04/Please-Silence-Your-Mobile-Device-Minimalist_Title-Slide-1.jpg',
  //   duration: 8000,
  //   title: 'Please Silence Your Mobile Device',
  //   description: 'Reminder for attendees.',
  //   source: 'Ministry Pass',
  //   hideNewsBar: true
  // },
  // {
  //   id: 'g2',
  //   type: MediaType.IMAGE,
  //   url: 'https://d1dncmkdpaif79.cloudfront.net/public/dev.hamitay@gmail.com/image/Masjid%20parking%20area.png',
  //   duration: 20000,
  //   title: 'Collaborative Spaces',
  //   description: 'Enhancing productivity through design.',
  //   source: 'Local Folder',
  //   hideNewsBar: false
  // },
  // {
  //   id: 'g3',
  //   type: MediaType.IMAGE,
  //   url: 'https://tse4.mm.bing.net/th/id/OIP.0raxKyzINQZvN3b_Z-YksQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',
  //   duration: 8000,
  //   title: 'Modern Architecture',
  //   description: 'Our new facility extension.',
  //   source: 'Cloud Assets'
  // }
];

export const MOCK_NEWS: NewsItem[] = [
  { id: 'n1', text: 'Important: Annual community meeting moved to Hall B at 7 PM tonight.', category: 'COMMUNITY' },
  { id: 'n2', text: 'Important: Please make sure to follow the parking rules and park only in designated parking areas.', category: 'Important' },
  { id: 'n3', text: 'New educational classes starting this Monday for all ages. Register online.', category: 'CLASSES' },
  { id: 'n4', text: 'Prayer times adjusted for the coming week. Please check the latest schedule.', category: 'PRAYER' },
  { id: 'n5', text: 'Ramadan 2025 preparations are underway. Volunteer opportunities available.', category: 'RAMADAN' },
  { id: 'n6', text: 'Weekly maintenance scheduled for Sunday at 12:00 AM. Systems may be offline.', category: 'DEFAULT' },
  { id: 'n7', text: 'Sponsor an Iftar Day! Earn immense rewards by feeding fasting brothers and sisters. Contact the office to reserve your day.', category: 'MASJID' },
  { id: 'n8', text: 'Support Your Masjid: Contribute to our monthly rent of $15,000. Set up a recurring donation of $50, $100, or any amount you can.', category: 'MASJID' },
  { id: 'n9', text: 'Masjid Monthly Budget: Rent $15,000 | Utilities $3,500 | Programs $2,000 | Maintenance $1,500. Total: $22,000. Help us meet our goal!', category: 'MASJID' },
  { id: 'n10', text: 'Every contribution counts! Your monthly support helps keep the masjid doors open for the community. May Allah reward you abundantly.', category: 'MASJID' },
];

// Ramadan Iftar Bookings
export const RAMADAN_IFTAR_BOOKINGS = [
  { day: 1, sponsors: ['Ahmed Family', 'Fatima Khan'] },
  { day: 2, sponsors: ['Omar Brothers'] },
  { day: 5, sponsors: ['Aisha Community', 'Bilal Group'] },
  { day: 7, sponsors: ['Yusuf Family'] },
  { day: 10, sponsors: ['Khadija Sisters', 'Hassan Corporation'] },
  { day: 12, sponsors: ['Ibrahim Family'] },
  { day: 15, sponsors: ['Maryam Foundation', 'Zayd Group', 'Ali Family'] },
  { day: 18, sponsors: ['Hafsa Community'] },
  { day: 20, sponsors: ['Umar Family', 'Salma Group'] },
  { day: 22, sponsors: ['Zainab Foundation'] },
  { day: 25, sponsors: ['Abdullah Brothers', 'Ruqayyah Sisters'] },
  { day: 27, sponsors: ['Community Collective', 'Laylat al-Qadr Fund'] },
  { day: 29, sponsors: ['Eid Preparation Team'] },
];

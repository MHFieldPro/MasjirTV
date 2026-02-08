
import React, { useState, useEffect, useMemo } from 'react';
import SlideCarousel from './components/SlideCarousel';
import NewsTicker from './components/NewsTicker';
import { GALLERY_IMAGES, MOCK_NEWS, CALGARY_PRAYER_SCHEDULE, RAMADAN_IFTAR_BOOKINGS } from './services/mockData';
import { fetchCICSWPrayerData, formatPrayerTicker } from './services/prayerService';
import { NewsItem, PrayerSchedule, MediaType, SlideItem } from './types';
import WelcomeSlide from './components/WelcomeSlide';
import BookingSlide from './components/BookingSlide';
import AnnouncementSlide from './components/AnnouncementSlide';
import VideoSlide from './components/VideoSlide';
import RamadanIftarSlide from './components/RamadanIftarSlide';

const App: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>(MOCK_NEWS);
  const [prayerData, setPrayerData] = useState<PrayerSchedule | null>(null);
  const [newsBarVisible, setNewsBarVisible] = useState(true);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isSilenceMode, setIsSilenceMode] = useState(false);

  // Combine dynamic prayer slide with gallery images
  const allMediaItems = useMemo(() => {
    const items: SlideItem[] = [];
    // Always show a prayer slide: use live data if available, else fallback
    items.push({
      id: 'prayer-slide',
      type: MediaType.PRAYER_TABLE,
      url: 'custom://prayer-table',
      duration: 15000, // Show for 5 seconds
      source: prayerData ? 'CICSW Live' : 'Calgary Template',
      data: prayerData || CALGARY_PRAYER_SCHEDULE
    });
    // Add custom React slides
    items.push({
      id: 'welcome-slide',
      type: MediaType.CUSTOM_PAGE,
      duration: 1000,
      source: 'Local',
      component: WelcomeSlide
    });
    // Add video slide
    items.push({
      id: 'video-slide',
      type: MediaType.CUSTOM_PAGE,
      duration: 3000, // 30 seconds
      source: 'YouTube',
      component: () => <VideoSlide videoUrl="https://www.youtube.com/watch?v=vuBu6QhMPAI" />,
      hideNewsBar: false
    });
    // Add Ramadan Iftar booking slide
    items.push({
      id: 'ramadan-iftar-slide',
      type: MediaType.CUSTOM_PAGE,
      duration: 20000, // 20 seconds
      source: 'Local',
      component: () => <RamadanIftarSlide bookings={RAMADAN_IFTAR_BOOKINGS} year={2026} />
    });
    // items.push({
    //   id: 'booking-slide',
    //   type: MediaType.CUSTOM_PAGE,
    //   duration: 10000,
    //   source: 'Local',
    //   component: BookingSlide,
    //   hideNewsBar: true
    // });
    // items.push({
    //   id: 'announcement-slide',
    //   type: MediaType.CUSTOM_PAGE,
    //   duration: 10000,
    //   source: 'Local',
    //   component: AnnouncementSlide
    // });
    // Add rest of the gallery
    items.push(...GALLERY_IMAGES);
    return items;
  }, [prayerData]);

  // Listen for slide changes and update news bar visibility
  useEffect(() => {
    const currentSlide = allMediaItems[currentSlideIndex];
    // Hide news bar if in silence mode or if the slide has hideNewsBar set
    setNewsBarVisible(isSilenceMode ? false : (currentSlide?.hideNewsBar ? false : true));
  }, [currentSlideIndex, allMediaItems, isSilenceMode]);

  useEffect(() => {
    const updatePrayerTimes = async () => {
      try {
        const data = await fetchCICSWPrayerData();
        if (data) {
          setPrayerData(data);
          const tickerString = formatPrayerTicker(data);
          
          setNewsItems(prev => {
            const filtered = prev.filter(item => item.category !== 'PRAYER');
            return [
              { 
                id: 'prayer-live', 
                text: `LIVE FROM CICSW: ${tickerString}`, 
                category: 'PRAYER' 
              },
              ...filtered
            ];
          });
        }
      } catch (err) {
        console.error("Critical error in prayer update cycle", err);
      }
    };

    updatePrayerTimes();
    const interval = setInterval(updatePrayerTimes, 3600000); // Update every 1 hour
    return () => clearInterval(interval);
  }, []);

  // (Removed timer-based hiding logic. News bar visibility is only controlled by hideNewsBar property of the current slide.)

  return (
    <div className="h-screen w-screen bg-black overflow-hidden select-none relative">
      {/* Persistent Logo Overlay */}
      <div className="absolute top-10 left-12 z-[100] pointer-events-none animate-[fadeIn_1.5s_ease-out]">
        <img 
          src="logo.png" 
          alt="Abu Huraira Logo" 
          className="h-32 w-auto object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] bg-white/10 p-4 rounded-3xl backdrop-blur-sm border border-white/5"
          onError={(e) => {
            // Fallback if logo is missing
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>

      {/* Main content area, always fills screen */}
      <div
        className="absolute top-0 left-0 w-full transition-all duration-700"
        style={{ height: newsBarVisible ? 'calc(100vh - 120px)' : '100vh', bottom: newsBarVisible ? '120px' : '0' }}
      >
        <SlideCarousel
          items={allMediaItems}
          onSlideChange={setCurrentSlideIndex}
          onSilenceChange={setIsSilenceMode}
        />
      </div>

      {/* News bar slides down/up, overlays bottom */}
      <footer
        className={`absolute left-0 w-full h-[120px] z-50 transition-transform duration-700 ${newsBarVisible ? 'translate-y-0' : 'translate-y-full'}`}
        style={{ bottom: 0 }}
      >
        <NewsTicker news={newsItems} scrollSpeed={20} />
      </footer>
    </div>
  );
};

export default App;

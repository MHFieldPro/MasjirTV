
import React, { useState, useEffect, useMemo } from 'react';
import SlideCarousel from './components/SlideCarousel';
import NewsTicker from './components/NewsTicker';
import { GALLERY_IMAGES, MOCK_NEWS, CALGARY_PRAYER_SCHEDULE } from './services/mockData';
import { fetchCICSWPrayerData, formatPrayerTicker } from './services/prayerService';
import { NewsItem, PrayerSchedule, MediaType, SlideItem } from './types';

const App: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>(MOCK_NEWS);
  const [prayerData, setPrayerData] = useState<PrayerSchedule | null>(null);

  // Combine dynamic prayer slide with gallery images
  const allMediaItems = useMemo(() => {
    const items: SlideItem[] = [];
    
    // Insert prayer table as the first slide if data is available

    // Always show a prayer slide: use live data if available, else fallback
    items.push({
      id: 'prayer-slide',
      type: MediaType.PRAYER_TABLE,
      url: 'custom://prayer-table',
      duration: 15000, // Show for 15 seconds
      source: prayerData ? 'CICSW Live' : 'Calgary Template',
      data: prayerData || CALGARY_PRAYER_SCHEDULE
    });

    // Add rest of the gallery
    items.push(...GALLERY_IMAGES);
    
    return items;
  }, [prayerData]);

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

  return (
    <div className="h-screen w-screen bg-black overflow-hidden select-none flex flex-col relative">
      
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

      {/* Content area */}
      <main className="flex-grow relative overflow-hidden">
        <SlideCarousel items={allMediaItems} />
      </main>

      {/* Footer area */}
      <footer className="h-[120px] flex-shrink-0 z-50">
        <NewsTicker news={newsItems} />
      </footer>
    </div>
  );
};

export default App;

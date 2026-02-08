
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SlideItem, MediaType } from '../types';
import PrayerTimesSlide from './PrayerTimesSlide';
import ImageSlide from './ImageSlide';
import SilencePhoneSlide from './SilencePhoneSlide';

interface SlideCarouselProps {
  items: SlideItem[];
  onSlideChange?: (index: number) => void;
  onSilenceChange?: (isSilence: boolean) => void;
  silenceDuration?: number; // Duration in minutes, default 15
}


const SlideCarousel: React.FC<SlideCarouselProps> = ({ items, onSlideChange, onSilenceChange, silenceDuration = 15 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mediaError, setMediaError] = useState<{message: string, code?: number} | null>(null);
  const [pauseUntil, setPauseUntil] = useState<number | null>(null);
  const [showSilence, setShowSilence] = useState(false);
  const [currentPrayerName, setCurrentPrayerName] = useState<string>('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentItem = items[currentIndex];

  // Helper: parse time string (e.g., '6:30 AM') to minutes since midnight
  const parseTime = (t: string) => {
    const [time, period] = t.split(' ');
    let [h, m] = time.split(':').map(Number);
    
    if (period === 'PM' && h !== 12) h += 12;
    if (period === 'AM' && h === 12) h = 0;
    
    return h * 60 + m;
  };

  // Helper: get current time in minutes since midnight
  const getNowMinutes = () => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  };

  // Check if now matches any adhan or iqama time (within 0-2 min window)
  const checkPrayerOrIqamaTime = (prayerData: any): { isTime: boolean; prayerName: string } => {
    if (!prayerData) return { isTime: false, prayerName: '' };
    
    const now = getNowMinutes();
    const prayers = [
      { name: 'Fajr', data: prayerData.fajr },
      { name: 'Dhuhr', data: prayerData.dhuhr },
      { name: 'Asr', data: prayerData.asr },
      { name: 'Maghrib', data: prayerData.maghrib },
      { name: 'Isha', data: prayerData.isha }
    ];
    
    for (const prayer of prayers) {
      const prayerTimes = typeof prayer.data === 'string' 
        ? { adhan: prayer.data, iqama: undefined }
        : { adhan: prayer.data?.adhan, iqama: prayer.data?.iqama };
      
      // Check adhan time
      if (prayerTimes.adhan) {
        const adhanTime = parseTime(prayerTimes.adhan);
        if (now >= adhanTime && now < adhanTime + 2) {
          return { isTime: true, prayerName: prayer.name };
        }
      }
      
      // Check iqama time
      if (prayerTimes.iqama) {
        const iqamaTime = parseTime(prayerTimes.iqama);
        if (now >= iqamaTime && now < iqamaTime + 2) {
          return { isTime: true, prayerName: prayer.name };
        }
      }
    }
    
    return { isTime: false, prayerName: '' };
  };

  // Pause logic: if adhan or iqama time, pause and show silence message
  useEffect(() => {
    // Find the prayer table item to check prayer times
    const prayerItem = items.find(item => item.type === MediaType.PRAYER_TABLE);
    if (!prayerItem) return;

    const checkTime = () => {
      const { isTime, prayerName } = checkPrayerOrIqamaTime(prayerItem.data);
      
      if (isTime) {
        if (!pauseUntil || Date.now() > pauseUntil) {
          setPauseUntil(Date.now() + silenceDuration * 60 * 1000);
          setShowSilence(true);
          setCurrentPrayerName(prayerName);
          onSilenceChange?.(true); // Notify parent
        }
      } else if (pauseUntil && Date.now() > pauseUntil) {
        setPauseUntil(null);
        setShowSilence(false);
        setCurrentPrayerName('');
        onSilenceChange?.(false); // Notify parent
      }
    };

    // Check immediately and then every 10 seconds
    checkTime();
    const interval = setInterval(checkTime, 10000);
    return () => clearInterval(interval);
  }, [items, pauseUntil, silenceDuration, onSilenceChange]);

  // Timer for slide transitions
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    // If paused, do not advance
    if (pauseUntil && Date.now() < pauseUntil) return;

    timerRef.current = setTimeout(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        const nextIndex = (currentIndex + 1) % items.length;
        setCurrentIndex(nextIndex);
        setIsTransitioning(false);
        setMediaError(null);
        if (onSlideChange) onSlideChange(nextIndex);
      }, 800);
    }, currentItem.duration || 10000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, currentItem, pauseUntil]);

  const handleMediaError = () => {
    let errorMessage = "Content Load Error";
    console.error(`Media Error on ${currentItem.url}`);
    setMediaError({ message: errorMessage });
    timerRef.current = setTimeout(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        const nextIndex = (currentIndex + 1) % items.length;
        setCurrentIndex(nextIndex);
        setIsTransitioning(false);
        setMediaError(null);
        if (onSlideChange) onSlideChange(nextIndex);
      }, 800);
    }, 5000);
  };

  return (
    <div className="w-full h-full bg-black flex items-center justify-center overflow-hidden">
      {showSilence ? (
        <SilencePhoneSlide prayerName={currentPrayerName} />
      ) : (
        <div className={`w-full h-full transition-opacity duration-700 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          
          {mediaError ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-950 p-10">
              <h2 className="text-zinc-600 text-3xl font-bold uppercase tracking-widest mb-4">Content Load Error</h2>
            </div>
          ) : currentItem.type === MediaType.PRAYER_TABLE ? (
            <PrayerTimesSlide data={currentItem.data} showSilenceMessage={false} />
          ) : currentItem.type === MediaType.IMAGE ? (
            <ImageSlide
              url={currentItem.url || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'}
              title={currentItem.title}
              description={currentItem.description}
              showTitle={true}
              showDescription={true}
            />
          ) : currentItem.type === MediaType.CUSTOM_PAGE && currentItem.component ? (
            <currentItem.component />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-zinc-950 p-10">
              <h2 className="text-zinc-600 text-3xl font-bold uppercase tracking-widest mb-4">Unsupported Slide Type</h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SlideCarousel;

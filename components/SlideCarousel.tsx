
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SlideItem, MediaType } from '../types';
import PrayerTimesSlide from './PrayerTimesSlide';

interface SlideCarouselProps {
  items: SlideItem[];
}

const SlideCarousel: React.FC<SlideCarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mediaError, setMediaError] = useState<{message: string, code?: number} | null>(null);
  
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentItem = items[currentIndex];

  const goToNext = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
      setIsTransitioning(false);
      setMediaError(null);
    }, 800); 
  }, [items.length]);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    // Only handle timed transitions for non-video content
    timerRef.current = setTimeout(goToNext, currentItem.duration || 10000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, currentItem, goToNext]);

  const handleMediaError = () => {
    let errorMessage = "Content Load Error";
    console.error(`Media Error on ${currentItem.url}`);
    setMediaError({ message: errorMessage });
    timerRef.current = setTimeout(goToNext, 5000);
  };

  return (
    <div className="w-full h-full bg-black flex items-center justify-center overflow-hidden">
      <div className={`w-full h-full transition-opacity duration-700 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        
        {mediaError ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-950 p-10">
            <h2 className="text-zinc-600 text-3xl font-bold uppercase tracking-widest mb-4">Content Load Error</h2>
          </div>
        ) : currentItem.type === MediaType.PRAYER_TABLE ? (
          <PrayerTimesSlide data={currentItem.data} />
        ) : (
          <img
            key={currentItem.url}
            src={currentItem.url}
            className="w-full h-full object-cover"
            onError={handleMediaError}
          />
        )}
      </div>
    </div>
  );
};

export default SlideCarousel;

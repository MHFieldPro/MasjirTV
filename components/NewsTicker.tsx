
import React, { useState, useEffect, useMemo } from 'react';
import { NewsItem } from '../types';

interface NewsTickerProps {
  news: NewsItem[];
}

const CATEGORY_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  'PRAYER': { 
    label: 'PRAYER TIMES', 
    color: 'text-emerald-400', 
    bg: 'bg-emerald-900', 
    border: 'border-emerald-500/30' 
  },
  'CLASSES': { 
    label: 'EDUCATIONAL', 
    color: 'text-blue-400', 
    bg: 'bg-blue-800', 
    border: 'border-blue-500/30' 
  },
  'COMMUNITY': { 
    label: 'COMMUNITY', 
    color: 'text-violet-400', 
    bg: 'bg-violet-800', 
    border: 'border-violet-500/30' 
  },
  'RAMADAN': { 
    label: 'RAMADAN', 
    color: 'text-amber-400', 
    bg: 'bg-amber-700', 
    border: 'border-amber-500/30' 
  },
  'ZAKAT': { 
    label: 'CHARITY', 
    color: 'text-rose-400', 
    bg: 'bg-rose-800', 
    border: 'border-rose-500/30' 
  },
  'DEFAULT': { 
    label: 'NOTICES', 
    color: 'text-slate-400', 
    bg: 'bg-slate-800', 
    border: 'border-slate-500/30' 
  }
};

const NewsTicker: React.FC<NewsTickerProps> = ({ news }) => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  const groupedNews = useMemo(() => {
    const groups: Record<string, NewsItem[]> = {};
    news.forEach(item => {
      const category = CATEGORY_CONFIG[item.category] ? item.category : 'DEFAULT';
      if (!groups[category]) groups[category] = [];
      groups[category].push(item);
    });
    return groups;
  }, [news]);

  const categories = useMemo(() => Object.keys(groupedNews), [groupedNews]);
  const activeCategory = categories[currentCategoryIndex] || 'DEFAULT';
  const config = CATEGORY_CONFIG[activeCategory] || CATEGORY_CONFIG['DEFAULT'];
  const activeItems = groupedNews[activeCategory] || [];

  useEffect(() => {
    if (categories.length <= 1) return;
    // Faster category switching: 18 seconds instead of 25
    const interval = setInterval(() => {
      setCurrentCategoryIndex((prev) => (prev + 1) % categories.length);
    }, 18000); 
    return () => clearInterval(interval);
  }, [categories.length]);

  return (
    <div className="h-full bg-slate-900 flex items-center overflow-hidden relative border-t border-white/10">
      {/* Category Label */}
      <div className={`flex-shrink-0 ${config.bg} h-full flex items-center px-12 z-20 shadow-[10px_0_30px_rgba(0,0,0,0.5)] transition-colors duration-1000 min-w-[340px] justify-center relative`}>
        {activeCategory === 'PRAYER' && (
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="text-[10px] text-white/70 font-bold uppercase tracking-widest">LIVE</span>
          </div>
        )}
        <div className="text-center">
          <p className="text-[12px] text-white/50 font-black tracking-[0.4em] uppercase mb-1">Bulletin</p>
          <span className="text-white font-black text-4xl tracking-tighter uppercase whitespace-nowrap">
            {config.label}
          </span>
        </div>
      </div>

      {/* Scrolling Text Container */}
      <div className="relative flex-grow overflow-hidden h-full flex items-center bg-black/40">
        <div 
          key={activeCategory} // Force re-animation on category change
          className="animate-marquee whitespace-nowrap flex items-center" 
          // Faster scrolling: Prayer (15s), Others (26s)
          style={{ animationDuration: activeCategory === 'PRAYER' ? '15s' : '26s' }}
        >
          {/* First set of items */}
          {activeItems.map((item) => (
            <div key={`${item.id}-${activeCategory}`} className="flex items-center mx-20">
              <div className={`w-4 h-4 rounded-full ${config.bg} mr-8 shadow-[0_0_15px_rgba(255,255,255,0.2)]`} />
              <span className="text-white text-5xl font-bold tracking-tight">
                {item.text}
              </span>
            </div>
          ))}
          {/* Duplicate set for seamless looping */}
          {activeItems.map((item) => (
            <div key={`${item.id}-dup-${activeCategory}`} className="flex items-center mx-20">
              <div className={`w-4 h-4 rounded-full ${config.bg} mr-8 shadow-[0_0_15px_rgba(255,255,255,0.2)]`} />
              <span className="text-white text-5xl font-bold tracking-tight">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Clock Area */}
      <div className="flex-shrink-0 bg-slate-950 h-full flex items-center px-14 z-20 border-l border-white/5">
        <Clock />
      </div>
    </div>
  );
};

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-end justify-center">
      <div className="flex items-baseline gap-2">
        <span className="text-white font-black text-6xl leading-none tabular-nums tracking-tighter">
          {time.getHours().toString().padStart(2, '0')}
        </span>
        <span className="text-white/30 font-black text-5xl leading-none animate-pulse">:</span>
        <span className="text-white font-black text-6xl leading-none tabular-nums tracking-tighter">
          {time.getMinutes().toString().padStart(2, '0')}
        </span>
      </div>
      <div className="mt-1">
        <span className="text-emerald-500 font-black text-sm tracking-[0.25em] uppercase">
          {time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
        </span>
      </div>
    </div>
  );
};

export default NewsTicker;
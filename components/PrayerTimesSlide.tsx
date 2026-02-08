
import React, { useState, useEffect } from 'react';
import { PrayerSchedule, PrayerTime } from '../types';

interface PrayerTimesSlideProps {
  data: PrayerSchedule;
  showSilenceMessage?: boolean;
}

const PrayerTimesSlide: React.FC<PrayerTimesSlideProps> = ({ data, showSilenceMessage }) => {
  const [countdown, setCountdown] = useState({ name: '', time: '', hours: 0, minutes: 0, seconds: 0, isIqama: false });

  // Helper to get adhan and iqama from prayer data
  const getPrayerTimes = (prayer: string | PrayerTime) => {
    if (typeof prayer === 'string') {
      return { adhan: prayer, iqama: undefined };
    }
    return { adhan: prayer.adhan, iqama: prayer.iqama };
  };

  // Helper to parse time string to Date object
  const parseTimeToDate = (timeStr: string): Date => {
    const today = new Date();
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    today.setHours(hours, minutes, 0, 0);
    return today;
  };

  // Calculate next prayer and countdown
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const prayers = [
        { name: 'Fajr', ...getPrayerTimes(data.fajr) },
        { name: 'Sunrise', ...getPrayerTimes(data.sunrise) },
        { name: 'Dhuhr', ...getPrayerTimes(data.dhuhr) },
        { name: 'Asr', ...getPrayerTimes(data.asr) },
        { name: 'Maghrib', ...getPrayerTimes(data.maghrib) },
        { name: 'Isha', ...getPrayerTimes(data.isha) },
      ];

      // First check if we're between adhan and iqama for any prayer
      for (const prayer of prayers) {
        if (!prayer.iqama) continue; // Skip prayers without iqama (like Sunrise)
        
        const adhanTime = parseTimeToDate(prayer.adhan);
        const iqamaTime = parseTimeToDate(prayer.iqama);
        
        if (now >= adhanTime && now < iqamaTime) {
          // We're between adhan and iqama - countdown to iqama
          const diff = iqamaTime.getTime() - now.getTime();
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);

          setCountdown({
            name: prayer.name,
            time: prayer.iqama,
            hours,
            minutes,
            seconds,
            isIqama: true
          });
          return;
        }
      }

      // Not between adhan and iqama, find next adhan or iqama
      let nextPrayer = null;
      for (const prayer of prayers) {
        const adhanTime = parseTimeToDate(prayer.adhan);
        
        // Check if adhan is in the future
        if (adhanTime > now) {
          nextPrayer = { ...prayer, date: adhanTime, time: prayer.adhan };
          break;
        }
        
        // If adhan has passed but iqama hasn't, and we're not between them (already checked above)
        // this means we're past the iqama, so skip to next prayer
      }

      // If no prayer found today, next is Fajr tomorrow
      if (!nextPrayer) {
        const fajrTime = parseTimeToDate(prayers[0].adhan);
        fajrTime.setDate(fajrTime.getDate() + 1);
        nextPrayer = { ...prayers[0], date: fajrTime, time: prayers[0].adhan };
      }

      // Calculate time difference
      const diff = nextPrayer.date.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({
        name: nextPrayer.name,
        time: nextPrayer.time,
        hours,
        minutes,
        seconds,
        isIqama: false
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [data]);

  const prayerRows = [
    { 
      name: 'Fajr', 
      ...getPrayerTimes(data.fajr),
      icon: (
        <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round">
          <path d="M 30 50 Q 30 30 50 20 Q 70 30 70 50" fill="white" opacity="0.9"/>
          <circle cx="65" cy="30" r="3" fill="white"/>
        </svg>
      )
    },
    { 
      name: 'Sunrise', 
      ...getPrayerTimes(data.sunrise),
      icon: (
        <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round">
          <circle cx="50" cy="45" r="15" fill="white"/>
          <line x1="50" y1="20" x2="50" y2="10"/>
          <line x1="73" y1="27" x2="80" y2="20"/>
          <line x1="80" y1="45" x2="90" y2="45"/>
          <line x1="27" y1="27" x2="20" y2="20"/>
          <line x1="20" y1="45" x2="10" y2="45"/>
          <line x1="10" y1="70" x2="90" y2="70" strokeWidth="3"/>
        </svg>
      )
    },
    { 
      name: 'Dhuhr', 
      ...getPrayerTimes(data.dhuhr),
      icon: (
        <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round">
          <circle cx="50" cy="30" r="12" fill="white"/>
          <line x1="50" y1="15" x2="50" y2="8"/>
          <line x1="68" y1="20" x2="73" y2="15"/>
          <line x1="68" y1="40" x2="73" y2="45"/>
          <line x1="32" y1="20" x2="27" y2="15"/>
          <line x1="32" y1="40" x2="27" y2="45"/>
          <path d="M 30 60 L 35 50 L 50 55 L 65 50 L 70 60 L 65 70 L 50 65 L 35 70 Z" fill="white" opacity="0.8"/>
        </svg>
      )
    },
    { 
      name: 'Asr', 
      ...getPrayerTimes(data.asr),
      icon: (
        <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round">
          <circle cx="38" cy="35" r="12" fill="white"/>
          <line x1="25" y1="30" x2="20" y2="25"/>
          <line x1="25" y1="40" x2="20" y2="45"/>
          <path d="M 30 60 L 35 50 L 50 55 L 65 50 L 70 60 L 65 75 L 50 70 L 35 75 Z" fill="white" opacity="0.7"/>
        </svg>
      )
    },
    { 
      name: 'Maghrib', 
      ...getPrayerTimes(data.maghrib),
      icon: (
        <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round">
          <path d="M 35 35 Q 35 20 50 15 Q 65 20 65 35" fill="white" opacity="0.9"/>
          <circle cx="60" cy="25" r="2.5" fill="white"/>
          <circle cx="70" cy="30" r="2" fill="white"/>
          <line x1="10" y1="65" x2="90" y2="65" strokeWidth="3"/>
          <line x1="15" y1="75" x2="85" y2="75" strokeWidth="2"/>
        </svg>
      )
    },
    { 
      name: 'Isha', 
      ...getPrayerTimes(data.isha),
      icon: (
        <svg viewBox="0 0 100 100" className="w-16 h-16" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round">
          <path d="M 30 40 Q 30 25 45 20 Q 60 25 60 40" fill="white" opacity="0.9"/>
          <circle cx="65" cy="25" r="2.5" fill="white"/>
          <circle cx="72" cy="32" r="2" fill="white"/>
          <circle cx="70" cy="42" r="2.5" fill="white"/>
          <circle cx="25" cy="30" r="2.5" fill="white"/>
          <circle cx="20" cy="38" r="2" fill="white"/>
          <circle cx="22" cy="48" r="2" fill="white"/>
        </svg>
      )
    },
  ];

  return (
    <div className="w-full h-full bg-[#c8dbd4] flex flex-col items-center justify-center p-12 pt-20 relative overflow-hidden">
      {/* Islamic Mandala Pattern - Top Right */}
      <div className="absolute -top-20 -right-20 w-96 h-96 opacity-60">
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#e8c99f', stopOpacity: 1}} />
              <stop offset="50%" style={{stopColor: '#d4a574', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#c99456', stopOpacity: 1}} />
            </linearGradient>
          </defs>
          
          {/* Outermost layer - 8 petals */}
          {[...Array(8)].map((_, i) => (
            <g key={`outer-${i}`} transform={`rotate(${i * 45} 100 100)`}>
              <path d="M 100 30 Q 85 50 85 70 Q 85 85 100 100 Q 115 85 115 70 Q 115 50 100 30 Z" 
                    fill="#2d5f4f" stroke="#e8c99f" strokeWidth="1.5" opacity="0.9"/>
              <path d="M 100 40 Q 90 55 90 70 Q 90 82 100 92 Q 110 82 110 70 Q 110 55 100 40 Z" 
                    fill="url(#goldGrad)" opacity="0.8"/>
            </g>
          ))}
          
          {/* Middle layer - 8 petals offset */}
          {[...Array(8)].map((_, i) => (
            <g key={`mid-${i}`} transform={`rotate(${i * 45 + 22.5} 100 100)`}>
              <path d="M 100 50 Q 92 60 92 72 Q 92 82 100 90 Q 108 82 108 72 Q 108 60 100 50 Z" 
                    fill="url(#goldGrad)" stroke="#2d5f4f" strokeWidth="1" opacity="0.85"/>
            </g>
          ))}
          
          {/* Inner layer - smaller petals */}
          {[...Array(8)].map((_, i) => (
            <g key={`inner-${i}`} transform={`rotate(${i * 45} 100 100)`}>
              <path d="M 100 65 Q 95 72 95 78 Q 95 85 100 90 Q 105 85 105 78 Q 105 72 100 65 Z" 
                    fill="#2d5f4f" opacity="0.8"/>
              <path d="M 100 70 Q 97 74 97 78 Q 97 83 100 86 Q 103 83 103 78 Q 103 74 100 70 Z" 
                    fill="url(#goldGrad)" opacity="0.9"/>
            </g>
          ))}
          
          {/* Center flower */}
          <circle cx="100" cy="100" r="18" fill="url(#goldGrad)" stroke="#2d5f4f" strokeWidth="1"/>
          {[...Array(6)].map((_, i) => (
            <g key={`center-${i}`} transform={`rotate(${i * 60} 100 100)`}>
              <ellipse cx="100" cy="92" rx="4" ry="8" fill="#2d5f4f" opacity="0.6"/>
            </g>
          ))}
          <circle cx="100" cy="100" r="8" fill="url(#goldGrad)"/>
          <circle cx="100" cy="100" r="4" fill="#2d5f4f" opacity="0.7"/>
        </svg>
      </div>

      {/* Islamic Mandala Pattern - Bottom Left - Smaller */}
      <div className="absolute -bottom-16 -left-16 w-72 h-72 opacity-40">
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
          {[...Array(8)].map((_, i) => (
            <g key={`outer-${i}`} transform={`rotate(${i * 45} 100 100)`}>
              <path d="M 100 30 Q 85 50 85 70 Q 85 85 100 100 Q 115 85 115 70 Q 115 50 100 30 Z" 
                    fill="#2d5f4f" stroke="#e8c99f" strokeWidth="1.5" opacity="0.9"/>
              <path d="M 100 40 Q 90 55 90 70 Q 90 82 100 92 Q 110 82 110 70 Q 110 55 100 40 Z" 
                    fill="url(#goldGrad)" opacity="0.8"/>
            </g>
          ))}
          {[...Array(8)].map((_, i) => (
            <g key={`mid-${i}`} transform={`rotate(${i * 45 + 22.5} 100 100)`}>
              <path d="M 100 50 Q 92 60 92 72 Q 92 82 100 90 Q 108 82 108 72 Q 108 60 100 50 Z" 
                    fill="url(#goldGrad)" stroke="#2d5f4f" strokeWidth="1" opacity="0.85"/>
            </g>
          ))}
          <circle cx="100" cy="100" r="18" fill="url(#goldGrad)" stroke="#2d5f4f" strokeWidth="1"/>
          <circle cx="100" cy="100" r="8" fill="url(#goldGrad)"/>
        </svg>
      </div>

      {/* Lanterns on the left */}
      <div className="absolute left-8 top-1/4 flex flex-col gap-16">
        {/* Top Lantern */}
        <div className="relative w-32 h-40">
          <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-2xl">
            {/* Hanging chain */}
            <line x1="50" y1="0" x2="50" y2="20" stroke="#2d7a6f" strokeWidth="1.5"/>
            {/* Top cap */}
            <ellipse cx="50" cy="22" rx="12" ry="5" fill="#2d7a6f"/>
            {/* Lantern body */}
            <path d="M 35 25 Q 30 50 30 70 Q 30 85 35 95 L 65 95 Q 70 85 70 70 Q 70 50 65 25 Z" 
                  fill="#2d7a6f" opacity="0.9"/>
            {/* Grid pattern */}
            <path d="M 35 25 Q 30 50 30 70 Q 30 85 35 95" stroke="#1a4d45" strokeWidth="1" fill="none"/>
            <path d="M 65 25 Q 70 50 70 70 Q 70 85 65 95" stroke="#1a4d45" strokeWidth="1" fill="none"/>
            <line x1="30" y1="45" x2="70" y2="45" stroke="#1a4d45" strokeWidth="1"/>
            <line x1="30" y1="60" x2="70" y2="60" stroke="#1a4d45" strokeWidth="1"/>
            <line x1="30" y1="75" x2="70" y2="75" stroke="#1a4d45" strokeWidth="1"/>
            {/* Light glow */}
            <ellipse cx="50" cy="60" rx="15" ry="25" fill="#5dd9c1" opacity="0.8"/>
            <ellipse cx="50" cy="60" rx="10" ry="18" fill="#7fffd4" opacity="0.9"/>
            {/* Bottom cap */}
            <ellipse cx="50" cy="95" rx="12" ry="5" fill="#2d7a6f"/>
            <path d="M 45 97 L 50 105 L 55 97" fill="#2d7a6f"/>
          </svg>
        </div>

        {/* Bottom Lantern */}
        <div className="relative w-28 h-36 ml-12">
          <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-2xl">
            <line x1="50" y1="0" x2="50" y2="20" stroke="#2d7a6f" strokeWidth="1.5"/>
            <ellipse cx="50" cy="22" rx="12" ry="5" fill="#2d7a6f"/>
            <path d="M 35 25 Q 30 50 30 70 Q 30 85 35 95 L 65 95 Q 70 85 70 70 Q 70 50 65 25 Z" 
                  fill="#2d7a6f" opacity="0.9"/>
            <path d="M 35 25 Q 30 50 30 70 Q 30 85 35 95" stroke="#1a4d45" strokeWidth="1" fill="none"/>
            <path d="M 65 25 Q 70 50 70 70 Q 70 85 65 95" stroke="#1a4d45" strokeWidth="1" fill="none"/>
            <line x1="30" y1="45" x2="70" y2="45" stroke="#1a4d45" strokeWidth="1"/>
            <line x1="30" y1="60" x2="70" y2="60" stroke="#1a4d45" strokeWidth="1"/>
            <line x1="30" y1="75" x2="70" y2="75" stroke="#1a4d45" strokeWidth="1"/>
            <ellipse cx="50" cy="60" rx="15" ry="25" fill="#5dd9c1" opacity="0.8"/>
            <ellipse cx="50" cy="60" rx="10" ry="18" fill="#7fffd4" opacity="0.9"/>
            <ellipse cx="50" cy="95" rx="12" ry="5" fill="#2d7a6f"/>
            <path d="M 45 97 L 50 105 L 55 97" fill="#2d7a6f"/>
          </svg>
        </div>
      </div>

      {/* Mosque silhouette at bottom */}
      <div className="absolute bottom-0 left-0 right-0 w-full h-32 opacity-20">
        <svg viewBox="0 0 800 100" className="w-full h-full" preserveAspectRatio="xMidYMax meet">
          {/* Main dome */}
          <ellipse cx="400" cy="60" rx="80" ry="45" fill="#2d5f4f"/>
          <rect x="320" y="60" width="160" height="40" fill="#2d5f4f"/>
          {/* Side domes */}
          <ellipse cx="250" cy="75" rx="45" ry="30" fill="#2d5f4f"/>
          <rect x="205" y="75" width="90" height="25" fill="#2d5f4f"/>
          <ellipse cx="550" cy="75" rx="45" ry="30" fill="#2d5f4f"/>
          <rect x="505" y="75" width="90" height="25" fill="#2d5f4f"/>
          {/* Minarets */}
          <rect x="150" y="30" width="15" height="70" fill="#2d5f4f"/>
          <ellipse cx="157.5" cy="28" rx="10" ry="8" fill="#2d5f4f"/>
          <rect x="635" y="30" width="15" height="70" fill="#2d5f4f"/>
          <ellipse cx="642.5" cy="28" rx="10" ry="8" fill="#2d5f4f"/>
        </svg>
      </div>

      <header className="text-center mb-8 relative z-10">
        <h1 className="text-[#2d5f4f] text-7xl font-black tracking-tight mb-3">Prayer Times</h1>
        <p className="text-[#2d5f4f]/70 text-2xl font-semibold tracking-wide">Al Azhar Youth Centre</p>
      </header>

      <div className="grid grid-cols-3 gap-6 w-full max-w-7xl relative z-10 mb-4">
        {prayerRows.map((prayer, index) => (
          <div 
            key={prayer.name}
            className={`${
              index < 3 ? 'bg-[#4a8577]' : index === 3 ? 'bg-[#c99456]' : 'bg-[#4a8577]'
            } rounded-3xl p-6 flex flex-col items-center justify-center shadow-xl transition-transform hover:scale-105`}
          >
            <div className="mb-3">{prayer.icon}</div>
            <span className="text-white text-3xl font-bold tracking-tight mb-4">{prayer.name}</span>
            
            {/* Side by Side Times */}
            <div className="w-full flex gap-3">
              {/* Adhan Time */}
              <div className="flex-1 bg-white/20 rounded-2xl px-4 py-3 flex flex-col items-center">
                <span className="text-white/80 text-sm font-medium mb-1">ADHAN</span>
                <span className="text-white text-3xl font-black tracking-tighter tabular-nums">
                  {prayer.adhan}
                </span>
              </div>
              
              {/* Iqama Time */}
              {prayer.iqama ? (
                <div className="flex-1 bg-white/30 rounded-2xl px-4 py-3 flex flex-col items-center">
                  <span className="text-white/80 text-sm font-medium mb-1">IQAMA</span>
                  <span className="text-white text-3xl font-black tracking-tighter tabular-nums">
                    {prayer.iqama}
                  </span>
                </div>
              ) : (
                <div className="flex-1 opacity-0"></div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Countdown to Next Prayer */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl px-12 py-6 shadow-2xl relative z-10 max-w-4xl mx-auto">
        <div className="flex items-center justify-between gap-8">
          <div className="flex flex-col">
            <span className="text-[#2d5f4f]/70 text-lg font-semibold uppercase tracking-wider mb-1">
              {countdown.isIqama ? 'Iqama In' : 'Next Adhan'}
            </span>
            <span className="text-[#2d5f4f] text-4xl font-black tracking-tight">
              {countdown.name}
              {countdown.isIqama && <span className="text-2xl font-semibold ml-3">at {countdown.time}</span>}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Hours */}
            <div className={`${countdown.isIqama ? 'bg-[#c99456]' : 'bg-[#4a8577]'} rounded-2xl px-6 py-4 min-w-[90px] text-center shadow-lg transition-colors`}>
              <div className="text-white text-4xl font-black tabular-nums leading-none">{String(countdown.hours).padStart(2, '0')}</div>
              <div className="text-white/80 text-sm font-medium uppercase mt-1">Hours</div>
            </div>
            
            <span className="text-[#2d5f4f] text-4xl font-black">:</span>
            
            {/* Minutes */}
            <div className={`${countdown.isIqama ? 'bg-[#c99456]' : 'bg-[#4a8577]'} rounded-2xl px-6 py-4 min-w-[90px] text-center shadow-lg transition-colors`}>
              <div className="text-white text-4xl font-black tabular-nums leading-none">{String(countdown.minutes).padStart(2, '0')}</div>
              <div className="text-white/80 text-sm font-medium uppercase mt-1">Minutes</div>
            </div>
            
            <span className="text-[#2d5f4f] text-4xl font-black">:</span>
            
            {/* Seconds */}
            <div className={`${countdown.isIqama ? 'bg-[#d4493e]' : 'bg-[#c99456]'} rounded-2xl px-6 py-4 min-w-[90px] text-center shadow-lg transition-colors`}>
              <div className="text-white text-4xl font-black tabular-nums leading-none">{String(countdown.seconds).padStart(2, '0')}</div>
              <div className="text-white/80 text-sm font-medium uppercase mt-1">Seconds</div>
            </div>
          </div>
        </div>
      </div>

      {showSilenceMessage && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-black/80">
          <img src="https://ministrypass-prod.s3.amazonaws.com/uploads/2019/04/Please-Silence-Your-Mobile-Device-Minimalist_Title-Slide-1.jpg" alt="Please Silence Your Mobile Device" className="max-w-xl w-full rounded-2xl shadow-2xl mb-8" />
          <h2 className="text-white text-4xl font-bold tracking-wider bg-emerald-600/80 px-8 py-4 rounded-2xl shadow-lg">Please silence your phone</h2>
        </div>
      )}

      <footer className="mt-6 text-[#2d5f4f]/50 text-xl font-medium tracking-wide relative z-10">
        {new Date().toLocaleDateString(undefined, { dateStyle: 'full' })}
      </footer>
    </div>
  );
};

export default PrayerTimesSlide;

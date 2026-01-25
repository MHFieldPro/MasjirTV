
import React from 'react';
import { PrayerSchedule } from '../types';

interface PrayerTimesSlideProps {
  data: PrayerSchedule;
}

const PrayerTimesSlide: React.FC<PrayerTimesSlideProps> = ({ data }) => {
  const prayerRows = [
    { name: 'Fajr', time: data.fajr, icon: '🌅' },
    { name: 'Sunrise', time: data.sunrise, icon: '☀️' },
    { name: 'Dhuhr', time: data.dhuhr, icon: '🕛' },
    { name: 'Asr', time: data.asr, icon: '🕒' },
    { name: 'Maghrib', time: data.maghrib, icon: '🌇' },
    { name: 'Isha', time: data.isha, icon: '🌙' },
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 flex flex-col items-center justify-center p-12 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px]" />

      <header className="text-center mb-10 relative z-10">
        <h2 className="text-emerald-500 font-black text-lg tracking-[0.4em] uppercase mb-2">Cambridge Islamic Centre</h2>
        <h1 className="text-white text-6xl font-black tracking-tighter mb-3">Daily Prayer Times</h1>
        <div className="h-1 w-32 bg-emerald-500 mx-auto rounded-full" />
      </header>

      <div className="grid grid-cols-2 gap-6 w-full max-w-6xl relative z-10">
        {prayerRows.map((prayer) => (
          <div 
            key={prayer.name}
            className="bg-white/5 border border-white/10 rounded-[30px] p-6 flex items-center justify-between backdrop-blur-md transition-all hover:bg-white/10"
          >
            <div className="flex items-center gap-6">
              <span className="text-4xl">{prayer.icon}</span>
              <span className="text-white text-4xl font-bold tracking-tight">{prayer.name}</span>
            </div>
            <span className="text-emerald-400 text-5xl font-black tracking-tighter tabular-nums">
              {prayer.time}
            </span>
          </div>
        ))}
      </div>

      <footer className="mt-12 text-white/30 text-xl font-medium tracking-widest uppercase">
        Live Schedule from CICSW.CA • {new Date().toLocaleDateString(undefined, { dateStyle: 'full' })}
      </footer>
    </div>
  );
};

export default PrayerTimesSlide;

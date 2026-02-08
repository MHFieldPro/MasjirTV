import React from 'react';

interface IftarBooking {
  day: number;
  sponsors: string[];
}

interface RamadanIftarSlideProps {
  bookings?: IftarBooking[];
  year?: number;
}

const RamadanIftarSlide: React.FC<RamadanIftarSlideProps> = ({ bookings = [], year = 2026 }) => {
  // Create 30 days of Ramadan
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const getBookingForDay = (day: number): IftarBooking | undefined => {
    return bookings.find(b => b.day === day);
  };

  return (
    <div className="w-full h-full bg-[#c8dbd4] flex flex-col items-center justify-center p-8 pt-12 relative overflow-hidden">
      {/* Islamic Mandala Pattern - Top Right */}
      <div className="absolute -top-20 -right-20 w-96 h-96 opacity-50">
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
          <defs>
            <linearGradient id="goldGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#e8c99f', stopOpacity: 1}} />
              <stop offset="50%" style={{stopColor: '#d4a574', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#c99456', stopOpacity: 1}} />
            </linearGradient>
          </defs>
          {[...Array(8)].map((_, i) => (
            <g key={`outer-${i}`} transform={`rotate(${i * 45} 100 100)`}>
              <path d="M 100 30 Q 85 50 85 70 Q 85 85 100 100 Q 115 85 115 70 Q 115 50 100 30 Z" 
                    fill="#2d5f4f" stroke="#e8c99f" strokeWidth="1.5" opacity="0.9"/>
              <path d="M 100 40 Q 90 55 90 70 Q 90 82 100 92 Q 110 82 110 70 Q 110 55 100 40 Z" 
                    fill="url(#goldGrad2)" opacity="0.8"/>
            </g>
          ))}
          <circle cx="100" cy="100" r="18" fill="url(#goldGrad2)" stroke="#2d5f4f" strokeWidth="1"/>
          <circle cx="100" cy="100" r="8" fill="url(#goldGrad2)"/>
        </svg>
      </div>

      {/* Islamic Mandala Pattern - Bottom Left */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 opacity-35">
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
          {[...Array(8)].map((_, i) => (
            <g key={`outer-${i}`} transform={`rotate(${i * 45} 100 100)`}>
              <path d="M 100 30 Q 85 50 85 70 Q 85 85 100 100 Q 115 85 115 70 Q 115 50 100 30 Z" 
                    fill="#2d5f4f" stroke="#e8c99f" strokeWidth="1.5" opacity="0.9"/>
              <path d="M 100 40 Q 90 55 90 70 Q 90 82 100 92 Q 110 82 110 70 Q 110 55 100 40 Z" 
                    fill="url(#goldGrad2)" opacity="0.8"/>
            </g>
          ))}
          <circle cx="100" cy="100" r="18" fill="url(#goldGrad2)" stroke="#2d5f4f" strokeWidth="1"/>
        </svg>
      </div>

      {/* Decorative Crescents */}
      <div className="absolute top-12 left-12 opacity-25">
        <svg viewBox="0 0 80 80" className="w-20 h-20 drop-shadow-xl">
          <path d="M 25 40 Q 25 20 40 10 Q 35 22 35 40 Q 35 58 40 70 Q 25 60 25 40 Z" 
                fill="#c99456"/>
          <circle cx="55" cy="22" r="3" fill="#c99456"/>
        </svg>
      </div>
      
      <div className="absolute bottom-12 right-12 opacity-25 transform rotate-180">
        <svg viewBox="0 0 80 80" className="w-20 h-20 drop-shadow-xl">
          <path d="M 25 40 Q 25 20 40 10 Q 35 22 35 40 Q 35 58 40 70 Q 25 60 25 40 Z" 
                fill="#c99456"/>
          <circle cx="55" cy="22" r="3" fill="#c99456"/>
        </svg>
      </div>

      {/* Header */}
      <div className="text-center mb-4 relative z-10">
        <h1 className="text-[#2d5f4f] text-5xl font-extrabold tracking-wide mb-3">
          Ramadan Iftar Calendar {year}
        </h1>
        <div className="bg-white/90 rounded-2xl px-6 py-3 inline-block shadow-2xl">
          <p className="text-[#c99456] text-xl font-bold italic mb-0.5">
            "Whoever feeds a fasting person will have a reward like his"
          </p>
          <p className="text-[#2d5f4f]/70 text-base font-semibold">- Prophet Muhammad ﷺ</p>
        </div>
      </div>

      {/* Calendar Grid - 6 rows x 5 columns */}
      <div className="grid grid-cols-6 gap-3 w-full max-w-[90%] relative z-10">
        {days.map((day) => {
          const booking = getBookingForDay(day);
          const isBooked = booking && booking.sponsors.length > 0;
          
          return (
            <div 
              key={day}
              className={`${
                isBooked ? 'bg-[#4a8577]/60' : 'bg-white/80'
              } rounded-2xl p-3 flex flex-col items-center justify-between shadow-xl transition-all hover:scale-105 min-h-[105px]`}
            >
              {/* Day Number */}
              <div className={`${
                isBooked ? 'bg-[#4a8577]/50 w-8 h-8' : 'bg-[#2d5f4f] shadow-lg w-10 h-10'
              } rounded-full flex items-center justify-center mb-2`}>
                <span className={`text-white ${isBooked ? 'text-sm' : 'text-lg'} font-black`}>
                  {day}
                </span>
              </div>

              {/* Booking Status */}
              {isBooked ? (
                <div className="text-center flex-1 flex flex-col justify-center">
                  {booking.sponsors.slice(0, 3).map((sponsor, idx) => (
                    <div key={idx} className="text-white text-xs font-bold leading-tight mb-1 drop-shadow">
                      {sponsor}
                    </div>
                  ))}
                  {booking.sponsors.length > 3 && (
                    <div className="text-white/90 text-[10px] font-semibold bg-[#c99456]/40 rounded-full px-2 py-0.5 mt-0.5">
                      +{booking.sponsors.length - 3} more
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center flex-1 flex flex-col justify-center">
                  <div className="text-[#2d5f4f] text-sm font-black mb-0.5">Available</div>
                  <div className="text-[#c99456] text-xs font-bold bg-[#c99456]/10 rounded-full px-2 py-0.5">
                    Book Now!
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Message */}
      <div className="mt-4 text-center relative z-10 bg-white/60 rounded-2xl px-6 py-2 shadow-lg">
        <p className="text-[#2d5f4f] text-base font-bold">
          Contact the masjid to sponsor an Iftar • Earn endless rewards this blessed month
        </p>
      </div>
    </div>
  );
};

export default RamadanIftarSlide;

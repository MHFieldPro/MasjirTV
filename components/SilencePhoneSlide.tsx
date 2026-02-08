import React, { useEffect, useRef } from 'react';

interface SilencePhoneSlideProps {
  prayerName?: string;
}

const SilencePhoneSlide: React.FC<SilencePhoneSlideProps> = ({ prayerName }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Play notification sound when component mounts
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.log('Audio autoplay prevented:', error);
      });
    }
  }, []);

  return (
    <div className="w-full h-full bg-gradient-to-br from-[#2d5f4f] via-[#1a4d45] to-[#2d5f4f] flex flex-col items-center justify-center p-12 relative overflow-hidden">
      {/* Audio Element - Bell notification sound */}
      <audio ref={audioRef} preload="auto">
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvPSgjMIG2W75+ibUBEPTqTk7bllHAU2jdXxxnMpBSh+zPLaizsKGGS45+yhUhQNTKXi7bllHAU2jdXxxnMpBSiAzvPSgjMIG2S75+ycUBEPTqPk7bllHAU2jdXxxnMpBSh+zPLaizsKGGO45+yhUhQNTKXi7bllHAU2jdXxxnMpBSh+zPLaizsKGGO45+yhUhQNTKXi7bllHAU2jdXxxnMpBSiAzvPSgjMIG2W75+ycUBEPTqTk7bllHAU2jdXxxnMpBSh+zPLaizsKGGS45+yhUhQNTKXi7bllHAU2jdXxxnMpBSh+zPLaizsKGGS45+yhUhQNTKXi7bllHAU2jdXxxnMpBSh+zPLaizsKGGS45+yhUhQNTKXi7bllHAU2jdXxxnMpBSh+zPLaizsKGGS45+yhUhQNTKXi7bllHAU2jdXxxnMpBSh+zPLaizsKGGS45+yhUhQNTKXi7bllHAU2jdXxxnMpBSh+zPLaizsKGGS45+yhUhQNTKXi7bllHAU2jdXxxnMpBSh+zPLaizsKGGS45+yhUhQNTKXi7bllHAU2jdXxxnMpBSh+zPLaizsKGGS45+yhUhQNTKXi7bllHAU2jdXxxnMpBSh+zPLaizsKGGS45+yhUhQNTKXi7bllHAU2jdXxxnMpBSh+zPLaizsKGGS45+yhUhQNTKXi7bllHAU2jdXxxnMpBSh+zPLaizsKGGS45+yhUhQNTKXi7bllHAU2jdXxxnMpBSh+zPLaizsKGGS45+yhUhQNTKXi7bllHAU2jdXxxnMpBSh+zPLaizsKGGS45+yhUhQNTKXi7bllHAU2jdXxxnMpBSh+zPLaizsKGGS45+yhUhQNTKXi7bllHAU2jdXxxnMpBSh+zPLaizsKGGS45+yhUhQNTKXi7bllHAU2jdXxxnMpBSh+zPLaizsKGGS45+yhUhQNTKXi7bllHAU2jdXxxnMpBSh+zPLaizsKGGS45+yhUhQNTKXi7bllHAU2jdXxxnMpBSh+zPLaizsKGGS45+yhUhQNTKXi7bllHAU2jdXxxnMpBSh+zPLaizsKGGS45+yhUhQNTKXi7bllHAU2jdXxxnMpBSh+zPLaizsKGGS45+yhUhQNTKXi7bllHAU2jdXxxnMpBSh+zPLaizsKGGS45+yhUhQNTKXi7bllHAU2jdXxxnMpBSh+zPLaizsKGGS45+yhUhQNTKXi7bllHAU2jdXxxnMpBQ==" type="audio/wav" />
      </audio>
      {/* Animated Rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-96 h-96 border-4 border-white/10 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
        <div className="absolute w-64 h-64 border-4 border-white/20 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
      </div>

      {/* Phone Icon */}
      <div className="relative z-10 mb-12">
        <svg viewBox="0 0 200 200" className="w-48 h-48 drop-shadow-2xl">
          {/* Phone Body */}
          <rect x="60" y="20" width="80" height="160" rx="12" fill="white" stroke="#c99456" strokeWidth="4"/>
          
          {/* Screen */}
          <rect x="70" y="35" width="60" height="110" rx="4" fill="#e8c99f"/>
          
          {/* Silent Icon - Bell with slash */}
          <g transform="translate(100, 90)">
            <path d="M -15 -10 L -10 -15 L -5 -10 L -10 -5 Q -15 -5 -20 0 L -20 5 L 20 5 L 20 0 Q 15 -5 10 -5 L -5 -10 Z" 
                  fill="#c99456"/>
            <ellipse cx="0" cy="8" rx="5" ry="3" fill="#c99456"/>
            {/* Slash */}
            <line x1="-25" y1="-20" x2="25" y2="15" stroke="#d4493e" strokeWidth="5" strokeLinecap="round"/>
          </g>
          
          {/* Home Button */}
          <circle cx="100" cy="160" r="8" fill="#c99456" opacity="0.5"/>
        </svg>
      </div>

      {/* Prayer Name */}
      {prayerName && (
        <div className="text-[#c99456] text-4xl font-black mb-6 tracking-wider relative z-10">
          {prayerName} TIME
        </div>
      )}

      {/* Main Message */}
      <h1 className="text-white text-7xl font-black text-center mb-8 tracking-tight relative z-10 drop-shadow-lg">
        Please Silence
      </h1>
      <h1 className="text-white text-7xl font-black text-center mb-12 tracking-tight relative z-10 drop-shadow-lg">
        Your Phone
      </h1>

      {/* Subtitle */}
      <p className="text-white/80 text-2xl font-semibold text-center relative z-10 max-w-2xl">
        Prayer is about to begin. Please turn off or silence all mobile devices.
      </p>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3">
        <div className="w-3 h-3 bg-white/40 rounded-full animate-pulse"></div>
        <div className="w-3 h-3 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-3 h-3 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
};

export default SilencePhoneSlide;

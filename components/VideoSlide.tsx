import React from 'react';

interface VideoSlideProps {
  videoUrl: string;
  title?: string;
}

const VideoSlide: React.FC<VideoSlideProps> = ({ videoUrl, title }) => {
  // Convert YouTube URL to embed URL
  const getEmbedUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);
      let videoId = '';

      // Handle youtube.com/watch?v=VIDEO_ID
      if (urlObj.hostname.includes('youtube.com')) {
        videoId = urlObj.searchParams.get('v') || '';
      }
      // Handle youtu.be/VIDEO_ID
      else if (urlObj.hostname.includes('youtu.be')) {
        videoId = urlObj.pathname.slice(1);
      }

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1`;
      }
    } catch (error) {
      console.error('Invalid video URL:', error);
    }
    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Full screen video - scaled to crop and fill */}
      <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center">
        <iframe
          src={embedUrl}
          title={title || 'Video'}
          className="absolute"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ 
            border: 'none',
            width: '177.77vh', // 16:9 ratio scaled to height
            height: '56.25vw', // 16:9 ratio scaled to width
            minWidth: '100%',
            minHeight: '100%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />
      </div>
      
      {/* Optional title overlay */}
      {title && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 z-10">
          <h2 className="text-white text-4xl font-bold tracking-wide">{title}</h2>
        </div>
      )}
    </div>
  );
};

export default VideoSlide;

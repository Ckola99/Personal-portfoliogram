import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

function getYoutubeId(url) {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]{11})/
  );
  return match ? match[1] : null;
}

export default function VideoModal({ reel, onClose }) {
  if (!reel) return null;

  const videoId = getYoutubeId(reel.youtubeUrl);

  return createPortal(
    <div
      className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-black rounded-2xl overflow-hidden w-full max-w-sm animate-scale-in shadow-2xl"
        style={{ aspectRatio: '9/16' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="close video"
          onClick={onClose}
          className="absolute top-2 right-2 z-10 p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-all duration-200 hover:rotate-90"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {videoId ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={reel.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="flex items-center justify-center h-full text-white/70 text-sm p-4 text-center">
            Video unavailable.
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

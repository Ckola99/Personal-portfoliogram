import { Play } from 'lucide-react';
import { reels } from '@/data/portfolioData';
import SideActions from './SideActions';

function ReelCard({ reel, index }) {
  return (
    <div
      className="relative bg-zinc-900 rounded-xl overflow-hidden group animate-slide-up shadow-lg"
      style={{
        animationDelay: `${index * 100}ms`,
        aspectRatio: '9/16',
      }}
    >
      {/* Background Thumbnail Image */}
      <img
        src={reel.thumbnail}
        alt={reel.title}
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
      />

      {/* Play Button - Takes user to YouTube */}
      <a
        href={reel.youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors duration-300"
      >
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
          <Play className="w-6 h-6 text-white fill-white ml-0.5" />
        </div>
      </a>

      {/* Info Overlay (Non-clickable part) */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none">
        <h3 className="text-white font-semibold text-xs sm:text-sm mb-0.5 line-clamp-1">{reel.title}</h3>
        <p className="text-white/80 text-[10px] sm:text-xs line-clamp-2">{reel.description}</p>
        <div className="flex items-center gap-2 mt-1.5 text-white/60 text-[10px]">
          <span>{reel.views.toLocaleString()} views</span>
        </div>
      </div>

      {/* Side Actions (Handles GitHub and Share) */}
      <div className="z-10">
        <SideActions reel={reel} />
      </div>
    </div>
  );
}

export default function ReelsSection() {
  return (
    <div className="py-4 px-3 sm:px-4 lg:px-8 relative">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {reels.map((reel, index) => (
            <ReelCard key={reel.id} reel={reel} index={index} />
          ))}
        </div>

        {reels.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No reels yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

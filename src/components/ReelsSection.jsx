import { useState, useRef } from 'react';
import { Play, Volume2, VolumeX, Heart, MessageCircle, Send, Github, ExternalLink } from 'lucide-react';
import { reels } from '@/data/portfolioData';
import { useAuth } from '@/context/AuthContext';
import LoginModal from './LoginModal';

function ReelPlayer({ reel, index }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [likes, setLikes] = useState(reel.likes);
  const [isLiked, setIsLiked] = useState(false);
  const { isLoggedIn } = useAuth();

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleLike = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleShare = async () => {
    if (reel.githubUrl) {
      try {
        await navigator.clipboard.writeText(reel.githubUrl);
        alert('GitHub link copied to clipboard!');
      } catch (err) {
        window.open(reel.githubUrl, '_blank');
      }
    }
  };

  return (
    <>
      <div
        className="relative bg-black rounded-xl overflow-hidden group animate-slide-up shadow-lg"
        style={{
          animationDelay: `${index * 100}ms`,
          aspectRatio: '9/16',
        }}
      >
        {/* Video */}
        <video
          ref={videoRef}
          src={reel.videoUrl}
          poster={reel.thumbnail}
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover"
          onClick={togglePlay}
        />

        {/* Play/Pause Overlay */}
        {!isPlaying && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white ml-0.5" />
            </div>
          </button>
        )}

        {/* Controls */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex flex-col gap-1.5 sm:gap-2">
          <button
            onClick={toggleMute}
            className="p-1.5 sm:p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-all duration-200 hover:scale-110"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          </button>
        </div>

        {/* Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-white font-semibold text-xs sm:text-sm mb-0.5 line-clamp-1">{reel.title}</h3>
          <p className="text-white/80 text-[10px] sm:text-xs line-clamp-3">{reel.description}</p>
          <div className="flex items-center gap-2 mt-1 sm:mt-1.5 text-white/60 text-[10px] sm:text-xs">
            <span>{reel.views.toLocaleString()} views</span>
          </div>
        </div>

        {/* Side Actions */}
        <div className="absolute right-1.5 sm:right-2 bottom-16 sm:bottom-20 flex flex-col gap-2 sm:gap-2.5">
          <button
            onClick={handleLike}
            className="flex flex-col items-center gap-0.5 text-white transition-transform duration-200 hover:scale-110"
          >
            <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            <span className="text-[10px] sm:text-xs">{likes}</span>
          </button>
          <button
            onClick={handleShare}
            className="flex flex-col items-center gap-0.5 text-white transition-transform duration-200 hover:scale-110 hover:rotate-12"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          {reel.githubUrl && (
            <a
              href={reel.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-0.5 text-white transition-transform duration-200 hover:scale-110"
            >
              <Github className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          )}
          {reel.projectUrl && (
            <a
              href={reel.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-0.5 text-white transition-transform duration-200 hover:scale-110"
            >
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          )}
        </div>
      </div>

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </>
  );
}

export default function ReelsSection() {
  return (
    <div className="py-4 px-3 sm:px-4 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Reels Grid - Better space usage on mobile */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {reels.map((reel, index) => (
            <ReelPlayer key={reel.id} reel={reel} index={index} />
          ))}
        </div>

        {reels.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <p className="text-muted-foreground">No reels yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

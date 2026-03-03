import { useState, useRef, useEffect } from 'react';
import { 
  ChevronDown, 
  Github, 
  Linkedin, 
  Download, 
  MapPin, 
  Mail, 
  Check,
  UserPlus
} from 'lucide-react';
import { socialLinks, profileStats } from '@/data/portfolioData';

export default function ProfileHeader() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/ChristopherAmenKola_CV2026.pdf';
    link.download = 'ChristopherAmenKola_CV2026.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="profile" className="pt-4 pb-4 sm:pb-8 px-3 sm:px-4 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 md:gap-10">
          {/* Avatar with animation */}
          <div className="story-ring flex-shrink-0 mx-auto sm:mx-0 animate-scale-in">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden bg-secondary border-2 sm:border-4 border-background transition-transform duration-300 hover:scale-105">
              <img
                src="/profile-photo.jpg"
                alt="Christopher Kola"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 w-full animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {/* Username and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <h1 className="text-lg sm:text-xl font-semibold text-center sm:text-left animate-fade-in">christopherkola</h1>
              
              <div className="flex items-center justify-center sm:justify-start gap-2">
                {/* Following Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-1 px-3 sm:px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-xs sm:text-sm hover:opacity-90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isFollowing ? (
                      <>
                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>Following</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>Follow</span>
                      </>
                    )}
                    <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5 sm:ml-1 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-44 sm:w-48 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50 animate-dropdown">
                      <a
                        href={socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-secondary transition-colors duration-200"
                      >
                        <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-xs sm:text-sm font-medium">GitHub</span>
                      </a>
                      <a
                        href={socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-secondary transition-colors duration-200"
                      >
                        <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-xs sm:text-sm font-medium">LinkedIn</span>
                      </a>
                      <div className="border-t border-border">
                        <button
                          onClick={() => {
                            setIsFollowing(!isFollowing);
                            setDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-secondary transition-colors duration-200"
                        >
                          {isFollowing ? (
                            <>
                              <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                              <span className="text-xs sm:text-sm font-medium">Unfollow</span>
                            </>
                          ) : (
                            <>
                              <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                              <span className="text-xs sm:text-sm font-medium">Follow</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Download CV Button */}
                <button
                  onClick={handleDownloadCV}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 border border-border rounded-lg font-medium text-xs sm:text-sm hover:bg-secondary transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>CV</span>
                </button>
              </div>
            </div>

            {/* Stats with stagger animation */}
            <div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-6 md:gap-8 mb-3 sm:mb-4">
              <div className="text-center sm:text-left animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <span className="font-semibold text-sm sm:text-base">{profileStats.posts}</span>
                <span className="text-muted-foreground ml-1 text-xs sm:text-sm">posts</span>
              </div>
              <div className="text-center sm:text-left animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <span className="font-semibold text-sm sm:text-base">{profileStats.followers.toLocaleString()}</span>
                <span className="text-muted-foreground ml-1 text-xs sm:text-sm">followers</span>
              </div>
              <div className="text-center sm:text-left animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <span className="font-semibold text-sm sm:text-base">{profileStats.following.toLocaleString()}</span>
                <span className="text-muted-foreground ml-1 text-xs sm:text-sm">following</span>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-0.5 sm:space-y-1 text-center sm:text-left animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <h2 className="font-semibold text-sm sm:text-base">Christopher Kola</h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Cloud Engineer | Software Developer
              </p>
              <p className="text-xs sm:text-sm px-4 sm:px-0">
                I build reliable systems, automate deployments, and ship clean full-stack products. 
                Currently studying at WeThinkCode_ 🎓
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Johannesburg, South Africa
                </span>
                <a 
                  href={`mailto:${socialLinks.email}`}
                  className="flex items-center gap-1 hover:text-foreground transition-colors duration-200"
                >
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">{socialLinks.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState, useEffect, useRef } from 'react';
import { skills } from '@/data/portfolioData';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function SkillsHighlights() {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Trigger slide-in animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo = direction === 'left'
        ? scrollLeft - clientWidth / 2
        : scrollLeft + clientWidth / 2;

      scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const openSkill = (skill, index) => {
    setSelectedSkill(skill);
    setCurrentIndex(index);
  };

  const closeSkill = () => {
    setSelectedSkill(null);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : skills.length - 1;
    setCurrentIndex(newIndex);
    setSelectedSkill(skills[newIndex]);
  };

  const goToNext = () => {
    const newIndex = currentIndex < skills.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setSelectedSkill(skills[newIndex]);
  };

  return (
    <div className="py-3 sm:py-6 px-3 sm:px-4 lg:px-8 border-b border-border relative group/container" ref={containerRef}>
      <div className="max-w-4xl mx-auto relative">
        {/* Left Scroll Button - Only visible on hover on Desktop */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-[-40px] top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border border-border p-1.5 rounded-full shadow-lg opacity-0 group-hover/container:opacity-100 transition-opacity hidden md:flex hover:bg-accent"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Skills Stories - Slide in from left */}
        <div ref={scrollContainerRef} className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide pb-2 pt-4 px-2 -mx-2">
          {skills.map((skill, index) => (
            <button
              key={skill.id}
              onClick={() => openSkill(skill, index)}
              className={`flex flex-col items-center gap-1.5 sm:gap-2 flex-shrink-0 group transition-all duration-500 ${isVisible
                ? 'translate-x-0 opacity-100'
                : '-translate-x-full opacity-0'
                }`}
              style={{
                transitionDelay: `${index * 80}ms`,
              }}
            >
              <div className="story-ring group-hover:scale-110 transition-transform duration-300">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-card border-2 sm:border-4 border-background flex items-center justify-center text-lg sm:text-xl md:text-2xl group-hover:rotate-6 transition-transform duration-300">
                  {skill.icon}
                </div>
              </div>
              <span className="text-[10px] sm:text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-200 max-w-[60px] sm:max-w-[70px] truncate">
                {skill.name}
              </span>
            </button>
          ))}
        </div>

        {/* Right Scroll Button - Only visible on hover on Desktop */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-[-40px] top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border border-border p-1.5 rounded-full shadow-lg opacity-0 group-hover/container:opacity-100 transition-opacity hidden md:flex hover:bg-accent"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Skill Detail Modal */}
      {selectedSkill && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center animate-fade-in p-4"
          onClick={closeSkill}
        >
          {/* Close button */}
          <button
            onClick={closeSkill}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 text-white/80 hover:text-white transition-all duration-200 hover:rotate-90 hover:scale-110"
          >
            <X className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Navigation */}
          <button
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            className="absolute left-2 sm:left-4 p-2 text-white/80 hover:text-white transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-2 sm:right-4 p-2 text-white/80 hover:text-white transition-all duration-200 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Skill Content */}
          <div
            className="bg-card rounded-2xl p-6 sm:p-8 max-w-sm w-full mx-4 text-center animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-3xl sm:text-4xl md:text-5xl animate-bounce-subtle">
              {selectedSkill.icon}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 animate-slide-up">{selectedSkill.name}</h3>
            <span className="inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-secondary text-secondary-foreground capitalize animate-fade-in" style={{ animationDelay: '0.1s' }}>
              {selectedSkill.category}
            </span>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground animate-slide-up" style={{ animationDelay: '0.15s' }}>
              Part of my technical stack. Used in various projects and production environments.
            </p>

            {/* Progress indicator */}
            <div className="flex justify-center gap-1 mt-4 sm:mt-6">
              {skills.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-5 sm:w-6 bg-primary' : 'w-1.5 sm:w-2 bg-secondary'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

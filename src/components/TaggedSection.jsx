import { useState } from 'react';
import { Award, Briefcase, FileBadge, GraduationCap, Calendar } from 'lucide-react';
import { achievements } from '@/data/portfolioData';

const typeIcons = {
  certificate: FileBadge,
  award: Award,
  experience: Briefcase,
};

const typeLabels = {
  certificate: 'Certificate',
  award: 'Award',
  experience: 'Experience',
};

export default function TaggedSection() {
  const [filter, setFilter] = useState('all');

  const filteredAchievements = filter === 'all' 
    ? achievements 
    : achievements.filter(a => a.type === filter);

  return (
    <div className="py-4 px-3 sm:px-4 lg:px-8 min-h-[calc(100vh-350px)]">
      <div className="max-w-4xl mx-auto">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-4 sm:mb-5 overflow-x-auto scrollbar-hide pb-1">
          {['all', 'experience', 'certificate', 'award'].map((type, index) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap transition-all duration-300 flex-shrink-0 animate-slide-up ${
                filter === type
                  ? 'bg-primary text-primary-foreground scale-105'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {type === 'all' ? 'All' : typeLabels[type]}
            </button>
          ))}
        </div>

        {/* Achievements Grid - Compact layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          {filteredAchievements.map((achievement, index) => {
            const Icon = typeIcons[achievement.type];
            return (
              <div
                key={achievement.id}
                className="bg-card border border-border rounded-lg sm:rounded-xl p-3 sm:p-4 hover:border-primary/30 transition-all duration-300 group animate-slide-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="flex items-start gap-2.5 sm:gap-3">
                  {/* Icon */}
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground capitalize">
                        {typeLabels[achievement.type]}
                      </span>
                    </div>
                    <h3 className="font-semibold text-xs sm:text-sm mb-0.5 line-clamp-2 leading-tight">{achievement.title}</h3>
                    <p className="text-muted-foreground text-[10px] sm:text-xs mb-1">{achievement.organization}</p>
                    
                    {achievement.description && (
                      <p className="text-[10px] sm:text-xs text-muted-foreground mb-1.5 line-clamp-2">
                        {achievement.description}
                      </p>
                    )}

                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-0.5">
                        <Calendar className="w-3 h-3" />
                        {achievement.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredAchievements.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <p className="text-muted-foreground">No achievements found.</p>
          </div>
        )}

        {/* Education Section - Compact */}
        <div className="mt-5 sm:mt-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <h3 className="font-semibold text-sm sm:text-base mb-2.5 sm:mb-3 flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
            Education
          </h3>
          <div className="bg-card border border-border rounded-lg sm:rounded-xl p-3 sm:p-4 hover:border-primary/30 transition-all duration-300 group">
            <div className="flex items-start gap-2.5 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-xs sm:text-sm mb-0.5 line-clamp-2 leading-tight">Diploma in Software Engineering (Full-Stack)</h4>
                <p className="text-muted-foreground text-[10px] sm:text-xs">WeThinkCode_ — NQF Level 6</p>
                <p className="text-muted-foreground text-[10px] sm:text-xs">Feb 2025 - May 2026</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1.5 line-clamp-2">
                  Comprehensive full-stack software engineering program covering cloud, DevOps, 
                  backend systems, and modern frontend development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

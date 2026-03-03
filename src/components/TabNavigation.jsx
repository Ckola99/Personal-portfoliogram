import { Grid3X3, Clapperboard, Bookmark } from 'lucide-react';

const tabs = [
  { id: 'posts', icon: Grid3X3, label: 'Posts' },
  { id: 'reels', icon: Clapperboard, label: 'Reels' },
  { id: 'tagged', icon: Bookmark, label: 'Tagged' },
];

export default function TabNavigation({ activeTab, onTabChange }) {
  return (
    <nav className="sticky top-0 z-40 bg-background/95 backdrop-blur-xl border-t border-border animate-slide-down">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center justify-center gap-2 px-6 sm:px-12 py-3 text-sm font-medium transition-all duration-300 relative ${
                  isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} />
                <span className="hidden sm:inline">{tab.label}</span>
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-foreground animate-slide-in-right" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

import { useState, useEffect } from 'react';
import { Sun, Moon, User, LogOut, Mail } from 'lucide-react';
import { ThemeProvider, AuthProvider, PostsProvider } from '@/context';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import ProfileHeader from '@/components/ProfileHeader';
import SkillsHighlights from '@/components/SkillsHighlights';
import TabNavigation from '@/components/TabNavigation';
import PostsGrid from '@/components/PostsGrid';
import ReelsSection from '@/components/ReelsSection';
import TaggedSection from '@/components/TaggedSection';
import LoginModal from '@/components/LoginModal';
import './App.css';

function TopBar() {
  const { theme, toggleTheme, isTransitioning } = useTheme();
  const { user, isLoggedIn, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      {/* Theme Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-[300] bg-background animate-theme-flash pointer-events-none" />
      )}
      
      {/* Top Controls - NOT sticky, scrolls with page */}
      <div className="flex justify-end gap-2 p-3 sm:p-4 animate-fade-in">
        {/* Message Button */}
        <a
          href="mailto:christopherkola@gmail.com"
          className="p-2 sm:p-2.5 rounded-full bg-card border border-border hover:bg-secondary hover:border-primary/30 hover:scale-110 transition-all duration-300"
          aria-label="Send message"
        >
          <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
        </a>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 sm:p-2.5 rounded-full bg-card border border-border hover:bg-secondary hover:border-primary/30 hover:scale-110 hover:rotate-12 transition-all duration-300"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon className="w-4 h-4 sm:w-5 sm:h-5" /> : <Sun className="w-4 h-4 sm:w-5 sm:h-5" />}
        </button>

        {/* Login/Logout */}
        {isLoggedIn ? (
          <button
            onClick={logout}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full bg-card border border-border hover:bg-secondary hover:border-primary/30 transition-all duration-300 hover:scale-105"
          >
            <img src={user?.avatar} alt={user?.username} className="w-5 h-5 sm:w-6 sm:h-6 rounded-full" />
            <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        ) : (
          <button
            onClick={() => setShowLoginModal(true)}
            className="p-2 sm:p-2.5 rounded-full bg-card border border-border hover:bg-secondary hover:border-primary/30 hover:scale-110 transition-all duration-300"
            aria-label="Login"
          >
            <User className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}
      </div>

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </>
  );
}

function AppContent() {
  const [activeTab, setActiveTab] = useState('posts');

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Main Content */}
      <main className="max-w-4xl mx-auto pb-6">
        {/* Top Bar - Scrolls with content */}
        <TopBar />
        
        {/* Profile Header */}
        <ProfileHeader />
        
        {/* Skills Highlights */}
        <SkillsHighlights />
        
        {/* Tab Navigation */}
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* Content Area with sliding animation */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${['posts', 'reels', 'tagged'].indexOf(activeTab) * 100}%)` }}
          >
            {/* Posts Section */}
            <div className="w-full flex-shrink-0">
              <PostsGrid />
            </div>
            
            {/* Reels Section */}
            <div className="w-full flex-shrink-0">
              <ReelsSection />
            </div>
            
            {/* Tagged Section */}
            <div className="w-full flex-shrink-0">
              <TaggedSection />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PostsProvider>
          <AppContent />
        </PostsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

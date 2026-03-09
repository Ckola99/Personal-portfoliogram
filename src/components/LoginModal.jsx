import { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function LoginModal({ onClose }) {
  const [username, setUsername] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      login(username.trim());
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-card border border-border rounded-2xl p-5 sm:p-6 w-full max-w-sm animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold">Login</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-all duration-200 hover:rotate-90"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-muted-foreground text-sm mb-5 sm:mb-6">
          Enter a username to like posts and leave comments.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 text-sm"
              autoFocus
            />
          </div>
          <button
            type="submit"
            disabled={!username.trim()}
            className="w-full py-2.5 sm:py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-all duration-200 disabled:opacity-50 text-sm animate-slide-up hover:scale-[1.02] active:scale-[0.98]"
            style={{ animationDelay: '0.2s' }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

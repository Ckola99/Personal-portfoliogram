import { useState } from 'react';
import { Plus } from 'lucide-react';
import { usePosts } from '@/context/PostsContext';
import { useAuth } from '@/context/AuthContext';
import PostCard from './PostCard';
import AddPostModal from './AddPostModal';

export default function PostsGrid() {
  const { posts } = usePosts();
  const { user } = useAuth();
  const [showAddPost, setShowAddPost] = useState(false);
  const isAdmin = user?.username === 'ChocoMan';

  return (
    <div className="py-4 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-350px)]">
      <div className="max-w-4xl mx-auto">
        {/* Add Post Button - Only for Admin */}
        {isAdmin && (
          <div className="mb-4 animate-fade-in">
            <button
              onClick={() => setShowAddPost(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              Add Post
            </button>
          </div>
        )}

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {posts.map((post, index) => (
            <div 
              key={post.id} 
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <PostCard post={post} isAdmin={isAdmin} />
            </div>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <p className="text-muted-foreground">No posts yet.</p>
          </div>
        )}
      </div>

      {/* Add Post Modal */}
      {showAddPost && (
        <AddPostModal onClose={() => setShowAddPost(false)} />
      )}
    </div>
  );
}

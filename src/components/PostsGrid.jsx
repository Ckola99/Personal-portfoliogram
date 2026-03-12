import { usePosts } from '@/context/PostsContext';
import { useAuth } from '@/context/AuthContext';
import PostCard from './PostCard';
import PostSkeleton from './PostSkeleton';

export default function PostsGrid() {
  const { posts, loading } = usePosts();
  const { user } = useAuth();
  const isAdmin = user?.isAdmin;

  return (
    <div className="py-4 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-350px)]">
      <div className="max-w-6xl mx-auto">

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-3 gap-4 sm:gap-6 items-stretch">
          {loading ? (
            // Show 6 skeleton cards while loading
            Array.from({ length: 6 }).map((_, i) => (
              <PostSkeleton key={i} />
            ))
          ) : (
            // Show actual posts
            posts.map((post, index) => (
              <div
                key={post.id}
                className="animate-slide-up h-full"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PostCard post={post} isAdmin={isAdmin} />
              </div>
            ))
          )}
        </div>

        {!loading && posts.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <p className="text-muted-foreground">No posts yet.</p>
          </div>
        )}
      </div>

    </div>
  );
}

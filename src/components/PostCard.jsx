import { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, Github, MoreHorizontal, Trash2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { usePosts } from '@/context/PostsContext';
import LoginModal from './LoginModal';

export default function PostCard({ post, isAdmin = false }) {
  const { user, isLoggedIn } = useAuth();
  const { likePost, unlikePost, addComment, deleteComment, deletePost, hasLiked } = usePosts();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(user ? hasLiked(post.id, user.id) : false);
  const [localLikes, setLocalLikes] = useState(post.likes);
  const [showActions, setShowActions] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const CHAR_LIMIT = 100;

  const handleLike = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    if (user) {
      if (isLiked) {
        unlikePost(post.id, user.id);
        setLocalLikes((prev) => prev - 1);
      } else {
        likePost(post.id, user.id);
        setLocalLikes((prev) => prev + 1);
      }
      setIsLiked(!isLiked);
    }
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    if (user && commentText.trim()) {
      addComment(post.id, {
        userId: user.id,
        username: user.username,
        avatar: user.avatar,
        text: commentText.trim(),
      });
      setCommentText('');
    }
  };

  const handleShare = async () => {
    if (post.githubUrl) {
      try {
        await navigator.clipboard.writeText(post.githubUrl);
        alert('GitHub link copied to clipboard!');
      } catch (err) {
        window.open(post.githubUrl, '_blank');
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const isLongCaption = post.caption.length > CHAR_LIMIT;
  const displayedCaption = isExpanded || !isLongCaption
    ? post.caption
    : `${post.caption.substring(0, CHAR_LIMIT)}...`;

  return (
    <>
      <article className="flex flex-col h-full bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/20">
        {/* Post Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center transition-transform duration-300 hover:scale-110">
              <span className="text-xs sm:text-sm font-semibold">CK</span>
            </div>
            <span className="font-semibold text-xs sm:text-sm">christopherkola</span>
          </div>
          {isAdmin && (
            <div className="relative">
              <button
                onClick={() => setShowActions(!showActions)}
                className="p-1.5 sm:p-2 hover:bg-secondary rounded-lg transition-all duration-200 hover:rotate-90"
              >
                <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              {showActions && (
                <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-10 animate-dropdown">
                  <button
                    onClick={() => deletePost(post.id)}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 text-destructive hover:bg-destructive/10 transition-colors duration-200 w-full"
                  >
                    <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">Delete</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Post Image */}
        <div className="aspect-square bg-secondary relative group overflow-hidden shrink-0">
          <img
            src={post.image}
            alt={post.caption}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {post.githubUrl && (
            <a
              href={post.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 bg-black/50 backdrop-blur-sm rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-black/70"
            >
              <Github className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          )}
        </div>

        {/* Post Actions */}
        <div className="p-3 sm:p-4 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={handleLike}
                className={`transition-all duration-200 active:scale-125 ${isLiked ? 'animate-like-bounce' : 'hover:scale-110'}`}
              >
                <Heart
                  className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-200 ${isLiked ? 'fill-red-500 text-red-500' : ''}`}
                />
              </button>
              <button
                onClick={() => setShowComments(!showComments)}
                className="transition-all duration-200 hover:scale-110"
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={handleShare}
                className="transition-all duration-200 hover:scale-110 hover:rotate-12"
              >
                <Send className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
            <button className="transition-all duration-200 hover:scale-110">
              <Bookmark className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Likes */}
          <div className="mb-1.5 sm:mb-2">
            <span className="font-semibold text-xs sm:text-sm">{localLikes.toLocaleString()} likes</span>
          </div>

          {/* Caption */}
          <div className="mb-1.5 sm:mb-2 flex-1">
            <span className="font-semibold text-xs sm:text-sm mr-1.5 sm:mr-2">christopherkola</span>
            <span className="text-xs sm:text-sm break-words">
              {displayedCaption}
              {isLongCaption && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="ml-1 text-muted-foreground hover:text-primary font-medium"
                >
                  {isExpanded ? ' less' : ' more'}
                </button>
              )}
            </span>
          </div>

          {/* Tags */}
          <div className="mt-auto">
            <div className="flex flex-wrap gap-1 mb-1.5">
              {post.tags.map((tag, idx) => (
                <span key={idx} className="text-xs text-primary hover:underline cursor-pointer">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Comments Count */}
            {post.comments.length > 0 && (
              <button
                onClick={() => setShowComments(!showComments)}
                className="block text-xs sm:text-sm text-muted-foreground mb-1.5 hover:text-foreground"
              >
                View all {post.comments.length} comments
              </button>
            )}

            <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">
              {formatDate(post.createdAt)}
            </div>
          </div>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="border-t border-border p-3 sm:p-4 animate-slide-down">
            {/* Existing Comments */}
            <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4 max-h-48 sm:max-h-60 overflow-y-auto">
              {post.comments.map((comment, idx) => (
                <div
                  key={comment.id}
                  className="flex items-start gap-2 sm:gap-3 animate-fade-in"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <img
                    src={comment.avatar}
                    alt={comment.username}
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-secondary flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                      <span className="font-semibold text-xs sm:text-sm">{comment.username}</span>
                      <span className="text-[10px] sm:text-xs text-muted-foreground">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm break-words">{comment.text}</p>
                  </div>
                  {isAdmin && (
                    <button
                      onClick={() => deleteComment(post.id, comment.id)}
                      className="p-1 text-destructive hover:bg-destructive/10 rounded transition-all duration-200 flex-shrink-0 hover:scale-110"
                    >
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Add Comment */}
            <form onSubmit={handleComment} className="flex items-center gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 bg-transparent text-xs sm:text-sm outline-none min-w-0"
              />
              <button
                type="submit"
                disabled={!commentText.trim()}
                className="text-primary font-semibold text-xs sm:text-sm disabled:opacity-50 flex-shrink-0 transition-all duration-200 hover:scale-105"
              >
                Post
              </button>
            </form>
          </div>
        )}
      </article>

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </>
  );
}

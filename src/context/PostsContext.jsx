import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import postService from '../services/posts'

const PostsContext = createContext(undefined);

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postService
      .getAll()
      .then(returnedPosts => {
        setPosts(returnedPosts)
      })
      .catch(error => {
        console.error("Failed to fetch posts:", error)
      })
  }, [])

  // A helper function to safely extract IDs (DRY - Don't Repeat Yourself)
  const getUserId = (user) => (user.id || user._id || user).toString();

  const toggleLike = useCallback(async (postId, userId) => {
    const postToUpdate = posts.find(p => p.id === postId);

    // Safety check: Exit if post doesn't exist
    if (!postToUpdate) return;

    // Safely check if user liked it
    const isCurrentlyLiked = Array.isArray(postToUpdate.likedBy) &&
      postToUpdate.likedBy.some(u => getUserId(u) === userId.toString());

    // Calculate new values
    const updatedLikedBy = isCurrentlyLiked
      ? postToUpdate.likedBy.filter(u => getUserId(u) !== userId.toString()) // Remove
      : [...(postToUpdate.likedBy || []), userId]; // Add

    const updatedPost = {
      ...postToUpdate,
      likes: isCurrentlyLiked ? Math.max(0, postToUpdate.likes - 1) : postToUpdate.likes + 1,
      likedBy: updatedLikedBy
    };

    try {
      const returnedPost = await postService.update(postId, updatedPost);
      setPosts(prev => prev.map(p => p.id === postId ? returnedPost : p));
    } catch (error) {
      console.error("Toggle like failed:", error);
    }
  }, [posts]);

  const addComment = useCallback(async (postId, comment) => {
    const postToUpdate = posts.find((p) => p.id === postId);
    if (!postToUpdate) return;

    const newComment = {
      ...comment,
      id: `c${Date.now()}`,
      postId,
      createdAt: new Date().toISOString(),
    };

    const updatedPost = {
      ...postToUpdate,
      comments: [...postToUpdate.comments, newComment],
    };

    try {
      const returnedPost = await postService.update(postId, updatedPost);

      setPosts((prev) =>
        prev.map((post) => (post.id === postId ? returnedPost : post))
      );
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  }, [posts]);

  const deleteComment = useCallback(async (postId, commentId) => {
    const postToUpdate = posts.find((p) => p.id === postId);
    if (!postToUpdate) return;

    const updatedPost = {
      ...postToUpdate,
      comments: postToUpdate.comments.filter((c) => c.id !== commentId),
    };

    try {
      const returnedPost = await postService.update(postId, updatedPost);

      setPosts((prev) =>
        prev.map((post) => (post.id === postId ? returnedPost : post))
      );
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  }, [posts]);

  const replyToComment = useCallback((postId, parentCommentId, reply) => {
    const newReply = {
      ...reply,
      id: `c${Date.now()}`,
      postId,
      createdAt: new Date().toISOString(),
    };
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          comments: post.comments.map((comment) =>
            comment.id === parentCommentId
              ? { ...comment, replies: [...(comment.replies || []), newReply] }
              : comment
          ),
        };
      })
    );
  }, []);

  const deletePost = useCallback((postId) => {
    setPosts((prev) => prev.filter((post) => post.id !== postId));
  }, []);

  const hasLiked = useCallback(
    (postId, userId) => {
      const post = posts.find((p) => p.id === postId);

      if (!post || !Array.isArray(post.likedBy)) return false;
      return post.likedBy.some(user => {
        const currentUserId = user.id || user._id || user;
        return currentUserId.toString() === userId.toString();
      })
    },
    [posts]
  );

  return (
    <PostsContext.Provider
      value={{
        posts,
        toggleLike,
        addComment,
        deleteComment,
        replyToComment,
        deletePost,
        hasLiked,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
}

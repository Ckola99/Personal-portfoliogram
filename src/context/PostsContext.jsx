import React, { createContext, useContext, useState, useCallback } from 'react';
import { posts as initialPosts } from '@/data/portfolioData';

const PostsContext = createContext(undefined);

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState(initialPosts);

  const likePost = useCallback((postId, userId) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId && !post.likedBy.includes(userId)
          ? { ...post, likes: post.likes + 1, likedBy: [...post.likedBy, userId] }
          : post
      )
    );
  }, []);

  const unlikePost = useCallback((postId, userId) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId && post.likedBy.includes(userId)
          ? {
              ...post,
              likes: Math.max(0, post.likes - 1),
              likedBy: post.likedBy.filter((id) => id !== userId),
            }
          : post
      )
    );
  }, []);

  const addComment = useCallback((postId, comment) => {
    const newComment = {
      ...comment,
      id: `c${Date.now()}`,
      postId,
      createdAt: new Date().toISOString(),
    };
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );
  }, []);

  const deleteComment = useCallback((postId, commentId) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, comments: post.comments.filter((c) => c.id !== commentId) }
          : post
      )
    );
  }, []);

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
      return post ? post.likedBy.includes(userId) : false;
    },
    [posts]
  );

  return (
    <PostsContext.Provider
      value={{
        posts,
        likePost,
        unlikePost,
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

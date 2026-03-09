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

  const likePost = useCallback(async (postId, userId) => {
    const postToLike = posts.find(p => p.id === postId);

    if (!postToLike || postToLike.likedBy.includes(userId)) return;

    const updatedPost = {
      ...postToLike,
      likes: postToLike.likes + 1,
      likedBy: [...postToLike.likedBy, userId]
    };

    try {
      const returnedPost = await postService.update(postId, updatedPost);
      setPosts(prev => prev.map(p => p.id !== postId ? p : returnedPost));
    } catch (error) {
      console.error("Failed to like post:", error);
      alert("Could not save like. Please try again.");
    }
  }, [posts]);

  const unlikePost = useCallback(async (postId, userId) => {
    const postToUnlike = posts.find(p => p.id === postId)

    if (!postToUnlike || !postToUnlike.likedBy.includes(userId)) return;

    const updatedPost = {
      ...postToUnlike,
      likes: Math.max(0, postToUnlike.likes - 1),
      likedBy: postToUnlike.likedBy.filter(id => id !== userId)
    };

    try {
      const returnedPost = await postService.update(postId, updatedPost);
      setPosts(prev => prev.map(p => p.id !== postId ? p : returnedPost));
    } catch (error) {
      console.error("Failed to unlike post:", error);
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

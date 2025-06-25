import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [postMode, setpostMode] = useState("Add");
  const [loading, setLoading] = useState(true);
  const { token, user } = useContext(AuthContext);

  // Fetch posts
  const getAllPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://blog-system-server.vercel.app/api/posts",
        {
          credentials: "include",
          headers: { "content-type": "application/json" },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch posts");
      }
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  //handlers
  const handleEditPost = () => {
    setpostMode("Edit");
  };

  const handleAddPost = () => {
    setpostMode("Add");
  };

  //Post operations
  const createPost = async (postData) => {
    const response = await fetch(
      "https://blog-system-server.vercel.app/api/posts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to create post");
    }

    setPosts([data, ...posts]);
    return data;
  };

  const updatePost = async (postId, postData) => {
    const response = await fetch(
      `https://blog-system-server.vercel.app/api/posts/${postId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to update post");
    }

    setPosts(posts.map((post) => (post._id === postId ? data : post)));
    return data;
  };

  const deletePost = async (postId) => {
    const response = await fetch(
      `https://blog-system-server.vercel.app/api/posts/${postId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to delete post");
    }

    setPosts(posts.filter((post) => post._id !== postId));
  };

  // Like and Unlike operations
  const likePost = async (postId) => {
    try {
      const res = await fetch(
        `https://blog-system-server.vercel.app/api/posts/${postId}/like`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to like post");

      // Optimistically update state
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: [...post.likes, user.id], // add current user to likes
              }
            : post
        )
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const unlikePost = async (postId) => {
    try {
      const res = await fetch(
        `https://blog-system-server.vercel.app/api/posts/${postId}/unlike`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to unlike post");

      // Optimistically update state
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: post.likes.filter((uid) => uid !== user.id),
              }
            : post
        )
      );
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  // Comment operations
  const addComment = async (postId, commentText) => {
    const response = await fetch(
      `https://blog-system-server.vercel.app/api/posts/${postId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: commentText }),
      }
    );

    const newComment = await response.json();

    if (!response.ok) {
      throw new Error(newComment.message || "Failed to add comment");
    }

    // Update post with new comment
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );

    return newComment;
  };

  const deleteComment = async (postId, commentId) => {
    const response = await fetch(
      `https://blog-system-server.vercel.app/api/posts/${postId}/comments/${commentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to delete comment");
    }

    // Remove comment from state
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? {
              ...post,
              comments: post.comments.filter((c) => c._id !== commentId),
            }
          : post
      )
    );
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        postMode,
        handleAddPost,
        handleEditPost,
        createPost,
        updatePost,
        deletePost,
        likePost,
        unlikePost,
        addComment,
        deleteComment,
        token,
        user,
        isLoggedIn: !!(token && user),
        postsLoading: loading,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

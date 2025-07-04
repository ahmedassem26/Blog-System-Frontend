import { useContext, useEffect, useState } from "react";
import { PostsContext } from "../context/PostsContext";
import { Link } from "react-router-dom";
import Modal from "./Modal";

function Post({ post }) {
  const {
    token,
    user,
    deletePost,
    likePost,
    unlikePost,
    addComment,
    deleteComment,
  } = useContext(PostsContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(() => post.likes.includes(user?.id));
  const [showAllComments, setShowAllComments] = useState(false);
  const [showComments, setShowComments] = useState(false); // New state for showing/hiding comments section

  const commentsToShow = showAllComments
    ? post.comments
    : post.comments?.slice(0, 1);
  const hasMoreComments = post.comments?.length > 1;

  useEffect(() => {
    setIsLiked(post.likes.includes(user?.id));
  }, [post.likes, user]);

  const handleDeleteClick = () => {
    setModalOpen(true);
  };

  const handleDelete = () => {
    deletePost(post._id);
    setModalOpen(false);
  };

  const handleLikeToggle = async () => {
    if (!token) return;
    if (isLiked) {
      await unlikePost(post._id);
    } else {
      await likePost(post._id);
    }
  };

  const handleCommentsToggle = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="group relative bg-base-300/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 ring-1 ring-purple-500/10 hover:ring-purple-500/30 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-purple-500/20 w-full max-w-sm mx-auto overflow-hidden">
      {/* Subtle background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-transparent to-purple-900/5 pointer-events-none"></div>

      {/* Image section with enhanced styling */}
      <figure className="relative overflow-hidden">
        {!imageLoaded && (
          <div className="w-full h-48 bg-gradient-to-br from-slate-800 to-slate-700 animate-pulse flex items-center justify-center">
            <svg
              className="w-12 h-12 text-slate-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </div>
        )}
        <img
          src={post.imageUrl}
          alt={post.description}
          className={`w-full aspect-[4/3] object-cover transition-all duration-500 group-hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-0 absolute inset-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </figure>

      {/* Content section */}
      <div className="relative z-10 p-6 space-y-4">
        <h2 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300 leading-tight">
          {post.title}
        </h2>
        <p className="text-slate-300 leading-relaxed line-clamp-3">
          {post.description}
        </p>
        {/* Author info with enhanced styling */}
        <div className="flex items-center gap-3 pt-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">
              {post.author.username[0].toUpperCase()}
            </span>
          </div>
          <span className="text-slate-400">by {post.author.username}</span>
        </div>

        {/* Like, Comments, and actions */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-700/30">
          {/* Like and Comment Buttons */}
          <div className="flex gap-3">
            {/* Like Button */}
            <button
              onClick={handleLikeToggle}
              disabled={!token}
              className={`group/btn flex items-center space-x-2 px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 hover:border-purple-400/50 text-purple-400 hover:text-purple-300 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 ${
                isLiked
                  ? "bg-purple-600/10 text-purple-400 hover:bg-purple-500/20"
                  : "bg-slate-700/20 text-slate-300 hover:bg-slate-700/30"
              } ${!token && " opacity-50 cursor-not-allowed"}`}
              title={token ? "Like" : "Login to like"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={post.likes.includes(user?.id) ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-5 h-5 ${
                  post.likes.includes(user?.id)
                    ? "text-purple-400 drop-shadow-md"
                    : ""
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.014-4.5-4.5-4.5a4.502 4.502 0 0 0-3.75 2.03A4.502 4.502 0 0 0 9 3.75C6.514 3.75 4.5 5.765 4.5 8.25c0 6.25 7.5 11.25 7.5 11.25S21 14.5 21 8.25z"
                />
              </svg>
              <span>{post.likes.length}</span>
            </button>

            {/* Comments Button */}
            <button
              onClick={handleCommentsToggle}
              className={`group/btn flex items-center space-x-2 px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 hover:border-indigo-400/50 text-indigo-400 hover:text-indigo-300 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25 ${
                showComments
                  ? "bg-indigo-600/10 text-indigo-400 hover:bg-indigo-500/20"
                  : ""
              }`}
              title="Comments"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                />
              </svg>
              <span>{post.comments?.length || 0}</span>
            </button>
          </div>

          {/* Edit/Delete Buttons for author only */}
          {token && user && post.author._id === user.id && (
            <div className="flex gap-3">
              {/* Edit Button */}
              <Link
                to={`/edit/${post._id}`}
                className="group/btn flex items-center space-x-2 px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 hover:border-purple-400/50 text-purple-400 hover:text-purple-300 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </Link>

              <button
                onClick={handleDeleteClick}
                className="group/btn flex items-center space-x-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-400/50 text-red-400 hover:text-red-300 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/25"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 group-hover/btn:-rotate-12 transition-transform duration-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Comments Section - Only show when showComments is true */}
        {showComments && (
          <div className="mt-4 border-t border-slate-700/50 pt-4 space-y-3">
            <h3 className="text-slate-300 font-semibold">Comments</h3>

            {post.comments?.length === 0 && (
              <p className="text-slate-500 text-sm">No comments yet.</p>
            )}

            {/* Comments List */}
            <div className="space-y-2">
              {commentsToShow?.map((comment) => (
                <div
                  key={comment._id}
                  className="bg-slate-800/50 p-3 rounded-lg text-sm text-slate-200 flex justify-between items-start gap-3"
                >
                  <div className="flex-1 min-w-0 ">
                    <span className="font-semibold text-purple-400">
                      {comment.user?.username}
                    </span>
                    <span className="text-slate-300">: {comment.text}</span>
                  </div>
                  {token && user?.id === comment.user?._id && (
                    <button
                      onClick={() => deleteComment(post._id, comment._id)}
                      className="flex-shrink-0 p-2 text-red-400 hover:text-red-300 bg-red-500/5 hover:bg-red-500/20 border border-red-500/20 hover:border-red-400/40 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/25 group/delete"
                      title="Delete comment"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 group-hover/delete:rotate-12 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              ))}

              {/* Show More Comments Button */}
              {hasMoreComments && (
                <button
                  onClick={() => setShowAllComments(!showAllComments)}
                  className="w-full text-left text-sm text-purple-400 hover:text-purple-300 font-medium py-2 px-3 rounded-lg hover:bg-purple-500/10 transition-all duration-200 flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-4 h-4 transition-transform duration-200 ${
                      showAllComments ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  <span>
                    {showAllComments
                      ? "Show less comments"
                      : `Show ${post.comments.length - 1} more comment${
                          post.comments.length - 1 > 1 ? "s" : ""
                        }`}
                  </span>
                </button>
              )}
            </div>

            {token && (
              <form
                className="flex gap-2 items-center mt-2"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const commentText = e.target.comment.value.trim();
                  if (!commentText) return;
                  await addComment(post._id, commentText);
                  e.target.reset();
                }}
              >
                <input
                  type="text"
                  name="comment"
                  placeholder="Write a comment..."
                  className="flex-1 px-4 py-2 rounded-lg bg-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm rounded-lg transition"
                >
                  Send
                </button>
              </form>
            )}
          </div>
        )}
      </div>

      {/* Enhanced delete confirmation modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm Delete"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
            <div className="flex-shrink-0">
              <svg
                className="w-6 h-6 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <div>
              <p className="text-base-content/90 font-medium">
                Are you sure you want to delete this post?
              </p>
              <p className="text-base-content/70 text-sm mt-1">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 bg-base-200/50 hover:bg-base-200 border border-base-content/20 hover:border-base-content/30 text-base-content/80 hover:text-base-content rounded-xl transition-all duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-medium rounded-xl shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/40 transform hover:-translate-y-0.5 transition-all duration-300 border border-red-500/20"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Post;

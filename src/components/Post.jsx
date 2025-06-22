import { useContext, useState } from "react";
import { PostsContext } from "../context/PostsContext";
import { Link } from "react-router-dom";
import Modal from "./Modal";

function Post({ post }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { token, user, deletePost } = useContext(PostsContext);

  const handleDeleteClick = () => {
    setModalOpen(true);
  };

  const handleDelete = () => {
    deletePost(post._id);
    setModalOpen(false);
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
          className={`w-full h-48 object-cover transition-all duration-500 group-hover:scale-105 ${
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
        <div className="flex items-center space-x-2 pt-2 border-t border-slate-700/50">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          <span className="text-slate-400 text-sm font-medium">
            by{" "}
            <span className="text-purple-400 font-semibold">
              {post.author.username}
            </span>
          </span>
        </div>

        {/* Action buttons for post owner */}
        {token && user && post.author._id === user.id && (
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-700/30">
            {/* Edit button */}
            <Link
              to={`/edit/${post._id}?title=${encodeURIComponent(
                post.title
              )}&description=${encodeURIComponent(
                post.description
              )}&imageUrl=${encodeURIComponent(post.imageUrl)}`}
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
              <span className="text-sm font-medium">Edit</span>
            </Link>

            {/* Delete button */}
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
              <span className="text-sm font-medium">Delete</span>
            </button>
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

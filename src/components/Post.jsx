import { useContext, useState } from "react";
import { PostsContext } from "../context/PostsContext";
import { Link } from "react-router-dom";
import Modal from "./Modal";

function Post({ post }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const { token, user, deletePost } = useContext(PostsContext);

  const handleDeleteClick = () => {
    setModalOpen(true);
  };

  return (
    <div className="card bg-base-200 active:shadow-purple-900 hover:shadow-purple-900 transition-all duration-300 w-full max-w-sm shadow-lg mx-auto">
      <figure>
        <img
          src={post.imageUrl}
          alt={post.description}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{post.title}</h2>
        <p>{post.description}</p>
        <p className="opacity-50">by: {post.author.username}</p>
        {token && user && post.author._id === user.id && (
          <div className="card-actions justify-end gap-2">
            {/* edit button */}
            <Link
              to={`/edit/${post._id}?title=${encodeURIComponent(
                post.title
              )}&description=${encodeURIComponent(
                post.description
              )}&imageUrl=${encodeURIComponent(post.imageUrl)}`}
              className="btn text-purple-600 hover:text-white hover:bg-purple-700  btn-sm shadow-none transition-all duration-300"
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
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </Link>
            {/* delete button */}
            <button
              onClick={handleDeleteClick}
              className="btn text-red-600 hover:text-white hover:bg-red-800 btn-sm shadow-none transition-all duration-300"
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
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm Delete"
      >
        <p>Are you sure you want to delete this post?</p>
        <div className="modal-action justify-end">
          <button
            onClick={() => {
              deletePost(post._id);
              setModalOpen(false);
            }}
            className="btn btn-error"
          >
            Yes, Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Post;

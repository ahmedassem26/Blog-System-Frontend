import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { PostsContext } from "../context/PostsContext";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";

const AddEditPost = () => {
  const { createPost, updatePost, getPostById } = useContext(PostsContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(!!id);
  const [notFound, setNotFound] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (id) {
      // Use getPostById from context
      const post = getPostById(id);
      if (post) {
        reset({
          title: post.title,
          description: post.description,
          imageUrl: post.imageUrl,
        });
        setLoading(false);
      } else {
        setNotFound(true);
        setLoading(false);
      }
    }
  }, [id, getPostById, reset]);

  const handleFormSubmit = async (data) => {
    const toastId = toast.loading(id ? "Updating post..." : "Creating post...");
    try {
      if (!id) {
        await createPost(data);
        toast.success("Post created!", { id: toastId });
      } else {
        await updatePost(id, data);
        toast.success("Post updated!", { id: toastId });
      }
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Something went wrong.", { id: toastId });
      alert(error.message);
    }
  };

  if (loading) {
    return <Spinner subtext={id ? "Loading post for editing" : "Loading..."} />;
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-red-400 text-lg">Post not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-purple-300 to-purple-400 bg-clip-text text-transparent">
              {!id ? "Create New Post" : "Edit Post"}
            </h1>
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
          </div>
          <p className="text-slate-400 text-lg">
            {!id
              ? "Share your thoughts with the world"
              : "Update your post details"}
          </p>
        </div>

        {/* Form Container */}
        <div className="relative bg-base-300/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 ring-1 ring-purple-500/10 overflow-hidden">
          {/* Subtle background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-transparent to-purple-900/5 pointer-events-none"></div>

          <div className="relative z-10 p-8 sm:p-10">
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="space-y-8"
            >
              {/* Title Field */}
              <div className="space-y-3">
                <label className="flex items-center space-x-2 text-sm font-semibold text-slate-300">
                  <svg
                    className="w-4 h-4 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0l1 16a2 2 0 002 2h6a2 2 0 002-2l1-16"
                    />
                  </svg>
                  <span>Post Title</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    {...register("title", { required: "Title is required" })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter an engaging title..."
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-purple-500/0 pointer-events-none transition-all duration-300 peer-focus:from-purple-500/10 peer-focus:to-purple-500/10"></div>
                </div>
                {errors.title && (
                  <div className="flex items-center space-x-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{errors.title.message}</span>
                  </div>
                )}
              </div>

              {/* Description Field */}
              <div className="space-y-3">
                <label className="flex items-center space-x-2 text-sm font-semibold text-slate-300">
                  <svg
                    className="w-4 h-4 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                  <span>Description</span>
                </label>
                <div className="relative">
                  <textarea
                    {...register("description", {
                      required: "Description is required",
                    })}
                    rows="5"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm resize-none"
                    placeholder="Tell your story in detail..."
                  />
                </div>
                {errors.description && (
                  <div className="flex items-center space-x-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{errors.description.message}</span>
                  </div>
                )}
              </div>

              {/* Image URL Field */}
              <div className="space-y-3">
                <label className="flex items-center space-x-2 text-sm font-semibold text-slate-300">
                  <svg
                    className="w-4 h-4 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Image URL</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    {...register("imageUrl", {
                      required: "Image URL is required",
                    })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 backdrop-blur-sm"
                    placeholder="https://example.com/your-image.jpg"
                  />
                </div>
                {errors.imageUrl && (
                  <div className="flex items-center space-x-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{errors.imageUrl.message}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-8 border-t border-slate-700/30">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="group flex items-center justify-center space-x-2 px-6 py-3 bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600/50 hover:border-slate-500/50 text-slate-300 hover:text-slate-200 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg backdrop-blur-sm"
                >
                  <svg
                    className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  <span className="font-medium">Cancel</span>
                </button>

                <button
                  type="submit"
                  className="group flex items-center justify-center space-x-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transform hover:scale-105 transition-all duration-300 border border-purple-500/20"
                >
                  <svg
                    className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {!id ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    )}
                  </svg>
                  <span>{!id ? "Create Post" : "Update Post"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditPost;

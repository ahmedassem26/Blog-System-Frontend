import { useContext, useEffect } from "react";
import { PostsContext } from "../context/PostsContext";
import { AuthContext } from "../context/AuthContext";
import Post from "../components/Post";
import { Link } from "react-router-dom";

function Home() {
  const { posts, isLoggedIn, handleAddPost } = useContext(PostsContext);
  const { loading } = useContext(AuthContext);
  const { postsLoading } = useContext(PostsContext);

  const isLoadingPosts = loading || postsLoading;

  useEffect(() => {
    if (!isLoadingPosts) {
      // Small delay to ensure content is rendered
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    }
  }, [isLoadingPosts]);

  if (isLoadingPosts) {
    return (
      <div className="min-h-screen flex justify-center items-center  bg-slate-900">
        <div className="relative">
          {/* Enhanced dark loading spinner with purple glow */}
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-700 border-t-purple-500 shadow-lg"></div>
          <div className="absolute inset-0 animate-pulse rounded-full h-16 w-16 bg-purple-500/20 blur-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-300 via-purple-800/20 to-base-300">
      {/* Hero Section with dark theme and purple accents */}
      <div className="relative overflow-hidden">
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
            backgroundSize: "50px 50px",
          }}
        ></div>

        <div className="relative z-10 pt-8 pb-4">
          <h1
            className="text-5xl md:text-6xl mx-4 font-bold text-center text-base-content/90  drop-shadow-2xl opacity-0"
            style={{ animation: "slideInDown 0.8s ease-out forwards" }}
          >
            Welcome to my Blog
          </h1>
          <div
            className="mt-3 flex justify-center opacity-0"
            style={{ animation: "fadeIn 0.6s ease-out 0.4s forwards" }}
          >
            <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full shadow-lg shadow-purple-500/50"></div>
          </div>
          <h2
            className="text-lg md:text-xl font-light text-base-content/80 text-center mx-4 mt-4 opacity-0"
            style={{ animation: "slideInUp 0.6s ease-out 0.6s forwards" }}
          >
            Start your journey with us by browsing our posts
          </h2>
        </div>
      </div>

      {/* Compact divider */}
      <div className="flex justify-center my-6">
        <div className="w-px h-8 bg-gradient-to-b from-transparent via-purple-500/50 to-transparent"></div>
      </div>

      {/* Empty state with dark theme */}
      {posts.length === 0 && (
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-base-300/60 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-slate-700/50 ring-1 ring-purple-500/10">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-base-100 to-purple-800/40 rounded-full flex items-center justify-center border border-purple-500/20 shadow-lg">
              <svg
                className="w-10 h-10 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              No posts yet
            </h3>
            <p className="text-slate-300 mb-8 leading-relaxed">
              {!isLoggedIn
                ? "Ready to share your thoughts? Login to create your first post and start building your blog!"
                : "Time to share your first story! Click below to create your inaugural post."}
            </p>

            {isLoggedIn ? (
              <Link
                onClick={handleAddPost}
                to="/add"
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-medium rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transform hover:-translate-y-1 transition-all duration-300 border border-purple-500/20"
              >
                <svg
                  className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Create First Post
              </Link>
            ) : (
              <Link
                to="/login"
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-medium rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transform hover:-translate-y-1 transition-all duration-300 border border-purple-500/20"
              >
                <svg
                  className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                Login to Start
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Posts grid with dark theme */}
      {posts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Section header */}
          <div className="text-center mb-8">
            <h2
              className="text-2xl font-bold text-white mb-3 opacity-0"
              style={{ animation: "slideInDown 0.6s ease-out 0.2s forwards" }}
            >
              Latest Posts
            </h2>
            <div
              className="flex justify-center opacity-0"
              style={{ animation: "fadeIn 0.6s ease-out 0.4s forwards" }}
            >
              <div className="h-0.5 w-12 bg-gradient-to-r from-purple-500 to-purple-400 rounded-full shadow-lg shadow-purple-500/50"></div>
            </div>
          </div>

          {/* Enhanced grid with dark theme */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 place-items-stretch">
            {posts.map((post, index) => (
              <div
                key={post._id}
                className="opacity-0 animate-pulse"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: `slideInUp 0.6s ease-out ${
                    index * 100
                  }ms forwards`,
                }}
              >
                <Post post={post} />
              </div>
            ))}
          </div>

          {/* Enhanced dark floating action button */}
          {isLoggedIn && (
            <Link
              onClick={handleAddPost}
              to="/add"
              className="group fixed right-6 bottom-6 w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white rounded-full shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:scale-110 transition-all duration-300 flex items-center justify-center z-50 border border-purple-500/20 backdrop-blur-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-7 h-7 group-hover:rotate-90 transition-transform duration-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              {/* Dark floating button glow effect */}
              <div className="absolute inset-0 rounded-full bg-purple-400/20 blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          )}
        </div>
      )}

      {/* Add custom keyframes in a proper style tag */}
      <style>{`
        @keyframes slideInUp {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes slideInDown {
          from { 
            opacity: 0; 
            transform: translateY(-30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes slideInLeft {
          from { 
            opacity: 0; 
            transform: translateX(-30px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        @keyframes slideInRight {
          from { 
            opacity: 0; 
            transform: translateX(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        @keyframes fadeIn {
          from { 
            opacity: 0; 
          }
          to { 
            opacity: 1; 
          }
        }
      `}</style>
    </div>
  );
}

export default Home;

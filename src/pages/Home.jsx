import { useContext } from "react";
import { PostsContext } from "../context/PostsContext";
import { AuthContext } from "../context/AuthContext";
import Post from "../components/Post";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

function Home() {
  const { posts, isLoggedIn, handleAddPost } = useContext(PostsContext);
  const { loading } = useContext(AuthContext);
  const { postsLoading } = useContext(PostsContext);

  const isLoadingPosts = loading || postsLoading;

  if (isLoadingPosts) {
    return <Spinner subtext="Fetching your posts" />;
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
                to="/register/login"
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

          {/* Enhanced floating action button with premium styling */}
          {isLoggedIn && (
            <Link
              onClick={handleAddPost}
              to="/add"
              className="group fixed right-6 bottom-6 z-50"
            >
              <div className="relative">
                {/* Main button */}
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 hover:from-purple-500 hover:via-purple-600 hover:to-purple-700 text-white rounded-full shadow-2xl shadow-purple-500/40 hover:shadow-purple-400/60 transform hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center border-2 border-purple-400/30 hover:border-purple-300/50 backdrop-blur-xl relative overflow-hidden">
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>

                  {/* Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-7 h-7 group-hover:rotate-90 transition-transform duration-300 relative z-10 drop-shadow-lg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>

                  {/* Inner glow */}
                  <div className="absolute inset-1 rounded-full bg-gradient-to-br from-purple-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Outer glow rings */}
                <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-xl scale-125 opacity-60 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500"></div>
                <div className="absolute inset-0 rounded-full bg-purple-400/10 blur-2xl scale-150 opacity-40 group-hover:opacity-80 group-hover:scale-200 transition-all duration-700"></div>

                {/* Floating particles */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute -top-2 -right-2 w-1 h-1 bg-purple-300 rounded-full animate-bounce delay-100"></div>
                  <div className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce delay-300"></div>
                  <div className="absolute -top-1 -left-3 w-1 h-1 bg-purple-200 rounded-full animate-bounce delay-500"></div>
                </div>

                {/* Ripple effect on hover */}
                <div className="absolute inset-0 rounded-full border border-purple-300/0 group-hover:border-purple-300/40 group-hover:scale-125 transition-all duration-300"></div>
                <div className="absolute inset-0 rounded-full border border-purple-200/0 group-hover:border-purple-200/20 group-hover:scale-150 transition-all duration-500 delay-100"></div>

                {/* Tooltip */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200">
                  <div className="bg-slate-800/90 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-lg shadow-xl border border-slate-700/50 whitespace-nowrap">
                    Create Post
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800/90"></div>
                  </div>
                </div>
              </div>
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

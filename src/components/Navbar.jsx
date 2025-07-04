import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Modal from "./Modal";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setModalOpen(false);
    setMobileMenuOpen(false);
    toast.success("Logged out successfully!");
    navigate("/register/login");
  };

  return (
    <>
      {/* Enhanced navbar with glassmorphism and purple accents */}
      <nav className="bg-base-300/90 backdrop-blur-xl border-b border-purple-500/20 shadow-2xl shadow-purple-500/10 fixed top-0 left-0 right-0 z-50">
        {/* Subtle background effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/5 via-transparent to-purple-900/5 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center h-16">
            {/* Logo section */}
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="group flex items-center space-x-2 text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent hover:from-purple-300 hover:to-purple-200 transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="p-1.5 sm:p-2 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg border border-purple-500/30 group-hover:border-purple-400/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/25">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 group-hover:text-purple-300 transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <span className=" inline xs:text-lg md:text-2xl">
                  &lt;Assem-Blog /&gt;
                </span>
              </Link>
            </div>

            {/* Desktop welcome message */}
            <div className="hidden lg:flex items-center">
              {user && (
                <div className="flex items-center space-x-2 px-4 py-2 bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-base-content/90 font-medium">
                    Welcome,{" "}
                    <span className="text-purple-400 font-semibold">
                      {user.username}
                    </span>
                  </span>
                </div>
              )}
            </div>

            {/* Desktop Action buttons */}
            <div className="hidden md:flex items-center space-x-3">
              {user ? (
                <button
                  onClick={() => setModalOpen(true)}
                  className="group flex items-center space-x-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-400/50 text-red-400 hover:text-red-300 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/25"
                >
                  <svg
                    className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="font-medium">Logout</span>
                </button>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/register/login"
                    className="group px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-medium rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transform hover:-translate-y-0.5 transition-all duration-300 border border-purple-500/20"
                  >
                    <span className="flex items-center space-x-2">
                      <svg
                        className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300"
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
                      <span>Login</span>
                    </span>
                  </Link>

                  <Link
                    to="/register/signup"
                    className="group px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 hover:border-purple-400/50 text-purple-400 hover:text-purple-300 font-medium rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <span className="flex items-center space-x-2">
                      <svg
                        className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                        />
                      </svg>
                      <span>Signup</span>
                    </span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              {/* Mobile user indicator */}
              {user && (
                <div className="flex items-center space-x-1 px-2 py-1 bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-lg">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-purple-400 font-medium max-w-16 truncate">
                    {user.username}
                  </span>
                </div>
              )}

              <button
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                className="group p-2 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 hover:border-purple-400/50 text-purple-400 hover:text-purple-300 rounded-xl transition-all duration-300"
                aria-label="Toggle mobile menu"
              >
                <svg
                  className={`w-5 h-5 transform transition-transform duration-300 ${
                    isMobileMenuOpen ? "rotate-90" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 py-3 space-y-3 bg-base-300/95 backdrop-blur-xl border-t border-purple-500/20">
            {user ? (
              <div className="space-y-3">
                {/* Mobile welcome message */}
                <div className="flex items-center justify-center space-x-2 px-4 py-3 bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-xl">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-base-content/90 font-medium">
                    Welcome,{" "}
                    <span className="text-purple-400 font-semibold">
                      {user.username}
                    </span>
                  </span>
                </div>

                <button
                  onClick={() => setModalOpen(true)}
                  className="w-full group flex items-center justify-center space-x-2 px-4 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-400/50 text-red-400 hover:text-red-300 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/25"
                >
                  <svg
                    className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  to="/register/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full group flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-medium rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transform hover:-translate-y-0.5 transition-all duration-300 border border-purple-500/20"
                >
                  <svg
                    className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300"
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
                  <span>Login</span>
                </Link>

                <Link
                  to="/register/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full group flex items-center justify-center space-x-2 px-4 py-3 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 hover:border-purple-400/50 text-purple-400 hover:text-purple-300 font-medium rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  <svg
                    className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  <span>Signup</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Enhanced logout confirmation modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm Logout"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
            <div className="flex-shrink-0">
              <svg
                className="w-6 h-6 text-orange-400"
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
                Are you sure you want to log out?
              </p>
              <p className="text-base-content/70 text-sm mt-1">
                You'll be redirected to the login page.
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
              onClick={handleLogout}
              className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-medium rounded-xl shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/40 transform hover:-translate-y-0.5 transition-all duration-300 border border-red-500/20"
            >
              Yes, Log out
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Navbar;

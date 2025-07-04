import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const Signup = () => {
  const { register: registerUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating your account...");
    try {
      setError("");
      await registerUser(data.username, data.email, data.password);
      toast.success("Account created!", { id: toastId });
      navigate("/");
    } catch (error) {
      setError(error.message || "Registration failed. Please try again.");
      toast.error(error.message || "Registration failed.", { id: toastId });
    }
  };

  return (
    <>
      <div className="text-center mb-8">
        {/* Logo/Icon */}
        <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-base-100 to-purple-800/40 rounded-full flex items-center justify-center border border-purple-500/20 shadow-lg">
          <svg
            className="w-8 h-8 text-purple-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
        </div>

        <h2 className="text-3xl font-bold text-white mb-3">
          Create your account
        </h2>
        <div className="flex justify-center mb-4">
          <div className="h-0.5 w-12 bg-gradient-to-r from-purple-500 to-purple-400 rounded-full shadow-lg shadow-purple-500/50"></div>
        </div>
        <p className="text-slate-300 leading-relaxed">
          Or{" "}
          <Link
            to="/register/login"
            className="font-medium text-purple-400 hover:text-purple-300 transition-colors duration-300 underline decoration-purple-500/30 hover:decoration-purple-400/50 underline-offset-4"
          >
            sign in to your account
          </Link>
        </p>
      </div>

      {error && (
        <div
          className="bg-red-500/20 border border-red-500/30 text-red-300 p-4 rounded-xl text-center mb-6 backdrop-blur-sm opacity-0"
          style={{ animation: "slideInDown 0.6s ease-out 0.2s forwards" }}
        >
          <div className="flex items-center justify-center space-x-2">
            <svg
              className="w-5 h-5 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 5c-.77-.833-2.232-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div
          className="opacity-0"
          style={{ animation: "slideInLeft 0.6s ease-out 0.3s forwards" }}
        >
          <div className="relative">
            <input
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
              type="text"
              placeholder="Username"
              className="w-full px-4 py-3 border border-slate-600/50 bg-base-200/50 backdrop-blur-sm text-white placeholder-slate-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:border-slate-500/70"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
          {errors.username && (
            <span className="text-red-400 text-sm mt-2 block flex items-center space-x-1">
              <svg
                className="w-4 h-4"
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
              <span>{errors.username.message}</span>
            </span>
          )}
        </div>

        <div
          className="opacity-0"
          style={{ animation: "slideInRight 0.6s ease-out 0.4s forwards" }}
        >
          <div className="relative">
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-slate-600/50 bg-base-200/50 backdrop-blur-sm text-white placeholder-slate-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:border-slate-500/70"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
          {errors.email && (
            <span className="text-red-400 text-sm mt-2 block flex items-center space-x-1">
              <svg
                className="w-4 h-4"
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
              <span>{errors.email.message}</span>
            </span>
          )}
        </div>

        <div
          className="opacity-0"
          style={{ animation: "slideInLeft 0.6s ease-out 0.5s forwards" }}
        >
          <div className="relative">
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 pr-12 border border-slate-600/50 bg-base-200/50 backdrop-blur-sm text-white placeholder-slate-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:border-slate-500/70"
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-purple-400 focus:outline-none"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <svg
                className={`w-5 h-5 cursor-pointer transition-all duration-300 ${
                  showPassword ? "text-purple-400" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.274.832-.642 1.624-1.09 2.357"
                />
              </svg>
            </button>
          </div>
          {errors.password && (
            <span className="text-red-400 text-sm mt-2 block flex items-center space-x-1">
              <svg
                className="w-4 h-4"
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
              <span>{errors.password.message}</span>
            </span>
          )}
        </div>

        <div
          className="opacity-0"
          style={{ animation: "slideInRight 0.6s ease-out 0.6s forwards" }}
        >
          <div className="relative">
            <input
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full px-4 py-3 pr-12 border border-slate-600/50 bg-base-200/50 backdrop-blur-sm text-white placeholder-slate-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:border-slate-500/70"
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-purple-400 focus:outline-none"
              onClick={() => setShowConfirmPassword((v) => !v)}
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              <svg
                className={`w-5 h-5 cursor-pointer transition-all duration-300 ${
                  showConfirmPassword ? "text-purple-400" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.274.832-.642 1.624-1.09 2.357"
                />
              </svg>
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="text-red-400 text-sm mt-2 block flex items-center space-x-1">
              <svg
                className="w-4 h-4"
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
              <span>{errors.confirmPassword.message}</span>
            </span>
          )}
        </div>

        <button
          type="submit"
          className="group w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-medium py-3 px-6 rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transform hover:-translate-y-1 transition-all duration-300 border border-purple-500/20 opacity-0 relative overflow-hidden"
          style={{ animation: "slideInUp 0.6s ease-out 0.7s forwards" }}
        >
          <div className="flex items-center justify-center space-x-2">
            <svg
              className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300"
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
            <span>Create Account</span>
          </div>
          {/* Button glow effect */}
          <div className="absolute inset-0 rounded-xl bg-purple-400/20 blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </form>
    </>
  );
};

export default Signup;

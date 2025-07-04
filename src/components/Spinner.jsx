import React from "react";

const Spinner = ({ text = "Loading", subtext = "" }) => (
  <div
    className="fixed inset-0 z-50 flex justify-center items-center bg-slate-900/80"
    style={{ width: "100vw", height: "100vh" }}
  >
    {/* Animated background gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-slate-900 to-blue-900/20 pointer-events-none"></div>

    {/* Floating particles */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400/30 rounded-full animate-pulse"></div>
      <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400/40 rounded-full animate-pulse delay-700"></div>
      <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-300/20 rounded-full animate-pulse delay-1000"></div>
    </div>

    <div className="relative z-10 flex flex-col items-center space-y-6">
      {/* Main spinner container */}
      <div className="relative">
        {/* Multiple rotating rings */}
        <div className="animate-spin rounded-full h-20 w-20 border-4 border-transparent border-t-purple-500 border-r-purple-400 shadow-2xl"></div>
        <div
          className="absolute inset-2 animate-spin rounded-full h-16 w-16 border-3 border-transparent border-t-blue-400 border-l-blue-300 shadow-xl"
          style={{
            animationDirection: "reverse",
            animationDuration: "1.5s",
          }}
        ></div>
        <div
          className="absolute inset-4 animate-spin rounded-full h-12 w-12 border-2 border-transparent border-t-purple-300 shadow-lg"
          style={{ animationDuration: "2s" }}
        ></div>

        {/* Glowing center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full animate-pulse shadow-lg"></div>
        </div>

        {/* Multiple glow effects */}
        <div className="absolute inset-0 animate-pulse rounded-full h-20 w-20 bg-purple-500/20 blur-xl"></div>
        <div className="absolute inset-0 animate-pulse rounded-full h-20 w-20 bg-blue-500/10 blur-2xl delay-300"></div>

        {/* Orbiting dots */}
        <div
          className="absolute inset-0 animate-spin"
          style={{ animationDuration: "3s" }}
        >
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-purple-400 rounded-full shadow-lg"></div>
        </div>
        <div
          className="absolute inset-0 animate-spin"
          style={{ animationDuration: "4s", animationDirection: "reverse" }}
        >
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full shadow-md"></div>
        </div>
      </div>

      {/* Loading text with typing animation */}
      <div className="text-center space-y-2">
        <div className="text-white text-lg font-medium tracking-wide">
          <span className="inline-block animate-pulse">{text}</span>
          <span className="inline-block animate-pulse delay-300">.</span>
          <span className="inline-block animate-pulse delay-500">.</span>
          <span className="inline-block animate-pulse delay-700">.</span>
        </div>
        {subtext && <div className="text-slate-400 text-sm">{subtext}</div>}
      </div>

      {/* Progress bar */}
      <div className="w-48 h-1 bg-slate-700 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
      </div>
    </div>

    {/* Corner accents */}
    <div className="absolute top-10 right-10 w-20 h-20 border-2 border-purple-500/20 rounded-full animate-pulse pointer-events-none"></div>
    <div className="absolute bottom-10 left-10 w-16 h-16 border-2 border-blue-500/20 rounded-full animate-pulse delay-1000 pointer-events-none"></div>
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
      @keyframes fadeIn {
        from { opacity: 0; } to { opacity: 1; }
      }
    `}</style>
  </div>
);

export default Spinner;

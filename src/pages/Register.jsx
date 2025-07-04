import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";

function Register() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-300 via-purple-800/20 to-base-300 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
          backgroundSize: "50px 50px",
        }}
      ></div>
      <div className="max-w-md w-full space-y-8 relative z-10">
        <div
          className="bg-base-300/60 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-slate-700/50 ring-1 ring-purple-500/10 opacity-0"
          style={{ animation: "slideInUp 0.8s ease-out forwards" }}
        >
          {/* Tab Bar for Login/Signup */}
          <div className="flex w-full mb-8 border-b border-purple-700/30">
            <NavLink
              to="login"
              className={({ isActive }) =>
                `flex-1 text-center py-3 font-medium transition-colors duration-200 focus:outline-none text-slate-300 hover:text-purple-400 border-b-2 ${
                  isActive
                    ? "border-purple-500 text-purple-400"
                    : "border-transparent"
                }`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="signup"
              className={({ isActive }) =>
                `flex-1 text-center py-3 font-medium transition-colors duration-200 focus:outline-none text-slate-300 hover:text-purple-400 border-b-2 ${
                  isActive
                    ? "border-purple-500 text-purple-400"
                    : "border-transparent"
                }`
              }
            >
              Signup
            </NavLink>
          </div>
          {/* End Tab Bar */}
          <Outlet />
        </div>
      </div>

      {/* Add custom keyframes */}
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
      `}</style>
    </div>
  );
}

export default Register;

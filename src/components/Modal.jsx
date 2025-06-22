import { useEffect } from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop with glassmorphism effect */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal container */}
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden transition-all duration-300 sm:my-8 sm:w-full sm:max-w-lg">
          {/* Modal content */}
          <div className="relative bg-base-300/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 ring-1 ring-purple-500/20 animate-modal-enter">
            {/* Subtle background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-purple-900/10 pointer-events-none rounded-2xl"></div>

            {/* Header */}
            <div className="relative z-10 px-6 pt-6 pb-4 border-b border-slate-700/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <h3 className="text-xl font-bold text-white bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent">
                    {title}
                  </h3>
                </div>

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="group p-2 rounded-xl bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600/50 hover:border-slate-500/50 text-slate-400 hover:text-slate-200 transition-all duration-300 transform hover:scale-110 hover:rotate-90"
                  aria-label="Close modal"
                >
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 px-6 py-6">{children}</div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes modal-enter {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-modal-enter {
          animation: modal-enter 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Modal;

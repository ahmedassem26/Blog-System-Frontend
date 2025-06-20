import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Modal from "./Modal";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isModalOpen, setModalOpen] = useState();
  const navigate = useNavigate();

  return (
    <nav className="bg-base-100 shadow-xl shadow-purple-700/20 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold ">
                Blog System
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {user && (
              <h2 className="drop-shadow-purple-900 drop-shadow-md text-purple-100">
                Welcome, {user.username}
              </h2>
            )}
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setModalOpen(true)}
                  className="text-red-600 hover:text-red-800 transition-all duration-300 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="btn bg-purple-700 rounded-xl hover:bg-purple-800 transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-purple-600 hover:text-purple-800 transition-all duration-300"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm Logout"
      >
        <p>Are you sure you want to Log out?</p>
        <div className="modal-action justify-end">
          <button
            onClick={() => {
              logout();
              setModalOpen(false);
              navigate("/login");
            }}
            className="btn btn-error"
          >
            Yes, Log out
          </button>
        </div>
      </Modal>
    </nav>
  );
};

export default Navbar;

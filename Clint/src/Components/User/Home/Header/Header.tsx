import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaHome, FaUser, FaCog } from "react-icons/fa";
import { logout } from "../../../../Redux/authSlice";

type User = {
  image?: string;
};

interface HeaderProps {
  user?: User;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-white/30 backdrop-blur-xl shadow-lg p-5 z-50 flex items-center justify-between border-b border-white/20">
    {/* Navigation Menu (Left Side) */}
    <div className="flex space-x-8 text-gray-900 text-lg font-semibold tracking-wide">
      <Link to="/home" className="flex items-center hover:text-blue-600 transition-all duration-300">
        <FaHome className="mr-2 text-blue-500" /> Home
      </Link>
      <Link to="/profile" className="flex items-center hover:text-blue-600 transition-all duration-300">
        <FaUser className="mr-2 text-blue-500" /> Profile
      </Link>
      <Link to="/settings" className="flex items-center hover:text-blue-600 transition-all duration-300">
        <FaCog className="mr-2 text-blue-500" /> Settings
      </Link>
    </div>

    {/* Right Side: User Profile & Logout */}
    <div className="flex items-center space-x-6">
      {user?.image && (
        <img
          src={user.image.startsWith("http") ? user.image : `http://localhost:3000${user.image}`}
          alt="User Profile"
          className="w-12 h-12 rounded-full border-2 border-gray-300 shadow-lg hover:scale-105 transition-transform"
        />
      )}
      <button
        onClick={handleLogout}
        className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full shadow-lg hover:from-pink-500 hover:to-blue-500 hover:scale-105 transition-all duration-300"
      >
        Logout
      </button>
    </div>
  </div>
  );
};

export default Header;

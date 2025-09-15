import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaHome, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
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
    <header className="fixed top-0 left-0 w-full px-6 py-4 bg-white/20 backdrop-blur-md shadow-lg z-50 border-b border-white/20">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-white tracking-wide">Socials</h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 text-white font-medium">
          <Link to="/home" className="flex items-center gap-2 hover:text-blue-400 transition">
            <FaHome /> Home
          </Link>
          <Link to="/complete-profile" className="flex items-center gap-2 hover:text-blue-400 transition">
            <FaUser /> Profile
          </Link>
          <Link to="/settings" className="flex items-center gap-2 hover:text-blue-400 transition">
            <FaCog /> Settings
          </Link>
        </nav>

        {/* Desktop Logout */}
        <div className="hidden md:flex items-center gap-5">
          <button
            onClick={handleLogout}
            className="bg-[#f5f5dc] text-[#4b3621] border border-[#4b3621] px-4 py-2 rounded-sm hover:bg-[#e6e6d4] transition duration-300 shadow-inner font-serif"
          >
            Logout
          </button>
        </div>

        {/* Mobile Icons Only */}
        <div className="md:hidden flex gap-5 items-center text-white text-xl">
          <Link to="/home" className="hover:text-blue-400">
            <FaHome />
          </Link>
          <Link to="/profile" className="hover:text-blue-400">
            <FaUser />
          </Link>
          <Link to="/settings" className="hover:text-blue-400">
            <FaCog />
          </Link>
          <button
            onClick={handleLogout}
            className="hover:text-red-500"
            title="Logout"
          >
            <FaSignOutAlt />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

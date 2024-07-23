import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaSearch } from "react-icons/fa";

function SideBar() {
  return (
    <div className="h-screen w-1/5 flex flex-col bg-blue-900 text-white">
      <Link
        to="/"
        className="flex items-center justify-center text-xl mb-4 hover:bg-blue-500 hover:text-blue-900 py-3"
      >
        <FaHome className="w-6 h-6 mr-2" /> Home
      </Link>
      <Link
        to="/profile"
        className="flex items-center justify-center text-xl mb-4 hover:bg-blue-500 hover:text-blue-900 py-3"
      >
        <FaUser className="w-6 h-6 mr-2" /> Profile
      </Link>
      <Link
        to="/search"
        className="flex items-center justify-center text-xl mb-4 hover:bg-blue-500 hover:text-blue-900 py-3"
      >
        <FaSearch className="w-6 h-6 mr-2" />Search
      </Link>
    </div>
  );
}

export default SideBar;

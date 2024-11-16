import React from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiLogIn, FiUserPlus, FiFileText } from "react-icons/fi"; // FiFileText can be used as a request icon
import BloodDonationLogo from "../assets/Blood-Donation-Logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <header className="bg-white shadow-md z-50 sticky top-0">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <button
            className="flex-shrink-0 cursor-pointer focus:outline-none"
            onClick={() => handleNavigate("/")}
          >
            <img
              src={BloodDonationLogo}
              alt="Blood Donation Logo"
              className="w-16 h-16"
            />
          </button>

          <div className="flex-grow"></div>
          <div className="flex items-center space-x-4 ml-4">
            <button
              onClick={() => handleNavigate("/search")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
              <FiSearch className="mr-2" /> Search
            </button>
            <button
              onClick={() => handleNavigate("/register")}
              className="inline-flex items-center px-4 py-2 border border-red-600 text-sm font-medium rounded-md text-red-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
              <FiFileText className="mr-2" /> Request
            </button>
            <button
              onClick={() => handleNavigate("/login")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
              <FiLogIn className="mr-2" /> Login
            </button>
            <button
              onClick={() => handleNavigate("/register")}
              className="inline-flex items-center px-4 py-2 border border-red-600 text-sm font-medium rounded-md text-red-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
              <FiUserPlus className="mr-2" /> Register
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

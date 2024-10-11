import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiLogIn, FiUserPlus, FiFileText } from "react-icons/fi"; // FiFileText can be used as a request icon
import BloodDonationLogo from "../assets/Blood-Donation-Logo.png";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Function to handle the change in the search input
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to handle search submission
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log("Searching for:", searchTerm);
    navigate(`/search?query=${searchTerm}`); // Navigate to a search page
  };

  // Function to handle navigation
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

          {/* This div pushes everything to the right */}
          <div className="flex-grow"></div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="search"
                name="search"
                type="search"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </form>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 ml-4">
            <button
              onClick={() => handleNavigate("/register")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out"
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

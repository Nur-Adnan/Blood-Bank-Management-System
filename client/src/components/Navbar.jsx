import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiLogIn, FiUserPlus } from "react-icons/fi"; // Importing modern icons

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
    // You can also navigate to a search page here, e.g.,
    // navigate(`/search?query=${searchTerm}`);
  };

  // Function to handle navigation
  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-6 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="text-3xl font-bold text-blue-600">
          <a
            href="/"
            className="hover:text-blue-700 transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault();
              handleNavigate("/");
            }}
          >
            MyLogo
          </a>
        </div>

        {/* Search Bar & Buttons */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <form
            className="hidden md:flex items-center max-w-2xl relative"
            onSubmit={handleSearchSubmit}
          >
            {/* Search Input */}
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300"
              placeholder="Search by Blood Group or City"
            />

            {/* Search Icon positioned inside the input */}
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <FiSearch size={20} />
            </div>
          </form>

          {/* Sign In / Sign Up buttons */}
          <div className="flex space-x-4">
            <button
              onClick={() => handleNavigate("/login")}
              className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center"
            >
              <FiLogIn size={20} className="mr-2" /> {/* Login Icon */}
              Sign In
            </button>
            <button
              onClick={() => handleNavigate("/register")}
              className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-md flex items-center"
            >
              <FiUserPlus size={20} className="mr-2" /> {/* User Plus Icon */}
              Sign Up
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden w-full px-6 py-4">
          <form onSubmit={handleSearchSubmit} className="flex items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300"
              placeholder="Search by Blood Group or City"
            />
            <button
              type="submit"
              className="ml-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
            >
              <FiSearch size={20} /> {/* Search Icon */}
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

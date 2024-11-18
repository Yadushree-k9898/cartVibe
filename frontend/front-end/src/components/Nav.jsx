import React from "react";
import { Link, useNavigate } from "react-router-dom";
import cartVibe from "../assets/cartVibe.webp";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <nav className="bg-gradient-to-r from-purple-500 to-indigo-600 shadow-lg fixed w-full z-10 top-0">
      <div className="container mx-auto px-4 flex items-center justify-between py-3">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={cartVibe} alt="Cart Vibe Logo" className="h-10 w-10 rounded-full" />
          <span className="text-white font-bold text-lg">CartVibe</span>
        </Link>

        {/* Navigation Links */}
        {auth ? (
          <ul className="flex space-x-4 text-white">
            <li>
              <Link
                to="/"
                className="hover:text-blue-300 transition duration-300"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/add"
                className="hover:text-blue-300 transition duration-300"
              >
                Add Products
              </Link>
            </li>
            <li>
              <Link
                to="/update"
                className="hover:text-blue-300 transition duration-300"
              >
                Update Product
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="hover:text-blue-300 transition duration-300"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                onClick={logout}
                to="/signup"
                className="hover:text-blue-300 transition duration-300"
              >
                Logout ({JSON.parse(auth).name})
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="flex space-x-4 text-white">
            <li>
              <Link
                to="/signup"
                className="hover:text-blue-300 transition duration-300"
              >
                Sign Up
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="hover:text-blue-300 transition duration-300"
              >
                Login
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Nav;

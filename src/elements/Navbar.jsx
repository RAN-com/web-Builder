import React from "react";
import { Link } from "react-router-dom";
import logo from "../../public/vite.svg";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white font-poppins">
      {/* Left Side - Logo */}
      <div className="text-xl font-bold">
        <Link to="/">
          <img src={logo} className="w-16 h-auto" alt="Logo" />
        </Link>
      </div>

      {/* Center - Navigation Links */}
      <ul className="hidden md:flex space-x-6 text-gray-700 font-bold">
        {["Home", "Services", "Pricing", "Contact", "Privacy Policy"].map((item, index) => (
          <li key={index}>
            <Link
              to={`/${item.toLowerCase().replace(" ", "-")}`}
              className="relative hover:text-red-500 transition duration-300 before:absolute before:left-0 before:-bottom-1 before:w-full before:h-[2px] before:bg-red-500 before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300 before:origin-left"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>

      {/* Right Side - Buttons */}
      <div className="hidden md:flex space-x-4">
        <Link to="/signup">
          <button className="px-4 py-2 border border-black text-black rounded-md hover:bg-black hover:text-white font-bold">
            Sign Up
          </button>
        </Link>
        <Link to="/add">
          <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-800 font-bold">
            Get Demo
          </button>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button className="text-gray-700">☰</button>
      </div>
    </nav>
  );
};

export default Navbar;

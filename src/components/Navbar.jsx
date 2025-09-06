/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext, useRef } from "react";
import { Menu, X, Stethoscope, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import logo from "../assets/bridge-house.png";
import { ProfileContext } from "../context/ProfileContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState({});
  const { user, isLoggedIn, logout } = useContext(ProfileContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
const dropdownRef = useRef(null);


  // Close dropdown when clicking outside
useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll("[id]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
  return (
    <>
      <nav className=" w-full z-50 bg-white/90 backdrop-blur-md shadow-lg">
        <div className="sm:w-full lg:w-[80%]  xl:w-[80%] 2xl:w-[70%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div
                onClick={() => navigate("/")}
                className="w-30 h-30  rounded-lg flex items-center justify-center cursor-pointer"
              >
                <img src={logo} alt="" />
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                About Us
              </Link>
              {/* <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Services
              </Link> */}
              <Link
                to="/gallery"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Gallery
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Contact
              </Link>
              <Link
                to="/profile"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Profile
              </Link>
            </div>
            {/* Desktop Right Section */}
            <div className="hidden md:flex items-center space-x-4">
              {isLoggedIn ? (
                <div ref={dropdownRef} className="relative">
 <div
  className="flex items-center gap-2 cursor-pointer"
  onClick={(e) => {
    e.stopPropagation(); // <--- Prevent outside click logic
    setDropdownOpen(!dropdownOpen);
  }}
>

    <img
      src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
      alt="User Avatar"
      className="w-8 h-8 rounded-full object-cover"
    />
    <span className="text-sm font-semibold text-gray-800">
      {user?.name || user?.phone || "User"}
    </span>
    <span className="text-gray-500">▾</span>
  </div>

  {dropdownOpen && (
    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
      <Link
        to="/profile"
        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
        
        onClick={() =>  setDropdownOpen(false)}
      >
        Profile
      </Link>
      <button
        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
        onClick={() => {
          logout();
          setDropdownOpen(false);
        }}
      >
        Logout
      </button>
    </div>
  )}
</div>

              ) : (
                <Link to="/login">
                  <button className="bg-[#004f8a] text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all">
                    Login / SignUp
                  </button>
                </Link>
              )}
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                Home
              </Link>
              <Link
                to="/"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                Services
              </Link>
              {/* <Link
                to="#doctors"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                Doctors
              </Link> */}

              <Link
                to="/"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                About
              </Link>

              <a href="#contact">
                {" "}
                <button className="w-full mt-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-full">
                  Contact Us
                </button>
              </a>
              {isLoggedIn ? (
                <>
                  <p className="block px-3 py-2 text-gray-700">
                    Hello, {user?.name || user?.phone}
                  </p>
                  <Link to="/profile" className="block px-3 py-2 text-gray-700">
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-gray-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="block px-3 py-2 text-gray-700">
                  Login / SignUp
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;

/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext, useRef } from "react";
import { Menu, X, User, LogOut, HelpCircle, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import logo from "../assets/bridge-house.png";
import { ProfileContext } from "../context/ProfileContext";
import useCookie from "../Hooks/cookie";
import { SiMercadopago } from 'react-icons/si';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoggedIn, logout } = useContext(ProfileContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full z-50 bg-white/90 shadow-lg">
      <div className="w-full  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div
              onClick={() => navigate("/")}
              className="flex items-center justify-center cursor-pointer"
            >
              <img src={logo} alt="Logo" className="w-24 sm:w-28" />
            </div>
          </div>

 
          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 text-sm sm:text-base">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 text-sm sm:text-base">
              About Us
            </Link>
            <Link to="/gallery" className="text-gray-700 hover:text-blue-600 text-sm sm:text-base">
              Gallery
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 text-sm sm:text-base">
              Contact
            </Link>
          </div>

          {/* Desktop Right Section */}
          {isLoggedIn ? (
            <div ref={dropdownRef} className="relative hidden md:block">
              <div
                className="flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-50 transition"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                <img
                  src={
                    user?.profilepic ||
                    "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                  }
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full object-cover border border-gray-300"
                />
                <span className="text-sm font-medium text-gray-800">
                  {user?.name || user?.phone}
                </span>
                <span className="text-gray-500 text-xs">▼</span>
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <User className="w-5 h-5" /> Profile
                  </Link>

                  {user?.accountType !== "Buyer" && (
                    <>
                      <Link
                        to="/enquiry"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <HelpCircle className="w-4 h-4" /> Enquiry
                      </Link>

                      <Link
                        to="/paymentHistory"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition truncate"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <Wallet className="w-4 h-4" /> Subscription History
                      </Link>
                    </>
                  )}

                  <button
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                    }}
                  >
                    <LogOut className="w-5 h-5" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="bg-[#004f8a] text-white px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base hover:shadow-lg transform hover:scale-105 transition-all">
                Login / SignUp
              </button>
            </Link>
          )}

          {/* Mobile Hamburger */}
          <button className="md:hidden ml-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden w-full bg-white border-t">
          <div className="flex flex-col px-4 py-3 space-y-1">
            <Link to="/" className="py-2 text-gray-700 hover:text-blue-600 text-sm">
              Home
            </Link>
            <Link to="/gallery" className="py-2 text-gray-700 hover:text-blue-600 text-sm">
              Gallery
            </Link>
            <Link to="/about" className="py-2 text-gray-700 hover:text-blue-600 text-sm">
              About
            </Link>
            <Link to="/contact" className="py-2 text-gray-700 hover:text-blue-600 text-sm">
              Contact
            </Link>

            {isLoggedIn ? (
              <div ref={dropdownRef} className="mt-2 border-t pt-2">
                <div
                  className="flex items-center gap-2 cursor-pointer py-2"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                >
                  <img
                    src={
                      user?.profilepic ||
                      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                    }
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full object-cover border border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-800">
                    {user?.name || user?.phone || "User"}
                  </span>
                  <span className="text-gray-500 text-xs">▼</span>
                </div>

                {dropdownOpen && (
                  <div className="mt-1 bg-white shadow-lg rounded-md border border-gray-200 w-full">
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <User className="w-5 h-5" /> Profile
                    </Link>

                    {user?.accountType !== "Buyer" && (
                      <>
                        <Link
                          to="/enquiry"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <HelpCircle className="w-4 h-4" /> Enquiry
                        </Link>
                        <Link
                          to="/paymentHistory"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition truncate"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <Wallet className="w-4 h-4" /> Subscription History
                        </Link>
                      </>
                    )}

                    <button
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut className="w-5 h-5" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="py-2 text-gray-700 text-sm">
                Login / SignUp
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

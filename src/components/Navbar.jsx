/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext, useRef } from "react";
import { Menu, X, Stethoscope, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import logo from "../assets/bridge-house.png";
import { ProfileContext } from "../context/ProfileContext";
import useCookie from "../Hooks/cookie";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState({});
  const { user, isLoggedIn, logout } = useContext(ProfileContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { getCookie } = useCookie();

  //const userID = getCookie("userID", 30);

  useEffect(() => {
    console.log("User data in Navbar:", user);
  }, [user]);

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
      <nav className=" w-full z-50 bg-white/90  shadow-lg">
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
            </div>
            {/* Desktop Right Section */}

            {isLoggedIn ? (
              <div ref={dropdownRef} className="relative hidden md:block">
                {/* Avatar + Name + Arrow */}
                <div
                  className="flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-50 transition "
                  onClick={() => {
                    console.log("clicked");
                    setDropdownOpen((prev) => !prev);
                  }}
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

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-full bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <Link
                      to="/profile"
                      className="block px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-100 transition flex-start"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <button className="flex items-center gap-2 w-full  py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
                        <User className="w-5 h-5 " />
                        Profile
                      </button>
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-5 h-5" />
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
                to="/gallery"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                Gallery
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                Contact
              </Link>

              {/* Mobile User Section */}
              {isLoggedIn ? (
                <div className="relative mt-2 border-t pt-2" ref={dropdownRef}>
                  <div
                    className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-md hover:bg-gray-50 transition"
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

                  {/* Dropdown in Mobile */}
                  {dropdownOpen && (
                    <div className="mt-1 bg-white shadow-lg rounded-md border border-gray-200 overflow-hidden w-auto min-w-max">
                      <Link
                        to="/profile"
                        className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 transition"
                        onClick={() => {
                          setDropdownOpen(false);
                          setIsMenuOpen(false);
                        }}
                      >
                        {" "}
                        <User className="w-5 h-5 " />
                        Profile
                      </Link>
                      <button
                        className="w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 transition"
                        onClick={() => {
                          logout();
                          setDropdownOpen(false);
                          setIsMenuOpen(false);
                        }}
                      >
                        <LogOut className="w-5 h-5" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
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

/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Menu, X, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import logo from "../assets/bridge-house.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState({});

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
              {/* <a href="#contact"><button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all">
                Contact Us
              </button>
              </a> */}
            </div>
            <div className="hidden md:flex">
              {/* <a href="/login"> */}
              <a href="/login">
                <button className="bg-[#004f8a] text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all">
                  Login / SignUp
                </button>
              </a>
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
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;

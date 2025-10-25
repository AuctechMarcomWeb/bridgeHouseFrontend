import React, { useState, useEffect,useContext } from "react";
import {
  Stethoscope,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import logo from "../assets/bridge-house.png";
import { Link, useNavigate } from "react-router-dom";
import { PropertyContext } from "../context/PropertyContext";


const Footer = () => {
  const [isAtTop, setIsAtTop] = useState(true);
const { setPropertyType } = useContext(PropertyContext);
const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToggle = () => {
    if (isAtTop) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCategoryClick = (name) => {
    setPropertyType(name);
    navigate(`/property-list?propertyType=${name}`);
  };

  return (
    <>
      {/* Footer */}
      <footer
        id="contact"
        className="bg-gray-900 text-white py-10 sm:py-12 md:py-16 "
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* GRID LAYOUT */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-16">
            {/* Logo + Description */}
            <div className=" md:text-left">
              <div className="flex justify-center md:justify-start mb-6 ">
                <img
                  src={logo}
                  alt="Bridge House Logo"
                  className="w-28 sm:w-32 h-auto"
                />
              </div>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base max-w-xs mx-auto md:mx-0">
                A Trusted Real Estate in Lucknow
              </p>
            </div>

            {/* Quick Links */}
            <div className=" md:text-left">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link
                  to="/"
                  className="block text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                >
                  Home
                </Link>
                <Link
                  to="/"
                  className="block text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                >
                  categories
                </Link>
                <Link
                  to="/contact"
                  className="block text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* Services */}
            <div className=" md:text-left">
              {/* <h3 className="text-lg font-semibold mb-4">Services</h3>
              <div className=" space-y-2 font-semibold text-sm sm:text-base">
                <div className="text-gray-400 hover:text-white cursor-pointer">Sell</div>
                <div className="text-gray-400 hover:text-white cursor-pointer">Buy</div>
                <div className="text-gray-400 hover:text-white cursor-pointer">Plot</div>
                <div className="text-gray-400 hover:text-white cursor-pointer">Rent</div>
              </div> */}
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <div className=" space-y-2 font-semibold text-sm sm:text-base">
                <div
                  className="text-gray-400 hover:text-white cursor-pointer"
                  onClick={() => handleCategoryClick("Commercial")}
                >
                  Commercial
                </div>
                <div
                  className="text-gray-400 hover:text-white cursor-pointer"
                  onClick={() => handleCategoryClick("Villa")}
                >
                  Villa
                </div>
                <div
                  className="text-gray-400 hover:text-white cursor-pointer"
                  onClick={() => handleCategoryClick("Plot")}
                >
                  Plot
                </div>
                <div
                  className="text-gray-400 hover:text-white cursor-pointer"
                  onClick={() => handleCategoryClick("Residental")}
                >
                  Residental
                </div>
                <div
                  className="text-gray-400 hover:text-white cursor-pointer"
                  onClick={() => handleCategoryClick("Apartment")}
                >
                  Apartment
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className=" md:text-left">
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-4 text-sm sm:text-base">
                <div className="flex  md:justify-start items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-400">+91 98380 75493</span>
                </div>
                <div className="flex md:justify-start items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-400 break-all">
                    support@bridgehouse.com
                  </span>
                </div>
                <div className="flex md:justify-start items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-400">
                    1090, Gomti Nagar, <br />
                    Lucknow, Uttar Pradesh 20001
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400 text-sm sm:text-base">
            <p>
              &copy; 2025 Bridge House. All rights reserved. Made by{" "}
              <span className="text-blue-400">Auctech MarCom</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll Toggle Button */}
      <button
        onClick={handleScrollToggle}
        className="fixed bottom-6 right-6 bg-[#004f8a] hover:bg-[#004f8a] text-white p-3 rounded-full shadow-lg transition-colors z-50"
        aria-label="Scroll toggle"
      >
        {isAtTop ? (
          <ChevronDown className="w-5 h-5" />
        ) : (
          <ChevronUp className="w-5 h-5" />
        )}
      </button>
    </>
  );
};

export default Footer;

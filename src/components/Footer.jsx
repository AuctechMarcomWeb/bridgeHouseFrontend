import React, { useState, useEffect } from "react";
import {
  Stethoscope,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import logo from "../assets/bridge-house.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const [isAtTop, setIsAtTop] = useState(true);

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

  return (
    <>
      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-30 h-30  from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                 
                   <img src={logo} alt="" />
                </div>
                
              </div>
              <p className="text-gray-400 leading-relaxed">
                A Trusted  Realstate In Lucknow
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link
                  to="/"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Services
                </Link>
               
                <Link
                  to="/contact"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <div className="space-y-2">
                <div className="text-gray-400">Sell</div>
                <div className="text-gray-400">Buy</div>
                <div className="text-gray-400">Plot</div>
                <div className="text-gray-400">Rent</div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-400">+919838075493</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-400">support@bridgehouse.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 fs-6 text-blue-400" />
                  <span className="text-gray-400">
                    1090, <br />  Gomti Nagar, Lucknow, Uttar Pradesh 20001
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              &copy; 2025 Bridge House. All rights reserved. Made by Auctech MarCom
            </p>
            
          </div>
        </div>
      </footer>

      {/* Scroll Toggle Button */}
      <button
        onClick={handleScrollToggle}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors z-50"
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

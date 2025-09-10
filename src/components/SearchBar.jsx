import { State } from "country-state-city";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Locationform from "./Locationform";

const SearchBar = () => {
  const [selectedLocation, setSelectedLocation] = useState("Select State");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const [states, setStates] = useState([]);
  const navigate = useNavigate();

  // ✅ Load states
  useEffect(() => {
    const allStates = State.getStatesOfCountry("IN");
    setStates(allStates);
  }, []);

  // ✅ Dropdown outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ When new state is selected → reset search
  const handleLocationSelect = (stateName) => {
    setSelectedLocation(stateName);
    setSearchQuery("");
    setIsDropdownOpen(false);
  };

  // ✅ Just redirect
  const handleSearch = () => {
    if (selectedLocation === "Select State") {
      alert("Please select a state first!");
      return;
    }
    if (!searchQuery) {
      alert("Please select an address!");
      return;
    }

    // Redirect with params
    navigate(`/property-list`);
  };

  return (
    <div className="flex flex-wrap items-center justify-start">
      <div className="bg-white rounded-full shadow-xl flex items-center md:max-w-2xl w-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        {/* State Dropdown */}
        <div
          ref={dropdownRef}
          className="relative flex items-center px-2 md:px-5 border-r border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className="md:font-semibold text-sm text-gray-700 mr-2 whitespace-nowrap">
            {selectedLocation}
          </span>
          <svg
            className={`text-gray-500 transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="currentColor"
          >
            <path
              d="M1 1l5 5 5-5"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 bg-white max-h-60 overflow-y-auto rounded-xl shadow-lg z-50 mt-2 py-2">
              <ul className="text-sm text-gray-700">
                {states.map((state) => (
                  <li
                    key={state.isoCode}
                    onClick={() => handleLocationSelect(state.name)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {state.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Address Search */}
        <div className="flex-1 md:px-5">
          <Locationform
            value={searchQuery}
            onSelect={(val) => setSearchQuery(val ? String(val) : "")}
          />
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="md:px-8 md:py-5 py-2 px-2 bg-teal-500 text-white font-semibold md:text-base text-sm cursor-pointer rounded-r-full transition-all duration-200 flex items-center gap-2 hover:scale-105 active:scale-95"
        >
          <svg
            className="hidden md:block"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
